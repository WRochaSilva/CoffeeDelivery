import { Flex, Icon, Img, Text } from "@chakra-ui/react";
import sucess from "../../assets/sucess.svg";
import { useGlobal } from "../../Context/GlobalContext";
import {GoLocation} from "react-icons/go"
import {PiTimer} from "react-icons/pi"
import {RiMoneyDollarCircleLine} from "react-icons/ri"

export const OrderConfirmed = () => {
  const { dataDelivery } = useGlobal();

  console.log(dataDelivery);
  return (
    <>
      <Flex flexDir={"column"}>
        <Text>Uhu! Pedido confirmado</Text>
        <Text>Agora é só aguardar que logo o café chegará até você</Text>
      </Flex>
      <Flex alignItems={"center"}>
        <Flex
         flexDir={'column'}
          w={"470px"}
          h={"160px"}
          borderRadius={"6px 36px"}
          border={"1px solid #DBAC2C"}
          pl={'20px'}
          justifyContent={'center'}
        >
          <Flex>
            <Icon as={GoLocation} boxSize={'40px'} mr={'5px'}/>
            <Flex  flexDir={'column'}>
              <Text>{`Entrega em ${dataDelivery?.rua}, ${dataDelivery?.numero}`}</Text>
              <Text>{`${dataDelivery?.bairro} - ${dataDelivery?.cidade}, ${dataDelivery?.uf}`}</Text>
            </Flex>
          </Flex>
          <Flex>
            <Icon as={PiTimer} boxSize={'40px'} mr={'5px'}/>
            <Flex flexDir={'column'}>
            <Text>Previsão de entrega</Text>
            <Text>20 min - 30 min</Text>
            </Flex>
          </Flex>
          <Flex>
            <Icon as={RiMoneyDollarCircleLine} boxSize={'40px'} mr={'5px'}/>
            <Flex flexDir={'column'}>
            <Text>Pagamento na entrega</Text>
            <Text>{dataDelivery?.payment === 0 ? 'Cartão de crédito' : dataDelivery?.payment === 1 ? 'Cartão de débito' : ''}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex w={"492px"} h={"293px"}>
          <Img src={sucess} />
        </Flex>
      </Flex>
    </>
  );
};
