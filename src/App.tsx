import { BrowserRouter } from 'react-router-dom';
import MainRouter from './routes/MainRouter';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen font-sans">
        <MainRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
