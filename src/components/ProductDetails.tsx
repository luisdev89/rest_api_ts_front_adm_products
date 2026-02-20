import type { Product } from "../types";
import { formatCurrency } from "../utils";
import {
  useNavigate,
  Form,
  type ActionFunctionArgs,
  redirect,
  useFetcher,
} from "react-router-dom";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
  } else {
    return new Response("", {
      status: 404,
      statusText: "Producto a eliminar no encontrado",
    });
  }
  return redirect("/");
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const isAvailable = product.availability;
  const fetcher = useFetcher()
  const navigate = useNavigate();
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">

        <fetcher.Form method="POST" >
          <button
           type="submit"
           name='id'
           value={product.id}
           className={`${isAvailable? 'text-black':'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold cursor-pointer w-full border hover:bg-slate-600 hover:text-white`}
          >{isAvailable ? "Disponible" : "No Disponible"}</button>
        </fetcher.Form>

      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(`/productos/${product.id}/editar`)}
            className="bg-indigo-600 rounded-lg w-full text-white p-2 uppercase font-bold text-xs text-center hover:bg-indigo-500 cursor-pointer"
          >
            Editar
          </button>

          <Form
            className="w-full"
            method="POST"
            action={`/productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm(`Estas seguro de eliminar ${product.name}`)) {
                e.preventDefault();
              }
            }}
          >
            <input
              className="bg-red-600 rounded-lg w-full text-white p-2 uppercase font-bold text-xs text-center hover:bg-red-500 cursor-pointer"
              type="submit"
              value={"Eliminar"}
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
