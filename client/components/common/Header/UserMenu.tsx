import { memo, ReactNode } from "react";
import Link from "next/link";
import styled from "@emotion/styled";

import { NavMenuItem } from "@/interfaces";
import { styles } from "@/styles";

const FONT_SIZE = styles.fontSize.xsmall;
const ICON_SIZE = 2.4;

const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: auto;

  grid-column: 10 / span 3;

  display: flex;
`;

const MenuItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${FONT_SIZE}rem;
  cursor: pointer;

  svg {
    width: ${ICON_SIZE}rem;
    height: ${ICON_SIZE}rem;
  }

  & + & {
    margin-left: ${styles.space.level4}rem;
  }
`;

interface UserMenuItemProps {
  path?: string;
  children: ReactNode;
}
const UserMenuItem = ({ path, children }: UserMenuItemProps) => {
  const item = path ? <Link href={path}>{children}</Link> : children;

  return <MenuItem>{item}</MenuItem>;
};

interface Props {
  items: NavMenuItem[];
}
const UserMenu = ({ items }: Props) => {
  return (
    <Menu>
      {items.map((item, index) => (
        <UserMenuItem key={item.path || index} path={item.path}>
          {item.children}
        </UserMenuItem>
      ))}
    </Menu>
  );
};

export default memo(UserMenu);
