import Todolist from "./Components/Todolist";
import { Provider } from "react-redux";
import createstore from './Components/redux/store';
import './App.css';
function App() {
  return (
    <Provider store={createstore}>
    <div className="App">
     <Todolist/>
    </div>
    </Provider>
  );
}

export default App;
