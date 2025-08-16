"use client";

import { useEffect, useReducer, useState } from "react";
import styles from "./board.module.css";
import Row from "./Row";

function reducer(state, action) {
  switch (action.type) {
    case "keydown": {
      const key = action.payload;
      if (key.match(/^[a-z]$/)) {
        if (state.guesses[state.currentRow].length >= 5) {
          return state;
        }
        // TODO
        if (state.currentRow > 5) {
          return state;
        }

        return {
          ...state,
          guesses: state.guesses.map((guess, index) => {
            if (index === state.currentRow) {
              return guess + key;
            }
            return guess;
          }),
        };
      }
    }
    default: {
      return state;
    }
  }
}

export default function Board() {
  const [state, dispatch] = useReducer(reducer, {
    guesses: ["", "", "", "", "", ""],
    currentRow: 0,
  });

  function handleKeyPress(ev: KeyboardEvent) {
    dispatch({ type: "keydown", payload: ev.key.toLowerCase() });
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => window.addEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className={styles.board}>
      <Row guess={state.guesses[0]}></Row>
      <Row guess={state.guesses[1]}></Row>
      <Row guess={state.guesses[2]}></Row>
      <Row guess={state.guesses[3]}></Row>
      <Row guess={state.guesses[4]}></Row>
      <Row guess={state.guesses[5]}></Row>
    </div>
  );
}
