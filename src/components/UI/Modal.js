import Backdrop from "./Backdrop";
import ModelOverlay from "./ModalOverlay";
import ReactDOM from "react-dom";

const Modal = (props) => {
    const portalElement = document.getElementById("overlays");

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
      {ReactDOM.createPortal(<ModelOverlay>{props.children}</ModelOverlay>, portalElement)}
    </>
  );
};

export default Modal;