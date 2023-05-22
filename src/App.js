
import './App.css';
import UserForm from './components/Form';
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import SubmittedForm from './components/SubmittedForm';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/submitted-form" element={<SubmittedForm/>} />
      </Routes>
    </Router>
     </div>
  );
}

export default App;
