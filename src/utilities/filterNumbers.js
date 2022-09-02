export const filterNumbers = (event) => {
  if (!/^[0-9]*\.?[0-9]*$/.test(event.key)) {
    event.preventDefault();
  }
};
