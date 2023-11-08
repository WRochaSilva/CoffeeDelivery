import {
  Grid,
  GridItem,
  Flex,
  Icon,
  Input,
  Text,
  useToast,
  Button,
  Img,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../Context/GlobalContext";
import { CiMoneyBill } from "react-icons/ci";
import { BsCurrencyDollar } from "react-icons/bs";
import { BsCreditCard2Back } from "react-icons/bs";
import { BsCreditCard } from "react-icons/bs";
import { FcEmptyTrash } from "react-icons/fc";

type Tmenu = {
  id: number;
  name: string;
  photo: string;
  description: string;
  price: number;
  orderQuantity: number;
};

type TColorButtonPayment = {
  credit: "#E6E5E5" | "gray";
  debit: "#E6E5E5" | "gray";
  money: "#E6E5E5" | "gray";
};

type TDelivery = {
  cep: number;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  payment: number;
};

export const Checkout = () => {
  const { register, setValue, handleSubmit } = useForm<TDelivery>();
  const toast = useToast();
  const navigate = useNavigate();

  const { handleDataDelivery} = useGlobal();

  const [typePaymeny, setTypePayment] = useState(-1);
  const handleSubmitDataDelivery: SubmitHandler<TDelivery> = (
    dataAdress: TDelivery
  ) => {
    const payloadDataDelivery: TDelivery = {
      cep: dataAdress.cep,
      rua: dataAdress.rua,
      numero: dataAdress.numero,
      complemento: dataAdress.complemento,
      bairro: dataAdress.bairro,
      cidade: dataAdress.cidade,
      uf: dataAdress.uf,
      payment: typePaymeny,
    };
    handleDataDelivery(payloadDataDelivery);
    navigate("/Confirmed");
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

        setValue("uf", data.uf);
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
  const [colorButtonPayment, setColorButtonPayment] =
    useState<TColorButtonPayment>({
      credit: "#E6E5E5",
      debit: "#E6E5E5",
      money: "#E6E5E5",
    });

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
    <Grid
      gridTemplateColumns={"repeat(2, minmax(0, 1fr))"}
      w={"1300px"}
      as="form"
      onSubmit={handleSubmit(handleSubmitDataDelivery)}
    >
      <GridItem ml={"40px"}>
        <Flex>
          <Flex
            flexDir={"column"}
            w={"560px"}
            h={"292px"}
            bgColor={"#F3F2F2"}
            borderRadius={"6px"}
            mb={"20px"}
            p={"15px"}
          >
            <Flex flexDir={"column"} mb={"20px"}>
              <Flex alignItems={"center"}>
                <Icon as={CiLocationOn} color={"#C47F17"} />
                <Text
                  as={"b"}
                  fontFamily={"Roboto, , sans-serif"}
                  fontSize={"16px"}
                >
                  Endereço de Entrega
                </Text>
              </Flex>
              <Text
                fontFamily={"Roboto, , sans-serif"}
                fontSize={"14px"}
                ml={"17px"}
              >
                Informe o endereço onde deseja receber seu pedido
              </Text>
            </Flex>
            <Input
              fontFamily={"Roboto, , sans-serif"}
              fontSize={"14px"}
              w={"200px"}
              m={"5px"}
              p={"5px"}
              {...register("cep")}
              placeholder="CEP"
              onChange={(e) => handleGetCep(e.target.value)}
            />
            <Input
              fontFamily={"Roboto, , sans-serif"}
              fontSize={"14px"}
              w={"510px"}
              m={"5px"}
              p={"5px"}
              {...register("rua")}
              placeholder="Rua"
            />
            <Flex>
              <Input
                fontFamily={"Roboto, , sans-serif"}
                fontSize={"14px"}
                w={"176px"}
                m={"5px"}
                p={"5px"}
                {...register("numero")}
                placeholder="Número"
              />
              <Input
                fontFamily={"Roboto, , sans-serif"}
                fontSize={"14px"}
                w={"324px"}
                m={"5px"}
                p={"5px"}
                {...register("complemento")}
                placeholder="Complemento"
              />
            </Flex>
            <Flex>
              <Input
                fontFamily={"Roboto, , sans-serif"}
                fontSize={"14px"}
                w={"176px"}
                m={"5px"}
                p={"5px"}
                {...register("bairro")}
                placeholder="Bairro"
              />
              <Input
                fontFamily={"Roboto, , sans-serif"}
                fontSize={"14px"}
                w={"252px"}
                m={"5px"}
                p={"5px"}
                {...register("cidade")}
                placeholder="Cidade"
              />
              <Input
                fontFamily={"Roboto, , sans-serif"}
                fontSize={"14px"}
                w={"60px"}
                m={"5px"}
                p={"5px"}
                {...register("uf")}
                placeholder="UF"
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          flexDir={"column"}
          w={"560px"}
          h={"127px"}
          p={"20px"}
          bgColor={"#F3F2F2"}
          borderRadius={"6px"}
        >
          <Flex alignItems={"center"}>
            <Icon as={BsCurrencyDollar} color={"#8047F8"} />
            <Text
              fontFamily={"Roboto, , sans-serif"}
              fontSize={"16px"}
              ml={"5px"}
            >
              Pagamento
            </Text>
          </Flex>
          <Text
            fontFamily={"Roboto, , sans-serif"}
            fontSize={"14px"}
            ml={"20px"}
            mb={"10px"}
          >
            O pagamento é feito na entrega. Escolha a forma que deseja pagar
          </Text>
          <Flex justifyContent={"space-evenly"}>
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
      </GridItem>
      <GridItem>
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
                      <Flex w={"270px"} justifyContent={"space-between"}>
                        <Text ml={"20px"}>{coffeeAdd.name}</Text>
                        <Text as={"b"}>
                          {`R$ ${coffeeAdd.price * coffeeAdd.orderQuantity}`}
                        </Text>
                      </Flex>
                      <Flex alignItems={"center"}>
                        <Flex
                          bgColor={"#E6E5E5"}
                          alignItems={"center"}
                          mr={"10px"}
                          ml={"20px"}
                          borderRadius={"5px"}
                        >
                          <Button
                            colorScheme="transparent"
                            bgColor={"#E6E5E5"}
                            color={"#8047F8"}
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
                            color={"#8047F8"}
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
                  <Divider
                    border={"1px solid #E6E5E5"}
                    m={"10px 10px 20px 10px"}
                  />
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
            <Text
              fontFamily={"Roboto, , sans-serif"}
              fontSize={"16px"}
              as={"b"}
            >
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
      </GridItem>
    </Grid>
  );
  /**FOI OPTADO POR NÃO COMPONENTIZAR PARA UTILZAÇÃO DE UMA ESTRUTURA UNCONTROLED
   * CASO FOSSE UTILIZAR ESTRUTURA CONTROLED SERIA DESSA FORMA TENDO QUE REALIZAR OS AJUSTES
   * NECESSARIOS PARA CAPTURA DAS INFORMAÇÕES DIGITADAS
   */
  // return (
  //   <Grid gridTemplateColumns={"repeat(2, minmax(0, 1fr))"} w={'1300px'}>
  //     <GridItem ml={'40px'}>
  //       <AdressDelivery />
  //       <PaymentForm />
  //     </GridItem>
  //     <GridItem>
  //       <ListOrder />
  //     </GridItem>
  //   </Grid>
  // );
};
