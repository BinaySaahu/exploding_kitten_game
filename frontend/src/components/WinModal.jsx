import React from 'react'
import win_image from '../assets/win.jpeg'

const WinModal = ({modalOpen, setModalOpen, restartGame}) => {
  return (
    <div className="lost-modal">
      <div className="modal-content">
        <img src={win_image} alt="Dejected Character" height={20} width={20}/>
        <h2>Great Job!</h2>
        <p>You won!</p>
        {/* <p>Tip: Aim for the center of the target for bonus points.</p> */}
        <div className="buttons">
          <button onClick={()=>{setModalOpen(!modalOpen); restartGame()}}>Close</button>
          {/* <button onClick={restartGame}>Close</button> */}
        </div>
      </div>
    </div>
  )
}

export default WinModal
