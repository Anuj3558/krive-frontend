import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

// Temporary data for reviews
const tempReviews = [
  { id: 1, text: "Absolutely love my custom tee! The fabric quality is amazing and the print design exceeded my expectations. Would definitely recommend!", author: "Alex M.", rating: 5 },
  { id: 2, text: "Krive's designs are one of a kind! The attention to detail is impressive and the customer service was excellent throughout.", author: "Sam L.", rating: 4 },
  { id: 3, text: "Outstanding quality and service! The shipping was fast and the product looks exactly like the pictures. Very satisfied!", author: "Jordan K.", rating: 5 },
  { id: 4, text: "My new favorite clothing brand! The fit is perfect and the designs are so unique. I've already ordered more items!", author: "Taylor R.", rating: 5 },
  { id: 5, text: "Unique designs that stand out! Every time I wear their clothes, I get compliments. The quality is worth every penny.", author: "Casey P.", rating: 4 },
  { id: 6, text: "Comfortable and stylish. Perfect! The material is breathable and the designs are trendy. Will be a repeat customer!", author: "Morgan W.", rating: 5 }
];

// Review Form Component


// Reviews Marquee Component
 const ReviewsMarquee = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (marquee) {
      const scrollWidth = marquee.scrollWidth;
      const animate = () => {
        if (marquee.scrollLeft >= scrollWidth / 2) {
          marquee.scrollLeft = 0;
        } else {
          marquee.scrollLeft += 1;
        }
        requestAnimationFrame(animate);
      };
      const animation = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animation);
    }
  }, []);

  const StarDisplay = ({ rating }) => (
    <div className="flex space-x-1 mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="py-8 overflow-hidden b">
      <div ref={marqueeRef} className="flex whitespace-nowrap py-5 overflow-hidden">
        {[...tempReviews, ...tempReviews].map((review, index) => (
          <div key={index} className="inline-block mx-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <StarDisplay rating={review.rating} />
              <p className="text-gray-800 mb-4">&ldquo;{review.text.slice(0,30)}&rdquo;</p>
              <p className="text-gray-600 font-semibold">- {review.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ReviewsMarquee