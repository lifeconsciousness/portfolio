import { useEffect, useRef, useState } from "react";
import SplitType from "split-type";
import gsap from "gsap";

interface ProjectTitleProps {
  title: string;
  isCollapsing?: boolean;
}

function ProjectTitle({ title, isCollapsing }: ProjectTitleProps) {
  const [displayedTitle, setDisplayedTitle] = useState(title);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const splitRef = useRef<SplitType | null>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    splitRef.current?.revert();

    const split = new SplitType(titleRef.current, { types: "words" });
    splitRef.current = split;

    gsap.set(split.words, {
      perspective: 400,
      y: "100%",
    });

    gsap.to(split.words, {
      y: "0%",
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });

    return () => {
      splitRef.current?.revert();
      splitRef.current = null;
    };
  }, [displayedTitle]);

  useEffect(() => {
    if (!isCollapsing || !splitRef.current) return;

    // Animate out, then delay update of title
    gsap.to(splitRef.current.words, {
      y: "-100%",
      duration: 0.5,
      stagger: 0.05,
      ease: "power3.in",
      onComplete: () => {
        // Delay title update until collapse animation finishes
        setTimeout(() => {
          setDisplayedTitle(title);
        }, 1000)
      },
    });
  }, [isCollapsing]);

  return (
    <h2 className="project-title" style={{ overflow: "hidden" }} ref={titleRef}>
      {displayedTitle}
    </h2>
  );
}

export default ProjectTitle;
