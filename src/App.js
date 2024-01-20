import "./App.css";
import Bar from "./Bar.js"; // Assuming bar.js is in the same directory
import Calendar from "./Calendar.js"; // Assuming calendar.js is in the same directory
import Search from "./Search.js";
import GridComponent from "./GridComponent";

function App() {
  return (
    <div className="App">
      <div className="top-bar">
        <Bar />
      </div>
      <div>
        <Search />
      </div>
      <div>
        <Calendar />
      </div>
      <div>
        <GridComponent />
      </div>
    </div>
  );
}

export default App;
