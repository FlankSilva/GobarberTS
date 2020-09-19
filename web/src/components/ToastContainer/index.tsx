import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast';

import { ToastMessage } from '../../hooks/ToastContext';
import { Container } from './styles';

interface ToastContainerProps {
  message: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ message }) => {
  const messagesWithTransitions = useTransition(message, mess => mess.id, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 1 },
  });

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
