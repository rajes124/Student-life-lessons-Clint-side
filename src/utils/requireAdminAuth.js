// src/utils/requireAdminAuth.js
import { redirect } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // db export করো firebaseConfig থেকে

export async function requireAdminAuth() {
  const user = auth.currentUser;
  if (!user) {
    throw redirect("/login");
  }

  const userDoc = await getDoc(doc(db, "users", user.uid));
  const userData = userDoc.data();

  if (userData?.role !== "admin") {
    throw redirect("/dashboard"); // admin না হলে user dashboard-এ পাঠাও
  }

  return null;
}