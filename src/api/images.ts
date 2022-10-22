import express,{Request,Response} from "express";
import resizeImage from "../utilities/resizeImage";
const imagesRouter = express.Router();
import { promises as fs, existsSync as fsExistsSync } from "fs";
import path from "path";

imagesRouter.get("/", (req:Request, res:Response):void => {
  const width = parseInt(Number(req.query.width) as unknown as string);
  const height = parseInt(Number(req.query.height) as unknown as string);
  const filename: string = req.query.filename as string;
  const imageNameRegex = /^[\w,\s-]+\.(gif|jpe?g|tiff?|png|webp|bmp)$/;

  //valdiate user input
  if (!(width && height && filename)) {
    res.status(400);
    res.send("Please provide a valid width, height and filename query paramaters");
  } else if (width < 0 || width > 5000) {
    res.status(400);
    res.send("width value should be between 1 and 5000");
  } else if (height < 0 || height > 5000) {
    res.status(400);
    res.send("Height value should be between 1 and 5000");
  } else if (!filename.match(imageNameRegex)) {
    res.status(400);
    res.send("Filname value is not valid");
  } else {
    resizeImageApi(filename, width, height)
      .then(() => {
        const resizeDirName = `${width}x${height}`;
        res.sendFile(path.join(__dirname, "../../images/", `${resizeDirName}/${filename}`));
      })
      .catch(() => {
        res.status(500);
        res.send("Error Image couldn't be resized. make sure you have entered a correct filename");
      });
  }
});

async function resizeImageApi(filename: string, width: number, height: number):Promise<void> {
  const resizeDirName = `${width}x${height}`;
  if (fsExistsSync(`images/${resizeDirName}/${filename}`)) return;
  if (!fsExistsSync(`images/${resizeDirName}`)) {
    await fs.mkdir(`images/${resizeDirName}`);
  }
  await resizeImage(`images/original/${filename}`, `images/${resizeDirName}/${filename}`, width, height);
}

export default imagesRouter;
