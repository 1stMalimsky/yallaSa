const caravanCatalog = [
  {
    _id: 1,
    title: "Kanaus 400",
    imgs: [
      {
        original: "/imgs/caravanPhotos/Knaus_400/knaus01.jpg",
        thumbnail: "/imgs/caravanPhotos/Knaus_400/knaus01mini.jpg",
        alt: "outer",
      },
      {
        original: "/imgs/caravanPhotos/Knaus_400/knaus02.jpg",
        thumbnail: "/imgs/caravanPhotos/Knaus_400/knaus02mini.jpg",
        alt: "outer front",
      },
      {
        original: "/imgs/caravanPhotos/Knaus_400/knaus03.jpg",
        thumbnail: "/imgs/caravanPhotos/Knaus_400/knaus03mini.jpg",
        alt: "kitchen",
      },
      {
        original: "/imgs/caravanPhotos/Knaus_400/knaus6.png",
        thumbnail: "/imgs/caravanPhotos/Knaus_400/knaus6mini.png",
        alt: "layout",
      },
    ],
    description:
      "הקרוואן שעושה את העבודה. משכירים קרוואן קרגו ונהנים מקרוואן מודולרי, נוח אבל עדיין מאובזר שפשוט כיף לקחת לכל מקום. קרוואן נוח לתפעול, קומפקטי ומתאים למשפחות קטנות ולכל סוגי הרכבים. כמובן, כמו כל הקרוואנים של לנדאו קרוואנים המוצעים להשכרה, הקרוואן מפנק במיוחד וכולל את כל האבזור הציוד שאתם צריכים כדי שתהיה לך יחידת דיור מדהימה",
    beds: 5,
    seats: 6,
    baths: false,
    kitchen: "half",
    measurements: "400x218",
    weight: "850",
    licenseRequired: "Class B",

    hasAC: true,
    hasTV: true,
    pricePerNight: 500,
    hasTowCar: false,
    shabbatSystem: false,

    /* start: 15/11/2024, end: 25/11/2024  */
    bookedDates: [{ start: 1732928400, end: 1733187600 }],
    insurancePerNight: 100,
    cancelationPolicy: "3 days before",
    ownerDetails: {
      name: "Alon",
      phone: "054-7558844",
      email: "elilandua@gmail.com",
    },
    locationDetails: {
      city: "Petach Tikvah",
      street: "HaMeyasdim 8",
      locationArea: "north",
      mapsLocation: "https://maps.app.goo.gl/j3vkhA4K498gi21X9",
      gpsData: [32.04784649131059, 34.92227224047749],
    },
  },
  {
    _id: 2,
    title: "Royal 500",
    imgs: [
      {
        original: "/imgs/caravanPhotos/royal_500/royal01.jpg",
        thumbnail: "/imgs/caravanPhotos/royal_500/royal01mini.jpg",
        alt: "outer",
      },
      {
        original: "/imgs/caravanPhotos/royal_500/royal02.jpg",
        thumbnail: "/imgs/caravanPhotos/royal_500/royal02mini.jpg",
        alt: "toilet",
      },
      {
        original: "/imgs/caravanPhotos/royal_500/royal03.jpg",
        thumbnail: "/imgs/caravanPhotos/royal_500/royal03mini.jpg",
        alt: "living area",
      },
      {
        original: "/imgs/caravanPhotos/royal_500/royal04.jpg",
        thumbnail: "/imgs/caravanPhotos/royal_500/royal04mini.jpg",
        alt: "kitchen",
      },
    ],
    description:
      "קרוואן רויאל 500 הוא ללא ספק הסוויטה של הקרוואנים ונחשב לקרוואן המרווח ביותר הנמצא בארץ.  סעו, התמקמו. התחילו ליהנות.",
    beds: 7,
    seats: 6,
    baths: true,
    kitchen: "Full",
    measurements: "726x232",
    weight: "1250",
    licenseRequired: "Class B",

    hasAC: true,
    hasTV: true,
    pricePerNight: 650,
    hasTowCar: false,
    shabbatSystem: true,
    /* start: 17/11/2024, end: 26/11/2024  */
    bookedDates: [{ start: 1733101200, end: 1733446800 }],
    insurancePerNight: 200,
    cancelationPolicy: "7 days before",
    ownerDetails: {
      name: "Kobi",
      phone: "054-7558844",
      email: "elilandua@gmail.com",
    },
    locationDetails: {
      city: "Petach Tikvah",
      street: "HaMeyasdim 8",

      locationArea: "center",
      mapsLocation: "https://maps.app.goo.gl/j3vkhA4K498gi21X9",
      gpsData: [32.056717218095045, 34.80913291251278],
    },
  },

  {
    _id: 3,
    title: "Jumbo 620",
    imgs: [
      {
        original: "/imgs/caravanPhotos/jumbo_620/Jambo01.jpg",
        thumbnail: "/imgs/caravanPhotos/jumbo_620/Jambo01mini.jpg",
        alt: "outer",
      },
      {
        original: "/imgs/caravanPhotos/jumbo_620/Jambo02.jpg",
        thumbnail: "/imgs/caravanPhotos/jumbo_620/Jambo02mini.jpg",
        alt: "toilet",
      },
      {
        original: "/imgs/caravanPhotos/jumbo_620/Jambo03.jpg",
        thumbnail: "/imgs/caravanPhotos/jumbo_620/Jambo03mini.jpg",
        alt: "dining table",
      },
      {
        original: "/imgs/caravanPhotos/jumbo_620/Jambo04.jpg",
        thumbnail: "/imgs/caravanPhotos/jumbo_620/Jambo04mini.jpg",
        alt: "kitcehn",
      },
    ],
    description:
      "חושבים להשכיר קרוואן גדול? ג’מבו הוא קרוואן מפואר ומפנק במיוחד. מתאים להשכרה עבור זוגות או משפחות. יכולה להכיל עד 7 אנשים. מכיל את כל מה שאתם צריכים לבילוי או שהות מהנה בטבע או בחוץ. אבזור ברמה גבוהה מאפשר לשכור אותו גם לתקופות ארוכות. משתלם במיוחד.",
    beds: 7,
    seats: 6,

    baths: true,
    kitchen: "Full",
    measurements: "727x232",
    weight: "1500",
    licenseRequired: "Class B",

    hasAC: true,
    hasTV: true,
    pricePerNight: 1500,
    hasTowCar: false,
    shabbatSystem: true,
    /* start: 29/11/2024, end: 05/12/2024  */
    bookedDates: [{ start: 1733446800, end: 1733619600 }],
    insurancePerNight: 200,
    cancelationPolicy: "7 days before",
    ownerDetails: {
      name: "Kobi",
      phone: "054-7558844",
      email: "elilandua@gmail.com",
    },
    locationDetails: {
      city: "Petach Tikvah",
      street: "HaMeyasdim 8",

      locationArea: "south",
      mapsLocation: "https://maps.app.goo.gl/j3vkhA4K498gi21X9",
      gpsData: [31.684479318334787, 34.749310978231954],
    },
  },
];

export default caravanCatalog;
