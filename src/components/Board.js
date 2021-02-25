import Box from "./Box";

function Board({ walls, player, r, c }) {
  const renderBox = (i, j) => (
    <Box
      walls={walls[i][j]}
      is_player={i === player[0] && j === player[1]}
      is_target={i === 0 && j === 0}
      key={`${i} ${j}`}
    />
  );

  const renderRow = (i) => {
    const row = [];
    for (let j = 0; j < c; ++j) row.push(renderBox(i, j));
    return row;
  };

  const styles = {
    gridTemplateRows: `repeat(${r}, 1fr)`,
    gridTemplateColumns: `repeat(${c}, 1fr)`,
  };

  const board = [];
  for (let i = 0; i < r; ++i) board.push(renderRow(i));
  return (
    <div className="board" style={styles}>
      {board}
    </div>
  );
}

export default Board;
