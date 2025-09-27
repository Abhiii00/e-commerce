import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Products';
import Cart from './Components/Cart';
import Navbar from './Components/Navbar';
import Success from './Components/Success';
import Cancel from './Components/Cancel';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
