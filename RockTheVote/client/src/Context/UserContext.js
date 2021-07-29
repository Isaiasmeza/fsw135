import React, { useState } from "react";
import axios from "axios";
export const UserContext = React.createContext();
const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function UserProvider(props) {
  const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    issues: [],
    errMsg: "",
  };
  const [userState, setUserState] = useState(initialState);
  const issueState = { userIssues: [], issues: [] };
  const [issues, setIssues] = useState(issueState);

  function handleAuthErr(errMsg) {
    setUserState((prevState) => ({
      ...prevState,
      errMsg,
    }));
  }

  function resetAuthErr() {
    setUserState((prevState) => ({
      ...prevState,
      errMsg: "",
    }));
  }

  function signup(credentials) {
    console.log(credentials);
    axios
      .post("/auth/signup", credentials)
      .then((res) => {
        const { user, token } = res.data;
        console.log(res);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }

  function login(credentials) {
    console.log(credentials);
    axios
      .post("/auth/login", credentials)
      .then((res) => {
        console.log(res);
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        getUserIssues();
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserState({
      user: {},
      token: "",
    });
  }

  function getUserIssues() {
    userAxios
      .get("/api/issue/user")
      .then((res) => {
        setIssues((prevState) => ({
          ...prevState,
          userIssues: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  function addIssue(newUser) {
    userAxios
      .post("/api/issue", newUser)
      .then((res) => {
        setIssues((prevState) => ({
          ...prevState,
          userIssues: [...prevState.userIssues, res.data],
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }
  return (
    <UserContext.Provider
      value={{ ...userState, signup, login, logout, addIssue, issues, resetAuthErr }}
    >
      {props.children}
    </UserContext.Provider>
  );
}