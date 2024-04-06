export const getBaseUrl = () => {
  return process.env.NODE_ENV === "production" ? "." : "";
};
