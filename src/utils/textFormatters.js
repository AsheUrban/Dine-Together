const DIRECTIONS = ['N', 'S', 'E', 'W', 'NE', 'NW', 'SE', 'SW'];

export const shortenAddress = (address) => {
    if (!address) return '';

    const parts = address.split(',').map(p => p.trim());
    if (parts.length <= 2) return address;
    const shortened = parts.slice(0, -1).join(', ');
    return shortened.replace(/\s\d{5}(-\d{4})?$/, '');
};

export const toTitleCase = (str) => {
    if (!str) return '';

    return str
        .toLowerCase()
        .split(' ')
        .map(word => {
            const letters = word.replace(/[^a-z]/gi, '').toUpperCase();
            if (DIRECTIONS.includes(letters)) {
                return word.toUpperCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
};

export const toSentenceCase = (str) => {
    if (!str) return '';

    const segments = str.split(',');

    return segments.map((segment, index) => {
        const isFirstSegment = index === 0;

        return segment
        .toLowerCase()
        .split(' ')
        .map(word => {
            const letters = word.replace(/[^a-z]/gi, '').toUpperCase();

            if (DIRECTIONS.includes(letters)) {
                return word.toUpperCase();
            }
            if (!isFirstSegment && letters.length === 2) {
                return word.toUpperCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
    }).join(',');
};