/* ==========================================================
   EDIT THIS FILE to update events and news.
   No coding knowledge needed – just copy a line and change it.
   ========================================================== */

/* Upcoming events. Dates in YYYY-MM-DD format.
   Past dates are hidden automatically.
   Add Sravana Nakshatram Kalyanam dates from the Panchangam each month. */
const EVENTS = [
  { date: "2026-11-27", title: "శ్రీ స్వామి వారి అభిషేకం", subtitle: "Friday Abhishekam · 6:30 AM" },
  { date: "2026-12-04", title: "శ్రీ స్వామి వారి అభిషేకం", subtitle: "Friday Abhishekam · 6:30 AM" },
  { date: "2026-12-00", title: "శ్రీ స్వామి వారి కళ్యాణం", subtitle: "Sravana Nakshatram · 7:00 PM (add date)" },
  { date: "2027-01-00", title: "వార్షిక ఉత్సవాలు", subtitle: "Bhishma Ekadasi – Varshikotsavam (add date)" }
];

/* Latest updates / news cards. image is optional (put the file in /images). */
const UPDATES = [
  {
    date: "27-01-2007",
    title: "శ్రీ స్వామి వారి ప్రతిష్ఠ",
    text: "Sri Swamy vari Prathishta was performed on Bhishma Ekadasi.",
    image: "images/venkateswara-1.jpg"
  },
  {
    date: "Every Friday",
    title: "అభిషేకం",
    text: "Abhishekam to Sri Swamy vari every Friday at 6:30 AM.",
    image: "images/venkateswara-2.jpg"
  },
  {
    date: "Every Month",
    title: "కళ్యాణం",
    text: "Sri Swamy vari Kalyanam on Sravana Nakshatram day at 7:00 PM.",
    image: "images/kalyanam.jpg"
  }
];


/* Prathishta year – used to calculate years of service and Varshikotsavam number. */
const PRATHISHTA_YEAR = 2007;
