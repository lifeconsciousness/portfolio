// import "/css/main.scss";

function Item({
  id,
  left,
  top,
  col,
  row,
  imgSrc,
  imgAlt,
  action,
}: {
  id: String;
  left: string;
  top: string;
  col: Number;
  row: Number;
  imgSrc: string;
  imgAlt: string;
  action: () => void
}) {
  return (
    <>
      <div className="item" data--id={id} style={{left: left, top: top}} onClick={action}>
        <img src={imgSrc} alt={imgAlt} />
      </div>
    </>
  );
}

export default Item;
