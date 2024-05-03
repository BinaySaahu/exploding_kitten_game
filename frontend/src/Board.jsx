import React, { useState, useEffect } from "react";
import "./Board.css";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { updateScore, setUser } from "./redux/slices/userSlice";
import Highscore from "./components/Highscore";
import Card from "./components/Card";
import LostModal from "./components/LostModal";
import WinModal from "./components/WinModal";
import cat_card from "./assets/cat_card.jpeg";
import shuffle_card from "./assets/shuffle_img.jpeg";
import exploding_card from "./assets/exploding_card.jpeg";
import diffuse_card from "./assets/diffuse_card.jpeg";
import { addScore, removeScore, setScores } from "./redux/slices/score";
import axios from "axios";
import { BASE_URL } from "./utils";

function Board() {
  const [deck, setDeck] = useState([]);
  const [diffuseCardCount, setDiffuseCardCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [explodeAction, setExplodeAction] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [cardIsShowing, setCardIsShowing] = useState(false);
  const [cardClicked, setCardClicked] = useState(-1);
  const [start, setStart] = useState(false);
  const [modalOpenLost, setModalOpenLost] = useState(false);
  const [modalOpenWin, setModalOpenWin] = useState(false);
  const [userDet, setUserDet] = useState()


  const {user} = useUser();
  console.log("Current user: ",user)

  const dispatch = useDispatch();

  const highscore = useSelector((state) => state.score);
  const User = useSelector((state) => state.user);

  const storeData = async ()=>{
    const res = await axios.post(`${BASE_URL}/registerUser`,userDet);
    if(res.status === 200){
      console.log(res.data)
      dispatch(setUser(res.data.userData))
    }
  }
  
  const loadData = async ()=>{
    
    const res = await axios.get(`${BASE_URL}/getData`)
    if(res.status === 200){
      console.log(res.data)
      dispatch(setScores(res.data.users))
    }

  }

  const updateInDatabase = async ()=>{

    const res = await axios.post(`${BASE_URL}/updateScore`,{email:User.email,points:User.points})
    console.log(res.data)
    if(res.status === 200){
      console.log("Score updated successfully");
    }

  }
  const initializeDeck = () => {
    const cards = [
      {
        cardName: "Cat card",
        cardTitle: "what title, fuck title",
        image: cat_card,
      },
      {
        cardName: "Defuse card",
        cardTitle: "second card title",
        image: diffuse_card,
      },
      {
        cardName: "Shuffle card",
        cardTitle: "third card title",
        image: shuffle_card,
      },
      {
        cardName: "Exploding cat card",
        cardTitle: "forth card title",
        image: exploding_card,
      },
    ];
    const tempDeck = [];
    let map = [0, 0, 0, 0];

    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    for (let i = 0; i < 5; i++) {
      let rand_index = getRandomInt(0, cards.length - 1);
      tempDeck.push(cards[rand_index]);
    }

    return tempDeck;
  };

  const restartGame = () => {
    // window.location.reload();
    const tempDeck = initializeDeck();
    console.log(tempDeck);
    setDeck(tempDeck);
    setDiffuseCardCount(0);
    // dispatch(fetchHighscore());
    setModalOpenWin(false);
    setModalOpenLost(false);
    setGameOver(false);
    setGameWon(false);
    setCardClicked(-1);
  };

  const handleExplodingKitten = () => {
    const tempDeck = [...deck];
    tempDeck.pop();

    if (deck.length === 1) {
      dispatch(addScore({email:userDet.email}));
      dispatch(updateScore("add"))
      //updateInDatabase()
      setGameWon(true);
      setModalOpenWin(true);
    } else {
      setDiffuseCardCount((prev) => prev - 1);
      setDeck(tempDeck);
      setExplodeAction(false);
    }
  };

  //Pop the last card ->  check what it is -> take appropriate action
  const handleCardShow = (card) => {
    const tempDeck = [...deck];
    const currCard = tempDeck[tempDeck.length - 1];
    setCurrentCard(currCard);
    setCardIsShowing(true);
    setTimeout(() => {
      if (
        tempDeck.length == 1 &&
        currCard.cardName != "Shuffle card" &&
        currCard.cardName != "Exploding cat card"
      ) {
        setGameWon(true);
        setModalOpenWin(true);
        dispatch(addScore({email:userDet.email}))
        dispatch(updateScore({query: 'add'}));
        //updateInDatabase()
      }

      if (currCard.cardName == "Cat card") {
        //remove card from deck
        tempDeck.pop();
        setDeck(tempDeck);
      } else if (currCard.cardName == "Defuse card") {
        setDiffuseCardCount((prev) => prev + 1);
        tempDeck.pop();
        setDeck(tempDeck);
      } else if (currCard.cardName == "Shuffle card") {
        restartGame(); //Restart Game
      } else if (currCard.cardName == "Exploding cat card") {
        //exploding kitten card
        if (diffuseCardCount > 0) {
          //if player has any diffuse cards
          //Game over
          setExplodeAction(true);
        } else {
          dispatch(updateScore({query:'remove'}))
          dispatch(removeScore({email:userDet.email}))
          //updateInDatabase();
          setModalOpenLost(true);
          setGameOver(true);
        }
      }
      setCurrentCard(null); // set currentCard to null after 2.5 seconds
      setCardIsShowing(false);
    }, 2500);
  };

  useEffect(() => {
    const tempDeck = initializeDeck();
    console.log(tempDeck);
    setDeck(tempDeck);
  }, []);
  useEffect(()=>{
      storeData()
      loadData();
  },[userDet])
  useEffect(()=>{
    const obj = {
      email: user.primaryEmailAddress.emailAddress,
      name:user.fullName
    }
    setUserDet(obj)
    // if(userDet){
    //   storeData()
    //   loadData();
    // }
  },[user])
  console.log(deck);
  return (
    <>
      <Navbar setStart = {setStart} start={start}/>
      {modalOpenLost && (
        <LostModal
          modalOpen={modalOpenLost}
          setModalOpen={setModalOpenLost}
          restartGame={restartGame}
        />
      )}
      {modalOpenWin && (
        <WinModal
          modalOpen={modalOpenWin}
          setModalOpen={setModalOpenWin}
          restartGame={restartGame}
        />
      )}
      <div className="board">
        {!start ? (
          <button onClick={() => setStart(true)} style={{maxHeight:'40px', margin:'auto',backgroundColor:'#f74c3c',color:'white',font:'extrabold'}}>Start the game</button>
        ) : (
          <div className = "main_board">
            <div className="container">
              <div className="diffuse_section">
                <h2>Diffuse Cards Available - {diffuseCardCount}</h2>
                {explodeAction && (
                  // <button onClick={handleExplodingKitten}>useDiffuse</button>
                  <button onClick={handleExplodingKitten} class="game-button">
                    Use diffuse
                  </button>
                )}
              </div>
              <div className="card_parent">
                <div className="card-cont">
                  {deck &&
                    deck.map((card, ind) => (
                      <>
                        <div
                          onClick={() => {
                            setCardClicked(ind);
                            handleCardShow();
                          }}
                          key={ind}
                        >
                          <Card
                            key={ind}
                            ind={ind}
                            card={card}
                            handleCardShow={handleCardShow}
                            cardClicked={cardClicked}
                            setCardClicked={setCardClicked}
                          />
                        </div>
                      </>
                    ))}
                </div>
              </div>

              {/* {currentCard && (
              <div className="active-card">{currentCard.cardName}</div>
            )} */}

              {/* {!cardIsShowing && (
              <button className="show-btn" onClick={handleCardShow}>
                show card
              </button>
            )} */}
            </div>

            <Highscore highscore={highscore} />
          </div>
        )}
      </div>
    </>
  );
}

export default Board;
