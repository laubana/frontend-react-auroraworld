import { Route, Routes } from "react-router-dom";

import "./App.css";
import Auth from "./layouts/Auth";
import Protect from "./layouts/Protect";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

function App() {
  return (
    <Routes>
      <Route element={<Auth />}>
        <Route element={<Protect />}>
          <Route path="/" element={<App />} />
        </Route>
        <Route path="auth">
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
