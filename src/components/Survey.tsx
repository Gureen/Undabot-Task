import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import environment from '../environment/environment';
import { IResponse, ISurvey } from '../models/survey';
import Loading from '../utility/Loading';
import { useFetch } from '../utility/useFetch';

const SURVEY_PATH = environment.apiUrl + '/survey';

const Survey = () => {
  const [surveyLoading, surveyData] = useFetch<IResponse<ISurvey>>(SURVEY_PATH);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const ANSWERS_PATH =
    environment.apiUrl + `/survey/${surveyData?.data.id}/answers`;

  const surveyFormData = surveyData?.data?.attributes;
  const surveyFormQuestions = surveyData?.data?.attributes?.questions;

  const addInfo = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const payload = {
      data: {
        type: 'surveyAnswers',
        attributes: {
          answers: Object.values(answers),
        },
      },
    };

    const bodyData = JSON.stringify(payload);
    fetch(ANSWERS_PATH, {
      method: 'POST',
      body: bodyData,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .finally(() => {
        navigate('/success', { state: { payload } });
      });
  };

  const onChangeHandler = (value: string, questionId: string) => {
    setAnswers({
      ...answers,
      [questionId]: {
        questionId,
        answer: value,
      },
    });
  };

  if (surveyLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <>
      <div className='container-fluid'>
        <div className='row justify-content-end align-items-center min-vh-100'>
          <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
            <div className='card'>
              <div className='card-body'>
                <h4>{surveyFormData.title} </h4>
                <div
                  className='mb-4 fw-semibold'
                  dangerouslySetInnerHTML={{
                    __html: surveyFormData.description,
                  }}></div>
                <form onSubmit={addInfo}>
                  {surveyFormQuestions?.map((question) => {
                    const type =
                      question.questionType === 'rating'
                        ? 'number'
                        : question.questionType;
                    return (
                      <div className='mb-3' key={question.questionId}>
                        <label className='form-label'>{question.label}</label>
                        <input
                          type={type}
                          className='form-control'
                          onChange={(event) =>
                            onChangeHandler(
                              event.target.value,
                              question.questionId
                            )
                          }
                          required={question.required}
                          min={question?.attributes?.min}
                          max={question?.attributes?.max}
                        />
                      </div>
                    );
                  })}
                  <button className='btn w-100 btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Survey;
