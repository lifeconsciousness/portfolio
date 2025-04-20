import "/css/main.scss";

function Navbar() {
  return (
    <>
      <nav>
        <div className="logo">
          <a href="http://" target="_blank" rel="noopener noreferrer"> Maksym Tovstolis</a>
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
