# Fonts for generated images

Two static font instances, used only by the build-time image generators
(`src/lib/og.tsx`, `src/app/icon.tsx`, `src/app/apple-icon.tsx`). Satori has no
system fonts and no `next/font` — it needs the actual bytes.

| File | Family | Weight | Used for |
| --- | --- | --- | --- |
| `Inter-Regular.ttf` | Inter | 400 | body copy on the social card |
| `Sora-SemiBold.ttf` | Sora | 600 | the name, project titles and the monogram |

Same two families the pages load through `next/font` in `src/lib/fonts.ts`, so
a shared link looks like the site it points at. The browser never downloads
these copies.

Both are licensed under the [SIL Open Font License 1.1][ofl] and were taken
from Google Fonts:

- Inter — <https://fonts.google.com/specimen/Inter>
- Sora — <https://fonts.google.com/specimen/Sora>

To change a weight, download that static instance from Google Fonts, drop it in
here, and update `loadBrandFonts()` in `src/lib/brand.ts`. A variable font won't
do: Satori picks one weight per registered face.

[ofl]: https://openfontlicense.org/
