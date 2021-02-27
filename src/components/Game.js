import { Component } from "react";
import Board from "./Board";
import Dropdown from "./Dropdown";

class Game extends Component {
  constructor(props) {
    super(props);
    this.dir = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];
    this.keys = {
      ArrowUp: 0,
      ArrowRight: 1,
      ArrowDown: 2,
      ArrowLeft: 3,
    };
    this.state = {
      r: 10,
      c: 10,
      player: [],
      walls: [],
      difficulty: "e",
      moves: 0,
      modal: false,
    };
    this.state.player = [this.state.r - 1, this.state.c - 1];
    this.state.walls = this.initWalls(this.state.r, this.state.c);
    this.createMazeGTA(this.state.walls, this.state.r, this.state.c);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  initWalls = (r, c) => {
    const walls = Array(r)
      .fill()
      .map(() =>
        Array(c)
          .fill()
          .map(() => Array(4).fill(1))
      );

    return walls;
  };

  shuffle = (arr) => {
    for (let i = arr.length - 1; i >= 0; --i) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  createMazeGTA = (walls, r, c) => {
    const C = [[r - 1, c - 1]];
    const vis = Array(r)
      .fill()
      .map(() => Array(c).fill(false));
    vis[r - 1][c - 1] = true;

    while (C.length !== 0) {
      let ind;
      if (Math.random() > 0.25) ind = C.length - 1;
      else ind = Math.floor(Math.random() * C.length);
      const [x, y] = C[ind];

      const valid_dir = [];
      for (let d = 0; d < 4; ++d) {
        const [nx, ny] = [x + this.dir[d][0], y + this.dir[d][1]];
        if (nx >= 0 && nx < r && ny >= 0 && ny < c && !vis[nx][ny])
          valid_dir.push(d);
      }

      if (valid_dir.length === 0) C.splice(ind, 1);
      else {
        const d = valid_dir[Math.floor(Math.random() * valid_dir.length)];
        const [nx, ny] = [x + this.dir[d][0], y + this.dir[d][1]];
        walls[x][y][d] = 0;
        walls[nx][ny][(d + 2) % 4] = 0;
        C.push([nx, ny]);
        vis[nx][ny] = true;
      }
    }
  };

  handleKeyDown = (e) => {
    if (e.key in this.keys) {
      const d = this.keys[e.key];
      const { r, c, player, walls, moves } = this.state;
      const [x, y] = player;
      if (x === 0 && y === 0) return;
      const [nx, ny] = [x + this.dir[d][0], y + this.dir[d][1]];
      if (nx >= 0 && nx < r && ny >= 0 && ny < c && !walls[x][y][d]) {
        this.setState({ player: [nx, ny], moves: moves + 1 });
        if (nx === 0 && ny === 0) this.setState({ modal: true });
      }
    }
  };

  setDiff = (d) => {
    this.setState({ difficulty: d });
  };

  start = () => {
    let r, c;
    switch (this.state.difficulty) {
      case "e":
        r = 10;
        c = 10;
        break;
      case "m":
        r = 15;
        c = 15;
        break;
      default:
        r = 20;
        c = 20;
    }
    const player = [r - 1, c - 1];
    const walls = this.initWalls(r, c);
    this.createMazeGTA(walls, r, c);
    this.setState({ r, c, player, walls, moves: 0 });
  };

  render() {
    const { r, c, player, walls, difficulty, modal, moves } = this.state;
    const labels = {
      e: "Easy",
      m: "Medium",
      h: "Hard",
    };
    return (
      <div className="game">
        <Board r={r} c={c} player={player} walls={walls} />
        <div className="bottom-bar">
          <Dropdown
            selected={labels[difficulty]}
            setDiff={this.setDiff}
            labels={labels}
          />
          <button className="start-btn" onClick={this.start}>
            Start
          </button>
        </div>
        {modal && (
          <div>
            <div className="modal">
              <h2>Congratulations!</h2>
              <p>You are done.</p>
              <p>You moved {moves} steps.</p>
              <button
                className="modal-btn"
                onClick={() => this.setState({ modal: false })}
              >
                Cool!
              </button>
            </div>
            <div className="overlay"></div>
          </div>
        )}
      </div>
    );
  }
}

export default Game;
