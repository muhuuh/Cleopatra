import Modal from "../UI/Modal";

const Popup = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <div>
        <h1>Category</h1>
        <p>Please enter the category of your todo</p>
        <p> Selecting the correct category will help when analysing the todos</p>
      </div>
    </Modal>
  );
};

export default Popup;