import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Navbar from "./components/Navbar";
import TurbulenceEffect from "./components/TurbulenceEfect";
import "/css/main.scss";
import "/css/background.scss";
import Background from "./components/Background";
import { useState } from "react";
import Loader from "./components/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <Loader onFinished={() => setIsLoading(false)} />
      ) : (
        <>
          <Navbar />

          <Background />

          <div style={{ minHeight: 60 }}></div>

          <Gallery />

          <Footer />

          <TurbulenceEffect />
        </>
      )}
    </>
  );
}

export default App;
