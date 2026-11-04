// Thrive site settings. Fill this in once, then upload it next to index.html.
// When you upload a newer Thrive later, keep YOUR filled-in copy of this file.
window.THRIVE_CONFIG = {
  // 1) Firebase: accounts, saving everyone's data, friends, circles and messages.
  //    Firebase console › Project settings › General › Your apps › Web app › Config. Paste the values.
  firebaseConfig: {
    apiKey: "AIzaSyAU4MCw6PqVpAqrMISW8zPeDdL2pVt2r34",
    authDomain: "thrive-f6f88.firebaseapp.com",
    projectId: "thrive-f6f88",
    storageBucket: "thrive-f6f88.firebasestorage.app",
    messagingSenderId: "415384939724",
    appId: "1:415384939724:web:c047a9699d4bc48a362669"
  },



  // 2) Groq: the AI that reads food from words and photos, suggests meals and runs the coach.
  //    console.groq.com › API Keys › Create API key. Paste it between the quotes.
  //    Note: anyone who opens this file on your site can see the key. On Groq's free plan the
  //    worst case is that someone uses up your daily allowance; you can delete the key and make a new one any time.
  groqKey: "",

  // Models (leave as they are unless Groq retires one)
  aiModel: "openai/gpt-oss-120b",
  aiVisionModel: "qwen/qwen3.8-27b",

  // Optional, advanced: address of a private AI relay (see README, "Optional: hide the key"). Leave empty normally.
  aiProxy: ""
};
