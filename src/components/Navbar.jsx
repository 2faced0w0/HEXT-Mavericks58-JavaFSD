import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');
  console.log(name);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm mb-4 border-bottom border-warning border-2">
      <div className="container">
        <Link className="navbar-brand fw-bold text-warning" to="/">
          <i className="pi pi-car me-2"></i> <span className="text-dark bg-warning">Road</span><span className="text-warning bg-dark">Ready</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vehicles">Vehicles</Link>
            </li>
            {role === 'ADMIN' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin Dashboard</Link>
              </li>
            )}
            {role === 'CUSTOMER' && (
              <li className="nav-item">
                <Link className="nav-link" to="/my-reservations">My Reservations</Link>
              </li>
            )}
            {role === 'AGENT' && (
              <li className="nav-item">
                <Link className="nav-link" to="/agent">Rental Agent Dashboard</Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-warning text-dark ms-2 fw-bold" to="/signup">Sign Up</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  {role === 'CUSTOMER' ? (
                    <Link className="nav-link text-decoration-underline" to="/profile" title="View Profile">Welcome {name ? name.toString().split(' ')[0] : 'User'}</Link>
                  ) : (
                    <span className="nav-link">Welcome {name ? name.toString().split(' ')[0] : 'User'}</span>
                  )}
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-warning ms-2 fw-bold" onClick={handleLogout}><i className="pi pi-power-off me-2"></i>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
