import { createContext, useContext, useState } from "react";
import ExpressoTradicional from "../assets/ExpressoTradicional.png";
import ExpressoAmaricano from "../assets/ExpressoAmaricano.png";
import ExpressoCremoso from "../assets/ExpressoCremoso.png";
import ExpressoGelado from "../assets/ExpressoGelado.png";
import CafeComLeite from "../assets/CafeComLeite.png";
import Latte from "../assets/Latte.png";
import Capuccino from "../assets/Capuccino.png";
import Macchiato from "../assets/Macchiato.png";
import Mocaccino from "../assets/Mocaccino.png";
import ChocolateQuente from "../assets/ChocolateQuente.png";
import Cubano from "../assets/Cubano.png";
import Havaiano from "../assets/Havaiano.png";
import Arabe from "../assets/Arabe.png";
import Irlandes from "../assets/Irlandes.png";

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
  const [coffees, setCoffees] = useState<Tmenu[]>([
    {
      id: 1,
      name: "Expresso Tradicional",
      photo: ExpressoTradicional,
      description: "O tradicional café feito com água quente e grãos moídos",
      price: 9.99,
      orderQuantity: 0,
    },
    {
      id: 2,
      name: "Expresso Americano",
      photo: ExpressoAmaricano,
      description: "Expresso diluído, menos intenso que o tradicional",
      price: 9.99,
      orderQuantity: 0,
    },
    {
      id: 3,
      name: "ExpressoCremoso",
      photo: ExpressoCremoso,
      description: "Café expresso tradicional com espuma cremosa",
      price: 9.99,
      orderQuantity: 0,
    },
    {
      id: 4,
      name: "ExpressoGelado",
      photo: ExpressoGelado,
      description: "Bebida preparada com café expresso e cubos de gelo",
      price: 9.99,
      orderQuantity: 0,
    },
    {
      id: 5,
      name: "CafeComLeite",
      photo: CafeComLeite,
      description: "Meio a meio de expresso tradicional com leite vaporizado",
      price: 9.99,
      orderQuantity: 0,
    },
    {
      id: 6,
      name: "Latte",
      photo: Latte,
      description:
        "Uma dose de café expresso com o dobro de leite e espuma cremosa",
      price: 9.99,
      orderQuantity: 0,
    },
    {
      id: 7,
      name: "Capuccino",
      photo: Capuccino,
      description:
        "Bebida com canela feita de doses iguais de café, leite e espuma",
      price: 9.99,
      orderQuantity: 0,
    },
    {
      id: 8,
      name: "Macchiato",
      photo: Macchiato,
      description:
        "Café expresso misturado com um pouco de leite quente e espuma",
      price: 9.99,
      orderQuantity: 0,
    },
    {
      id: 9,
      name: "Mocaccino",
      photo: Mocaccino,
      description: "Café expresso com calda de chocolate, pouco leite e espuma",
      price: 9.99,
      orderQuantity: 0,
    },
    {
      id: 10,
      name: "ChocolateQuente",
      photo: ChocolateQuente,
      description:
        "Bebida feita com chocolate dissolvido no leite quente e café",
      price: 9.99,
      orderQuantity: 0,
    },
    {
      id: 11,
      name: "Cubano",
      photo: Cubano,
      description:
        "Drink gelado de café expresso com rum, creme de leite e hortelã",
      price: 9.99,
      orderQuantity: 0,
    },
    {
      id: 12,
      name: "Havaiano",
      photo: Havaiano,
      description: "Bebida adocicada preparada com café e leite de coco",
      price: 9.99,
      orderQuantity: 0,
    },
    {
      id: 13,
      name: "Arabe",
      photo: Arabe,
      description: "Bebida preparada com grãos de café árabe e especiarias",
      price: 9.99,
      orderQuantity: 0,
    },
    {
      id: 14,
      name: "Irlandes",
      photo: Irlandes,
      description: "Bebida a base de café, uísque irlandês, açúcar e chantilly",
      price: 9.99,
      orderQuantity: 0,
    },
  ]);

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
