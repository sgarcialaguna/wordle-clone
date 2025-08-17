import Key from "./Key";
import styles from "./Keyboard.module.css";
import type { RowState } from "./Row";

export default function Keyboard(props: {
  letterStates: Record<string, RowState[number]>;
}) {
  return (
    <>
      <div className={styles.Row}>
        {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((letter) => (
          <Key
            key={letter}
            letter={letter}
            className={styles.Key}
            letterState={props.letterStates[letter]}
          />
        ))}
      </div>
      <div className={styles.Row}>
        {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((letter) => (
          <Key
            key={letter}
            letter={letter}
            className={styles.Key}
            letterState={props.letterStates[letter]}
          >
            {letter}
          </Key>
        ))}
      </div>
      <div className={styles.Row}>
        <Key letter="Enter" className={`${styles.Key} ${styles.Enter}`}>
          Enter
        </Key>
        {["z", "x", "c", "v", "b", "n", "m"].map((letter) => (
          <Key
            key={letter}
            letter={letter}
            className={styles.Key}
            letterState={props.letterStates[letter]}
          >
            {letter}
          </Key>
        ))}
        <Key letter="Backspace" className={styles.Key}>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 0 24 24"
            width="20"
          >
            <path
              fill="white"
              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
            ></path>
          </svg>
        </Key>
      </div>
    </>
  );
}
