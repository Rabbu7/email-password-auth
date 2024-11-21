import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSignUp = (e) => {
    e.preventDefault();
    // console.log(e.target.email.value);
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const terms = e.target.terms.checked;

    // reset error and status
    setErrorMessage("");
    setSuccess(false);

    if (!terms) {
      setErrorMessage("Please accept Our terms and conditions");
    }

    if (password.length < 6) {
      setErrorMessage("Password should be 6 character long");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage("Error");
      return;
    }

    // create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

        // send verification email
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("verification email sent");
        });

        //update profile name and photo url
        const profile = {
          displayName: name,
          photoURL: photo,
        };
        updateProfile(auth.currentUser, profile)
          .then(() => {
            console.log("user profile updated");
          })
          .catch((error) => console.log("user profile update error"));
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="font-bold text-5xl">Sign Up now!</h1>
          <form onSubmit={handleSignUp} class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                class="input input-bordered"
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="photo url"
                class="input input-bordered"
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                class="input input-bordered"
                required
              />
            </div>
            <div class="form-control relative">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                class="input input-bordered"
                required
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute right-2 top-12"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

              <label class="label">
                <a href="#" class="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              <div className="form-control">
                <label className="label justify-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="terms"
                    defaultChecked
                    className="checkbox"
                  />
                  <span className="label-text ml-2">
                    Accept terms and conditions
                  </span>
                </label>
              </div>
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary">Sign Up</button>
            </div>
          </form>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          {success && (
            <p className="text-green-600">Successfully created sign up</p>
          )}

          <p>
            {/* Already have an account Please <Link to="/src/components/Login/Login.jsx">Login</Link> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
