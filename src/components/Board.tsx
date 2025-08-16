"use client";

import { useEffect, useState } from "react";
import styles from "./board.module.css";

export default function Board() {
  console.log("HELLO");
  const [guesses, setGuesses] = useState<Array<string>>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [currentRow, setCurrentRow] = useState(0);
  console.log(guesses);

  function handleKeyPress(ev: KeyboardEvent) {
    const key = ev.key.toLowerCase();
    if (key.match(/^[a-z]$/)) {
      console.log(key);
      if (guesses[currentRow].length >= 5) {
        return;
      }
      // TODO
      if (currentRow > 5) {
        return;
      }

      setGuesses((guesses) =>
        guesses.map((guess, index) => {
          if (index === currentRow) {
            return guess + key;
          }
          return guess;
        })
      );
      return;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => window.addEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className={styles.board}>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
    </div>
  );
}
