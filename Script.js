// API Configuration - Netlify will inject environment variables at build time
const API_KEY = "85c461349d751b0e2392693a041752c0"; // This will be replaced by Netlify
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const GEO_API_URL = "https://api.openweathermap.org/geo/1.0/reverse?limit=1&";

// Production warning
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    console.log("🌤️ Weather app running in production mode");
}

// DOM Elements
const searchBox = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const locationBtn = document.querySelector(".location-btn");
const weatherIcon = document.querySelector(".weather-icon");
const loadingDiv = document.getElementById("loading");
const weatherContent = document.getElementById("weather-content");
const errorMessage = document.getElementById("error-message");

// Weather icon mapping
const weatherIcons = {
    "Clear": "images/clear.png",
    "Clouds": "images/clouds.png",
    "Drizzle": "images/drizzle.png",
    "Mist": "images/mist.png",
    "Rain": "images/rain.png",
    "Snow": "images/snow.png",
    "Thunderstorm": "images/rain.png",
    "Fog": "images/mist.png"
};

// Show loading state
function showLoading() {
    loadingDiv.style.display = "flex";
    weatherContent.style.display = "none";
    errorMessage.style.display = "none";
}

// Show weather content
function showWeatherContent() {
    loadingDiv.style.display = "none";
    weatherContent.style.display = "block";
    errorMessage.style.display = "none";
}

// Show error message
function showError() {
    loadingDiv.style.display = "none";
    weatherContent.style.display = "none";
    errorMessage.style.display = "block";
}

// Format time from timestamp
function formatTime(timestamp, timezone) {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'UTC'
    });
}

// Get weather data by city name
async function getWeatherByCity(city) {
    try {
        showLoading();
        const response = await fetch(`${API_URL}${encodeURIComponent(city)}&appid=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        displayWeatherData(data);
        
        // Save last searched city
        localStorage.setItem('lastSearchedCity', city);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError();
    }
}

// Get weather data by coordinates
async function getWeatherByCoordinates(lat, lon) {
    try {
        showLoading();
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error('Unable to fetch weather data');
        }
        
        const data = await response.json();
        displayWeatherData(data);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError();
    }
}

// Display weather data
function displayWeatherData(data) {
    // Update basic weather info
    document.querySelector(".city-name").textContent = `${data.name}, ${data.sys.country}`;
    document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".weather-desc").textContent = data.weather[0].description;
    document.querySelector(".feels-like-temp").textContent = `${Math.round(data.main.feels_like)}°C`;
    
    // Update weather icon
    const weatherCondition = data.weather[0].main;
    const iconSrc = weatherIcons[weatherCondition] || "images/clear.png";
    weatherIcon.src = iconSrc;
    weatherIcon.alt = data.weather[0].description;
    
    // Update detailed information
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    document.querySelector(".visibility").textContent = data.visibility ? `${(data.visibility / 1000).toFixed(1)} km` : 'N/A';
    document.querySelector(".pressure").textContent = `${data.main.pressure} hPa`;
    
    // Update sunrise and sunset times
    if (data.sys.sunrise && data.sys.sunset) {
        document.querySelector(".sunrise-time").textContent = formatTime(data.sys.sunrise, data.timezone);
        document.querySelector(".sunset-time").textContent = formatTime(data.sys.sunset, data.timezone);
    }
    
    // Show weather content
    showWeatherContent();
    
    // Add subtle animation to weather icon
    weatherIcon.style.animation = 'none';
    setTimeout(() => {
        weatherIcon.style.animation = 'bounce 2s ease-in-out';
    }, 100);
}

// Get user's geolocation
function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by this browser.');
        return;
    }
    
    locationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoordinates(latitude, longitude);
            locationBtn.innerHTML = '<i class="fas fa-location-arrow"></i>';
        },
        (error) => {
            console.error('Geolocation error:', error);
            alert('Unable to retrieve your location. Please enter a city name manually.');
            locationBtn.innerHTML = '<i class="fas fa-location-arrow"></i>';
        },
        {
            timeout: 10000,
            enableHighAccuracy: true
        }
    );
}

// Handle search input
function handleSearch() {
    const city = searchBox.value.trim();
    if (city) {
        getWeatherByCity(city);
        searchBox.value = '';
    }
}

// Add keyboard animation effect
function addKeyboardAnimation() {
    const keys = document.querySelectorAll('.detail-card');
    keys.forEach((key, index) => {
        setTimeout(() => {
            key.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }, index * 100);
    });
}

// Event Listeners
searchBtn.addEventListener("click", handleSearch);

locationBtn.addEventListener("click", getCurrentLocation);

// Enter key press for search
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleSearch();
    }
});

// Auto-focus search input
searchBox.addEventListener("focus", () => {
    searchBox.style.transform = "scale(1.02)";
});

searchBox.addEventListener("blur", () => {
    searchBox.style.transform = "scale(1)";
});

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Load last searched city if available
    const lastCity = localStorage.getItem('lastSearchedCity');
    if (lastCity) {
        getWeatherByCity(lastCity);
    } else {
        // Hide loading initially
        loadingDiv.style.display = "none";
    }
    
    // Add subtle animations
    setTimeout(addKeyboardAnimation, 500);
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
