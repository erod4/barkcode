const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const userRoute = require("./routes/users/usersRoute");
const alertRoute = require("./routes/alerts/alertsRoute");
const notificationRoute = require("./routes/notifications/notificationRoute");
const petsRoute = require("./routes/pets/petsRoute");
const globalErrorHandler = require("./middlewares/globalErroHandler");
const qrCodeRoute = require("./routes/qrcode/qrRoute");
const photoRoute = require("./routes/images/imgRoute");
require("./config/dbConnect");

const corsOptions = {
  origin: "http://localhost:3000",
};

//middlewares
//*pass incoming data
app.use(express.json());
//cors middleware
app.use(cors(corsOptions));
app.use("/api/v1/users", userRoute);
app.use("/api/v1/alerts", alertRoute);
app.use("/api/v1/notifications", notificationRoute);
app.use("/api/v1/pets", petsRoute);
app.use("/api/v1/QRCode", qrCodeRoute);
app.use("/api/v1/photo", photoRoute);
//Routes
//test
app.get("/", (req, res) => {
  res.json("Hello");
});

//Error handlers
app.use(globalErrorHandler);
//Listen to Server
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
