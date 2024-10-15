import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import AddList from "./pages/AddList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home> ,
  },
  {
    path: "/home",
    element: <Home></Home>,
  },
  {
    path: "/Profile",
    element: <Profile/>,
  },
  {
    path: "/add-list",
    element: <AddList/>,
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
