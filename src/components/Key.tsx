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
        document.dispatchEvent(new KeyboardEvent("keydown", { key: letter }));
      }}
      aria-label={letter}
    >
      {children || letter}
    </button>
  );
}
