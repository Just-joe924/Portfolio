import type { Photo, PhotoCategory } from "@/types/photo";

/** Filter labels, in the order the buttons appear. */
export const photoCategories: Record<PhotoCategory, string> = {
  moments: "Moments",
  football: "Football",
  people: "People",
};

/**
 * Every photograph in the gallery, in display order. Adding one is an object
 * here — no markup to touch.
 *
 * Drop the file into public/images/<Category>/ and run `npm run images`: it
 * resizes the file and prints the width, height and blurDataURL to paste in.
 */
export const photos: Photo[] = [
  {
    id: "uppercut",
    category: "moments",
    src: "/images/Moments/uppercut.jpg",
    title: "Uppercut.",
    caption: "Second semester, sophomore year: Nathan and Deshawn stage a knockout in the courtyard.",
    alt: "On a paved campus courtyard, a student in a beige shirt and brown trousers throws an uppercut at a much taller student in navy, who leaps off the ground with his head thrown back as if struck.",
    width: 1500,
    height: 2000,
    blurDataURL:
      "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADQAQCdASoHAAoAAsBMJQBOgCHZfqICQAD+kb+pRi1XUwTTn986xSlGe9O/dgu/Gsb3qxNaBWilQwfZygszxXFdDanwAA==",
  },
  {
    id: "deep-breath",
    category: "moments",
    src: "/images/Moments/deep-breath.jpg",
    title: "Deep Breath.",
    caption:
      "Head in hand, knee strapped: a quiet minute on the sideline before coming on for Golden Stars in the 2024/2025 AUPL season.",
    alt: "A grainy black-and-white photo of a young man in a hooded, striped track jacket sitting against a chain-link fence, one hand on his head and a bandage on his knee, another player seated behind him.",
    width: 1170,
    height: 874,
    blurDataURL:
      "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAACwAQCdASoKAAcAAsBMJaQAAqsZq18AAP6msbMuBPVSkasbrH2iDfTC1gFJYmd8mw5P6GkYTIBm5+QAAAA=",
  },
  {
    id: "summit",
    category: "moments",
    src: "/images/Moments/DSC_0965.jpg",
    title: "Summit.",
    caption: "The student-week tech summit in sophomore year: a full room, every eye on the stage.",
    alt: "Students in shirts and ties sit in rows in an audience, listening to a speaker out of frame.",
    width: 2000,
    height: 1339,
    blurDataURL:
      "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAACwAQCdASoKAAcAAsBMJQBOgB5P/40AAP7pU2IFOXdL8rrPxFwIWia9YudXvherb2JY7G6+oQz/3mGFhb8Lcg57JLC/B+mDJQUCCZZfW6UAAAAA",
  },
  {
    id: "dusk",
    category: "moments",
    src: "/images/Moments/dusk.jpg",
    title: "Dusk.",
    caption: "The last of the light, fading behind the palms and power lines.",
    alt: "A telecom mast, a leafy tree, a palm and low rooftops in silhouette against a sky fading from grey to orange, crossed by power lines.",
    width: 1080,
    height: 810,
    blurDataURL:
      "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADQAQCdASoKAAcAAsBMJZgCdAEOu0d2SAD2LHweUYdcLtdJVVae/D4/O6n6Abc5xEidavjGRUfEMGBOzxAAAA==",
  },
  {
    id: "golden-hour",
    category: "moments",
    src: "/images/Moments/golden-hour.jpg",
    title: "Golden Hour.",
    caption: "Sunset over the rooftops, the whole hillside lit orange for a few minutes.",
    alt: "The sun sets behind a hillside of multi-storey houses under grey clouds edged in orange light, a corrugated metal roof slanting across the foreground.",
    width: 1448,
    height: 1086,
    blurDataURL:
      "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADwAQCdASoKAAcAAsBMJYwCdAEDe8iA8ZAA/euxrUchMnYJNoe1lwaXnUuTOvR7fIJhUxQBPO+vjeSKJfxhEwAA",
  },
  {
    id: "rush-hour",
    category: "moments",
    src: "/images/Moments/rush-hour.jpg",
    title: "Rush Hour.",
    caption: "Lagos after work: the road home at a standstill, and hawkers working the traffic.",
    alt: "At night, seen from a footbridge, a jammed highway of cars, buses and trucks stretches under street lights while hawkers carrying trays on their heads walk along the roadside, a clearer road curving off to the right.",
    width: 2000,
    height: 1500,
    blurDataURL:
      "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAACwAQCdASoKAAcAAsBMJQBOgB5QBXBgAP7snuvyYO5bU62IHdnt7ksyeeS5UJ+TSJCh/EnjvxWx+AAA",
  },
  {
    id: "kickoff",
    category: "football",
    src: "/images/Football/kickoff.jpg",
    title: "Kickoff.",
    caption:
      "Minutes before our first match of the 2025/2026 AUPL season. We won it, and started the season with all three points.",
    alt: "Two players in sky-blue kits stand head to head on a grassy pitch, one in goalkeeper gloves and the other in a JOE 11 shirt, as teammates wait by the fence and spectators sit on a wall in front of a hostel block.",
    width: 1080,
    height: 995,
    blurDataURL:
      "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADwAQCdASoKAAkAAsBMJZACdAD0Eq5eZAAA/meHyxh8/8jJo0h9Fy+F5W5FzJrx7LTIHoQWjr+ZdXFYQVzgAA==",
  },
  {
    id: "eyes-up",
    category: "football",
    src: "/images/Football/SAM_0786.JPG",
    title: "Eyes Up.",
    caption: "Phoenix vs Saints: the whole pitch holding still for a second, waiting for the ball to come down.",
    alt: "Players on a pitch look up at a football high in the sky, one in a grey number 30 shirt, with spectators under a covered stand behind.",
    width: 1500,
    height: 2000,
    blurDataURL:
      "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADQAQCdASoHAAoAAsBMJQBOgCPtkQzcAADOP6lr6ZNfUr0rkk1PnMq4myPMZIjJvaq0faLb0wEPpxhM7smYAa+AAAA=",
  },
  {
    id: "changeover",
    category: "football",
    src: "/images/Football/SAM_0694.JPG",
    title: "Changeover.",
    caption: "Saints vs Spartans: one player walks off, and number 11 gets ready to take his place.",
    alt: "A player in a pink number 11 shirt reading SANWO watches a player in orange walk across the pitch.",
    width: 2000,
    height: 1500,
    blurDataURL:
      "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADwAQCdASoKAAcAAsBMJbACdAD7DjUSQYAA/jxEIRm/9XZjJlGbUgLUdoLEonVdUh4sQCy3Mk3H46s+RMpZ2AAA",
  },
  {
    id: "champions",
    category: "football",
    src: "/images/Football/20251011_003956.jpg",
    title: "Champions.",
    caption: "Medals on, trophy between us: champions of the 2024/2025 league season.",
    alt: "Two players sit on a dirt pitch with their backs to the camera, medals around their necks and a gold trophy between them; their shirts read JOE 11 and DWIGHT 10.",
    width: 720,
    height: 460,
    blurDataURL:
      "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAAAQAgCdASoKAAYAAsBMJZwCdAD8ZLkG4QAAAPwpKXdfwP+U2C6LZeSudgiq1WIAAAA=",
  },
  {
    id: "sophomore-gala",
    category: "people",
    src: "/images/People/IMG-20250628-WA0012.jpg",
    title: "Sophomore Gala.",
    caption: "Three of us in our best throwback fits, on the way to the sophomore-year gala.",
    alt: "Three young men in vintage-style outfits — a black leather jacket, a grey denim jacket and a brown blazer over a waistcoat, with ties and glasses — stand in the middle of a quiet road under an evening sky.",
    width: 1500,
    height: 2000,
    blurDataURL:
      "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADwAQCdASoHAAoAAsBMJQBOgCHiDEb1IAAA/ugAklTW9Uh5iRuIib8zGBNlRSE6vIoleCMHfo061GkKQKAPkoMMTEmb3eDAAAA=",
  },
  {
    id: "a-levels",
    category: "people",
    src: "/images/People/IMG_20240806_112835_803.jpg",
    title: "A-Levels.",
    caption: "Our A-Levels pre-shoot, all of us in black and white.",
    alt: "Nine friends in white shirts and black outfits pose outdoors under trees, one kneeling at the front in a long black dress.",
    width: 843,
    height: 1124,
    blurDataURL:
      "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADQAQCdASoIAAoAAsBMJZQAAp3Nis+mAAD+z4MH20TdfBIK5B17CtRz43m/QycB+g255crmimWrMuKbbRt38d43QH8VB69X5uAAAA==",
  },
  {
    id: "perspective",
    category: "people",
    src: "/images/People/perspective.jpg",
    title: "Perspective.",
    caption: "A low angle, a wide sky and a minute to think.",
    alt: "Shot from below, a young man in a white T-shirt, black shorts and white Nike socks sits on a concrete ledge with his hands clasped, looking off to one side under a cloud-streaked blue sky, a telecom mast behind him.",
    width: 1086,
    height: 1448,
    blurDataURL:
      "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAAAQAgCdASoHAAoAAsBMJYwCdGuAAoTFW1YAAPRxw8yBj1w5nYTucnfg32qPe7p2JErD2xJdaBfhX7tposoBmZxRakjWgM970LAAAA==",
  },
];
