/* eslint-disable global-require */
import React, { useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import HTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import { IGNORED_TAGS, alterNode, makeTableRenderer } from 'react-native-render-html-table-bridge'; 

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

const NoticeContainer = styled.ScrollView`
  padding: 5%;
  flex: 1;
`;

const NoticeTitle = styled.Text`
  font-size: 18;
  font-weight: bold;
  color: #000000;
`;

const NoticeContent = styled(HTML)`
  margin-top: 5%;
`;

const NoticeAttachmentContainer = styled.View`
  border-color: #e8e8e8;
  border-top-width: 1;
  padding-top: 5%;
`;

const NoticeAttachmentTitle = styled.Text`
  color: #000000;
  font-weight: bold;
  font-size: 14;
  margin-bottom: 5%;
`;

const NoticeAttachmentButton = styled.TouchableOpacity`
  background: #007ac1;
  border-radius: 10;
  align-items: center;
  padding-top: 3%;
  padding-bottom: 3%;
`;

const NoticeAttachmentButtonText = styled.Text`
  color: #ffffff;
  font-weight: normal;
  font-size: 18;
`;

const BackButton = styled.TouchableOpacity`
  margin-left: 5%;
`;

const config = {
  WebViewComponent: WebView
};

const renderers = {
  table: makeTableRenderer(config)
};

const htmlConfig = {
  alterNode,
  renderers,
};

const NoticeViewer = ({ navigation }) => {
  useEffect(() => {
    if (navigation.getParam('content', null) === null) {
      Alert.alert('오류', `내용이 존재하지 않습니다!`, [
        {
          text: '확인',
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <TitleBar>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={18} color="#000000" />
        </BackButton>
        <Title>공지사항</Title>
      </TitleBar>
      <NoticeContainer>
        <NoticeTitle>{navigation.getParam('title')}</NoticeTitle>
        <NoticeContent
          html={navigation.getParam('content')}
          ignoredStyles={[
            'margin',
            'padding',
            'text-align',
            'font-family',
            'font-size',
            'line-height',
            'letter-spacing',
          ]}
          ignoredTags={['br', ...IGNORED_TAGS]}
          baseFontStyle={{ fontSize: 14, fontWeight: 'normal', color: '#4c4c4c' }}
          tagsStyles={{
            p: { lineHeight: 14 },
          }}
          allowFontScaling
          textSelectable
          {...htmlConfig}
        />
        {navigation.getParam('attachment') !== null && (
          <NoticeAttachmentContainer>
            <NoticeAttachmentTitle>첨부 파일이 있는 문서입니다.</NoticeAttachmentTitle>
            <NoticeAttachmentButton
              onPress={() =>
                navigation.navigate('DocumentViewer', {
                  title: '공지사항',
                  url: navigation.getParam('attachment'),
                })
              }
            >
              <NoticeAttachmentButtonText>첨부파일 보기</NoticeAttachmentButtonText>
            </NoticeAttachmentButton>
          </NoticeAttachmentContainer>
        )}
      </NoticeContainer>
    </Container>
  );
};

NoticeViewer.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default NoticeViewer;
