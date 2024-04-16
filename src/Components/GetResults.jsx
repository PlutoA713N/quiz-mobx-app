import { useEffect, useState } from "react"

const GetResults= ({}) => {


    const [results, setResults] = useState([])
   
    useEffect(() => {  
        const fetchData = async() => {
            try{
            const response = await fetch('http://localhost:1337/quiz/results')
            if( !response.ok ){
                throw new Error('Network response was not ok');
            }

            const data = await response.json()
            setResults( data )

            }catch(error) {
                console.error("Fetch error:", error);
            }
        }

        fetchData()

    }, [])

    return(
        <>
            {
                results.map((result, index) => (
                    <div style={{border: '2px solid black'}} key={index}>
                        <p>userId: {result.userId}</p>
                        <p>quizId: {result.quizId}</p>
                        <p>score: {result.score}</p>
                    </div>
                ))
            }
        </>
    )
}


export default GetResults