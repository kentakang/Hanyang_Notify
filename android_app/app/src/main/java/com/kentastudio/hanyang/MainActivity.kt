/*
    MainActivity.kt
    @kentakang (2018-12-08)
    한양알림이의 메인 화면
*/
package com.kentastudio.hanyang

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.text.SimpleDateFormat
import java.util.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val apiClient = RestAPI.getRetrofitService(RetrofitService::class.java) // Retrofit API 설정

        // Retrofit을 통한 급식 가져오기
        apiClient.getMeal(SimpleDateFormat("yyyy-MM-dd").format(Date(System.currentTimeMillis()))).enqueue(object: Callback<List<Model.Meal>> {
            override fun onResponse(call: Call<List<Model.Meal>>, response: Response<List<Model.Meal>>) {
                if (response.isSuccessful) {
                    response.body()!!.forEach {
                        when (it.type) {
                            "lunch" -> lunchText.text = it.food.substring(0, it.food.length - 1)
                            "dinner" -> dinnerText.text = it.food.substring(0, it.food.length - 1)
                        }
                    }
                }
            }

            override fun onFailure(call: Call<List<Model.Meal>>, t: Throwable) {
                Toast.makeText(applicationContext, "네트워크 연결을 확인해주세요", Toast.LENGTH_SHORT).show()
            }
        })

        // 학사일정 가져오기
        apiClient.getSchedule(SimpleDateFormat("yyyy-MM-dd").format(Date(System.currentTimeMillis()))).enqueue(object: Callback<Model.Schedule> {
            override fun onResponse(call: Call<Model.Schedule>, response: Response<Model.Schedule>) {
                if (response.isSuccessful) {
                    scheduleText.text = response.body()!!.schedule
                }
            }

            override fun onFailure(call: Call<Model.Schedule>, t: Throwable) {
                Toast.makeText(applicationContext, "네트워크 연결을 확인해주세요", Toast.LENGTH_SHORT).show()
            }
        })

        // 가정통신문 가져오기
        apiClient.getDocument().enqueue(object: Callback<Model.Document> {
            override fun onResponse(call: Call<Model.Document>, response: Response<Model.Document>) {
                if (response.isSuccessful) {
                    documentText.text = response.body()!!.title
                }
            }

            override fun onFailure(call: Call<Model.Document>, t: Throwable) {
                Toast.makeText(applicationContext, "네트워크 연결을 확인해주세요", Toast.LENGTH_SHORT).show()
            }
        })

        // 하단 네비게이션 터치 시 액션 설정
        bottomNavigationView.setOnNavigationItemSelectedListener { item ->
            when (item.itemId) {
                R.id.menuitem_bottombar_settings -> {
                    startActivity(Intent(this, SettingsActivity::class.java))
                    overridePendingTransition(R.anim.abc_fade_in, R.anim.abc_fade_out)
                    finish()
                }
                R.id.menuitem_bottombar_meal -> {
                    startActivity(Intent(this, MealActivity::class.java))
                    overridePendingTransition(R.anim.abc_fade_in, R.anim.abc_fade_out)
                    finish()
                }
                R.id.menuitem_bottombar_document -> {
                    startActivity(Intent(this, DocumentActivity::class.java))
                    overridePendingTransition(R.anim.abc_fade_in, R.anim.abc_fade_out)
                    finish()
                }
                R.id.menuitem_bottombar_schedule -> {
                    startActivity(Intent(this, ScheduleActivity::class.java))
                    overridePendingTransition(R.anim.abc_fade_in, R.anim.abc_fade_out)
                    finish()
                }
            }
            true
        }

        // 메인 화면 날짜 표시
        date.text = SimpleDateFormat("MM월 dd일 E요일").format(Date(System.currentTimeMillis()))
    }
}