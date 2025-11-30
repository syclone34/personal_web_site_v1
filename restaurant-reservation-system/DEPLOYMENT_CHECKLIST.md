# 📋 Deployment Checklist

Use this checklist to track your deployment progress!

## 🎯 Pre-Deployment

- [ ] Review code for any sensitive information (API keys, passwords)
- [ ] Test application locally
  - [ ] Frontend runs: `cd client && npm start`
  - [ ] Backend runs: `cd server && npm start`
  - [ ] Can make a reservation
  - [ ] Admin dashboard works
- [ ] All dependencies installed
- [ ] README.md is complete and professional

---

## 📦 GitHub Setup

- [ ] Create GitHub repository: `restaurant-reservation-system`
- [ ] Repository is PUBLIC (required for free hosting)
- [ ] Push code to GitHub
  ```powershell
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/YOUR_USERNAME/restaurant-reservation-system.git
  git push -u origin main
  ```
- [ ] Verify code is visible on GitHub
- [ ] Add repository description
- [ ] Add topics/tags: `react`, `nodejs`, `express`, `sqlite`, `restaurant`, `reservation-system`

---

## 🖥️ Backend Deployment (Render)

- [ ] Create Render account (use GitHub login)
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Configure settings:
  - [ ] Name: `restaurant-reservation-backend`
  - [ ] Root Directory: `server`
  - [ ] Environment: Node
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
  - [ ] Plan: Free
- [ ] Deploy and wait for completion (3-5 min)
- [ ] Test health endpoint: `YOUR_URL/api/health`
- [ ] Copy backend URL: `___________________________`

---

## 🎨 Frontend Deployment (Vercel)

- [ ] Create Vercel account (use GitHub login)
- [ ] Import repository
- [ ] Configure settings:
  - [ ] Framework: Create React App
  - [ ] Root Directory: `client`
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `build`
- [ ] Add environment variable:
  - [ ] Name: `REACT_APP_API_URL`
  - [ ] Value: `YOUR_BACKEND_URL/api`
- [ ] Deploy and wait for completion (2-3 min)
- [ ] Test frontend: `YOUR_VERCEL_URL`
- [ ] Copy frontend URL: `___________________________`

---

## ✅ Testing Deployed App

- [ ] Visit frontend URL
- [ ] Home page loads correctly
- [ ] Click "Make a Reservation"
- [ ] Fill in reservation form
- [ ] Click "Check Available Times" - times appear
- [ ] Select a time and submit
- [ ] See success message
- [ ] Go to Admin Dashboard
- [ ] See your test reservation
- [ ] Test on mobile device
- [ ] Test on different browser

---

## 🔧 CORS Configuration

If you see CORS errors:

- [ ] Go to Render dashboard
- [ ] Open your backend service
- [ ] Click "Environment"
- [ ] Add ALLOWED_ORIGINS variable with your Vercel URL
- [ ] Redeploy backend
- [ ] Clear browser cache and test again

---

## 🎯 Update Portfolio Website

- [ ] Run update script:
  ```powershell
  cd restaurant-reservation-system
  .\update-portfolio.ps1 -FrontendUrl "YOUR_VERCEL_URL"
  ```
- [ ] OR manually update `index.html` with live demo link
- [ ] Test portfolio website locally
- [ ] Commit and push changes
- [ ] Verify portfolio shows live demo

---

## 📸 Documentation

- [ ] Take screenshots of working app
- [ ] Add screenshots to GitHub README
- [ ] Update GitHub README with live demo links
- [ ] Add deployment status badges (optional)
- [ ] Create animated GIF of app in action (optional)

---

## 🌐 Share Your Work

- [ ] Update LinkedIn with project
- [ ] Add to resume with live demo link
- [ ] Share in relevant communities
- [ ] Add to portfolio website
- [ ] Email to potential employers

---

## 🔄 Maintenance

- [ ] Set up UptimeRobot to keep backend warm (optional)
- [ ] Monitor Render logs for errors
- [ ] Monitor Vercel analytics
- [ ] Update dependencies monthly:
  ```powershell
  cd client && npm update
  cd ../server && npm update
  ```

---

## 📞 Troubleshooting

If something doesn't work:

1. **Check browser console** (F12) for errors
2. **Check Render logs** in dashboard
3. **Check Vercel logs** in dashboard
4. **Test backend health endpoint** directly
5. **Verify environment variables** are set correctly
6. **Try redeploying** both frontend and backend
7. **Check CORS configuration** in server.js

---

## 🎉 Completion Checklist

- [ ] Backend is live and responding
- [ ] Frontend is live and looks good
- [ ] App works end-to-end
- [ ] Portfolio is updated
- [ ] GitHub repo looks professional
- [ ] Project added to resume
- [ ] Shared on LinkedIn
- [ ] Tested on mobile

---

## 📝 Your Live URLs

**Frontend:** `_________________________________________________`

**Backend:** `_________________________________________________`

**GitHub:** `https://github.com/YOUR_USERNAME/restaurant-reservation-system`

**Portfolio:** `https://YOUR_PORTFOLIO.com`

---

## 🎯 Next Project Ideas

Now that you have one project deployed, consider:

1. Deploy the Fitness Tracker Dashboard
2. Deploy the Real Estate Marketplace
3. Create a personal blog with deployment
4. Build a full-stack e-commerce site

---

**Deployment Date:** _______________

**Notes:**
_______________________________________________________________________________
_______________________________________________________________________________
_______________________________________________________________________________

---

🎉 **Congratulations on deploying your first full-stack application!** 🎉
