import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./componentStyle.css";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import Modal from "react-modal";
import { UserButton } from "@clerk/clerk-react";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    padding: "40px 20px",
  },
};

function Navbar({setStart,start}) {
  const userVal = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("user", null);
    // dispatch(logoutUser());
    navigate("/sign-in");
    console.log("logout click");
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="navbar">
      <UserButton/>
      <div>
        <a onClick={openModal} href="#">
          Rules
        </a>
        {start && <a onClick={()=>setStart(false)} href="#" style={{backgroundColor:'#ffde75'}}>
          Quit
        </a>}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}

          <button className="show-btn" onClick={closeModal}>close</button>
          <div className="modal-content">
            <h2> Rules - </h2>
            <p>
              - If the card drawn from the deck is a cat card, then the card is
              removed from the deck.
            </p>
            <p>
              - If the card is exploding kitten (bomb) then the player loses the
              game.
            </p>
            <p>
              - If the card is a defusing card, then the card is removed from
              the deck. This card can be used to defuse one bomb that may come
              in subsequent cards drawn from the deck.
            </p>
            <p>
              - If the card is a shuffle card, then the game is restarted and
              the deck is filled with 5 cards again.
            </p>
          </div>
        </Modal>
        {/* <button className="show-btn" onClick={handleLogout}>
          Logout
        </button> */}
      </div>
    </div>
  );
}

export default Navbar;
