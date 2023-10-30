import { createContext, useContext, useState } from "react";
import { DataBaseCoffees } from "../DataBaseCoffees";


type Tmenu = {
  id: number;
  name: string;
  photo: string;
  description: string;
  price: number;
  orderQuantity: number;
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

type TGlobalProps = {
  coffees: Tmenu[];
  totalCoffees: number;
  dataDelivery: TDelivery | undefined;
  handleAddQuantityCoffee: (idCoffee: number) => void;
  removeCoffee: (idCoffee: number) => void;
  handleDataDelivery: (data: TDelivery) => void;
};

const CtxGlobal = createContext({} as TGlobalProps);

export const GlobalContext = ({ children }: { children: JSX.Element }) => {
  const [coffees, setCoffees] = useState<Tmenu[]>(DataBaseCoffees);

  const [dataDelivery, setDataDelivery] = useState<TDelivery | undefined>(
    undefined
  );

  const [totalCoffees, setTotalCoffees] = useState(0);

  const handleAddQuantityCoffee = (idCoffee: number) => {
    setCoffees((prevCoffees) =>
      prevCoffees.map((coffee) => {
        if (coffee.id === idCoffee) {
          return { ...coffee, orderQuantity: coffee.orderQuantity + 1 };
        }
        return coffee;
      })
    );
    setTotalCoffees((prevTotal) => prevTotal + 1);
  };

  const removeCoffee = (idCoffee: number) => {
    setCoffees((prevCoffees) =>
      prevCoffees.map((coffee) => {
        if (coffee.id === idCoffee && coffee.orderQuantity > 0) {
          return { ...coffee, orderQuantity: coffee.orderQuantity - 1 };
        }
        return coffee;
      })
    );
    setTotalCoffees((prevTotal) => prevTotal - 1);
  };

  const handleDataDelivery = (data: TDelivery) => {
    setDataDelivery({
      cep: data.cep,
      rua: data.rua,
      numero: data.numero,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.cidade,
      uf: data.uf,
      payment: data.payment,
    });
  };

  return (
    <CtxGlobal.Provider
      value={{
        coffees,
        totalCoffees,
        dataDelivery,
        handleAddQuantityCoffee,
        removeCoffee,
        handleDataDelivery,
      }}
    >
      {children}
    </CtxGlobal.Provider>
  );
};
export const useGlobal = () => useContext(CtxGlobal);
