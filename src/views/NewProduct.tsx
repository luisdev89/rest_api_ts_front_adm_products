import {
  Link,
  Form,
  useActionData,
  type ActionFunctionArgs,
  redirect,
} from "react-router-dom";
import Error from "../components/Error";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({ request }: ActionFunctionArgs) {
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

  await addProduct(data);

  return redirect("/");
}

export default function NewProduct() {
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl text-slate-500 font-black">Crear Producto</h2>
        <Link
          to={"/"}
          className="rounded-lg bg-indigo-600 text-sm p-3 hover:bg-indigo-500 text-white cursor-pointer font-bold transition-colors"
        >
          Productos
        </Link>
      </div>

      {error && <Error>{error}</Error>}

      <Form className="mt-10" method="POST">
        <ProductForm />
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
