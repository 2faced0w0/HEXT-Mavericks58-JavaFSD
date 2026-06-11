import { Link, useNavigate } from "react-router-dom"

const NavbarOfficer = () => {

    const navigate = useNavigate()

    const logout = ()=>{
        localStorage.clear() // deletes token and username 
        navigate("/login") //goes to login page
       // navigate("/") // goes to home page
    }
    const username = localStorage.getItem('username')
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand">CMS</a>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" >Home</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <p>Welcome {username}</p>
                            <Link to="/login">
                            <button className="btn btn-outline-success" type="submit" 
                            onClick={()=>logout()}>Logout</button>
                            </Link>
                            
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavbarOfficer