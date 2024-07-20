import { useState, forwardRef, useImperativeHandle } from "react";
import Button from "react-bootstrap/Button";
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
        <Button className="btn-danger m-4" onClick={toggleVisibility}>
          {buttonShowLabel}
        </Button>
      ) : (
        <div>
          {props.children}
          <Button className="btn-secondary m-4" onClick={toggleVisibility}>
            {buttonHideLabel}
          </Button>
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
