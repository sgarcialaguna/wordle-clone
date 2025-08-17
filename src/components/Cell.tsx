import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./cell.module.css";
import type { RowState } from "./Row";

export default function Cell({
  letter,
  state,
  invalid,
  index,
}: {
  letter: string;
  state?: RowState[number];
  invalid?: boolean;
  index: number;
}) {
  const [animation, setAnimation] = useState("");
  const [animationDelay, setAnimationDelay] = useState("0ms");
  const [delayedState, setDelayedState] = useState<
    RowState[number] | undefined
  >(undefined);

  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (letter) {
      setAnimation(styles.pop);
    }
  }, [letter]);

  useEffect(() => {
    if (invalid) {
      setAnimation("shake");
    }
  }, [invalid]);

  useEffect(() => {
    const flipTimeout = Number(
      window.getComputedStyle(document.body).getPropertyValue("--flip-timeout")
    );
    if (letter && (!state || state === "unknown")) {
      setAnimation("pop");
    } else if (state && state !== "unknown") {
      setAnimationDelay(`${index * flipTimeout}ms`);
      setAnimation("flip");
      window.setTimeout(
        () => setDelayedState(state),
        index * flipTimeout + flipTimeout
      );
    }
  }, [letter, state]);

  useEffect(() => {
    if (!cellRef.current) {
      return;
    }
    function clearAnimation() {
      setAnimation("idle");
    }
    cellRef.current.addEventListener("animationend", clearAnimation);
    return () =>
      cellRef.current?.removeEventListener("animationend", clearAnimation);
  }, []);

  return (
    <div
      ref={cellRef}
      className={styles.cell}
      style={{ animationDelay }}
      data-animation={animation}
      data-state={delayedState}
    >
      {letter}
    </div>
  );
}
