import React from "react";
import Routes from "./Routes";
import { ContactProvider } from "./contexts/ContactContext";
import { AccountProvider } from "./contexts/AccountContext";

function App() {
  return (
    <AccountProvider>
      <ContactProvider>
        <Routes />
      </ContactProvider>
    </AccountProvider>
  );
}

export default App;
