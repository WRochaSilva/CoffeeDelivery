import { Flex, Img } from "@chakra-ui/react";
import sucess from "../../assets/sucess.svg";

export const OrderConfirmed = () => {
  return (
    <Flex>
      <Img src={sucess} />
    </Flex>
  );
};
