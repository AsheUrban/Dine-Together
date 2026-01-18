
const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
const AUTOCOMPLETE_URL = 'https://places.googleapis.com/v1/places:autocomplete';
const PLACE_DETAILS_URL = 'https://places.googleapis.com/v1/places/';

const PLACE_FIELDS = [
    'id',
    'displayName',
    'formattedAddress',
    'rating',
    'userRatingCount',
    'priceLevel',
    'nationalPhoneNumber',
    'websiteUri',
    'photos'
];

export const searchPlaces = async (input, coordinates = null) => {
    if (!input || input.length < 2) return [];
    const requestBody = {
        input,
        includedPrimaryTypes: ['restaurant', 'cafe', 'bar', 'bakery', 'meal_takeaway'],
        regionCode: 'us'
    }

    if (coordinates) {
        requestBody.locationBias = {
            circle: {
                center: {
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude
                },
                radius: 50000
            }
        };
    }

    const response = await fetch(AUTOCOMPLETE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        console.error('Places API error:', response.status);
        return [];
    }

    const data = await response.json();
    return data.suggestions?.map(transformPrediction) || [];
};

export const fetchPlaceDetails = async (googlePlaceId) => {
    const response = await fetch(`${PLACE_DETAILS_URL}${googlePlaceId}`, {
        method: 'GET',
        headers: {
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': PLACE_FIELDS.join(',')
        }
    });

    if (!response.ok) {
        console.error('Place Details API error:', response.status);
        throw new Error('Failed to get place details');
    }
    
    return await response.json();
};

export const transformPrediction = (suggestion) => {
    const prediction = suggestion.placePrediction;
    return {
        googlePlaceId: prediction.placeId,
        name: prediction.structuredFormat?.mainText?.text || prediction.text?.text,
        address: prediction.structuredFormat?.secondaryText?.text || '',
        fullDescription: prediction.text?.text
    };
};

export const transformPlaceDetails = (placeDetails) => {
    return {
        googlePlaceId: placeDetails.id,
        restaurantName: placeDetails.displayName?.text,
        restaurantAddress: placeDetails.formattedAddress,
        rating: placeDetails.rating || null,
        userRatingsTotal: placeDetails.userRatingCount || null,
        priceLevel: placeDetails.priceLevel || null,
        phone: placeDetails.nationalPhoneNumber || null,
        website: placeDetails.websiteUri || null,
        photoReferences: placeDetails.photos?.map(p => p.name) || null,
        source: 'google'
    };
};