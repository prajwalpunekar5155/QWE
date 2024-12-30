import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FullPageCalendar from "./Calender";
import EventDetailsPage from "./EventsDetailsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FullPageCalendar />} />
        <Route path="/events/:date" element={<EventDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
