import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { autorun, observable, runInAction } from "mobx";
import { action } from "mobx";

const results = observable([]);

const GetResults = observer(() => {

  const fetchData = action(async () => {
    try {
      const response = await fetch("https://quizbackend-gtn6.onrender.com/quiz/results");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
    
      runInAction(() => {
        results.replace(data);
        console.log('resultsData', data)
      });

    } catch (error) {
      console.error("Fetch error:", error);
    }
  });

  useEffect(() => {
    const disposer = autorun(() => {
      fetchData();
    });

    return () => disposer();
  }, []);

  return (
    <>
    {JSON.stringify(results)}
      {results.map((result, index) => (
        <div style={{ border: "2px solid black" }} key={index}>
          <p>userId: {result.userId}</p>
          <p>quizId: {result.quizId}</p>
          <p>score: {result.score}</p>
        </div>
      ))}
    </>
  );
});

export default GetResults;
