import React, { Component } from "react";
import PropTypes from "prop-types";

class Header extends Component {
  render() {
    return (
      <header className="siteHeader">
        <h1 className="siteTitle">React Quiz Game</h1>
        <p className="siteSubtitle">
          {this.props.correctAnswers} question
          {this.props.correctAnswers !== 1 ? "s" : ""} guessed correctly
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  correctAnswers: PropTypes.number.isRequired
};

export default Header;
