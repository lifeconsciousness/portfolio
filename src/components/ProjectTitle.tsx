import { useEffect, useRef, useState } from "react";
import SplitType from "split-type";
import gsap from "gsap";

interface ProjectTitleProps {
  title: string;
  isCollapsing?: boolean;
}

function ProjectTitle({ title, isCollapsing }: ProjectTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleSplit, setTitleSplit] = useState<SplitType | null>(null);

  const setupTitle = () => {
    if (!titleRef.current) return;

    if (titleSplit) {
      titleSplit.revert();
    }

    const newSplit = new SplitType(titleRef.current, { types: "words" });
    setTitleSplit(newSplit);

    gsap.set(newSplit.words, {
      perspective: 400,
      y: "100%",
    });
  };

  useEffect(() => {
    if (isCollapsing && titleSplit) {
      gsap.to(titleSplit.words, {
        y: "-100%",
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.in",
      });
    }
  }, [isCollapsing]);

  // Reset and re-run animation when title changes
  useEffect(() => {
    titleSplit?.revert(); // Cleanup previous split
    setTitleSplit(null); // Reset state
    setupTitle(); // Setup new split
  }, [title]);

  useEffect(() => {
    if (titleSplit) {
      gsap.to(titleSplit.words, {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    }
  }, [titleSplit]);

  

  return (
    <h2 className="project-title" style={{ overflow: "hidden" }} ref={titleRef}>
      {title}
    </h2>
  );
}

export default ProjectTitle;
