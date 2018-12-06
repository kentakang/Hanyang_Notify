/*
    Document.java
    가정통신문 데이터를 파싱하는 클래스입니다.
 */
package com.kentakang.hanyangnotify;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.ConnectException;
import java.net.HttpURLConnection;
import java.net.URL;

public class Document extends Thread {
    private String result;
    private String documentURL = "http://kentastudio.com:8888/document";

    public Document() {
        result = new String();
    }

    public void run() {
        try {
            URL url = new URL(documentURL);
            HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();

            httpURLConnection.setReadTimeout(3000);
            httpURLConnection.setConnectTimeout(3000);
            httpURLConnection.setDoInput(true);
            httpURLConnection.setRequestMethod("GET");
            httpURLConnection.connect();

            int responseCode = httpURLConnection.getResponseCode();

            InputStream inputStream;

            if (responseCode == HttpURLConnection.HTTP_OK) {
                inputStream = httpURLConnection.getInputStream();
            } else {
                inputStream = httpURLConnection.getErrorStream();
            }

            InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "EUC-KR");
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);

            StringBuilder stringBuilder = new StringBuilder();
            String line;

            while ((line = bufferedReader.readLine()) != null) {
                stringBuilder.append(line);
            }

            bufferedReader.close();
            httpURLConnection.disconnect();

            result = stringBuilder.toString().trim();
        } catch(ConnectException e) {
            Log.d("Error", e.toString());
            result = "인터넷 연결이 필요합니다.";
        } catch (Exception e) {
            Log.d("Error", e.toString());
            result = "앱을 다시 실행해주세요.";
        }
    }

    public String getResult() {
        return result;
    }

    public String parseJSON(String data) {
        StringBuffer sb = new StringBuffer();

        try {
            JSONArray jsonArray = new JSONArray(data);

            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                String title = jsonObject.getString("title");
                String date = jsonObject.getString("date");

                sb.append(title + "\n" + date);
            }
        } catch (JSONException e) {
            Log.d("Error", e.toString());
        }

        return sb.toString().replaceAll(",", "\n");
    }
}
