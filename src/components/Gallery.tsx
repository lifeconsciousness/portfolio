import Item from "./Item";
import ProjectTitle from "./ProjectTitle";
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
  const [gap, setGap] = useState(10);
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
    const centerY = isExpanded
      ? 200 // Move items towards top when expanded
      : container.clientHeight / 2 - 200;

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
        ? container.clientWidth * 0.8 // Center of the right half
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

    // console.log(positions);
    // console.log(projectsData.projects);
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
            setGap(10);
          },
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

      setGap(20);

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
        },
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
      // window.addEventListener("resize", calculatePositions);
      window.addEventListener("resize", () => {
        window.location.reload();
      });
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
          {/* <h2 id="project-title">{projectsData.projects[currentProjectIndex].name}</h2> */}
          <ProjectTitle
            key={currentProjectIndex}
            title={projectsData.projects[currentProjectIndex].name}
          />
          <div className="expanded-body">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque,
              officia? Repellat, dolore natus, ducimus necessitatibus quas
              numquam esse tempore, quasi placeat voluptates aut id autem
              blanditiis consequuntur deleniti temporibus doloremque quis sit
              similique! Mollitia, magnam, numquam aspernatur aliquam at dolore
              deserunt voluptatem asperiores, rerum ut labore. Eveniet,
              doloribus laboriosam earum sunt necessitatibus perferendis animi
              mollitia reiciendis laudantium amet accusamus a corrupti dolorem.
              Corrupti labore sit voluptates quibusdam obcaecati laudantium
              voluptate maxime magni nisi, necessitatibus dolore natus
              consequuntur blanditiis totam mollitia, libero expedita ex ut
              voluptas, maiores eligendi. Distinctio magnam labore nisi et, sint
              eaque voluptate, architecto doloremque illum sed laboriosam eum!
              Quia autem quas sequi, dolores earum ex recusandae sed
              repellendus, officiis ea hic assumenda magnam neque optio
              asperiores laborum eum harum officia dolorum, ullam ratione beatae
              non excepturi eligendi. Atque repellat, cupiditate perferendis
              mollitia illum ullam cum veniam repudiandae voluptas quod omnis
              enim dignissimos magni aliquid beatae soluta reiciendis. Ad, earum
              recusandae, quidem molestias eum maiores vel unde, eius optio
              commodi laboriosam ex iure repellendus maxime nisi cumque rerum
              non! Esse minus labore error eligendi ipsum nam aliquam iste
              laborum commodi libero ab fuga laboriosam, quae, saepe tempora?
              Autem vero, fuga magni earum sunt tempore adipisci suscipit rem,
              sed veniam facere temporibus et tenetur culpa ex ut possimus a
              nobis ipsam nisi! Tenetur libero perferendis reiciendis dolorum
              asperiores temporibus, maiores aliquam magni explicabo amet,
              commodi consectetur culpa et assumenda eaque. Consequatur nisi
              maiores accusamus voluptas, doloremque labore! Assumenda
              exercitationem, vel sequi rerum illo labore obcaecati iusto aut
              praesentium repellat reprehenderit eos voluptatem quibusdam
              doloribus architecto! Voluptatem cupiditate consequatur magnam,
              nulla enim sapiente ad temporibus hic ipsam. Laudantium corrupti,
              sapiente maiores in soluta voluptatem magni mollitia molestias
              quidem ex? Sit, tenetur quo doloribus ea fugiat neque earum
              consequuntur laudantium eveniet beatae nobis necessitatibus
              numquam. Tempore possimus voluptatum sit voluptas, error, suscipit
              quod nostrum porro eveniet eos nam! Porro quo accusamus aliquid
              sed omnis, aliquam culpa beatae! Blanditiis tempora vitae
              voluptatem nostrum officia, veniam, sunt adipisci nihil modi
              ducimus culpa fugit voluptatum facere eum debitis iusto
              praesentium totam facilis soluta cupiditate perspiciatis
              repudiandae. Excepturi enim nam minima debitis nostrum aut vel
              deserunt cumque laudantium veniam a eius, doloribus quae quod
              nobis voluptatum neque. Molestiae at rem quas fugit quidem animi
              reiciendis velit natus optio libero maxime quod quis sint,
              voluptatibus dolore earum consequuntur ab veniam corporis!
              Deleniti consectetur sed laudantium dolorum. Nemo, dolor?
              Provident quisquam facilis quod necessitatibus sit, magni, cumque
              consequuntur omnis, ex blanditiis nobis esse ducimus repellendus
              quas placeat iure in. Modi placeat, omnis ex asperiores debitis,
              labore quae dolorem, sit saepe reiciendis consequatur possimus a
              dolore delectus animi nostrum ad aut eveniet sequi! Facere
              repellendus obcaecati corporis vero minus rerum quod laboriosam,
              eos, totam hic fugit in suscipit qui dolorem. Nemo dolor esse
              quisquam iure ipsum corrupti, id provident, non pariatur veritatis
              similique iusto facere, atque unde rem rerum eius tenetur
              repellendus enim voluptatum odit est explicabo adipisci? Libero
              delectus possimus blanditiis sit nobis, minus quo, optio numquam
              ipsa eos suscipit atque! Sequi amet facere blanditiis dolorum
              ipsam rerum, modi veritatis minima inventore iste ipsa odit
              possimus dolore ipsum et commodi quam laudantium accusantium quod,
              assumenda voluptatibus, optio dolores explicabo consequuntur. Enim
              magnam id voluptatibus pariatur vel minima sunt dolor deleniti
              molestiae voluptate. Esse sunt atque temporibus tempore omnis
              neque praesentium soluta fugit ut cum rem, quidem dicta iste vitae
              minima tenetur sit ipsam blanditiis excepturi aut? Natus quis
              provident doloribus distinctio, at mollitia temporibus alias quasi
              recusandae, quidem, illo explicabo corrupti inventore totam magnam
              doloremque molestias excepturi nesciunt! Consequatur, ratione!
              Sint, at quasi suscipit eos laudantium asperiores esse commodi
              blanditiis, optio laborum quo dolorum ex fugit natus! Praesentium
              iure deleniti, ipsum perferendis error nostrum perspiciatis fugit
              ratione ipsa cupiditate temporibus. Vitae veniam necessitatibus
              illum possimus aspernatur totam, pariatur, voluptatem omnis odio
              optio, aperiam eos in eius accusamus aliquam ea laudantium
              incidunt cupiditate sequi nisi nesciunt? Amet, praesentium
              reiciendis ratione possimus similique ut eum adipisci aspernatur,
              nihil aperiam odit laudantium saepe, quaerat veritatis quo facere!
              Labore, fuga. Consequatur sed magni nemo, porro ipsam quia quasi!
              Voluptate ducimus illum molestiae deserunt accusamus libero et
              modi pariatur minima soluta, corrupti quo. Sunt, atque qui modi
              est culpa animi nesciunt debitis nostrum blanditiis. Accusantium
              quos, velit consectetur quas at expedita non.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
