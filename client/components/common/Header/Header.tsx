import { memo } from "react";
import styled from "@emotion/styled";

import { mixins, styles } from "@/styles";
import { NavMenuItem } from "@/interfaces";

import Logo from "../Logo";
import NavBar from "./NavBar";
import UserMenu from "./UserMenu";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import { paths } from "@/constants";

const HEADER_HEIGHT = 5.6;

const StyledHeader = styled.header`
  height: ${HEADER_HEIGHT}rem;
  font-size: ${styles.fontSize.small}rem;
`;

const Container = styled.div`
  ${mixins.grid()}
  height: inherit;
  border-color: ${({ theme }) => theme.color.font};
  border-bottom: ${styles.border.level1}rem solid;
`;

const navItems: NavMenuItem[] = [
  {
    path: "/new",
    children: "NEW",
  },
  {
    path: "/sale",
    children: "SALE",
  },
  {
    path: "/outer",
    children: "OUTER",
  },
  {
    path: "/top",
    children: "TOP",
  },
  {
    path: "/bottom",
    children: "BOTTOM",
  },
  {
    path: "/bag-acc",
    children: "BAG/ACC",
  },
];

const userMenuItems: NavMenuItem[] = [
  {
    children: <MdSearch />,
  },
  {
    children: <MdShoppingCart />,
  },
  {
    path: paths.client.login,
    children: "로그인",
  },
  {
    path: paths.client.join,
    children: "회원가입",
  },
];

const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <Logo />
        <NavBar items={navItems} />
        <UserMenu items={userMenuItems} />
      </Container>
    </StyledHeader>
  );
};

export default memo(Header);
