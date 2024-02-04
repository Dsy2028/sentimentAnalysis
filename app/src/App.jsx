import { useState, useEffect } from 'react'

function App() {
  const [statement, setStatement] = useState('')
  const [response, setResponse] = useState()
  // Fetches sentiment analysis data from the server and updates the response state.
const checkStatement = () => {
try {
  fetch('http://127.0.0.1:5000/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(statement)
  })
  .then(response => response.json())
  .then((data) => {
  //  console.log(data)
    setResponse(data)
  })
  .catch((error) => console.error(error))
} catch (error) {
  console.error(error)
}
}

//console.log(statement)
  return (
    <>
      <div className="h-screen flex flex-col items-center bg-slate-700 text-white">
        <h1 className="font-semibold text-3xl text-white  mt-[3rem] mb-[4rem] nunito" >Test the positivity or negativity of a statement or paragraph</h1>
        <div className="">
          <div className="flex gap-3">
          <textarea type="text"  id="statement" name="statement" placeholder="Enter your statement" value={statement} onChange={(e) => setStatement(e.target.value)} className="text-black w-[40rem] h-[20rem] resize-none p-1" />
          <button onClick={() => checkStatement()} className="bg-fuchsia-500 rounded px-4 nunito font-semibold">Check</button>
          </div>
          <div className="flex flex-col mt-2">
          <div className="flex gap-4">
          {response &&<h1 className="text-lg"> Polarity: {Math.round(response[0][0] * 100) / 100}</h1>}
          {response && <h1 className="text-lg"> Subjectivity: {Math.round(response[0][1] * 100) / 100}</h1>}
          </div>
          <div className="flex gap-3 items-center">
          {response && <h1 className="text-lg">{response[1]} statement</h1>}
          <span>&</span>
          {response && <h1 className="text-lg">{response[2]} statement</h1>}
          </div>
          </div>
          <div className="flex gap-5 mt-[3rem] w-[44rem]">
            <div className="">
            <h2 className="text-xl font-semibold nunito">what does polarity mean?</h2>
            <p>This is a measure of the sentiment expressed in a statement. It ranges from -1 to 1. A polarity of -1 indicates a very negative sentiment, 0 indicates a neutral sentiment, and 1 indicates a very positive sentiment. For example, "I love this product!" would have a high polarity, indicating a positive sentiment, while "I hate this product!" would have a low polarity, indicating a negative sentiment.</p>
            </div>
            <div className="">
              <h2 className="text-xl font-semibold nunito">what does subjectivity mean?</h2>
              <p>This is a measure of the personal opinions, beliefs, emotions, and judgments expressed in a statement. It ranges from 0 to 1. A subjectivity of 0 indicates that the statement is very objective, i.e., it is based on factual information. A subjectivity of 1 indicates that the statement is very subjective, i.e., it is based on personal opinions or emotions. For example, "The product weighs 2 pounds" would have a low subjectivity because it's a factual statement, while "I think the product is too heavy" would have a high subjectivity because it's based on a personal opinion.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
