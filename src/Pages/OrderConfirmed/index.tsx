import { Flex, Grid, GridItem, Icon, Img, Text } from "@chakra-ui/react";
import sucess from "../../assets/sucess.svg";
import { useGlobal } from "../../Context/GlobalContext";
import { GoLocation } from "react-icons/go";
import { PiTimer } from "react-icons/pi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export const OrderConfirmed = () => {
  const { dataDelivery } = useGlobal();

  console.log(dataDelivery);
  return (
    <Grid gridTemplateColumns={"repeat(2, minmax(0, 1fr))"}>
      <GridItem m={"20px"}>
        <Flex flexDir={"column"} mb={"20px"}>
          <Text
            fontFamily="Berlin Sans FB, sans-serif"
            fontSize={"32px"}
            color={"#C47F17"}
          >
            Uhu! Pedido confirmado
          </Text>
          <Text fontFamily="Roboto" fontSize={"20px"} color={"#403937"}>
            Agora é só aguardar que logo o café chegará até você
          </Text>
        </Flex>
        <Flex
          flexDir={"column"}
          w={"470px"}
          h={"160px"}
          borderRadius={"6px 36px"}
          border={"1px inset #DBAC2C"}
          pl={"20px"}
          justifyContent={"center"}
        >
          <Flex>
            <Icon as={GoLocation} boxSize={"40px"} mr={"5px"} />
            <Flex flexDir={"column"}>
              <Text>{`Entrega em ${dataDelivery?.rua}, ${dataDelivery?.numero}`}</Text>
              <Text>{`${dataDelivery?.bairro} - ${dataDelivery?.cidade}, ${dataDelivery?.uf}`}</Text>
            </Flex>
          </Flex>
          <Flex>
            <Icon as={PiTimer} boxSize={"40px"} mr={"5px"} />
            <Flex flexDir={"column"}>
              <Text>Previsão de entrega</Text>
              <Text>20 min - 30 min</Text>
            </Flex>
          </Flex>
          <Flex>
            <Icon as={RiMoneyDollarCircleLine} boxSize={"40px"} mr={"5px"} />
            <Flex flexDir={"column"}>
              <Text>Pagamento na entrega</Text>
              <Text>
                {dataDelivery?.payment === 0
                  ? "Cartão de crédito"
                  : dataDelivery?.payment === 1
                  ? "Cartão de débito"
                  : dataDelivery?.payment === 2
                  ? "Dinheiro"
                  : ""}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem>
        <Flex w={"492px"} h={"293px"}>
          <Img src={sucess} />
        </Flex>
      </GridItem>
    </Grid>
  );
};
