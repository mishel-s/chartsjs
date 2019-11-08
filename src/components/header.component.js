import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &:after {
    position: absolute;
    top: 10vh;
    content: '';
    height: 1px;
    width: 100%;
    background-color: grey;
  }
`;

const Title = styled.h1`
  color: white;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Title>Charts</Title>
    </HeaderWrapper>
  );
};

export default Header;
