import React from "react";
import { Checkbox } from "./Table/CheckBox";

function GlobalColumnToggle({ getToggleHideAllColumnsProps, allColumns }) {
  return (
    <div>
      <div>
        <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
      </div>
      {allColumns.map((column) => (
        <div key={column.id}>
          <label>
            <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
            {column.Header}
          </label>
        </div>
      ))}
      <br />
    </div>
  );
}

export default GlobalColumnToggle;
