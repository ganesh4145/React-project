import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    mail: "",
  };

  add = async (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.mail === "") {
      alert("All fields are mandatory");
      return;
    }

    const newContact = {
      id: uuidv4(),
      name: this.state.name,
      mail: this.state.mail,
    };

    console.log(newContact);

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

  render() {
    return (
      <div>
        <form onSubmit={this.add}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email-ID"
              value={this.state.mail}
              onChange={(e) => this.setState({ mail: e.target.value })}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default AddContact;
