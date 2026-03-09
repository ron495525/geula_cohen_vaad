"use strict";

const EPISODE_1 = {
  id: 1,
  title: "המעלית",
  emoji: "💀",
  subtitle: "שבוע ללא מעלית. מרים לא שכחה.",
  goal: "תקן את המעלית לפני שהוועד מתפרק",
  goalProgress: 0,

  // Characters active in this episode (subset of CHARACTERS)
  activeChars: ["uri", "miriam", "yossi", "liat", "valentina"],

  // Initial relationship scores
  initialScores: {
    uri: 50, miriam: 50, yossi: 50, liat: 50, valentina: 50
  },

  // Date label shown in chat header
  dateLabel: "היום, יום שני",

  beats: [
    // ========== BEAT 1: THE INCITING EVENT ==========
    {
      id: "beat_1",
      messages: [
        { from: "uri",       text: 'שלום לכולם 👋 כידוע, המעלית מקולקלת כבר שבוע. קיבלנו הצעת מחיר לתיקון — עלות משוערת: <strong>3,200 ש"ח</strong>. יש צורך להצביע. ✓✓', delay: 700,  typingMs: 1600 },
        { from: "miriam",    text: 'שבוע?! שָׁבוּעַיִים!! 😡 אני עם ארבע שקיות מהסופר ולא מסוגלת לעלות לקומה 3!! מישהו אכפת לו בכלל?? יש פה ועד או סיפור??',           delay: 300,  typingMs: 2000 },
        { from: "yossi",     text: '👍', delay: 200, typingMs: 900, isEmoji: true },
        { from: "valentina", text: 'סליחה אני לא הבינה... מה זה "כידוע"? 😅 לא ידעתי על זה. רק הגעתי הביתה מהעבודה',                                                   delay: 300,  typingMs: 1500 },
        { from: "uri",       text: '"כידוע" = כפי שכולנו יודעים. זה ביטוי רשמי. ולנטינה — המעלית קלקלה לפני 13 יום 📋',                                                 delay: 200,  typingMs: 1400 },
        { from: "miriam",    text: '13 יום!! אני אמרתי שבועיים!! מישהו כאן מאזין??',                                                                                       delay: 200,  typingMs: 1000 },
        { from: "yossi",     text: '😂', delay: 200, typingMs: 700, isEmoji: true }
      ],
      choices: [
        {
          text: 'היי לכולם! אני שכן חדש — שמח לעזור בנושא המעלית 😊 יש משהו שאני יכול לעשות?',
          effects: { miriam: +12, uri: +10, valentina: +18 },
          goalDelta: 15,
          next: "beat_2",
          path: null
        },
        {
          text: '3,200?? זה לא יקר מדי? צריך לקבל לפחות שתי הצעות מחיר נוספות 🤔',
          effects: { yossi: +12, uri: -10, miriam: -6 },
          goalDelta: 5,
          next: "beat_2",
          path: null
        },
        {
          text: '👍',
          effects: { yossi: +18, miriam: -20 },
          goalDelta: 0,
          next: "beat_2",
          path: "thumbs"
        }
      ]
    },

    // ========== BEAT 1 REACTIONS (branched by path) ==========
    {
      id: "beat_2",
      branchMessages: {
        "thumbs": [
          { from: "yossi",  text: '😂😂 ניצחת אותי בלייזי', delay: 200, typingMs: 900 },
          { from: "miriam", text: 'שכן חדש!! זה הכל מה שיש לך להגיד?! 👍?! 😤😤', delay: 200, typingMs: 1400 }
        ],
        "default": [
          { from: "uri",       text: 'תודה לשכן החדש! נשמח לשמוע עוד קולות בוועד 💪', delay: 200, typingMs: 1400 },
          { from: "valentina", text: 'כן כן! שכן חדש נחמד מאוד! 😊',                 delay: 200, typingMs: 900  }
        ]
      },
      autoNext: "beat_3"
    },

    // ========== BEAT 3: THE DOG DRAMA ==========
    {
      id: "beat_3",
      messages: [
        { from: "liat",   text: 'אנחנו בעצם תמיד לוקחים מדרגות כי ניצן צריך לצאת 🐕 אז לא ממש משפיע עלינו... אבל כן תקנו בשביל כולם!',             delay: 400, typingMs: 1600 },
        { from: "miriam", text: 'ניצן!! 😤 הכלב שלכם עשה שוב על הסף של קומה 2!! זה לא בית — זה לא חווה — זה בניין מגורים!!',                        delay: 300, typingMs: 2100 },
        { from: "liat",   text: 'מרים, הוא גור 🥺 הוא עדיין לומד. אנחנו מתאמנים איתו כל יום, מבטיחה!',                                              delay: 200, typingMs: 1400 },
        { from: "miriam", text: 'הוא לומד?!! הוא כבר שנה בבניין!! מתי בדיוק הוא יגמור ללמוד?! יש לו תוכנית לימודים? מסלול? סיום שנה?! 📚😤',       delay: 200, typingMs: 2300 },
        { from: "liat",   text: 'ניצן הוא לא ילד, הוא כלב 😅 כלבים לוקחים יותר זמן—',                                                               delay: 200, typingMs: 1200 },
        { from: "miriam", text: 'כל כלב שאני מכירה לא עשה על המדרגות אחרי שנה!! 🚫🐕',                                                               delay: 200, typingMs: 1100 },
        { from: "yossi",  text: '...🍿', delay: 200, typingMs: 800 }
      ],
      choices: [
        {
          text: 'ניצן כל כך חמוד 🐕 ראיתי אותו אתמול בכניסה — ממש מגניב!',
          effects: { liat: +18, miriam: -20 },
          goalDelta: 0,
          next: "beat_4",
          path: null
        },
        {
          text: 'אולי פשרה: ניצן יוצא רק דרך הכניסה הצדדית? כדי לשמור על שקט לכולם 🤝',
          effects: { liat: +8, miriam: +10, uri: +7 },
          goalDelta: 12,
          next: "beat_4",
          path: null
        },
        {
          text: '[לא מגיב — ממשיך לקרוא]',
          effects: { liat: -12, miriam: -12 },
          goalDelta: -5,
          next: "beat_4",
          path: "silent"
        }
      ]
    },

    // ========== BEAT 4: POST-DOG REACTIONS ==========
    {
      id: "beat_4",
      branchMessages: {
        "silent": [
          { from: "miriam", text: 'שכן חדש גם שותק?! מושלם. עוד אחד. 😑',           delay: 200, typingMs: 1200 },
          { from: "liat",   text: 'כולם בוחרים צד חוץ ממנו... 😢',                    delay: 200, typingMs: 900  }
        ],
        "default": [
          { from: "miriam",    text: 'בכל מקרה — הנושא הזה לא נגמר! אני מצפה לתשובה רשמית מהוועד!',                                                          delay: 200, typingMs: 1400 },
          { from: "uri",       text: 'מרים, נכלול את זה בסדר יום האסיפה הבאה. 📋',                                                                             delay: 200, typingMs: 1000 },
          { from: "valentina", text: 'מה זה "אסיפה"? כמו собрание? 🤔 גם בנין שלנו עשה! רק שאיש לא הגיע 😅',                                                  delay: 200, typingMs: 1400 },
          { from: "miriam",    text: 'ולנטינה יקירה, כן — בדיוק. ופה אנחנו נגיע. כולם. 👀',                                                                    delay: 200, typingMs: 1200 }
        ]
      },
      autoNext: "beat_5"
    },

    // ========== BEAT 5: THE VOTE ==========
    {
      id: "beat_5",
      messages: [
        { from: "uri",    text: 'חברים, בואו נחזור לנושא המעלית 🏗️ אני מציע להצביע רשמית: מי <strong>בעד</strong> לאשר תיקון בעלות 3,200 ש"ח?', delay: 500, typingMs: 2000 },
        { from: "uri",    text: '✋ בעד — אורי, קומה 4',                                                                                          delay: 200, typingMs: 600  },
        { from: "miriam", text: '✋ בעד!! (ואגב — מי שילם חשבון מים מאי?! אני עדיין ממתינה לתשובה 👀)',                                           delay: 200, typingMs: 1600 },
        { from: "liat",   text: '✋ אנחנו בעד! אבל בתנאי שנוסיף לסדר יום גם <strong>תקנון כלבים</strong> בבניין 🐾 זה גם חשוב',                   delay: 200, typingMs: 1800 },
        { from: "_notify",text: 'יוסי ראה את כל ההודעות... 👀 אבל עדיין לא ענה', delay: 2800, typingMs: 0 },
        { from: "valentina", text: 'מה זה "מניין"? צריך מינימום כמה? 🙃',                                                                        delay: 300, typingMs: 1500 },
        { from: "uri",    text: '"מניין" = מספר מינימלי של מצביעים. בוועד שלנו: 4 מתוך 6 בעלי דירות. יש לנו 3. חסר בדיוק <strong>עוד אחד</strong> 🎯', delay: 200, typingMs: 1800 },
        { from: "valentina", text: 'אה ז-ז-זה כמו kvorum ברוסית!! 😄 הייתי בדירת שותפים ברוסיה וגם עשינו הצבעות — אף אחד לא הגיע 😂',            delay: 200, typingMs: 1400 }
      ],
      choices: [
        {
          text: '✋ בעד! נשלים את המניין ונתקן את המעלית! 💪',
          effects: { uri: +18, miriam: +12, valentina: +8 },
          goalDelta: 45,
          next: "beat_6_vote",
          path: "vote"
        },
        {
          text: 'לפני שמצביעים — מי בדיוק מכסה את העלות? שוכרים? בעלי דירות? יש תקנון? 🤔',
          effects: { uri: -8, yossi: +12, valentina: +10, liat: +5 },
          goalDelta: 18,
          next: "beat_6_negotiate",
          path: "negotiate"
        },
        {
          text: '@יוסי אחי, מה אתה חושב? כולם מחכים לך 😄',
          effects: { yossi: +20, uri: +6 },
          goalDelta: 12,
          next: "beat_6_yosi",
          path: "yosi"
        }
      ]
    },

    // ========== BEAT 6a: VOTE PATH ==========
    {
      id: "beat_6_vote",
      messages: [
        { from: "uri",       text: 'מצוין!!! 🎉🎉 יש מניין! ההצבעה עברה — תיקון המעלית מאושר!',                                     delay: 200, typingMs: 1400 },
        { from: "miriam",    text: 'סוף סוף!! מישהו פה עושה משהו!! 🙏🙏 אמן!!',                                                      delay: 200, typingMs: 1200 },
        { from: "valentina", text: 'יאי!! 🎉 לא הבנתי הכל אבל אני מרגישה חלק מהקבוצה!!',                                           delay: 200, typingMs: 1400 },
        { from: "liat",      text: 'ניצן גם שמח!! 🐕🎉',                                                                             delay: 200, typingMs: 800  },
        { from: "miriam",    text: 'ניצן לא גר פה רשמית. ניצן לא מצביע. ניצן — כ-ל-ב.',                                           delay: 200, typingMs: 1200 },
        { from: "yossi",     text: '😂😂😂 מרים את הפוסט של הבוקר', delay: 200, typingMs: 800, isEmoji: false },
        { from: "uri",       text: '📞 דיברתי עם הטכנאי — הוא מגיע מחר בין 8-12. תודה לכולם, ובמיוחד לשכן החדש! ✓✓',              delay: 200, typingMs: 2200 }
      ],
      ending: "vote"
    },

    // ========== BEAT 6b: NEGOTIATE PATH ==========
    {
      id: "beat_6_negotiate",
      messages: [
        { from: "uri",       text: 'שאלה מצוינת... 🤔 לפי תקנון הבית: בעלי דירות 70%, שוכרים 30% מהתשלום.',                          delay: 200, typingMs: 1800 },
        { from: "miriam",    text: 'שכן חדש צודק!! אני שילמתי כבר 5 פעמים על תיקונים!! מה עם קופת הוועד?!',                         delay: 200, typingMs: 2000 },
        { from: "uri",       text: 'מרים, הקופה אזלה על תיקון הגג אחרי הגשמים. תזכרי? 😅',                                          delay: 200, typingMs: 1600 },
        { from: "miriam",    text: 'אני זוכרת הכל!! זו בדיוק הבעיה!! 😤',                                                             delay: 200, typingMs: 1000 },
        { from: "valentina", text: 'בבלארוס המדינה מתקנת הכל 🤷 כאן צריך לשלם לבד? קצת עצוב...',                                    delay: 200, typingMs: 1400 },
        { from: "yossi",     text: '...', delay: 200, typingMs: 800 },
        { from: "miriam",    text: 'יוסי!! שמענו שאתה בעל דירה!! עכשיו!! תצביע!!',                                                   delay: 200, typingMs: 1200 },
        { from: "yossi",     text: 'אוקי אוקי ✋ בעד. עכשיו תעזבו אותי אני באמצע סרט 🍿',                                           delay: 200, typingMs: 1600 },
        { from: "uri",       text: '🎉 יש מניין! תודה לשכן החדש שהעלה שאלה חכמה! מחר מגיע הטכנאי.',                                 delay: 200, typingMs: 1800 }
      ],
      ending: "negotiate"
    },

    // ========== BEAT 6c: YOSI PATH ==========
    {
      id: "beat_6_yosi",
      messages: [
        { from: "yossi",     text: 'וואו. מישהו שאל אותי. 😮 אני... לא בטוח? אני בקומה 2, לא ממש מפריע לי...',                    delay: 200, typingMs: 1800 },
        { from: "miriam",    text: 'יוסי!!! שאלו אותך!! עכשיו תצביע!!',                                                              delay: 200, typingMs: 1200 },
        { from: "yossi",     text: 'בסדר שנייה. ✋ בעד. אבל אם יש אחר כך פיצה — אני מגיע לאסיפה 🍕',                               delay: 200, typingMs: 1600 },
        { from: "uri",       text: '🎉 יש מניין!! ההצבעה עברה!',                                                                     delay: 200, typingMs: 900  },
        { from: "liat",      text: 'יוסי ❤️ ניצן אוהב אותך!',                                                                        delay: 200, typingMs: 800  },
        { from: "yossi",     text: '...בסדר. את הכלב אני קצת אוהב. אל תספרו למרים 🤫',                                              delay: 200, typingMs: 1400 },
        { from: "miriam",    text: 'ראיתי!! 😤😤😤',                                                                                   delay: 200, typingMs: 800  },
        { from: "valentina", text: 'LMAO זה מצחיק ב-כל-השפות 😂🌍',                                                                   delay: 200, typingMs: 1200 },
        { from: "uri",       text: 'ממ... בכל אופן. מחר מגיע הטכנאי. תודה לכולם. ✓✓',                                               delay: 200, typingMs: 1600 }
      ],
      ending: "yosi"
    }
  ],

  endings: {
    vote: {
      headline: "המעלית תתוקן! שכן חדש מחזיר את הסדר לבניין",
      sub: '"שכן חדש מביא אחדות לוועד — מרים עדיין יש לה שאלות על חשבון המים"',
      badgeIcon: "🤝",
      badgeLabel: '"מארגן הבניין" — איחדת את הקבוצה ברגע הנכון!',
      goalScore: 100
    },
    negotiate: {
      headline: "מניין הושג — שאלה אחת שינתה הכל",
      sub: '"שכן חדש מוכיח: לשאול שאלות חכמות זה גם מין אומנות — יוסי עדיין לא ענה"',
      badgeIcon: "🧠",
      badgeLabel: '"מו"מניסט חכם" — אחת ושינית את מהלך ההצבעה!',
      goalScore: 100
    },
    yosi: {
      headline: 'יוסי יצא מהסרט לרגע — המעלית תתוקן',
      sub: '"שכן חדש מוכיח: כדי לגרום ליוסי לנוע צריך לשאול אותו ישירות"',
      badgeIcon: "😎",
      badgeLabel: '"חבר של יוסי" — הצלחת לגרום ליוסי לזוז מהספה!',
      goalScore: 100
    }
  }
};
