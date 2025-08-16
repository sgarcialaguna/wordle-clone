import { defineAction } from "astro:actions";
import { z } from "astro:schema";

declare type LetterState =
    | "correct_position"
    | "correct_letter"
    | "incorrect_letter";

export const server = {
    evaluate: defineAction({
        input: z.string(),
        handler: (guess) => {
            const solution = "level";
            const response: Array<LetterState> = [];
            for (let i = 0; i < solution.length; i++) {
                if (solution[i] === guess[i]) {
                    response.push("correct_position");
                } else if (solution.includes(guess[i])) {
                    response.push("correct_letter");
                } else {
                    response.push("incorrect_letter");
                }
            }
            return response;
        },
    }),
};
