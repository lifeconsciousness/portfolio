import "/css/main.scss";
import { useState, useEffect } from "react";

function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        // width: '100%',
        transition: 'transform 0.3s ease-in-out',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      }}>
        <div className="logo">
          <a href="http://" target="_blank" rel="noopener noreferrer">Maksym Tovstolis</a>
        </div>

        <div className="links">
          <ul className="socials">
            <li><a href="">about</a></li>
            <li><a href="">github</a></li>
            <li><a href="">linkedin</a></li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;