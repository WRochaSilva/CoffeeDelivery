import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { CiMoneyBill } from "react-icons/ci";
import { BsCurrencyDollar } from "react-icons/bs";
import { BsCreditCard2Back } from "react-icons/bs";
import { BsCreditCard } from "react-icons/bs";
import { useState } from "react";

type TColorButtonPayment = {
  credit: "#E6E5E5" | "gray";
  debit: "#E6E5E5" | "gray";
  money: "#E6E5E5" | "gray";
};

export const PaymentForm = () => {
  const [colorButtonPayment, setColorButtonPayment] =
    useState<TColorButtonPayment>({
      credit: "#E6E5E5",
      debit: "#E6E5E5",
      money: "#E6E5E5",
    });

  const [typePayment, setTypePayment] = useState(-1);

  const handlePayment = (pay: number) => {
    switch (pay) {
      case 0:
        setColorButtonPayment({
          credit: "gray",
          debit: "#E6E5E5",
          money: "#E6E5E5",
        });
        setTypePayment(0);
        break;
      case 1:
        setColorButtonPayment({
          credit: "#E6E5E5",
          debit: "gray",
          money: "#E6E5E5",
        });
        setTypePayment(1);
        break;
      case 2:
        setColorButtonPayment({
          credit: "#E6E5E5",
          debit: "#E6E5E5",
          money: "gray",
        });
        setTypePayment(2);
        break;
      default:
        setColorButtonPayment({
          credit: "#E6E5E5",
          debit: "#E6E5E5",
          money: "#E6E5E5",
        });
    }
  };

  return (
    <Flex
      flexDir={"column"}
      w={"560px"}
      h={"127px"}
      bgColor={"#F3F2F2"}
      borderRadius={"6px"}
    >
      <Flex alignItems={"center"}>
        <Icon as={BsCurrencyDollar} />
        <Text>Pagamento</Text>
      </Flex>
      <Text>
        O pagamento é feito na entrega. Escolha a forma que deseja pagar
      </Text>
      <Flex justifyContent={"space-between"} m={"20px"}>
        <Button
          value={0}
          bgColor={colorButtonPayment?.credit}
          leftIcon={<BsCreditCard2Back />}
          onClick={() => handlePayment(0)}
        >
          Cartão de Crédito
        </Button>
        <Button
          bgColor={colorButtonPayment?.debit}
          leftIcon={<BsCreditCard />}
          onClick={() => handlePayment(1)}
        >
          Cartão de Débito
        </Button>
        <Button
          bgColor={colorButtonPayment?.money}
          leftIcon={<CiMoneyBill />}
          onClick={() => handlePayment(2)}
        >
          Dinheiro
        </Button>
      </Flex>
    </Flex>
  );
};
