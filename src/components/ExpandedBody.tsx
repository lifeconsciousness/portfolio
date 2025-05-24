import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import ReactMarkdown from 'react-markdown';
import "/css/description.scss";

gsap.registerPlugin(ScrollTrigger);

interface ExpandedBodyProps {
  isCollapsing?: boolean;
  index: number;
  name: string;
}

function ExpandedBody({ isCollapsing, index, name }: ExpandedBodyProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [textSplit, setTextSplit] = useState<SplitType | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch and load markdown content
  useEffect(() => {
    const loadMarkdownContent = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`descriptions/${name}`);
        const content = await response.text();
        setMarkdownContent(content);
      } catch (error) {
        console.error('Error loading markdown:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (name) {
      loadMarkdownContent();
    }
  }, [name]);

  // Fades in the markdown text
  useEffect(() => {
    gsap.to(".expanded-body", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.05,
      ease: "power3.in"
    });
  }, [markdownContent]);


  useEffect(() => {
    if (isCollapsing && markdownContent) {

      gsap.to(".expanded-body", {
        y: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.in"
      });
    }
  }, [isCollapsing]);

  return (
    <div className="expanded-body" ref={containerRef}>
      {/* <div ref={textRef} style={{ overflow: "hidden" }}> */}
      <div ref={textRef}>
        <ReactMarkdown>
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default ExpandedBody;