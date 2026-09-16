# Ubaid Ullah — Portfolio

## Structure
- index.html — main page
- css/style.css — all styling
- js/script.js — interactions, filters, lightbox, chatbot
- assets/photo/ubaid.png — profile photo
- assets/certs/ — certificate images (click any cert on the site to view full size)

## Deploy
Drag this whole folder into Netlify, or push it to a GitHub repo and enable GitHub Pages / connect to Vercel — works the same way as your other static sites.

## Chatbot note
The AI assistant widget calls `/.netlify/functions/chat` (same as your old portfolio). That serverless function isn't included here — if you're deploying to Netlify, add back the function that calls the Groq API; otherwise the widget will show a connection error when someone tries to chat.
