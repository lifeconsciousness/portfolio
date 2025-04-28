import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Navbar from "./components/Navbar";
import TurbulenceEffect from "./components/TurbulenceEfect";
import "/css/main.scss";
import "/css/background.scss";
import Background from "./components/Background";

function App() {
  return (
    <>
      <Navbar />

      <Background />

      <div style={{ minHeight: 60 }}></div>

      <Gallery />


      <Footer />

      <TurbulenceEffect />
    </>
  );
}

export default App;
