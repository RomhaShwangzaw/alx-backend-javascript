import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  const u = signUpUser(firstName, lastName);
  const p = uploadPhoto(fileName);

  return Promise.allSettled([u, p]);
}
