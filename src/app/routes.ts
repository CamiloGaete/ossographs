import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/app/layout";
import Home from "@/app/page";
import CheckoutResult from "@/app/checkout-result";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "checkout/success",
        Component: CheckoutResult,
      },
      {
        path: "checkout/failure",
        Component: CheckoutResult,
      },
      {
        path: "checkout/pending",
        Component: CheckoutResult,
      },
    ],
  },
]);
