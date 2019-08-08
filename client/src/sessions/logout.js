import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import NotificationContext from '../components/notification_context';

function Logout() {
  const { setNotification } = useContext(NotificationContext);
  useEffect(() => {
      Axios.post("/api/logout")
      .then(() => setNotification(notification => {
        return{
        ...notification,
        status:"success",
        message:"you are successfully logged out"
        }
      }))
      .catch(() => setNotification(notification => {
        return{
        ...notification,
        status:"danger",
        message:"YOU CAN NERVER LEAVE"
        };
      }));
  }, []); //if put a value in [], this will a value than a event listen to
  return <Redirect to="/" />;
}

export default Logout;
