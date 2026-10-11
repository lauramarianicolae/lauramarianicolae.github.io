# lauramarianicolae.github.io

Hi Laura! This is your website. Everything you need to update it is below.

Source files for Laura Nicolae's personal academic site, published at https://lauranicolae.com.

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
| `src/content/site.yaml` | Name, title, email, CV, fields, photo, page descriptions, footer. |
| `src/content/cv/` | CV PDFs. The one picked under Name and contact is served at `/Nicolae_Laura_CV.pdf`. |
| `public/` | Served as-is: paper PDF uploads in `/papers/`, fonts, favicon, etc. |

## How to do common edits
- **New CV:** Name and contact, then CV. Upload the PDF, select it, save. Any file name works. It's always at lauranicolae.com/Nicolae_Laura_CV.pdf.
- **Post the job market paper:** open the paper, upload the PDF under PDF, select it, set "Last updated", save. Any file name works. It's always at lauranicolae.com/Nicolae_JMP.pdf, so put that link on the title page.
- **Add a paper:** new entry, then set the section (working paper or publication), its position, and a short name, e.g. Bank_Deposits. Use a different short name for each paper.
- **Post a draft of any other paper:** open the paper, upload the PDF under PDF, select it, and remove any old Draft link under Links, then save. It's always at lauranicolae.com/papers/Nicolae_ plus the short name, e.g. lauranicolae.com/papers/Nicolae_Bank_Deposits.pdf. Set the short name once and leave it, since changing it changes the link.

The CMS is easiest. Uploading straight to GitHub also works if the file uses the link's name and folder, e.g. `public/Nicolae_Laura_CV.pdf` or `public/papers/Nicolae_Bank_Deposits.pdf`. The site always uses whichever upload is newest.

Made with ♥ by Brian
