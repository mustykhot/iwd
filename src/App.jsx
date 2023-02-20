import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddMentor from "./Pages/addMentor";
import Mentee from "./Pages/mentee";
import MenteeList from "./Pages/menteeList";
import MentorList from "./Pages/mentorList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mentee />} />
          <Route path="/addmentor" element={<AddMentor />} />
          <Route path="/list-mentee" element={<MenteeList />} />
          <Route path="/list-mentor" element={<MentorList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
