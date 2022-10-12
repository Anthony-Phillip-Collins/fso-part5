import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

const Toggleable = forwardRef(
  ({ children, buttonLabelShow, buttonLabelHide }, ref) => {
    const [expand, setExpand] = useState(false);
    const visibility = { display: expand ? 'block' : 'none' };

    const toggle = () => {
      setExpand(!expand);
    };

    useImperativeHandle(ref, () => ({
      toggle,
      expand,
    }));

    return (
      <>
        <div style={visibility}>{children}</div>
        <button type="button" onClick={toggle}>
          {expand ? buttonLabelHide : buttonLabelShow}
        </button>
      </>
    );
  }
);

Toggleable.propTypes = {
  children: PropTypes.node.isRequired,
  buttonLabelShow: PropTypes.string,
  buttonLabelHide: PropTypes.string,
};

Toggleable.defaultProps = {
  buttonLabelShow: 'show',
  buttonLabelHide: 'hide',
};

Toggleable.displayName = 'Toggleable';

export default Toggleable;
