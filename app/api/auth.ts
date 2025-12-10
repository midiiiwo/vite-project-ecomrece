import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const loginAdmin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    console.error("Error logging in:", error);
    throw new Error(error.message);
  }
};

export const logoutAdmin = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Error logging out:", error);
    throw new Error(error.message);
  }
};
