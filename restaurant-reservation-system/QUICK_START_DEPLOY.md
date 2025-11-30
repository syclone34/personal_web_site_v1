# 🎯 Quick Start - Deploy in 10 Minutes

Follow these steps to get your restaurant reservation system live!

## ✅ Prerequisites Checklist

- [ ] GitHub account
- [ ] Git installed on your computer
- [ ] Project code is ready

---

## 🚀 Step-by-Step Deployment

### 1️⃣ Push to GitHub (5 minutes)

```powershell
# Navigate to project directory
cd c:\Users\syclo\personal_web_site_v1\restaurant-reservation-system

# Check if git is initialized
git status

# If not initialized, run:
git init
git add .
git commit -m "Initial commit"

# Create a new repo on GitHub:
# Go to: https://github.com/new
# Name it: restaurant-reservation-system
# Make it PUBLIC
# Don't add README, .gitignore, or license (we already have them)

# Link your local repo to GitHub (replace YOUR_USERNAME):
git remote add origin https://github.com/YOUR_USERNAME/restaurant-reservation-system.git
git branch -M main
git push -u origin main
```

**✅ Checkpoint:** Your code should now be visible on GitHub!

---

### 2️⃣ Deploy Backend to Render (3 minutes)

1. **Sign up/Login**: Go to [render.com](https://render.com) → Sign in with GitHub

2. **New Web Service**: 
   - Click "New +" → "Web Service"
   - Click "Connect" next to your repository
   
3. **Configure**:
   ```
   Name: restaurant-reservation-backend
   Root Directory: server
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

4. **Deploy**: Click "Create Web Service"

5. **Copy URL**: Once deployed, copy your backend URL
   - Example: `https://restaurant-reservation-backend.onrender.com`

**✅ Checkpoint:** Test at `YOUR_BACKEND_URL/api/health` - should return JSON!

---

### 3️⃣ Deploy Frontend to Vercel (2 minutes)

1. **Sign up/Login**: Go to [vercel.com](https://vercel.com) → Sign in with GitHub

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your repository
   
3. **Configure**:
   ```
   Framework: Create React App
   Root Directory: client
   Build Command: npm run build
   Output Directory: build
   ```

4. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add:
     ```
     Name: REACT_APP_API_URL
     Value: YOUR_BACKEND_URL/api
     ```
   - Example: `https://restaurant-reservation-backend.onrender.com/api`

5. **Deploy**: Click "Deploy"

**✅ Checkpoint:** Your frontend is now live! Test the booking form.

---

## 🎉 You're Live!

Your URLs:
- **Frontend**: `https://restaurant-reservation-system.vercel.app`
- **Backend**: `https://restaurant-reservation-backend.onrender.com`

---

## 🔧 Update Your Portfolio

Now update your portfolio website with the live demo link!

```html
<!-- In personal_web_site_v1/index.html -->
<div class="project-links">
    <a href="https://YOUR-APP.vercel.app" target="_blank" class="project-link">
        <i class="fas fa-external-link-alt"></i> Live Demo
    </a>
    <a href="https://github.com/YOUR-USERNAME/restaurant-reservation-system" target="_blank" class="project-link">
        <i class="fab fa-github"></i> View Code
    </a>
</div>
```

---

## 🐛 Common Issues

### Frontend can't connect to backend
**Fix:** Update Render backend CORS settings
1. Add your Vercel domain to the CORS configuration
2. In `server/server.js`, the CORS is already configured
3. Redeploy backend

### Backend is slow (30-50 seconds)
**Normal:** Free tier spins down after 15 min of inactivity
**Optional Fix:** Use UptimeRobot to ping every 5 min (keeps it warm)

---

## 📝 Making Updates

After making changes to your code:

```powershell
# Use the quick deploy script
cd restaurant-reservation-system
.\deploy.ps1

# Or manually:
git add .
git commit -m "Your update description"
git push origin main
```

Both Vercel and Render will automatically redeploy! 🎉

---

## 🎯 Next Steps

- [ ] Test all features on the live site
- [ ] Update your resume with the live demo link
- [ ] Add screenshots to your GitHub README
- [ ] Share on LinkedIn
- [ ] Add to your portfolio website

---

Need help? Check `DEPLOYMENT_GUIDE.md` for detailed troubleshooting!
