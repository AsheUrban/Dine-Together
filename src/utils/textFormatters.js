const DIRECTIONS = ['N', 'S', 'E', 'W', 'NE', 'NW', 'SE', 'SW'];

// Currently unused but kept for future implementation
export const shortenAddress = (address) => {
    if (!address) return '';

    const parts = address.split(',').map((p) => p.trim());
    if (parts.length <= 2) return address;
    const shortened = parts.slice(0, -1).join(', ');
    return shortened.replace(/\s\d{5}(-\d{4})?$/, '');
};

export const splitAddress = (address) => {
    if (!address) return { street: '', cityState: '' };

    const parts = address.split(',').map((p) => p.trim());
    if (parts.length <= 1) return { street: address, cityState: '' };

    const withoutCountry = parts.slice(0, -1);
    const street = withoutCountry[0] || '';
    const cityState = withoutCountry
        .slice(1)
        .join(', ')
        .replace(/\s\d{5}(-\d{4})?$/, '');

    return { street, cityState };
};

export const toTitleCase = (str) => {
    if (!str) return '';

    return str
        .toLowerCase()
        .split(' ')
        .map((word) => {
            const letters = word.replace(/[^a-z]/gi, '').toUpperCase();
            if (DIRECTIONS.includes(letters)) {
                return word.toUpperCase();
            }
            const firstLetterIndex = word.search(/[a-z]/i);
            if (firstLetterIndex === -1) return word;
            return (
                word.slice(0, firstLetterIndex) +
                word.charAt(firstLetterIndex).toUpperCase() +
                word.slice(firstLetterIndex + 1)
            );
        })
        .join(' ');
};

export const toSentenceCase = (str) => {
    if (!str) return '';

    const segments = str.split(',');

    return segments
        .map((segment, index) => {
            const isFirstSegment = index === 0;

            return segment
                .toLowerCase()
                .split(' ')
                .map((word) => {
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
        })
        .join(',');
};

export const formatPriceLevel = (priceLevel) => {
    const levels = {
        PRICE_LEVEL_FREE: 'Free',
        PRICE_LEVEL_INEXPENSIVE: '$',
        PRICE_LEVEL_MODERATE: '$$',
        PRICE_LEVEL_EXPENSIVE: '$$$',
        PRICE_LEVEL_VERY_EXPENSIVE: '$$$$',
    };
    return levels[priceLevel] || '';
};
