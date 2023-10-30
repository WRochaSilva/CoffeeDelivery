import { Flex, Img } from "@chakra-ui/react";
import sucess from "../../assets/sucess.svg";
import { useGlobal } from "../../Context/GlobalContext";

export const OrderConfirmed = () => {
  const { dataDelivery } = useGlobal();

  console.log(dataDelivery)
  return (
    <Flex>
      <Img src={sucess} />
    </Flex>
  );
};
