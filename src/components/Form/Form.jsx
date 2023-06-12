import { useParams } from "react-router-dom";
import Branches from "../Branches/Branches";
import Products from "../Products/Products";

export default function Form() {
  const { slug } = useParams();
  const forms = {
    branches: <Branches />,
    products: <Products />,
  };
  return forms[slug];
}
