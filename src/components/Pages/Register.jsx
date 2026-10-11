import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";


function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.target);
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    // if (password !== confirmPassword) {
    //   setMessage("Your passwords do not match. Please try again.");
    //   form.elements.confirmPassword.focus();
    //   return;
    // }

    axios
      .post(`${import.meta.env.VITE_API_URL}register.php`, {
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password")
      })
      .then(() => {
        setMessage("Account created successfully. You can now sign in.");
        window.location.href='./login';
      })
      .catch(() => {
        setMessage("An error occurred while creating your account. Please try again.");
      });
  }

  return (
    <div className="login-area">
        <div className="container">
            <div className="login-box ptb--100">
                <form onSubmit={handleSubmit}>
                    <div className="login-form-head">
                        <h4>Sign up</h4>
                        <p>Hello there, Sign up and Join with Us</p>
                    </div>
                    <div className="login-form-body">
                        <div className="form-gp">
                            <label htmlFor="exampleInputName1">Full Name</label>
                            <input type="text" name="name" id="exampleInputName1"/>
                            <i className="ti-user"></i>
                            <div className="text-danger"></div>
                        </div>
                        <div className="form-gp">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" name="email" id="exampleInputEmail1"/>
                            <i className="ti-email"></i>
                            <div className="text-danger"></div>
                        </div>
                        <div className="form-gp">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" name="password" id="exampleInputPassword1"/>
                            <i className="ti-lock"></i>
                            <div className="text-danger"></div>
                        </div>
                        <div className="form-gp">
                            <label htmlFor="exampleInputPassword2">Confirm Password</label>
                            <input type="password" name="confirmPassword" id="confirmPassword"/>
                            <i className="ti-lock"></i>
                            <div className="text-danger"></div>
                        </div>
                        <div className="submit-btn-area">
                            <button id="form_submit" type="submit">Submit <i className="ti-arrow-right"></i></button>
                            <div className="login-other row mt-4">
                                <div className="col-6">
                                    <a className="fb-login" href="#">Sign up with <i className="fa-brands fa-facebook"></i></a>
                                </div>
                                <div className="col-6">
                                    <a className="google-login" href="#">Sign up with <i className="fa-brands fa-google"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="form-footer text-center mt-5">
                            <p className="text-muted">Don't have an account? <Link to="/Login">Sign in</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

export default Register;
