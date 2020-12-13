import PetOwnerStore from "./PetOwnerStore";
import PetList from "./components/PetList";
import "./App.css";

function App() {
  const store = new PetOwnerStore();
  return (
    <div className="App">
      <PetList store={store} />
    </div>
  );
}

export default App;
