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

function GetContactList({ selectedFields }) {
  const [contactList, setContactList] = useState([]);
  const data = useMemo(() => contactList, [contactList]);

  // Columns state to hold column definitions
  const [columns, setColumns] = useState([]);

  // Fetch contact list data
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getcontact");
        setContactList(response.data.getContact);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        // You might want to set some state here to indicate the error to the user
      }
    };
    fetchContact();
  }, []);

  // Update column visibility whenever selectedFields change
  useEffect(() => {
    // Define columns based on selectedFields
    const newColumns = [
      {
        Header: "Name",
        accessor: "name",
        show: selectedFields.includes("Name"), // Check if "Name" is selected
      },
      {
        Header: "Email",
        accessor: "mail",
        show: selectedFields.includes("Email"), // Check if "Email" is selected
      },
    ];

    // Set columns state
    setColumns(newColumns);
  }, [selectedFields]);

  // Initialize table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize, globalFilter },
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

  // Render the table
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
              {headerGroup.headers.map((column) =>
                column.show ? (
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
                ) : null
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) =>
                  cell.column.show ? (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ) : null
                )}
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
    </>
  );
}

export default GetContactList;
