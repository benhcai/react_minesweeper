import "./input.style.css";

const Input = ({ className, type, min, max, placeholder, value, onChange, style, ...rest }) => {
  const handleStyle = () => {
    const inputStlye = {
      display: "inline-block",
      margin: 0,
      width: "fit-content",
      border: "1px solid rgba(255, 255, 255, 0.438)",
      color: "var(--color-text)",
      borderRadius: "8px",
      padding: "8px",
    };
    return {
      ...inputStlye,
      ...style,
    };
  };

  return (
    <input
      style={handleStyle()}
      className={`${className} Input`}
      type={type}
      min={min}
      max={max}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default Input;
