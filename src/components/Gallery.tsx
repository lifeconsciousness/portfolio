import Item from "./Item";
import "/css/gallery.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import projects from "../projects/projects.json";
import { useState } from "react";

function Gallery() {
  gsap.registerPlugin(useGSAP);

  return (
    <>
      <div className="gallery">
        <Item name={"Test"} imgSrc="/img/portrait.jpg" imgAlt="first" />
      </div>
    </>
  );
}

export default Gallery;
