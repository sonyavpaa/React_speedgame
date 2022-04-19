import "./Modal.css";

const Modal = (props) => {
  return (
    <div className="overlay" onClick={props.onClick}>
      <div className="alertMessageBox">
        <div className="scoreText">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
