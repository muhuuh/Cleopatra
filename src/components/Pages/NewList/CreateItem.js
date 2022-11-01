import { useDispatch } from "react-redux";
import useInput from "../../../hooks/use-input";
import { itemActions } from "../../store/item-slice";
import Modal from "../../UI/Modal";
import useHttp from "../../../hooks/use-http";

const CreateItem = (props) => {
  const { httpState, sendRequest: postItem } = useHttp();
  const url = "https://cleolist.herokuapp.com/listapi/v1/items_in_list/";
  //const url = "http://192.168.0.206:8000/listapi/v1/lists/";
  const dispatch = useDispatch();

  const checkValidity = (input) => {
    return input.trim() !== "";
  };
  const nameInput = useInput(checkValidity);
  const descriptionInput = useInput(checkValidity);
  const notesInput = useInput(checkValidity);
  const linkInput = useInput(checkValidity);
  const brandInput = useInput(checkValidity);

  const nameInputClasses = nameInput.hasError
    ? "form-control invalid"
    : "form-control";
  const notesInputClasses = notesInput.hasError
    ? "form-control invalid"
    : "form-control";
  const descriptionInputClasses = descriptionInput.hasError
    ? "form-control invalid"
    : "form-control";
  const linkInputClasses = linkInput.hasError
    ? "form-control invalid"
    : "form-control";
  const brandInputClasses = brandInput.hasError
    ? "form-control invalid"
    : "form-control";

  const newItem_ = {
    list_item_id: Math.random(),
    item_name: nameInput.enteredInput,
    //category: categoryInput.enteredInput,
    short_description: descriptionInput.enteredInput,
    lists: [],
  };

  //update section, section_ordder, added_by
  const newItem = {
    listitem: {
      item_name: nameInput.enteredInput,
      short_description: descriptionInput.enteredInput,
      item_notes: notesInput.enteredInput,
      hyperlink: linkInput.enteredInput,
      has_affiliate_link: false,
      item_brand: brandInput.enteredInput,
    },
    userlist: props.listId,
    //userlist: 17,
    section: 1,
    section_order: 1,
    added_by: 1,
  };

  let formIsValid = false;
  if (
    nameInput.enteredInputisValid &&
    notesInput.enteredInputisValid &&
    linkInput.enteredInputisValid &&
    brandInput.enteredInputisValid &&
    descriptionInput.enteredInputisValid
  ) {
    formIsValid = true;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    //to do : POST new item to database and with the ID receive, update te item object before storing it
    //get the id of the list it is in and add it to newItem
    const postConfig = {
      url: url,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //post the list of items created
      body: newItem,
    };

    const transformDataPost = (data) => {
      const receivedData = data;
      const createdTask = { data: receivedData, text: newItem };

      console.log("receivedData");
      console.log(receivedData);
      props.onAddNewItem(receivedData);
      dispatch(itemActions.createItem(receivedData));
    };

    postItem(postConfig, transformDataPost);

    nameInput.resetInput();
    notesInput.resetInput();
    descriptionInput.resetInput();
    linkInput.resetInput();
    brandInput.resetInput();

    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={onSubmitHandler} className="mt-10 mx-24">
        <div className="text-center font-bold text-lg my-10">
          Create new Item
        </div>
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
            className={`${brandInputClasses} flex flex-row justify-between mb-10`}
          >
            <label className="mr-6">Brand</label>
            <input
              type="text"
              onChange={brandInput.inputChangeHandler}
              onBlur={brandInput.inputBlurHandler}
              value={brandInput.enteredInput}
              className="border-2 rounded-lg shadow-sm h-8 w-48"
            />
          </div>
          <div
            className={`${notesInputClasses} flex flex-row justify-between mb-10`}
          >
            <label className="mr-6">Notes</label>
            <input
              type="text"
              onChange={notesInput.inputChangeHandler}
              onBlur={notesInput.inputBlurHandler}
              value={notesInput.enteredInput}
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
          <div
            className={`${linkInputClasses} flex flex-row justify-between mb-10`}
          >
            <label className="mr-6">Link</label>
            <input
              type="text"
              onChange={linkInput.inputChangeHandler}
              onBlur={linkInput.inputBlurHandler}
              value={linkInput.enteredInput}
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
