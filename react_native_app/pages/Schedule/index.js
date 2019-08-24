/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
import React from 'react';
import { StatusBar, Text } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
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

const AgendaItem = styled.View`
  background: #ffffff;
  flex: 1;
  border-radius: 5;
  margin-right: 10;
  margin-top: 17;
  justify-content: center;
  align-items: center;
`;

const EmptyItem = styled.View`
  height: 15;
  flex: 1;
  padding-top: 30;
  justify-content: center;
  align-items: center;
`;

LocaleConfig.locales.ko = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "오늘'hui",
};

LocaleConfig.defaultLocale = 'ko';

const mapStateToProps = state => {
  const { scheduleList } = state;

  return {
    scheduleList,
  };
};

const Schedule = ({ scheduleList }) => {
  const date = moment();

  const renderItem = item => (
    <AgendaItem>
      <Text>{item.text}</Text>
    </AgendaItem>
  );

  const renderEmptyDate = () => (
    <EmptyItem>
      <Text>학사 일정이 없는 날입니다.</Text>
    </EmptyItem>
  );

  return (
    <Container>
      <StatusBar backgroundColor="#007ac1" barStyle="light-content" />
      <TitleBar>
        <TitleIcon source={require('../../resources/images/Schedule.png')} resizeMode="contain" />
        <Title>학사일정</Title>
      </TitleBar>
      <Agenda
        selected={date.format('YYYY-MM-DD')}
        items={scheduleList}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        renderEmptyData={renderEmptyDate}
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        minDate={`${date.format('YYYY')}-01-01`}
        maxDate={`${date.format('YYYY')}-12-31`}
      />
    </Container>
  );
};

Schedule.navigationOptions = () => {
  return {
    title: '학사일정',
  };
};

export default connect(mapStateToProps)(Schedule);
