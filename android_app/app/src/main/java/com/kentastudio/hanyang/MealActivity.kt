/*
    MealActivity.kt
    @kentakang (2018-12-08)
    한양알림이의 급식 화면
*/
package com.kentastudio.hanyang

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.util.Log
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_meal.*
import kotlinx.coroutines.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.text.SimpleDateFormat
import java.util.*

class MealActivity : AppCompatActivity() {

    var meallist: ArrayList<Model.MealList> = ArrayList()
    var mealAdapter = MealAdapter(this, meallist)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_meal)

        bottomNavigationView.selectedItemId = R.id.menuitem_bottombar_meal
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
                R.id.menuitem_bottombar_schedule -> {
                    startActivity(Intent(this, ScheduleActivity::class.java))
                    overridePendingTransition(R.anim.abc_fade_in, R.anim.abc_fade_out)
                    finish()
                }
            }
            true
        }

        mealList.layoutManager = LinearLayoutManager(this)
        mealList.adapter = mealAdapter
        addMeal()
    }

    private fun addMeal() {
        val apiClient = RestAPI.getRetrofitService(RetrofitService::class.java)
        val calendar = Calendar.getInstance()
        var position = 0

        calendar.time = Date(System.currentTimeMillis())

        GlobalScope.launch {
            repeat(calendar.getActualMaximum(Calendar.DAY_OF_MONTH)) { i ->
                val innerDay = "${calendar.get(Calendar.YEAR)}-${calendar.get(Calendar.MONTH) + 1}-$i"
                val innerDate = SimpleDateFormat("yyyy-MM-dd").parse(innerDay)
                var innerCalendar = Calendar.getInstance()

                innerCalendar.time = innerDate

                Log.d("TAG", innerDay)

                when (innerCalendar.get(Calendar.DAY_OF_WEEK)) {
                    in 2..6 -> {
                        apiClient.getMeal(innerDay).enqueue(object : Callback<List<Model.Meal>> {
                            override fun onResponse(call: Call<List<Model.Meal>>, response: Response<List<Model.Meal>>) {
                                if (response.isSuccessful) {
                                    val url = response.raw().request().url().toString()
                                    val dateFormat = SimpleDateFormat("yyyy-MM-dd")
                                    val date = dateFormat.parse(url.substring(url.lastIndexOf('/') + 1))
                                    meallist.add(Model.MealList(SimpleDateFormat("MM월 dd일 (E)").format(date), response.body()!!))
                                    mealAdapter.notifyItemInserted(position++)
                                }
                            }

                            override fun onFailure(call: Call<List<Model.Meal>>, t: Throwable) {
                                Toast.makeText(applicationContext, "네트워크 연결을 확인해주세요", Toast.LENGTH_SHORT).show()
                            }
                        })
                    }
                }
                delay(50)
            }
        }
    }
}