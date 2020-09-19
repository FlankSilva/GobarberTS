import React, { ButtonHTMLAttributes } from 'react';

import { Conatiner } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Conatiner type="button" {...rest}>
    {children}
  </Conatiner>
);

export default Button;
