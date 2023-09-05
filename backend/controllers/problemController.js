const problemModel = require("../models/problem");
const mongose = require("mongoose");
 
const newProblem = async (req, res) => {
  const { type, text, courseId } = req.body;
  const userName=req.user.username
  try {
    const problem = await problemModel.create({
      type: type,
      text: text,
      userName: userName,
      courseId: courseId,
    });
    res.status(200).json(problem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const followUpProblem = async (req, res) => {
  const { problemid, text } = req.body;
  try {
    const problem = await problemModel.findOneAndUpdate(
      { _id: problemid },
      { text: text,
       state:"unseen"},
      { new: true }
    );
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  newProblem,
  followUpProblem
};
