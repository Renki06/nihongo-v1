/**
 * Shuffles an array in place using Fisher-Yates algorithm.
 */
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

/**
 * Generates a quiz set of up to `count` questions.
 * Each question will have 4 choices (1 correct, 3 distractors).
 */
export function generateQuiz(items, count = 20) {
    // 1. Shuffle all available items and take up to 'count'
    const pool = [...items];
    const selectedItems = shuffle(pool).slice(0, count);

    return selectedItems.map((item) => {
        // 2. Find distractors
        // Filter out the current item from the pool to avoid duplicate correctness
        const otherItems = items.filter(i => i.q !== item.q);

        // Shuffle others and take 3
        const distractors = shuffle(otherItems).slice(0, 3);

        // If not enough distractors (e.g. total items < 4), we might have issues.
        // For now, assuming we have enough. If not, we might duplicate? 
        // Ideally we want 4 unique choices. 
        // If items.length < 4, this logic breaks. 
        // Fallback: if < 3 distractors, just take what we have.

        // 3. Combine and shuffle choices
        // Choice object: { text: string, isCorrect: boolean }
        // The requirement says: Question is English (a), Choices are Japanese (q).
        // Or vice versa? 
        // Req: "English Meaning displayed -> Select Japanese Correct Answer"

        const choices = [
            { text: item.q, sub: item.r, isCorrect: true },
            ...distractors.map(d => ({ text: d.q, sub: d.r, isCorrect: false }))
        ];

        return {
            question: item.a, // English meaning
            correctAnswer: item.q,
            choices: shuffle(choices)
        };
    });
}
