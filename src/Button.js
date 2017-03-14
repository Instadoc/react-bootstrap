/*
---
name: Button
category: CSS
---

Options
-------
Use any of the available button style types to quickly create a styled button. Just modify the `bsStyle` prop.

```options.jsx
<ButtonToolbar>
  <Button>Default</Button>

  <Button bsStyle="primary">Primary</Button>

  <Button bsStyle="success">Success</Button>

  <Button bsStyle="info">Info</Button>

  <Button bsStyle="warning">Warning</Button>

  <Button bsStyle="danger">Danger</Button>

  <Button bsStyle="link">Link</Button>
</ButtonToolbar>
```

<warning>
#### Button spacing
Because React doesn't output newlines between elements, buttons on the same line are displayed flush against each other. To preserve the spacing between multiple inline buttons, wrap your button group in `<ButtonToolbar />`.
</warning>

Sizes
-----
Fancy larger or smaller buttons? Add `bsSize="large"`, `bsSize="small"`, or `bsSize="xsmall"` for additional sizes.

```sizes.jsx
<div>
  <ButtonToolbar>
    <Button bsStyle="primary" bsSize="large">Large button</Button>
    <Button bsSize="large">Large button</Button>
  </ButtonToolbar>
  <ButtonToolbar>
    <Button bsStyle="primary">Default button</Button>
    <Button>Default button</Button>
  </ButtonToolbar>
  <ButtonToolbar>
    <Button bsStyle="primary" bsSize="small">Small button</Button>
    <Button bsSize="small">Small button</Button>
  </ButtonToolbar>
  <ButtonToolbar>
    <Button bsStyle="primary" bsSize="xsmall">Extra small button</Button>
    <Button bsSize="xsmall">Extra small button</Button>
  </ButtonToolbar>
</div>
```
*/

import classNames from 'classnames';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

import { bsClass, bsSizes, bsStyles, getClassSet, prefix, splitBsProps }
  from './utils/bootstrapUtils';
import { Size, State, Style } from './utils/StyleConfig';

import SafeAnchor from './SafeAnchor';

const propTypes = {
  active: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  block: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  componentClass: elementType,
  href: React.PropTypes.string,
  /**
   * Defines HTML button type attribute
   * @defaultValue 'button'
   */
  type: React.PropTypes.oneOf(['button', 'reset', 'submit']),
};

const defaultProps = {
  active: false,
  block: false,
  disabled: false,
};

class Button extends React.Component {
  renderAnchor(elementProps, className) {
    return (
      <SafeAnchor
        {...elementProps}
        className={classNames(
          className, elementProps.disabled && 'disabled'
        )}
      />
    );
  }

  renderButton({ componentClass, ...elementProps }, className) {
    const Component = componentClass || 'button';

    return (
      <Component
        {...elementProps}
        type={elementProps.type || 'button'}
        className={className}
      />
    );
  }

  render() {
    const { active, block, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      active,
      [prefix(bsProps, 'block')]: block,
    };
    const fullClassName = classNames(className, classes);

    if (elementProps.href) {
      return this.renderAnchor(elementProps, fullClassName);
    }

    return this.renderButton(elementProps, fullClassName);
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default bsClass('btn',
  bsSizes([Size.LARGE, Size.SMALL, Size.XSMALL],
    bsStyles(
      [...Object.values(State), Style.DEFAULT, Style.PRIMARY, Style.LINK],
      Style.DEFAULT,
      Button
    )
  )
);
