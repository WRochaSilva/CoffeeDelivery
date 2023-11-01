import { Button, Flex, Text, Img, Divider } from "@chakra-ui/react";
import { useGlobal } from "../../../Context/GlobalContext";
import { useState } from "react";
import {FcEmptyTrash} from 'react-icons/fc'

type Tmenu = {
  id: number;
  name: string;
  photo: string;
  description: string;
  price: number;
  orderQuantity: number;
};

export const ListOrder = () => {
  const { coffees } = useGlobal();
  const [coffeesAdded, setCoffeesAdded] = useState<Tmenu[]>(
    coffees.filter((coffee) => coffee.orderQuantity > 0)
  );

  const totalValueItem = coffeesAdded.map(
    (coffeeAdd) => coffeeAdd.price * coffeeAdd.orderQuantity
  );
  const totalOrder = totalValueItem.reduce((total, order) => {
    return total + order;
  }, 0);
  const deliveryValue = 5.15;
  const valueOrder = totalOrder + deliveryValue;

  const handleDeleteQuantityCoffeeAdded = (idCoffee: number) => {
    setCoffeesAdded((prevCoffees) =>
      prevCoffees.map((coffee) => {
        if (coffee.id === idCoffee && coffee.orderQuantity > 0) {
          return { ...coffee, orderQuantity: coffee.orderQuantity - 1 };
        }
        return coffee;
      })
    );
  };
  const handleAddQuantityCoffeeAdded = (idCoffee: number) => {
    setCoffeesAdded((prevCoffees) =>
      prevCoffees.map((coffee) => {
        if (coffee.id === idCoffee && coffee.orderQuantity > 0) {
          return { ...coffee, orderQuantity: coffee.orderQuantity + 1 };
        }
        return coffee;
      })
    );
  };
  const handleDeleteAllQuantityCoffeeAdded = (idCoffee: number) => {
    setCoffeesAdded((prevCoffees) =>
      prevCoffees.map((coffee) => {
        if (coffee.id === idCoffee && coffee.orderQuantity > 0) {
          return { ...coffee, orderQuantity: (coffee.orderQuantity = 0) };
        }
        return coffee;
      })
    );
  };

  return (
    <Flex
      flexDir={"column"}
      w={"368px"}
      p={"20px"}
      bgColor={"#F3F2F2"}
      borderRadius={" 6px 44px"}
    >
      {coffeesAdded.map(
        (coffeeAdd) =>
          coffeeAdd.orderQuantity > 0 && (
            <>
              <Flex>
                <Img src={coffeeAdd.photo} w={"64px"} h={"64px"} />
                <Flex flexDir={"column"}>
                  <Flex w={'270px'} justifyContent={"space-between"}>
                    <Text ml={'20px'}>{coffeeAdd.name}</Text>
                    <Text as={"b"}>
                      {`R$ ${coffeeAdd.price * coffeeAdd.orderQuantity}`}
                    </Text>
                  </Flex>
                  <Flex alignItems={"center"}>
                    <Flex
                      bgColor={"#E6E5E5"}
                      alignItems={"center"}
                      mr={'10px'}
                      ml={'20px'}
                      borderRadius={"5px"}
                    >
                      <Button
                        colorScheme="transparent"
                        bgColor={"#E6E5E5"}
                        color={'#8047F8'}
                        isDisabled={coffeeAdd.orderQuantity < 1}
                        onClick={() => {
                          handleDeleteQuantityCoffeeAdded(coffeeAdd.id);
                        }}
                      >
                        -
                      </Button>
                      <Text>{coffeeAdd.orderQuantity}</Text>
                      <Button
                        colorScheme="transparent"
                        bgColor={"#E6E5E5"}
                        color={'#8047F8'}
                        onClick={() => {
                          handleAddQuantityCoffeeAdded(coffeeAdd.id);
                        }}
                      >
                        +
                      </Button>
                    </Flex>
                    <Button
                      bgColor={"#E6E5E5"}
                      leftIcon={<FcEmptyTrash />}
                      onClick={() => {
                        handleDeleteAllQuantityCoffeeAdded(coffeeAdd.id);
                      }}
                    >
                      Remover
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
              <Divider border={"1px solid #E6E5E5"} m={"10px 10px 20px 10px"} />
            </>
          )
      )}
      <Flex justifyContent={"space-between"}>
        <Text fontFamily={"Roboto, , sans-serif"} fontSize={"14px"}>
          Total de itens
        </Text>
        <Text
          fontFamily={"Roboto, , sans-serif"}
          fontSize={"14px"}
        >{`R$ ${totalOrder.toFixed(2)}`}</Text>
      </Flex>
      <Flex justifyContent={"space-between"}>
        <Text fontFamily={"Roboto, , sans-serif"} fontSize={"14px"}>
          Entrega
        </Text>
        <Text
          fontFamily={"Roboto, , sans-serif"}
          fontSize={"14px"}
        >{`R$ ${deliveryValue}`}</Text>
      </Flex>
      <Flex justifyContent={"space-between"}>
        <Text fontFamily={"Roboto, , sans-serif"} fontSize={"16px"} as={"b"}>
          Total
        </Text>
        <Text
          fontFamily={"Roboto, , sans-serif"}
          fontSize={"16px"}
          as={"b"}
          mb={"10px"}
        >{`R$ ${valueOrder.toFixed(2)}`}</Text>
      </Flex>
      <Button type="submit" bgColor={"#DBAC2C"} color={"white"}>
        CONFIRMAR PEDIDO
      </Button>
    </Flex>
  );
};
