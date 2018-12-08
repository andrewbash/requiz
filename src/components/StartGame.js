import React, { Component } from "react";
import PropTypes from "prop-types";

class StartGame extends Component {
  render() {
    return (
      <div className="start-game">
        <h1>{this.props.quizMeta.name}</h1>

        <h2>
          {this.props.correctAnswers === 0 ? (
            <p>{this.props.quizMeta.desc}</p>
          ) : (
            `You got ${this.props.correctAnswers} questions correct!`
          )}
        </h2>
        <button onClick={this.props.startGame}>
          {this.props.correctAnswers === 0 ? "Start The Game" : "Retry"}
        </button>
      </div>
    );
  }
}

StartGame.propTypes = {
  quizMeta: PropTypes.shape({
    name: PropTypes.string.isRequired,
    desc: PropTypes.string
  }).isRequired,
  correctAnswers: PropTypes.number.isRequired
};

export default StartGame;
