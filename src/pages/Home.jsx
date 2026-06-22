import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'primereact/carousel';
import ReviewsCarousel from '../components/ReviewsCarousel';

const heroImages = import.meta.glob('../assets/hero-carousel/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });
const imageArray = Object.values(heroImages);

const Home = () => {
  const itemTemplate = (imgSrc) => {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <img
          src={imgSrc}
          alt="Hero Carousel Item"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Dark overlay for industrial look */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.65)' }}></div>
      </div>
    );
  };

  return (
    <>
      <div className="position-relative vh-100 vw-100 overflow-hidden text-center text-light d-flex flex-column justify-content-center align-items-center">
        {/* Absolute Background Carousel */}
        <div className="position-absolute top-0 start-0 w-100 h-100 z-n1">
          {imageArray.length > 0 ? (
            <Carousel
              value={imageArray}
              numVisible={1}
              numScroll={1}
              className="custom-carousel h-100"
              circular
              autoplayInterval={4000}
              itemTemplate={itemTemplate}
              showNavigators={false}
              showIndicators={false}
            />
          ) : (
            <div className="w-100 h-100 bg-dark"></div>
          )}
        </div>

        {/* Hero Content */}
        <div className="container z-1 py-5" style={{ marginTop: '-80px' }}>
          <h1 className="display-2 fw-bolder text-white text-uppercase" style={{ letterSpacing: '4px' }}>
            Welcome to <span className="text-dark bg-warning">Road</span><span className="text-warning bg-dark">Ready</span>
          </h1>
          <p className="col-md-8 mx-auto fs-4 mt-4 mb-5 text-light fw-light">
            The premium, industrial-grade solution to vehicle rentals. Built for performance, designed for you.
          </p>
          <Link to="/vehicles" className="btn btn-primary btn-lg rounded-pill px-5 py-3 text-uppercase fw-bold industrial-shadow" style={{ letterSpacing: '1px' }}>
            Explore Fleet <i className="pi pi-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>

      <ReviewsCarousel />
    </>
  );
};

export default Home;
