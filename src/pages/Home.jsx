import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5 text-center">
      <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-primary">Welcome to RoadReady</h1>
          <p className="col-md-8 mx-auto fs-4 text-muted">
            The simplest and most reliable way to rent a vehicle. Browse our collection and hit the road today.
          </p>
          <Link to="/vehicles" className="btn btn-primary btn-lg mt-3">Browse Vehicles</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
