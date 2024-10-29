import React, { useState } from 'react';

const UserManagement = ({ users, setUsers }) => {
  // State to track the index of the user being edited
  const [isEditing, setIsEditing] = useState(null);
  // State to store the data of the user being edited
  const [editData, setEditData] = useState({});

  // Function to delete a user based on the index
  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index); // Remove user at the specified index
    setUsers(updatedUsers); // Update the users array
  };

  // Function to start editing a user
  const startEdit = (index) => {
    setIsEditing(index); // Set the index of the user being edited
    setEditData(users[index]); // Set the initial data to edit
  };

  // Function to save the edited user data
  const saveEdit = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index] = editData; // Update user data at the specified index
    setUsers(updatedUsers); // Update the users array
    setIsEditing(null); // Reset editing state
    setEditData({}); // Clear edit data
  };

  // Handles changes to the input for editing the username
  const handleInputChange = (value) => {
    setEditData((prev) => ({
      ...prev,
      username: value, // Update username in editData
    }));
  };

  return (
    <div className="section">
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              {isEditing === index ? (
                // Edit mode for the user at the current index
                <>
                  <td>
                    <input
                      value={editData.username} // Current username being edited
                      onChange={(e) => handleInputChange(e.target.value)} // Update input value
                    />
                  </td>
                  <td>
                    <button onClick={() => saveEdit(index)}>Save</button> {/* Save changes */}
                    <button onClick={() => setIsEditing(null)}>Cancel</button> {/* Cancel editing */}
                  </td>
                </>
              ) : (
                // Display mode for the user if not being edited
                <>
                  <td>{user.username}</td>
                  <td>
                    <button onClick={() => startEdit(index)}>Edit</button> {/* Start editing */}
                    <button onClick={() => handleDelete(index)}>Delete</button> {/* Delete user */}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
