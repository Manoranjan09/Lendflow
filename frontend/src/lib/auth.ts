import {
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  auth,
  googleProvider,
} from "./firebase";
import { googleLogin } from "./api/users";
export async function loginWithGoogle() {
  const result =
    await signInWithPopup(
      auth,
      googleProvider
    );
const dbUser =
  await googleLogin({
    name:
      result.user.displayName,
    email:
      result.user.email,
  });
 localStorage.setItem(
  "user",
  JSON.stringify({
    firebase: result.user,
    dbUser,
  })
);
  return result.user;
}

export async function logout() {
  await signOut(auth);

  localStorage.removeItem(
    "user"
  );
}