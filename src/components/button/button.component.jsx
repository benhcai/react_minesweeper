import "./button.style.css";
import { Fragment } from "react";

const Button = (props) => {
  const handleStyle = () => {
    const buttonStyle = {
      display: "inline-block",
      borderRadius: "4px",
      margin: 0,
      padding: "4px 8px",
      width: "fit-content",
      border: "1px solid white",
    };
    return { ...buttonStyle, ...props.style };
  };
  const handleClick = () => {
    if (!props.onClick) return;
    props.onClick();
  };
  const handleRender = () => {
    return (
      <button
        style={handleStyle()}
        className={`${props.className ?? ""} button`}
        onClick={handleClick}
      >
        {props.children}
      </button>
    );
  };
  return <Fragment>{handleRender()}</Fragment>;
};

export default Button;
