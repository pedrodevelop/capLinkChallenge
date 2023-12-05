"use client";
import React, { useContext, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button, Image, Divider, ActionIcon, rem } from "@mantine/core";
import { CartDrawer, Header } from "@/app/components/index";
import { FormatMoney } from "@/logic/utils/Money";
import { IconPlus, IconHeart } from "@tabler/icons-react";
import ProductsContext from "@/data/contexts/ProductsContext";
import CartContext from "@/data/contexts/CartContext";

interface PageProps {
  params: {
    product: string;
  };
}

const ProductDetail: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const { products, handleLikeOrDislike } = useContext(ProductsContext);
  const { handleAddProductToCart } = useContext(CartContext);

  const { openCartDrawer, handleOpenCartDrawer, handleCloseCartDrawer } =
    useContext(CartContext);

  return (
    <div>
      <Header handleOpenCart={handleOpenCartDrawer} />
      <CartDrawer
        openDrawer={openCartDrawer}
        closeDrawer={handleCloseCartDrawer}
      />
      <div className="flex flex-col items-start">
        <Button
          variant="transparent"
          color="white"
          onClick={() => router.push("/")}
        >
          ← Voltar aos produtos
        </Button>
        {products
          .filter(
            (product) => product.name == decodeURIComponent(params.product)
          )
          .map((el) => (
            <div
              key={el.name}
              className="flex flex-col items-center w-[95%] mx-auto my-5 py-7 border rounded-lg border-[#262626] bg-black"
            >
              <div className="flex flex-col lg:flex-row w-[80%] lg:w-full">
                <Image
                  className="m-auto w-full lg:w-3/5 xl:w-3/4"
                  radius="md"
                  h={350}
                  w="auto"
                  fit="contain"
                  alt="Product-image"
                  src={el.image}
                />
                <div className="w-full lg:mr-10 xl:mr-20 lg:w-2/5 xl:w-1/4">
                  <div className="mt-10 mb-5 text-4xl font-medium text-white">
                    {el.name}
                  </div>
                  <div className="flex flex-row">
                    <div className="mr-auto w-fit rounded-full bg-blue-700 p-2 text-sm text-white">
                      {FormatMoney(el.value)}
                    </div>
                    <ActionIcon
                      variant={el.favourite ? "filled" : "transparent"}
                      color={el.favourite ? "red" : "white"}
                      className="mr-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeOrDislike(el.name);
                      }}
                    >
                      <IconHeart style={{ width: rem(24), height: rem(24) }} />
                    </ActionIcon>
                  </div>
                  <Divider my="xl" />
                  <div className="mb-4 text-sm uppercase text-white font-bold">
                    Description
                  </div>
                  <div className="mb-10">{el.description}</div>
                  <div>
                    <Button
                      className="bg-[#2c5fe6]"
                      justify="space-between"
                      fullWidth
                      leftSection={<IconPlus />}
                      rightSection={<span />}
                      mt="md"
                      size="xl"
                      radius="xl"
                      onClick={() => {
                        handleAddProductToCart(el.name);
                        handleOpenCartDrawer();
                      }}
                    >
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductDetail;
