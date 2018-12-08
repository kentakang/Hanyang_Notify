/*
    RestAPI.kt
    @kentakang (2018-12-08)
    Retrofit 빌더
*/
package com.kentastudio.hanyang

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RestAPI {
    private var retrofit: Retrofit

    init {
        retrofit = Retrofit.Builder().apply {
            baseUrl("http://hanyang.kentastudio.com")
            addConverterFactory(GsonConverterFactory.create())
        }.build()
    }

    internal fun <T> getRetrofitService(restClass: Class<T>): T {
        return retrofit.create(restClass)
    }
}