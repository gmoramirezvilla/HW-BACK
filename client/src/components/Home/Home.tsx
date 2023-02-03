import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signup, login } from './HomeAPI';
import { HomeContainer } from '../../StyledComponents';

const Home = () => {
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await login(emailLogin, passwordLogin)
        .then((response) => {
          console.log("login successful", response);
          setEmailLogin("");
          setPasswordLogin("");
          navigate("/books");
          window.location.reload();
        }),
        (err: any) => {
          console.log(err);
        }
    } catch (err: any) {
      console.log(err)
      setErrorMessage(err.response.data.errors[0].msg)
    }
  }

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      await signup(emailSignup, passwordSignup)
        .then((response) => {
          console.log("Sign up successful", response);
          setEmailSignup("");
          setPasswordSignup("");
          navigate("/books");
          window.location.reload();
        },
        (err) => {
          console.log(err)
          setErrorMessage(err.response.data.errors[0].msg)
        })
    } catch (err: any) {
      console.log(err)
      setErrorMessage(err.response.data.errors[0].msg)
    }
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSignup}>
        <h1>Sign up</h1>
        <label>E-mail:</label>
        <input value={emailSignup} onChange={(e) => setEmailSignup(e.target.value)}></input>
        <label>Password:</label>
        <input value={passwordSignup} onChange={(e) => setPasswordSignup(e.target.value)}></input>
        <br></br>
        <button type="submit">Sign Up</button>
      </form>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <label>Email:</label>
        <input value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)}></input>
        <label>Password:</label>
        <input value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)}></input>
        <br></br>
        <button type="submit">Login</button>
      </form>
      <div>{errorMessage}</div>
    </HomeContainer>
  )
}

export default Home;