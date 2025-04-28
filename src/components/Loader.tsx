import { useEffect, useState } from 'react';
import '/css/loader.scss';
import projectsData from '../projects/projects.json';

interface LoaderProps {
  onFinished?: () => void;
}

function Loader({ onFinished }: LoaderProps) {
  const [isHiding, setIsHiding] = useState(false);
  const [loadedImages, setLoadedImages] = useState(0);
  const totalImages = projectsData.projects.length;

  useEffect(() => {
    const preloadImages = () => {
      projectsData.projects.forEach(project => {
        const img = new Image();
        img.src = project.filename;
        img.onload = () => {
          setLoadedImages(prev => {
            const newCount = prev + 1;
            if (newCount === totalImages) {
              setIsHiding(true);
              setTimeout(() => {
                onFinished?.();
              }, 1000);
            }
            return newCount;
          });
        };
        img.onerror = () => {
          // Count errors as loaded to prevent loader from hanging
          setLoadedImages(prev => prev + 1);
        };
      });
    };

    preloadImages();

    // Fallback timer in case something goes wrong
    const fallbackTimer = setTimeout(() => {
      setIsHiding(true);
      onFinished?.();
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, [onFinished, totalImages]);

  const progress = Math.round((loadedImages / totalImages) * 100);
//   const progress = 99;

  return (
    <div className={`loader-container ${isHiding ? 'hide' : ''}`}>
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="progress">{progress}%</div>
      </div>
    </div>
  );
}

export default Loader;