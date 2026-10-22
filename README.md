# Surgical Diathermy Unit: Academic Portfolio

A static portfolio website on the surgical diathermy unit (electrosurgery) for
**Biomedical Equipments for Clinical Applications (21BMC402J)**.

- **Name:** Bava Prateeksha K S
- **Register number:** RA2311013010044
- **Department:** Biomedical Engineering

Built with plain HTML5, CSS3 and vanilla JavaScript. There are no frameworks,
no build tools, no backend and no API keys. All paths are relative, so it works
by opening `index.html` locally and on GitHub Pages.

## Project structure

```
index.html      Page content (cover, 13 sections, references)
style.css       Styles (white, navy and teal; responsive)
script.js       Mobile menu, active-section highlight, image enlargement, back-to-top
images/
  figure-1-electrosurgical-unit.png
README.md
```

## Run locally

Open `index.html` in any modern browser. No server is needed.

## Deploy to GitHub Pages

1. Create a new repository and upload the contents of this folder (the files
   must be at the repository root, not inside a sub-folder).
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select the
   `main` branch and the `/ (root)` folder, then save.
4. After a minute the site is live at `https://<username>.github.io/<repository>/`.

## Figures and sources (please read)

**The uploaded PDF (`Emergent.pdf`) is a printout of an earlier web page, not a
scan of the textbook.** Only one original figure is actually embedded in it:

| Figure on this site | Content | Status |
| --- | --- | --- |
| Figure 1 | Solid-state electrosurgical diathermy machine (ERBE ICC 350) with return plate and hand electrodes | Extracted from the PDF at its original pixel size (692 × 465 px after cropping) |

The same printout also names four other textbook figures: the output circuit
configurations, the waveform types, the soft/forced/spray coagulation figure
and the cutting electrodes. In the PDF those four image frames are **empty**,
so there is no image data to extract. Per the project brief, nothing was
substituted: no internet images, no AI images and no redrawn diagrams.
The related sections (machine, waveforms, modern systems, electrodes) are
therefore written as text and tables, and the block diagram is given as a
written sequence.

Figure 1 was cropped to the photograph only, removing the textbook's own
"Fig. 27.6" caption strip so that the figure could be renumbered. The photo
itself is unaltered. The figure is credited as "Courtesy: M/s ERBE, Germany",
as in the source.

### Adding the missing figures later

If you have the textbook scans, add each image to `images/`, then copy the
`<figure>` block for Figure 1 in `index.html`. Number figures in the order they
appear on the page (Figure 1, 2, 3...) and update the in-text "Figure N"
references and the `id` and `href` values to match.

## References and verification

- **Khandpur, R. S. Handbook of Biomedical Instrumentation, 3rd ed.** Library
  catalogue records list it as New Delhi: McGraw Hill Education, 2014,
  ISBN 978-93-392-0543-0. McGraw Hill India also lists a 3rd edition with a
  2024 copyright date. The PDF's reference gave "2024" with ISBN
  9789355328021, and **that ISBN could not be confirmed** in any source found.
  The site cites the verified 2014 record. Check your own copy's copyright
  page and change the year or ISBN in `index.html` if your printing differs.
- **Chapter number:** "Chapter 27: Instruments for Surgery" follows the PDF's
  reference list and an earlier edition's contents list. Confirm it against
  your copy.
- **Alkatout et al. (2012), JSLS 16(1), 130-139,** DOI
  10.4293/108680812X13291597716348. Verified on PubMed Central.
- The PDF also listed an AST (2012) standard and an AORN (2025) guideline.
  Their publication details could not be verified, so they are **not cited**.
  Add them only after checking them yourself.

The text is an academic summary. It is not an operating guide: equipment
manuals and hospital policy take priority.
