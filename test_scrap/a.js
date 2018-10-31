const rp = require('request-promise');
const cheerio = require('cheerio');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ posts: [], user: {} }).write()

const getTitle = async (uri) => {
  console.log(uri)
  try {
    const $ = await rp({
      uri,
      transform: (body) => {
          return cheerio.load(body, { includeScripts: false })
      }
    })
    const temp = $('h1 span[itemprop="name"]')
    if (temp) return temp.text()
    return ''
  } catch (error) {
    console.log('error getTitle')
    console.log(error)
  }
}

const getMAL = async (uri) => {
  console.log(uri)
  try {
    const $ = await rp({
        uri,
        transform: (body) => {
            return cheerio.load(body, { includeScripts: false })
        }
    })
    textNode = $('a[href*="myanimelist.net"]')
    if (textNode) return textNode.attr('href')
    return ''
  } catch (error) {
    console.log('error getMAL')
    console.log(error)
  }
}

const scrape = async (id) => {
  try {
    const url = 'https://www.anisubindo.video/?p=' + id
    const mal = await getMAL(url)
    const title = mal !== '' ? await getTitle(mal) : ''
    await db.get('posts')
    .push({ id, mal, title })
    .write()
    console.log(title)
  } catch (error) {
    console.log('error scrape')
    console.log(error)
  }
}

urls = [6,10,31,43,54,66,73,77,87,93,102,111,115,123,129,133,138,141,145,149,154,164,168,175,192,196,200,210,251,258,278,285,289,295,311,315,322,325,329,342,347,352,356,376,384,387,394,399,404,412,416,428,435,462,473,480,515,534,560,565,570,582,591,598,602,608,611,617,624,632,636,639,646,650,655,661,673,681,688,693,699,703,707,710,720,733,736,740,751,767,794,801,806,811,816,822,827,840,845,853,871,874,878,883,887,891,901,908,920,924,933,946,951,954,959,963,966,970,976,981,986,989,992,1000,1006,1015,1027,1032,1043,1046,1051,1055,1059,1062,1065,1068,1073,1076,1087,1096,1121,1131,1135,1138,1141,1145,1153,1173,1178,1189,1192,1214,1217,1222,1226,1231,1235,1239,1243,1246,1249,1256,1263,1266,1270,1275,1296,1299,1315,1325,1328,1336,1339,1346,1355,1358,1363,1371,1377,1380,1386,1393,1397,1419,1425,1430,1442,1445,1448,1454,1457,1460,1464,1480,1493,1501,1528,1532,1536,1541,1551,1556,1562,1567,1582,1586,1604,1614,1617,1624,1627,1634,1641,1645,1650,1653,1658,1666,1673,1680,1690,1694,1707,1714,1717,1720,1724,1729,1734,1740,1752,1759,1765,1769,1783,1786,1790,1793,1801,1805,1812,1815,1818,1821,1836,1841,1850,1867,1877,1881,1887,1900,1907,1914,1929,1938,1941,1945,1952,1961,1968,1981,1988,1991,1997,2005,2019,2027,2033,2120,2129,2152,2167,2175,2183,2199,2206,2211,2214,2217,2223,2229,2234,2242,2251,2256,2265,2268,2273,2279,2288,2298,2306,2312,2329,2332,2340,2349,2354,2368,2375,2379,2384,2391,2400,2409,2420,2425,2431,2442,2449,2458,2465,2475,2497,2501,2517,2523,2530,2537,2547,2568,2577,2588,2599,2604,2613,2619,2623,2642,2653,2660,2667,2688,2709,2713,2723,2727,2733,2743,2769,2896,2910,2933,2949,2953,2957,2967,2994,2998,3005,3009,3015,3020,3046,3054,3060,3069,3077,3091,3097,3105,3117,3122,3133,3155,3162,3171,3176,3186,3190,3195,3205,3212,3216,3231,3238,3242,3250,3254,3259,3263,3267,3273,3281,3285,3290,3300,3304,3310,3315,3319,3323,3328,3335,3344,3350,3356,3377,3382,3389,3393,3398,3402,3406,3409,3413,3417,3427,3430,3441,3446,3451,3454,3458,3461,3478,3481,3492,3506,3515,3563,3576,3583,3594,3602,3618,3654,3696,3702,3713,3762,3820,3844,3855,3873,3887,3891,3910,3919,3963,3974,3983,4018,4031,4047,4056,4072,4092,4105,4109,4139,4144,4202,4242,4251,4267,4332,4351,4382,4409,4416,4427,4443,4463,4472,4478,4489,4497,4520,4529,4547,4560,4578,4587,4600,4616,4628,4633,4658,4666,4674,4682,4688,4694,4698,4707,4711,4715,4726,4730,4738,4742,4746,4750,4754,4758,4769,4773,4779,4785,4790,4800,4804,4809,4815,4830,4838,4851,4871,4900,4931,4991,5000,5062,5081,5105,5226,5283,5294,5312,5334,5347,5357,5368,5372,5404,5468,5474,5504,5577,5586,5604,5619,5636,5663,5677,5694,5707,5732,5740,5766,5788,5804,5814,5836,5849,5875,5903,5917,5938,5947,5957,5963,5968,5980,5988,6015,6025,6051,6056,6064,6073,6086,6104,6177,6248,6255,6280,6286,6293,6358,6364,6376,6382,6410,6414,6426,6434,6438,6449,6455,6459,6463,6474,6478,6482,6496,6501,6506,6512,6523,6528,6535,6542,6548,6557,6561,6566,6574,6587,6602,6638,6642,6830,6916,6952,6969,6977,7018,7031,7041,7192,7200,7213,7219,7226,7234,7239,7243,7247,7251,7256,7260,7272,7276,7280,7292,7296,7301,7305,7309,7447,7451,7456,7465,7470,7496,7519,7608,7933,7999,8098,8257,8269,8283,8356,8366,8390,8404,8408,8414,8422,8427,8440,8445,8453,8461,8465,8469,8473,8478,8482,8486,8491,8499,8507,8511,8515,8519,8529,8597,8607,8611,8615,8619,8646,8663,8683,8703,8774,8789,8809,8847,8858,8878,8905,9054,9201,9212,9228,9270,9307,9315,9323,9339,9353,9419,9423,9432,9436,9441,9445,9456,9460,9464,9468,9472,9477,9481,9485,9489,9493,9518,9522,9526,9530,9534,9538,9542,9558,9568,9586,9590,9594,9602,9613,9617,9621,9875,9925,9984,10123,10196,10209,10351,10411,10426,10432,10436,10440,10456,10460,10467,10471,10475,10480,10484,10489,10497,10502,10507,10512,10519,10524,10528,10534,10544,10548,10552,10556,10560,10566,10570,10575,10588,10594,10598,10654,10665,10695,10703,10760,10816,10840,10910,11346,11350,11356,11364,11369,11374,11378,11382,11389,11393,11397,11402,11406,11412,11416,11420,11424,11428,11432,11436,11441,11445,11455,11459,11463,11472,11490,11524,11811,11894,12140,12223,12228,12232,12241,12245,12251,12256,12261,12265,12269,12273,12277,12281,12287,12291,12299,12305,12311,12317,12331,12336,12354,12364,12387,12764,12864,12897,13035,13077,13082,13152,13165,13238,13249,13264,13268,13330,13358,13453,13486,13517,13560,13586,13613,13676,13750,13755,13763,13769,13773,13777,13782,13787,13794,13799,13821,13831,13906,13911,13916,13963,13974,13986,14002,14016,14021,14026,14048,14055,14102,14135,14155,14329,14404,14435,14612,14669,14703,14805,14841,14889,14907,14912,14917,14921,14926,14930,14936,14941,14945,14949,14953,14957,14961,14966,14973,14977,14981,14985,14994,14998,15004,15017,15023,15031,15069,15146,15157,15183,15272,15282,15294,15316,15339,15372,15379,15384,15406,15422,15441,15452,15456,15466,15512,15517,15523,15548,15574,15590,15597,15623,15627,15634,15652,15660,15676,15688,15699,15750,15772,15809,15815,15822,15828,15833,15841,15854,15868,15875,15885,15900,15904,15912,15919,15923,15932,15942,15948,15964,15970,15982,15990,15996,16004,16013,16019,16037,16044,16050,16060,16066,16071,16090,16101,16123,16148,16157,16168,16207,16221,16228,16234,16239,16246,16258,16271,16298,16303,16314,16341,16351,16359,16368,16374,16382,16390,16396,16404,16408,16416,16430,16439,16446,16461,16467,16480,16485,16493,16499,16517,16527,16534,16545,16560,16567,16579,16587,16596,16602,16613,16621,16625,16634,16639,16644,16657,16664,16673,16681,16694,16707,16720,16732,16745,16913,16920,16926,16972,16988,16992,16998,17003,17010,17015,17023,17033,17038,17044,17052,17058,17065,17073,17081,17087,17101,17109,17113,17119,17125,17140,17147,17155,17160,17165,17172,17180,17185,17195,17200,17206,17213,17247,17263,17269,17276,17280,17319,17332,17364,17377,17400,17405,17412,17419,17426,17432,17458,17471,17477,17521,17544,17549,17560,17593,17606,17619,17626,17655,17683,17689,17705,17712,17722,17731,17751,17775,17781,17817,17880,17887,17924,17930,17954,17966,17987,17994,18022,18041,18049,18113,18118,18142,18149,18154,18159,18164,18169,18174,18182,18187,18191,18197,18201,18207,18214,18219,18225,18235,18250,18257,18263,18272,18288,18303,18348,18363,18448,18738,18742,18755,18761,18765,18772,18776,18781,18786,18791,18802,18807,18816,18823,18827,18837,18851,18855,18865,18877,18881,18895,18946,19160,19214,19336,19342,19350,19354,19360,19365,19369,19374,19378,19382,19386,19391,19395,19399,19403,19407,19425,19435,19443,19452
]
async function processArray(urls) {
  for (let i in urls) {
    console.log(`process ke-${i} dari ${(urls.length)}`)
    await scrape(urls[i])
  }
  console.log('Done')
}

processArray(urls)