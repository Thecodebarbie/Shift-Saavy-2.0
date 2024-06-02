import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

 
  const addNotification = (message) => {
    setNotifications((prevNotifications) => {
      console.log("Adding notification:", message);
      console.log("Current notifications before adding:", prevNotifications);
      return [...prevNotifications, { message }];
    });
  };
  

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
