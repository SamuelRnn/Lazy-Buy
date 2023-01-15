import Image from "next/image";
import { AiTwotoneEdit, AiFillCaretDown } from "react-icons/ai";
import {
  BsFillEyeFill,
  BsFillEyeSlashFill,
  BsFillTrashFill,
  BsFillStarFill,
} from "react-icons/bs";
import { MdInventory } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import { useUpdateProductMutation } from "../../../redux/companyApi";

const ProductCard = ({ product, editProduct, id }) => {
  const [updateProduct] = useUpdateProductMutation();

  return (
    <div
      className={`relative bg-zinc-50 rounded-lg w-[160px] ${
        product.isVisible ? "" : "invisible_filter"
      } shadow-md shadow-zinc-400`}
    >
      {/* product options */}
      <div className="absolute right-[-10px] bottom-[-10px] flex flex-col z-20">
        <div className="flex flex-col gap-y-2 mt-1">
          {/* product visibility */}
          <button
            onClick={() =>
              updateProduct({
                isVisible: !product.isVisible,
                productId: product.id,
              })
            }
            className="p-2 rounded-md bg-zinc-500 hover:bg-opacity-100 hover:bg-fondo-400 transition-colors"
          >
            {product.isVisible ? (
              <BsFillEyeSlashFill className="text-2xl text-zinc-100" />
            ) : (
              <BsFillEyeFill className="text-2xl text-orange-300" />
            )}
          </button>
          {/* edit product */}
          <button
            onClick={() => editProduct(id)}
            className="p-2 rounded-md bg-zinc-500 hover:bg-opacity-100 hover:bg-fondo-400 transition-colors"
          >
            <AiTwotoneEdit className="text-2xl text-zinc-100" />
          </button>
          {/* borrado logico del producto */}
          <button className="p-2 rounded-md bg-zinc-500 hover:bg-opacity-100 hover:bg-fondo-400 transition-colors">
            <BsFillTrashFill className="text-2xl text-zinc-100" />
          </button>
        </div>
      </div>

      <div>
        <div className="px-3 py-2 text-fondo-300">
          <h2 className=" overflow-hidden whitespace-nowrap text-ellipsis font-bold">
            {product.name}
          </h2>
        </div>
        <Image
          alt={product.name}
          title={product.name}
          src={product.mainImage.url}
          width={320}
          height={100}
          className="w-[160px] h-[110px] object-cover"
        />
        <div className="bg-zinc-600 py-3 px-5 text-zinc-100 text-sm rounded-b-lg">
          <p className="flex font-bold">
            <ImPriceTag className="mr-1 mt-[5px]" />
            {product.price.toFixed(2)}
          </p>
          <p
            className={`flex font-bold ${
              product.stock < 10 ? "text-red-500" : ""
            }`}
          >
            <MdInventory className="mr-1 mt-[5px]" />
            {product.stock}
          </p>
          <p className="flex font-bold">
            <BsFillStarFill className="mr-1 mt-[5px]" />
            {product.averageRating}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
