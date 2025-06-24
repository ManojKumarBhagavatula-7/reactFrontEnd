import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddStudent from './components/js/AddStudent';
import ViewAllStudents from './components/js/ViewAllStudents';
import NavBar from './components/js/NavBar';
import UpdateStudent from './components/js/UpdateStudent' // Ensure the path is correct

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ padding: '20px' }}>

        <Routes>
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/view-students" element={<ViewAllStudents />} />
          <Route path="/update-student/:id" element={<UpdateStudent/>}/>
       
        </Routes>
      </div>
    </Router>
  );
}

export default App;
