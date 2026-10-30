# Christopher Stordahl: personal portfolio

A light, minimalist personal portfolio bringing together research, community involvement, and experience across sectors. The site uses ordinary HTML, CSS, and JavaScript. You can edit and publish the files directly; there is no Node.js installation, package manager, or build step.

## Files

```text
christopher-stordahl-portfolio/
├── index.html          Page content, experience entries, and project details
├── styles.css          Colours, typography, spacing, and responsive layout
├── script.js           Lenses, filters, milestones, and reading preferences
├── assets/
│   ├── favicon.svg     Browser tab icon
│   ├── christopher-stordahl-cv.pdf   Two-page CV linked from Contact
│   ├── christopher-stordahl-cv.docx  Editable Word version of the CV
│   └── work/           Work samples and image previews
│       ├── nmpa-cvi-poster.pdf
│       ├── nmpa-cvi-poster-preview.jpg
│       ├── edinburgh-cvi-poster.pdf
│       ├── edinburgh-cvi-poster-preview.jpg
│       ├── seeing-with-the-brain-dissertation.pdf
│       ├── seeing-with-the-brain-dissertation.docx
│       └── dissertation-cover-preview.jpg
├── .nojekyll           Tells GitHub Pages to serve the static files directly
└── README.md           This guide
```

Keep these files together, including the entire `assets/work/` folder. Upload the **contents** of this folder to your repository, so `index.html` sits at the repository's top level. The work samples are local, relative-path assets; the site does not depend on the original Desktop or Downloads locations.

## Preview on your Mac

### Quick option

Double-click `index.html` in Finder. It opens in your default browser. The page and its interactions work without a server.

### Local server option

1. Open Terminal.
2. Type `cd` followed by a space. Drag the `christopher-stordahl-portfolio` folder from Finder into Terminal, then press Return.
3. Run this command as written, without adding a `$` before it:

   ```sh
   python3 -m http.server 8000 --bind 127.0.0.1
   ```

4. Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser.
5. Keep Terminal open while previewing. Press **Control+C** in Terminal to stop the server.

If Python is unavailable, use the quick option above. If port 8000 is already in use, change `8000` to `8001` in both the command and browser address. After editing a file, save it and refresh the page.

## Editing

- `index.html` contains the biography, work samples, projects, experience, education, and contact details.
- `styles.css` controls colours, type, spacing, responsive layouts, and reading options.
- `script.js` handles the connection map, project filters, museum timeline, navigation, and saved reading preferences.

The text lives in the HTML. Project cards use `data-project-themes` to support filtering, and their counts are calculated automatically. Keep section IDs and relative file paths stable when editing so existing links continue to work.

### CV and work samples

The CV link points to `assets/christopher-stordahl-cv.pdf`. To revise it, edit `assets/christopher-stordahl-cv.docx`, export a PDF, and replace both files together.

Posters, the dissertation, and their previews are in `assets/work/`. Each sample has a preview image, direct file links, and an expandable PDF reader. Keep the original documents alongside their web previews.

### Accessibility

The page includes keyboard focus styles, a skip link, expandable sections, reduced-motion support, and reading options for text size and contrast. The content remains available without JavaScript. Reading preferences are saved in local storage when the browser permits it.

PDF readers vary between browsers and devices. View and download links remain available outside each reader.

Before publishing, check the page at phone and desktop widths. Try the navigation, filters, timeline, reading options, and expandable sections with a keyboard, and check the document links.

## Choose your GitHub Pages address

`YOUR-USERNAME` and `YOUR-REPOSITORY` stand for your GitHub account and repository names.

| Site type | Repository name | Default public address |
| --- | --- | --- |
| Personal site | `YOUR-USERNAME.github.io` | `https://YOUR-USERNAME.github.io/` |
| Project site | A name such as `portfolio` | `https://YOUR-USERNAME.github.io/portfolio/` |

For a personal site, replace `YOUR-USERNAME` with the exact account name in lowercase. A project site is useful if your account already has a personal site. GitHub documents these address rules in [What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

The site's file references are relative, such as `styles.css` and `assets/favicon.svg`. Keep that pattern so it works at either address. A leading slash, such as `/styles.css`, would point to the account's root and can break a project site.

## Publish using GitHub in your browser

1. Sign in to GitHub and create a repository using your chosen name above. Choose **Public** if using GitHub Free. You can initialise it with a README so the `main` branch exists.
2. Open the repository's **Code** tab. Choose **Add file → Upload files**.
3. Drag in `index.html`, `styles.css`, `script.js`, `README.md`, the complete `assets` folder (including `assets/work/`), and `.nojekyll`. Upload the folder's contents, not the containing folder. On a Mac, **Command+Shift+.** reveals hidden files in Finder.
4. Give the upload a commit message such as `Add personal portfolio` and commit the changes to `main`. If GitHub offers a new branch and pull request instead, merge that pull request into `main` before continuing. See GitHub's [file upload guide](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).
5. Check the file list: `index.html` must be next to `README.md`; `assets` must be a folder. If `.nojekyll` was omitted, use **Add file → Create new file** to create an empty file with that exact name.
6. Open **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**. Set the branch to **main** and the folder to **/(root)**, then select **Save**. These settings follow GitHub's [publishing source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
7. Wait for deployment, then use **Visit site** on the Pages settings page. GitHub says updates can take up to ten minutes. Check the repository's **Actions** tab if deployment fails. See [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

Future edits work the same way: upload the changed files or edit them on GitHub, commit to `main`, and wait for Pages to update. The `.nojekyll` file keeps this plain static site out of Jekyll's processing; no custom workflow is required for this setup. GitHub explains this behaviour in its [static site guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#static-site-generators).

## Optional: publish with Git instead

Use this route for a **new, empty GitHub repository**. When creating that repository, leave the README, licence, and `.gitignore` options unselected. If you already used the browser upload route, continue editing there or clone that existing repository instead of using these initialisation commands.

In Terminal, enter the portfolio folder as described in the preview steps. Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` in the remote URL with your real values before running the commands. There are no angle brackets to copy.

```sh
git init
git add index.html styles.css script.js assets .nojekyll README.md
git commit -m "Add Christopher Stordahl portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Git may ask you to sign in or configure your author name and email. Once the push succeeds, enable Pages through **Settings → Pages** using `main` and `/(root)` as above.

To publish later changes from the same local repository:

```sh
git add index.html styles.css script.js assets .nojekyll README.md
git commit -m "Update portfolio content"
git push
```

## If something looks wrong

- **404 page:** Confirm Pages is enabled, the deployment completed, and `index.html` is at the selected publishing root.
- **No styles or icon:** Confirm the filenames and `assets` folder were uploaded with matching letter case. Keep relative paths.
- **Old content:** Wait for deployment, then refresh the page. A hard refresh may help if the browser cached earlier files.
- **Lenses, project filters, milestones, or reading preferences do not respond:** Confirm `script.js` was uploaded next to `index.html`. Without JavaScript, lens, milestone, and filter controls stay hidden while their content remains readable. Native reading options and expandable details still work.
- **A PDF reader is blank:** Use the sample's View PDF or Download button. Some browsers and devices do not display PDFs inside a page. Confirm that every file in `assets/work/` was uploaded with matching letter case.
- **A poster preview is missing:** Confirm that the corresponding JPG is present in `assets/work/`; the preview and full PDF are separate files.
- **A document link is broken:** Check that its file is included in `assets` and that the path in `index.html` matches the filename.

Deployment instructions were checked against GitHub's official documentation on 26 October 2026.
