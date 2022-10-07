import { Route, Routes } from 'react-router-dom';
import Success from './components/Success';
import Survey from './components/Survey';
import popcorn from './images/popcorn.jpg';
import './styles/styles.css';

const App = () => {
  return (
    <main
      style={{
        backgroundImage: `url(${popcorn})`,
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        minHeight: '100vh',
      }}>
      <Routes>
        <Route path='/' element={<Survey />} />
        <Route path='/success' element={<Success />} />
      </Routes>
    </main>
  );
};

export default App;
