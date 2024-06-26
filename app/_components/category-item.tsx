import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`/categories/${category.id}/products`} className="min-w-fit">
      <div className="flex max-h-14  items-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
        <Image
          src={category.imageUrl}
          alt={category.name}
          width={30}
          height={30}
          quality={100}
          objectFit="cover"
          className="h-[25px] w-[25px]"
        />
        <span className="text-sm font-semibold">{category.name}</span>
      </div>
    </Link>
  );
};

export default CategoryItem;
