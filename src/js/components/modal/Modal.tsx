import { FC, useEffect } from 'react';
import styled from 'styled-components';

type Props = {
  onClose?: () => void;
  justifyContent?: string;
  showContainer?: boolean;
  centerVertically?: boolean;
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.centerVertically ? 'center' : props.justifyContent || 'flex-start'};
  align-items: center;
  overflow-y: auto;
  padding: 20px 0;
`;

const Modal: FC<Props> = ({ centerVertically, showContainer, children, onClose }) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose?.();
    }
  };

  const handleOverlayClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClose?.();
  };

  const handleContainerClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const content = showContainer ? (
    <div class="msg" style="width: 600px;" onClick={(e) => handleContainerClick(e)}>
      <div class="msg-content" style="padding: 30px;">
        {children}
      </div>
    </div>
  ) : (
    children
  );

  return (
    <Overlay centerVertically={centerVertically} onClick={handleOverlayClick}>
      {content}
    </Overlay>
  );
};

export default Modal;
