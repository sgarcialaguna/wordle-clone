import Cell from "./Cell";

export declare type RowState = Array<
  "unknown" | "correct_position" | "correct_letter" | "incorrect_letter"
>;

export default function Row({
  guess,
  state: rowState,
  invalid,
}: {
  guess: string;
  state?: RowState;
  invalid?: boolean;
}) {
  return (
    <>
      {[0, 1, 2, 3, 4].map((index) => (
        <Cell
          key={index}
          letter={guess[index]}
          state={rowState?.[index]}
          invalid={invalid}
          index={index}
        />
      ))}
    </>
  );
}
