import "../style/Circle.css";
import React from "react";

const Circle = (props) => {
  return (
    <div
      className={`circles ` + props.classes}
      style={{ pointerEvents: props.disabled ? "auto" : "none" }}
      onClick={props.onClick}
    >
      <img
        className={`${props.active ? "active" : ""}`}
        src={require("../assets/img/heart.png")}
        alt=""
      ></img>
    </div>
  );
};

export default Circle;
