import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import * as API from "./api";
import { CreateAccountPage } from "./pages/CreateAccountPage";
import { HomePage } from "./pages/HomePage";
import { SignInPage } from "./pages/SignInPage";
import { SelectCommunityPage } from "./pages/SelectCommunityPage";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  function signIn(data: { user: any; token: string }) {
    setCurrentUser(data.user);
    localStorage.token = data.token;
  }

  function signOut() {
    setCurrentUser(null);
    localStorage.removeItem("token");
  }

  useEffect(() => {
    if (localStorage.token) {
      API.validate().then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          signIn(data);
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate to="/homepage" />} />
        <Route path="/homepage" element={<HomePage />} />

        <Route path="/signin" element={<SignInPage signIn={signIn} />} />
        <Route
          path="/sign-up"
          element={<CreateAccountPage signIn={signIn} />}
        />

        <Route path="/select-community" element={<SelectCommunityPage />} />

        {/* <Route path="/profile" element={<ProfilePage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
