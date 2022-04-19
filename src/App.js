import "./App.css";
import React, { Component } from "react";

import Circle from "./uiComp/Circle";
import Button from "./uiComp/Button";
import Modal from "./Modal";

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    current: -1,
    alertMessage: "Your silly score:",
    show: false,
    pace: 1500,
    rounds: 0,
    gameon: false,

    nextCircle: 0,
    newCircle: 0,
    img: "",
  };

  timer = undefined;

  circles = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  clickCircle = (i) => {
    if (this.state.current !== i) {
      this.stopHandler();
      return;
    }
    this.setState({
      score: this.state.score + 1,
      rounds: this.state.rounds - 1,
    });
  };

  nextCircle = () => {
    if (this.state.rounds >= 1) {
    }
    if (this.state.rounds >= 5) {
      this.stopHandler();
      return;
    }
    let nextActive;
    do {
      nextActive = randomNumber(0, 3);
    } while (nextActive === this.state.current);
    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });

    console.log("acive circle:", this.state.current);

    this.timer = setTimeout(this.nextCircle, this.state.pace);
  };

  refreshGame = () => {
    window.location.reload();
    // this.setState({
    //   show: false,
    //   score: 0,
    //   current: -1,
    // });
  };

  // startGame = () => {
  //   this.nextCircle();
  // };

  startHandler = () => {
    this.nextCircle();
    this.setState({
      gameon: true,
    });
  };

  // stopGame = () => {
  //   console.log("stopped");
  //   clearTimeout(this.timer);
  //   this.setState({
  //     show: true,
  //   });
  // };

  stopHandler = () => {
    console.log("stopped");
    clearTimeout(this.timer);
    this.setState({
      show: true,
      gameon: false,
    });
  };

  // sound(src) {
  //   this.sound = document.createElement("audio");
  //   this.sound.src = src;
  //   this.sound.setAttribute("preload", "auto");
  //   this.sound.setAttribute("controls", "none");
  //   this.sound.style.display = "none";
  //   document.body.appendChild(this.sound);
  //   this.play = function () {
  //     this.sound.play();
  //   };
  //   this.stop = function () {
  //     this.sound.pause();
  //   };
  // }

  // startGameMusic = () => {
  //   let startSound = new sound("./assets/sounds/01.mp3");
  //   startSound.play();
  // };

  // endGameMusic = () => {
  //   let endSound = new sound("./assets/sounds/02.mp3");
  //   startSound.stop();
  //   endSound.play();
  // };

  // luvPoint = () => {
  //   let luvSound = new sound("./assets/sounds/03.mp3");
  //   luvSound.play();
  // };

  render() {
    return (
      <div className="game">
        <h1>Catching Luv</h1>
        <h2>
          Luv catched: <span>{this.state.score}</span>
        </h2>
        <div className="circlesContainer">
          {this.circles.map((_, i) => {
            return (
              <Circle
                key={i}
                id={i}
                disabled={this.state.gameon}
                onClick={() => this.clickCircle(i)}
                active={this.state.current === i}
              />
            );
          })}
        </div>
        <div className="buttonsContainer">
          <Button onClick={this.startHandler}>start</Button>
          <Button onClick={this.stopHandler}>stop</Button>
        </div>
        {this.state.show && (
          <Modal
            onClick={this.refreshGame}
            children={
              <p>
                {`${this.state.alertMessage}`}
                <span>{` ${this.state.score}`}</span>
              </p>
            }
          />
        )}
      </div>
    );
  }
}

export default App;
