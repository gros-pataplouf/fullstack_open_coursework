import { useState, forwardRef, useImperativeHandle } from "react";

// eslint-disable-next-line react/display-name
const Togglable = forwardRef((props, refs) => {
  const { buttonShowLabel, buttonHideLabel } = props;
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });
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
});

export default Togglable;
