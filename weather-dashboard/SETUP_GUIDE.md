# 🌤️ Weather Dashboard - Setup Guide

Complete setup instructions to get your Weather Dashboard running!

## 📋 Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Internet connection
- 5 minutes of your time!

---

## 🔑 Step 1: Get Your Free OpenWeather API Key

### 1.1 Create Account
1. Visit [OpenWeatherMap.org](https://openweathermap.org/api)
2. Click **"Sign Up"** in the top right
3. Fill in the registration form:
   - Username
   - Email address
   - Password
4. Agree to terms and click **"Create Account"**

### 1.2 Verify Email
1. Check your email inbox
2. Click the verification link
3. You'll be redirected to OpenWeather

### 1.3 Get API Key
1. Log in to your OpenWeather account
2. Go to **"API keys"** tab (in your account menu)
3. You'll see a default API key already created
4. **Copy this key** - you'll need it in the next step

### 1.4 Important Notes
- ⏰ New API keys take **10-15 minutes to activate**
- 🆓 Free tier includes **60 calls per minute** (more than enough!)
- 💰 No credit card required
- ✅ Perfect for personal projects and portfolios

---

## 💻 Step 2: Configure the Application

### 2.1 Open script.js
```powershell
# Open in VS Code
code c:\Users\syclo\personal_web_site_v1\weather-dashboard\script.js
```

### 2.2 Add Your API Key
Find this line near the top of the file:
```javascript
this.API_KEY = 'YOUR_API_KEY_HERE'; // Line 5
```

Replace `YOUR_API_KEY_HERE` with your actual API key:
```javascript
this.API_KEY = 'abc123def456ghi789jkl'; // Your actual key
```

### 2.3 Save the File
- Press `Ctrl + S` (Windows) or `Cmd + S` (Mac)
- Make sure the file is saved!

---

## 🚀 Step 3: Run the Application

### Option A: Open Directly in Browser (Easiest)
```powershell
# PowerShell
start c:\Users\syclo\personal_web_site_v1\weather-dashboard\index.html

# Or just double-click index.html in File Explorer
```

### Option B: Use VS Code Live Server (Recommended)
1. Install **"Live Server"** extension in VS Code:
   - Open VS Code
   - Click Extensions (Ctrl+Shift+X)
   - Search "Live Server"
   - Install by Ritwick Dey

2. Start Live Server:
   - Right-click `index.html`
   - Select **"Open with Live Server"**
   - App opens at `http://localhost:5500`

### Option C: Use Python HTTP Server
```powershell
cd weather-dashboard
python -m http.server 8000

# Open browser to: http://localhost:8000
```

---

## ✅ Step 4: Test the Application

### 4.1 Test City Search
1. Type "Minneapolis, MN" in the search box
2. Click the **Search** button
3. You should see:
   - Current weather conditions
   - Temperature and details
   - 5-day forecast below

### 4.2 Test Location Feature
1. Click the **location button** (📍)
2. Allow location access when prompted
3. Your local weather should appear

### 4.3 Test Favorites
1. Search for a city
2. Click the **heart icon** (❤️)
3. City appears in "Favorite Cities" section
4. Click the favorite card to reload weather

---

## 🐛 Troubleshooting

### ❌ "Invalid API Key" Error

**Cause:** API key not activated yet

**Solutions:**
1. Wait 15 minutes after creating your account
2. Check you copied the entire key correctly
3. Verify key is active in OpenWeather dashboard
4. Make sure there are no extra spaces in the key

### ❌ "City Not Found" Error

**Cause:** City name not recognized

**Solutions:**
- Use proper spelling: `Minneapolis` not `minnneapolis`
- Include state: `Portland, OR` not just `Portland`
- Include country: `London, UK` not just `London`
- Try official city name: `New York` not `NYC`

### ❌ Location Button Doesn't Work

**Cause:** Location access denied or not available

**Solutions:**
1. Check browser location permissions:
   - Chrome: Click the 🔒 icon → Site settings → Location → Allow
   - Firefox: Click the shield icon → Permissions → Allow
2. Make sure you're on HTTPS (or localhost)
3. Try allowing location again when prompted

### ❌ Favorites Don't Save

**Cause:** LocalStorage blocked or disabled

**Solutions:**
1. Enable cookies and site data in browser
2. Clear browser cache and try again
3. Make sure you're not in Incognito/Private mode

### ❌ Background Doesn't Change

**Cause:** Weather condition not recognized

**Solution:**
- This is normal for some conditions
- Default purple gradient will show
- Check browser console (F12) for errors

---

## 🎯 Usage Tips

### Best Search Practices
✅ **Good searches:**
- `Minneapolis, MN`
- `London, UK`
- `Tokyo, Japan`
- `Los Angeles, CA`

❌ **Avoid:**
- `mpls` (use full city name)
- `NYC` (use New York)
- `LA` (use Los Angeles)

### Favorite Cities
- You can save unlimited cities
- Favorites persist between sessions
- Click the ❌ to remove a favorite
- Favorites show current temperature

### Keyboard Shortcuts
- **Enter** - Search for city
- **Esc** - Clear error messages

---

## 🌐 Deploy Your Dashboard

Once everything works locally, deploy it online!

### Quick Deploy to Netlify (Fastest!)
1. Go to [netlify.com](https://www.netlify.com/)
2. Sign up with GitHub
3. Drag and drop your `weather-dashboard` folder
4. Your app is live in 30 seconds!

### Deploy to GitHub Pages
```powershell
cd weather-dashboard

git init
git add .
git commit -m "Weather Dashboard"

# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/weather-dashboard.git
git push -u origin main

# Enable Pages in repo settings
```

### Deploy to Vercel
```powershell
npm install -g vercel
cd weather-dashboard
vercel
```

---

## 🔒 Security Note for Deployment

### API Key Visibility
Your API key will be visible in the source code when deployed. This is **generally okay** for:
- ✅ Portfolio projects
- ✅ Personal use
- ✅ Free tier API keys with usage limits

### To Protect Your Key (Advanced):
1. **Add domain restrictions** in OpenWeather dashboard
2. **Create a backend proxy** to hide the key
3. **Use environment variables** (requires build process)

For most portfolio projects, the free tier with a visible key is perfectly fine!

---

## 📊 API Usage

### Free Tier Limits
- **60 calls per minute**
- **1,000,000 calls per month**
- **Current weather** + **5-day forecast**

### Typical Usage
- One search = 2 API calls (current + forecast)
- Favorites refresh = 1 call per city
- You'll rarely hit the limits for personal use!

---

## ✨ Customization Ideas

Once it's working, try customizing:

### Easy Changes:
- Change colors in `styles.css`
- Modify city placeholder text
- Add your name to the footer

### Medium Changes:
- Change to Celsius (line 120 in `script.js`)
- Add more weather details
- Customize background gradients

### Advanced Changes:
- Add hourly forecast
- Include weather radar
- Add weather alerts
- Create weather graphs

---

## 📞 Need Help?

If you're stuck:

1. **Check browser console** (F12) for error messages
2. **Review this guide** step by step
3. **Verify API key** is activated and correct
4. **Try a different browser** to rule out extensions
5. **Check OpenWeather status** at status.openweathermap.org

---

## 🎉 Success Checklist

- [ ] OpenWeather account created
- [ ] API key obtained and activated
- [ ] API key added to script.js
- [ ] Application opens in browser
- [ ] City search works
- [ ] Location button works
- [ ] Favorites save correctly
- [ ] Responsive on mobile
- [ ] Ready to deploy!

---

## 🚀 Next Steps

Once your Weather Dashboard is working:

1. **Add to portfolio** - Update your portfolio website
2. **Deploy online** - Make it accessible to everyone
3. **Share on LinkedIn** - Show off your work!
4. **Add to resume** - List it as a project
5. **Get feedback** - Share with friends and family

---

**Congratulations! Your Weather Dashboard is ready! 🌤️**

Built by Cole Fuller | [GitHub](https://github.com/syclone34)
