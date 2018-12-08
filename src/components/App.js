import React, { Component } from "react";
import DisplayQuestion from "./DisplayQuestion";
import StartGame from "./StartGame";
import Header from "./Header";
import Card from "./Card";
import quizData from "../questions";
import { shuffleArray, generatorFromArray } from "../helpers";

class App extends Component {
  state = {
    correctAnswers: 0,
    //QUESTION: is it a bad practice to copy my questions into state twice so I can keep an unmutated copy?
    initialQuestions: quizData.quizQuestions,
    questions: quizData.quizQuestions,
    quizMeta: quizData.quizMeta
  };

  //initializing an empty property here so that it can later be assigned to the real generated set
  generatedSet;

  startGame = () => {
    const createGame = () => {
      const questions = shuffleArray(
        this.state.questions.filter(question => question.isCorrect === false)
      );
      //creating the new set and loading the next question has to be a callback since setState is async
      //Is it a bad practice to use a setState callback instead of componentDidUpdate? I used a callback since this function is so compact I don't think it makes sense to move parts of it to a separate place
      this.setState({ questions }, () => {
        this.generatedSet = generatorFromArray(this.state.questions);
        this.loadNewQuestion();
      });
    };

    if (this.state.correctAnswers === quizData.quizQuestions.length) {
      debugger;
      const questions = this.state.initialQuestions;
      questions.map(question => (question.isCorrect = false));
      const correctAnswers = 0;
      this.setState(
        {
          correctAnswers,
          questions
        },
        createGame()
      );
    } else {
      createGame();
    }
  };

  loadNewQuestion = () => {
    const currentQuestion = this.generatedSet.next().value;
    if (currentQuestion) {
      currentQuestion.answers = shuffleArray(currentQuestion.answers);
    }
    //Is it bad to define new pieces of state mid-app. The problem is that if I define currentQuestion in initial state it returns '{}' instead of undefined, and in DisplayQuestion I check to see if a currentQuestion exists before rendering. And if I use Object.keys(...).length I run into trouble because when the last question is finished it will completely remove currentQuestion from state instead of just emptying the object.
    this.setState({ currentQuestion });
  };

  handleAnswer = answerKey => {
    const currentQuestion = this.state.currentQuestion;
    if (answerKey === this.state.currentQuestion.correctAnswer) {
      currentQuestion.isCorrect = true;
      this.setState(prevState => {
        return { correctAnswers: prevState.correctAnswers + 1 };
      });
    }
    this.setState({ currentQuestion });
  };

  render() {
    return (
      <div className="App">
        <Header correctAnswers={this.state.correctAnswers} />

        <Card>
          {this.state.currentQuestion ? (
            <DisplayQuestion
              question={this.state.currentQuestion}
              handleAnswer={this.handleAnswer}
              isCorrect={this.state.currentQuestion.isCorrect}
              loadNewQuestion={this.loadNewQuestion}
            />
          ) : (
            <StartGame
              correctAnswers={this.state.correctAnswers}
              startGame={this.startGame}
              quizMeta={this.state.quizMeta}
            />
          )}
        </Card>
      </div>
    );
  }
}

export default App;
