import { memo, ReactNode } from "react";
import Link from "next/link";
import styled from "@emotion/styled";

import { NavMenuItem } from "@/interfaces";

const StyledNav = styled.nav`
  grid-column: 4 / span 6;
`;

const NavMenu = styled.ul`
  list-style: none;
  height: 100%;
  margin: 0;
  padding: 0;

  display: flex;
`;

const StyledNavItem = styled.li`
  width: 9.6rem;
  a {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface NavItemProps {
  path?: string;
  children: ReactNode;
}
const NavItem = memo(({ path, children }: NavItemProps) => {
  const item = path ? <Link href={path}>{children}</Link> : children;

  return <StyledNavItem>{item}</StyledNavItem>;
});

interface NavBarProps {
  items: NavMenuItem[];
}
const NavBar = ({ items }: NavBarProps) => {
  return (
    <StyledNav>
      <NavMenu>
        {items.map((item) => (
          <NavItem path={item.path}>{item.children}</NavItem>
        ))}
      </NavMenu>
    </StyledNav>
  );
};

export default memo(NavBar);
