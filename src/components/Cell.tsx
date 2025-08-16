import styles from "./cell.module.css";

export default function Cell({ letter }: { letter: string }) {
  const className = `${styles.cell} ${letter ? styles["has-letter"] : ""}`;
  const animation = letter ? "pop" : "";
  return (
    <div className={className} data-animation={animation}>
      {letter}
    </div>
  );
}
