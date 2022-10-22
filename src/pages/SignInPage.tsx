import { useNavigate } from "react-router-dom";
import "./SignInPage.css";
import logo from "../assets/layer.png";
import * as API from "../api";
import { HpNavBar } from "../components/HpNavBar";

type Props = {
  signIn: (data: { user: any; token: string }) => void;
};

export function SignInPage({ signIn }: Props) {
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    if (email && password) {
      API.login({ email, password }).then((data) => {
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
    <div className="sign-in-page">
      <HpNavBar />
      <img className="signin-logo" src={logo} width="70px" alt="logo" />
      <div className="form-container">
        <p>
          By creating an account or logging in, you understand and agree to
          JuvoStack's <a href="">Terms</a>. You also acknowledge our
          <a href=""> Cookie</a> and <a href="">Privacy</a> policies.
        </p>
        <form
          className="form-section"
          onSubmit={(event) => handleSubmit(event)}
        >
          <input type="email" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <button className="sign-in-btn" type="submit">
            Sign In
          </button>
        </form>
      </div>
      <p className="signin-signup-p">
        Don't have an account? <a href="/sign-up">Sign up</a>
      </p>
      <div></div>
    </div>
  );
}
