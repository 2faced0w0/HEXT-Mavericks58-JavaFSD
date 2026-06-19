import { Link } from 'react-router-dom';
import { Carousel } from 'primereact/carousel';

// Automatically import all images placed in this directory
const heroImages = import.meta.glob('../assets/hero-carousel/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });
const imageArray = Object.values(heroImages);

const Home = () => {
  const itemTemplate = (imgSrc) => {
    return (
      <div className="text-center px-3">
        <img src={imgSrc} alt="Hero Carousel Item" className="img-fluid rounded shadow-sm" style={{ height: '400px', objectFit: 'cover', width: '100%' }} />
      </div>
    );
  };

  return (
    <div className="container mt-5 text-center">
      <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
        {imageArray.length > 0 && (
            <div className="mt-4">
              <Carousel value={imageArray} numVisible={1} numScroll={1} className="custom-carousel" circular autoplayInterval={3000} itemTemplate={itemTemplate} />
            </div>
          )}
        <div className="container-fluid py-5">

          

          <h1 className="display-5 fw-bold text-primary">Welcome to RoadReady</h1>
          <p className="col-md-8 mx-auto fs-4 text-muted">
            The simplest and most reliable way to rent a vehicle. Browse our collection and hit the road today.
          </p>
          <Link to="/vehicles" className="btn btn-primary btn-lg mt-3 mb-5">Browse Vehicles</Link>

          
        </div>
      </div>
    </div>
  );
};

export default Home;
