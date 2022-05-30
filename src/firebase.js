//firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    // firebase 설정과 관련된 개인 정보
    apiKey: "AIzaSyDlZcEhDm28n_pC_ZvnY3a0MolL6ofQ97c",
  authDomain: "sparta-wordnote.firebaseapp.com",
  projectId: "sparta-wordnote",
  storageBucket: "sparta-wordnote.appspot.com",
  messagingSenderId: "786917240199",
  appId: "1:786917240199:web:4caf407b94682e2f433722",
  measurementId: "G-PG66D8Y9CJ"
};

// firebaseConfig 정보로 firebase 시작
initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const db = getFirestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { db };