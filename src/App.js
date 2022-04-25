import "./App.css";
import React, { Component } from "react";

import Circle from "./uiComp/Circle";
import Button from "./uiComp/Button";
import Outro from "./Outro";
// import Intro from "./Intro";

import startSound from "./assets/sounds/01.mp3";
import stopSound from "./assets/sounds/02.mp3";
import clickSound from "./assets/sounds/03.mp3";

let luvSound = new Audio(clickSound);
let startMusic = new Audio(startSound);
let stopMusic = new Audio(stopSound);

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    current: -1,
    show: false,
    pace: 1500,
    rounds: 0,
    gameon: false,
    clicked: -1,
    difficulty: "",

    nextCircle: 0,
    newCircle: 0,
  };

  timer = undefined;

  easyCircles = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  crazyCircles = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];
  insaneCircles = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ];

  difficultyHandler = (e) => {
    console.log(e.target.textContent);
    switch (e.target.textContent) {
      case "easy":
        this.setState({ difficulty: "easy" });
        break;
      case "crazy":
        this.setState({ difficulty: "crazy" });
        break;
      case "insane":
        this.setState({ difficulty: "insane" });
        break;
    }
  };

  // circlesAmount = (e) => {
  //   let circles = [];
  //   switch (e.target.textContent) {
  //     case "easy":
  //       circles = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  //       break;
  //     case "medium":
  //       circles = [
  //         { id: 1 },
  //         { id: 2 },
  //         { id: 3 },
  //         { id: 4 },
  //         { id: 5 },
  //         { id: 6 },
  //       ];
  //       break;
  //   }
  //   this.circles = circles;
  // };

  clickCircle = (i) => {
    this.clickPlay();
    if (i !== this.state.clicked) {
      this.setState({
        score: this.state.score + 1,
        rounds: this.state.rounds - 1,
        clicked: i,
      });
    }
    if (this.state.current !== i) {
      this.stopHandler();
      return;
    }
  };

  clickPlay = () => {
    if (luvSound.paused) {
      luvSound.play();
    } else {
      luvSound.currentTime = 0;
    }
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
    this.timer = setTimeout(this.nextCircle, this.state.pace);
  };

  refreshGame = () => {
    window.location.reload();
  };

  startHandler = () => {
    startMusic.play();
    startMusic.loop = true;
    this.nextCircle();
    this.setState({
      gameon: true,
    });
  };

  stopHandler = () => {
    clearTimeout(this.timer);
    startMusic.pause();
    startMusic.currentTime = 0;
    stopMusic.play();
    this.setState({
      show: true,
      gameon: false,
    });
  };

  render() {
    return (
      <div className="frame">
        <h1>Catching Luv</h1>
        {!this.state.difficulty && [
          <div className="levelsContainer">
            <h2>Choose difficulty!</h2>
            <div>
              <Button
                key={"easy"}
                children={"easy"}
                onClick={this.difficultyHandler}
              />
              <Button
                key={"crazy"}
                children={"crazy"}
                onClick={this.difficultyHandler}
              />
              <Button
                key={"insane"}
                children={"insane"}
                onClick={this.difficultyHandler}
              />
            </div>
          </div>,
        ]}

        <div className="game">
          <h2>
            Luv catched: <span>{this.state.score}</span>
          </h2>
          <div className="circlesContainer">
            {/* circles for easy */}
            {this.state.difficulty === "easy" && [
              this.easyCircles.map((_, i) => {
                return (
                  <Circle
                    key={i}
                    id={i}
                    disabled={this.state.gameon}
                    onClick={() => this.clickCircle(i)}
                    active={this.state.current === i}
                  />
                );
              }),
            ]}
            {/* circles for crazy */}

            {this.state.difficulty === "crazy" && [
              this.crazyCircles.map((_, i) => {
                return (
                  <Circle
                    key={i}
                    id={i}
                    disabled={this.state.gameon}
                    onClick={() => this.clickCircle(i)}
                    active={this.state.current === i}
                  />
                );
              }),
            ]}
            {/* circles for insane */}
            {this.state.difficulty === "insane" && [
              this.insaneCircles.map((_, i) => {
                return (
                  <Circle
                    key={i}
                    id={i}
                    disabled={this.state.gameon}
                    onClick={() => this.clickCircle(i)}
                    active={this.state.current === i}
                  />
                );
              }),
            ]}
          </div>
          <div className="buttonsContainer">
            {!this.state.gameon && (
              <Button onClick={this.startHandler}>start</Button>
            )}
            {this.state.gameon && (
              <Button onClick={this.stopHandler}>stop</Button>
            )}
          </div>
          {this.state.show && (
            <Outro
              onClick={this.refreshGame}
              score={this.state.score}
              children={<span>{`${this.state.score}`}</span>}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
