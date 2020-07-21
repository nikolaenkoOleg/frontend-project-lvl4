import React from 'react';
import { createPortal } from 'react-dom';

const root = document.querySelector('body');

export default class Portal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.el.classList.add('fade', 'modal', 'show');
    this.el.setAttribute('style', 'display: block; padding-right: 15px;');
    this.el.setAttribute('role', 'dialog');
    this.el.setAttribute('aria-modal', 'true');
    this.el.setAttribute('tabindex', '-1');
    root.appendChild(this.el);
  }

  componentWillUnmount() {
    root.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    return createPortal(children, this.el);
  }
}
