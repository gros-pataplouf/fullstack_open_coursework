const Togglable = (props) => {
  const { buttonShowLabel, buttonHideLabel, visible, setVisible } = props;
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div>
      {!visible ? (
        <button onClick={toggleVisibility}>{buttonShowLabel}</button>
      ) : (
        <div>
          {props.children}
          <button onClick={toggleVisibility}>{buttonHideLabel}</button>
        </div>
      )}
    </div>
  );
};

export default Togglable;
