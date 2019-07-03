/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Home from './pages/Home';
import Meal from './pages/Meal';
import Document from './pages/Document';
import Schedule from './pages/Schedule';
import Settings from './pages/Settings';
import Notice from './pages/Notice';
import { actionCreators as actions } from './reducer';

const mapStateToProps = state => {
  const { mealList, documentList, scheduleList, noticeList } = state;

  return {
    mealList,
    documentList,
    scheduleList,
    noticeList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMealList: bindActionCreators(actions.setMealList, dispatch),
    setDocumentList: bindActionCreators(actions.setDocumentList, dispatch),
    setScheduleList: bindActionCreators(actions.setScheduleList, dispatch),
    setNoticeList: bindActionCreators(actions.setNoticeList, dispatch),
  };
};

const Navigator = createBottomTabNavigator(
  {
    Home,
    Meal,
    Notice,
    Document,
    Schedule,
    Settings,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        const IconComponent = Ionicons;
        let iconName;

        switch (routeName) {
          case 'Home':
            iconName = `ios-home`;
            break;
          case 'Meal':
            iconName = 'ios-restaurant';
            break;
          case 'Document':
            iconName = 'ios-document';
            break;
          case 'Schedule':
            iconName = 'ios-calendar';
            break;
          case 'Settings':
            iconName = 'ios-settings';
            break;
          case 'Notice':
            iconName = 'ios-notifications';
            break;
          default:
            break;
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#007ac1',
    },
  }
);

const Container = createAppContainer(Navigator);

const AppContainer = props => {
  const date = moment();
  const loadStatus = { meal: false, document: false, schedule: false, notice: false };

  useEffect(() => {
    fetch(`https://hanyang.kentastudio.com/api/schedule/${date.format('YYYY')}`)
      .then(response => response.json())
      .then(json => {
        json.forEach(data => {
          props.setScheduleList(
            Object.assign(props.scheduleList, {
              [`${data.year}-${data.month}-${data.day}`]: [{ text: data.schedule }],
            })
          );
        });
      })
      .then((loadStatus.schedule = true));

    fetch(`https://hanyang.kentastudio.com/api/document/list/1`)
      .then(response => response.json())
      .then(json => props.setDocumentList(props.documentList.concat(json.list)))
      .then((loadStatus.document = true));

    fetch(`https://hanyang.kentastudio.com/api/notice/list/1`)
      .then(response => response.json())
      .then(json => props.setNoticeList(props.noticeList.concat(json.list)))
      .then((loadStatus.notice = true));

    fetch(`https://hanyang.kentastudio.com/api/meal/${date.format('YYYY-MM')}`)
      .then(response => response.json())
      .then(json => {
        json.forEach(data => {
          props.setMealList(
            Object.assign(props.mealList, {
              [`${data.year}-${data.month}-${data.day < 10 ? `0${data.day}` : data.day}`]: {
                lunch: data.lunch ? data.lunch : '급식이 없습니다.',
                dinner: data.dinner ? data.dinner : '급식이 없습니다.',
              },
            })
          );
        });
      })
      .then((loadStatus.meal = true));
  }, []);

  useEffect(() => {
    if (Object.keys(loadStatus).every(key => loadStatus[key] === true)) {
      SplashScreen.hide();
    }
  }, [loadStatus]);

  return <Container />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
