import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import ReactMarkdown from "react-markdown";
import "/css/description.scss";

gsap.registerPlugin(ScrollTrigger);

interface ExpandedBodyProps {
  isCollapsing?: boolean;
  description: string;
}

function ExpandedBody({ isCollapsing, description }: ExpandedBodyProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const splitInstance = useRef<SplitType | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Load markdown
  useEffect(() => {
    const loadMarkdownContent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/descriptions/${description}`);
        const content = await response.text();
        setMarkdownContent(content);
      } catch (error) {
        console.error("Error loading markdown:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (description) {
      loadMarkdownContent();
    }
  }, [description]);

  // Handle text splitting and animations
  useEffect(() => {
    if (isLoading || !markdownContent) return;

    const setup = async () => {
      await new Promise((resolve) => setTimeout(resolve, 650)); // wait a bit

      splitInstance.current?.revert();
      if (textRef.current) {
        splitInstance.current = new SplitType(textRef.current, {
          types: "lines",
        });

        gsap.set(splitInstance.current.lines, {
          y: 50,
          opacity: 0,
        });

        if (containerRef.current) {
          containerRef.current.classList.add("is-ready");
        }

        splitInstance.current.lines?.forEach((line) => {
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
    };

    setup();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      splitInstance.current?.revert();
      splitInstance.current = null;
    };
  }, [markdownContent, isLoading]);

  // Handle collapse animation
  useEffect(() => {
    if (isCollapsing && splitInstance.current?.lines) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      gsap.to(splitInstance.current.lines, {
        y: 100,
        opacity: 0,
        duration: 0.1,
        stagger: 0.05,
        ease: "power3.in",
      });
    }
  }, [isCollapsing]);

  return (
    <div className="expanded-body" ref={containerRef}>
      <div ref={textRef} style={{ overflow: "hidden" }}>
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ExpandedBody;
