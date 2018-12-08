/*
    SettingActivity.kt
    @kentakang (2018-12-08)
    한양알림이의 설정 화면
*/
package com.kentastudio.hanyang

import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_settings.*

class SettingsActivity: AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_settings)

        val listItem = listOf(
            SettingsListItem("정보", "ic_outline_info_24px"),
            SettingsListItem("오픈소스 라이센스", "ic_outline_announcement_24px"))
        listView.adapter = ListViewAdapter(this, listItem)
        listView.setOnItemClickListener { parent, view, position, id ->
            when (position) {
                0 -> { startActivity(Intent(this, SettingsInfoActivity::class.java)) }
                1 -> { startActivity(Intent(this, SettingsOSSActivity::class.java)) }
            }
        }

        bottomNavigationView.selectedItemId = R.id.menuitem_bottombar_settings
        bottomNavigationView.setOnNavigationItemSelectedListener { item ->
            when (item.itemId) {
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
    }
}