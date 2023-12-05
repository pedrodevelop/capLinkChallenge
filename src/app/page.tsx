"use client";
import { useContext } from "react";
import { CartDrawer, Header, ProductCard } from "./components";
import { Checkbox, TextInput, SimpleGrid, Loader } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import ProductsContext from "@/data/contexts/ProductsContext";
import CartContext from "@/data/contexts/CartContext";

const MainPage: React.FC = () => {
  const {
    products,
    loading,
    handleLikeOrDislike,
    handleFilterFavourites,
    handleFilterByText,
  } = useContext(ProductsContext);

  const { openCartDrawer, handleOpenCartDrawer, handleCloseCartDrawer } =
    useContext(CartContext);

  return (
    <div className="h-[90%]">
      <Header handleOpenCart={handleOpenCartDrawer} />
      <CartDrawer
        openDrawer={openCartDrawer}
        closeDrawer={handleCloseCartDrawer}
      />
      <div className={`flex flex-col md:flex-row w-[95%] ${loading && 'h-full'} m-auto`}>
        <aside className="w-full md:w-1/3 lg:w-1/4 p-3">
          <TextInput
            leftSectionPointerEvents="none"
            leftSection={<IconSearch />}
            placeholder="Procurar produtos..."
            mb="md"
            onChange={(e) => {
              handleFilterByText(e);
            }}
          />
          <Checkbox
            size="sm"
            label="Favoritos"
            onChange={(e) => handleFilterFavourites(e)}
          />
        </aside>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader color="blue" size="xl" />
          </div>
        ) : (
          <div className="flex justify-center w-full md:w-2/3 lg:w-3/4">
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }}>
              {products.map((el) => (
                <ProductCard
                  key={el.name}
                  productName={el.name}
                  productValue={el.value}
                  productImage={el.image}
                  favourite={el.favourite}
                  handleLikeOrDislike={() => handleLikeOrDislike(el.name)}
                />
              ))}
            </SimpleGrid>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
