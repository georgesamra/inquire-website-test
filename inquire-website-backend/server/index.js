// server/index.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfGotdK4N-Odi-GBL2xu-6jATGn8xI4E4",
  authDomain: "scripture-engagement.firebaseapp.com",
  projectId: "scripture-engagement",
  storageBucket: "scripture-engagement.firebasestorage.app",
  messagingSenderId: "320478866200",
  appId: "1:320478866200:web:093d64534079b7a4e84c6d",
  measurementId: "G-HVC3VG0GL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const express = require("express");

const cors = require("cors");

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(cors());


let books = [["Genesis", 50], ["Exodus", 40], ["Leviticus", 27], ["Numbers", 36], ["Deuteronomy", 34],
                                    ["Joshua", 24], ["Judges", 21], ["Ruth", 4], ["1 Samuel", 31], ["2 Samuel", 24], ["1st Kings", 22], ["2nd Kings", 25],
                                    ["1 Chronicles", 29], ["2 Chronicles", 36], ["Ezra", 10], ["Nehemiah", 13], ["Esther", 10], ["Job", 42],
                                    ["Psalms", 150], ["Proverbs", 31], ["Ecclesiastes", 12], ["Song of Solomon", 8],
                                    ["Isaiah", 66], ["Jeremiah", 52], ["Lamentations", 5],
                                    ["Ezekiel", 48], ["Daniel", 12], ["Hosea", 14], ["Joel", 3], ["Amos", 9], ["Obadiah", 1], ["Jonah", 4], ["Micah", 7], ["Nahum", 3],
                                    ["Habakkuk", 3], ["Zephaniah", 3], ["Haggai", 2], ["Zechariah", 14], ["Malachi", 4],
                                    ["Matthew", 28], ["Mark", 16], ["Luke", 24], ["John", 21], ["Acts", 28],
                                    ["Romans", 16], ["1 Corinthians", 16], ["2nd Corinthians", 13],
                                    ["Galatians", 6], ["Ephesians", 6], ["Philippians", 4], ["Colossians", 4], ["1 Thessalonians", 5], ["2 Thessalonians", 3],
                                    ["1 Timothy", 6], ["2 Timothy", 4], ["Titus", 3], ["Philemon", 1], ["Hebrews", 13], ["James", 5], ["1 Peter", 5], ["2 Peter", 3],
                                    ["1 John", 5], ["2 John", 1], ["3 John", 1], ["Jude", 1], ["Revelation", 22]];
let bHubBooksLinks = ["genesis", "exodus", "leviticus", "numbers", "deuteronomy",
                                "joshua", "judges", "ruth", "1_samuel", "2_samuel", "1_kings", "2_kings",
                                "1_chronicles", "2_chronicles", "ezra", "nehemiah", "esther", "job",
                                "psalms", "proverbs", "ecclesiastes", "songs", "isaiah", "jeremiah", "lamentations",
                                "ezekiel", "daniel", "hosea", "joel", "amos", "obadiah", "jonah", "micah", "nahum",
                                "habakkuk", "zephaniah", "haggai", "zechariah", "malachi", "matthew", "mark", "luke", "john", "acts",
                                "romans", "1_corinthians", "2_corinthians", "galatians", "ephesians", "philippians", "colossians",
                                "1_thessalonians", "2_thessalonians", "1_timothy", "2_timothy", "titus", "philemon", "hebrews",
                                "james", "1_peter", "2_peter", "1_john", "2_john", "3_john", "jude", "revelation"]
let youversionBooksLinks = ["GEN", "EXO", "LEV", "NUM", "DEU", "JOS", "JDG", "RUT", "1SA", "2SA",
                                      "1KI", "2KI", "1CH", "2CH", "EZR", "NEH", "EST", "JOB", "PSA", "PRO", "ECC", "SNG", "ISA", "JER", "LAM",
                                      "EZK", "DAN", "HOS", "JOL", "AMO", "OBA", "JON", "MIC", "NAM", "HAB", "ZEP", "HAG", "ZEC", "MAL",
                                      "MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL", "EPH", "PHP", "COL", "1TH", "2TH",
                                      "1TI", "2TI", "TIT", "PHM", "HEB", "JAS", "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV"]
let revelation2Churches = ["Ephesus", "Smryna", "Pergamum", "Thyatira"]
let revelation3Churches = ["Sardis", "Philadelphia", "Laodicea"]


async function GetRN(min, max) {
  const apiKey = "bb72b42e-760c-4535-a20e-c719a19c75f5";

  const data = await fetch('https://api.random.org/json-rpc/4/invoke', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "jsonrpc": "2.0", 
          "method": "generateIntegers", 
          "params": {"apiKey": apiKey, "n": 1, "min": min,"max": max}, 
          "id": 14842
      })
  });
  const data2 = await data.json();
  const randomNum = data2.result.random.data[0];
  return randomNum;
}

const GetBook = async (scriptureType) => {
  var book = "";
  var chapDisplay = "";
  var bookNum;
  var chap;
  if (scriptureType != "psalm") {  
    bookNum = await GetRN(0,65);
    book = books[bookNum][0];
    if (scriptureType == "chapter"){
      const chapNum = Number(books[bookNum][1]);
      chap = await GetRN(1, chapNum);
      chapDisplay = " " + String(chap);
      
    }
  } else {
    bookNum = 18;
    chap = await GetRN(1, 150);
    book = "Psalm";
    chapDisplay = " " + String(chap);
  } 
  console.log(bookNum);
  var passage = book + String(chapDisplay);
  let bibleLink = `https://www.bible.com/bible/111/${youversionBooksLinks[bookNum]}.${chap}."Niv"`
  return [passage, bibleLink]
};



app.post("/passage", async (req, res) => {
  let scriptureType = req.body.scripturetype;
  let randomOutput = await GetBook(scriptureType)
  console.log(randomOutput);
  res.json(
    { 
      book: randomOutput[0],
      link: randomOutput[1]
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});