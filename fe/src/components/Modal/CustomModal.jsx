import Modal from 'react-modal'
import '@styles/components/modal/CustomModal.css'

Modal.setAppElement("#root");

export default function CustomModal({ isOpen, onClose, content }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className='modalContent'
      style={{
        overlay: {
          zIndex: 1000,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <button onClick={onClose}>&times;</button>
      {content}
    </Modal>
  );
}
