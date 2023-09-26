import React from "react";
import "./Alerts.css";
const Alerts = ({ alerts }) => {
  return (
    <>
      {alerts?.length <= 0 ? (
        <div>
          <h1>Check Back Soon</h1>
        </div>
      ) : (
        <>
          {alerts?.reverse().map((alert) => {
            const timestamp = Number(alert.date);
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
            console.log(formattedDate);
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
