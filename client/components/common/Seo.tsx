import Head from "next/head";
import { strings } from "@/constants";

interface Props {
  title: string;
}
const Seo = ({ title }: Props) => {
  return (
    <Head>
      <title>
        {title} | {strings.siteName}
      </title>
    </Head>
  );
};

export default Seo;
