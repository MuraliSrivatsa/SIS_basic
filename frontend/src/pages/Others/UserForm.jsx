import React from "react";

export default function UserForm({ activeTab, formData, setFormData, handleAddOrEdit, editingId }) {
  const renderFields = () => {
    switch (activeTab) {
      case "students":
        return (
          <>
            <input
              placeholder="Name"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              placeholder="Class"
              value={formData.class || ""}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            />
            <input
              placeholder="Roll"
              value={formData.roll || ""}
              onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
            />
          </>
        );
      case "staff":
        return (
          <>
            <input
              placeholder="Name"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              placeholder="Subject"
              value={formData.subject || ""}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </>
        );
      case "parents":
        return (
          <>
            <input
              placeholder="Name"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              placeholder="Student"
              value={formData.student || ""}
              onChange={(e) => setFormData({ ...formData, student: e.target.value })}
            />
          </>
        );
      case "admissions":
        return (
          <>
            <input
              placeholder="Applicant"
              value={formData.applicant || ""}
              onChange={(e) => setFormData({ ...formData, applicant: e.target.value })}
            />
            <input
              placeholder="Status"
              value={formData.status || ""}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {renderFields()}
      <button onClick={handleAddOrEdit}>
        {editingId ? "Update" : "Add"} {activeTab.slice(0, -1)}
      </button>
    </div>
  );
}
