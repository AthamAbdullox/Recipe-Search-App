import React from "react"
import Signup from "./authComponents/Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./authComponents/Login"
import PrivateRoute from "./authComponents/PrivateRoute"
import ForgotPassword from "./authComponents/ForgotPassword"
import UpdateProfile from "./authComponents/UpdateProfile"
import RecipeInform from "./RecipeInform"
import Header from "./Header"
import './App.css'


function App() {
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100">
          <Router>
            <AuthProvider>
            <Header />
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/recipe-Inform" component={RecipeInform} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </>
  )
}

export default App