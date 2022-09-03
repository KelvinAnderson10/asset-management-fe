import './App.css';
import { AppRouter } from './navigation/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './services/UseAuth';


function App() {
  return (
    <div className="App">
      <AuthProvider>
      <AppRouter></AppRouter>
      </AuthProvider>

      
    </div>
  );
}

export default App;
