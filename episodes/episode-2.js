"use strict";

const EPISODE_2 = {
  id: 2,
  title: "גינת הגג",
  emoji: "🌱",
  subtitle: "ניצן צריך לרוץ. מרים צריכה שקט. אורי צריך 14 עמודים.",
  goal: "אשר את גינת הגג מבלי לאבד את ליאת ומרים כבעלות ברית",
  goalProgress: 0,

  activeChars: ["liat", "itai", "miriam", "uri", "yossi", "valentina"],

  initialScores: {
    liat: 50, itai: 50, miriam: 50, uri: 50, yossi: 50, valentina: 50
  },

  dateLabel: "היום, יום רביעי",

  beats: [
    // ========== BEAT 1: THE ANNOUNCEMENT ==========
    {
      id: "beat_1",
      messages: [
        { from: "liat",      text: 'חדשות טובות לכולם! החלטנו להקים גינה על הגג 🌱🌱🌱',                                                                                delay: 700,  typingMs: 1200 },
        { from: "liat",      text: 'ניצן כל כך צריך מקום לרוץ וגם יהיה יפה לכולם!',                                                                                   delay: 200,  typingMs: 1000 },
        { from: "miriam",    text: 'מה?! מה?! מה?!',                                                                                                                    delay: 400,  typingMs: 800  },
        { from: "miriam",    text: 'הגג שייך לכולם!! לא להחליט לבד!!',                                                                                                 delay: 200,  typingMs: 1000 },
        { from: "uri",       text: 'ליאת שלום, הדבר הזה מצריך אישור ועד, תכנית בנייה, ואישור עיריה. אשלח מסמך.',                                                      delay: 300,  typingMs: 1600 },
        { from: "valentina", text: 'גינה על גג? בבלארוס אין דבר כזה. מה זה אומר?',                                                                                    delay: 200,  typingMs: 1200 }
      ],
      choices: [
        {
          text: 'וואו, רעיון מדהים! גינה על הגג תהיה נהדרת 🌿 אני בעד לחלוטין!',
          effects: { liat: +18, itai: +15, miriam: -18 },
          goalDelta: 5,
          next: "beat_2",
          path: "pro_garden"
        },
        {
          text: 'נשמע כיף, אבל נכון שנסכם על תנאים עם כולם קודם? שיהיה הוגן לכל הדיירים 🤝',
          effects: { liat: +8, uri: +10, miriam: +6 },
          goalDelta: 15,
          next: "beat_2",
          path: "balanced"
        },
        {
          text: 'אורי צודק, צריך אישור קודם כל. כללים ברורים זה בסיס לכל דבר 📋',
          effects: { uri: +15, miriam: +12, liat: -12 },
          goalDelta: 10,
          next: "beat_2",
          path: "rules_first"
        }
      ]
    },

    // ========== BEAT 2: THE BBQ REVELATION ==========
    {
      id: "beat_2",
      messages: [
        { from: "itai",      text: 'ואגב יהיה גם ברביקיו כל שישי! מוזמנים 🔥🍖',                                                                              delay: 300,  typingMs: 1000 },
        { from: "yossi",     text: 'סליחה, הוזכר ברביקיו? אני בעד הגינה',                                                                                   delay: 300,  typingMs: 900  },
        { from: "miriam",    text: 'ברביקיו?!?! אני מתגוררת פה לא בקמפינג!!',                                                                                delay: 200,  typingMs: 1100 },
        { from: "valentina", text: 'ברביקיו? בבלארוס זה רק בחתונות...',                                                                                      delay: 200,  typingMs: 1000 },
        { from: "uri",       text: 'אני אצרף סעיף "אירועים על הגג" למסמך',                                                                                   delay: 200,  typingMs: 1000 }
      ],
      choices: [
        {
          text: 'יוסי אתה מוזמן תמיד 😄🍖 ניצן ישמח לחברה!',
          effects: { yossi: +20, itai: +10, miriam: -10 },
          goalDelta: 5,
          next: "beat_3",
          path: "bbq_yes"
        },
        {
          text: 'אולי ברביקיו רק פעם בחודש? יהיה לכולם נעים ולא יטריד 🌱',
          effects: { miriam: +12, liat: +8, itai: +5 },
          goalDelta: 20,
          next: "beat_3",
          path: "bbq_compromise"
        },
        {
          text: '😂',
          effects: { yossi: +15, liat: +8, itai: +8, valentina: +5 },
          goalDelta: 10,
          next: "beat_3",
          path: "bbq_lol",
          isEmoji: true
        }
      ]
    },

    // ========== BEAT 3: THE VOTE ==========
    {
      id: "beat_3",
      messages: [
        { from: "uri",       text: 'שלחתי את מסמך הוועד. 14 עמודים. אנא קראו לפני ההצבעה.',                                                                  delay: 300,  typingMs: 1400 },
        { from: "yossi",     text: '14 עמודים 😂', delay: 200, typingMs: 700, isEmoji: false },
        { from: "miriam",    text: 'לא קוראת. לא רוצה גינה. לא רוצה ברביקיו. לא רוצה את ניצן.',                                                             delay: 200,  typingMs: 1300 },
        { from: "liat",      text: 'ניצן כלב מאוד רגיש מרים 😤',                                                                                             delay: 200,  typingMs: 900  },
        { from: "valentina", text: 'קראתי את המסמך. סעיף 7 לא ברור.',                                                                                        delay: 200,  typingMs: 1000 }
      ],
      choices: [
        {
          text: '✋ בעד הגינה! הגיע הזמן שיהיה ירוק בבניין שלנו!',
          effects: { liat: +20, itai: +18, yossi: +10, miriam: -15 },
          goalDelta: 30,
          next: "beat_4_success",
          path: "vote_yes"
        },
        {
          text: 'מצביע בעד — אם ברביקיו שישי ראשון בחודש בלבד 📅',
          effects: { liat: +10, itai: +8, miriam: +10, uri: +8 },
          goalDelta: 40,
          next: "beat_4_compromise",
          path: "vote_compromise"
        },
        {
          text: 'מרים, את יודעת שהיית יכולה לשתול שם עגבניות? 🍅',
          effects: { miriam: +25, liat: +15, itai: +10 },
          goalDelta: 50,
          next: "beat_4_miriam",
          path: "vote_genius"
        }
      ]
    },

    // ========== BEAT 4a: SUCCESS ENDING ==========
    {
      id: "beat_4_success",
      messages: [
        { from: "liat",      text: 'תודה תודה תודה!! 🌱🌱 ניצן ירוץ בגינה!!',                                                                                delay: 200, typingMs: 1000 },
        { from: "itai",      text: 'אפשר לנטוע גם ירק ועשבי תיבול! 🌿',                                                                                     delay: 200, typingMs: 900  },
        { from: "yossi",     text: 'וברביקיו כל שישי ✋',                                                                                                    delay: 200, typingMs: 700  },
        { from: "miriam",    text: 'אני מוחה. פרוטוקולית. 😤',                                                                                               delay: 200, typingMs: 900  },
        { from: "uri",       text: 'הגינה אושרה 3 מול 1. אורי יכתוב נהלים לשימוש בגינה. 7 עמודים. 📋',                                                    delay: 200, typingMs: 1400 },
        { from: "valentina", text: 'אני אגדל פרחים! 🌸 בבלארוס אמא שלי תמיד גידלה על המרפסת!',                                                            delay: 200, typingMs: 1300 },
        { from: "miriam",    text: 'ולנטינה... אם את מגדלת פרחים — אני מגדלת עגבניות. אחד מהצד שלי. 🍅',                                                  delay: 200, typingMs: 1400 },
        { from: "liat",      text: 'מרים!!! 😭❤️',                                                                                                           delay: 200, typingMs: 600  },
        { from: "miriam",    text: 'אל תתרגשי. אני עדיין מתנגדת לניצן. 🐕🚫',                                                                              delay: 200, typingMs: 1000 }
      ],
      ending: "success"
    },

    // ========== BEAT 4b: COMPROMISE ENDING ==========
    {
      id: "beat_4_compromise",
      messages: [
        { from: "uri",       text: 'הצעת פשרה מעניינת. נצביע: גינה עם תנאי ברביקיו שישי ראשון בלבד.',                                                      delay: 200, typingMs: 1400 },
        { from: "liat",      text: '✋ בעד, בסדר גמור',                                                                                                      delay: 200, typingMs: 700  },
        { from: "itai",      text: '✋ בעד',                                                                                                                  delay: 200, typingMs: 500  },
        { from: "yossi",     text: 'שישי ראשון בלבד? ...✋ בעד. אבל מצפה שזה יהיה שישי טוב.',                                                              delay: 200, typingMs: 1300 },
        { from: "miriam",    text: 'ה-ה-ה. פעם בחודש זה קצת פחות גרוע. ✋ בעד. בעד הגינה. בלי ניצן.',                                                     delay: 200, typingMs: 1400 },
        { from: "uri",       text: '5 בעד 0 נגד! רשמית — גינת הגג אושרה בתנאים! 🎉 אכתוב 14 עמוד של נהלים.',                                              delay: 200, typingMs: 1600 },
        { from: "valentina", text: 'יאי!! ואני אגדל ורדים 🌹',                                                                                               delay: 200, typingMs: 800  },
        { from: "liat",      text: 'ניצן ירוץ! ניצן ירוץ! 🐕🌱',                                                                                            delay: 200, typingMs: 800  },
        { from: "miriam",    text: 'ניצן לא יגיע לגינה שלי. 🍅 אבל... כולם פחות מרוצים וכולם קצת מרוצים. זה ישראל.',                                     delay: 200, typingMs: 1600 }
      ],
      ending: "compromise"
    },

    // ========== BEAT 4c: MIRIAM CONVERT ENDING ==========
    {
      id: "beat_4_miriam",
      messages: [
        { from: "miriam",    text: 'מה... מה אמרת?! 🍅',                                                                                                     delay: 200, typingMs: 700  },
        { from: "miriam",    text: 'עגבניות... על הגג... שלי... 🤔',                                                                                         delay: 400, typingMs: 900  },
        { from: "miriam",    text: 'שמעו — אני לא אומרת שאני בעד הגינה. אני אומרת שאם יהיה חלק — ורק חלק! — לעגבניות שלי... 🍅🍅🍅',                    delay: 300, typingMs: 1600 },
        { from: "liat",      text: 'מרים!! את מצטרפת?! 😭🌱',                                                                                               delay: 200, typingMs: 800  },
        { from: "miriam",    text: 'אני לא "מצטרפת". אני מנהלת חלקה. זה שונה לחלוטין.',                                                                    delay: 200, typingMs: 1200 },
        { from: "itai",      text: '...זה אותו הדבר 😅',                                                                                                    delay: 200, typingMs: 700  },
        { from: "miriam",    text: 'זה לא אותו הדבר. איתי, שתוק.',                                                                                           delay: 200, typingMs: 800  },
        { from: "uri",       text: 'אני... מציע להצביע עכשיו לפני שמרים תשנה את דעתה. 👆',                                                                  delay: 200, typingMs: 1100 },
        { from: "yossi",     text: '✋ ✋ ✋ בעד! מהר לפני שהיא מתחרטת!! 😂',                                                                               delay: 200, typingMs: 900  },
        { from: "valentina", text: '✋ בעד! 🌸',                                                                                                              delay: 200, typingMs: 500  },
        { from: "liat",      text: '✋ ✋ בעד!!!',                                                                                                             delay: 200, typingMs: 500  },
        { from: "itai",      text: '✋',                                                                                                                      delay: 200, typingMs: 400  },
        { from: "miriam",    text: '✋ ...בעד. לגינה עם חלקה לעגבניות. ולנטינה — ורדים בסדר אבל לא ליד שלי.',                                             delay: 200, typingMs: 1400 },
        { from: "uri",       text: '6 בעד, 0 נגד!!! ההצבעה עברה פה אחד!! 🎊🎊🎊',                                                                          delay: 200, typingMs: 1000 },
        { from: "liat",      text: 'ניצן מרים הכי טובה שיש!!!',                                                                                              delay: 200, typingMs: 800  },
        { from: "miriam",    text: 'ניצן לא בא לגינה שלי. 🐕🚫🍅',                                                                                          delay: 200, typingMs: 900  }
      ],
      ending: "miriam_convert"
    }
  ],

  endings: {
    success: {
      headline: "גינת הגג אושרה — ניצן כבר רץ. אורי כתב נהלים.",
      sub: '"שכן חדש הוביל הצבעה — מרים הסכימה לשתול עגבניות בסוף ממילא"',
      badgeIcon: "🌱",
      badgeLabel: '"ירוק ועד הסוף" — קידמת ירק אמיתי בבניין!',
      goalScore: 80
    },
    compromise: {
      headline: "גינה עם תנאים — כולם פחות מרוצים, כולם קצת מרוצים",
      sub: '"זה ישראל: פשרה שלא מרצה אף אחד — ולכן היא הוגנת"',
      badgeIcon: "⚖️",
      badgeLabel: '"מתווך הבניין" — הצלחת לגרום לכולם להסכים עם כולם!',
      goalScore: 90
    },
    miriam_convert: {
      headline: "מרים דורשת פלח לעגבניות — ההצבעה אושרה פה אחד",
      sub: '"שכן חדש גילה את הסוד הגדול: הדרך לליבה של מרים עוברת דרך עגבניות שרי"',
      badgeIcon: "🍅",
      badgeLabel: '"ממיר לבבות (ועגבניות)" — הצלחת מה שאף שכן לא הצליח!',
      goalScore: 100
    }
  }
};
