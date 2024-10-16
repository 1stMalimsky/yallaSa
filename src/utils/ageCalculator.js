const calculateAge = (birthDateString) => {
  const birthDate = new Date(birthDateString);
  console.log("birthdate", birthDate);

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  console.log("age", age);

  return age;
};

export default calculateAge;
