import { Flex, Icon, Img, Text } from "@chakra-ui/react";
import presentation from "../../assets/Imagem.png";
import ExpressoTradicional from "../../assets/ExpressoTradicional.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiTimer } from "react-icons/bi";
import { SiBuymeacoffee } from "react-icons/si";
import { LuPackageCheck } from "react-icons/lu";
import "@fontsource/baloo-2";
import { Menu } from "../Menu";

export const Home = () => {
  return (
    <Flex flexDir={"column"}>
      <Flex w={"1326px"} h={"400px"} justifyContent={"center"}>
        <Flex flexDir={"column"}>
          <Flex flexDir={"column"} w={"600px"}>
            <Text as={"b"} fontFamily={"Baloo 2"} fontSize={"48px"}>
              Encontre o café perfeito para qualquer hora do dia
            </Text>
            <Text fontSize={"20px"}>
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </Text>
          </Flex>
          <Flex>
            <Flex flexDir={"column"} m={"40px 40px 40px 0px"}>
              <Flex>
                <Icon as={AiOutlineShoppingCart} />
                <Text ml={"5px"} fontSize={"16px"}>
                  Compra simples e segura
                </Text>
              </Flex>
              <Flex>
                <Icon as={BiTimer} />
                <Text ml={"5px"} fontSize={"16px"}>
                  Entrega rápida e rastreada
                </Text>
              </Flex>
            </Flex>
            <Flex flexDir={"column"} m={"40px 0px 40px 0px"}>
              <Flex>
                <Icon as={LuPackageCheck} />
                <Text ml={"5px"} fontSize={"16px"}>
                  Embalagem mantém o café intacto
                </Text>
              </Flex>
              <Flex>
                <Icon as={SiBuymeacoffee} />
                <Text ml={"5px"} fontSize={"16px"}>
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
      {/* Outro componente */}
      <Flex flexDir={"column"} alignItems={"center"}>
        <Flex w={"1120px"} h={"544px"}>
          <Flex flexDir={"column"}>
            <Text fontSize={"32px"} as={"b"}>
              Nossos Cafés
            </Text>
            <Menu/>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
