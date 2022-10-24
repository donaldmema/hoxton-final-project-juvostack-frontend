import { SetStateAction, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import * as API from "./api";
import { CreateAccountPage } from "./pages/CreateAccountPage";
import { HomePage } from "./pages/HomePage";
import { SignInPage } from "./pages/SignInPage";
import { SelectCommunityPage } from "./pages/SelectCommunityPage";
import { CommunityQuestionsPage } from "./pages/CommunityQuestionsPage";
import { QuestionPostPage } from "./pages/QuestionPostPage";
import { QuestionDetailPage } from "./pages/QuestionDetailPage";

function App() {
  let communities = ["JavaScript", "React", "Java"];

  const [currentUser, setCurrentUser] = useState(null);
  const [currentCommunity, setCurrentCommunity] = useState<String | null>(null);
  const [allCommunities, setAllCommunities] = useState<String[] | null>(
    communities
  );

  const navigate = useNavigate();

  useEffect(() => {
    setAllCommunities(communities);
  }, []);

  function signIn(data: { user: any; token: string }) {
    setCurrentUser(data.user);
    localStorage.token = data.token;
  }

  function signOut() {
    setCurrentUser(null);
    navigate("/homepage");
    localStorage.removeItem("token");
  }

  function getDate(sqlDate: any) {
    let jsDate = new Date(Date.parse(sqlDate));
    let dateString = jsDate.toString();
    let dateArray = dateString.split(" ");
    let finalDate =
      dateArray[1] +
      " " +
      dateArray[2] +
      ", " +
      dateArray[3] +
      " at " +
      dateArray[4].substring(0, 5);

    return finalDate;
  }

  useEffect(() => {
    if (localStorage.token) {
      API.validate().then((data) => {
        if (data.error) {
          alert(data.error);
          localStorage.removeItem("token");
        } else {
          signIn(data);
          navigate("/select-community");
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

        <Route
          path="/select-community"
          element={
            <SelectCommunityPage
              currentUser={currentUser}
              signOut={signOut}
              allCommunities={allCommunities}
              setAllCommunities={setAllCommunities}
              setCurrentCommunity={setCurrentCommunity}
            />
          }
        />

        <Route
          path="/community-questions"
          element={
            <CommunityQuestionsPage
              currentUser={currentUser}
              signOut={signOut}
              allCommunities={allCommunities}
              setCurrentCommunity={setCurrentCommunity}
              currentCommunity={currentCommunity}
              getDate={getDate}
            />
          }
        />

        <Route path="/questions/ask" element={<QuestionPostPage />} />

        <Route
          path="/questions/:id"
          element={
            <QuestionDetailPage
              currentUser={currentUser}
              signOut={signOut}
              allCommunities={allCommunities}
              setCurrentCommunity={setCurrentCommunity}
              currentCommunity={currentCommunity}
              getDate={getDate}
            />
          }
        />

        {/* <Route path="/profile" element={<ProfilePage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
