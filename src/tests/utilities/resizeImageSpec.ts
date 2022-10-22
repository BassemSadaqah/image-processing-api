import resizeImage from "../../utilities/resizeImage";
import { promises as fs } from "fs";
describe("Resize Images function utility", () => {
  afterAll(() => {
    fs.unlink("images/thumbnail/test.jpg");
  });
  it("should resize an image and save it to the specfied location", async () => {
    await resizeImage("images/original/fjord.jpg", "images/thumbnail/test.jpg", 200, 200);
    await fs.readdir("images/thumbnail").then((files: string[]) => {
      expect(files).toContain("test.jpg");
    });
  });
});
