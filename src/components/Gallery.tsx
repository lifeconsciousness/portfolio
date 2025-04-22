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
  const gap = 10; // gap between items
  const itemSize = { width: 200, height: 300 }; // fixed item size
  const [isCalculating, setIsCalculating] = useState(true);

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
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out"
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
        ease: "power3.inOut"
      });
    }
  }, [isCalculating, positions]);

  const calculatePositions = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const centerX = container.clientWidth / 2;
    const centerY = container.clientHeight / 2 + 400;

    const usedBoxes: BoundingBox[] = [];
    const positions: Position[] = [];

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

      for (
        let r = startRadius;
        r < Math.max(container.clientWidth, container.clientHeight);
        r += gap
      ) {
        for (const angle of angles) {
          const x = centerX + r * Math.cos(angle) - itemSize.width / 2;
          const y = centerY + r * Math.sin(angle) - itemSize.height / 2;

          const newBox: BoundingBox = {
            x,
            y,
            width: itemSize.width,
            height: itemSize.height,
          };

          if (
            x >= 0 &&
            y >= 0 &&
            x + itemSize.width <= container.clientWidth &&
            y + itemSize.height <= container.clientHeight &&
            !isOverlapping(newBox)
          ) {
            return { x, y };
          }
        }
      }

      return { x: 0, y: 0 };
    };

    const sortedProjects = [...projectsData.projects].sort(
      (a, b) => b.priority - a.priority
    ); // Reversed sort to put highest priority first

    sortedProjects.forEach((project) => {
      const pos = findValidPosition(project.priority);
      addPosition(pos);
    });

    console.log(positions);
    console.log(projectsData.projects);
    setPositions(positions);
  };

  useEffect(() => {
    setIsCalculating(false);

    setTimeout(() => {
      setIsCalculating(true);
      calculatePositions();
      window.addEventListener("resize", calculatePositions);
      setIsCalculating(false);
    }, 1000);

    return () => window.removeEventListener("resize", calculatePositions);
  }, []);

  return (
    <div className="gallery" ref={containerRef}>
      {projectsData.projects.map((project, i) => (
        <Item
          key={i}
          name={project.name}
          imgSrc={`/img/${project.filename}`}
          imgAlt={project.name}
          style={{
            position: "absolute",
            width: `${itemSize.width}px`,
            height: `${itemSize.height}px`,
          }}
        />
      ))}
    </div>
  );
}

export default Gallery;
