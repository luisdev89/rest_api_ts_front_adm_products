import { Link, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import { getAllProducts, updateAvailability } from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import type { Product } from "../types";

export async function loader() {
  const products = await getAllProducts();

  return products;
}

export async function action({request}:ActionFunctionArgs){
  const data = Object.fromEntries(await request.formData())
    await updateAvailability(+data.id)
  return {}
}

export default function Products() {
  //obteniendo los productos desde el loader
  const products = useLoaderData() as Product[];

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl text-slate-500 font-black">Productos</h2>
        <Link
          to={"/productos/nuevo"}
          className="rounded-lg bg-indigo-600 text-sm p-3 hover:bg-indigo-500 text-white cursor-pointer font-bold transition-colors"
        >
          Crear Producto
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
