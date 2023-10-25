import { Button, Flex, Img, Text } from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useGlobal } from "../../Context/GlobalContext";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
 
  const { coffees, handleAddQuantityCoffee, removeCoffee } = useGlobal();
  const navigate = useNavigate()

  return (
    <Flex w={"1110px"} h={"full"} wrap={"wrap"}>
      {coffees.map((coffee) => (
        <Flex
          key={coffee.id}
          flexDir={"column"}
          borderRadius={"6px 36px"}
          w={"256px"}
          h={"310px"}
          mt={"40px"}
          mr={"20px"}
          bgColor={"#E6E5E5"}
        >
          <Flex w={"120px"} h={"120px"} ml={"60px"} mt={"-20px"}>
            <Img src={coffee.photo} alt={coffee.name} />
          </Flex>
          <Text>{coffee.name}</Text>
          <Text>{coffee.description}</Text>
          <Flex alignItems={"end"}>
            <Text mr={"5px"}>R$</Text>
            <Text as={"b"} fontSize={"20px"}>
              {coffee.price}
            </Text>
            <Button onClick={()=> removeCoffee(coffee.id)}>-</Button>
            <Text>{coffee.orderQuantity}</Text>
            <Button onClick={() => handleAddQuantityCoffee(coffee.id)}>+</Button>
            <Button leftIcon={<AiOutlineShoppingCart onClick={()=>navigate('/checkout')} />} />
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
