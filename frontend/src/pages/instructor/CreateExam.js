import { useEffect, useState } from "react";

const CreateExam = () => {
  return (
    <form>
      <label className="question">Question</label>
      <input type="text"></input>
      <br />
      <label>First Choice</label>
      <input type="text"></input>
      <br />
      <label>Second Choice</label>
      <input type="text"></input>
      <br />
      <label>Third Choice</label>
      <input type="text"></input>
      <br />
      <label>Fourth Choice</label>
      <input type="text"></input>
      <br />
      <label>CorrectAnswer</label>
      <input type="text"></input>
    </form>
  );
};

export default CreateExam;
