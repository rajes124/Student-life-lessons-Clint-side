// src/utils/requireAdminAuth.js

import { redirect } from "react-router-dom";
import api from "./api"; // তোমার api.js (axios instance)

export const requireAdminAuth = async () => {
  try {
    // backend থেকে current userData load করো
    const res = await api.get("/users/current"); // অথবা তোমার userData load route
    const userData = res.data;

    if (userData.role !== "admin") {
      throw redirect("/dashboard"); // অথবা home
    }

    return null; // admin হলে continue
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 404) {
      throw redirect("/login");
    }
    throw redirect("/dashboard");
  }
};