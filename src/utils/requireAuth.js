// src/utils/requireAuth.js

import { redirect } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

/**
 * এই ফাংশনটি protected routes-এর জন্য ব্যবহার হয়
 * যদি কোনো ইউজার লগইন না থাকে, তাহলে লগইন পেজে রিডাইরেক্ট করে
 * লগইন থাকলে কোনো সমস্যা নেই – রুটটা লোড হতে দেয়
 */
export async function requireAuth() {
  const user = auth.currentUser;

  if (!user) {
    // লগইন না থাকলে লগইন পেজে পাঠাও
    throw redirect("/login");
  }

  // লগইন থাকলে কোনো কিছু return করার দরকার নেই
  return null;
}