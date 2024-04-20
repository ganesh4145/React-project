// DeleteContact.js

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

function DeleteContact({ selectedFields }) {
  const [contactList, setContactList] = useState([]);
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
    selectedFlatRows,
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

  const handleDelete = async (id) => {
    console.log(id);

    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      fetchContact();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleDeleteAll = async () => {
    const idsToDelete = selectedFlatRows.map((row) => row.original._id); // Use _id instead of id
    console.log(idsToDelete);
    try {
      await Promise.all(
        idsToDelete.map((id) =>
          axios.delete(`http://localhost:5000/delete/${id}`)
        )
      );
      fetchContact();
    } catch (error) {
      console.error("Error deleting contacts:", error);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getcontact");
      setContactList(response.data.getContact);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
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
              <tr {...row.getRowProps()}>
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
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre> */}
      <div>
        {selectedRowCount === 0 ? (
          <button disabled>Delete</button>
        ) : selectedRowCount === 1 ? (
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(selectedFlatRows[0].original._id)} // Use _id instead of id
          >
            Delete
          </button>
        ) : (
          <button
            className="btn btn-danger"
            onClick={handleDeleteAll} // Pass handleDeleteAll directly
          >
            Delete All
          </button>
        )}
      </div>
    </>
  );
}

export default DeleteContact;
