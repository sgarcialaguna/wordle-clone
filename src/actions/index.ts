import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import allWords from './allwords.json'
import solutions from './solutions.json'

const solutionIndex = Math.floor((new Date() - new Date(2025, 7, 15)) / 86400000)
const solution = solutions[solutionIndex]

declare type LetterState =
    | "correct_position"
    | "correct_letter"
    | "incorrect_letter";

function getAllIndexesOfCharacter(needle: string, haystack: string) {
    const indices = []
    for (let i = 0; i < haystack.length; i++) {
        if (haystack[i] === needle) {
            indices.push(i)
        }
    }
    return indices;
}

export const server = {
    evaluate: defineAction({
        input: z.string(),
        handler: (guess) => {
            if (!allWords.includes(guess)) {
                throw new ActionError({ message: "Unknown word", code: "BAD_REQUEST" })
            }
            const response: Array<LetterState> = [];
            for (let i = 0; i < solution.length; i++) {
                if (solution[i] === guess[i]) {
                    response.push("correct_position");
                } else if (solution.includes(guess[i])) {
                    // Character may occur in string, but all other positions of string may have been guessed already
                    const allIndexesOfCharacter = getAllIndexesOfCharacter(guess[i], solution)
                    if (allIndexesOfCharacter.every(j => guess[i] === guess[j])) {
                        response.push("incorrect_letter")
                    } else {
                        response.push("correct_letter");
                    }
                } else {
                    response.push("incorrect_letter");
                }
            }
            return response;
        },
    }),
};
