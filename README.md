# Puppy Field Guide

A password-protected static site for GitHub Pages.

- `index.html` is the only page that gets published. It holds the whole guide encrypted with AES-256-GCM (key derived from the password with PBKDF2-SHA256, 600,000 iterations) and decrypts it in the browser after the password is entered.
- `private/` (git-ignored, never commit it) holds the unencrypted page `app.html` and the password `pw.txt`.
- `build/encrypt.js` rebuilds `index.html` from `private/app.html`:

```
node build/encrypt.js private index.html
```
