import GetQuiz from './Components/GetQuiz'
import GetResults from './Components/GetResults'
import CreateQuiz from './Components/CreateQuiz'

function App() {

  return (
    <>
     <GetQuiz id={6} />
    <CreateQuiz />
    <GetResults />
    </>
  )
}

export default App
