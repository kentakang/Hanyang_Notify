import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

const TitleBar = styled.View`
  width: 100%;
  height: 9%;
  background: #007ac1;
  justify-content: center;
`;

const Title = styled.Text`
  color: #ffffff;
  margin-left: 5%;
  font-weight: bold;
  font-size: 16;
`;

const Home = () => {
  return (
    <Container>
      <StatusBar backgroundColor="#007ac1" barStyle="light-content" />
      <TitleBar>
        <Title>한양알림이</Title>
      </TitleBar>
    </Container>
  );
};

Home.navigationOptions = () => {
  return {
    title: '메인',
  };
};

export default Home;