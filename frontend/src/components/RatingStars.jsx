import React from "react";

export default function RatingStars({
  value = 0,
  size = 20,
  onChange,     // ⭐ callback parent will receive selected rating
}) {

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          fill={value >= star ? "#FACC15" : "#E5E7EB"}
          viewBox="0 0 24 24"
          width={size}
          height={size}
          className="transition-all duration-200 cursor-pointer hover:scale-110"
          onClick={() => onChange && onChange(star)}   // 👈 CLICK WORKS NOW
        >
          <path d="M12 .587l3.668 7.568L24 9.748l-6 5.848L19.335 24 12 20.202 4.665 24 6 15.596 0 9.748l8.332-1.593z" />
        </svg>
      ))}
    </div>
  );
}
