import express from 'express';
import { ErrorModel } from './model';

const app = express();
const port = 4040;
const fs = require('fs');
const cors = require('cors');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const path = require('path');
const surveyFormAnswers = require(path.join(
  __dirname,
  './store/SurveyFormData.json'
));

app.use(cors({ origin: '*' }));

app.get('/api/v1/survey', (request, response) => {
  fs.readFile(
    path.join(__dirname, './store/SurveyFormData.json'),
    'utf-8',
    (error: any, data: any) => {
      if (error) {
        return response.status(500).send({
          errors: [
            {
              title: 'Internal Server Error',
              detail: "Something went wrong. We're working on it!",
            },
          ],
        });
      }
      const SurveyFormData = JSON.parse(data);
      return response.json({ data: SurveyFormData });
    }
  );
});

app.post('/api/v1/survey/:id/answers', (request, response) => {
  console.log(request.body);

  const body = request.body;
  const errors: ErrorModel[] = [];
  const answers = body.data.attributes.answers;

  //validation
  surveyFormAnswers?.attributes.questions.forEach((q) => {
    if (q.required) {
      const findQuestionAnswer = answers.find(
        (ans) => ans.questionId === q.questionId
      );
      if (!findQuestionAnswer) {
        errors.push({
          source: { pointer: 'data/attributes/answers/' + q.questionId },
          detail: 'The value is required.',
        });
        return;
      }

      let isValid = true;

      switch (q.questionType) {
        case 'text':
          isValid =
            findQuestionAnswer.answer !== null &&
            findQuestionAnswer.answer !== undefined &&
            findQuestionAnswer.answer !== '';
          break;
        case 'rating':
          if (q.attributes) {
            let isAnswerBiggerThanMin = true;
            let isAnswerSmallerThanMax = true;
            if (q.attributes.min !== null && q.attributes.min !== undefined) {
              isAnswerBiggerThanMin =
                findQuestionAnswer.answer >= q.attributes.min;
            }
            if (q.attributes.max !== null && q.attributes.max !== undefined) {
              isAnswerSmallerThanMax =
                findQuestionAnswer.answer <= q.attributes.max;
            }
            isValid = isAnswerBiggerThanMin && isAnswerSmallerThanMax;
          } else {
            isValid =
              findQuestionAnswer.answer !== null &&
              findQuestionAnswer.answer !== undefined &&
              typeof findQuestionAnswer.answer === 'number';
          }
          break;
      }

      if (!isValid) {
        errors.push({
          source: { pointer: 'data/attributes/answers/' + q.questionId },
          detail: 'The value is not valid.',
        });
      }
    }
  });

  if (errors.length > 0) {
    return response.status(422).send({
      errors,
    });
  }

  fs.readFile(
    path.join(__dirname, './store/MovieReviews.json'),
    'utf-8',
    (error, data) => {
      if (error) {
        return response.status(500).send({
          errors: [
            {
              title: 'Internal Server Error',
              detail: "Something went wrong. We're working on it!",
            },
          ],
        });
      }

      fs.writeFile(
        path.join(__dirname, './store/MovieReviews.json'),
        JSON.stringify(request.body),
        () => {
          return response.status(201).send({
            data: {
              type: 'surveyAnswers',
              attributes: {
                answers: [
                  {
                    questionId: 'film',
                    answer: answers[0].answer,
                  },
                  {
                    questionId: 'review',
                    answer: answers[1].answer,
                  },
                ],
              },
            },
          });
        }
      );
    }
  );
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
