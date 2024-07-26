import React from 'react';

interface Review {
  navItems: string;
  reviewAuthor: string;
  image: string;
}

interface ReviewProps {
  reviews?: Review[];
}

const Reviews: React.FC<ReviewProps> = ({ reviews = [{ navItems: "You are the best", reviewAuthor: "Jane Smith", image: "https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d" }] }) => {
  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index}>
          <img src={review.image} alt={`Image of ${review.reviewAuthor}`} />
          <h3>{review.navItems}</h3>
          <p>{review.reviewAuthor}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;