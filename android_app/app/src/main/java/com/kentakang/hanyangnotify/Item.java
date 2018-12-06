package com.kentakang.hanyangnotify;

public class Item {
    String title;
    String content;

    String getTitle() {
        return this.title;
    }

    String getContent() {
        return this.content;
    }

    Item(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
