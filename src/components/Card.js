import React from "react";

function Card(props) {
  return (
    <div className="card">
      <section className="cardContents">{props.children}</section>
    </div>
  );
}

export default Card;
