import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./Components/Navbar.js";
import Auth from "./Components/Auth.js";
import Profile from "./Components/Profile.js";
import Public from "./Components/public.js";
import { UserContext } from "./Context/userContext.js";
import ProtectedRoute from './Components/protectedRoute';
import "./Styles.css"
export default function App() {
  const { token, logout } = useContext(UserContext);
  return (
    <div>
      <Navbar logout={logout} token={token} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (token ? <Redirect to="/profile" /> : <Auth />)}
        />
        <ProtectedRoute
          exact
          component={Profile}
          redirectTo="/"
          token={token}
          path="/profile"
        />
        <ProtectedRoute
          exact
          component={Public}
          redirectTo="/"
          token={token}
          path="/public"
        />
      </Switch>
    </div>
  );
}