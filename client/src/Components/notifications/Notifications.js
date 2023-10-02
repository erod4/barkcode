import React, { useContext } from "react";
import "./Notifications.css";
import { notifContext } from "../../Context/Notifications/NotContext";

const Notifications = ({ notifications }) => {
  const { deleteNotifAction } = useContext(notifContext);

  const handleDeleteClick = (id) => {
    deleteNotifAction(id);
  };
  return (
    <>
      {notifications?.length <= 0 ? (
        <div className="no-notif-container">
          <h1 className="no-notif-message">No Notifications To Display</h1>
          <p className="no-notif-message-details">
            You have currently no notifications. We'll notify you when something
            new arrives!
          </p>
        </div>
      ) : (
        <>
          {notifications?.reverse().map((notification) => {
            const date = new Date(notification.createdAt);
            const options = {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            };
            const formattedDate = new Intl.DateTimeFormat(
              "en-US",
              options
            ).format(date);

            return (
              <div className="notification" key={notification._id}>
                <div className="notification-upper-container">
                  <div className="notification-upper-container-right">
                    <button
                      onClick={() => handleDeleteClick(notification._id)}
                      className="delete-notification-button"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
                <div>
                  <h1 className="notification-title">{notification.title}</h1>
                </div>
                <div className="notification-body">{notification.message}</div>
                <div className="alert-date notification-date">
                  {formattedDate}
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Notifications;
