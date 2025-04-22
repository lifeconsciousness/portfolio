import Item from "./Item";
import "/css/gallery.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import projectsData from "../projects/projects.json";
import { useRef, useState, useEffect } from "react";

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
  const gap = 10;
  const itemSize = { width: 200, height: 300 }; // fixed item size
  const [isCalculating, setIsCalculating] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0);

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
    const centerX = container.clientWidth / 2;
    const centerY = container.clientHeight / 2 - 200;

    const usedBoxes: BoundingBox[] = [];
    const positions: Position[] = [];

    // Add the expanded item's bounding box first if there is one
    if (isExpanded) {
      usedBoxes.push({
        x: 50, // from expandItem left position
        y: 50, // from expandItem top position
        width: container.clientWidth * 0.5, // 50vw
        height: container.clientHeight * 0.5, // 50vh
      });
    }

    const isOverlapping = (newBox: BoundingBox): boolean => {
      return usedBoxes.some((box) => {
        return !(
          newBox.x + newBox.width + gap < box.x ||
          newBox.x > box.x + box.width + gap ||
          newBox.y + newBox.height + gap < box.y ||
          newBox.y > box.y + box.height + gap
        );
      });
    };

    const addPosition = (pos: Position) => {
      const newBox: BoundingBox = {
        x: pos.x,
        y: pos.y,
        width: itemSize.width,
        height: itemSize.height,
      };
      usedBoxes.push(newBox);
      positions.push(pos);
    };

    const findValidPosition = (priority: number): Position => {
      const startRadius = priority * (itemSize.width + gap);
      const angles = Array.from({ length: 16 }, (_, i) => (i * Math.PI) / 8);
    
      // Adjust centerX when there's an expanded item
      const adjustedCenterX = isExpanded 
        ? container.clientWidth * 0.75  // Center of the right half
        : centerX;
    
      for (
        let r = startRadius;
        r < Math.max(container.clientWidth, container.clientHeight);
        r += gap
      ) {
        for (const angle of angles) {
          const x = adjustedCenterX + r * Math.cos(angle) - itemSize.width / 2;
          const y = centerY + r * Math.sin(angle) - itemSize.height / 2;
    
          const newBox: BoundingBox = {
            x,
            y,
            width: itemSize.width,
            height: itemSize.height,
          };
    
          // Add minimum x position check when item is expanded
          const minX = isExpanded ? container.clientWidth * 0.5 : 0;
    
          if (
            x >= minX && // This ensures items stay in right half when expanded
            y >= 0 &&
            x + itemSize.width <= container.clientWidth &&
            y + itemSize.height <= container.clientHeight &&
            !isOverlapping(newBox)
          ) {
            return { x, y };
          }
        }
      }
    
      return { x: container.clientWidth * 0.5, y: 0 }; // Default position moved to right half
    };

    const sortedProjects = [...projectsData.projects].sort(
      (a, b) => b.priority - a.priority
    ); // Reversed sort to put highest priority first

    // sortedProjects.forEach((project) => {
    //   const pos = findValidPosition(project.priority);
    //   addPosition(pos);
    // });

    sortedProjects.forEach((project, index) => {
      // Skip position calculation for expanded item
      if (isExpanded && index === currentProjectIndex) {
        positions.push({ x: 50, y: 50 }); // Fixed position for expanded item
      } else {
        const pos = findValidPosition(project.priority);
        addPosition(pos);
      }
    });

    console.log(positions);
    console.log(projectsData.projects);
    setPositions(positions);
  };

  const expandItem = (index: number) => {
    // If clicking on the currently expanded item to collapse it
    if (isExpanded && currentProjectIndex === index) {
      // Reset all items to their original positions
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
          }
        });
      });
      // setIsExpanded(false);
    }
    // If clicking a new item (whether another item is expanded or not)
    else {
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
          });
        }
      });

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
        }
      });

      // setIsExpanded(true);
      // setCurrentProjectIndex(index);
    }
  };

  useEffect(() => {
    setIsCalculating(false);

    setTimeout(() => {
      setIsCalculating(true);
      calculatePositions();
      window.addEventListener("resize", calculatePositions);
      setIsCalculating(false);
    }, 1700);

    return () => window.removeEventListener("resize", calculatePositions);
  }, []);

  useEffect(() => {
    if (!isCalculating) {
      calculatePositions();
    }
  }, [isExpanded, currentProjectIndex]);

  return (
    <div className="gallery" ref={containerRef}>
      {projectsData.projects.map((project, i) => (
        <Item
          index={i}
          key={i}
          name={project.name}
          imgSrc={`/img/${project.filename}`}
          imgAlt={project.name}
          className={`item-${i}`}
          style={{
            position: "absolute",
            width: `${itemSize.width}px`,
            height: `${itemSize.height}px`,
          }}
          onExpand={() => expandItem(i)}
          // isExpanded={isExpanded}
          isExpanded={isExpanded && currentProjectIndex === i}
        />
      ))}

      {isExpanded && (
        <div className="expanded-item">
          <p>{projectsData.projects[currentProjectIndex].name}</p>
        </div>
      )}
    </div>
  );
}

export default Gallery;
