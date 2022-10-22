import { useNavigate } from "react-router-dom";
import "./CreateAccountPage.css";
import logo from "../assets/layer.png";
import ad from "../assets/signup-ad.png";
import * as API from "../api";
import { HpNavBar } from "../components/HpNavBar";

type Props = {
  signIn: (data: { user: any; token: string }) => void;
};

export function CreateAccountPage({ signIn }: Props) {
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const name = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;

    if (email && password && name) {
      API.signup({ email, password, name }).then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          //sign them in
          signIn(data);
          navigate("/select-community");
        }
      });
    }
  }

  return (
    <div className="sign-up-page">
      <HpNavBar />

      <img className="signup-logo" src={logo} width="70px" alt="logo" />
      <div className="sign-up-form-container">
        <h3>Create your account</h3>

        <form
          className="sign-up-form-section"
          onSubmit={(event) => handleSubmit(event)}
        >
          <label htmlFor="name">Full Name</label>
          <input type="text" name="fullName" id="name" required />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
          <label htmlFor="password">
            Password <span>*</span> <br />
            <p>Use at least 6 characters</p>
          </label>

          <input type="password" id="password" name="password" required />

          <button className="sign-up-btn" type="submit">
            Sign up
          </button>
          <p>
            By creating an account or logging in, you understand and agree to
            JuvoStack's <a href="">Terms</a>. You also acknowledge our
            <a href=""> Cookie</a> and <a href="">Privacy</a> policies.
          </p>
        </form>
      </div>
    </div>
  );
}
