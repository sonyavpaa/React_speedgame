import "./Outro.css";

const Outro = (props) => {
  let message = "";
  if (props.score <= 5) {
    message = "Your poor score is:";
  } else if (props.score <= 20) {
    message = "Your silly score is:";
  } else if (props.score > 20) {
    message = "Your cool score is:";
  }
  return (
    <div className="overlay" onClick={props.onClick}>
      <div className="alertMessageBox">
        {message}&nbsp;
        {props.children}
      </div>
    </div>
  );
};

export default Outro;
