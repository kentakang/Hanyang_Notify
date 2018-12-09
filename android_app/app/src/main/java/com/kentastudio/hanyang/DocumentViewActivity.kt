package com.kentastudio.hanyang

import android.graphics.Color
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.MenuItem
import android.view.View
import android.webkit.WebViewClient
import kotlinx.android.synthetic.main.activity_document_view.*

class DocumentViewActivity: AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_document_view)

        setSupportActionBar(findViewById(R.id.toolbar_default))
        supportActionBar!!.setDisplayShowTitleEnabled(false)
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)
        window.statusBarColor = Color.WHITE
        window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR

        documentWebView.settings.javaScriptEnabled = true
        //documentWebView.loadUrl("file:///android_asset/oss_license.html")
        documentWebView.webViewClient = WebViewClient()
        documentWebView.setInitialScale(100)
        documentWebView.settings.setSupportZoom(true)
        documentWebView.loadUrl("${intent.getStringExtra("link")}")
    }

    override fun onOptionsItemSelected(item: MenuItem?): Boolean {
        when (item!!.itemId) {
            android.R.id.home -> finish()
        }

        return super.onOptionsItemSelected(item)
    }
}