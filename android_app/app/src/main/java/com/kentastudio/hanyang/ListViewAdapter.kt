/*
    ListViewAdapter.kt
    @kentakang (2018-12-08)
    설정 화면에서 사용하는 ListView를 위한 어댑터
*/
package com.kentastudio.hanyang

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.ImageView
import android.widget.TextView

class ListViewAdapter constructor(context: Context, data: List<SettingsListItem>): BaseAdapter() {

    private val data: List<SettingsListItem> = data
    private val inflator: LayoutInflater = LayoutInflater.from(context)
    private val context = context

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View? {
        var view: View?

        if (convertView == null) {
            view = this.inflator.inflate(R.layout.list_settings, parent, false)
            view.findViewById<TextView>(R.id.list_settings_title).text = data[position].title
            view.findViewById<ImageView>(R.id.list_settings_item).setImageResource(
                context.resources.getIdentifier(data[position].icon, "drawable", this.context.packageName)
            )
        } else {
            view = convertView
        }

        return view
    }

    override fun getItem(position: Int): Any? = data[position]

    override fun getItemId(position: Int): Long = position.toLong()

    override fun getCount(): Int = data.size
}