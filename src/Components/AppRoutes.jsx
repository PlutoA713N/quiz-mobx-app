// AppRoutes.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetQuiz from "./GetQuiz";

const AppRoutes = () => {
  return (
    <Router>
    <Routes>
      <Route path="/quiz/:id" element={<GetQuiz />} />
    </Routes>
    </Router>
  );
};

export default AppRoutes;
