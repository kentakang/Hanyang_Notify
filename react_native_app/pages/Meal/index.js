/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable global-require */
import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, View } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import 'moment/locale/ko';
import LottieView from 'lottie-react-native';
import { Card, CardItem, Text, Body } from 'native-base';

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
`;

const Meal = () => {
  const date = moment();
  const [mealList, setMealList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const promiseList = [];
  const scrollView = useRef(null);

  useEffect(() => {
    for (let day = 1; day <= date.daysInMonth(); day++) {
      promiseList.push(
        new Promise(resolve => {
          fetch(
            `http://hanyang.kentastudio.com/api/meal/${date.format('YYYY')}-${date.format(
              'MM'
            )}-${day}`
          )
            .then(response => response.json())
            .then(json => resolve(json));
        })
      );
    }

    Promise.all(promiseList).then(values => {
      setMealList(values);
    });
  }, []);

  useEffect(() => {
    if (mealList.length === date.daysInMonth()) {
      setIsLoading(false);
    }
  }, [mealList]);

  moment.locale('ko');

  return (
    <Container>
      <StatusBar backgroundColor="#007ac1" barStyle="light-content" />
      <TitleBar>
        <TitleIcon source={require('../../resources/images/Meal.png')} resizeMode="contain" />
        <Title>급식</Title>
      </TitleBar>
      {isLoading ? (
        <LottieView source={require('../../resources/animation/loading.json')} autoPlay loop />
      ) : (
        <ScrollContainer ref={scrollView}>
          {mealList.map((data, index) => {
            return (
              <View
                key={`${date.format('YYYY')}-${date.format('MM')}-${
                  index < 9 ? `0${index + 1}` : `${index + 1}`
                }`}
                onLayout={event => {
                  if (index === date.format('DD') - 1) {
                    const { x, y } = event.nativeEvent.layout;

                    scrollView.current.scrollTo({ x, y, animated: true });
                  }
                }}
              >
                <Header>
                  <ListIcon source={require('../../resources/images/list_icon.png')} />
                  {'   '}
                  {`${moment(
                    `${date.format('YYYY')}-${date.format('MM')}-${
                      index < 9 ? `0${index + 1}` : `${index + 1}`
                    }`
                  ).format('MM월 DD일 (ddd)')}`}
                </Header>
                <StyledCard>
                  <CardItem header>
                    <Text>점심</Text>
                  </CardItem>
                  <CardItem bordered>
                    <Body>
                      <Text>{data[0] !== undefined ? `${data[0].food}` : '급식이 없습니다.'}</Text>
                    </Body>
                  </CardItem>
                </StyledCard>
                <StyledCard>
                  <CardItem header borderd>
                    <Text>저녁</Text>
                  </CardItem>
                  <CardItem bordered>
                    <Body>
                      <Text>{data[1] !== undefined ? `${data[1].food}` : '급식이 없습니다.'}</Text>
                    </Body>
                  </CardItem>
                </StyledCard>
              </View>
            );
          })}
        </ScrollContainer>
      )}
    </Container>
  );
};

Meal.navigationOptions = () => {
  return {
    title: '급식',
  };
};

export default Meal;
