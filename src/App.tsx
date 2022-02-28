import './App.css';
import { CssBaseline } from '@mui/material';
import HomePage from './containers/HomePage';

function App() {
  return (
    <div className="App">
      <div className='content'>
        <CssBaseline />
        <HomePage />
      </div>
    </div>
  );
}

export default App;
