import { Link } from "react-router-dom"

const Navbar = () => {

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
                            <Link to="/login">
                            <button className="btn btn-outline-success" type="submit">Login</button>
                            </Link>
                            
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar