package com.kentakang.hanyangnotify;

import android.app.AlarmManager;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.method.ScrollingMovementMethod;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.TextView;

import com.google.firebase.messaging.FirebaseMessaging;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    // Components of activity_main.xml
    private ImageButton drawerButton;
    private DrawerLayout drawerLayout;

    // Components of activity_drawer.xml
    private ListView drawerListView;
    private ListView settingDrawerListView;

    // Drawer 내부 ListView에 추가할 요소들
    private String[] settingDrawerList = {"정보"};

    // 메인 화면 RecyclerView 및 CardView 요소
    private RecyclerView recyclerView;
    private LinearLayoutManager layoutManager;
    private List<Item> items;

    // 파싱 시 사용
    private Meal meal = new Meal();
    private Schedule schedule = new Schedule();
    private Document document = new Document();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Firebase 주제 구독
        FirebaseMessaging.getInstance().subscribeToTopic("ALL");

        // Java 코드에서 사용하는 Activity 연결
        drawerButton = findViewById(R.id.drawerButton);
        drawerLayout = findViewById(R.id.drawerLayout);
        drawerListView = findViewById(R.id.drawerList);
        settingDrawerListView = findViewById(R.id.drawerSetting);

        // Drawer에서 사용하는 ListView에 리스트 추가
        ArrayAdapter<String> settingAdapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, settingDrawerList);
        settingDrawerListView.setAdapter(settingAdapter);

        // ListView 클릭 이벤트
        settingDrawerListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(MainActivity.this, InfoActivity.class);
                startActivity(intent);
            }
        });

        // 메인에서 사용하는 RecyclerView 및 CardView 설정
        recyclerView = (RecyclerView) findViewById(R.id.mainRecycler);
        layoutManager = new LinearLayoutManager(getApplicationContext());
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(layoutManager);

        // 급식 데이터 파싱
        meal.start();

        try {
            meal.join();
        } catch (Exception e) {
            Log.d("log", e.toString());
        }

        // 학사일정 파싱
        schedule.start();

        try {
            schedule.join();
        } catch (Exception e) {
            Log.d("log", e.toString());
        }

        // 가정통신문 파싱
        document.start();

        try {
            document.join();
        } catch (Exception e) {
            Log.d("log", e.toString());
        }

        // CardView에 아이템 추가
        items = new ArrayList<>();
        Item[] item = new Item[3];
        item[0] = new Item("오늘의 급식", meal.parseJSON(meal.getResult()));
        item[1] = new Item("학사일정", schedule.parseJSON(schedule.getResult()));
        item[2] = new Item("최신 가정통신문", document.parseJSON(document.getResult()));

        for (int i = 0; i < item.length; i++) {
            items.add(item[i]);
        }

        recyclerView.setAdapter(new RecyclerAdapter(getApplicationContext(), items, R.layout.activity_main));


        // 상단 바 햄버거 버튼 클릭 시
        drawerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                drawerLayout.openDrawer(findViewById(R.id.drawer));
            }
        });
    }

    public class AlarmService {
        private Context context;

        public AlarmService(Context context) {
            this.context = context;
        }

        public void Alarm() {
            AlarmManager am = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
            Intent intent = new Intent(MainActivity.this, PushService.class);

            PendingIntent sender = PendingIntent.getBroadcast(MainActivity.this, 0, intent, 0);
            Calendar calendar = Calendar.getInstance();
            calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DATE), 23, 10, 0);

            am.set(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), sender);
        }
    }
}
