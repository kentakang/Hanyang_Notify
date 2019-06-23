import React, { useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Container = styled.View`
  flex: 1;
`;

const TitleBar = styled.View`
  width: 100%;
  height: 9%;
  background: #ffffff;
  align-items: center;
  flex-direction: row;
`;

const Title = styled.Text`
  color: #000000;
  margin-left: 5%;
  font-weight: bold;
  font-size: 18;
`;

const BackButton = styled.TouchableOpacity`
  margin-left: 5%;
`

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
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={18} color="#000000" />
        </BackButton>
        <Title>{navigation.getParam('title', 'Document Viewer')}</Title>
      </TitleBar>
      <WebView source={{ uri: navigation.getParam('url', null) }} startInLoadingState={true} renderLoading={() => <LottieView source={require('../../resources/animation/loading.json')} autoPlay loop />} />
    </Container>
  );
};

export default DocumentViewer;