import { FormatMoney } from "@/logic/utils/Money";
import { ActionIcon, Image, rem } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface IProductCardProps {
  /** Product's name */
  productName: string;
  /** Product's value */
  productValue: number;
  /** Product's image url */
  productImage: string;
  /** Boolean to check if the product has been added
   * as a favourite product */
  favourite: boolean;
  /** Function to favourite a product */
  handleLikeOrDislike: () => void;
}

export const ProductCard: React.FC<IProductCardProps> = ({
  productName,
  productValue,
  productImage,
  favourite,
  handleLikeOrDislike,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/${productName}`);
      }}
      className="flex flex-col max-md:mx-3 max-md:my-2 md:mt-2 border rounded-md border-[#262626] bg-black cursor-pointer"
    >
      <div>
        <Image h={200} fit="fill" alt="Product-image" src={productImage} />
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row w-fit my-3 mx-3 border border-[#262626] rounded-3xl items-center">
          <div className="text-xs md:text-sm lg:text-base font-semibold text-white mr-2.5 ml-5 py-0.5">
            {productName}
          </div>
          <div className="text-xs md:text-sm lg:text-base font-semibold text-white rounded-3xl p-2 m-1 bg-blue-700">
            {FormatMoney(productValue)}
          </div>
        </div>
        <ActionIcon
          variant={favourite ? "filled" : "transparent"}
          color="white"
          className={`mr-3 ${favourite ? "bg-red-600" : "bg-transparent"}`}
          onClick={(e) => {
            e.stopPropagation();
            handleLikeOrDislike();
          }}
        >
          <IconHeart style={{ width: rem(24), height: rem(24) }} />
        </ActionIcon>
      </div>
    </div>
  );
};
