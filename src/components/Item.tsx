// import "/css/main.scss";

import { useState } from "react";

function Item({
  index,
  name,
  imgSrc,
  imgAlt,
  style,
  onExpand,
  isExpanded,
  className,
}: {
  index: number;
  name: string;
  imgSrc: string;
  imgAlt: string;
  style: {};
  onExpand: () => void;
  isExpanded: boolean;
  className: string; 
}) {
  return (
    <div  className={`item ${className}`} style={style} onClick={onExpand}>
      <p style={{ color: "black" }}>{name}</p>
      <img src={imgSrc} alt={imgAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      
      {isExpanded && (
        <div className="expanded-content">
          <h2>{name}</h2>
          <p>Additional information about the project...</p>
          {/* Add more content here */}
        </div>
      )}
    </div>
  );
}

export default Item;
