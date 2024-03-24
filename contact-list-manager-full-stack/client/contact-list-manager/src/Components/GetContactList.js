import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

function GetContactList() {
  const [contactList, setContactList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getcontact");
        const data = response.data.getContact;
        const slice = data.slice(offset, offset + perPage);
        setContactList(slice);
        setPageCount(Math.ceil(data.length / perPage));
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContact();
  }, [offset]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage * perPage);
  };

  const filteredContacts = contactList.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.mail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Contact List</h2>
      <div className="row justify-content-center mb-3">
        <div className="col-md-6">
          <label htmlFor="search" className="form-label">
            Search:
          </label>
          <input
            type="text"
            id="search"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover table-md custom-table">
          <thead className="text-center bg-dark text-white">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.mail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row justify-content-center mt-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
        />
      </div>
    </div>
  );
}

export default GetContactList;
