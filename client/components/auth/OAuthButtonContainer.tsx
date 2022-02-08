import { memo } from "react";
import Image from "next/image";
import styled from "@emotion/styled";

import { strings } from "@/constants";
import { AuthType, SNSProvider } from "@/interfaces";
import { styles } from "@/styles";

const OAUTH_BUTTON_HEIGHT = 4.8;
const PROVIDER_ICON_SIZE = 2.4;
const PROVIDER_ICON_MARGIN_LEFT = 2.4;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${styles.space.level3}rem;
`;

interface StyleProps {
  background: string;
  fontColor: string;
}
const StyledButton = styled.button<StyleProps>`
  background: ${({ background }) => background};
  color: ${({ fontColor }) => fontColor};
  border: none;

  width: 100%;
  height: ${OAUTH_BUTTON_HEIGHT}rem;

  padding: 0;
  position: relative;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  width: ${OAUTH_BUTTON_HEIGHT}rem;
  height: ${OAUTH_BUTTON_HEIGHT}rem;

  top: 0;
  left: ${PROVIDER_ICON_MARGIN_LEFT}rem;
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  position: relative;
  width: ${PROVIDER_ICON_SIZE}rem;
  height: ${PROVIDER_ICON_SIZE}rem;
`;

interface OAuthButtonProps {
  type: AuthType;
  provider: SNSProvider;
}
const OAuthButton = ({ type, provider }: OAuthButtonProps) => {
  const { logo, background, fontColor } = provider;

  return (
    <StyledButton background={background} fontColor={fontColor}>
      <IconWrapper>
        <Icon>
          <Image src={logo} layout="fill" alt="" />
        </Icon>
      </IconWrapper>
      {provider.message[type]}
    </StyledButton>
  );
};

interface Props {
  type: AuthType;
}
const OAuthButtonContainer = ({ type }: Props) => {
  return (
    <Container>
      <OAuthButton type={type} provider={strings.snsProvider.kakao} />
      <OAuthButton type={type} provider={strings.snsProvider.naver} />
    </Container>
  );
};

export default memo(OAuthButtonContainer);
