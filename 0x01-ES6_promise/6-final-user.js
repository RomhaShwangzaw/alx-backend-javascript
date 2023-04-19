import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  const u = signUpUser(firstName, lastName);
  const p = uploadPhoto(fileName);

  return Promise.allSettled([u, p]).then((results) => {
    const resArray = [];
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        resArray.push({
          status: result.status,
          value: result.value,
        });
      } else {
        resArray.push({
          status: result.status,
          value: result.reason,
        });
      }
    });
    return resArray;
  });
}
