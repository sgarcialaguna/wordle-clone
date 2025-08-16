"use client";

import { useEffect, useReducer, useState } from "react";
import styles from "./board.module.css";
import Row, { type RowState } from "./Row";

import { actions } from "astro:actions";

declare type GameState = "in_progress" | "lost" | "won";

declare type State = {
  gameState: "in_progress" | "lost" | "won";
  guesses: Array<string>;
  currentRow: number;
  rowStates: Array<RowState>;
};

declare type Action =
  | {
      type: "add_letter";
      payload: string;
    }
  | { type: "set_row_state"; payload: RowState }
  | { type: "remove_letter" | "submit" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add_letter": {
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
    case "set_row_state": {
      let gameState: GameState = "in_progress";
      if (action.payload.every((s) => s === "correct_position")) {
        gameState = "won";
      } else if (state.currentRow === 5) {
        gameState = "lost";
      }
      return {
        ...state,
        currentRow: state.currentRow + 1,
        rowStates: [...state.rowStates, action.payload],
        gameState,
      };
    }
    default: {
      return state;
    }
  }
}

export default function Board() {
  const [state, dispatch] = useReducer(reducer, {
    gameState: "in_progress",
    guesses: ["", "", "", "", "", ""],
    currentRow: 0,
    rowStates: [],
  });

  async function handleKeyPress(ev: KeyboardEvent) {
    const key = ev.key;

    if (state.gameState !== "in_progress") {
      return;
    }

    if (key.match(/^[a-z]$/i)) {
      dispatch({ type: "add_letter", payload: ev.key.toLowerCase() });
    } else if (key === "Backspace") {
      dispatch({ type: "remove_letter" });
    } else if (key === "Enter") {
      const currentGuess = state.guesses[state.currentRow];
      if (currentGuess.length < 5) {
        alert("Not enough letters");
        return;
      }
      const { data } = await actions.evaluate(currentGuess);
      dispatch({
        type: "set_row_state",
        payload: data!,
      });
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [state.guesses, state.currentRow, state.gameState]);

  useEffect(() => {
    if (state.gameState === "lost") {
      alert("OH NOES");
    } else if (state.gameState === "won") {
      const successMessages = [
        "Genius",
        "Magnificent",
        "Impressive",
        "Splendid",
        "Great",
        "Phew",
      ];
      alert(successMessages[state.currentRow - 1]);
    }
  }, [state.gameState, state.currentRow]);

  return (
    <div className={styles.board}>
      <Row guess={state.guesses[0]} state={state.rowStates[0]}></Row>
      <Row guess={state.guesses[1]} state={state.rowStates[1]}></Row>
      <Row guess={state.guesses[2]} state={state.rowStates[2]}></Row>
      <Row guess={state.guesses[3]} state={state.rowStates[3]}></Row>
      <Row guess={state.guesses[4]} state={state.rowStates[4]}></Row>
      <Row guess={state.guesses[5]} state={state.rowStates[5]}></Row>
    </div>
  );
}
