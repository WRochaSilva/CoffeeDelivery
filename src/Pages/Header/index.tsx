import { Button, Flex, Icon, Img, Text } from "@chakra-ui/react";
import Logo from "../../assets/Logo.svg";
import { FaLocationDot } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useGlobal } from "../../Context/GlobalContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { totalCoffees, showQuantityOrder } = useGlobal();
  const navigate = useNavigate();
  return (
    <Flex justifyContent={"space-between"} m={"20px"}>
      <Img src={Logo} />
      <Flex alignItems={"start"}>
        <Flex
          borderRadius={'6px'}
          w={"127px"}
          h={'25px'}
          bgColor={'#EBE5F9'}
          gap={"4px"}
          mr={'5px'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Icon as={FaLocationDot} color={'#4B2995'}/>
          <Text
            fontFamily="Roboto, sans-serif"
            fontSize={"14px"}
            color={'#4B2995'}
            mr={"20px"}
          >
            Londrina-PR
          </Text>
        </Flex>
        <Flex w={"60px"} h={"60px"}>
          <Button
            w={"25px"}
            h={"25px"}
            bgColor={'#F1E9C9'}
            leftIcon={<FaShoppingCart color={'#C47F17'}/>}
            onClick={() => navigate("/checkout")}
          />
          {totalCoffees > 0 && showQuantityOrder &&
          <Flex
            w={"15px"}
            h={"15px"}
            m={"-8px 0px 0px -8px"}
            bgColor={'#C47F17'}
            borderRadius={"10px"}
            alignItems={"center"}
            justifyContent={"center"}
            zIndex={100}
          >
            <Text color={'white'} fontSize={'10px'}>{totalCoffees}</Text>
          </Flex>
          }
        </Flex>
      </Flex>
    </Flex>
  );
};
