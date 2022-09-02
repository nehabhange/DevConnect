import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
const TextFeildGroup = ({
  name,
  placeholder,
  value,
  label,
  errors,
  info,
  type,
  onChange,
  disabled}
) => {
 
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
};

TextFeildGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  errors: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
};

TextFeildGroup.defaultProps = {
  type: "text",
};
export default TextFeildGroup;


