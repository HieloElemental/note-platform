import { useState } from "react";
import PropTypes from "prop-types";

import Button from "./../Button/index";

import "./index.css";

const GeneralForm = ({
  fields,
  onSubmit,
  children,
  type,
  btn = { type: "", name: "Enviar" },
}) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleListChange = (listName, index, fieldName, value) => {
    setFormData((prevData) => {
      const prevList = prevData[listName] || [];
      const updatedList = [...prevList];
      updatedList[index] = {
        ...updatedList[index],
        [fieldName]: value,
      };

      return {
        ...prevData,
        [listName]: updatedList,
      };
    });
  };

  const handleAddListItem = (listName) => {
    setFormData((prevData) => ({
      ...prevData,
      [listName]: [
        ...(prevData[listName] || []),
        Object.fromEntries(
          fields
            .find((field) => field.name === listName)
            .fields.map(({ name }) => [name, ""])
        ),
      ],
    }));
  };

  const renderField = (field, index) => (
    <div key={index} className='GeneralForm-field-box'>
      {field.type === "select"
        ? renderSelectField(field)
        : field.type === "checkbox"
        ? renderCheckboxField(field)
        : field.type === "list"
        ? renderListField(field)
        : renderInputField(field)}
      <label>{field.label}</label>
    </div>
  );

  const renderSelectField = (field) => (
    <select name={field.name} defaultValue='default' onChange={handleChange}>
      <option value='default'>Seleccionar</option>
      {field.options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  const renderCheckboxField = (field, index) => (
    <div key={index} className='GeneralForm-field-box checkbox'>
      <input type='checkbox' name={field.name} onChange={handleChange} />
      <label>{field.label}</label>
    </div>
  );

  const renderListField = (field) => (
    <>
      {formData[field.name] ? (
        formData[field.name].map((listItem, listIndex) => (
          <div key={listIndex} className='GeneralForm-list'>
            {field.fields.map((listField, fieldIndex) => (
              <div
                key={fieldIndex}
                className={`GeneralForm-list-item GeneralForm-field-box ${listField.type}`}
                style={{ margin: "0 20px" }}
              >
                {listField.type === "select"
                  ? renderSelectListField(field.name, listIndex, listField)
                  : renderInputListField(field.name, listIndex, listField)}
              </div>
            ))}
          </div>
        ))
      ) : (
        <>
          <br /> <br /> <br />
        </>
      )}
      <Button type={"inline"} onClick={() => handleAddListItem(field.name)}>
        Añadir Elemento
      </Button>
      <br />
      <br />
    </>
  );

  const renderSelectListField = (listName, index, field) => (
    <select
      name={`${listName}[${index}].${field.name}`}
      defaultValue='default'
      onChange={(e) =>
        handleListChange(listName, index, field.name, e.target.value)
      }
    >
      <option value='default'>Seleccionar</option>
      {field.options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  const renderInputListField = (listName, index, field) => (
    <>
      <input
        type={field.type}
        name={`${listName}[${index}].${field.name}`}
        required={field.required}
        onChange={(e) =>
          handleListChange(listName, index, field.name, e.target.value)
        }
      />
      <label>{field.label}</label>
    </>
  );

  const renderInputField = (field) => (
    <input
      type={field.type}
      name={field.name}
      required={field.required}
      onChange={handleChange}
    />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete='off'
      className={`GeneralForm ${type ? type : ""}`}
    >
      {children}
      {fields.map(renderField)}
      <button className={`GeneralForm-btn ${btn.type ? btn.type : ""}`}>
        {btn.name || "Enviar"}
      </button>
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
      ),
    })
  ).isRequired,
  btn: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default GeneralForm;
