import { LebaneseGovernorate } from "@/types/location";

export const LEBANESE_LOCATIONS: LebaneseGovernorate[] = [
  {
    id: 'beirut',
    name: { en: 'Beirut', ar: 'بيروت' },
    districts: [
      {
        id: 'beirut-governorate',
        name: { en: 'Beirut Governorate', ar: 'محافظة بيروت' },
        towns: [
          { id: 'achrafieh', name: { en: 'Achrafieh', ar: 'الأشرفية' }, type: 'area' },
          { id: 'hamra', name: { en: 'Hamra', ar: 'الحمرا' }, type: 'area' },
          { id: 'downtown', name: { en: 'Downtown', ar: 'وسط بيروت' }, type: 'area' },
          { id: 'ras-beirut', name: { en: 'Ras Beirut', ar: 'رأس بيروت' }, type: 'area' },
          { id: 'mazraa', name: { en: 'Mazraa', ar: 'المزرعة' }, type: 'area' },
          { id: 'minet-el-hosn', name: { en: 'Minet El Hosn', ar: 'ميناء الحصن' }, type: 'area' },
          { id: 'barbir', name: { en: 'Barbir', ar: 'بربير' }, type: 'area' },
          { id: 'furn-el-chebbak', name: { en: 'Furn El Chebbak', ar: 'فرن الشباك' }, type: 'area' },
          { id: 'bir-hassan', name: { en: 'Bir Hassan', ar: 'بئر حسن' }, type: 'area' },
          { id: 'ouzaai', name: { en: 'Ouzai', ar: 'الوزاعي' }, type: 'area' },
        ]
      }
    ]
  },
  {
    id: 'mount-lebanon',
    name: { en: 'Mount Lebanon', ar: 'جبل لبنان' },
    districts: [
      {
        id: 'aley',
        name: { en: 'Aley', ar: 'عاليه' },
        towns: [
          { id: 'aley-center', name: { en: 'Aley Center', ar: 'عاليه المركز' }, type: 'city' },
          { id: 'bhamdoun', name: { en: 'Bhamdoun', ar: 'بحمدون' }, type: 'town' },
          { id: 'sofar', name: { en: 'Sofar', ar: 'صوفر' }, type: 'town' },
          { id: 'ainab', name: { en: 'Ainab', ar: 'عيناب' }, type: 'town' },
          { id: 'kfarmatta', name: { en: 'Kfarmatta', ar: 'كفرمتى' }, type: 'town' },
          { id: 'baysour', name: { en: 'Baysour', ar: 'بيصور' }, type: 'town' },
        ]
      },
      {
        id: 'baabda',
        name: { en: 'Baabda', ar: 'بعبدا' },
        towns: [
          { id: 'baabda-center', name: { en: 'Baabda Center', ar: 'بعبدا المركز' }, type: 'city' },
          { id: 'hazmieh', name: { en: 'Hazmieh', ar: 'الحازمية' }, type: 'area' },
          { id: 'chiyah', name: { en: 'Chiyah', ar: 'الشياح' }, type: 'area' },
          { id: 'ghobeiri', name: { en: 'Ghobeiri', ar: 'الغبيري' }, type: 'area' },
          { id: 'hadath', name: { en: 'Hadath', ar: 'حدت' }, type: 'area' },
          { id: 'khaldeh', name: { en: 'Khaldeh', ar: 'الخلدة' }, type: 'area' },
        ]
      },
      {
        id: 'chouf',
        name: { en: 'Chouf', ar: 'الشوف' },
        towns: [
          { id: 'deir-el-qamar', name: { en: 'Deir El Qamar', ar: 'دير القمر' }, type: 'town' },
          { id: 'beit-ed-dine', name: { en: 'Beit Ed Dine', ar: 'بيت الدين' }, type: 'town' },
          { id: 'barja', name: { en: 'Barja', ar: 'برجا' }, type: 'town' },
          { id: 'damour', name: { en: 'Damour', ar: 'الدامور' }, type: 'town' },
          { id: 'joun', name: { en: 'Joun', ar: 'جون' }, type: 'town' },
          { id: 'naameh', name: { en: 'Naameh', ar: 'الناعمة' }, type: 'town' },
        ]
      },
      {
        id: 'jbeil',
        name: { en: 'Jbeil (Byblos)', ar: 'جبيل' },
        towns: [
          { id: 'byblos-center', name: { en: 'Byblos Center', ar: 'جبيل المركز' }, type: 'city' },
          { id: 'amchit', name: { en: 'Amchit', ar: 'عمشيت' }, type: 'town' },
          { id: 'ghostine', name: { en: 'Ghostine', ar: 'غوسطا' }, type: 'town' },
          { id: 'halat', name: { en: 'Halat', ar: 'حالات' }, type: 'town' },
          { id: 'fidar', name: { en: 'Fidar', ar: 'فيطار' }, type: 'town' },
          { id: 'ras-el-metn', name: { en: 'Ras El Metn', ar: 'رأس المتن' }, type: 'town' },
        ]
      },
      {
        id: 'keserwan',
        name: { en: 'Keserwan', ar: 'كسروان' },
        towns: [
          { id: 'jounieh', name: { en: 'Jounieh', ar: 'جونيه' }, type: 'city' },
          { id: 'zouk-mosbeh', name: { en: 'Zouk Mosbeh', ar: 'ذوق مكايل' }, type: 'area' },
          { id: 'dbayeh', name: { en: 'Dbayeh', ar: 'ضبية' }, type: 'area' },
          { id: 'harissa', name: { en: 'Harissa', ar: 'حريصا' }, type: 'area' },
          { id: 'ghazir', name: { en: 'Ghazir', ar: 'غزير' }, type: 'town' },
          { id: 'ajaltoun', name: { en: 'Ajaltoun', ar: 'عجلتون' }, type: 'town' },
        ]
      },
      {
        id: 'metn',
        name: { en: 'Metn', ar: 'المتن' },
        towns: [
          { id: 'jdeideh', name: { en: 'Jdeideh', ar: 'الجديدة' }, type: 'area' },
          { id: 'zalka', name: { en: 'Zalka', ar: 'الزلقا' }, type: 'area' },
          { id: 'bourj-hammoud', name: { en: 'Bourj Hammoud', ar: 'برج حمود' }, type: 'area' },
          { id: 'sin-el-fil', name: { en: 'Sin El Fil', ar: 'سن الفيل' }, type: 'area' },
          { id: 'fanar', name: { en: 'Fanar', ar: 'الفنار' }, type: 'area' },
          { id: 'antelias', name: { en: 'Antelias', ar: 'انطلياس' }, type: 'area' },
        ]
      }
    ]
  },
  {
    id: 'north',
    name: { en: 'North Lebanon', ar: 'شمال لبنان' },
    districts: [
      {
        id: 'akkar',
        name: { en: 'Akkar', ar: 'عكار' },
        towns: [
          { id: 'halba', name: { en: 'Halba', ar: 'حلبا' }, type: 'city' },
          { id: 'bebnin', name: { en: 'Bebnin', ar: 'ببنين' }, type: 'town' },
          { id: 'qobayat', name: { en: 'Qobayat', ar: 'القبيات' }, type: 'town' },
          { id: 'andket', name: { en: 'Andket', ar: 'عندقت' }, type: 'town' },
          { id: 'mishmish', name: { en: 'Mishmish', ar: 'مشمش' }, type: 'town' },
        ]
      },
      {
        id: 'batroun',
        name: { en: 'Batroun', ar: 'البترون' },
        towns: [
          { id: 'batroun-center', name: { en: 'Batroun Center', ar: 'البترون المركز' }, type: 'city' },
          { id: 'chekka', name: { en: 'Chekka', ar: 'الشكا' }, type: 'town' },
          { id: 'tannourine', name: { en: 'Tannourine', ar: 'تنورين' }, type: 'town' },
          { id: 'bazaoun', name: { en: 'Bazaoun', ar: 'بزعون' }, type: 'town' },
          { id: 'ras-nhash', name: { en: 'Ras Nhash', ar: 'رأس النعش' }, type: 'town' },
        ]
      },
      {
        id: 'bcharre',
        name: { en: 'Bcharre', ar: 'بشري' },
        towns: [
          { id: 'bcharre-center', name: { en: 'Bcharre Center', ar: 'بشري المركز' }, type: 'city' },
          { id: 'hadath-el-jebbeh', name: { en: 'Hadath El Jebbeh', ar: 'حدات الجبة' }, type: 'town' },
          { id: 'dimane', name: { en: 'Dimane', ar: 'الضمان' }, type: 'town' },
          { id: 'qnat', name: { en: 'Qnat', ar: 'القت' }, type: 'town' },
          { id: 'tourza', name: { en: 'Tourza', ar: 'تورزا' }, type: 'town' },
        ]
      },
      {
        id: 'koura',
        name: { en: 'Koura', ar: 'الكورة' },
        towns: [
          { id: 'amioun', name: { en: 'Amioun', ar: 'أميون' }, type: 'city' },
          { id: 'kfar-hazir', name: { en: 'Kfar Hazir', ar: 'كفر حزير' }, type: 'town' },
          { id: 'bishmizzine', name: { en: 'Bishmizzine', ar: 'بشمزين' }, type: 'town' },
          { id: 'deddeh', name: { en: 'Deddeh', ar: 'الدده' }, type: 'town' },
          { id: 'anfeh', name: { en: 'Anfeh', ar: 'أنفه' }, type: 'town' },
        ]
      },
      {
        id: 'miniyeh-danniyeh',
        name: { en: 'Miniyeh-Danniyeh', ar: 'المنية - الضنية' },
        towns: [
          { id: 'miniyeh', name: { en: 'Miniyeh', ar: 'المنية' }, type: 'town' },
          { id: 'bdenn', name: { en: 'Bdenn', ar: 'بضنا' }, type: 'town' },
          { id: 'sir-al-dinniyeh', name: { en: 'Sir Al Dinniyeh', ar: 'صير الضنية' }, type: 'town' },
          { id: 'asoun', name: { en: 'Asoun', ar: 'عصون' }, type: 'town' },
          { id: 'fih', name: { en: 'Fih', ar: 'فيح' }, type: 'town' },
        ]
      },
      {
        id: 'tripoli',
        name: { en: 'Tripoli', ar: 'طرابلس' },
        towns: [
          { id: 'tripoli-center', name: { en: 'Tripoli Center', ar: 'طرابلس المركز' }, type: 'city' },
          { id: 'el-mina', name: { en: 'El Mina', ar: 'المينا' }, type: 'area' },
          { id: 'qobbeh', name: { en: 'Qobbeh', ar: 'القبة' }, type: 'area' },
          { id: 'tebbaneh', name: { en: 'Tebbaneh', ar: 'التبانة' }, type: 'area' },
          { id: 'badawi', name: { en: 'Badawi', ar: 'البداوي' }, type: 'area' },
          { id: 'abou-samra', name: { en: 'Abou Samra', ar: 'أبو سمرا' }, type: 'area' },
        ]
      },
      {
        id: 'zgharta',
        name: { en: 'Zgharta', ar: 'زغرتا' },
        towns: [
          { id: 'zgharta-center', name: { en: 'Zgharta Center', ar: 'زغرتا المركز' }, type: 'city' },
          { id: 'ehden', name: { en: 'Ehden', ar: 'إهدن' }, type: 'town' },
          { id: 'kfarhata', name: { en: 'Kfarhata', ar: 'كفرحاتا' }, type: 'town' },
          { id: 'mazraat-el-toufah', name: { en: 'Mazraat El Toufah', ar: 'مزرعة التفاح' }, type: 'town' },
          { id: 'rass', name: { en: 'Rass', ar: 'الراس' }, type: 'town' },
          { id: 'arshet', name: { en: 'Arshet', ar: 'عرشت' }, type: 'town' },
        ]
      }
    ]
  },
  {
    id: 'south',
    name: { en: 'South Lebanon', ar: 'جنوب لبنان' },
    districts: [
      {
        id: 'jezzine',
        name: { en: 'Jezzine', ar: 'جَزِّين' },
        towns: [
          { id: 'jezzine-center', name: { en: 'Jezzine Center', ar: 'جَزِّين المركز' }, type: 'city' },
          { id: 'bkassine', name: { en: 'Bkassine', ar: 'بكاسين' }, type: 'town' },
          { id: 'kfarhouna', name: { en: 'Kfarhouna', ar: 'كفرحونا' }, type: 'town' },
          { id: 'rihane', name: { en: 'Rihane', ar: 'الريحان' }, type: 'town' },
          { id: 'kfar-falous', name: { en: 'Kfar Falous', ar: 'كفر فالوس' }, type: 'town' },
          { id: 'homsiyeh', name: { en: 'Homsiyeh', ar: 'الحومسية' }, type: 'town' },
          { id: 'ain-el-delb', name: { en: 'Ain El Delb', ar: 'عين الدلب' }, type: 'town' },
          { id: 'sfaray', name: { en: 'Sfaray', ar: 'صفراي' }, type: 'town' },
          { id: 'mazraat-el-chouf', name: { en: 'Mazraat El Chouf', ar: 'مزرعة الشوف' }, type: 'town' },
          { id: 'karm-el-mohr', name: { en: 'Karm El Mohr', ar: 'كرم المهر' }, type: 'town' },
          { id: 'mlikh', name: { en: 'Mlikh', ar: 'ملكة' }, type: 'town' },
          { id: 'bater', name: { en: 'Bater', ar: 'باتر' }, type: 'town' },
          { id: 'ain-el-qadah', name: { en: 'Ain El Qadah', ar: 'عين القضاة' }, type: 'town' },
          { id: 'ain-el-jawzeh', name: { en: 'Ain El Jawzeh', ar: 'عين الجوزة' }, type: 'town' },
          { id: 'el-bireh', name: { en: 'El Bireh', ar: 'البيرة' }, type: 'town' },
          { id: 'lowaizeh', name: { en: 'Lowaizeh', ar: 'لويزة' }, type: 'town' },
          { id: 'roum', name: { en: 'Roum', ar: 'الروم' }, type: 'town' },
          { id: 'bqaiaa', name: { en: 'Bqaiaa', ar: 'البقيعة' }, type: 'town' },
          { id: 'bqosta', name: { en: 'Bqosta', ar: 'بقسطا' }, type: 'town' },
          { id: 'maaroub', name: { en: 'Maaroub', ar: 'معروب' }, type: 'town' },
        ]
      },
      {
        id: 'nabatieh',
        name: { en: 'Nabatieh', ar: 'النبطية' },
        towns: [
          { id: 'nabatieh-center', name: { en: 'Nabatieh Center', ar: 'النبطية المركز' }, type: 'city' },
          { id: 'kfar-roummane', name: { en: 'Kfar Roummane', ar: 'كفررمان' }, type: 'town' },
          { id: 'kfar-tebnit', name: { en: 'Kfar Tebnit', ar: 'كفرتبنيت' }, type: 'town' },
          { id: 'jbaa', name: { en: 'Jbaa', ar: 'جباع' }, type: 'town' },
          { id: 'kawthariyet-siyad', name: { en: 'Kawthariyet Siyad', ar: 'كوثرية الصياد' }, type: 'town' },
          { id: 'deir-siriane', name: { en: 'Deir Siriane', ar: 'دير سريان' }, type: 'town' },
        ]
      },
      {
        id: 'sidon',
        name: { en: 'Sidon (Saida)', ar: 'صيدا' },
        towns: [
          { id: 'sidon-center', name: { en: 'Sidon Center', ar: 'صيدا المركز' }, type: 'city' },
          { id: 'miye-w-miye', name: { en: 'Miye w Miye', ar: 'مية ومية' }, type: 'area' },
          { id: 'harat', name: { en: 'Harat', ar: 'الحرج' }, type: 'area' },
          { id: 'qalaa', name: { en: 'Qalaa', ar: 'القلعة' }, type: 'area' },
          { id: 'el-qaousiyeh', name: { en: 'El Qaousiyeh', ar: 'القوصية' }, type: 'area' },
          { id: 'el-bustan', name: { en: 'El Bustan', ar: 'البستان' }, type: 'area' },
        ]
      },
      {
        id: 'tyre',
        name: { en: 'Tyre (Sour)', ar: 'صور' },
        towns: [
          { id: 'tyre-center', name: { en: 'Tyre Center', ar: 'صور المركز' }, type: 'city' },
          { id: 'abbasiyeh', name: { en: 'Abbasiyeh', ar: 'العباسية' }, type: 'area' },
          { id: 'burj-el-shimali', name: { en: 'Burj El Shimali', ar: 'برج الشمالي' }, type: 'area' },
          { id: 'al-buss', name: { en: 'Al Buss', ar: 'البص' }, type: 'area' },
          { id: 'chaetiyeh', name: { en: 'Chaetiyeh', ar: 'الشعيبة' }, type: 'area' },
          { id: 'maachouk', name: { en: 'Maachouk', ar: 'معشوق' }, type: 'area' },
        ]
      }
    ]
  },
  {
    id: 'bekaa',
    name: { en: 'Bekaa', ar: 'البقاع' },
    districts: [
      {
        id: 'baalbek',
        name: { en: 'Baalbek', ar: 'بعلبك' },
        towns: [
          { id: 'baalbek-center', name: { en: 'Baalbek Center', ar: 'بعلبك المركز' }, type: 'city' },
          { id: 'hermel', name: { en: 'Hermel', ar: 'هرمل' }, type: 'city' },
          { id: 'ras-baalbek', name: { en: 'Ras Baalbek', ar: 'رأس بعلبك' }, type: 'town' },
          { id: 'labweh', name: { en: 'Labweh', ar: 'لبوة' }, type: 'town' },
          { id: 'chaat', name: { en: 'Chaat', ar: 'شعث' }, type: 'town' },
          { id: 'jdeideh-bekaa', name: { en: 'Jdeideh (Bekaa)', ar: 'الجديدة (البقاع)' }, type: 'town' },
        ]
      },
      {
        id: 'rashaya',
        name: { en: 'Rashaya', ar: 'راشيا' },
        towns: [
          { id: 'rashaya-center', name: { en: 'Rashaya Center', ar: 'راشيا المركز' }, type: 'town' },
          { id: 'kfar-qouq', name: { en: 'Kfar Qouq', ar: 'كفرقوق' }, type: 'town' },
          { id: 'hawch-el-omara', name: { en: 'Hawch El Omara', ar: 'حوش الأمراء' }, type: 'town' },
          { id: 'dahr-el-ahmar', name: { en: 'Dahr El Ahmar', ar: 'ضهر الأحمر' }, type: 'town' },
          { id: 'mimass', name: { en: 'Mimass', ar: 'ميمس' }, type: 'town' },
        ]
      },
      {
        id: 'western-bekaa',
        name: { en: 'Western Bekaa', ar: 'البقاع الغربي' },
        towns: [
          { id: 'jeb-jennine', name: { en: 'Jeb Jennine', ar: 'جب جنين' }, type: 'town' },
          { id: 'kabb-elyas', name: { en: 'Kabb Elyas', ar: 'كبة إلياس' }, type: 'town' },
          { id: 'mashghara', name: { en: 'Mashghara', ar: 'مشغرة' }, type: 'town' },
          { id: 'saghbine', name: { en: 'Saghbine', ar: 'صغبين' }, type: 'town' },
          { id: 'sultan-yaacoub', name: { en: 'Sultan Yaacoub', ar: 'سلطان يعقوب' }, type: 'town' },
        ]
      },
      {
        id: 'zahle',
        name: { en: 'Zahle', ar: 'زحلة' },
        towns: [
          { id: 'zahle-center', name: { en: 'Zahle Center', ar: 'زحلة المركز' }, type: 'city' },
          { id: 'maalaka', name: { en: 'Maalaka', ar: 'معاملة' }, type: 'area' },
          { id: 'taalabaya', name: { en: 'Taalabaya', ar: 'تعلاية' }, type: 'area' },
          { id: 'saadnayel', name: { en: 'Saadnayel', ar: 'سعدنايل' }, type: 'town' },
          { id: 'terbol', name: { en: 'Terbol', ar: 'تربل' }, type: 'town' },
          { id: 'chtaura', name: { en: 'Chtaura', ar: 'شتورا' }, type: 'town' },
          { id: 'rayak', name: { en: 'Rayak', ar: 'الرياك' }, type: 'town' },
          { id: 'kab-elas', name: { en: 'Kab Elas', ar: 'كبة الإس' }, type: 'town' },
          { id: 'jdeideh-zahle', name: { en: 'Jdeideh (Zahle)', ar: 'الجديدة (زحلة)' }, type: 'town' },
        ]
      }
    ]
  }
]