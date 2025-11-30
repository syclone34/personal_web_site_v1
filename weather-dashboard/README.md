# 🌤️ Weather Dashboard

A beautiful and responsive weather dashboard that displays real-time weather conditions and 5-day forecasts for any city worldwide.

![Weather Dashboard](https://img.shields.io/badge/Status-Active-success)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![API](https://img.shields.io/badge/API-OpenWeather-blue)

## 🎯 Features

### Core Functionality
- 🌍 **Search Any City** - Get weather for cities worldwide
- 📍 **Current Location** - Use geolocation to get local weather
- 🌡️ **Current Conditions** - Temperature, feels like, humidity, wind speed, visibility, and pressure
- 📅 **5-Day Forecast** - Extended forecast with daily high/low temperatures
- ❤️ **Favorite Cities** - Save and quickly access your favorite locations
- 🎨 **Dynamic Backgrounds** - Background changes based on weather conditions
- 💾 **Persistent Data** - Remembers your last searched city and favorites

### Visual Features
- ⛅ **Weather Icons** - Intuitive icons for different weather conditions
- 🌈 **Animated UI** - Smooth transitions and animations
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🎭 **Day/Night Themes** - Background adapts to time of day

## 🚀 Quick Setup

### Step 1: Get Your Free API Key
1. Go to [OpenWeatherMap.org](https://openweathermap.org/api)
2. Click "Sign Up" (it's free!)
3. Verify your email
4. Go to "API keys" section
5. Copy your API key

### Step 2: Add API Key to Project
Open `script.js` and replace `YOUR_API_KEY_HERE` with your actual API key:

```javascript
this.API_KEY = 'your_actual_api_key_here';
```

### Step 3: Open the App
```powershell
# Open in browser
start c:\Users\syclo\personal_web_site_v1\weather-dashboard\index.html

# OR use Live Server in VS Code
# Right-click index.html → "Open with Live Server"
```

## 📁 Project Structure

```
weather-dashboard/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Weather API integration
├── README.md          # This file
└── SETUP_GUIDE.md     # Detailed setup instructions
```

## 💡 How to Use

### Search for Weather
1. Type a city name in the search box (e.g., "Minneapolis, MN")
2. Click the search button or press Enter
3. View current conditions and 5-day forecast

### Use Your Location
1. Click the location button (📍)
2. Allow location access when prompted
3. See weather for your current location

### Save Favorite Cities
1. Search for a city
2. Click the heart icon (❤️) in the current weather section
3. City appears in "Favorite Cities" below
4. Click any favorite to quickly view its weather

## 🎨 Weather Conditions

The app displays different backgrounds based on weather:
- ☀️ **Clear Sky** - Blue gradient (day) or dark gradient (night)
- ☁️ **Cloudy** - Gray gradient
- 🌧️ **Rain** - Blue-gray gradient
- ❄️ **Snow** - White-gray gradient
- ⛈️ **Thunderstorm** - Dark gray gradient

## 🌐 Deployment

### Deploy to GitHub Pages

```powershell
# Navigate to project
cd weather-dashboard

# Initialize git
git init
git add .
git commit -m "Initial commit - Weather Dashboard"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/weather-dashboard.git
git branch -M main
git push -u origin main

# Enable GitHub Pages
# Settings → Pages → Source: main → Save
```

**Your app will be live at:** `https://YOUR_USERNAME.github.io/weather-dashboard`

### Deploy to Netlify

1. Drag and drop the `weather-dashboard` folder to [Netlify Drop](https://app.netlify.com/drop)
2. Live instantly! No configuration needed.

### Important: API Key Security

⚠️ **For production deployment:**

The API key is visible in the source code. For public projects:

1. **Use environment variables** (for server-side apps)
2. **Implement a backend proxy** to hide the key
3. **Use OpenWeather's free tier** (60 calls/min limit is usually fine)
4. **Enable key restrictions** in OpenWeather dashboard (domain/IP restrictions)

For portfolio projects, the free tier with a visible key is acceptable.

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Grid, Flexbox, custom properties, animations
- **JavaScript (ES6+)** - Classes, async/await, Fetch API
- **OpenWeather API** - Weather data
- **LocalStorage API** - Persistent favorites
- **Geolocation API** - Current location feature

### API Endpoints Used
```javascript
// Current weather
GET https://api.openweathermap.org/data/2.5/weather

// 5-day forecast
GET https://api.openweathermap.org/data/2.5/forecast
```

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📊 Features Breakdown

### Current Weather Display
- City name and country
- Current date
- Temperature (°F)
- Weather description
- Feels like temperature
- Humidity percentage
- Wind speed
- Visibility
- Atmospheric pressure
- Weather icon

### 5-Day Forecast
- Day of week
- Date
- Weather icon
- High/Low temperatures
- Weather description

### Favorites System
- Save unlimited cities
- Quick access cards
- Shows current temp
- One-click weather lookup
- Persistent storage

## 🔧 Customization

### Change Temperature Units
In `script.js`, change `units=imperial` to `units=metric`:
```javascript
`${this.API_URL}/weather?q=${city}&units=metric&appid=${this.API_KEY}`
```

### Modify Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #4f46e5;
    --secondary-color: #64748b;
    /* Add your custom colors */
}
```

### Add More Weather Details
The OpenWeather API provides:
- UV Index (requires separate endpoint)
- Air Quality Index
- Hourly forecast
- Weather alerts

## 📈 Future Enhancements

Ideas for expanding the project:
- [ ] Hourly forecast graph
- [ ] Weather radar maps
- [ ] Severe weather alerts
- [ ] Air quality index
- [ ] Sunrise/sunset times
- [ ] Moon phases
- [ ] Weather history
- [ ] Multiple location comparison
- [ ] Export weather data
- [ ] Dark mode toggle
- [ ] Unit conversion (°F/°C)
- [ ] Wind direction compass

## 🐛 Troubleshooting

### "Invalid API Key" Error
- Make sure you've activated your API key (can take 10-15 minutes)
- Check that you copied the key correctly
- Verify your API key is active in OpenWeather dashboard

### "City Not Found" Error
- Check spelling
- Try adding country code (e.g., "London, UK")
- Use comma between city and state (e.g., "Miami, FL")

### Location Button Not Working
- Allow location access when prompted
- Check browser location settings
- Try on HTTPS (required for geolocation)

### Favorites Not Loading
- Clear browser cache
- Check browser console for errors
- Make sure LocalStorage is enabled

## 📝 License

MIT License - feel free to use for your portfolio!

## 👤 Author

**Cole Fuller**
- Email: crfuller34@gmail.com
- Location: Minneapolis, MN
- GitHub: [@syclone34](https://github.com/syclone34)

## 🎓 Learning Resources

This project demonstrates:
- Working with REST APIs
- Async/await and Promises
- DOM manipulation
- LocalStorage
- Geolocation API
- Responsive design
- CSS animations
- Error handling

## 🙏 Credits

- Weather data provided by [OpenWeather](https://openweathermap.org/)
- Icons from [Font Awesome](https://fontawesome.com/)

---

Built with ☀️ by Cole Fuller
