import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactMarkdown from 'react-markdown';
import "/css/description.scss";

gsap.registerPlugin(ScrollTrigger);

interface ExpandedBodyProps {
  isCollapsing?: boolean;
  name: string;
}

function ExpandedBody({ isCollapsing, name }: ExpandedBodyProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [markdownContent, setMarkdownContent] = useState<string>('');

  // Fetch and load markdown content
  useEffect(() => {
    const loadMarkdownContent = async () => {
      try {
        const response = await fetch(`descriptions/${name}`);
        const content = await response.text();
        setMarkdownContent(content);
      } catch (error) {
        console.error('Error loading markdown:', error);
      } finally {
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

    document.querySelectorAll('a[href]').forEach(function (link) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
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