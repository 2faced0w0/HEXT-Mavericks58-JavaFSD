import { Link, useNavigate } from "react-router-dom"

const NavbarStationHead = () => {
    const navigate = useNavigate()

    const logout = ()=>{
        localStorage.clear() // deletes token and username 
        navigate("/login") //goes to login page
       // navigate("/") // goes to home page
    }
    const username = localStorage.getItem('username')

    return (
        <div>
             <header className="navbar navbar-expand-lg bg-white shadow-sm border border-light rounded-3 px-4 py-3 mb-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
            {/* <!-- Brand CMS Logo Graphic Wrapper --> */}
            <div className="cms-logo d-flex align-items-center justify-content-center fw-black bg-dark text-white rounded-2 px-3 py-1 font-monospace shadow-sm">
                CMS
            </div>
            {/* <!-- Officer Onboard Active Link --> */}
            <Link to="/station-head/officer-bonboard" className="navbar-link fw-bold text-dark fs-5 tracking-tight text-decoration-none transition-all">
                Officer Onboard
            </Link>
        </div>
        <div className="d-flex align-items-center ">
            <span className="badge bg-dark bg-opacity-10 text-dark font-monospace px-3 py-2 border border-dark border-opacity-10">
                 Welcome {username}  
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span  >
                 <button className="btn btn-danger" onClick={()=>logout()}>Logout</button>
                </span>
        </div>
         
    </header>
         </div>
    )
}

export default NavbarStationHead