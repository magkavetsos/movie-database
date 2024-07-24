export const getYearFromDate = (dateString) => {
  const parts = dateString.split("-");
  const year = parts ? parts[0] : "";
  return year;
};

export const formDataToObject = (formData) => {
  const obj = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};

export const getToday = () => new Date().toISOString().split("T")[0];

export const isDateBeforeOrEqualToday = (dateString) => {
  const selectedDate = new Date(dateString).setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ensure we compare dates without considering time
  return selectedDate <= today;
};

export const base64ToImageUrl = (base64String) => {
  const mimeType = "image/png";
  if (!base64String) {
    throw new Error("Base64 string is required");
  }
  return `data:${mimeType};base64,${base64String}`;
};
