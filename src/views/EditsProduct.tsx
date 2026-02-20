import {
  Link,
  Form,
  useActionData,
  type ActionFunctionArgs,
  redirect,
  type LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import Error from "../components/Error";
import { getProductById, updateProduct } from "../services/ProductService";
import type { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (id !== undefined) {
    const productToBeEdited = await getProductById(Number(id));
    if (!productToBeEdited) {
      throw new Response("", { status: 404, statusText: "No Encontrado" }); // manejo el error con react
    }

    return productToBeEdited;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  //recuperando la data de; formulario
  const data = Object.fromEntries(await request.formData());

  // errores
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error.length) {
    return error; // para que este disponible en el componente
  }

  if (params.id !== undefined) {
    await updateProduct(data, +params.id);
  } else {
    throw new Response("", { status: 404, statusText: "No encontrado" });
  }

  return redirect("/");
}

//disponibilidad
const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export default function EditsProduct() {
  //recuperando el state desde details con navigate
  // const { state } = useLocation();

  const error = useActionData() as string;
  const productToBeEdited = useLoaderData() as Product;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl text-slate-500 font-black">Editar Producto</h2>
        <Link
          to={"/"}
          className="rounded-lg bg-indigo-600 text-sm p-3 hover:bg-indigo-500 text-white cursor-pointer font-bold transition-colors"
        >
          Productos
        </Link>
      </div>

      {error && <Error>{error}</Error>}

      <Form className="mt-10" method="POST">
        <ProductForm product={productToBeEdited} />

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={productToBeEdited?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Guardar Cambios"
        />
      </Form>
    </>
  );
}
