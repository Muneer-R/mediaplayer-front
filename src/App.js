import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Landing from './pages/Landing';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from './pages/Home';
import Watchhistory from './pages/Watchhistory';


function App() {
  return (
    <>
    <Header/>

    <div className='container m-5'>

      <Routes>
          
          <Route path='/' element={ <Landing/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/watchhistory' element={<Watchhistory/>}/>

      </Routes>

   

    </div>


    <Footer/>
    </>
  );
}

export default App;
