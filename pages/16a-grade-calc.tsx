/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import { Formik, Field, Form } from "formik";
import Container from "../components/container";

function scaleLabScore(labs) {
  const missedLabs = 8 - labs;
  switch (missedLabs) {
    case 0:
      return 45;
    case 1:
      return 44;
    case 2:
      return 42;
    case 3:
      return 23;
    default:
      return 0;
  }
}

function scaleHomeworkScore(homework, lowestHomework) {
  return (Math.min(homework - lowestHomework + 10, 140) / 140) * 45;
}

function calculateScore({
  midterm1,
  midterm1Clobber,
  midterm2,
  midterm2Clobber,
  final,
  homework,
  lowestHomework,
  labs,
  participation,
}) {
  const scaledLabScore = scaleLabScore(labs);
  if (scaledLabScore === 0) {
    return 0;
  }

  const scaledHomeworkScore = scaleHomeworkScore(homework, lowestHomework);

  if (midterm1Clobber) {
    midterm1 = Math.max(midterm1 / 120, final / 140 - 0.15) * 120;
  }
  if (midterm2Clobber) {
    midterm2 = Math.max(midterm2 / 105, final / 140) * 105;
  }
  return (
    ((participation +
      scaledHomeworkScore +
      scaledLabScore +
      (midterm1 / 120) * 50 +
      (midterm2 / 105) * 50 +
      (final / 140) * 100) /
      300) *
    100
  );
}

function calculateGrade(score) {
  if (score >= 93) {
    return "A";
  }
  if (score >= 90) {
    return "A-";
  }
  if (score >= 84) {
    return "B+";
  }
  if (score >= 75) {
    return "B";
  }
  if (score >= 68) {
    return "B-";
  }
  if (score >= 65) {
    return "C+";
  }
  if (score >= 62) {
    return "C";
  }
  if (score >= 58) {
    return "C-";
  }
  if (score >= 57) {
    return "D+";
  }
  if (score >= 55) {
    return "D";
  }
  if (score >= 53) {
    return "D-";
  }
  return "F";
}

export default function GradeCalc() {
  const DEFAULT_VALUES = {
    midterm1: 120,
    midterm2: 105,
    final: 140,
    homework: 140,
    labs: 8,
    lowestHomework: 0,
    participation: 10,
    midterm1Clobber: false,
    midterm2Clobber: false,
  };
  const [score, setScore] = useState(calculateScore(DEFAULT_VALUES));
  const grade = calculateGrade(score);
  return (
    <Container>
      <h1>EECS 16A Grade Calculator (Spring 2021)</h1>
      <p>
        Please input your scores from{" "}
        <a target="_blank" href="https://status.eecs16a.org" rel="noreferrer">
          the status check website
        </a>
        .
      </p>
      <div>
        <Formik
          initialValues={DEFAULT_VALUES}
          onSubmit={async (values) => {
            setScore(calculateScore(values));
          }}
        >
          {(props) => (
            <Form onChange={props.handleSubmit}>
              <p>
                <label htmlFor="midterm1">
                  Midterm 1 (out of 120)
                  <br />
                  <Field
                    name="midterm1"
                    id="midterm1"
                    type="number"
                    min="0"
                    max="120"
                  />
                </label>
              </p>
              <p>
                <label htmlFor="midterm1Clobber">
                  Midterm 1 clobber
                  <br />
                  <Field
                    name="midterm1Clobber"
                    id="midterm1Clobber"
                    type="checkbox"
                  />
                </label>
              </p>
              <p>
                <label htmlFor="midterm2">
                  Midterm 2 (out of 105)
                  <br />
                  <Field
                    name="midterm2"
                    id="midterm2"
                    type="number"
                    min="0"
                    max="105"
                  />
                </label>
              </p>
              <p>
                <label htmlFor="midterm2Clobber">
                  Midterm 2 clobber
                  <br />
                  <Field
                    name="midterm2Clobber"
                    id="midterm2Clobber"
                    type="checkbox"
                  />
                </label>
              </p>
              <p>
                <label htmlFor="final">
                  Final (out of 140)
                  <br />
                  <Field
                    name="final"
                    id="final"
                    type="number"
                    min="0"
                    max="140"
                  />
                </label>
              </p>
              <p>
                <label htmlFor="homework">
                  Homework (out of 140)
                  <br />
                  <Field
                    name="homework"
                    id="homework"
                    type="number"
                    min="0"
                    max="140"
                  />
                </label>
              </p>
              <p>
                <label htmlFor="lowestHomework">
                  Lowest homework score (out of 10)
                  <span style={{ fontSize: "0.8em", display: "block" }}>
                    Get this from Gradescope. Please rescale it to be out of 10
                    using score / total * 10.
                  </span>
                  <Field
                    name="lowestHomework"
                    id="lowestHomework"
                    type="number"
                    min="0"
                    max="10"
                  />
                </label>
              </p>
              <p>
                <label htmlFor="labs">
                  Labs (out of 8)
                  <br />
                  <Field name="labs" id="labs" type="number" min="0" max="8" />
                </label>
              </p>
              <p>
                <label htmlFor="participation">
                  Participation (out of 10)
                  <br />
                  <Field
                    name="participation"
                    id="participation"
                    type="number"
                    min="0"
                    max="10"
                  />
                </label>
              </p>
            </Form>
          )}
        </Formik>
      </div>
      <div
        style={{
          background: "#efefef",
          padding: "1em",
          border: "1px solid #555",
          marginBottom: "2rem",
        }}
      >
        <p>Score (out of 100): {score}</p>
        <p>Grade: {grade}</p>
      </div>
    </Container>
  );
}
