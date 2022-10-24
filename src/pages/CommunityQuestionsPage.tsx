import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { HpFooter } from "../components/HpFooter";
import { QueNavBar } from "../components/QueNavBar";
import "./CommunityQuestionsPage.css";
import { IoFilter } from "react-icons/io5";
import { useEffect, useState } from "react";

type Props = {
  currentUser: any;
  signOut: () => void;
  allCommunities: any;
  setCurrentCommunity: any;
  currentCommunity: any;
  getDate: (sqlDate: any) => string;
};

export function CommunityQuestionsPage({
  currentUser,
  signOut,
  allCommunities,
  setCurrentCommunity,
  currentCommunity,
  getDate,
}: Props) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<any>([]);

  function resetQuestions() {
    fetch(`http://localhost:3005/questions/${currentCommunity}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      });
  }

  function getUnansweredQuestions() {
    fetch(`http://localhost:3005/questions/${currentCommunity}`)
      .then((res) => res.json())
      .then((data) => {
        let unansweredQuestions = data.filter(
          (question: any) => question.answers.length === 0
        );
        setQuestions(unansweredQuestions);
      });
  }

  function getNewestQuestions() {
    fetch(`http://localhost:3005/questions/${currentCommunity}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.reverse());
      });
  }

  useEffect(() => {
    if (!currentCommunity) {
      navigate("/select-community");
    }
    // else if (!currentUser) {
    //   navigate("/homepage");
    // }
    else {
      fetch(`http://localhost:3005/questions/${currentCommunity}`)
        .then((res) => res.json())
        .then((data) => {
          setQuestions(data);
        });
    }
  }, [currentCommunity, currentUser]);

  return (
    <div className="community-questions-page-container">
      <QueNavBar currentUser={currentUser} signOut={signOut} />
      <main className="questions-page-main-section">
        <div></div>
        <div className="questions-list-section">
          <div className="filter-options">
            <p className="questions-count">{questions.length} Questions</p>
            <div className="questions-filter-section">
              <button
                className="filter-buttons first-button"
                onClick={getNewestQuestions}
              >
                Newest
              </button>
              <button
                className="filter-buttons second-button"
                onClick={getUnansweredQuestions}
              >
                Unanswered
              </button>
              <button
                className="filter-buttons filter"
                onClick={resetQuestions}
              >
                <IoFilter />
                Remove Filter
              </button>
            </div>
          </div>
          <ul className="questions-list-ul-el">
            {questions.map((question: any) => {
              return (
                <li key={question.id} className="question-li-element">
                  <div className="question-left-stats">
                    <p className="question-answer-count">
                      {question.answers.length} answers
                    </p>
                  </div>
                  <div className="question-right-summary">
                    <NavLink
                      to={`/questions/${question.id}`}
                      className="question-title"
                    >
                      {question.title}
                    </NavLink>
                    <p className="question-content-p">
                      {question.content.substring(0, 230)} . . .
                    </p>
                    <p className="posting-time-p">
                      {question.author.name} asked {getDate(question.published)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <aside className="community-change-section">
          <div className="ask-question-section">
            <Link to={"/questions/ask"}>
              <button className="ask-question-btn">Ask Question</button>
            </Link>
          </div>
          <div className="community-change__options">
            <p>Need something else?</p>
            <div className="community-change-buttons">
              {allCommunities.map((community: any) => (
                <Link key={community} to={"/community-questions"}>
                  <button
                    className={
                      community === currentCommunity ? "selected-community" : ""
                    }
                    onClick={() => {
                      setCurrentCommunity(community);
                    }}
                  >
                    {community}
                  </button>
                </Link>
              ))}
            </div>
            <p className="select-another-community-link">
              <Link to={"/select-community"}>Select another community</Link>
            </p>
          </div>
          <div></div>
        </aside>
      </main>
      {/* <HpFooter /> */}
    </div>
  );
}
