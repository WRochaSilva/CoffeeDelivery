import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { DefaultLayout } from "./Layouts/DefaultLayout";
import { Checkout } from "./Pages/Checkout";
import { OrderConfirmed } from "./Pages/OrderConfirmed";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Confirmed" element={<OrderConfirmed />} />
      </Route>
    </Routes>
  );
};
