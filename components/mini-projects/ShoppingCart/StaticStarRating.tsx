import React from "react";

const StaticStarRating = ({ rating, totalStars = 5 }) => {
  // Ensure rating is between 0 and totalStars
  const validRating = Math.max(0, Math.min(rating, totalStars));

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;
        const fillPercentage = Math.min(
          100,
          Math.max(0, (validRating - index) * 100)
        );

        return (
          <div key={index} className="relative w-5 h-5 mr-1">
            {/* Empty star background */}
            <span className="absolute inset-0 text-gray-300">★</span>

            {/* Filled star with width based on percentage */}
            <div
              className="absolute inset-0 overflow-hidden text-yellow-400"
              style={{ width: `${fillPercentage}%` }}
            >
              <span>★</span>
            </div>
          </div>
        );
      })}
      <span className="ml-1 text-sm text-gray-600">
        {validRating.toFixed(1)}
      </span>
    </div>
  );
};

export default StaticStarRating;
