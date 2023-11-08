import { Flex, Grid, GridItem, Icon, Img, Text } from "@chakra-ui/react";
import sucess from "../../assets/sucess.svg";
import { useGlobal } from "../../Context/GlobalContext";
import { FaLocationDot } from "react-icons/fa6";
import { RiTimerFill } from "react-icons/ri";
import { BiSolidDollarCircle } from "react-icons/bi";

export const OrderConfirmed = () => {
  const { dataDelivery } = useGlobal();
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
          gap={"10px"}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"}>
            <Icon
              as={FaLocationDot}
              boxSize={"25px"}
              bgColor={"#8047F8"}
              color={"white"}
              borderRadius={"20px"}
              mr={"5px"}
              p={"4px"}
            />
            <Flex flexDir={"column"}>
              <Flex>
                <Text
                  fontFamily="Roboto, sans-serif"
                  fontSize={"16px"}
                >Entrega em &nbsp;</Text>
                <Text
                  as={"b"}
                  fontFamily="Roboto, sans-serif"
                  fontSize={"16px"}
                >{`${dataDelivery?.rua}, ${dataDelivery?.numero}`}</Text>
              </Flex>
              <Text
                fontFamily="Roboto, sans-serif"
                fontSize={"16px"}
              >{`${dataDelivery?.bairro} - ${dataDelivery?.cidade}, ${dataDelivery?.uf}`}</Text>
            </Flex>
          </Flex>
          <Flex alignItems={"center"}>
            <Icon
              as={RiTimerFill}
              boxSize={"25px"}
              bgColor={"#DBAC2C"}
              color={"white"}
              borderRadius={"20px"}
              mr={"5px"}
              p={"4px"}
            />
            <Flex flexDir={"column"}>
              <Text fontFamily="Roboto, sans-serif" fontSize={"16px"}>
                Previsão de entrega
              </Text>
              <Text fontFamily="Roboto, sans-serif" fontSize={"16px"}>
                20 min - 30 min
              </Text>
            </Flex>
          </Flex>
          <Flex alignItems={"center"}>
            <Icon
              as={BiSolidDollarCircle}
              boxSize={"25px"}
              bgColor={"#C47F17"}
              color={"white"}
              borderRadius={"20px"}
              mr={"5px"}
              p={"4px"}
            />
            <Flex flexDir={"column"}>
              <Text fontFamily="Roboto, sans-serif" fontSize={"16px"}>
                Pagamento na entrega
              </Text>
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
