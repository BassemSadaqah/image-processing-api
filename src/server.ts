import express from "express";
import path from "path";
import yargs from "yargs/yargs";
import imagesRouter from "./api/images";
import createThumbnails from "./utilities/createThumbnails";
const app = express();
const port = process.env.PORT || 3000;
app.use("/api/images", imagesRouter);
app.use("/images", express.static("images/original"));
app.use("/images/thumbnail", express.static("images/thumbnail"));

const argv = yargs(process.argv.slice(2))
  .options({
    width: { type: "number", default: 200 },
    height: { type: "number", default: 200 },
  })
  .parseSync();

//Converting arguments to integers to ensure no decimal places exist in width or height values
const width_arg = parseInt(argv.width as unknown as string);
const height_arg = parseInt(argv.height as unknown as string);

if (width_arg < 1 || height_arg < 1) {
  console.log("width and height values should be greater than zero");
  process.exit(0);
}
createThumbnails("images/original", "images/thumbnail", width_arg, height_arg, true)
  .then(() => {
    console.log("Thumbnail images exported successfuly to the provided directory");
  })
  .catch(() => {
    console.log("Error when resizing to thumbnail images, make sure that you have provided a correct folder paths");
  });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../README.html"));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;
