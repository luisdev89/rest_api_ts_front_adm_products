import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { loader as productsLoader , action as productAction} from "./views/Products";
import NewProduct, { action as newProdctAction } from "./views/NewProduct";
import EditsProduct, {
  loader as editLoader,
  action as editAction,
} from "./views/EditsProduct";
import {action as deleteAction} from './components/ProductDetails'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action:productAction,
        hydrateFallbackElement: <p>Cargando...</p>,
      },
      {
        path: "/productos/nuevo",
        element: <NewProduct />,
        action: newProdctAction,
      },
      {
        path: "/productos/:id/editar", // ROA Pattern Resource Oriented Design
        element: <EditsProduct />,
        hydrateFallbackElement: <p>Cargando...</p>,
        loader: editLoader,
        action: editAction,
      },
      {
        path: "/productos/:id/eliminar",
        action:deleteAction
      },
    ],
  },
]);
