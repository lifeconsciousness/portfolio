import Item from "./Item";
import "/css/gallery.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import projectsData from "../projects/projects.json";
import { useRef, useState } from "react";

function Gallery() {
  const containerRef = useRef(null);
  const [gap, setGap] = useState(50);
  const [imgSize, setImgSize] = useState({h: 300, w: 200});


  useGSAP(() => {
    gsap.from(".item", {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.6,
      ease: "power3.out"
    });
  }, []);

  const sortedProjects = [...projectsData.projects]
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 9);

  // Map of positions based on your sketch
  const positionMap = [
    { row: 0, col: 2 }, // 1
    { row: 1, col: 3 }, // 2
    { row: 3, col: 2 }, // 3
    { row: 1, col: 1 }, // 4
    { row: 0, col: 4 }, // 5
    { row: 4, col: 1 }, // 6
    { row: 3, col: 3 }, // 7
    { row: 0, col: 0 }, // 8
    { row: 1, col: 0 }, // 9
  ];

  const cellSize = 20; // in percent

  const getPositionStyle = (row: number, col: number) => ({
    position: "absolute",
    top: `${row * cellSize}%`,
    left: `${col * cellSize}%`,
    // transform: "translate(0, 0)"
  });

  return (
    <div className="gallery" ref={containerRef}>
      {sortedProjects.map((project, i) => {
        const pos = positionMap[i];
        if (!pos) return null;
        return (
          <Item
            key={i}
            name={project.name}
            imgSrc={`/img/${project.filename}`}
            imgAlt={project.name}
            style={getPositionStyle(pos.row, pos.col)}
          />
        );
      })}
    </div>
  );
}

export default Gallery;
