import { Student } from "../schema/model.js";

export const createStudentController = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.file);

    let link = `localhost:5000/${req.file.filename}`;

    let student = await Student.create({
      //   name: req.body.name,
      //   age: req.body.age,
      //   file: link,
      ...req.body,
      file: link,
    });

    res.json({
      success: true,
      message: "student created successfully",
      result: student,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const uploadMultipleFileController = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.files);

    let links = req.files.map((value, index) => {
      let link = `localhost:5000/${value.filename}`;
      return link;
    });
    console.log(links);
    let sendFile = await Student.create({
      name: req.body.name,
      age: req.body.age,
      file: links,
    });
    res.json({
      success: true,
      message: "multiple file send created successfully",
      result: sendFile,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
