import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
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

Togglable.propTypes = {
  buttonShowLabel: PropTypes.string.isRequired,
  buttonHideLabel: PropTypes.string.isRequired,
};
Togglable.displayName = "Togglable";

export default Togglable;
