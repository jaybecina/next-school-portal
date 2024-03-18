"use client";
import { Provider } from "react-redux";
import { store } from "./app/redux/store/store.js";

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
