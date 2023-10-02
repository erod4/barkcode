import React from "react";
import "./Alerts.css";
const Alerts = ({ alerts }) => {
  return (
    <>
      {alerts?.length <= 0 ? (
        <div className="no-notif-container">
          <h1 className="no-notif-message">No Alerts To Display</h1>
          <p className="no-notif-message-details">
            You have currently no alerts. We'll notify you when something new
            arrives!
          </p>
        </div>
      ) : (
        <>
          {alerts?.reverse().map((alert) => {
            const date = new Date(alert.createdAt);
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
              <div className="alert" key={alert._id}>
                <div className="alert-upper-container">
                  <div className="alert-upper-container-right">
                    <h1 className="city">{alert.city}</h1>
                    <button className="delete-alert-button">
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
                <div>
                  <h1 className="alert-title">{alert.title}</h1>
                </div>
                <div className="alert-body">{alert.body}</div>
                <div className="alert-date">{formattedDate}</div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Alerts;
