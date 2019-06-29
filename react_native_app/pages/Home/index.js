/* eslint-disable global-require */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import { Card, CardItem, Text, Body } from 'native-base';

const Container = styled.View`
  flex: 1;
`;

const TitleBar = styled.View`
  width: 100%;
  height: 9%;
  background: #007ac1;
  align-items: center;
  flex-direction: row;
`;

const Title = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-size: 18;
  margin-left: 3%;
`;

const TitleIcon = styled.Image`
  width: 18;
  height: 18;
  margin-left: 5%;
`;

const Header = styled.Text`
  color: #1a1a1a;
  font-size: 16;
  margin-left: 5%;
  margin-top: 5%;
  font-weight: bold;
`;

const StyledCard = styled(Card)`
  margin: 5% 5% 0;
`;

const ListIcon = styled.Image`
  width: 16;
  height: 16;
  margin-right: 3%;
`;

const Home = () => {
  const date = moment();
  const [mealData, setMealData] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://hanyang.kentastudio.com/api/meal/${date.format('YYYY-MM-DD')}`)
      .then(response => response.json())
      .then(json => setMealData(json));

    fetch(`https://hanyang.kentastudio.com/api/schedule/${date.format('YYYY-MM-DD')}`)
      .then(response => response.json())
      .then(json => setScheduleData(json));

    fetch('https://hanyang.kentastudio.com/api/document')
      .then(response => response.json())
      .then(json => setDocumentData(json));
  }, []);

  useEffect(() => {
    if (mealData !== null && scheduleData !== null && documentData !== null) {
      setIsLoading(false);
    }
  }, [mealData, scheduleData, documentData]);

  return (
    <Container>
      <StatusBar backgroundColor="#007ac1" barStyle="light-content" />
      <TitleBar>
        <TitleIcon source={require('../../resources/images/Home.png')} resizeMode="contain" />
        <Title>한양알림이</Title>
      </TitleBar>
      <Header>{`${date.format('YYYY년 MM월 DD일')}`}</Header>
      {isLoading ? (
        <LottieView source={require('../../resources/animation/loading.json')} autoPlay loop />
      ) : (
        <Container>
          <StyledCard>
            <CardItem header>
              <ListIcon source={require('../../resources/images/list_icon.png')} />
              <Text>점심</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  {mealData[0] !== undefined ? `${mealData[0].food}` : '급식이 없습니다.'}
                </Text>
              </Body>
            </CardItem>
          </StyledCard>
          <StyledCard>
            <CardItem header borderd>
              <ListIcon source={require('../../resources/images/list_icon.png')} />
              <Text>저녁</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  {mealData[1] !== undefined ? `${mealData[1].food}` : '급식이 없습니다.'}
                </Text>
              </Body>
            </CardItem>
          </StyledCard>
          <StyledCard>
            <CardItem header borderd>
              <ListIcon source={require('../../resources/images/list_icon.png')} />
              <Text>학사일정</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>{`${scheduleData.schedule}`}</Text>
              </Body>
            </CardItem>
          </StyledCard>
          <StyledCard>
            <CardItem header borderd>
              <ListIcon source={require('../../resources/images/list_icon.png')} />
              <Text>가정통신문</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>{`${documentData.title}`}</Text>
              </Body>
            </CardItem>
          </StyledCard>
        </Container>
      )}
    </Container>
  );
};

Home.navigationOptions = () => {
  return {
    title: '메인',
  };
};

export default Home;
