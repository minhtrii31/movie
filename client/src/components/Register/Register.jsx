import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { getUserByPhone, register } from "../../services/user.service";

function Register() {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function isEmailValid(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      password === "" ||
      password2 === ""
    ) {
      setError("Please fill out the form");
      return;
    } else if (password !== password2) {
      setError("Password and repeat password do not match");
    } else if (!isEmailValid(email)) {
      setError("Invalid email");
    } else {
      try {
        const success = await register(name, email, phone, password);
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
            <h3 className="text-center">REGISTER</h3>
            <form>
              <div className="mb-2">
                <label htmlFor="name" style={{ padding: "10px 0" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="email" style={{ padding: "10px 0" }}>
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
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
              <div className="mb-2">
                <label htmlFor="password2" style={{ padding: "10px 0" }}>
                  Repeat Password
                </label>
                <input
                  type="password"
                  placeholder="Enter repeat password"
                  className="form-control"
                  aria-describedby="passwordHelpBlock"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
              <div style={{ height: 30, margin: 0, padding: 10 }}>
                {error && <p className="text-danger text-center">{error}</p>}
              </div>
              <div className="d-grid" style={{ marginTop: "30px" }}>
                <button
                  className="btn buttonStyle"
                  style={{ height: 50 }}
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
              <div className="mb-2">
                <p className="text-center" style={{ marginTop: "30px" }}>
                  Have an account?{" "}
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <strong>Login</strong>
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

export default Register;
