import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import { SignInButton } from "@clerk/clerk-react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <SignInButton mode="modal" forceRedirectUrl="/">
        <Button>Sign In</Button>
      </SignInButton>
    </div>
  );
}

export default App;