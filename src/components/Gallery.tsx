import "../css/gallery.scss";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import projects from "../projects/projects.json";
import Item from "./Item";
import SplitType from "split-type";
// import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
// import { ScrollSmoother } from 'gsap-trial/ScrollSmoother';

function Gallery() {
  const [renderedItems, setRenderedItems] = useState([]);

  const [numItems, setNumItems] = useState(25);
  const [gap, setGap] = useState(150);
  const [numColumns, setnumColumns] = useState(6);
  const [itemWidth, setItemWidth] = useState(130);
  const [itemHeight, setItemHeight] = useState(190);

  const [overlayActive, setOverlayActive] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const dragVelocityX = useRef(0);
  const dragVelocityY = useRef(0);
  const lastDragTime = useRef(0);
  const mouseHasMoved = useRef(false);
  const visibleItems = useRef(new Set<String>());
  const lastUpdateTime = useRef(0);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const isExpanded = useRef(false);
  const activeItem = useRef(null);
  const canDrag = useRef(true);
  const originalPosition = useRef({});
  const expandedItem = useRef(null);
  const activeItemId = useRef(null);
  const titleSplit = useRef(null) as any;

  const container = useRef(null);
  const canvas = useRef(null) as any;
  const overlay = useRef(null);
  const title = useRef(null) as any;

  gsap.registerPlugin(useGSAP); // register any plugins, including the useGSAP hook

  useGSAP(
    () => {
      // gsap code here...
    },
    { scope: container }
  ); // <-- scope is for selector text (optional)

  const setupTitle = (t: String) => {
    if (titleSplit) {
      titleSplit.revert();
    }
    title.innerText = t;
    titleSplit.current = new SplitType(title, { types: "words" });
    gsap.set(titleSplit.current, { perspective: 400, y: "100%" });
    // TODO: make a proper animation
  };

  const animateTitleIn = () => {
    gsap.to(titleSplit.current, {
      y: "0%",
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  };

  const animateTitleOut = () => {
    gsap.to(titleSplit.current, {
      y: "-100%",
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  };

  const updateVisibleItems = () => {
    const buffer = 2.5;
    const viewWidth = window.innerWidth * (1 + buffer);
    const viewHeight = window.innerHeight * (1 + buffer);

    const movingRight = targetX.current > currentX.current;
    const movingDown = targetY.current > currentY.current;

    const directionBufferX = movingRight ? -300 : 300;
    const directionBufferY = movingDown ? -300 : 300;

    const startColumn = Math.floor(
      (-currentX.current -
        viewWidth / 2 +
        (movingRight ? directionBufferX : 0)) /
        (itemWidth + gap)
    );

    const endColumn = Math.floor(
      (-currentX.current +
        viewWidth * 1.5 +
        (!movingRight ? directionBufferX : 0)) /
        (itemWidth + gap)
    );

    const startRow = Math.floor(
      (-currentY.current -
        viewHeight / 2 +
        (movingDown ? directionBufferY : 0)) /
        (itemWidth + gap)
    );

    const endRow = Math.floor(
      (-currentY.current +
        viewHeight * 1.5 +
        (!movingDown ? directionBufferY : 0)) /
        (itemWidth + gap)
    );

    console.log(endRow, endColumn)

    const currentItems = new Set();
    const projectList = projects.projects;

    const newItems = [] as any;

    newItems.push(
      <Item
            key={"1"}
            id={"1"}
            left={100}
            top={200}
            col={2}
            row={2}
            imgSrc={"/img/1.png"}
            imgAlt={"1"}
            action={() => {
              if (mouseHasMoved.current || isDragging.current) return;
              // handleItemClick();
            }}
          />
    );


    newItems.push(
      <Item
            key={"2"}
            id={"2"}
            left={500}
            top={0}
            col={2}
            row={2}
            imgSrc={"/img/1.png"}
            imgAlt={"1"}
            action={() => {
              if (mouseHasMoved.current || isDragging.current) return;
              // handleItemClick();
            }}
          />
    );



    // for (let row = startRow; row <= endRow; row++) {
    //   for (let col = startColumn; col <= endColumn; col++) {
    //     const itemId = `${col},${row}`;
    //     currentItems.add(itemId);

    //     if (visibleItems.current.has(itemId)) continue;
    //     if (activeItemId.current === itemId && isExpanded) continue;

    //     const left = `${col * (itemWidth + gap)}px`;
    //     const top = `${row * (itemHeight + gap)}px`;

    //     const index = Math.abs((col + row) * numColumns) % projectList.length;
    //     const project = projectList[index];
    //     const src = project?.src || "";
    //     const alt = project?.name || "";
    //     console.log(index)

    //     newItems.push(
    //       <Item
    //         key={itemId}
    //         id={itemId}
    //         left={left}
    //         top={top}
    //         col={col}
    //         row={row}
    //         imgSrc={src}
    //         imgAlt={alt}
    //         action={() => {
    //           if (mouseHasMoved.current || isDragging.current) return;
    //           // handleItemClick();
    //         }}
    //       />
    //     );

    //     visibleItems.current.add(itemId);

    //   }
    // }
    
    setRenderedItems(newItems);
    console.log("ren", renderedItems)
    // console.log(newItems)
    visibleItems.current.forEach((itemId) => {
      if (
        !currentItems.has(itemId) ||
        (activeItemId.current === itemId && isExpanded)
      ) {
        visibleItems.current.delete(itemId);
        // TODO: remove item from canvas
      }
    });

  };

  const handleItemClick = (item: any) => {
    if (isExpanded.current) {
      // TODO
      // if (expandedItem.current) closeExpandedItem();
    } else {
      expandItem(item);
    }
  };

  const expandItem = (item: any) => {
    isExpanded.current = true;
    activeItem.current = item;
    activeItemId.current = item.id;
    canDrag.current = false;

    const imgSrc = "src/img/1.png";

    setupTitle("test");

    setOverlayActive(true);

    const rect = item.getBoundingClientRect();

    originalPosition.current = {
      id: item.id,
      rect: rect,
      imgSrc: imgSrc,
    };

    // overlay add class active
    // TODO: expanded item onclick - closeExpandeditem
    // TODO: animate item
  };

  const animate = () => {
    if (canDrag.current) {
      const ease = 0.08;
      currentX.current += (targetX.current - currentX.current) * ease;
      currentY.current += (currentY.current - currentY.current) * ease;

      canvas.current.style.transform = `translate(${currentX}px, ${currentY}px)`;

      const now = Date.now();
      const distMoved = Math.sqrt(
        Math.pow(currentX.current - lastX.current, 2) +
          Math.pow(currentY.current - lastY.current, 2)
      );

      if(distMoved > 100 || now - lastUpdateTime.current > 120){
        updateVisibleItems()
        lastX.current = currentX.current;
        lastY.current = currentY.current;
        lastUpdateTime.current = now;
      }
    }

    requestAnimationFrame(animate)
  };

  // const handleDrag = () => {

  // }

  useEffect(() => {
    updateVisibleItems();
  }, [])

  useEffect(() => {
    console.log("Updated renderedItems:", renderedItems);
  }, [renderedItems]);

  return (
    <>
      <main className="container" ref={container} onMouseDown={(e) => {
        if(!canDrag) return;
        isDragging.current = true;
        mouseHasMoved.current = false;
        startX.current = e.clientX;
        startY.current = e.clientY;
      }}
      onMouseMove={(e) => {
        if(!isDragging || !canDrag) return;

        const dx = e.clientX - startX.current;
        const dy = e.clientY - startY.current;

        if(Math.abs(dx) > 5 || Math.abs(dy) > 5){
          mouseHasMoved.current = true;
        }

        const now = Date.now();
        const dt = Math.max(10, now - lastDragTime.current);
        lastDragTime.current = now;

        dragVelocityX.current = dx / dt;
        dragVelocityY.current = dy / dt;

        targetX.current += dx;
        targetY.current += dy;

        startX.current = e.clientX;
        startY.current = e.clientY;
      }}

      onMouseUp={(e) => {
        if(!isDragging.current) return;
        isDragging.current = false;

        if(canDrag.current) {
          if(Math.abs(dragVelocityX.current) > 0.1 || Math.abs(dragVelocityY.current) > 0.1){
            const movementFactor = 200;
            targetX.current += dragVelocityX.current * movementFactor;
            targetY.current += dragVelocityY.current * movementFactor;
          }
        }
      }}
      >
        <div className="canvas" ref={canvas}>
          {renderedItems}
          {/* <Item
            key={"1"}
            id={"1"}
            left={"100"}
            top={"100"}
            col={2}
            row={2}
            imgSrc={"/img/1.png"}
            imgAlt={"1"}
            action={() => {
              if (mouseHasMoved.current || isDragging.current) return;
              // handleItemClick();
            }}
          /> */}
        </div>
        {/* {overlayActive && (
          <div className="overlay" ref={overlay}>
            Hello I'm overlay
          </div>
        )} */}
      </main>

      <div className="project-title">
        <p ref={title}></p>
      </div>
    </>
  );
}

export default Gallery;
