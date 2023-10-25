import { Flex } from "@chakra-ui/react";
import { Header } from "../Pages/Header";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  return (
    <Flex flexDir={'column'}>
      <Header />
      <Outlet />
    </Flex>
  );
};
