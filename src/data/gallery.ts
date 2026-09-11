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
    id: "fight",
    category: "moments",
    src: "/images/Moments/fight.jpg",
    title: "Fight.",
    caption: 'Second semester, sophomore year; a "fight" between Nathan and Deshawn.',
    alt: "On a paved campus courtyard, a student in a beige uniform reaches up to grab the collar of a much taller student in denim, who leans back as if lifted off the ground.",
    width: 1500,
    height: 2000,
    blurDataURL:
      "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADQAQCdASoHAAoAAsBMJQBOgCHZfqICQAD+kb+pRi1XUwTTn986xSlGe9O/dgu/Gsb3qxNaBWilQwfZygszxXFdDanwAA==",
  },
  {
    id: "unawares",
    category: "moments",
    src: "/images/Moments/SAM_0691.JPG",
    title: "Unawares.",
    caption:
      "Gbabes, a few minutes before coming on as a substitute for Golden Stars in the 2024/2025 AUPL season.",
    alt: "A young man in a hooded grey and navy jacket sits against a chain-link fence with a hand on his head and a bandage on his knee, another player seated behind him.",
    width: 2000,
    height: 1500,
    blurDataURL:
      "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAAAQAgCdASoKAAcAAsBMJZQCdADdKs+FGkgAAPsfZ1N7Ix21uY2NGDdhIDk5y134KXn2yKheKMpaJQAo20KFx4v4AAA=",
  },
  {
    id: "summit",
    category: "moments",
    src: "/images/Moments/DSC_0965.jpg",
    title: "Summit.",
    caption: "Student week tech event, sophomore year.",
    alt: "Students in shirts and ties sit in rows in an audience, listening to a speaker out of frame.",
    width: 2000,
    height: 1339,
    blurDataURL:
      "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAACwAQCdASoKAAcAAsBMJQBOgB5P/40AAP7pU2IFOXdL8rrPxFwIWia9YudXvherb2JY7G6+oQz/3mGFhb8Lcg57JLC/B+mDJQUCCZZfW6UAAAAA",
  },
  {
    id: "gratitude",
    category: "moments",
    src: "/images/Moments/IMG-20251012-WA0057.jpg",
    title: "Gratitude.",
    caption: "Summer 2025, at the DAO 5.0 gospel concert.",
    alt: "A selfie of two men in white traditional outfits under crystal chandeliers in a hall lit purple; the younger one, in glasses and a patterned cap, makes a peace sign.",
    width: 1500,
    height: 2000,
    blurDataURL:
      "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADQAQCdASoHAAoAAsBMJQBOgB5sVkVMgAD+38Jy7CFDDuvLZl9mROP95hpRTrJnj0XimrwtRbkIwlRcde1m63pOkWVsAA==",
  },
  {
    id: "motion",
    category: "football",
    src: "/images/Football/IMG-20240824-WA0009.jpg",
    title: "Motion.",
    caption: "Set, a few weeks before my JUPEB exam.",
    alt: "A player in a yellow shirt strikes the ball on a patchy grass pitch as a player in grey closes in, a school building behind them.",
    width: 960,
    height: 1280,
    blurDataURL:
      "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADQAQCdASoIAAoAAsBMJaACdADzdnT+ZAD+B5OPt5RyOslnzU1WgA8y3qr/xRxfOxOD+5PUvZK28JAA",
  },
  {
    id: "anticipation",
    category: "football",
    src: "/images/Football/SAM_0786.JPG",
    title: "Anticipation.",
    caption: "Phoenix vs Saints. Suspense, watching the ball in the air.",
    alt: "Players on a pitch look up at a football high in the sky, one in a grey number 30 shirt, with spectators under a covered stand behind.",
    width: 1500,
    height: 2000,
    blurDataURL:
      "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADQAQCdASoHAAoAAsBMJQBOgCPtkQzcAADOP6lr6ZNfUr0rkk1PnMq4myPMZIjJvaq0faLb0wEPpxhM7smYAa+AAAA=",
  },
  {
    id: "substitution",
    category: "football",
    src: "/images/Football/SAM_0694.JPG",
    title: "Substitution.",
    caption: "Saints vs Spartans, Gbabes being substituted in.",
    alt: "A player in a pink number 11 shirt reading SANWO watches a player in orange walk across the pitch.",
    width: 2000,
    height: 1500,
    blurDataURL:
      "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADwAQCdASoKAAcAAsBMJbACdAD7DjUSQYAA/jxEIRm/9XZjJlGbUgLUdoLEonVdUh4sQCy3Mk3H46s+RMpZ2AAA",
  },
  {
    id: "award",
    category: "football",
    src: "/images/Football/20251011_003956.jpg",
    title: "Award.",
    caption: "Collecting the league trophy and medals for the 2024/2025 season.",
    alt: "Two players sit on a dirt pitch with their backs to the camera, medals around their necks and a gold trophy between them; their shirts read JOE 11 and DWIGHT 10.",
    width: 720,
    height: 460,
    blurDataURL:
      "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAAAQAgCdASoKAAYAAsBMJZwCdAD8ZLkG4QAAAPwpKXdfwP+U2C6LZeSudgiq1WIAAAA=",
  },
  {
    id: "matric",
    category: "people",
    src: "/images/People/IMG-20250315-WA0027.jpg",
    title: "Matric.",
    caption: "2024 Direct Entry matriculation ceremony.",
    alt: "A student in a purple matriculation gown and cap stands in front of a car with his family: a man, a woman and two boys.",
    width: 1500,
    height: 2000,
    blurDataURL:
      "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADwAQCdASoHAAoAAsBMJZACdAEO4cE3JAAA/vOQ66w4OtQ55onuP/11fJBS//gh7n8g3FLSbA4oo94ObDKRgCeKx38mSAAA",
  },
  {
    id: "sophomore-gala",
    category: "people",
    src: "/images/People/IMG-20250628-WA0012.jpg",
    title: "Sophomore Gala.",
    caption: "Dozie, Physics and me at the sophomore-year gala.",
    alt: "Three young men in vintage-style outfits — jackets, ties, caps and dark glasses — stand in the middle of a quiet residential road.",
    width: 1500,
    height: 2000,
    blurDataURL:
      "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADwAQCdASoHAAoAAsBMJQBOgCHiDEb1IAAA/ugAklTW9Uh5iRuIib8zGBNlRSE6vIoleCMHfo061GkKQKAPkoMMTEmb3eDAAAA=",
  },
  {
    id: "freshman-year",
    category: "people",
    src: "/images/People/IMG_20240806_112835_803.jpg",
    title: "Freshman Year.",
    caption: "Lorem ipsum dolor..",
    alt: "Nine friends in white shirts and black outfits pose outdoors under trees, one kneeling at the front in a long black dress.",
    width: 843,
    height: 1124,
    blurDataURL:
      "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADQAQCdASoIAAoAAsBMJZQAAp3Nis+mAAD+z4MH20TdfBIK5B17CtRz43m/QycB+g255crmimWrMuKbbRt38d43QH8VB69X5uAAAA==",
  },
  {
    id: "high-school",
    category: "people",
    src: "/images/People/WIN_20210118_17_34_27_Pro.jpg",
    title: "High school.",
    caption: "Lorem ipsum dolor..",
    alt: "Four boys in school uniforms squeeze into a webcam selfie in front of a classroom bookshelf, one sticking his tongue out.",
    width: 1280,
    height: 720,
    blurDataURL:
      "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADQAQCdASoKAAYAAsBMJYwCdAEO1PYL+AD+yqxMktzZhphJtr29iS0JOgQ3UsOtQUnd4R6Nzbb8FDgFj41k4D/AZVic1BQh0RH+q4AA",
  },
  {
    id: "field-trip",
    category: "people",
    src: "/images/People/IMG-20250709-WA0004.jpg",
    title: "Field Trip.",
    caption: "Lorem ipsum dolor..",
    alt: "Five young men in shirts, ties and sweater vests take a mirror selfie, the one in front holding up the phone.",
    width: 1500,
    height: 2000,
    blurDataURL:
      "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAACwAQCdASoHAAoAAsBMJZwAAppRrftgAP7oUUgWKcLZidTdAiRDlTvJ8ciM0vULbHn8Eymn8HarCcdniO0vgAAA",
  },
];
