(function() {
    function c(n) {
        return decodeURIComponent(n.replace(/\+/g, "%20"))
    }
    function t(n) {
        return encodeURIComponent(String(n)).replace(/['"\(\)]/g, function(n) {
            switch (n) {
            case "'":
                return "%27";
            case '"':
                return "%22";
            case "(":
                return "%28";
            case ")":
                return "%29";
            default:
                return n
            }
        })
    }
    function n(n, i, r) {
        var o, h, e, s;
        if (!u)
            for (u = {},
            o = document.cookie ? document.cookie.split("; ") : [],
            e = 0; e < o.length; e++) {
                var l = o[e].split("=")
                  , h = c(l.shift())
                  , f = l.join("=");
                switch (f[0]) {
                case "#":
                    f = +f.substring(1);
                    break;
                case ":":
                    f = new Date(+f.substring(1));
                    break;
                case "!":
                    f = f === "!!";
                    break;
                case "'":
                    f = c(f.substring(1));
                    break;
                default:
                    f = c(f)
                }
                u[h] = f
            }
        if (h = String(n),
        i === undefined)
            return u[h];
        if (i === null) {
            document.cookie = n + "=; path=/; expires=" + new Date(0).toUTCString();
            delete u[h];
            return
        }
        if (u[h] = i,
        typeof i == "number")
            i = "#" + i;
        else if (typeof i == "boolean")
            i = i ? "!!" : "!";
        else if (i)
            if (i.constructor === Date)
                i = ":" + i.getTime();
            else if (nt(i))
                if (i.length)
                    if (typeof i[0] == "number") {
                        for (o = new Array(i.length),
                        e = 0; e < i.length; e++)
                            if (o[e] = parseFloat(i[e]),
                            isNaN(o[e])) {
                                o = null;
                                break
                            }
                        i = o ? JSON.stringify(o) : t(String(i))
                    } else
                        i = encode(String(i));
                else
                    i = "[]";
            else
                i = typeof i == "string" ? t(i) : typeof i == "object" ? JSON.stringify(i) : String(i);
        else
            i = "";
        r ? r.constructor === Date || (s = new Date,
        typeof r == "number" ? s.setDate(s.getDate() + r) : s.setDate(s.getDate() + 30)) : s = null;
        document.cookie = [h + "=" + i, "; path=/", s ? "; expires = " + s.toUTCString() : "", p ? "; domain=" + p : ""].join("")
    }
    function tt(n) {
        var i, t;
        if (!s)
            for (s = {},
            i = window.location.search.substr(1).split("&"),
            t = 0; t < i.length; t++) {
                var r = i[t++].split("=")
                  , u = r.shift().toLowerCase()
                  , f = r.join("=");
                s[u] = c(f)
            }
        return s[String(n).toLowerCase()]
    }
    function l(n) {
        if (window.navigator.sendBeacon) {
            window.navigator.sendBeacon(n);
            return
        }
        var t = document.createElement("img");
        t.style.display = "none";
        t.src = "about:blank";
        document.body.appendChild(t);
        t.src = n
    }
    function e(t, i, r) {
        if (t === undefined) {
            var u = n("_sa");
            return +(u || 0)
        }
        n("_sa", t);
        a(i);
        rt(t, r)
    }
    function a(n) {
        if (typeof localStorage == "undefined")
            return null;
        if (n === undefined) {
            var t = +localStorage._vid_;
            return isNaN(t) && (t = 0),
            t
        }
        n > 0 && (localStorage._vid_ = n)
    }
    function it() {
        var n = new Date
          , t = new Date(n.getFullYear(),0,1)
          , i = new Date(n.getFullYear(),6,1);
        return Math.max(t.getTimezoneOffset(), i.getTimezoneOffset()) / 60
    }
    function v() {
        var n, t, r, i;
        if (document.getElementsByTagName)
            n = document.getElementsByTagName("a");
        else if (window.$)
            n = $("a");
        else
            return "";
        for (t = 0,
        r = n.length; t < r; t++) {
            var u = n[t]
              , f = u && u.getAttribute("href")
              , e = f && /^tel:(.+)$/.exec(f);
            if (e && (i = e[1].replace(/\D+/g, ""),
            i && i.length >= 10))
                return i
        }
        return ""
    }
    function et() {
        var n;
        if (window.Process && window.Process.Phones)
            try {
                n = window.Process.Phones()
            } catch (t) {}
        return n || ""
    }
    function w() {
        var i, f, r, u, n;
        if (document.getElementsByClassName)
            i = document.getElementsByClassName("ui-track-version");
        else if (window.$)
            i = $(".ui-track-version");
        else
            return "";
        for (f = {},
        r = [],
        u = 0; u < i.length; u++)
            n = i[u].getAttribute("id"),
            n && !f[n] && (f[n] = !0,
            r.push(n));
        return r.length ? t(r.join("|")) : ""
    }
    function ot(u, f) {
        var e = document.createElement("script")
          , o = window.innerWidth || document.documentElement.offsetWidth || document.body.offsetWidth || 0
          , s = window.innerHeight || document.documentElement.offsetHeight || document.body.offsetHeight || 0;
        e.type = "text/javascript";
        e.async = !0;
        e.src = r + "/sa4.js?" + i + "," + u + "," + a() + "," + f + "," + o + "x" + s + "," + it() + "," + v() + "," + t(window.location.href) + "," + (n("L") || "0") + "," + (w() || "0") + "," + (n("SEOD") || "");
        document.head.appendChild(e)
    }
    function st(t, i, u, f, o, s, h, c, a, y, p, w, b, k) {
        var nt, rt, ut, tt, d, g, it, ft, et;
        if (t && i) {
            for (e(t, i, u),
            nt = {
                SPPC: u,
                PPCAD: f,
                PPCEX: o,
                PPCCMP: s,
                SEOD: h,
                SEOK: c,
                PPCP1: a,
                PPCP2: y,
                PPCTR: p,
                L: w
            },
            rt = !!document.body.getAttribute("data-location"),
            !rt && w > 0 && (ut = n("L"),
            w != ut && window.location.replace(window.location.pathname + "?L_=" + w)),
            tt = Object.keys(nt),
            d = 0; d < tt.length; d++)
                g = tt[d],
                it = nt[g],
                it ? n(g, it, k || !0) : n(g, null);
            if (window.Process) {
                try {
                    window.Process.Delayed()
                } catch (ot) {}
                ft = v();
                ft != b && (et = r + "/sa6.js?" + __said + "," + t + "," + b + "," + a,
                l(et))
            }
        }
    }
    function rt(t, i) {
        if (t) {
            if (g)
                return;
            if (location.search && /&(?:testmode|scid|noshrt)=/.test(location.search))
                return;
            i === undefined && (i = n("SPPC") || tt("SPPC") || "")
        } else
            return;
        if (i) {
            var r = "#~" + ut(parseInt(t));
            window.location.hash != r && (window.history && window.history.replaceState ? (window.location.search && window.location.search.indexOf("SPPC=") > 0 && (r = window.location.pathname + r),
            window.history.replaceState(undefined, undefined, r)) : window.location.replace && window.location.replace(r))
        }
    }
    function ut(n) {
        var t, u, i = !1, r = 1, e, o, s, f;
        if (typeof n == "number") {
            if (isNaN(n))
                return undefined;
            for (t = n,
            e = []; t > 0; )
                u = i ? r * 62 : r * 10,
                i = !i,
                o = t % u,
                s = ht(o / r),
                e.push(s),
                t -= o,
                r = u;
            return e.join("")
        }
        if (typeof n == "string") {
            if (!n)
                return 0;
            for (t = 0,
            f = 0; f < n.length; f++)
                u = ct(n, f),
                t += u * r,
                r *= i ? 62 : 10,
                i = !i;
            return t
        }
        return undefined
    }
    function ht(n) {
        return n < 10 ? String.fromCharCode(n + 48) : n < 36 ? String.fromCharCode(n + 55) : String.fromCharCode(n + 61)
    }
    function ct(n, t) {
        var i = n.charCodeAt(t);
        return i < 58 ? i - 48 : i < 91 ? i - 55 : i - 61
    }
    function b(n, t) {
        var i, r;
        if (n && n.closest)
            return n.closest(t);
        for (i = n; i && i.parentNode && i !== document.body && i !== document.documentElement; ) {
            if (r = i.nodeName,
            r && r.toLowerCase() === t)
                return i;
            i = i.parentNode
        }
        return null
    }
    function lt(n) {
        var t = n && (n.offsetWidth || n.offsetHeight || n.getClientRects().length);
        return !!t
    }
    function at(n) {
        var r, i, t;
        if (n && n.getElementsByTagName)
            for (r = n.getElementsByTagName("input"),
            i = 0; i < r.length; i++)
                if (t = r[i],
                t && t.getAttribute("type") === "text" && lt(t))
                    return t.value;
        return null
    }
    function vt(n) {
        var t = (n.getAttribute("class") || "").trim();
        return t ? t.replace(/(\s+)|([^\w\-])/g, function(n, t, i) {
            return t ? "." : i ? "\\" + i : ""
        }) : ""
    }
    function yt(n) {
        for (var i = [], t = n, r, u, f; t && t.parentNode && t !== document.body && t !== document.documentElement; )
            r = t.getAttribute("id"),
            r && i.push({
                id: r,
                el: t
            }),
            u = vt(t),
            f = (t.nodeName || "").toLowerCase(),
            (u || f === "li" || !i.length) && i.push({
                cls: u,
                node: f,
                el: t
            }),
            t = t.parentNode;
        return i
    }
    function pt(n) {
        for (var t, i, e, o, s = yt(n), r = [], u = document, f = 0; f < s.length; f++) {
            if (t = s[f],
            t.id) {
                r.unshift("#" + t.id);
                u = t.el;
                break
            } else
                i = t.cls ? t.node + "." + t.cls : t.node;
            e = u.querySelectorAll(i);
            e.length > 1 && (o = Array.prototype.indexOf.call(e, t.el),
            o > -1 && (i += ":nth-child(" + (o + 1) + ")"));
            r.unshift(i);
            u = t.el
        }
        return r
    }
    function wt(n) {
        var i = b(n.target, "a"), e = i && i.getAttribute("href"), u = b(n.target, "button"), t = b(u, "form"), o = t && t.getAttribute("action"), c = t && t.getAttribute("method") === "post", r, f, s;
        if (i)
            r = i;
        else if (u)
            r = u,
            e = o;
        else if (n.target)
            r = n.target;
        else
            return;
        if (h)
            try {
                f = h(n)
            } catch (l) {}
        else
            f = o && t.getAttribute("data-search") && at(t);
        return s = pt(r),
        {
            selector: s.join(" "),
            href: e || "",
            post: c ? "1" : "",
            search: f || ""
        }
    }
    function bt(n, t, i) {
        var f = window.jwplayer, u = n && document.getElementById(n), r;
        u && u.nodeName && /video/i.test(u.nodeName) ? r = u : f && (r = f(n));
        r && t && i && (r.sa || (r.sa = {}),
        r.sa.vvid = t,
        r.sa.vpid = i)
    }
    function kt() {
        var u = document.createElement("script")
          , f = window.innerWidth || document.documentElement.offsetWidth || document.body.offsetWidth || 0
          , e = window.innerHeight || document.documentElement.offsetHeight || document.body.offsetHeight || 0;
        u.type = "text/javascript";
        u.async = !0;
        u.src = r + "/sa.js?" + i + "," + ft + "," + (n("SPPC") || "") + "," + (n("SEOD") || "") + "," + t(n("SEOK") || "") + "," + f + "x" + e + "," + it() + "," + v() + "," + t(window.location.href) + "," + a() + "," + (n("PPCAD") || "") + "," + (n("PPCEX") || "") + "," + (n("PPCCMP") || "") + "," + (n("L") || "0") + "," + (w() || "0") + "," + (et() || "0");
        document.head.appendChild(u)
    }
    function dt(u) {
        var f = r + "/sa2.js?" + i + "," + u + "," + v() + "," + t(window.location.href) + "," + (n("L") || "0") + "," + (w() || "0");
        l(f)
    }
    function gt(u) {
        var o = e(), f, s;
        o && (f = wt(u),
        s = r + "/sa3.js?" + i + "," + o + "," + t(f.selector) + "," + (window.innerWidth || document.documentElement.offsetWidth || document.body.offsetWidth || 0) + "," + (window.innerHeight || document.documentElement.offsetHeight || document.body.offsetHeight || 0) + "," + Math.max(document.documentElement.scrollTop, document.body.scrollTop) + "," + (u.pageX || u.clientX || 0) + "," + (u.pageY || u.clientY || 0) + "," + t(f.href) + "," + t(f.post) + "," + t(f.search) + "," + (n("L") || "0"),
        l(s))
    }
    function ni(u, f, o, s, h, c) {
        var a = e(), l;
        a && (l = document.createElement("script"),
        l.type = "text/javascript",
        l.async = !0,
        l.src = r + "/va.js?" + i + "," + a + "," + u + "," + t(o || "") + "," + s + "," + h + "," + f + "," + c + "," + (n("L") || "0"),
        document.head.appendChild(l))
    }
    function ti(t, u, f, e) {
        var o = r + "/va2.js?" + i + "," + t + "," + u + "," + f + "," + e + "," + (n("L") || "0");
        l(o)
    }
    var i, g, r, nt, h, p, o, y, k, d;
    if (!(document.cookie.indexOf("COOK=NO!") > -1) && (i = document.documentElement.getAttribute("data-sa"),
    g = !!document.documentElement.getAttribute("data-sd"),
    i && !/google|bing|yahoo|spider|crawl|monitor|site24|bots\b|bot\b/i.test(window.navigator.userAgent || ""))) {
        var u = null
          , s = null
          , ft = "https:" === window.location.protocol ? "1" : ""
          , f = document.body.getAttribute("data-api") || "api";
        switch (f) {
        case "dev-csx":
            f = "dev";
            break;
        case "staging-csx":
            f = "staging"
        }
        r = f === "api" ? "https://sa.scorpion.co" : "https://" + f + ".scorpion.co/platform/analytics";
        nt = Array.isArray || function(n) {
            return n && n.constructor === Array
        }
        ;
        h = null;
        window.location.host && window.location.host.indexOf("www.") === 0 && (p = window.location.host.substr(3));
        window.SA = {
            Cookie: n,
            Query: tt
        };
        window._said_ = e;
        window._vaid_ = a;
        window._raid_ = st;
        window._vvid_ = bt;
        window._sa_videoStart = ni;
        window._sa_videoPlay = ti;
        window._sa_overrideSearch = function(n) {
            h = n
        }
        ;
        o = e();
        y = n("SPPC");
        !y && window.location.hash && (d = window.location.hash,
        d[1] === "~" && (k = ut(d.substr(2))));
        k ? (n("SPPC", "true"),
        ot(o, k)) : o ? (dt(o),
        y && rt(o, y),
        window.Process && window.Process.Delayed()) : (kt(),
        window.Process && window.Process.Delayed());
        window.navigator.sendBeacon && document.addEventListener && document.addEventListener("click", gt, !0)
    }
}
)();
rrequire(["jquery", "j/jquery.cookie"], function() {
    var n = $("#IEPopup");
    $(window).load(function() {
        var t = Math.round(window.devicePixelRatio * 100);
        if ($("html").hasClass("no-csstransforms3d") && window.self == window.top && $(window).width() > 600 && t == 100) {
            n.addClass("show");
            $(".modal-btn").on("click", function() {
                n.remove()
            })
        } else
            n.remove()
    })
});
rrequire(["CSCI3150_FinalProject/includes/js/simple-show-hide-script2.js", "cookie"], function() {
    function h() {
        n = JSON.parse($.cookie("AO"));
        n.content === !0 && (contentOnly(),
        f(i.filter("[href=\"javascript:void('contentOnly')\"]")));
        n.contrast === !0 && (t.toggleClass("high-contrast-mode"),
        f(i.filter("[href=\"javascript:void('highContrast')\"]")));
        n.mask === !0 && (screenMask(),
        f(i.filter("[href=\"javascript:void('screenMask')\"]")));
        n.text !== !1 && (n.text == 1 ? t.addClass("large-text") : n.text == 2 && t.addClass("larger-text"))
    }
    function s(t) {
        $.cookie("AO") && (n = JSON.parse($.cookie("AO")));
        t != "text" ? n[t] = n[t] === !1 ? !0 : !1 : n.text = n.text === !1 ? 1 : n.text === 1 ? 2 : !1;
        $.cookie("AO", JSON.stringify(n), {
            expires: 30,
            path: "/"
        })
    }
    function c() {
        t.is(".larger-text") ? t.removeClass("larger-text") : t.is(".large-text") ? (t.removeClass("large-text"),
        t.addClass("larger-text")) : t.addClass("large-text");
        $(window).trigger("resize")
    }
    function f(n) {
        n.is(".active") ? n.removeClass("active").attr("aria-pressed", !1) : n.addClass("active").attr("aria-pressed", !0)
    }
    var t = $("html"), r = $(".access-menu"), e = r.find("ul").attr({
        id: "AccessOptionsMenu",
        "aria-hidden": !0
    }), i = e.find("li button"), u = r.find(".access-btn").attr({
        tabindex: 0,
        role: "button",
        "aria-pressed": !1,
        "aria-expanded": !1,
        "aria-controls": "AccessOptionsMenu"
    }), n = {
        content: !1,
        contrast: !1,
        mask: !1,
        text: !1
    }, o;
    for (let n = 0; n < i.length; n++)
        i.eq(n).attr("aria-label", i.eq(n).text());
    u.on("click keydown", function(n) {
        if (n.type === "keydown")
            if (n.keyCode === 9) {
                if ($(this).is(".open-btn")) {
                    if (!n.shiftKey || !r.is(".access-open"))
                        return
                } else if (n.shiftKey)
                    return
            } else if (n.keyCode != 13)
                return;
        r.is(".access-open") ? (u.attr({
            "aria-pressed": !1,
            "aria-expanded": !1
        }),
        e.attr({
            "aria-hidden": !0
        })) : (u.attr({
            "aria-pressed": !0,
            "aria-expanded": !0
        }),
        e.attr({
            "aria-hidden": !1
        }));
        simpleShowHide2($(this), "access-open", r)
    });
    o = $('[data-content="true"]').attr("tabindex", 0);
    o || i.filter('[data-action="contentOnly"], [data-action="content"]').hide();
    i.on("click keydown", function(r) {
        if (r.type !== "keydown" || r.keyCode == 13) {
            r.preventDefault();
            switch ($(this).data("action")) {
            case "content":
                u.eq(0).click();
                o.eq(0).focus();
                break;
            case "menu":
                $(window).scrollTop(0);
                u.eq(0).click();
                $(".top-nav > ul > li > a").eq(0).focus();
                break;
            case "highContrast":
                t.toggleClass("high-contrast-mode");
                f($(this));
                s("contrast");
                break;
            case "largeText":
                c();
                s("text");
                break;
            case "clear":
                for (let n = 0; n < i.length; n++)
                    i.eq(n).is(".active") && i.eq(n).click();
                t.removeClass("large-text larger-text");
                $.cookie("AO", JSON.stringify(n), {
                    expires: -1,
                    path: "/"
                });
                $(window).trigger("resize")
            }
        }
    });
    $.cookie("AO") && h()
});
window.registerLoading && registerLoading("uri"),
function(n) {
    function s(n, r) {
        var e, o = t.count(n);
        for (var u in r)
            i.call(r, u) && (e = ("" + u).toLowerCase(),
            f(n, e, u, r[u], o++))
    }
    function f(n, i, r, u, f) {
        f === undefined && (f = t.count(n));
        n[i] = {
            name: r,
            value: u,
            index: f
        }
    }
    var i = Object.prototype.hasOwnProperty
      , r = function(n, t, i) {
        return n && n[0] === t ? i ? n.substring(1) : n : !i && n ? t + n : n || ""
    }
      , u = function(n, t, i) {
        return n && n[n.length - 1] === t ? i ? n.substring(0, n.length - 1) : n : !i && n ? n + t : n || ""
    }
      , e = function(n) {
        return n ? encodeURIComponent("" + n).replace(/['"\(\)]/g, function(n) {
            switch (n) {
            case "'":
                return "%27";
            case '"':
                return "%22";
            case "(":
                return "%28";
            case ")":
                return "%29";
            default:
                return n
            }
        }) : ""
    }
      , o = function(n) {
        return jQuery.type(n) !== "object" || n.nodeType || jQuery.isWindow(n) ? !1 : n.constructor && !i.call(n.constructor.prototype, "isPrototypeOf") ? !1 : !0
    }
      , t = function(n, i) {
        if (Object.defineProperty) {
            var f = undefined
              , e = undefined
              , h = undefined
              , o = undefined
              , s = undefined;
            Object.defineProperty(this, "Scheme", {
                get: function() {
                    return u(f, ":", !0)
                },
                set: function(n) {
                    f = u(n, ":", !1)
                }
            });
            Object.defineProperty(this, "UserInfo", {
                get: function() {
                    return u(e, "@", !0)
                },
                set: function(n) {
                    e = u(n, "@", !1)
                }
            });
            Object.defineProperty(this, "Port", {
                get: function() {
                    return r(h, ":", !0)
                },
                set: function(n) {
                    h = r(n, ":", !1)
                }
            });
            Object.defineProperty(this, "Query", {
                get: function() {
                    return r(o, "?", !0)
                },
                set: function(n) {
                    o = r(n, "?", !1)
                }
            });
            Object.defineProperty(this, "Hash", {
                get: function() {
                    return r(s, "#", !0)
                },
                set: function(n) {
                    s = r(n, "#", !1)
                }
            });
            this.get = function(n) {
                return !n || e || f && f != "http:" && f != "https:" ? (f || "") + (this.Whack || "") + (e || "") + (this.Host || "") + (h || "") + (this.Path || "") + (o || "") + (s || "") : (this.Path || "") + (o || "") + (s || "")
            }
        } else
            this.get = function(n) {
                return !n || this.UserInfo || this.Scheme && this.Scheme != "http:" && this.Scheme != "https:" ? (this.Scheme || "") + (this.Whack || "") + (this.UserInfo || "") + (this.Host || "") + (this.Port || "") + (this.Path || "") + (this.Query || "") + (this.Hash || "") : (this.Path || "") + (this.Query || "") + (this.Hash || "")
            }
            ;
        this.toString = this.get;
        n && typeof n == "string" ? this.parse(n) : n && n.constructor === t && (this.Scheme = n.Scheme,
        this.Whack = n.Whack,
        this.UserInfo = n.UserInfo,
        this.Host = n.Host,
        this.Port = n.Port,
        this.Path = n.Path,
        this.Query = n.Query,
        this.Hash = n.Hash);
        i && this.extend(i)
    };
    t.prototype.QueryString = function(n, i) {
        var e, r, u = t.parseQuery(this.Query) || {};
        if (n)
            if (n && o(n))
                s(u, n);
            else {
                if (e = ("" + n).toLowerCase(),
                r = u[e],
                i === undefined)
                    return r ? r.value : undefined;
                r ? r.value = i : f(u, e, n, i)
            }
        else
            return;
        return this.Query = t.serialize(u),
        this
    }
    ;
    t.prototype.RemoveQuery = function() {
        var n, i = Array.prototype.slice.call(arguments), r = i.length, u = 0;
        if (r) {
            if (n = t.parseQuery(this.Query),
            !n)
                return
        } else
            return;
        while (u < r)
            delete n[i[u++]];
        return this.Query = t.serialize(n),
        this
    }
    ;
    t.prototype.parse = function(n) {
        var t = /^(?:(\w{3,8}:)?(\/\/)?([\w\-\.:]+@)?([\w\-\.]+)(:\d+)?)?(\/?[^\?#]+)?(\?[^#]*)?(#.*)?$/.exec(n);
        return t && (this.Scheme = t[1],
        this.Whack = t[2],
        this.UserInfo = t[3],
        this.Host = t[4],
        this.Port = t[5],
        this.Path = t[6],
        this.Query = t[7],
        this.Hash = t[8],
        this.Path || this.Scheme || !this.Host || (this.Path = this.Host,
        this.Host = undefined)),
        this
    }
    ;
    t.prototype.extend = function(n) {
        var r, u, s, f, c, e, o, h;
        if (n)
            if (n.constructor === t)
                r = n;
            else if (typeof n == "string")
                r = new t(n);
            else if (n.constructor === Object)
                u = t.parseQuery(n);
            else
                return this;
        else
            return this;
        if (r && r.Path)
            this.Scheme = r.Scheme || this.Scheme,
            this.Host = r.Host || this.Host,
            r.Path[0] === "/" ? this.Path = r.Path : (s = this.Path.split("/"),
            s.pop(),
            this.Path = s.concat(r.Path.split("/")).join("/")),
            this.Query = r.Query,
            this.Hash = r.Hash;
        else {
            if (r && r.Query && (u = t.parseQuery(r.Query)),
            u) {
                f = t.parseQuery(this.Query) || {};
                c = t.count(f);
                for (e in u)
                    i.call(u, e) && (o = u[e],
                    h = f && f[e],
                    h ? h.value = o.value : (o.index = c++,
                    f[e] = o));
                this.Query = t.serialize(f)
            }
            r && r.Hash && (this.Hash = r.Hash)
        }
        return this
    }
    ;
    t.prototype.addChild = function(n) {
        var t, i;
        if (n)
            n[0] === "/" ? this.extend(n) : (t = this.Path ? this.Path.split("/") : ["", ""],
            i = t[t.length - 1],
            i ? (i = i.replace(/\.\w+$/, ""),
            t[t.length - 1] = i,
            t.push(n)) : t[t.length - 1] = n,
            this.Path = t.join("/"));
        else
            return this;
        return this
    }
    ;
    t.parseQuery = function(n) {
        var r, u, e, f, o, t, h;
        if (n) {
            if (n.constructor === Object) {
                t = 0;
                f = {};
                for (r in n)
                    i.call(n, r) && (u = n[r],
                    e = r.toLowerCase(),
                    f[e] = u && u.name ? u : {
                        name: r,
                        value: u,
                        index: t++
                    });
                return f
            }
            if (typeof n == "string") {
                for (n[0] === "?" && (n = n.substring(1)),
                f = {},
                o = n.split("&"),
                t = 0,
                h = o.length; t < h; t++) {
                    var u, s = o[t].split("="), r = s[0], e = r.toLowerCase();
                    u = s[1] === undefined ? null : decodeURIComponent(("" + s[1]).replace(/\+/g, "%20"));
                    f[e] = {
                        name: r,
                        value: u,
                        index: t
                    }
                }
                return f
            }
        } else
            return undefined
    }
    ;
    t.serialize = function(n) {
        var t, o, u, r, h, s, f;
        if (n && typeof n != "string") {
            if (n.constructor === Object) {
                t = [];
                for (o in n)
                    i.call(n, o) && t.push(n[o]);
                for (t.sort(function(n, t) {
                    var i = typeof n.index == "number" ? n.index : 9999
                      , r = typeof t.index == "number" ? t.index : 9999;
                    return i - r
                }),
                u = [],
                r = 0,
                h = t.length; r < h; r++)
                    if (s = t[r].name,
                    f = t[r].value,
                    f === undefined)
                        continue;
                    else
                        f === null ? u.push(s) : u.push(s + "=" + e(f || ""));
                return u.join("&")
            }
            return null
        }
        return n
    }
    ;
    t.count = function(n) {
        var t = 0, r;
        if (n)
            for (r in n)
                i.call(r, n) && t++;
        return t
    }
    ;
    n.URI = t;
    window.register && window.register("uri")
}(this);
$.widget("cms.masthead", {
    options: {
        overlap: !1,
        speed: 200,
        scrollCount: 1
    },
    _create: function() {
        var n = new URI(window.location.href)
          , i = n.Hash && n.Hash.split("#").pop()
          , t = $('a[name="' + i + '"]')
          , r = this
          , u = document.documentElement.clientWidth;
        this.transitionEvent = this._whichTransitionEvent();
        this.scrollCount = this.element.innerHeight() - 1;
        this.lastScroll = 0;
        this.nav = this.element.find("nav > ul").attr("role", "menubar");
        this.items = this.nav.find("li a").attr("role", "menuitem");
        this.flyNavs = this.nav.find('[data-role="fly-nav"]').attr("role", "menu");
        this.element.on("mouseenter mouseleave", $.proxy(this._trackFocus, this));
        if (!this.options.overlap) {
            window.buffer = this.element.innerHeight();
            setTimeout($.proxy(function() {
                window.buffer = this.element.innerHeight();
                i && t && t.length && setTimeout(this._checkAnchor.apply(this, [t]), 100)
            }, this), 500);
            $(window).onidle("resize", $.proxy(function() {
                document.documentElement.clientWidth !== u && (u = document.documentElement.clientWidth,
                window.buffer = this.element.innerHeight())
            }, this), 250)
        }
        $(window).onidle("scroll", $.proxy(this._checkScroll, this), 100);
        $('a[href*="#"]').on("click", function(t) {
            var i = $(t.target).is("a") ? t.target : t.currentTarget
              , u = new URI(i.href)
              , e = u.Hash
              , f = $('a[name="' + e + '"]');
            t.preventDefault();
            n.Path == u.Path && f.length ? r._checkAnchor.apply(r, [f]) : window.location = i.href
        });
        this.flyNavs.length != 0 && document.documentElement.clientWidth > 985 && this._flyManagement()
    },
    _flyManagement: function() {
        var t = this.flyNavs.closest("li")
          , i = t.children("a").attr({
            "aria-haspopup": !0,
            "aria-expanded": !1
        })
          , n = this.element.find(".desktop-nav > li")
          , r = n.children("a");
        i.on("focus", function() {
            t.removeClass("open").children("a").attr({
                "aria-expanded": !1
            });
            $(this).closest("li").addClass("open").children("a").attr({
                "aria-expanded": !0
            })
        });
        r.on("keydown", function(t) {
            if (t.keyCode == 9 && t.shiftKey) {
                $(this).closest("li").removeClass("open").children("a").attr({
                    "aria-expanded": !1
                });
                var i = n.eq($(this).closest("li").index() - 1).children("a");
                i.is('[aria-haspopup="true"]') && (t.preventDefault(),
                n.eq($(this).closest("li").index() - 1).children("a").focus())
            }
        });
        this.flyNavs.find("li a").last().on("keydown", function(n) {
            n.keyCode == 9 && (n.shiftKey || $(this).closest("li.open").removeClass("open").children("a").attr({
                "aria-expanded": !1
            }))
        })
    },
    _trackFocus: function(n) {
        window.focused = n.type === "mouseenter" ? !0 : !1
    },
    _checkFocus: function() {
        function i() {
            window.focused === !0 && $("html").is(".up-scroll") && $("body").is(".fixed") ? (clearTimeout(n),
            t()) : $("html").addClass("down-scroll").removeClass("up-scroll")
        }
        function t() {
            n = setTimeout(function() {
                i()
            }, 4e3)
        }
        var n;
        t()
    },
    _checkScroll: function() {
        var n = $(window).scrollTop();
        $("html").hasClass("anchors") || (n > this.scrollCount ? $("body").addClass("fixed") : $("body").removeClass("fixed"));
        this.lastScroll < n - 99 ? $("html").addClass("down-scroll").removeClass("up-scroll") : this.lastScroll > n + window.innerHeight / 3 && ($("html").removeClass("down-scroll").addClass("up-scroll"),
        document.documentElement.clientWidth > 985 && this._checkFocus());
        this.lastScroll = n
    },
    _checkAnchor: function(n) {
        var t = n.offset().top;
        t -= this.options.overlap ? this.element.innerHeight() - window.buffer : this.element.innerHeight();
        this._runScroll.apply(this, [document.querySelector("html").scrollTop + t])
    },
    _runScroll: function(n) {
        n < 500 && (this.options.speed = 100);
        $("html, body").animate({
            scrollTop: n
        }, this.options.speed, function() {
            $("html").removeClass("anchors")
        })
    },
    _whichTransitionEvent: function() {
        var n, i = document.createElement("fakeelement"), t = {
            transition: "transitionend",
            OTransition: "oTransitionEnd",
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd"
        };
        for (n in t)
            if (i.style[n] !== undefined)
                return t[n]
    }
});
window.register && window.register("/includes/js/header-script.js");
$.widget("cms.simpleShowHide", {
    options: {
        className: "show",
        slider: !1,
        fader: !1,
        speed: 500,
        htmlClass: !1
    },
    _create: function() {
        var t, n;
        this.element.attr({
            role: "dialog"
        });
        this.btn = this.element.find('[data-role="btn"]').attr({
            role: "button",
            tabindex: 0,
            "aria-pressed": !1,
            "aria-haspopup": !1
        });
        this.panel = this.element.find('[data-role="panel"]').attr({
            "aria-hidden": !0
        });
        t = this._handleEvents.bind(this);
        this.btn.on("click keydown", t);
        n = this;
        $(document).on("keydown", function(t) {
            t.keyCode === 27 && n.element.is("." + n.options.className) && n.hidePanel()
        })
    },
    _handleEvents: function(n) {
        (n.type !== "keydown" || n.keyCode === 13) && (this.element.is("." + this.options.className) ? this.hidePanel() : this.showPanel())
    },
    hidePanel: function() {
        this.element.removeClass(this.options.className).trigger("hidepanel");
        this.options.htmlClass === !0 && $("html").removeClass(this.options.className);
        this.panel.attr({
            "aria-hidden": !0
        });
        this.btn.attr({
            "aria-pressed": !1
        });
        this.options.slider === !0 ? this.panel.slideUp(this.options.speed) : this.options.fader === !0 && this.panel.fadeOut(this.options.speed);
        this.btn.length === 1 ? this.btn.focus() : this.btn.filter('[ data-type="open" ]').focus()
    },
    showPanel: function() {
        this.element.addClass(this.options.className).trigger("showpanel");
        this.options.htmlClass === !0 && $("html").addClass(this.options.className);
        this.panel.attr({
            "aria-hidden": !1
        });
        this.btn.attr({
            "aria-pressed": !0
        });
        this.options.slider === !0 ? this.panel.slideDown(this.options.speed) : this.options.fader === !0 && this.panel.fadeIn(this.options.speed);
        this.panel.focus()
    }
});
window.register && window.register("/includes/js/simple-show-hide-script.js");
rrequire("jquery", function() {
    $.widget("cms.tabs", {
        options: {
            slider: !1,
            speed: 500,
            siblings: !0,
            closing: !1,
            hovers: !1,
            hoverStay: !0,
            nav: !1
        },
        _create: function() {
            this.tabs = this.element.find(".el-tab");
            this.panels = this.element.find(".el-tab-panel");
            var n = this._togglePanel.bind(this);
            this.options.slider && this.panels.filter(":not(.active)").hide();
            this._addAria();
            this.tabs.on("click keydown mouseenter mouseleave outsideclick", n);
            if (this.options.siblings === !1)
                this.panels.on("keydown", $.proxy(this._panelTabbing, this))
        },
        _addAria: function() {
            this.tabs.attr({
                role: "tab",
                tabindex: 0,
                "aria-selected": !1
            });
            this.panels.attr({
                "aria-label": "submenu",
                "aria-hidden": !0,
                role: "tabpanel"
            });
            this.options.siblings === !0 ? this.options.nav === !0 ? (this.element.attr("role", "menu"),
            this.tabs.attr({
                "aria-haspopup": !0
            }),
            this.panels.attr({
                "aria-label": "submenu",
                "aria-hidden": !0
            })) : this.tabs.attr({
                "aria-expanded": !1
            }) : (this.tabs.attr({
                "aria-expanded": !1
            }).closest("li").attr("role", "presentation").parent("ul").attr("role", "tablist"),
            this.panels.attr("tabindex", 0));
            for (var n = 0; n < this.tabs.length; n++)
                this.tabs.eq(n).attr("aria-controls", "TabPanel-" + n),
                this.panels.eq(n).attr("id", "TabPanel-" + n),
                this.tabs.eq(n).is(".active") && (this.tabs.eq(n).attr("aria-selected", !0),
                this.panels.eq(n).attr("aria-hidden", !1))
        },
        _panelTabbing: function(n) {
            if (n.keyCode === 9) {
                var t = $(n.target)
                  , r = t.closest(".el-tab-panel")
                  , i = r.find("a");
                if (t.is(".el-tab-panel"))
                    if (n.shiftKey)
                        n.preventDefault(),
                        this.tabs.filter('[aria-controls="' + t.attr("id") + '"]').focus();
                    else {
                        if (i.length)
                            return;
                        n.preventDefault();
                        this.tabs.filter('[aria-controls="' + t.attr("id") + '"]').next().focus()
                    }
                else
                    t.is("a") && i.index(t) == i.length - 1 && (n.preventDefault(),
                    this.tabs.filter('[aria-controls="' + r.attr("id") + '"]').next().focus())
            }
        },
        _togglePanel: function(n) {
            var t = $(n.target).closest(".el-tab");
            if ((n.type !== "mouseenter" || this.options.hovers !== !1) && (n.type !== "mouseleave" || this.options.hovers !== !1) && (n.type !== "mouseleave" || this.options.hoverStay !== !1)) {
                if (n.type === "keydown") {
                    if (n.keyCode == 9 && this.options.siblings === !1) {
                        n.shiftKey ? t.prev().is(".active") && (n.preventDefault(),
                        this.panels.filter('[id="' + t.prev().attr("aria-controls") + '"]').focus()) : t.is(".active") && (n.preventDefault(),
                        this.panels.filter('[id="' + t.attr("aria-controls") + '"]').focus());
                        return
                    }
                    if (n.keyCode != "13")
                        return
                }
                t.is(".active") ? (this.options.closing === !0 || this.options.hovers === !0 && this.options.hoverStay === !1) && (t.removeClass("active").attr({
                    "aria-selected": !1
                }),
                this.panels.filter('[id="' + t.attr("aria-controls") + '"]').removeClass("active").attr({
                    "aria-hidden": !0
                }),
                this.options.slider === !0 && this.panels.filter('[id="' + t.attr("aria-controls") + '"]').slideUp(this.options.speed)) : (this.options.slider === !0 && this.panels.filter(".active").slideUp(this.options.speed),
                this.tabs.filter(".active").removeClass("active").attr({
                    "aria-selected": !1
                }),
                this.panels.filter(".active").removeClass("active").attr({
                    "aria-hidden": !0
                }),
                t.addClass("active").attr({
                    "aria-selected": !0
                }),
                this.panels.filter('[id="' + t.attr("aria-controls") + '"]').addClass("active").attr({
                    "aria-hidden": !1
                }),
                this.options.slider === !0 && this.panels.filter('[id="' + t.attr("aria-controls") + '"]').slideDown(this.options.speed))
            }
        }
    });
    window.register && window.register("/includes/js/tabs-script.js")
});
rrequire(["jquery", "uri", "/includes/js/header-script.js", "/includes/js/tabs-script.js", "/includes/js/simple-show-hide-script.js"], function() {
    var t = $("#HeaderAreaV1"), n, i;
    t.masthead();
    $("html").addClass("header-v1");
    $("body").addClass("visible");
    n = window.innerWidth - 1025;
    n !== Math.abs(n) && ($(".header-area.v1 .menu-btn").click(function() {
        $("html").toggleClass("mm-open")
    }),
    $(".header-area.v1 .el-tab-box").tabs({
        siblings: !0,
        slider: !0,
        closing: !0
    }),
    $("html").addClass("mobile-ready"),
    setTimeout(function() {}, 500));
    $(window).onidle("resize", function() {
        n = window.innerWidth - 1025;
        n !== Math.abs(n) ? $("html").is(".mobile-ready") || ($(".header-area.v1 .menu-btn").click(function() {
            $("html").toggleClass("mm-open")
        }),
        $("html").addClass("mobile-ready")) : $(".header-area .header-box").css("padding-top", "0")
    }, 500);
    $(".header-area .alert-bar .close").click(function() {
        $(this).parent().slideUp();
        $(this).parent().hasClass("green") ? $.cookie("_alert_hide_green", 1) : $.cookie("_alert_hide_red", 1)
    });
    $.cookie("_alert_hide_green") || $(".header-area .alert-bar.green").show();
    $.cookie("_alert_hide_red") || $(".header-area .alert-bar.red").show();
    i = $(".alert-bars").height()
});
(function(n, t, i, r, u, f) {
    n.hj = n.hj || function() {
        (n.hj.q = n.hj.q || []).push(arguments)
    }
    ;
    n._hjSettings = {
        hjid: 762676,
        hjsv: 6
    };
    u = t.getElementsByTagName("head")[0];
    f = t.createElement("script");
    f.async = 1;
    f.src = i + n._hjSettings.hjid + r + n._hjSettings.hjsv;
    u.appendChild(f)
}
)(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
