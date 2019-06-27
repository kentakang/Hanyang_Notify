/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
import React, { useState, useEffect } from 'react';
import { StatusBar, Text } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';

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
  font-size: 18;
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

const Schedule = () => {
  const [scheduleList, setScheduleList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const date = moment();
  const promiseList = [];

  const renderItem = item => (
    <AgendaItem>
      <Text>{item.text}</Text>
    </AgendaItem>
  );

  const renderEmptyDate = () => (
    <EmptyItem>
      <Text>This date is empty!</Text>
    </EmptyItem>
  );

  useEffect(() => {
    for (let day = 1; day <= date.daysInMonth(); day += 1) {
      promiseList.push(
        new Promise(resolve => {
          fetch(
            `http://hanyang.kentastudio.com/api/schedule/${date.format('YYYY')}-${date.format(
              'MM'
            )}-${day < 10 ? `0${day}` : day}`
          )
            .then(response => response.json())
            .then(json =>
              resolve({
                [`${date.format('YYYY')}-${date.format('MM')}-${day < 10 ? `0${day}` : day}`]: [
                  { text: json.schedule },
                ],
              })
            );
        })
      );
    }

    Promise.all(promiseList).then(values => {
      setScheduleList(values);
    });
  }, []);

  useEffect(() => {
    if (scheduleList.length === date.daysInMonth()) {
      setScheduleList(Object.assign({}, ...scheduleList.map(item => item)));
      setIsLoading(false);
    }
  }, [scheduleList]);

  return (
    <Container>
      <StatusBar backgroundColor="#007ac1" barStyle="light-content" />
      <TitleBar>
        <Title>학사일정</Title>
      </TitleBar>
      {isLoading ? (
        <LottieView source={require('../../resources/animation/loading.json')} autoPlay loop />
      ) : (
        <Agenda
          selected={date.format('YYYY-MM-DD')}
          items={scheduleList}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyDate}
          rowHasChanged={(r1, r2) => {
            return r1.text !== r2.text;
          }}
        />
      )}
    </Container>
  );
};

Schedule.navigationOptions = () => {
  return {
    title: '학사일정',
  };
};

export default Schedule;
