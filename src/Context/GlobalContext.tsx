import { createContext, useContext, useReducer, useState } from "react";
import { DataBaseCoffees } from "../DataBaseCoffees";

type TMenu = {
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
  coffees: TMenu[];
  totalCoffees: number;
  dataDelivery: TDelivery | undefined;
  handleAddQuantityCoffee: (idCoffee: number) => void;
  removeCoffee: (idCoffee: number) => void;
  handleDataDelivery: (data: TDelivery) => void;
};

const CtxGlobal = createContext({} as TGlobalProps);

export const GlobalContext = ({ children }: { children: JSX.Element }) => {
  const [totalCoffees, setTotalCoffees] = useState(0);
  const [coffees, dispatch] = useReducer((state: TMenu[], action: any) => {
    if (action.type === "ADD_COFFEE") {
      return state.map((coffee) => {
        if (coffee.id === action.payload.idCoffee) {
          return { ...coffee, orderQuantity: coffee.orderQuantity + 1 };
        }
        return coffee;
      });
    }
    if (action.type === "REMOVE_COFFEE") {
      return state.map((coffee) => {
        if (coffee.id === action.payload.idCoffee) {
          return { ...coffee, orderQuantity: coffee.orderQuantity - 1 };
        }
        return coffee;
      });
    }
    return state;
  }, DataBaseCoffees);

  const [dataDelivery, setDataDelivery] = useState<TDelivery | undefined>(
    undefined
  );


  const handleAddQuantityCoffee = (idCoffee: number) => {
    dispatch({
      type: "ADD_COFFEE",
      payload: {
        idCoffee,
      },
    });
    setTotalCoffees((prevTotal) => prevTotal + 1);
  };

  const removeCoffee = (idCoffee: number) => {
    dispatch({
      type: "REMOVE_COFFEE",
      payload: {
        idCoffee,
      },
    });
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
