(function () {
    if (!Date.now) {
        Date.now = function () {
            return +(new Date)
        }
    }
    try {
        document.createElement("div").style.setProperty("opacity", 0, "")
    } catch (ds) {
        var b4 = CSSStyleDeclaration.prototype, er = b4.setProperty;
        b4.setProperty = function (e, fo, fn) {
            er.call(this, e, fo + "", fn)
        }
    }
    d3 = {version:"2.10.0"};
    function fh(fp, fo) {
        try {
            for (var fn in fo) {
                Object.defineProperty(fp.prototype, fn, {value:fo[fn], enumerable:false})
            }
        } catch (fq) {
            fp.prototype = fo
        }
    }

    var cc = aV;

    function fe(fn) {
        var e = -1, fp = fn.length, fo = [];
        while (++e < fp) {
            fo.push(fn[e])
        }
        return fo
    }

    function aV(e) {
        return Array.prototype.slice.call(e)
    }

    try {
        cc(document.documentElement.childNodes)[0].nodeType
    } catch (eL) {
        cc = fe
    }
    var cS = [].__proto__ ? function (fn, e) {
        fn.__proto__ = e
    } : function (fo, e) {
        for (var fn in e) {
            fo[fn] = e[fn]
        }
    };
    d3.map = function (e) {
        var fo = new ae;
        for (var fn in e) {
            fo.set(fn, e[fn])
        }
        return fo
    };
    function ae() {
    }

    fh(ae, {has:function (e) {
        return fj + e in this
    }, get:function (e) {
        return this[fj + e]
    }, set:function (e, fn) {
        return this[fj + e] = fn
    }, remove:function (e) {
        e = fj + e;
        return e in this && delete this[e]
    }, keys:function () {
        var e = [];
        this.forEach(function (fn) {
            e.push(fn)
        });
        return e
    }, values:function () {
        var e = [];
        this.forEach(function (fn, fo) {
            e.push(fo)
        });
        return e
    }, entries:function () {
        var e = [];
        this.forEach(function (fn, fo) {
            e.push({key:fn, value:fo})
        });
        return e
    }, forEach:function (fn) {
        for (var e in this) {
            if (e.charCodeAt(0) === b7) {
                fn.call(this, e.substring(1), this[e])
            }
        }
    }});
    var fj = "\0", b7 = fj.charCodeAt(0);

    function d6(e) {
        return e
    }

    function O() {
        return this
    }

    function R() {
        return true
    }

    function H(e) {
        return typeof e === "function" ? e : function () {
            return e
        }
    }

    d3.functor = H;
    d3.rebind = function (fo, fn) {
        var e = 1, fq = arguments.length, fp;
        while (++e < fq) {
            fo[fp = arguments[e]] = cB(fo, fn, fn[fp])
        }
        return fo
    };
    function cB(fn, e, fo) {
        return function () {
            var fp = fo.apply(e, arguments);
            return arguments.length ? fn : fp
        }
    }

    d3.ascending = function (fn, e) {
        return fn < e ? -1 : fn > e ? 1 : fn >= e ? 0 : NaN
    };
    d3.descending = function (fn, e) {
        return e < fn ? -1 : e > fn ? 1 : e >= fn ? 0 : NaN
    };
    d3.mean = function (fs, fq) {
        var fr = fs.length, fn, e = 0, fp = -1, fo = 0;
        if (arguments.length === 1) {
            while (++fp < fr) {
                if (eS(fn = fs[fp])) {
                    e += (fn - e) / ++fo
                }
            }
        } else {
            while (++fp < fr) {
                if (eS(fn = fq.call(fs, fs[fp], fp))) {
                    e += (fn - e) / ++fo
                }
            }
        }
        return fo ? e : undefined
    };
    d3.median = function (fn, e) {
        if (arguments.length > 1) {
            fn = fn.map(e)
        }
        fn = fn.filter(eS);
        return fn.length ? d3.quantile(fn.sort(d3.ascending), 0.5) : undefined
    };
    d3.min = function (fr, fp) {
        var fo = -1, fq = fr.length, fn, e;
        if (arguments.length === 1) {
            while (++fo < fq && ((fn = fr[fo]) == null || fn != fn)) {
                fn = undefined
            }
            while (++fo < fq) {
                if ((e = fr[fo]) != null && fn > e) {
                    fn = e
                }
            }
        } else {
            while (++fo < fq && ((fn = fp.call(fr, fr[fo], fo)) == null || fn != fn)) {
                fn = undefined
            }
            while (++fo < fq) {
                if ((e = fp.call(fr, fr[fo], fo)) != null && fn > e) {
                    fn = e
                }
            }
        }
        return fn
    };
    d3.max = function (fr, fp) {
        var fo = -1, fq = fr.length, fn, e;
        if (arguments.length === 1) {
            while (++fo < fq && ((fn = fr[fo]) == null || fn != fn)) {
                fn = undefined
            }
            while (++fo < fq) {
                if ((e = fr[fo]) != null && e > fn) {
                    fn = e
                }
            }
        } else {
            while (++fo < fq && ((fn = fp.call(fr, fr[fo], fo)) == null || fn != fn)) {
                fn = undefined
            }
            while (++fo < fq) {
                if ((e = fp.call(fr, fr[fo], fo)) != null && e > fn) {
                    fn = e
                }
            }
        }
        return fn
    };
    d3.extent = function (fs, fp) {
        var fo = -1, fr = fs.length, fn, e, fq;
        if (arguments.length === 1) {
            while (++fo < fr && ((fn = fq = fs[fo]) == null || fn != fn)) {
                fn = fq = undefined
            }
            while (++fo < fr) {
                if ((e = fs[fo]) != null) {
                    if (fn > e) {
                        fn = e
                    }
                    if (fq < e) {
                        fq = e
                    }
                }
            }
        } else {
            while (++fo < fr && ((fn = fq = fp.call(fs, fs[fo], fo)) == null || fn != fn)) {
                fn = undefined
            }
            while (++fo < fr) {
                if ((e = fp.call(fs, fs[fo], fo)) != null) {
                    if (fn > e) {
                        fn = e
                    }
                    if (fq < e) {
                        fq = e
                    }
                }
            }
        }
        return[fn, fq]
    };
    d3.random = {normal:function (fn, e) {
        var fo = arguments.length;
        if (fo < 2) {
            e = 1
        }
        if (fo < 1) {
            fn = 0
        }
        return function () {
            var fp, fr, fq;
            do {
                fp = Math.random() * 2 - 1;
                fr = Math.random() * 2 - 1;
                fq = fp * fp + fr * fr
            } while (!fq || fq > 1);
            returnµ + e * fp * Math.sqrt(-2 * Math.log(fq) / fq)
        }
    }, logNormal:function (fn, e) {
        var fp = arguments.length;
        if (fp < 2) {
            e = 1
        }
        if (fp < 1) {
            fn = 0
        }
        var fo = d3.random.normal();
        return function () {
            return Math.exp(fn + e * fo())
        }
    }, irwinHall:function (e) {
        return function () {
            for (var fo = 0, fn = 0; fn < e; fn++) {
                fo += Math.random()
            }
            return fo / e
        }
    }};
    function eS(e) {
        return e != null && !isNaN(e)
    }

    d3.sum = function (fr, fp) {
        var fo = 0, fq = fr.length, e, fn = -1;
        if (arguments.length === 1) {
            while (++fn < fq) {
                if (!isNaN(e = +fr[fn])) {
                    fo += e
                }
            }
        } else {
            while (++fn < fq) {
                if (!isNaN(e = +fp.call(fr, fr[fn], fn))) {
                    fo += e
                }
            }
        }
        return fo
    };
    d3.quantile = function (fo, fs) {
        var fp = (fo.length - 1) * fs + 1, fq = Math.floor(fp), fn = fo[fq - 1], fr = fp - fq;
        return fr ? fn + fr * (fo[fq] - fn) : fn
    };
    d3.transpose = function (e) {
        return d3.zip.apply(d3, e)
    };
    d3.zip = function () {
        if (!(fr = arguments.length)) {
            return[]
        }
        for (var fp = -1, e = d3.min(arguments, db), fo = new Array(e); ++fp < e;) {
            for (var fn = -1, fr, fq = fo[fp] = new Array(fr); ++fn < fr;) {
                fq[fn] = arguments[fn][fp]
            }
        }
        return fo
    };
    function db(e) {
        return e.length
    }

    d3.bisector = function (e) {
        return{left:function (fo, fn, fr, fq) {
            if (arguments.length < 3) {
                fr = 0
            }
            if (arguments.length < 4) {
                fq = fo.length
            }
            while (fr < fq) {
                var fp = fr + fq >>> 1;
                if (e.call(fo, fo[fp], fp) < fn) {
                    fr = fp + 1
                } else {
                    fq = fp
                }
            }
            return fr
        }, right:function (fo, fn, fr, fq) {
            if (arguments.length < 3) {
                fr = 0
            }
            if (arguments.length < 4) {
                fq = fo.length
            }
            while (fr < fq) {
                var fp = fr + fq >>> 1;
                if (fn < e.call(fo, fo[fp], fp)) {
                    fq = fp
                } else {
                    fr = fp + 1
                }
            }
            return fr
        }}
    };
    var d8 = d3.bisector(function (e) {
        return e
    });
    d3.bisectLeft = d8.left;
    d3.bisect = d3.bisectRight = d8.right;
    d3.first = function (fr, fp) {
        var fo = 0, fq = fr.length, fn = fr[0], e;
        if (arguments.length === 1) {
            fp = d3.ascending
        }
        while (++fo < fq) {
            if (fp.call(fr, fn, e = fr[fo]) > 0) {
                fn = e
            }
        }
        return fn
    };
    d3.last = function (fr, fp) {
        var fo = 0, fq = fr.length, fn = fr[0], e;
        if (arguments.length === 1) {
            fp = d3.ascending
        }
        while (++fo < fq) {
            if (fp.call(fr, fn, e = fr[fo]) <= 0) {
                fn = e
            }
        }
        return fn
    };
    d3.nest = function () {
        var fp = {}, fo = [], fs = [], fn, fq;

        function fr(fA, fy) {
            if (fy >= fo.length) {
                return fq ? fq.call(fp, fA) : fn ? fA.sort(fn) : fA
            }
            var fz = -1, fu = fA.length, fC = fo[fy++], fx, fw, fv = new ae, fB, ft = {};
            while (++fz < fu) {
                if (fB = fv.get(fx = fC(fw = fA[fz]))) {
                    fB.push(fw)
                } else {
                    fv.set(fx, [fw])
                }
            }
            fv.forEach(function (fD) {
                ft[fD] = fr(fv.get(fD), fy)
            });
            return ft
        }

        function e(fw, fx) {
            if (fx >= fo.length) {
                return fw
            }
            var ft = [], fu = fs[fx++], fv;
            for (fv in fw) {
                ft.push({key:fv, values:e(fw[fv], fx)})
            }
            if (fu) {
                ft.sort(function (fz, fy) {
                    return fu(fz.key, fy.key)
                })
            }
            return ft
        }

        fp.map = function (ft) {
            return fr(ft, 0)
        };
        fp.entries = function (ft) {
            return e(fr(ft, 0), 0)
        };
        fp.key = function (ft) {
            fo.push(ft);
            return fp
        };
        fp.sortKeys = function (ft) {
            fs[fo.length - 1] = ft;
            return fp
        };
        fp.sortValues = function (ft) {
            fn = ft;
            return fp
        };
        fp.rollup = function (ft) {
            fq = ft;
            return fp
        };
        return fp
    };
    d3.keys = function (fo) {
        var fn = [];
        for (var e in fo) {
            fn.push(e)
        }
        return fn
    };
    d3.values = function (fo) {
        var e = [];
        for (var fn in fo) {
            e.push(fo[fn])
        }
        return e
    };
    d3.entries = function (fo) {
        var e = [];
        for (var fn in fo) {
            e.push({key:fn, value:fo[fn]})
        }
        return e
    };
    d3.permute = function (fq, fn) {
        var e = [], fo = -1, fp = fn.length;
        while (++fo < fp) {
            e[fo] = fq[fn[fo]]
        }
        return e
    };
    d3.merge = function (e) {
        return Array.prototype.concat.apply([], e)
    };
    d3.split = function (fs, fq) {
        var fp = [], e = [], fo, fn = -1, fr = fs.length;
        if (arguments.length < 2) {
            fq = cQ
        }
        while (++fn < fr) {
            if (fq.call(e, fo = fs[fn], fn)) {
                e = []
            } else {
                if (!e.length) {
                    fp.push(e)
                }
                e.push(fo)
            }
        }
        return fp
    };
    function cQ(e) {
        return e == null
    }

    function bw(e) {
        return e.trim().replace(/\s+/g, " ")
    }

    d3.range = function (fs, fq, fr) {
        if (arguments.length < 3) {
            fr = 1;
            if (arguments.length < 2) {
                fq = fs;
                fs = 0
            }
        }
        if ((fq - fs) / fr === Infinity) {
            throw new Error("infinite range")
        }
        var fn = [], e = d5(Math.abs(fr)), fp = -1, fo;
        fs *= e, fq *= e, fr *= e;
        if (fr < 0) {
            while ((fo = fs + fr * ++fp) > fq) {
                fn.push(fo / e)
            }
        } else {
            while ((fo = fs + fr * ++fp) < fq) {
                fn.push(fo / e)
            }
        }
        return fn
    };
    function d5(e) {
        var fn = 1;
        while (e * fn % 1) {
            fn *= 10
        }
        return fn
    }

    d3.requote = function (e) {
        return e.replace(bQ, "\\$&")
    };
    var bQ = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
    d3.round = function (e, fn) {
        return fn ? Math.round(e * (fn = Math.pow(10, fn))) / fn : Math.round(e)
    };
    d3.xhr = function (e, fo, fp) {
        var fn = new XMLHttpRequest;
        if (arguments.length < 3) {
            fp = fo, fo = null
        } else {
            if (fo && fn.overrideMimeType) {
                fn.overrideMimeType(fo)
            }
        }
        fn.open("GET", e, true);
        if (fo) {
            fn.setRequestHeader("Accept", fo)
        }
        fn.onreadystatechange = function () {
            if (fn.readyState === 4) {
                var fq = fn.status;
                fp(!fq && fn.response || fq >= 200 && fq < 300 || fq === 304 ? fn : null)
            }
        };
        fn.send(null)
    };
    d3.text = function (e, fo, fp) {
        function fn(fq) {
            fp(fq && fq.responseText)
        }

        if (arguments.length < 3) {
            fp = fo;
            fo = null
        }
        d3.xhr(e, fo, fn)
    };
    d3.json = function (e, fn) {
        d3.text(e, "application/json", function (fo) {
            fn(fo ? JSON.parse(fo) : null)
        })
    };
    d3.html = function (e, fn) {
        d3.text(e, "text/html", function (fp) {
            if (fp != null) {
                var fo = document.createRange();
                fo.selectNode(document.body);
                fp = fo.createContextualFragment(fp)
            }
            fn(fp)
        })
    };
    d3.xml = function (e, fo, fp) {
        function fn(fq) {
            fp(fq && fq.responseXML)
        }

        if (arguments.length < 3) {
            fp = fo;
            fo = null
        }
        d3.xhr(e, fo, fn)
    };
    var cs = {svg:"http://www.w3.org/2000/svg", xhtml:"http://www.w3.org/1999/xhtml", xlink:"http://www.w3.org/1999/xlink", xml:"http://www.w3.org/XML/1998/namespace", xmlns:"http://www.w3.org/2000/xmlns/"};
    d3.ns = {prefix:cs, qualify:function (e) {
        var fn = e.indexOf(":"), fo = e;
        if (fn >= 0) {
            fo = e.substring(0, fn);
            e = e.substring(fn + 1)
        }
        return cs.hasOwnProperty(fo) ? {space:cs[fo], local:e} : e
    }};
    d3.dispatch = function () {
        var e = new cN, fn = -1, fo = arguments.length;
        while (++fn < fo) {
            e[arguments[fn]] = de(e)
        }
        return e
    };
    function cN() {
    }

    cN.prototype.on = function (fo, fp) {
        var fn = fo.indexOf("."), e = "";
        if (fn > 0) {
            e = fo.substring(fn + 1);
            fo = fo.substring(0, fn)
        }
        return arguments.length < 2 ? this[fo].on(e) : this[fo].on(e, fp)
    };
    function de(e) {
        var fo = [], fn = new ae;

        function fp() {
            var fs = fo, fr = -1, ft = fs.length, fq;
            while (++fr < ft) {
                if (fq = fs[fr].on) {
                    fq.apply(this, arguments)
                }
            }
            return e
        }

        fp.on = function (fr, ft) {
            var fq = fn.get(fr), fs;
            if (arguments.length < 2) {
                return fq && fq.on
            }
            if (fq) {
                fq.on = null;
                fo = fo.slice(0, fs = fo.indexOf(fq)).concat(fo.slice(fs + 1));
                fn.remove(fr)
            }
            if (ft) {
                fo.push(fn.set(fr, {on:ft}))
            }
            return e
        };
        return fp
    }

    d3.format = function (fu) {
        var fr = bp.exec(fu), fw = fr[1] || " ", fn = fr[3] || "", fp = fr[5], e = +fr[6], fx = fr[7], fs = fr[8], ft = fr[9], fo = 1, fv = "", fq = false;
        if (fs) {
            fs = +fs.substring(1)
        }
        if (fp) {
            fw = "0";
            if (fx) {
                e -= Math.floor((e - 1) / 4)
            }
        }
        switch (ft) {
            case"n":
                fx = true;
                ft = "g";
                break;
            case"%":
                fo = 100;
                fv = "%";
                ft = "f";
                break;
            case"p":
                fo = 100;
                fv = "%";
                ft = "r";
                break;
            case"d":
                fq = true;
                fs = 0;
                break;
            case"s":
                fo = -1;
                ft = "r";
                break
        }
        if (ft == "r" && !fs) {
            ft = "g"
        }
        ft = s.get(ft) || aF;
        return function (fB) {
            if (fq && fB % 1) {
                return""
            }
            var fy = fB < 0 && (fB = -fB) ? "-" : fn;
            if (fo < 0) {
                var fA = d3.formatPrefix(fB, fs);
                fB = fA.scale(fB);
                fv = fA.symbol
            } else {
                fB *= fo
            }
            fB = ft(fB, fs);
            if (fp) {
                var fz = fB.length + fy.length;
                if (fz < e) {
                    fB = (new Array(e - fz + 1)).join(fw) + fB
                }
                if (fx) {
                    fB = bU(fB)
                }
                fB = fy + fB
            } else {
                if (fx) {
                    fB = bU(fB)
                }
                fB = fy + fB;
                var fz = fB.length;
                if (fz < e) {
                    fB = (new Array(e - fz + 1)).join(fw) + fB
                }
            }
            return fB + fv
        }
    };
    var bp = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/;
    var s = d3.map({g:function (e, fn) {
        return e.toPrecision(fn)
    }, e:function (e, fn) {
        return e.toExponential(fn)
    }, f:function (e, fn) {
        return e.toFixed(fn)
    }, r:function (e, fn) {
        return d3.round(e, fn = ct(e, fn)).toFixed(Math.max(0, Math.min(20, fn)))
    }});

    function ct(e, fn) {
        return fn - (e ? 1 + Math.floor(Math.log(e + Math.pow(10, 1 + Math.floor(Math.log(e) / Math.LN10) - fn)) / Math.LN10) : 1)
    }

    function aF(e) {
        return e + ""
    }

    function bU(fp) {
        var fn = fp.lastIndexOf("."), fo = fn >= 0 ? fp.substring(fn) : (fn = fp.length, ""), e = [];
        while (fn > 0) {
            e.push(fp.substring(fn -= 3, fn + 3))
        }
        return e.reverse().join(",") + fo
    }

    var bm = ["y", "z", "a", "f", "p", "n", "μ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(cb);
    d3.formatPrefix = function (fo, e) {
        var fn = 0;
        if (fo) {
            if (fo < 0) {
                fo *= -1
            }
            if (e) {
                fo = d3.round(fo, ct(fo, e))
            }
            fn = 1 + Math.floor(1e-12 + Math.log(fo) / Math.LN10);
            fn = Math.max(-24, Math.min(24, Math.floor((fn <= 0 ? fn + 1 : fn - 1) / 3) * 3))
        }
        return bm[8 + fn / 3]
    };
    function cb(fo, fn) {
        var e = Math.pow(10, Math.abs(8 - fn) * 3);
        return{scale:fn > 8 ? function (fp) {
            return fp / e
        } : function (fp) {
            return fp * e
        }, symbol:fo}
    }

    var a3 = ak(2), z = ak(3), eN = function () {
        return bT
    };
    var N = d3.map({linear:eN, poly:ak, quad:function () {
        return a3
    }, cubic:function () {
        return z
    }, sin:function () {
        return dW
    }, exp:function () {
        return dp
    }, circle:function () {
        return cq
    }, elastic:L, back:eB, bounce:function () {
        return bd
    }});
    var i = d3.map({"in":bT, out:v, "in-out":ar, "out-in":function (e) {
        return ar(v(e))
    }});
    d3.ease = function (fn) {
        var fp = fn.indexOf("-"), fo = fp >= 0 ? fn.substring(0, fp) : fn, e = fp >= 0 ? fn.substring(fp + 1) : "in";
        fo = N.get(fo) || eN;
        e = i.get(e) || bT;
        return dw(e(fo.apply(null, Array.prototype.slice.call(arguments, 1))))
    };
    function dw(e) {
        return function (fn) {
            return fn <= 0 ? 0 : fn >= 1 ? 1 : e(fn)
        }
    }

    function v(e) {
        return function (fn) {
            return 1 - e(1 - fn)
        }
    }

    function ar(e) {
        return function (fn) {
            return 0.5 * (fn < 0.5 ? e(2 * fn) : 2 - e(2 - 2 * fn))
        }
    }

    function bT(e) {
        return e
    }

    function ak(fn) {
        return function (e) {
            return Math.pow(e, fn)
        }
    }

    function dW(e) {
        return 1 - Math.cos(e * Math.PI / 2)
    }

    function dp(e) {
        return Math.pow(2, 10 * (e - 1))
    }

    function cq(e) {
        return 1 - Math.sqrt(1 - e * e)
    }

    function L(e, fo) {
        var fn;
        if (arguments.length < 2) {
            fo = 0.45
        }
        if (arguments.length < 1) {
            e = 1;
            fn = fo / 4
        } else {
            fn = fo / (2 * Math.PI) * Math.asin(1 / e)
        }
        return function (fp) {
            return 1 + e * Math.pow(2, 10 * -fp) * Math.sin((fp - fn) * 2 * Math.PI / fo)
        }
    }

    function eB(e) {
        if (!e) {
            e = 1.70158
        }
        return function (fn) {
            return fn * fn * ((e + 1) * fn - e)
        }
    }

    function bd(e) {
        return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375
    }

    d3.event = null;
    function e5() {
        d3.event.stopPropagation();
        d3.event.preventDefault()
    }

    function P() {
        var fo = d3.event, fn;
        while (fn = fo.sourceEvent) {
            fo = fn
        }
        return fo
    }

    function eM(fo) {
        var e = new cN, fn = 0, fp = arguments.length;
        while (++fn < fp) {
            e[arguments[fn]] = de(e)
        }
        e.of = function (fr, fq) {
            return function (fs) {
                try {
                    var ft = fs.sourceEvent = d3.event;
                    fs.target = fo;
                    d3.event = fs;
                    e[fs.type].apply(fr, fq)
                } finally {
                    d3.event = ft
                }
            }
        };
        return e
    }

    d3.transform = function (e) {
        var fn = document.createElementNS(d3.ns.prefix.svg, "g");
        return(d3.transform = function (fo) {
            fn.setAttribute("transform", fo);
            var fp = fn.transform.baseVal.consolidate();
            return new o(fp ? fp.matrix : dS)
        })(e)
    };
    function o(e) {
        var fp = [e.a, e.b], fn = [e.c, e.d], fr = dm(fp), fo = cT(fp, fn), fq = dm(aZ(fn, fp, -fo)) || 0;
        if (fp[0] * fn[1] < fn[0] * fp[1]) {
            fp[0] *= -1;
            fp[1] *= -1;
            fr *= -1;
            fo *= -1
        }
        this.rotate = (fr ? Math.atan2(fp[1], fp[0]) : Math.atan2(-fn[0], fn[1])) * cH;
        this.translate = [e.e, e.f];
        this.scale = [fr, fq];
        this.skew = fq ? Math.atan2(fo, fq) * cH : 0
    }

    o.prototype.toString = function () {
        return"translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
    };
    function cT(fn, e) {
        return fn[0] * e[0] + fn[1] * e[1]
    }

    function dm(e) {
        var fn = Math.sqrt(cT(e, e));
        if (fn) {
            e[0] /= fn;
            e[1] /= fn
        }
        return fn
    }

    function aZ(fn, e, fo) {
        fn[0] += fo * e[0];
        fn[1] += fo * e[1];
        return fn
    }

    var cH = 180 / Math.PI, dS = {a:1, b:0, c:0, d:1, e:0, f:0};
    d3.interpolate = function (fn, e) {
        var fo = d3.interpolators.length, fp;
        while (--fo >= 0 && !(fp = d3.interpolators[fo](fn, e))) {
        }
        return fp
    };
    d3.interpolateNumber = function (fn, e) {
        e -= fn;
        return function (fo) {
            return fn + e * fo
        }
    };
    d3.interpolateRound = function (fn, e) {
        e -= fn;
        return function (fo) {
            return Math.round(fn + e * fo)
        }
    };
    d3.interpolateString = function (ft, fs) {
        var fp, fr, fq, fv = 0, fu = 0, fw = [], e = [], fo, fn;
        dH.lastIndex = 0;
        for (fr = 0; fp = dH.exec(fs); ++fr) {
            if (fp.index) {
                fw.push(fs.substring(fv, fu = fp.index))
            }
            e.push({i:fw.length, x:fp[0]});
            fw.push(null);
            fv = dH.lastIndex
        }
        if (fv < fs.length) {
            fw.push(fs.substring(fv))
        }
        for (fr = 0, fo = e.length; (fp = dH.exec(ft)) && fr < fo; ++fr) {
            fn = e[fr];
            if (fn.x == fp[0]) {
                if (fn.i) {
                    if (fw[fn.i + 1] == null) {
                        fw[fn.i - 1] += fn.x;
                        fw.splice(fn.i, 1);
                        for (fq = fr + 1; fq < fo; ++fq) {
                            e[fq].i--
                        }
                    } else {
                        fw[fn.i - 1] += fn.x + fw[fn.i + 1];
                        fw.splice(fn.i, 2);
                        for (fq = fr + 1; fq < fo; ++fq) {
                            e[fq].i -= 2
                        }
                    }
                } else {
                    if (fw[fn.i + 1] == null) {
                        fw[fn.i] = fn.x
                    } else {
                        fw[fn.i] = fn.x + fw[fn.i + 1];
                        fw.splice(fn.i + 1, 1);
                        for (fq = fr + 1; fq < fo; ++fq) {
                            e[fq].i--
                        }
                    }
                }
                e.splice(fr, 1);
                fo--;
                fr--
            } else {
                fn.x = d3.interpolateNumber(parseFloat(fp[0]), parseFloat(fn.x))
            }
        }
        while (fr < fo) {
            fn = e.pop();
            if (fw[fn.i + 1] == null) {
                fw[fn.i] = fn.x
            } else {
                fw[fn.i] = fn.x + fw[fn.i + 1];
                fw.splice(fn.i + 1, 1)
            }
            fo--
        }
        if (fw.length === 1) {
            return fw[0] == null ? e[0].x : function () {
                return fs
            }
        }
        return function (fx) {
            for (fr = 0; fr < fo; ++fr) {
                fw[(fn = e[fr]).i] = fn.x(fx)
            }
            return fw.join("")
        }
    };
    d3.interpolateTransform = function (fz, fy) {
        var fA = [], fn = [], fr, fq = d3.transform(fz), fp = d3.transform(fy), fv = fq.translate, fu = fp.translate, fo = fq.rotate, e = fp.rotate, ft = fq.skew, fs = fp.skew, fx = fq.scale, fw = fp.scale;
        if (fv[0] != fu[0] || fv[1] != fu[1]) {
            fA.push("translate(", null, ",", null, ")");
            fn.push({i:1, x:d3.interpolateNumber(fv[0], fu[0])}, {i:3, x:d3.interpolateNumber(fv[1], fu[1])})
        } else {
            if (fu[0] || fu[1]) {
                fA.push("translate(" + fu + ")")
            } else {
                fA.push("")
            }
        }
        if (fo != e) {
            if (fo - e > 180) {
                e += 360
            } else {
                if (e - fo > 180) {
                    fo += 360
                }
            }
            fn.push({i:fA.push(fA.pop() + "rotate(", null, ")") - 2, x:d3.interpolateNumber(fo, e)})
        } else {
            if (e) {
                fA.push(fA.pop() + "rotate(" + e + ")")
            }
        }
        if (ft != fs) {
            fn.push({i:fA.push(fA.pop() + "skewX(", null, ")") - 2, x:d3.interpolateNumber(ft, fs)})
        } else {
            if (fs) {
                fA.push(fA.pop() + "skewX(" + fs + ")")
            }
        }
        if (fx[0] != fw[0] || fx[1] != fw[1]) {
            fr = fA.push(fA.pop() + "scale(", null, ",", null, ")");
            fn.push({i:fr - 4, x:d3.interpolateNumber(fx[0], fw[0])}, {i:fr - 2, x:d3.interpolateNumber(fx[1], fw[1])})
        } else {
            if (fw[0] != 1 || fw[1] != 1) {
                fA.push(fA.pop() + "scale(" + fw + ")")
            }
        }
        fr = fn.length;
        return function (fC) {
            var fB = -1, fD;
            while (++fB < fr) {
                fA[(fD = fn[fB]).i] = fD.x(fC)
            }
            return fA.join("")
        }
    };
    d3.interpolateRgb = function (fn, e) {
        fn = d3.rgb(fn);
        e = d3.rgb(e);
        var fp = fn.r, fo = fn.g, fs = fn.b, fr = e.r - fp, fq = e.g - fo, ft = e.b - fs;
        return function (fu) {
            return"#" + bn(Math.round(fp + fr * fu)) + bn(Math.round(fo + fq * fu)) + bn(Math.round(fs + ft * fu))
        }
    };
    d3.interpolateHsl = function (fo, e) {
        fo = d3.hsl(fo);
        e = d3.hsl(e);
        var ft = fo.h, fs = fo.s, fp = fo.l, fr = e.h - ft, fq = e.s - fs, fn = e.l - fp;
        if (fr > 180) {
            fr -= 360
        } else {
            if (fr < -180) {
                fr += 360
            }
        }
        return function (fu) {
            return aA(ft + fr * fu, fs + fq * fu, fp + fn * fu) + ""
        }
    };
    d3.interpolateLab = function (fn, e) {
        fn = d3.lab(fn);
        e = d3.lab(e);
        var fq = fn.l, fp = fn.a, fo = fn.b, ft = e.l - fq, fs = e.a - fp, fr = e.b - fo;
        return function (fu) {
            return ab(fq + ft * fu, fp + fs * fu, fo + fr * fu) + ""
        }
    };
    d3.interpolateHcl = function (fo, e) {
        fo = d3.hcl(fo);
        e = d3.hcl(e);
        var fn = fo.h, fq = fo.c, fs = fo.l, fp = e.h - fn, fr = e.c - fq, ft = e.l - fs;
        if (fp > 180) {
            fp -= 360
        } else {
            if (fp < -180) {
                fp += 360
            }
        }
        return function (fu) {
            return aO(fn + fp * fu, fq + fr * fu, fs + ft * fu) + ""
        }
    };
    d3.interpolateArray = function (fq, fo) {
        var fn = [], ft = [], fp = fq.length, e = fo.length, fs = Math.min(fq.length, fo.length), fr;
        for (fr = 0; fr < fs; ++fr) {
            fn.push(d3.interpolate(fq[fr], fo[fr]))
        }
        for (; fr < fp; ++fr) {
            ft[fr] = fq[fr]
        }
        for (; fr < e; ++fr) {
            ft[fr] = fo[fr]
        }
        return function (fu) {
            for (fr = 0; fr < fs; ++fr) {
                ft[fr] = fn[fr](fu)
            }
            return ft
        }
    };
    d3.interpolateObject = function (fn, e) {
        var fp = {}, fq = {}, fo;
        for (fo in fn) {
            if (fo in e) {
                fp[fo] = dq(fo)(fn[fo], e[fo])
            } else {
                fq[fo] = fn[fo]
            }
        }
        for (fo in e) {
            if (!(fo in fn)) {
                fq[fo] = e[fo]
            }
        }
        return function (fr) {
            for (fo in fp) {
                fq[fo] = fp[fo](fr)
            }
            return fq
        }
    };
    var dH = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;

    function dq(e) {
        return e == "transform" ? d3.interpolateTransform : d3.interpolate
    }

    d3.interpolators = [d3.interpolateObject, function (fn, e) {
        return e instanceof Array && d3.interpolateArray(fn, e)
    }, function (fn, e) {
        return(typeof fn === "string" || typeof e === "string") && d3.interpolateString(fn + "", e + "")
    }, function (fn, e) {
        return(typeof e === "string" ? S.has(e) || /^(#|rgb\(|hsl\()/.test(e) : e instanceof c5 || e instanceof dn) && d3.interpolateRgb(fn, e)
    }, function (fn, e) {
        return !isNaN(fn = +fn) && !isNaN(e = +e) && d3.interpolateNumber(fn, e)
    }];
    function eV(fn, e) {
        e = e - (fn = +fn) ? 1 / (e - fn) : 0;
        return function (fo) {
            return(fo - fn) * e
        }
    }

    function Z(fn, e) {
        e = e - (fn = +fn) ? 1 / (e - fn) : 0;
        return function (fo) {
            return Math.max(0, Math.min(1, (fo - fn) * e))
        }
    }

    d3.rgb = function (fo, fn, e) {
        return arguments.length === 1 ? fo instanceof c5 ? cw(fo.r, fo.g, fo.b) : am("" + fo, cw, aA) : cw(~~fo, ~~fn, ~~e)
    };
    function cw(fo, fn, e) {
        return new c5(fo, fn, e)
    }

    function c5(fo, fn, e) {
        this.r = fo;
        this.g = fn;
        this.b = e
    }

    c5.prototype.brighter = function (fn) {
        fn = Math.pow(0.7, arguments.length ? fn : 1);
        var fq = this.r, fp = this.g, e = this.b, fo = 30;
        if (!fq && !fp && !e) {
            return cw(fo, fo, fo)
        }
        if (fq && fq < fo) {
            fq = fo
        }
        if (fp && fp < fo) {
            fp = fo
        }
        if (e && e < fo) {
            e = fo
        }
        return cw(Math.min(255, Math.floor(fq / fn)), Math.min(255, Math.floor(fp / fn)), Math.min(255, Math.floor(e / fn)))
    };
    c5.prototype.darker = function (e) {
        e = Math.pow(0.7, arguments.length ? e : 1);
        return cw(Math.floor(e * this.r), Math.floor(e * this.g), Math.floor(e * this.b))
    };
    c5.prototype.hsl = function () {
        return ed(this.r, this.g, this.b)
    };
    c5.prototype.toString = function () {
        return"#" + bn(this.r) + bn(this.g) + bn(this.b)
    };
    function bn(e) {
        return e < 16 ? "0" + Math.max(0, e).toString(16) : Math.min(255, e).toString(16)
    }

    function am(fr, fp, fs) {
        var e = 0, fo = 0, fq = 0, fu, ft, fn;
        fu = /([a-z]+)\((.*)\)/i.exec(fr);
        if (fu) {
            ft = fu[2].split(",");
            switch (fu[1]) {
                case"hsl":
                    return fs(parseFloat(ft[0]), parseFloat(ft[1]) / 100, parseFloat(ft[2]) / 100);
                case"rgb":
                    return fp(cR(ft[0]), cR(ft[1]), cR(ft[2]))
            }
        }
        if (fn = S.get(fr)) {
            return fp(fn.r, fn.g, fn.b)
        }
        if (fr != null && fr.charAt(0) === "#") {
            if (fr.length === 4) {
                e = fr.charAt(1);
                e += e;
                fo = fr.charAt(2);
                fo += fo;
                fq = fr.charAt(3);
                fq += fq
            } else {
                if (fr.length === 7) {
                    e = fr.substring(1, 3);
                    fo = fr.substring(3, 5);
                    fq = fr.substring(5, 7)
                }
            }
            e = parseInt(e, 16);
            fo = parseInt(fo, 16);
            fq = parseInt(fq, 16)
        }
        return fp(e, fo, fq)
    }

    function ed(e, fq, fs) {
        var fo = Math.min(e /= 255, fq /= 255, fs /= 255), ft = Math.max(e, fq, fs), fr = ft - fo, fp, fu, fn = (ft + fo) / 2;
        if (fr) {
            fu = fn < 0.5 ? fr / (ft + fo) : fr / (2 - ft - fo);
            if (e == ft) {
                fp = (fq - fs) / fr + (fq < fs ? 6 : 0)
            } else {
                if (fq == ft) {
                    fp = (fs - e) / fr + 2
                } else {
                    fp = (e - fq) / fr + 4
                }
            }
            fp *= 60
        } else {
            fu = fp = 0
        }
        return cG(fp, fu, fn)
    }

    function cm(fp, fo, fn) {
        fp = b6(fp);
        fo = b6(fo);
        fn = b6(fn);
        var e = d9((0.4124564 * fp + 0.3575761 * fo + 0.1804375 * fn) / aC), fr = d9((0.2126729 * fp + 0.7151522 * fo + 0.072175 * fn) / ay), fq = d9((0.0193339 * fp + 0.119192 * fo + 0.9503041 * fn) / aw);
        return bg(116 * fr - 16, 500 * (e - fr), 200 * (fr - fq))
    }

    function b6(e) {
        return(e /= 255) <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4)
    }

    function cR(fn) {
        var e = parseFloat(fn);
        return fn.charAt(fn.length - 1) === "%" ? Math.round(e * 2.55) : e
    }

    var S = d3.map({aliceblue:"#f0f8ff", antiquewhite:"#faebd7", aqua:"#00ffff", aquamarine:"#7fffd4", azure:"#f0ffff", beige:"#f5f5dc", bisque:"#ffe4c4", black:"#000000", blanchedalmond:"#ffebcd", blue:"#0000ff", blueviolet:"#8a2be2", brown:"#a52a2a", burlywood:"#deb887", cadetblue:"#5f9ea0", chartreuse:"#7fff00", chocolate:"#d2691e", coral:"#ff7f50", cornflowerblue:"#6495ed", cornsilk:"#fff8dc", crimson:"#dc143c", cyan:"#00ffff", darkblue:"#00008b", darkcyan:"#008b8b", darkgoldenrod:"#b8860b", darkgray:"#a9a9a9", darkgreen:"#006400", darkgrey:"#a9a9a9", darkkhaki:"#bdb76b", darkmagenta:"#8b008b", darkolivegreen:"#556b2f", darkorange:"#ff8c00", darkorchid:"#9932cc", darkred:"#8b0000", darksalmon:"#e9967a", darkseagreen:"#8fbc8f", darkslateblue:"#483d8b", darkslategray:"#2f4f4f", darkslategrey:"#2f4f4f", darkturquoise:"#00ced1", darkviolet:"#9400d3", deeppink:"#ff1493", deepskyblue:"#00bfff", dimgray:"#696969", dimgrey:"#696969", dodgerblue:"#1e90ff", firebrick:"#b22222", floralwhite:"#fffaf0", forestgreen:"#228b22", fuchsia:"#ff00ff", gainsboro:"#dcdcdc", ghostwhite:"#f8f8ff", gold:"#ffd700", goldenrod:"#daa520", gray:"#808080", green:"#008000", greenyellow:"#adff2f", grey:"#808080", honeydew:"#f0fff0", hotpink:"#ff69b4", indianred:"#cd5c5c", indigo:"#4b0082", ivory:"#fffff0", khaki:"#f0e68c", lavender:"#e6e6fa", lavenderblush:"#fff0f5", lawngreen:"#7cfc00", lemonchiffon:"#fffacd", lightblue:"#add8e6", lightcoral:"#f08080", lightcyan:"#e0ffff", lightgoldenrodyellow:"#fafad2", lightgray:"#d3d3d3", lightgreen:"#90ee90", lightgrey:"#d3d3d3", lightpink:"#ffb6c1", lightsalmon:"#ffa07a", lightseagreen:"#20b2aa", lightskyblue:"#87cefa", lightslategray:"#778899", lightslategrey:"#778899", lightsteelblue:"#b0c4de", lightyellow:"#ffffe0", lime:"#00ff00", limegreen:"#32cd32", linen:"#faf0e6", magenta:"#ff00ff", maroon:"#800000", mediumaquamarine:"#66cdaa", mediumblue:"#0000cd", mediumorchid:"#ba55d3", mediumpurple:"#9370db", mediumseagreen:"#3cb371", mediumslateblue:"#7b68ee", mediumspringgreen:"#00fa9a", mediumturquoise:"#48d1cc", mediumvioletred:"#c71585", midnightblue:"#191970", mintcream:"#f5fffa", mistyrose:"#ffe4e1", moccasin:"#ffe4b5", navajowhite:"#ffdead", navy:"#000080", oldlace:"#fdf5e6", olive:"#808000", olivedrab:"#6b8e23", orange:"#ffa500", orangered:"#ff4500", orchid:"#da70d6", palegoldenrod:"#eee8aa", palegreen:"#98fb98", paleturquoise:"#afeeee", palevioletred:"#db7093", papayawhip:"#ffefd5", peachpuff:"#ffdab9", peru:"#cd853f", pink:"#ffc0cb", plum:"#dda0dd", powderblue:"#b0e0e6", purple:"#800080", red:"#ff0000", rosybrown:"#bc8f8f", royalblue:"#4169e1", saddlebrown:"#8b4513", salmon:"#fa8072", sandybrown:"#f4a460", seagreen:"#2e8b57", seashell:"#fff5ee", sienna:"#a0522d", silver:"#c0c0c0", skyblue:"#87ceeb", slateblue:"#6a5acd", slategray:"#708090", slategrey:"#708090", snow:"#fffafa", springgreen:"#00ff7f", steelblue:"#4682b4", tan:"#d2b48c", teal:"#008080", thistle:"#d8bfd8", tomato:"#ff6347", turquoise:"#40e0d0", violet:"#ee82ee", wheat:"#f5deb3", white:"#ffffff", whitesmoke:"#f5f5f5", yellow:"#ffff00", yellowgreen:"#9acd32"});
    S.forEach(function (e, fn) {
        S.set(e, am(fn, cw, aA))
    });
    d3.hsl = function (fo, fn, e) {
        return arguments.length === 1 ? fo instanceof dn ? cG(fo.h, fo.s, fo.l) : am("" + fo, ed, cG) : cG(+fo, +fn, +e)
    };
    function cG(fo, fn, e) {
        return new dn(fo, fn, e)
    }

    function dn(fo, fn, e) {
        this.h = fo;
        this.s = fn;
        this.l = e
    }

    dn.prototype.brighter = function (e) {
        e = Math.pow(0.7, arguments.length ? e : 1);
        return cG(this.h, this.s, this.l / e)
    };
    dn.prototype.darker = function (e) {
        e = Math.pow(0.7, arguments.length ? e : 1);
        return cG(this.h, this.s, e * this.l)
    };
    dn.prototype.rgb = function () {
        return aA(this.h, this.s, this.l)
    };
    dn.prototype.toString = function () {
        return this.rgb().toString()
    };
    function aA(fr, fq, e) {
        var fp, fo;
        fr = fr % 360;
        if (fr < 0) {
            fr += 360
        }
        fq = fq < 0 ? 0 : fq > 1 ? 1 : fq;
        e = e < 0 ? 0 : e > 1 ? 1 : e;
        fo = e <= 0.5 ? e * (1 + fq) : e + fq - e * fq;
        fp = 2 * e - fo;
        function fn(ft) {
            if (ft > 360) {
                ft -= 360
            } else {
                if (ft < 0) {
                    ft += 360
                }
            }
            if (ft < 60) {
                return fp + (fo - fp) * ft / 60
            }
            if (ft < 180) {
                return fo
            }
            if (ft < 240) {
                return fp + (fo - fp) * (240 - ft) / 60
            }
            return fp
        }

        function fs(ft) {
            return Math.round(fn(ft) * 255)
        }

        return cw(fs(fr + 120), fs(fr), fs(fr - 120))
    }

    d3.hcl = function (fn, fo, e) {
        return arguments.length === 1 ? fn instanceof bl ? aN(fn.h, fn.c, fn.l) : fn instanceof bP ? eo(fn.l, fn.a, fn.b) : eo((fn = cm((fn = d3.rgb(fn)).r, fn.g, fn.b)).l, fn.a, fn.b) : aN(+fn, +fo, +e)
    };
    function aN(fn, fo, e) {
        return new bl(fn, fo, e)
    }

    function bl(fn, fo, e) {
        this.h = fn;
        this.c = fo;
        this.l = e
    }

    bl.prototype.brighter = function (e) {
        return aN(this.h, this.c, Math.min(100, this.l + aI * (arguments.length ? e : 1)))
    };
    bl.prototype.darker = function (e) {
        return aN(this.h, this.c, Math.max(0, this.l - aI * (arguments.length ? e : 1)))
    };
    bl.prototype.rgb = function () {
        return aO(this.h, this.c, this.l).rgb()
    };
    bl.prototype.toString = function () {
        return this.rgb() + ""
    };
    function aO(fn, fo, e) {
        return bg(e, Math.cos(fn *= Math.PI / 180) * fo, Math.sin(fn) * fo)
    }

    d3.lab = function (fo, fn, e) {
        return arguments.length === 1 ? fo instanceof bP ? bg(fo.l, fo.a, fo.b) : fo instanceof bl ? aO(fo.l, fo.c, fo.h) : cm((fo = d3.rgb(fo)).r, fo.g, fo.b) : bg(+fo, +fn, +e)
    };
    function bg(fo, fn, e) {
        return new bP(fo, fn, e)
    }

    function bP(fo, fn, e) {
        this.l = fo;
        this.a = fn;
        this.b = e
    }

    var aI = 18;
    var aC = 0.95047, ay = 1, aw = 1.08883;
    bP.prototype.brighter = function (e) {
        return bg(Math.min(100, this.l + aI * (arguments.length ? e : 1)), this.a, this.b)
    };
    bP.prototype.darker = function (e) {
        return bg(Math.max(0, this.l - aI * (arguments.length ? e : 1)), this.a, this.b)
    };
    bP.prototype.rgb = function () {
        return ab(this.l, this.a, this.b)
    };
    bP.prototype.toString = function () {
        return this.rgb() + ""
    };
    function ab(fp, fo, fn) {
        var fr = (fp + 16) / 116, e = fr + fo / 500, fq = fr - fn / 200;
        e = eC(e) * aC;
        fr = eC(fr) * ay;
        fq = eC(fq) * aw;
        return cw(c(3.2404542 * e - 1.5371385 * fr - 0.4985314 * fq), c(-0.969266 * e + 1.8760108 * fr + 0.041556 * fq), c(0.0556434 * e - 0.2040259 * fr + 1.0572252 * fq))
    }

    function eo(fo, fn, e) {
        return aN(Math.atan2(e, fn) / Math.PI * 180, Math.sqrt(fn * fn + e * e), fo)
    }

    function eC(e) {
        return e > 0.206893034 ? e * e * e : (e - 4 / 29) / 7.787037
    }

    function d9(e) {
        return e > 0.008856 ? Math.pow(e, 1 / 3) : 7.787037 * e + 4 / 29
    }

    function c(e) {
        return Math.round(255 * (e <= 0.00304 ? 12.92 * e : 1.055 * Math.pow(e, 1 / 2.4) - 0.055))
    }

    function ck(e) {
        cS(e, cj);
        return e
    }

    var bY = function (e, fn) {
        return fn.querySelector(e)
    }, dR = function (e, fn) {
        return fn.querySelectorAll(e)
    }, cE = document.documentElement, b = cE.matchesSelector || cE.webkitMatchesSelector || cE.mozMatchesSelector || cE.msMatchesSelector || cE.oMatchesSelector, a = function (fn, e) {
        return b.call(fn, e)
    };
    if (typeof Sizzle === "function") {
        bY = function (e, fn) {
            return Sizzle(e, fn)[0] || null
        };
        dR = function (e, fn) {
            return Sizzle.uniqueSort(Sizzle(e, fn))
        };
        a = Sizzle.matchesSelector
    }
    var cj = [];
    d3.selection = function () {
        return ev
    };
    d3.selection.prototype = cj;
    cj.select = function (fr) {
        var fo = [], fv, e, fu, fp;
        if (typeof fr !== "function") {
            fr = t(fr)
        }
        for (var fs = -1, fq = this.length; ++fs < fq;) {
            fo.push(fv = []);
            fv.parentNode = (fu = this[fs]).parentNode;
            for (var ft = -1, fn = fu.length; ++ft < fn;) {
                if (fp = fu[ft]) {
                    fv.push(e = fr.call(fp, fp.__data__, ft));
                    if (e && "__data__" in fp) {
                        e.__data__ = fp.__data__
                    }
                } else {
                    fv.push(null)
                }
            }
        }
        return ck(fo)
    };
    function t(e) {
        return function () {
            return bY(e, this)
        }
    }

    cj.selectAll = function (fq) {
        var fn = [], fu, fo;
        if (typeof fq !== "function") {
            fq = bK(fq)
        }
        for (var fr = -1, fp = this.length; ++fr < fp;) {
            for (var ft = this[fr], fs = -1, e = ft.length; ++fs < e;) {
                if (fo = ft[fs]) {
                    fn.push(fu = cc(fq.call(fo, fo.__data__, fs)));
                    fu.parentNode = fo
                }
            }
        }
        return ck(fn)
    };
    function bK(e) {
        return function () {
            return dR(e, this)
        }
    }

    cj.attr = function (e, fo) {
        if (arguments.length < 2) {
            if (typeof e === "string") {
                var fn = this.node();
                e = d3.ns.qualify(e);
                return e.local ? fn.getAttributeNS(e.space, e.local) : fn.getAttribute(e)
            }
            for (fo in e) {
                this.each(aJ(fo, e[fo]))
            }
            return this
        }
        return this.each(aJ(e, fo))
    };
    function aJ(fo, fs) {
        fo = d3.ns.qualify(fo);
        function fn() {
            this.removeAttribute(fo)
        }

        function ft() {
            this.removeAttributeNS(fo.space, fo.local)
        }

        function fr() {
            this.setAttribute(fo, fs)
        }

        function fq() {
            this.setAttributeNS(fo.space, fo.local, fs)
        }

        function e() {
            var fu = fs.apply(this, arguments);
            if (fu == null) {
                this.removeAttribute(fo)
            } else {
                this.setAttribute(fo, fu)
            }
        }

        function fp() {
            var fu = fs.apply(this, arguments);
            if (fu == null) {
                this.removeAttributeNS(fo.space, fo.local)
            } else {
                this.setAttributeNS(fo.space, fo.local, fu)
            }
        }

        return fs == null ? fo.local ? ft : fn : typeof fs === "function" ? fo.local ? fp : e : fo.local ? fq : fr
    }

    cj.classed = function (e, fp) {
        if (arguments.length < 2) {
            if (typeof e === "string") {
                var fo = this.node(), fq = (e = e.trim().split(/^|\s+/g)).length, fn = -1;
                if (fp = fo.classList) {
                    while (++fn < fq) {
                        if (!fp.contains(e[fn])) {
                            return false
                        }
                    }
                } else {
                    fp = fo.className;
                    if (fp.baseVal != null) {
                        fp = fp.baseVal
                    }
                    while (++fn < fq) {
                        if (!es(e[fn]).test(fp)) {
                            return false
                        }
                    }
                }
                return true
            }
            for (fp in e) {
                this.each(ej(fp, e[fp]))
            }
            return this
        }
        return this.each(ej(e, fp))
    };
    function es(e) {
        return new RegExp("(?:^|\\s+)" + d3.requote(e) + "(?:\\s+|$)", "g")
    }

    function ej(fn, fp) {
        fn = fn.trim().split(/\s+/).map(ff);
        var fq = fn.length;

        function e() {
            var fr = -1;
            while (++fr < fq) {
                fn[fr](this, fp)
            }
        }

        function fo() {
            var fs = -1, fr = fp.apply(this, arguments);
            while (++fs < fq) {
                fn[fs](this, fr)
            }
        }

        return typeof fp === "function" ? fo : e
    }

    function ff(e) {
        var fn = es(e);
        return function (fq, fr) {
            if (fs = fq.classList) {
                return fr ? fs.add(e) : fs.remove(e)
            }
            var fs = fq.className, fo = fs.baseVal != null, fp = fo ? fs.baseVal : fs;
            if (fr) {
                fn.lastIndex = 0;
                if (!fn.test(fp)) {
                    fp = bw(fp + " " + e);
                    if (fo) {
                        fs.baseVal = fp
                    } else {
                        fq.className = fp
                    }
                }
            } else {
                if (fp) {
                    fp = bw(fp.replace(fn, " "));
                    if (fo) {
                        fs.baseVal = fp
                    } else {
                        fq.className = fp
                    }
                }
            }
        }
    }

    cj.style = function (e, fo, fn) {
        var fp = arguments.length;
        if (fp < 3) {
            if (typeof e !== "string") {
                if (fp < 2) {
                    fo = ""
                }
                for (fn in e) {
                    this.each(dF(fn, e[fn], fo))
                }
                return this
            }
            if (fp < 2) {
                return window.getComputedStyle(this.node(), null).getPropertyValue(e)
            }
            fn = ""
        }
        return this.each(dF(e, fo, fn))
    };
    function dF(fo, fr, fp) {
        function fn() {
            this.style.removeProperty(fo)
        }

        function fq() {
            this.style.setProperty(fo, fr, fp)
        }

        function e() {
            var fs = fr.apply(this, arguments);
            if (fs == null) {
                this.style.removeProperty(fo)
            } else {
                this.style.setProperty(fo, fs, fp)
            }
        }

        return fr == null ? fn : typeof fr === "function" ? e : fq
    }

    cj.property = function (e, fn) {
        if (arguments.length < 2) {
            if (typeof e === "string") {
                return this.node()[e]
            }
            for (fn in e) {
                this.each(e2(fn, e[fn]))
            }
            return this
        }
        return this.each(e2(e, fn))
    };
    function e2(fn, fp) {
        function e() {
            delete this[fn]
        }

        function fo() {
            this[fn] = fp
        }

        function fq() {
            var fr = fp.apply(this, arguments);
            if (fr == null) {
                delete this[fn]
            } else {
                this[fn] = fr
            }
        }

        return fp == null ? e : typeof fp === "function" ? fq : fo
    }

    cj.text = function (e) {
        return arguments.length < 1 ? this.node().textContent : this.each(typeof e === "function" ? function () {
            var fn = e.apply(this, arguments);
            this.textContent = fn == null ? "" : fn
        } : e == null ? function () {
            this.textContent = ""
        } : function () {
            this.textContent = e
        })
    };
    cj.html = function (e) {
        return arguments.length < 1 ? this.node().innerHTML : this.each(typeof e === "function" ? function () {
            var fn = e.apply(this, arguments);
            this.innerHTML = fn == null ? "" : fn
        } : e == null ? function () {
            this.innerHTML = ""
        } : function () {
            this.innerHTML = e
        })
    };
    cj.append = function (fn) {
        fn = d3.ns.qualify(fn);
        function e() {
            return this.appendChild(document.createElementNS(this.namespaceURI, fn))
        }

        function fo() {
            return this.appendChild(document.createElementNS(fn.space, fn.local))
        }

        return this.select(fn.local ? fo : e)
    };
    cj.insert = function (e, fo) {
        e = d3.ns.qualify(e);
        function fn() {
            return this.insertBefore(document.createElementNS(this.namespaceURI, e), bY(fo, this))
        }

        function fp() {
            return this.insertBefore(document.createElementNS(e.space, e.local), bY(fo, this))
        }

        return this.select(e.local ? fp : fn)
    };
    cj.remove = function () {
        return this.each(function () {
            var e = this.parentNode;
            if (e) {
                e.removeChild(this)
            }
        })
    };
    cj.data = function (ft, fv) {
        var fq = -1, fn = this.length, fu, fo;
        if (!arguments.length) {
            ft = new Array(fn = (fu = this[0]).length);
            while (++fq < fn) {
                if (fo = fu[fq]) {
                    ft[fq] = fo.__data__
                }
            }
            return ft
        }
        function fr(fI, fA) {
            var fD, fx = fI.length, fz = fA.length, fG = Math.min(fx, fz), fF = Math.max(fx, fz), fK = [], fH = [], fE = [], fy, fw;
            if (fv) {
                var fL = new ae, fJ = [], fC, fB = fA.length;
                for (fD = -1; ++fD < fx;) {
                    fC = fv.call(fy = fI[fD], fy.__data__, fD);
                    if (fL.has(fC)) {
                        fE[fB++] = fy
                    } else {
                        fL.set(fC, fy)
                    }
                    fJ.push(fC)
                }
                for (fD = -1; ++fD < fz;) {
                    fC = fv.call(fA, fw = fA[fD], fD);
                    if (fL.has(fC)) {
                        fK[fD] = fy = fL.get(fC);
                        fy.__data__ = fw;
                        fH[fD] = fE[fD] = null
                    } else {
                        fH[fD] = B(fw);
                        fK[fD] = fE[fD] = null
                    }
                    fL.remove(fC)
                }
                for (fD = -1; ++fD < fx;) {
                    if (fL.has(fJ[fD])) {
                        fE[fD] = fI[fD]
                    }
                }
            } else {
                for (fD = -1; ++fD < fG;) {
                    fy = fI[fD];
                    fw = fA[fD];
                    if (fy) {
                        fy.__data__ = fw;
                        fK[fD] = fy;
                        fH[fD] = fE[fD] = null
                    } else {
                        fH[fD] = B(fw);
                        fK[fD] = fE[fD] = null
                    }
                }
                for (; fD < fz; ++fD) {
                    fH[fD] = B(fA[fD]);
                    fK[fD] = fE[fD] = null
                }
                for (; fD < fF; ++fD) {
                    fE[fD] = fI[fD];
                    fH[fD] = fK[fD] = null
                }
            }
            fH.update = fK;
            fH.parentNode = fK.parentNode = fE.parentNode = fI.parentNode;
            fs.push(fH);
            fp.push(fK);
            e.push(fE)
        }

        var fs = a0([]), fp = ck([]), e = ck([]);
        if (typeof ft === "function") {
            while (++fq < fn) {
                fr(fu = this[fq], ft.call(fu, fu.parentNode.__data__, fq))
            }
        } else {
            while (++fq < fn) {
                fr(fu = this[fq], ft)
            }
        }
        fp.enter = function () {
            return fs
        };
        fp.exit = function () {
            return e
        };
        return fp
    };
    function B(e) {
        return{__data__:e}
    }

    cj.datum = cj.map = function (e) {
        return arguments.length < 1 ? this.property("__data__") : this.property("__data__", e)
    };
    cj.filter = function (e) {
        var fo = [], fu, ft, fp;
        if (typeof e !== "function") {
            e = au(e)
        }
        for (var fr = 0, fq = this.length; fr < fq; fr++) {
            fo.push(fu = []);
            fu.parentNode = (ft = this[fr]).parentNode;
            for (var fs = 0, fn = ft.length; fs < fn; fs++) {
                if ((fp = ft[fs]) && e.call(fp, fp.__data__, fs)) {
                    fu.push(fp)
                }
            }
        }
        return ck(fo)
    };
    function au(e) {
        return function () {
            return a(this, e)
        }
    }

    cj.order = function () {
        for (var fn = -1, e = this.length; ++fn < e;) {
            for (var fr = this[fn], fo = fr.length - 1, fp = fr[fo], fq; --fo >= 0;) {
                if (fq = fr[fo]) {
                    if (fp && fp !== fq.nextSibling) {
                        fp.parentNode.insertBefore(fq, fp)
                    }
                    fp = fq
                }
            }
        }
        return this
    };
    cj.sort = function (fn) {
        fn = eq.apply(this, arguments);
        for (var fo = -1, e = this.length; ++fo < e;) {
            this[fo].sort(fn)
        }
        return this.order()
    };
    function eq(e) {
        if (!arguments.length) {
            e = d3.ascending
        }
        return function (fo, fn) {
            return e(fo && fo.__data__, fn && fn.__data__)
        }
    }

    cj.on = function (fn, fo, e) {
        var fp = arguments.length;
        if (fp < 3) {
            if (typeof fn !== "string") {
                if (fp < 2) {
                    fo = false
                }
                for (e in fn) {
                    this.each(l(e, fn[e], fo))
                }
                return this
            }
            if (fp < 2) {
                return(fp = this.node()["__on" + fn]) && fp._
            }
            e = false
        }
        return this.each(l(fn, fo, e))
    };
    function l(fq, fr, e) {
        var fo = "__on" + fq, fp = fq.indexOf(".");
        if (fp > 0) {
            fq = fq.substring(0, fp)
        }
        function fn() {
            var ft = this[fo];
            if (ft) {
                this.removeEventListener(fq, ft, ft.$);
                delete this[fo]
            }
        }

        function fs() {
            var fu = this, ft = arguments;
            fn.call(this);
            this.addEventListener(fq, this[fo] = fv, fv.$ = e);
            fv._ = fr;
            function fv(fw) {
                var fx = d3.event;
                d3.event = fw;
                ft[0] = fu.__data__;
                try {
                    fr.apply(fu, ft)
                } finally {
                    d3.event = fx
                }
            }
        }

        return fr ? fs : fn
    }

    cj.each = function (e) {
        return bx(this, function (fp, fo, fn) {
            e.call(fp, fp.__data__, fo, fn)
        })
    };
    function bx(fn, ft) {
        for (var fo = 0, e = fn.length; fo < e; fo++) {
            for (var fr = fn[fo], fp = 0, fs = fr.length, fq; fp < fs; fp++) {
                if (fq = fr[fp]) {
                    ft(fq, fp, fo)
                }
            }
        }
        return fn
    }

    cj.call = function (e) {
        e.apply(this, (arguments[0] = this, arguments));
        return this
    };
    cj.empty = function () {
        return !this.node()
    };
    cj.node = function (fs) {
        for (var fn = 0, e = this.length; fn < e; fn++) {
            for (var fq = this[fn], fo = 0, fr = fq.length; fo < fr; fo++) {
                var fp = fq[fo];
                if (fp) {
                    return fp
                }
            }
        }
        return null
    };
    cj.transition = function () {
        var fn = [], fo, fr;
        for (var fp = -1, e = this.length; ++fp < e;) {
            fn.push(fo = []);
            for (var fs = this[fp], fq = -1, ft = fs.length; ++fq < ft;) {
                fo.push((fr = fs[fq]) ? {node:fr, delay:cZ, duration:eD} : null)
            }
        }
        return et(fn, eK || ++eY, Date.now())
    };
    var ev = ck([
        [document]
    ]);
    ev[0].parentNode = cE;
    d3.select = function (e) {
        return typeof e === "string" ? ev.select(e) : ck([
            [e]
        ])
    };
    d3.selectAll = function (e) {
        return typeof e === "string" ? ev.selectAll(e) : ck([cc(e)])
    };
    function a0(e) {
        cS(e, c2);
        return e
    }

    var c2 = [];
    d3.selection.enter = a0;
    d3.selection.enter.prototype = c2;
    c2.append = cj.append;
    c2.insert = cj.insert;
    c2.empty = cj.empty;
    c2.node = cj.node;
    c2.select = function (fr) {
        var fo = [], fw, e, fu, fv, fq;
        for (var fs = -1, fp = this.length; ++fs < fp;) {
            fu = (fv = this[fs]).update;
            fo.push(fw = []);
            fw.parentNode = fv.parentNode;
            for (var ft = -1, fn = fv.length; ++ft < fn;) {
                if (fq = fv[ft]) {
                    fw.push(fu[ft] = e = fr.call(fv.parentNode, fq.__data__, ft));
                    e.__data__ = fq.__data__
                } else {
                    fw.push(null)
                }
            }
        }
        return ck(fo)
    };
    function et(e, fr, fp) {
        cS(e, cz);
        var fo = new ae, fn = d3.dispatch("start", "end"), fq = aB;
        e.id = fr;
        e.time = fp;
        e.tween = function (fs, ft) {
            if (arguments.length < 2) {
                return fo.get(fs)
            }
            if (ft == null) {
                fo.remove(fs)
            } else {
                fo.set(fs, ft)
            }
            return e
        };
        e.ease = function (fs) {
            if (!arguments.length) {
                return fq
            }
            fq = typeof fs === "function" ? fs : d3.ease.apply(d3, arguments);
            return e
        };
        e.each = function (fs, ft) {
            if (arguments.length < 2) {
                return cd.call(e, fs)
            }
            fn.on(fs, ft);
            return e
        };
        d3.timer(function (fs) {
            return bx(e, function (fu, fx, fw) {
                var fC = [], fy = fu.delay, fv = fu.duration, fD = (fu = fu.node).__transition__ || (fu.__transition__ = {active:0, count:0}), fA = fu.__data__;
                ++fD.count;
                fy <= fs ? ft(fs) : d3.timer(ft, fy, fp);
                function ft(fE) {
                    if (fD.active > fr) {
                        return fB()
                    }
                    fD.active = fr;
                    fo.forEach(function (fF, fG) {
                        if (fG = fG.call(fu, fA, fx)) {
                            fC.push(fG)
                        }
                    });
                    fn.start.call(fu, fA, fx);
                    if (!fz(fE)) {
                        d3.timer(fz, 0, fp)
                    }
                    return 1
                }

                function fz(fE) {
                    if (fD.active !== fr) {
                        return fB()
                    }
                    var fF = (fE - fy) / fv, fG = fq(fF), fH = fC.length;
                    while (fH > 0) {
                        fC[--fH].call(fu, fG)
                    }
                    if (fF >= 1) {
                        fB();
                        eK = fr;
                        fn.end.call(fu, fA, fx);
                        eK = 0;
                        return 1
                    }
                }

                function fB() {
                    if (!--fD.count) {
                        delete fu.__transition__
                    }
                    return 1
                }
            })
        }, 0, fp);
        return e
    }

    var cz = [], eY = 0, eK = 0, f = 0, ey = 250, df = d3.ease("cubic-in-out"), cZ = f, eD = ey, aB = df;
    cz.call = cj.call;
    d3.transition = function (e) {
        return arguments.length ? eK ? e.transition() : e : ev.transition()
    };
    d3.transition.prototype = cz;
    cz.select = function (fr) {
        var fo = [], fv, e, fp;
        if (typeof fr !== "function") {
            fr = t(fr)
        }
        for (var fs = -1, fq = this.length; ++fs < fq;) {
            fo.push(fv = []);
            for (var fu = this[fs], ft = -1, fn = fu.length; ++ft < fn;) {
                if ((fp = fu[ft]) && (e = fr.call(fp.node, fp.node.__data__, ft))) {
                    if ("__data__" in fp.node) {
                        e.__data__ = fp.node.__data__
                    }
                    fv.push({node:e, delay:fp.delay, duration:fp.duration})
                } else {
                    fv.push(null)
                }
            }
        }
        return et(fo, this.id, this.time).ease(this.ease())
    };
    cz.selectAll = function (fs) {
        var fp = [], fx, e, fq;
        if (typeof fs !== "function") {
            fs = bK(fs)
        }
        for (var fu = -1, fr = this.length; ++fu < fr;) {
            for (var fw = this[fu], fv = -1, fo = fw.length; ++fv < fo;) {
                if (fq = fw[fv]) {
                    e = fs.call(fq.node, fq.node.__data__, fv);
                    fp.push(fx = []);
                    for (var ft = -1, fn = e.length; ++ft < fn;) {
                        fx.push({node:e[ft], delay:fq.delay, duration:fq.duration})
                    }
                }
            }
        }
        return et(fp, this.id, this.time).ease(this.ease())
    };
    cz.filter = function (e) {
        var fo = [], fu, ft, fp;
        if (typeof e !== "function") {
            e = au(e)
        }
        for (var fr = 0, fq = this.length; fr < fq; fr++) {
            fo.push(fu = []);
            for (var ft = this[fr], fs = 0, fn = ft.length; fs < fn; fs++) {
                if ((fp = ft[fs]) && e.call(fp.node, fp.node.__data__, fs)) {
                    fu.push(fp)
                }
            }
        }
        return et(fo, this.id, this.time).ease(this.ease())
    };
    cz.attr = function (e, fn) {
        if (arguments.length < 2) {
            for (fn in e) {
                this.attrTween(fn, dg(e[fn], fn))
            }
            return this
        }
        return this.attrTween(e, dg(fn, e))
    };
    cz.attrTween = function (e, fo) {
        var fn = d3.ns.qualify(e);

        function fp(ft, fr) {
            var fs = fo.call(this, ft, fr, this.getAttribute(fn));
            return fs === el ? (this.removeAttribute(fn), null) : fs && function (fu) {
                this.setAttribute(fn, fs(fu))
            }
        }

        function fq(ft, fr) {
            var fs = fo.call(this, ft, fr, this.getAttributeNS(fn.space, fn.local));
            return fs === el ? (this.removeAttributeNS(fn.space, fn.local), null) : fs && function (fu) {
                this.setAttributeNS(fn.space, fn.local, fs(fu))
            }
        }

        return this.tween("attr." + e, fn.local ? fq : fp)
    };
    cz.style = function (e, fo, fn) {
        var fp = arguments.length;
        if (fp < 3) {
            if (typeof e !== "string") {
                if (fp < 2) {
                    fo = ""
                }
                for (fn in e) {
                    this.styleTween(fn, dg(e[fn], fn), fo)
                }
                return this
            }
            fn = ""
        }
        return this.styleTween(e, dg(fo, e), fn)
    };
    cz.styleTween = function (e, fo, fn) {
        if (arguments.length < 3) {
            fn = ""
        }
        return this.tween("style." + e, function (fr, fp) {
            var fq = fo.call(this, fr, fp, window.getComputedStyle(this, null).getPropertyValue(e));
            return fq === el ? (this.style.removeProperty(e), null) : fq && function (fs) {
                this.style.setProperty(e, fq(fs), fn)
            }
        })
    };
    cz.text = function (e) {
        return this.tween("text", function (fo, fn) {
            this.textContent = typeof e === "function" ? e.call(this, fo, fn) : e
        })
    };
    cz.remove = function () {
        return this.each("end.transition", function () {
            var e;
            if (!this.__transition__ && (e = this.parentNode)) {
                e.removeChild(this)
            }
        })
    };
    cz.delay = function (e) {
        return bx(this, typeof e === "function" ? function (fp, fo, fn) {
            fp.delay = e.call(fp = fp.node, fp.__data__, fo, fn) | 0
        } : (e = e | 0, function (fn) {
            fn.delay = e
        }))
    };
    cz.duration = function (e) {
        return bx(this, typeof e === "function" ? function (fp, fo, fn) {
            fp.duration = Math.max(1, e.call(fp = fp.node, fp.__data__, fo, fn) | 0)
        } : (e = Math.max(1, e | 0), function (fn) {
            fn.duration = e
        }))
    };
    function cd(fq) {
        var fp = eK, fo = aB, e = cZ, fn = eD;
        eK = this.id;
        aB = this.ease();
        bx(this, function (ft, fs, fr) {
            cZ = ft.delay;
            eD = ft.duration;
            fq.call(ft = ft.node, ft.__data__, fs, fr)
        });
        eK = fp;
        aB = fo;
        cZ = e;
        eD = fn;
        return this
    }

    cz.transition = function () {
        return this.select(O)
    };
    d3.tween = function (e, fn) {
        function fp(ft, fs, fq) {
            var fr = e.call(this, ft, fs);
            return fr == null ? fq != "" && el : fq != fr && fn(fq, fr)
        }

        function fo(fs, fr, fq) {
            return fq != e && fn(fq, e)
        }

        return typeof e === "function" ? fp : e == null ? dZ : (e += "", fo)
    };
    var el = {};

    function dZ(fo, fn, e) {
        return e != "" && el
    }

    function dg(e, fn) {
        return d3.tween(e, dq(fn))
    }

    var a8 = null, bi, dd;
    d3.timer = function (fr, e, fq) {
        var fp = false, fo, fn = a8;
        if (arguments.length < 3) {
            if (arguments.length < 2) {
                e = 0
            } else {
                if (!isFinite(e)) {
                    return
                }
            }
            fq = Date.now()
        }
        while (fn) {
            if (fn.callback === fr) {
                fn.then = fq;
                fn.delay = e;
                fp = true;
                break
            }
            fo = fn;
            fn = fn.next
        }
        if (!fp) {
            a8 = {callback:fr, then:fq, delay:e, next:a8}
        }
        if (!bi) {
            dd = clearTimeout(dd);
            bi = 1;
            eT(eU)
        }
    };
    function eU() {
        var e, fo = Date.now(), fp = a8;
        while (fp) {
            e = fo - fp.then;
            if (e >= fp.delay) {
                fp.flush = fp.callback(e)
            }
            fp = fp.next
        }
        var fn = c4() - fo;
        if (fn > 24) {
            if (isFinite(fn)) {
                clearTimeout(dd);
                dd = setTimeout(eU, fn)
            }
            bi = 0
        } else {
            bi = 1;
            eT(eU)
        }
    }

    d3.timer.flush = function () {
        var e, fn = Date.now(), fo = a8;
        while (fo) {
            e = fn - fo.then;
            if (!fo.delay) {
                fo.flush = fo.callback(e)
            }
            fo = fo.next
        }
        c4()
    };
    function c4() {
        var fn = null, e = a8, fo = Infinity;
        while (e) {
            if (e.flush) {
                e = fn ? fn.next = e.next : a8 = e.next
            } else {
                fo = Math.min(fo, e.then + e.delay);
                e = (fn = e).next
            }
        }
        return fo
    }

    var eT = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
        setTimeout(e, 17)
    };
    d3.mouse = function (e) {
        return an(e, P())
    };
    var bu = /WebKit/.test(navigator.userAgent) ? -1 : 0;

    function an(fp, fs) {
        var fq = fp.ownerSVGElement || fp;
        if (fq.createSVGPoint) {
            var fn = fq.createSVGPoint();
            if (bu < 0 && (window.scrollX || window.scrollY)) {
                fq = d3.select(document.body).append("svg").style("position", "absolute").style("top", 0).style("left", 0);
                var fo = fq[0][0].getScreenCTM();
                bu = !(fo.f || fo.e);
                fq.remove()
            }
            if (bu) {
                fn.x = fs.pageX;
                fn.y = fs.pageY
            } else {
                fn.x = fs.clientX;
                fn.y = fs.clientY
            }
            fn = fn.matrixTransform(fp.getScreenCTM().inverse());
            return[fn.x, fn.y]
        }
        var fr = fp.getBoundingClientRect();
        return[fs.clientX - fr.left - fp.clientLeft, fs.clientY - fr.top - fp.clientTop]
    }

    d3.touches = function (e, fn) {
        if (arguments.length < 2) {
            fn = P().touches
        }
        return fn ? cc(fn).map(function (fp) {
            var fo = an(e, fp);
            fo.identifier = fp.identifier;
            return fo
        }) : []
    };
    function ad() {
    }

    d3.scale = {};
    function cx(fn) {
        var fo = fn[0], e = fn[fn.length - 1];
        return fo < e ? [fo, e] : [e, fo]
    }

    function ao(e) {
        return e.rangeExtent ? e.rangeExtent() : cx(e.range())
    }

    function d4(fs, fq) {
        var fr = 0, fp = fs.length - 1, fo = fs[fr], fn = fs[fp], e;
        if (fn < fo) {
            e = fr, fr = fp, fp = e;
            e = fo, fo = fn, fn = e
        }
        if (fq = fq(fn - fo)) {
            fs[fr] = fq.floor(fo);
            fs[fp] = fq.ceil(fn)
        }
        return fs
    }

    function cL() {
        return Math
    }

    d3.scale.linear = function () {
        return cu([0, 1], [0, 1], d3.interpolate, false)
    };
    function cu(fr, fp, fq, ft) {
        var fo, fn;

        function e() {
            var fu = Math.min(fr.length, fp.length) > 2 ? C : ac, fv = ft ? Z : eV;
            fo = fu(fr, fp, fv, fq);
            fn = fu(fp, fr, fv, d3.interpolate);
            return fs
        }

        function fs(fu) {
            return fo(fu)
        }

        fs.invert = function (fu) {
            return fn(fu)
        };
        fs.domain = function (fu) {
            if (!arguments.length) {
                return fr
            }
            fr = fu.map(Number);
            return e()
        };
        fs.range = function (fu) {
            if (!arguments.length) {
                return fp
            }
            fp = fu;
            return e()
        };
        fs.rangeRound = function (fu) {
            return fs.range(fu).interpolate(d3.interpolateRound)
        };
        fs.clamp = function (fu) {
            if (!arguments.length) {
                return ft
            }
            ft = fu;
            return e()
        };
        fs.interpolate = function (fu) {
            if (!arguments.length) {
                return fq
            }
            fq = fu;
            return e()
        };
        fs.ticks = function (fu) {
            return cY(fr, fu)
        };
        fs.tickFormat = function (fu) {
            return c8(fr, fu)
        };
        fs.nice = function () {
            d4(fr, ah);
            return e()
        };
        fs.copy = function () {
            return cu(fr, fp, fq, ft)
        };
        return e()
    }

    function dT(fn, e) {
        return d3.rebind(fn, e, "range", "rangeRound", "interpolate", "clamp")
    }

    function ah(e) {
        e = Math.pow(10, Math.round(Math.log(e) / Math.LN10) - 1);
        return e && {floor:function (fn) {
            return Math.floor(fn / e) * e
        }, ceil:function (fn) {
            return Math.ceil(fn / e) * e
        }}
    }

    function q(fr, e) {
        var fo = cx(fr), fn = fo[1] - fo[0], fq = Math.pow(10, Math.floor(Math.log(fn / e) / Math.LN10)), fp = e / fn * fq;
        if (fp <= 0.15) {
            fq *= 10
        } else {
            if (fp <= 0.35) {
                fq *= 5
            } else {
                if (fp <= 0.75) {
                    fq *= 2
                }
            }
        }
        fo[0] = Math.ceil(fo[0] / fq) * fq;
        fo[1] = Math.floor(fo[1] / fq) * fq + fq * 0.5;
        fo[2] = fq;
        return fo
    }

    function cY(fn, e) {
        return d3.range.apply(d3, q(fn, e))
    }

    function c8(fn, e) {
        return d3.format(",." + Math.max(0, -Math.floor(Math.log(q(fn, e)[2]) / Math.LN10 + 0.01)) + "f")
    }

    function ac(fq, e, fr, fo) {
        var fn = fr(fq[0], fq[1]), fp = fo(e[0], e[1]);
        return function (fs) {
            return fp(fn(fs))
        }
    }

    function C(fs, fn, ft, fq) {
        var fp = [], fr = [], fo = 0, e = Math.min(fs.length, fn.length) - 1;
        if (fs[e] < fs[0]) {
            fs = fs.slice().reverse();
            fn = fn.slice().reverse()
        }
        while (++fo <= e) {
            fp.push(ft(fs[fo - 1], fs[fo]));
            fr.push(fq(fn[fo - 1], fn[fo]))
        }
        return function (fu) {
            var fv = d3.bisect(fs, fu, 1, e) - 1;
            return fr[fv](fp[fv](fu))
        }
    }

    d3.scale.log = function () {
        return en(d3.scale.linear(), dU)
    };
    function en(e, fn) {
        var fo = fn.pow;

        function fp(fq) {
            return e(fn(fq))
        }

        fp.invert = function (fq) {
            return fo(e.invert(fq))
        };
        fp.domain = function (fq) {
            if (!arguments.length) {
                return e.domain().map(fo)
            }
            fn = fq[0] < 0 ? dX : dU;
            fo = fn.pow;
            e.domain(fq.map(fn));
            return fp
        };
        fp.nice = function () {
            e.domain(d4(e.domain(), cL));
            return fp
        };
        fp.ticks = function () {
            var fv = cx(e.domain()), fw = [];
            if (fv.every(isFinite)) {
                var fu = Math.floor(fv[0]), ft = Math.ceil(fv[1]), fs = fo(fv[0]), fr = fo(fv[1]);
                if (fn === dX) {
                    fw.push(fo(fu));
                    for (; fu++ < ft;) {
                        for (var fq = 9; fq > 0; fq--) {
                            fw.push(fo(fu) * fq)
                        }
                    }
                } else {
                    for (; fu < ft; fu++) {
                        for (var fq = 1; fq < 10; fq++) {
                            fw.push(fo(fu) * fq)
                        }
                    }
                    fw.push(fo(fu))
                }
                for (fu = 0; fw[fu] < fs; fu++) {
                }
                for (ft = fw.length; fw[ft - 1] > fr; ft--) {
                }
                fw = fw.slice(fu, ft)
            }
            return fw
        };
        fp.tickFormat = function (fu, ft) {
            if (arguments.length < 2) {
                ft = bZ
            }
            if (arguments.length < 1) {
                return ft
            }
            var fq = Math.max(0.1, fu / fp.ticks().length), fr = fn === dX ? (fs = -1e-12, Math.floor) : (fs = 1e-12, Math.ceil), fs;
            return function (fv) {
                return fv / fo(fr(fn(fv) + fs)) <= fq ? ft(fv) : ""
            }
        };
        fp.copy = function () {
            return en(e.copy(), fn)
        };
        return dT(fp, e)
    }

    var bZ = d3.format(".0e");

    function dU(e) {
        return Math.log(e < 0 ? 0 : e) / Math.LN10
    }

    function dX(e) {
        return -Math.log(e > 0 ? 0 : -e) / Math.LN10
    }

    dU.pow = function (e) {
        return Math.pow(10, e)
    };
    dX.pow = function (e) {
        return -Math.pow(10, -e)
    };
    d3.scale.pow = function () {
        return ea(d3.scale.linear(), 1)
    };
    function ea(e, fo) {
        var fn = dJ(fo), fp = dJ(1 / fo);

        function fq(fr) {
            return e(fn(fr))
        }

        fq.invert = function (fr) {
            return fp(e.invert(fr))
        };
        fq.domain = function (fr) {
            if (!arguments.length) {
                return e.domain().map(fp)
            }
            e.domain(fr.map(fn));
            return fq
        };
        fq.ticks = function (fr) {
            return cY(fq.domain(), fr)
        };
        fq.tickFormat = function (fr) {
            return c8(fq.domain(), fr)
        };
        fq.nice = function () {
            return fq.domain(d4(fq.domain(), ah))
        };
        fq.exponent = function (fr) {
            if (!arguments.length) {
                return fo
            }
            var fs = fq.domain();
            fn = dJ(fo = fr);
            fp = dJ(1 / fo);
            return fq.domain(fs)
        };
        fq.copy = function () {
            return ea(e.copy(), fo)
        };
        return dT(fq, e)
    }

    function dJ(fn) {
        return function (e) {
            return e < 0 ? -Math.pow(-e, fn) : Math.pow(e, fn)
        }
    }

    d3.scale.sqrt = function () {
        return d3.scale.pow().exponent(0.5)
    };
    d3.scale.ordinal = function () {
        return bj([], {t:"range", a:[
            []
        ]})
    };
    function bj(fr, fo) {
        var fq, fn, fp;

        function fs(ft) {
            return fn[((fq.get(ft) || fq.set(ft, fr.push(ft))) - 1) % fn.length]
        }

        function e(fu, ft) {
            return d3.range(fr.length).map(function (fv) {
                return fu + ft * fv
            })
        }

        fs.domain = function (ft) {
            if (!arguments.length) {
                return fr
            }
            fr = [];
            fq = new ae;
            var fv = -1, fw = ft.length, fu;
            while (++fv < fw) {
                if (!fq.has(fu = ft[fv])) {
                    fq.set(fu, fr.push(fu))
                }
            }
            return fs[fo.t].apply(fs, fo.a)
        };
        fs.range = function (ft) {
            if (!arguments.length) {
                return fn
            }
            fn = ft;
            fp = 0;
            fo = {t:"range", a:arguments};
            return fs
        };
        fs.rangePoints = function (ft, fw) {
            if (arguments.length < 2) {
                fw = 0
            }
            var fx = ft[0], fu = ft[1], fv = (fu - fx) / (fr.length - 1 + fw);
            fn = e(fr.length < 2 ? (fx + fu) / 2 : fx + fv * fw / 2, fv);
            fp = 0;
            fo = {t:"rangePoints", a:arguments};
            return fs
        };
        fs.rangeBands = function (fu, fy, ft) {
            if (arguments.length < 2) {
                fy = 0
            }
            if (arguments.length < 3) {
                ft = fy
            }
            var fv = fu[1] < fu[0], fz = fu[fv - 0], fw = fu[1 - fv], fx = (fw - fz) / (fr.length - fy + 2 * ft);
            fn = e(fz + fx * ft, fx);
            if (fv) {
                fn.reverse()
            }
            fp = fx * (1 - fy);
            fo = {t:"rangeBands", a:arguments};
            return fs
        };
        fs.rangeRoundBands = function (fu, fz, ft) {
            if (arguments.length < 2) {
                fz = 0
            }
            if (arguments.length < 3) {
                ft = fz
            }
            var fw = fu[1] < fu[0], fA = fu[fw - 0], fx = fu[1 - fw], fy = Math.floor((fx - fA) / (fr.length - fz + 2 * ft)), fv = fx - fA - (fr.length - fz) * fy;
            fn = e(fA + Math.round(fv / 2), fy);
            if (fw) {
                fn.reverse()
            }
            fp = Math.round(fy * (1 - fz));
            fo = {t:"rangeRoundBands", a:arguments};
            return fs
        };
        fs.rangeBand = function () {
            return fp
        };
        fs.rangeExtent = function () {
            return cx(fo.a[0])
        };
        fs.copy = function () {
            return bj(fr, fo)
        };
        return fs.domain(fr)
    }

    d3.scale.category10 = function () {
        return d3.scale.ordinal().range(br)
    };
    d3.scale.category20 = function () {
        return d3.scale.ordinal().range(bc)
    };
    d3.scale.category20b = function () {
        return d3.scale.ordinal().range(eJ)
    };
    d3.scale.category20c = function () {
        return d3.scale.ordinal().range(eI)
    };
    var br = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
    var bc = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"];
    var eJ = ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"];
    var eI = ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9"];
    d3.scale.quantile = function () {
        return w([], [])
    };
    function w(fo, fn) {
        var fp;

        function e() {
            var fr = 0, ft = fo.length, fs = fn.length;
            fp = [];
            while (++fr < fs) {
                fp[fr - 1] = d3.quantile(fo, fr / fs)
            }
            return fq
        }

        function fq(fr) {
            if (isNaN(fr = +fr)) {
                return NaN
            }
            return fn[d3.bisect(fp, fr)]
        }

        fq.domain = function (fr) {
            if (!arguments.length) {
                return fo
            }
            fo = fr.filter(function (fs) {
                return !isNaN(fs)
            }).sort(d3.ascending);
            return e()
        };
        fq.range = function (fr) {
            if (!arguments.length) {
                return fn
            }
            fn = fr;
            return e()
        };
        fq.quantiles = function () {
            return fp
        };
        fq.copy = function () {
            return w(fo, fn)
        };
        return e()
    }

    d3.scale.quantize = function () {
        return b8(0, 1, [0, 1])
    };
    function b8(fq, fo, fn) {
        var fr, fp;

        function fs(ft) {
            return fn[Math.max(0, Math.min(fp, Math.floor(fr * (ft - fq))))]
        }

        function e() {
            fr = fn.length / (fo - fq);
            fp = fn.length - 1;
            return fs
        }

        fs.domain = function (ft) {
            if (!arguments.length) {
                return[fq, fo]
            }
            fq = +ft[0];
            fo = +ft[ft.length - 1];
            return e()
        };
        fs.range = function (ft) {
            if (!arguments.length) {
                return fn
            }
            fn = ft;
            return e()
        };
        fs.copy = function () {
            return b8(fq, fo, fn)
        };
        return e()
    }

    d3.scale.threshold = function () {
        return dP([0.5], [0, 1])
    };
    function dP(fn, e) {
        function fo(fp) {
            return e[d3.bisect(fn, fp)]
        }

        fo.domain = function (fp) {
            if (!arguments.length) {
                return fn
            }
            fn = fp;
            return fo
        };
        fo.range = function (fp) {
            if (!arguments.length) {
                return e
            }
            e = fp;
            return fo
        };
        fo.copy = function () {
            return dP(fn, e)
        };
        return fo
    }

    d3.scale.identity = function () {
        return cM([0, 1])
    };
    function cM(fn) {
        function e(fo) {
            return +fo
        }

        e.invert = e;
        e.domain = e.range = function (fo) {
            if (!arguments.length) {
                return fn
            }
            fn = fo.map(e);
            return e
        };
        e.ticks = function (fo) {
            return cY(fn, fo)
        };
        e.tickFormat = function (fo) {
            return c8(fn, fo)
        };
        e.copy = function () {
            return cM(fn)
        };
        return e
    }

    d3.svg = {};
    d3.svg.arc = function () {
        var fq = aP, fp = bC, fo = dY, e = V;

        function fn() {
            var fu = fq.apply(this, arguments), ft = fp.apply(this, arguments), fs = fo.apply(this, arguments) + e3, fr = e.apply(this, arguments) + e3, fA = (fr < fs && (fA = fs, fs = fr, fr = fA), fr - fs), fx = fA < Math.PI ? "0" : "1", fw = Math.cos(fs), fz = Math.sin(fs), fv = Math.cos(fr), fy = Math.sin(fr);
            return fA >= e8 ? fu ? "M0," + ft + "A" + ft + "," + ft + " 0 1,1 0," + -ft + "A" + ft + "," + ft + " 0 1,1 0," + ft + "M0," + fu + "A" + fu + "," + fu + " 0 1,0 0," + -fu + "A" + fu + "," + fu + " 0 1,0 0," + fu + "Z" : "M0," + ft + "A" + ft + "," + ft + " 0 1,1 0," + -ft + "A" + ft + "," + ft + " 0 1,1 0," + ft + "Z" : fu ? "M" + ft * fw + "," + ft * fz + "A" + ft + "," + ft + " 0 " + fx + ",1 " + ft * fv + "," + ft * fy + "L" + fu * fv + "," + fu * fy + "A" + fu + "," + fu + " 0 " + fx + ",0 " + fu * fw + "," + fu * fz + "Z" : "M" + ft * fw + "," + ft * fz + "A" + ft + "," + ft + " 0 " + fx + ",1 " + ft * fv + "," + ft * fy + "L0,0Z"
        }

        fn.innerRadius = function (fr) {
            if (!arguments.length) {
                return fq
            }
            fq = H(fr);
            return fn
        };
        fn.outerRadius = function (fr) {
            if (!arguments.length) {
                return fp
            }
            fp = H(fr);
            return fn
        };
        fn.startAngle = function (fr) {
            if (!arguments.length) {
                return fo
            }
            fo = H(fr);
            return fn
        };
        fn.endAngle = function (fr) {
            if (!arguments.length) {
                return e
            }
            e = H(fr);
            return fn
        };
        fn.centroid = function () {
            var fs = (fq.apply(this, arguments) + fp.apply(this, arguments)) / 2, fr = (fo.apply(this, arguments) + e.apply(this, arguments)) / 2 + e3;
            return[Math.cos(fr) * fs, Math.sin(fr) * fs]
        };
        return fn
    };
    var e3 = -Math.PI / 2, e8 = 2 * Math.PI - 0.000001;

    function aP(e) {
        return e.innerRadius
    }

    function bC(e) {
        return e.outerRadius
    }

    function dY(e) {
        return e.startAngle
    }

    function V(e) {
        return e.endAngle
    }

    function c7(fn) {
        var e = ex, ft = ew, fs = R, fp = fb, fr = fp.key, fq = 0.7;

        function fo(fz) {
            var fB = [], fE = [], fA = -1, fu = fz.length, fD, fw = H(e), fv = H(ft);

            function fC() {
                fB.push("M", fp(fn(fE), fq))
            }

            while (++fA < fu) {
                if (fs.call(this, fD = fz[fA], fA)) {
                    fE.push([+fw.call(this, fD, fA), +fv.call(this, fD, fA)])
                } else {
                    if (fE.length) {
                        fC();
                        fE = []
                    }
                }
            }
            if (fE.length) {
                fC()
            }
            return fB.length ? fB.join("") : null
        }

        fo.x = function (fu) {
            if (!arguments.length) {
                return e
            }
            e = fu;
            return fo
        };
        fo.y = function (fu) {
            if (!arguments.length) {
                return ft
            }
            ft = fu;
            return fo
        };
        fo.defined = function (fu) {
            if (!arguments.length) {
                return fs
            }
            fs = fu;
            return fo
        };
        fo.interpolate = function (fu) {
            if (!arguments.length) {
                return fr
            }
            if (typeof fu === "function") {
                fr = fp = fu
            } else {
                fr = (fp = a9.get(fu) || fb).key
            }
            return fo
        };
        fo.tension = function (fu) {
            if (!arguments.length) {
                return fq
            }
            fq = fu;
            return fo
        };
        return fo
    }

    d3.svg.line = function () {
        return c7(d6)
    };
    function ex(e) {
        return e[0]
    }

    function ew(e) {
        return e[1]
    }

    var a9 = d3.map({linear:fb, "linear-closed":M, "step-before":aG, "step-after":eX, basis:dc, "basis-open":aD, "basis-closed":bA, bundle:bB, cardinal:ch, "cardinal-open":a6, "cardinal-closed":r, monotone:bW});
    a9.forEach(function (e, fn) {
        fn.key = e;
        fn.closed = /-closed$/.test(e)
    });
    function fb(e) {
        return e.join("L")
    }

    function M(e) {
        return fb(e) + "Z"
    }

    function aG(fn) {
        var e = 0, fq = fn.length, fp = fn[0], fo = [fp[0], ",", fp[1]];
        while (++e < fq) {
            fo.push("V", (fp = fn[e])[1], "H", fp[0])
        }
        return fo.join("")
    }

    function eX(fn) {
        var e = 0, fq = fn.length, fp = fn[0], fo = [fp[0], ",", fp[1]];
        while (++e < fq) {
            fo.push("H", (fp = fn[e])[0], "V", fp[1])
        }
        return fo.join("")
    }

    function a6(fn, e) {
        return fn.length < 4 ? fb(fn) : fn[1] + bH(fn.slice(1, fn.length - 1), a1(fn, e))
    }

    function r(fn, e) {
        return fn.length < 3 ? fb(fn) : fn[0] + bH((fn.push(fn[0]), fn), a1([fn[fn.length - 2]].concat(fn, [fn[1]]), e))
    }

    function ch(fo, fn, e) {
        return fo.length < 3 ? fb(fo) : fo[0] + bH(fo, a1(fo, fn))
    }

    function bH(fs, fr) {
        if (fr.length < 1 || fs.length != fr.length && fs.length != fr.length + 2) {
            return fb(fs)
        }
        var ft = fs.length != fr.length, fw = "", fu = fs[0], e = fs[1], fq = fr[0], fv = fq, fo = 1;
        if (ft) {
            fw += "Q" + (e[0] - fq[0] * 2 / 3) + "," + (e[1] - fq[1] * 2 / 3) + "," + e[0] + "," + e[1];
            fu = fs[1];
            fo = 2
        }
        if (fr.length > 1) {
            fv = fr[1];
            e = fs[fo];
            fo++;
            fw += "C" + (fu[0] + fq[0]) + "," + (fu[1] + fq[1]) + "," + (e[0] - fv[0]) + "," + (e[1] - fv[1]) + "," + e[0] + "," + e[1];
            for (var fn = 2; fn < fr.length; fn++, fo++) {
                e = fs[fo];
                fv = fr[fn];
                fw += "S" + (e[0] - fv[0]) + "," + (e[1] - fv[1]) + "," + e[0] + "," + e[1]
            }
        }
        if (ft) {
            var fp = fs[fo];
            fw += "Q" + (e[0] + fv[0] * 2 / 3) + "," + (e[1] + fv[1] * 2 / 3) + "," + fp[0] + "," + fp[1]
        }
        return fw
    }

    function a1(fs, fq) {
        var fo = [], fp = (1 - fq) / 2, fu, ft = fs[0], fr = fs[1], fn = 1, e = fs.length;
        while (++fn < e) {
            fu = ft;
            ft = fr;
            fr = fs[fn];
            fo.push([fp * (fr[0] - fu[0]), fp * (fr[1] - fu[1])])
        }
        return fo
    }

    function dc(ft) {
        if (ft.length < 3) {
            return fb(ft)
        }
        var fo = 1, fn = ft.length, fp = ft[0], e = fp[0], fr = fp[1], fs = [e, e, e, (fp = ft[1])[0]], fq = [fr, fr, fr, fp[1]], fu = [e, ",", fr];
        aW(fu, fs, fq);
        while (++fo < fn) {
            fp = ft[fo];
            fs.shift();
            fs.push(fp[0]);
            fq.shift();
            fq.push(fp[1]);
            aW(fu, fs, fq)
        }
        fo = -1;
        while (++fo < 2) {
            fs.shift();
            fs.push(fp[0]);
            fq.shift();
            fq.push(fp[1]);
            aW(fu, fs, fq)
        }
        return fu.join("")
    }

    function aD(fp) {
        if (fp.length < 4) {
            return fb(fp)
        }
        var fr = [], fo = -1, fs = fp.length, fq, fn = [0], e = [0];
        while (++fo < 3) {
            fq = fp[fo];
            fn.push(fq[0]);
            e.push(fq[1])
        }
        fr.push(d7(eO, fn) + "," + d7(eO, e));
        --fo;
        while (++fo < fs) {
            fq = fp[fo];
            fn.shift();
            fn.push(fq[0]);
            e.shift();
            e.push(fq[1]);
            aW(fr, fn, e)
        }
        return fr.join("")
    }

    function bA(fq) {
        var fs, fp = -1, ft = fq.length, e = ft + 4, fr, fo = [], fn = [];
        while (++fp < 4) {
            fr = fq[fp % ft];
            fo.push(fr[0]);
            fn.push(fr[1])
        }
        fs = [d7(eO, fo), ",", d7(eO, fn)];
        --fp;
        while (++fp < e) {
            fr = fq[fp % ft];
            fo.shift();
            fo.push(fr[0]);
            fn.shift();
            fn.push(fr[1]);
            aW(fs, fo, fn)
        }
        return fs.join("")
    }

    function bB(fs, fr) {
        var fo = fs.length - 1;
        if (fo) {
            var fn = fs[0][0], fq = fs[0][1], fv = fs[fo][0] - fn, fu = fs[fo][1] - fq, fp = -1, e, ft;
            while (++fp <= fo) {
                e = fs[fp];
                ft = fp / fo;
                e[0] = fr * e[0] + (1 - fr) * (fn + ft * fv);
                e[1] = fr * e[1] + (1 - fr) * (fq + ft * fu)
            }
        }
        return dc(fs)
    }

    function d7(fn, e) {
        return fn[0] * e[0] + fn[1] * e[1] + fn[2] * e[2] + fn[3] * e[3]
    }

    var eR = [0, 2 / 3, 1 / 3, 0], eP = [0, 1 / 3, 2 / 3, 0], eO = [0, 1 / 6, 2 / 3, 1 / 6];

    function aW(fn, e, fo) {
        fn.push("C", d7(eR, e), ",", d7(eR, fo), ",", d7(eP, e), ",", d7(eP, fo), ",", d7(eO, e), ",", d7(eO, fo))
    }

    function fi(fn, e) {
        return(e[1] - fn[1]) / (e[0] - fn[0])
    }

    function cr(fp) {
        var fo = 0, fn = fp.length - 1, e = [], fs = fp[0], fr = fp[1], fq = e[0] = fi(fs, fr);
        while (++fo < fn) {
            e[fo] = (fq + (fq = fi(fs = fr, fr = fp[fo + 1]))) / 2
        }
        e[fo] = fq;
        return e
    }

    function X(ft) {
        var fq = [], fp, fs, fr, fu, e = cr(ft), fo = -1, fn = ft.length - 1;
        while (++fo < fn) {
            fp = fi(ft[fo], ft[fo + 1]);
            if (Math.abs(fp) < 0.000001) {
                e[fo] = e[fo + 1] = 0
            } else {
                fs = e[fo] / fp;
                fr = e[fo + 1] / fp;
                fu = fs * fs + fr * fr;
                if (fu > 9) {
                    fu = fp * 3 / Math.sqrt(fu);
                    e[fo] = fu * fs;
                    e[fo + 1] = fu * fr
                }
            }
        }
        fo = -1;
        while (++fo <= fn) {
            fu = (ft[Math.min(fn, fo + 1)][0] - ft[Math.max(0, fo - 1)][0]) / (6 * (1 + e[fo] * e[fo]));
            fq.push([fu || 0, e[fo] * fu || 0])
        }
        return fq
    }

    function bW(e) {
        return e.length < 3 ? fb(e) : e[0] + bH(e, X(e))
    }

    d3.svg.line.radial = function () {
        var e = c7(E);
        e.radius = e.x, delete e.x;
        e.angle = e.y, delete e.y;
        return e
    };
    function E(fp) {
        var e, fo = -1, fr = fp.length, fq, fn;
        while (++fo < fr) {
            e = fp[fo];
            fq = e[0];
            fn = e[1] + e3;
            e[0] = fq * Math.cos(fn);
            e[1] = fq * Math.sin(fn)
        }
        return fp
    }

    function fk(fq) {
        var fo = ex, fn = ex, fw = 0, fu = ew, fp = R, fr = fb, fx = fr.key, ft = fr, fs = "L", fv = 0.7;

        function e(fC) {
            var fE = [], fy = [], fL = [], fD = -1, fz = fC.length, fG, fB = H(fo), fK = H(fw), fA = fo === fn ? function () {
                return fI
            } : H(fn), fJ = fw === fu ? function () {
                return fH
            } : H(fu), fI, fH;

            function fF() {
                fE.push("M", fr(fq(fL), fv), fs, ft(fq(fy.reverse()), fv), "Z")
            }

            while (++fD < fz) {
                if (fp.call(this, fG = fC[fD], fD)) {
                    fy.push([fI = +fB.call(this, fG, fD), fH = +fK.call(this, fG, fD)]);
                    fL.push([+fA.call(this, fG, fD), +fJ.call(this, fG, fD)])
                } else {
                    if (fy.length) {
                        fF();
                        fy = [];
                        fL = []
                    }
                }
            }
            if (fy.length) {
                fF()
            }
            return fE.length ? fE.join("") : null
        }

        e.x = function (fy) {
            if (!arguments.length) {
                return fn
            }
            fo = fn = fy;
            return e
        };
        e.x0 = function (fy) {
            if (!arguments.length) {
                return fo
            }
            fo = fy;
            return e
        };
        e.x1 = function (fy) {
            if (!arguments.length) {
                return fn
            }
            fn = fy;
            return e
        };
        e.y = function (fy) {
            if (!arguments.length) {
                return fu
            }
            fw = fu = fy;
            return e
        };
        e.y0 = function (fy) {
            if (!arguments.length) {
                return fw
            }
            fw = fy;
            return e
        };
        e.y1 = function (fy) {
            if (!arguments.length) {
                return fu
            }
            fu = fy;
            return e
        };
        e.defined = function (fy) {
            if (!arguments.length) {
                return fp
            }
            fp = fy;
            return e
        };
        e.interpolate = function (fy) {
            if (!arguments.length) {
                return fx
            }
            if (typeof fy === "function") {
                fx = fr = fy
            } else {
                fx = (fr = a9.get(fy) || fb).key
            }
            ft = fr.reverse || fr;
            fs = fr.closed ? "M" : "L";
            return e
        };
        e.tension = function (fy) {
            if (!arguments.length) {
                return fv
            }
            fv = fy;
            return e
        };
        return e
    }

    aG.reverse = eX;
    eX.reverse = aG;
    d3.svg.area = function () {
        return fk(d6)
    };
    d3.svg.area.radial = function () {
        var e = fk(E);
        e.radius = e.x, delete e.x;
        e.innerRadius = e.x0, delete e.x0;
        e.outerRadius = e.x1, delete e.x1;
        e.angle = e.y, delete e.y;
        e.startAngle = e.y0, delete e.y0;
        e.endAngle = e.y1, delete e.y1;
        return e
    };
    d3.svg.chord = function () {
        var e = W, ft = af, fs = y, fu = dY, fq = V;

        function fr(fz, fx) {
            var fy = fv(this, e, fz, fx), fw = fv(this, ft, fz, fx);
            return"M" + fy.p0 + fn(fy.r, fy.p1, fy.a1 - fy.a0) + (fo(fy, fw) ? fp(fy.r, fy.p1, fy.r, fy.p0) : fp(fy.r, fy.p1, fw.r, fw.p0) + fn(fw.r, fw.p1, fw.a1 - fw.a0) + fp(fw.r, fw.p1, fy.r, fy.p0)) + "Z"
        }

        function fv(fz, fC, fD, fA) {
            var fy = fC.call(fz, fD, fA), fB = fs.call(fz, fy, fA), fx = fu.call(fz, fy, fA) + e3, fw = fq.call(fz, fy, fA) + e3;
            return{r:fB, a0:fx, a1:fw, p0:[fB * Math.cos(fx), fB * Math.sin(fx)], p1:[fB * Math.cos(fw), fB * Math.sin(fw)]}
        }

        function fo(fx, fw) {
            return fx.a0 == fw.a0 && fx.a1 == fw.a1
        }

        function fn(fx, fy, fw) {
            return"A" + fx + "," + fx + " 0 " + +(fw > Math.PI) + ",1 " + fy
        }

        function fp(fx, fz, fw, fy) {
            return"Q 0,0 " + fy
        }

        fr.radius = function (fw) {
            if (!arguments.length) {
                return fs
            }
            fs = H(fw);
            return fr
        };
        fr.source = function (fw) {
            if (!arguments.length) {
                return e
            }
            e = H(fw);
            return fr
        };
        fr.target = function (fw) {
            if (!arguments.length) {
                return ft
            }
            ft = H(fw);
            return fr
        };
        fr.startAngle = function (fw) {
            if (!arguments.length) {
                return fu
            }
            fu = H(fw);
            return fr
        };
        fr.endAngle = function (fw) {
            if (!arguments.length) {
                return fq
            }
            fq = H(fw);
            return fr
        };
        return fr
    };
    function W(e) {
        return e.source
    }

    function af(e) {
        return e.target
    }

    function y(e) {
        return e.radius
    }

    function ei(e) {
        return e.startAngle
    }

    function cy(e) {
        return e.endAngle
    }

    d3.svg.diagonal = function () {
        var fo = W, fp = af, e = m;

        function fn(fu, fr) {
            var fv = fo.call(this, fu, fr), fs = fp.call(this, fu, fr), fq = (fv.y + fs.y) / 2, ft = [fv, {x:fv.x, y:fq}, {x:fs.x, y:fq}, fs];
            ft = ft.map(e);
            return"M" + ft[0] + "C" + ft[1] + " " + ft[2] + " " + ft[3]
        }

        fn.source = function (fq) {
            if (!arguments.length) {
                return fo
            }
            fo = H(fq);
            return fn
        };
        fn.target = function (fq) {
            if (!arguments.length) {
                return fp
            }
            fp = H(fq);
            return fn
        };
        fn.projection = function (fq) {
            if (!arguments.length) {
                return e
            }
            e = fq;
            return fn
        };
        return fn
    };
    function m(e) {
        return[e.x, e.y]
    }

    d3.svg.diagonal.radial = function () {
        var fo = d3.svg.diagonal(), e = m, fn = fo.projection;
        fo.projection = function (fp) {
            return arguments.length ? fn(n(e = fp)) : e
        };
        return fo
    };
    function n(e) {
        return function () {
            var fp = e.apply(this, arguments), fo = fp[0], fn = fp[1] + e3;
            return[fo * Math.cos(fn), fo * Math.sin(fn)]
        }
    }

    d3.svg.mouse = d3.mouse;
    d3.svg.touches = d3.touches;
    d3.svg.symbol = function () {
        var fn = al, e = c3;

        function fo(fq, fp) {
            return(e9.get(fn.call(this, fq, fp)) || ba)(e.call(this, fq, fp))
        }

        fo.type = function (fp) {
            if (!arguments.length) {
                return fn
            }
            fn = H(fp);
            return fo
        };
        fo.size = function (fp) {
            if (!arguments.length) {
                return e
            }
            e = H(fp);
            return fo
        };
        return fo
    };
    function c3() {
        return 64
    }

    function al() {
        return"circle"
    }

    function ba(e) {
        var fn = Math.sqrt(e / Math.PI);
        return"M0," + fn + "A" + fn + "," + fn + " 0 1,1 0," + -fn + "A" + fn + "," + fn + " 0 1,1 0," + fn + "Z"
    }

    var e9 = d3.map({circle:ba, cross:function (e) {
        var fn = Math.sqrt(e / 5) / 2;
        return"M" + -3 * fn + "," + -fn + "H" + -fn + "V" + -3 * fn + "H" + fn + "V" + -fn + "H" + 3 * fn + "V" + fn + "H" + fn + "V" + 3 * fn + "H" + -fn + "V" + fn + "H" + -3 * fn + "Z"
    }, diamond:function (e) {
        var fn = Math.sqrt(e / (2 * bf)), fo = fn * bf;
        return"M0," + -fn + "L" + fo + ",0 0," + fn + " " + -fo + ",0Z"
    }, square:function (e) {
        var fn = Math.sqrt(e) / 2;
        return"M" + -fn + "," + -fn + "L" + fn + "," + -fn + " " + fn + "," + fn + " " + -fn + "," + fn + "Z"
    }, "triangle-down":function (e) {
        var fo = Math.sqrt(e / a7), fn = fo * a7 / 2;
        return"M0," + fn + "L" + fo + "," + -fn + " " + -fo + "," + -fn + "Z"
    }, "triangle-up":function (e) {
        var fo = Math.sqrt(e / a7), fn = fo * a7 / 2;
        return"M0," + -fn + "L" + fo + "," + fn + " " + -fo + "," + fn + "Z"
    }});
    d3.svg.symbolTypes = e9.keys();
    var a7 = Math.sqrt(3), bf = Math.tan(30 * Math.PI / 180);
    d3.svg.axis = function () {
        var fp = d3.scale.linear(), fs = "bottom", fq = 6, e = 6, fn = 6, fw = 3, fv = [10], fr = null, fu, ft = 0;

        function fo(fx) {
            fx.each(function () {
                var fU = d3.select(this);
                var fW = fr == null ? fp.ticks ? fp.ticks.apply(fp, fv) : fp.domain() : fr, fN = fu == null ? fp.tickFormat ? fp.tickFormat.apply(fp, fv) : String : fu;
                var fD = bE(fp, fW, ft), fC = fU.selectAll(".minor").data(fD, String), fQ = fC.enter().insert("line", "g").attr("class", "tick minor").style("opacity", 0.000001), fO = d3.transition(fC.exit()).style("opacity", 0.000001).remove(), fz = d3.transition(fC).style("opacity", 1);
                var fS = fU.selectAll("g").data(fW, String), fK = fS.enter().insert("g", "path").style("opacity", 0.000001), fM = d3.transition(fS.exit()).style("opacity", 0.000001).remove(), fF = d3.transition(fS).style("opacity", 1), fy;
                var fJ = ao(fp), fL = fU.selectAll(".domain").data([0]), fA = fL.enter().append("path").attr("class", "domain"), fX = d3.transition(fL);
                var fP = fp.copy(), fR = this.__chart__ || fP;
                this.__chart__ = fP;
                fK.append("line").attr("class", "tick");
                fK.append("text");
                var fB = fK.select("line"), fV = fF.select("line"), fI = fS.select("text").text(fN), fE = fK.select("text"), fT = fF.select("text");
                switch (fs) {
                    case"bottom":
                        fy = dj;
                        fQ.attr("y2", e);
                        fz.attr("x2", 0).attr("y2", e);
                        fB.attr("y2", fq);
                        fE.attr("y", Math.max(fq, 0) + fw);
                        fV.attr("x2", 0).attr("y2", fq);
                        fT.attr("x", 0).attr("y", Math.max(fq, 0) + fw);
                        fI.attr("dy", ".71em").attr("text-anchor", "middle");
                        fX.attr("d", "M" + fJ[0] + "," + fn + "V0H" + fJ[1] + "V" + fn);
                        break;
                    case"top":
                        fy = dj;
                        fQ.attr("y2", -e);
                        fz.attr("x2", 0).attr("y2", -e);
                        fB.attr("y2", -fq);
                        fE.attr("y", -(Math.max(fq, 0) + fw));
                        fV.attr("x2", 0).attr("y2", -fq);
                        fT.attr("x", 0).attr("y", -(Math.max(fq, 0) + fw));
                        fI.attr("dy", "0em").attr("text-anchor", "middle");
                        fX.attr("d", "M" + fJ[0] + "," + -fn + "V0H" + fJ[1] + "V" + -fn);
                        break;
                    case"left":
                        fy = dh;
                        fQ.attr("x2", -e);
                        fz.attr("x2", -e).attr("y2", 0);
                        fB.attr("x2", -fq);
                        fE.attr("x", -(Math.max(fq, 0) + fw));
                        fV.attr("x2", -fq).attr("y2", 0);
                        fT.attr("x", -(Math.max(fq, 0) + fw)).attr("y", 0);
                        fI.attr("dy", ".32em").attr("text-anchor", "end");
                        fX.attr("d", "M" + -fn + "," + fJ[0] + "H0V" + fJ[1] + "H" + -fn);
                        break;
                    case"right":
                        fy = dh;
                        fQ.attr("x2", e);
                        fz.attr("x2", e).attr("y2", 0);
                        fB.attr("x2", fq);
                        fE.attr("x", Math.max(fq, 0) + fw);
                        fV.attr("x2", fq).attr("y2", 0);
                        fT.attr("x", Math.max(fq, 0) + fw).attr("y", 0);
                        fI.attr("dy", ".32em").attr("text-anchor", "start");
                        fX.attr("d", "M" + fn + "," + fJ[0] + "H0V" + fJ[1] + "H" + fn);
                        break
                }
                if (fp.ticks) {
                    fK.call(fy, fR);
                    fF.call(fy, fP);
                    fM.call(fy, fP);
                    fQ.call(fy, fR);
                    fz.call(fy, fP);
                    fO.call(fy, fP)
                } else {
                    var fH = fP.rangeBand() / 2, fG = function (fY) {
                        return fP(fY) + fH
                    };
                    fK.call(fy, fG);
                    fF.call(fy, fG)
                }
            })
        }

        fo.scale = function (fx) {
            if (!arguments.length) {
                return fp
            }
            fp = fx;
            return fo
        };
        fo.orient = function (fx) {
            if (!arguments.length) {
                return fs
            }
            fs = fx;
            return fo
        };
        fo.ticks = function () {
            if (!arguments.length) {
                return fv
            }
            fv = arguments;
            return fo
        };
        fo.tickValues = function (fx) {
            if (!arguments.length) {
                return fr
            }
            fr = fx;
            return fo
        };
        fo.tickFormat = function (fx) {
            if (!arguments.length) {
                return fu
            }
            fu = fx;
            return fo
        };
        fo.tickSize = function (fx, fA, fy) {
            if (!arguments.length) {
                return fq
            }
            var fz = arguments.length - 1;
            fq = +fx;
            e = fz > 1 ? +fA : fq;
            fn = fz > 0 ? +arguments[fz] : fq;
            return fo
        };
        fo.tickPadding = function (fx) {
            if (!arguments.length) {
                return fw
            }
            fw = +fx;
            return fo
        };
        fo.tickSubdivide = function (fx) {
            if (!arguments.length) {
                return ft
            }
            ft = +fx;
            return fo
        };
        return fo
    };
    function dj(fn, e) {
        fn.attr("transform", function (fo) {
            return"translate(" + e(fo) + ",0)"
        })
    }

    function dh(e, fn) {
        e.attr("transform", function (fo) {
            return"translate(0," + fn(fo) + ")"
        })
    }

    function bE(fo, fs, fn) {
        ft = [];
        if (fn && fs.length > 1) {
            var fv = cx(fo.domain()), ft, fq = -1, e = fs.length, fr = (fs[1] - fs[0]) / ++fn, fp, fu;
            while (++fq < e) {
                for (fp = fn; --fp > 0;) {
                    if ((fu = +fs[fq] - fp * fr) >= fv[0]) {
                        ft.push(fu)
                    }
                }
            }
            for (--fq, fp = 0; ++fp < fn && (fu = +fs[fq] + fp * fr) < fv[1];) {
                ft.push(fu)
            }
        }
        return ft
    }

    d3.svg.brush = function () {
        var e = eM(fq, "brushstart", "brush", "brushend"), fs = null, fr = null, ft = Y[0], fw = [
            [0, 0],
            [0, 0]
        ], fn;

        function fq(fx) {
            fx.each(function () {
                var fA = d3.select(this), fz = fA.selectAll(".background").data([0]), fy = fA.selectAll(".extent").data([0]), fC = fA.selectAll(".resize").data(ft, String), fB;
                fA.style("pointer-events", "all").on("mousedown.brush", fu).on("touchstart.brush", fu);
                fz.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair");
                fy.enter().append("rect").attr("class", "extent").style("cursor", "move");
                fC.enter().append("g").attr("class",function (fD) {
                    return"resize " + fD
                }).style("cursor",function (fD) {
                    return cP[fD]
                }).append("rect").attr("x",function (fD) {
                    return/[ew]$/.test(fD) ? -3 : null
                }).attr("y",function (fD) {
                    return/^[ns]/.test(fD) ? -3 : null
                }).attr("width", 6).attr("height", 6).style("visibility", "hidden");
                fC.style("display", fq.empty() ? "none" : null);
                fC.exit().remove();
                if (fs) {
                    fB = ao(fs);
                    fz.attr("x", fB[0]).attr("width", fB[1] - fB[0]);
                    fp(fA)
                }
                if (fr) {
                    fB = ao(fr);
                    fz.attr("y", fB[0]).attr("height", fB[1] - fB[0]);
                    fo(fA)
                }
                fv(fA)
            })
        }

        function fv(fx) {
            fx.selectAll(".resize").attr("transform", function (fy) {
                return"translate(" + fw[+/e$/.test(fy)][0] + "," + fw[+/^s/.test(fy)][1] + ")"
            })
        }

        function fp(fx) {
            fx.select(".extent").attr("x", fw[0][0]);
            fx.selectAll(".extent,.n>rect,.s>rect").attr("width", fw[1][0] - fw[0][0])
        }

        function fo(fx) {
            fx.select(".extent").attr("y", fw[0][1]);
            fx.selectAll(".extent,.e>rect,.w>rect").attr("height", fw[1][1] - fw[0][1])
        }

        function fu() {
            var fQ = this, fy = d3.select(d3.event.target), fE = e.of(fQ, arguments), fL = d3.select(fQ), fN = fy.datum(), fJ = !/^(n|s)$/.test(fN) && fs, fH = !/^(e|w)$/.test(fN) && fr, fI = fy.classed("extent"), fO, fP = fF(), fz;
            var fC = d3.select(window).on("mousemove.brush", fD).on("mouseup.brush", fx).on("touchmove.brush", fD).on("touchend.brush", fx).on("keydown.brush", fG).on("keyup.brush", fB);
            if (fI) {
                fP[0] = fw[0][0] - fP[0];
                fP[1] = fw[0][1] - fP[1]
            } else {
                if (fN) {
                    var fM = +/w$/.test(fN), fK = +/^n/.test(fN);
                    fz = [fw[1 - fM][0] - fP[0], fw[1 - fK][1] - fP[1]];
                    fP[0] = fw[fM][0];
                    fP[1] = fw[fK][1]
                } else {
                    if (d3.event.altKey) {
                        fO = fP.slice()
                    }
                }
            }
            fL.style("pointer-events", "none").selectAll(".resize").style("display", null);
            d3.select("body").style("cursor", fy.style("cursor"));
            fE({type:"brushstart"});
            fD();
            e5();
            function fF() {
                var fR = d3.event.changedTouches;
                return fR ? d3.touches(fQ, fR)[0] : d3.mouse(fQ)
            }

            function fG() {
                if (d3.event.keyCode == 32) {
                    if (!fI) {
                        fO = null;
                        fP[0] -= fw[1][0];
                        fP[1] -= fw[1][1];
                        fI = 2
                    }
                    e5()
                }
            }

            function fB() {
                if (d3.event.keyCode == 32 && fI == 2) {
                    fP[0] += fw[1][0];
                    fP[1] += fw[1][1];
                    fI = 0;
                    e5()
                }
            }

            function fD() {
                var fR = fF(), fS = false;
                if (fz) {
                    fR[0] += fz[0];
                    fR[1] += fz[1]
                }
                if (!fI) {
                    if (d3.event.altKey) {
                        if (!fO) {
                            fO = [(fw[0][0] + fw[1][0]) / 2, (fw[0][1] + fw[1][1]) / 2]
                        }
                        fP[0] = fw[+(fR[0] < fO[0])][0];
                        fP[1] = fw[+(fR[1] < fO[1])][1]
                    } else {
                        fO = null
                    }
                }
                if (fJ && fA(fR, fs, 0)) {
                    fp(fL);
                    fS = true
                }
                if (fH && fA(fR, fr, 1)) {
                    fo(fL);
                    fS = true
                }
                if (fS) {
                    fv(fL);
                    fE({type:"brush", mode:fI ? "move" : "resize"})
                }
            }

            function fA(fZ, fT, fV) {
                var fW = ao(fT), fS = fW[0], fR = fW[1], fX = fP[fV], f0 = fw[1][fV] - fw[0][fV], fU, fY;
                if (fI) {
                    fS -= fX;
                    fR -= f0 + fX
                }
                fU = Math.max(fS, Math.min(fR, fZ[fV]));
                if (fI) {
                    fY = (fU += fX) + f0
                } else {
                    if (fO) {
                        fX = Math.max(fS, Math.min(fR, 2 * fO[fV] - fU))
                    }
                    if (fX < fU) {
                        fY = fU;
                        fU = fX
                    } else {
                        fY = fX
                    }
                }
                if (fw[0][fV] !== fU || fw[1][fV] !== fY) {
                    fn = null;
                    fw[0][fV] = fU;
                    fw[1][fV] = fY;
                    return true
                }
            }

            function fx() {
                fD();
                fL.style("pointer-events", "all").selectAll(".resize").style("display", fq.empty() ? "none" : null);
                d3.select("body").style("cursor", null);
                fC.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null);
                fE({type:"brushend"});
                e5()
            }
        }

        fq.x = function (fx) {
            if (!arguments.length) {
                return fs
            }
            fs = fx;
            ft = Y[!fs << 1 | !fr];
            return fq
        };
        fq.y = function (fx) {
            if (!arguments.length) {
                return fr
            }
            fr = fx;
            ft = Y[!fs << 1 | !fr];
            return fq
        };
        fq.extent = function (fC) {
            var fz, fx, fB, fA, fy;
            if (!arguments.length) {
                fC = fn || fw;
                if (fs) {
                    fz = fC[0][0], fx = fC[1][0];
                    if (!fn) {
                        fz = fw[0][0], fx = fw[1][0];
                        if (fs.invert) {
                            fz = fs.invert(fz), fx = fs.invert(fx)
                        }
                        if (fx < fz) {
                            fy = fz, fz = fx, fx = fy
                        }
                    }
                }
                if (fr) {
                    fB = fC[0][1], fA = fC[1][1];
                    if (!fn) {
                        fB = fw[0][1], fA = fw[1][1];
                        if (fr.invert) {
                            fB = fr.invert(fB), fA = fr.invert(fA)
                        }
                        if (fA < fB) {
                            fy = fB, fB = fA, fA = fy
                        }
                    }
                }
                return fs && fr ? [
                    [fz, fB],
                    [fx, fA]
                ] : fs ? [fz, fx] : fr && [fB, fA]
            }
            fn = [
                [0, 0],
                [0, 0]
            ];
            if (fs) {
                fz = fC[0], fx = fC[1];
                if (fr) {
                    fz = fz[0], fx = fx[0]
                }
                fn[0][0] = fz, fn[1][0] = fx;
                if (fs.invert) {
                    fz = fs(fz), fx = fs(fx)
                }
                if (fx < fz) {
                    fy = fz, fz = fx, fx = fy
                }
                fw[0][0] = fz | 0, fw[1][0] = fx | 0
            }
            if (fr) {
                fB = fC[0], fA = fC[1];
                if (fs) {
                    fB = fB[1], fA = fA[1]
                }
                fn[0][1] = fB, fn[1][1] = fA;
                if (fr.invert) {
                    fB = fr(fB), fA = fr(fA)
                }
                if (fA < fB) {
                    fy = fB, fB = fA, fA = fy
                }
                fw[0][1] = fB | 0, fw[1][1] = fA | 0
            }
            return fq
        };
        fq.clear = function () {
            fn = null;
            fw[0][0] = fw[0][1] = fw[1][0] = fw[1][1] = 0;
            return fq
        };
        fq.empty = function () {
            return fs && fw[0][0] === fw[1][0] || fr && fw[0][1] === fw[1][1]
        };
        return d3.rebind(fq, e, "on")
    };
    var cP = {n:"ns-resize", e:"ew-resize", s:"ns-resize", w:"ew-resize", nw:"nwse-resize", ne:"nesw-resize", se:"nwse-resize", sw:"nesw-resize"};
    var Y = [
        ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
        ["e", "w"],
        ["n", "s"],
        []
    ];
    d3.behavior = {};
    d3.behavior.drag = function () {
        var fp = eM(fo, "drag", "dragstart", "dragend"), e = null;

        function fo() {
            this.on("mousedown.drag", fn).on("touchstart.drag", fn)
        }

        function fn() {
            var fs = this, fw = fp.of(fs, arguments), fv = d3.event.target, fr, ft = fy(), fu = 0;
            var fx = d3.select(window).on("mousemove.drag", fz).on("touchmove.drag", fz).on("mouseup.drag", fq, true).on("touchend.drag", fq, true);
            if (e) {
                fr = e.apply(fs, arguments);
                fr = [fr.x - ft[0], fr.y - ft[1]]
            } else {
                fr = [0, 0]
            }
            e5();
            fw({type:"dragstart"});
            function fy() {
                var fC = fs.parentNode, fB = d3.event.changedTouches;
                return fB ? d3.touches(fC, fB)[0] : d3.mouse(fC)
            }

            function fz() {
                if (!fs.parentNode) {
                    return fq()
                }
                var fD = fy(), fC = fD[0] - ft[0], fB = fD[1] - ft[1];
                fu |= fC | fB;
                ft = fD;
                e5();
                fw({type:"drag", x:fD[0] + fr[0], y:fD[1] + fr[1], dx:fC, dy:fB})
            }

            function fq() {
                fw({type:"dragend"});
                if (fu) {
                    e5();
                    if (d3.event.target === fv) {
                        fx.on("click.drag", fA, true)
                    }
                }
                fx.on("mousemove.drag", null).on("touchmove.drag", null).on("mouseup.drag", null).on("touchend.drag", null)
            }

            function fA() {
                e5();
                fx.on("click.drag", null)
            }
        }

        fo.origin = function (fq) {
            if (!arguments.length) {
                return e
            }
            e = fq;
            return fo
        };
        return d3.rebind(fo, fp, "on")
    };
    d3.behavior.zoom = function () {
        var ft = [0, 0], fE, fI = 1, fA, fo = dK, fz = eM(e, "zoom"), fD, fB, fq, fp, fs;

        function e() {
            this.on("mousedown.zoom", fx).on("mousewheel.zoom", fw).on("mousemove.zoom", fF).on("DOMMouseScroll.zoom", fw).on("dblclick.zoom", fu).on("touchstart.zoom", fC).on("touchmove.zoom", fv).on("touchend.zoom", fC)
        }

        e.translate = function (fJ) {
            if (!arguments.length) {
                return ft
            }
            ft = fJ.map(Number);
            return e
        };
        e.scale = function (fJ) {
            if (!arguments.length) {
                return fI
            }
            fI = +fJ;
            return e
        };
        e.scaleExtent = function (fJ) {
            if (!arguments.length) {
                return fo
            }
            fo = fJ == null ? dK : fJ.map(Number);
            return e
        };
        e.x = function (fJ) {
            if (!arguments.length) {
                return fB
            }
            fB = fJ;
            fD = fJ.copy();
            return e
        };
        e.y = function (fJ) {
            if (!arguments.length) {
                return fp
            }
            fp = fJ;
            fq = fJ.copy();
            return e
        };
        function fn(fJ) {
            return[(fJ[0] - ft[0]) / fI, (fJ[1] - ft[1]) / fI]
        }

        function fy(fJ) {
            return[fJ[0] * fI + ft[0], fJ[1] * fI + ft[1]]
        }

        function fr(fJ) {
            fI = Math.max(fo[0], Math.min(fo[1], fJ))
        }

        function fG(fK, fJ) {
            fJ = fy(fJ);
            ft[0] += fK[0] - fJ[0];
            ft[1] += fK[1] - fJ[1]
        }

        function fH(fJ) {
            if (fB) {
                fB.domain(fD.range().map(function (fK) {
                    return(fK - ft[0]) / fI
                }).map(fD.invert))
            }
            if (fp) {
                fp.domain(fq.range().map(function (fK) {
                    return(fK - ft[1]) / fI
                }).map(fq.invert))
            }
            d3.event.preventDefault();
            fJ({type:"zoom", scale:fI, translate:ft})
        }

        function fx() {
            var fM = this, fP = fz.of(fM, arguments), fO = d3.event.target, fN = 0, fQ = d3.select(window).on("mousemove.zoom", fL).on("mouseup.zoom", fK), fJ = fn(d3.mouse(fM));
            window.focus();
            e5();
            function fL() {
                fN = 1;
                fG(d3.mouse(fM), fJ);
                fH(fP)
            }

            function fK() {
                if (fN) {
                    e5()
                }
                fQ.on("mousemove.zoom", null).on("mouseup.zoom", null);
                if (fN && d3.event.target === fO) {
                    fQ.on("click.zoom", fR, true)
                }
            }

            function fR() {
                e5();
                fQ.on("click.zoom", null)
            }
        }

        function fw() {
            if (!fE) {
                fE = fn(d3.mouse(this))
            }
            fr(Math.pow(2, bo() * 0.002) * fI);
            fG(d3.mouse(this), fE);
            fH(fz.of(this, arguments))
        }

        function fF() {
            fE = null
        }

        function fu() {
            var fK = d3.mouse(this), fJ = fn(fK);
            fr(d3.event.shiftKey ? fI / 2 : fI * 2);
            fG(fK, fJ);
            fH(fz.of(this, arguments))
        }

        function fC() {
            var fM = d3.touches(this), fK = Date.now();
            fA = fI;
            fE = {};
            fM.forEach(function (fN) {
                fE[fN.identifier] = fn(fN)
            });
            e5();
            if (fM.length === 1) {
                if (fK - fs < 500) {
                    var fL = fM[0], fJ = fn(fM[0]);
                    fr(fI * 2);
                    fG(fL, fJ);
                    fH(fz.of(this, arguments))
                }
                fs = fK
            }
        }

        function fv() {
            var fL = d3.touches(this), fN = fL[0], fK = fE[fN.identifier];
            if (fM = fL[1]) {
                var fM, fJ = fE[fM.identifier];
                fN = [(fN[0] + fM[0]) / 2, (fN[1] + fM[1]) / 2];
                fK = [(fK[0] + fJ[0]) / 2, (fK[1] + fJ[1]) / 2];
                fr(d3.event.scale * fA)
            }
            fG(fN, fK);
            fs = null;
            fH(fz.of(this, arguments))
        }

        return d3.rebind(e, fz, "on")
    };
    var co, dK = [0, Infinity];

    function bo() {
        if (!co) {
            co = d3.select("body").append("div").style("visibility", "hidden").style("top", 0).style("height", 0).style("width", 0).style("overflow-y", "scroll").append("div").style("height", "2000px").node().parentNode
        }
        var fo = d3.event, fp;
        try {
            co.scrollTop = 1000;
            co.dispatchEvent(fo);
            fp = 1000 - co.scrollTop
        } catch (fn) {
            fp = fo.wheelDelta || -fo.detail * 5
        }
        return fp
    }

    d3.layout = {};
    d3.layout.bundle = function () {
        return function (e) {
            var fo = [], fn = -1, fp = e.length;
            while (++fn < fp) {
                fo.push(cI(e[fn]))
            }
            return fo
        }
    };
    function cI(fp) {
        var fr = fp.source, e = fp.target, fq = dE(fr, e), fo = [fr];
        while (fr !== fq) {
            fr = fr.parent;
            fo.push(fr)
        }
        var fn = fo.length;
        while (e !== fq) {
            fo.splice(fn, 0, e);
            e = e.parent
        }
        return fo
    }

    function dl(fo) {
        var fn = [], e = fo.parent;
        while (e != null) {
            fn.push(fo);
            fo = e;
            e = e.parent
        }
        fn.push(fo);
        return fn
    }

    function dE(fp, fn) {
        if (fp === fn) {
            return fp
        }
        var fo = dl(fp), e = dl(fn), fq = fo.pop(), fr = e.pop(), fs = null;
        while (fq === fr) {
            fs = fq;
            fq = fo.pop();
            fr = e.pop()
        }
        return fs
    }

    d3.layout.chord = function () {
        var fr = {}, fs, fp, fw, fo, fv = 0, e, fn, fq;

        function fu() {
            var fB = {}, fE = [], fM = d3.range(fo), fI = [], fC, fK, fA, fF, fD;
            fs = [];
            fp = [];
            fC = 0, fF = -1;
            while (++fF < fo) {
                fK = 0, fD = -1;
                while (++fD < fo) {
                    fK += fw[fF][fD]
                }
                fE.push(fK);
                fI.push(d3.range(fo));
                fC += fK
            }
            if (e) {
                fM.sort(function (fO, fN) {
                    return e(fE[fO], fE[fN])
                })
            }
            if (fn) {
                fI.forEach(function (fO, fN) {
                    fO.sort(function (fQ, fP) {
                        return fn(fw[fN][fQ], fw[fN][fP])
                    })
                })
            }
            fC = (2 * Math.PI - fv * fo) / fC;
            fK = 0, fF = -1;
            while (++fF < fo) {
                fA = fK, fD = -1;
                while (++fD < fo) {
                    var fJ = fM[fF], fH = fI[fJ][fD], fL = fw[fJ][fH], fz = fK, fy = fK += fL * fC;
                    fB[fJ + "-" + fH] = {index:fJ, subindex:fH, startAngle:fz, endAngle:fy, value:fL}
                }
                fp[fJ] = {index:fJ, startAngle:fA, endAngle:fK, value:(fK - fA) / fC};
                fK += fv
            }
            fF = -1;
            while (++fF < fo) {
                fD = fF - 1;
                while (++fD < fo) {
                    var fx = fB[fF + "-" + fD], fG = fB[fD + "-" + fF];
                    if (fx.value || fG.value) {
                        fs.push(fx.value < fG.value ? {source:fG, target:fx} : {source:fx, target:fG})
                    }
                }
            }
            if (fq) {
                ft()
            }
        }

        function ft() {
            fs.sort(function (fy, fx) {
                return fq((fy.source.value + fy.target.value) / 2, (fx.source.value + fx.target.value) / 2)
            })
        }

        fr.matrix = function (fx) {
            if (!arguments.length) {
                return fw
            }
            fo = (fw = fx) && fw.length;
            fs = fp = null;
            return fr
        };
        fr.padding = function (fx) {
            if (!arguments.length) {
                return fv
            }
            fv = fx;
            fs = fp = null;
            return fr
        };
        fr.sortGroups = function (fx) {
            if (!arguments.length) {
                return e
            }
            e = fx;
            fs = fp = null;
            return fr
        };
        fr.sortSubgroups = function (fx) {
            if (!arguments.length) {
                return fn
            }
            fn = fx;
            fs = null;
            return fr
        };
        fr.sortChords = function (fx) {
            if (!arguments.length) {
                return fq
            }
            fq = fx;
            if (fs) {
                ft()
            }
            return fr
        };
        fr.chords = function () {
            if (!fs) {
                fu()
            }
            return fs
        };
        fr.groups = function () {
            if (!fp) {
                fu()
            }
            return fp
        };
        return fr
    };
    d3.layout.force = function () {
        var fn = {}, fA = d3.dispatch("start", "tick", "end"), fw = [1, 1], fC, fq, ft = 0.9, fE = dG, fp = bk, fz = -30, fr = 0.1, fu = 0.8, fD, fy = [], fo = [], fs, e, fv;

        function fB(fF) {
            return function (fM, fH, fL, fG, fK) {
                if (fM.point !== fF) {
                    var fO = fM.cx - fF.x, fN = fM.cy - fF.y, fJ = 1 / Math.sqrt(fO * fO + fN * fN);
                    if ((fG - fH) * fJ < fu) {
                        var fI = fM.charge * fJ * fJ;
                        fF.px -= fO * fI;
                        fF.py -= fN * fI;
                        return true
                    }
                    if (fM.point && isFinite(fJ)) {
                        var fI = fM.pointCharge * fJ * fJ;
                        fF.px -= fO * fI;
                        fF.py -= fN * fI
                    }
                }
                return !fM.charge
            }
        }

        fn.tick = function () {
            if ((fq *= 0.99) < 0.005) {
                fA.end({type:"end", alpha:fq = 0});
                return true
            }
            var fH = fy.length, fI = fo.length, fF, fL, fG, fP, fO, fJ, fK, fN, fM;
            for (fL = 0; fL < fI; ++fL) {
                fG = fo[fL];
                fP = fG.source;
                fO = fG.target;
                fN = fO.x - fP.x;
                fM = fO.y - fP.y;
                if (fJ = fN * fN + fM * fM) {
                    fJ = fq * e[fL] * ((fJ = Math.sqrt(fJ)) - fs[fL]) / fJ;
                    fN *= fJ;
                    fM *= fJ;
                    fO.x -= fN * (fK = fP.weight / (fO.weight + fP.weight));
                    fO.y -= fM * fK;
                    fP.x += fN * (fK = 1 - fK);
                    fP.y += fM * fK
                }
            }
            if (fK = fq * fr) {
                fN = fw[0] / 2;
                fM = fw[1] / 2;
                fL = -1;
                if (fK) {
                    while (++fL < fH) {
                        fG = fy[fL];
                        fG.x += (fN - fG.x) * fK;
                        fG.y += (fM - fG.y) * fK
                    }
                }
            }
            if (fz) {
                eg(fF = d3.geom.quadtree(fy), fq, fv);
                fL = -1;
                while (++fL < fH) {
                    if (!(fG = fy[fL]).fixed) {
                        fF.visit(fB(fG))
                    }
                }
            }
            fL = -1;
            while (++fL < fH) {
                fG = fy[fL];
                if (fG.fixed) {
                    fG.x = fG.px;
                    fG.y = fG.py
                } else {
                    fG.x -= (fG.px - (fG.px = fG.x)) * ft;
                    fG.y -= (fG.py - (fG.py = fG.y)) * ft
                }
            }
            fA.tick({type:"tick", alpha:fq})
        };
        fn.nodes = function (fF) {
            if (!arguments.length) {
                return fy
            }
            fy = fF;
            return fn
        };
        fn.links = function (fF) {
            if (!arguments.length) {
                return fo
            }
            fo = fF;
            return fn
        };
        fn.size = function (fF) {
            if (!arguments.length) {
                return fw
            }
            fw = fF;
            return fn
        };
        fn.linkDistance = function (fF) {
            if (!arguments.length) {
                return fE
            }
            fE = H(fF);
            return fn
        };
        fn.distance = fn.linkDistance;
        fn.linkStrength = function (fF) {
            if (!arguments.length) {
                return fp
            }
            fp = H(fF);
            return fn
        };
        fn.friction = function (fF) {
            if (!arguments.length) {
                return ft
            }
            ft = fF;
            return fn
        };
        fn.charge = function (fF) {
            if (!arguments.length) {
                return fz
            }
            fz = typeof fF === "function" ? fF : +fF;
            return fn
        };
        fn.gravity = function (fF) {
            if (!arguments.length) {
                return fr
            }
            fr = fF;
            return fn
        };
        fn.theta = function (fF) {
            if (!arguments.length) {
                return fu
            }
            fu = fF;
            return fn
        };
        fn.alpha = function (fF) {
            if (!arguments.length) {
                return fq
            }
            if (fq) {
                if (fF > 0) {
                    fq = fF
                } else {
                    fq = 0
                }
            } else {
                if (fF > 0) {
                    fA.start({type:"start", alpha:fq = fF});
                    d3.timer(fn.tick)
                }
            }
            return fn
        };
        fn.start = function () {
            var fJ, fI, fG = fy.length, fH = fo.length, fM = fw[0], fL = fw[1], fO, fF;
            for (fJ = 0; fJ < fG; ++fJ) {
                (fF = fy[fJ]).index = fJ;
                fF.weight = 0
            }
            fs = [];
            e = [];
            for (fJ = 0; fJ < fH; ++fJ) {
                fF = fo[fJ];
                if (typeof fF.source == "number") {
                    fF.source = fy[fF.source]
                }
                if (typeof fF.target == "number") {
                    fF.target = fy[fF.target]
                }
                fs[fJ] = fE.call(this, fF, fJ);
                e[fJ] = fp.call(this, fF, fJ);
                ++fF.source.weight;
                ++fF.target.weight
            }
            for (fJ = 0; fJ < fG; ++fJ) {
                fF = fy[fJ];
                if (isNaN(fF.x)) {
                    fF.x = fK("x", fM)
                }
                if (isNaN(fF.y)) {
                    fF.y = fK("y", fL)
                }
                if (isNaN(fF.px)) {
                    fF.px = fF.x
                }
                if (isNaN(fF.py)) {
                    fF.py = fF.y
                }
            }
            fv = [];
            if (typeof fz === "function") {
                for (fJ = 0; fJ < fG; ++fJ) {
                    fv[fJ] = +fz.call(this, fy[fJ], fJ)
                }
            } else {
                for (fJ = 0; fJ < fG; ++fJ) {
                    fv[fJ] = fz
                }
            }
            function fK(fU, fT) {
                var fS = fN(fJ), fR = -1, fQ = fS.length, fP;
                while (++fR < fQ) {
                    if (!isNaN(fP = fS[fR][fU])) {
                        return fP
                    }
                }
                return Math.random() * fT
            }

            function fN() {
                if (!fO) {
                    fO = [];
                    for (fI = 0; fI < fG; ++fI) {
                        fO[fI] = []
                    }
                    for (fI = 0; fI < fH; ++fI) {
                        var fP = fo[fI];
                        fO[fP.source.index].push(fP.target);
                        fO[fP.target.index].push(fP.source)
                    }
                }
                return fO[fJ]
            }

            return fn.resume()
        };
        fn.resume = function () {
            return fn.alpha(0.1)
        };
        fn.stop = function () {
            return fn.alpha(0)
        };
        fn.drag = function () {
            if (!fC) {
                fC = d3.behavior.drag().origin(d6).on("dragstart", fx).on("drag", dr).on("dragend", cU)
            }
            this.on("mouseover.force", j).on("mouseout.force", ef).call(fC)
        };
        function fx(fF) {
            j(dx = fF);
            di = fn
        }

        return d3.rebind(fn, fA, "on")
    };
    var di, dx;

    function j(e) {
        e.fixed |= 2
    }

    function ef(e) {
        if (e !== dx) {
            e.fixed &= 1
        }
    }

    function cU() {
        dx.fixed &= 1;
        di = dx = null
    }

    function dr() {
        dx.px = d3.event.x;
        dx.py = d3.event.y;
        di.resume()
    }

    function eg(fv, fq, fu) {
        var fr = 0, fo = 0;
        fv.charge = 0;
        if (!fv.leaf) {
            var e = fv.nodes, fn = e.length, fs = -1, ft;
            while (++fs < fn) {
                ft = e[fs];
                if (ft == null) {
                    continue
                }
                eg(ft, fq, fu);
                fv.charge += ft.charge;
                fr += ft.charge * ft.cx;
                fo += ft.charge * ft.cy
            }
        }
        if (fv.point) {
            if (!fv.leaf) {
                fv.point.x += Math.random() - 0.5;
                fv.point.y += Math.random() - 0.5
            }
            var fp = fq * fu[fv.point.index];
            fv.charge += fv.pointCharge = fp;
            fr += fp * fv.point.x;
            fo += fp * fv.point.y
        }
        fv.cx = fr / fv.charge;
        fv.cy = fo / fv.charge
    }

    function dG(e) {
        return 20
    }

    function bk(e) {
        return 1
    }

    d3.layout.partition = function () {
        var fo = d3.layout.hierarchy(), fp = [1, 1];

        function e(ft, fx, fz, fy) {
            var fr = ft.children;
            ft.x = fx;
            ft.y = ft.depth * fy;
            ft.dx = fz;
            ft.dy = fy;
            if (fr && (fs = fr.length)) {
                var fu = -1, fs, fw, fv;
                fz = ft.value ? fz / ft.value : 0;
                while (++fu < fs) {
                    e(fw = fr[fu], fx, fv = fw.value * fz, fy);
                    fx += fv
                }
            }
        }

        function fq(ft) {
            var fs = ft.children, fu = 0;
            if (fs && (fv = fs.length)) {
                var fr = -1, fv;
                while (++fr < fv) {
                    fu = Math.max(fu, fq(fs[fr]))
                }
            }
            return 1 + fu
        }

        function fn(ft, fs) {
            var fr = fo.call(this, ft, fs);
            e(fr[0], 0, fp[0], fp[1] / fq(fr[0]));
            return fr
        }

        fn.size = function (fr) {
            if (!arguments.length) {
                return fp
            }
            fp = fr;
            return fn
        };
        return eb(fn, fo)
    };
    d3.layout.pie = function () {
        var fq = Number, fp = K, fo = 0, fn = 2 * Math.PI;

        function e(fx, fv) {
            var ft = fx.map(function (fz, fy) {
                return +fq.call(e, fz, fy)
            });
            var fr = +(typeof fo === "function" ? fo.apply(this, arguments) : fo);
            var fs = ((typeof fn === "function" ? fn.apply(this, arguments) : fn) - fo) / d3.sum(ft);
            var fu = d3.range(fx.length);
            if (fp != null) {
                fu.sort(fp === K ? function (fz, fy) {
                    return ft[fy] - ft[fz]
                } : function (fz, fy) {
                    return fp(fx[fz], fx[fy])
                })
            }
            var fw = [];
            fu.forEach(function (fy) {
                var fz;
                fw[fy] = {data:fx[fy], value:fz = ft[fy], startAngle:fr, endAngle:fr += fz * fs}
            });
            return fw
        }

        e.value = function (fr) {
            if (!arguments.length) {
                return fq
            }
            fq = fr;
            return e
        };
        e.sort = function (fr) {
            if (!arguments.length) {
                return fp
            }
            fp = fr;
            return e
        };
        e.startAngle = function (fr) {
            if (!arguments.length) {
                return fo
            }
            fo = fr;
            return e
        };
        e.endAngle = function (fr) {
            if (!arguments.length) {
                return fn
            }
            fn = fr;
            return e
        };
        return e
    };
    var K = {};
    d3.layout.stack = function () {
        var fp = d6, fo = aX, fr = dz, fq = dA, fn = U, fs = T;

        function e(fA, fC) {
            var fB = fA.map(function (fF, fE) {
                return fp.call(e, fF, fE)
            });
            var fD = fB.map(function (fF, fE) {
                return fF.map(function (fG, fH) {
                    return[fn.call(e, fG, fH), fs.call(e, fG, fH)]
                })
            });
            var fx = fo.call(e, fD, fC);
            fB = d3.permute(fB, fx);
            fD = d3.permute(fD, fx);
            var fw = fr.call(e, fD, fC);
            var fu = fB.length, fv = fB[0].length, fz, fy, ft;
            for (fy = 0; fy < fv; ++fy) {
                fq.call(e, fB[0][fy], ft = fw[fy], fD[0][fy][1]);
                for (fz = 1; fz < fu; ++fz) {
                    fq.call(e, fB[fz][fy], ft += fD[fz - 1][fy][1], fD[fz][fy][1])
                }
            }
            return fA
        }

        e.values = function (ft) {
            if (!arguments.length) {
                return fp
            }
            fp = ft;
            return e
        };
        e.order = function (ft) {
            if (!arguments.length) {
                return fo
            }
            fo = typeof ft === "function" ? ft : at.get(ft) || aX;
            return e
        };
        e.offset = function (ft) {
            if (!arguments.length) {
                return fr
            }
            fr = typeof ft === "function" ? ft : Q.get(ft) || dz;
            return e
        };
        e.x = function (ft) {
            if (!arguments.length) {
                return fn
            }
            fn = ft;
            return e
        };
        e.y = function (ft) {
            if (!arguments.length) {
                return fs
            }
            fs = ft;
            return e
        };
        e.out = function (ft) {
            if (!arguments.length) {
                return fq
            }
            fq = ft;
            return e
        };
        return e
    };
    function U(e) {
        return e.x
    }

    function T(e) {
        return e.y
    }

    function dA(fn, e, fo) {
        fn.y0 = e;
        fn.y = fo
    }

    var at = d3.map({"inside-out":function (fq) {
        var fo = fq.length, fr, fp, fv = fq.map(a2), fs = fq.map(b1), ft = d3.range(fo).sort(function (fy, fx) {
            return fv[fy] - fv[fx]
        }), fu = 0, e = 0, fw = [], fn = [];
        for (fr = 0; fr < fo; ++fr) {
            fp = ft[fr];
            if (fu < e) {
                fu += fs[fp];
                fw.push(fp)
            } else {
                e += fs[fp];
                fn.push(fp)
            }
        }
        return fn.reverse().concat(fw)
    }, reverse:function (e) {
        return d3.range(e.length).reverse()
    }, "default":aX});
    var Q = d3.map({silhouette:function (fq) {
        var fn = fq.length, fo = fq[0].length, fs = [], ft = 0, fr, fp, e, fu = [];
        for (fp = 0; fp < fo; ++fp) {
            for (fr = 0, e = 0; fr < fn; fr++) {
                e += fq[fr][fp][1]
            }
            if (e > ft) {
                ft = e
            }
            fs.push(e)
        }
        for (fp = 0; fp < fo; ++fp) {
            fu[fp] = (ft - fs[fp]) / 2
        }
        return fu
    }, wiggle:function (fs) {
        var fn = fs.length, fw = fs[0], fo = fw.length, fu = 0, ft, fr, fq, fz, fy, fv, fA, e, fp, fx = [];
        fx[0] = e = fp = 0;
        for (fr = 1; fr < fo; ++fr) {
            for (ft = 0, fz = 0; ft < fn; ++ft) {
                fz += fs[ft][fr][1]
            }
            for (ft = 0, fy = 0, fA = fw[fr][0] - fw[fr - 1][0]; ft < fn; ++ft) {
                for (fq = 0, fv = (fs[ft][fr][1] - fs[ft][fr - 1][1]) / (2 * fA); fq < ft; ++fq) {
                    fv += (fs[fq][fr][1] - fs[fq][fr - 1][1]) / fA
                }
                fy += fv * fs[ft][fr][1]
            }
            fx[fr] = e -= fz ? fy / fz * fA : 0;
            if (e < fp) {
                fp = e
            }
        }
        for (fr = 0; fr < fo; ++fr) {
            fx[fr] -= fp
        }
        return fx
    }, expand:function (fr) {
        var ft = fr.length, e = fr[0].length, fn = 1 / ft, fp, fo, fs, fq = [];
        for (fo = 0; fo < e; ++fo) {
            for (fp = 0, fs = 0; fp < ft; fp++) {
                fs += fr[fp][fo][1]
            }
            if (fs) {
                for (fp = 0; fp < ft; fp++) {
                    fr[fp][fo][1] /= fs
                }
            } else {
                for (fp = 0; fp < ft; fp++) {
                    fr[fp][fo][1] = fn
                }
            }
        }
        for (fo = 0; fo < e; ++fo) {
            fq[fo] = 0
        }
        return fq
    }, zero:dz});

    function aX(e) {
        return d3.range(e.length)
    }

    function dz(fp) {
        var fn = -1, e = fp[0].length, fo = [];
        while (++fn < e) {
            fo[fn] = 0
        }
        return fo
    }

    function a2(fr) {
        var fp = 1, fo = 0, fn = fr[0][1], e, fq = fr.length;
        for (; fp < fq; ++fp) {
            if ((e = fr[fp][1]) > fn) {
                fo = fp;
                fn = e
            }
        }
        return fo
    }

    function b1(e) {
        return e.reduce(dy, 0)
    }

    function dy(e, fn) {
        return e + fn[1]
    }

    d3.layout.histogram = function () {
        var fq = true, fn = Number, e = aE, fo = eW;

        function fp(fu, fv) {
            var fA = [], fy = fu.map(fn, this), fw = e.call(this, fy, fv), fz = fo.call(this, fw, fy, fv), fB, fv = -1, fr = fy.length, fs = fz.length - 1, ft = fq ? 1 : 1 / fr, fx;
            while (++fv < fs) {
                fB = fA[fv] = [];
                fB.dx = fz[fv + 1] - (fB.x = fz[fv]);
                fB.y = 0
            }
            if (fs > 0) {
                fv = -1;
                while (++fv < fr) {
                    fx = fy[fv];
                    if (fx >= fw[0] && fx <= fw[1]) {
                        fB = fA[d3.bisect(fz, fx, 1, fs) - 1];
                        fB.y += ft;
                        fB.push(fu[fv])
                    }
                }
            }
            return fA
        }

        fp.value = function (fr) {
            if (!arguments.length) {
                return fn
            }
            fn = fr;
            return fp
        };
        fp.range = function (fr) {
            if (!arguments.length) {
                return e
            }
            e = H(fr);
            return fp
        };
        fp.bins = function (fr) {
            if (!arguments.length) {
                return fo
            }
            fo = typeof fr === "number" ? function (fs) {
                return g(fs, fr)
            } : H(fr);
            return fp
        };
        fp.frequency = function (fr) {
            if (!arguments.length) {
                return fq
            }
            fq = !!fr;
            return fp
        };
        return fp
    };
    function eW(fn, e) {
        return g(fn, Math.ceil(Math.log(e.length) / Math.LN2 + 1))
    }

    function g(fp, fr) {
        var fo = -1, fn = +fp[0], e = (fp[1] - fn) / fr, fq = [];
        while (++fo <= fr) {
            fq[fo] = e * fo + fn
        }
        return fq
    }

    function aE(e) {
        return[d3.min(e), d3.max(e)]
    }

    d3.layout.hierarchy = function () {
        var fo = cf, fn = av, fq = e7;

        function fp(fx, fw, fs) {
            var fA = fn.call(e, fx, fw), fu = h ? fx : {data:fx};
            fu.depth = fw;
            fs.push(fu);
            if (fA && (ft = fA.length)) {
                var fy = -1, ft, fB = fu.children = [], fC = 0, fv = fw + 1, fz;
                while (++fy < ft) {
                    fz = fp(fA[fy], fv, fs);
                    fz.parent = fu;
                    fB.push(fz);
                    fC += fz.value
                }
                if (fo) {
                    fB.sort(fo)
                }
                if (fq) {
                    fu.value = fC
                }
            } else {
                if (fq) {
                    fu.value = +fq.call(e, fx, fw) || 0
                }
            }
            return fu
        }

        function fr(fw, fx) {
            var fv = fw.children, fs = 0;
            if (fv && (fy = fv.length)) {
                var fu = -1, fy, ft = fx + 1;
                while (++fu < fy) {
                    fs += fr(fv[fu], ft)
                }
            } else {
                if (fq) {
                    fs = +fq.call(e, h ? fw : fw.data, fx) || 0
                }
            }
            if (fq) {
                fw.value = fs
            }
            return fs
        }

        function e(ft) {
            var fs = [];
            fp(ft, 0, fs);
            return fs
        }

        e.sort = function (fs) {
            if (!arguments.length) {
                return fo
            }
            fo = fs;
            return e
        };
        e.children = function (fs) {
            if (!arguments.length) {
                return fn
            }
            fn = fs;
            return e
        };
        e.value = function (fs) {
            if (!arguments.length) {
                return fq
            }
            fq = fs;
            return e
        };
        e.revalue = function (fs) {
            fr(fs, 0);
            return fs
        };
        return e
    };
    function eb(fn, e) {
        d3.rebind(fn, e, "sort", "children", "value");
        fn.links = ec;
        fn.nodes = function (fo) {
            h = true;
            return(fn.nodes = fn)(fo)
        };
        return fn
    }

    function av(e) {
        return e.children
    }

    function e7(e) {
        return e.value
    }

    function cf(fn, e) {
        return e.value - fn.value
    }

    function ec(e) {
        return d3.merge(e.map(function (fn) {
            return(fn.children || []).map(function (fo) {
                return{source:fn, target:fo}
            })
        }))
    }

    var h = false;
    d3.layout.pack = function () {
        var e = d3.layout.hierarchy().sort(cC), fp = 0, fo = [1, 1];

        function fn(fx, fu) {
            var ft = e.call(this, fx, fu), fr = ft[0];
            fr.x = 0;
            fr.y = 0;
            e1(fr, function (fy) {
                fy.r = Math.sqrt(fy.value)
            });
            e1(fr, J);
            var fq = fo[0], fv = fo[1], fs = Math.max(2 * fr.r / fq, 2 * fr.r / fv);
            if (fp > 0) {
                var fw = fp * fs / 2;
                e1(fr, function (fy) {
                    fy.r += fw
                });
                e1(fr, J);
                e1(fr, function (fy) {
                    fy.r -= fw
                });
                fs = Math.max(2 * fr.r / fq, 2 * fr.r / fv)
            }
            dk(fr, fq / 2, fv / 2, 1 / fs);
            return ft
        }

        fn.size = function (fq) {
            if (!arguments.length) {
                return fo
            }
            fo = fq;
            return fn
        };
        fn.padding = function (fq) {
            if (!arguments.length) {
                return fp
            }
            fp = +fq;
            return fn
        };
        return eb(fn, e)
    };
    function cC(fn, e) {
        return fn.value - e.value
    }

    function aY(fn, e) {
        var fo = fn._pack_next;
        fn._pack_next = e;
        e._pack_prev = fn;
        e._pack_next = fo;
        fo._pack_prev = e
    }

    function az(fn, e) {
        fn._pack_next = e;
        e._pack_prev = fn
    }

    function cv(fo, e) {
        var fp = e.x - fo.x, fn = e.y - fo.y, fq = fo.r + e.r;
        return fq * fq - fp * fp - fn * fn > 0.001
    }

    function J(fx) {
        if (!(fw = fx.children) || !(fv = fw.length)) {
            return
        }
        var fw, fB = Infinity, fF = -Infinity, e = Infinity, fq = -Infinity, fE, fD, fC, fA, fz, fy, fv;

        function fo(fG) {
            fB = Math.min(fG.x - fG.r, fB);
            fF = Math.max(fG.x + fG.r, fF);
            e = Math.min(fG.y - fG.r, e);
            fq = Math.max(fG.y + fG.r, fq)
        }

        fw.forEach(aj);
        fE = fw[0];
        fE.x = -fE.r;
        fE.y = 0;
        fo(fE);
        if (fv > 1) {
            fD = fw[1];
            fD.x = fD.r;
            fD.y = 0;
            fo(fD);
            if (fv > 2) {
                fC = fw[2];
                ax(fE, fD, fC);
                fo(fC);
                aY(fE, fC);
                fE._pack_prev = fC;
                aY(fC, fD);
                fD = fE._pack_next;
                for (fA = 3; fA < fv; fA++) {
                    ax(fE, fD, fC = fw[fA]);
                    var fn = 0, fr = 1, fp = 1;
                    for (fz = fD._pack_next; fz !== fD; fz = fz._pack_next, fr++) {
                        if (cv(fz, fC)) {
                            fn = 1;
                            break
                        }
                    }
                    if (fn == 1) {
                        for (fy = fE._pack_prev; fy !== fz._pack_prev; fy = fy._pack_prev, fp++) {
                            if (cv(fy, fC)) {
                                break
                            }
                        }
                    }
                    if (fn) {
                        if (fr < fp || fr == fp && fD.r < fE.r) {
                            az(fE, fD = fz)
                        } else {
                            az(fE = fy, fD)
                        }
                        fA--
                    } else {
                        aY(fE, fC);
                        fD = fC;
                        fo(fC)
                    }
                }
            }
        }
        var ft = (fB + fF) / 2, fs = (e + fq) / 2, fu = 0;
        for (fA = 0; fA < fv; fA++) {
            fC = fw[fA];
            fC.x -= ft;
            fC.y -= fs;
            fu = Math.max(fu, fC.r + Math.sqrt(fC.x * fC.x + fC.y * fC.y))
        }
        fx.r = fu;
        fw.forEach(cJ)
    }

    function aj(e) {
        e._pack_next = e._pack_prev = e
    }

    function cJ(e) {
        delete e._pack_next;
        delete e._pack_prev
    }

    function dk(fq, e, fs, fn) {
        var fp = fq.children;
        fq.x = e += fn * fq.x;
        fq.y = fs += fn * fq.y;
        fq.r *= fn;
        if (fp) {
            var fo = -1, fr = fp.length;
            while (++fo < fr) {
                dk(fp[fo], e, fs, fn)
            }
        }
    }

    function ax(fq, fo, e) {
        var fs = fq.r + e.r, fv = fo.x - fq.x, ft = fo.y - fq.y;
        if (fs && (fv || ft)) {
            var fu = fo.r + e.r, fr = fv * fv + ft * ft;
            fu *= fu;
            fs *= fs;
            var fp = 0.5 + (fs - fu) / (2 * fr), fn = Math.sqrt(Math.max(0, 2 * fu * (fs + fr) - (fs -= fr) * fs - fu * fu)) / (2 * fr);
            e.x = fq.x + fp * fv + fn * ft;
            e.y = fq.y + fp * ft - fn * fv
        } else {
            e.x = fq.x + fs;
            e.y = fq.y
        }
    }

    d3.layout.cluster = function () {
        var fn = d3.layout.hierarchy().sort(null).value(null), fp = b3, fo = [1, 1];

        function e(fx, fu) {
            var fq = fn.call(this, fx, fu), fy = fq[0], fz, fA = 0, fw, fv;
            e1(fy, function (fD) {
                var fC = fD.children;
                if (fC && fC.length) {
                    fD.x = aL(fC);
                    fD.y = aK(fC)
                } else {
                    fD.x = fz ? fA += fp(fD, fz) : 0;
                    fD.y = 0;
                    fz = fD
                }
            });
            var ft = cD(fy), fB = b9(fy), fs = ft.x - fp(ft, fB) / 2, fr = fB.x + fp(fB, ft) / 2;
            e1(fy, function (fC) {
                fC.x = (fC.x - fs) / (fr - fs) * fo[0];
                fC.y = (1 - (fy.y ? fC.y / fy.y : 1)) * fo[1]
            });
            return fq
        }

        e.separation = function (fq) {
            if (!arguments.length) {
                return fp
            }
            fp = fq;
            return e
        };
        e.size = function (fq) {
            if (!arguments.length) {
                return fo
            }
            fo = fq;
            return e
        };
        return eb(e, fn)
    };
    function aK(e) {
        return 1 + d3.max(e, function (fn) {
            return fn.y
        })
    }

    function aL(e) {
        return e.reduce(function (fn, fo) {
            return fn + fo.x
        }, 0) / e.length
    }

    function cD(fn) {
        var e = fn.children;
        return e && e.length ? cD(e[0]) : fn
    }

    function b9(fn) {
        var e = fn.children, fo;
        return e && (fo = e.length) ? b9(e[fo - 1]) : fn
    }

    d3.layout.tree = function () {
        var fn = d3.layout.hierarchy().sort(null).value(null), fp = b3, fo = [1, 1];

        function e(fx, fv) {
            var fr = fn.call(this, fx, fv), fz = fr[0];

            function fw(fH, fD) {
                var fF = fH.children, fK = fH._tree;
                if (fF && (fG = fF.length)) {
                    var fG, fM = fF[0], fL, fJ = fM, fE, fI = -1;
                    while (++fI < fG) {
                        fE = fF[fI];
                        fw(fE, fL);
                        fJ = fq(fE, fL, fJ);
                        fL = fE
                    }
                    b5(fH);
                    var fN = 0.5 * (fM._tree.prelim + fE._tree.prelim);
                    if (fD) {
                        fK.prelim = fD._tree.prelim + fp(fH, fD);
                        fK.mod = fK.prelim - fN
                    } else {
                        fK.prelim = fN
                    }
                } else {
                    if (fD) {
                        fK.prelim = fD._tree.prelim + fp(fH, fD)
                    }
                }
            }

            function fy(fG, fD) {
                fG.x = fG._tree.prelim + fD;
                var fF = fG.children;
                if (fF && (fH = fF.length)) {
                    var fE = -1, fH;
                    fD += fG._tree.mod;
                    while (++fE < fH) {
                        fy(fF[fE], fD)
                    }
                }
            }

            function fq(fH, fD, fK) {
                if (fD) {
                    var fG = fH, fF = fH, fJ = fD, fI = fH.parent.children[0], fM = fG._tree.mod, fL = fF._tree.mod, fO = fJ._tree.mod, fN = fI._tree.mod, fE;
                    while (fJ = aa(fJ), fG = fd(fG), fJ && fG) {
                        fI = fd(fI);
                        fF = aa(fF);
                        fF._tree.ancestor = fH;
                        fE = fJ._tree.prelim + fO - fG._tree.prelim - fM + fp(fJ, fG);
                        if (fE > 0) {
                            fg(dM(fJ, fH, fK), fH, fE);
                            fM += fE;
                            fL += fE
                        }
                        fO += fJ._tree.mod;
                        fM += fG._tree.mod;
                        fN += fI._tree.mod;
                        fL += fF._tree.mod
                    }
                    if (fJ && !aa(fF)) {
                        fF._tree.thread = fJ;
                        fF._tree.mod += fO - fL
                    }
                    if (fG && !fd(fI)) {
                        fI._tree.thread = fG;
                        fI._tree.mod += fM - fN;
                        fK = fH
                    }
                }
                return fK
            }

            e1(fz, function (fE, fD) {
                fE._tree = {ancestor:fE, prelim:0, mod:0, change:0, shift:0, number:fD ? fD._tree.number + 1 : 0}
            });
            fw(fz);
            fy(fz, -fz._tree.prelim);
            var fu = cn(fz, aR), fC = cn(fz, bJ), fB = cn(fz, x), ft = fu.x - fp(fu, fC) / 2, fs = fC.x + fp(fC, fu) / 2, fA = fB.depth || 1;
            e1(fz, function (fD) {
                fD.x = (fD.x - ft) / (fs - ft) * fo[0];
                fD.y = fD.depth / fA * fo[1];
                delete fD._tree
            });
            return fr
        }

        e.separation = function (fq) {
            if (!arguments.length) {
                return fp
            }
            fp = fq;
            return e
        };
        e.size = function (fq) {
            if (!arguments.length) {
                return fo
            }
            fo = fq;
            return e
        };
        return eb(e, fn)
    };
    function b3(fn, e) {
        return fn.parent == e.parent ? 1 : 2
    }

    function fd(fn) {
        var e = fn.children;
        return e && e.length ? e[0] : fn._tree.thread
    }

    function aa(fn) {
        var e = fn.children, fo;
        return e && (fo = e.length) ? e[fo - 1] : fn._tree.thread
    }

    function cn(fo, fp) {
        var fn = fo.children;
        if (fn && (fq = fn.length)) {
            var fr, fq, e = -1;
            while (++e < fq) {
                if (fp(fr = cn(fn[e], fp), fo) > 0) {
                    fo = fr
                }
            }
        }
        return fo
    }

    function bJ(fn, e) {
        return fn.x - e.x
    }

    function aR(fn, e) {
        return e.x - fn.x
    }

    function x(fn, e) {
        return fn.depth - e.depth
    }

    function e1(fn, fo) {
        function e(ft, fs) {
            var fr = ft.children;
            if (fr && (fu = fr.length)) {
                var fv, fq = null, fp = -1, fu;
                while (++fp < fu) {
                    fv = fr[fp];
                    e(fv, fq);
                    fq = fv
                }
            }
            fo(ft, fs)
        }

        e(fn, null)
    }

    function b5(fp) {
        var e = 0, fr = 0, fo = fp.children, fn = fo.length, fq;
        while (--fn >= 0) {
            fq = fo[fn]._tree;
            fq.prelim += e;
            fq.mod += e;
            e += fq.shift + (fr += fq.change)
        }
    }

    function fg(fn, fo, e) {
        fn = fn._tree;
        fo = fo._tree;
        var fp = e / (fo.number - fn.number);
        fn.change += fp;
        fo.change -= fp;
        fo.shift += e;
        fo.prelim += e;
        fo.mod += e
    }

    function dM(e, fo, fn) {
        return e._tree.ancestor.parent == fo.parent ? e._tree.ancestor : fn
    }

    d3.layout.treemap = function () {
        var ft = d3.layout.hierarchy(), fx = Math.round, fz = [1, 1], fu = null, e = c6, fv = false, fr, fs = 0.5 * (1 + Math.sqrt(5));

        function fn(fC, fA) {
            var fB = -1, fF = fC.length, fE, fD;
            while (++fB < fF) {
                fD = (fE = fC[fB]).value * (fA < 0 ? 0 : fA);
                fE.area = isNaN(fD) || fD <= 0 ? 0 : fD
            }
        }

        function fp(fE) {
            var fB = fE.children;
            if (fB && fB.length) {
                var fH = e(fE), fJ = [], fG = fB.slice(), fA, fF = Infinity, fD, fI = Math.min(fH.dx, fH.dy), fC;
                fn(fG, fH.dx * fH.dy / fE.value);
                fJ.area = 0;
                while ((fC = fG.length) > 0) {
                    fJ.push(fA = fG[fC - 1]);
                    fJ.area += fA.area;
                    if ((fD = fo(fJ, fI)) <= fF) {
                        fG.pop();
                        fF = fD
                    } else {
                        fJ.area -= fJ.pop().area;
                        fq(fJ, fI, fH, false);
                        fI = Math.min(fH.dx, fH.dy);
                        fJ.length = fJ.area = 0;
                        fF = Infinity
                    }
                }
                if (fJ.length) {
                    fq(fJ, fI, fH, true);
                    fJ.length = fJ.area = 0
                }
                fB.forEach(fp)
            }
        }

        function fy(fD) {
            var fA = fD.children;
            if (fA && fA.length) {
                var fC = e(fD), fB = fA.slice(), fF, fE = [];
                fn(fB, fC.dx * fC.dy / fD.value);
                fE.area = 0;
                while (fF = fB.pop()) {
                    fE.push(fF);
                    fE.area += fF.area;
                    if (fF.z != null) {
                        fq(fE, fF.z ? fC.dx : fC.dy, fC, !fB.length);
                        fE.length = fE.area = 0
                    }
                }
                fA.forEach(fy)
            }
        }

        function fo(fF, fB) {
            var fD = fF.area, fE, fH = 0, fA = Infinity, fC = -1, fG = fF.length;
            while (++fC < fG) {
                if (!(fE = fF[fC].area)) {
                    continue
                }
                if (fE < fA) {
                    fA = fE
                }
                if (fE > fH) {
                    fH = fE
                }
            }
            fD *= fD;
            fB *= fB;
            return fD ? Math.max(fB * fH * fs / fD, fD / (fB * fA * fs)) : Infinity
        }

        function fq(fJ, fI, fE, fH) {
            var fC = -1, fB = fJ.length, fF = fE.x, fD = fE.y, fG = fI ? fx(fJ.area / fI) : 0, fA;
            if (fI == fE.dx) {
                if (fH || fG > fE.dy) {
                    fG = fE.dy
                }
                while (++fC < fB) {
                    fA = fJ[fC];
                    fA.x = fF;
                    fA.y = fD;
                    fA.dy = fG;
                    fF += fA.dx = Math.min(fE.x + fE.dx - fF, fG ? fx(fA.area / fG) : 0)
                }
                fA.z = true;
                fA.dx += fE.x + fE.dx - fF;
                fE.y += fG;
                fE.dy -= fG
            } else {
                if (fH || fG > fE.dx) {
                    fG = fE.dx
                }
                while (++fC < fB) {
                    fA = fJ[fC];
                    fA.x = fF;
                    fA.y = fD;
                    fA.dx = fG;
                    fD += fA.dy = Math.min(fE.y + fE.dy - fD, fG ? fx(fA.area / fG) : 0)
                }
                fA.z = false;
                fA.dy += fE.y + fE.dy - fD;
                fE.x += fG;
                fE.dx -= fG
            }
        }

        function fw(fC) {
            var fB = fr || ft(fC), fA = fB[0];
            fA.x = 0;
            fA.y = 0;
            fA.dx = fz[0];
            fA.dy = fz[1];
            if (fr) {
                ft.revalue(fA)
            }
            fn([fA], fA.dx * fA.dy / fA.value);
            (fr ? fy : fp)(fA);
            if (fv) {
                fr = fB
            }
            return fB
        }

        fw.size = function (fA) {
            if (!arguments.length) {
                return fz
            }
            fz = fA;
            return fw
        };
        fw.padding = function (fA) {
            if (!arguments.length) {
                return fu
            }
            function fD(fE) {
                var fF = fA.call(fw, fE, fE.depth);
                return fF == null ? c6(fE) : ap(fE, typeof fF === "number" ? [fF, fF, fF, fF] : fF)
            }

            function fC(fE) {
                return ap(fE, fA)
            }

            var fB;
            e = (fu = fA) == null ? c6 : (fB = typeof fA) === "function" ? fD : fB === "number" ? (fA = [fA, fA, fA, fA], fC) : fC;
            return fw
        };
        fw.round = function (fA) {
            if (!arguments.length) {
                return fx != Number
            }
            fx = fA ? Math.round : Number;
            return fw
        };
        fw.sticky = function (fA) {
            if (!arguments.length) {
                return fv
            }
            fv = fA;
            fr = null;
            return fw
        };
        fw.ratio = function (fA) {
            if (!arguments.length) {
                return fs
            }
            fs = fA;
            return fw
        };
        return eb(fw, ft)
    };
    function c6(e) {
        return{x:e.x, y:e.y, dx:e.dx, dy:e.dy}
    }

    function ap(fp, fq) {
        var e = fp.x + fq[3], fr = fp.y + fq[0], fo = fp.dx - fq[1] - fq[3], fn = fp.dy - fq[0] - fq[2];
        if (fo < 0) {
            e += fo / 2;
            fo = 0
        }
        if (fn < 0) {
            fr += fn / 2;
            fn = 0
        }
        return{x:e, y:fr, dx:fo, dy:fn}
    }

    function cF(fo, ft) {
        var fr = new RegExp("\r\n|[" + fo + "\r\n]", "g"), fq = new RegExp('["' + fo + "\n]"), fp = fo.charCodeAt(0);

        function fs(fu, fv) {
            d3.text(fu, ft, function (fw) {
                fv(fw && fs.parse(fw))
            })
        }

        fs.parse = function (fu) {
            var fv;
            return fs.parseRows(fu, function (fA, fy) {
                if (fy) {
                    var fz = {}, fx = -1, fw = fv.length;
                    while (++fx < fw) {
                        fz[fv[fx]] = fA[fx]
                    }
                    return fz
                } else {
                    fv = fA;
                    return null
                }
            })
        };
        fs.parseRows = function (fB, fy) {
            var fv = {}, fx = {}, fD = [], fu = 0, fC, fz;
            fr.lastIndex = 0;
            function fw() {
                if (fr.lastIndex >= fB.length) {
                    return fx
                }
                if (fz) {
                    fz = false;
                    return fv
                }
                var fF = fr.lastIndex;
                if (fB.charCodeAt(fF) === 34) {
                    var fG = fF;
                    while (fG++ < fB.length) {
                        if (fB.charCodeAt(fG) === 34) {
                            if (fB.charCodeAt(fG + 1) !== 34) {
                                break
                            }
                            fG++
                        }
                    }
                    fr.lastIndex = fG + 2;
                    var fH = fB.charCodeAt(fG + 1);
                    if (fH === 13) {
                        fz = true;
                        if (fB.charCodeAt(fG + 2) === 10) {
                            fr.lastIndex++
                        }
                    } else {
                        if (fH === 10) {
                            fz = true
                        }
                    }
                    return fB.substring(fF + 1, fG).replace(/""/g, '"')
                }
                var fE = fr.exec(fB);
                if (fE) {
                    fz = fE[0].charCodeAt(0) !== fp;
                    return fB.substring(fF, fE.index)
                }
                fr.lastIndex = fB.length;
                return fB.substring(fF)
            }

            while ((fC = fw()) !== fx) {
                var fA = [];
                while (fC !== fv && fC !== fx) {
                    fA.push(fC);
                    fC = fw()
                }
                if (fy && !(fA = fy(fA, fu++))) {
                    continue
                }
                fD.push(fA)
            }
            return fD
        };
        fs.format = function (fu) {
            return fu.map(fn).join("\n")
        };
        function fn(fu) {
            return fu.map(e).join(fo)
        }

        function e(fu) {
            return fq.test(fu) ? '"' + fu.replace(/\"/g, '""') + '"' : fu
        }

        return fs
    }

    d3.csv = cF(",", "text/csv");
    d3.tsv = cF("\t", "text/tab-separated-values");
    d3.geo = {};
    var cK = Math.PI / 180;
    d3.geo.azimuthal = function () {
        var fr = "orthographic", fu, fp = 200, fo = [480, 250], e, ft, fq, fs;

        function fn(fG) {
            var fw = fG[0] * cK - e, fF = fG[1] * cK, fA = Math.cos(fw), fv = Math.sin(fw), fy = Math.cos(fF), fE = Math.sin(fF), fx = fr !== "orthographic" ? fs * fE + fq * fy * fA : null, fB, fz = fr === "stereographic" ? 1 / (1 + fx) : fr === "gnomonic" ? 1 / fx : fr === "equidistant" ? (fB = Math.acos(fx), fB ? fB / Math.sin(fB) : 0) : fr === "equalarea" ? Math.sqrt(2 / (1 + fx)) : 1, fD = fz * fy * fv, fC = fz * (fs * fy * fA - fq * fE);
            return[fp * fD + fo[0], fp * fC + fo[1]]
        }

        fn.invert = function (fy) {
            var fv = (fy[0] - fo[0]) / fp, fB = (fy[1] - fo[1]) / fp, fw = Math.sqrt(fv * fv + fB * fB), fA = fr === "stereographic" ? 2 * Math.atan(fw) : fr === "gnomonic" ? Math.atan(fw) : fr === "equidistant" ? fw : fr === "equalarea" ? 2 * Math.asin(0.5 * fw) : Math.asin(fw), fx = Math.sin(fA), fz = Math.cos(fA);
            return[(e + Math.atan2(fv * fx, fw * fq * fz + fB * fs * fx)) / cK, Math.asin(fz * fs - (fw ? fB * fx * fq / fw : 0)) / cK]
        };
        fn.mode = function (fv) {
            if (!arguments.length) {
                return fr
            }
            fr = fv + "";
            return fn
        };
        fn.origin = function (fv) {
            if (!arguments.length) {
                return fu
            }
            fu = fv;
            e = fu[0] * cK;
            ft = fu[1] * cK;
            fq = Math.cos(ft);
            fs = Math.sin(ft);
            return fn
        };
        fn.scale = function (fv) {
            if (!arguments.length) {
                return fp
            }
            fp = +fv;
            return fn
        };
        fn.translate = function (fv) {
            if (!arguments.length) {
                return fo
            }
            fo = [+fv[0], +fv[1]];
            return fn
        };
        return fn.origin([0, 0])
    };
    d3.geo.albers = function () {
        var fu = [-98, 38], fs = [29.5, 45.5], fr = 1000, fq = [480, 250], ft, fp, fn, fv;

        function fo(fy) {
            var fw = fp * (cK * fy[0] - ft), fx = Math.sqrt(fn - 2 * fp * Math.sin(cK * fy[1])) / fp;
            return[fr * fx * Math.sin(fw) + fq[0], fr * (fx * Math.cos(fw) - fv) + fq[1]]
        }

        fo.invert = function (fz) {
            var fw = (fz[0] - fq[0]) / fr, fB = (fz[1] - fq[1]) / fr, fA = fv + fB, fx = Math.atan2(fw, fA), fy = Math.sqrt(fw * fw + fA * fA);
            return[(ft + fx / fp) / cK, Math.asin((fn - fy * fy * fp * fp) / (2 * fp)) / cK]
        };
        function e() {
            var fx = cK * fs[0], fw = cK * fs[1], fA = cK * fu[1], fy = Math.sin(fx), fz = Math.cos(fx);
            ft = cK * fu[0];
            fp = 0.5 * (fy + Math.sin(fw));
            fn = fz * fz + 2 * fp * fy;
            fv = Math.sqrt(fn - 2 * fp * Math.sin(fA)) / fp;
            return fo
        }

        fo.origin = function (fw) {
            if (!arguments.length) {
                return fu
            }
            fu = [+fw[0], +fw[1]];
            return e()
        };
        fo.parallels = function (fw) {
            if (!arguments.length) {
                return fs
            }
            fs = [+fw[0], +fw[1]];
            return e()
        };
        fo.scale = function (fw) {
            if (!arguments.length) {
                return fr
            }
            fr = +fw;
            return fo
        };
        fo.translate = function (fw) {
            if (!arguments.length) {
                return fq
            }
            fq = [+fw[0], +fw[1]];
            return fo
        };
        return e()
    };
    d3.geo.albersUsa = function () {
        var e = d3.geo.albers();
        var fq = d3.geo.albers().origin([-160, 60]).parallels([55, 65]);
        var fp = d3.geo.albers().origin([-160, 20]).parallels([8, 18]);
        var fo = d3.geo.albers().origin([-60, 10]).parallels([8, 18]);

        function fn(ft) {
            var fs = ft[0], fr = ft[1];
            return(fr > 50 ? fq : fs < -140 ? fp : fr < 21 ? fo : e)(ft)
        }

        fn.scale = function (fr) {
            if (!arguments.length) {
                return e.scale()
            }
            e.scale(fr);
            fq.scale(fr * 0.6);
            fp.scale(fr);
            fo.scale(fr * 1.5);
            return fn.translate(e.translate())
        };
        fn.translate = function (fs) {
            if (!arguments.length) {
                return e.translate()
            }
            var fr = e.scale() / 1000, fu = fs[0], ft = fs[1];
            e.translate(fs);
            fq.translate([fu - 400 * fr, ft + 170 * fr]);
            fp.translate([fu - 190 * fr, ft + 200 * fr]);
            fo.translate([fu + 580 * fr, ft + 430 * fr]);
            return fn
        };
        return fn.scale(e.scale())
    };
    d3.geo.bonne = function () {
        var fr = 200, fq = [480, 250], e, fp, fo, fn;

        function fs(fw) {
            var ft = fw[0] * cK - e, fx = fw[1] * cK - fp;
            if (fo) {
                var fv = fn + fo - fx, fu = ft * Math.cos(fx) / fv;
                ft = fv * Math.sin(fu);
                fx = fv * Math.cos(fu) - fn
            } else {
                ft *= Math.cos(fx);
                fx *= -1
            }
            return[fr * ft + fq[0], fr * fx + fq[1]]
        }

        fs.invert = function (fv) {
            var ft = (fv[0] - fq[0]) / fr, fx = (fv[1] - fq[1]) / fr;
            if (fo) {
                var fw = fn + fx, fu = Math.sqrt(ft * ft + fw * fw);
                fx = fn + fo - fu;
                ft = e + fu * Math.atan2(ft, fw) / Math.cos(fx)
            } else {
                fx *= -1;
                ft /= Math.cos(fx)
            }
            return[ft / cK, fx / cK]
        };
        fs.parallel = function (ft) {
            if (!arguments.length) {
                return fo / cK
            }
            fn = 1 / Math.tan(fo = ft * cK);
            return fs
        };
        fs.origin = function (ft) {
            if (!arguments.length) {
                return[e / cK, fp / cK]
            }
            e = ft[0] * cK;
            fp = ft[1] * cK;
            return fs
        };
        fs.scale = function (ft) {
            if (!arguments.length) {
                return fr
            }
            fr = +ft;
            return fs
        };
        fs.translate = function (ft) {
            if (!arguments.length) {
                return fq
            }
            fq = [+ft[0], +ft[1]];
            return fs
        };
        return fs.origin([0, 0]).parallel(45)
    };
    d3.geo.equirectangular = function () {
        var fo = 500, fn = [480, 250];

        function e(fq) {
            var fp = fq[0] / 360, fr = -fq[1] / 360;
            return[fo * fp + fn[0], fo * fr + fn[1]]
        }

        e.invert = function (fq) {
            var fp = (fq[0] - fn[0]) / fo, fr = (fq[1] - fn[1]) / fo;
            return[360 * fp, -360 * fr]
        };
        e.scale = function (fp) {
            if (!arguments.length) {
                return fo
            }
            fo = +fp;
            return e
        };
        e.translate = function (fp) {
            if (!arguments.length) {
                return fn
            }
            fn = [+fp[0], +fp[1]];
            return e
        };
        return e
    };
    d3.geo.mercator = function () {
        var fo = 500, fn = [480, 250];

        function e(fq) {
            var fp = fq[0] / 360, fr = -(Math.log(Math.tan(Math.PI / 4 + fq[1] * cK / 2)) / cK) / 360;
            return[fo * fp + fn[0], fo * Math.max(-0.5, Math.min(0.5, fr)) + fn[1]]
        }

        e.invert = function (fq) {
            var fp = (fq[0] - fn[0]) / fo, fr = (fq[1] - fn[1]) / fo;
            return[360 * fp, 2 * Math.atan(Math.exp(-360 * fr * cK)) / cK - 90]
        };
        e.scale = function (fp) {
            if (!arguments.length) {
                return fo
            }
            fo = +fp;
            return e
        };
        e.translate = function (fp) {
            if (!arguments.length) {
                return fn
            }
            fn = [+fp[0], +fp[1]];
            return e
        };
        return e
    };
    function dv(fn, e) {
        return function (fo) {
            return fo && fn.hasOwnProperty(fo.type) ? fn[fo.type](fo) : e
        }
    }

    d3.geo.path = function () {
        var ft = 4.5, fx = A(ft), fs = d3.geo.albersUsa(), fr = [];

        function fw(fA, fz) {
            if (typeof ft === "function") {
                fx = A(ft.apply(this, arguments))
            }
            fn(fA);
            var fy = fr.length ? fr.join("") : null;
            fr = [];
            return fy
        }

        function fu(fy) {
            return fs(fy).join(",")
        }

        var fn = dv({FeatureCollection:function (fA) {
            var fz = fA.features, fy = -1, fB = fz.length;
            while (++fy < fB) {
                fr.push(fn(fz[fy].geometry))
            }
        }, Feature:function (fy) {
            fn(fy.geometry)
        }, Point:function (fy) {
            fr.push("M", fu(fy.coordinates), fx)
        }, MultiPoint:function (fA) {
            var fz = fA.coordinates, fy = -1, fB = fz.length;
            while (++fy < fB) {
                fr.push("M", fu(fz[fy]), fx)
            }
        }, LineString:function (fA) {
            var fz = fA.coordinates, fy = -1, fB = fz.length;
            fr.push("M");
            while (++fy < fB) {
                fr.push(fu(fz[fy]), "L")
            }
            fr.pop()
        }, MultiLineString:function (fD) {
            var fC = fD.coordinates, fB = -1, fE = fC.length, fz, fA, fy;
            while (++fB < fE) {
                fz = fC[fB];
                fA = -1;
                fy = fz.length;
                fr.push("M");
                while (++fA < fy) {
                    fr.push(fu(fz[fA]), "L")
                }
                fr.pop()
            }
        }, Polygon:function (fD) {
            var fC = fD.coordinates, fB = -1, fE = fC.length, fz, fA, fy;
            while (++fB < fE) {
                fz = fC[fB];
                fA = -1;
                if ((fy = fz.length - 1) > 0) {
                    fr.push("M");
                    while (++fA < fy) {
                        fr.push(fu(fz[fA]), "L")
                    }
                    fr[fr.length - 1] = "Z"
                }
            }
        }, MultiPolygon:function (fz) {
            var fH = fz.coordinates, fG = -1, fA = fH.length, fD, fF, fB, fE, fC, fy;
            while (++fG < fA) {
                fD = fH[fG];
                fF = -1;
                fB = fD.length;
                while (++fF < fB) {
                    fE = fD[fF];
                    fC = -1;
                    if ((fy = fE.length - 1) > 0) {
                        fr.push("M");
                        while (++fC < fy) {
                            fr.push(fu(fE[fC]), "L")
                        }
                        fr[fr.length - 1] = "Z"
                    }
                }
            }
        }, GeometryCollection:function (fA) {
            var fz = fA.geometries, fy = -1, fB = fz.length;
            while (++fy < fB) {
                fr.push(fn(fz[fy]))
            }
        }});
        var fo = fw.area = dv({FeatureCollection:function (fB) {
            var fA = 0, fz = fB.features, fy = -1, fC = fz.length;
            while (++fy < fC) {
                fA += fo(fz[fy])
            }
            return fA
        }, Feature:function (fy) {
            return fo(fy.geometry)
        }, Polygon:function (fy) {
            return fq(fy.coordinates)
        }, MultiPolygon:function (fB) {
            var fz = 0, fA = fB.coordinates, fy = -1, fC = fA.length;
            while (++fy < fC) {
                fz += fq(fA[fy])
            }
            return fz
        }, GeometryCollection:function (fB) {
            var fA = 0, fz = fB.geometries, fy = -1, fC = fz.length;
            while (++fy < fC) {
                fA += fo(fz[fy])
            }
            return fA
        }}, 0);

        function fq(fA) {
            var fz = fp(fA[0]), fy = 0, fB = fA.length;
            while (++fy < fB) {
                fz -= fp(fA[fy])
            }
            return fz
        }

        function e(fG) {
            var fE = d3.geom.polygon(fG[0].map(fs)), fy = fE.area(), fz = fE.centroid(fy < 0 ? (fy *= -1, 1) : -1), fF = fz[0], fD = fz[1], fC = fy, fB = 0, fA = fG.length;
            while (++fB < fA) {
                fE = d3.geom.polygon(fG[fB].map(fs));
                fy = fE.area();
                fz = fE.centroid(fy < 0 ? (fy *= -1, 1) : -1);
                fF -= fz[0];
                fD -= fz[1];
                fC -= fy
            }
            return[fF, fD, 6 * fC]
        }

        var fv = fw.centroid = dv({Feature:function (fy) {
            return fv(fy.geometry)
        }, Polygon:function (fz) {
            var fy = e(fz.coordinates);
            return[fy[0] / fy[2], fy[1] / fy[2]]
        }, MultiPolygon:function (fz) {
            var fy = 0, fG = fz.coordinates, fA, fF = 0, fE = 0, fD = 0, fC = -1, fB = fG.length;
            while (++fC < fB) {
                fA = e(fG[fC]);
                fF += fA[0];
                fE += fA[1];
                fD += fA[2]
            }
            return[fF / fD, fE / fD]
        }});

        function fp(fy) {
            return Math.abs(d3.geom.polygon(fy.map(fs)).area())
        }

        fw.projection = function (fy) {
            fs = fy;
            return fw
        };
        fw.pointRadius = function (fy) {
            if (typeof fy === "function") {
                ft = fy
            } else {
                ft = +fy;
                fx = A(ft)
            }
            return fw
        };
        return fw
    };
    function A(e) {
        return"m0," + e + "a" + e + "," + e + " 0 1,1 0," + -2 * e + "a" + e + "," + e + " 0 1,1 0," + +2 * e + "z"
    }

    d3.geo.bounds = function (fo) {
        var fq = Infinity, e = Infinity, fn = -Infinity, fp = -Infinity;
        bV(fo, function (fr, fs) {
            if (fr < fq) {
                fq = fr
            }
            if (fr > fn) {
                fn = fr
            }
            if (fs < e) {
                e = fs
            }
            if (fs > fp) {
                fp = fs
            }
        });
        return[
            [fq, e],
            [fn, fp]
        ]
    };
    function bV(fn, e) {
        if (em.hasOwnProperty(fn.type)) {
            em[fn.type](fn, e)
        }
    }

    var em = {Feature:e6, FeatureCollection:dV, GeometryCollection:da, LineString:d2, MultiLineString:eh, MultiPoint:d2, MultiPolygon:e4, Point:eQ, Polygon:bv};

    function e6(fn, e) {
        bV(fn.geometry, e)
    }

    function dV(fp, fo) {
        for (var e = fp.features, fn = 0, fq = e.length; fn < fq; fn++) {
            bV(e[fn].geometry, fo)
        }
    }

    function da(fp, fo) {
        for (var e = fp.geometries, fn = 0, fq = e.length; fn < fq; fn++) {
            bV(e[fn], fo)
        }
    }

    function d2(fp, fo) {
        for (var e = fp.coordinates, fn = 0, fq = e.length; fn < fq; fn++) {
            fo.apply(null, e[fn])
        }
    }

    function eh(fs, fr) {
        for (var fo = fs.coordinates, fq = 0, ft = fo.length; fq < ft; fq++) {
            for (var fn = fo[fq], fp = 0, e = fn.length; fp < e; fp++) {
                fr.apply(null, fn[fp])
            }
        }
    }

    function e4(fs, fr) {
        for (var fo = fs.coordinates, fq = 0, ft = fo.length; fq < ft; fq++) {
            for (var fn = fo[fq][0], fp = 0, e = fn.length; fp < e; fp++) {
                fr.apply(null, fn[fp])
            }
        }
    }

    function eQ(fn, e) {
        e.apply(null, fn.coordinates)
    }

    function bv(fp, fo) {
        for (var e = fp.coordinates[0], fn = 0, fq = e.length; fn < fq; fn++) {
            fo.apply(null, e[fn])
        }
    }

    d3.geo.circle = function () {
        var fu = [0, 0], fr = 90 - 0.01, fs = fr * cK, fo = d3.geo.greatArc().source(fu).target(d6);

        function fn() {
        }

        function fp(fv) {
            return fo.distance(fv) < fs
        }

        fn.clip = function (fv) {
            if (typeof fu === "function") {
                fo.source(fu.apply(this, arguments))
            }
            return ft(fv) || null
        };
        var ft = dv({FeatureCollection:function (fw) {
            var fv = fw.features.map(ft).filter(d6);
            return fv && (fw = Object.create(fw), fw.features = fv, fw)
        }, Feature:function (fw) {
            var fv = ft(fw.geometry);
            return fv && (fw = Object.create(fw), fw.geometry = fv, fw)
        }, Point:function (fv) {
            return fp(fv.coordinates) && fv
        }, MultiPoint:function (fw) {
            var fv = fw.coordinates.filter(fp);
            return fv.length && {type:fw.type, coordinates:fv}
        }, LineString:function (fw) {
            var fv = fq(fw.coordinates);
            return fv.length && (fw = Object.create(fw), fw.coordinates = fv, fw)
        }, MultiLineString:function (fw) {
            var fv = fw.coordinates.map(fq).filter(function (fx) {
                return fx.length
            });
            return fv.length && (fw = Object.create(fw), fw.coordinates = fv, fw)
        }, Polygon:function (fw) {
            var fv = fw.coordinates.map(fq);
            return fv[0].length && (fw = Object.create(fw), fw.coordinates = fv, fw)
        }, MultiPolygon:function (fw) {
            var fv = fw.coordinates.map(function (fx) {
                return fx.map(fq)
            }).filter(function (fx) {
                return fx[0].length
            });
            return fv.length && (fw = Object.create(fw), fw.coordinates = fv, fw)
        }, GeometryCollection:function (fw) {
            var fv = fw.geometries.map(ft).filter(d6);
            return fv.length && (fw = Object.create(fw), fw.geometries = fv, fw)
        }});

        function fq(fA) {
            var fz = -1, fx = fA.length, fy = [], fD, fC, fB, fw, fv;
            while (++fz < fx) {
                fv = fo.distance(fB = fA[fz]);
                if (fv < fs) {
                    if (fC) {
                        fy.push(fm(fC, fB)((fw - fs) / (fw - fv)))
                    }
                    fy.push(fB);
                    fD = fC = null
                } else {
                    fC = fB;
                    if (!fD && fy.length) {
                        fy.push(fm(fy[fy.length - 1], fC)((fs - fw) / (fv - fw)));
                        fD = fC
                    }
                }
                fw = fv
            }
            fD = fA[0];
            fC = fy[0];
            if (fC && fB[0] === fD[0] && fB[1] === fD[1] && !(fB[0] === fC[0] && fB[1] === fC[1])) {
                fy.push(fC)
            }
            return e(fy)
        }

        function e(fB) {
            var fz = 0, fC = fB.length, fy, fv, fw = fC ? [fB[0]] : fB, fA, fx = fo.source();
            while (++fz < fC) {
                fA = fo.source(fB[fz - 1])(fB[fz]).coordinates;
                for (fy = 0, fv = fA.length; ++fy < fv;) {
                    fw.push(fA[fy])
                }
            }
            fo.source(fx);
            return fw
        }

        fn.origin = function (fv) {
            if (!arguments.length) {
                return fu
            }
            fu = fv;
            if (typeof fu !== "function") {
                fo.source(fu)
            }
            return fn
        };
        fn.angle = function (fv) {
            if (!arguments.length) {
                return fr
            }
            fs = (fr = +fv) * cK;
            return fn
        };
        return d3.rebind(fn, fo, "precision")
    };
    d3.geo.greatArc = function () {
        var fp = bS, fs, fq = bX, fr, fn = 6 * cK, fo = a4();

        function e() {
            var fw = e.distance.apply(this, arguments), ft = 0, fu = fn / fw, fv = [fs];
            while ((ft += fu) < 1) {
                fv.push(fo(ft))
            }
            fv.push(fr);
            return{type:"LineString", coordinates:fv}
        }

        e.distance = function () {
            if (typeof fp === "function") {
                fo.source(fs = fp.apply(this, arguments))
            }
            if (typeof fq === "function") {
                fo.target(fr = fq.apply(this, arguments))
            }
            return fo.distance()
        };
        e.source = function (ft) {
            if (!arguments.length) {
                return fp
            }
            fp = ft;
            if (typeof fp !== "function") {
                fo.source(fs = fp)
            }
            return e
        };
        e.target = function (ft) {
            if (!arguments.length) {
                return fq
            }
            fq = ft;
            if (typeof fq !== "function") {
                fo.target(fr = fq)
            }
            return e
        };
        e.precision = function (ft) {
            if (!arguments.length) {
                return fn / cK
            }
            fn = ft * cK;
            return e
        };
        return e
    };
    function bS(e) {
        return e.source
    }

    function bX(e) {
        return e.target
    }

    function a4() {
        var fp, fA, fs, fz, fu, fn, fo, fy, fq, fx, ft, e, fw, fr;

        function fv(fD) {
            var fG = Math.sin(fD *= fw) * fr, fC = Math.sin(fw - fD) * fr, fB = fC * fu + fG * ft, fF = fC * fn + fG * e, fE = fC * fz + fG * fx;
            return[Math.atan2(fF, fB) / cK, Math.atan2(fE, Math.sqrt(fB * fB + fF * fF)) / cK]
        }

        fv.distance = function () {
            if (fw == null) {
                fr = 1 / Math.sin(fw = Math.acos(Math.max(-1, Math.min(1, fz * fx + fs * fq * Math.cos(fo - fp)))))
            }
            return fw
        };
        fv.source = function (fB) {
            var fC = Math.cos(fp = fB[0] * cK), fD = Math.sin(fp);
            fs = Math.cos(fA = fB[1] * cK);
            fz = Math.sin(fA);
            fu = fs * fC;
            fn = fs * fD;
            fw = null;
            return fv
        };
        fv.target = function (fC) {
            var fB = Math.cos(fo = fC[0] * cK), fD = Math.sin(fo);
            fq = Math.cos(fy = fC[1] * cK);
            fx = Math.sin(fy);
            ft = fq * fB;
            e = fq * fD;
            fw = null;
            return fv
        };
        return fv
    }

    function fm(fn, e) {
        var fo = a4().source(fn).target(e);
        fo.distance();
        return fo
    }

    d3.geo.greatCircle = d3.geo.circle;
    d3.geom = {};
    d3.geom.contour = function (e, fn) {
        var fv = fn || k(e), fr = [], ft = fv[0], fs = fv[1], fw = 0, fu = 0, fp = NaN, fo = NaN, fq = 0;
        do {
            fq = 0;
            if (e(ft - 1, fs - 1)) {
                fq += 1
            }
            if (e(ft, fs - 1)) {
                fq += 2
            }
            if (e(ft - 1, fs)) {
                fq += 4
            }
            if (e(ft, fs)) {
                fq += 8
            }
            if (fq === 6) {
                fw = fo === -1 ? -1 : 1;
                fu = 0
            } else {
                if (fq === 9) {
                    fw = 0;
                    fu = fp === 1 ? -1 : 1
                } else {
                    fw = bO[fq];
                    fu = bM[fq]
                }
            }
            if (fw != fp && fu != fo) {
                fr.push([ft, fs]);
                fp = fw;
                fo = fu
            }
            ft += fw;
            fs += fu
        } while (fv[0] != ft || fv[1] != fs);
        return fr
    };
    var bO = [1, 0, 1, 1, -1, 0, -1, 1, 0, 0, 0, 0, -1, 0, -1, NaN], bM = [0, -1, 0, 0, 0, -1, 0, 0, 1, -1, 1, 1, 0, -1, 0, NaN];

    function k(fn) {
        var e = 0, fo = 0;
        while (true) {
            if (fn(e, fo)) {
                return[e, fo]
            }
            if (e === 0) {
                e = fo + 1;
                fo = 0
            } else {
                e = e - 1;
                fo = fo + 1
            }
        }
    }

    d3.geom.hull = function (fv) {
        if (fv.length < 3) {
            return[]
        }
        var fu = fv.length, fq = fu - 1, fB = [], fx = [], fs, fr, ft = 0, fp, fz, fn, fw, fC, fA, fy, fo;
        for (fs = 1; fs < fu; ++fs) {
            if (fv[fs][1] < fv[ft][1]) {
                ft = fs
            } else {
                if (fv[fs][1] == fv[ft][1]) {
                    ft = fv[fs][0] < fv[ft][0] ? fs : ft
                }
            }
        }
        for (fs = 0; fs < fu; ++fs) {
            if (fs === ft) {
                continue
            }
            fz = fv[fs][1] - fv[ft][1];
            fp = fv[fs][0] - fv[ft][0];
            fB.push({angle:Math.atan2(fz, fp), index:fs})
        }
        fB.sort(function (fE, fD) {
            return fE.angle - fD.angle
        });
        fy = fB[0].angle;
        fA = fB[0].index;
        fC = 0;
        for (fs = 1; fs < fq; ++fs) {
            fr = fB[fs].index;
            if (fy == fB[fs].angle) {
                fp = fv[fA][0] - fv[ft][0];
                fz = fv[fA][1] - fv[ft][1];
                fn = fv[fr][0] - fv[ft][0];
                fw = fv[fr][1] - fv[ft][1];
                if (fp * fp + fz * fz >= fn * fn + fw * fw) {
                    fB[fs].index = -1
                } else {
                    fB[fC].index = -1;
                    fy = fB[fs].angle;
                    fC = fs;
                    fA = fr
                }
            } else {
                fy = fB[fs].angle;
                fC = fs;
                fA = fr
            }
        }
        fx.push(ft);
        for (fs = 0, fr = 0; fs < 2; ++fr) {
            if (fB[fr].index !== -1) {
                fx.push(fB[fr].index);
                fs++
            }
        }
        fo = fx.length;
        for (; fr < fq; ++fr) {
            if (fB[fr].index === -1) {
                continue
            }
            while (!ca(fx[fo - 2], fx[fo - 1], fB[fr].index, fv)) {
                --fo
            }
            fx[fo++] = fB[fr].index
        }
        var e = [];
        for (fs = 0; fs < fo; ++fs) {
            e.push(fv[fx[fs]])
        }
        return e
    };
    function ca(fp, fo, fn, fw) {
        var fx, fv, fu, ft, fs, fr, fq;
        fx = fw[fp];
        fv = fx[0];
        fu = fx[1];
        fx = fw[fo];
        ft = fx[0];
        fs = fx[1];
        fx = fw[fn];
        fr = fx[0];
        fq = fx[1];
        return(fq - fu) * (ft - fv) - (fs - fu) * (fr - fv) > 0
    }

    d3.geom.polygon = function (e) {
        e.area = function () {
            var fp = 0, fq = e.length, fo = e[fq - 1][0] * e[0][1], fn = e[fq - 1][1] * e[0][0];
            while (++fp < fq) {
                fo += e[fp - 1][0] * e[fp][1];
                fn += e[fp - 1][1] * e[fp][0]
            }
            return(fn - fo) * 0.5
        };
        e.centroid = function (fq) {
            var fr = -1, fu = e.length, fo = 0, ft = 0, fp, fn = e[fu - 1], fs;
            if (!arguments.length) {
                fq = -1 / (6 * e.area())
            }
            while (++fr < fu) {
                fp = fn;
                fn = e[fr];
                fs = fp[0] * fn[1] - fn[0] * fp[1];
                fo += (fp[0] + fn[0]) * fs;
                ft += (fp[1] + fn[1]) * fs
            }
            return[fo * fq, ft * fq]
        };
        e.clip = function (ft) {
            var fv, fq = -1, fn = e.length, fp, fo, fw = e[fn - 1], fu, fs, fr;
            while (++fq < fn) {
                fv = ft.slice();
                ft.length = 0;
                fu = e[fq];
                fs = fv[(fo = fv.length) - 1];
                fp = -1;
                while (++fp < fo) {
                    fr = fv[fp];
                    if (u(fr, fw, fu)) {
                        if (!u(fs, fw, fu)) {
                            ft.push(d1(fs, fr, fw, fu))
                        }
                        ft.push(fr)
                    } else {
                        if (u(fs, fw, fu)) {
                            ft.push(d1(fs, fr, fw, fu))
                        }
                    }
                    fs = fr
                }
                fw = fu
            }
            return ft
        };
        return e
    };
    function u(fo, fn, e) {
        return(e[0] - fn[0]) * (fo[1] - fn[1]) < (e[1] - fn[1]) * (fo[0] - fn[0])
    }

    function d1(fz, fy, fC, fB) {
        var fx = fz[0], fw = fy[0], fv = fC[0], ft = fB[0], fp = fz[1], fo = fy[1], fn = fC[1], e = fB[1], fD = fx - fv, fq = fw - fx, fE = ft - fv, fr = fp - fn, fA = fo - fp, fs = e - fn, fu = (fE * fr - fs * fD) / (fs * fq - fE * fA);
        return[fx + fu * fq, fp + fu * fA]
    }

    d3.geom.voronoi = function (fn) {
        var e = fn.map(function () {
            return[]
        });
        eu(fn, function (fq) {
            var fw, fv, fp, fo, ft, fr;
            if (fq.a === 1 && fq.b >= 0) {
                fw = fq.ep.r;
                fv = fq.ep.l
            } else {
                fw = fq.ep.l;
                fv = fq.ep.r
            }
            if (fq.a === 1) {
                ft = fw ? fw.y : -1000000;
                fp = fq.c - fq.b * ft;
                fr = fv ? fv.y : 1000000;
                fo = fq.c - fq.b * fr
            } else {
                fp = fw ? fw.x : -1000000;
                ft = fq.c - fq.a * fp;
                fo = fv ? fv.x : 1000000;
                fr = fq.c - fq.a * fo
            }
            var fu = [fp, ft], fs = [fo, fr];
            e[fq.region.l.index].push(fu, fs);
            e[fq.region.r.index].push(fu, fs)
        });
        return e.map(function (fq, fp) {
            var fo = fn[fp][0], fr = fn[fp][1];
            fq.forEach(function (fs) {
                fs.angle = Math.atan2(fs[0] - fo, fs[1] - fr)
            });
            return fq.sort(function (ft, fs) {
                return ft.angle - fs.angle
            }).filter(function (ft, fs) {
                return !fs || ft.angle - fq[fs - 1].angle > 1e-10
            })
        })
    };
    var b0 = {l:"r", r:"l"};

    function eu(fr, fp) {
        var fF = {list:fr.map(function (e, fH) {
            return{index:fH, x:e[0], y:e[1]}
        }).sort(function (fH, e) {
            return fH.y < e.y ? -1 : fH.y > e.y ? 1 : fH.x < e.x ? -1 : fH.x > e.x ? 1 : 0
        }), bottomSite:null};
        var fo = {list:[], leftEnd:null, rightEnd:null, init:function () {
            fo.leftEnd = fo.createHalfEdge(null, "l");
            fo.rightEnd = fo.createHalfEdge(null, "l");
            fo.leftEnd.r = fo.rightEnd;
            fo.rightEnd.l = fo.leftEnd;
            fo.list.unshift(fo.leftEnd, fo.rightEnd)
        }, createHalfEdge:function (fH, e) {
            return{edge:fH, side:e, vertex:null, l:null, r:null}
        }, insert:function (fH, e) {
            e.l = fH;
            e.r = fH.r;
            fH.r.l = e;
            fH.r = e
        }, leftBound:function (fH) {
            var e = fo.leftEnd;
            do {
                e = e.r
            } while (e != fo.rightEnd && fE.rightOf(e, fH));
            e = e.l;
            return e
        }, del:function (e) {
            e.l.r = e.r;
            e.r.l = e.l;
            e.edge = null
        }, right:function (e) {
            return e.r
        }, left:function (e) {
            return e.l
        }, leftRegion:function (e) {
            return e.edge == null ? fF.bottomSite : e.edge.region[e.side]
        }, rightRegion:function (e) {
            return e.edge == null ? fF.bottomSite : e.edge.region[b0[e.side]]
        }};
        var fE = {bisect:function (fK, fI) {
            var fJ = {region:{l:fK, r:fI}, ep:{l:null, r:null}};
            var fH = fI.x - fK.x, e = fI.y - fK.y, fM = fH > 0 ? fH : -fH, fL = e > 0 ? e : -e;
            fJ.c = fK.x * fH + fK.y * e + (fH * fH + e * e) * 0.5;
            if (fM > fL) {
                fJ.a = 1;
                fJ.b = e / fH;
                fJ.c /= fH
            } else {
                fJ.b = 1;
                fJ.a = fH / e;
                fJ.c /= e
            }
            return fJ
        }, intersect:function (fK, fJ) {
            var fP = fK.edge, fO = fJ.edge;
            if (!fP || !fO || fP.region.r == fO.region.r) {
                return null
            }
            var fN = fP.a * fO.b - fP.b * fO.a;
            if (Math.abs(fN) < 1e-10) {
                return null
            }
            var fI = (fP.c * fO.b - fO.c * fP.b) / fN, fS = (fO.c * fP.a - fP.c * fO.a) / fN, fR = fP.region.r, fM = fO.region.r, fH, fL;
            if (fR.y < fM.y || fR.y == fM.y && fR.x < fM.x) {
                fH = fK;
                fL = fP
            } else {
                fH = fJ;
                fL = fO
            }
            var fQ = fI >= fL.region.r.x;
            if (fQ && fH.side === "l" || !fQ && fH.side === "r") {
                return null
            }
            return{x:fI, y:fS}
        }, rightOf:function (fM, fH) {
            var fQ = fM.edge, fK = fQ.region.r, fT = fH.x > fK.x;
            if (fT && fM.side === "l") {
                return 1
            }
            if (!fT && fM.side === "r") {
                return 0
            }
            if (fQ.a === 1) {
                var fS = fH.y - fK.y, fI = fH.x - fK.x, fN = 0, fR = 0;
                if (!fT && fQ.b < 0 || fT && fQ.b >= 0) {
                    fR = fN = fS >= fQ.b * fI
                } else {
                    fR = fH.x + fH.y * fQ.b > fQ.c;
                    if (fQ.b < 0) {
                        fR = !fR
                    }
                    if (!fR) {
                        fN = 1
                    }
                }
                if (!fN) {
                    var fU = fK.x - fQ.region.l.x;
                    fR = fQ.b * (fI * fI - fS * fS) < fU * fS * (1 + 2 * fI / fU + fQ.b * fQ.b);
                    if (fQ.b < 0) {
                        fR = !fR
                    }
                }
            } else {
                var fJ = fQ.c - fQ.a * fH.x, fP = fH.y - fJ, fO = fH.x - fK.x, fL = fJ - fK.y;
                fR = fP * fP > fO * fO + fL * fL
            }
            return fM.side === "l" ? fR : !fR
        }, endPoint:function (fI, fH, e) {
            fI.ep[fH] = e;
            if (!fI.ep[b0[fH]]) {
                return
            }
            fp(fI)
        }, distance:function (fJ, fI) {
            var fH = fJ.x - fI.x, e = fJ.y - fI.y;
            return Math.sqrt(fH * fH + e * e)
        }};
        var fn = {list:[], insert:function (fL, fH, fM) {
            fL.vertex = fH;
            fL.ystar = fH.y + fM;
            for (var fI = 0, fK = fn.list, e = fK.length; fI < e; fI++) {
                var fJ = fK[fI];
                if (fL.ystar > fJ.ystar || fL.ystar == fJ.ystar && fH.x > fJ.vertex.x) {
                    continue
                } else {
                    break
                }
            }
            fK.splice(fI, 0, fL)
        }, del:function (fJ) {
            for (var fI = 0, fH = fn.list, e = fH.length; fI < e && fH[fI] != fJ; ++fI) {
            }
            fH.splice(fI, 1)
        }, empty:function () {
            return fn.list.length === 0
        }, nextEvent:function (fJ) {
            for (var fI = 0, fH = fn.list, e = fH.length; fI < e; ++fI) {
                if (fH[fI] == fJ) {
                    return fH[fI + 1]
                }
            }
            return null
        }, min:function () {
            var e = fn.list[0];
            return{x:e.vertex.x, y:e.ystar}
        }, extractMin:function () {
            return fn.list.shift()
        }};
        fo.init();
        fF.bottomSite = fF.list.shift();
        var fG = fF.list.shift(), ft;
        var fy, fv, fq, fC, fs;
        var fw, fx, fD, fz, fu;
        var fB, fA;
        while (true) {
            if (!fn.empty()) {
                ft = fn.min()
            }
            if (fG && (fn.empty() || fG.y < ft.y || fG.y == ft.y && fG.x < ft.x)) {
                fy = fo.leftBound(fG);
                fv = fo.right(fy);
                fw = fo.rightRegion(fy);
                fB = fE.bisect(fw, fG);
                fs = fo.createHalfEdge(fB, "l");
                fo.insert(fy, fs);
                fz = fE.intersect(fy, fs);
                if (fz) {
                    fn.del(fy);
                    fn.insert(fy, fz, fE.distance(fz, fG))
                }
                fy = fs;
                fs = fo.createHalfEdge(fB, "r");
                fo.insert(fy, fs);
                fz = fE.intersect(fs, fv);
                if (fz) {
                    fn.insert(fs, fz, fE.distance(fz, fG))
                }
                fG = fF.list.shift()
            } else {
                if (!fn.empty()) {
                    fy = fn.extractMin();
                    fq = fo.left(fy);
                    fv = fo.right(fy);
                    fC = fo.right(fv);
                    fw = fo.leftRegion(fy);
                    fx = fo.rightRegion(fv);
                    fu = fy.vertex;
                    fE.endPoint(fy.edge, fy.side, fu);
                    fE.endPoint(fv.edge, fv.side, fu);
                    fo.del(fy);
                    fn.del(fv);
                    fo.del(fv);
                    fA = "l";
                    if (fw.y > fx.y) {
                        fD = fw;
                        fw = fx;
                        fx = fD;
                        fA = "r"
                    }
                    fB = fE.bisect(fw, fx);
                    fs = fo.createHalfEdge(fB, fA);
                    fo.insert(fq, fs);
                    fE.endPoint(fB, b0[fA], fu);
                    fz = fE.intersect(fq, fs);
                    if (fz) {
                        fn.del(fq);
                        fn.insert(fq, fz, fE.distance(fz, fw))
                    }
                    fz = fE.intersect(fs, fC);
                    if (fz) {
                        fn.insert(fs, fz, fE.distance(fz, fw))
                    }
                } else {
                    break
                }
            }
        }
        for (fy = fo.right(fo.leftEnd); fy != fo.rightEnd; fy = fo.right(fy)) {
            fp(fy.edge)
        }
    }

    d3.geom.delaunay = function (fn) {
        var e = fn.map(function () {
            return[]
        }), fo = [];
        eu(fn, function (fp) {
            e[fp.region.l.index].push(fn[fp.region.r.index])
        });
        e.forEach(function (fu, ft) {
            var fr = fn[ft], fq = fr[0], fv = fr[1];
            fu.forEach(function (fw) {
                fw.angle = Math.atan2(fw[0] - fq, fw[1] - fv)
            });
            fu.sort(function (fx, fw) {
                return fx.angle - fw.angle
            });
            for (var fs = 0, fp = fu.length - 1; fs < fp; fs++) {
                fo.push([fr, fu[fs], fu[fs + 1]])
            }
        });
        return fo
    };
    d3.geom.quadtree = function (fv, fo, fu, e, ft) {
        var fn, fq = -1, fp = fv.length;
        if (fp && isNaN(fv[0].x)) {
            fv = fv.map(F)
        }
        if (arguments.length < 5) {
            if (arguments.length === 3) {
                ft = e = fu;
                fu = fo
            } else {
                fo = fu = Infinity;
                e = ft = -Infinity;
                while (++fq < fp) {
                    fn = fv[fq];
                    if (fn.x < fo) {
                        fo = fn.x
                    }
                    if (fn.y < fu) {
                        fu = fn.y
                    }
                    if (fn.x > e) {
                        e = fn.x
                    }
                    if (fn.y > ft) {
                        ft = fn.y
                    }
                }
                var fy = e - fo, fx = ft - fu;
                if (fy > fx) {
                    ft = fu + fy
                } else {
                    e = fo + fx
                }
            }
        }
        function fw(fF, fE, fB, fD, fA, fC) {
            if (isNaN(fE.x) || isNaN(fE.y)) {
                return
            }
            if (fF.leaf) {
                var fz = fF.point;
                if (fz) {
                    if (Math.abs(fz.x - fE.x) + Math.abs(fz.y - fE.y) < 0.01) {
                        fr(fF, fE, fB, fD, fA, fC)
                    } else {
                        fF.point = null;
                        fr(fF, fz, fB, fD, fA, fC);
                        fr(fF, fE, fB, fD, fA, fC)
                    }
                } else {
                    fF.point = fE
                }
            } else {
                fr(fF, fE, fB, fD, fA, fC)
            }
        }

        function fr(fD, fB, fC, fI, fA, fG) {
            var fH = (fC + fA) * 0.5, fF = (fI + fG) * 0.5, fJ = fB.x >= fH, fz = fB.y >= fF, fE = (fz << 1) + fJ;
            fD.leaf = false;
            fD = fD.nodes[fE] || (fD.nodes[fE] = dC());
            if (fJ) {
                fC = fH
            } else {
                fA = fH
            }
            if (fz) {
                fI = fF
            } else {
                fG = fF
            }
            fw(fD, fB, fC, fI, fA, fG)
        }

        var fs = dC();
        fs.add = function (fz) {
            fw(fs, fz, fo, fu, e, ft)
        };
        fs.visit = function (fz) {
            bz(fz, fs, fo, fu, e, ft)
        };
        fv.forEach(fs.add);
        return fs
    };
    function dC() {
        return{leaf:true, nodes:[], point:null}
    }

    function bz(fq, fp, fn, fu, e, fs) {
        if (!fq(fp, fn, fu, e, fs)) {
            var ft = (fn + e) * 0.5, fr = (fu + fs) * 0.5, fo = fp.nodes;
            if (fo[0]) {
                bz(fq, fo[0], fn, fu, ft, fr)
            }
            if (fo[1]) {
                bz(fq, fo[1], ft, fu, e, fr)
            }
            if (fo[2]) {
                bz(fq, fo[2], fn, fr, ft, fs)
            }
            if (fo[3]) {
                bz(fq, fo[3], ft, fr, e, fs)
            }
        }
    }

    function F(e) {
        return{x:e[0], y:e[1]}
    }

    d3.time = {};
    var dB = Date, p = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function eF() {
        this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
    }

    eF.prototype = {getDate:function () {
        return this._.getUTCDate()
    }, getDay:function () {
        return this._.getUTCDay()
    }, getFullYear:function () {
        return this._.getUTCFullYear()
    }, getHours:function () {
        return this._.getUTCHours()
    }, getMilliseconds:function () {
        return this._.getUTCMilliseconds()
    }, getMinutes:function () {
        return this._.getUTCMinutes()
    }, getMonth:function () {
        return this._.getUTCMonth()
    }, getSeconds:function () {
        return this._.getUTCSeconds()
    }, getTime:function () {
        return this._.getTime()
    }, getTimezoneOffset:function () {
        return 0
    }, valueOf:function () {
        return this._.valueOf()
    }, setDate:function () {
        dO.setUTCDate.apply(this._, arguments)
    }, setDay:function () {
        dO.setUTCDay.apply(this._, arguments)
    }, setFullYear:function () {
        dO.setUTCFullYear.apply(this._, arguments)
    }, setHours:function () {
        dO.setUTCHours.apply(this._, arguments)
    }, setMilliseconds:function () {
        dO.setUTCMilliseconds.apply(this._, arguments)
    }, setMinutes:function () {
        dO.setUTCMinutes.apply(this._, arguments)
    }, setMonth:function () {
        dO.setUTCMonth.apply(this._, arguments)
    }, setSeconds:function () {
        dO.setUTCSeconds.apply(this._, arguments)
    }, setTime:function () {
        dO.setTime.apply(this._, arguments)
    }};
    var dO = Date.prototype;
    var G = "%a %b %e %H:%M:%S %Y", cO = "%m/%d/%y", bR = "%H:%M:%S";
    var be = p, bD = be.map(cX), bh = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], ag = bh.map(cX);

    function cX(e) {
        return e.substring(0, 3)
    }

    d3.time.format = function (e) {
        var fo = e.length;

        function fn(fr) {
            var fq = [], fs = -1, fp = 0, fu, ft;
            while (++fs < fo) {
                if (e.charCodeAt(fs) == 37) {
                    fq.push(e.substring(fp, fs), (ft = ee[fu = e.charAt(++fs)]) ? ft(fr) : fu);
                    fp = fs + 1
                }
            }
            fq.push(e.substring(fp, fs));
            return fq.join("")
        }

        fn.parse = function (fq) {
            var fs = {y:1900, m:0, d:1, H:0, M:0, S:0, L:0}, fr = cp(fs, e, fq, 0);
            if (fr != fq.length) {
                return null
            }
            if ("p" in fs) {
                fs.H = fs.H % 12 + fs.p * 12
            }
            var fp = new dB;
            fp.setFullYear(fs.y, fs.m, fs.d);
            fp.setHours(fs.H, fs.M, fs.S, fs.L);
            return fp
        };
        fn.toString = function () {
            return e
        };
        return fn
    };
    function cp(fp, fu, fs, fq) {
        var ft, e, fr = 0, fn = fu.length, fo = fs.length;
        while (fr < fn) {
            if (fq >= fo) {
                return -1
            }
            ft = fu.charCodeAt(fr++);
            if (ft == 37) {
                e = fa[fu.charAt(fr++)];
                if (!e || (fq = e(fp, fs, fq)) < 0) {
                    return -1
                }
            } else {
                if (ft != fs.charCodeAt(fq++)) {
                    return -1
                }
            }
        }
        return fq
    }

    function by(e) {
        return new RegExp("^(?:" + e.map(d3.requote).join("|") + ")", "i")
    }

    function ez(fo) {
        var fn = new ae, e = -1, fp = fo.length;
        while (++e < fp) {
            fn.set(fo[e].toLowerCase(), e)
        }
        return fn
    }

    var aU = d3.format("02d"), aT = d3.format("03d"), aS = d3.format("04d"), aQ = d3.format("2d");
    var e0 = by(be), dD = by(bD), eH = by(bh), dt = ez(bh), cV = by(ag), c1 = ez(ag);
    var ee = {a:function (e) {
        return bD[e.getDay()]
    }, A:function (e) {
        return be[e.getDay()]
    }, b:function (e) {
        return ag[e.getMonth()]
    }, B:function (e) {
        return bh[e.getMonth()]
    }, c:d3.time.format(G), d:function (e) {
        return aU(e.getDate())
    }, e:function (e) {
        return aQ(e.getDate())
    }, H:function (e) {
        return aU(e.getHours())
    }, I:function (e) {
        return aU(e.getHours() % 12 || 12)
    }, j:function (e) {
        return aT(1 + d3.time.dayOfYear(e))
    }, L:function (e) {
        return aT(e.getMilliseconds())
    }, m:function (e) {
        return aU(e.getMonth() + 1)
    }, M:function (e) {
        return aU(e.getMinutes())
    }, p:function (e) {
        return e.getHours() >= 12 ? "PM" : "AM"
    }, S:function (e) {
        return aU(e.getSeconds())
    }, U:function (e) {
        return aU(d3.time.sundayOfYear(e))
    }, w:function (e) {
        return e.getDay()
    }, W:function (e) {
        return aU(d3.time.mondayOfYear(e))
    }, x:d3.time.format(cO), X:d3.time.format(bR), y:function (e) {
        return aU(e.getFullYear() % 100)
    }, Y:function (e) {
        return aS(e.getFullYear() % 10000)
    }, Z:dL, "%":function (e) {
        return"%"
    }};
    var fa = {a:eE, A:bt, b:aq, B:cW, c:cA, d:a5, e:a5, H:ai, I:ai, L:eA, m:ep, M:bG, p:eZ, S:ci, x:fl, X:ek, y:D, Y:aM};

    function eE(fn, e, fo) {
        dD.lastIndex = 0;
        var fp = dD.exec(e.substring(fo));
        return fp ? fo += fp[0].length : -1
    }

    function bt(fn, e, fo) {
        e0.lastIndex = 0;
        var fp = e0.exec(e.substring(fo));
        return fp ? fo += fp[0].length : -1
    }

    function aq(fn, e, fo) {
        cV.lastIndex = 0;
        var fp = cV.exec(e.substring(fo));
        return fp ? (fn.m = c1.get(fp[0].toLowerCase()), fo += fp[0].length) : -1
    }

    function cW(fn, e, fo) {
        eH.lastIndex = 0;
        var fp = eH.exec(e.substring(fo));
        return fp ? (fn.m = dt.get(fp[0].toLowerCase()), fo += fp[0].length) : -1
    }

    function cA(fn, e, fo) {
        return cp(fn, ee.c.toString(), e, fo)
    }

    function fl(fn, e, fo) {
        return cp(fn, ee.x.toString(), e, fo)
    }

    function ek(fn, e, fo) {
        return cp(fn, ee.X.toString(), e, fo)
    }

    function aM(fn, e, fo) {
        dQ.lastIndex = 0;
        var fp = dQ.exec(e.substring(fo, fo + 4));
        return fp ? (fn.y = +fp[0], fo += fp[0].length) : -1
    }

    function D(fn, e, fo) {
        dQ.lastIndex = 0;
        var fp = dQ.exec(e.substring(fo, fo + 2));
        return fp ? (fn.y = bL(+fp[0]), fo += fp[0].length) : -1
    }

    function bL(e) {
        return e + (e > 68 ? 1900 : 2000)
    }

    function ep(fn, e, fo) {
        dQ.lastIndex = 0;
        var fp = dQ.exec(e.substring(fo, fo + 2));
        return fp ? (fn.m = fp[0] - 1, fo += fp[0].length) : -1
    }

    function a5(fn, e, fo) {
        dQ.lastIndex = 0;
        var fp = dQ.exec(e.substring(fo, fo + 2));
        return fp ? (fn.d = +fp[0], fo += fp[0].length) : -1
    }

    function ai(fn, e, fo) {
        dQ.lastIndex = 0;
        var fp = dQ.exec(e.substring(fo, fo + 2));
        return fp ? (fn.H = +fp[0], fo += fp[0].length) : -1
    }

    function bG(fn, e, fo) {
        dQ.lastIndex = 0;
        var fp = dQ.exec(e.substring(fo, fo + 2));
        return fp ? (fn.M = +fp[0], fo += fp[0].length) : -1
    }

    function ci(fn, e, fo) {
        dQ.lastIndex = 0;
        var fp = dQ.exec(e.substring(fo, fo + 2));
        return fp ? (fn.S = +fp[0], fo += fp[0].length) : -1
    }

    function eA(fn, e, fo) {
        dQ.lastIndex = 0;
        var fp = dQ.exec(e.substring(fo, fo + 3));
        return fp ? (fn.L = +fp[0], fo += fp[0].length) : -1
    }

    var dQ = /^\s*\d+/;

    function eZ(fn, e, fo) {
        var fp = d.get(e.substring(fo, fo += 2).toLowerCase());
        return fp == null ? -1 : (fn.p = fp, fo)
    }

    var d = d3.map({am:0, pm:1});

    function dL(fq) {
        var fp = fq.getTimezoneOffset(), fo = fp > 0 ? "-" : "+", fn = ~~(Math.abs(fp) / 60), e = Math.abs(fp) % 60;
        return fo + aU(fn) + aU(e)
    }

    d3.time.format.utc = function (fn) {
        var e = d3.time.format(fn);

        function fo(fp) {
            try {
                dB = eF;
                var fq = new dB;
                fq._ = fp;
                return e(fq)
            } finally {
                dB = Date
            }
        }

        fo.parse = function (fq) {
            try {
                dB = eF;
                var fp = e.parse(fq);
                return fp && fp._
            } finally {
                dB = Date
            }
        };
        fo.toString = e.toString;
        return fo
    };
    var ce = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
    d3.time.format.iso = Date.prototype.toISOString ? b2 : ce;
    function b2(e) {
        return e.toISOString()
    }

    b2.parse = function (fn) {
        var e = new Date(fn);
        return isNaN(e) ? null : e
    };
    b2.toString = ce.toString;
    function bI(fr, e, fn) {
        function fu(fv) {
            var fx = fr(fv), fw = fp(fx, 1);
            return fv - fx < fw - fv ? fx : fw
        }

        function ft(fv) {
            e(fv = fr(new dB(fv - 1)), 1);
            return fv
        }

        function fp(fw, fv) {
            e(fw = new dB(+fw), fv);
            return fw
        }

        function fq(fx, fw, fv) {
            var fy = ft(fx), fz = [];
            if (fv > 1) {
                while (fy < fw) {
                    if (!(fn(fy) % fv)) {
                        fz.push(new Date(+fy))
                    }
                    e(fy, 1)
                }
            } else {
                while (fy < fw) {
                    fz.push(new Date(+fy)), e(fy, 1)
                }
            }
            return fz
        }

        function fo(fy, fx, fw) {
            try {
                dB = eF;
                var fv = new eF;
                fv._ = fy;
                return fq(fv, fx, fw)
            } finally {
                dB = Date
            }
        }

        fr.floor = fr;
        fr.round = fu;
        fr.ceil = ft;
        fr.offset = fp;
        fr.range = fq;
        var fs = fr.utc = cg(fr);
        fs.floor = fs;
        fs.round = cg(fu);
        fs.ceil = cg(ft);
        fs.offset = cg(fp);
        fs.range = fo;
        return fr
    }

    function cg(e) {
        return function (fo, fn) {
            try {
                dB = eF;
                var fp = new eF;
                fp._ = fo;
                return e(fp, fn)._
            } finally {
                dB = Date
            }
        }
    }

    d3.time.second = bI(function (e) {
        return new dB(Math.floor(e / 1000) * 1000)
    }, function (e, fn) {
        e.setTime(e.getTime() + Math.floor(fn) * 1000)
    }, function (e) {
        return e.getSeconds()
    });
    d3.time.seconds = d3.time.second.range;
    d3.time.seconds.utc = d3.time.second.utc.range;
    d3.time.minute = bI(function (e) {
        return new dB(Math.floor(e / 60000) * 60000)
    }, function (e, fn) {
        e.setTime(e.getTime() + Math.floor(fn) * 60000)
    }, function (e) {
        return e.getMinutes()
    });
    d3.time.minutes = d3.time.minute.range;
    d3.time.minutes.utc = d3.time.minute.utc.range;
    d3.time.hour = bI(function (e) {
        var fn = e.getTimezoneOffset() / 60;
        return new dB((Math.floor(e / 3600000 - fn) + fn) * 3600000)
    }, function (e, fn) {
        e.setTime(e.getTime() + Math.floor(fn) * 3600000)
    }, function (e) {
        return e.getHours()
    });
    d3.time.hours = d3.time.hour.range;
    d3.time.hours.utc = d3.time.hour.utc.range;
    d3.time.day = bI(function (fn) {
        var e = new dB(0, fn.getMonth(), fn.getDate());
        e.setFullYear(fn.getFullYear());
        return e
    }, function (e, fn) {
        e.setDate(e.getDate() + fn)
    }, function (e) {
        return e.getDate() - 1
    });
    d3.time.days = d3.time.day.range;
    d3.time.days.utc = d3.time.day.utc.range;
    d3.time.dayOfYear = function (e) {
        var fn = d3.time.year(e);
        return Math.floor((e - fn - (e.getTimezoneOffset() - fn.getTimezoneOffset()) * 60000) / 86400000)
    };
    p.forEach(function (fn, fo) {
        fn = fn.toLowerCase();
        fo = 7 - fo;
        var e = d3.time[fn] = bI(function (fp) {
            (fp = d3.time.day(fp)).setDate(fp.getDate() - (fp.getDay() + fo) % 7);
            return fp
        }, function (fp, fq) {
            fp.setDate(fp.getDate() + Math.floor(fq) * 7)
        }, function (fq) {
            var fp = d3.time.year(fq).getDay();
            return Math.floor((d3.time.dayOfYear(fq) + (fp + fo) % 7) / 7) - (fp !== fo)
        });
        d3.time[fn + "s"] = e.range;
        d3.time[fn + "s"].utc = e.utc.range;
        d3.time[fn + "OfYear"] = function (fq) {
            var fp = d3.time.year(fq).getDay();
            return Math.floor((d3.time.dayOfYear(fq) + (fp + fo) % 7) / 7)
        }
    });
    d3.time.week = d3.time.sunday;
    d3.time.weeks = d3.time.sunday.range;
    d3.time.weeks.utc = d3.time.sunday.utc.range;
    d3.time.weekOfYear = d3.time.sundayOfYear;
    d3.time.month = bI(function (e) {
        e = d3.time.day(e);
        e.setDate(1);
        return e
    }, function (e, fn) {
        e.setMonth(e.getMonth() + fn)
    }, function (e) {
        return e.getMonth()
    });
    d3.time.months = d3.time.month.range;
    d3.time.months.utc = d3.time.month.utc.range;
    d3.time.year = bI(function (e) {
        e = d3.time.day(e);
        e.setMonth(0, 1);
        return e
    }, function (e, fn) {
        e.setFullYear(e.getFullYear() + fn)
    }, function (e) {
        return e.getFullYear()
    });
    d3.time.years = d3.time.year.range;
    d3.time.years.utc = d3.time.year.utc.range;
    function aH(e, fn, fo) {
        function fp(fq) {
            return e(fq)
        }

        fp.invert = function (fq) {
            return dN(e.invert(fq))
        };
        fp.domain = function (fq) {
            if (!arguments.length) {
                return e.domain().map(dN)
            }
            e.domain(fq);
            return fp
        };
        fp.nice = function (fq) {
            return fp.domain(d4(fp.domain(), function () {
                return fq
            }))
        };
        fp.ticks = function (fq, fr) {
            var fu = dI(fp.domain());
            if (typeof fq !== "function") {
                var ft = fu[1] - fu[0], fv = ft / fq, fs = d3.bisect(c9, fv);
                if (fs == c9.length) {
                    return fn.year(fu, fq)
                }
                if (!fs) {
                    return e.ticks(fq).map(dN)
                }
                if (Math.log(fv / c9[fs - 1]) < Math.log(c9[fs] / fv)) {
                    --fs
                }
                fq = fn[fs];
                fr = fq[1];
                fq = fq[0].range
            }
            return fq(fu[0], new Date(+fu[1] + 1), fr)
        };
        fp.tickFormat = function () {
            return fo
        };
        fp.copy = function () {
            return aH(e.copy(), fn, fo)
        };
        return d3.rebind(fp, e, "range", "rangeRound", "interpolate", "clamp")
    }

    function dI(fn) {
        var fo = fn[0], e = fn[fn.length - 1];
        return fo < e ? [fo, e] : [e, fo]
    }

    function dN(e) {
        return new Date(e)
    }

    function bF(e) {
        return function (fn) {
            var fo = e.length - 1, fp = e[fo];
            while (!fp[1](fn)) {
                fp = e[--fo]
            }
            return fp[0](fn)
        }
    }

    function cl(fn) {
        var e = new Date(fn, 0, 1);
        e.setFullYear(fn);
        return e
    }

    function eG(fo) {
        var fp = fo.getFullYear(), fn = cl(fp), e = cl(fp + 1);
        return fp + (fo - fn) / (e - fn)
    }

    var c9 = [1000, 5000, 15000, 30000, 60000, 300000, 900000, 1800000, 3600000, 10800000, 21600000, 43200000, 86400000, 172800000, 604800000, 2592000000, 7776000000, 31536000000];
    var bs = [
        [d3.time.second, 1],
        [d3.time.second, 5],
        [d3.time.second, 15],
        [d3.time.second, 30],
        [d3.time.minute, 1],
        [d3.time.minute, 5],
        [d3.time.minute, 15],
        [d3.time.minute, 30],
        [d3.time.hour, 1],
        [d3.time.hour, 3],
        [d3.time.hour, 6],
        [d3.time.hour, 12],
        [d3.time.day, 1],
        [d3.time.day, 2],
        [d3.time.week, 1],
        [d3.time.month, 1],
        [d3.time.month, 3],
        [d3.time.year, 1]
    ];
    var du = [
        [d3.time.format("%Y"), function (e) {
            return true
        }],
        [d3.time.format("%B"), function (e) {
            return e.getMonth()
        }],
        [d3.time.format("%b %d"), function (e) {
            return e.getDate() != 1
        }],
        [d3.time.format("%a %d"), function (e) {
            return e.getDay() && e.getDate() != 1
        }],
        [d3.time.format("%I %p"), function (e) {
            return e.getHours()
        }],
        [d3.time.format("%I:%M"), function (e) {
            return e.getMinutes()
        }],
        [d3.time.format(":%S"), function (e) {
            return e.getSeconds()
        }],
        [d3.time.format(".%L"), function (e) {
            return e.getMilliseconds()
        }]
    ];
    var bq = d3.scale.linear(), I = bF(du);
    bs.year = function (fn, e) {
        return bq.domain(fn.map(eG)).ticks(e).map(cl)
    };
    d3.time.scale = function () {
        return aH(d3.scale.linear(), bs, I)
    };
    var fc = bs.map(function (e) {
        return[e[0].utc, e[1]]
    });
    var bb = [
        [d3.time.format.utc("%Y"), function (e) {
            return true
        }],
        [d3.time.format.utc("%B"), function (e) {
            return e.getUTCMonth()
        }],
        [d3.time.format.utc("%b %d"), function (e) {
            return e.getUTCDate() != 1
        }],
        [d3.time.format.utc("%a %d"), function (e) {
            return e.getUTCDay() && e.getUTCDate() != 1
        }],
        [d3.time.format.utc("%I %p"), function (e) {
            return e.getUTCHours()
        }],
        [d3.time.format.utc("%I:%M"), function (e) {
            return e.getUTCMinutes()
        }],
        [d3.time.format.utc(":%S"), function (e) {
            return e.getUTCSeconds()
        }],
        [d3.time.format.utc(".%L"), function (e) {
            return e.getUTCMilliseconds()
        }]
    ];
    var c0 = bF(bb);

    function bN(fn) {
        var e = new Date(Date.UTC(fn, 0, 1));
        e.setUTCFullYear(fn);
        return e
    }

    function d0(fo) {
        var fp = fo.getUTCFullYear(), fn = bN(fp), e = bN(fp + 1);
        return fp + (fo - fn) / (e - fn)
    }

    fc.year = function (fn, e) {
        return bq.domain(fn.map(d0)).ticks(e).map(bN)
    };
    d3.time.scale.utc = function () {
        return aH(d3.scale.linear(), fc, c0)
    }
})();