import { Button, Flex, Text, Img } from "@chakra-ui/react";
import { useGlobal } from "../../../Context/GlobalContext";
import { useState } from "react";

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
      h={"418px"}
      bgColor={"#F3F2F2"}
      borderRadius={" 6px 44px"}
    >
      {coffeesAdded.map(
        (coffeeAdd) =>
          coffeeAdd.orderQuantity > 0 && (
            <Flex>
              <Img src={coffeeAdd.photo} w={"64px"} h={"64px"} />
              <Flex flexDir={"column"}>
                <Flex justifyContent={"space-between"}>
                  <Text>{coffeeAdd.name}</Text>
                  <Text as={"b"}>
                    {coffeeAdd.price * coffeeAdd.orderQuantity}
                  </Text>
                </Flex>
                <Flex alignItems={"center"}>
                  <Button
                    bgColor={"#E6E5E5"}
                    onClick={() => {
                      handleDeleteQuantityCoffeeAdded(coffeeAdd.id);
                    }}
                  >
                    -
                  </Button>
                  <Text>{coffeeAdd.orderQuantity}</Text>
                  <Button
                    bgColor={"#E6E5E5"}
                    onClick={() => {
                      handleAddQuantityCoffeeAdded(coffeeAdd.id);
                    }}
                  >
                    +
                  </Button>
                  <Button
                    bgColor={"#E6E5E5"}
                    onClick={() => {
                      handleDeleteAllQuantityCoffeeAdded(coffeeAdd.id);
                    }}
                  >
                    Remover
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          )
      )}
      <Flex justifyContent={"space-between"}>
        <Text>Total de itens</Text>
        <Text>{`R$ ${totalOrder}`}</Text>
      </Flex>
      <Flex justifyContent={"space-between"}>
        <Text>Entrega</Text>
        <Text>{`R$ ${deliveryValue}`}</Text>
      </Flex>
      <Flex justifyContent={"space-between"}>
        <Text>Total</Text>
        <Text as={"b"}>{`R$ ${valueOrder}`}</Text>
      </Flex>
      <Button type="submit" bgColor={"#DBAC2C"} color={"white"}>
        CONFIRMAR PEDIDO
      </Button>
    </Flex>
  );
};
