import styles from "./cell.module.css";
import type { RowState } from "./Row";

export default function Cell({
  letter,
  state,
}: {
  letter: string;
  state?: RowState[number];
}) {
  const className = `${styles.cell} ${letter ? styles["has-letter"] : ""} ${
    state ? styles[state] : ""
  }`;
  const animation = letter ? "pop" : "";
  return (
    <div className={className} data-animation={animation}>
      {letter}
    </div>
  );
}
