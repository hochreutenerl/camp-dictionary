export const func = {
    flup: (text) => {
        if (text[0]) {
            return text.replace(/^./, text[0].toUpperCase());
        }
    }
};