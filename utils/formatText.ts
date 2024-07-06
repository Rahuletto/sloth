export function formatText(text: string): string {
    // Split the text into sentences using a regular expression to match sentence-ending punctuation.
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

    // Group sentences into paragraphs of approximately 4 sentences each.
    const paragraphs: string[] = [];
    let currentParagraph: string[] = [];

    sentences.forEach((sentence, index) => {
        currentParagraph.push(sentence.trim());
        if (currentParagraph.length === 4 || index === sentences.length - 1) {
            paragraphs.push(currentParagraph.join(' '));
            currentParagraph = [];
        }
    });

    // Join the paragraphs with double newlines for separation.
    return paragraphs.join('\n\n');
}