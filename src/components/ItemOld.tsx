// import "/css/main.scss";

import { useState } from "react";

function ItemOld({
  id,
  left,
  top,
  col,
  row,
  imgSrc,
  imgAlt,
  action,
}: {
  id: string;
  left: number;
  top: number;
  col: Number;
  row: Number;
  imgSrc: string;
  imgAlt: string;
  action: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className="item"
        data--id={id} // TODO: maybe remove this one
        id={id}
        style={{ left: left, top: top, position: "absolute" }}
        onClick={action}
      >
        <p style={{color: "black"}}>itemx</p>
        <img src={imgSrc} alt={imgAlt} />
        {expanded && <div className="expanded-item"></div>}
      </div>
    </>
  );
}

export default ItemOld;
