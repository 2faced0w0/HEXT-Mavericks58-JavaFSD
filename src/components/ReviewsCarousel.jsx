import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import ResponsiveStarRating from './ResponsiveStarRating';
import api from '../services/api';

const ReviewsCarousel = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchTopReviews = async () => {
      try {
        const response = await api.get('/reviews/top');
        if (response.status === 200 && response.data) {
          setReviews(response.data);
        }
      } catch (error) {
        console.error("Failed to load top reviews", error);
      }
    };
    fetchTopReviews();
  }, []);

  const reviewTemplate = (review) => {
    return (
      <div className="card m-3 border-warning border border-2 bg-dark" style={{ minHeight: '160px' }}>
        <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
          <ResponsiveStarRating rating={review.rating} maxStars={5} />
          <p className="mt-3 mb-1 font-italic text-white">"{review.comments}"</p>
          <small className="text-warning fw-bold mt-auto">- {review.customerName || 'Verified Customer'}</small>
        </div>
      </div>
    );
  };

  if (!reviews || reviews.length === 0) return null;

  const responsiveOptions = [
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '991px', numVisible: 2, numScroll: 1 },
    { breakpoint: '767px', numVisible: 1, numScroll: 1 }
  ];

  return (
    <div className="container-fluid py-5 bg-black" style={{ borderTop: '2px solid #333' }}>
      <h2 className="text-center text-warning mb-4 text-uppercase fw-bold" style={{ letterSpacing: '2px' }}>What Our Customers Say</h2>
      <div className="container">
        <Carousel 
          value={reviews} 
          numVisible={3} 
          numScroll={1} 
          responsiveOptions={responsiveOptions} 
          className="custom-carousel" 
          circular 
          autoplayInterval={4000} 
          itemTemplate={reviewTemplate} 
        />
      </div>
    </div>
  );
};

export default ReviewsCarousel;
