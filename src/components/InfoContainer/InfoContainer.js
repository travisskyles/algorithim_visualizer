import React from 'react';
import './InfoContainer.css';

export default function InfoContainer(props){

  return (
    <div className='info-container'>
      Hello
      {props.selectedAlgorithm
        ? `you selected ${props.selectedAlgorithm}`
        : ''}
    </div>
  )
}