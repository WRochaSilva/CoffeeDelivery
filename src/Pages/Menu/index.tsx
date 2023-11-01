import { Box, Button, Flex, Img, Text } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { useGlobal } from "../../Context/GlobalContext";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
  const { coffees, handleAddQuantityCoffee, removeCoffee } = useGlobal();
  const navigate = useNavigate();

  return (
    <Flex w={"1110px"} h={"full"} wrap={"wrap"}>
      {coffees.map((coffee) => (
        <Flex
          key={coffee.id}
          flexDir={"column"}
          alignItems={"center"}
          borderRadius={"6px 36px"}
          w={"256px"}
          h={"310px"}
          mt={"40px"}
          mr={"20px"}
          bgColor={"#F3F2F2"}
        >
          <Flex w={"120px"} h={"120px"} mt={"-20px"}>
            <Img src={coffee.photo} alt={coffee.name} />
          </Flex>
          <Box textAlign="center" mb={'40px'}>
            <Text as={"b"} fontFamily="Comic Sans, sans-serif">
              {coffee.name}
            </Text>
            <Text fontFamily="Roboto, sans-serif" color={'#8D8686'} mt={'40px'}>{coffee.description}</Text>
          </Box>
          <Flex alignItems={"center"} gap={'5px'}>
            <Text mr={"5px"}>R$</Text>
            <Text as={"b"} fontSize={"25px"}>
              {coffee.price}
            </Text>
            <Flex  bgColor={'#E6E5E5'} alignItems={'center'} borderRadius={'5px'}>
            <Button colorScheme="transparent" color={'#8047F8'} onClick={() => removeCoffee(coffee.id)}>-</Button>
            <Text >{coffee.orderQuantity}</Text>
            <Button colorScheme="transparent" color={'#8047F8'}  onClick={() => handleAddQuantityCoffee(coffee.id)}>
              +
            </Button>
            </Flex>
            <Button bgColor={'#4B2995'}
              leftIcon={
                <FaShoppingCart  color={'white'} onClick={() => navigate("/checkout")} />
              }
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
