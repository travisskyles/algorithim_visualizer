import React, { useRef } from 'react';
import './Menu.css';

export default function Menu(props) {
  const algorithmButtonRef = useRef();
  const dropdownRef = useRef();
	const { selectedAlgorithm } = props;
	const goButtonText = selectedAlgorithm
		? `Visualize ${selectedAlgorithm}!`
    : 'Visualize!';

  const handleMenuEnter = () => {
    addRemoveClass(algorithmButtonRef, 'add', 'menu-hover-hold');
    addRemoveClass(dropdownRef, 'remove', 'hidden');
  }

  const handleMenuLeave = () => {
    addRemoveClass(algorithmButtonRef, 'remove', 'menu-hover-hold');
    addRemoveClass(dropdownRef, 'add', 'hidden');
  };

  const handleDropDownEnter = () => {
    addRemoveClass(algorithmButtonRef, 'add', 'menu-hover-hold');
    addRemoveClass(dropdownRef, 'remove', 'hidden');

  }

  const handleDropDownLeave = () => {
    addRemoveClass(algorithmButtonRef, 'remove', 'menu-hover-hold');
    addRemoveClass(dropdownRef, 'add', 'hidden');
  }

  const addRemoveClass = (ref, addOrRemove, className) => {
    let classes = ref.current.className.split(' ');
    if(classes[0] === ''){
      classes = [];
    }
    switch (addOrRemove) {
      case 'add':
        console.log('add', className);
        if (classes.includes(className)) return;
        else if (!classes.includes(className)){
          classes.push(className);
          let newClasses = classes.length > 1 ? classes.join(' ') : classes.join('');
          ref.current.className = newClasses;
          return;
        }
        break;
      case 'remove':
        console.log('remove', className);
        if (classes.includes(className)){
          let newClasses = classes.filter((el) => el !== className);
          if (newClasses.length === 0) {
						newClasses = [];
					} else if (newClasses.length === 1) {
						newClasses.join('');
					} else if (newClasses.length > 1) {
						newClasses.join(' ');
          }
          ref.current.className = newClasses;
          return
        }
        else if (!classes.includes(className)) return;
        break;
      default:
        break;
    }
  }

	return (
		<div className='menu'>
			<ul>
				<li
					id='run-button'
					value='menu-run'
					onClick={(e) => props.handleMenuClick(e)}>
					{goButtonText}
				</li>
				<li
          className='menu-button'
          value='algorithm-null'
          ref={algorithmButtonRef}
          onClick={(e) => props.handleMenuClick(e)}
          onMouseEnter={() => handleMenuEnter()}
          onMouseLeave={() => handleMenuLeave()}
          >
					Algorithms
				</li>
        <div 
          id='dropdown' 
          className='hidden' 
          ref={dropdownRef} 
          onMouseEnter={() => handleDropDownEnter()}
          onMouseLeave={() => handleDropDownLeave()}>
          <ul>
            <li>Dijkstras</li>
            <li>A* Search</li>
          </ul>
        </div>
				<li
          className='menu-button'
          value='menu-resetBoard' 
          onClick={(e) => props.handleMenuClick(e)}>
					Reset Board
				</li>
				<li
          className='menu-button'
          value='menu-clearWalls' 
          onClick={(e) => props.handleMenuClick(e)}>
					Clear Walls
				</li>
				<li
          className='menu-button'
          value='menu-clearWeights' 
          onClick={(e) => props.handleMenuClick(e)}>
					Clear Weights
				</li>
			</ul>
		</div>
	);
}