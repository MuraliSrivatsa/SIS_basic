import React from "react";

export default function UserTable({ data, handleEdit, handleDelete }) {
  if (data.length === 0) return <p>No records found.</p>;

  return (
    <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key.toUpperCase()}</th>
          ))}
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((val, i) => (
              <td key={i}>{val}</td>
            ))}
            <td>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)} style={{ marginLeft: "5px" }}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
