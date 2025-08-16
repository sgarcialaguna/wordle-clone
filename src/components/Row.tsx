import Cell from "./Cell";

export default function Row({ guess }: { guess: string }) {
  return (
    <>
      <Cell letter={guess[0]} />
      <Cell letter={guess[1]} />
      <Cell letter={guess[2]} />
      <Cell letter={guess[3]} />
      <Cell letter={guess[4]} />
    </>
  );
}
