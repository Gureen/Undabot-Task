export interface IResponse<D> {
  data: D;
}

export interface ISurvey {
  type: string;
  id: string;
  attributes: ISurveyAttributes;
}

export interface ISurveyAttributes {
  title: string;
  description: string;
  questions: IQuestion[];
}

export interface IQuestion {
  questionId: string;
  questionType: string;
  label: string;
  required: boolean;
  attributes: IRules;
}

export interface IRules {
  min: number;
  max: number;
}
