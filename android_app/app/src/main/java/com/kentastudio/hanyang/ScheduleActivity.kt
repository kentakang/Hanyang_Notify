/*
    ScheduleActivity.kt
    @kentakang (2018-12-08)
    한양알림이의 학사일정 화면
*/
package com.kentastudio.hanyang

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.util.Log
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_schedule.*
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.text.SimpleDateFormat
import java.util.*

class ScheduleActivity : AppCompatActivity() {

    var scheduleList: ArrayList<Model.ScheduleList> = ArrayList()
    var scheduleAdapter = ScheduleAdapter(this, scheduleList)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_schedule)

        bottomNavigationView.selectedItemId = R.id.menuitem_bottombar_schedule
        bottomNavigationView.setOnNavigationItemSelectedListener { item ->
            when (item.itemId) {
                R.id.menuitem_bottombar_settings -> {
                    startActivity(Intent(this, SettingsActivity::class.java))
                    overridePendingTransition(R.anim.abc_fade_in, R.anim.abc_fade_out)
                    finish()
                }
                R.id.menuitem_bottombar_home -> {
                    startActivity(Intent(this, MainActivity::class.java))
                    overridePendingTransition(R.anim.abc_fade_in, R.anim.abc_fade_out)
                    finish()
                }
                R.id.menuitem_bottombar_document -> {
                    startActivity(Intent(this, DocumentActivity::class.java))
                    overridePendingTransition(R.anim.abc_fade_in, R.anim.abc_fade_out)
                    finish()
                }
                R.id.menuitem_bottombar_meal -> {
                    startActivity(Intent(this, MealActivity::class.java))
                    overridePendingTransition(R.anim.abc_fade_in, R.anim.abc_fade_out)
                    finish()
                }
            }
            true
        }

        scheduleListView.layoutManager = LinearLayoutManager(this)
        scheduleListView.adapter = scheduleAdapter
        addSchedule()
    }

    private fun addSchedule() {
        val apiClient = RestAPI.getRetrofitService(RetrofitService::class.java)
        val calendar = Calendar.getInstance()
        var position = 0

        calendar.time = Date(System.currentTimeMillis())

        GlobalScope.launch {
            for (i in 1..calendar.getActualMaximum(Calendar.DAY_OF_MONTH)) {

                var date = ""

                when (i) {
                    in 1..9 -> date = "0$i"
                    else -> date = "$i"
                }

                apiClient.getSchedule(SimpleDateFormat("yyyy-MM-$date").format(System.currentTimeMillis())).enqueue(object : Callback<Model.Schedule> {
                    override fun onResponse(call: Call<Model.Schedule>, response: Response<Model.Schedule>) {
                        if (response.isSuccessful) {
                            val url = response.raw().request().url().toString()
                            val dateFormat = SimpleDateFormat("yyyy-MM-dd")
                            val date = dateFormat.parse(url.substring(url.lastIndexOf('/') + 1))
                            scheduleList.add(Model.ScheduleList(SimpleDateFormat("MM월 dd일 (E)").format(date), response.body()!!.schedule))
                            scheduleAdapter.notifyItemInserted(position++)
                        }
                    }

                    override fun onFailure(call: Call<Model.Schedule>, t: Throwable) {
                        Toast.makeText(applicationContext, "네트워크 연결을 확인해주세요", Toast.LENGTH_SHORT)
                    }
                })
                delay(80)
            }
        }
    }
}