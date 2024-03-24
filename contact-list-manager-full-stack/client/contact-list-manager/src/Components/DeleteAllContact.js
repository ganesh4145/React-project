import React from "react";
import axios from "axios";

function DeleteAllContact() {
  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all contacts?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/deletecontactall`);
        console.log("All contacts deleted");
      } catch (error) {
        console.error("Error deleting contacts:", error);
      }
    }
  };

  return (
    <div className="text-center mt-3">
      <button className="btn btn-danger" onClick={handleDeleteAll}>
        Delete All
      </button>
    </div>
  );
}

export default DeleteAllContact;
