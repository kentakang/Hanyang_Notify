package com.kentastudio.hanyang

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView

class DocumentAdapter(val context: Context, private val documentList: ArrayList<Model.DocumentList>): RecyclerView.Adapter<DocumentAdapter.Holder>() {
    override fun onBindViewHolder(holder: Holder, position: Int) {
        holder.bind(documentList[position], context)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val view = LayoutInflater.from(context).inflate(R.layout.list_document, parent, false)
        return Holder(view)
    }

    override fun getItemCount() = documentList.size

    inner class Holder(itemView: View?): RecyclerView.ViewHolder(itemView) {
        fun bind (document: Model.DocumentList, context: Context) {
            itemView.findViewById<TextView>(R.id.documentTitle).text = document.title
            itemView.findViewById<TextView>(R.id.documentDate).text = document.date
        }
    }
}