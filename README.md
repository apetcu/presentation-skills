# Presentation Skills

**Let Claude turn your PDF into a slide deck.**

You have a paper, a report, or a long PDF. You want a presentation—without the copy-paste, the “which figure goes where,” and the slide-design guesswork. This repo is an experiment: **you hand Claude the PDF and the right skills, and it does the work for you.**

## How it works

1. **You provide the source** — Point Claude at your PDF (e.g. `mf_paper.pdf`). It reads the content, understands structure, and decides what belongs on slides.
2. **Claude uses the PPTX skill** — A [Cursor/Claude skill](.cursor/skills/pptx/) tells it how to build decks: PptxGenJS for generation, design rules (palettes, typography, layout), and when to use icons, images, and visuals so slides don’t look like generic AI slop.
3. **You get a .pptx** — Claude produces a real PowerPoint file: consistent theme, clear hierarchy, and content that actually came from your document. You review, tweak in the editor if needed, or ask Claude to fix specific slides.

So the “automation” isn’t a blind script—it’s **Claude, guided by skills**, doing the extraction, layout, and design choices that you’d otherwise do by hand.

## Why skills matter

Without a skill, an AI might dump paragraphs onto slides or pick random fonts and colors. The PPTX skill gives Claude:

- **Concrete design rules** — Dominant vs accent colors, dark/light contrast, one visual motif, no “accent line under title” clichés.
- **Layout and typography** — Font pairings, sizes, spacing, and the rule that every slide gets a real visual element (icon, image, chart), not just bullets.
- **QA discipline** — Convert slides to images, inspect for overlap and overflow, run a fix-and-verify loop so the first render isn’t declared “done.”

So when you say “make a presentation from this PDF,” Claude isn’t improvising—it’s following a playbook that lives in the skills.

## What’s in this repo

- **Skills** — The [pptx skill](.cursor/skills/pptx/) and its guides (PptxGenJS, editing, reading, converting to images for QA).
- **Tooling** — Node script ([`build_pptx.js`](build_pptx.js)) and dependencies (PptxGenJS, React for rendering icons, Sharp for images) that Claude uses to generate and refine decks.
- **Your PDF + output** — Your source document and the resulting `.pptx` (and any exported slide images) so you can iterate with Claude (“slide 3 is too dense,” “use the ocean palette,” etc.).

## Try it

1. Open this project in Cursor with Claude.
2. Add or point to a PDF (e.g. drop in a paper or report).
3. Ask Claude to create a presentation from it, e.g.:
   - *“Create a presentation from `mf_paper.pdf` — key points and figures, about 10–12 slides.”*
   - *“Use the pptx skill and the ocean gradient palette; make sure every slide has a visual.”*
4. Let Claude use the skill, generate the deck, and run QA (e.g. export slides to images and fix overlap/overflow).
5. Open the `.pptx`, give feedback, and ask for edits as needed.

---

**Presentation Skills** — Claude does the deck; the skills make it good.
