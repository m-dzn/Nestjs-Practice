import { Seo } from "@/components";
import { strings } from "@/constants";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <Seo title={strings.seo.home.title} />
      Home
    </div>
  );
};

export default Home;
