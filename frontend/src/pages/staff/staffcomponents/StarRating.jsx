import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ))}
    <span className="text-sm font-medium text-gray-900 ml-1">{rating}</span>
  </div>
);

export default StarRating;
