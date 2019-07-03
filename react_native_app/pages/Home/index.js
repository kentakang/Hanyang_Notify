/* eslint-disable global-require */
/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import { Card, CardItem, Text, Body } from 'native-base';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

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

const mapStateToProps = state => {
  const { mealList, documentList, scheduleList } = state;

  return {
    mealList,
    documentList,
    scheduleList,
  };
};

const Home = ({ mealList, scheduleList, documentList }) => {
  const date = moment();
  const formattedDate = date.format('YYYY-MM-DD');

  useEffect(() => {
    firebase.messaging().subscribeToTopic('ALL');
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor="#007ac1" barStyle="light-content" />
      <TitleBar>
        <TitleIcon source={require('../../resources/images/Home.png')} resizeMode="contain" />
        <Title>한양알림이</Title>
      </TitleBar>
      <Header>{`${date.format('YYYY년 MM월 DD일')}`}</Header>
      <Container>
        <StyledCard>
          <CardItem header>
            <ListIcon source={require('../../resources/images/list_icon_2.png')} />
            <Text>점심</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
                {mealList[formattedDate] !== undefined
                  ? `${mealList[formattedDate].lunch}`
                  : '급식이 없습니다.'}
              </Text>
            </Body>
          </CardItem>
        </StyledCard>
        <StyledCard>
          <CardItem header borderd>
            <ListIcon source={require('../../resources/images/list_icon_2.png')} />
            <Text>저녁</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
                {mealList[formattedDate] !== undefined
                  ? `${mealList[formattedDate].dinner}`
                  : '급식이 없습니다.'}
              </Text>
            </Body>
          </CardItem>
        </StyledCard>
        <StyledCard>
          <CardItem header borderd>
            <ListIcon source={require('../../resources/images/list_icon_2.png')} />
            <Text>학사일정</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
                {scheduleList[formattedDate] !== undefined
                  ? `${scheduleList[formattedDate][0].text}`
                  : '학사 일정이 없습니다.'}
              </Text>
            </Body>
          </CardItem>
        </StyledCard>
        <StyledCard>
          <CardItem header borderd>
            <ListIcon source={require('../../resources/images/list_icon_2.png')} />
            <Text>가정통신문</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
                {documentList !== undefined && documentList.length > 1
                  ? `${documentList[0].title}`
                  : '가정통신문이 없습니다.'}
              </Text>
            </Body>
          </CardItem>
        </StyledCard>
      </Container>
    </Container>
  );
};

Home.navigationOptions = () => {
  return {
    title: '메인',
  };
};

export default connect(mapStateToProps)(Home);
