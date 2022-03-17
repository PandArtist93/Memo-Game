import './App.css';
import Images from './images';
import { useState } from 'react';
import { shuffle } from 'lodash';

function App() {

  const [cards, setCards] = useState(shuffle([...Images, ...Images]));
  const [clicks, setClicks] = useState(0);
  const [won, setWon] = useState(false);
  const [activeCards, setActiveCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);

  function flipCard(index) {
    if (won){
      setCards(shuffle([...Images, ...Images]));
      setFoundPairs([]);
      setWon(false);
      setClicks(0);
    }
    if (activeCards.length === 0){
      setActiveCards([index]);
    }
    if (activeCards.length === 1){
      const firstIndex = activeCards[0];
      const secondsIndex = index;
      if (cards[firstIndex] === cards[secondsIndex]){
        setFoundPairs([...foundPairs, firstIndex, secondsIndex]);
        if (foundPairs.length + 2 === cards.length){
          setWon(true);
        }
      }
      setActiveCards([...activeCards, index]);
    }
    if (activeCards.length === 2){
      setActiveCards([index]);
    }
    setClicks(clicks + 1);
  }

  return (
    <div >
      <div className='board'>
        {cards.map((card,index) => {
          const flippedToFront = (activeCards.indexOf(index) !== -1) || foundPairs.indexOf(index) !== -1;
          return (
            <div className={"card-outer " + (flippedToFront ? 'flipped' : '')}
                 onClick={() => flipCard(index)} key={'card-outer' + index}>
              <div className='card'>
                <div className='front'>
                  <img src={card} alt='card'/>
                </div>
                <div className='back' />
              </div>
            </div>       
          )}
        )}        
      </div>
      <div className='stats'>
        {won && (
          <>You won the game! Congratulations! <br /></>
        )}
        clicks: {clicks} &nbsp;&nbsp; Found Pairs: {foundPairs.length/2}
      </div>
    </div>
  );
}

export default App;
