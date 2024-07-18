import multer from "multer";
import path from "path";

let limits = {
  fileSize: 1024 * 1024 * 2,
  //the maximum file size in bytes
  //1 kilobyte equal to 1024 bytes
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let staticFolder = "./public";
    cb(null, staticFolder);
    //./means root main folder
    //you must make public folder manually or it will throw error like no such file and directory;
    //destination give the folder location where files is placed
  },
  filename: (req, file, cb) => {
    //any file has key and value
    //key is called file name,value is called original name

    let fileName = Date.now() + file.originalname;
    cb(null, fileName);
    //filename gives the name (title) of the files
  },
});

let fileFilter = (req, file, cb) => {
  let validExtensions = [
    ".jpg",
    ".JPG",
    ".jpeg",
    ".JPEG",
    ".png",
    ".PNG",
    ".svg",
    ".doc",
    ".pdf",
    ".mp4",
  ];
  let originalName = file.originalname;
  let originalExtension = path.extname(originalName);

  //path module is inbuilt module(package ) of node js

  let isValidExtension = validExtensions.includes(originalExtension);

  if (isValidExtension) {
    cb(null, true);
    //true means pass such type of file
    //null represent error since there us np error thus error is null
  } else {
    cb(new Error("file uis not supported"), false);
    //false means don't pass such type of file
  }
};

//file upload

const upload = multer({
  storage: storage,
  //we define the location in the server where file is  store and control the file name
  fileFilter: fileFilter,
  // file filter filter the file according to extension
  limits: limits,
  //filter file limit according to limit
});

export default upload;
