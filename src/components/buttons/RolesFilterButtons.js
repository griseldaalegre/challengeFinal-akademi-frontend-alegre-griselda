import React from "react";

const RoleFilterButtons = ({ selectedRole, onChange }) => {
  const roles = [
    { label: "Todos los roles", value: "" },
    { label: "Super Admin", value: "superadmin" },
    { label: "Student", value: "student" },
    { label: "Professor", value: "professor" },
  ];

  return (
    <div className="ui buttons" style={{ marginLeft: "1rem" }}>
      {roles.map((role) => (
        <button
          key={role.value}
          className={`ui button ${selectedRole === role.value ? "active" : ""}`}
          onClick={() => onChange(role.value)}
          type="button"
        >
          {role.label}
        </button>
      ))}
    </div>
  );
};

export default RoleFilterButtons;
