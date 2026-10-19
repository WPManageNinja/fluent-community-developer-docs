/**
 * The social card for a page is named after the page's served path (after
 * `rewrites`): the `.md` dropped, `/` replaced by `--`, `.png` appended.
 *
 * This lives in one place on purpose. The rule used to be written twice — once in
 * scripts/generate-featured-images.mjs, which names the files, and once in
 * .vitepress/config.mts, which points `og:image` at them. The two agreeing is the
 * only thing that makes a card show up, and when they disagree nothing errors: the
 * page just quietly serves default.png.
 */
export function cardNameFor(servedPath) {
  return `${servedPath.replace(/\.md$/, '').replace(/\//g, '--')}.png`
}
