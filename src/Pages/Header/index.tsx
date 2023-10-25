import { Button, Flex, Icon, Img, Text } from "@chakra-ui/react";
import Logo from "../../assets/Logo.svg";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useGlobal } from "../../Context/GlobalContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { totalCoffees } = useGlobal();
  const navigate = useNavigate();
  return (
    <Flex justifyContent={"space-between"} mb={"40px"}>
      <Img src={Logo} />
      <Flex alignItems={"start"}>
        <Flex gap={"5px"} alignItems={"center"}>
          <Icon as={CiLocationOn} />
          <Text mr={"20px"}>Londrina-PR</Text>
        </Flex>
        <Flex w={"60px"} h={"60px"}>
          <Button
            w={"40px"}
            h={"40px"}
            leftIcon={<AiOutlineShoppingCart />}
            onClick={() => navigate("/checkout")}
          />
          <Flex
            w={"15px"}
            h={"15px"}
            m={"30px 0px 0px -8px"}
            bgColor="red"
            borderRadius={"10px"}
            alignItems={"center"}
            justifyContent={"center"}
            zIndex={100}
          >
            {totalCoffees}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
