package com.kentastudio.hanyang

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView

class ScheduleAdapter(val context: Context, val scheduleList: ArrayList<Model.ScheduleList>): RecyclerView.Adapter<ScheduleAdapter.Holder>() {
    override fun onBindViewHolder(holder: Holder, position: Int) {
        holder.bind(scheduleList[position], context)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val view = LayoutInflater.from(context).inflate(R.layout.list_schedule, parent, false)
        return Holder(view)
    }

    override fun getItemCount() = scheduleList.size

    inner class Holder(itemView: View?): RecyclerView.ViewHolder(itemView) {
        fun bind (schedule: Model.ScheduleList, context: Context) {
            itemView.findViewById<TextView>(R.id.scheduleDate).text = schedule.date
            itemView.findViewById<TextView>(R.id.scheduleText).text = schedule.schedule
        }
    }
}