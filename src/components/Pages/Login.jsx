import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";


function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.target);

    axios
      .post(`${import.meta.env.VITE_API_URL}login.php`, {
        email: form.get("email"),
        password: form.get("password")
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.jwt);
        localStorage.setItem("userdata", response.data.data);
        window.location.href='./dashboard';
      })
      .catch(() => {
        setMessage("An error occurred while creating your account. Please try again.");
      });

  }

  return (
    <div className="login-area">
        <div className="container">
            <div className="login-box ptb--100">
                <form  onSubmit={handleSubmit}>
                    <div className="login-form-head">
                        <h4>Sign In</h4>
                        <p>Hello there, Sign in and start managing your Admin Template</p>
                    </div>
                    <div className="login-form-body">
                        <div className="form-gp">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" name="email" id="exampleInputEmail1"/>
                            <i className="ti-email"></i>
                            <div className="text-danger"></div>
                        </div>
                        <div className="form-gp">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" name="password" id="exampleInputPassword1"/>
                            <i className="ti-lock"></i>
                            <div className="text-danger"></div>
                        </div>
                        <div className="row mb-4 rmber-area">
                            <div className="col-6">
                                <div className="form-check me-sm-2">
                                    <input type="checkbox" className="form-check-input" id="customControlAutosizing"/>
                                    <label className="form-check-label" for="customControlAutosizing">Remember Me</label>
                                </div>
                            </div>
                            <div className="col-6 text-end">
                                <a href="#">Forgot Password?</a>
                            </div>
                        </div>
                        <div className="submit-btn-area">
                            <button id="form_submit" type="submit">Submit <i className="ti-arrow-right"></i></button>
                            <div className="login-other row mt-4">
                                <div className="col-6">
                                    <a className="fb-login" href="#">Log in with <i className="fa-brands fa-facebook"></i></a>
                                </div>
                                <div className="col-6">
                                    <a className="google-login" href="#">Log in with <i className="fa-brands fa-google"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="form-footer text-center mt-5">
                            <p className="text-muted">Don't have an account? <Link to="/Register">Sign up</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

export default Login;
