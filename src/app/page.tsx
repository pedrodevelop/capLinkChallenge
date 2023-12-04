"use client";
import { useState, useContext } from "react";
import { CartDrawer, Header, ProductCard } from "./components";
import { Checkbox, TextInput, SimpleGrid } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import ProductsContext from "@/data/contexts/ProductsContext";

const MainPage: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const {
    products,
    handleLikeOrDislike,
    handleFilterFavourites,
    handleFilterByText,
  } = useContext(ProductsContext);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <div>
      <Header handleOpenCart={handleOpenDrawer} />
      <CartDrawer openDrawer={openDrawer} closeDrawer={handleCloseDrawer} />
      <div className="flex flex-col md:flex-row w-[95%] m-auto">
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
      </div>
    </div>
  );
};

export default MainPage;
