const getDayMonthYear = (date) => ({
  day: date.getDate(),
  month: date.getMonth(),
  year: date.getFullYear()
});

const pastBirthday = (birthday, today) => (today.month >= birthday.month) && (today.day >= birthday.day)

export const age = (birthdayString) => {
  const today = getDayMonthYear(new Date());
  const birthday = getDayMonthYear(new Date(birthdayString));

  return today.year - birthday.year + (pastBirthday(birthday, today) ? 0 : -1);
}
