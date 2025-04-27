import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import ReactMarkdown from 'react-markdown';
import "/css/description.scss";

gsap.registerPlugin(ScrollTrigger);

interface ExpandedBodyProps {
  isCollapsing?: boolean;
  description: string;
}

function ExpandedBody({ isCollapsing, description }: ExpandedBodyProps) {
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
          const response = await fetch(`descriptions/${description}`);
          const content = await response.text();
          setMarkdownContent(content);
        } catch (error) {
          console.error('Error loading markdown:', error);
        } finally {
          setIsLoading(false);
        }
      };

      if (description) {
        loadMarkdownContent();
      }
    }, [description]);


    const setupText = () => {
      if (!textRef.current) return;
  
      if (textSplit) {
        textSplit.revert();
      }
  
      const newSplit = new SplitType(textRef.current, { types: "lines" });
      setTextSplit(newSplit);
  
      gsap.set(newSplit.lines, {
        y: 50,
        opacity: 0,
      });
  
      if (containerRef.current) {
        containerRef.current.classList.add('is-ready');
      }
    };
  
    useEffect(() => {
      if (!isLoading && markdownContent) {
        setTimeout(() => {
            textSplit?.revert();
            setTextSplit(null);
            setupText();
        }, 650)
      }
    }, [markdownContent, isLoading]);

    useEffect(() => {
      if (isCollapsing && textSplit && textSplit.lines) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        
        gsap.to(textSplit.lines, {
          y: 100,
          opacity: 0,
          duration: 0.1,
          stagger: 0.05,
          ease: "power3.in"
        });
      }
    }, [isCollapsing]);
  
    useEffect(() => {
      if (textSplit && textSplit.lines) {
        textSplit.lines.forEach((line) => {
          gsap.to(line, {
            scrollTrigger: {
              trigger: line,
              start: "top bottom",
              end: "top center",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
          });
        });
      }
  
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }, [textSplit]);
  
    return (
      <div className="expanded-body" ref={containerRef}>
        <div ref={textRef} style={{ overflow: "hidden" }}>
          <ReactMarkdown>
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>
    );
  }

export default ExpandedBody;