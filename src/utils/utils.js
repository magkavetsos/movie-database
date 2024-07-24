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
