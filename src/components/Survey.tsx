const Survey = () => {
  return (
    <>
      <div className='container-fluid'>
        <div className='row justify-content-end align-items-center min-vh-100'>
          <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
            <div className='card'>
              <div className='card-body'>
                <h4> Title </h4>
                <div className='mb-4 fw-semibold'></div>
                <form onSubmit={() => {}}>
                  <div className='mb-3'>
                    <label className='form-label'>Question 1</label>
                    <input className='form-control' onChange={() => {}} />
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Question 2</label>
                    <input className='form-control' onChange={() => {}} />
                  </div>
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
