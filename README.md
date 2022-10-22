# Image Processing API
An Express server for resizing images on the Fly with saving the resized version for further requests.


## Getting started
- Clone the repository
```
git clone https://github.com/BassemSadaqah/image-processing-api
```
- Install dependencies
```
cd image-processing-api
npm install
```
- Build and run the project
```
npm start
```


## Usage
* Original Images are saved into `images/original` and a thumbnail of each image will be generated on start at `images/thumbnail`
* Original images could be accessed from `http://localhost:3000/images/imagename.jpg`
* Thumbnails could be accessed from `http://localhost:3000/images/thumbnail/imagename.jpg`
* Navigate to `http://localhost:3000/api/images?filename={filename}&width={width}&height={height}` to get a resized image on the fly. 
* By default thumbnails will be created with 200x200 dimensions
* The default thumbnail dimensions could be changed using `width` and `height` arguments when starting the server
```
npm run start -- --width=500 --height=500
```
