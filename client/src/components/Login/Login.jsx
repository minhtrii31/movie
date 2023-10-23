import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import "./Login.css";
import { getUserByPhone, login } from "../../services/user.service";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (phone === "" || password === "") {
      setError("Please fill out the form");
      return;
    }
    try {
      const success = await login(phone, password);
      if (success) {
        const user = await getUserByPhone(phone);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        setError("Please check the information again");
      }
    } catch (error) {
      setError("Please check the information again");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="login template d-flex justify-content-center align-items-center">
          <div className="login-container 40-w p-5 rounded">
            <h3 className="text-center">LOGIN</h3>
            <form>
              <div className="mb-2">
                <label htmlFor="phone" style={{ padding: "10px 0" }}>
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password" style={{ padding: "10px 0" }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="form-control"
                  aria-describedby="passwordHelpBlock"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div style={{ height: 30, margin: 0, padding: 10 }}>
                {error && <p className="text-danger text-center">{error}</p>}
              </div>
              <div className="d-grid" style={{ marginTop: "30px" }}>
                <button
                  className="btn buttonStyle"
                  style={{ height: 50 }}
                  onClick={handleLogin}
                >
                  Sign in
                </button>
              </div>
              <div className="mb-2">
                <p className="text-center" style={{ marginTop: "30px" }}>
                  Don't have an account?{" "}
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    <strong>Register</strong>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default Login;
