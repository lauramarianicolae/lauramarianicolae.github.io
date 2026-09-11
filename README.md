# lauramarianicolae.github.io

Source files for Laura Nicolae's personal academic site, published at https://lauramarianicolae.github.io.

This is built using Astro so that every push to `main` is built and published by GitHub Actions ... usually within a minute.

## Editing
1. **Forms:** app.pagescms.org, signed in with GitHub. Papers, bio, teaching, awards, languages, name and contact.
2. **Directly:** edit the files under `src/content/` on GitHub and commit.
The site will rebuild itself either way using actions.

## Content
| File | Contents |
|---|---|
| `src/content/papers/*.md` | One per paper. |
| `src/content/bio.md` | Opening paragraphs. |
| `src/content/languages.md` | The Languages section. |
| `src/content/teaching.yaml` | Courses in display order. |
| `src/content/awards.yaml` | Fellowships and awards in display order. |
| `src/content/site.yaml` | Name, title, email, CV link, fields, photo, page descriptions, footer. |
| `public/` | Served as-is: the CV at `/Nicolae_Laura_CV.pdf`, paper PDFs in `/papers/`, fonts, favicon, etc. |

## How to do common edits
- **Post the job market paper:** open the paper, upload the PDF, set "Last updated", clear the status note.
- **New CV:** upload it over the existing one, keeping the filename, so links will always still work.
- **Add a paper:** new entry, then set the section (working paper or publication) and its position.
