import React, { useState, useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import { Card, CardItem, Text, Body } from 'native-base';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import View from './View';

const Container = styled.View`
  flex: 1;
`;

const ScrollContainer = styled.ScrollView`
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
  font-size: 18;
`;

const StyledCard = styled(Card)`
  margin: 5% 5% 0;
`;

const Document = () => {
  const [documentList, setDocumentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://hanyang.kentastudio.com/api/document/all')
      .then(response => response.json())
      .then(json => setDocumentList(json));
  }, []);

  useEffect(() => {
    if (documentList.length !== 0) {
      setIsLoading(false);
    }
  }, [documentList]);

  return (
    <Container>
      <StatusBar backgroundColor="#007ac1" barStyle="light-content" />
      <TitleBar>
        <Title>가정통신문</Title>
      </TitleBar>
      {
        isLoading ? <LottieView source={require('../../resources/animation/loading.json')} autoPlay loop />
        : (
          <ScrollContainer>
            {documentList.map((data, index) => {
              return (
                <StyledCard key={index}>
                  <CardItem header>
                    <Text>
                      {data.title.replace(/^\s*/, "")}
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>
                        {moment(data.date).format('YYYY년 MM월 DD일')}
                      </Text>
                    </Body>
                  </CardItem>
                </StyledCard>
              );
            })}
          </ScrollContainer>
        )
      }
    </Container>
  );
};

Document.navigationOptions = () => {
  return {
    title: '가정통신문',
  };
};

const AppNavigator = createStackNavigator({
  Document: {
    screen: Document
  },
  View: {
    screen: View
  }
});

export default createAppContainer(AppNavigator);