import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./utils/contextApi/AppContext.js";
import MainComponent from "./pages/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <MainComponent />
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
