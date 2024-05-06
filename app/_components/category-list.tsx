import { db } from "../_lib/prisma";
import CategoryItem from "./categoty-item";

const CategoryList = async () => {
  const categories = await db.category.findMany({});
  //Preciso pegar as categorias no banco de dados.
  //Renderizar um item para cada categoria.
  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
