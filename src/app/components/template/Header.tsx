import { useContext } from "react";
import { ActionIcon, ThemeIcon, Indicator } from "@mantine/core";
import { IconBrandVercel, IconShoppingCart } from "@tabler/icons-react";
import CartContext from "@/data/contexts/CartContext";

interface IHeaderProps {
  /** Function called to open app cart */
  handleOpenCart: () => void;
}

export const Header: React.FC<IHeaderProps> = ({ handleOpenCart }) => {
  const { productsOnCart } = useContext(CartContext);

  return (
    <nav className="flex justify-between items-center p-5 lg:px-6">
      <div className="flex w-full items-center justify-center lg:justify-start">
        <ThemeIcon
          size="lg"
          color="#000"
          className="border border-neutral-700 rounded-lg"
        >
          <IconBrandVercel />
        </ThemeIcon>
        <div className="ml-2 font-medium uppercase text-sm lg:block text-white">
          Acme Inc
        </div>
      </div>
      <div>
        <Indicator
          inline
          disabled={productsOnCart.length == 0}
          label={productsOnCart.length}
          size={16}
        >
          <ActionIcon
            variant="default"
            className="border border-neutral-700 p-3 text-white"
            size="xl"
            onClick={() => handleOpenCart()}
          >
            <IconShoppingCart />
          </ActionIcon>
        </Indicator>
      </div>
    </nav>
  );
};
