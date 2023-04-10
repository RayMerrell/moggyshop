import "./css/App.css";

import Navbar from "./components/Navbar";
import NavFooter from "./components/NavFooter";
import Catalogue from "./components/Catalogue";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Catalogue />
      <NavFooter />
    </div>
  );  
}
export default App;
