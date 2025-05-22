import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import Board from './Board';

/**
 * TicTacToe - Main container component for the TicTacToe Classic game
 * Manages game state, logic, and layout
 * 
 * @returns {JSX.Element} The rendered TicTacToe game component
 */
const TicTacToe = () => {
  // Initial empty board (3x3 array of null values)
  const initialBoard = Array(9).fill(null);
  
  // Game state
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true); // X starts the game
  const [history, setHistory] = useState([initialBoard]);
  const [currentStep, setCurrentStep] = useState(0);
  const [gameStatus, setGameStatus] = useState('in-progress');
  
  // Player marks
  const PLAYER_X = 'X';
  const PLAYER_O = 'O';

  /**
   * Handle a square click - updates board state and checks game status
   * 
   * @param {number} index - The index of the clicked square (0-8)
   */
  const handleSquareClick = (index) => {
    // If square already filled or game over, do nothing
    if (board[index] || gameStatus !== 'in-progress') {
      return;
    }

    // Create new board state with the player's mark
    const newBoard = board.slice();
    newBoard[index] = isXNext ? PLAYER_X : PLAYER_O;

    // Update game state
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
    // Update history
    const newHistory = history.slice(0, currentStep + 1).concat([newBoard]);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
    
    // Check if the game is over
    checkGameStatus(newBoard);
  };

  /**
   * Check if the game is over (win or draw)
   * 
   * @param {Array} currentBoard - Current state of the board
   */
  const checkGameStatus = (currentBoard) => {
    const winner = calculateWinner(currentBoard);
    
    if (winner) {
      setGameStatus(`winner-${winner}`);
    } else if (isBoardFull(currentBoard)) {
      setGameStatus('draw');
    }
  };

  /**
   * Calculate the winner by checking all possible winning combinations
   * 
   * @param {Array} squares - Current state of the board
   * @returns {string|null} The winning player's mark (X or O) or null if no winner
   */
  const calculateWinner = (squares) => {
    // All possible winning combinations (rows, columns, diagonals)
    const winningLines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal top-left to bottom-right
      [2, 4, 6], // diagonal top-right to bottom-left
    ];

    // Check each winning combination
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    
    return null;
  };

  /**
   * Check if the board is full (a draw)
   * 
   * @param {Array} squares - Current state of the board
   * @returns {boolean} True if the board is full
   */
  const isBoardFull = (squares) => {
    return squares.every(square => square !== null);
  };

  /**
   * Jump to a specific move in history
   * 
   * @param {number} step - The history step to jump to
   */
  const jumpToMove = (step) => {
    setCurrentStep(step);
    setBoard(history[step]);
    setIsXNext((step % 2) === 0); // X plays on even steps
    
    // Reset game status if jumping back from a finished game
    if (gameStatus !== 'in-progress' && step < history.length - 1) {
      setGameStatus('in-progress');
    } else {
      // Check status of the board we're jumping to
      checkGameStatus(history[step]);
    }
  };

  /**
   * Reset the game to initial state
   */
  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setHistory([initialBoard]);
    setCurrentStep(0);
    setGameStatus('in-progress');
  };

  /**
   * Get the status message based on current game state
   * 
   * @returns {string} The current game status message
   */
  const getStatusMessage = () => {
    if (gameStatus.startsWith('winner')) {
      const winner = gameStatus.split('-')[1];
      return `Winner: ${winner}`;
    } else if (gameStatus === 'draw') {
      return 'Game ended in a draw!';
    } else {
      return `Next player: ${isXNext ? PLAYER_X : PLAYER_O}`;
    }
  };

  return (
    <div className="tictactoe-container">
      <h1 className="game-title">Tic Tac Toe Classic</h1>
      
      <div className="game-layout">
        <div className="game-board">
          <Board 
            squares={board} 
            onClick={handleSquareClick} 
          />
        </div>
        
        <div className="game-info">
          <div className="status">{getStatusMessage()}</div>
          
          <button 
            className="reset-button"
            onClick={resetGame}
          >
            Reset Game
          </button>
          
          <div className="game-history">
            <h3>Game History</h3>
            <ol>
              {history.map((_, step) => (
                <li key={step}>
                  <button 
                    className={`history-button ${step === currentStep ? 'active' : ''}`}
                    onClick={() => jumpToMove(step)}
                  >
                    {step === 0 ? 'Go to start' : `Go to move #${step}`}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
