/**
 * A 74-byte neutral PNG used as the blur placeholder while an image loads.
 *
 * Kept out of lib/assets.ts deliberately: that module imports node:fs, and any
 * client component that needed this constant would drag the filesystem into
 * the browser bundle and fail the build.
 *
 * Once a real image is committed you can swap its <Image> to a static import
 * and Next will generate a true blur from the file itself.
 */
export const NEUTRAL_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAIAAAAGpYjXAAAAEUlEQVR4nGNQ0zHAihiGuwQA1RcooZ5I/hIAAAAASUVORK5CYII=";
