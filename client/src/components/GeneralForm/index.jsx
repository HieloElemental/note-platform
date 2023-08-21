import { useState } from "react";
import { PropTypes } from "prop-types";

import "./index.css";

const GeneralForm = ({ fields, onSubmit, children }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="GeneralForm">
      {children}
      {fields.map((field, index) => (
        <div key={index} className="GeneralForm-field-box">
          {field.type === "select" ? (
            <select
              name={field.name}
              defaultValue="default"
              onChange={handleChange}
            >
              <option value="default">Seleccionar</option>
              {field.options.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              required={field.required}
              onChange={handleChange}
            />
          )}
          <label>{field.label}</label>
        </div>
      ))}
      <button className="GeneralForm-btn">Enviar</button>
    </form>
  );
};
GeneralForm.propTypes = {
  children: PropTypes.node,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      required: PropTypes.bool,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.any.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default GeneralForm;
