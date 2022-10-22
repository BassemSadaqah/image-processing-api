import createThumbnail from "../../utilities/createThumbnails";
import { promises as fs, existsSync as fsExistsSync, rmSync as fsRmSync } from "fs";
describe("Create Thumbnail function utility", () => {
  const notFoundDir = "images/318548notFound787852";
  afterEach(() => {
    fsRmSync(notFoundDir, { recursive: true, force: true });
  });
  it("should create a thumbnail directory when not found", async () => {
    await createThumbnail(notFoundDir, notFoundDir, 200, 200);
    expect(fsExistsSync(notFoundDir)).toBeTrue();
  });
  //Heavy work included, skip if original images dir includes to much files
  it("should create thumbanils and save it to the provided out directory [using images/original dir]", async () => {
    await createThumbnail("images/original", notFoundDir, 200, 200);
    const original_dir_filenames = await fs.readdir("images/original");
    const new_dir_filenames = await fs.readdir(notFoundDir);
    expect(original_dir_filenames).toEqual(new_dir_filenames);
  });
});
