---
name: add-song
description: Add a new cover (Instagram reel) to notesbyaryan on aryanjaiswal.in. Use when Aryan shares a new reel link, says "add this song/cover/reel", or asks to move a song to a different position.
---

# Add a song to notesbyaryan

The music list lives in `content/music.json` (array order = display order on `/notesbyaryan`; the homepage shows the first 3). Never hand-edit dates: they are decoded from the reel code.

## 1. Collect from Aryan (ask only for what's missing)

| Field | Required | Notes |
|---|---|---|
| Reel link | yes | Any form: `/reel/`, `/p/`, with `?igsh=` etc. The script normalises it. |
| Title | yes | Song name as it should appear, e.g. `Tum Se Hi` |
| Position | yes | 1 = first on the page. If he doesn't say, ask. Default would be the end. |
| Hindi / poetic line | optional | Shown above the title, e.g. `मोहब्बत की वो एक धुन` |
| Description | optional | First caption line, emoji welcome, e.g. `Aashiqui 2 feels 🫶🏻` |
| Vibe | optional | Second line with the ✦, e.g. `Ab tum hi ho… zindagi ab tum hi ho` |
| Original artist | optional | **Never guess.** Leave empty if he doesn't give it (the card hides the line). |
| Language | optional | `hi` (default) or `en` |
| Place | optional | Only for live performances, e.g. `Nandi Hills, Bangalore` (puts it under the "Live" filter) |

Keep his words and emoji exactly as given. Don't translate or "improve" them.

## 2. Add it

```bash
npm run add-cover -- --url "<link>" --title "<title>" --position <n> \
  --line "<hindi line>" --description "<description>" --vibe "<vibe>" \
  --artist "<artist>" --lang hi --place "<place>"
```

Omit flags he didn't give. Run with `--dry-run` first if anything is unclear; it prints the decoded date and position.
The script rejects duplicates (same reel code), so if it says "Already listed", ask whether he wants it moved instead.

**To move an existing song:** edit `content/music.json` and move that object to the new index (keep everything else unchanged).

## 2b. Optional: let the record play it on the page

If Aryan sends an audio/video file of the song, save it to `public/audio/<slug>.m4a` (or .mp3/.mp4), add `"audio": "/audio/<slug>.m4a"` to the song in `content/music.json`, and, if he wants this song on the record, set `featuredCode` in `content/music.ts`. See `public/audio/README.md`.

## 3. Check and show

```bash
npm run build && npm run test:content
```

`test:content` must pass (it checks the schema, unique codes, canonical URLs, and that the original 26 songs keep their relative order).
Then tell Aryan: the song, its decoded date, its position, and that the first 3 on the list also appear on the homepage.
Don't commit or push unless he asks.
