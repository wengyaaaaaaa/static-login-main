import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([
    { username: "User1", account: "user1", password: "pass123", mail: "user1@example.com" },
  ]);
  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({ account: "", password: "" });
  const [editForm, setEditForm] = useState({ mail: "", password: "", username: "" });

  const handleLogin = () => {
    const user = users.find((u) => u.account === form.account && u.password === form.password);
    if (user) {
      setCurrentUser(user);
      setEditForm(user);
    } else {
      alert("Login failed");
    }
  };

  const handleRegister = () => {
    if (!form.account || !form.password) {
      alert("Account and Password are required");
      return;
    }
    if (users.some((u) => u.account === form.account)) {
      alert("Account already exists");
      return;
    }
    const newUser = { ...form, username: form.account, mail: "" };
    setUsers([...users, newUser]);
    setForm({ account: "", password: "" });
  };

  const handleUpdate = () => {
    setUsers(users.map((u) => (u.account === currentUser.account ? editForm : u)));
    setCurrentUser(editForm);
  };

  const handleDelete = () => {
    setUsers(users.filter((u) => u.account !== currentUser.account));
    setCurrentUser(null);
  };

  return (
    <div className="container">
      {!currentUser ? (
        <div className="auth-form">
          <input placeholder="Account" value={form.account} onChange={(e) => setForm({ ...form, account: e.target.value })} />
          <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      ) : (
        <div className="dashboard">
          <h2>Users List</h2>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Account</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={index}>
                  <td>{u.username}</td>
                  <td>{u.account}</td>
                  <td>{u.password}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <input placeholder="Mail" value={editForm.mail} onChange={(e) => setEditForm({ ...editForm, mail: e.target.value })} />
          <input placeholder="Password" type="password" value={editForm.password} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} />
          <input placeholder="Name" value={editForm.username} onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setCurrentUser(null)}>Logout</button>
        </div>
      )}
    </div>
  );
}