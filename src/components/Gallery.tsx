import Item from "./Item";
import ProjectTitle from "./ProjectTitle";
import "/css/gallery.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import projectsData from "../projects/projects.json";
import { useRef, useState, useEffect } from "react";
import ExpandedBody from "./ExpandedBody";
import ExpandedBodyOld from "./ExpandedBodyOLD";

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
  const [expandedPositions, setExpandedPositions] = useState<Position[]>([]);
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
    const centerY = isExpanded ? 200 : container.clientHeight / 2 - 140;

    // Calculate expanded positions if not already stored
    if (expandedPositions.length === 0) {
      const newExpandedPositions = projectsData.projects.map((_, index) => ({
        x: 50,
        y: 50,
      }));
      setExpandedPositions(newExpandedPositions);
    }

    // Track actual bounding boxes instead of just positions
    const usedBoxes: BoundingBox[] = [];
    const positions: Position[] = [];

    // Use stored expanded position if available
    if (isExpanded && expandedPositions[currentProjectIndex]) {
      positions[currentProjectIndex] = expandedPositions[currentProjectIndex];
      usedBoxes.push({
        x: expandedPositions[currentProjectIndex].x,
        y: expandedPositions[currentProjectIndex].y,
        width: container.clientWidth * 0.5,
        height: container.clientHeight * 0.5,
      });
    }

    const minX = isExpanded ? container.clientWidth * 0.56 : 0;
    const adjustedCenterX = isExpanded ? container.clientWidth * 0.8 : centerX;
    const maxRadius = Math.max(container.clientWidth, container.clientHeight);

    // Pre-calculate angles for reuse
    const angles = new Float32Array(16);
    for (let i = 0; i < 16; i++) {
      angles[i] = (i * Math.PI) / 8;
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
            x + itemSize.width <= container.clientWidth - 20 &&
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
    } else {
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

      // Use stored expanded position
      const targetPosition = expandedPositions[index];
      gsap.to(`.item-${index}`, {
        position: "relative",
        top: `${targetPosition.y}px`,
        left: `${targetPosition.x}px`,
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

  useEffect(() => {
    setIsCalculating(false);

    setTimeout(() => {
      setIsCalculating(true);
      calculatePositions();
      window.addEventListener("resize", () => {
        window.location.reload();
      });
      setIsCalculating(false);
    }, 1700);

    return () => {
      window.removeEventListener("resize", calculatePositions);
    };
  }, []);

  useEffect(() => {
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
              index={currentProjectIndex}
              name={projectsData.projects[currentProjectIndex]?.description}
            />
            {/* <ExpandedBodyOld
              isCollapsing={isCollapsing}
              description={projectsData.projects[currentProjectIndex]?.description}
            /> */}
          </div>
        )}
      </div>

      <div style={{ minHeight: isExpanded ? 100 : 600 }}></div>
    </>
  );
}

export default Gallery;
