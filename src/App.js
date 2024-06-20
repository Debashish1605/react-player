import "./App.css";
import VideoPlayer from "./Components/VideoPlayer"; // Update the import path as needed

const App = () => {
  return (
    <div className="App">
      <h2>React player</h2>
      <VideoPlayer url="https://www.youtube.com/watch?v=jmVPLwjm_zs" />
    </div>
  );
};

export default App;
