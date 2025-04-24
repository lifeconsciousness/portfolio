import Gallery from "./components/Gallery";
import Navbar from "./components/Navbar";
import TurbulenceEffect from "./components/TurbulenceEfect";
import "/css/main.scss";

function App() {
  return (
    <>
      <Navbar />

      <div style={{ minHeight: 60 }}></div>

      <Gallery />

      <div style={{ minHeight: 300 }}></div>

      <footer>
        <div className="title-wrapper">
          <h1 className="title">
            <span>Let's get in contact :)</span>
          </h1>
        </div>
        <button></button>
        <div className="flower-container">
          <img className="flower" src="/img/flower.svg" alt="flower" />
        </div>
      </footer>

      <TurbulenceEffect />
    </>
  );
}

export default App;
