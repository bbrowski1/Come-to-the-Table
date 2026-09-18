export interface AndroidProjectFile {
  path: string;
  category: 'gradle' | 'manifest' | 'res' | 'data' | 'ui' | 'screens';
  code: string;
}

export const ANDROID_FILES: AndroidProjectFile[] = [
  {
    path: "build.gradle.kts",
    category: "gradle",
    code: `plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android)     apply false
    alias(libs.plugins.kotlin.ksp)         apply false
}`
  },
  {
    path: "settings.gradle.kts",
    category: "gradle",
    code: `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = "ComeToTheTable"
include(":app")`
  },
  {
    path: "app/build.gradle.kts",
    category: "gradle",
    code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.ksp)
}

android {
    namespace = "org.salvationarmy.cometothetable"
    compileSdk = 34

    defaultConfig {
        applicationId = "org.salvationarmy.cometothetable"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildFeatures {
        compose = true
    }

    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.11"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    val composeBom = platform("androidx.compose:compose-bom:2024.04.01")
    implementation(composeBom)
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")

    implementation("androidx.activity:activity-compose:1.9.0")
    implementation("androidx.navigation:navigation-compose:2.7.7")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0")
    implementation("androidx.lifecycle:lifecycle-runtime-compose:2.7.0")

    val roomVersion = "2.6.1"
    implementation("androidx.room:room-runtime:$roomVersion")
    implementation("androidx.room:room-ktx:$roomVersion")
    ksp("androidx.room:room-compiler:$roomVersion")

    implementation("com.google.code.gson:gson:2.10.1")
}`
  },
  {
    path: "app/src/main/AndroidManifest.xml",
    category: "manifest",
    code: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:allowBackup="false"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.ComeToTheTable">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.ComeToTheTable">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`
  },
  {
    path: "app/src/main/java/org/salvationarmy/cometothetable/MainActivity.kt",
    category: "ui",
    code: `package org.salvationarmy.cometothetable

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import org.salvationarmy.cometothetable.data.TopicRepository
import org.salvationarmy.cometothetable.data.db.AppDatabase
import org.salvationarmy.cometothetable.ui.screens.*
import org.salvationarmy.cometothetable.ui.theme.ComeToTheTableTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val repository = TopicRepository(this)
        val database = AppDatabase.getInstance(this)
        val noteDao = database.sessionNoteDao()

        setContent {
            ComeToTheTableTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val navController = rememberNavController()
                    NavHost(navController = navController, startDestination = "home") {
                        composable("home") { HomeScreen(navController) }
                        composable("topic_list") { TopicListScreen(navController, repository) }
                        composable("topic_detail/{topicId}") { backStackEntry ->
                            val topicId = backStackEntry.arguments?.getString("topicId") ?: return@composable
                            TopicDetailScreen(navController, repository, topicId)
                        }
                        composable("passage_search") { PassageSearchScreen(navController, repository) }
                        composable("session_runner/{topicId}") { backStackEntry ->
                            val topicId = backStackEntry.arguments?.getString("topicId") ?: return@composable
                            SessionRunnerScreen(navController, repository, topicId)
                        }
                        composable("add_note/{topicTitle}") { backStackEntry ->
                            val title = backStackEntry.arguments?.getString("topicTitle") ?: ""
                            AddNoteScreen(navController, noteDao, title)
                        }
                        composable("notes_list") { NotesListScreen(navController, noteDao) }
                        composable("leader_resources") { LeaderResourcesScreen(navController) }
                        composable("about") { AboutScreen(navController) }
                    }
                }
            }
        }
    }
}`
  },
  {
    path: "app/src/main/java/org/salvationarmy/cometothetable/data/Models.kt",
    category: "data",
    code: `package org.salvationarmy.cometothetable.data

data class ProgramData(
    val version: Int,
    val topics: List<Topic>,
    val globalPrompts: GlobalPrompts
)

data class Topic(
    val id: String,
    val number: Int,
    val title: String,
    val primaryPassage: String,
    val secondaryPassages: List<String>,
    val icebreaker: String,
    val questions: List<String>
)

data class GlobalPrompts(
    val together: String,
    val askHighsLows: String,
    val readTheBible: List<String>,
    val liveIt: String,
    val pray: String,
    val emptyChair: String
)`
  },
  {
    path: "app/src/main/java/org/salvationarmy/cometothetable/data/db/SessionNote.kt",
    category: "data",
    code: `package org.salvationarmy.cometothetable.data.db

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "session_notes")
data class SessionNote(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0L,
    val dateMillis: Long = System.currentTimeMillis(),
    val topicTitle: String,
    val noteText: String
)`
  }
];
