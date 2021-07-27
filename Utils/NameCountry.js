const API_KEY = 'AIzaSyA3ODWiWKzW6YocrIYBXssVvVHWcO041qw';

const BASE_URL = (lat, lon) => `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${API_KEY}`

export default function nameCountry(lat, long) {
    const complete_URL = BASE_URL(lat, long);
    return complete_URL;
}