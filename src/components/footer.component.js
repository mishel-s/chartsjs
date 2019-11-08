import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &:before {
    position: absolute;
    bottom: 10vh;
    content: '';
    height: 1px;
    width: 100%;
    background-color: grey;
  }
`;

const Title = styled.h5`
  color: white;
  padding: 0px 10px;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Title>Savastru Mishel</Title>
    </FooterWrapper>
  );
};

export default Footer;
