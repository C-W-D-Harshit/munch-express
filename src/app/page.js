import Image from "next/image";
import "@/components/styles/home.css";
import Link from "next/link";
import { Balancer } from "react-wrap-balancer";
import { cookies } from "next/headers";

export default function Home(req, res) {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt");

  // console.log(token);
  return (
    <main className="margin home">
      <div className="home_">
        <div>More than Faster 🍒</div>
        <div>
          <p>
            <Balancer>
              be the fastest in delivering your <span>food</span>
            </Balancer>
          </p>
        </div>
        <p>
          <Balancer>
            Our job is to fill your tummy with our delicious food with benifits
            like fast and free delivery
          </Balancer>
        </p>
        <button>
          <Link href={token ? "/dashboard" : "/auth/login"}>Get Started</Link>
        </button>
      </div>
      <div className="home__"></div>
    </main>
  );
}
