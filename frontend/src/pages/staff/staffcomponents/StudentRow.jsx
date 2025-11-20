import React from 'react';

function StudentRow({ student }) {
  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.age}</td>
      <td>{student.grade}</td>
      <td>{student.enrolled ? 'Yes' : 'No'}</td>
    </tr>
  );
}

export default StudentRow;
