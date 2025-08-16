import styles from "./cell.module.css";

export default function Row({ guess }: { guess: string }) {
  return (
    <>
      <div className={`${styles.cell} ${guess[0] ? styles["has-letter"] : ""}`}>
        {guess[0]}
      </div>
      <div className={`${styles.cell} ${guess[1] ? styles["has-letter"] : ""}`}>
        {guess[1]}
      </div>
      <div className={`${styles.cell} ${guess[2] ? styles["has-letter"] : ""}`}>
        {guess[2]}
      </div>
      <div className={`${styles.cell} ${guess[3] ? styles["has-letter"] : ""}`}>
        {guess[3]}
      </div>
      <div className={`${styles.cell} ${guess[4] ? styles["has-letter"] : ""}`}>
        {guess[4]}
      </div>
    </>
  );
}
