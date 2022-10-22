import { NavLink } from "react-router-dom";
import { HpNavBar } from "../components/HpNavBar";
import "./HomePage.css";
import productivity from "../assets/analytics.png";
import knowledge from "../assets/share.png";
import { HpFooter } from "../components/HpFooter";

export function HomePage() {
  return (
    <div className="homepage-container">
      <HpNavBar />
      <main className="homepage__main">
        <section className="homepage__main-first-section">
          <h2>IMAGINE A PLACE...</h2>
          <p>
            ...where you can find the best answer to your technical question or
            help others find theirs.
          </p>
          <p>
            Where you can be part of a public platform building the definitive
            collection of coding questions & answers.
          </p>
          <p>A place that helps with your coding headaches.</p>
          <div className="btns-wrapper">
            <NavLink to="/sign-up" className="main__signup-btn">
              Create Account
            </NavLink>
            <NavLink to="/signin" className="main__login-btn">
              Sign in
            </NavLink>
          </div>
        </section>
        <section className="homepage__main-second-section">
          <div>
            <img src={productivity} alt="productivity logo" width={300} />
          </div>
          <div>
            <h3>Increase Productivity</h3>
            <p className="productivity-p">
              If somebody somewhere has the right answer, suddenly you have it
              too. Collaborate better in a remote-first world.
            </p>
          </div>
        </section>
        <section className="homepage__main-third-section">
          <div>
            <h3>Protect institutional knowledge</h3>
            <p className="knowledge-p">
              People come and people go, but if you capture their contributions
              in one central place, that expertise sticks around.
            </p>
          </div>
          <div>
            <img src={knowledge} alt="logo" width={300} />
          </div>
        </section>
      </main>
      <HpFooter />
    </div>
  );
}

{
  /* <h2>WHAT IS JUVOSTACK?</h2>
          <p>
            JuvoStack is a platform for developers to ask questions and share
            knowledge.
          </p>
          <p>
            It's built and run by you as part of the Stack Overflow community.
          </p>
          <p>
            With your help, we're working together to build a library of
            detailed answers to every question about programming.
          </p>
          <p>Join us to help programmers, and to grow your own career.</p> */
}
