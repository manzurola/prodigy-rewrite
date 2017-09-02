const GameData = [

    {
        id: "1",
        sentence: "a test",
        answer: ["a"],
        choices: [
            ["a"],
        ],
        instructions: "This is a test"
    },
    {
        id: "1",
        sentence: "Exercises are not always easy for beginners.",
        answer: ["an", "exercise", "is", "not", "always", "easy", "for", "a", "beginner"],
        choices: [
            ["an"],
            ["exercise"],
            ["is"],
            ["not", "isn't"],
            ["never", "always"],
            ["easy"],
            ["a","for", "beginner"],
            ["a","beginner"],
            ["beginner"],
        ],
        instructions: "Put the sentence into the singular"
    },
    {
        id: "0",
        sentence: "Dogs Live.",
        answer: ["a", "dog", "lives"],
        choices: [
            ["a","what"],
            ["dog"],
            ["lives"]
        ],
        instructions: "Put into the singular"
    },
];

export default GameData;