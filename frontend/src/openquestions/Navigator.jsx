import React, { useState, useEffect } from "react";
import NavigationButton from "./NavigationButton";

export default function Navigator({ currentQuestionId, next, previous }) {
    const [state, setState] = useState(new StartState());

    useEffect(() => {
        setState((currentState) => currentState.nextState(currentQuestionId));
    }, [currentQuestionId]);

    return state.render(previous, next);
}

class StartState {
  nextState(currentQuestionId) {
    if (currentQuestionId >= 2 && currentQuestionId < 4) {
      return new MiddleState();
    }
    return this;
  }

  render(previous, next) {
    return (
      <div className="navigation">
        <NavigationButton action={next} title="Volgende" />
      </div>
    );
  }
}

class MiddleState {
  nextState(currentQuestionId) {
    if (currentQuestionId === 4) {
      return new EndState();
    } else if (currentQuestionId === 1) {
      return new StartState();
    }
    return this;
  }

  render(previous, next) {
    return (
      <div className="navigation">
        <NavigationButton action={previous} title="Vorige" />
        <NavigationButton action={next} title="Volgende" />
      </div>
    );
  }
}

class EndState {
  nextState(currentQuestionId) {
    if (currentQuestionId >= 2 && currentQuestionId < 4) {
      return new MiddleState();
    }
    return this;
  }

  render(previous) {
    return (
      <div className="navigation">
        <NavigationButton action={previous} title="Vorige" />
      </div>
    );
  }
}
