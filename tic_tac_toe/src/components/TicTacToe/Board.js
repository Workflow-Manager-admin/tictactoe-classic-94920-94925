import React from 'react';
import Square from './Square';

/**
 * Board - Renders the 3x3 game board
 * 
 * @param {Object} props - Component props
 * @param {Array} props.squares - Current state of the board (array of 9 elements)
 * @param {Function} props.onClick - Click handler function for squares
 * @returns {JSX.Element} The rendered board component
 */
const Board = ({ squares, onClick }) => {
  /**
   * Render a single square
   * 
   * @param {number} i - Square index
   * @returns {JSX.Element} A Square component
   */
  const renderSquare = (i) => {
    return (
      <Square 
        value={squares[i]} 
        onClick={() => onClick(i)}
      />
    );
  };

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
