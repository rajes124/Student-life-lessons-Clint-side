// সাধারণত react-hot-toast-এ প্রোভাইডার লাগে না। তাই এটা optional।
// যদি custom toast context বানাও তাহলে এখানে লিখো।
// এখানে empty রাখলাম।
const ToastProvider = ({ children }) => {
  return <>{children}</>;
};

export default ToastProvider;