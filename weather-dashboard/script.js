// Weather Dashboard Application
class WeatherApp {
    constructor() {
        // OpenWeather API key - Get yours free at https://openweathermap.org/api
        this.API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your API key
        this.API_URL = 'https://api.openweathermap.org/data/2.5';
        
        this.favorites = this.loadFavorites();
        this.currentCity = null;
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadLastCity();
    }

    initializeElements() {
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.locationBtn = document.getElementById('locationBtn');
        this.errorMessage = document.getElementById('errorMessage');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.currentWeather = document.getElementById('currentWeather');
        this.forecastSection = document.getElementById('forecastSection');
        this.favoritesList = document.getElementById('favoritesList');
        this.addFavoriteBtn = document.getElementById('addFavoriteBtn');
        this.weatherBg = document.getElementById('weatherBg');
    }

    attachEventListeners() {
        this.searchBtn.addEventListener('click', () => this.searchCity());
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchCity();
        });
        this.locationBtn.addEventListener('click', () => this.getUserLocation());
        this.addFavoriteBtn.addEventListener('click', () => this.toggleFavorite());
        
        // Render favorites on load
        this.renderFavorites();
    }

    async searchCity() {
        const city = this.cityInput.value.trim();
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        this.hideError();
        this.showLoading();

        try {
            const weatherData = await this.fetchWeather(city);
            const forecastData = await this.fetchForecast(weatherData.coord.lat, weatherData.coord.lon);
            
            this.currentCity = {
                name: weatherData.name,
                country: weatherData.sys.country,
                lat: weatherData.coord.lat,
                lon: weatherData.coord.lon
            };

            this.displayCurrentWeather(weatherData);
            this.displayForecast(forecastData);
            this.updateBackground(weatherData.weather[0].main);
            this.saveLastCity(this.currentCity);
            this.updateFavoriteButton();
            
            this.hideLoading();
        } catch (error) {
            this.hideLoading();
            this.showError(error.message);
        }
    }

    async getUserLocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by your browser');
            return;
        }

        this.showLoading();
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const weatherData = await this.fetchWeatherByCoords(latitude, longitude);
                    const forecastData = await this.fetchForecast(latitude, longitude);
                    
                    this.currentCity = {
                        name: weatherData.name,
                        country: weatherData.sys.country,
                        lat: latitude,
                        lon: longitude
                    };

                    this.displayCurrentWeather(weatherData);
                    this.displayForecast(forecastData);
                    this.updateBackground(weatherData.weather[0].main);
                    this.saveLastCity(this.currentCity);
                    this.updateFavoriteButton();
                    
                    this.hideLoading();
                } catch (error) {
                    this.hideLoading();
                    this.showError(error.message);
                }
            },
            (error) => {
                this.hideLoading();
                this.showError('Unable to retrieve your location');
            }
        );
    }

    async fetchWeather(city) {
        const response = await fetch(
            `${this.API_URL}/weather?q=${encodeURIComponent(city)}&units=imperial&appid=${this.API_KEY}`
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else if (response.status === 401) {
                throw new Error('Invalid API key. Please check your OpenWeather API key.');
            }
            throw new Error('Unable to fetch weather data. Please try again.');
        }

        return await response.json();
    }

    async fetchWeatherByCoords(lat, lon) {
        const response = await fetch(
            `${this.API_URL}/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${this.API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Unable to fetch weather data');
        }

        return await response.json();
    }

    async fetchForecast(lat, lon) {
        const response = await fetch(
            `${this.API_URL}/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${this.API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Unable to fetch forecast data');
        }

        return await response.json();
    }

    displayCurrentWeather(data) {
        document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('currentDate').textContent = this.formatDate(new Date());
        document.getElementById('currentTemp').textContent = Math.round(data.main.temp);
        document.getElementById('weatherDescription').textContent = data.weather[0].description;
        document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°F`;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('windSpeed').textContent = `${Math.round(data.wind.speed)} mph`;
        document.getElementById('visibility').textContent = `${(data.visibility / 1609.34).toFixed(1)} mi`;
        document.getElementById('pressure').textContent = `${data.main.pressure} mb`;
        document.getElementById('uvIndex').textContent = 'N/A'; // Requires separate API call

        // Update weather icon
        const weatherIcon = document.getElementById('weatherIcon');
        weatherIcon.className = this.getWeatherIcon(data.weather[0].main);

        this.currentWeather.classList.remove('hidden');
    }

    displayForecast(data) {
        const forecastCards = document.getElementById('forecastCards');
        forecastCards.innerHTML = '';

        // Get one forecast per day (at 12:00 PM)
        const dailyForecasts = data.list.filter(item => 
            item.dt_txt.includes('12:00:00')
        ).slice(0, 5);

        dailyForecasts.forEach(day => {
            const card = document.createElement('div');
            card.className = 'forecast-card';
            
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            
            card.innerHTML = `
                <div class="day">${dayName}</div>
                <div class="date">${dateStr}</div>
                <div class="icon">
                    <i class="${this.getWeatherIcon(day.weather[0].main)}"></i>
                </div>
                <div class="temp-range">
                    ${Math.round(day.main.temp_max)}° / ${Math.round(day.main.temp_min)}°
                </div>
                <div class="description">${day.weather[0].description}</div>
            `;
            
            forecastCards.appendChild(card);
        });

        this.forecastSection.classList.remove('hidden');
    }

    getWeatherIcon(condition) {
        const iconMap = {
            'Clear': 'fas fa-sun',
            'Clouds': 'fas fa-cloud',
            'Rain': 'fas fa-cloud-rain',
            'Drizzle': 'fas fa-cloud-rain',
            'Thunderstorm': 'fas fa-bolt',
            'Snow': 'fas fa-snowflake',
            'Mist': 'fas fa-smog',
            'Smoke': 'fas fa-smog',
            'Haze': 'fas fa-smog',
            'Fog': 'fas fa-smog'
        };

        return iconMap[condition] || 'fas fa-cloud';
    }

    updateBackground(condition) {
        const hour = new Date().getHours();
        const isNight = hour < 6 || hour > 20;
        
        this.weatherBg.className = 'weather-background';
        
        if (condition === 'Clear') {
            this.weatherBg.classList.add(isNight ? 'clear-night' : 'clear-day');
        } else if (condition === 'Clouds') {
            this.weatherBg.classList.add('clouds');
        } else if (condition === 'Rain' || condition === 'Drizzle') {
            this.weatherBg.classList.add('rain');
        } else if (condition === 'Snow') {
            this.weatherBg.classList.add('snow');
        } else if (condition === 'Thunderstorm') {
            this.weatherBg.classList.add('thunderstorm');
        }
    }

    toggleFavorite() {
        if (!this.currentCity) return;

        const cityKey = `${this.currentCity.name}, ${this.currentCity.country}`;
        const index = this.favorites.findIndex(fav => 
            `${fav.name}, ${fav.country}` === cityKey
        );

        if (index > -1) {
            this.favorites.splice(index, 1);
            this.showNotification('Removed from favorites');
        } else {
            this.favorites.push(this.currentCity);
            this.showNotification('Added to favorites');
        }

        this.saveFavorites();
        this.updateFavoriteButton();
        this.renderFavorites();
    }

    updateFavoriteButton() {
        if (!this.currentCity) return;

        const cityKey = `${this.currentCity.name}, ${this.currentCity.country}`;
        const isFavorite = this.favorites.some(fav => 
            `${fav.name}, ${fav.country}` === cityKey
        );

        const icon = this.addFavoriteBtn.querySelector('i');
        if (isFavorite) {
            this.addFavoriteBtn.classList.add('active');
            icon.className = 'fas fa-heart';
        } else {
            this.addFavoriteBtn.classList.remove('active');
            icon.className = 'far fa-heart';
        }
    }

    async renderFavorites() {
        this.favoritesList.innerHTML = '';

        if (this.favorites.length === 0) {
            this.favoritesList.innerHTML = '<p class="empty-favorites">No favorite cities yet. Search for a city and click the heart icon to add it!</p>';
            return;
        }

        for (const city of this.favorites) {
            try {
                const weatherData = await this.fetchWeatherByCoords(city.lat, city.lon);
                const card = this.createFavoriteCard(city, weatherData);
                this.favoritesList.appendChild(card);
            } catch (error) {
                console.error(`Error loading ${city.name}:`, error);
            }
        }
    }

    createFavoriteCard(city, weatherData) {
        const card = document.createElement('div');
        card.className = 'favorite-city-card';
        
        card.innerHTML = `
            <div class="city-name">${city.name}, ${city.country}</div>
            <div class="city-temp">${Math.round(weatherData.main.temp)}°F</div>
            <button class="remove-favorite" title="Remove from favorites">
                <i class="fas fa-times"></i>
            </button>
        `;

        card.addEventListener('click', (e) => {
            if (!e.target.closest('.remove-favorite')) {
                this.cityInput.value = city.name;
                this.searchCity();
            }
        });

        card.querySelector('.remove-favorite').addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeFavorite(city);
        });

        return card;
    }

    removeFavorite(city) {
        const cityKey = `${city.name}, ${city.country}`;
        this.favorites = this.favorites.filter(fav => 
            `${fav.name}, ${fav.country}` !== cityKey
        );
        this.saveFavorites();
        this.renderFavorites();
        this.updateFavoriteButton();
    }

    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    showLoading() {
        this.loadingSpinner.classList.add('show');
        this.currentWeather.classList.add('hidden');
        this.forecastSection.classList.add('hidden');
    }

    hideLoading() {
        this.loadingSpinner.classList.remove('show');
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.add('show');
    }

    hideError() {
        this.errorMessage.classList.remove('show');
    }

    showNotification(message) {
        console.log(message); // Replace with a toast notification if desired
    }

    saveFavorites() {
        localStorage.setItem('weatherFavorites', JSON.stringify(this.favorites));
    }

    loadFavorites() {
        const saved = localStorage.getItem('weatherFavorites');
        return saved ? JSON.parse(saved) : [];
    }

    saveLastCity(city) {
        localStorage.setItem('lastCity', JSON.stringify(city));
    }

    loadLastCity() {
        const saved = localStorage.getItem('lastCity');
        if (saved) {
            const city = JSON.parse(saved);
            this.cityInput.value = city.name;
            this.searchCity();
        }
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new WeatherApp();
    
    // Show API key setup message if not configured
    if (app.API_KEY === 'YOUR_API_KEY_HERE') {
        alert('⚠️ Please get a free API key from OpenWeatherMap.org and update the API_KEY in script.js');
    }
});
