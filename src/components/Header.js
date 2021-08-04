import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Header() {
  const [error, setError] = React.useState("")
  const history = useHistory()
  const { currentUser, logout } = useAuth()
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  const emailValue = currentUser?(
                                  <NavDropdown title={currentUser.email} id="basic-nav-dropdown">
                                    <NavDropdown.Item>
                                      <Link to="/update-profile">
                                        Update Profile
                                      </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item variant="link" onClick={handleLogout} style={{color:"blue"}}>
                                      Log out
                                    </NavDropdown.Item>
                                  </NavDropdown>
                                ):
                                (<div>
                                  <Link to="/Login" className="btn btn-primary" style={{marginRight:"20px"}}>
                                    Login
                                  </Link>
                                  <Link to="/Signup" className="btn btn-primary">
                                    Signup
                                  </Link>
                                </div>
                                )
  

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/"> NiceRecipe </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="mr-auto">
            <Nav.Link active href="/">
              Home {error}
            </Nav.Link>
            <Nav.Link href="https://rapidapi.com/spoonacular/api/recipe-food-nutrition/details">Api Documentation</Nav.Link>
            <Nav.Link href="https://spoonacular.com/food-api">Food Api Website</Nav.Link>
            {emailValue}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
