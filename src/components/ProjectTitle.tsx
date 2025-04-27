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

    // Animate words in
    gsap.to(newSplit.words, {
      y: "0%",
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });
  };

  useEffect(() => {
    // Handle title changes and initial setup
    setupTitle();

    // Cleanup function
    return () => {
      titleSplit?.revert();
    };
  }, [title]);

  useEffect(() => {
    // Handle collapse animation
    if (isCollapsing && titleSplit) {
      gsap.to(titleSplit.words, {
        y: "-100%",
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.in",
      });
    }
  }, [isCollapsing, titleSplit]);

  return (
    <h2 className="project-title" style={{ overflow: "hidden" }} ref={titleRef}>
      {title}
    </h2>
  );
}

export default ProjectTitle;