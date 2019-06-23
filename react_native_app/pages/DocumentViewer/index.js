import React, { useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { WebView } from 'react-native-webview';

const Container = styled.View`
  flex: 1;
`;

const TitleBar = styled.View`
  width: 100%;
  height: 9%;
  background: #ffffff;
  justify-content: center;
`;

const Title = styled.Text`
  color: #000000;
  margin-left: 5%;
  font-weight: bold;
  font-size: 18;
`;
const DocumentViewer = ({ navigation }) => {

  useEffect(() => {
    if (navigation.getParam('url', null) === null) {
      Alert.alert(
        '오류',
        `${navigation.getParam('title', 'Document Viewer')} 파일이 존재하지 않습니다!`,
        [
          {
            text: '확인',
            onPress: () => navigation.goBack()
          }
        ]
      )
    }
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <TitleBar>
        <Title>{navigation.getParam('title', 'Document Viewer')}</Title>
      </TitleBar>
      <WebView source={{ uri: navigation.getParam('url', null) }} startInLoadingState={true} renderLoading={() => <LottieView source={require('../../resources/animation/loading.json')} autoPlay loop />} />
    </Container>
  );
};

export default DocumentViewer;