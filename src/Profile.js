import React, { useState } from "react";
import { Link } from "react-router-dom";
import supabase from "./supabaseClient";
import "bootstrap/dist/css/bootstrap.min.css";

function Profile() {
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // 處理註冊
  const handleRegister = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("users").insert([
      { name: name, account: account, password: password },
    ]);

    if (error) {
      setMessage(`❌ 註冊失敗: ${error.message}`);
    } else {
      setMessage("✅ 註冊成功！");
      setName("");
      setAccount("");
      setPassword("");
    }
  };

  return (
    <div className="container mt-5">
      {/* 🔹 頁面最上方的導航列 */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">我的網站</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">🏠 首頁</Link>
            <Link className="nav-link active" to="/profile">📝 註冊</Link>
            <Link className="nav-link" to="/login">🔑 登入</Link>
          </div>
        </div>
      </nav>

      {/* 🔹 註冊表單 */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center mb-4">註冊帳號</h2>
              {message && <p className="alert alert-info">{message}</p>}
              <form onSubmit={handleRegister}>
                <div className="form-group mb-3">
                  <label>👤 名稱：</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>📧 帳號（Email）：</label>
                  <input
                    type="email"
                    className="form-control"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>🔒 密碼：</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">註冊</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
