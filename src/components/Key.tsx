import type { RowState } from "./Row";

export default function Key({
  className,
  letter,
  letterState,
  children,
}: {
  className: string;
  letter: string;
  letterState?: RowState[number];
  children?: React.ReactNode;
}) {
  return (
    <button
      className={className}
      data-state={letterState}
      onClick={(event) => {
        event.preventDefault();
        console.log("HELLO");
        document.dispatchEvent(new KeyboardEvent("keydown", { key: letter }));
        document.dispatchEvent(new KeyboardEvent("keyup", { key: letter }));
      }}
    >
      {children || letter}
    </button>
  );
}
