/*
    Model.kt
    @kentakang (2018-12-08)
    Retrofit 사용을 위한 모델
*/
package com.kentastudio.hanyang

object Model {
    data class Meal(val type: String, val food: String)
    data class Schedule(var schedule: String)
    data class Document(var title: String)
    data class MealList(val date: String, val meal: List<Model.Meal>)
    data class DocumentList(val title: String, val date: String)
    data class ScheduleList(val date: String, val schedule: String)
}