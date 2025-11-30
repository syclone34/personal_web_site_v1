# 🚀 Deployment Guide - Restaurant Reservation System

This guide will walk you through deploying your restaurant reservation system with **free hosting**.

## Deployment Strategy

- **Frontend**: Vercel (Free tier, perfect for React apps)
- **Backend**: Render (Free tier with automatic deploys)

---

## 📦 Step 1: Prepare Your Code

### 1.1 Create a GitHub Repository

If you haven't already pushed this to GitHub:

```powershell
# Navigate to the project root
cd c:\Users\syclo\personal_web_site_v1

# Initialize git if not already done
git init

# Add your files
git add .

# Commit
git commit -m "Initial commit - Restaurant Reservation System"

# Create a new repository on GitHub (go to github.com/new)
# Then link it:
git remote add origin https://github.com/syclone34/restaurant-reservation-system.git
git branch -M main
git push -u origin main
```

---

## 🖥️ Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account (free)

### 2.2 Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select `restaurant-reservation-system`

### 2.3 Configure Build Settings
```
Name: restaurant-reservation-backend
Root Directory: server
Environment: Node
Region: Choose closest to you
Branch: main

Build Command: npm install
Start Command: npm start
```

### 2.4 Select Free Plan
- Choose **"Free"** instance type (will spin down after 15 min of inactivity)

### 2.5 Add Environment Variables (Optional)
```
PORT=5000
NODE_ENV=production
```

### 2.6 Deploy!
- Click **"Create Web Service"**
- Wait 2-5 minutes for deployment
- Your backend will be at: `https://restaurant-reservation-backend.onrender.com`

**⚠️ Important:** Copy your backend URL - you'll need it for the frontend!

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account (free)

### 3.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Select `restaurant-reservation-system`

### 3.3 Configure Build Settings
```
Framework Preset: Create React App
Root Directory: client

Build Command: npm run build
Output Directory: build
Install Command: npm install
```

### 3.4 Add Environment Variable
Click **"Environment Variables"** and add:

```
Name: REACT_APP_API_URL
Value: https://your-backend-url.onrender.com/api
```

**Replace with your actual Render backend URL!**

### 3.5 Deploy!
- Click **"Deploy"**
- Wait 2-3 minutes
- Your frontend will be at: `https://restaurant-reservation-system.vercel.app`

---

## ✅ Step 4: Test Your Deployment

### 4.1 Test Backend
Visit: `https://your-backend-url.onrender.com/api/health`

Should return:
```json
{
  "status": "Server is running",
  "timestamp": "2025-11-29T..."
}
```

### 4.2 Test Frontend
1. Visit your Vercel URL
2. Click "Make a Reservation"
3. Fill in the form and check available times
4. Complete a test reservation
5. Check the Admin Dashboard

---

## 🔧 Step 5: Update Your Portfolio Website

Now that you have live URLs, update your portfolio!

### Update index.html
```html
<div class="project-links">
    <a href="https://restaurant-reservation-system.vercel.app" target="_blank" rel="noopener noreferrer" class="project-link">
        <i class="fas fa-external-link-alt"></i> Live Demo
    </a>
    <a href="https://github.com/syclone34/restaurant-reservation-system" target="_blank" rel="noopener noreferrer" class="project-link">
        <i class="fab fa-github"></i> View Code
    </a>
</div>
```

---

## 🐛 Troubleshooting

### Frontend Can't Connect to Backend
**Problem:** CORS errors or network failures

**Solution:**
1. Make sure backend URL is correct in Vercel environment variables
2. Check backend CORS configuration allows your frontend domain
3. Add to `server/server.js`:
   ```javascript
   app.use(cors({
     origin: ['https://restaurant-reservation-system.vercel.app', 'http://localhost:3000'],
     credentials: true
   }));
   ```
4. Redeploy backend after changes

### Backend Database Resets
**Problem:** Render free tier loses data after 15 min of inactivity

**Solution:**
- Free tier limitation - data persists but service spins down
- Upgrade to paid plan for persistent database
- Or migrate to a managed database:
  - [ElephantSQL](https://www.elephantsql.com/) (Free PostgreSQL)
  - [Railway](https://railway.app/) (PostgreSQL with free tier)
  - [MongoDB Atlas](https://www.mongodb.com/atlas) (Free NoSQL)

### Slow Initial Load
**Problem:** Backend takes 30-50 seconds on first request

**Solution:**
- Render free tier spins down after inactivity
- Considered normal for free hosting
- Shows in portfolio that you understand deployment
- Or upgrade to paid tier ($7/month)

---

## 🎯 Alternative Free Hosting Options

### Backend Alternatives
1. **Railway** (https://railway.app)
   - $5 free credit per month
   - Better performance than Render free tier
   
2. **Fly.io** (https://fly.io)
   - Free tier includes 3 small VMs
   - Better uptime

3. **Heroku** (https://heroku.com)
   - No longer has free tier (starts at $5/month)

### Frontend Alternatives
1. **Netlify** (https://netlify.com)
   - Similar to Vercel
   - Easy drag-and-drop deployment
   
2. **GitHub Pages** (https://pages.github.com)
   - Free for public repos
   - Requires some setup for React apps

3. **Cloudflare Pages** (https://pages.cloudflare.com)
   - Fast global CDN
   - Unlimited bandwidth

---

## 📚 Post-Deployment Checklist

- [ ] Backend is deployed and accessible
- [ ] Frontend is deployed and accessible
- [ ] Frontend can communicate with backend
- [ ] Test making a reservation
- [ ] Test admin dashboard
- [ ] Portfolio website updated with live demo link
- [ ] GitHub repository is public and has good README
- [ ] Add screenshots to GitHub README
- [ ] Test on mobile devices
- [ ] Share link on LinkedIn!

---

## 🚀 Next Steps to Impress Employers

1. **Add Custom Domain**
   - Buy a domain (Namecheap, Google Domains)
   - Point to Vercel: `restaurant.colefuller.dev`

2. **Add Analytics**
   - Google Analytics
   - Vercel Analytics (built-in)

3. **Add Authentication**
   - Protect admin dashboard
   - Use JWT or Auth0

4. **Migrate to PostgreSQL**
   - More professional than SQLite
   - Use ElephantSQL free tier
   - Update connection in `database.js`

5. **Add Testing**
   - Jest for unit tests
   - Cypress for E2E tests
   - Show on your resume

6. **Add CI/CD**
   - GitHub Actions
   - Automatic testing before deploy
   - Lint checks

---

## 💡 Pro Tips

1. **Keep Free Tier Active**
   - Render spins down after 15 min
   - Use [UptimeRobot](https://uptimerobot.com/) to ping every 5 min
   - Keeps your demo always ready

2. **Document Everything**
   - Add deployment badges to GitHub README
   - Screenshot the working app
   - Add to your resume/LinkedIn

3. **Monitor Your App**
   - Render provides basic logs
   - Vercel shows analytics
   - Check weekly for issues

---

## 📞 Need Help?

If you run into issues:
1. Check Render/Vercel logs for errors
2. Test backend health endpoint
3. Check browser console for frontend errors
4. Verify environment variables are set correctly

---

Good luck with your deployment! 🎉
