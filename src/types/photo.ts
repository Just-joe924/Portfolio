export type PhotoCategory = "moments" | "football" | "people";

/** A category, or every photograph. */
export type PhotoFilter = PhotoCategory | "all";

export interface Photo {
  /** Stable key for React lists and focus return. Never shown. */
  id: string;
  category: PhotoCategory;
  /** Path under public/. */
  src: string;
  title: string;
  caption: string;
  /** What's in the picture, for screen readers — not the title again. */
  alt: string;
  /** Pixel size of the file, so next/image can reserve space before it loads. */
  width: number;
  height: number;
  /** A 10px preview shown while the full image loads. */
  blurDataURL: string;
}
