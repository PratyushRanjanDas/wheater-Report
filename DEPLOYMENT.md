# Weather App - Netlify Deployment Guide 🚀

This guide shows how to deploy your weather app securely on Netlify without exposing your API key.

## 🔐 Security First: Hide Your API Key

**NEVER** commit your actual API key to version control. Netlify will inject it securely at build time.

### Step 1: Prepare Your API Key
1. Get your API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Keep it handy - you'll add it to Netlify dashboard

## 🚀 Netlify Deployment (Recommended)

#### Quick Deploy:
1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. In Netlify dashboard:
   - Go to **Site settings** → **Environment variables**
   - Add: `WEATHER_API_KEY` = your actual API key
4. Deploy!

#### Manual Deploy:
```bash
# Build and deploy manually
npm run build  # if using build process
# Upload dist/ folder to Netlify
```

**Netlify URL:** Your app will be available at `https://your-app-name.netlify.app`

---

### Option 2: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variable:
   ```bash
   vercel env add WEATHER_API_KEY
   ```
4. Enter your API key when prompted
5. Deploy: `vercel --prod`

**Vercel URL:** Your app will be available at `https://your-app.vercel.app`

---

### Option 3: GitHub Pages + Actions

1. In your GitHub repository, go to **Settings** → **Secrets and variables** → **Actions**
2. Add repository secret: `WEATHER_API_KEY` = your actual API key
3. Enable GitHub Pages in repository settings
4. Push your code - GitHub Actions will automatically deploy

**GitHub Pages URL:** `https://your-username.github.io/your-repo-name`

---

### Option 4: Full-Stack Deployment (Most Secure)

Deploy with backend proxy to completely hide API key:

#### Heroku:
```bash
# Install Heroku CLI and login
heroku create your-weather-app
heroku config:set WEATHER_API_KEY=your_actual_api_key
git push heroku main
```

#### Railway:
1. Connect GitHub repo to [Railway](https://railway.app)
2. Add environment variable: `WEATHER_API_KEY`
3. Deploy automatically

#### Render:
1. Connect GitHub repo to [Render](https://render.com)
2. Add environment variable in dashboard
3. Deploy with auto-deploy enabled

---

## 🛡️ Security Best Practices

### Environment Variables Setup:
```bash
# Create .env file (DON'T commit this!)
echo "WEATHER_API_KEY=your_actual_api_key_here" > .env

# Verify .gitignore includes .env
echo ".env" >> .gitignore
```

### API Key Restrictions:
1. In OpenWeatherMap dashboard, restrict your API key:
   - **HTTP referrers:** Add your domain(s)
   - **API restrictions:** Only enable Current Weather Data
   - **Usage limits:** Set reasonable limits

---

## 🧪 Local Development

### Static Version:
```bash
# Just open in browser or use live server
open Index.html
```

### With Backend (Recommended):
```bash
# Install dependencies
npm install

# Create .env file with your API key
echo "WEATHER_API_KEY=your_actual_api_key" > .env

# Start development server
npm start

# App runs on http://localhost:3000
```

---

## 🔍 Troubleshooting

### Common Issues:

1. **API Key not working:**
   - Check if API key is correctly set in environment variables
   - Verify API key is active in OpenWeatherMap dashboard
   - Check console for error messages

2. **CORS Errors:**
   - Use the backend proxy option
   - Or deploy to a proper hosting service

3. **Environment Variables not loading:**
   - Ensure variable names match exactly
   - Restart your development server
   - Check deployment platform documentation

### Debug Commands:
```bash
# Check if environment variables are set
node -p "process.env.WEATHER_API_KEY"

# Test API endpoint locally
curl "http://localhost:3000/api/health"
```

---

## 📱 Testing Your Deployment

1. **Functionality Test:**
   - Search for different cities
   - Test geolocation feature
   - Check all weather details display correctly

2. **Security Test:**
   - Open browser dev tools
   - Check Network tab - API key should not be visible in requests
   - Verify environment variables aren't exposed

3. **Performance Test:**
   - Test on different devices
   - Check loading times
   - Verify responsive design

---

## 🎯 Quick Start Commands

```bash
# For Netlify
git add . && git commit -m "Deploy to Netlify" && git push

# For Vercel
vercel --prod

# For local development with backend
npm install && npm start
```

---

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify environment variables are set correctly
3. Test API key directly on OpenWeatherMap
4. Check hosting platform logs

**Happy deploying! 🌤️**