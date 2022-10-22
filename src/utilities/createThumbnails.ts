import { promises as fs, existsSync as fsExistsSync } from "fs";
import resizeImage from "./resizeImage";

export default async function createThumbnails(
  original_dir: string,
  thumbnail_dir: string,
  width: number,
  height: number,
  overriteExistingThumbs = false
): Promise<void> {
  //creating a thumbnail directory if it dosen't exist
  if (fsExistsSync(thumbnail_dir) == false) {
    await fs.mkdir(thumbnail_dir, { recursive: true });
  }
  //Resizing the image and saving it to the thumbnail directory
  const original_filenames = await fs.readdir(original_dir);
  const thumbnail_filenames = await fs.readdir(thumbnail_dir);
  for (const filename of original_filenames) {
    if (thumbnail_filenames.includes(filename) && overriteExistingThumbs == false) return;
    await resizeImage(`${original_dir}/${filename}`, `${thumbnail_dir}/${filename}`, width, height);
  }
}
