import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import solutions from './solutions.json'

const solutionIndex = Math.floor((new Date() - new Date(2025, 7, 15)) / 86400000)
const solution = solutions[solutionIndex]

declare type LetterState =
    | "correct_position"
    | "correct_letter"
    | "incorrect_letter";

export const server = {
    evaluate: defineAction({
        input: z.string(),
        handler: (guess) => {
            if (!solutions.includes(guess)) {
                throw new ActionError({ message: "Unknown word", code: "BAD_REQUEST" })
            }
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
