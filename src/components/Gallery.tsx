import "../css/gallery.scss";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import projects from "../projects/projects.json"
// import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
// import { ScrollSmoother } from 'gsap-trial/ScrollSmoother';


const [numItems, setNumItems] = useState(25)
const [gap, setGap] = useState(70)
const [numColumns, setnumColumns] = useState(6)
const [itemWidth, setItemWidth] = useState(130)
const [itemHeight, setItemHeight] = useState(190)

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
const visibleItems = useRef(new Set());
const lastUpdateTime = useRef(0);
const lastX = useRef(0);
const lastY = useRef(0);
const isExpanded = useRef(false);
const activeItem = useRef(null);
const canDrag = useRef(true);
const originalPosition = useRef(null);
const expandedItem = useRef(null);
const activeItemId = useRef(null);
const titleSplit = useRef(null) as any;

const container = useRef(null);
const canvas = useRef(null);
const overlay = useRef(null);
const title = useRef(null) as any;
 

gsap.registerPlugin(useGSAP); // register any plugins, including the useGSAP hook
gsap.registerPlugin(SplitText) 

useGSAP(() => {
    // gsap code here...
}, { scope: container }); // <-- scope is for selector text (optional)

const setupTitle = (t: String) => {
  if(titleSplit) {
    titleSplit.revert();
  }
  title.innerText = t;
  titleSplit.current = new SplitText(title, {type: "words"});
  gsap.set(titleSplit.current, {perspective: 400, y: "100%"})
  // TODO: make a proper animation
}

const animateTitleIn = () => {
  gsap.to(titleSplit.current, {
    y: "0%",
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  })
}

const animateTitleOut = () => {
  gsap.to(titleSplit.current, {
    y: "-100%",
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  })
}

const updateVisibleItems = () => {
  const buffer = 2.5;
  const viewWidth = window.innerWidth * (1 + buffer);
  const viewHeight= window.innerHeight * (1 + buffer);

  const movingRight = targetX.current > currentX.current;
  const movingDown = targetY.current > currentY.current;

  const directionBufferX = movingRight ? -300 : 300;
  const directionBufferY = movingDown ? -300 : 300;

  const startColumn = Math.floor(
    (-currentX.current - viewWidth / 2 + (movingRight ? directionBufferX : 0)) / 
    (itemWidth + gap)
  );

  const endColumn = Math.floor(
    (-currentX.current + viewWidth * 1.5 + (!movingRight ? directionBufferX : 0)) / 
    (itemWidth + gap)
  );

  const startRow = Math.floor(
    (-currentY.current - viewHeight / 2 + (movingDown ? directionBufferY : 0)) / 
    (itemWidth + gap)
  );

  const endRow = Math.floor(
    (-currentY.current + viewHeight * 1.5 + (!movingDown ? directionBufferY : 0)) / 
    (itemWidth + gap)
  );

  const currentItems = new Set();

  for(let row = startRow; row <= endRow; row++){
    for(let col = startColumn; col <= endColumn; col++){
      const itemId = `${col},${row}`;
      currentItems.add(itemId);

      if(visibleItems.current.has(itemId)) continue;
      if(activeItemId.current === itemId && isExpanded) continue;

      

    }
  }
   

}



 



function Gallery() {
  return (
    <>
      <main className="container" ref={container}>
        <div className="canvas" ref={canvas}></div>
        <div className="overlay" ref={overlay}></div>
      </main>

      <div className="project-title">
        <p ref={title}></p>
      </div>
    </>
  );
}

export default Gallery;
