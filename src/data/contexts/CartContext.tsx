"use client";
import { createContext, useState, useContext, useEffect } from "react";
import Product from "@/logic/core/product/Product";
import ProductsContext from "./ProductsContext";
import AuthContext from "./AuthContext";
import { usePathname } from "next/navigation";

type CartCheckoutData = {
  userName: string;
  products: Product[];
  totalValue: number;
};

interface ICartProps {
  /** Boolean to open and close cart drawer */
  openCartDrawer: boolean;
  /** An array of products that were added on cart*/
  productsOnCart: Product[];
  /** Cart's total value */
  totalValue: number;
  /** Function called to open cart drawer */
  handleOpenCartDrawer: () => void;
  /** Function called to close cart drawer */
  handleCloseCartDrawer: () => void;
  /** Function called to added a product to the cart */
  handleAddProductToCart: (product: string) => void;
  /** Function called to remove a product from the cart */
  handleRemoveProductFromCart: (index: number) => void;
  /** Function called to increment or decrement a product count*/
  handleIncrementOrDecrementProductCount: (op: string, product: string) => void;
  /** Function called to checkout */
  handleCheckout: () => void;
}

const CartContext = createContext<ICartProps>({
  openCartDrawer: false,
  productsOnCart: [],
  totalValue: 0,
  handleAddProductToCart: () => {},
  handleRemoveProductFromCart: () => {},
  handleIncrementOrDecrementProductCount: () => {},
  handleCheckout: () => {},
  handleOpenCartDrawer: () => {},
  handleCloseCartDrawer: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { products } = useContext(ProductsContext);
  const { user, handleForceLogin } = useContext(AuthContext);
  const pathName = usePathname();
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const [productsOnCart, setProductsOnCart] = useState<Product[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    let _totalValue: number = 0;
    productsOnCart.map((el) => {
      _totalValue += el.value * el.count;
    });
    setTotalValue(_totalValue);
  }, [productsOnCart]);

  const handleOpenCartDrawer = () => {
    setOpenCartDrawer(true);
  };

  const handleCloseCartDrawer = () => {
    setOpenCartDrawer(false);
  };

  const handleAddProductToCart = (product: string) => {
    const _product = products.filter((el) => el.name == product)[0];
    if (productsOnCart.filter((el) => el.name == _product.name).length > 0) {
      const updatedProducts = productsOnCart.map((productItem) => {
        if (productItem.name === product) {
          return {
            ...productItem,
            count: productItem.count + 1,
          };
        }
        return productItem;
      });

      setProductsOnCart(updatedProducts);
    } else {
      setProductsOnCart((prev) => [...prev, _product]);
    }
  };

  const handleRemoveProductFromCart = (index: number) => {
    let _newProducts: Product[] = [...productsOnCart];

    _newProducts.splice(index, 1);
    setProductsOnCart(_newProducts);
  };

  const handleIncrementOrDecrementProductCount = (
    op: string,
    product: string
  ) => {
    if (op == "increment") {
      const updatedProducts = productsOnCart.map((productItem) => {
        if (productItem.name === product) {
          return {
            ...productItem,
            count: productItem.count + 1,
          };
        }
        return productItem;
      });

      setProductsOnCart(updatedProducts);
    } else {
      const updatedProducts = productsOnCart
        .map((productItem) => {
          if (productItem.name === product) {
            return {
              ...productItem,
              count: productItem.count - 1,
            };
          }
          return productItem;
        })
        .filter((el) => el.count > 0);

      setProductsOnCart(updatedProducts);
    }
  };

  const handleCheckout = () => {
    if (!user.name && !user.email) {
      handleForceLogin(pathName);
    } else {
      const cartData: CartCheckoutData = {
        userName: user.name,
        products: productsOnCart,
        totalValue: totalValue,
      };
      const jsonData = JSON.stringify(cartData, null, 2);

      const element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(jsonData)
      );
      element.setAttribute("download", "cartJson.json");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <CartContext.Provider
      value={{
        openCartDrawer,
        productsOnCart,
        totalValue,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleIncrementOrDecrementProductCount,
        handleCheckout,
        handleOpenCartDrawer,
        handleCloseCartDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
