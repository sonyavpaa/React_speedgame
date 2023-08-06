import "./style/App.css";
import React, { useEffect, useState } from "react";

import Circle from "./uiComp/Circle";
import Button from "./uiComp/Button";
import Outro from "./uiComp/Outro";

import startSound from "./assets/sounds/01.mp3";
import stopSound from "./assets/sounds/02.mp3";
import clickSound from "./assets/sounds/03.mp3";

import { difficultyLevels } from "./data/difficultyLevels";

let luvSound = new Audio(clickSound);
let startMusic = new Audio(startSound);
let stopMusic = new Audio(stopSound);

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const App = () => {
    const [score, setScore] = useState(0);
    const [current, setCurrent] = useState(-1);
    const [circles, setCircles] = useState([]);
    const [show, setShow] = useState(false);
    const [pace, setPace] =  useState(1500);
    const [rounds, setRounds] = useState(0);
    const [gameon, setGameOn] = useState(false);
    const [clicked, setClicked] = useState(-1);
    const [difficulty, setDifficulty] = useState("");
    const [view, setView] = useState([]);

    useEffect(() => {
      if (score > 0) setTimeout(nextCircleHandler, pace);
    }, [pace])


    window.onload = () => {
      if(window.innerWidth < 800) {
        setView(["mobile"]);
      } else setView(["desktop"])
    };
    window.onresize = () => {
      if(window.innerWidth < 800) {
        setView(["mobile"]);
      } else setView(["desktop"])
    };
  

  const clickCircle = (i) => {
    if (score < 1) setTimeout(nextCircleHandler, pace);
    clickPlay();
    if (i !== clicked) {
      if (i === current) {
        setScore(score + 1);
        setRounds(rounds - 1);
      }
      setClicked(i);
    };
    if (i !== current) {
      console.log("Booomm!! ..oh hello there :-)")
      stopHandler();
      return;
    }

  };

  const clickPlay = () => {
    if (luvSound.paused) {
      luvSound.play();
    } else {
      luvSound.currentTime = 0;
    }
  };

  const difficultyHandler = (e) => {
    setDifficulty(e.target.textContent);
    getCircles(e.target.textContent);
  };
  
  const getCircles = (level) => {
    difficultyLevels.forEach(item => {
      switch (level) {
        case item.level:
          setCircles(item.circles)
      }  
    })
  }

  const nextCircleHandler = () => {
    if (rounds >= 5) {
      stopHandler();
      return;
    }

    let nextActive;
    do {
      nextActive = randomNumber(0, 3);
    } while (nextActive === current);

    setCurrent(nextActive);
    setPace(pace * 0.97);
  };

  const refreshGame = () => {
    window.location.reload();
  };

  const startHandler = () => {
    startMusic.play();
    startMusic.loop = true;
    nextCircleHandler();
    setGameOn(true);
  };

 const stopHandler = () => {
    startMusic.pause();
    startMusic.currentTime = 0;
    stopMusic.play();
    setShow(true);
    setGameOn(false);
  };

    return (
      <div className="frame">
        <h1>Catching Luv</h1>
        {!difficulty && [
          <div key={1} className="levelsContainer">
            <h2>Choose difficulty!</h2>
            <div>
              {difficultyLevels.map((_, i) => {
               return ( <Button
                key={i}
                children={difficultyLevels[i].level}
                onClick={e => difficultyHandler(e)}
                />
               )
              })}
            </div>
          </div>,
        ]}

        <div className="game">
        {difficulty.length > 0 && [
          <h2 key={"h2"}>
            Luv catched: <span>{score}</span>
          </h2>,
          <div key={"circlesContainer"} className="circlesContainer">
             {circles.map((_, i) => {
                return (
                  <Circle
                    key={i}
                    id={i}
                    disabled={gameon}
                    onClick={() => clickCircle(i)}
                    active={current === i}
                    classes={view.toString()}
                  />
                );
              })}
            
          </div>,
          <div key={"buttonsContainer"} className="buttonsContainer">
            {!gameon && (
              <Button onClick={startHandler}>start</Button>
            )}
            {gameon && (
              <Button onClick={stopHandler}>stop</Button>
            )}
          </div>
        ]}
          {show && (
            <Outro
              onClick={refreshGame}
              score={score}
              children={<span>{`${score}`}</span>}
            />
          )}
        </div>
      </div>
    );
}

export default App;
