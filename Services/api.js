
import * as Localization from 'expo-localization';
import List5days from '../Components/List5days';
import * as Location from 'expo-location'
const WEATHER_API_KEY = 'b3dd48c52ebbab270398c3c1747dc11a'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const BASE_URL2 = 'https://api.openweathermap.org/data/2.5/forecast?'
const [location, setLocatio] = useState(null)


export default async function load({ setCurrentWeather, setErrorMessage }) {
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMessage('O aplicativo necessita da sua localização para fornecer os dados adequadamente!')
            return
        }
        const location = await Location.getCurrentPositionAsync()

        const { latitude, longitude } = location.coords;
        setLocatio(location.coords);

        const weatherUrl = `${BASE_URL}lat=${latitude}&lon=${longitude}&units=${unitySystem}&appid=${WEATHER_API_KEY}&lang=${Localization.locale}`

        const response = await fetch(weatherUrl)

        const result = await response.json()

        if (response.ok) {
            setCurrentWeather(result)
        } else {
            setErrorMessage(result.message)
        }
    } catch (error) {
        setErrorMessage(error.message)
    }
}