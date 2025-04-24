import Gallery from "./components/Gallery";
import Navbar from "./components/Navbar";
import "/css/main.scss";

function App() {
  return (
    <>
      <Navbar />

      <div style={{ minHeight: 50 }}></div>

      <Gallery />

      <div style={{ minHeight: 300 }}></div>

      <footer>
        <button>Let's get in contact :)</button>
        <div className="flower-container">
          <img className="flower" src="/img/flower.svg" alt="flower" />
        </div>
      </footer>
    </>
  );
}

export default App;
