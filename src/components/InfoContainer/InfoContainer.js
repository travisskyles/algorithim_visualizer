import React from 'react';
import './InfoContainer.css';

export default function InfoContainer(props){

  const resetMessage = () => {

  }
  console.log(props);
  return (
    <div className='info-container'>
      <div className='message_box'>
        <p>
          {props.message
          ? props.message
          : ''}
        </p>

      </div>
      <div className='key'></div>
    </div>
  )
}