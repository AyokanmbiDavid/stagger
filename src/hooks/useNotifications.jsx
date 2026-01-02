export const useNotifications = () => {
  const requestPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  };

  const sendNotification = (title, body) => {
    if (Notification.permission === "granted" && document.visibilityState === "hidden") {
      new Notification(title, { body, icon: "/chat-icon.png" });
    }
  };

  return { requestPermission, sendNotification };
};