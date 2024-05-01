import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";
import Container from "./container";

const CategoryList = async () => {
  const categories = await db.category.findMany({});
  return (
    <Container>
      <div className="flex gap-3 overflow-x-scroll px-5 py-6 lg:px-0 [&::-webkit-scrollbar]:hidden">
        {categories.map((categorie) => (
          <CategoryItem category={categorie} key={categorie.id} />
        ))}
      </div>
    </Container>
  );
};

export default CategoryList;
