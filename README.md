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
| `src/content/cv/` | CV PDFs. The newest is served at `/Nicolae_Laura_CV.pdf`. |
| `src/content/paper-pdfs/` | One folder per paper, named by its short name. The newest PDF in `JMP/` is served at `/Nicolae_JMP.pdf`; the newest in any other folder at `/papers/Nicolae_` plus its name. |
| `public/` | Served as-is: fonts, favicon, etc. |

## How to do common edits
- **New CV:** Name and contact, then CV. Remove the current file, upload the new PDF, select it, save. Any file name works. It's always at lauranicolae.com/Nicolae_Laura_CV.pdf. Uploading under Media, then CV, also works.
- **Post the job market paper:** Media, then Paper PDFs, then the JMP folder. Upload the PDF. Any file name works. It's always at lauranicolae.com/Nicolae_JMP.pdf, so put that link on the title page. Update "Last updated" on the paper when you post a new version.
- **Add a paper:** new entry, then set the section (working paper or publication), its position, and a short name, e.g. Bank_Deposits. Use a different short name for each paper. Then in Media, Paper PDFs, create a folder with the same name.
- **Post a draft of any other paper:** Media, then Paper PDFs, then the paper's folder. Upload the PDF. If the paper still has an old Draft link under Links, remove it. It's always at lauranicolae.com/papers/Nicolae_ plus the short name, e.g. lauranicolae.com/papers/Nicolae_Bank_Deposits.pdf. Set the short name once and leave it, since changing it changes the link.

The CMS is easiest. Uploading straight to GitHub also works if the file uses the link's name and folder, e.g. `public/Nicolae_Laura_CV.pdf` or `public/papers/Nicolae_Bank_Deposits.pdf`. The site always uses whichever upload is newest.

Made with ♥ by Brian
