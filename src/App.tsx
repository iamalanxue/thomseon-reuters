import './App.css';
import { CssBaseline } from '@mui/material';
import HomePage from './containers/HomePage';
import Upload from './containers/Upload';

function App() {
  return (
    <div className="App">
      <div className='content'>
        <CssBaseline />
        {/* <HomePage /> */}
        <Upload />
      </div>
    </div>
  );
}

export default App;
