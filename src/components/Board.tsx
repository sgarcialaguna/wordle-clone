"use client";

import { useEffect, useReducer, useState } from "react";
import styles from "./board.module.css";
import Row, { type RowState } from "./Row";

import { actions } from "astro:actions";

declare type State = {
  guesses: Array<string>;
  currentRow: number;
  rowStates: Array<RowState>;
};

declare type Action =
  | {
      type: "add_letter";
      payload: {
        key: string;
      };
    }
  | { type: "set_row_state"; payload: { row_state: RowState } }
  | { type: "remove_letter" | "submit" };

function reducer(state: State, action: Action): State {
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
    case "set_row_state": {
      return {
        ...state,
        currentRow: state.currentRow + 1,
        rowStates: [...state.rowStates, action.payload.row_state],
      };
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
    rowStates: [],
  });

  async function handleKeyPress(ev: KeyboardEvent) {
    const key = ev.key;
    if (key.match(/^[a-z]$/i)) {
      dispatch({ type: "add_letter", payload: { key: ev.key.toLowerCase() } });
    } else if (key === "Backspace") {
      dispatch({ type: "remove_letter" });
    } else if (key === "Enter") {
      const { data } = await actions.evaluate(state.guesses[state.currentRow]);
      console.log(data);
      dispatch({ type: "set_row_state", payload: { row_state: data! } });
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => window.addEventListener("keydown", handleKeyPress);
  }, []);

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
