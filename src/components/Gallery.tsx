import Item from "./Item";
import ProjectTitle from "./ProjectTitle";
import "/css/gallery.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import projectsData from "../projects/projects.json";
import { useRef, useState, useEffect } from "react";
import ExpandedBody from "./ExpandedBody";

interface Position {
  x: number;
  y: number;
}

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [gap, setGap] = useState(10);
  const itemSize = { width: 200, height: 250 }; // fixed item size
  const [isCalculating, setIsCalculating] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0);
  const [isCollapsing, setIsCollapsing] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    if (isCalculating) {
      // Initial state - all items at center
      tl.from(".item", {
        opacity: 0,
        scale: 0,
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        stagger: 0.2,
        duration: 0.5,
        ease: "power3.out",
      });
    } else if (positions.length > 0) {
      // Animate to calculated positions
      tl.to(".item", {
        opacity: 1,
        scale: 1,
        left: (i) => `${positions[i]?.x}px`,
        top: (i) => `${positions[i]?.y}px`,
        xPercent: 0,
        yPercent: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.inOut",
      });
    }
  }, [isCalculating, positions]);

  const calculatePositions = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const centerX = container.clientWidth / 2 - 130;
    // const centerY = isExpanded ? 200 : container.clientHeight / 2 - 200;
    const centerY = isExpanded ? 200 : container.clientHeight / 2 - 200;

    // Pre-calculate constants
    const minX = isExpanded ? container.clientWidth * 0.5 : 0;
    const adjustedCenterX = isExpanded ? container.clientWidth * 0.8 : centerX;
    const maxRadius = Math.max(container.clientWidth, container.clientHeight);

    // Pre-calculate angles for reuse
    const angles = new Float32Array(16);
    for (let i = 0; i < 16; i++) {
      angles[i] = (i * Math.PI) / 8;
    }

    // Track actual bounding boxes instead of just positions
    const usedBoxes: BoundingBox[] = [];
    const positions: Position[] = [];

    // Add expanded item box if needed
    if (isExpanded) {
      positions[currentProjectIndex] = { x: 50, y: 50 };
      usedBoxes.push({
        x: 50,
        y: 50,
        width: container.clientWidth * 0.5,
        height: container.clientHeight * 0.5,
      });
    }

    const isOverlapping = (x: number, y: number): boolean => {
      const newBox = {
        x,
        y,
        width: itemSize.width,
        height: itemSize.height,
      };

      return usedBoxes.some(
        (box) =>
          !(
            newBox.x + newBox.width + gap < box.x ||
            newBox.x > box.x + box.width + gap ||
            newBox.y + newBox.height + gap < box.y ||
            newBox.y > box.y + box.height + gap
          )
      );
    };

    const findValidPosition = (priority: number): Position => {
      const startRadius = priority * (itemSize.width + gap);

      for (let r = startRadius; r < maxRadius; r += gap) {
        for (const angle of angles) {
          const x = Math.floor(
            adjustedCenterX + r * Math.cos(angle) - itemSize.width / 2
          );
          const y = Math.floor(
            centerY + r * Math.sin(angle) - itemSize.height / 2
          );

          if (
            x >= minX &&
            y >= 0 &&
            x + itemSize.width <= container.clientWidth &&
            y + itemSize.height <= container.clientHeight &&
            !isOverlapping(x, y)
          ) {
            usedBoxes.push({
              x,
              y,
              width: itemSize.width,
              height: itemSize.height,
            });
            return { x, y };
          }
        }
      }
      return { x: container.clientWidth * 0.5, y: 0 };
    };

    const sortedProjects = projectsData.projects
      .map((project, index) => ({ ...project, index }))
      .sort((a, b) => b.priority - a.priority);

    for (const project of sortedProjects) {
      if (!(isExpanded && project.index === currentProjectIndex)) {
        positions[project.index] = findValidPosition(project.priority);
      }
    }

    setPositions(positions);
  };

  // const calculatePositions = () => {
  //   if (!containerRef.current) return;

  //   const container = containerRef.current;
  //   const containerWidth = container.clientWidth;
  //   const containerHeight = container.clientHeight;
  //   const centerX = containerWidth / 2;
  //   const centerY = isExpanded ? 200 : containerHeight / 2 - 200;

  //   const step = 10; // search step
  //   const maxRadius = Math.max(containerWidth, containerHeight);

  //   const usedBoxes: BoundingBox[] = [];
  //   const finalPositions: Position[] = [];

  //   const randomOffset = (max: number) => Math.random() * max * 2 - max; // random between -max and +max

  //   // Expanded item
  //   if (isExpanded) {
  //     finalPositions[currentProjectIndex] = { x: 50, y: 50 };
  //     usedBoxes.push({
  //       x: 50,
  //       y: 50,
  //       width: containerWidth * 0.5,
  //       height: containerHeight * 0.5,
  //     });
  //   }

  //   const isOverlapping = (x: number, y: number): boolean => {
  //     const newBox = {
  //       x,
  //       y,
  //       width: itemSize.width,
  //       height: itemSize.height,
  //     };

  //     return usedBoxes.some(
  //       (box) =>
  //         !(
  //           newBox.x + newBox.width + gap < box.x ||
  //           newBox.x > box.x + box.width + gap ||
  //           newBox.y + newBox.height + gap < box.y ||
  //           newBox.y > box.y + box.height + gap
  //         )
  //     );
  //   };

  //   const sortedProjects = projectsData.projects
  //     .map((project, index) => ({ ...project, index }))
  //     .sort((a, b) => b.priority - a.priority);

  //   let isFirst = true;

  //   for (const project of sortedProjects) {
  //     if (isExpanded && project.index === currentProjectIndex) continue;

  //     if (isFirst) {
  //       // First item exactly centered
  //       const x = centerX - itemSize.width / 2;
  //       const y = centerY - itemSize.height / 2;

  //       finalPositions[project.index] = { x, y };
  //       usedBoxes.push({
  //         x,
  //         y,
  //         width: itemSize.width,
  //         height: itemSize.height,
  //       });
  //       isFirst = false;
  //       continue;
  //     }

  //     let found = false;

  //     for (let r = 0; r < maxRadius && !found; r += step) {
  //       for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 18) {
  //         let x = centerX + r * Math.cos(angle) - itemSize.width / 2;
  //         let y = centerY + r * Math.sin(angle) - itemSize.height / 2;

  //         // Add small random offset to make it less rigid
  //         x += randomOffset(10);
  //         y += randomOffset(10);

  //         x = Math.floor(x);
  //         y = Math.floor(y);

  //         if (
  //           x >= 0 &&
  //           y >= 0 &&
  //           x + itemSize.width <= containerWidth &&
  //           y + itemSize.height <= containerHeight &&
  //           !isOverlapping(x, y)
  //         ) {
  //           finalPositions[project.index] = { x, y };
  //           usedBoxes.push({
  //             x,
  //             y,
  //             width: itemSize.width,
  //             height: itemSize.height,
  //           });
  //           found = true;
  //           break;
  //         }
  //       }
  //     }

  //     if (!found) {
  //       finalPositions[project.index] = { x: 0, y: 0 };
  //     }
  //   }

  //   setPositions(finalPositions);
  // };

  const expandItem = (index: number) => {
    // If clicking on the currently expanded item to collapse it
    if (isExpanded && currentProjectIndex === index) {
      setIsCollapsing(true);

      // Reset all items to their original positions
      setTimeout(() => {
        document.querySelectorAll(".item").forEach((item, i) => {
          gsap.to(item, {
            position: "absolute",
            width: `${itemSize.width}px`,
            height: `${itemSize.height}px`,
            left: `${positions[i]?.x}px`,
            top: `${positions[i]?.y}px`,
            zIndex: 1,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => {
              setIsExpanded(false);
              calculatePositions();
              setGap(10);
              setTimeout(() => {
                setIsCollapsing(false);
              }, 300);
            },
          });
        });
      }, 1000);
      // setIsExpanded(false);
    }
    // If clicking a new item (whether another item is expanded or not)
    else {
      setIsCollapsing(true);

      // First, make sure all items are in their original position
      document.querySelectorAll(".item").forEach((item, i) => {
        if (i !== index) {
          gsap.to(item, {
            position: "absolute",
            width: `${itemSize.width}px`,
            height: `${itemSize.height}px`,
            left: `${positions[i]?.x}px`,
            top: `${positions[i]?.y}px`,
            zIndex: 1,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => {
              setIsCollapsing(false);
            },
          });
        }
      });

      setGap(20);

      setIsCollapsing(true);

      // Then expand the clicked item
      gsap.to(`.item-${index}`, {
        position: "relative",
        top: "50px",
        left: "50px",
        width: "50vw",
        height: "50vh",
        zIndex: 100,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          setIsExpanded(true);
          setCurrentProjectIndex(index);
          calculatePositions();
          setIsCollapsing(false);
        },
      });
    }
  };

  function updateNoiseFilterHeight() {
    console.log(document.documentElement.scrollHeight)
    document.body.style.setProperty(
      "--page-height",
      document.documentElement.scrollHeight + "px"
    );
  }

  useEffect(() => {
    setIsCalculating(false);

    setTimeout(() => {
      setIsCalculating(true);
      calculatePositions();
      // window.addEventListener("resize", calculatePositions);
      window.addEventListener("resize", () => {
        window.location.reload();
      });
      setIsCalculating(false);
    }, 1700);

    return () => {
      window.removeEventListener("resize", calculatePositions);
      window.addEventListener("resize", updateNoiseFilterHeight);
      window.addEventListener("load", updateNoiseFilterHeight);
    };
  }, []);

  useEffect(() => {
    updateNoiseFilterHeight();
    if (!isCalculating) {
      calculatePositions();
    }

    const backgroundElement = document.getElementById("background-svg");
    if (backgroundElement) {
      gsap.to(backgroundElement, {
        filter: isExpanded ? "blur(100px)" : "blur(0px)",
        duration: 0.9,
        ease: "power3.inOut",
      });
    }
  }, [isExpanded, currentProjectIndex]);

  return (
    <>

    <div className="gallery" ref={containerRef}>
      {projectsData.projects.map((project, i) => (
        <Item
          index={i}
          key={i}
          name={project.name}
          // imgSrc={
          //   import.meta.env.PRODUCTION == "true"
          //     ? `${project.filename}`
          //     : `/img/${project.filename}`
          // }
          imgSrc={`${project.filename}`}
          imgAlt={project.name}
          className={`item-${i}`}
          style={{
            position: "absolute",
            width: `${itemSize.width}px`,
            height: `${itemSize.height}px`,
          }}
          onExpand={() => expandItem(i)}
          isExpanded={isExpanded && currentProjectIndex === i}
        />
      ))}

      {isExpanded && (
        <div className="expanded-item">
          <ProjectTitle
            key={currentProjectIndex}
            title={
              projectsData.projects[currentProjectIndex]?.full_name ||
              projectsData.projects[currentProjectIndex]?.name
            }
            isCollapsing={isCollapsing}
          />
          <ExpandedBody
            isCollapsing={isCollapsing}
            description={projectsData.projects[currentProjectIndex].description}
          />
        </div>
      )}

    </div>

    <div style={{ minHeight: isExpanded ? 100 : 600 }}></div>

    </>
  );
}

export default Gallery;
