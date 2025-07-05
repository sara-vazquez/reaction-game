import React, { useState, useEffect } from 'react'
import './App.css'
import Button from './components/Button/Button'

function App() {
  const [circleColor, setCircleColor] = useState ('#ff8400');
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);

  const startGame = () => {
    setReactionTime(null);
    setCircleColor('#ff8400');

    const randomDelay = Math.floor(Math.random() * 500) + 1000;

    setTimeout(() => {
      setCircleColor('#0b0829');
      setStartTime(Date.now())
    }, randomDelay);
  };

  const handleCircleClick = () => {
    if (circleColor === '#0b0829' && startTime) {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);

      if (bestTime === null || time < bestTime) {
        setBestTime(time);
        localStorage.setItem('bestTime', time.toString());
      }

      setBestTime(prev => (prev === null || time < prev ? time : prev));
      setCircleColor('#ff8400');
      setStartTime(null);
    }
  };

  useEffect(() => {
    const storedBest = localStorage.getItem('bestTime');
    if(storedBest !== null) {
      setBestTime(Number(storedBest));
    }
  }, []);

  return (
    <>
      <h1>Juego de reacción 🎯</h1>
      <div className="instructions">
        <h4>Cuando  el círculo se ponga azul 
          ¡haz clic lo más rápido que puedas 👟💨! </h4>
      </div>
      <div className="wavy-circle-container" onClick={handleCircleClick}>
      <div className="wavy-circle" style={{ backgroundColor: circleColor }}></div>
      </div>
      <div className="buttonAction">
        <Button onClick={startGame}/>
      </div>
      <div className="text-content">
        <p className="info">⏱ Tiempo de reacción: {reactionTime ? `${reactionTime} ms` : '—'}</p>
        <p className="ranking"> 🏆 🙌🏼 Mejor tiempo: {bestTime ? `${bestTime} ms` : '—'}</p>
      </div>
    </>
  );
}

export default App
