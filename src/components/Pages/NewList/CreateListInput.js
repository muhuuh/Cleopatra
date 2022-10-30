import useInput from "../../../hooks/use-input";
import Modal from "../../UI/Modal";
import useHttp from "../../../hooks/use-http";

const CreateListInput = (props) => {
  const { httpState, sendRequest: postLists } = useHttp();
  //const url = "https://cleolist.herokuapp.com/listapi/v1/lists";
  const url = "http://192.168.0.206:8000/listapi/v1/lists/";
  const checkValidity = (input) => {
    return input.trim() !== "";
  };
  const nameInput = useInput(checkValidity);
  const shortDescriptionInput = useInput(checkValidity);
  const descriptionInput = useInput(checkValidity);
  const categoryInput = useInput(checkValidity);

  const nameInputClasses = nameInput.hasError
    ? "form-control invalid"
    : "form-control";
  const categoryInputClasses = categoryInput.hasError
    ? "form-control invalid"
    : "form-control";
  const shortDescriptionInputClasses = descriptionInput.hasError
    ? "form-control invalid"
    : "form-control";
  const descriptionInputClasses = descriptionInput.hasError
    ? "form-control invalid"
    : "form-control";

  let randomId = Math.random().toString().replace(".", "");

  const newList = {
    id: randomId,
    name: nameInput.enteredInput,
    category: categoryInput.enteredInput,
    shortDescription: shortDescriptionInput.enteredInput,
    description: descriptionInput.enteredInput,
    lists: [],
  };

  let formIsValid = false;
  if (
    nameInput.enteredInputisValid &&
    categoryInput.enteredInputisValid &&
    shortDescriptionInput.enteredInputisValid &&
    descriptionInput.enteredInputisValid
  ) {
    formIsValid = true;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    //send a empty list to backend

    const newListAttribute = {
      title: newList.name,
      creator: "add user id from cookie",
      description: newList.shortDescription,
      notes: newList.description,
      is_public: "add is_public",
      list_image: "add list_image",
    };

    const postConfig = {
      url: url,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //body: { lists: newListAttribute },
      body: newListAttribute,
    };

    const transformDataPost = (data) => {
      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: newListAttribute };

      console.log("generatedId");
      console.log(generatedId);
      //update list store with the new list and the new id
      //dispatch(listActions.addList(createlistAttributes));
    };

    postLists(postConfig, transformDataPost);
    props.onNewList(newList);

    nameInput.resetInput();
    categoryInput.resetInput();
    shortDescriptionInput.resetInput();
    descriptionInput.resetInput();
  };

  return (
    <Modal onClose={props.onClose}>
      <h1 className="text-xl font-bold text-center">Enter list attributes</h1>
      <form onSubmit={onSubmitHandler} className="mt-20 mx-24">
        <div className="flex flex-col gap-y-4">
          <div
            className={`${nameInputClasses} flex flex-row justify-between mb-10`}
          >
            <label className="mr-6">Name</label>
            <input
              type="text"
              onChange={nameInput.inputChangeHandler}
              onBlur={nameInput.inputBlurHandler}
              value={nameInput.enteredInput}
              className="border-2 rounded-lg shadow-sm h-8 w-48"
            />
          </div>
          <div
            className={`${categoryInputClasses} flex flex-row justify-between mb-10`}
          >
            <label className="mr-6">Category</label>
            <input
              type="text"
              onChange={categoryInput.inputChangeHandler}
              onBlur={categoryInput.inputBlurHandler}
              value={categoryInput.enteredInput}
              className="border-2 rounded-lg shadow-sm h-8 w-48"
            />
          </div>
          <div
            className={`${shortDescriptionInputClasses} flex flex-row justify-between mb-10`}
          >
            <label className="mr-6">Short description</label>
            <input
              type="text"
              onChange={shortDescriptionInput.inputChangeHandler}
              onBlur={shortDescriptionInput.inputBlurHandler}
              value={shortDescriptionInput.enteredInput}
              className="border-2 rounded-lg shadow-sm h-8 w-48"
            />
          </div>
          <div
            className={`${descriptionInputClasses} flex flex-row justify-between mb-10`}
          >
            <label className="mr-6">Description</label>
            <input
              type="text"
              onChange={descriptionInput.inputChangeHandler}
              onBlur={descriptionInput.inputBlurHandler}
              value={descriptionInput.enteredInput}
              className="border-2 rounded-lg shadow-sm h-8 w-48"
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={!formIsValid}
            className={` bg-teal-500 text-white ${
              !formIsValid
                ? "bg-gray-500"
                : "bg-brownRed hover:font-bold hover:scale-110"
            } border-2 rounded-lg border-white  py-1 px-4 `}
          >
            Save attributes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateListInput;
