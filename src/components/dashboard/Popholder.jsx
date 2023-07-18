import Link from "next/link";
import { AiFillPlusSquare } from "react-icons/ai";
import CatCard from "../cards/CatCard";
import ProductCard from "../cards/ProductCard";
import axios from "axios";
import { cookies } from "next/headers";

const getData = async (feature) => {
  const res = await fetch(
    `${process.env.LINK}/api/v1/products?${feature}=true`,
    {
      headers: { Cookie: cookies().toString() },
      next: { revalidate: 10 },
    }
  );

  return res.json();
};

const Popholder = async ({ feature, title, link }) => {
  // const [products, setProducts] = useState(null);
  const categories = [
    {
      icon: "/pizza.png",
      name: "pizza",
    },
    {
      icon: "/burger.png",
      name: "burger",
    },
    {
      icon: "/hotdog.png",
      name: "hotdog",
    },
    {
      icon: "/snacks.png",
      name: "snacks",
    },
    {
      icon: "/drinks.png",
      name: "drinks",
    },
    {
      icon: "/thali.png",
      name: "thali",
    },
    {
      icon: "/thali.png",
      name: "thali",
    },
  ];

  let data = null;
  if (feature !== "category") {
    const { products } = await getData(feature);
    data = products;
    if (data.length === 0) {
      return;
    }
  }

  return (
    <div className="category">
      <div className="category_top">
        <p>{title}</p>
        <Link href={`/dashboard/${link}`}>
          <p>View All</p>
          <AiFillPlusSquare />
        </Link>
      </div>
      {feature === "category" ? (
        <div className="category_hold">
          {categories?.map((category, index) => (
            <CatCard category={category} key={index} />
          ))}
        </div>
      ) : data ? (
        <div className="product_hold">
          {data?.map((product, index) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Popholder;
