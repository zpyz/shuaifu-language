'use secret';
(function () {
    let firstLetter = {
        "b": "b", "c": "c", "d": "d", "f": "f", "g": "g", "h": "h", "i": "ch", "j": "j", "k": "k", "l": "l",
        "m": "m", "n": "n", "p": "p", "q": "q", "r": "r", "s": "s", "t": "t", "u": "sh", "v": "zh", "w": "w",
        "x": "x", "y": "y", "z": "z"
    };
    let secondLetter = {
        "a": "a", "b": "in", "c": "ao", "d": "ai", "e": "e", "f": "en", "g": "eng", "h": "ang",
        "i": "i", "j": "an", "k": ["ing", "uai"], "l": ["iang", "uang"], "m": "ian", "n": "iao",
        "o": ["o", "uo"], "p": "ie", "q": "iu", "r": "uan", "s": ["iong", "ong"], "t": ["ue", "ve"],
        "u": "u", "v": ["ui", "v"], "w": "ei", "x": ["ia", "ua"], "y": "un", "z": "ou"
    };
    let otherLetter = {
        "aa": "a", "ah": "ang", "ai": "ai", "an": "an", "ao": "ao", "ee": "e",
        "eg": "eng", "ei": "ei", "en": "en", "er": "er", "oo": "o", "ou": "ou"
    };
    let validWords = ["jia", "qia", "xia", "gua", "kua", "hua", "zhua", "chua", "shua", "guai", "kuai", "huai",
        "zhuai", "chuai", "shuai", "bing", "ping", "ming", "ding", "ting", "ning", "ling", "jing", "qing",
        "xing", "ying", "guang", "kuang", "huang", "zhuang", "chuang", "shuang", "diang", "niang", "liang",
        "jiang", "qiang", "xiang", "bo", "po", "mo", "fo", "lo", "wo", "duo", "tuo", "nuo", "luo", "guo", "kuo",
        "huo", "zhuo", "chuo", "shuo", "ruo", "zuo", "cuo", "suo", "jiong", "qiong", "xiong", "dong", "tong",
        "nong", "long", "gong", "kong", "hong", "zhong", "chong", "rong", "zong", "cong", "song", "yong",
        "jue", "que", "xue", "yue", "nve", "lve", "dui", "tui", "gui", "kui", "hui", "zhui", "chui", "shui", "rui",
        "zui", "cui", "sui", "nv", "lv"
    ];
    let txtIn = document.getElementById('txt_in');
    let txtOut = document.getElementById('txt_out');
    let checkAddBlank = document.getElementById('add_blank');
    document.getElementById('btn_process').addEventListener('click', _ => {
        txtOut.value = process(txtIn.value, checkAddBlank.checked);
    });

    function process(text, add_blank) {
        let result = "";
        for (let i = 0; i < text.length; i++) {
            if (text[i] in firstLetter && text[i + 1] in secondLetter) {
                let t = text[i] + text[i + 1];
                let blank = (text[i + 2] !== ' ' && add_blank) ? ' ' : '';
                if (t in otherLetter) {
                    result += (otherLetter[t] + blank);
                } else {
                    if (Array.isArray(secondLetter[text[i + 1]])) {
                        let w1 = firstLetter[text[i]] + secondLetter[text[i + 1]][0];
                        let w2 = firstLetter[text[i]] + secondLetter[text[i + 1]][1];
                        result += (validWords.findIndex(a => a === w1) !== -1) ? (w1 + blank) : ((validWords.findIndex(a => a === w2) !== -1) ? (w2 + blank) : t);
                    } else {
                        result += firstLetter[text[i]] + secondLetter[text[i + 1]] + blank;
                    }
                }
                i++;
            } else {
                result += text[i];
            }
        }
        return result;
    }
})();
