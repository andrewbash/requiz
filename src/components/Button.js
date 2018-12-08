import React from "react";
import PropTypes from "prop-types";

function Button({ children, onClick, className, disabled = false, ...props }) {
  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
      data-key={props["data-key"]}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  "data-key": PropTypes.string
};

export default Button;
