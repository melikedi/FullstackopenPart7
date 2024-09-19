import { Navbar, Nav } from 'react-bootstrap'
import { useUserValue, useLogOutDispatch } from '../context/UserContext'
import { Link } from 'react-router-dom'
const Menu = () => {
    const user = useUserValue()
    const logout = useLogOutDispatch()
    const padding = {
        paddingRight: 5,
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/">
                            blogs
                        </Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/users">
                            users
                        </Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        {user ? (
                            <span>
                                <em> {user.name} logged in.</em>
                                <Link
                                    href="#"
                                    onClick={() => {
                                        logout()
                                    }}
                                >
                                    log out
                                </Link>
                            </span>
                        ) : null}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Menu
