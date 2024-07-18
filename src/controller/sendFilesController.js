export const singleFileHandlerController = async (req, res, next) => {
  try {
    let link = `http://localhost:5000/${req.file.originalname}`;

    res.json({
      success: true,
      message: "file uploaded successfully",
      result: link,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const multipleFileHandlerController = async (req, res, next) => {
  try {
    let link = req.files.map((value, index) => {
      return `http://localhost:5000/${value.originalname}`;
    });
    res.json({
      success: true,
      message: "multiple files uploaded successfully",
      result: link,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
