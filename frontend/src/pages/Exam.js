import { useEffect, useState } from "react";

const SolveExam = () => {
  return (
    <form>
      <label className="question">Question</label>
      <br />
      <label id="question"></label>
      <br />
      <input type="radio"></input>
      <label>First Choice</label>
      <br />
      <input type="radio"></input>
      <label>Second Choice</label>
      <br />
      <input type="radio"></input>
      <label>Third Choice</label>
      <br />
      <input type="radio"></input>
      <label>Fourth Choice</label>
      <br />
      <button type="submit">submit</button>
      <br />
      <label hidden>CorrectAnswer</label>
    </form>
  );
};

export default SolveExam;
