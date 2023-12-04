"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { generateRandomProductsNames } from "@/logic/utils/Product";
import { loremIpsum } from "lorem-ipsum";
import Product from "@/logic/core/product/Product";

interface IProductsProps {
  products: Product[];
  handleLikeOrDislike: (product: string) => void;
  handleFilterFavourites: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterByText: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductsContext = createContext<IProductsProps>({
  products: [],
  handleLikeOrDislike: () => {},
  handleFilterFavourites: () => {},
  handleFilterByText: () => {},
});

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [verbs, setVerbs] = useState<string[]>([]);
  const [adjectives, setAdjectives] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [filterFavourite, setFilterFavourite] = useState<boolean>(false);

  useEffect(() => {
    const getVerbsData = async () => {
      const res = await fetch(`${window.location}/api/verbs`);

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      return res.json();
    };

    const getAdjectivesData = async () => {
      const res = await fetch(`${window.location}/api/adjectives`);

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      return res.json();
    };

    const call = async () => {
      const verbs = await getVerbsData();
      setVerbs(verbs);
      const adjectives = await getAdjectivesData();
      setAdjectives(adjectives);
    };

    call();
  }, []);

  useMemo(() => {
    if (verbs.length > 0 && adjectives.length > 0) {
      const products: string[] = generateRandomProductsNames(verbs, adjectives);
      const _products: Product[] = [];
      products.map((product) => {
        const loremIpsumText = loremIpsum({
          count: 1,
          format: "plain",
          paragraphLowerBound: 5,
          paragraphUpperBound: 6,
          random: Math.random,
          sentenceLowerBound: 8,
          sentenceUpperBound: 9,
          suffix: "\n",
          units: "paragraphs",
        });
        const nameLength = product.trim().split(/\s+/).includes("de")
          ? product.trim().split(/\s+/).length - 1
          : product.trim().split(/\s+/).length;
        const value =
          10 + nameLength * ((500 - loremIpsumText.length) / (4 - nameLength));

        const imageId = Math.floor(Math.random() * 500);

        const newProductData: Product = {
          name: product,
          description: loremIpsumText,
          image: `https://picsum.photos/seed/${imageId}/200/300`,
          value: value,
          favourite: false,
        };

        _products.push(newProductData);
      });
      setProducts(_products);
      setAllProducts(_products);
    }
  }, [verbs, adjectives]);

  const handleLikeOrDislike = (product: string) => {
    const updatedProducts = products.map((productItem) => {
      if (productItem.name === product) {
        return {
          ...productItem,
          favourite: !productItem.favourite,
        };
      }
      return productItem;
    });

    const updatedAllProducts = allProducts.map((productItem) => {
      if (productItem.name === product) {
        return {
          ...productItem,
          favourite: !productItem.favourite,
        };
      }
      return productItem;
    });
    setProducts(updatedProducts);
    setAllProducts(updatedAllProducts);
  };

  const handleFilterFavourites = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterFavourite(e.currentTarget.checked);
    let _productsFiltered: Product[] = [];
    if (e.currentTarget.checked == true) {
      if (searchText) {
        _productsFiltered = allProducts.filter(
          (el) =>
            el.name.toUpperCase().includes(searchText.toUpperCase()) &&
            el.favourite == true
        );
        setProducts(_productsFiltered);
      } else {
        _productsFiltered = allProducts.filter((el) => el.favourite == true);
        setProducts(_productsFiltered);
      }
    } else {
      if (searchText) {
        _productsFiltered = allProducts.filter((el) =>
          el.name.toUpperCase().includes(searchText.toUpperCase())
        );
        setProducts(_productsFiltered);
      } else {
        setProducts(allProducts);
      }
    }
  };

  const handleFilterByText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
    let _productsFiltered: Product[] = [];
    if (e.currentTarget.value !== "") {
      if (filterFavourite) {
        _productsFiltered = allProducts.filter(
          (el) =>
            el.name.toUpperCase().includes(searchText.toUpperCase()) &&
            el.favourite == true
        );
        setProducts(_productsFiltered);
      } else {
        _productsFiltered = allProducts.filter((el) =>
          el.name.toUpperCase().includes(e.target.value.toUpperCase())
        );
        setProducts(_productsFiltered);
      }
    } else {
      if (filterFavourite) {
        _productsFiltered = allProducts.filter((el) => el.favourite == true);
        setProducts(_productsFiltered);
      } else {
        setProducts(allProducts);
      }
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        handleLikeOrDislike,
        handleFilterFavourites,
        handleFilterByText,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
