const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const { errorHandler } = require('./middleware/errorMiddleware.js');
const cookieParser = require('cookie-parser');
dotenv.config();

const { positionRoutes } = require("./routes/positionRoutes.js");
const { userRoutes } = require("./routes/userRoutes.js");
const { applicationRoutes } = require("./routes/applicationRoutes.js");
const { feedbackRoutes } = require("./routes/feedbacksRoutes.js");
const { fileRoute } = require("./routes/fileRoute.js");

const app = express();

app.use(express.json());
app.use(cors({
    origin : 'http://localhost:5001',
    credentials: true
}))
app.use(cookieParser());

app.use('/file', fileRoute);
app.use("/open-positions", positionRoutes);
app.use("/users", userRoutes)
app.use("/admin", applicationRoutes)
app.use("/feedback", feedbackRoutes)

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
