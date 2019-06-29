import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { ListItem, Text, Left } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import PropTypes from 'prop-types';
import DocumentViewer from '../DocumentViewer';

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

const List = styled(ListItem)`
  margin-right: 5%;
`;

const Icon = styled(Ionicons)`
  margin-right: 5%;
`;

const Settings = ({ navigation }) => {
  return (
    <Container>
      <StatusBar backgroundColor="#007ac1" barStyle="light-content" />
      <TitleBar>
        <Title>설정</Title>
      </TitleBar>
      <List
        onPress={() => {
          navigation.navigate('DocumentViewer', {
            title: '정보',
            url: 'https://hycoding.io/static/html/hanyangnotify_about.html',
          });
        }}
      >
        <Left>
          <Icon name="ios-information-circle-outline" size={25} color="#000000" />
          <Text>정보</Text>
        </Left>
      </List>
      <List
        onPress={() => {
          navigation.navigate('DocumentViewer', {
            title: '오픈소스 라이센스',
            url: 'https://hycoding.io/static/html/hanyangnotify_oss_license.html',
          });
        }}
      >
        <Left>
          <Icon name="ios-help-circle" size={25} color="#000000" />
          <Text>오픈소스 라이센스</Text>
        </Left>
      </List>
    </Container>
  );
};

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const AppNavigator = createStackNavigator(
  {
    Settings: {
      screen: Settings,
    },
    DocumentViewer: {
      screen: DocumentViewer,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

AppContainer.navigationOptions = () => {
  return {
    title: '설정',
  };
};

export default AppContainer;
