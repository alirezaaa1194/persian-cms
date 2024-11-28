import Notfound from "./Pages/Notfound/Notfound";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Comments from "./Pages/Comments/Comments";
import Users from "./Pages/Users/Users";
import Orders from "./Pages/Orders/Orders";
import Discounts from "./Pages/Discounts/Discounts";
const routes = [
  {
    path: "*",
    element: <Notfound />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/comments",
    element: <Comments />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/discounts",
    element: <Discounts />,
  },
];
export default routes;
