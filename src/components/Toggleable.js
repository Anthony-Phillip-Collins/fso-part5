import { forwardRef, useImperativeHandle, useState } from 'react';

const Toggleable = forwardRef(
  ({ children, buttonLabelShow = 'show', buttonLabelHide = 'hide' }, ref) => {
    const [expand, setExpand] = useState(false);
    const visibility = { display: expand ? 'block' : 'none' };

    const toggle = () => {
      setExpand(!expand);
    };

    useImperativeHandle(ref, () => ({
      toggle,
    }));

    return (
      <>
        <div style={visibility}>{children}</div>
        <button onClick={toggle}>
          {expand ? buttonLabelHide : buttonLabelShow}
        </button>
      </>
    );
  }
);

export default Toggleable;
