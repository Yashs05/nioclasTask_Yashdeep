import { MathJax } from 'better-react-mathjax';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [ques, setQues] = useState('AreaUnderTheCurve_901')

  const [data, setData] = useState('')

  const [loading, setLoading] = useState(true)

  const handlePreviousClick = () => {

    if (ques === 'DifferentialCalculus2_901') {
      setQues('BinomialTheorem_901')
    }
    else {
      setQues('AreaUnderTheCurve_901')
    }

    setLoading(true)
  }

  const handleNextClick = () => {

    if (ques === 'AreaUnderTheCurve_901') {
      setQues('BinomialTheorem_901')
    }
    else {
      setQues('DifferentialCalculus2_901')
    }

    setLoading(true)
  }

  const fetchData = async (ques) => {
    try {
      const res = await fetch(`https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${ques}`)

      const data = await res.json()

      setData(data)
      setLoading(false)
    }
    catch (err) {
      setLoading(false)
      console.error(err.message)
    }
  }

  useEffect(() => {
    fetchData(ques)
  }, [ques])

  return (
    <div className='container d-flex flex-column align-items-center my-5'>
      <h4 className='mb-3'>{ques}</h4>
      {loading ?
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div> :
        <>
          <div className='main_ques mb-5'>
            <MathJax>
              {data[0].Question}
            </MathJax>
          </div>

          <div className='w-100 d-flex justify-content-between'>
            <button type="button"
              onClick={handlePreviousClick}
              className="btn btn-outline-dark d-flex"
              disabled={ques === 'AreaUnderTheCurve_901' ? true : false}>
              <span className="material-symbols-outlined">navigate_before</span>
              <span>Previous</span>
            </button>

            <button type="button"
              onClick={handleNextClick}
              className="btn btn-outline-dark d-flex"
              disabled={ques === 'DifferentialCalculus2_901' ? true : false}>
              <span>Next</span>
              <span className="material-symbols-outlined">navigate_next</span>
            </button>
          </div>
        </>
      }
    </div>
  );
}

export default App;
