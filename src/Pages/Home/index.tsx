import { Flex, Icon, Img, Text } from "@chakra-ui/react";
import presentation from "../../assets/Imagem.png";
import { FaShoppingCart } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import { SiBuymeacoffee } from "react-icons/si";
import { BiSolidPackage } from "react-icons/bi";
import "@fontsource/baloo-2";
import { Menu } from "../Menu";

export const Home = () => {
  return (
    <Flex flexDir={"column"}>
      <Flex w={"1326px"} h={"400px"} justifyContent={"center"}>
        <Flex flexDir={"column"}>
          <Flex flexDir={"column"} w={"600px"}>
            <Text fontFamily="Berlin Sans FB, sans-serif" fontSize={"45px"}>
              Encontre o café perfeito para qualquer hora do dia
            </Text>
            <Text fontFamily="Roboto, sans-serif" fontSize={"20px"}>
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </Text>
          </Flex>
          <Flex>
            <Flex flexDir={"column"} m={"40px 40px 40px 0px"}>
              <Flex alignItems={"center"}>
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  w={"20px"}
                  h={"20px"}
                  bgColor={"#C47F17"}
                  color={"white"}
                  borderRadius={"20px"}
                >
                  <Icon as={FaShoppingCart} boxSize={"10px"} />
                </Flex>
                <Text
                  ml={"5px"}
                  fontFamily="Roboto, sans-serif"
                  fontSize={"16px"}
                >
                  Compra simples e segura
                </Text>
              </Flex>
              <Flex alignItems={"center"}>
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  w={"20px"}
                  h={"20px"}
                  bgColor={"#DBAC2C"}
                  color={"white"}
                  borderRadius={"20px"}
                >
                  <Icon as={MdTimer} boxSize={"10px"} />
                </Flex>
                <Text
                  ml={"5px"}
                  fontFamily="Roboto, sans-serif"
                  fontSize={"16px"}
                >
                  Entrega rápida e rastreada
                </Text>
              </Flex>
            </Flex>
            <Flex flexDir={"column"} m={"40px 0px 40px 0px"}>
              <Flex alignItems={"center"}>
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  w={"20px"}
                  h={"20px"}
                  bgColor={"#574F4D"}
                  color={"white"}
                  borderRadius={"20px"}
                >
                  <Icon as={BiSolidPackage} boxSize={"10px"} />
                </Flex>
                <Text
                  ml={"5px"}
                  fontFamily="Roboto, sans-serif"
                  fontSize={"16px"}
                >
                  Embalagem mantém o café intacto
                </Text>
              </Flex>
              <Flex alignItems={"center"}>
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  w={"20px"}
                  h={"20px"}
                  bgColor={"#8047F8"}
                  color={"white"}
                  borderRadius={"20px"}
                >
                  <Icon as={SiBuymeacoffee} boxSize={"10px"} />
                </Flex>
                <Text
                  ml={"5px"}
                  fontFamily="Roboto, sans-serif"
                  fontSize={"16px"}
                >
                  O café chega fresquinho até você
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex w={"476px"} h={"360px"} ml={"40px"}>
          <Img src={presentation} />
        </Flex>
      </Flex>
      <Flex flexDir={"column"} alignItems={"center"}>
        <Flex w={"1120px"} h={"544px"}>
          <Flex flexDir={"column"}>
            <Text fontSize={"32px"} as={"b"}>
              Nossos Cafés
            </Text>
            <Menu />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
