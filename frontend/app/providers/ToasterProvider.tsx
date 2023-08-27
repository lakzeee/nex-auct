"use client";
import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        success: {
          style: {
            background: "#28333C",
            color: "white",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          },
        },
        error: {
          style: {
            background: "#28333C",
            color: "white",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          },
        },
      }}
    />
  );
}
