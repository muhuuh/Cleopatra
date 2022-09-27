import React from "react";
import useInput from "../../../hooks/use-input";

const CreateAccount = (props) => {
  const checkUsername = (input) => {
    return input.trim() !== "";
  };

  const checkEmailResults = (input) => {
    return input.trim().includes("@");
  };

  const checkPassword = (input) => {
    return input.length > 6;
  };

  const usernameResults = useInput(checkUsername);
  const emailResults = useInput(checkEmailResults);
  const passwordResult = useInput(checkPassword);

  let formIsValid = false;

  if (
    usernameResults.enteredInputisValid &&
    emailResults.enteredInputisValid &&
    passwordResult.enteredInputisValid
  ) {
    formIsValid = true;
  }

  const usernameInputClasses = usernameResults.hasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailResults.hasError
    ? "form-control invalid"
    : "form-control";
  const passwordInputClasses = passwordResult.hasError
    ? "form-control invalid"
    : "form-control";

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(usernameInputClasses)

    if (!formIsValid) {
      return;
    }

    const signUpDetails = {
      id: Math.random(),
      username: usernameResults.enteredInput,
      email: emailResults.enteredInput,
      password: passwordResult.enteredInput,
    };

    console.log(signUpDetails);

    //update store data
    props.onSignUp(signUpDetails);

    //send http post to update database
    //...

    usernameResults.resetInput();
    emailResults.resetInput();
    passwordResult.resetInput();
  };
  return (
    <div className="flex justify-center mt-32">
      <div className="w-2/3 ">
        <div className="text-2xl font-bold mb-2">Sign up</div>
        <form onSubmit={onSubmitHandler}>
          <div className="flex flex-col justify-center gap-y-8 pt-6 border-t-2 mb-4 ">
            <div className={`${usernameInputClasses} flex flex-row justify-between mt-16`}>
              <label htmlFor="login" className="mr-4 text-lg">
                Username
              </label>
              <input
                type="text"
                id="username"
                onChange={usernameResults.inputChangeHandler}
                onBlur={usernameResults.inputBlurHandler}
                value={usernameResults.enteredInput}
                className={`border-2 rounded-lg w-1/2 `}
              />
            </div>
            <div className={`${emailInputClasses} flex flex-row justify-between`}>
              <label htmlFor="street" className="mr-4 text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={emailResults.inputChangeHandler}
                onBlur={emailResults.inputBlurHandler}
                value={emailResults.enteredInput}
                className={`border-2 rounded-lg w-1/2 `}
              />
            </div>
            <div className={`${passwordInputClasses} flex flex-row justify-between mb-4`}>
              <label htmlFor="zip" className="mr-4 text-lg">
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={passwordResult.inputChangeHandler}
                onBlur={passwordResult.inputBlurHandler}
                value={passwordResult.enteredInput}
                className={`border-2 rounded-lg w-1/2 `}
              />
            </div>
          </div>
          <div className="flex justify-end mt-16">
            <button
              type="submit"
              onClick={onSubmitHandler}
              disabled={!formIsValid}
              className={`text-white rounded-full px-4 ${
                !formIsValid ? "bg-gray-500" : "bg-brownRed"
              }`}
              
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;


