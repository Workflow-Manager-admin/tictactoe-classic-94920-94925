import React from 'react';

/**
 * Square - Renders a single square in the Tic Tac Toe board
 * 
 * @param {Object} props - Component props
 * @param {string|null} props.value - The value to display ('X', 'O', or null)
 * @param {Function} props.onClick - Click handler function
 * @returns {JSX.Element} The rendered square component
 */
const Square = ({ value, onClick }) => {
  return (
    <button 
      className={`square ${value ? `square-${value.toLowerCase()}` : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
