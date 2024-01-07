import Modal from 'react-modal';
import Login from '../Login/Login';

export default function LoginModal({ modalOpen, closeModal, loginAccess, user }) {
  Modal.setAppElement('#root');
  
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Example Modal'>
      <Login closeModal={closeModal} loginAccess={loginAccess} user={user} />
    </Modal>
  );
}
