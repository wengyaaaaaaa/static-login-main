import React, { useState } from "react";
import supabase from "./supabaseClient";

function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null); // 存儲當前登入的使用者資料

  // 處理登入
  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("account", account)
      .eq("password", password)
      .single();

    if (error) {
      setErrorMessage("登入失敗，請檢查帳號和密碼");
    } else {
      setCurrentUser(data);  // 登入成功，設置當前使用者資料
      setErrorMessage("");    // 清除錯誤訊息
    }
  };

  // 處理更新使用者資料
  const handleUpdate = async () => {
    const { data, error } = await supabase
      .from("users")
      .update({
        account,
        password,
      })
      .eq("id", currentUser.id);

    if (error) {
      setErrorMessage("更新失敗，請再試一次！");
    } else {
      setCurrentUser(data[0]);
      setErrorMessage("資料更新成功！");
    }
  };

  // 處理刪除帳號
  const handleDelete = async () => {
    const { error } = await supabase.from("users").delete().eq("id", currentUser.id);
    if (error) {
      setErrorMessage("刪除帳號失敗，請再試一次！");
    } else {
      setCurrentUser(null);  // 登出使用者，清空當前使用者資料
      setErrorMessage("帳號已刪除！");
    }
  };

  if (currentUser) {
    // 如果已經登入，顯示修改和刪除功能
    return (
      <div className="container mt-5">
        <h2>修改資料</h2>
        <div className="form-group mb-3">
          <label>帳號（Email）：</label>
          <input
            type="text"
            className="form-control"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>密碼：</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <button className="btn btn-warning m-2" onClick={handleUpdate}>更新資料</button>
        <button className="btn btn-danger m-2" onClick={handleDelete}>刪除帳號</button>
      </div>
    );
  }

  // 如果沒有登入，顯示登入表單
  return (
    <div className="container mt-5">
      <h2>登入</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <label>帳號（Email）：</label>
          <input
            type="text"
            className="form-control"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>密碼：</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <button type="submit" className="btn btn-primary">登入</button>
      </form>
    </div>
  );
}

export default Login;
