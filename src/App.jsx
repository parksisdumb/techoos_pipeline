import React from "react";
import Routes from "./Routes";
import { ContactProvider } from "./contexts/ContactContext";

function App() {
  return (
    <ContactProvider>
      <Routes />
    </ContactProvider>
  );
}

export default App;
