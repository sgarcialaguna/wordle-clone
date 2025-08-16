"use client";

import { useEffect, useReducer, useState } from "react";
import styles from "./board.module.css";
import Row, { type RowState } from "./Row";
import { ToastContainer, toast } from "react-toastify";
import toastStyles from "./customToast.module.css";

import { actions } from "astro:actions";
import CustomToast from "./CustomToast";
import Keyboard from "./Keyboard";

declare type GameState = "in_progress" | "lost" | "won";

declare type State = {
  letterStates: Record<string, RowState>;
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
      let letterStates = { ...state.letterStates };
      const currentGuess = state.guesses[state.currentRow];
      for (let i = 0; i < currentGuess.length; i++) {
        letterStates[currentGuess[i]] =
          state.letterStates[currentGuess[i]] || action.payload[i];
      }

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
        letterStates,
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
    letterStates: {},
  });
  const [invalidRow, setInvalidRow] = useState<number | undefined>(undefined);

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
        setInvalidRow(state.currentRow);
        window.setTimeout(() => setInvalidRow(undefined), 600);
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
      toast(CustomToast, { data: "Game over" });
    } else if (state.gameState === "won") {
      const successMessages = [
        "Genius",
        "Magnificent",
        "Impressive",
        "Splendid",
        "Great",
        "Phew",
      ];
      window.setTimeout(
        () =>
          toast(CustomToast, { data: successMessages[state.currentRow - 1] }),
        250 * 6
      );
    }
  }, [state.gameState, state.currentRow]);

  return (
    <>
      <div className={styles.board}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <Row
            key={index}
            guess={state.guesses[index]}
            state={state.rowStates[index]}
            invalid={invalidRow === index}
          ></Row>
        ))}
      </div>
      <ToastContainer
        hideProgressBar
        closeButton={false}
        position="top-center"
        autoClose={false}
        toastClassName={toastStyles.customToast}
      />
      <Keyboard letterStates={state.letterStates} />
    </>
  );
}
