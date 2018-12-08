package com.kentastudio.hanyang

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import java.text.FieldPosition

class MealAdapter(val context: Context, val mealList: ArrayList<Model.MealList>): RecyclerView.Adapter<MealAdapter.Holder>() {
    override fun onBindViewHolder(holder: Holder, position: Int) {
        holder.bind(mealList.get(position), context)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val view = LayoutInflater.from(context).inflate(R.layout.list_meal, parent, false)
        return Holder(view)
    }

    override fun getItemCount() = mealList.size

    inner class Holder(itemView: View?): RecyclerView.ViewHolder(itemView) {
        fun bind (meal: Model.MealList, context: Context) {
            itemView.findViewById<TextView>(R.id.date).text = meal.date
            meal.meal.forEach {
                when (it.type) {
                    "lunch" -> itemView.findViewById<TextView>(R.id.lunchText).text = it.food
                    "dinner" -> itemView.findViewById<TextView>(R.id.dinnerText).text = it.food
                }
            }
        }
    }
}