import { Flex, Icon, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../../Context/GlobalContext";

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

export const AdressDelivery = () => {
  const { register, setValue, handleSubmit } = useForm<TDelivery>();
  const toast = useToast();
  const navigate = useNavigate();

  const { handleDataDelivery } = useGlobal();

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

  return (
    <Flex as="form" onSubmit={handleSubmit(handleSubmitDataDelivery)}>
      <Flex
        flexDir={"column"}
        w={"560px"}
        h={"292px"}
        bgColor={"#F3F2F2"}
        borderRadius={"6px"}
        mb={"20px"}
        p={"10px"}
      >
        <Flex flexDir={"column"} mb={"20px"}>
          <Flex alignItems={"center"}>
            <Icon as={CiLocationOn} color={'#C47F17'}/>
            <Text as={"b"} fontFamily={'Roboto, , sans-serif'} fontSize={'16px'}>Endereço de Entrega</Text>
          </Flex>
          <Text fontFamily={'Roboto, , sans-serif'} fontSize={'14px'}>Informe o endereço onde deseja receber seu pedido</Text>
        </Flex>
        <Input
         fontFamily={'Roboto, , sans-serif'} fontSize={'14px'}
          w={"200px"}
          m={"5px"}
          p={"5px"}
          {...register("cep")}
          placeholder="CEP"
          onChange={(e) => handleGetCep(e.target.value)}
        />
        <Input
         fontFamily={'Roboto, , sans-serif'} fontSize={'14px'}
          w={"536px"}          
          m={"5px"}
          p={"5px"}
          {...register("rua")}
          placeholder="Rua"
        />
        <Flex>
          <Input
           fontFamily={'Roboto, , sans-serif'} fontSize={'14px'}
            w={"176px"}            
            m={"5px"}
            p={"5px"}
            {...register("numero")}
            placeholder="Número"
          />
          <Input
           fontFamily={'Roboto, , sans-serif'} fontSize={'14px'}
            w={"324px"}            
            m={"5px"}
            p={"5px"}
            {...register("complemento")}
            placeholder="Complemento"
          />
        </Flex>
        <Flex>
          <Input
           fontFamily={'Roboto, , sans-serif'} fontSize={'14px'}
            w={"176px"}            
            m={"5px"}
            p={"5px"}
            {...register("bairro")}
            placeholder="Bairro"
          />
          <Input
           fontFamily={'Roboto, , sans-serif'} fontSize={'14px'}
            w={"252px"}            
            m={"5px"}
            p={"5px"}
            {...register("cidade")}
            placeholder="Cidade"
          />
          <Input
           fontFamily={'Roboto, , sans-serif'} fontSize={'14px'}
            w={"60px"}            
            m={"5px"}
            p={"5px"}
            {...register("uf")}
            placeholder="UF"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
