import { useContext } from "react";
import { Button, Drawer as MantineDrawer, Divider } from "@mantine/core";
import { CartProductCard } from "@/app/components/index";
import { FormatMoney } from "@/logic/utils/Money";
import { IconShoppingCart } from "@tabler/icons-react";
import CartContext from "@/data/contexts/CartContext";

interface ICartDrawerProps {
  /** Boolean indicating whether the drawer is open. */
  openDrawer: boolean;
  /** Boolean indicating whether the drawer is open. */
  closeDrawer: () => void;
}

export const CartDrawer: React.FC<ICartDrawerProps> = ({
  openDrawer,
  closeDrawer,
}) => {
  const {
    productsOnCart,
    totalValue,
    handleRemoveProductFromCart,
    handleIncrementOrDecrementProductCount,
    handleCheckout,
  } = useContext(CartContext);

  return (
    <>
      <MantineDrawer
        className="text-white h-full"
        opened={openDrawer}
        onClose={closeDrawer}
        position="right"
        title="My Cart"
        overlayProps={{
          backgroundOpacity: 0.5,
          blur: 4,
        }}
      >
        {productsOnCart.length > 0 ? (
          <div className="flex flex-col justify-between w-full">
            <div className="pt-5 max-h-[75%] overflow-y-auto">
              {productsOnCart.map((el, index) => (
                <CartProductCard
                  key={el.name}
                  productName={el.name}
                  productValue={el.value}
                  productImage={el.image}
                  productCount={el.count}
                  handleRemoveProductFromCart={() => {
                    handleRemoveProductFromCart(index);
                  }}
                  handleIncrementOrDecrementProductCount={(op) => {
                    handleIncrementOrDecrementProductCount(op, el.name);
                  }}
                />
              ))}
            </div>
            <div>
              <div className="flex flex-row justify-between">
                <span>Total</span>
                <span className="text-lg font-semibold">
                  {FormatMoney(totalValue)}
                </span>
              </div>
              <Divider my="xs" />
              <Button
                onClick={() => handleCheckout()}
                fullWidth
                mt="md"
                size="lg"
                radius="xl"
                color="#2563eb"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full h-fit items-center mt-10">
            <IconShoppingCart style={{ width: 60, height: 60 }} stroke={1.5} />
            <span className="mt-6 text-2xl font-bold">Your cart is empty.</span>
          </div>
        )}
      </MantineDrawer>
    </>
  );
};
