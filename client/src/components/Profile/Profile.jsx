import React, { useEffect, useState } from "react";
import { Container, Button, Col, Form, Row } from "react-bootstrap";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Heading from "../UI/Heading/Heading";
import MovieCard from "../MovieCard/MovieCard";
import { getUserWatchHistory, updateUser } from "../../services/user.service";
import { getLoggedInUser } from "../../utils/authUtils";
import useLoading from "../../hooks/useLoading";
import Loading from "../Loading/Loading";

function Profile() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(getLoggedInUser());
  const isLoading = useLoading();

  useEffect(() => {
    if (user) {
      getUserWatchHistory(user._id)
        .then((data) => {
          setHistory(data.watched);
        })
        .catch((error) => {
          console.log("Lỗi");
        });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError("Password do not match");
      return;
    }
    if (password === "" || password2 === "") {
      setError("Password empty");
      return;
    }
    const userUpdate = {
      ...user,
      password: password,
    };
    const success = await updateUser(user._id, userUpdate);

    if (success) {
      const updateUserData = {
        ...userUpdate,
      };
      localStorage.setItem("user", JSON.stringify(updateUserData));
      setError("Updated successfully");
    } else {
      setError("Fail to update");
    }
    console.log(user);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <MainLayout>
          <Container>
            <Heading name={"Update Profile"} />
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="name"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control value={user.phone} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    {error && <p className="text-danger">{error}</p>}
                    <Button
                      className="buttonStyle"
                      style={{ margin: "30px 0", textDecoration: "none" }}
                      onClick={handleUpdate}
                    >
                      Submit
                    </Button>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Container>
          <Heading name={"Watch History"} />
          <Container style={{ minHeight: "30vh" }}>
            {history.length === 0 ? (
              <h1>None</h1>
            ) : (
              <Row>
                {history.map((h) => (
                  <MovieCard key={h._id} movie={h} />
                ))}
              </Row>
            )}
          </Container>
        </MainLayout>
      )}
    </>
  );
}

export default Profile;
