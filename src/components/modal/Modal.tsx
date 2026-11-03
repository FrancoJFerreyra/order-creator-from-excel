import { useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import Card from '@/components/card/Card';
import Subtitle from '@/components/heading/Subtitle';
import * as styles from './Modal.variants';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: styles.ModalSize;
  children: ReactNode;
}

const Modal = ({ open, onClose, title, size = 'sm', children }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Native <dialog> owns focus trap, ESC and backdrop; content only exists while open
  // so forms unmount and reset between openings.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={dialogRef} onClose={onClose} className={styles.modal({ size })}>
      {open && (
        <Card padding="md" radius="lg" height="auto">
          <div className={styles.modalContent()}>
            {title && <Subtitle title={title} />}
            {children}
          </div>
        </Card>
      )}
    </dialog>
  );
};

export default Modal;
