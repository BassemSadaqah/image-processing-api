import sharp from "sharp";

export default async function resizeImage(
  imagepath: string,
  outpath: string,
  width: number,
  height: number
): Promise<void> {
  await sharp(imagepath)
    .resize({
      width,
      height,
    })
    .toFile(outpath);
}
