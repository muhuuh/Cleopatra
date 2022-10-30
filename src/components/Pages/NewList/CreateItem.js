import { useDispatch } from "react-redux";
import useInput from "../../../hooks/use-input";
import { itemActions } from "../../store/item-slice";
import Modal from "../../UI/Modal";

const CreateItem = (props) => {
  const dispatch = useDispatch();

  const checkValidity = (input) => {
    return input.trim() !== "";
  };
  const nameInput = useInput(checkValidity);
  const descriptionInput = useInput(checkValidity);
  const categoryInput = useInput(checkValidity);

  const nameInputClasses = nameInput.hasError
    ? "form-control invalid"
    : "form-control";
  const categoryInputClasses = categoryInput.hasError
    ? "form-control invalid"
    : "form-control";
  const descriptionInputClasses = descriptionInput.hasError
    ? "form-control invalid"
    : "form-control";

  const newItem = {
    list_item_id: Math.random(),
    item_name: nameInput.enteredInput,
    category: categoryInput.enteredInput,
    short_description: descriptionInput.enteredInput,
    lists: [],
  };

  let formIsValid = false;
  if (
    nameInput.enteredInputisValid &&
    categoryInput.enteredInputisValid &&
    descriptionInput.enteredInputisValid
  ) {
    formIsValid = true;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    //POST new item to database

    dispatch(itemActions.createItem(newItem));
    props.onAddNewItem(newItem);

    nameInput.resetInput();
    categoryInput.resetInput();
    descriptionInput.resetInput();

    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
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
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateItem;
