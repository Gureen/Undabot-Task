import { useLocation } from 'react-router-dom';

const Success = () => {
  const { state } = useLocation();
  const { payload } = state;

  return (
    <h1
      className='row justify-content-end align-items-center min-vh-100'
      style={{ paddingRight: '100px' }}>
      Thank you for filling the form.
      <br />
      What film did you watch?
      <br />
      {payload?.data?.attributes?.answers[0]?.answer}
      <br />
      How would you rate the film?
      <br />
      {payload?.data?.attributes?.answers[1]?.answer}
    </h1>
  );
};

export default Success;
