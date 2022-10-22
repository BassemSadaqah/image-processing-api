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
* Navigate to `http://localhost:3000/api/images?filename={filename}&width={width}&height={height}`
* Files are saved into `images/original` and a thumbnail of each image version will be generated on start at `images/thumbnail`
* Original Photos could be accessed from `/images/imagename.jpg`
* By default thumbnails will be created with 200x200 dimensions
* The default thumbnail dimensions could be changed by using `width` and `height` arguments when running the main node file
```
npm run start -- --width=500 --height=500
```
