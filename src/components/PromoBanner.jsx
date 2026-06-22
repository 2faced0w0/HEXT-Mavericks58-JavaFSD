import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PromoBanner = () => {
  const [promo, setPromo] = useState(null);

  useEffect(() => {
    const fetchActivePromo = async () => {
      try {
        const response = await api.get('/promotions/active-banner');
        if (response.data) {
          setPromo(response.data);
        }
      } catch (error) {
        // No active promo or error, ignore
      }
    };
    fetchActivePromo();
  }, []);

  if (!promo) return null;

  return (
    <div className="bg-primary text-dark text-center py-2 fw-bold d-flex justify-content-center align-items-center" style={{ position: 'sticky', top: 0, zIndex: 1050 }}>
      <i className="pi pi-tag me-2"></i>
      <span>SPECIAL OFFER: Use code <span className="badge bg-dark text-primary ms-1 me-1 fs-6">{promo.promoCode}</span> for {promo.discountPercentage}% OFF!</span>
    </div>
  );
};

export default PromoBanner;
