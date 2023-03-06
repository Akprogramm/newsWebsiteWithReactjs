import './App.css';

import Navbar from './components/Navbar';
import News from './components/News';
import {Routes, Route} from "react-router-dom";
// import Home from './components/Home';
// import About from './components/About';
// import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
     <Navbar/>
     <Routes>

        {/* <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/> */}


          <Route path="/" element={<News country="in" category="general"/>}/>
          <Route path="/business" element={<News country="in" category="business"/>}/>
          <Route path="/entertainment" element={<News country="in" category="entertainment"/>}/>
          <Route path="/general" element={<News country="in" category="general"/>}/>
          <Route path="/health" element={<News country="in" category="health"/>}/>
          <Route path="/science" element={<News country="in" category="science"/>}/>
          <Route path="/sports" element={<News country="in" category="sports"/>}/>
          <Route path="/technology" element={<News country="in" category="technology"/>}/>     
    </Routes>
      </div>
  );
}

export default App;


