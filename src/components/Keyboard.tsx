import styles from "./Keyboard.module.css";
import type { RowState } from "./Row";

export default function Keyboard(props: {
  letterStates: Record<string, RowState[number]>;
}) {
  return (
    <>
      <div className={styles.Row}>
        {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((letter) => (
          <div
            key={letter}
            className={styles.Key}
            data-state={props.letterStates[letter]}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className={styles.Row}>
        {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((letter) => (
          <div
            key={letter}
            className={styles.Key}
            data-state={props.letterStates[letter]}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className={styles.Row}>
        {["z", "x", "c", "v", "b", "n", "m"].map((letter) => (
          <div
            key={letter}
            className={styles.Key}
            data-state={props.letterStates[letter]}
          >
            {letter}
          </div>
        ))}
      </div>
    </>
  );
}
