import React from 'react';

const ResponsiveStarRating = ({ rating, maxStars = 5, onChange, readOnly = true }) => {
  let colorClass = "text-success"; // Green for 4, 5
  if (rating <= 2) {
    colorClass = "text-danger"; // Red for 1, 2
  } else if (rating === 3) {
    colorClass = "text-warning"; // Yellow for 3
  }

  const handleStarClick = (value) => {
    if (!readOnly && onChange) {
      onChange(value);
    }
  };

  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars.push(
        <i 
          key={i} 
          className={`pi pi-star-fill ${colorClass} me-1 ${!readOnly ? 'cursor-pointer' : ''}`} 
          style={{ fontSize: '1.2rem', cursor: !readOnly ? 'pointer' : 'default' }}
          onClick={() => handleStarClick(i)}
        ></i>
      );
    } else {
      stars.push(
        <i 
          key={i} 
          className={`pi pi-star text-secondary me-1 ${!readOnly ? 'cursor-pointer' : ''}`} 
          style={{ fontSize: '1.2rem', cursor: !readOnly ? 'pointer' : 'default' }}
          onClick={() => handleStarClick(i)}
        ></i>
      );
    }
  }

  return (
    <div className="d-flex align-items-center">
      {stars}
    </div>
  );
};

export default ResponsiveStarRating;
