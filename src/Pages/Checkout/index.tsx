import {
  Flex,
  Input,
  useToast,
  Text,
  Icon,
  Img,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { CiLocationOn } from "react-icons/ci";
import { CiMoneyBill } from "react-icons/ci";
import { BsCurrencyDollar } from "react-icons/bs";
import { BsCreditCard2Back } from "react-icons/bs";
import { BsCreditCard } from "react-icons/bs";
import { useGlobal } from "../../Context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Tmenu = {
  id: number;
  name: string;
  photo: string;
  description: string;
  price: number;
  orderQuantity: number;
};

export const Checkout = () => {
  const toast = useToast();
  const { register, setValue } = useForm();
  const { coffees } = useGlobal();
  const navigate = useNavigate();

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
    // setTotalCoffees((prevTotal) => prevTotal - 1);
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
    // setTotalCoffees((prevTotal) => prevTotal - 1);
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
    // setTotalCoffees((prevTotal) => prevTotal - 1);
  };

  const handleGetCep = async (cep: string) => {
    try {
      if (cep.length === 8) {
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );

        if (data.erro) {
          toast({
            title: "CEP Inválido",
            description: "Falha ao buscar o cep, verifique e tente novamente",
            position: "top-right",
            status: "warning",
            isClosable: true,
            containerStyle: {
              fontSize: "14px",
            },
          });
        }

        setValue("estado", data.uf);
        setValue("rua", data.logradouro);
        setValue("cidade", data.localidade);
        setValue("bairro", data.bairro);
        setValue("numero", "");
      }
    } catch (error: any) {
      toast({
        title: "CEP Inválido",
        description: "Falha ao buscar o cep, verifique e tente novamente",
        position: "top-right",
        status: "warning",
        isClosable: true,
        containerStyle: {
          fontSize: "14px",
        },
      });
    }
  };

  return (
    <Flex flexDir={"column"} w={"full"} h={"full"}>
      <Flex>
        <Flex
          flexDir={"column"}
          w={"560px"}
          h={"292px"}
          bgColor={"#F3F2F2"}
          borderRadius={"6px"}
          mr={"20px"}
        >
          <Flex flexDir={"column"} mb={"20px"}>
            <Flex alignItems={"center"}>
              <Icon as={CiLocationOn} />
              <Text as={"b"}>Endereço de Entrega</Text>
            </Flex>
            <Text>Informe o endereço onde deseja receber seu pedido</Text>
          </Flex>
          <Input
            w={"176px"}
            h={"18px"}
            m={"5px"}
            p={"5px"}
            placeholder="CEP"
            onChange={(e) => handleGetCep(e.target.value)}
          />
          <Input
            w={"536px"}
            h={"18px"}
            m={"5px"}
            p={"5px"}
            {...register("rua")}
            placeholder="Rua"
          />
          <Flex>
            <Input
              w={"176px"}
              h={"18px"}
              m={"5px"}
              p={"5px"}
              {...register("numero")}
              placeholder="Número"
            />
            <Input
              w={"324px"}
              h={"18px"}
              m={"5px"}
              p={"5px"}
              {...register("complemento")}
              placeholder="Complemento"
            />
          </Flex>
          <Flex>
            <Input
              w={"176px"}
              h={"18px"}
              m={"5px"}
              p={"5px"}
              {...register("bairro")}
              placeholder="Bairro"
            />
            <Input
              w={"252px"}
              h={"18px"}
              m={"5px"}
              p={"5px"}
              {...register("cidade")}
              placeholder="Cidade"
            />
            <Input
              w={"36px"}
              h={"18px"}
              m={"5px"}
              p={"5px"}
              {...register("estado")}
              placeholder="UF"
            />
          </Flex>
        </Flex>

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
          <Button
            bgColor={"#DBAC2C"}
            color={"white"}
            onClick={() => navigate("/Confirmed")}
          >
            CONFIRMAR PEDIDO
          </Button>
        </Flex>
      </Flex>
      <Flex
        flexDir={"column"}
        w={"560px"}
        h={"127px"}
        bgColor={"#F3F2F2"}
        mt={"-106px"}
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
          <Button bgColor={"#E6E5E5"} leftIcon={<BsCreditCard2Back />}>
            Cartão de Crédito
          </Button>
          <Button bgColor={"#E6E5E5"} leftIcon={<BsCreditCard />}>
            Cartão de Débito
          </Button>
          <Button bgColor={"#E6E5E5"} leftIcon={<CiMoneyBill />}>
            Dinheiro
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
