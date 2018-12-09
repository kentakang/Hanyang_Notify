/*
    DocumentActivity.kt
    @kentakang (2018-12-08)
    한양알림이의 가정통신문 화면
*/
package com.kentastudio.hanyang

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_document.*
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.text.SimpleDateFormat
import java.util.*

class DocumentActivity : AppCompatActivity() {

    var documentList: ArrayList<Model.DocumentList> = ArrayList()
    var documentAdapter = DocumentAdapter(this, documentList) { documentList ->
        startActivity(Intent(this, DocumentViewActivity::class.java).putExtra("link", documentList.url))
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_document)

        bottomNavigationView.selectedItemId = R.id.menuitem_bottombar_document
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
                R.id.menuitem_bottombar_meal -> {
                    startActivity(Intent(this, MealActivity::class.java))
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

        documentListView.layoutManager = LinearLayoutManager(this)
        documentListView.adapter = documentAdapter
        addDocument()
    }

    private fun addDocument() {
        val apiClient = RestAPI.getRetrofitService(RetrofitService::class.java)
        var position = 0

        GlobalScope.launch {
            apiClient.getDocumentList().enqueue(object:
                Callback<List<Model.DocumentList>> {
                override fun onResponse(call: Call<List<Model.DocumentList>>, response: Response<List<Model.DocumentList>>) {
                    if (response.isSuccessful) {
                        response.body()!!.forEach {
                            val date = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(it.date)
                            documentList.add(Model.DocumentList(it.title, SimpleDateFormat("yyyy년 MM월 dd일").format(date), it.url))
                            documentAdapter.notifyItemInserted(position++)
                        }
                    }
                }

                override fun onFailure(call: Call<List<Model.DocumentList>>, t: Throwable) {
                    Toast.makeText(applicationContext, "네트워크 연결을 확인해주세요", Toast.LENGTH_SHORT)
                }
            })
            delay(100)
        }
    }
}