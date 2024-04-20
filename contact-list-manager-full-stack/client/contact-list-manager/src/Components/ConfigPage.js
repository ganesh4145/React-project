import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfigPage = ({ onSelectFields }) => {
  const [selectedFields, setSelectedFields] = useState([]);
  const navigate = useNavigate();

  const handleSelectedField = (field) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((f) => f !== field));
    } else {
      setSelectedFields((selectedFields) => [...selectedFields, field]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedFields);
    onSelectFields(selectedFields);
    navigate("/add");
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">
            <input
              type="checkbox"
              onChange={() => handleSelectedField("Name")}
            />
            Name
          </label>
        </div>
        <div>
          <label className="form-label">
            <input
              type="checkbox"
              onChange={() => handleSelectedField("Email")}
            />
            Email
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ConfigPage;
