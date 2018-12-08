/*
    RetrofitService.kt
    @kentakang (2018-12-08)
    Retrofit을 통해 API 파싱 시 사용하는 API
*/
package com.kentastudio.hanyang

import kotlinx.coroutines.Deferred
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path

interface RetrofitService {
    @GET("/api/meal/{date}")
    fun getMeal(@Path("date") date: String): Call<List<Model.Meal>>

    @GET("/api/schedule/{date}")
    fun getSchedule(@Path("date") date: String): Call<Model.Schedule>

    @GET("/api/document")
    fun getDocument(): Call<Model.Document>

    @GET("/api/document/all")
    fun getDocumentList(): Call<List<Model.DocumentList>>
}