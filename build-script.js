#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Building for Netlify deployment...');

// Get the API key from environment variables
const apiKey = process.env.WEATHER_API_KEY;

if (!apiKey) {
    console.error('❌ WEATHER_API_KEY environment variable not set!');
    console.log('Please set this in your Netlify dashboard under Site settings > Environment variables');
    process.exit(1);
}

// Read the JavaScript file
const scriptPath = path.join(__dirname, 'script.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Replace the placeholder API key with the environment variable
const placeholder = '"85c461349d751b0e2392693a041752c0"';
scriptContent = scriptContent.replace(placeholder, `"${apiKey}"`);

// Write the updated file
fs.writeFileSync(scriptPath, scriptContent);

console.log('✅ API key injected successfully');
console.log('🚀 Build complete - ready for deployment!');
console.log('📁 Files ready for static hosting on Netlify');