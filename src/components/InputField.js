import React from "react";

const InputField = ({
  name,
  type,
  label,
  value,
  onChange,
  onClick,
  error,
  required,
}) => {
  const inputProps = {
    type,
    name,
    value,
    onChange,
    onClick,
    required,
    className: `${type} ${error ? "error" : ""}`,
  };

  if (type === "checkbox") {
    inputProps.checked = value;
  }

  return (
    <div className="input__wrapper">
      {label && <label className="input_label">{label}</label>}
      {type === "textarea" ? (
        <textarea {...inputProps}></textarea>
      ) : (
        <input {...inputProps} />
      )}
      {error && <small className="error_message">{error}</small>}
    </div>
  );
};

export default InputField;
