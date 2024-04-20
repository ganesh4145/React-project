import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    mail: "",
    nameValid: true,
    clicked: false,
    mailValid: true,
    nameLengthValid: true,
  };

  add = async (e) => {
    e.preventDefault();
    const { name, mail } = this.state;

    const newContact = {
      id: uuidv4(),
      name: name,
      mail: mail,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/addContact",
        newContact,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Contact added successfully");
      } else {
        console.error("Failed to add contact");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    this.setState({ name: "", mail: "" });
  };

  nameValidation = (name) => {
    return /^[a-zA-Z]+[a-zA-Z0-9. _]*$/.test(name);
  };

  mailValidation = (mail) => {
    return /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(mail);
  };

  nameLengthValidation = (name) => {
    return name.length <= 50;
  };

  handleClick = () => this.setState({ clicked: true });

  render() {
    const { name, mail, nameValid, clicked, mailValid, nameLengthValid } =
      this.state;

    const nameInputClass = nameValid
      ? "form-control"
      : "form-control is-invalid";

    const mailInputClass = mailValid
      ? "form-control"
      : "form-control is-invalid";

    const { selectedFields } = this.props;
    return (
      <div className="d-flex justify-content-center align-items-center">
        <form onSubmit={this.add}>
          {selectedFields && selectedFields.includes("Name") && (
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                className={`${nameInputClass} ${
                  clicked && name === "" ? "is-invalid" : ""
                } ${!nameLengthValid ? "form-control is-invalid" : ""}`}
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={name}
                onClick={this.handleClick}
                onChange={(e) => {
                  const newName = e.target.value;
                  this.setState({
                    name: newName,
                    nameValid: this.nameValidation(newName),
                    nameLengthValid: this.nameLengthValidation(newName),
                  });
                }}
                required
              />
              {!nameValid && (
                <div className="invalid-feedback">
                  Name can only contain alphabets, alphabets with number,
                  periods (.)
                </div>
              )}
              {!nameLengthValid && (
                <div className="invalid-feedback">
                  Name should be less than or equal to 50 characters
                </div>
              )}
            </div>
          )}
          {selectedFields && selectedFields.includes("Email") && (
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                className={`${mailInputClass} ${
                  clicked && mail === "" ? "is-invalid" : ""
                }`}
                type="email"
                id="email"
                name="email"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                placeholder="Email-ID"
                value={mail}
                onClick={this.handleClick}
                onChange={(e) => {
                  const newMail = e.target.value;
                  this.setState({
                    mail: newMail,
                    mailValid: this.mailValidation(newMail),
                  });
                }}
                required
              />
              {!mailValid && (
                <div className="invalid-feedback">
                  Please enter a valid email address
                </div>
              )}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!(nameValid && nameLengthValid && mailValid)}
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default AddContact;
