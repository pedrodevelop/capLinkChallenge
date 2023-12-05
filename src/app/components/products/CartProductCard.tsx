import React from "react";
import {
  Divider,
  Image,
  Indicator,
  SimpleGrid,
  Button,
  rem,
} from "@mantine/core";
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import { FormatMoney } from "@/logic/utils/Money";

interface ICartProductCardProps {
  /** Product's name */
  productName: string;
  /** Product's value */
  productValue: number;
  /** Product's image url*/
  productImage: string;
  /** Product's count */
  productCount: number;
  /** Function called to remove a product from cart*/
  handleRemoveProductFromCart: () => void;
  /** Function called to increment or decrement a product count*/
  handleIncrementOrDecrementProductCount: (op: string) => void;
}

export const CartProductCard: React.FC<ICartProductCardProps> = ({
  productName,
  productValue,
  productImage,
  productCount,
  handleRemoveProductFromCart,
  handleIncrementOrDecrementProductCount,
}) => {
  return (
    <div>
      <SimpleGrid cols={3} spacing={0.5}>
        <div>
          <Indicator
            inline
            className="cursor-pointer"
            onClick={() => {
              handleRemoveProductFromCart();
            }}
            label={<IconX style={{ width: rem(15), height: rem(15) }} />}
            size={16}
          >
            <Image
              radius="md"
              h={64}
              w="auto"
              fit="contain"
              alt="Product-image"
              src={productImage}
            />
          </Indicator>
        </div>
        <div className="hyphens-auto" lang="pt-BR">
          {productName}
        </div>
        <div className="flex flex-col items-end">
          <div>
            {productCount > 1
              ? FormatMoney(productValue * productCount)
              : FormatMoney(productValue)}
          </div>
          <Button
            className="w-20"
            radius="xl"
            size="compact-md"
            color="white"
            leftSection={
              <IconMinus
                style={{ width: rem(16), height: rem(16) }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncrementOrDecrementProductCount("decrement");
                }}
              />
            }
            rightSection={
              <IconPlus
                style={{ width: rem(16), height: rem(16) }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncrementOrDecrementProductCount("increment");
                }}
              />
            }
            variant="outline"
          >
            {productCount}
          </Button>
        </div>
      </SimpleGrid>
      <Divider my="md" />
    </div>
  );
};
