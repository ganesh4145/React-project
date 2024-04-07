import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import axios from "axios";
import { GlobalFilter } from "./Table/GlobalFilter";
import { Checkbox } from "./Table/CheckBox";

function UpdateContact() {
  const [contactList, setContactList] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const data = useMemo(() => contactList, [contactList]);
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "mail",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize, globalFilter, selectedRowIds },
    setGlobalFilter,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getcontact");
        setContactList(response.data.getContact);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContact();
  }, []);

  const handleUpdateClick = (contact) => {
    setSelectedContact(contact);
    setName(contact.name);
    setEmail(contact.mail);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUpdateContact = async () => {
    console.log(email);
    try {
      const updatedContact = await axios.put(
        `http://localhost:5000/update/${selectedContact._id}`,
        {
          name,
          email, // Change 'mail' to 'email'
        }
      );
      const updatedContactList = contactList.map((contact) => {
        if (contact._id === selectedContact._id) {
          return { ...contact, name, email }; // Change 'mail' to 'email'
        }
        return contact;
      });
      setContactList(updatedContactList);
      setSelectedContact(null);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleCloseClick = () => {
    setSelectedContact(null);
    setName("");
    setEmail("");
  };

  if (contactList.length === 0) {
    return <div>No contacts found.</div>;
  }

  const selectedRowCount = Object.keys(selectedRowIds).length;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table
        className="table table-bordered table-hover table-md custom-table"
        {...getTableProps()}
      >
        <thead className="text-center bg-dark text-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => handleUpdateClick(row.original)}
                style={{ cursor: "pointer" }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      {selectedRowCount === 1 && selectedContact && (
        <div>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={handleNameChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} />
          </div>
          <button onClick={handleUpdateContact}>Update</button>
          <button onClick={handleCloseClick}>Close</button>
        </div>
      )}
      {selectedRowCount !== 1 && (
        <div>
          <h2>Select exactly one row for update</h2>
        </div>
      )}
    </>
  );
}

export default UpdateContact;
