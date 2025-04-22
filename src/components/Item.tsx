// import "/css/main.scss";

import { useState } from "react";

function Item({
  name,
  imgSrc,
  imgAlt,
  style,
}: {
  name: string;
  imgSrc: string;
  imgAlt: string;
  style: {}
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="item" style={style}>
        <p style={{ color: "black" }}>{name}</p>
        <img src={imgSrc} alt={imgAlt} />
        {expanded && <div className="expanded-item">is expanded</div>}
      </div>
    </>
  );
}

export default Item;
