"use client";

import { useEffect, useReducer, useState } from "react";
import styles from "./board.module.css";
import Row from "./Row";

declare type State = {
  guesses: Array<string>;
  currentRow: number;
};

declare type Action =
  | {
      type: "add_letter";
      payload: {
        key: string;
      };
    }
  | { type: "remove_letter" };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "add_letter": {
      const { key } = action.payload;
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
          guesses: [
            ...state.guesses.slice(0, state.currentRow),
            state.guesses[state.currentRow] + key,
            ...state.guesses.slice(state.currentRow + 1),
          ],
        };
      }
    }
    case "remove_letter":
      return {
        ...state,
        guesses: [
          ...state.guesses.slice(0, state.currentRow),
          state.guesses[state.currentRow].slice(
            0,
            state.guesses[state.currentRow].length - 1
          ),
          ...state.guesses.slice(state.currentRow + 1),
        ],
      };
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
    const key = ev.key;
    console.log(key);
    if (key.match(/^[a-z]$/i)) {
      dispatch({ type: "add_letter", payload: { key: ev.key.toLowerCase() } });
    } else if (key === "Backspace") {
      dispatch({ type: "remove_letter" });
    }
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
