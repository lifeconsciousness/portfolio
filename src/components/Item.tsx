// import "/css/main.scss";
import Portrait from "/portrait.jpg";

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
    <div className={`item ${className} ${index}`} style={style} onClick={onExpand}>
      <p
        style={{
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: 4,
          paddingLeft: 4,
        }}
      >
        {name}
        {isExpanded && (
          <img style={{ width: 15, opacity: 0.9 }} src="/close.png" alt="close" />
        )}
      </p>
      <img
        src={imgSrc}
        alt={imgAlt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {isExpanded && (
        <div className="expanded-content">
          <h2>{name} </h2>
          <p>Additional information about the project... </p>
          {/* Add more content here */}
        </div>
      )}
    </div>
  );
}

export default Item;
