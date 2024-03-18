"use client";
import React, { useState, useEffect } from "react";

const CustomTable = ({ columnHeaders, data }) => {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    let mounted = true;

    if (data?.length > 0 && mounted) {
      setTableData(data);
    }

    return () => {
      mounted = false;
    };
  }, [data]);

  console.log(tableData);
  return (
    <div className="overflow-x-auto" style={{ maxWidth: "100%" }}>
      <div style={{ width: "100%" }}>
        <table className="table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {columnHeaders?.map((header, i) => (
                <th
                  key={header?.data + i}
                  className="border border-gray-200 px-4 py-2"
                >
                  {header?.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((row, index) => (
              <tr
                key={row.subject_code + index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                {columnHeaders?.map((columnName, columnIndex) => (
                  <td
                    key={columnName?.data + columnIndex}
                    className="border border-gray-200 px-4 py-2"
                  >
                    {row[columnName?.data]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
