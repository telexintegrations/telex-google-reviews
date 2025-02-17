import app from "./index";

const port = process.env["PORT"] || 3001;

app.listen(port, () => {
  console.log(
    `Server running on port ${port} in ${
      process.env["NODE_ENV"] || "development"
    } mode`
  );
});

// Basic error handling
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
