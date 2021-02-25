import knight from "../assets/pubg_knight.png";
import pubg from "../assets/pubg.png";

function Box({ walls, is_player, is_target }) {
  const styles = {};
  if (walls[0]) styles.borderTop = "1px solid black";
  if (walls[1]) styles.borderRight = "1px solid black";
  if (walls[2]) styles.borderBottom = "1px solid black";
  if (walls[3]) styles.borderLeft = "1px solid black";

  return (
    <div className="box" style={styles}>
      {is_player && <img src={knight} alt="" />}
      {is_target && !is_player && <img src={pubg} alt="" />}
    </div>
  );
}

export default Box;
