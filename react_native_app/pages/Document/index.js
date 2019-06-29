/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import { Card, CardItem, Text, Body } from 'native-base';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import PropTypes from 'prop-types';
import DocumentViewer from '../DocumentViewer';

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

const StyledCard = styled(Card)`
  margin: 5% 5% 0;
`;

const ListIcon = styled.Image`
  width: 16;
  height: 16;
  margin-right: 2%;
`;

const LoadIndicator = styled.View`
  width: 50;
  height: 50;
  margin: 5% auto;
`;

const Document = ({ navigation }) => {
  const [documentList, setDocumentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const getPage = () => {
    console.log('getPage');
    setIsLoading(true);
    fetch(`https://hanyang.kentastudio.com/api/document/list/${page}`)
      .then(response => response.json())
      .then(json => {
        setDocumentList(documentList.concat(json.list));
        setHasMore(json.hasMore);
        setPage(page + 1);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getPage();
  }, []);

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
  };

  return (
    <Container>
      <StatusBar backgroundColor="#007ac1" barStyle="light-content" />
      <TitleBar>
        <TitleIcon source={require('../../resources/images/Document.png')} resizeMode="contain" />
        <Title>가정통신문</Title>
      </TitleBar>
      <ScrollContainer
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent) && hasMore) {
            getPage();
          }
        }}
      >
        {documentList.map((data, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('DocumentViewer', {
                  title: '가정통신문',
                  url: data.url,
                })
              }
            >
              <StyledCard>
                <CardItem header>
                  <ListIcon source={require('../../resources/images/list_icon.png')} />
                  <Text>{data.title.replace(/^\s*/, '')}</Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>{moment(data.date).format('YYYY년 MM월 DD일')}</Text>
                  </Body>
                </CardItem>
              </StyledCard>
            </TouchableOpacity>
          );
        })}
        {isLoading && (
          <LoadIndicator>
            <LottieView source={require('../../resources/animation/loading.json')} autoPlay loop />
          </LoadIndicator>
        )}
      </ScrollContainer>
    </Container>
  );
};

Document.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const AppNavigator = createStackNavigator(
  {
    Document: {
      screen: Document,
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
    title: '가정통신문',
  };
};

export default AppContainer;
