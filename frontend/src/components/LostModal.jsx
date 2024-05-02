import React from 'react'
import lost_image from '../assets/lost.jpeg'

const LostModal = ({modalOpen, setModalOpen, restartGame}) => {
  return (
    <div className="lost-modal">
      <div className="modal-content">
        <img src={lost_image} alt="Dejected Character" height={20} width={20}/>
        <h2>Game Over!</h2>
        <p>Almost there! Try again for a perfect score!</p>
        <div className="buttons">
          {/* <button onClick={()=>setModalOpen(!modalOpen)}>Close</button> */}
          <button onClick={() => restartGame()}>Retry</button>
        </div>
      </div>
    </div>
  )
}

export default LostModal
