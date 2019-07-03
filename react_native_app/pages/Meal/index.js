/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable global-require */
import React, { useRef } from 'react';
import { StatusBar, View } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import 'moment/locale/ko';
import LottieView from 'lottie-react-native';
import { Card, CardItem, Text, Body } from 'native-base';
import { connect } from 'react-redux';

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

const mapStateToProps = state => {
  const { mealList, documentList, scheduleList } = state;

  return {
    mealList,
    documentList,
    scheduleList,
  };
};

const Meal = ({ mealList }) => {
  const date = moment();
  const scrollView = useRef(null);

  moment.locale('ko');

  return (
    <Container>
      <StatusBar backgroundColor="#007ac1" barStyle="light-content" />
      <TitleBar>
        <TitleIcon source={require('../../resources/images/Meal.png')} resizeMode="contain" />
        <Title>급식</Title>
      </TitleBar>
      <ScrollContainer ref={scrollView}>
        {Object.entries(mealList).map(([key, data]) => {
          return (
            <View
              key={key}
              onLayout={event => {
                if (key === date.format('YYYY-MM-DD') - 1) {
                  const { x, y } = event.nativeEvent.layout;

                  scrollView.current.scrollTo({ x, y, animated: true });
                }
              }}
            >
              <Header>
                <ListIcon source={require('../../resources/images/list_icon.png')} />
                {'   '}
                {`${moment(key).format('MM월 DD일 (ddd)')}`}
              </Header>
              <StyledCard>
                <CardItem header>
                  <Text>점심</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text>{data.lunch !== undefined ? `${data.lunch}` : '급식이 없습니다.'}</Text>
                  </Body>
                </CardItem>
              </StyledCard>
              <StyledCard>
                <CardItem header borderd>
                  <Text>저녁</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text>{data.dinner !== undefined ? `${data.dinner}` : '급식이 없습니다.'}</Text>
                  </Body>
                </CardItem>
              </StyledCard>
            </View>
          );
        })}
      </ScrollContainer>
    </Container>
  );
};

Meal.navigationOptions = () => {
  return {
    title: '급식',
  };
};

export default connect(mapStateToProps)(Meal);
