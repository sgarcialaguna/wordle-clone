import Cell from "./Cell";

export declare type RowState = Array<
  "unknown" | "correct_position" | "correct_letter" | "incorrect_letter"
>;

export default function Row({
  guess,
  state: rowState,
}: {
  guess: string;
  state?: RowState;
}) {
  return (
    <>
      <Cell letter={guess[0]} state={rowState?.[0]} />
      <Cell letter={guess[1]} state={rowState?.[1]} />
      <Cell letter={guess[2]} state={rowState?.[2]} />
      <Cell letter={guess[3]} state={rowState?.[3]} />
      <Cell letter={guess[4]} state={rowState?.[4]} />
    </>
  );
}
