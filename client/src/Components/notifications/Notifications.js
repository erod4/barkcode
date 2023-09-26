import React, { useContext } from "react";
import "./Notifications.css";
import { notifContext } from "../../Context/Notifications/NotContext";

const Notifications = ({ notifications }) => {
  const { deleteNotifAction } = useContext(notifContext);

  const handleDeleteClick = (id) => {
    deleteNotifAction(id);
    window.location.reload();
  };
  return (
    <>
      {notifications?.length <= 0 ? (
        <div>
          <h1>Check Back Soon</h1>
        </div>
      ) : (
        <>
          {notifications?.reverse().map((notification) => {
            const timestamp = Number(notification.date);
            const date = new Date(timestamp);
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
                <div className="notification-body">{notification.body}</div>
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
