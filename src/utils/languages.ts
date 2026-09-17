export type Language = (typeof languages)[number];

const languages = [
  { name: "English", nativeName: "English", viewBox: "0 0 82 66", code: "en" },
  { name: "Hindi", nativeName: "हिंदी", viewBox: "0 1914 82 66", code: "hi" },
  {
    name: "Marathi",
    nativeName: "मराठी",
    viewBox: "0 2500 82 66",
    code: "mr",
  },
  {
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    viewBox: "0 2750 82 66",
    code: "kn",
  },
  {
    name: "Mathematics",
    nativeName: "Mathematics",
    viewBox: "0 3000 82 66",
    code: "math",
  },
  {
    name: "Science",
    nativeName: "Science",
    viewBox: "0 1914 82 66",
    code: "sci",
  },
  {
    name: "History",
    nativeName: "History",
    viewBox: "0 1914 82 66",
    code: "hist",
  },
  {
    name: "Geography",
    nativeName: "Geography",
    viewBox: "0 2500 82 66",
    code: "geo",
  },
  {
    name: "Civics",
    nativeName: "Civics",
    viewBox: "0 1914 82 66",
    code: "civ",
  },
  {
    name: "Art",
    nativeName: "Art",
    viewBox: "0 2500 82 66",
    code: "art",
  },
  {
    name: "Music",
    nativeName: "Music",
    viewBox: "0 1914 82 66",
    code: "mus",
  },
  {
    name: "Physical Education",
    nativeName: "Physical Education",
    viewBox: "0 1914 82 66",
    code: "pe",
  },
  {
    name: "Tamil",
    nativeName: "தமிழ்",
    viewBox: "0 1914 82 66",
    code: "ta",
  },
  {
    name: "Telugu",
    nativeName: "తెలుగు",
    viewBox: "0 1914 82 66",
    code: "te",
  },
  {
    name: "Bengali",
    nativeName: "বাংলা",
    viewBox: "0 1914 82 66",
    code: "bn",
  },
  {
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    viewBox: "0 1914 82 66",
    code: "gu",
  },
  {
    name: "Sanskrit",
    nativeName: "संस्कृतम्",
    viewBox: "0 1914 82 66",
    code: "sa",
  },
  {
    name: "Environmental",
    nativeName: "Environmental",
    viewBox: "0 1914 82 66",
    code: "evs",
  },
] as const;

export default languages;
