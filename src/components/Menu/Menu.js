import React, { useRef } from 'react';
import './Menu.css';

export default function Menu(props) {
  const algorithmButtonRef = useRef();
	const { selectedAlgorithm } = props;
	const goButtonText = selectedAlgorithm
		? `Visualize ${selectedAlgorithm}!`
    : 'Visualize!';
  let algorithmButtonHover = false;

  const handleMenuEnter = () => {
    algorithmButtonHover = true;
    hideOrShowElement(algorithmButtonRef, algorithmButtonHover);
    console.log(algorithmButtonRef.current.className)
  }

  const handleMenuLeave = () => {
    algorithmButtonHover = false;
    hideOrShowElement(algorithmButtonRef, algorithmButtonHover);
    console.log(algorithmButtonHover);
  };

  const hideOrShowElement = (ref, shouldShow) => {
    let classes = ref.current.className.split(' ');
    if(classes[0] === ''){
      classes = [];
    }
    console.log(classes);
    if(shouldShow && classes.includes('hidden')){
      const newclasses = classes.filter(el => el !== 'hidden').join(' ');
      ref.current.className = newclasses;
    }
    if (!shouldShow && !classes.includes('hidden')) {
      classes.push('hidden');
      let newClasses = classes.length > 1 ? classes.join(' ') : classes.join('');
			ref.current.className = newClasses;
    }
    return;
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
          onClick={(e) => props.handleMenuClick(e)}
          onMouseEnter={() => handleMenuEnter()}
          onMouseLeave={() => handleMenuLeave()}
          >
					Algorithms
				</li>
        <div id='dropdown' className='hidden' ref={algorithmButtonRef}>
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