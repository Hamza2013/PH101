# PH101 Applied Physics – Course Website

Static course site for GitHub Pages: Course Content, Tutorials, PH101L Lab and Demonstration videos.

## Files
| File | What it is |
|---|---|
| `index.html` | Page layout (no need to edit) |
| `style.css` | Design (no need to edit) |
| `app.js` | Site logic (no need to edit) |
| `content.js` | **All course content. This is the file you update.** |
| `materials/` | Put your PDFs here: `lectures/`, `tutorials/`, `labs/`, `videos/` |

## Put it on GitHub Pages (one time)
1. Create a new public repository on GitHub, e.g. `ph101`.
2. **Add file → Upload files** → drag in everything from this folder (including the `materials` folder) → **Commit changes**.
3. Go to **Settings → Pages**. Under *Build and deployment*, set Source = **Deploy from a branch**, Branch = **main**, folder = **/ (root)** → **Save**.
4. After about a minute the site is live at `https://<your-username>.github.io/ph101/`.

## Adding content
**Option A – admin form (easiest)**
1. Open `https://<your-username>.github.io/ph101/?admin`
2. Fill the *Add content* form (lecture, tutorial, lab, demo video or announcement). Use **Remove** on any item to delete it.
3. Click **Download content.js**, then on GitHub: **Add file → Upload files** → upload it (it replaces the old one) → **Commit**.
   The admin form only shows when `?admin` is in the URL; students never see it. Your additions are kept in your browser until you upload.

**Option B – edit directly**
Open `content.js` on GitHub, click the pencil icon, edit, commit.

## Uploading PDFs
Upload PDFs into `materials/...` on GitHub, then link them with a path like `materials/labs/Lab03-manual.pdf`.
Google Drive links also work (set sharing to *Anyone with the link*).

## Demo videos
Upload the video to YouTube (Unlisted is fine) and paste the link. It plays inside the page.
Small `.mp4` files (under ~50 MB) can also go in `materials/videos/`.

Changes go live 1–2 minutes after each commit. Hard-refresh (Ctrl+F5) if you still see the old version.
