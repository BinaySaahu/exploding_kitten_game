import React, { useState } from "react";
import bg_image from '../assets/card.jpeg'

const Card = ({ind,card,handleCardShow,cardClicked, setCardClicked}) => {
    // const [cardClicked, setCardClicked] = useState(false);
  return (
    <div
      className={`card card-${ind + 1} ${cardClicked === ind ? "rotating-card" : ""}`}
      style={{left:`${(ind+1)*30}px`,backgroundImage:`${cardClicked === ind?('linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.5) ),'+'url('+card.image+')'):'url('+bg_image+')'}`,width:'250px',height:'400px', color:'white'}}
      // onClick={() => {setCardClicked(!cardClicked); handleCardShow(card)}}
    >
      {" "}
      <h1 className={`${cardClicked === ind ? "rotating-text" : ""}`}>
        {cardClicked === ind && card.cardName}
      </h1>{" "}
    </div>
  );
};

export default Card;
