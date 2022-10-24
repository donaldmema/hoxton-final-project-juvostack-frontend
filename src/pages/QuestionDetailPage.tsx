import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QueNavBar } from "../components/QueNavBar";
import "./QuestionDetailPage.css";

type Props = {
  currentUser: any;
  signOut: () => void;
  allCommunities: any;
  setCurrentCommunity: any;
  currentCommunity: any;
  getDate: (sqlDate: any) => string;
};

function cleanRegex(text: String) {
  let newText = text.substring(3, text.length - 3);
  let finalText = "\n" + newText + "\n";
  return finalText;
}

export function QuestionDetailPage({
  currentUser,
  signOut,
  allCommunities,
  setCurrentCommunity,
  currentCommunity,
  getDate,
}: Props) {
  const params = useParams();
  let questionId = params.id;

  const [question, setQuestion] = useState<any>(null);
  const [answers, setAnswers] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:3005/question/${questionId}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data);
      });

    fetch(`http://localhost:3005/answers/${questionId}`)
      .then((res) => res.json())
      .then((data) => {
        setAnswers(data);
      });
    setTimeout(function () {
      console.log("Done");
    }, 500);
  }, []);

  if (!question) {
    return <div>Loading...</div>;
  } else if (!answers) {
    return <div>Loading...</div>;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const answer = formData.get("newAnswer");
    const answerObj = {
      content: answer,
      questionId: questionId,
      authorId: currentUser.id,
    };
    fetch(`http://localhost:3005/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answerObj),
    })
      .then((res) => res.json())
      .then((data) => {
        setAnswers([...answers, data]);
      });
  }

  const reg = /```[\s\S]*?```/gim;
  const reg2 = /```/gim;

  return (
    <div className="question-detail-page-container">
      <QueNavBar currentUser={currentUser} signOut={signOut} />
      <main className="question-detail-page-main-section">
        <div></div>
        <div className="questions-list-section">
          <div className="question-detailed-header">
            <h2 className="question-detailed-h2">{question.title}</h2>
            <div className="question-h2-author-info">
              <p>
                <span className="date-span-el-first">Asked on </span>
                <span className="date-span-el-second">
                  {getDate(question.published)}
                </span>
              </p>
              <p>
                <span className="date-span-el-first">Asked by: </span>
                <span className="date-span-el-second">
                  {question.author.name}
                </span>
              </p>
            </div>
          </div>
          <div className="question-detailed-content">
            <p>{question.content.replace(reg2, "~~~\n")}</p>
          </div>
          <h3 className="answers-count">{question.answers.length} Answers</h3>
          <ul className="answers-list-ul-el">
            {answers.map((answer: any) => {
              return (
                <li key={answer.id} className="answer-li-element">
                  <div className="answer-content">
                    <p>{answer.content.replace(reg, "")}</p>
                    <textarea
                      readOnly
                      className="answer-content-textarea"
                      value={cleanRegex(answer.content.match(reg).toString())
                        .replace("     ", "\n")
                        .replace("       ", "\n")
                        .replace("     ", "\n")
                        .replace("     ", "\n")}
                    ></textarea>
                  </div>
                  <div className="answer-info">
                    <div></div>
                    <div className="question-h2-author-info">
                      <p>
                        <span className="date-span-el-first">Answered on </span>
                        <span className="date-span-el-second">
                          {getDate(answer.published)}
                        </span>
                      </p>
                      <p>
                        <span className="date-span-el-first">Answered by:</span>
                        <span className="date-span-el-second">
                          {answer.author.name}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="new-answer-form-section">
            <h3 className="new-answer-h3">Your Answer</h3>
            <form
              className="new-answer-form"
              onSubmit={(event) => handleSubmit(event)}
            >
              <textarea
                className="new-answer-textarea"
                placeholder="Your answer here..."
                name="newAnswer"
              ></textarea>
              <button className="new-answer-button" type="submit">
                Post Your Answer
              </button>
            </form>
          </div>
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

//regex for selecting codeblocks: /```[\s\S]*?```/gim
