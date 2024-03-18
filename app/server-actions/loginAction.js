"use server";

import { Auth } from "../services/loginService";

export const handleLoginFormSubmit = async (formData) => {
  const response = await Auth(formData);

  return response?.data;
};
