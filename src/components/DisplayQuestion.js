import React, { Component } from "react";
import Button from "./Button";
import PropTypes from "prop-types";

class DisplayQuestion extends Component {
  state = {
    hasAnswer: false
  };

  handleClick = e => {
    this.setState(prevState => {
      return { hasAnswer: !prevState.hasAnswer };
    });
    if (e.target.classList.contains("answer")) {
      this.props.handleAnswer(e.target.dataset.key);
    } else if (e.target.classList.contains("next")) {
      this.props.loadNewQuestion();
    }
  };

  render() {
    return (
      <div className="question-wrapper" onClick={this.buttons}>
        <div className="question">
          <h2 className="question__title">{this.props.question.title}</h2>

          <div className="question__answers">
            {this.props.question.answers.map(answer => {
              return (
                <Button
                  disabled={this.state.hasAnswer}
                  className={`answer ${
                    this.state.hasAnswer
                      ? answer.key === this.props.question.correctAnswer
                        ? "isCorrect"
                        : "isIncorrect"
                      : ""
                  }`}
                  key={answer.key}
                  data-key={answer.key}
                  onClick={this.handleClick}
                >
                  {answer.value}
                </Button>
              );
            })}
          </div>
        </div>
        {this.state.hasAnswer && (
          <Button onClick={this.handleClick} className="next">
            Next Question
          </Button>
        )}
      </div>
    );
  }
}

DisplayQuestion.propTypes = {
  handleAnswer: PropTypes.func.isRequired,
  loadNewQuestion: PropTypes.func.isRequired,
  question: PropTypes.shape({
    title: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ),
    correctAnswer: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired
  }).isRequired
};
export default DisplayQuestion;
