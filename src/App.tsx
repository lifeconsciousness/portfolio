import Gallery from "./components/Gallery";
import Navbar from "./components/Navbar";
import "/css/main.scss" 

function App() {
  return (
    <>
      <Navbar />

      <Gallery />

      <div style={{minHeight: 1000}}></div>

      <footer>
      </footer>
    </>
  );
}

export default App;
