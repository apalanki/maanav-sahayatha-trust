# Activity updates

Each file here is one post on the site's **Updates** timeline (`/updates`), newest first. The
Updates link, the home page "Latest from the Field" section, and each program page's "Recent
Updates" section appear automatically once at least one post exists.

## Adding a post

The easiest way (resizes photos to WebP, strips GPS/camera data, creates the share image and a
stub file):

```bash
pnpm new-update --date 2026-03-12 --program bala-vikas --title "Evening session at Valasarajupadu" \
  --location "Valasarajupadu" ~/Downloads/photo1.jpg ~/Downloads/photo2.jpg
```

Then fill in the `description` and each photo's `alt` in the new file, run `pnpm test`, and push.

## File format: `<YYYY-MM-DD>-<short-title>.json`

```json
{
  "date": "2026-03-12",
  "title": "Evening session at Valasarajupadu",
  "program": "bala-vikas",
  "location": "Valasarajupadu",
  "description": "First paragraph (also used as the search/share summary).\n\nSecond paragraph.",
  "photos": [
    {
      "src": "/images/updates/2026-03-12-evening-session/1.webp",
      "alt": "Children singing in a circle"
    }
  ],
  "shareImage": "/images/updates/2026-03-12-evening-session/share.jpg"
}
```

| Field         | Required | Notes                                                                                    |
| ------------- | -------- | ---------------------------------------------------------------------------------------- |
| `date`        | yes      | `YYYY-MM-DD`; must match the start of the file name                                      |
| `title`       | yes      | Up to 70 characters                                                                      |
| `program`     | yes      | `education`, `bala-vikas`, `medical`, `tribal`, or `religious-cultural`                  |
| `location`    | no       | Village or area                                                                          |
| `description` | yes      | Plain text, blank line between paragraphs; first paragraph is the summary                |
| `photos`      | yes      | 1–4 photos in `client/public/images/updates/<slug>/`, each with a real `alt` description |
| `shareImage`  | no       | JPEG for WhatsApp/social previews (the helper creates it); defaults to the first photo   |

The build checks every post (fields, date, program, photo files, alt text) and fails the deploy
if something is missing, so a half-finished post never goes live.

## Content rules

- Only facts the trust has confirmed; no invented numbers.
- Get consent for photos of people, especially children; don't use children's full names.
- Keep GPS data out of photos (the helper strips it).
