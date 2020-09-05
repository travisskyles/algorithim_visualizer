import React from 'react';
import './InfoContainer.css';

export default function InfoContainer(props){

  const resetMessage = () => {

  }

  return (
    <div className='info-container'>
      <div className='message_box'>
        <p>
          Hello
          {props.selectedAlgorithm
          ? `you selected ${props.selectedAlgorithm}`
          : ''}
        </p>

      </div>
      <div className='key'></div>
    </div>
  )
}