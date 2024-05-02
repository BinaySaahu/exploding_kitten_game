import React from "react";
import { useSelector } from "react-redux";

function Highscore({ highscore }) {
  let { highscores } = useSelector((state) => state.score);
  const {points} = useSelector((state)=>state.user)
  console.log("High scores: ", highscores)

  // highscores = highscores?.sort((a,b)=>a.points > b.points?1:-1)

  // function extractNameFromEmail(email) {
  //     const atIndex = email.indexOf('@');
  //     return email.substring(0, atIndex);
  // }

  return (
    <div className="highscore-cont">
      <h1>Leaderboard (Top 10)</h1>
      <div className="highscore">
        <table className="highscore_table" colspan={0}>
          <thead className="highscore_header">
            <th>Rank</th>
            <th>Name</th>
            <th>Pts</th>
          </thead>
        {highscores.slice().sort((a,b)=> b.points - a.points)?.map((user, ind) => (
            <tr className="highscore_row" key={ind}>
              <td>{ind + 1}</td>
              <td>{user.name}</td>
              <td>{user.points}</td>
            </tr>
          ))}
          
        </table>
      </div>
      <p className="your_score"><h2>Your score: </h2><h2>{points}</h2></p>
    </div>
  );
}

export default Highscore;
