import React from 'react';
import { IconContext } from 'react-icons';
import { FaStarOfLife } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import './InfoContainer.css';

export default function InfoContainer(props) {
	return (
		<IconContext.Provider value={{ size: '20px', className: 'icon' }}>
			<div className='info-container'>
				<div className='message_box'>
					<p id='message-text'>{props.message ? props.message : ''}</p>
				</div>
				<div className='key'>
					<div>
						<div className='key-item-wrapper'>
							<p className='key-text'>Start - </p>
							<FaStarOfLife />
						</div>
						<div className='key-item-wrapper'>
							<p className='key-text'>Finish- </p>
							<ImCross />
						</div>
					</div>
					<div>
						<div className='key-item-wrapper'>
							<p className='key-text'>Walls - </p>
							<div id='wall-key'></div>
						</div>
						<p className='key-text'>
							Weights - Hold 'W' and Click to add weight
						</p>
					</div>
				</div>
			</div>
		</IconContext.Provider>
	);
}
