# Thrive

A health tracker website that works like an app: food, movement, water, habits, a coach, and friends. People open one link, create an account, answer three quick setup screens, and can add it to their home screen. Everything they log saves to their account automatically, so it's the same on any phone or computer they sign in on.

Setup takes about 20 minutes and is free. You do it once.

---

## 1. Put the site on GitHub Pages

This works the same way as your Escape Rooms site.

1. On GitHub, click **New repository**, name it `thrive`, choose **Public**, then click **Create**.
2. Click **Add file → Upload files** and drag in everything in this folder **except** `ai-relay`, `firestore.rules` and this README. Then click **Commit**.
3. Go to **Settings → Pages → Deploy from a branch → main → / (root) → Save**.
4. After a minute, the site is at `https://YOURNAME.github.io/thrive/`.

## 2. Firebase (accounts and saving everyone's data)

If you already have the `thrive-f6f88` project, skip to step 3 of this section.

1. Go to **console.firebase.google.com**, click **Add project**, name it, and click through the screens (you can turn Analytics off).
2. **Build → Authentication → Get started → Email/Password → Enable → Save.**
3. **Authentication → Settings → Authorized domains → Add domain**, then add `YOURNAME.github.io`.
4. **Build → Firestore Database → Create database.** Pick a region close to you (Johannesburg is `africa-south1`), then **Start in production mode**.
5. **Firestore → Rules:** delete what's there, paste everything from `firestore.rules`, then click **Publish**.
6. **Project settings (gear icon) → General → Your apps.** Click the `</>` icon to add a web app (any nickname), then copy the `firebaseConfig` values.

## 3. Groq (the AI)

1. Go to **console.groq.com**, sign in, open **API Keys**, click **Create API key**, and copy it (it starts with `gsk_`).

## 4. Fill in `config.js` and upload it

Open `config.js`, paste the six Firebase values and your Groq key between the quotes, save, and upload it to the repository (it replaces the blank one).

That's all the AI needs. Food from words and photos, meal ideas and the coach now work for everyone on the site.

> **About the key:** anyone who opens `config.js` on your site can see it. On Groq's free plan, the worst that can happen is that someone uses up your daily allowance. If that ever happens, delete the key on Groq, create a new one, and paste it in. (To hide the key completely, see *Optional* at the end.)

The Firebase values are meant to be public. People's data is protected by the rules you published in step 2, not by hiding this file.

## 5. Open it and add it to the home screen

- **iPhone (Safari):** open the link, tap **Share → Add to Home Screen**.
- **Android (Chrome):** open the link, tap **⋮ → Add to Home screen** (or **Install app**).
- **Computer:** just use the link. In Chrome, the install icon in the address bar adds it as an app.

Inside Thrive, **Me → Settings → Add to home screen** shows the same steps. On Android, long-press the icon for shortcuts to **Log food** and **Log my day**.

---

## How it works for the people using it

- **First visit:** a welcome screen where they create an account (or sign in), then three quick setup screens (about you, your goal, how you like to train).
- **Saving:** every change saves to their account a few seconds later. Nothing to back up and nothing to export. **Me → Settings → Account** shows "Everything is saved to your account".
- **Another phone or computer:** sign in with the same email and it's all there. No setup screens the second time.
- **Offline:** the app keeps working without signal and saves to the account when the connection is back.
- **Signing out** removes their data from that device (handy on a shared computer). It stays safe in their account.
- **Friends:** Me → Social. Find friends by name or friend ID, message them, send nudges and gifts, join circles and shared quests. Friends only see what each person chooses to share. Friends' updates load when you open Social, and an open chat refreshes every few seconds. Nothing keeps checking in the background.
- **Try without an account:** the welcome screen has a small link for people who just want a look. Their log stays in that browser until they create an account in Me → Settings → Account.

## Good to know

- **Progress photos** stay on the device they were taken on; they are never uploaded.
- **Reminders** only arrive while Thrive is open or was used recently, because a website can't wake a phone. A phone alarm is more reliable for daily nudges.
- **Barcode scanning** uses the camera in the browser. You can always type the number instead.
- **Forgot password:** the sign-in screen has **Forgot password?**, which emails a reset link.

## Updating Thrive later

Upload the new `index.html` and `sw.js` over the old ones. **Keep your filled-in `config.js`**; don't upload a blank one over it. People get the new version the next time they open Thrive (a bar offers to reload).

---

## Optional: hide the Groq key with a private relay (Cloudflare, free, about 10 minutes)

Only do this if you'd rather nobody could see the key. With the relay, the key lives on Cloudflare and only people signed in to your Thrive can use the AI.

1. Go to **dash.cloudflare.com → Workers & Pages → Create → Create Worker**, name it `thrive-ai`, then click **Deploy**.
2. Click **Edit code**, replace everything with `ai-relay/worker.js`, then click **Deploy**.
3. Under **Settings → Variables and Secrets**, add:
   - `GROQ_KEY` (Secret): your `gsk_…` key
   - `FIREBASE_PROJECT_ID` (Text): your Firebase project ID, e.g. `thrive-f6f88`
   - `ALLOWED_ORIGINS` (Text): `https://YOURNAME.github.io`
   - optional: `DAILY_LIMIT` (requests per person per day, default 300) and `ALLOWED_EMAILS` (e.g. `you@gmail.com, friend@gmail.com` or `@iqbusiness.net`)

   Then click **Deploy** again.
4. In `config.js`, put the Worker's address in `aiProxy` (e.g. `https://thrive-ai.yourname.workers.dev`), set `groqKey: ""`, and upload it.

## What's in this folder

| File | What it is |
|---|---|
| `index.html` | The whole app |
| `config.js` | Your settings (Firebase + Groq) |
| `sw.js`, `manifest.webmanifest`, icons | Make it installable and work offline |
| `ex/`, `fb/`, `tess/` | Exercise photos, sign-in library, label reader |
| `firestore.rules` | Paste into Firebase (not uploaded to the site) |
| `ai-relay/` | Optional private AI relay (not uploaded to the site) |
