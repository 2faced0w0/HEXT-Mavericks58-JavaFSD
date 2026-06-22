import React, { useState, useEffect } from 'react';

const HoverCarousel = ({ images, altText, className, style }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Parse images if it's a comma-separated string, or use the single string as an array of 1
  const imageList = Array.isArray(images) 
    ? images 
    : (typeof images === 'string' && images.includes(',') ? images.split(',').map(s => s.trim()) : [images]);

  useEffect(() => {
    let interval;
    if (isHovered && imageList.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
      }, 1500); // Change image every 1.5 seconds
    } else {
      setCurrentIndex(0); // Reset to first image when not hovering
    }
    return () => clearInterval(interval);
  }, [isHovered, imageList.length]);

  if (!imageList || imageList.length === 0) {
    return <div className="bg-secondary d-flex align-items-center justify-content-center" style={{ height: '200px' }}>No Image</div>;
  }

  // Use absolute path or fallback depending on how images are served
  // Assuming images are served from a static folder or full URLs
  let imgSrc = imageList[currentIndex];
  // Small hack for local testing if the URL is just a filename
  if (imgSrc && !imgSrc.startsWith('http') && !imgSrc.startsWith('/')) {
      imgSrc = `/${imgSrc}`;
  }

  return (
    <img
      src={imgSrc}
      alt={altText || 'Vehicle Image'}
      className={className}
      style={{ ...style, transition: 'opacity 0.3s ease' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default HoverCarousel;
