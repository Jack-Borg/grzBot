const { getRandomInt } = require ('../utils')

module.exports = {
    NumToRegion: function (num) {
        const country = Countries_names.find(
            (c) => c[2] == num
        );
        return country[0]
    },
    RegionToNum: function (region) {
        const country = Countries_names.find(
            (c) => c[0] == num
        );
        return country[2]
    },
    RandomRegion: function (region) {
        const randomRegion = Countries_names.filter((c) => c[2] != region)[
            getRandomInt(0, Countries_names.length - 2)
        ];
        return randomRegion[2]
    }
};

const Countries_names = [
    ['Afghanistan', 'af', 0],
    ['Albania', 'al', 1],
    ['Algeria', 'dz', 2],
    ['American Samoa', 'as', 3],
    ['Andorra', 'ad', 4],
    ['Angola', 'ao', 5],
    ['Anguilla', 'ai', 6],
    ['Antarctica', 'aq', 7],
    ['Antigua and Barbuda', 'ag', 8],
    ['Argentina', 'ar', 9],
    ['Armenia', 'am', 10],
    ['Aruba', 'aw', 11],
    ['Australia', 'au', 12],
    ['Austria', 'at', 13],
    ['Azerbaijan', 'az', 14],
    ['Bahamas', 'bs', 15],
    ['Bahrain', 'bh', 16],
    ['Bangladesh', 'bd', 17],
    ['Barbados', 'bb', 18],
    ['Belarus', 'by', 19],
    ['Belgium', 'be', 20],
    ['Belize', 'bz', 21],
    ['Benin', 'bj', 22],
    ['Bermuda', 'bm', 23],
    ['Bhutan', 'bt', 24],
    ['Bolivia', 'bo', 25],
    ['Bosnia and Herzegovina', 'ba', 26],
    ['Botswana', 'bw', 27],
    ['Brazil', 'br', 28],
    ['British Indian Ocean Territory', 'io', 29],
    ['British Virgin Islands', 'vg', 30],
    ['Brunei', 'bn', 31],
    ['Bulgaria', 'bg', 32],
    ['Burkina Faso', 'bf', 33],
    ['Burundi', 'bi', 34],
    ['Cambodia', 'kh', 35],
    ['Cameroon', 'cm', 36],
    ['Canada', 'ca', 37],
    ['Cape Verde', 'cv', 38],
    ['Cayman Islands', 'ky', 39],
    ['Central African Republic', 'cf', 40],
    ['Chad', 'td', 41],
    ['Chile', 'cl', 42],
    ['China', 'cn', 43],
    ['Christmas Island', 'cx', 44],
    ['Cocos Islands', 'cc', 45],
    ['Colombia', 'co', 46],
    ['Comoros', 'km', 47],
    ['Cook Islands', 'ck', 48],
    ['Costa Rica', 'cr', 49],
    ['Croatia', 'hr', 50],
    ['Cuba', 'cu', 51],
    ['Curacao', 'cw', 52],
    ['Cyprus', 'cy', 53],
    ['Czech Republic', 'cz', 54],
    ['Democratic Republic of the Congo', 'cd', 55],
    ['Denmark', 'dk', 56],
    ['Djibouti', 'dj', 57],
    ['Dominica', 'dm', 58],
    ['Dominican Republic', 'do', 59],
    ['East Timor', 'tl', 60],
    ['Ecuador', 'ec', 61],
    ['Egypt', 'eg', 62],
    ['El Salvador', 'sv', 63],
    ['Equatorial Guinea', 'gq', 64],
    ['Eritrea', 'er', 65],
    ['Estonia', 'ee', 66],
    ['Ethiopia', 'et', 67],
    ['Falkland Islands', 'fk', 68],
    ['Faroe Islands', 'fo', 69],
    ['Fiji', 'fj', 70],
    ['Finland', 'fi', 71],
    ['France', 'fr', 72],
    ['French Polynesia', 'pf', 73],
    ['Gabon', 'ga', 74],
    ['Gambia', 'gm', 75],
    ['Georgia', 'ge', 76],
    ['Germany', 'de', 77],
    ['Ghana', 'gh', 78],
    ['Gibraltar', 'gi', 79],
    ['Greece', 'gr', 80],
    ['Greenland', 'gl', 81],
    ['Grenada', 'gd', 82],
    ['Guam', 'gu', 83],
    ['Guatemala', 'gt', 84],
    ['Guernsey', 'gg', 85],
    ['Guinea', 'gn', 86],
    ['Guinea-Bissau', 'gw', 87],
    ['Guyana', 'gy', 88],
    ['Haiti', 'ht', 89],
    ['Honduras', 'hn', 90],
    ['Hong Kong', 'hk', 91],
    ['Hungary', 'hu', 92],
    ['Iceland', 'is', 93],
    ['India', 'in', 94],
    ['Indonesia', 'id', 95],
    ['Iran', 'ir', 96],
    ['Iraq', 'iq', 97],
    ['Ireland', 'ie', 98],
    ['Isle of Man', 'im', 99],
    ['Israel', 'il', 100],
    ['Italy', 'it', 101],
    ['Ivory Coast', 'ci', 102],
    ['Jamaica', 'jm', 103],
    ['Japan', 'jp', 104],
    ['Jersey', 'je', 105],
    ['Jordan', 'jo', 106],
    ['Kazakhstan', 'kz', 107],
    ['Kenya', 'ke', 108],
    ['Kiribati', 'ki', 109],
    ['Kosovo', 'xk', 110],
    ['Kuwait', 'kw', 111],
    ['Kyrgyzstan', 'kg', 112],
    ['Laos', 'la', 113],
    ['Latvia', 'lv', 114],
    ['Lebanon', 'lb', 115],
    ['Lesotho', 'ls', 116],
    ['Liberia', 'lr', 117],
    ['Libya', 'ly', 118],
    ['Liechtenstein', 'li', 119],
    ['Lithuania', 'lt', 120],
    ['Luxembourg', 'lu', 121],
    ['Macau', 'mo', 122],
    ['Macedonia', 'mk', 123],
    ['Madagascar', 'mg', 124],
    ['Malawi', 'mw', 125],
    ['Malaysia', 'my', 126],
    ['Maldives', 'mv', 127],
    ['Mali', 'ml', 128],
    ['Malta', 'mt', 129],
    ['Marshall Islands', 'mh', 130],
    ['Mauritania', 'mr', 131],
    ['Mauritius', 'mu', 132],
    ['Mayotte', 'yt', 133],
    ['Mexico', 'mx', 134],
    ['Micronesia', 'fm', 135],
    ['Moldova', 'md', 136],
    ['Monaco', 'mc', 137],
    ['Mongolia', 'mn', 138],
    ['Montenegro', 'me', 139],
    ['Montserrat', 'ms', 140],
    ['Morocco', 'ma', 141],
    ['Mozambique', 'mz', 142],
    ['Myanmar', 'mm', 143],
    ['Namibia', 'na', 144],
    ['Nauru', 'nr', 145],
    ['Nepal', 'np', 146],
    ['Netherlands', 'nl', 147],
    ['Netherlands Antilles', 'an', 148],
    ['New Caledonia', 'nc', 149],
    ['New Zealand', 'nz', 150],
    ['Nicaragua', 'ni', 151],
    ['Niger', 'ne', 152],
    ['Nigeria', 'ng', 153],
    ['Niue', 'nu', 154],
    ['North Korea', 'kp', 155],
    ['Northern Mariana Islands', 'mp', 156],
    ['Norway', 'no', 157],
    ['Oman', 'om', 158],
    ['Pakistan', 'pk', 159],
    ['Palau', 'pw', 160],
    ['Palestine', 'ps', 161],
    ['Panama', 'pa', 162],
    ['Papua New Guinea', 'pg', 163],
    ['Paraguay', 'py', 164],
    ['Peru', 'pe', 165],
    ['Philippines', 'ph', 166],
    ['Pitcairn', 'pn', 167],
    ['Poland', 'pl', 168],
    ['Portugal', 'pt', 169],
    ['Puerto Rico', 'pr', 170],
    ['Qatar', 'qa', 171],
    ['Republic of the Congo', 'cg', 172],
    ['Reunion', 're', 173],
    ['Romania', 'ro', 174],
    ['Russia', 'ru', 175],
    ['Rwanda', 'rw', 176],
    ['Saint Barthelemy', 'bl', 177],
    ['Saint Helena', 'sh', 178],
    ['Saint Kitts and Nevis', 'kn', 179],
    ['Saint Lucia', 'lc', 180],
    ['Saint Martin', 'mf', 181],
    ['Saint Pierre and Miquelon', 'pm', 182],
    ['Saint Vincent and the Grenadines', 'vc', 183],
    ['Samoa', 'ws', 184],
    ['San Marino', 'sm', 185],
    ['Sao Tome and Principe', 'st', 186],
    ['Saudi Arabia', 'sa', 187],
    ['Senegal', 'sn', 188],
    ['Serbia', 'rs', 189],
    ['Seychelles', 'sc', 190],
    ['Sierra Leone', 'sl', 191],
    ['Singapore', 'sg', 192],
    ['Sint Maarten', 'sx', 193],
    ['Slovakia', 'sk', 194],
    ['Slovenia', 'si', 195],
    ['Solomon Islands', 'sb', 196],
    ['Somalia', 'so', 197],
    ['South Africa', 'za', 198],
    ['South Korea', 'kr', 199],
    ['South Sudan', 'ss', 200],
    ['Spain', 'es', 201],
    ['Sri Lanka', 'lk', 202],
    ['Sudan', 'sd', 203],
    ['Suriname', 'sr', 204],
    ['Svalbard and Jan Mayen', 'sj', 205],
    ['Swaziland', 'sz', 206],
    ['Sweden', 'se', 207],
    ['Switzerland', 'ch', 208],
    ['Syria', 'sy', 209],
    ['Taiwan', 'tw', 210],
    ['Tajikistan', 'tj', 211],
    ['Tanzania', 'tz', 212],
    ['Thailand', 'th', 213],
    ['Togo', 'tg', 214],
    ['Tokelau', 'tk', 215],
    ['Tonga', 'to', 216],
    ['Trinidad and Tobago', 'tt', 217],
    ['Tunisia', 'tn', 218],
    ['Turkey', 'tr', 219],
    ['Turkmenistan', 'tm', 220],
    ['Turks and Caicos Islands', 'tc', 221],
    ['Tuvalu', 'tv', 222],
    ['U.S. Virgin Islands', 'vi', 223],
    ['Uganda', 'ug', 224],
    ['Ukraine', 'ua', 225],
    ['United Arab Emirates', 'ae', 226],
    ['United Kingdom', 'gb', 227],
    ['United States', 'us', 228],
    ['Uruguay', 'uy', 229],
    ['Uzbekistan', 'uz', 230],
    ['Vanuatu', 'vu', 231],
    ['Vatican', 'va', 232],
    ['Venezuela', 've', 233],
    ['Vietnam', 'vn', 234],
    ['Wallis and Futuna', 'wf', 235],
    ['Western Sahara', 'eh', 236],
    ['Yemen', 'ye', 237],
    ['Zambia', 'zm', 238],
    ['Zimbabwe', 'zw', 239]]