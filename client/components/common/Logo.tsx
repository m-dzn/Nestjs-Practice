import Image from "next/image";
import { images, paths } from "@/constants";
import { memo } from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={paths.client.home}>
      <Image
        src={images.logo}
        alt="Site Logo"
        layout="fill"
        objectFit="cover"
      />
    </Link>
  );
};

export default memo(Logo);
