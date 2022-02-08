import Image from "next/image";
import { images, paths } from "@/constants";
import { memo } from "react";
import Link from "next/link";
import styled from "@emotion/styled";

const LogoBox = styled.div`
  height: inherit;
  position: relative;
  cursor: pointer;
`;

const Logo = () => {
  return (
    <Link href={paths.client.home}>
      <a>
        <LogoBox>
          <Image
            src={images.logo}
            alt="Site Logo"
            layout="fill"
            sizes="100%"
            objectFit="cover"
          />
        </LogoBox>
      </a>
    </Link>
  );
};

export default memo(Logo);
