import { uploadPhoto, createUser } from './utils';

export default function handleProfileSignup() {
  let body;
  let firstName;
  let lastName;

  const p = uploadPhoto();
  const u = createUser();
  const all = Promise.all([p, u]);

  return all.then((data) => {
    body = data[0].body;
    firstName = data[1].firstName;
    lastName = data[1].lastName;
    console.log(`${body} ${firstName} ${lastName}`);
  }).catch(() => {
    console.log('Signup system offline');
  });
}
