import express from 'express';
const app = express();
const port = 4040;
const fs = require('fs');
const cors = require('cors');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors({ origin: '*' }));

app.get('/api/v1/survey', (request, response) => {
  fs.readFile(
    './server/store/SurveyFormData.json',
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

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
