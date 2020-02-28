import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./auth/AuthProvider";

const Root = (history :any) => {
  const { signup } = useContext(AuthContext);
  // AuthContextからsignup関数を受け取る
  // const handleSubmit = event => {
  //   event.preventDefault();
  //   const { email, password } = event.target.elements;
  //   signup(email.value, password.value, history);
  // };

  return (
    <div>
      <h1>Home</h1>
      {/* <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form> */}
    </div>
  );
};

export default withRouter(Root);