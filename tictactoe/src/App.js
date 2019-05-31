import React from 'react';
import './App.css';

const X = 'X';
const O = 'O';

const getWinner = grid => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return [X, O].find(player =>
    lines.find(line => line.every(i => grid[i] === player)),
  );
};

function App() {
  const [grid, setGrid] = React.useState(new Array(9).fill(''));
  const [player, setPlayer] = React.useState(X);
  const winner = getWinner(grid);
  const play = i => {
    if (winner || grid[i]) {
      return;
    }
    const newGrid = [...grid];
    newGrid[i] = player;
    setGrid(newGrid);
    setPlayer(player === X ? O : X);
  };
  return (
    <div style={{ padding: 40 }}>
      <div
        style={{
          width: 302,
          border: '1px solid black',
          flexWrap: 'wrap',
          display: 'flex',
        }}
      >
        {grid.map((value, i) => (
          <div
            style={{
              width: 100,
              height: 100,
              border: '1px solid black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
            }}
            children={value}
            onClick={() => play(i)}
          />
        ))}
      </div>
      {winner && (
        <div style={{ fontSize: 40, marginTop: 20 }}>{winner} wins!</div>
      )}
    </div>
  );
}

export default App;
