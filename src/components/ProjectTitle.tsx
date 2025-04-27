import { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";

interface ProjectTitleProps {
  title: string;
  isCollapsing?: boolean;
}

function ProjectTitle({ title, isCollapsing }: ProjectTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const splitRef = useRef<SplitType | null>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    // Always revert previous split before splitting again
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
  }, [title]);

  useEffect(() => {
    if (!isCollapsing || !splitRef.current) return;

    gsap.to(splitRef.current.words, {
      y: "-100%",
      duration: 0.5,
      stagger: 0.05,
      ease: "power3.in",
    });
  }, [isCollapsing]);

  return (
    <h2 className="project-title" style={{ overflow: "hidden" }} ref={titleRef}>
      {title}
    </h2>
  );
}

export default ProjectTitle;
