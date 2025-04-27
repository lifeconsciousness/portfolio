import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Navbar from "./components/Navbar";
import TurbulenceEffect from "./components/TurbulenceEfect";
import "/css/main.scss";
import "/css/background.scss";

function App() {
  return (
    <>
      <Navbar />

      {/* <div className="grape-container">
          <img className="grape" src="/img/grapevine.svg" alt="flower" />
        </div>   */}

      {/* <div className="butterfly-container">
          <img className="butterfly" src="/img/butterfly0.svg" alt="flower" />
        </div>   */}

      <div id="background-svg" className="new-container">
        <img className="new" src="pillar.svg" alt="flower" />
      </div>

      {/* <div className="barbed-container">
          <img className="barbed" src="/img/barbed-wire.svg" alt="flower" />
        </div> */}

      {/* <div className="new-container">
          <img className="new" src="/img/manbookframe.svg" alt="flower" />
        </div> */}

      {/* <div className="new-container">
          <img className="new" src="/img/LeafyFrame4.svg" alt="flower" />
        </div> */}

      {/* <div className="liberty-container">
          <img className="liberty" src="/img/twolibertywomen.svg" alt="flower" />
        </div> */}

      <div style={{ minHeight: 60 }}></div>

      <Gallery />


      <Footer />

      <svg>
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            stitchTiles="stitch"
          />
          <feColorMatrix
            in="colorNoise"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
          <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
          <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
        </filter>
      </svg>

      <TurbulenceEffect />
    </>
  );
}

export default App;
