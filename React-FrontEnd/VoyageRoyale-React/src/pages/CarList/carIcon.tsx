import React from "react";

const CarIcon: React.FC = () => {
  return (
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path
    d="M4 18c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-6H4v6z"
  ></path>
  <path d="M16 6l-2-2H6L4 6"></path>
  <circle cx="6" cy="18" r="2"></circle>
  <circle cx="18" cy="18" r="2"></circle>
  <path
    d="M8 6h8v2H8zM6 10h12v2H6zM6 14h12v2H6z"
    fill="currentColor"
  ></path>
</svg>
  );
};

export default CarIcon;
