import { Toaster } from 'react-hot-toast';

const ToastContainer = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1F2937',
          color: '#fff',
          borderRadius: '10px',
          padding: '16px',
        },
        success: {
          icon: '✅',
          style: { background: '#10B981' },
        },
        error: {
          icon: '❌',
          style: { background: '#EF4444' },
        },
      }}
    />
  );
};

export default ToastContainer;