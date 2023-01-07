import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './Components/About';
import Book from './Components/Book';
import Contact from './Components/Contact';
import SignIn from './Components/Forms/SignIn';
import SignUp from './Components/Forms/SignUp';
import Home from './Components/Home';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/book' element={<Book />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
