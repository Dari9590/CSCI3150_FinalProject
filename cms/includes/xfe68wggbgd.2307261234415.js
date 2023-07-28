(function() {
    function t() {
        var n = this.$loading;
        n && (this.$self ? this.classList.remove(n) : this.parentNode.classList.remove(n));
        delete this.$loading;
        delete this.$self;
        this.removeEventListener("load", t, !1)
    }
    var i;
    if (typeof window.CustomEvent != "function") {
        function r(n, t) {
            t = t || {};
            var i = document.createEvent("CustomEvent");
            return i.initCustomEvent(n, t.bubbles || !1, t.cancelable || !1, t.detail || undefined),
            i
        }
        r.prototype = window.Event.prototype;
        window.CustomEvent = r
    }
    if (Function.isFunction || (Function.isFunction = function(n) {
        return Object.prototype.toString.call(n) === "[object Function]"
    }
    ),
    Object.isPlainObject || function() {
        var r = Object.getPrototypeOf
          , n = {}
          , u = n.toString
          , t = n.hasOwnProperty
          , i = t.toString
          , f = i.call(Object);
        Object.isPlainObject = function(n) {
            var e, o;
            return !n || u.call(n) !== "[object Object]" ? !1 : (e = r(n),
            !e) ? !0 : (o = t.call(e, "constructor") && e.constructor,
            typeof o == "function" && i.call(o) === f)
        }
    }(),
    Object.isEmptyObject || (Object.isEmptyObject = function(n) {
        if (!Object.isPlainObject(n))
            return !1;
        for (var t in n) {
            if (n.hasOwnProperty(t))
                return !1;
            continue
        }
        return !0
    }
    ),
    !Object.extend) {
        function n(t) {
            var r, i;
            if (t === undefined || t === null)
                return t;
            switch (typeof t) {
            case "boolean":
            case "number":
            case "string":
                return t
            }
            if (t.constructor === Date)
                return new Date(t.getTime());
            if (Array.isArray(t)) {
                for (r = new Array(t.length),
                i = 0; i < t.length; i++)
                    r[i] = n(t[i], !0);
                return r
            }
            return Object.isPlainObject(t) ? Object.extend({}, t) : t
        }
        Object.extend = function() {
            var u, t, f, e = Array.from(arguments), o, i, r;
            for (u = e.shift() || {},
            o = e.length,
            i = 0; i < o; i++)
                if (t = e[i],
                Object.isPlainObject(t))
                    for (r in t)
                        t.hasOwnProperty(r) && (f = n(t[r]),
                        f !== undefined && (u[r] = f));
            return u
        }
        ;
        Object.merge = function() {
            var r, t, f, e = Array.from(arguments), o, u, i;
            for (r = e.shift() || {},
            o = e.length,
            u = 0; u < o; u++)
                if (t = e[u],
                Object.isPlainObject(t))
                    for (i in t)
                        t.hasOwnProperty(i) && (f = Object.isPlainObject(t[i]) ? Object.merge({}, r[i], t[i]) : n(t[i]),
                        f !== undefined && (r[i] = f));
            return r
        }
        ;
        Object.clone = function(t) {
            return n(t)
        }
    }
    if (Array.isArray || (Array.isArray = function(n) {
        return Object.prototype.toString.call(n) === "[object Array]"
    }
    ),
    Array.from || (Array.from = function() {
        var t = Object.prototype.toString
          , n = function(n) {
            return typeof n == "function" || t.call(n) === "[object Function]"
        }
          , i = function(n) {
            var t = Number(n);
            return isNaN(t) ? 0 : t === 0 || !isFinite(t) ? t : (t > 0 ? 1 : -1) * Math.floor(Math.abs(t))
        }
          , r = Math.pow(2, 53) - 1
          , u = function(n) {
            var t = i(n);
            return Math.min(Math.max(t, 0), r)
        };
        return function(t) {
            var h = this, c = Object(t), i, o;
            if (t == null)
                throw new TypeError("Array.from requires an array-like object - not null or undefined");
            if (i = arguments.length > 1 ? arguments[1] : void undefined,
            typeof i != "undefined") {
                if (!n(i))
                    throw new TypeError("Array.from: when provided, the second argument must be a function");
                arguments.length > 2 && (o = arguments[2])
            }
            for (var f = u(c.length), s = n(h) ? Object(new h(f)) : new Array(f), r = 0, e; r < f; )
                e = c[r],
                s[r] = i ? typeof o == "undefined" ? i(e, r) : i.call(o, e, r) : e,
                r += 1;
            return s.length = f,
            s
        }
    }()),
    Array.quickSort || function() {
        var n = {
            swap: function(n, t, i) {
                var r = n[t];
                n[t] = n[i];
                n[i] = r
            },
            partition: function(t, i, r, u, f) {
                var s = t[u], o, e;
                for (n.swap(t, u, r - 1),
                o = i,
                e = i; e < r - 1; ++e)
                    (f ? f(t[e], s) <= 0 : t[e] <= s) && (n.swap(t, o, e),
                    ++o);
                return n.swap(t, r - 1, o),
                o
            },
            quick: function(t, i, r, u) {
                if (r - 1 > i) {
                    var f = i + Math.floor(Math.random() * (r - i));
                    f = n.partition(t, i, r, f, u);
                    n.quick(t, i, f, u);
                    n.quick(t, f + 1, r, u)
                }
            }
        };
        Array.quickSort = function(t, i) {
            n.quick(t, 0, t.length, i)
        }
    }(),
    Array.bindex || (Array.bindex = function(n, t, i, r) {
        var u, o, h, f, e, s;
        if (!n || !n.length)
            return -1;
        for (u = 0,
        o = n.length - 1,
        h = null,
        r === undefined && i === !0 && (r = i,
        i === undefined); u < o; )
            f = u + o >> 1,
            e = n[f],
            s = i ? e[i] : e,
            s < t ? u = f + 1 : s > t ? o = f - 1 : (h = f,
            r ? u = f + 1 : o = f - 1);
        return h !== null ? h : u === 0 ? u : (e = n[u],
        s = i ? e[i] : e,
        s > t && u--,
        u)
    }
    ),
    Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
        value: function(n) {
            var i, u, f, t, r;
            if (this == null)
                throw TypeError('"this" is null or not defined');
            if (i = Object(this),
            u = i.length >>> 0,
            typeof n != "function")
                throw TypeError("predicate must be a function");
            for (f = arguments[1],
            t = 0; t < u; ) {
                if (r = i[t],
                n.call(f, r, t, i))
                    return r;
                t++
            }
            return undefined
        },
        configurable: !0,
        writable: !0
    }),
    window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = function(n, t) {
        t = t || window;
        for (var i = 0; i < this.length; i++)
            n.call(t, this[i], i, this)
    }
    ),
    window.HTMLCollection && !HTMLCollection.prototype.forEach && (HTMLCollection.prototype.forEach = function(n, t) {
        t = t || window;
        for (var i = 0; i < this.length; i++)
            n.call(t, this[i], i, this)
    }
    ),
    window.NodeList && !NodeList.prototype.contains && (NodeList.prototype.contains = function(n) {
        return Array.prototype.indexOf.call(this, n) >= 0
    }
    ),
    window.HTMLCollection && !HTMLCollection.prototype.contains && (HTMLCollection.prototype.contains = function(n) {
        return Array.prototype.indexOf.call(this, n) >= 0
    }
    ),
    function(n) {
        n.forEach(function(n) {
            n.hasOwnProperty("remove") || Object.defineProperty(n, "remove", {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                value: function() {
                    this.parentNode !== null && this.parentNode.removeChild(this)
                }
            })
        })
    }([Element.prototype, CharacterData.prototype, DocumentType.prototype]),
    Element.prototype.trigger || (Element.prototype.trigger = function(n, t) {
        var i = {
            bubbles: !0,
            cancelable: !0
        };
        return t && (i.detail = t),
        this.dispatchEvent(new window.CustomEvent(n,i))
    }
    ),
    Window.prototype.trigger || (Window.prototype.trigger = function(n, t) {
        var i = {};
        return t && (i.detail = t),
        this.dispatchEvent(new window.CustomEvent(n,i))
    }
    ),
    Element.prototype.linkData || (Element.prototype.linkData = function() {
        var n = this.closest("a,button")
          , t = n && n.getAttribute("href")
          , i = t && /^javascript:(\w+)(?:\('([^']+)')?/i.exec(t)
          , r = i && i[1]
          , u = r === "void" ? i[2] : undefined;
        return {
            link: n,
            href: t,
            fn: r,
            action: u || n && n.getAttribute("data-action")
        }
    }
    ),
    Element.prototype.focusAfter || (Element.prototype.focusAfter = function(n, t) {
        (clearTimeout(this.$focus || 0),
        this.focus) && (this.$focus = setTimeout(function() {
            try {
                this.focus()
            } catch (n) {}
            if (delete this.$focus,
            t === !0 && this.setSelectionRange)
                this.setSelectionRange(0, this.value.length);
            else if (t && t.call)
                try {
                    t.call(this)
                } catch (n) {}
        }
        .bind(this), +n || 0))
    }
    ),
    Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(n) {
        return window.jQuery ? $(this).is(n) : !1
    }
    ),
    Element.prototype.closest || (Element.prototype.closest = Element.prototype.matches ? function(n) {
        var t = this
          , i = t.ownerDocument || document;
        if (!i.documentElement.contains(t))
            return null;
        do {
            if (t.matches) {
                if (t.matches(n))
                    return t
            } else
                return null;
            t = t.parentElement || t.parentNode
        } while (t);
        return null
    }
    : function(n) {
        var t, r = (this.ownerDocument || this.document).querySelectorAll(n), i = this;
        do
            for (t = r.length; --t >= 0 && r.item(t) !== i; )
                ;
        while (t < 0 && (i = i.parentElement));
        return i
    }
    ),
    HTMLImageElement.prototype.ifloading || (HTMLImageElement.prototype.ifloading = function(n, i) {
        this.complete || (this.$loading || (this.addEventListener("load", t, !1),
        this.addEventListener("error", t, !1)),
        this.$loading = n || "loading",
        this.$self = !!i,
        i ? this.classList.add(this.$loading) : this.parentNode.classList.add(this.$loading))
    }
    ),
    Element.prototype.scrollParent || (Element.prototype.scrollParent = function() {
        for (var n = this.parentNode, t = this.ownerDocument, i = t && t.defaultView; i && n; ) {
            if (n.parentNode && n.parentNode !== t.body && n.parentNode !== t.documentElement && n.parentNode !== t && n.parentNode !== t.defaultView) {
                if (i.getComputedStyle(n).getPropertyValue("overflow") !== "visible")
                    return n
            } else
                return null;
            n = n.parentNode
        }
        return null
    }
    ),
    Element.prototype.scrollTo || (Element.prototype.scrollTo = function(n, t) {
        this.scrollLeft = n;
        this.scrollTop = t
    }
    ),
    Element.prototype.scrolling || (Element.prototype.scrolling = function(n, t, i, r, u) {
        var e, f, s;
        if (!n && !t) {
            if (r)
                try {
                    r.call(this)
                } catch (l) {}
            return
        }
        if (e = this.cancelAnimationFrame ? this : this.ownerDocument.defaultView,
        e) {
            if (this.$scrolling && this.$scrolling.frame && (e.cancelAnimationFrame(this.$scrolling.frame),
            u)) {
                var o = this.$scrolling
                  , h = o.diffX - ((this.pageXOffset || this.scrollLeft || 0) - o.startX)
                  , c = o.diffY - ((this.pageYOffset || this.scrollTop || 0) - o.startY);
                h && (n += h);
                c && (t += c)
            }
            if (delete this.$scrolling,
            f = {
                startX: this.pageXOffset || this.scrollLeft || 0,
                startY: this.pageYOffset || this.scrollTop || 0,
                diffX: n,
                diffY: t,
                dur: i || Math.min(500, Math.max(250, Math.abs(t / 4))),
                frame: 0,
                style: this.constructor === Window ? e.document.documentElement.style : this.style
            },
            r && typeof r == "function" && (f.callback = r),
            f.diffY < 0 && f.startY === 0 && (f.diffY = 0),
            f.diffX < 0 && f.startX === 0 && (f.diffX = 0),
            !f.diffY && !f.diffX) {
                if (f.callback)
                    try {
                        f.callback.call(this)
                    } catch (l) {}
                f = null;
                return
            }
            if (f.dur < 0) {
                n = f.diffX + f.startX;
                t = f.diffY + f.startY;
                this.scrollTo(n, t);
                return
            }
            this.$scrolling = f;
            s = function(n) {
                var r, i, u, f, t = this.$scrolling;
                if (t.begin) {
                    if (r = n - t.begin,
                    i = Math.min(1, r / t.dur),
                    i = .5 - Math.cos(i * Math.PI) / 2,
                    u = i * t.diffX + t.startX,
                    f = i * t.diffY + t.startY,
                    this.scrollTo(u, f),
                    i === 1) {
                        if (t.style && (t.style.removeProperty("scroll-behavior"),
                        delete t.style),
                        t.callback)
                            try {
                                t.callback.call(this)
                            } catch (o) {}
                        delete this.$scrolling;
                        return
                    }
                } else
                    t.begin = n,
                    t.style && t.style.setProperty("scroll-behavior", "auto");
                this.$scrolling.frame = e.requestAnimationFrame(s)
            }
            .bind(this);
            this.$scrolling.frame = e.requestAnimationFrame(s)
        }
    }
    ),
    Window.prototype.scrolling || (Window.prototype.scrolling = Element.prototype.scrolling),
    Document.prototype.getFixedElements || (Document.prototype.getFixedElements = function() {
        for (var n, r, t, u = this.querySelectorAll("aside,div,header,nav,ul"), f = [], i = 0; i < u.length; i++)
            n = u[i],
            r = getComputedStyle(n),
            t = r.getPropertyValue("position"),
            (t === "fixed" || t === "sticky") && f.push(n);
        return f
    }
    ),
    Document.prototype.fixedOffset || (Document.prototype.fixedOffset = function() {
        for (var n, u = this.documentElement.clientWidth / 2, r = this.getFixedElements(), t = 0, i = 0; i < r.length; i++)
            n = r[i].getBoundingClientRect(),
            n.top === 0 && n.left === 0 && n.width > u && n.height > t && (t = n.height);
        return t
    }
    ),
    Element.prototype.scrollIntoViewport || (Element.prototype.scrollIntoViewport = function(n) {
        var o = this.getBoundingClientRect(), i = {
            top: o.top,
            right: o.right,
            bottom: o.bottom,
            left: o.left,
            width: o.width,
            height: o.height
        }, f, e, r, t, l, s, u, h, c, a, v;
        if (n && n.height && (i.height = n.height,
        i.bottom = i.top + i.height),
        i.height === 0 && i.top === 0) {
            if (f = this.previousElementSibling && this.previousElementSibling.getBoundingClientRect(),
            f && f.height ? i = {
                top: f.bottom + 1,
                right: f.right,
                bottom: f.bottom + 2,
                left: f.left,
                width: f.width,
                height: 1
            } : e = this.nextElementSibling && this.nextElementSibling.getBoundingClientRect(),
            e && e.height)
                i = {
                    top: e.top - 2,
                    right: e.right,
                    bottom: e.top - 1,
                    left: e.left,
                    width: e.width,
                    height: 1
                };
            else if (!i && (i = this.parentNode.getBoundingClientRect(),
            !i.height))
                return
        } else if (i.height === 0 && this.nodeName === "INPUT" && (i = this.parentNode.getBoundingClientRect(),
        !i.height))
            return;
        if (r = n && n.container,
        r !== !1)
            if (r)
                if (r.ownerDocument) {
                    if (!r.contains(this)) {
                        console.error("Element not found in container", this, r);
                        return
                    }
                } else {
                    console.error("Invalid container", r);
                    return
                }
            else if (r = this.scrollParent(),
            !r)
                return;
        if (t = {},
        r) {
            if (t.height = r.clientHeight,
            !t.height)
                return;
            t.width = r.clientWidth;
            l = r.getBoundingClientRect();
            t.top = l.top;
            t.left = l.left;
            t.topOffset = 0
        } else {
            if (s = this.ownerDocument,
            !s || !s.documentElement)
                return;
            t.height = s.documentElement.clientHeight;
            t.width = s.documentElement.clientWidth;
            t.top = 0;
            t.left = 0;
            t.topOffset = n && n.fixed ? s.fixedOffset() : 0
        }
        u = n && n.margin || 0;
        h = 0;
        n && n.top ? h = i.top - t.topOffset - t.top - u : i.top > t.top + t.height ? h = i.height > t.height - 1 ? i.top - t.topOffset - t.top - u : i.bottom - t.top - t.height + u : i.bottom < t.top + t.topOffset + u && (h = i.height > t.height - 1 ? i.bottom - t.top - t.height + u : i.top - t.topOffset - t.top - u);
        c = 0;
        i.left > t.left + t.width ? c = i.width > t.width - 1 ? i.left - t.left - u : i.right - t.left - t.width + u : i.right < t.left + u && (c = i.width > t.width - 1 ? i.right - t.left - t.width + u : i.left - t.left - u);
        a = n && n.instant ? -1 : n && n.duration;
        v = n && n.callback;
        (r || this.ownerDocument.defaultView).scrolling(c, h, a, v)
    }
    ),
    i = [/^\d{4}\-\d{2}\-\d{2}T\d\d\:\d\d/, /^(\d{4})\-(\d{2})\-(\d{2})(?:\s+|$)/, /(^.+ |^\s*)(\d+):(\d+)(:\d+)? ?(?:(am)|(pm))\s*$/i, /(^.+ |^\s*)(\d+):(\d+)(?:(\d+)(\.\d+)?)?\s*$/],
    !Date.parse2) {
        Date.parse2 = function(n) {
            var t, r, f, u;
            if (n) {
                if (n.constructor === Date)
                    return n;
                if (typeof n != "string")
                    t = new Date(n);
                else {
                    for (u = 0; u < i.length; u++)
                        if (r = i[u].exec(n),
                        r) {
                            if (u === 0)
                                break;
                            else if (u === 1)
                                t = new Date(+r[1],+r[2] - 1,+r[3]);
                            else if (u === 2) {
                                if (t = new Date(r[1] || new Date),
                                isNaN(t))
                                    return null;
                                f = +r[2];
                                r[5] && f === 12 ? t.setHours(0) : r[6] && f < 12 ? t.setHours(f + 12) : t.setHours(f);
                                t.setMinutes(+r[3]);
                                r[4] ? t.setSeconds(+r[4].substr(1)) : t.setSeconds(0);
                                t.setMilliseconds(0)
                            } else if (u === 3) {
                                if (t = new Date(r[1] || new Date),
                                isNaN(t))
                                    return null;
                                t.setHours(+r[2]);
                                t.setMinutes(+r[3]);
                                t.setSeconds(+r[4] || 0);
                                t.setMilliseconds((+r[5] || 0) * 1e3)
                            }
                        } else
                            continue;
                    t || (t = new Date(Date.parse(n)))
                }
            } else
                return null;
            return isNaN(t) ? null : t
        }
        ;
        var u = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          , f = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        Date.prototype.formatted = function(n) {
            var e = new Date(this);
            e.setMinutes(e.getMinutes() - e.getTimezoneOffset());
            var o, t = e.toJSON(), l = t.slice(0, 4), s = t.slice(5, 7), h = t.slice(8, 10), i = t.slice(11, 13), r = +i, a = t.slice(14, 16), v = t.slice(17, 19), c = t.slice(20, 23), y = this.getDay();
            return (n || "M/d/yyyy").replace(/\\.|y{2,4}|M{1,4}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|t{1,2}|T{1,2}|f{1,3}|rr|RR|ZZZ/g, function(n) {
                switch (n) {
                case "yy":
                    return l.slice(2, 4);
                case "yyyy":
                    return l;
                case "M":
                    return +s;
                case "MM":
                    return s;
                case "MMM":
                    return f[+s - 1].slice(0, 3);
                case "MMMM":
                    return f[+s - 1];
                case "d":
                    return +h;
                case "dd":
                    return h;
                case "ddd":
                    return u[y].slice(0, 3);
                case "dddd":
                    return u[y];
                case "H":
                    return +i;
                case "HH":
                    return i;
                case "h":
                    return r === 0 ? 12 : r > 12 ? r - 12 : r;
                case "hh":
                    return r < 10 ? "0" + r : r;
                case "m":
                    return +a;
                case "mm":
                    return a;
                case "s":
                    return +v;
                case "ss":
                    return v;
                case "t":
                    return i > 11 ? "p" : "a";
                case "tt":
                    return i > 11 ? "pm" : "am";
                case "T":
                    return i > 11 ? "P" : "A";
                case "TT":
                    return i > 11 ? "PM" : "AM";
                case "f":
                    return c.slice(0, 1);
                case "ff":
                    return c.slice(0, 2);
                case "fff":
                    return c;
                case "rr":
                case "RR":
                    o = n === "RR";
                    switch (h) {
                    case 1:
                    case 21:
                    case 31:
                        return o ? "ST" : "st";
                    case 2:
                    case 22:
                        return o ? "ND" : "nd";
                    case 3:
                    case 23:
                        return o ? "RD" : "rd";
                    default:
                        return o ? "TH" : "th"
                    }
                    break;
                case "ZZZ":
                    return Date.timeZoneAbbreviation ? Date.timeZoneAbbreviation(e) : "";
                default:
                    return n[0] === "\\" ? n[1] : n
                }
            })
        }
        ;
        Date.timeZoneAbbreviation = function(n) {
            var u = jstz.date_is_dst(n)
              , t = u ? "DT" : "ST"
              , i = /_tz=([^;]+);/.exec(String(document.cookie))
              , r = i && decodeURIComponent(i[1])
              , f = r && jstz.olson.friendly[r];
            switch (f) {
            case "Hawaiian Standard Time":
                return "H" + t;
            case "Alaskan Standard Time":
                return "A" + t;
            case "Pacific Standard Time":
                return "P" + t;
            case "Mountain Standard Time":
                return "M" + t;
            case "Central Standard Time":
                return "C" + t;
            case "Eastern Standard Time":
                return "E" + t;
            case "W. Australia Standard Time":
                return "AW" + t;
            case "Cen. Australia Standard Time":
            case "AUS Central Standard Time":
                return "AC" + t;
            case "AUS Eastern Standard Time":
            case "E. Australia Standard Time":
                return "AE" + t;
            case "Central Pacific Standard Time":
                return "CP" + t;
            case "New Zealand Standard Time":
                return "NZ" + t;
            case "GMT Standard Time":
                return "GMT";
            case "Central Europe Standard Time":
                return t == "DT" ? "CEST" : "CET";
            default:
                return ""
            }
        }
        ;
        Date.isLeapYear = function(n) {
            return n % 4 == 0 && n % 100 != 0 || n % 400 == 0
        }
        ;
        Date.getDaysInMonth = function(n, t) {
            return [31, Date.isLeapYear(n) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
        }
        ;
        Date.prototype.isLeapYear = function() {
            return Date.isLeapYear(this.getFullYear())
        }
        ;
        Date.prototype.getDaysInMonth = function() {
            return Date.getDaysInMonth(this.getFullYear(), this.getMonth())
        }
        ;
        Date.prototype.addYears = function(n) {
            return !n || isNaN(n = +n) ? this : (this.setFullYear(this.getFullYear() + n),
            this)
        }
        ;
        Date.prototype.addMonths = function(n) {
            var t = this.getDate();
            return !n || isNaN(n = +n) ? this : (this.setMonth(this.getMonth() + n),
            t = Math.max(0, Math.min(this.getDaysInMonth(), t)),
            this.setDate(t),
            this)
        }
        ;
        Date.prototype.addDays = function(n) {
            return !n || isNaN(n = +n) ? this : (this.setDate(this.getDate() + n),
            this)
        }
        ;
        Date.prototype.setYears = function(n) {
            var t = this.getDate();
            if (n && !isNaN(n = +n))
                return this.setDate(1),
                this.setFullYear(n),
                t = Math.max(0, Math.min(this.getDaysInMonth(), t)),
                this.setDate(t),
                this
        }
        ;
        Date.prototype.setMonths = function(n) {
            var t = this.getDate();
            if (n && !isNaN(n = +n))
                return this.setDate(1),
                n = Math.max(1, Math.min(12, n)),
                this.setMonth(n - 1),
                t = Math.max(0, Math.min(this.getDaysInMonth(), t)),
                this.setDate(t),
                this
        }
        ;
        Date.prototype.setDays = function(n) {
            if (n && !isNaN(n = +n))
                return n = Math.max(0, Math.min(this.getDaysInMonth(), n)),
                this.setDate(n),
                this
        }
        ;
        Date.prototype.set = function(n, t, i, r, u, f) {
            return this.setYears(n),
            this.setMonths(t),
            this.setDays(i),
            r = Math.max(0, Math.min(23, +r || 0)),
            u = Math.max(0, Math.min(59, +u || 0)),
            f = Math.max(0, Math.min(59, +f || 0)),
            this.setHours(r, u, f, 0),
            this
        }
    }
    window.register && window.register("j/poly")
}
)();
window.Modernizr = function(n, t, i) {
    function l(n) {
        c.cssText = n
    }
    function lt(n, t) {
        return l(a.join(n + ";") + (t || ""))
    }
    function h(n, t) {
        return typeof n === t
    }
    function it(n, t) {
        return !!~("" + n).indexOf(t)
    }
    function ht(n, t) {
        var u, r;
        for (u in n)
            if (r = n[u],
            !it(r, "-") && c[r] !== i)
                return t == "pfx" ? r : !0;
        return !1
    }
    function at(n, t, r) {
        var f, u;
        for (f in n)
            if (u = t[n[f]],
            u !== i)
                return r === !1 ? n[f] : h(u, "function") ? u.bind(r || t) : u;
        return !1
    }
    function s(n, t, i) {
        var r = n.charAt(0).toUpperCase() + n.slice(1)
          , u = (n + " " + ft.join(r + " ") + r).split(" ");
        return h(t, "string") || h(t, "undefined") ? ht(u, t) : (u = (n + " " + et.join(r + " ") + r).split(" "),
        at(u, t, i))
    }
    function vt() {
        u.input = function(i) {
            for (var r = 0, u = i.length; r < u; r++)
                v[i[r]] = !!(i[r]in f);
            return v.list && (v.list = !!(t.createElement("datalist") && n.HTMLDataListElement)),
            v
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "));
        u.inputtypes = function(n) {
            for (var u = 0, r, o, s, h = n.length; u < h; u++)
                f.setAttribute("type", o = n[u]),
                r = f.type !== "text",
                r && (f.value = k,
                f.style.cssText = "position:absolute;visibility:hidden;",
                /^range$/.test(o) && f.style.WebkitAppearance !== i ? (e.appendChild(f),
                s = t.defaultView,
                r = s.getComputedStyle && s.getComputedStyle(f, null).WebkitAppearance !== "textfield" && f.offsetHeight !== 0,
                e.removeChild(f)) : /^(search|tel)$/.test(o) || (r = /^(url|email)$/.test(o) ? f.checkValidity && f.checkValidity() === !1 : f.value != k)),
                ot[n[u]] = !!r;
            return ot
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }
    var u = {}, b = !0, e = t.documentElement, o = "modernizr", rt = t.createElement(o), c = rt.style, f = t.createElement("input"), k = ":)", yt = {}.toString, a = " -webkit- -moz- -o- -ms- ".split(" "), ut = "Webkit Moz O ms", ft = ut.split(" "), et = ut.toLowerCase().split(" "), ct = {
        svg: "http://www.w3.org/2000/svg"
    }, r = {}, ot = {}, v = {}, d = [], g = d.slice, y, p = function(n, i, r, u) {
        var l, a, c, v, f = t.createElement("div"), h = t.body, s = h || t.createElement("body");
        if (parseInt(r, 10))
            while (r--)
                c = t.createElement("div"),
                c.id = u ? u[r] : o + (r + 1),
                f.appendChild(c);
        return l = ["&#173;", '<style id="s', o, '">', n, "<\/style>"].join(""),
        f.id = o,
        (h ? f : s).innerHTML += l,
        s.appendChild(f),
        h || (s.style.background = "",
        s.style.overflow = "hidden",
        v = e.style.overflow,
        e.style.overflow = "hidden",
        e.appendChild(s)),
        a = i(f, n),
        h ? f.parentNode.removeChild(f) : (s.parentNode.removeChild(s),
        e.style.overflow = v),
        !!a
    }, st = function() {
        function r(r, u) {
            u = u || t.createElement(n[r] || "div");
            r = "on" + r;
            var f = r in u;
            return f || (u.setAttribute || (u = t.createElement("div")),
            u.setAttribute && u.removeAttribute && (u.setAttribute(r, ""),
            f = h(u[r], "function"),
            h(u[r], "undefined") || (u[r] = i),
            u.removeAttribute(r))),
            u = null,
            f
        }
        var n = {
            select: "input",
            change: "input",
            submit: "form",
            reset: "form",
            error: "img",
            load: "img",
            abort: "img"
        };
        return r
    }(), nt = {}.hasOwnProperty, tt, w;
    tt = h(nt, "undefined") || h(nt.call, "undefined") ? function(n, t) {
        return t in n && h(n.constructor.prototype[t], "undefined")
    }
    : function(n, t) {
        return nt.call(n, t)
    }
    ;
    Function.prototype.bind || (Function.prototype.bind = function(n) {
        var t = this, i, r;
        if (typeof t != "function")
            throw new TypeError;
        return i = g.call(arguments, 1),
        r = function() {
            var f, e, u;
            return this instanceof r ? (f = function() {}
            ,
            f.prototype = t.prototype,
            e = new f,
            u = t.apply(e, i.concat(g.call(arguments))),
            Object(u) === u) ? u : e : t.apply(n, i.concat(g.call(arguments)))
        }
        ,
        r
    }
    );
    r.flexbox = function() {
        return s("flexWrap")
    }
    ;
    r.canvas = function() {
        var n = t.createElement("canvas");
        return !!(n.getContext && n.getContext("2d"))
    }
    ;
    r.touch = function() {
        var i;
        return "ontouchstart"in n || n.DocumentTouch && t instanceof DocumentTouch ? i = !0 : p(["@media (", a.join("touch-enabled),("), o, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(n) {
            i = n.offsetTop === 9
        }),
        i
    }
    ;
    r.geolocation = function() {
        return "geolocation"in navigator
    }
    ;
    r.hashchange = function() {
        return st("hashchange", n) && (t.documentMode === i || t.documentMode > 7)
    }
    ;
    r.history = function() {
        return !!(n.history && history.pushState)
    }
    ;
    r.websockets = function() {
        return "WebSocket"in n || "MozWebSocket"in n
    }
    ;
    r.rgba = function() {
        return l("background-color:rgba(150,255,150,.5)"),
        it(c.backgroundColor, "rgba")
    }
    ;
    r.multiplebgs = function() {
        return l("background:url(https://),url(https://),red url(https://)"),
        /(url\s*\(.*?){3}/.test(c.background)
    }
    ;
    r.backgroundsize = function() {
        return s("backgroundSize")
    }
    ;
    r.boxshadow = function() {
        return s("boxShadow")
    }
    ;
    r.opacity = function() {
        return lt("opacity:.55"),
        /^0.55$/.test(c.opacity)
    }
    ;
    r.cssanimations = function() {
        return s("animationName")
    }
    ;
    r.csscolumns = function() {
        return s("columnCount")
    }
    ;
    r.cssgradients = function() {
        var n = "background-image:";
        return l((n + "-webkit- ".split(" ").join("gradient(linear,left top,right bottom,from(#9f9),to(white));" + n) + a.join("linear-gradient(left top,#9f9, white);" + n)).slice(0, -n.length)),
        it(c.backgroundImage, "gradient")
    }
    ;
    r.csstransforms = function() {
        return !!s("transform")
    }
    ;
    r.csstransforms3d = function() {
        var n = !!s("perspective");
        return n && "webkitPerspective"in e.style && p("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(t) {
            n = t.offsetLeft === 9 && t.offsetHeight === 3
        }),
        n
    }
    ;
    r.csstransitions = function() {
        return s("transition")
    }
    ;
    r.generatedcontent = function() {
        var n;
        return p(["#", o, "{font:0/0 a}#", o, ':after{content:"', k, '";visibility:hidden;font:3px/1 a}'].join(""), function(t) {
            n = t.offsetHeight >= 3
        }),
        n
    }
    ;
    r.localstorage = function() {
        try {
            return localStorage.setItem(o, o),
            localStorage.removeItem(o),
            !0
        } catch (n) {
            return !1
        }
    }
    ;
    r.svg = function() {
        return !!t.createElementNS && !!t.createElementNS(ct.svg, "svg").createSVGRect
    }
    ;
    for (w in r)
        tt(r, w) && (y = w.toLowerCase(),
        u[y] = r[w](),
        d.push((u[y] ? "" : "no-") + y));
    return u.input || vt(),
    u.addTest = function(n, t) {
        if (typeof n == "object")
            for (var r in n)
                tt(n, r) && u.addTest(r, n[r]);
        else {
            if (n = n.toLowerCase(),
            u[n] !== i)
                return u;
            t = typeof t == "function" ? t() : t;
            typeof b != "undefined" && b && (e.className += " " + (t ? "" : "no-") + n);
            u[n] = t
        }
        return u
    }
    ,
    l(""),
    rt = f = null,
    function(n, t) {
        function p(n, t) {
            var i = n.createElement("p")
              , r = n.getElementsByTagName("head")[0] || n.documentElement;
            return i.innerHTML = "x<style>" + t + "<\/style>",
            r.insertBefore(i.lastChild, r.firstChild)
        }
        function c() {
            var n = r.elements;
            return typeof n == "string" ? n.split(" ") : n
        }
        function o(n) {
            var t = h[n[s]];
            return t || (t = {},
            e++,
            n[s] = e,
            h[e] = t),
            t
        }
        function l(n, r, u) {
            if (r || (r = t),
            i)
                return r.createElement(n);
            u || (u = o(r));
            var f;
            return f = u.cache[n] ? u.cache[n].cloneNode() : y.test(n) ? (u.cache[n] = u.createElem(n)).cloneNode() : u.createElem(n),
            f.canHaveChildren && !v.test(n) && !f.tagUrn ? u.frag.appendChild(f) : f
        }
        function w(n, r) {
            if (n || (n = t),
            i)
                return n.createDocumentFragment();
            r = r || o(n);
            for (var f = r.frag.cloneNode(), u = 0, e = c(), s = e.length; u < s; u++)
                f.createElement(e[u]);
            return f
        }
        function b(n, t) {
            t.cache || (t.cache = {},
            t.createElem = n.createElement,
            t.createFrag = n.createDocumentFragment,
            t.frag = t.createFrag());
            n.createElement = function(i) {
                return r.shivMethods ? l(i, n, t) : t.createElem(i)
            }
            ;
            n.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + c().join().replace(/[\w\-]+/g, function(n) {
                return t.createElem(n),
                t.frag.createElement(n),
                'c("' + n + '")'
            }) + ");return n}")(r, t.frag)
        }
        function a(n) {
            n || (n = t);
            var u = o(n);
            return !r.shivCSS || f || u.hasCSS || (u.hasCSS = !!p(n, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),
            i || b(n, u),
            n
        }
        var u = n.html5 || {}, v = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, y = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, f, s = "_html5shiv", e = 0, h = {}, i, r;
        (function() {
            try {
                var n = t.createElement("a");
                n.innerHTML = "<xyz><\/xyz>";
                f = "hidden"in n;
                i = n.childNodes.length == 1 || function() {
                    t.createElement("a");
                    var n = t.createDocumentFragment();
                    return typeof n.cloneNode == "undefined" || typeof n.createDocumentFragment == "undefined" || typeof n.createElement == "undefined"
                }()
            } catch (r) {
                f = !0;
                i = !0
            }
        }
        )();
        r = {
            elements: u.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time videoif icon",
            version: "3.7.0",
            shivCSS: u.shivCSS !== !1,
            supportsUnknownElements: i,
            shivMethods: u.shivMethods !== !1,
            type: "default",
            shivDocument: a,
            createElement: l,
            createDocumentFragment: w
        };
        n.html5 = r;
        a(t)
    }(this, t),
    u._version = "2.8.3",
    u._prefixes = a,
    u._domPrefixes = et,
    u._cssomPrefixes = ft,
    u.hasEvent = st,
    u.testProp = function(n) {
        return ht([n])
    }
    ,
    u.testAllProps = s,
    u.testStyles = p,
    e.className = e.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (b ? " js " + d.join(" ") : ""),
    u
}(this, this.document);
Modernizr.addTest("boxsizing", function() {
    return Modernizr.testAllProps("boxSizing") && (document.documentMode === undefined || document.documentMode > 7)
});
Modernizr.addTest("csscalc", function() {
    var n = "width:"
      , t = document.createElement("div");
    return t.style.cssText = n + Modernizr._prefixes.join("calc(10px);" + n),
    !!t.style.length
});
Modernizr.addTest("display-table", function() {
    var t = window.document, i = t.documentElement, n = t.createElement("div"), r = t.createElement("div"), u = t.createElement("div"), f;
    return n.style.cssText = "display: table",
    r.style.cssText = u.style.cssText = "display: table-cell; padding: 10px",
    n.appendChild(r),
    n.appendChild(u),
    i.insertBefore(n, i.firstChild),
    f = r.offsetLeft < u.offsetLeft,
    i.removeChild(n),
    f
});
Modernizr.addTest("pointerevents", function() {
    var n = document.createElement("x"), t = document.documentElement, i = window.getComputedStyle, r;
    return ("pointerEvents"in n.style) ? (n.style.pointerEvents = "auto",
    n.style.pointerEvents = "x",
    t.appendChild(n),
    r = i && i(n, "").pointerEvents === "auto",
    t.removeChild(n),
    !!r) : !1
});
Modernizr.addTest("lastchild", function() {
    return Modernizr.testStyles("#modernizr div {width:100px} #modernizr :last-child{width:200px;display:block}", function(n) {
        return n.lastChild.offsetWidth > n.firstChild.offsetWidth
    }, 2)
});
Modernizr.addTest("cssscrollbar", function() {
    var n, t = "#modernizr{overflow: scroll; width: 40px }#" + Modernizr._prefixes.join("scrollbar{width:2px} #modernizr::").split("#").slice(1).join("#") + "scrollbar{width:2px}";
    return Modernizr.testStyles(t, function(t) {
        n = "scrollWidth"in t && t.scrollWidth == 38
    }),
    n
});
Modernizr.addTest("cssvwunit", function() {
    var n;
    return Modernizr.testStyles("#modernizr { width: 50vw; }", function(t) {
        var i = parseInt(window.innerWidth / 2, 10)
          , r = parseInt((window.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).width, 10);
        n = r == i
    }),
    n
});
Modernizr.addTest("placeholder", function() {
    return !!("placeholder"in (Modernizr.input || document.createElement("input")) && "placeholder"in (Modernizr.textarea || document.createElement("textarea")))
}),
function(n, t) {
    t.formvalidationapi = !1;
    t.formvalidationmessage = !1;
    t.addTest("formvalidation", function() {
        var i = n.createElement("form"), r, u;
        return !("checkValidity"in i) || !("addEventListener"in i) ? !1 : "reportValidity"in i ? !0 : (r = !1,
        t.formvalidationapi = !0,
        i.addEventListener("submit", function(n) {
            window.opera || n.preventDefault();
            n.stopPropagation()
        }, !1),
        i.innerHTML = '<input name="modTest" required><button><\/button>',
        t.testStyles("#modernizr form{position:absolute;top:-99999em}", function(n) {
            n.appendChild(i);
            u = i.getElementsByTagName("input")[0];
            u.addEventListener("invalid", function(n) {
                r = !0;
                n.preventDefault();
                n.stopPropagation()
            }, !1);
            t.formvalidationmessage = !!u.validationMessage;
            i.getElementsByTagName("button")[0].click()
        }),
        r)
    })
}(document, window.Modernizr);
/*!
 * jQuery JavaScript Library v3.5.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2020-05-04T22:49Z
 */
(function(n, t) {
    "use strict";
    typeof module == "object" && typeof module.exports == "object" ? module.exports = n.document ? t(n, !0) : function(n) {
        if (!n.document)
            throw new Error("jQuery requires a window with a document");
        return t(n)
    }
    : t(n)
}
)(typeof window != "undefined" ? window : this, function(n, t) {
    "use strict";
    function yr(n, t, i) {
        i = i || f;
        var r, e, u = i.createElement("script");
        if (u.text = n,
        t)
            for (r in re)
                e = t[r] || t.getAttribute && t.getAttribute(r),
                e && u.setAttribute(r, e);
        i.head.appendChild(u).parentNode.removeChild(u)
    }
    function rt(n) {
        return n == null ? n + "" : typeof n == "object" || typeof n == "function" ? ti[ar.call(n)] || "object" : typeof n
    }
    function ai(n) {
        var t = !!n && "length"in n && n.length
          , i = rt(n);
        return u(n) || it(n) ? !1 : i === "array" || t === 0 || typeof t == "number" && t > 0 && t - 1 in n
    }
    function l(n, t) {
        return n.nodeName && n.nodeName.toLowerCase() === t.toLowerCase()
    }
    function yi(n, t, r) {
        return u(t) ? i.grep(n, function(n, i) {
            return !!t.call(n, i, n) !== r
        }) : t.nodeType ? i.grep(n, function(n) {
            return n === t !== r
        }) : typeof t != "string" ? i.grep(n, function(n) {
            return ni.call(t, n) > -1 !== r
        }) : i.filter(t, n, r)
    }
    function iu(n, t) {
        while ((n = n[t]) && n.nodeType !== 1)
            ;
        return n
    }
    function ue(n) {
        var t = {};
        return i.each(n.match(a) || [], function(n, i) {
            t[i] = !0
        }),
        t
    }
    function ft(n) {
        return n
    }
    function ri(n) {
        throw n;
    }
    function ru(n, t, i, r) {
        var f;
        try {
            n && u(f = n.promise) ? f.call(n).done(t).fail(i) : n && u(f = n.then) ? f.call(n, t, i) : t.apply(undefined, [n].slice(r))
        } catch (n) {
            i.apply(undefined, [n])
        }
    }
    function fi() {
        f.removeEventListener("DOMContentLoaded", fi);
        n.removeEventListener("load", fi);
        i.ready()
    }
    function oe(n, t) {
        return t.toUpperCase()
    }
    function y(n) {
        return n.replace(fe, "ms-").replace(ee, oe)
    }
    function pt() {
        this.expando = i.expando + pt.uid++
    }
    function ce(t) {
        return t === "true" ? !0 : t === "false" ? !1 : t === "null" ? null : t === +t + "" ? +t : se.test(t) ? n.JSON2 && n.JSON2.parse ? n.JSON2.parse(t) : JSON.parse(t) : t
    }
    function fu(n, t, i) {
        var r;
        if (i === undefined && n.nodeType === 1)
            if (r = "data-" + t.replace(he, "-$&").toLowerCase(),
            i = n.getAttribute(r),
            typeof i == "string") {
                try {
                    i = ce(i)
                } catch (u) {}
                o.set(n, t, i)
            } else
                i = undefined;
        return i
    }
    function ou(n, t, r, u) {
        var s, h, c = 20, l = u ? function() {
            return u.cur()
        }
        : function() {
            return i.css(n, t, "")
        }
        , o = l(), e = r && r[3] || (i.cssNumber[t] ? "" : "px"), f = n.nodeType && (i.cssNumber[t] || e !== "px" && +o) && wt.exec(i.css(n, t));
        if (f && f[3] !== e) {
            for (o = o / 2,
            e = e || f[3],
            f = +o || 1; c--; )
                i.style(n, t, f + e),
                (1 - h) * (1 - (h = l() / o || .5)) <= 0 && (c = 0),
                f = f / h;
            f = f * 2;
            i.style(n, t, f + e);
            r = r || []
        }
        return r && (f = +f || +o || 0,
        s = r[1] ? f + (r[1] + 1) * r[2] : +r[2],
        u && (u.unit = e,
        u.start = f,
        u.end = s)),
        s
    }
    function ae(n) {
        var r, f = n.ownerDocument, u = n.nodeName, t = pi[u];
        return t ? t : (r = f.body.appendChild(f.createElement(u)),
        t = i.css(r, "display"),
        r.parentNode.removeChild(r),
        t === "none" && (t = "block"),
        pi[u] = t,
        t)
    }
    function st(n, t) {
        for (var e, u, f = [], i = 0, o = n.length; i < o; i++)
            (u = n[i],
            u.style) && (e = u.style.display,
            t ? (e === "none" && (f[i] = r.get(u, "display") || null,
            f[i] || (u.style.display = "")),
            u.style.display === "" && bt(u) && (f[i] = ae(u))) : e !== "none" && (f[i] = "none",
            r.set(u, "display", e)));
        for (i = 0; i < o; i++)
            f[i] != null && (n[i].style.display = f[i]);
        return n
    }
    function s(n, t) {
        var r;
        return (r = typeof n.getElementsByTagName != "undefined" ? n.getElementsByTagName(t || "*") : typeof n.querySelectorAll != "undefined" ? n.querySelectorAll(t || "*") : [],
        t === undefined || t && l(n, t)) ? i.merge([n], r) : r
    }
    function wi(n, t) {
        for (var i = 0, u = n.length; i < u; i++)
            r.set(n[i], "globalEval", !t || r.get(t[i], "globalEval"))
    }
    function lu(n, t, r, u, f) {
        for (var e, o, p, a, w, v, h = t.createDocumentFragment(), y = [], l = 0, b = n.length; l < b; l++)
            if (e = n[l],
            e || e === 0)
                if (rt(e) === "object")
                    i.merge(y, e.nodeType ? [e] : e);
                else if (cu.test(e)) {
                    for (o = o || h.appendChild(t.createElement("div")),
                    p = (su.exec(e) || ["", ""])[1].toLowerCase(),
                    a = c[p] || c._default,
                    o.innerHTML = a[1] + i.htmlPrefilter(e) + a[2],
                    v = a[0]; v--; )
                        o = o.lastChild;
                    i.merge(y, o.childNodes);
                    o = h.firstChild;
                    o.textContent = ""
                } else
                    y.push(t.createTextNode(e));
        for (h.textContent = "",
        l = 0; e = y[l++]; ) {
            if (u && i.inArray(e, u) > -1) {
                f && f.push(e);
                continue
            }
            if (w = ot(e),
            o = s(h.appendChild(e), "script"),
            w && wi(o),
            r)
                for (v = 0; e = o[v++]; )
                    hu.test(e.type || "") && r.push(e)
        }
        return h
    }
    function ht() {
        return !0
    }
    function ct() {
        return !1
    }
    function pe(n, t) {
        return n === we() == (t === "focus")
    }
    function we() {
        try {
            return f.activeElement
        } catch (n) {}
    }
    function bi(n, t, r, u, f, e) {
        var o, s;
        if (typeof t == "object") {
            typeof r != "string" && (u = u || r,
            r = undefined);
            for (s in t)
                bi(n, s, r, u, t[s], e);
            return n
        }
        if (u == null && f == null ? (f = r,
        u = r = undefined) : f == null && (typeof r == "string" ? (f = u,
        u = undefined) : (f = u,
        u = r,
        r = undefined)),
        f === !1)
            f = ct;
        else if (!f)
            return n;
        return e === 1 && (o = f,
        f = function(n) {
            return i().off(n),
            o.apply(this, arguments)
        }
        ,
        f.guid = o.guid || (o.guid = i.guid++)),
        n.each(function() {
            i.event.add(this, t, f, u, r)
        })
    }
    function ei(n, t, u) {
        if (!u) {
            r.get(n, t) === undefined && i.event.add(n, t, ht);
            return
        }
        r.set(n, t, !1);
        i.event.add(n, t, {
            namespace: !1,
            handler: function(n) {
                var o, e, f = r.get(this, t);
                if (n.isTrigger & 1 && this[t]) {
                    if (f.length)
                        (i.event.special[t] || {}).delegateType && n.stopPropagation();
                    else if (f = k.call(arguments),
                    r.set(this, t, f),
                    o = u(this, t),
                    this[t](),
                    e = r.get(this, t),
                    f !== e || o ? r.set(this, t, !1) : e = {},
                    f !== e)
                        return n.stopImmediatePropagation(),
                        n.preventDefault(),
                        e.value
                } else
                    f.length && (r.set(this, t, {
                        value: i.event.trigger(i.extend(f[0], i.Event.prototype), f.slice(1), this)
                    }),
                    n.stopImmediatePropagation())
            }
        })
    }
    function vu(n, t) {
        return l(n, "table") && l(t.nodeType !== 11 ? t : t.firstChild, "tr") ? i(n).children("tbody")[0] || n : n
    }
    function ge(n) {
        return n.type = (n.getAttribute("type") !== null) + "/" + n.type,
        n
    }
    function no(n) {
        return (n.type || "").slice(0, 5) === "true/" ? n.type = n.type.slice(5) : n.removeAttribute("type"),
        n
    }
    function yu(n, t) {
        var f, s, e, h, c, l, u;
        if (t.nodeType === 1) {
            if (r.hasData(n) && (h = r.get(n),
            u = h.events,
            u)) {
                r.remove(t, "handle events");
                for (e in u)
                    for (f = 0,
                    s = u[e].length; f < s; f++)
                        i.event.add(t, e, u[e][f])
            }
            o.hasData(n) && (c = o.access(n),
            l = i.extend({}, c),
            o.set(t, l))
        }
    }
    function to(n, t) {
        var i = t.nodeName.toLowerCase();
        i === "input" && kt.test(n.type) ? t.checked = n.checked : (i === "input" || i === "textarea") && (t.defaultValue = n.defaultValue)
    }
    function lt(n, t, f, o) {
        t = lr(t);
        var a, b, l, v, h, y, c = 0, p = n.length, d = p - 1, w = t[0], k = u(w);
        if (k || p > 1 && typeof w == "string" && !e.checkClone && ke.test(w))
            return n.each(function(i) {
                var r = n.eq(i);
                k && (t[0] = w.call(this, i, r.html()));
                lt(r, t, f, o)
            });
        if (p && (a = lu(t, n[0].ownerDocument, !1, n, o),
        b = a.firstChild,
        a.childNodes.length === 1 && (a = b),
        b || o)) {
            for (l = i.map(s(a, "script"), ge),
            v = l.length; c < p; c++)
                h = a,
                c !== d && (h = i.clone(h, !0, !0),
                v && i.merge(l, s(h, "script"))),
                f.call(n[c], h, c);
            if (v)
                for (y = l[l.length - 1].ownerDocument,
                i.map(l, no),
                c = 0; c < v; c++)
                    h = l[c],
                    hu.test(h.type || "") && !r.access(h, "globalEval") && i.contains(y, h) && (h.src && (h.type || "").toLowerCase() !== "module" ? i._evalUrl && !h.noModule && i._evalUrl(h.src, {
                        nonce: h.nonce || h.getAttribute("nonce")
                    }, y) : yr(h.textContent.replace(de, ""), h, y))
        }
        return n
    }
    function pu(n, t, r) {
        for (var u, e = t ? i.filter(t, n) : n, f = 0; (u = e[f]) != null; f++)
            r || u.nodeType !== 1 || i.cleanData(s(u)),
            u.parentNode && (r && ot(u) && wi(s(u, "script")),
            u.parentNode.removeChild(u));
        return n
    }
    function dt(n, t, r) {
        var o, s, h, u, f = n.style;
        return r = r || oi(n),
        r && (u = r.getPropertyValue(t) || r[t],
        u !== "" || ot(n) || (u = i.style(n, t)),
        !e.pixelBoxStyles() && ki.test(u) && io.test(t) && (o = f.width,
        s = f.minWidth,
        h = f.maxWidth,
        f.minWidth = f.maxWidth = f.width = u,
        u = r.width,
        f.width = o,
        f.minWidth = s,
        f.maxWidth = h)),
        u !== undefined ? u + "" : u
    }
    function bu(n, t) {
        return {
            get: function() {
                if (n()) {
                    delete this.get;
                    return
                }
                return (this.get = t).apply(this, arguments)
            }
        }
    }
    function ro(n) {
        for (var i = n[0].toUpperCase() + n.slice(1), t = ku.length; t--; )
            if (n = ku[t] + i,
            n in du)
                return n
    }
    function di(n) {
        var t = i.cssProps[n] || gu[n];
        return t ? t : n in du ? n : gu[n] = ro(n) || n
    }
    function rf(n, t, i) {
        var r = wt.exec(t);
        return r ? Math.max(0, r[2] - (i || 0)) + (r[3] || "px") : t
    }
    function gi(n, t, r, u, f, e) {
        var o = t === "width" ? 1 : 0
          , h = 0
          , s = 0;
        if (r === (u ? "border" : "content"))
            return 0;
        for (; o < 4; o += 2)
            r === "margin" && (s += i.css(n, r + b[o], !0, f)),
            u ? (r === "content" && (s -= i.css(n, "padding" + b[o], !0, f)),
            r !== "margin" && (s -= i.css(n, "border" + b[o] + "Width", !0, f))) : (s += i.css(n, "padding" + b[o], !0, f),
            r !== "padding" ? s += i.css(n, "border" + b[o] + "Width", !0, f) : h += i.css(n, "border" + b[o] + "Width", !0, f));
        return !u && e >= 0 && (s += Math.max(0, Math.ceil(n["offset" + t[0].toUpperCase() + t.slice(1)] - e - s - h - .5)) || 0),
        s
    }
    function uf(n, t, r) {
        var f = oi(n)
          , c = !e.boxSizingReliable() || r
          , o = c && i.css(n, "boxSizing", !1, f) === "border-box"
          , s = o
          , u = dt(n, t, f)
          , h = "offset" + t[0].toUpperCase() + t.slice(1);
        if (ki.test(u)) {
            if (!r)
                return u;
            u = "auto"
        }
        return (!e.boxSizingReliable() && o || !e.reliableTrDimensions() && l(n, "tr") || u === "auto" || !parseFloat(u) && i.css(n, "display", !1, f) === "inline") && n.getClientRects().length && (o = i.css(n, "boxSizing", !1, f) === "border-box",
        s = h in n,
        s && (u = n[h])),
        u = parseFloat(u) || 0,
        u + gi(n, t, r || (o ? "border" : "content"), s, f, u) + "px"
    }
    function h(n, t, i, r, u) {
        return new h.prototype.init(n,t,i,r,u)
    }
    function nr() {
        si && (f.hidden === !1 && n.requestAnimationFrame ? n.requestAnimationFrame(nr) : n.setTimeout(nr, i.fx.interval),
        i.fx.tick())
    }
    function of() {
        return n.setTimeout(function() {
            at = undefined
        }),
        at = Date.now()
    }
    function hi(n, t) {
        var r, u = 0, i = {
            height: n
        };
        for (t = t ? 1 : 0; u < 4; u += 2 - t)
            r = b[u],
            i["margin" + r] = i["padding" + r] = n;
        return t && (i.opacity = i.width = n),
        i
    }
    function sf(n, t, i) {
        for (var u, f = (v.tweeners[t] || []).concat(v.tweeners["*"]), r = 0, e = f.length; r < e; r++)
            if (u = f[r].call(i, t, n))
                return u
    }
    function eo(n, t, u) {
        var f, y, w, c, b, s, o, l, k = "width"in t || "height"in t, v = this, p = {}, h = n.style, a = n.nodeType && bt(n), e = r.get(n, "fxshow");
        u.queue || (c = i._queueHooks(n, "fx"),
        c.unqueued == null && (c.unqueued = 0,
        b = c.empty.fire,
        c.empty.fire = function() {
            c.unqueued || b()
        }
        ),
        c.unqueued++,
        v.always(function() {
            v.always(function() {
                c.unqueued--;
                i.queue(n, "fx").length || c.empty.fire()
            })
        }));
        for (f in t)
            if (y = t[f],
            ff.test(y)) {
                if (delete t[f],
                w = w || y === "toggle",
                y === (a ? "hide" : "show"))
                    if (y === "show" && e && e[f] !== undefined)
                        a = !0;
                    else
                        continue;
                p[f] = e && e[f] || i.style(n, f)
            }
        if (s = !i.isEmptyObject(t),
        s || !i.isEmptyObject(p)) {
            k && n.nodeType === 1 && (u.overflow = [h.overflow, h.overflowX, h.overflowY],
            o = e && e.display,
            o == null && (o = r.get(n, "display")),
            l = i.css(n, "display"),
            l === "none" && (o ? l = o : (st([n], !0),
            o = n.style.display || o,
            l = i.css(n, "display"),
            st([n]))),
            (l === "inline" || l === "inline-block" && o != null) && i.css(n, "float") === "none" && (s || (v.done(function() {
                h.display = o
            }),
            o == null && (l = h.display,
            o = l === "none" ? "" : l)),
            h.display = "inline-block"));
            u.overflow && (h.overflow = "hidden",
            v.always(function() {
                h.overflow = u.overflow[0];
                h.overflowX = u.overflow[1];
                h.overflowY = u.overflow[2]
            }));
            s = !1;
            for (f in p)
                s || (e ? "hidden"in e && (a = e.hidden) : e = r.access(n, "fxshow", {
                    display: o
                }),
                w && (e.hidden = !a),
                a && st([n], !0),
                v.done(function() {
                    a || st([n]);
                    r.remove(n, "fxshow");
                    for (f in p)
                        i.style(n, f, p[f])
                })),
                s = sf(a ? e[f] : 0, f, v),
                f in e || (e[f] = s.start,
                a && (s.end = s.start,
                s.start = 0))
        }
    }
    function oo(n, t) {
        var r, f, e, u, o;
        for (r in n)
            if (f = y(r),
            e = t[f],
            u = n[r],
            Array.isArray(u) && (e = u[1],
            u = n[r] = u[0]),
            r !== f && (n[f] = u,
            delete n[r]),
            o = i.cssHooks[f],
            o && "expand"in o) {
                u = o.expand(u);
                delete n[f];
                for (r in u)
                    r in n || (n[r] = u[r],
                    t[r] = e)
            } else
                t[f] = e
    }
    function v(n, t, r) {
        var o, s, h = 0, a = v.prefilters.length, e = i.Deferred().always(function() {
            delete l.elem
        }), l = function() {
            if (s)
                return !1;
            for (var o = at || of(), t = Math.max(0, f.startTime + f.duration - o), h = t / f.duration || 0, i = 1 - h, r = 0, u = f.tweens.length; r < u; r++)
                f.tweens[r].run(i);
            return (e.notifyWith(n, [f, i, t]),
            i < 1 && u) ? t : (u || e.notifyWith(n, [f, 1, 0]),
            e.resolveWith(n, [f]),
            !1)
        }, f = e.promise({
            elem: n,
            props: i.extend({}, t),
            opts: i.extend(!0, {
                specialEasing: {},
                easing: i.easing._default
            }, r),
            originalProperties: t,
            originalOptions: r,
            startTime: at || of(),
            duration: r.duration,
            tweens: [],
            createTween: function(t, r) {
                var u = i.Tween(n, f.opts, t, r, f.opts.specialEasing[t] || f.opts.easing);
                return f.tweens.push(u),
                u
            },
            stop: function(t) {
                var i = 0
                  , r = t ? f.tweens.length : 0;
                if (s)
                    return this;
                for (s = !0; i < r; i++)
                    f.tweens[i].run(1);
                return t ? (e.notifyWith(n, [f, 1, 0]),
                e.resolveWith(n, [f, t])) : e.rejectWith(n, [f, t]),
                this
            }
        }), c = f.props;
        for (oo(c, f.opts.specialEasing); h < a; h++)
            if (o = v.prefilters[h].call(f, n, c, f.opts),
            o)
                return u(o.stop) && (i._queueHooks(f.elem, f.opts.queue).stop = o.stop.bind(o)),
                o;
        return i.map(c, sf, f),
        u(f.opts.start) && f.opts.start.call(n, f),
        f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always),
        i.fx.timer(i.extend(l, {
            elem: n,
            anim: f,
            queue: f.opts.queue
        })),
        f
    }
    function nt(n) {
        var t = n.match(a) || [];
        return t.join(" ")
    }
    function tt(n) {
        return n.getAttribute && n.getAttribute("class") || ""
    }
    function tr(n) {
        return Array.isArray(n) ? n : typeof n == "string" ? n.match(a) || [] : []
    }
    function fr(n, t, r, u) {
        var f;
        if (Array.isArray(t))
            i.each(t, function(t, i) {
                r || so.test(n) ? u(n, i) : fr(n + "[" + (typeof i == "object" && i != null ? t : "") + "]", i, r, u)
            });
        else if (r || rt(t) !== "object")
            u(n, t);
        else
            for (f in t)
                fr(n + "[" + f + "]", t[f], r, u)
    }
    function bf(n) {
        return function(t, i) {
            typeof t != "string" && (i = t,
            t = "*");
            var r, f = 0, e = t.toLowerCase().match(a) || [];
            if (u(i))
                while (r = e[f++])
                    r[0] === "+" ? (r = r.slice(1) || "*",
                    (n[r] = n[r] || []).unshift(i)) : (n[r] = n[r] || []).push(i)
        }
    }
    function kf(n, t, r, u) {
        function e(s) {
            var h;
            return f[s] = !0,
            i.each(n[s] || [], function(n, i) {
                var s = i(t, r, u);
                if (typeof s != "string" || o || f[s]) {
                    if (o)
                        return !(h = s)
                } else
                    return t.dataTypes.unshift(s),
                    e(s),
                    !1
            }),
            h
        }
        var f = {}
          , o = n === er;
        return e(t.dataTypes[0]) || !f["*"] && e("*")
    }
    function sr(n, t) {
        var r, u, f = i.ajaxSettings.flatOptions || {};
        for (r in t)
            t[r] !== undefined && ((f[r] ? n : u || (u = {}))[r] = t[r]);
        return u && i.extend(!0, n, u),
        n
    }
    function bo(n, t, i) {
        for (var e, u, f, o, s = n.contents, r = n.dataTypes; r[0] === "*"; )
            r.shift(),
            e === undefined && (e = n.mimeType || t.getResponseHeader("Content-Type"));
        if (e)
            for (u in s)
                if (s[u] && s[u].test(e)) {
                    r.unshift(u);
                    break
                }
        if (r[0]in i)
            f = r[0];
        else {
            for (u in i) {
                if (!r[0] || n.converters[u + " " + r[0]]) {
                    f = u;
                    break
                }
                o || (o = u)
            }
            f = f || o
        }
        if (f)
            return f !== r[0] && r.unshift(f),
            i[f]
    }
    function ko(n, t, i, r) {
        var h, u, f, s, e, o = {}, c = n.dataTypes.slice();
        if (c[1])
            for (f in n.converters)
                o[f.toLowerCase()] = n.converters[f];
        for (u = c.shift(); u; )
            if (n.responseFields[u] && (i[n.responseFields[u]] = t),
            !e && r && n.dataFilter && (t = n.dataFilter(t, n.dataType)),
            e = u,
            u = c.shift(),
            u)
                if (u === "*")
                    u = e;
                else if (e !== "*" && e !== u) {
                    if (f = o[e + " " + u] || o["* " + u],
                    !f)
                        for (h in o)
                            if (s = h.split(" "),
                            s[1] === u && (f = o[e + " " + s[0]] || o["* " + s[0]],
                            f)) {
                                f === !0 ? f = o[h] : o[h] !== !0 && (u = s[0],
                                c.unshift(s[1]));
                                break
                            }
                    if (f !== !0)
                        if (f && n.throws)
                            t = f(t);
                        else
                            try {
                                t = f(t)
                            } catch (l) {
                                return {
                                    state: "parsererror",
                                    error: f ? l : "No conversion from " + e + " to " + u
                                }
                            }
                }
        return {
            state: "success",
            data: t
        }
    }
    var p = [], cr = Object.getPrototypeOf, k = p.slice, lr = p.flat ? function(n) {
        return p.flat.call(n)
    }
    : function(n) {
        return p.concat.apply([], n)
    }
    , li = p.push, ni = p.indexOf, ti = {}, ar = ti.toString, ii = ti.hasOwnProperty, vr = ii.toString, ie = vr.call(Object), e = {}, u = function(n) {
        return typeof n == "function" && typeof n.nodeType != "number"
    }, it = function(n) {
        return n != null && n === n.window
    }, f = n.document, re = {
        type: !0,
        src: !0,
        nonce: !0,
        noModule: !0
    }, pr = "3.5.1", i = function(n, t) {
        return new i.fn.init(n,t)
    }, d, vi, kr, dr, gr, nu, tu, a, uu, ui, et, bt, pi, c, cu, at, si, ff, ef, hf, vt, cf, lf, af, ir, rr, df, yt, hr, ci, gf, ne, te;
    i.fn = i.prototype = {
        jquery: pr,
        constructor: i,
        length: 0,
        toArray: function() {
            return k.call(this)
        },
        get: function(n) {
            return n == null ? k.call(this) : n < 0 ? this[n + this.length] : this[n]
        },
        pushStack: function(n) {
            var t = i.merge(this.constructor(), n);
            return t.prevObject = this,
            t
        },
        each: function(n) {
            return i.each(this, n)
        },
        map: function(n) {
            return this.pushStack(i.map(this, function(t, i) {
                return n.call(t, i, t)
            }))
        },
        slice: function() {
            return this.pushStack(k.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        even: function() {
            return this.pushStack(i.grep(this, function(n, t) {
                return (t + 1) % 2
            }))
        },
        odd: function() {
            return this.pushStack(i.grep(this, function(n, t) {
                return t % 2
            }))
        },
        eq: function(n) {
            var i = this.length
              , t = +n + (n < 0 ? i : 0);
            return this.pushStack(t >= 0 && t < i ? [this[t]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: li,
        sort: p.sort,
        splice: p.splice
    };
    i.extend = i.fn.extend = function() {
        var s, f, e, t, o, c, n = arguments[0] || {}, r = 1, l = arguments.length, h = !1;
        for (typeof n == "boolean" && (h = n,
        n = arguments[r] || {},
        r++),
        typeof n == "object" || u(n) || (n = {}),
        r === l && (n = this,
        r--); r < l; r++)
            if ((s = arguments[r]) != null)
                for (f in s)
                    (t = s[f],
                    f !== "__proto__" && n !== t) && (h && t && (i.isPlainObject(t) || (o = Array.isArray(t))) ? (e = n[f],
                    c = o && !Array.isArray(e) ? [] : o || i.isPlainObject(e) ? e : {},
                    o = !1,
                    n[f] = i.extend(h, c, t)) : t !== undefined && (n[f] = t));
        return n
    }
    ;
    i.extend({
        expando: "jQuery" + (pr + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(n) {
            throw new Error(n);
        },
        noop: function() {},
        isPlainObject: function(n) {
            var t, i;
            return !n || ar.call(n) !== "[object Object]" ? !1 : (t = cr(n),
            !t) ? !0 : (i = ii.call(t, "constructor") && t.constructor,
            typeof i == "function" && vr.call(i) === ie)
        },
        isEmptyObject: function(n) {
            for (var t in n)
                return !1;
            return !0
        },
        globalEval: function(n, t, i) {
            yr(n, {
                nonce: t && t.nonce
            }, i)
        },
        each: function(n, t) {
            var r, i = 0;
            if (ai(n)) {
                for (r = n.length; i < r; i++)
                    if (t.call(n[i], i, n[i]) === !1)
                        break
            } else
                for (i in n)
                    if (t.call(n[i], i, n[i]) === !1)
                        break;
            return n
        },
        makeArray: function(n, t) {
            var r = t || [];
            return n != null && (ai(Object(n)) ? i.merge(r, typeof n == "string" ? [n] : n) : li.call(r, n)),
            r
        },
        inArray: function(n, t, i) {
            return t == null ? -1 : ni.call(t, n, i)
        },
        merge: function(n, t) {
            for (var u = +t.length, i = 0, r = n.length; i < u; i++)
                n[r++] = t[i];
            return n.length = r,
            n
        },
        grep: function(n, t, i) {
            for (var u, f = [], r = 0, e = n.length, o = !i; r < e; r++)
                u = !t(n[r], r),
                u !== o && f.push(n[r]);
            return f
        },
        map: function(n, t, i) {
            var e, u, r = 0, f = [];
            if (ai(n))
                for (e = n.length; r < e; r++)
                    u = t(n[r], r, i),
                    u != null && f.push(u);
            else
                for (r in n)
                    u = t(n[r], r, i),
                    u != null && f.push(u);
            return lr(f)
        },
        guid: 1,
        support: e
    });
    typeof Symbol == "function" && (i.fn[Symbol.iterator] = p[Symbol.iterator]);
    i.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(n, t) {
        ti["[object " + t + "]"] = t.toLowerCase()
    });
    d = function(n) {
        function u(n, t, r, u) {
            var s, p, c, l, w, y, d, v = t && t.ownerDocument, a = t ? t.nodeType : 9;
            if (r = r || [],
            typeof n != "string" || !n || a !== 1 && a !== 9 && a !== 11)
                return r;
            if (!u && (b(t),
            t = t || i,
            h)) {
                if (a !== 11 && (w = ar.exec(n)))
                    if (s = w[1]) {
                        if (a === 9)
                            if (c = t.getElementById(s)) {
                                if (c.id === s)
                                    return r.push(c),
                                    r
                            } else
                                return r;
                        else if (v && (c = v.getElementById(s)) && et(t, c) && c.id === s)
                            return r.push(c),
                            r
                    } else {
                        if (w[2])
                            return k.apply(r, t.getElementsByTagName(n)),
                            r;
                        if ((s = w[3]) && f.getElementsByClassName && t.getElementsByClassName)
                            return k.apply(r, t.getElementsByClassName(s)),
                            r
                    }
                if (f.qsa && !lt[n + " "] && (!o || !o.test(n)) && (a !== 1 || t.nodeName.toLowerCase() !== "object")) {
                    if (d = n,
                    v = t,
                    a === 1 && (er.test(n) || yi.test(n))) {
                        for (v = ti.test(n) && ri(t.parentNode) || t,
                        v === t && f.scope || ((l = t.getAttribute("id")) ? l = l.replace(pi, wi) : t.setAttribute("id", l = e)),
                        y = ft(n),
                        p = y.length; p--; )
                            y[p] = (l ? "#" + l : ":scope") + " " + pt(y[p]);
                        d = y.join(",")
                    }
                    try {
                        return k.apply(r, v.querySelectorAll(d)),
                        r
                    } catch (g) {
                        lt(n, !0)
                    } finally {
                        l === e && t.removeAttribute("id")
                    }
                }
            }
            return si(n.replace(at, "$1"), t, r, u)
        }
        function yt() {
            function n(r, u) {
                return i.push(r + " ") > t.cacheLength && delete n[i.shift()],
                n[r + " "] = u
            }
            var i = [];
            return n
        }
        function l(n) {
            return n[e] = !0,
            n
        }
        function a(n) {
            var t = i.createElement("fieldset");
            try {
                return !!n(t)
            } catch (r) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t);
                t = null
            }
        }
        function ii(n, i) {
            for (var r = n.split("|"), u = r.length; u--; )
                t.attrHandle[r[u]] = i
        }
        function ki(n, t) {
            var i = t && n
              , r = i && n.nodeType === 1 && t.nodeType === 1 && n.sourceIndex - t.sourceIndex;
            if (r)
                return r;
            if (i)
                while (i = i.nextSibling)
                    if (i === t)
                        return -1;
            return n ? 1 : -1
        }
        function yr(n) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return i === "input" && t.type === n
            }
        }
        function pr(n) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return (i === "input" || i === "button") && t.type === n
            }
        }
        function di(n) {
            return function(t) {
                return "form"in t ? t.parentNode && t.disabled === !1 ? "label"in t ? "label"in t.parentNode ? t.parentNode.disabled === n : t.disabled === n : t.isDisabled === n || t.isDisabled !== !n && vr(t) === n : t.disabled === n : "label"in t ? t.disabled === n : !1
            }
        }
        function it(n) {
            return l(function(t) {
                return t = +t,
                l(function(i, r) {
                    for (var u, f = n([], i.length, t), e = f.length; e--; )
                        i[u = f[e]] && (i[u] = !(r[u] = i[u]))
                })
            })
        }
        function ri(n) {
            return n && typeof n.getElementsByTagName != "undefined" && n
        }
        function gi() {}
        function pt(n) {
            for (var t = 0, r = n.length, i = ""; t < r; t++)
                i += n[t].value;
            return i
        }
        function wt(n, t, i) {
            var r = t.dir
              , u = t.next
              , f = u || r
              , o = i && f === "parentNode"
              , s = nr++;
            return t.first ? function(t, i, u) {
                while (t = t[r])
                    if (t.nodeType === 1 || o)
                        return n(t, i, u);
                return !1
            }
            : function(t, i, h) {
                var c, l, a, y = [v, s];
                if (h) {
                    while (t = t[r])
                        if ((t.nodeType === 1 || o) && n(t, i, h))
                            return !0
                } else
                    while (t = t[r])
                        if (t.nodeType === 1 || o)
                            if (a = t[e] || (t[e] = {}),
                            l = a[t.uniqueID] || (a[t.uniqueID] = {}),
                            u && u === t.nodeName.toLowerCase())
                                t = t[r] || t;
                            else {
                                if ((c = l[f]) && c[0] === v && c[1] === s)
                                    return y[2] = c[2];
                                if (l[f] = y,
                                y[2] = n(t, i, h))
                                    return !0
                            }
                return !1
            }
        }
        function ui(n) {
            return n.length > 1 ? function(t, i, r) {
                for (var u = n.length; u--; )
                    if (!n[u](t, i, r))
                        return !1;
                return !0
            }
            : n[0]
        }
        function wr(n, t, i) {
            for (var r = 0, f = t.length; r < f; r++)
                u(n, t[r], i);
            return i
        }
        function bt(n, t, i, r, u) {
            for (var e, o = [], f = 0, s = n.length, h = t != null; f < s; f++)
                (e = n[f]) && (!i || i(e, r, u)) && (o.push(e),
                h && t.push(f));
            return o
        }
        function fi(n, t, i, r, u, f) {
            return r && !r[e] && (r = fi(r)),
            u && !u[e] && (u = fi(u, f)),
            l(function(f, e, o, s) {
                var l, c, a, p = [], y = [], w = e.length, b = f || wr(t || "*", o.nodeType ? [o] : o, []), v = n && (f || !t) ? bt(b, p, n, o, s) : b, h = i ? u || (f ? n : w || r) ? [] : e : v;
                if (i && i(v, h, o, s),
                r)
                    for (l = bt(h, y),
                    r(l, [], o, s),
                    c = l.length; c--; )
                        (a = l[c]) && (h[y[c]] = !(v[y[c]] = a));
                if (f) {
                    if (u || n) {
                        if (u) {
                            for (l = [],
                            c = h.length; c--; )
                                (a = h[c]) && l.push(v[c] = a);
                            u(null, h = [], l, s)
                        }
                        for (c = h.length; c--; )
                            (a = h[c]) && (l = u ? nt(f, a) : p[c]) > -1 && (f[l] = !(e[l] = a))
                    }
                } else
                    h = bt(h === e ? h.splice(w, h.length) : h),
                    u ? u(null, e, h, s) : k.apply(e, h)
            })
        }
        function ei(n) {
            for (var o, u, r, s = n.length, h = t.relative[n[0].type], c = h || t.relative[" "], i = h ? 1 : 0, l = wt(function(n) {
                return n === o
            }, c, !0), a = wt(function(n) {
                return nt(o, n) > -1
            }, c, !0), f = [function(n, t, i) {
                var r = !h && (i || t !== ht) || ((o = t).nodeType ? l(n, t, i) : a(n, t, i));
                return o = null,
                r
            }
            ]; i < s; i++)
                if (u = t.relative[n[i].type])
                    f = [wt(ui(f), u)];
                else {
                    if (u = t.filter[n[i].type].apply(null, n[i].matches),
                    u[e]) {
                        for (r = ++i; r < s; r++)
                            if (t.relative[n[r].type])
                                break;
                        return fi(i > 1 && ui(f), i > 1 && pt(n.slice(0, i - 1).concat({
                            value: n[i - 2].type === " " ? "*" : ""
                        })).replace(at, "$1"), u, i < r && ei(n.slice(i, r)), r < s && ei(n = n.slice(r)), r < s && pt(n))
                    }
                    f.push(u)
                }
            return ui(f)
        }
        function br(n, r) {
            var f = r.length > 0
              , e = n.length > 0
              , o = function(o, s, c, l, a) {
                var y, nt, d, g = 0, p = "0", tt = o && [], w = [], it = ht, rt = o || e && t.find.TAG("*", a), ut = v += it == null ? 1 : Math.random() || .1, ft = rt.length;
                for (a && (ht = s == i || s || a); p !== ft && (y = rt[p]) != null; p++) {
                    if (e && y) {
                        for (nt = 0,
                        s || y.ownerDocument == i || (b(y),
                        c = !h); d = n[nt++]; )
                            if (d(y, s || i, c)) {
                                l.push(y);
                                break
                            }
                        a && (v = ut)
                    }
                    f && ((y = !d && y) && g--,
                    o && tt.push(y))
                }
                if (g += p,
                f && p !== g) {
                    for (nt = 0; d = r[nt++]; )
                        d(tt, w, s, c);
                    if (o) {
                        if (g > 0)
                            while (p--)
                                tt[p] || w[p] || (w[p] = ir.call(l));
                        w = bt(w)
                    }
                    k.apply(l, w);
                    a && !o && w.length > 0 && g + r.length > 1 && u.uniqueSort(l)
                }
                return a && (v = ut,
                ht = it),
                tt
            };
            return f ? l(o) : o
        }
        var rt, f, t, st, oi, ft, kt, si, ht, w, ut, b, i, s, h, o, d, ct, et, e = "sizzle" + 1 * new Date, c = n.document, v = 0, nr = 0, hi = yt(), ci = yt(), li = yt(), lt = yt(), dt = function(n, t) {
            return n === t && (ut = !0),
            0
        }, tr = {}.hasOwnProperty, g = [], ir = g.pop, rr = g.push, k = g.push, ai = g.slice, nt = function(n, t) {
            for (var i = 0, r = n.length; i < r; i++)
                if (n[i] === t)
                    return i;
            return -1
        }, gt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", r = "[\\x20\\t\\r\\n\\f]", tt = "(?:\\\\[\\da-fA-F]{1,6}" + r + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", vi = "\\[" + r + "*(" + tt + ")(?:" + r + "*([*^$|!~]?=)" + r + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + tt + "))|)" + r + "*\\]", ni = ":(" + tt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + vi + ")*)|.*)\\)|)", ur = new RegExp(r + "+","g"), at = new RegExp("^" + r + "+|((?:^|[^\\\\])(?:\\\\.)*)" + r + "+$","g"), fr = new RegExp("^" + r + "*," + r + "*"), yi = new RegExp("^" + r + "*([>+~]|" + r + ")" + r + "*"), er = new RegExp(r + "|>"), or = new RegExp(ni), sr = new RegExp("^" + tt + "$"), vt = {
            ID: new RegExp("^#(" + tt + ")"),
            CLASS: new RegExp("^\\.(" + tt + ")"),
            TAG: new RegExp("^(" + tt + "|[*])"),
            ATTR: new RegExp("^" + vi),
            PSEUDO: new RegExp("^" + ni),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + r + "*(even|odd|(([+-]|)(\\d*)n|)" + r + "*(?:([+-]|)" + r + "*(\\d+)|))" + r + "*\\)|)","i"),
            bool: new RegExp("^(?:" + gt + ")$","i"),
            needsContext: new RegExp("^" + r + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + r + "*((?:-\\d)?\\d*)" + r + "*\\)|)(?=[^-]|$)","i")
        }, hr = /HTML$/i, cr = /^(?:input|select|textarea|button)$/i, lr = /^h\d$/i, ot = /^[^{]+\{\s*\[native \w/, ar = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ti = /[+~]/, y = new RegExp("\\\\[\\da-fA-F]{1,6}" + r + "?|\\\\([^\\r\\n\\f])","g"), p = function(n, t) {
            var i = "0x" + n.slice(1) - 65536;
            return t ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, i & 1023 | 56320)
        }, pi = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, wi = function(n, t) {
            return t ? n === "\0" ? "�" : n.slice(0, -1) + "\\" + n.charCodeAt(n.length - 1).toString(16) + " " : "\\" + n
        }, bi = function() {
            b()
        }, vr = wt(function(n) {
            return n.disabled === !0 && n.nodeName.toLowerCase() === "fieldset"
        }, {
            dir: "parentNode",
            next: "legend"
        });
        try {
            k.apply(g = ai.call(c.childNodes), c.childNodes);
            g[c.childNodes.length].nodeType
        } catch (kr) {
            k = {
                apply: g.length ? function(n, t) {
                    rr.apply(n, ai.call(t))
                }
                : function(n, t) {
                    for (var i = n.length, r = 0; n[i++] = t[r++]; )
                        ;
                    n.length = i - 1
                }
            }
        }
        f = u.support = {};
        oi = u.isXML = function(n) {
            var i = n.namespaceURI
              , t = (n.ownerDocument || n).documentElement;
            return !hr.test(i || t && t.nodeName || "HTML")
        }
        ;
        b = u.setDocument = function(n) {
            var v, u, l = n ? n.ownerDocument || n : c;
            return l == i || l.nodeType !== 9 || !l.documentElement ? i : (i = l,
            s = i.documentElement,
            h = !oi(i),
            c != i && (u = i.defaultView) && u.top !== u && (u.addEventListener ? u.addEventListener("unload", bi, !1) : u.attachEvent && u.attachEvent("onunload", bi)),
            f.scope = a(function(n) {
                return s.appendChild(n).appendChild(i.createElement("div")),
                typeof n.querySelectorAll != "undefined" && !n.querySelectorAll(":scope fieldset div").length
            }),
            f.attributes = a(function(n) {
                return n.className = "i",
                !n.getAttribute("className")
            }),
            f.getElementsByTagName = a(function(n) {
                return n.appendChild(i.createComment("")),
                !n.getElementsByTagName("*").length
            }),
            f.getElementsByClassName = ot.test(i.getElementsByClassName),
            f.getById = a(function(n) {
                return s.appendChild(n).id = e,
                !i.getElementsByName || !i.getElementsByName(e).length
            }),
            f.getById ? (t.filter.ID = function(n) {
                var t = n.replace(y, p);
                return function(n) {
                    return n.getAttribute("id") === t
                }
            }
            ,
            t.find.ID = function(n, t) {
                if (typeof t.getElementById != "undefined" && h) {
                    var i = t.getElementById(n);
                    return i ? [i] : []
                }
            }
            ) : (t.filter.ID = function(n) {
                var t = n.replace(y, p);
                return function(n) {
                    var i = typeof n.getAttributeNode != "undefined" && n.getAttributeNode("id");
                    return i && i.value === t
                }
            }
            ,
            t.find.ID = function(n, t) {
                if (typeof t.getElementById != "undefined" && h) {
                    var i, u, f, r = t.getElementById(n);
                    if (r) {
                        if (i = r.getAttributeNode("id"),
                        i && i.value === n)
                            return [r];
                        for (f = t.getElementsByName(n),
                        u = 0; r = f[u++]; )
                            if (i = r.getAttributeNode("id"),
                            i && i.value === n)
                                return [r]
                    }
                    return []
                }
            }
            ),
            t.find.TAG = f.getElementsByTagName ? function(n, t) {
                return typeof t.getElementsByTagName != "undefined" ? t.getElementsByTagName(n) : f.qsa ? t.querySelectorAll(n) : void 0
            }
            : function(n, t) {
                var i, r = [], f = 0, u = t.getElementsByTagName(n);
                if (n === "*") {
                    while (i = u[f++])
                        i.nodeType === 1 && r.push(i);
                    return r
                }
                return u
            }
            ,
            t.find.CLASS = f.getElementsByClassName && function(n, t) {
                if (typeof t.getElementsByClassName != "undefined" && h)
                    return t.getElementsByClassName(n)
            }
            ,
            d = [],
            o = [],
            (f.qsa = ot.test(i.querySelectorAll)) && (a(function(n) {
                var t;
                s.appendChild(n).innerHTML = "<a id='" + e + "'><\/a><select id='" + e + "-\r\\' msallowcapture=''><option selected=''><\/option><\/select>";
                n.querySelectorAll("[msallowcapture^='']").length && o.push("[*^$]=" + r + "*(?:''|\"\")");
                n.querySelectorAll("[selected]").length || o.push("\\[" + r + "*(?:value|" + gt + ")");
                n.querySelectorAll("[id~=" + e + "-]").length || o.push("~=");
                t = i.createElement("input");
                t.setAttribute("name", "");
                n.appendChild(t);
                n.querySelectorAll("[name='']").length || o.push("\\[" + r + "*name" + r + "*=" + r + "*(?:''|\"\")");
                n.querySelectorAll(":checked").length || o.push(":checked");
                n.querySelectorAll("a#" + e + "+*").length || o.push(".#.+[+~]");
                n.querySelectorAll("\\\f");
                o.push("[\\r\\n\\f]")
            }),
            a(function(n) {
                n.innerHTML = "<a href='' disabled='disabled'><\/a><select disabled='disabled'><option/><\/select>";
                var t = i.createElement("input");
                t.setAttribute("type", "hidden");
                n.appendChild(t).setAttribute("name", "D");
                n.querySelectorAll("[name=d]").length && o.push("name" + r + "*[*^$|!~]?=");
                n.querySelectorAll(":enabled").length !== 2 && o.push(":enabled", ":disabled");
                s.appendChild(n).disabled = !0;
                n.querySelectorAll(":disabled").length !== 2 && o.push(":enabled", ":disabled");
                n.querySelectorAll("*,:x");
                o.push(",.*:")
            })),
            (f.matchesSelector = ot.test(ct = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector)) && a(function(n) {
                f.disconnectedMatch = ct.call(n, "*");
                ct.call(n, "[s!='']:x");
                d.push("!=", ni)
            }),
            o = o.length && new RegExp(o.join("|")),
            d = d.length && new RegExp(d.join("|")),
            v = ot.test(s.compareDocumentPosition),
            et = v || ot.test(s.contains) ? function(n, t) {
                var r = n.nodeType === 9 ? n.documentElement : n
                  , i = t && t.parentNode;
                return n === i || !!(i && i.nodeType === 1 && (r.contains ? r.contains(i) : n.compareDocumentPosition && n.compareDocumentPosition(i) & 16))
            }
            : function(n, t) {
                if (t)
                    while (t = t.parentNode)
                        if (t === n)
                            return !0;
                return !1
            }
            ,
            dt = v ? function(n, t) {
                if (n === t)
                    return ut = !0,
                    0;
                var r = !n.compareDocumentPosition - !t.compareDocumentPosition;
                return r ? r : (r = (n.ownerDocument || n) == (t.ownerDocument || t) ? n.compareDocumentPosition(t) : 1,
                r & 1 || !f.sortDetached && t.compareDocumentPosition(n) === r) ? n == i || n.ownerDocument == c && et(c, n) ? -1 : t == i || t.ownerDocument == c && et(c, t) ? 1 : w ? nt(w, n) - nt(w, t) : 0 : r & 4 ? -1 : 1
            }
            : function(n, t) {
                if (n === t)
                    return ut = !0,
                    0;
                var r, u = 0, o = n.parentNode, s = t.parentNode, f = [n], e = [t];
                if (o && s) {
                    if (o === s)
                        return ki(n, t)
                } else
                    return n == i ? -1 : t == i ? 1 : o ? -1 : s ? 1 : w ? nt(w, n) - nt(w, t) : 0;
                for (r = n; r = r.parentNode; )
                    f.unshift(r);
                for (r = t; r = r.parentNode; )
                    e.unshift(r);
                while (f[u] === e[u])
                    u++;
                return u ? ki(f[u], e[u]) : f[u] == c ? -1 : e[u] == c ? 1 : 0
            }
            ,
            i)
        }
        ;
        u.matches = function(n, t) {
            return u(n, null, null, t)
        }
        ;
        u.matchesSelector = function(n, t) {
            if (b(n),
            f.matchesSelector && h && !lt[t + " "] && (!d || !d.test(t)) && (!o || !o.test(t)))
                try {
                    var r = ct.call(n, t);
                    if (r || f.disconnectedMatch || n.document && n.document.nodeType !== 11)
                        return r
                } catch (e) {
                    lt(t, !0)
                }
            return u(t, i, null, [n]).length > 0
        }
        ;
        u.contains = function(n, t) {
            return (n.ownerDocument || n) != i && b(n),
            et(n, t)
        }
        ;
        u.attr = function(n, r) {
            (n.ownerDocument || n) != i && b(n);
            var e = t.attrHandle[r.toLowerCase()]
              , u = e && tr.call(t.attrHandle, r.toLowerCase()) ? e(n, r, !h) : undefined;
            return u !== undefined ? u : f.attributes || !h ? n.getAttribute(r) : (u = n.getAttributeNode(r)) && u.specified ? u.value : null
        }
        ;
        u.escape = function(n) {
            return (n + "").replace(pi, wi)
        }
        ;
        u.error = function(n) {
            throw new Error("Syntax error, unrecognized expression: " + n);
        }
        ;
        u.uniqueSort = function(n) {
            var r, u = [], t = 0, i = 0;
            if (ut = !f.detectDuplicates,
            w = !f.sortStable && n.slice(0),
            n.sort(dt),
            ut) {
                while (r = n[i++])
                    r === n[i] && (t = u.push(i));
                while (t--)
                    n.splice(u[t], 1)
            }
            return w = null,
            n
        }
        ;
        st = u.getText = function(n) {
            var r, i = "", u = 0, t = n.nodeType;
            if (t) {
                if (t === 1 || t === 9 || t === 11) {
                    if (typeof n.textContent == "string")
                        return n.textContent;
                    for (n = n.firstChild; n; n = n.nextSibling)
                        i += st(n)
                } else if (t === 3 || t === 4)
                    return n.nodeValue
            } else
                while (r = n[u++])
                    i += st(r);
            return i
        }
        ;
        t = u.selectors = {
            cacheLength: 50,
            createPseudo: l,
            match: vt,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(n) {
                    return n[1] = n[1].replace(y, p),
                    n[3] = (n[3] || n[4] || n[5] || "").replace(y, p),
                    n[2] === "~=" && (n[3] = " " + n[3] + " "),
                    n.slice(0, 4)
                },
                CHILD: function(n) {
                    return n[1] = n[1].toLowerCase(),
                    n[1].slice(0, 3) === "nth" ? (n[3] || u.error(n[0]),
                    n[4] = +(n[4] ? n[5] + (n[6] || 1) : 2 * (n[3] === "even" || n[3] === "odd")),
                    n[5] = +(n[7] + n[8] || n[3] === "odd")) : n[3] && u.error(n[0]),
                    n
                },
                PSEUDO: function(n) {
                    var i, t = !n[6] && n[2];
                    return vt.CHILD.test(n[0]) ? null : (n[3] ? n[2] = n[4] || n[5] || "" : t && or.test(t) && (i = ft(t, !0)) && (i = t.indexOf(")", t.length - i) - t.length) && (n[0] = n[0].slice(0, i),
                    n[2] = t.slice(0, i)),
                    n.slice(0, 3))
                }
            },
            filter: {
                TAG: function(n) {
                    var t = n.replace(y, p).toLowerCase();
                    return n === "*" ? function() {
                        return !0
                    }
                    : function(n) {
                        return n.nodeName && n.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(n) {
                    var t = hi[n + " "];
                    return t || (t = new RegExp("(^|" + r + ")" + n + "(" + r + "|$)")) && hi(n, function(n) {
                        return t.test(typeof n.className == "string" && n.className || typeof n.getAttribute != "undefined" && n.getAttribute("class") || "")
                    })
                },
                ATTR: function(n, t, i) {
                    return function(r) {
                        var f = u.attr(r, n);
                        return f == null ? t === "!=" : t ? (f += "",
                        t === "=" ? f === i : t === "!=" ? f !== i : t === "^=" ? i && f.indexOf(i) === 0 : t === "*=" ? i && f.indexOf(i) > -1 : t === "$=" ? i && f.slice(-i.length) === i : t === "~=" ? (" " + f.replace(ur, " ") + " ").indexOf(i) > -1 : t === "|=" ? f === i || f.slice(0, i.length + 1) === i + "-" : !1) : !0
                    }
                },
                CHILD: function(n, t, i, r, u) {
                    var s = n.slice(0, 3) !== "nth"
                      , o = n.slice(-4) !== "last"
                      , f = t === "of-type";
                    return r === 1 && u === 0 ? function(n) {
                        return !!n.parentNode
                    }
                    : function(t, i, h) {
                        var p, w, y, c, a, b, k = s !== o ? "nextSibling" : "previousSibling", d = t.parentNode, nt = f && t.nodeName.toLowerCase(), g = !h && !f, l = !1;
                        if (d) {
                            if (s) {
                                while (k) {
                                    for (c = t; c = c[k]; )
                                        if (f ? c.nodeName.toLowerCase() === nt : c.nodeType === 1)
                                            return !1;
                                    b = k = n === "only" && !b && "nextSibling"
                                }
                                return !0
                            }
                            if (b = [o ? d.firstChild : d.lastChild],
                            o && g) {
                                for (c = d,
                                y = c[e] || (c[e] = {}),
                                w = y[c.uniqueID] || (y[c.uniqueID] = {}),
                                p = w[n] || [],
                                a = p[0] === v && p[1],
                                l = a && p[2],
                                c = a && d.childNodes[a]; c = ++a && c && c[k] || (l = a = 0) || b.pop(); )
                                    if (c.nodeType === 1 && ++l && c === t) {
                                        w[n] = [v, a, l];
                                        break
                                    }
                            } else if (g && (c = t,
                            y = c[e] || (c[e] = {}),
                            w = y[c.uniqueID] || (y[c.uniqueID] = {}),
                            p = w[n] || [],
                            a = p[0] === v && p[1],
                            l = a),
                            l === !1)
                                while (c = ++a && c && c[k] || (l = a = 0) || b.pop())
                                    if ((f ? c.nodeName.toLowerCase() === nt : c.nodeType === 1) && ++l && (g && (y = c[e] || (c[e] = {}),
                                    w = y[c.uniqueID] || (y[c.uniqueID] = {}),
                                    w[n] = [v, l]),
                                    c === t))
                                        break;
                            return l -= u,
                            l === r || l % r == 0 && l / r >= 0
                        }
                    }
                },
                PSEUDO: function(n, i) {
                    var f, r = t.pseudos[n] || t.setFilters[n.toLowerCase()] || u.error("unsupported pseudo: " + n);
                    return r[e] ? r(i) : r.length > 1 ? (f = [n, n, "", i],
                    t.setFilters.hasOwnProperty(n.toLowerCase()) ? l(function(n, t) {
                        for (var u, f = r(n, i), e = f.length; e--; )
                            u = nt(n, f[e]),
                            n[u] = !(t[u] = f[e])
                    }) : function(n) {
                        return r(n, 0, f)
                    }
                    ) : r
                }
            },
            pseudos: {
                not: l(function(n) {
                    var t = []
                      , r = []
                      , i = kt(n.replace(at, "$1"));
                    return i[e] ? l(function(n, t, r, u) {
                        for (var e, o = i(n, null, u, []), f = n.length; f--; )
                            (e = o[f]) && (n[f] = !(t[f] = e))
                    }) : function(n, u, f) {
                        return t[0] = n,
                        i(t, null, f, r),
                        t[0] = null,
                        !r.pop()
                    }
                }),
                has: l(function(n) {
                    return function(t) {
                        return u(n, t).length > 0
                    }
                }),
                contains: l(function(n) {
                    return n = n.replace(y, p),
                    function(t) {
                        return (t.textContent || st(t)).indexOf(n) > -1
                    }
                }),
                lang: l(function(n) {
                    return sr.test(n || "") || u.error("unsupported lang: " + n),
                    n = n.replace(y, p).toLowerCase(),
                    function(t) {
                        var i;
                        do
                            if (i = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                return i = i.toLowerCase(),
                                i === n || i.indexOf(n + "-") === 0;
                        while ((t = t.parentNode) && t.nodeType === 1);
                        return !1
                    }
                }),
                target: function(t) {
                    var i = n.location && n.location.hash;
                    return i && i.slice(1) === t.id
                },
                root: function(n) {
                    return n === s
                },
                focus: function(n) {
                    return n === i.activeElement && (!i.hasFocus || i.hasFocus()) && !!(n.type || n.href || ~n.tabIndex)
                },
                enabled: di(!1),
                disabled: di(!0),
                checked: function(n) {
                    var t = n.nodeName.toLowerCase();
                    return t === "input" && !!n.checked || t === "option" && !!n.selected
                },
                selected: function(n) {
                    return n.parentNode && n.parentNode.selectedIndex,
                    n.selected === !0
                },
                empty: function(n) {
                    for (n = n.firstChild; n; n = n.nextSibling)
                        if (n.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(n) {
                    return !t.pseudos.empty(n)
                },
                header: function(n) {
                    return lr.test(n.nodeName)
                },
                input: function(n) {
                    return cr.test(n.nodeName)
                },
                button: function(n) {
                    var t = n.nodeName.toLowerCase();
                    return t === "input" && n.type === "button" || t === "button"
                },
                text: function(n) {
                    var t;
                    return n.nodeName.toLowerCase() === "input" && n.type === "text" && ((t = n.getAttribute("type")) == null || t.toLowerCase() === "text")
                },
                first: it(function() {
                    return [0]
                }),
                last: it(function(n, t) {
                    return [t - 1]
                }),
                eq: it(function(n, t, i) {
                    return [i < 0 ? i + t : i]
                }),
                even: it(function(n, t) {
                    for (var i = 0; i < t; i += 2)
                        n.push(i);
                    return n
                }),
                odd: it(function(n, t) {
                    for (var i = 1; i < t; i += 2)
                        n.push(i);
                    return n
                }),
                lt: it(function(n, t, i) {
                    for (var r = i < 0 ? i + t : i > t ? t : i; --r >= 0; )
                        n.push(r);
                    return n
                }),
                gt: it(function(n, t, i) {
                    for (var r = i < 0 ? i + t : i; ++r < t; )
                        n.push(r);
                    return n
                })
            }
        };
        t.pseudos.nth = t.pseudos.eq;
        for (rt in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            t.pseudos[rt] = yr(rt);
        for (rt in {
            submit: !0,
            reset: !0
        })
            t.pseudos[rt] = pr(rt);
        return gi.prototype = t.filters = t.pseudos,
        t.setFilters = new gi,
        ft = u.tokenize = function(n, i) {
            var e, f, s, o, r, h, c, l = ci[n + " "];
            if (l)
                return i ? 0 : l.slice(0);
            for (r = n,
            h = [],
            c = t.preFilter; r; ) {
                (!e || (f = fr.exec(r))) && (f && (r = r.slice(f[0].length) || r),
                h.push(s = []));
                e = !1;
                (f = yi.exec(r)) && (e = f.shift(),
                s.push({
                    value: e,
                    type: f[0].replace(at, " ")
                }),
                r = r.slice(e.length));
                for (o in t.filter)
                    (f = vt[o].exec(r)) && (!c[o] || (f = c[o](f))) && (e = f.shift(),
                    s.push({
                        value: e,
                        type: o,
                        matches: f
                    }),
                    r = r.slice(e.length));
                if (!e)
                    break
            }
            return i ? r.length : r ? u.error(n) : ci(n, h).slice(0)
        }
        ,
        kt = u.compile = function(n, t) {
            var r, u = [], f = [], i = li[n + " "];
            if (!i) {
                for (t || (t = ft(n)),
                r = t.length; r--; )
                    i = ei(t[r]),
                    i[e] ? u.push(i) : f.push(i);
                i = li(n, br(f, u));
                i.selector = n
            }
            return i
        }
        ,
        si = u.select = function(n, i, r, u) {
            var o, f, e, l, a, c = typeof n == "function" && n, s = !u && ft(n = c.selector || n);
            if (r = r || [],
            s.length === 1) {
                if (f = s[0] = s[0].slice(0),
                f.length > 2 && (e = f[0]).type === "ID" && i.nodeType === 9 && h && t.relative[f[1].type]) {
                    if (i = (t.find.ID(e.matches[0].replace(y, p), i) || [])[0],
                    i)
                        c && (i = i.parentNode);
                    else
                        return r;
                    n = n.slice(f.shift().value.length)
                }
                for (o = vt.needsContext.test(n) ? 0 : f.length; o--; ) {
                    if (e = f[o],
                    t.relative[l = e.type])
                        break;
                    if ((a = t.find[l]) && (u = a(e.matches[0].replace(y, p), ti.test(f[0].type) && ri(i.parentNode) || i))) {
                        if (f.splice(o, 1),
                        n = u.length && pt(f),
                        !n)
                            return k.apply(r, u),
                            r;
                        break
                    }
                }
            }
            return (c || kt(n, s))(u, i, !h, r, !i || ti.test(n) && ri(i.parentNode) || i),
            r
        }
        ,
        f.sortStable = e.split("").sort(dt).join("") === e,
        f.detectDuplicates = !!ut,
        b(),
        f.sortDetached = a(function(n) {
            return n.compareDocumentPosition(i.createElement("fieldset")) & 1
        }),
        a(function(n) {
            return n.innerHTML = "<a href='#'><\/a>",
            n.firstChild.getAttribute("href") === "#"
        }) || ii("type|href|height|width", function(n, t, i) {
            if (!i)
                return n.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2)
        }),
        f.attributes && a(function(n) {
            return n.innerHTML = "<input/>",
            n.firstChild.setAttribute("value", ""),
            n.firstChild.getAttribute("value") === ""
        }) || ii("value", function(n, t, i) {
            if (!i && n.nodeName.toLowerCase() === "input")
                return n.defaultValue
        }),
        a(function(n) {
            return n.getAttribute("disabled") == null
        }) || ii(gt, function(n, t, i) {
            var r;
            if (!i)
                return n[t] === !0 ? t.toLowerCase() : (r = n.getAttributeNode(t)) && r.specified ? r.value : null
        }),
        u
    }(n);
    i.find = d;
    i.expr = d.selectors;
    i.expr[":"] = i.expr.pseudos;
    i.uniqueSort = i.unique = d.uniqueSort;
    i.text = d.getText;
    i.isXMLDoc = d.isXML;
    i.contains = d.contains;
    i.escapeSelector = d.escape;
    var ut = function(n, t, r) {
        for (var u = [], f = r !== undefined; (n = n[t]) && n.nodeType !== 9; )
            if (n.nodeType === 1) {
                if (f && i(n).is(r))
                    break;
                u.push(n)
            }
        return u
    }
      , wr = function(n, t) {
        for (var i = []; n; n = n.nextSibling)
            n.nodeType === 1 && n !== t && i.push(n);
        return i
    }
      , br = i.expr.match.needsContext;
    vi = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    i.filter = function(n, t, r) {
        var u = t[0];
        return (r && (n = ":not(" + n + ")"),
        t.length === 1 && u.nodeType === 1) ? i.find.matchesSelector(u, n) ? [u] : [] : i.find.matches(n, i.grep(t, function(n) {
            return n.nodeType === 1
        }))
    }
    ;
    i.fn.extend({
        find: function(n) {
            var t, r, u = this.length, f = this;
            if (typeof n != "string")
                return this.pushStack(i(n).filter(function() {
                    for (t = 0; t < u; t++)
                        if (i.contains(f[t], this))
                            return !0
                }));
            for (r = this.pushStack([]),
            t = 0; t < u; t++)
                i.find(n, f[t], r);
            return u > 1 ? i.uniqueSort(r) : r
        },
        filter: function(n) {
            return this.pushStack(yi(this, n || [], !1))
        },
        not: function(n) {
            return this.pushStack(yi(this, n || [], !0))
        },
        is: function(n) {
            return !!yi(this, typeof n == "string" && br.test(n) ? i(n) : n || [], !1).length
        }
    });
    dr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    gr = i.fn.init = function(n, t, r) {
        var e, o;
        if (!n)
            return this;
        if (r = r || kr,
        typeof n == "string") {
            if (e = n[0] === "<" && n[n.length - 1] === ">" && n.length >= 3 ? [null, n, null] : dr.exec(n),
            e && (e[1] || !t)) {
                if (e[1]) {
                    if (t = t instanceof i ? t[0] : t,
                    i.merge(this, i.parseHTML(e[1], t && t.nodeType ? t.ownerDocument || t : f, !0)),
                    vi.test(e[1]) && i.isPlainObject(t))
                        for (e in t)
                            u(this[e]) ? this[e](t[e]) : this.attr(e, t[e]);
                    return this
                }
                return o = f.getElementById(e[2]),
                o && (this[0] = o,
                this.length = 1),
                this
            }
            return !t || t.jquery ? (t || r).find(n) : this.constructor(t).find(n)
        }
        return n.nodeType ? (this[0] = n,
        this.length = 1,
        this) : u(n) ? r.ready !== undefined ? r.ready(n) : n(i) : i.makeArray(n, this)
    }
    ;
    gr.prototype = i.fn;
    kr = i(f);
    nu = /^(?:parents|prev(?:Until|All))/;
    tu = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    i.fn.extend({
        has: function(n) {
            var t = i(n, this)
              , r = t.length;
            return this.filter(function() {
                for (var n = 0; n < r; n++)
                    if (i.contains(this, t[n]))
                        return !0
            })
        },
        closest: function(n, t) {
            var r, f = 0, o = this.length, u = [], e = typeof n != "string" && i(n);
            if (!br.test(n))
                for (; f < o; f++)
                    for (r = this[f]; r && r !== t; r = r.parentNode)
                        if (r.nodeType < 11 && (e ? e.index(r) > -1 : r.nodeType === 1 && i.find.matchesSelector(r, n))) {
                            u.push(r);
                            break
                        }
            return this.pushStack(u.length > 1 ? i.uniqueSort(u) : u)
        },
        index: function(n) {
            return n ? typeof n == "string" ? ni.call(i(n), this[0]) : ni.call(this, n.jquery ? n[0] : n) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(n, t) {
            return this.pushStack(i.uniqueSort(i.merge(this.get(), i(n, t))))
        },
        addBack: function(n) {
            return this.add(n == null ? this.prevObject : this.prevObject.filter(n))
        }
    });
    i.fn.addSelf = i.fn.addBack;
    i.each({
        parent: function(n) {
            var t = n.parentNode;
            return t && t.nodeType !== 11 ? t : null
        },
        parents: function(n) {
            return ut(n, "parentNode")
        },
        parentsUntil: function(n, t, i) {
            return ut(n, "parentNode", i)
        },
        next: function(n) {
            return iu(n, "nextSibling")
        },
        prev: function(n) {
            return iu(n, "previousSibling")
        },
        nextAll: function(n) {
            return ut(n, "nextSibling")
        },
        prevAll: function(n) {
            return ut(n, "previousSibling")
        },
        nextUntil: function(n, t, i) {
            return ut(n, "nextSibling", i)
        },
        prevUntil: function(n, t, i) {
            return ut(n, "previousSibling", i)
        },
        siblings: function(n) {
            return wr((n.parentNode || {}).firstChild, n)
        },
        children: function(n) {
            return wr(n.firstChild)
        },
        contents: function(n) {
            return n.contentDocument != null && cr(n.contentDocument) ? n.contentDocument : (l(n, "template") && (n = n.content || n),
            i.merge([], n.childNodes))
        }
    }, function(n, t) {
        i.fn[n] = function(r, u) {
            var f = i.map(this, t, r);
            return n.slice(-5) !== "Until" && (u = r),
            u && typeof u == "string" && (f = i.filter(u, f)),
            this.length > 1 && (tu[n] || i.uniqueSort(f),
            nu.test(n) && f.reverse()),
            this.pushStack(f)
        }
    });
    a = /[^\x20\t\r\n\f]+/g;
    i.Callbacks = function(n) {
        n = typeof n == "string" ? ue(n) : i.extend({}, n);
        var o, r, c, f, t = [], s = [], e = -1, l = function() {
            for (f = f || n.once,
            c = o = !0; s.length; e = -1)
                for (r = s.shift(); ++e < t.length; )
                    t[e].apply(r[0], r[1]) === !1 && n.stopOnFalse && (e = t.length,
                    r = !1);
            n.memory || (r = !1);
            o = !1;
            f && (t = r ? [] : "")
        }, h = {
            add: function() {
                return t && (r && !o && (e = t.length - 1,
                s.push(r)),
                function f(r) {
                    i.each(r, function(i, r) {
                        u(r) ? n.unique && h.has(r) || t.push(r) : r && r.length && rt(r) !== "string" && f(r)
                    })
                }(arguments),
                r && !o && l()),
                this
            },
            remove: function() {
                return i.each(arguments, function(n, r) {
                    for (var u; (u = i.inArray(r, t, u)) > -1; )
                        t.splice(u, 1),
                        u <= e && e--
                }),
                this
            },
            has: function(n) {
                return n ? i.inArray(n, t) > -1 : t.length > 0
            },
            empty: function() {
                return t && (t = []),
                this
            },
            disable: function() {
                return f = s = [],
                t = r = "",
                this
            },
            disabled: function() {
                return !t
            },
            lock: function() {
                return f = s = [],
                r || o || (t = r = ""),
                this
            },
            locked: function() {
                return !!f
            },
            fireWith: function(n, t) {
                return f || (t = t || [],
                t = [n, t.slice ? t.slice() : t],
                s.push(t),
                o || l()),
                this
            },
            fire: function() {
                return h.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!c
            }
        };
        return h
    }
    ;
    i.extend({
        Deferred: function(t) {
            var f = [["notify", "progress", i.Callbacks("memory"), i.Callbacks("memory"), 2], ["resolve", "done", i.Callbacks("once memory"), i.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", i.Callbacks("once memory"), i.Callbacks("once memory"), 1, "rejected"]]
              , o = "pending"
              , e = {
                state: function() {
                    return o
                },
                always: function() {
                    return r.done(arguments).fail(arguments),
                    this
                },
                "catch": function(n) {
                    return e.then(null, n)
                },
                pipe: function() {
                    var n = arguments;
                    return i.Deferred(function(t) {
                        i.each(f, function(i, f) {
                            var e = u(n[f[4]]) && n[f[4]];
                            r[f[1]](function() {
                                var n = e && e.apply(this, arguments);
                                n && u(n.promise) ? n.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[f[0] + "With"](this, e ? [n] : arguments)
                            })
                        });
                        n = null
                    }).promise()
                },
                then: function(t, r, e) {
                    function s(t, r, f, e) {
                        return function() {
                            var h = this
                              , c = arguments
                              , a = function() {
                                var n, i;
                                if (!(t < o)) {
                                    if (n = f.apply(h, c),
                                    n === r.promise())
                                        throw new TypeError("Thenable self-resolution");
                                    i = n && (typeof n == "object" || typeof n == "function") && n.then;
                                    u(i) ? e ? i.call(n, s(o, r, ft, e), s(o, r, ri, e)) : (o++,
                                    i.call(n, s(o, r, ft, e), s(o, r, ri, e), s(o, r, ft, r.notifyWith))) : (f !== ft && (h = undefined,
                                    c = [n]),
                                    (e || r.resolveWith)(h, c))
                                }
                            }
                              , l = e ? a : function() {
                                try {
                                    a()
                                } catch (n) {
                                    i.Deferred.exceptionHook && i.Deferred.exceptionHook(n, l.stackTrace);
                                    t + 1 >= o && (f !== ri && (h = undefined,
                                    c = [n]),
                                    r.rejectWith(h, c))
                                }
                            }
                            ;
                            t ? l() : (i.Deferred.getStackHook && (l.stackTrace = i.Deferred.getStackHook()),
                            n.setTimeout(l))
                        }
                    }
                    var o = 0;
                    return i.Deferred(function(n) {
                        f[0][3].add(s(0, n, u(e) ? e : ft, n.notifyWith));
                        f[1][3].add(s(0, n, u(t) ? t : ft));
                        f[2][3].add(s(0, n, u(r) ? r : ri))
                    }).promise()
                },
                promise: function(n) {
                    return n != null ? i.extend(n, e) : e
                }
            }
              , r = {};
            return i.each(f, function(n, t) {
                var i = t[2]
                  , u = t[5];
                e[t[1]] = i.add;
                u && i.add(function() {
                    o = u
                }, f[3 - n][2].disable, f[3 - n][3].disable, f[0][2].lock, f[0][3].lock);
                i.add(t[3].fire);
                r[t[0]] = function() {
                    return r[t[0] + "With"](this === r ? undefined : this, arguments),
                    this
                }
                ;
                r[t[0] + "With"] = i.fireWith
            }),
            e.promise(r),
            t && t.call(r, r),
            r
        },
        when: function(n) {
            var e = arguments.length
              , t = e
              , o = Array(t)
              , f = k.call(arguments)
              , r = i.Deferred()
              , s = function(n) {
                return function(t) {
                    o[n] = this;
                    f[n] = arguments.length > 1 ? k.call(arguments) : t;
                    --e || r.resolveWith(o, f)
                }
            };
            if (e <= 1 && (ru(n, r.done(s(t)).resolve, r.reject, !e),
            r.state() === "pending" || u(f[t] && f[t].then)))
                return r.then();
            while (t--)
                ru(f[t], s(t), r.reject);
            return r.promise()
        }
    });
    uu = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    i.Deferred.exceptionHook = function(t, i) {
        n.console && n.console.warn && t && uu.test(t.name) && n.console.warn("jQuery.Deferred exception: " + t.message, t.stack, i)
    }
    ;
    i.readyException = function(t) {
        n.setTimeout(function() {
            throw t;
        })
    }
    ;
    ui = i.Deferred();
    i.fn.ready = function(n) {
        return ui.then(n).catch(function(n) {
            i.readyException(n)
        }),
        this
    }
    ;
    i.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(n) {
            (n === !0 ? --i.readyWait : i.isReady) || (i.isReady = !0,
            n !== !0 && --i.readyWait > 0) || ui.resolveWith(f, [i])
        }
    });
    i.ready.then = ui.then;
    f.readyState !== "complete" && (f.readyState === "loading" || f.documentElement.doScroll) ? (f.addEventListener("DOMContentLoaded", fi),
    n.addEventListener("load", fi)) : n.setTimeout(i.ready);
    var w = function(n, t, r, f, e, o, s) {
        var h = 0
          , l = n.length
          , c = r == null;
        if (rt(r) === "object") {
            e = !0;
            for (h in r)
                w(n, t, h, r[h], !0, o, s)
        } else if (f !== undefined && (e = !0,
        u(f) || (s = !0),
        c && (s ? (t.call(n, f),
        t = null) : (c = t,
        t = function(n, t, r) {
            return c.call(i(n), r)
        }
        )),
        t))
            for (; h < l; h++)
                t(n[h], r, s ? f : f.call(n[h], h, t(n[h], r)));
        return e ? n : c ? t.call(n) : l ? t(n[0], r) : o
    }
      , fe = /^-ms-/
      , ee = /-([a-z])/g;
    et = function(n) {
        return n.nodeType === 1 || n.nodeType === 9 || !+n.nodeType
    }
    ;
    pt.uid = 1;
    pt.prototype = {
        cache: function(n) {
            var t = n[this.expando];
            return t || (t = {},
            et(n) && (n.nodeType ? n[this.expando] = t : Object.defineProperty(n, this.expando, {
                value: t,
                configurable: !0
            }))),
            t
        },
        set: function(n, t, i) {
            var r, u = this.cache(n);
            if (typeof t == "string")
                u[y(t)] = i;
            else
                for (r in t)
                    u[y(r)] = t[r];
            return u
        },
        get: function(n, t) {
            return t === undefined ? this.cache(n) : n[this.expando] && n[this.expando][y(t)]
        },
        access: function(n, t, i) {
            return t === undefined || t && typeof t == "string" && i === undefined ? this.get(n, t) : (this.set(n, t, i),
            i !== undefined ? i : t)
        },
        remove: function(n, t) {
            var u, r = n[this.expando];
            if (r !== undefined) {
                if (t !== undefined)
                    for (Array.isArray(t) ? t = t.map(y) : (t = y(t),
                    t = t in r ? [t] : t.match(a) || []),
                    u = t.length; u--; )
                        delete r[t[u]];
                (t === undefined || i.isEmptyObject(r)) && (n.nodeType ? n[this.expando] = undefined : delete n[this.expando])
            }
        },
        hasData: function(n) {
            var t = n[this.expando];
            return t !== undefined && !i.isEmptyObject(t)
        }
    };
    var r = new pt
      , o = new pt
      , se = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , he = /[A-Z]/g;
    i.extend({
        hasData: function(n) {
            return o.hasData(n) || r.hasData(n)
        },
        data: function(n, t, i) {
            return o.access(n, t, i)
        },
        removeData: function(n, t) {
            o.remove(n, t)
        },
        _data: function(n, t, i) {
            return r.access(n, t, i)
        },
        _removeData: function(n, t) {
            r.remove(n, t)
        }
    });
    i.fn.extend({
        data: function(n, t) {
            var f, u, e, i = this[0], s = i && i.attributes;
            if (n === undefined) {
                if (this.length && (e = o.get(i),
                i.nodeType === 1 && !r.get(i, "hasDataAttrs"))) {
                    for (f = s.length; f--; )
                        s[f] && (u = s[f].name,
                        u.indexOf("data-") === 0 && (u = y(u.slice(5)),
                        fu(i, u, e[u])));
                    r.set(i, "hasDataAttrs", !0)
                }
                return e
            }
            return typeof n == "object" ? this.each(function() {
                o.set(this, n)
            }) : w(this, function(t) {
                var r;
                if (i && t === undefined)
                    return (r = o.get(i, n),
                    r !== undefined) ? r : (r = fu(i, n),
                    r !== undefined) ? r : void 0;
                this.each(function() {
                    o.set(this, n, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(n) {
            return this.each(function() {
                o.remove(this, n)
            })
        }
    });
    i.extend({
        queue: function(n, t, u) {
            var f;
            if (n)
                return t = (t || "fx") + "queue",
                f = r.get(n, t),
                u && (!f || Array.isArray(u) ? f = r.access(n, t, i.makeArray(u)) : f.push(u)),
                f || []
        },
        dequeue: function(n, t) {
            t = t || "fx";
            var r = i.queue(n, t)
              , e = r.length
              , u = r.shift()
              , f = i._queueHooks(n, t)
              , o = function() {
                i.dequeue(n, t)
            };
            u === "inprogress" && (u = r.shift(),
            e--);
            u && (t === "fx" && r.unshift("inprogress"),
            delete f.stop,
            u.call(n, o, f));
            !e && f && f.empty.fire()
        },
        _queueHooks: function(n, t) {
            var u = t + "queueHooks";
            return r.get(n, u) || r.access(n, u, {
                empty: i.Callbacks("once memory").add(function() {
                    r.remove(n, [t + "queue", u])
                })
            })
        }
    });
    i.fn.extend({
        queue: function(n, t) {
            var r = 2;
            return (typeof n != "string" && (t = n,
            n = "fx",
            r--),
            arguments.length < r) ? i.queue(this[0], n) : t === undefined ? this : this.each(function() {
                var r = i.queue(this, n, t);
                i._queueHooks(this, n);
                n === "fx" && r[0] !== "inprogress" && i.dequeue(this, n)
            })
        },
        dequeue: function(n) {
            return this.each(function() {
                i.dequeue(this, n)
            })
        },
        clearQueue: function(n) {
            return this.queue(n || "fx", [])
        },
        promise: function(n, t) {
            var u, e = 1, o = i.Deferred(), f = this, s = this.length, h = function() {
                --e || o.resolveWith(f, [f])
            };
            for (typeof n != "string" && (t = n,
            n = undefined),
            n = n || "fx"; s--; )
                u = r.get(f[s], n + "queueHooks"),
                u && u.empty && (e++,
                u.empty.add(h));
            return h(),
            o.promise(t)
        }
    });
    var eu = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , wt = new RegExp("^(?:([+-])=|)(" + eu + ")([a-z%]*)$","i")
      , b = ["Top", "Right", "Bottom", "Left"]
      , g = f.documentElement
      , ot = function(n) {
        return i.contains(n.ownerDocument, n)
    }
      , le = {
        composed: !0
    };
    g.getRootNode && (ot = function(n) {
        return i.contains(n.ownerDocument, n) || n.getRootNode(le) === n.ownerDocument
    }
    );
    bt = function(n, t) {
        return n = t || n,
        n.style.display === "none" || n.style.display === "" && ot(n) && i.css(n, "display") === "none"
    }
    ;
    pi = {};
    i.fn.extend({
        show: function() {
            return st(this, !0)
        },
        hide: function() {
            return st(this)
        },
        toggle: function(n) {
            return typeof n == "boolean" ? n ? this.show() : this.hide() : this.each(function() {
                bt(this) ? i(this).show() : i(this).hide()
            })
        }
    });
    var kt = /^(?:checkbox|radio)$/i
      , su = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i
      , hu = /^$|^module$|\/(?:java|ecma)script/i;
    (function() {
        var i = f.createDocumentFragment()
          , n = i.appendChild(f.createElement("div"))
          , t = f.createElement("input");
        t.setAttribute("type", "radio");
        t.setAttribute("checked", "checked");
        t.setAttribute("name", "t");
        n.appendChild(t);
        e.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked;
        n.innerHTML = "<textarea>x<\/textarea>";
        e.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue;
        n.innerHTML = "<option><\/option>";
        e.option = !!n.lastChild
    }
    )();
    c = {
        thead: [1, "<table>", "<\/table>"],
        col: [2, "<table><colgroup>", "<\/colgroup><\/table>"],
        tr: [2, "<table><tbody>", "<\/tbody><\/table>"],
        td: [3, "<table><tbody><tr>", "<\/tr><\/tbody><\/table>"],
        _default: [0, "", ""]
    };
    c.tbody = c.tfoot = c.colgroup = c.caption = c.thead;
    c.th = c.td;
    e.option || (c.optgroup = c.option = [1, "<select multiple='multiple'>", "<\/select>"]);
    cu = /<|&#?\w+;/;
    var ve = /^key/
      , ye = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
      , au = /^([^.]*)(?:\.(.+)|)/;
    i.event = {
        global: {},
        add: function(n, t, u, f, e) {
            var l, v, w, y, b, h, s, c, o, k, d, p = r.get(n);
            if (et(n))
                for (u.handler && (l = u,
                u = l.handler,
                e = l.selector),
                e && i.find.matchesSelector(g, e),
                u.guid || (u.guid = i.guid++),
                (y = p.events) || (y = p.events = Object.create(null)),
                (v = p.handle) || (v = p.handle = function(t) {
                    return typeof i != "undefined" && i.event.triggered !== t.type ? i.event.dispatch.apply(n, arguments) : undefined
                }
                ),
                t = (t || "").match(a) || [""],
                b = t.length; b--; )
                    (w = au.exec(t[b]) || [],
                    o = d = w[1],
                    k = (w[2] || "").split(".").sort(),
                    o) && (s = i.event.special[o] || {},
                    o = (e ? s.delegateType : s.bindType) || o,
                    s = i.event.special[o] || {},
                    h = i.extend({
                        type: o,
                        origType: d,
                        data: f,
                        handler: u,
                        guid: u.guid,
                        selector: e,
                        needsContext: e && i.expr.match.needsContext.test(e),
                        namespace: k.join(".")
                    }, l),
                    (c = y[o]) || (c = y[o] = [],
                    c.delegateCount = 0,
                    s.setup && s.setup.call(n, f, k, v) !== !1 || n.addEventListener && n.addEventListener(o, v)),
                    s.add && (s.add.call(n, h),
                    h.handler.guid || (h.handler.guid = u.guid)),
                    e ? c.splice(c.delegateCount++, 0, h) : c.push(h),
                    i.event.global[o] = !0)
        },
        remove: function(n, t, u, f, e) {
            var y, k, h, v, p, s, c, l, o, b, d, w = r.hasData(n) && r.get(n);
            if (w && (v = w.events)) {
                for (t = (t || "").match(a) || [""],
                p = t.length; p--; ) {
                    if (h = au.exec(t[p]) || [],
                    o = d = h[1],
                    b = (h[2] || "").split(".").sort(),
                    !o) {
                        for (o in v)
                            i.event.remove(n, o + t[p], u, f, !0);
                        continue
                    }
                    for (c = i.event.special[o] || {},
                    o = (f ? c.delegateType : c.bindType) || o,
                    l = v[o] || [],
                    h = h[2] && new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                    k = y = l.length; y--; )
                        s = l[y],
                        (e || d === s.origType) && (!u || u.guid === s.guid) && (!h || h.test(s.namespace)) && (!f || f === s.selector || f === "**" && s.selector) && (l.splice(y, 1),
                        s.selector && l.delegateCount--,
                        c.remove && c.remove.call(n, s));
                    k && !l.length && (c.teardown && c.teardown.call(n, b, w.handle) !== !1 || i.removeEvent(n, o, w.handle),
                    delete v[o])
                }
                i.isEmptyObject(v) && r.remove(n, "handle events")
            }
        },
        dispatch: function(n) {
            var u, c, s, e, f, l, h = new Array(arguments.length), t = i.event.fix(n), a = (r.get(this, "events") || Object.create(null))[t.type] || [], o = i.event.special[t.type] || {};
            for (h[0] = t,
            u = 1; u < arguments.length; u++)
                h[u] = arguments[u];
            if (t.delegateTarget = this,
            !o.preDispatch || o.preDispatch.call(this, t) !== !1) {
                for (l = i.event.handlers.call(this, t, a),
                u = 0; (e = l[u++]) && !t.isPropagationStopped(); )
                    for (t.currentTarget = e.elem,
                    c = 0; (f = e.handlers[c++]) && !t.isImmediatePropagationStopped(); )
                        (!t.rnamespace || f.namespace === !1 || t.rnamespace.test(f.namespace)) && (t.handleObj = f,
                        t.data = f.data,
                        s = ((i.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h),
                        s !== undefined && (t.result = s) === !1 && (t.preventDefault(),
                        t.stopPropagation()));
                return o.postDispatch && o.postDispatch.call(this, t),
                t.result
            }
        },
        handlers: function(n, t) {
            var f, e, u, o, s, c = [], h = t.delegateCount, r = n.target;
            if (h && r.nodeType && !(n.type === "click" && n.button >= 1))
                for (; r !== this; r = r.parentNode || this)
                    if (r.nodeType === 1 && !(n.type === "click" && r.disabled === !0)) {
                        for (o = [],
                        s = {},
                        f = 0; f < h; f++)
                            e = t[f],
                            u = e.selector + " ",
                            s[u] === undefined && (s[u] = e.needsContext ? i(u, this).index(r) > -1 : i.find(u, this, null, [r]).length),
                            s[u] && o.push(e);
                        o.length && c.push({
                            elem: r,
                            handlers: o
                        })
                    }
            return r = this,
            h < t.length && c.push({
                elem: r,
                handlers: t.slice(h)
            }),
            c
        },
        addProp: function(n, t) {
            Object.defineProperty(i.Event.prototype, n, {
                enumerable: !0,
                configurable: !0,
                get: u(t) ? function() {
                    if (this.originalEvent)
                        return t(this.originalEvent)
                }
                : function() {
                    if (this.originalEvent)
                        return this.originalEvent[n]
                }
                ,
                set: function(t) {
                    Object.defineProperty(this, n, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: t
                    })
                }
            })
        },
        fix: function(n) {
            return n[i.expando] ? n : new i.Event(n)
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                setup: function(n) {
                    var t = this || n;
                    return kt.test(t.type) && t.click && l(t, "input") && ei(t, "click", ht),
                    !1
                },
                trigger: function(n) {
                    var t = this || n;
                    return kt.test(t.type) && t.click && l(t, "input") && ei(t, "click"),
                    !0
                },
                _default: function(n) {
                    var t = n.target;
                    return kt.test(t.type) && t.click && l(t, "input") && r.get(t, "click") || l(t, "a")
                }
            },
            beforeunload: {
                postDispatch: function(n) {
                    n.result !== undefined && n.originalEvent && (n.originalEvent.returnValue = n.result)
                }
            }
        }
    };
    i.removeEvent = function(n, t, i) {
        n.removeEventListener && n.removeEventListener(t, i)
    }
    ;
    i.Event = function(n, t) {
        if (!(this instanceof i.Event))
            return new i.Event(n,t);
        n && n.type ? (this.originalEvent = n,
        this.type = n.type,
        this.isDefaultPrevented = n.defaultPrevented || n.defaultPrevented === undefined && n.returnValue === !1 ? ht : ct,
        this.target = n.target && n.target.nodeType === 3 ? n.target.parentNode : n.target,
        this.currentTarget = n.currentTarget,
        this.relatedTarget = n.relatedTarget) : this.type = n;
        t && i.extend(this, t);
        this.timeStamp = n && n.timeStamp || Date.now();
        this[i.expando] = !0
    }
    ;
    i.Event.prototype = {
        constructor: i.Event,
        isDefaultPrevented: ct,
        isPropagationStopped: ct,
        isImmediatePropagationStopped: ct,
        isSimulated: !1,
        preventDefault: function() {
            var n = this.originalEvent;
            this.isDefaultPrevented = ht;
            n && !this.isSimulated && n.preventDefault()
        },
        stopPropagation: function() {
            var n = this.originalEvent;
            this.isPropagationStopped = ht;
            n && !this.isSimulated && n.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var n = this.originalEvent;
            this.isImmediatePropagationStopped = ht;
            n && !this.isSimulated && n.stopImmediatePropagation();
            this.stopPropagation()
        }
    };
    i.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(n) {
            var t = n.button;
            return n.which == null && ve.test(n.type) ? n.charCode != null ? n.charCode : n.keyCode : !n.which && t !== undefined && ye.test(n.type) ? t & 1 ? 1 : t & 2 ? 3 : t & 4 ? 2 : 0 : n.which
        }
    }, i.event.addProp);
    i.each({
        focus: "focusin",
        blur: "focusout"
    }, function(n, t) {
        i.event.special[n] = {
            setup: function() {
                return ei(this, n, pe),
                !1
            },
            trigger: function() {
                return ei(this, n),
                !0
            },
            delegateType: t
        }
    });
    i.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(n, t) {
        i.event.special[n] = {
            delegateType: t,
            bindType: t,
            handle: function(n) {
                var u, f = this, r = n.relatedTarget, e = n.handleObj;
                return r && (r === f || i.contains(f, r)) || (n.type = e.origType,
                u = e.handler.apply(this, arguments),
                n.type = t),
                u
            }
        }
    });
    i.fn.extend({
        on: function(n, t, i, r) {
            return bi(this, n, t, i, r)
        },
        one: function(n, t, i, r) {
            return bi(this, n, t, i, r, 1)
        },
        off: function(n, t, r) {
            var u, f;
            if (n && n.preventDefault && n.handleObj)
                return u = n.handleObj,
                i(n.delegateTarget).off(u.namespace ? u.origType + "." + u.namespace : u.origType, u.selector, u.handler),
                this;
            if (typeof n == "object") {
                for (f in n)
                    this.off(f, t, n[f]);
                return this
            }
            return (t === !1 || typeof t == "function") && (r = t,
            t = undefined),
            r === !1 && (r = ct),
            this.each(function() {
                i.event.remove(this, n, r, t)
            })
        }
    });
    var be = /<script|<style|<link/i
      , ke = /checked\s*(?:[^=]|=\s*.checked.)/i
      , de = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    i.extend({
        htmlPrefilter: function(n) {
            return n
        },
        clone: function(n, t, r) {
            var u, c, o, f, h = n.cloneNode(!0), l = ot(n);
            if (!e.noCloneChecked && (n.nodeType === 1 || n.nodeType === 11) && !i.isXMLDoc(n))
                for (f = s(h),
                o = s(n),
                u = 0,
                c = o.length; u < c; u++)
                    to(o[u], f[u]);
            if (t)
                if (r)
                    for (o = o || s(n),
                    f = f || s(h),
                    u = 0,
                    c = o.length; u < c; u++)
                        yu(o[u], f[u]);
                else
                    yu(n, h);
            return f = s(h, "script"),
            f.length > 0 && wi(f, !l && s(n, "script")),
            h
        },
        cleanData: function(n) {
            for (var u, t, f, s = i.event.special, e = 0; (t = n[e]) !== undefined; e++)
                if (et(t)) {
                    if (u = t[r.expando]) {
                        if (u.events)
                            for (f in u.events)
                                s[f] ? i.event.remove(t, f) : i.removeEvent(t, f, u.handle);
                        t[r.expando] = undefined
                    }
                    t[o.expando] && (t[o.expando] = undefined)
                }
        }
    });
    i.fn.extend({
        detach: function(n) {
            return pu(this, n, !0)
        },
        remove: function(n) {
            return pu(this, n)
        },
        text: function(n) {
            return w(this, function(n) {
                return n === undefined ? i.text(this) : this.empty().each(function() {
                    (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && (this.textContent = n)
                })
            }, null, n, arguments.length)
        },
        append: function() {
            return lt(this, arguments, function(n) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var t = vu(this, n);
                    t.appendChild(n)
                }
            })
        },
        prepend: function() {
            return lt(this, arguments, function(n) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var t = vu(this, n);
                    t.insertBefore(n, t.firstChild)
                }
            })
        },
        before: function() {
            return lt(this, arguments, function(n) {
                this.parentNode && this.parentNode.insertBefore(n, this)
            })
        },
        after: function() {
            return lt(this, arguments, function(n) {
                this.parentNode && this.parentNode.insertBefore(n, this.nextSibling)
            })
        },
        empty: function() {
            for (var n, t = 0; (n = this[t]) != null; t++)
                n.nodeType === 1 && (i.cleanData(s(n, !1)),
                n.textContent = "");
            return this
        },
        clone: function(n, t) {
            return n = n == null ? !1 : n,
            t = t == null ? n : t,
            this.map(function() {
                return i.clone(this, n, t)
            })
        },
        html: function(n) {
            return w(this, function(n) {
                var t = this[0] || {}
                  , r = 0
                  , u = this.length;
                if (n === undefined && t.nodeType === 1)
                    return t.innerHTML;
                if (typeof n == "string" && !be.test(n) && !c[(su.exec(n) || ["", ""])[1].toLowerCase()]) {
                    n = i.htmlPrefilter(n);
                    try {
                        for (; r < u; r++)
                            t = this[r] || {},
                            t.nodeType === 1 && (i.cleanData(s(t, !1)),
                            t.innerHTML = n);
                        t = 0
                    } catch (f) {}
                }
                t && this.empty().append(n)
            }, null, n, arguments.length)
        },
        replaceWith: function() {
            var n = [];
            return lt(this, arguments, function(t) {
                var r = this.parentNode;
                i.inArray(this, n) < 0 && (i.cleanData(s(this)),
                r && r.replaceChild(t, this))
            }, n)
        }
    });
    i.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(n, t) {
        i.fn[n] = function(n) {
            for (var u, f = [], e = i(n), o = e.length - 1, r = 0; r <= o; r++)
                u = r === o ? this : this.clone(!0),
                i(e[r])[t](u),
                li.apply(f, u.get());
            return this.pushStack(f)
        }
    });
    var ki = new RegExp("^(" + eu + ")(?!px)[a-z%]+$","i")
      , oi = function(t) {
        var i = t.ownerDocument.defaultView;
        return i && i.opener || (i = n),
        i.getComputedStyle(t)
    }
      , wu = function(n, t, i) {
        var u, r, f = {};
        for (r in t)
            f[r] = n.style[r],
            n.style[r] = t[r];
        u = i.call(n);
        for (r in t)
            n.style[r] = f[r];
        return u
    }
      , io = new RegExp(b.join("|"),"i");
    (function() {
        function r() {
            if (t) {
                s.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
                t.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
                g.appendChild(s).appendChild(t);
                var i = n.getComputedStyle(t);
                h = i.top !== "1%";
                v = u(i.marginLeft) === 12;
                t.style.right = "60%";
                a = u(i.right) === 36;
                c = u(i.width) === 36;
                t.style.position = "absolute";
                l = u(t.offsetWidth / 3) === 12;
                g.removeChild(s);
                t = null
            }
        }
        function u(n) {
            return Math.round(parseFloat(n))
        }
        var h, c, l, a, o, v, s = f.createElement("div"), t = f.createElement("div");
        t.style && (t.style.backgroundClip = "content-box",
        t.cloneNode(!0).style.backgroundClip = "",
        e.clearCloneStyle = t.style.backgroundClip === "content-box",
        i.extend(e, {
            boxSizingReliable: function() {
                return r(),
                c
            },
            pixelBoxStyles: function() {
                return r(),
                a
            },
            pixelPosition: function() {
                return r(),
                h
            },
            reliableMarginLeft: function() {
                return r(),
                v
            },
            scrollboxSize: function() {
                return r(),
                l
            },
            reliableTrDimensions: function() {
                var t, i, r, u;
                return o == null && (t = f.createElement("table"),
                i = f.createElement("tr"),
                r = f.createElement("div"),
                t.style.cssText = "position:absolute;left:-11111px",
                i.style.height = "1px",
                r.style.height = "9px",
                g.appendChild(t).appendChild(i).appendChild(r),
                u = n.getComputedStyle(i),
                o = parseInt(u.height) > 3,
                g.removeChild(t)),
                o
            }
        }))
    }
    )();
    var ku = ["Webkit", "Moz", "ms"]
      , du = f.createElement("div").style
      , gu = {};
    var uo = /^(none|table(?!-c[ea]).+)/
      , nf = /^--/
      , fo = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , tf = {
        letterSpacing: "0",
        fontWeight: "400"
    };
    i.extend({
        cssHooks: {
            opacity: {
                get: function(n, t) {
                    if (t) {
                        var i = dt(n, "opacity");
                        return i === "" ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(n, t, r, u) {
            if (n && n.nodeType !== 3 && n.nodeType !== 8 && n.style) {
                var f, s, o, c = y(t), l = nf.test(t), h = n.style;
                if (l || (t = di(c)),
                o = i.cssHooks[t] || i.cssHooks[c],
                r !== undefined) {
                    if (s = typeof r,
                    s === "string" && (f = wt.exec(r)) && f[1] && (r = ou(n, t, f),
                    s = "number"),
                    r == null || r !== r)
                        return;
                    s !== "number" || l || (r += f && f[3] || (i.cssNumber[c] ? "" : "px"));
                    e.clearCloneStyle || r !== "" || t.indexOf("background") !== 0 || (h[t] = "inherit");
                    o && "set"in o && (r = o.set(n, r, u)) === undefined || (l ? h.setProperty(t, r) : h[t] = r)
                } else
                    return o && "get"in o && (f = o.get(n, !1, u)) !== undefined ? f : h[t]
            }
        },
        css: function(n, t, r, u) {
            var f, o, e, s = y(t), h = nf.test(t);
            return (h || (t = di(s)),
            e = i.cssHooks[t] || i.cssHooks[s],
            e && "get"in e && (f = e.get(n, !0, r)),
            f === undefined && (f = dt(n, t, u)),
            f === "normal" && t in tf && (f = tf[t]),
            r === "" || r) ? (o = parseFloat(f),
            r === !0 || isFinite(o) ? o || 0 : f) : f
        }
    });
    i.each(["height", "width"], function(n, t) {
        i.cssHooks[t] = {
            get: function(n, r, u) {
                if (r)
                    return uo.test(i.css(n, "display")) && (!n.getClientRects().length || !n.getBoundingClientRect().width) ? wu(n, fo, function() {
                        return uf(n, t, u)
                    }) : uf(n, t, u)
            },
            set: function(n, r, u) {
                var s, f = oi(n), h = !e.scrollboxSize() && f.position === "absolute", l = h || u, c = l && i.css(n, "boxSizing", !1, f) === "border-box", o = u ? gi(n, t, u, c, f) : 0;
                return c && h && (o -= Math.ceil(n["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(f[t]) - gi(n, t, "border", !1, f) - .5)),
                o && (s = wt.exec(r)) && (s[3] || "px") !== "px" && (n.style[t] = r,
                r = i.css(n, t)),
                rf(n, r, o)
            }
        }
    });
    i.cssHooks.marginLeft = bu(e.reliableMarginLeft, function(n, t) {
        if (t)
            return (parseFloat(dt(n, "marginLeft")) || n.getBoundingClientRect().left - wu(n, {
                marginLeft: 0
            }, function() {
                return n.getBoundingClientRect().left
            })) + "px"
    });
    i.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(n, t) {
        i.cssHooks[n + t] = {
            expand: function(i) {
                for (var r = 0, f = {}, u = typeof i == "string" ? i.split(" ") : [i]; r < 4; r++)
                    f[n + b[r] + t] = u[r] || u[r - 2] || u[0];
                return f
            }
        };
        n !== "margin" && (i.cssHooks[n + t].set = rf)
    });
    i.fn.extend({
        css: function(n, t) {
            return w(this, function(n, t, r) {
                var f, e, o = {}, u = 0;
                if (Array.isArray(t)) {
                    for (f = oi(n),
                    e = t.length; u < e; u++)
                        o[t[u]] = i.css(n, t[u], !1, f);
                    return o
                }
                return r !== undefined ? i.style(n, t, r) : i.css(n, t)
            }, n, t, arguments.length > 1)
        }
    });
    i.Tween = h;
    h.prototype = {
        constructor: h,
        init: function(n, t, r, u, f, e) {
            this.elem = n;
            this.prop = r;
            this.easing = f || i.easing._default;
            this.options = t;
            this.start = this.now = this.cur();
            this.end = u;
            this.unit = e || (i.cssNumber[r] ? "" : "px")
        },
        cur: function() {
            var n = h.propHooks[this.prop];
            return n && n.get ? n.get(this) : h.propHooks._default.get(this)
        },
        run: function(n) {
            var t, r = h.propHooks[this.prop];
            return this.pos = this.options.duration ? t = i.easing[this.easing](n, this.options.duration * n, 0, 1, this.options.duration) : t = n,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            r && r.set ? r.set(this) : h.propHooks._default.set(this),
            this
        }
    };
    h.prototype.init.prototype = h.prototype;
    h.propHooks = {
        _default: {
            get: function(n) {
                var t;
                return n.elem.nodeType !== 1 || n.elem[n.prop] != null && n.elem.style[n.prop] == null ? n.elem[n.prop] : (t = i.css(n.elem, n.prop, ""),
                !t || t === "auto" ? 0 : t)
            },
            set: function(n) {
                i.fx.step[n.prop] ? i.fx.step[n.prop](n) : n.elem.nodeType === 1 && (i.cssHooks[n.prop] || n.elem.style[di(n.prop)] != null) ? i.style(n.elem, n.prop, n.now + n.unit) : n.elem[n.prop] = n.now
            }
        }
    };
    h.propHooks.scrollTop = h.propHooks.scrollLeft = {
        set: function(n) {
            n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now)
        }
    };
    i.easing = {
        linear: function(n) {
            return n
        },
        swing: function(n) {
            return .5 - Math.cos(n * Math.PI) / 2
        },
        _default: "swing"
    };
    i.fx = h.prototype.init;
    i.fx.step = {};
    ff = /^(?:toggle|show|hide)$/;
    ef = /queueHooks$/;
    i.Animation = i.extend(v, {
        tweeners: {
            "*": [function(n, t) {
                var i = this.createTween(n, t);
                return ou(i.elem, n, wt.exec(t), i),
                i
            }
            ]
        },
        tweener: function(n, t) {
            u(n) ? (t = n,
            n = ["*"]) : n = n.match(a);
            for (var i, r = 0, f = n.length; r < f; r++)
                i = n[r],
                v.tweeners[i] = v.tweeners[i] || [],
                v.tweeners[i].unshift(t)
        },
        prefilters: [eo],
        prefilter: function(n, t) {
            t ? v.prefilters.unshift(n) : v.prefilters.push(n)
        }
    });
    i.speed = function(n, t, r) {
        var f = n && typeof n == "object" ? i.extend({}, n) : {
            complete: r || !r && t || u(n) && n,
            duration: n,
            easing: r && t || t && !u(t) && t
        };
        return i.fx.off ? f.duration = 0 : typeof f.duration != "number" && (f.duration = f.duration in i.fx.speeds ? i.fx.speeds[f.duration] : i.fx.speeds._default),
        (f.queue == null || f.queue === !0) && (f.queue = "fx"),
        f.old = f.complete,
        f.complete = function() {
            u(f.old) && f.old.call(this);
            f.queue && i.dequeue(this, f.queue)
        }
        ,
        f
    }
    ;
    i.fn.extend({
        fadeTo: function(n, t, i, r) {
            return this.filter(bt).css("opacity", 0).show().end().animate({
                opacity: t
            }, n, i, r)
        },
        animate: function(n, t, u, f) {
            var s = i.isEmptyObject(n)
              , o = i.speed(t, u, f)
              , e = function() {
                var t = v(this, i.extend({}, n), o);
                (s || r.get(this, "finish")) && t.stop(!0)
            };
            return e.finish = e,
            s || o.queue === !1 ? this.each(e) : this.queue(o.queue, e)
        },
        stop: function(n, t, u) {
            var f = function(n) {
                var t = n.stop;
                delete n.stop;
                t(u)
            };
            return typeof n != "string" && (u = t,
            t = n,
            n = undefined),
            t && this.queue(n || "fx", []),
            this.each(function() {
                var s = !0
                  , t = n != null && n + "queueHooks"
                  , o = i.timers
                  , e = r.get(this);
                if (t)
                    e[t] && e[t].stop && f(e[t]);
                else
                    for (t in e)
                        e[t] && e[t].stop && ef.test(t) && f(e[t]);
                for (t = o.length; t--; )
                    o[t].elem === this && (n == null || o[t].queue === n) && (o[t].anim.stop(u),
                    s = !1,
                    o.splice(t, 1));
                (s || !u) && i.dequeue(this, n)
            })
        },
        finish: function(n) {
            return n !== !1 && (n = n || "fx"),
            this.each(function() {
                var t, e = r.get(this), u = e[n + "queue"], o = e[n + "queueHooks"], f = i.timers, s = u ? u.length : 0;
                for (e.finish = !0,
                i.queue(this, n, []),
                o && o.stop && o.stop.call(this, !0),
                t = f.length; t--; )
                    f[t].elem === this && f[t].queue === n && (f[t].anim.stop(!0),
                    f.splice(t, 1));
                for (t = 0; t < s; t++)
                    u[t] && u[t].finish && u[t].finish.call(this);
                delete e.finish
            })
        }
    });
    i.each(["toggle", "show", "hide"], function(n, t) {
        var r = i.fn[t];
        i.fn[t] = function(n, i, u) {
            return n == null || typeof n == "boolean" ? r.apply(this, arguments) : this.animate(hi(t, !0), n, i, u)
        }
    });
    i.each({
        slideDown: hi("show"),
        slideUp: hi("hide"),
        slideToggle: hi("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(n, t) {
        i.fn[n] = function(n, i, r) {
            return this.animate(t, n, i, r)
        }
    });
    i.timers = [];
    i.fx.tick = function() {
        var r, n = 0, t = i.timers;
        for (at = Date.now(); n < t.length; n++)
            r = t[n],
            r() || t[n] !== r || t.splice(n--, 1);
        t.length || i.fx.stop();
        at = undefined
    }
    ;
    i.fx.timer = function(n) {
        i.timers.push(n);
        i.fx.start()
    }
    ;
    i.fx.interval = 13;
    i.fx.start = function() {
        si || (si = !0,
        nr())
    }
    ;
    i.fx.stop = function() {
        si = null
    }
    ;
    i.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    i.fn.delay = function(t, r) {
        return t = i.fx ? i.fx.speeds[t] || t : t,
        r = r || "fx",
        this.queue(r, function(i, r) {
            var u = n.setTimeout(i, t);
            r.stop = function() {
                n.clearTimeout(u)
            }
        })
    }
    ,
    function() {
        var n = f.createElement("input")
          , t = f.createElement("select")
          , i = t.appendChild(f.createElement("option"));
        n.type = "checkbox";
        e.checkOn = n.value !== "";
        e.optSelected = i.selected;
        n = f.createElement("input");
        n.value = "t";
        n.type = "radio";
        e.radioValue = n.value === "t"
    }();
    vt = i.expr.attrHandle;
    i.fn.extend({
        attr: function(n, t) {
            return w(this, i.attr, n, t, arguments.length > 1)
        },
        removeAttr: function(n) {
            return this.each(function() {
                i.removeAttr(this, n)
            })
        }
    });
    i.extend({
        attr: function(n, t, r) {
            var u, f, e = n.nodeType;
            if (e !== 3 && e !== 8 && e !== 2) {
                if (typeof n.getAttribute == "undefined")
                    return i.prop(n, t, r);
                if (e === 1 && i.isXMLDoc(n) || (f = i.attrHooks[t.toLowerCase()] || (i.expr.match.bool.test(t) ? hf : undefined)),
                r !== undefined) {
                    if (r === null) {
                        i.removeAttr(n, t);
                        return
                    }
                    return f && "set"in f && (u = f.set(n, r, t)) !== undefined ? u : (n.setAttribute(t, r + ""),
                    r)
                }
                return f && "get"in f && (u = f.get(n, t)) !== null ? u : (u = i.find.attr(n, t),
                u == null ? undefined : u)
            }
        },
        attrHooks: {
            type: {
                set: function(n, t) {
                    if (!e.radioValue && t === "radio" && l(n, "input")) {
                        var i = n.value;
                        return n.setAttribute("type", t),
                        i && (n.value = i),
                        t
                    }
                }
            }
        },
        removeAttr: function(n, t) {
            var i, u = 0, r = t && t.match(a);
            if (r && n.nodeType === 1)
                while (i = r[u++])
                    n.removeAttribute(i)
        }
    });
    hf = {
        set: function(n, t, r) {
            return t === !1 ? i.removeAttr(n, r) : n.setAttribute(r, r),
            r
        }
    };
    i.each(i.expr.match.bool.source.match(/\w+/g), function(n, t) {
        var r = vt[t] || i.find.attr;
        vt[t] = function(n, t, i) {
            var f, e, u = t.toLowerCase();
            return i || (e = vt[u],
            vt[u] = f,
            f = r(n, t, i) != null ? u : null,
            vt[u] = e),
            f
        }
    });
    cf = /^(?:input|select|textarea|button)$/i;
    lf = /^(?:a|area)$/i;
    i.fn.extend({
        prop: function(n, t) {
            return w(this, i.prop, n, t, arguments.length > 1)
        },
        removeProp: function(n) {
            return this.each(function() {
                delete this[i.propFix[n] || n]
            })
        }
    });
    i.extend({
        prop: function(n, t, r) {
            var f, u, e = n.nodeType;
            if (e !== 3 && e !== 8 && e !== 2)
                return (e === 1 && i.isXMLDoc(n) || (t = i.propFix[t] || t,
                u = i.propHooks[t]),
                r !== undefined) ? u && "set"in u && (f = u.set(n, r, t)) !== undefined ? f : n[t] = r : u && "get"in u && (f = u.get(n, t)) !== null ? f : n[t]
        },
        propHooks: {
            tabIndex: {
                get: function(n) {
                    var t = i.find.attr(n, "tabindex");
                    return t ? parseInt(t, 10) : cf.test(n.nodeName) || lf.test(n.nodeName) && n.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    });
    e.optSelected || (i.propHooks.selected = {
        get: function(n) {
            var t = n.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex,
            null
        },
        set: function(n) {
            var t = n.parentNode;
            t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex)
        }
    });
    i.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        i.propFix[this.toLowerCase()] = this
    });
    i.fn.extend({
        addClass: function(n) {
            var f, r, t, e, o, h, s, c = 0;
            if (u(n))
                return this.each(function(t) {
                    i(this).addClass(n.call(this, t, tt(this)))
                });
            if (f = tr(n),
            f.length)
                while (r = this[c++])
                    if (e = tt(r),
                    t = r.nodeType === 1 && " " + nt(e) + " ",
                    t) {
                        for (h = 0; o = f[h++]; )
                            t.indexOf(" " + o + " ") < 0 && (t += o + " ");
                        s = nt(t);
                        e !== s && r.setAttribute("class", s)
                    }
            return this
        },
        removeClass: function(n) {
            var f, r, t, e, o, h, s, c = 0;
            if (u(n))
                return this.each(function(t) {
                    i(this).removeClass(n.call(this, t, tt(this)))
                });
            if (!arguments.length)
                return this.attr("class", "");
            if (f = tr(n),
            f.length)
                while (r = this[c++])
                    if (e = tt(r),
                    t = r.nodeType === 1 && " " + nt(e) + " ",
                    t) {
                        for (h = 0; o = f[h++]; )
                            while (t.indexOf(" " + o + " ") > -1)
                                t = t.replace(" " + o + " ", " ");
                        s = nt(t);
                        e !== s && r.setAttribute("class", s)
                    }
            return this
        },
        toggleClass: function(n, t) {
            var f = typeof n
              , e = f === "string" || Array.isArray(n);
            return typeof t == "boolean" && e ? t ? this.addClass(n) : this.removeClass(n) : u(n) ? this.each(function(r) {
                i(this).toggleClass(n.call(this, r, tt(this), t), t)
            }) : this.each(function() {
                var t, o, u, s;
                if (e)
                    for (o = 0,
                    u = i(this),
                    s = tr(n); t = s[o++]; )
                        u.hasClass(t) ? u.removeClass(t) : u.addClass(t);
                else
                    (n === undefined || f === "boolean") && (t = tt(this),
                    t && r.set(this, "__className__", t),
                    this.setAttribute && this.setAttribute("class", t || n === !1 ? "" : r.get(this, "__className__") || ""))
            })
        },
        hasClass: function(n) {
            for (var t, r = 0, i = " " + n + " "; t = this[r++]; )
                if (t.nodeType === 1 && (" " + nt(tt(t)) + " ").indexOf(i) > -1)
                    return !0;
            return !1
        }
    });
    af = /\r/g;
    i.fn.extend({
        val: function(n) {
            var t, r, e, f = this[0];
            return arguments.length ? (e = u(n),
            this.each(function(r) {
                var u;
                this.nodeType === 1 && (u = e ? n.call(this, r, i(this).val()) : n,
                u == null ? u = "" : typeof u == "number" ? u += "" : Array.isArray(u) && (u = i.map(u, function(n) {
                    return n == null ? "" : n + ""
                })),
                t = i.valHooks[this.type] || i.valHooks[this.nodeName.toLowerCase()],
                t && "set"in t && t.set(this, u, "value") !== undefined || (this.value = u))
            })) : f ? (t = i.valHooks[f.type] || i.valHooks[f.nodeName.toLowerCase()],
            t && "get"in t && (r = t.get(f, "value")) !== undefined) ? r : (r = f.value,
            typeof r == "string") ? r.replace(af, "") : r == null ? "" : r : void 0
        }
    });
    i.extend({
        valHooks: {
            option: {
                get: function(n) {
                    var t = i.find.attr(n, "value");
                    return t != null ? t : nt(i.text(n))
                }
            },
            select: {
                get: function(n) {
                    for (var e, t, o = n.options, u = n.selectedIndex, f = n.type === "select-one", s = f ? null : [], h = f ? u + 1 : o.length, r = u < 0 ? h : f ? u : 0; r < h; r++)
                        if (t = o[r],
                        (t.selected || r === u) && !t.disabled && (!t.parentNode.disabled || !l(t.parentNode, "optgroup"))) {
                            if (e = i(t).val(),
                            f)
                                return e;
                            s.push(e)
                        }
                    return s
                },
                set: function(n, t) {
                    for (var u, r, f = n.options, e = i.makeArray(t), o = f.length; o--; )
                        r = f[o],
                        (r.selected = i.inArray(i.valHooks.option.get(r), e) > -1) && (u = !0);
                    return u || (n.selectedIndex = -1),
                    e
                }
            }
        }
    });
    i.each(["radio", "checkbox"], function() {
        i.valHooks[this] = {
            set: function(n, t) {
                if (Array.isArray(t))
                    return n.checked = i.inArray(i(n).val(), t) > -1
            }
        };
        e.checkOn || (i.valHooks[this].get = function(n) {
            return n.getAttribute("value") === null ? "on" : n.value
        }
        )
    });
    e.focusin = "onfocusin"in n;
    ir = /^(?:focusinfocus|focusoutblur)$/;
    rr = function(n) {
        n.stopPropagation()
    }
    ;
    i.extend(i.event, {
        trigger: function(t, e, o, s) {
            var k, c, l, d, v, y, a, w, b = [o || f], h = ii.call(t, "type") ? t.type : t, p = ii.call(t, "namespace") ? t.namespace.split(".") : [];
            if ((c = w = l = o = o || f,
            o.nodeType !== 3 && o.nodeType !== 8) && !ir.test(h + i.event.triggered) && (h.indexOf(".") > -1 && (p = h.split("."),
            h = p.shift(),
            p.sort()),
            v = h.indexOf(":") < 0 && "on" + h,
            t = t[i.expando] ? t : new i.Event(h,typeof t == "object" && t),
            t.isTrigger = s ? 2 : 3,
            t.namespace = p.join("."),
            t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            t.result = undefined,
            t.target || (t.target = o),
            e = e == null ? [t] : i.makeArray(e, [t]),
            a = i.event.special[h] || {},
            s || !a.trigger || a.trigger.apply(o, e) !== !1)) {
                if (!s && !a.noBubble && !it(o)) {
                    for (d = a.delegateType || h,
                    ir.test(d + h) || (c = c.parentNode); c; c = c.parentNode)
                        b.push(c),
                        l = c;
                    l === (o.ownerDocument || f) && b.push(l.defaultView || l.parentWindow || n)
                }
                for (k = 0; (c = b[k++]) && !t.isPropagationStopped(); )
                    w = c,
                    t.type = k > 1 ? d : a.bindType || h,
                    y = (r.get(c, "events") || Object.create(null))[t.type] && r.get(c, "handle"),
                    y && y.apply(c, e),
                    y = v && c[v],
                    y && y.apply && et(c) && (t.result = y.apply(c, e),
                    t.result === !1 && t.preventDefault());
                return t.type = h,
                s || t.isDefaultPrevented() || (!a._default || a._default.apply(b.pop(), e) === !1) && et(o) && v && u(o[h]) && !it(o) && (l = o[v],
                l && (o[v] = null),
                i.event.triggered = h,
                t.isPropagationStopped() && w.addEventListener(h, rr),
                o[h](),
                t.isPropagationStopped() && w.removeEventListener(h, rr),
                i.event.triggered = undefined,
                l && (o[v] = l)),
                t.result
            }
        },
        simulate: function(n, t, r) {
            var u = i.extend(new i.Event, r, {
                type: n,
                isSimulated: !0
            });
            i.event.trigger(u, null, t)
        }
    });
    i.fn.extend({
        trigger: function(n, t) {
            return this.each(function() {
                i.event.trigger(n, t, this)
            })
        },
        triggerHandler: function(n, t) {
            var r = this[0];
            if (r)
                return i.event.trigger(n, t, r, !0)
        }
    });
    e.focusin || i.each({
        focus: "focusin",
        blur: "focusout"
    }, function(n, t) {
        var u = function(n) {
            i.event.simulate(t, n.target, i.event.fix(n))
        };
        i.event.special[t] = {
            setup: function() {
                var i = this.ownerDocument || this.document || this
                  , f = r.access(i, t);
                f || i.addEventListener(n, u, !0);
                r.access(i, t, (f || 0) + 1)
            },
            teardown: function() {
                var i = this.ownerDocument || this.document || this
                  , f = r.access(i, t) - 1;
                f ? r.access(i, t, f) : (i.removeEventListener(n, u, !0),
                r.remove(i, t))
            }
        }
    });
    var gt = n.location
      , vf = {
        guid: Date.now()
    }
      , ur = /\?/;
    i.parseXML = function(t) {
        var r;
        if (!t || typeof t != "string")
            return null;
        try {
            r = (new n.DOMParser).parseFromString(t, "text/xml")
        } catch (u) {
            r = undefined
        }
        return (!r || r.getElementsByTagName("parsererror").length) && i.error("Invalid XML: " + t),
        r
    }
    ;
    var so = /\[\]$/
      , yf = /\r?\n/g
      , ho = /^(?:submit|button|image|reset|file)$/i
      , co = /^(?:input|select|textarea|keygen)/i;
    i.param = function(n, t) {
        var r, f = [], e = function(n, t) {
            var i = u(t) ? t() : t;
            f[f.length] = encodeURIComponent(n) + "=" + encodeURIComponent(i == null ? "" : i)
        };
        if (n == null)
            return "";
        if (Array.isArray(n) || n.jquery && !i.isPlainObject(n))
            i.each(n, function() {
                e(this.name, this.value)
            });
        else
            for (r in n)
                fr(r, n[r], t, e);
        return f.join("&")
    }
    ;
    i.fn.extend({
        serialize: function() {
            return i.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var n = i.prop(this, "elements");
                return n ? i.makeArray(n) : this
            }).filter(function() {
                var n = this.type;
                return this.name && !i(this).is(":disabled") && co.test(this.nodeName) && !ho.test(n) && (this.checked || !kt.test(n))
            }).map(function(n, t) {
                var r = i(this).val();
                return r == null ? null : Array.isArray(r) ? i.map(r, function(n) {
                    return {
                        name: t.name,
                        value: n.replace(yf, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: r.replace(yf, "\r\n")
                }
            }).get()
        }
    });
    var lo = /%20/g
      , ao = /#.*$/
      , vo = /([?&])_=[^&]*/
      , yo = /^(.*?):[ \t]*([^\r\n]*)$/mg
      , po = /^(?:GET|HEAD)$/
      , wo = /^\/\//
      , pf = {}
      , er = {}
      , wf = "*/".concat("*")
      , or = f.createElement("a");
    return or.href = gt.href,
    i.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: gt.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(gt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": wf,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": function(t) {
                    return (n.JSON2 || JSON).parse(t)
                },
                "text xml": i.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(n, t) {
            return t ? sr(sr(n, i.ajaxSettings), t) : sr(i.ajaxSettings, n)
        },
        ajaxPrefilter: bf(pf),
        ajaxTransport: bf(er),
        ajax: function(t, r) {
            function b(t, r, f, l) {
                var v, rt, g, p, b, a = r;
                s || (s = !0,
                d && n.clearTimeout(d),
                c = undefined,
                k = l || "",
                e.readyState = t > 0 ? 4 : 0,
                v = t >= 200 && t < 300 || t === 304,
                f && (p = bo(u, e, f)),
                !v && i.inArray("script", u.dataTypes) > -1 && (u.converters["text script"] = function() {}
                ),
                p = ko(u, p, e, v),
                v ? (u.ifModified && (b = e.getResponseHeader("Last-Modified"),
                b && (i.lastModified[o] = b),
                b = e.getResponseHeader("etag"),
                b && (i.etag[o] = b)),
                t === 204 || u.type === "HEAD" ? a = "nocontent" : t === 304 ? a = "notmodified" : (a = p.state,
                rt = p.data,
                g = p.error,
                v = !g)) : (g = a,
                (t || !a) && (a = "error",
                t < 0 && (t = 0))),
                e.status = t,
                e.statusText = (r || a) + "",
                v ? tt.resolveWith(h, [rt, a, e]) : tt.rejectWith(h, [e, a, g]),
                e.statusCode(w),
                w = undefined,
                y && nt.trigger(v ? "ajaxSuccess" : "ajaxError", [e, u, v ? rt : g]),
                it.fireWith(h, [e, a]),
                y && (nt.trigger("ajaxComplete", [e, u]),
                --i.active || i.event.trigger("ajaxStop")))
            }
            typeof t == "object" && (r = t,
            t = undefined);
            r = r || {};
            var c, o, k, v, d, l, s, y, g, p, u = i.ajaxSetup({}, r), h = u.context || u, nt = u.context && (h.nodeType || h.jquery) ? i(h) : i.event, tt = i.Deferred(), it = i.Callbacks("once memory"), w = u.statusCode || {}, rt = {}, ut = {}, ft = "canceled", e = {
                readyState: 0,
                getResponseHeader: function(n) {
                    var t;
                    if (s) {
                        if (!v)
                            for (v = {}; t = yo.exec(k); )
                                v[t[1].toLowerCase() + " "] = (v[t[1].toLowerCase() + " "] || []).concat(t[2]);
                        t = v[n.toLowerCase() + " "]
                    }
                    return t == null ? null : t.join(", ")
                },
                getAllResponseHeaders: function() {
                    return s ? k : null
                },
                setRequestHeader: function(n, t) {
                    return s == null && (n = ut[n.toLowerCase()] = ut[n.toLowerCase()] || n,
                    rt[n] = t),
                    this
                },
                overrideMimeType: function(n) {
                    return s == null && (u.mimeType = n),
                    this
                },
                statusCode: function(n) {
                    var t;
                    if (n)
                        if (s)
                            e.always(n[e.status]);
                        else
                            for (t in n)
                                w[t] = [w[t], n[t]];
                    return this
                },
                abort: function(n) {
                    var t = n || ft;
                    return c && c.abort(t),
                    b(0, t),
                    this
                }
            };
            if (tt.promise(e),
            u.url = ((t || u.url || gt.href) + "").replace(wo, gt.protocol + "//"),
            u.type = r.method || r.type || u.method || u.type,
            u.dataTypes = (u.dataType || "*").toLowerCase().match(a) || [""],
            u.crossDomain == null) {
                l = f.createElement("a");
                try {
                    l.href = u.url;
                    l.href = l.href;
                    u.crossDomain = or.protocol + "//" + or.host != l.protocol + "//" + l.host
                } catch (et) {
                    u.crossDomain = !0
                }
            }
            if (u.data && u.processData && typeof u.data != "string" && (u.data = i.param(u.data, u.traditional)),
            kf(pf, u, r, e),
            s)
                return e;
            y = i.event && u.global;
            y && i.active++ == 0 && i.event.trigger("ajaxStart");
            u.type = u.type.toUpperCase();
            u.hasContent = !po.test(u.type);
            o = u.url.replace(ao, "");
            u.hasContent ? u.data && u.processData && (u.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && (u.data = u.data.replace(lo, "+")) : (p = u.url.slice(o.length),
            u.data && (u.processData || typeof u.data == "string") && (o += (ur.test(o) ? "&" : "?") + u.data,
            delete u.data),
            u.cache === !1 && (o = o.replace(vo, "$1"),
            p = (ur.test(o) ? "&" : "?") + "_=" + vf.guid++ + p),
            u.url = o + p);
            u.ifModified && (i.lastModified[o] && e.setRequestHeader("If-Modified-Since", i.lastModified[o]),
            i.etag[o] && e.setRequestHeader("If-None-Match", i.etag[o]));
            (u.data && u.hasContent && u.contentType !== !1 || r.contentType) && e.setRequestHeader("Content-Type", u.contentType);
            e.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + (u.dataTypes[0] !== "*" ? ", " + wf + "; q=0.01" : "") : u.accepts["*"]);
            for (g in u.headers)
                e.setRequestHeader(g, u.headers[g]);
            if (u.beforeSend && (u.beforeSend.call(h, e, u) === !1 || s))
                return e.abort();
            if (ft = "abort",
            it.add(u.complete),
            e.done(u.success),
            e.fail(u.error),
            c = kf(er, u, r, e),
            c) {
                if (e.readyState = 1,
                y && nt.trigger("ajaxSend", [e, u]),
                s)
                    return e;
                u.async && u.timeout > 0 && (d = n.setTimeout(function() {
                    e.abort("timeout")
                }, u.timeout));
                try {
                    s = !1;
                    c.send(rt, b)
                } catch (et) {
                    if (s)
                        throw et;
                    b(-1, et)
                }
            } else
                b(-1, "No Transport");
            return e
        },
        getJSON: function(n, t, r) {
            return i.get(n, t, r, "json")
        },
        getScript: function(n, t) {
            return i.get(n, undefined, t, "script")
        }
    }),
    i.each(["get", "post"], function(n, t) {
        i[t] = function(n, r, f, e) {
            return u(r) && (e = e || f,
            f = r,
            r = undefined),
            i.ajax(i.extend({
                url: n,
                type: t,
                dataType: e,
                data: r,
                success: f
            }, i.isPlainObject(n) && n))
        }
    }),
    i.ajaxPrefilter(function(n) {
        for (var t in n.headers)
            t.toLowerCase() === "content-type" && (n.contentType = n.headers[t] || "")
    }),
    i._evalUrl = function(n, t, r) {
        return i.ajax({
            url: n,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            converters: {
                "text script": function() {}
            },
            dataFilter: function(n) {
                i.globalEval(n, t, r)
            }
        })
    }
    ,
    i.fn.extend({
        wrapAll: function(n) {
            var t;
            return this[0] && (u(n) && (n = n.call(this[0])),
            t = i(n, this[0].ownerDocument).eq(0).clone(!0),
            this[0].parentNode && t.insertBefore(this[0]),
            t.map(function() {
                for (var n = this; n.firstElementChild; )
                    n = n.firstElementChild;
                return n
            }).append(this)),
            this
        },
        wrapInner: function(n) {
            return u(n) ? this.each(function(t) {
                i(this).wrapInner(n.call(this, t))
            }) : this.each(function() {
                var t = i(this)
                  , r = t.contents();
                r.length ? r.wrapAll(n) : t.append(n)
            })
        },
        wrap: function(n) {
            var t = u(n);
            return this.each(function(r) {
                i(this).wrapAll(t ? n.call(this, r) : n)
            })
        },
        unwrap: function(n) {
            return this.parent(n).not("body").each(function() {
                i(this).replaceWith(this.childNodes)
            }),
            this
        }
    }),
    i.expr.pseudos.hidden = function(n) {
        return !i.expr.pseudos.visible(n)
    }
    ,
    i.expr.pseudos.visible = function(n) {
        return !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length)
    }
    ,
    i.ajaxSettings.xhr = function() {
        try {
            return new n.XMLHttpRequest
        } catch (t) {}
    }
    ,
    df = {
        0: 200,
        1223: 204
    },
    yt = i.ajaxSettings.xhr(),
    e.cors = !!yt && "withCredentials"in yt,
    e.ajax = yt = !!yt,
    i.ajaxTransport(function(t) {
        var i, r;
        if (e.cors || yt && !t.crossDomain)
            return {
                send: function(u, f) {
                    var o, e = t.xhr();
                    if (e.open(t.type, t.url, t.async, t.username, t.password),
                    t.xhrFields)
                        for (o in t.xhrFields)
                            e[o] = t.xhrFields[o];
                    t.mimeType && e.overrideMimeType && e.overrideMimeType(t.mimeType);
                    t.crossDomain || u["X-Requested-With"] || (u["X-Requested-With"] = "XMLHttpRequest");
                    for (o in u)
                        e.setRequestHeader(o, u[o]);
                    i = function(n) {
                        return function() {
                            i && (i = r = e.onload = e.onerror = e.onabort = e.ontimeout = e.onreadystatechange = null,
                            n === "abort" ? e.abort() : n === "error" ? typeof e.status != "number" ? f(0, "error") : f(e.status, e.statusText) : f(df[e.status] || e.status, e.statusText, (e.responseType || "text") !== "text" || typeof e.responseText != "string" ? {
                                binary: e.response
                            } : {
                                text: e.responseText
                            }, e.getAllResponseHeaders()))
                        }
                    }
                    ;
                    e.onload = i();
                    r = e.onerror = e.ontimeout = i("error");
                    e.onabort !== undefined ? e.onabort = r : e.onreadystatechange = function() {
                        e.readyState === 4 && n.setTimeout(function() {
                            i && r()
                        })
                    }
                    ;
                    i = i("abort");
                    try {
                        e.send(t.hasContent && t.data || null)
                    } catch (s) {
                        if (i)
                            throw s;
                    }
                },
                abort: function() {
                    i && i()
                }
            }
    }),
    i.ajaxPrefilter(function(n) {
        n.crossDomain && (n.contents.script = !1)
    }),
    i.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(n) {
                return i.globalEval(n),
                n
            }
        }
    }),
    i.ajaxPrefilter("script", function(n) {
        n.cache === undefined && (n.cache = !1);
        n.crossDomain && (n.type = "GET")
    }),
    i.ajaxTransport("script", function(n) {
        if (n.crossDomain || n.scriptAttrs) {
            var r, t;
            return {
                send: function(u, e) {
                    r = i("<script>").attr(n.scriptAttrs || {}).prop({
                        charset: n.scriptCharset,
                        src: n.url
                    }).on("load error", t = function(n) {
                        r.remove();
                        t = null;
                        n && e(n.type === "error" ? 404 : 200, n.type)
                    }
                    );
                    f.head.appendChild(r[0])
                },
                abort: function() {
                    t && t()
                }
            }
        }
    }),
    hr = [],
    ci = /(=)\?(?=&|$)|\?\?/,
    i.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var n = hr.pop() || i.expando + "_" + vf.guid++;
            return this[n] = !0,
            n
        }
    }),
    i.ajaxPrefilter("json jsonp", function(t, r, f) {
        var e, o, s, h = t.jsonp !== !1 && (ci.test(t.url) ? "url" : typeof t.data == "string" && (t.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && ci.test(t.data) && "data");
        if (h || t.dataTypes[0] === "jsonp")
            return e = t.jsonpCallback = u(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
            h ? t[h] = t[h].replace(ci, "$1" + e) : t.jsonp !== !1 && (t.url += (ur.test(t.url) ? "&" : "?") + t.jsonp + "=" + e),
            t.converters["script json"] = function() {
                return s || i.error(e + " was not called"),
                s[0]
            }
            ,
            t.dataTypes[0] = "json",
            o = n[e],
            n[e] = function() {
                s = arguments
            }
            ,
            f.always(function() {
                o === undefined ? i(n).removeProp(e) : n[e] = o;
                t[e] && (t.jsonpCallback = r.jsonpCallback,
                hr.push(e));
                s && u(o) && o(s[0]);
                s = o = undefined
            }),
            "script"
    }),
    e.createHTMLDocument = function() {
        var n = f.implementation.createHTMLDocument("").body;
        return n.innerHTML = "<form><\/form><form><\/form>",
        n.childNodes.length === 2
    }(),
    i.parseHTML = function(n, t, r) {
        if (typeof n != "string")
            return [];
        typeof t == "boolean" && (r = t,
        t = !1);
        var s, u, o;
        return (t || (e.createHTMLDocument ? (t = f.implementation.createHTMLDocument(""),
        s = t.createElement("base"),
        s.href = f.location.href,
        t.head.appendChild(s)) : t = f),
        u = vi.exec(n),
        o = !r && [],
        u) ? [t.createElement(u[1])] : (u = lu([n], t, o),
        o && o.length && i(o).remove(),
        i.merge([], u.childNodes))
    }
    ,
    i.fn.load = function(n, t, r) {
        var o, s, h, c, f, e;
        return typeof n != "string" ? (o = Array.prototype.slice.call(arguments),
        o.unshift("load"),
        i.fn.on.apply(this, o)) : (f = this,
        e = n.indexOf(" "),
        e > -1 && (s = nt(n.slice(e)),
        n = n.slice(0, e)),
        u(t) ? (r = t,
        t = undefined) : t && typeof t == "object" && (h = "POST"),
        f.length > 0 && i.ajax({
            url: n,
            type: h || "GET",
            dataType: "html",
            data: t
        }).done(function(n) {
            c = arguments;
            f.html(s ? i("<div>").append(i.parseHTML(n)).find(s) : n)
        }).always(r && function(n, t) {
            f.each(function() {
                r.apply(this, c || [n.responseText, t, n])
            })
        }
        ),
        this)
    }
    ,
    i.expr.pseudos.animated = function(n) {
        return i.grep(i.timers, function(t) {
            return n === t.elem
        }).length
    }
    ,
    i.offset = {
        setOffset: function(n, t, r) {
            var o, s, h, c, e, l, y, a = i.css(n, "position"), v = i(n), f = {};
            a === "static" && (n.style.position = "relative");
            e = v.offset();
            h = i.css(n, "top");
            l = i.css(n, "left");
            y = (a === "absolute" || a === "fixed") && (h + l).indexOf("auto") > -1;
            y ? (o = v.position(),
            c = o.top,
            s = o.left) : (c = parseFloat(h) || 0,
            s = parseFloat(l) || 0);
            u(t) && (t = t.call(n, r, i.extend({}, e)));
            t.top != null && (f.top = t.top - e.top + c);
            t.left != null && (f.left = t.left - e.left + s);
            "using"in t ? t.using.call(n, f) : (typeof f.top == "number" && (f.top += "px"),
            typeof f.left == "number" && (f.left += "px"),
            v.css(f))
        }
    },
    i.fn.extend({
        offset: function(n) {
            if (arguments.length)
                return n === undefined ? this : this.each(function(t) {
                    i.offset.setOffset(this, n, t)
                });
            var r, u, t = this[0];
            if (t)
                return t.getClientRects().length ? (r = t.getBoundingClientRect(),
                u = t.ownerDocument.defaultView,
                {
                    top: r.top + u.pageYOffset,
                    left: r.left + u.pageXOffset
                }) : {
                    top: 0,
                    left: 0
                }
        },
        position: function() {
            if (this[0]) {
                var n, u, f, t = this[0], r = {
                    top: 0,
                    left: 0
                };
                if (i.css(t, "position") === "fixed")
                    u = t.getBoundingClientRect();
                else {
                    for (u = this.offset(),
                    f = t.ownerDocument,
                    n = t.offsetParent || f.documentElement; n && (n === f.body || n === f.documentElement) && i.css(n, "position") === "static"; )
                        n = n.parentNode;
                    n && n !== t && n.nodeType === 1 && (r = i(n).offset(),
                    r.top += i.css(n, "borderTopWidth", !0),
                    r.left += i.css(n, "borderLeftWidth", !0))
                }
                return {
                    top: u.top - r.top - i.css(t, "marginTop", !0),
                    left: u.left - r.left - i.css(t, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var n = this.offsetParent; n && i.css(n, "position") === "static"; )
                    n = n.offsetParent;
                return n || g
            })
        }
    }),
    i.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(n, t) {
        var r = "pageYOffset" === t;
        i.fn[n] = function(i) {
            return w(this, function(n, i, u) {
                var f;
                if (it(n) ? f = n : n.nodeType === 9 && (f = n.defaultView),
                u === undefined)
                    return f ? f[t] : n[i];
                f ? f.scrollTo(r ? f.pageXOffset : u, r ? u : f.pageYOffset) : n[i] = u
            }, n, i, arguments.length)
        }
    }),
    i.each(["top", "left"], function(n, t) {
        i.cssHooks[t] = bu(e.pixelPosition, function(n, r) {
            if (r)
                return r = dt(n, t),
                ki.test(r) ? i(n).position()[t] + "px" : r
        })
    }),
    i.each({
        Height: "height",
        Width: "width"
    }, function(n, t) {
        i.each({
            padding: "inner" + n,
            content: t,
            "": "outer" + n
        }, function(r, u) {
            i.fn[u] = function(f, e) {
                var o = arguments.length && (r || typeof f != "boolean")
                  , s = r || (f === !0 || e === !0 ? "margin" : "border");
                return w(this, function(t, r, f) {
                    var e;
                    return it(t) ? u.indexOf("outer") === 0 ? t["inner" + n] : t.document.documentElement["client" + n] : t.nodeType === 9 ? (e = t.documentElement,
                    Math.max(t.body["scroll" + n], e["scroll" + n], t.body["offset" + n], e["offset" + n], e["client" + n])) : f === undefined ? i.css(t, r, s) : i.style(t, r, f, s)
                }, t, o ? f : undefined, o)
            }
        })
    }),
    i.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(n, t) {
        i.fn[t] = function(n) {
            return this.on(t, n)
        }
    }),
    i.fn.extend({
        bind: function(n, t, i) {
            return this.on(n, null, t, i)
        },
        unbind: function(n, t) {
            return this.off(n, null, t)
        },
        delegate: function(n, t, i, r) {
            return this.on(t, n, i, r)
        },
        undelegate: function(n, t, i) {
            return arguments.length === 1 ? this.off(n, "**") : this.off(t, n || "**", i)
        },
        hover: function(n, t) {
            return this.mouseenter(n).mouseleave(t || n)
        }
    }),
    i.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(n, t) {
        i.fn[t] = function(n, i) {
            return arguments.length > 0 ? this.on(t, null, n, i) : this.trigger(t)
        }
    }),
    gf = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    i.proxy = function(n, t) {
        var f, e, r;
        return (typeof t == "string" && (f = n[t],
        t = n,
        n = f),
        !u(n)) ? undefined : (e = k.call(arguments, 2),
        r = function() {
            return n.apply(t || this, e.concat(k.call(arguments)))
        }
        ,
        r.guid = n.guid = n.guid || i.guid++,
        r)
    }
    ,
    i.holdReady = function(n) {
        n ? i.readyWait++ : i.ready(!0)
    }
    ,
    i.isArray = Array.isArray,
    i.parseJSON = function(t) {
        return (n.JSON2 || JSON).parse(t)
    }
    ,
    i.nodeName = l,
    i.isFunction = u,
    i.isWindow = it,
    i.camelCase = y,
    i.type = rt,
    i.now = Date.now,
    i.isNumeric = function(n) {
        var t = i.type(n);
        return (t === "number" || t === "string") && !isNaN(n - parseFloat(n))
    }
    ,
    i.trim = function(n) {
        return n == null ? "" : (n + "").replace(gf, "")
    }
    ,
    typeof define == "function" && define.amd && define("jquery", [], function() {
        return i
    }),
    ne = n.jQuery,
    te = n.$,
    i.noConflict = function(t) {
        return n.$ === i && (n.$ = te),
        t && n.jQuery === i && (n.jQuery = ne),
        i
    }
    ,
    typeof t == "undefined" && (n.jQuery = n.$ = i),
    n.register && n.register("j/jquery"),
    i
});
/*! jQuery UI - v1.12.1 - 2017-02-14
* http://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, focusable.js, form-reset-mixin.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/draggable.js, widgets/droppable.js, widgets/resizable.js, widgets/selectable.js, widgets/sortable.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/dialog.js, widgets/mouse.js, widgets/slider.js, effect.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */
window.registerLoading && registerLoading("j/jquery.ui"),
function(n) {
    if (typeof jQuery == "function")
        n(jQuery);
    else if (typeof module == "object" && typeof module.exports == "function" && module.exports.fn)
        window.jQuery = window.$ = module.exports,
        n(window.jQuery);
    else if (typeof rrequire == "function")
        rrequire(["j/jquery"], n);
    else
        throw "jQuery couldn't be loaded.";
}(function(n) {
    function p(n) {
        for (var t = n.css("visibility"); t === "inherit"; )
            n = n.parent(),
            t = n.css("visibility");
        return t !== "hidden"
    }
    var c, o, u, l, a, v, y, w, b, k, d, g, nt, tt, it, rt, ut, t, ft, i, et, ot, st, ht, s, ct, lt, at, vt, yt, pt;
    n.ui = n.ui || {};
    c = n.ui.version = "1.12.1";
    /*!
	 * jQuery UI Widget 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    o = 0;
    u = Array.prototype.slice;
    n.cleanData = function(t) {
        return function(i) {
            for (var r, u, f = 0; (u = i[f]) != null; f++)
                try {
                    r = n._data(u, "events");
                    r && r.remove && n(u).triggerHandler("remove")
                } catch (e) {}
            t(i)
        }
    }(n.cleanData);
    n.widget = function(t, i, r) {
        var f, u, o, h = {}, e = t.split(".")[0], s;
        return t = t.split(".")[1],
        s = e + "-" + t,
        r || (r = i,
        i = n.Widget),
        n.isArray(r) && (r = n.extend.apply(null, [{}].concat(r))),
        n.expr[":"][s.toLowerCase()] = function(t) {
            return !!n.data(t, s)
        }
        ,
        n[e] = n[e] || {},
        f = n[e][t],
        u = n[e][t] = function(n, t) {
            if (!this._createWidget)
                return new u(n,t);
            arguments.length && this._createWidget(n, t)
        }
        ,
        n.extend(u, f, {
            version: r.version,
            _proto: n.extend({}, r),
            _childConstructors: []
        }),
        o = new i,
        o.options = n.widget.extend({}, o.options),
        n.each(r, function(t, r) {
            if (!n.isFunction(r)) {
                h[t] = r;
                return
            }
            h[t] = function() {
                function n() {
                    return i.prototype[t].apply(this, arguments)
                }
                function u(n) {
                    return i.prototype[t].apply(this, n)
                }
                return function() {
                    var i = this._super, f = this._superApply, t;
                    return this._super = n,
                    this._superApply = u,
                    t = r.apply(this, arguments),
                    this._super = i,
                    this._superApply = f,
                    t
                }
            }()
        }),
        u.prototype = n.widget.extend(o, {
            widgetEventPrefix: f ? o.widgetEventPrefix || t : t
        }, h, {
            constructor: u,
            namespace: e,
            widgetName: t,
            widgetFullName: s
        }),
        f ? (n.each(f._childConstructors, function(t, i) {
            var r = i.prototype;
            n.widget(r.namespace + "." + r.widgetName, u, i._proto)
        }),
        delete f._childConstructors) : i._childConstructors.push(u),
        n.widget.bridge(t, u),
        u
    }
    ;
    n.widget.extend = function(t) {
        for (var e = u.call(arguments, 1), f = 0, o = e.length, i, r; f < o; f++)
            for (i in e[f])
                r = e[f][i],
                e[f].hasOwnProperty(i) && r !== undefined && (t[i] = n.isPlainObject(r) ? n.isPlainObject(t[i]) ? n.widget.extend({}, t[i], r) : n.widget.extend({}, r) : r);
        return t
    }
    ;
    n.widget.bridge = function(t, i) {
        var r = i.prototype.widgetFullName || t;
        n.fn[t] = function(f) {
            var s = typeof f == "string"
              , o = u.call(arguments, 1)
              , e = this;
            return s ? this.length || f !== "instance" ? this.each(function() {
                var i, u = n.data(this, r);
                return f === "instance" ? (e = u,
                !1) : u ? !n.isFunction(u[f]) || f.charAt(0) === "_" ? n.error("no such method '" + f + "' for " + t + " widget instance") : (i = u[f].apply(u, o),
                i !== u && i !== undefined ? (e = i && i.jquery ? e.pushStack(i.get()) : i,
                !1) : void 0) : null
            }) : e = undefined : (o.length && (f = n.widget.extend.apply(null, [f].concat(o))),
            this.each(function() {
                var t = n.data(this, r);
                t ? (t.option(f || {}),
                t._init && t._init()) : n.data(this, r, new i(f,this))
            })),
            e
        }
    }
    ;
    n.Widget = function() {}
    ;
    n.Widget._childConstructors = [];
    n.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            classes: {},
            disabled: !1,
            create: null
        },
        _createWidget: function(t, i) {
            i = n(i || this.defaultElement || this)[0];
            this.element = n(i);
            this.uuid = o++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.bindings = n();
            this.hoverable = n();
            this.focusable = n();
            this.classesElementLookup = {};
            i !== this && (n.data(i, this.widgetFullName, this),
            this._on(!0, this.element, {
                remove: function(n) {
                    n.target === i && this.destroy()
                }
            }),
            this.document = n(i.style ? i.ownerDocument : i.document || i),
            this.window = n(this.document[0].defaultView || this.document[0].parentWindow));
            this.options = n.widget.extend({}, this.options, this._getCreateOptions(), t);
            this._create();
            this.options.disabled && this._setOptionDisabled(this.options.disabled);
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: function() {
            return {}
        },
        _getCreateEventData: n.noop,
        _create: n.noop,
        _init: n.noop,
        destroy: function() {
            var t = this;
            this._destroy();
            n.each(this.classesElementLookup, function(n, i) {
                t._removeClass(i, n)
            });
            this.element.off(this.eventNamespace).removeData(this.widgetFullName);
            this.widget().off(this.eventNamespace).removeAttr("aria-disabled");
            this.bindings.off(this.eventNamespace)
        },
        _destroy: n.noop,
        widget: function() {
            return this.element
        },
        option: function(t, i) {
            var e = t, r, u, f;
            if (arguments.length === 0)
                return n.widget.extend({}, this.options);
            if (typeof t == "string")
                if (e = {},
                r = t.split("."),
                t = r.shift(),
                r.length) {
                    for (u = e[t] = n.widget.extend({}, this.options[t]),
                    f = 0; f < r.length - 1; f++)
                        u[r[f]] = u[r[f]] || {},
                        u = u[r[f]];
                    if (t = r.pop(),
                    arguments.length === 1)
                        return u[t] === undefined ? null : u[t];
                    u[t] = i
                } else {
                    if (arguments.length === 1)
                        return this.options[t] === undefined ? null : this.options[t];
                    e[t] = i
                }
            return this._setOptions(e),
            this
        },
        _setOptions: function(n) {
            for (var t in n)
                this._setOption(t, n[t]);
            return this
        },
        _setOption: function(n, t) {
            return n === "classes" && this._setOptionClasses(t),
            this.options[n] = t,
            n === "disabled" && this._setOptionDisabled(t),
            this
        },
        _setOptionClasses: function(t) {
            var i, u, r;
            for (i in t)
                (r = this.classesElementLookup[i],
                t[i] !== this.options.classes[i] && r && r.length) && (u = n(r.get()),
                this._removeClass(r, i),
                u.addClass(this._classes({
                    element: u,
                    keys: i,
                    classes: t,
                    add: !0
                })))
        },
        _setOptionDisabled: function(n) {
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!n);
            n && (this._removeClass(this.hoverable, null, "ui-state-hover"),
            this._removeClass(this.focusable, null, "ui-state-focus"))
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _classes: function(t) {
            function u(u, f) {
                for (var o, e = 0; e < u.length; e++)
                    o = r.classesElementLookup[u[e]] || n(),
                    o = t.add ? n(n.unique(o.get().concat(t.element.get()))) : n(o.not(t.element).get()),
                    r.classesElementLookup[u[e]] = o,
                    i.push(u[e]),
                    f && t.classes[u[e]] && i.push(t.classes[u[e]])
            }
            var i = []
              , r = this;
            return t = n.extend({
                element: this.element,
                classes: this.options.classes || {}
            }, t),
            this._on(t.element, {
                remove: "_untrackClassesElement"
            }),
            t.keys && u(t.keys.match(/\S+/g) || [], !0),
            t.extra && u(t.extra.match(/\S+/g) || []),
            i.join(" ")
        },
        _untrackClassesElement: function(t) {
            var i = this;
            n.each(i.classesElementLookup, function(r, u) {
                n.inArray(t.target, u) !== -1 && (i.classesElementLookup[r] = n(u.not(t.target).get()))
            })
        },
        _removeClass: function(n, t, i) {
            return this._toggleClass(n, t, i, !1)
        },
        _addClass: function(n, t, i) {
            return this._toggleClass(n, t, i, !0)
        },
        _toggleClass: function(n, t, i, r) {
            r = typeof r == "boolean" ? r : i;
            var u = typeof n == "string" || n === null
              , f = {
                extra: u ? t : i,
                keys: u ? n : t,
                element: u ? this.element : n,
                add: r
            };
            return f.element.toggleClass(this._classes(f), r),
            this
        },
        _on: function(t, i, r) {
            var f, u = this;
            typeof t != "boolean" && (r = i,
            i = t,
            t = !1);
            r ? (i = f = n(i),
            this.bindings = this.bindings.add(i)) : (r = i,
            i = this.element,
            f = this.widget());
            n.each(r, function(r, e) {
                function o() {
                    if (t || u.options.disabled !== !0 && !n(this).hasClass("ui-state-disabled"))
                        return (typeof e == "string" ? u[e] : e).apply(u, arguments)
                }
                typeof e != "string" && (o.guid = e.guid = e.guid || o.guid || n.guid++);
                var s = r.match(/^([\w:-]*)\s*(.*)$/)
                  , h = s[1] + u.eventNamespace
                  , c = s[2];
                if (c)
                    f.on(h, c, o);
                else
                    i.on(h, o)
            })
        },
        _off: function(t, i) {
            i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            t.off(i).off(i);
            this.bindings = n(this.bindings.not(t).get());
            this.focusable = n(this.focusable.not(t).get());
            this.hoverable = n(this.hoverable.not(t).get())
        },
        _delay: function(n, t) {
            function r() {
                return (typeof n == "string" ? i[n] : n).apply(i, arguments)
            }
            var i = this;
            return setTimeout(r, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t);
            this._on(t, {
                mouseenter: function(t) {
                    this._addClass(n(t.currentTarget), null, "ui-state-hover")
                },
                mouseleave: function(t) {
                    this._removeClass(n(t.currentTarget), null, "ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t);
            this._on(t, {
                focusin: function(t) {
                    this._addClass(n(t.currentTarget), null, "ui-state-focus")
                },
                focusout: function(t) {
                    this._removeClass(n(t.currentTarget), null, "ui-state-focus")
                }
            })
        },
        _trigger: function(t, i, r) {
            var u, f, e = this.options[t];
            if (r = r || {},
            i = n.Event(i),
            i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(),
            i.target = this.element[0],
            f = i.originalEvent,
            f)
                for (u in f)
                    u in i || (i[u] = f[u]);
            return this.element.trigger(i, r),
            !(n.isFunction(e) && e.apply(this.element[0], [i].concat(r)) === !1 || i.isDefaultPrevented())
        }
    };
    n.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(t, i) {
        n.Widget.prototype["_" + t] = function(r, u, f) {
            typeof u == "string" && (u = {
                effect: u
            });
            var o, e = u ? u === !0 || typeof u == "number" ? i : u.effect || i : t;
            u = u || {};
            typeof u == "number" && (u = {
                duration: u
            });
            o = !n.isEmptyObject(u);
            u.complete = f;
            u.delay && r.delay(u.delay);
            o && n.effects && n.effects.effect[e] ? r[t](u) : e !== t && r[e] ? r[e](u.duration, u.easing, f) : r.queue(function(i) {
                n(this)[t]();
                f && f.call(r[0]);
                i()
            })
        }
    });
    l = n.widget;
    /*!
	 * jQuery UI Position 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/position/
	 */
    (function() {
        function c(n, t, i) {
            return [parseFloat(n[0]) * (h.test(n[0]) ? t / 100 : 1), parseFloat(n[1]) * (h.test(n[1]) ? i / 100 : 1)]
        }
        function r(t, i) {
            return parseInt(n.css(t, i), 10) || 0
        }
        function a(t) {
            var i = t[0];
            return i.nodeType === 9 ? {
                width: t.width(),
                height: t.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            } : n.isWindow(i) ? {
                width: t.width(),
                height: t.height(),
                offset: {
                    top: t.scrollTop(),
                    left: t.scrollLeft()
                }
            } : i.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: i.pageY,
                    left: i.pageX
                }
            } : {
                width: t.outerWidth(),
                height: t.outerHeight(),
                offset: t.offset()
            }
        }
        var u, i = Math.max, t = Math.abs, f = /left|center|right/, e = /top|center|bottom/, o = /[\+\-]\d+(\.[\d]+)?%?/, s = /^\w+/, h = /%$/, l = n.fn.position;
        n.position = {
            scrollbarWidth: function() {
                if (u !== undefined)
                    return u;
                var r, i, t = n("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'><\/div><\/div>"), f = t.children()[0];
                return n("body").append(t),
                r = f.offsetWidth,
                t.css("overflow", "scroll"),
                i = f.offsetWidth,
                r === i && (i = t[0].clientWidth),
                t.remove(),
                u = r - i
            },
            getScrollInfo: function(t) {
                var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x")
                  , r = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y")
                  , u = i === "scroll" || i === "auto" && t.width < t.element[0].scrollWidth
                  , f = r === "scroll" || r === "auto" && t.height < t.element[0].scrollHeight;
                return {
                    width: f ? n.position.scrollbarWidth() : 0,
                    height: u ? n.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function(t) {
                var i = n(t || window)
                  , r = n.isWindow(i[0])
                  , u = !!i[0] && i[0].nodeType === 9
                  , f = !r && !u;
                return {
                    element: i,
                    isWindow: r,
                    isDocument: u,
                    offset: f ? n(t).offset() : {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: i.scrollLeft(),
                    scrollTop: i.scrollTop(),
                    width: i.outerWidth(),
                    height: i.outerHeight()
                }
            }
        };
        n.fn.position = function(u) {
            if (!u || !u.of)
                return l.apply(this, arguments);
            u = n.extend({}, u);
            var w, h, v, p, y, k, d = n(u.of), nt = n.position.getWithinInfo(u.within), tt = n.position.getScrollInfo(nt), b = (u.collision || "flip").split(" "), g = {};
            return k = a(d),
            d[0].preventDefault && (u.at = "left top"),
            h = k.width,
            v = k.height,
            p = k.offset,
            y = n.extend({}, p),
            n.each(["my", "at"], function() {
                var n = (u[this] || "").split(" "), t, i;
                n.length === 1 && (n = f.test(n[0]) ? n.concat(["center"]) : e.test(n[0]) ? ["center"].concat(n) : ["center", "center"]);
                n[0] = f.test(n[0]) ? n[0] : "center";
                n[1] = e.test(n[1]) ? n[1] : "center";
                t = o.exec(n[0]);
                i = o.exec(n[1]);
                g[this] = [t ? t[0] : 0, i ? i[0] : 0];
                u[this] = [s.exec(n[0])[0], s.exec(n[1])[0]]
            }),
            b.length === 1 && (b[1] = b[0]),
            u.at[0] === "right" ? y.left += h : u.at[0] === "center" && (y.left += h / 2),
            u.at[1] === "bottom" ? y.top += v : u.at[1] === "center" && (y.top += v / 2),
            w = c(g.at, h, v),
            y.left += w[0],
            y.top += w[1],
            this.each(function() {
                var a, k, e = n(this), o = e.outerWidth(), s = e.outerHeight(), it = r(this, "marginLeft"), rt = r(this, "marginTop"), ut = o + it + r(this, "marginRight") + tt.width, ft = s + rt + r(this, "marginBottom") + tt.height, f = n.extend({}, y), l = c(g.my, e.outerWidth(), e.outerHeight());
                u.my[0] === "right" ? f.left -= o : u.my[0] === "center" && (f.left -= o / 2);
                u.my[1] === "bottom" ? f.top -= s : u.my[1] === "center" && (f.top -= s / 2);
                f.left += l[0];
                f.top += l[1];
                a = {
                    marginLeft: it,
                    marginTop: rt
                };
                n.each(["left", "top"], function(t, i) {
                    n.ui.position[b[t]] && n.ui.position[b[t]][i](f, {
                        targetWidth: h,
                        targetHeight: v,
                        elemWidth: o,
                        elemHeight: s,
                        collisionPosition: a,
                        collisionWidth: ut,
                        collisionHeight: ft,
                        offset: [w[0] + l[0], w[1] + l[1]],
                        my: u.my,
                        at: u.at,
                        within: nt,
                        elem: e
                    })
                });
                u.using && (k = function(n) {
                    var r = p.left - f.left
                      , a = r + h - o
                      , c = p.top - f.top
                      , y = c + v - s
                      , l = {
                        target: {
                            element: d,
                            left: p.left,
                            top: p.top,
                            width: h,
                            height: v
                        },
                        element: {
                            element: e,
                            left: f.left,
                            top: f.top,
                            width: o,
                            height: s
                        },
                        horizontal: a < 0 ? "left" : r > 0 ? "right" : "center",
                        vertical: y < 0 ? "top" : c > 0 ? "bottom" : "middle"
                    };
                    h < o && t(r + a) < h && (l.horizontal = "center");
                    v < s && t(c + y) < v && (l.vertical = "middle");
                    l.important = i(t(r), t(a)) > i(t(c), t(y)) ? "horizontal" : "vertical";
                    u.using.call(this, n, l)
                }
                );
                e.offset(n.extend(f, {
                    using: k
                }))
            })
        }
        ;
        n.ui.position = {
            fit: {
                left: function(n, t) {
                    var e = t.within, u = e.isWindow ? e.scrollLeft : e.offset.left, o = e.width, s = n.left - t.collisionPosition.marginLeft, r = u - s, f = s + t.collisionWidth - o - u, h;
                    t.collisionWidth > o ? r > 0 && f <= 0 ? (h = n.left + r + t.collisionWidth - o - u,
                    n.left += r - h) : n.left = f > 0 && r <= 0 ? u : r > f ? u + o - t.collisionWidth : u : r > 0 ? n.left += r : f > 0 ? n.left -= f : n.left = i(n.left - s, n.left)
                },
                top: function(n, t) {
                    var o = t.within, u = o.isWindow ? o.scrollTop : o.offset.top, e = t.within.height, s = n.top - t.collisionPosition.marginTop, r = u - s, f = s + t.collisionHeight - e - u, h;
                    t.collisionHeight > e ? r > 0 && f <= 0 ? (h = n.top + r + t.collisionHeight - e - u,
                    n.top += r - h) : n.top = f > 0 && r <= 0 ? u : r > f ? u + e - t.collisionHeight : u : r > 0 ? n.top += r : f > 0 ? n.top -= f : n.top = i(n.top - s, n.top)
                }
            },
            flip: {
                left: function(n, i) {
                    var r = i.within, y = r.offset.left + r.scrollLeft, c = r.width, o = r.isWindow ? r.scrollLeft : r.offset.left, l = n.left - i.collisionPosition.marginLeft, a = l - o, v = l + i.collisionWidth - c - o, u = i.my[0] === "left" ? -i.elemWidth : i.my[0] === "right" ? i.elemWidth : 0, f = i.at[0] === "left" ? i.targetWidth : i.at[0] === "right" ? -i.targetWidth : 0, e = -2 * i.offset[0], s, h;
                    a < 0 ? (s = n.left + u + f + e + i.collisionWidth - c - y,
                    (s < 0 || s < t(a)) && (n.left += u + f + e)) : v > 0 && (h = n.left - i.collisionPosition.marginLeft + u + f + e - o,
                    (h > 0 || t(h) < v) && (n.left += u + f + e))
                },
                top: function(n, i) {
                    var r = i.within, y = r.offset.top + r.scrollTop, c = r.height, o = r.isWindow ? r.scrollTop : r.offset.top, l = n.top - i.collisionPosition.marginTop, a = l - o, v = l + i.collisionHeight - c - o, p = i.my[1] === "top", u = p ? -i.elemHeight : i.my[1] === "bottom" ? i.elemHeight : 0, f = i.at[1] === "top" ? i.targetHeight : i.at[1] === "bottom" ? -i.targetHeight : 0, e = -2 * i.offset[1], s, h;
                    a < 0 ? (h = n.top + u + f + e + i.collisionHeight - c - y,
                    (h < 0 || h < t(a)) && (n.top += u + f + e)) : v > 0 && (s = n.top - i.collisionPosition.marginTop + u + f + e - o,
                    (s > 0 || t(s) < v) && (n.top += u + f + e))
                }
            },
            flipfit: {
                left: function() {
                    n.ui.position.flip.left.apply(this, arguments);
                    n.ui.position.fit.left.apply(this, arguments)
                },
                top: function() {
                    n.ui.position.flip.top.apply(this, arguments);
                    n.ui.position.fit.top.apply(this, arguments)
                }
            }
        }
    }
    )();
    a = n.ui.position;
    /*!
	 * jQuery UI :data 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    v = n.extend(n.expr[":"], {
        data: n.expr.createPseudo ? n.expr.createPseudo(function(t) {
            return function(i) {
                return !!n.data(i, t)
            }
        }) : function(t, i, r) {
            return !!n.data(t, r[3])
        }
    });
    /*!
	 * jQuery UI Disable Selection 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    y = n.fn.extend({
        disableSelection: function() {
            var n = "onselectstart"in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.on(n + ".ui-disableSelection", function(n) {
                    n.preventDefault()
                })
            }
        }(),
        enableSelection: function() {
            return this.off(".ui-disableSelection")
        }
    });
    /*!
	 * jQuery UI Focusable 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    n.ui.focusable = function(t, i) {
        var u, f, e, r, o, s = t.nodeName.toLowerCase();
        return "area" === s ? (u = t.parentNode,
        f = u.name,
        !t.href || !f || u.nodeName.toLowerCase() !== "map") ? !1 : (e = n("img[usemap='#" + f + "']"),
        e.length > 0 && e.is(":visible")) : (/^(input|select|textarea|button|object)$/.test(s) ? (r = !t.disabled,
        r && (o = n(t).closest("fieldset")[0],
        o && (r = !o.disabled))) : r = "a" === s ? t.href || i : i,
        r && n(t).is(":visible") && p(n(t)))
    }
    ;
    n.extend(n.expr[":"], {
        focusable: function(t) {
            return n.ui.focusable(t, n.attr(t, "tabindex") != null)
        }
    });
    w = n.ui.focusable;
    b = n.fn.form = function() {
        return typeof this[0].form == "string" ? this.closest("form") : n(this[0].form)
    }
    ;
    /*!
	 * jQuery UI Form Reset Mixin 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    k = n.ui.formResetMixin = {
        _formResetHandler: function() {
            var t = n(this);
            setTimeout(function() {
                var i = t.data("ui-form-reset-instances");
                n.each(i, function() {
                    this.refresh()
                })
            })
        },
        _bindFormResetHandler: function() {
            if (this.form = this.element.form(),
            this.form.length) {
                var n = this.form.data("ui-form-reset-instances") || [];
                if (!n.length)
                    this.form.on("reset.ui-form-reset", this._formResetHandler);
                n.push(this);
                this.form.data("ui-form-reset-instances", n)
            }
        },
        _unbindFormResetHandler: function() {
            if (this.form.length) {
                var t = this.form.data("ui-form-reset-instances");
                t.splice(n.inArray(this, t), 1);
                t.length ? this.form.data("ui-form-reset-instances", t) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")
            }
        }
    };
    /*!
	 * jQuery UI Keycode 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    d = n.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    };
    g = n.ui.escapeSelector = function() {
        var n = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
        return function(t) {
            return t.replace(n, "\\$1")
        }
    }();
    /*!
	 * jQuery UI Labels 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    nt = n.fn.labels = function() {
        var t, r, u, i, f;
        return this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (i = this.eq(0).parents("label"),
        u = this.attr("id"),
        u && (t = this.eq(0).parents().last(),
        f = t.add(t.length ? t.siblings() : this.siblings()),
        r = "label[for='" + n.ui.escapeSelector(u) + "']",
        i = i.add(f.find(r).addBack(r))),
        this.pushStack(i))
    }
    ;
    /*!
	 * jQuery UI Scroll Parent 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    tt = n.fn.scrollParent = function(t) {
        var i = this.css("position")
          , u = i === "absolute"
          , f = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/
          , r = this.parents().filter(function() {
            var t = n(this);
            return u && t.css("position") === "static" ? !1 : f.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
        }).eq(0);
        return i === "fixed" || !r.length ? n(this[0].ownerDocument || document) : r
    }
    ;
    /*!
	 * jQuery UI Tabbable 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    it = n.extend(n.expr[":"], {
        tabbable: function(t) {
            var i = n.attr(t, "tabindex")
              , r = i != null;
            return (!r || i >= 0) && n.ui.focusable(t, r)
        }
    });
    /*!
	 * jQuery UI Unique ID 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    rt = n.fn.extend({
        uniqueId: function() {
            var n = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++n)
                })
            }
        }(),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && n(this).removeAttr("id")
            })
        }
    });
    ut = n.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    /*!
	 * jQuery UI Mouse 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    t = !1;
    n(document).on("mouseup", function() {
        t = !1
    });
    var wt = n.widget("ui.mouse", {
        version: "1.12.1",
        options: {
            cancel: "input, textarea, button, select, option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var t = this;
            this.element.on("mousedown." + this.widgetName, function(n) {
                return t._mouseDown(n)
            }).on("click." + this.widgetName, function(i) {
                if (!0 === n.data(i.target, t.widgetName + ".preventClickEvent"))
                    return n.removeData(i.target, t.widgetName + ".preventClickEvent"),
                    i.stopImmediatePropagation(),
                    !1
            });
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.off("." + this.widgetName);
            this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(i) {
            if (!t) {
                this._mouseMoved = !1;
                this._mouseStarted && this._mouseUp(i);
                this._mouseDownEvent = i;
                var r = this
                  , u = i.which === 1
                  , f = typeof this.options.cancel == "string" && i.target.nodeName ? n(i.target).closest(this.options.cancel).length : !1;
                if (!u || f || !this._mouseCapture(i))
                    return !0;
                if (this.mouseDelayMet = !this.options.delay,
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    r.mouseDelayMet = !0
                }, this.options.delay)),
                this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1,
                !this._mouseStarted))
                    return i.preventDefault(),
                    !0;
                !0 === n.data(i.target, this.widgetName + ".preventClickEvent") && n.removeData(i.target, this.widgetName + ".preventClickEvent");
                this._mouseMoveDelegate = function(n) {
                    return r._mouseMove(n)
                }
                ;
                this._mouseUpDelegate = function(n) {
                    return r._mouseUp(n)
                }
                ;
                this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate);
                return i.preventDefault(),
                t = !0,
                !0
            }
        },
        _mouseMove: function(t) {
            if (this._mouseMoved) {
                if (n.ui.ie && (!document.documentMode || document.documentMode < 9) && !t.button)
                    return this._mouseUp(t);
                if (!t.which)
                    if (t.originalEvent.altKey || t.originalEvent.ctrlKey || t.originalEvent.metaKey || t.originalEvent.shiftKey)
                        this.ignoreMissingWhich = !0;
                    else if (!this.ignoreMissingWhich)
                        return this._mouseUp(t)
            }
            return ((t.which || t.button) && (this._mouseMoved = !0),
            this._mouseStarted) ? (this._mouseDrag(t),
            t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1,
            this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
            !this._mouseStarted)
        },
        _mouseUp: function(i) {
            this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
            this._mouseStarted && (this._mouseStarted = !1,
            i.target === this._mouseDownEvent.target && n.data(i.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(i));
            this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer),
            delete this._mouseDelayTimer);
            this.ignoreMissingWhich = !1;
            t = !1;
            i.preventDefault()
        },
        _mouseDistanceMet: function(n) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - n.pageX), Math.abs(this._mouseDownEvent.pageY - n.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    })
      , bt = n.ui.plugin = {
        add: function(t, i, r) {
            var u, f = n.ui[t].prototype;
            for (u in r)
                f.plugins[u] = f.plugins[u] || [],
                f.plugins[u].push([i, r[u]])
        },
        call: function(n, t, i, r) {
            var u, f = n.plugins[t];
            if (f && (r || n.element[0].parentNode && n.element[0].parentNode.nodeType !== 11))
                for (u = 0; u < f.length; u++)
                    n.options[f[u][0]] && f[u][1].apply(n.element, i)
        }
    }
      , kt = n.ui.safeActiveElement = function(n) {
        var t;
        try {
            t = n.activeElement
        } catch (i) {
            t = n.body
        }
        return t || (t = n.body),
        t.nodeName || (t = n.body),
        t
    }
      , dt = n.ui.safeBlur = function(t) {
        t && t.nodeName.toLowerCase() !== "body" && n(t).trigger("blur")
    }
    ;
    /*!
	 * jQuery UI Draggable 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    n.widget("ui.draggable", n.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            this.options.helper === "original" && this._setPositionRelative();
            this.options.addClasses && this._addClass("ui-draggable");
            this._setHandleClassName();
            this._mouseInit()
        },
        _setOption: function(n, t) {
            this._super(n, t);
            n === "handle" && (this._removeHandleClassName(),
            this._setHandleClassName())
        },
        _destroy: function() {
            if ((this.helper || this.element).is(".ui-draggable-dragging")) {
                this.destroyOnClear = !0;
                return
            }
            this._removeHandleClassName();
            this._mouseDestroy()
        },
        _mouseCapture: function(t) {
            var i = this.options;
            return this.helper || i.disabled || n(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t),
            !this.handle) ? !1 : (this._blurActiveElement(t),
            this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix),
            !0)
        },
        _blockFrames: function(t) {
            this.iframeBlocks = this.document.find(t).map(function() {
                var t = n(this);
                return n("<div>").css("position", "absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(),
            delete this.iframeBlocks)
        },
        _blurActiveElement: function(t) {
            var i = n.ui.safeActiveElement(this.document[0])
              , r = n(t.target);
            r.closest(i).length || n.ui.safeBlur(i)
        },
        _mouseStart: function(t) {
            var i = this.options;
            return (this.helper = this._createHelper(t),
            this._addClass(this.helper, "ui-draggable-dragging"),
            this._cacheHelperProportions(),
            n.ui.ddmanager && (n.ui.ddmanager.current = this),
            this._cacheMargins(),
            this.cssPosition = this.helper.css("position"),
            this.scrollParent = this.helper.scrollParent(!0),
            this.offsetParent = this.helper.offsetParent(),
            this.hasFixedAncestor = this.helper.parents().filter(function() {
                return n(this).css("position") === "fixed"
            }).length > 0,
            this.positionAbs = this.element.offset(),
            this._refreshOffsets(t),
            this.originalPosition = this.position = this._generatePosition(t, !1),
            this.originalPageX = t.pageX,
            this.originalPageY = t.pageY,
            i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
            this._setContainment(),
            this._trigger("start", t) === !1) ? (this._clear(),
            !1) : (this._cacheHelperProportions(),
            n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t),
            this._mouseDrag(t, !0),
            n.ui.ddmanager && n.ui.ddmanager.dragStart(this, t),
            !0)
        },
        _refreshOffsets: function(n) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: !1,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            };
            this.offset.click = {
                left: n.pageX - this.offset.left,
                top: n.pageY - this.offset.top
            }
        },
        _mouseDrag: function(t, i) {
            if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()),
            this.position = this._generatePosition(t, !0),
            this.positionAbs = this._convertPositionTo("absolute"),
            !i) {
                var r = this._uiHash();
                if (this._trigger("drag", t, r) === !1)
                    return this._mouseUp(new n.Event("mouseup",t)),
                    !1;
                this.position = r.position
            }
            return this.helper[0].style.left = this.position.left + "px",
            this.helper[0].style.top = this.position.top + "px",
            n.ui.ddmanager && n.ui.ddmanager.drag(this, t),
            !1
        },
        _mouseStop: function(t) {
            var r = this
              , i = !1;
            return n.ui.ddmanager && !this.options.dropBehaviour && (i = n.ui.ddmanager.drop(this, t)),
            this.dropped && (i = this.dropped,
            this.dropped = !1),
            this.options.revert === "invalid" && !i || this.options.revert === "valid" && i || this.options.revert === !0 || n.isFunction(this.options.revert) && this.options.revert.call(this.element, i) ? n(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                r._trigger("stop", t) !== !1 && r._clear()
            }) : this._trigger("stop", t) !== !1 && this._clear(),
            !1
        },
        _mouseUp: function(t) {
            return this._unblockFrames(),
            n.ui.ddmanager && n.ui.ddmanager.dragStop(this, t),
            this.handleElement.is(t.target) && this.element.trigger("focus"),
            n.ui.mouse.prototype._mouseUp.call(this, t)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new n.Event("mouseup",{
                target: this.element[0]
            })) : this._clear(),
            this
        },
        _getHandle: function(t) {
            return this.options.handle ? n.isFunction(this.options.handle) ? this.options.handle(t) : !!n(t.target).closest(this.element.find(this.options.handle)).length : !0
        },
        _setHandleClassName: function() {
            this.handleElement = this.options.handle && !n.isFunction(this.options.handle) ? this.element.find(this.options.handle) : this.element;
            this._addClass(this.handleElement, "ui-draggable-handle")
        },
        _removeHandleClassName: function() {
            this._removeClass(this.handleElement, "ui-draggable-handle")
        },
        _createHelper: function(t) {
            var r = this.options
              , u = n.isFunction(r.helper)
              , i = u ? n(r.helper.apply(this.element[0], [t])) : r.helper === "clone" ? this.element.clone().removeAttr("id") : this.element;
            return i.parents("body").length || i.appendTo(r.appendTo === "parent" ? this.element[0].parentNode : r.appendTo),
            u && i[0] === this.element[0] && this._setPositionRelative(),
            i[0] === this.element[0] || /(fixed|absolute)/.test(i.css("position")) || i.css("position", "absolute"),
            i
        },
        _setPositionRelative: function() {
            /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
        },
        _adjustOffsetFromHelper: function(t) {
            typeof t == "string" && (t = t.split(" "));
            n.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            });
            "left"in t && (this.offset.click.left = t.left + this.margins.left);
            "right"in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left);
            "top"in t && (this.offset.click.top = t.top + this.margins.top);
            "bottom"in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _isRootNode: function(n) {
            return /(html|body)/i.test(n.tagName) || n === this.document[0]
        },
        _getParentOffset: function() {
            var t = this.offsetParent.offset()
              , i = this.document[0];
            return this.cssPosition === "absolute" && this.scrollParent[0] !== i && n.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(),
            t.top += this.scrollParent.scrollTop()),
            this._isRootNode(this.offsetParent[0]) && (t = {
                top: 0,
                left: 0
            }),
            {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition !== "relative")
                return {
                    top: 0,
                    left: 0
                };
            var n = this.element.position()
              , t = this._isRootNode(this.scrollParent[0]);
            return {
                top: n.top - (parseInt(this.helper.css("top"), 10) || 0) + (t ? 0 : this.scrollParent.scrollTop()),
                left: n.left - (parseInt(this.helper.css("left"), 10) || 0) + (t ? 0 : this.scrollParent.scrollLeft())
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var f, t, i, r = this.options, u = this.document[0];
            if (this.relativeContainer = null,
            !r.containment) {
                this.containment = null;
                return
            }
            if (r.containment === "window") {
                this.containment = [n(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, n(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, n(window).scrollLeft() + n(window).width() - this.helperProportions.width - this.margins.left, n(window).scrollTop() + (n(window).height() || u.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return
            }
            if (r.containment === "document") {
                this.containment = [0, 0, n(u).width() - this.helperProportions.width - this.margins.left, (n(u).height() || u.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return
            }
            if (r.containment.constructor === Array) {
                this.containment = r.containment;
                return
            }
            (r.containment === "parent" && (r.containment = this.helper[0].parentNode),
            t = n(r.containment),
            i = t[0],
            i) && (f = /(scroll|auto)/.test(t.css("overflow")),
            this.containment = [(parseInt(t.css("borderLeftWidth"), 10) || 0) + (parseInt(t.css("paddingLeft"), 10) || 0), (parseInt(t.css("borderTopWidth"), 10) || 0) + (parseInt(t.css("paddingTop"), 10) || 0), (f ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(t.css("borderRightWidth"), 10) || 0) - (parseInt(t.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (f ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(t.css("borderBottomWidth"), 10) || 0) - (parseInt(t.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom],
            this.relativeContainer = t)
        },
        _convertPositionTo: function(n, t) {
            t || (t = this.position);
            var i = n === "absolute" ? 1 : -1
              , r = this._isRootNode(this.scrollParent[0]);
            return {
                top: t.top + this.offset.relative.top * i + this.offset.parent.top * i - (this.cssPosition === "fixed" ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top) * i,
                left: t.left + this.offset.relative.left * i + this.offset.parent.left * i - (this.cssPosition === "fixed" ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left) * i
            }
        },
        _generatePosition: function(n, t) {
            var i, s, u, f, r = this.options, h = this._isRootNode(this.scrollParent[0]), e = n.pageX, o = n.pageY;
            return h && this.offset.scroll || (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft()
            }),
            t && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(),
            i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment,
            n.pageX - this.offset.click.left < i[0] && (e = i[0] + this.offset.click.left),
            n.pageY - this.offset.click.top < i[1] && (o = i[1] + this.offset.click.top),
            n.pageX - this.offset.click.left > i[2] && (e = i[2] + this.offset.click.left),
            n.pageY - this.offset.click.top > i[3] && (o = i[3] + this.offset.click.top)),
            r.grid && (u = r.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY,
            o = i ? u - this.offset.click.top >= i[1] || u - this.offset.click.top > i[3] ? u : u - this.offset.click.top >= i[1] ? u - r.grid[1] : u + r.grid[1] : u,
            f = r.grid[0] ? this.originalPageX + Math.round((e - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX,
            e = i ? f - this.offset.click.left >= i[0] || f - this.offset.click.left > i[2] ? f : f - this.offset.click.left >= i[0] ? f - r.grid[0] : f + r.grid[0] : f),
            r.axis === "y" && (e = this.originalPageX),
            r.axis === "x" && (o = this.originalPageY)),
            {
                top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.offset.scroll.top : h ? 0 : this.offset.scroll.top),
                left: e - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.offset.scroll.left : h ? 0 : this.offset.scroll.left)
            }
        },
        _clear: function() {
            this._removeClass(this.helper, "ui-draggable-dragging");
            this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = !1;
            this.destroyOnClear && this.destroy()
        },
        _trigger: function(t, i, r) {
            return r = r || this._uiHash(),
            n.ui.plugin.call(this, t, [i, r, this], !0),
            /^(drag|start|stop)/.test(t) && (this.positionAbs = this._convertPositionTo("absolute"),
            r.offset = this.positionAbs),
            n.Widget.prototype._trigger.call(this, t, i, r)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    n.ui.plugin.add("draggable", "connectToSortable", {
        start: function(t, i, r) {
            var u = n.extend({}, i, {
                item: r.element
            });
            r.sortables = [];
            n(r.options.connectToSortable).each(function() {
                var i = n(this).sortable("instance");
                i && !i.options.disabled && (r.sortables.push(i),
                i.refreshPositions(),
                i._trigger("activate", t, u))
            })
        },
        stop: function(t, i, r) {
            var u = n.extend({}, i, {
                item: r.element
            });
            r.cancelHelperRemoval = !1;
            n.each(r.sortables, function() {
                var n = this;
                n.isOver ? (n.isOver = 0,
                r.cancelHelperRemoval = !0,
                n.cancelHelperRemoval = !1,
                n._storedCSS = {
                    position: n.placeholder.css("position"),
                    top: n.placeholder.css("top"),
                    left: n.placeholder.css("left")
                },
                n._mouseStop(t),
                n.options.helper = n.options._helper) : (n.cancelHelperRemoval = !0,
                n._trigger("deactivate", t, u))
            })
        },
        drag: function(t, i, r) {
            n.each(r.sortables, function() {
                var f = !1
                  , u = this;
                u.positionAbs = r.positionAbs;
                u.helperProportions = r.helperProportions;
                u.offset.click = r.offset.click;
                u._intersectsWith(u.containerCache) && (f = !0,
                n.each(r.sortables, function() {
                    return this.positionAbs = r.positionAbs,
                    this.helperProportions = r.helperProportions,
                    this.offset.click = r.offset.click,
                    this !== u && this._intersectsWith(this.containerCache) && n.contains(u.element[0], this.element[0]) && (f = !1),
                    f
                }));
                f ? (u.isOver || (u.isOver = 1,
                r._parent = i.helper.parent(),
                u.currentItem = i.helper.appendTo(u.element).data("ui-sortable-item", !0),
                u.options._helper = u.options.helper,
                u.options.helper = function() {
                    return i.helper[0]
                }
                ,
                t.target = u.currentItem[0],
                u._mouseCapture(t, !0),
                u._mouseStart(t, !0, !0),
                u.offset.click.top = r.offset.click.top,
                u.offset.click.left = r.offset.click.left,
                u.offset.parent.left -= r.offset.parent.left - u.offset.parent.left,
                u.offset.parent.top -= r.offset.parent.top - u.offset.parent.top,
                r._trigger("toSortable", t),
                r.dropped = u.element,
                n.each(r.sortables, function() {
                    this.refreshPositions()
                }),
                r.currentItem = r.element,
                u.fromOutside = r),
                u.currentItem && (u._mouseDrag(t),
                i.position = u.position)) : u.isOver && (u.isOver = 0,
                u.cancelHelperRemoval = !0,
                u.options._revert = u.options.revert,
                u.options.revert = !1,
                u._trigger("out", t, u._uiHash(u)),
                u._mouseStop(t, !0),
                u.options.revert = u.options._revert,
                u.options.helper = u.options._helper,
                u.placeholder && u.placeholder.remove(),
                i.helper.appendTo(r._parent),
                r._refreshOffsets(t),
                i.position = r._generatePosition(t, !0),
                r._trigger("fromSortable", t),
                r.dropped = !1,
                n.each(r.sortables, function() {
                    this.refreshPositions()
                }))
            })
        }
    });
    n.ui.plugin.add("draggable", "cursor", {
        start: function(t, i, r) {
            var u = n("body")
              , f = r.options;
            u.css("cursor") && (f._cursor = u.css("cursor"));
            u.css("cursor", f.cursor)
        },
        stop: function(t, i, r) {
            var u = r.options;
            u._cursor && n("body").css("cursor", u._cursor)
        }
    });
    n.ui.plugin.add("draggable", "opacity", {
        start: function(t, i, r) {
            var u = n(i.helper)
              , f = r.options;
            u.css("opacity") && (f._opacity = u.css("opacity"));
            u.css("opacity", f.opacity)
        },
        stop: function(t, i, r) {
            var u = r.options;
            u._opacity && n(i.helper).css("opacity", u._opacity)
        }
    });
    n.ui.plugin.add("draggable", "scroll", {
        start: function(n, t, i) {
            i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1));
            i.scrollParentNotHidden[0] !== i.document[0] && i.scrollParentNotHidden[0].tagName !== "HTML" && (i.overflowOffset = i.scrollParentNotHidden.offset())
        },
        drag: function(t, i, r) {
            var u = r.options
              , o = !1
              , e = r.scrollParentNotHidden[0]
              , f = r.document[0];
            e !== f && e.tagName !== "HTML" ? (u.axis && u.axis === "x" || (r.overflowOffset.top + e.offsetHeight - t.pageY < u.scrollSensitivity ? e.scrollTop = o = e.scrollTop + u.scrollSpeed : t.pageY - r.overflowOffset.top < u.scrollSensitivity && (e.scrollTop = o = e.scrollTop - u.scrollSpeed)),
            u.axis && u.axis === "y" || (r.overflowOffset.left + e.offsetWidth - t.pageX < u.scrollSensitivity ? e.scrollLeft = o = e.scrollLeft + u.scrollSpeed : t.pageX - r.overflowOffset.left < u.scrollSensitivity && (e.scrollLeft = o = e.scrollLeft - u.scrollSpeed))) : (u.axis && u.axis === "x" || (t.pageY - n(f).scrollTop() < u.scrollSensitivity ? o = n(f).scrollTop(n(f).scrollTop() - u.scrollSpeed) : n(window).height() - (t.pageY - n(f).scrollTop()) < u.scrollSensitivity && (o = n(f).scrollTop(n(f).scrollTop() + u.scrollSpeed))),
            u.axis && u.axis === "y" || (t.pageX - n(f).scrollLeft() < u.scrollSensitivity ? o = n(f).scrollLeft(n(f).scrollLeft() - u.scrollSpeed) : n(window).width() - (t.pageX - n(f).scrollLeft()) < u.scrollSensitivity && (o = n(f).scrollLeft(n(f).scrollLeft() + u.scrollSpeed))));
            o !== !1 && n.ui.ddmanager && !u.dropBehaviour && n.ui.ddmanager.prepareOffsets(r, t)
        }
    });
    n.ui.plugin.add("draggable", "snap", {
        start: function(t, i, r) {
            var u = r.options;
            r.snapElements = [];
            n(u.snap.constructor !== String ? u.snap.items || ":data(ui-draggable)" : u.snap).each(function() {
                var t = n(this)
                  , i = t.offset();
                this !== r.element[0] && r.snapElements.push({
                    item: this,
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    top: i.top,
                    left: i.left
                })
            })
        },
        drag: function(t, i, r) {
            for (var e, o, s, h, c, a, l, v, w, b = r.options, f = b.snapTolerance, y = i.offset.left, k = y + r.helperProportions.width, p = i.offset.top, d = p + r.helperProportions.height, u = r.snapElements.length - 1; u >= 0; u--) {
                if (c = r.snapElements[u].left - r.margins.left,
                a = c + r.snapElements[u].width,
                l = r.snapElements[u].top - r.margins.top,
                v = l + r.snapElements[u].height,
                k < c - f || y > a + f || d < l - f || p > v + f || !n.contains(r.snapElements[u].item.ownerDocument, r.snapElements[u].item)) {
                    r.snapElements[u].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, n.extend(r._uiHash(), {
                        snapItem: r.snapElements[u].item
                    }));
                    r.snapElements[u].snapping = !1;
                    continue
                }
                b.snapMode !== "inner" && (e = Math.abs(l - d) <= f,
                o = Math.abs(v - p) <= f,
                s = Math.abs(c - k) <= f,
                h = Math.abs(a - y) <= f,
                e && (i.position.top = r._convertPositionTo("relative", {
                    top: l - r.helperProportions.height,
                    left: 0
                }).top),
                o && (i.position.top = r._convertPositionTo("relative", {
                    top: v,
                    left: 0
                }).top),
                s && (i.position.left = r._convertPositionTo("relative", {
                    top: 0,
                    left: c - r.helperProportions.width
                }).left),
                h && (i.position.left = r._convertPositionTo("relative", {
                    top: 0,
                    left: a
                }).left));
                w = e || o || s || h;
                b.snapMode !== "outer" && (e = Math.abs(l - p) <= f,
                o = Math.abs(v - d) <= f,
                s = Math.abs(c - y) <= f,
                h = Math.abs(a - k) <= f,
                e && (i.position.top = r._convertPositionTo("relative", {
                    top: l,
                    left: 0
                }).top),
                o && (i.position.top = r._convertPositionTo("relative", {
                    top: v - r.helperProportions.height,
                    left: 0
                }).top),
                s && (i.position.left = r._convertPositionTo("relative", {
                    top: 0,
                    left: c
                }).left),
                h && (i.position.left = r._convertPositionTo("relative", {
                    top: 0,
                    left: a - r.helperProportions.width
                }).left));
                !r.snapElements[u].snapping && (e || o || s || h || w) && r.options.snap.snap && r.options.snap.snap.call(r.element, t, n.extend(r._uiHash(), {
                    snapItem: r.snapElements[u].item
                }));
                r.snapElements[u].snapping = e || o || s || h || w
            }
        }
    });
    n.ui.plugin.add("draggable", "stack", {
        start: function(t, i, r) {
            var f, e = r.options, u = n.makeArray(n(e.stack)).sort(function(t, i) {
                return (parseInt(n(t).css("zIndex"), 10) || 0) - (parseInt(n(i).css("zIndex"), 10) || 0)
            });
            u.length && (f = parseInt(n(u[0]).css("zIndex"), 10) || 0,
            n(u).each(function(t) {
                n(this).css("zIndex", f + t)
            }),
            this.css("zIndex", f + u.length))
        }
    });
    n.ui.plugin.add("draggable", "zIndex", {
        start: function(t, i, r) {
            var u = n(i.helper)
              , f = r.options;
            u.css("zIndex") && (f._zIndex = u.css("zIndex"));
            u.css("zIndex", f.zIndex)
        },
        stop: function(t, i, r) {
            var u = r.options;
            u._zIndex && n(i.helper).css("zIndex", u._zIndex)
        }
    });
    ft = n.ui.draggable;
    /*!
	 * jQuery UI Droppable 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    n.widget("ui.droppable", {
        version: "1.12.1",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            addClasses: !0,
            greedy: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var t, i = this.options, r = i.accept;
            this.isover = !1;
            this.isout = !0;
            this.accept = n.isFunction(r) ? r : function(n) {
                return n.is(r)
            }
            ;
            this.proportions = function() {
                if (arguments.length)
                    t = arguments[0];
                else
                    return t ? t : t = {
                        width: this.element[0].offsetWidth,
                        height: this.element[0].offsetHeight
                    }
            }
            ;
            this._addToManager(i.scope);
            i.addClasses && this._addClass("ui-droppable")
        },
        _addToManager: function(t) {
            n.ui.ddmanager.droppables[t] = n.ui.ddmanager.droppables[t] || [];
            n.ui.ddmanager.droppables[t].push(this)
        },
        _splice: function(n) {
            for (var t = 0; t < n.length; t++)
                n[t] === this && n.splice(t, 1)
        },
        _destroy: function() {
            var t = n.ui.ddmanager.droppables[this.options.scope];
            this._splice(t)
        },
        _setOption: function(t, i) {
            if (t === "accept")
                this.accept = n.isFunction(i) ? i : function(n) {
                    return n.is(i)
                }
                ;
            else if (t === "scope") {
                var r = n.ui.ddmanager.droppables[this.options.scope];
                this._splice(r);
                this._addToManager(i)
            }
            this._super(t, i)
        },
        _activate: function(t) {
            var i = n.ui.ddmanager.current;
            this._addActiveClass();
            i && this._trigger("activate", t, this.ui(i))
        },
        _deactivate: function(t) {
            var i = n.ui.ddmanager.current;
            this._removeActiveClass();
            i && this._trigger("deactivate", t, this.ui(i))
        },
        _over: function(t) {
            var i = n.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._addHoverClass(),
            this._trigger("over", t, this.ui(i)))
        },
        _out: function(t) {
            var i = n.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeHoverClass(),
            this._trigger("out", t, this.ui(i)))
        },
        _drop: function(t, r) {
            var u = r || n.ui.ddmanager.current
              , f = !1;
            return !u || (u.currentItem || u.element)[0] === this.element[0] ? !1 : (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var r = n(this).droppable("instance");
                if (r.options.greedy && !r.options.disabled && r.options.scope === u.options.scope && r.accept.call(r.element[0], u.currentItem || u.element) && i(u, n.extend(r, {
                    offset: r.element.offset()
                }), r.options.tolerance, t))
                    return f = !0,
                    !1
            }),
            f) ? !1 : this.accept.call(this.element[0], u.currentItem || u.element) ? (this._removeActiveClass(),
            this._removeHoverClass(),
            this._trigger("drop", t, this.ui(u)),
            this.element) : !1
        },
        ui: function(n) {
            return {
                draggable: n.currentItem || n.element,
                helper: n.helper,
                position: n.position,
                offset: n.positionAbs
            }
        },
        _addHoverClass: function() {
            this._addClass("ui-droppable-hover")
        },
        _removeHoverClass: function() {
            this._removeClass("ui-droppable-hover")
        },
        _addActiveClass: function() {
            this._addClass("ui-droppable-active")
        },
        _removeActiveClass: function() {
            this._removeClass("ui-droppable-active")
        }
    });
    i = n.ui.intersect = function() {
        function n(n, t, i) {
            return n >= t && n < t + i
        }
        return function(t, i, r, u) {
            if (!i.offset)
                return !1;
            var o = (t.positionAbs || t.position.absolute).left + t.margins.left
              , s = (t.positionAbs || t.position.absolute).top + t.margins.top
              , h = o + t.helperProportions.width
              , c = s + t.helperProportions.height
              , f = i.offset.left
              , e = i.offset.top
              , l = f + i.proportions().width
              , a = e + i.proportions().height;
            switch (r) {
            case "fit":
                return f <= o && h <= l && e <= s && c <= a;
            case "intersect":
                return f < o + t.helperProportions.width / 2 && h - t.helperProportions.width / 2 < l && e < s + t.helperProportions.height / 2 && c - t.helperProportions.height / 2 < a;
            case "pointer":
                return n(u.pageY, e, i.proportions().height) && n(u.pageX, f, i.proportions().width);
            case "touch":
                return (s >= e && s <= a || c >= e && c <= a || s < e && c > a) && (o >= f && o <= l || h >= f && h <= l || o < f && h > l);
            default:
                return !1
            }
        }
    }();
    n.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(t, i) {
            var r, f, u = n.ui.ddmanager.droppables[t.options.scope] || [], o = i ? i.type : null, e = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
            n: for (r = 0; r < u.length; r++)
                if (!u[r].options.disabled && (!t || u[r].accept.call(u[r].element[0], t.currentItem || t.element))) {
                    for (f = 0; f < e.length; f++)
                        if (e[f] === u[r].element[0]) {
                            u[r].proportions().height = 0;
                            continue n
                        }
                    (u[r].visible = u[r].element.css("display") !== "none",
                    u[r].visible) && (o === "mousedown" && u[r]._activate.call(u[r], i),
                    u[r].offset = u[r].element.offset(),
                    u[r].proportions({
                        width: u[r].element[0].offsetWidth,
                        height: u[r].element[0].offsetHeight
                    }))
                }
        },
        drop: function(t, r) {
            var u = !1;
            return n.each((n.ui.ddmanager.droppables[t.options.scope] || []).slice(), function() {
                this.options && (!this.options.disabled && this.visible && i(t, this, this.options.tolerance, r) && (u = this._drop.call(this, r) || u),
                !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0,
                this.isover = !1,
                this._deactivate.call(this, r)))
            }),
            u
        },
        dragStart: function(t, i) {
            t.element.parentsUntil("body").on("scroll.droppable", function() {
                t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i)
            })
        },
        drag: function(t, r) {
            t.options.refreshPositions && n.ui.ddmanager.prepareOffsets(t, r);
            n.each(n.ui.ddmanager.droppables[t.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var u, o, e, s = i(t, this, this.options.tolerance, r), f = !s && this.isover ? "isout" : s && !this.isover ? "isover" : null;
                    f && (this.options.greedy && (o = this.options.scope,
                    e = this.element.parents(":data(ui-droppable)").filter(function() {
                        return n(this).droppable("instance").options.scope === o
                    }),
                    e.length && (u = n(e[0]).droppable("instance"),
                    u.greedyChild = f === "isover")),
                    u && f === "isover" && (u.isover = !1,
                    u.isout = !0,
                    u._out.call(u, r)),
                    this[f] = !0,
                    this[f === "isout" ? "isover" : "isout"] = !1,
                    this[f === "isover" ? "_over" : "_out"].call(this, r),
                    u && f === "isout" && (u.isout = !1,
                    u.isover = !0,
                    u._over.call(u, r)))
                }
            })
        },
        dragStop: function(t, i) {
            t.element.parentsUntil("body").off("scroll.droppable");
            t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i)
        }
    };
    n.uiBackCompat !== !1 && n.widget("ui.droppable", n.ui.droppable, {
        options: {
            hoverClass: !1,
            activeClass: !1
        },
        _addActiveClass: function() {
            this._super();
            this.options.activeClass && this.element.addClass(this.options.activeClass)
        },
        _removeActiveClass: function() {
            this._super();
            this.options.activeClass && this.element.removeClass(this.options.activeClass)
        },
        _addHoverClass: function() {
            this._super();
            this.options.hoverClass && this.element.addClass(this.options.hoverClass)
        },
        _removeHoverClass: function() {
            this._super();
            this.options.hoverClass && this.element.removeClass(this.options.hoverClass)
        }
    });
    et = n.ui.droppable;
    /*!
	 * jQuery UI Resizable 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    n.widget("ui.resizable", n.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            classes: {
                "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
            },
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function(n) {
            return parseFloat(n) || 0
        },
        _isNumber: function(n) {
            return !isNaN(parseFloat(n))
        },
        _hasScroll: function(t, i) {
            if (n(t).css("overflow") === "hidden")
                return !1;
            var r = i && i === "left" ? "scrollLeft" : "scrollTop"
              , u = !1;
            return t[r] > 0 ? !0 : (t[r] = 1,
            u = t[r] > 0,
            t[r] = 0,
            u)
        },
        _create: function() {
            var r, t = this.options, i = this;
            if (this._addClass("ui-resizable"),
            n.extend(this, {
                _aspectRatio: !!t.aspectRatio,
                aspectRatio: t.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: t.helper || t.ghost || t.animate ? t.helper || "ui-resizable-helper" : null
            }),
            this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(n("<div class='ui-wrapper' style='overflow: hidden;'><\/div>").css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })),
            this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")),
            this.elementIsWrapper = !0,
            r = {
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom"),
                marginLeft: this.originalElement.css("marginLeft")
            },
            this.element.css(r),
            this.originalElement.css("margin", 0),
            this.originalResizeStyle = this.originalElement.css("resize"),
            this.originalElement.css("resize", "none"),
            this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })),
            this.originalElement.css(r),
            this._proportionallyResize()),
            this._setupHandles(),
            t.autoHide)
                n(this.element).on("mouseenter", function() {
                    t.disabled || (i._removeClass("ui-resizable-autohide"),
                    i._handles.show())
                }).on("mouseleave", function() {
                    t.disabled || i.resizing || (i._addClass("ui-resizable-autohide"),
                    i._handles.hide())
                });
            this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            var t, i = function(t) {
                n(t).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()
            };
            return this.elementIsWrapper && (i(this.element),
            t = this.element,
            this.originalElement.css({
                position: t.css("position"),
                width: t.outerWidth(),
                height: t.outerHeight(),
                top: t.css("top"),
                left: t.css("left")
            }).insertAfter(t),
            t.remove()),
            this.originalElement.css("resize", this.originalResizeStyle),
            i(this.originalElement),
            this
        },
        _setOption: function(n, t) {
            this._super(n, t);
            switch (n) {
            case "handles":
                this._removeHandles();
                this._setupHandles()
            }
        },
        _setupHandles: function() {
            var u = this.options, i, r, f, o, t, e = this;
            if (this.handles = u.handles || (n(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            } : "e,s,se"),
            this._handles = n(),
            this.handles.constructor === String)
                for (this.handles === "all" && (this.handles = "n,e,s,w,se,sw,ne,nw"),
                f = this.handles.split(","),
                this.handles = {},
                r = 0; r < f.length; r++)
                    i = n.trim(f[r]),
                    o = "ui-resizable-" + i,
                    t = n("<div>"),
                    this._addClass(t, "ui-resizable-handle " + o),
                    t.css({
                        zIndex: u.zIndex
                    }),
                    this.handles[i] = ".ui-resizable-" + i,
                    this.element.append(t);
            this._renderAxis = function(t) {
                var i, r, u, f;
                t = t || this.element;
                for (i in this.handles)
                    this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = n(this.handles[i]),
                    this._on(this.handles[i], {
                        mousedown: e._mouseDown
                    })),
                    this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (r = n(this.handles[i], this.element),
                    f = /sw|ne|nw|se|n|s/.test(i) ? r.outerHeight() : r.outerWidth(),
                    u = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""),
                    t.css(u, f),
                    this._proportionallyResize()),
                    this._handles = this._handles.add(this.handles[i])
            }
            ;
            this._renderAxis(this.element);
            this._handles = this._handles.add(this.element.find(".ui-resizable-handle"));
            this._handles.disableSelection();
            this._handles.on("mouseover", function() {
                e.resizing || (this.className && (t = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),
                e.axis = t && t[1] ? t[1] : "se")
            });
            u.autoHide && (this._handles.hide(),
            this._addClass("ui-resizable-autohide"))
        },
        _removeHandles: function() {
            this._handles.remove()
        },
        _mouseCapture: function(t) {
            var r, i, u = !1;
            for (r in this.handles)
                i = n(this.handles[r])[0],
                (i === t.target || n.contains(i, t.target)) && (u = !0);
            return !this.options.disabled && u
        },
        _mouseStart: function(t) {
            var u, f, e, r = this.options, i = this.element;
            return this.resizing = !0,
            this._renderProxy(),
            u = this._num(this.helper.css("left")),
            f = this._num(this.helper.css("top")),
            r.containment && (u += n(r.containment).scrollLeft() || 0,
            f += n(r.containment).scrollTop() || 0),
            this.offset = this.helper.offset(),
            this.position = {
                left: u,
                top: f
            },
            this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: i.width(),
                height: i.height()
            },
            this.originalSize = this._helper ? {
                width: i.outerWidth(),
                height: i.outerHeight()
            } : {
                width: i.width(),
                height: i.height()
            },
            this.sizeDiff = {
                width: i.outerWidth() - i.width(),
                height: i.outerHeight() - i.height()
            },
            this.originalPosition = {
                left: u,
                top: f
            },
            this.originalMousePosition = {
                left: t.pageX,
                top: t.pageY
            },
            this.aspectRatio = typeof r.aspectRatio == "number" ? r.aspectRatio : this.originalSize.width / this.originalSize.height || 1,
            e = n(".ui-resizable-" + this.axis).css("cursor"),
            n("body").css("cursor", e === "auto" ? this.axis + "-resize" : e),
            this._addClass("ui-resizable-resizing"),
            this._propagate("start", t),
            !0
        },
        _mouseDrag: function(t) {
            var i, r, u = this.originalMousePosition, e = this.axis, o = t.pageX - u.left || 0, s = t.pageY - u.top || 0, f = this._change[e];
            return (this._updatePrevProperties(),
            !f) ? !1 : (i = f.apply(this, [t, o, s]),
            this._updateVirtualBoundaries(t.shiftKey),
            (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)),
            i = this._respectSize(i, t),
            this._updateCache(i),
            this._propagate("resize", t),
            r = this._applyChanges(),
            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(),
            n.isEmptyObject(r) || (this._updatePrevProperties(),
            this._trigger("resize", t, this.ui()),
            this._applyChanges()),
            !1)
        },
        _mouseStop: function(t) {
            this.resizing = !1;
            var r, u, f, e, o, s, h, c = this.options, i = this;
            return this._helper && (r = this._proportionallyResizeElements,
            u = r.length && /textarea/i.test(r[0].nodeName),
            f = u && this._hasScroll(r[0], "left") ? 0 : i.sizeDiff.height,
            e = u ? 0 : i.sizeDiff.width,
            o = {
                width: i.helper.width() - e,
                height: i.helper.height() - f
            },
            s = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null,
            h = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null,
            c.animate || this.element.css(n.extend(o, {
                top: h,
                left: s
            })),
            i.helper.height(i.size.height),
            i.helper.width(i.size.width),
            this._helper && !c.animate && this._proportionallyResize()),
            n("body").css("cursor", "auto"),
            this._removeClass("ui-resizable-resizing"),
            this._propagate("stop", t),
            this._helper && this.helper.remove(),
            !1
        },
        _updatePrevProperties: function() {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            };
            this.prevSize = {
                width: this.size.width,
                height: this.size.height
            }
        },
        _applyChanges: function() {
            var n = {};
            return this.position.top !== this.prevPosition.top && (n.top = this.position.top + "px"),
            this.position.left !== this.prevPosition.left && (n.left = this.position.left + "px"),
            this.size.width !== this.prevSize.width && (n.width = this.size.width + "px"),
            this.size.height !== this.prevSize.height && (n.height = this.size.height + "px"),
            this.helper.css(n),
            n
        },
        _updateVirtualBoundaries: function(n) {
            var r, u, f, e, t, i = this.options;
            t = {
                minWidth: this._isNumber(i.minWidth) ? i.minWidth : 0,
                maxWidth: this._isNumber(i.maxWidth) ? i.maxWidth : Infinity,
                minHeight: this._isNumber(i.minHeight) ? i.minHeight : 0,
                maxHeight: this._isNumber(i.maxHeight) ? i.maxHeight : Infinity
            };
            (this._aspectRatio || n) && (r = t.minHeight * this.aspectRatio,
            f = t.minWidth / this.aspectRatio,
            u = t.maxHeight * this.aspectRatio,
            e = t.maxWidth / this.aspectRatio,
            r > t.minWidth && (t.minWidth = r),
            f > t.minHeight && (t.minHeight = f),
            u < t.maxWidth && (t.maxWidth = u),
            e < t.maxHeight && (t.maxHeight = e));
            this._vBoundaries = t
        },
        _updateCache: function(n) {
            this.offset = this.helper.offset();
            this._isNumber(n.left) && (this.position.left = n.left);
            this._isNumber(n.top) && (this.position.top = n.top);
            this._isNumber(n.height) && (this.size.height = n.height);
            this._isNumber(n.width) && (this.size.width = n.width)
        },
        _updateRatio: function(n) {
            var t = this.position
              , i = this.size
              , r = this.axis;
            return this._isNumber(n.height) ? n.width = n.height * this.aspectRatio : this._isNumber(n.width) && (n.height = n.width / this.aspectRatio),
            r === "sw" && (n.left = t.left + (i.width - n.width),
            n.top = null),
            r === "nw" && (n.top = t.top + (i.height - n.height),
            n.left = t.left + (i.width - n.width)),
            n
        },
        _respectSize: function(n) {
            var t = this._vBoundaries
              , i = this.axis
              , r = this._isNumber(n.width) && t.maxWidth && t.maxWidth < n.width
              , u = this._isNumber(n.height) && t.maxHeight && t.maxHeight < n.height
              , f = this._isNumber(n.width) && t.minWidth && t.minWidth > n.width
              , e = this._isNumber(n.height) && t.minHeight && t.minHeight > n.height
              , o = this.originalPosition.left + this.originalSize.width
              , s = this.originalPosition.top + this.originalSize.height
              , h = /sw|nw|w/.test(i)
              , c = /nw|ne|n/.test(i);
            return f && (n.width = t.minWidth),
            e && (n.height = t.minHeight),
            r && (n.width = t.maxWidth),
            u && (n.height = t.maxHeight),
            f && h && (n.left = o - t.minWidth),
            r && h && (n.left = o - t.maxWidth),
            e && c && (n.top = s - t.minHeight),
            u && c && (n.top = s - t.maxHeight),
            n.width || n.height || n.left || !n.top ? n.width || n.height || n.top || !n.left || (n.left = null) : n.top = null,
            n
        },
        _getPaddingPlusBorderDimensions: function(n) {
            for (var t = 0, i = [], r = [n.css("borderTopWidth"), n.css("borderRightWidth"), n.css("borderBottomWidth"), n.css("borderLeftWidth")], u = [n.css("paddingTop"), n.css("paddingRight"), n.css("paddingBottom"), n.css("paddingLeft")]; t < 4; t++)
                i[t] = parseFloat(r[t]) || 0,
                i[t] += parseFloat(u[t]) || 0;
            return {
                height: i[0] + i[2],
                width: i[1] + i[3]
            }
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length)
                for (var n, t = 0, i = this.helper || this.element; t < this._proportionallyResizeElements.length; t++)
                    n = this._proportionallyResizeElements[t],
                    this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(n)),
                    n.css({
                        height: i.height() - this.outerDimensions.height || 0,
                        width: i.width() - this.outerDimensions.width || 0
                    })
        },
        _renderProxy: function() {
            var t = this.element
              , i = this.options;
            this.elementOffset = t.offset();
            this._helper ? (this.helper = this.helper || n("<div style='overflow:hidden;'><\/div>"),
            this._addClass(this.helper, this._helper),
            this.helper.css({
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++i.zIndex
            }),
            this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function(n, t) {
                return {
                    width: this.originalSize.width + t
                }
            },
            w: function(n, t) {
                var i = this.originalSize
                  , r = this.originalPosition;
                return {
                    left: r.left + t,
                    width: i.width - t
                }
            },
            n: function(n, t, i) {
                var r = this.originalSize
                  , u = this.originalPosition;
                return {
                    top: u.top + i,
                    height: r.height - i
                }
            },
            s: function(n, t, i) {
                return {
                    height: this.originalSize.height + i
                }
            },
            se: function(t, i, r) {
                return n.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, r]))
            },
            sw: function(t, i, r) {
                return n.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, r]))
            },
            ne: function(t, i, r) {
                return n.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, r]))
            },
            nw: function(t, i, r) {
                return n.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, r]))
            }
        },
        _propagate: function(t, i) {
            n.ui.plugin.call(this, t, [i, this.ui()]);
            t !== "resize" && this._trigger(t, i, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    n.ui.plugin.add("resizable", "animate", {
        stop: function(t) {
            var i = n(this).resizable("instance")
              , u = i.options
              , r = i._proportionallyResizeElements
              , f = r.length && /textarea/i.test(r[0].nodeName)
              , s = f && i._hasScroll(r[0], "left") ? 0 : i.sizeDiff.height
              , h = f ? 0 : i.sizeDiff.width
              , c = {
                width: i.size.width - h,
                height: i.size.height - s
            }
              , e = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null
              , o = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(n.extend(c, o && e ? {
                top: o,
                left: e
            } : {}), {
                duration: u.animateDuration,
                easing: u.animateEasing,
                step: function() {
                    var u = {
                        width: parseFloat(i.element.css("width")),
                        height: parseFloat(i.element.css("height")),
                        top: parseFloat(i.element.css("top")),
                        left: parseFloat(i.element.css("left"))
                    };
                    r && r.length && n(r[0]).css({
                        width: u.width,
                        height: u.height
                    });
                    i._updateCache(u);
                    i._propagate("resize", t)
                }
            })
        }
    });
    n.ui.plugin.add("resizable", "containment", {
        start: function() {
            var r, f, e, o, s, h, c, t = n(this).resizable("instance"), l = t.options, a = t.element, u = l.containment, i = u instanceof n ? u.get(0) : /parent/.test(u) ? a.parent().get(0) : u;
            i && (t.containerElement = n(i),
            /document/.test(u) || u === document ? (t.containerOffset = {
                left: 0,
                top: 0
            },
            t.containerPosition = {
                left: 0,
                top: 0
            },
            t.parentData = {
                element: n(document),
                left: 0,
                top: 0,
                width: n(document).width(),
                height: n(document).height() || document.body.parentNode.scrollHeight
            }) : (r = n(i),
            f = [],
            n(["Top", "Right", "Left", "Bottom"]).each(function(n, i) {
                f[n] = t._num(r.css("padding" + i))
            }),
            t.containerOffset = r.offset(),
            t.containerPosition = r.position(),
            t.containerSize = {
                height: r.innerHeight() - f[3],
                width: r.innerWidth() - f[1]
            },
            e = t.containerOffset,
            o = t.containerSize.height,
            s = t.containerSize.width,
            h = t._hasScroll(i, "left") ? i.scrollWidth : s,
            c = t._hasScroll(i) ? i.scrollHeight : o,
            t.parentData = {
                element: i,
                left: e.left,
                top: e.top,
                width: h,
                height: c
            }))
        },
        resize: function(t) {
            var o, s, h, c, i = n(this).resizable("instance"), v = i.options, r = i.containerOffset, l = i.position, f = i._aspectRatio || t.shiftKey, e = {
                top: 0,
                left: 0
            }, a = i.containerElement, u = !0;
            a[0] !== document && /static/.test(a.css("position")) && (e = r);
            l.left < (i._helper ? r.left : 0) && (i.size.width = i.size.width + (i._helper ? i.position.left - r.left : i.position.left - e.left),
            f && (i.size.height = i.size.width / i.aspectRatio,
            u = !1),
            i.position.left = v.helper ? r.left : 0);
            l.top < (i._helper ? r.top : 0) && (i.size.height = i.size.height + (i._helper ? i.position.top - r.top : i.position.top),
            f && (i.size.width = i.size.height * i.aspectRatio,
            u = !1),
            i.position.top = i._helper ? r.top : 0);
            h = i.containerElement.get(0) === i.element.parent().get(0);
            c = /relative|absolute/.test(i.containerElement.css("position"));
            h && c ? (i.offset.left = i.parentData.left + i.position.left,
            i.offset.top = i.parentData.top + i.position.top) : (i.offset.left = i.element.offset().left,
            i.offset.top = i.element.offset().top);
            o = Math.abs(i.sizeDiff.width + (i._helper ? i.offset.left - e.left : i.offset.left - r.left));
            s = Math.abs(i.sizeDiff.height + (i._helper ? i.offset.top - e.top : i.offset.top - r.top));
            o + i.size.width >= i.parentData.width && (i.size.width = i.parentData.width - o,
            f && (i.size.height = i.size.width / i.aspectRatio,
            u = !1));
            s + i.size.height >= i.parentData.height && (i.size.height = i.parentData.height - s,
            f && (i.size.width = i.size.height * i.aspectRatio,
            u = !1));
            u || (i.position.left = i.prevPosition.left,
            i.position.top = i.prevPosition.top,
            i.size.width = i.prevSize.width,
            i.size.height = i.prevSize.height)
        },
        stop: function() {
            var t = n(this).resizable("instance")
              , r = t.options
              , u = t.containerOffset
              , f = t.containerPosition
              , e = t.containerElement
              , i = n(t.helper)
              , o = i.offset()
              , s = i.outerWidth() - t.sizeDiff.width
              , h = i.outerHeight() - t.sizeDiff.height;
            t._helper && !r.animate && /relative/.test(e.css("position")) && n(this).css({
                left: o.left - f.left - u.left,
                width: s,
                height: h
            });
            t._helper && !r.animate && /static/.test(e.css("position")) && n(this).css({
                left: o.left - f.left - u.left,
                width: s,
                height: h
            })
        }
    });
    n.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var t = n(this).resizable("instance")
              , i = t.options;
            n(i.alsoResize).each(function() {
                var t = n(this);
                t.data("ui-resizable-alsoresize", {
                    width: parseFloat(t.width()),
                    height: parseFloat(t.height()),
                    left: parseFloat(t.css("left")),
                    top: parseFloat(t.css("top"))
                })
            })
        },
        resize: function(t, i) {
            var r = n(this).resizable("instance")
              , e = r.options
              , u = r.originalSize
              , f = r.originalPosition
              , o = {
                height: r.size.height - u.height || 0,
                width: r.size.width - u.width || 0,
                top: r.position.top - f.top || 0,
                left: r.position.left - f.left || 0
            };
            n(e.alsoResize).each(function() {
                var t = n(this)
                  , u = n(this).data("ui-resizable-alsoresize")
                  , r = {}
                  , f = t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                n.each(f, function(n, t) {
                    var i = (u[t] || 0) + (o[t] || 0);
                    i && i >= 0 && (r[t] = i || null)
                });
                t.css(r)
            })
        },
        stop: function() {
            n(this).removeData("ui-resizable-alsoresize")
        }
    });
    n.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var t = n(this).resizable("instance")
              , i = t.size;
            t.ghost = t.originalElement.clone();
            t.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: i.height,
                width: i.width,
                margin: 0,
                left: 0,
                top: 0
            });
            t._addClass(t.ghost, "ui-resizable-ghost");
            n.uiBackCompat !== !1 && typeof t.options.ghost == "string" && t.ghost.addClass(this.options.ghost);
            t.ghost.appendTo(t.helper)
        },
        resize: function() {
            var t = n(this).resizable("instance");
            t.ghost && t.ghost.css({
                position: "relative",
                height: t.size.height,
                width: t.size.width
            })
        },
        stop: function() {
            var t = n(this).resizable("instance");
            t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
        }
    });
    n.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var h, t = n(this).resizable("instance"), i = t.options, y = t.size, o = t.originalSize, s = t.originalPosition, c = t.axis, l = typeof i.grid == "number" ? [i.grid, i.grid] : i.grid, f = l[0] || 1, e = l[1] || 1, a = Math.round((y.width - o.width) / f) * f, v = Math.round((y.height - o.height) / e) * e, r = o.width + a, u = o.height + v, p = i.maxWidth && i.maxWidth < r, w = i.maxHeight && i.maxHeight < u, b = i.minWidth && i.minWidth > r, k = i.minHeight && i.minHeight > u;
            i.grid = l;
            b && (r += f);
            k && (u += e);
            p && (r -= f);
            w && (u -= e);
            /^(se|s|e)$/.test(c) ? (t.size.width = r,
            t.size.height = u) : /^(ne)$/.test(c) ? (t.size.width = r,
            t.size.height = u,
            t.position.top = s.top - v) : /^(sw)$/.test(c) ? (t.size.width = r,
            t.size.height = u,
            t.position.left = s.left - a) : ((u - e <= 0 || r - f <= 0) && (h = t._getPaddingPlusBorderDimensions(this)),
            u - e > 0 ? (t.size.height = u,
            t.position.top = s.top - v) : (u = e - h.height,
            t.size.height = u,
            t.position.top = s.top + o.height - u),
            r - f > 0 ? (t.size.width = r,
            t.position.left = s.left - a) : (r = f - h.width,
            t.size.width = r,
            t.position.left = s.left + o.width - r))
        }
    });
    ot = n.ui.resizable;
    /*!
	 * jQuery UI Selectable 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    st = n.widget("ui.selectable", n.ui.mouse, {
        version: "1.12.1",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function() {
            var t = this;
            this._addClass("ui-selectable");
            this.dragged = !1;
            this.refresh = function() {
                t.elementPos = n(t.element[0]).offset();
                t.selectees = n(t.options.filter, t.element[0]);
                t._addClass(t.selectees, "ui-selectee");
                t.selectees.each(function() {
                    var i = n(this)
                      , u = i.offset()
                      , r = {
                        left: u.left - t.elementPos.left,
                        top: u.top - t.elementPos.top
                    };
                    n.data(this, "selectable-item", {
                        element: this,
                        $element: i,
                        left: r.left,
                        top: r.top,
                        right: r.left + i.outerWidth(),
                        bottom: r.top + i.outerHeight(),
                        startselected: !1,
                        selected: i.hasClass("ui-selected"),
                        selecting: i.hasClass("ui-selecting"),
                        unselecting: i.hasClass("ui-unselecting")
                    })
                })
            }
            ;
            this.refresh();
            this._mouseInit();
            this.helper = n("<div>");
            this._addClass(this.helper, "ui-selectable-helper")
        },
        _destroy: function() {
            this.selectees.removeData("selectable-item");
            this._mouseDestroy()
        },
        _mouseStart: function(t) {
            var i = this
              , r = this.options;
            (this.opos = [t.pageX, t.pageY],
            this.elementPos = n(this.element[0]).offset(),
            this.options.disabled) || (this.selectees = n(r.filter, this.element[0]),
            this._trigger("start", t),
            n(r.appendTo).append(this.helper),
            this.helper.css({
                left: t.pageX,
                top: t.pageY,
                width: 0,
                height: 0
            }),
            r.autoRefresh && this.refresh(),
            this.selectees.filter(".ui-selected").each(function() {
                var r = n.data(this, "selectable-item");
                r.startselected = !0;
                t.metaKey || t.ctrlKey || (i._removeClass(r.$element, "ui-selected"),
                r.selected = !1,
                i._addClass(r.$element, "ui-unselecting"),
                r.unselecting = !0,
                i._trigger("unselecting", t, {
                    unselecting: r.element
                }))
            }),
            n(t.target).parents().addBack().each(function() {
                var u, r = n.data(this, "selectable-item");
                if (r)
                    return u = !t.metaKey && !t.ctrlKey || !r.$element.hasClass("ui-selected"),
                    i._removeClass(r.$element, u ? "ui-unselecting" : "ui-selected")._addClass(r.$element, u ? "ui-selecting" : "ui-unselecting"),
                    r.unselecting = !u,
                    r.selecting = u,
                    r.selected = u,
                    u ? i._trigger("selecting", t, {
                        selecting: r.element
                    }) : i._trigger("unselecting", t, {
                        unselecting: r.element
                    }),
                    !1
            }))
        },
        _mouseDrag: function(t) {
            if (this.dragged = !0,
            !this.options.disabled) {
                var o, i = this, s = this.options, r = this.opos[0], u = this.opos[1], f = t.pageX, e = t.pageY;
                return r > f && (o = f,
                f = r,
                r = o),
                u > e && (o = e,
                e = u,
                u = o),
                this.helper.css({
                    left: r,
                    top: u,
                    width: f - r,
                    height: e - u
                }),
                this.selectees.each(function() {
                    var o = n.data(this, "selectable-item")
                      , c = !1
                      , h = {};
                    o && o.element !== i.element[0] && (h.left = o.left + i.elementPos.left,
                    h.right = o.right + i.elementPos.left,
                    h.top = o.top + i.elementPos.top,
                    h.bottom = o.bottom + i.elementPos.top,
                    s.tolerance === "touch" ? c = !(h.left > f || h.right < r || h.top > e || h.bottom < u) : s.tolerance === "fit" && (c = h.left > r && h.right < f && h.top > u && h.bottom < e),
                    c ? (o.selected && (i._removeClass(o.$element, "ui-selected"),
                    o.selected = !1),
                    o.unselecting && (i._removeClass(o.$element, "ui-unselecting"),
                    o.unselecting = !1),
                    o.selecting || (i._addClass(o.$element, "ui-selecting"),
                    o.selecting = !0,
                    i._trigger("selecting", t, {
                        selecting: o.element
                    }))) : (o.selecting && ((t.metaKey || t.ctrlKey) && o.startselected ? (i._removeClass(o.$element, "ui-selecting"),
                    o.selecting = !1,
                    i._addClass(o.$element, "ui-selected"),
                    o.selected = !0) : (i._removeClass(o.$element, "ui-selecting"),
                    o.selecting = !1,
                    o.startselected && (i._addClass(o.$element, "ui-unselecting"),
                    o.unselecting = !0),
                    i._trigger("unselecting", t, {
                        unselecting: o.element
                    }))),
                    o.selected && (t.metaKey || t.ctrlKey || o.startselected || (i._removeClass(o.$element, "ui-selected"),
                    o.selected = !1,
                    i._addClass(o.$element, "ui-unselecting"),
                    o.unselecting = !0,
                    i._trigger("unselecting", t, {
                        unselecting: o.element
                    })))))
                }),
                !1
            }
        },
        _mouseStop: function(t) {
            var i = this;
            return this.dragged = !1,
            n(".ui-unselecting", this.element[0]).each(function() {
                var r = n.data(this, "selectable-item");
                i._removeClass(r.$element, "ui-unselecting");
                r.unselecting = !1;
                r.startselected = !1;
                i._trigger("unselected", t, {
                    unselected: r.element
                })
            }),
            n(".ui-selecting", this.element[0]).each(function() {
                var r = n.data(this, "selectable-item");
                i._removeClass(r.$element, "ui-selecting")._addClass(r.$element, "ui-selected");
                r.selecting = !1;
                r.selected = !0;
                r.startselected = !0;
                i._trigger("selected", t, {
                    selected: r.element
                })
            }),
            this._trigger("stop", t),
            this.helper.remove(),
            !1
        }
    });
    /*!
	 * jQuery UI Sortable 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    ht = n.widget("ui.sortable", n.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _isOverAxis: function(n, t, i) {
            return n >= t && n < t + i
        },
        _isFloating: function(n) {
            return /left|right/.test(n.css("float")) || /inline|table-cell/.test(n.css("display"))
        },
        _create: function() {
            this.containerCache = {};
            this._addClass("ui-sortable");
            this.refresh();
            this.offset = this.element.offset();
            this._mouseInit();
            this._setHandleClassName();
            this.ready = !0
        },
        _setOption: function(n, t) {
            this._super(n, t);
            n === "handle" && this._setHandleClassName()
        },
        _setHandleClassName: function() {
            var t = this;
            this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle");
            n.each(this.items, function() {
                t._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle")
            })
        },
        _destroy: function() {
            this._mouseDestroy();
            for (var n = this.items.length - 1; n >= 0; n--)
                this.items[n].item.removeData(this.widgetName + "-item");
            return this
        },
        _mouseCapture: function(t, i) {
            var r = null
              , f = !1
              , u = this;
            return this.reverting ? !1 : this.options.disabled || this.options.type === "static" ? !1 : (this._refreshItems(t),
            n(t.target).parents().each(function() {
                if (n.data(this, u.widgetName + "-item") === u)
                    return r = n(this),
                    !1
            }),
            n.data(t.target, u.widgetName + "-item") === u && (r = n(t.target)),
            !r) ? !1 : this.options.handle && !i && (n(this.options.handle, r).find("*").addBack().each(function() {
                this === t.target && (f = !0)
            }),
            !f) ? !1 : (this.currentItem = r,
            this._removeCurrentsFromItems(),
            !0)
        },
        _mouseStart: function(t, i, r) {
            var f, e, u = this.options;
            if (this.currentContainer = this,
            this.refreshPositions(),
            this.helper = this._createHelper(t),
            this._cacheHelperProportions(),
            this._cacheMargins(),
            this.scrollParent = this.helper.scrollParent(),
            this.offset = this.currentItem.offset(),
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            },
            n.extend(this.offset, {
                click: {
                    left: t.pageX - this.offset.left,
                    top: t.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }),
            this.helper.css("position", "absolute"),
            this.cssPosition = this.helper.css("position"),
            this.originalPosition = this._generatePosition(t),
            this.originalPageX = t.pageX,
            this.originalPageY = t.pageY,
            u.cursorAt && this._adjustOffsetFromHelper(u.cursorAt),
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            },
            this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
            this._createPlaceholder(),
            u.containment && this._setContainment(),
            u.cursor && u.cursor !== "auto" && (e = this.document.find("body"),
            this.storedCursor = e.css("cursor"),
            e.css("cursor", u.cursor),
            this.storedStylesheet = n("<style>*{ cursor: " + u.cursor + " !important; }<\/style>").appendTo(e)),
            u.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")),
            this.helper.css("opacity", u.opacity)),
            u.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")),
            this.helper.css("zIndex", u.zIndex)),
            this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML" && (this.overflowOffset = this.scrollParent.offset()),
            this._trigger("start", t, this._uiHash()),
            this._preserveHelperProportions || this._cacheHelperProportions(),
            !r)
                for (f = this.containers.length - 1; f >= 0; f--)
                    this.containers[f]._trigger("activate", t, this._uiHash(this));
            return n.ui.ddmanager && (n.ui.ddmanager.current = this),
            n.ui.ddmanager && !u.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t),
            this.dragging = !0,
            this._addClass(this.helper, "ui-sortable-helper"),
            this._mouseDrag(t),
            !0
        },
        _mouseDrag: function(t) {
            var e, u, f, o, i = this.options, r = !1;
            for (this.position = this._generatePosition(t),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
            this.options.scroll && (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - this.overflowOffset.top < i.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - i.scrollSpeed),
            this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - this.overflowOffset.left < i.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - i.scrollSpeed)) : (t.pageY - this.document.scrollTop() < i.scrollSensitivity ? r = this.document.scrollTop(this.document.scrollTop() - i.scrollSpeed) : this.window.height() - (t.pageY - this.document.scrollTop()) < i.scrollSensitivity && (r = this.document.scrollTop(this.document.scrollTop() + i.scrollSpeed)),
            t.pageX - this.document.scrollLeft() < i.scrollSensitivity ? r = this.document.scrollLeft(this.document.scrollLeft() - i.scrollSpeed) : this.window.width() - (t.pageX - this.document.scrollLeft()) < i.scrollSensitivity && (r = this.document.scrollLeft(this.document.scrollLeft() + i.scrollSpeed))),
            r !== !1 && n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t)),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.options.axis && this.options.axis === "y" || (this.helper[0].style.left = this.position.left + "px"),
            this.options.axis && this.options.axis === "x" || (this.helper[0].style.top = this.position.top + "px"),
            e = this.items.length - 1; e >= 0; e--)
                if ((u = this.items[e],
                f = u.item[0],
                o = this._intersectsWithPointer(u),
                o) && u.instance === this.currentContainer && f !== this.currentItem[0] && this.placeholder[o === 1 ? "next" : "prev"]()[0] !== f && !n.contains(this.placeholder[0], f) && (this.options.type === "semi-dynamic" ? !n.contains(this.element[0], f) : !0)) {
                    if (this.direction = o === 1 ? "down" : "up",
                    this.options.tolerance === "pointer" || this._intersectsWithSides(u))
                        this._rearrange(t, u);
                    else
                        break;
                    this._trigger("change", t, this._uiHash());
                    break
                }
            return this._contactContainers(t),
            n.ui.ddmanager && n.ui.ddmanager.drag(this, t),
            this._trigger("sort", t, this._uiHash()),
            this.lastPositionAbs = this.positionAbs,
            !1
        },
        _mouseStop: function(t, i) {
            if (t) {
                if (n.ui.ddmanager && !this.options.dropBehaviour && n.ui.ddmanager.drop(this, t),
                this.options.revert) {
                    var e = this
                      , f = this.placeholder.offset()
                      , r = this.options.axis
                      , u = {};
                    r && r !== "x" || (u.left = f.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft));
                    r && r !== "y" || (u.top = f.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop));
                    this.reverting = !0;
                    n(this.helper).animate(u, parseInt(this.options.revert, 10) || 500, function() {
                        e._clear(t)
                    })
                } else
                    this._clear(t, i);
                return !1
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp(new n.Event("mouseup",{
                    target: null
                }));
                this.options.helper === "original" ? (this.currentItem.css(this._storedCSS),
                this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();
                for (var t = this.containers.length - 1; t >= 0; t--)
                    this.containers[t]._trigger("deactivate", null, this._uiHash(this)),
                    this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)),
                    this.containers[t].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            this.options.helper !== "original" && this.helper && this.helper[0].parentNode && this.helper.remove(),
            n.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }),
            this.domPosition.prev ? n(this.domPosition.prev).after(this.currentItem) : n(this.domPosition.parent).prepend(this.currentItem)),
            this
        },
        serialize: function(t) {
            var r = this._getItemsAsjQuery(t && t.connected)
              , i = [];
            return t = t || {},
            n(r).each(function() {
                var r = (n(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
                r && i.push((t.key || r[1] + "[]") + "=" + (t.key && t.expression ? r[1] : r[2]))
            }),
            !i.length && t.key && i.push(t.key + "="),
            i.join("&")
        },
        toArray: function(t) {
            var r = this._getItemsAsjQuery(t && t.connected)
              , i = [];
            return t = t || {},
            r.each(function() {
                i.push(n(t.item || this).attr(t.attribute || "id") || "")
            }),
            i
        },
        _intersectsWith: function(n) {
            var t = this.positionAbs.left
              , h = t + this.helperProportions.width
              , i = this.positionAbs.top
              , c = i + this.helperProportions.height
              , r = n.left
              , f = r + n.width
              , u = n.top
              , e = u + n.height
              , o = this.offset.click.top
              , s = this.offset.click.left
              , l = this.options.axis === "x" || i + o > u && i + o < e
              , a = this.options.axis === "y" || t + s > r && t + s < f
              , v = l && a;
            return this.options.tolerance === "pointer" || this.options.forcePointerForContainers || this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > n[this.floating ? "width" : "height"] ? v : r < t + this.helperProportions.width / 2 && h - this.helperProportions.width / 2 < f && u < i + this.helperProportions.height / 2 && c - this.helperProportions.height / 2 < e
        },
        _intersectsWithPointer: function(n) {
            var t, i, r = this.options.axis === "x" || this._isOverAxis(this.positionAbs.top + this.offset.click.top, n.top, n.height), u = this.options.axis === "y" || this._isOverAxis(this.positionAbs.left + this.offset.click.left, n.left, n.width), f = r && u;
            return f ? (t = this._getDragVerticalDirection(),
            i = this._getDragHorizontalDirection(),
            this.floating ? i === "right" || t === "down" ? 2 : 1 : t && (t === "down" ? 2 : 1)) : !1
        },
        _intersectsWithSides: function(n) {
            var r = this._isOverAxis(this.positionAbs.top + this.offset.click.top, n.top + n.height / 2, n.height)
              , u = this._isOverAxis(this.positionAbs.left + this.offset.click.left, n.left + n.width / 2, n.width)
              , t = this._getDragVerticalDirection()
              , i = this._getDragHorizontalDirection();
            return this.floating && i ? i === "right" && u || i === "left" && !u : t && (t === "down" && r || t === "up" && !r)
        },
        _getDragVerticalDirection: function() {
            var n = this.positionAbs.top - this.lastPositionAbs.top;
            return n !== 0 && (n > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var n = this.positionAbs.left - this.lastPositionAbs.left;
            return n !== 0 && (n > 0 ? "right" : "left")
        },
        refresh: function(n) {
            return this._refreshItems(n),
            this._setHandleClassName(),
            this.refreshPositions(),
            this
        },
        _connectWith: function() {
            var n = this.options;
            return n.connectWith.constructor === String ? [n.connectWith] : n.connectWith
        },
        _getItemsAsjQuery: function(t) {
            function h() {
                s.push(this)
            }
            var r, u, e, i, s = [], f = [], o = this._connectWith();
            if (o && t)
                for (r = o.length - 1; r >= 0; r--)
                    for (e = n(o[r], this.document[0]),
                    u = e.length - 1; u >= 0; u--)
                        i = n.data(e[u], this.widgetFullName),
                        i && i !== this && !i.options.disabled && f.push([n.isFunction(i.options.items) ? i.options.items.call(i.element) : n(i.options.items, i.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), i]);
            for (f.push([n.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : n(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]),
            r = f.length - 1; r >= 0; r--)
                f[r][0].each(h);
            return n(s)
        },
        _removeCurrentsFromItems: function() {
            var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = n.grep(this.items, function(n) {
                for (var i = 0; i < t.length; i++)
                    if (t[i] === n.item[0])
                        return !1;
                return !0
            })
        },
        _refreshItems: function(t) {
            this.items = [];
            this.containers = [this];
            var r, u, e, i, o, s, h, l, a = this.items, f = [[n.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
                item: this.currentItem
            }) : n(this.options.items, this.element), this]], c = this._connectWith();
            if (c && this.ready)
                for (r = c.length - 1; r >= 0; r--)
                    for (e = n(c[r], this.document[0]),
                    u = e.length - 1; u >= 0; u--)
                        i = n.data(e[u], this.widgetFullName),
                        i && i !== this && !i.options.disabled && (f.push([n.isFunction(i.options.items) ? i.options.items.call(i.element[0], t, {
                            item: this.currentItem
                        }) : n(i.options.items, i.element), i]),
                        this.containers.push(i));
            for (r = f.length - 1; r >= 0; r--)
                for (o = f[r][1],
                s = f[r][0],
                u = 0,
                l = s.length; u < l; u++)
                    h = n(s[u]),
                    h.data(this.widgetName + "-item", o),
                    a.push({
                        item: h,
                        instance: o,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
        },
        refreshPositions: function(t) {
            this.floating = this.items.length ? this.options.axis === "x" || this._isFloating(this.items[0].item) : !1;
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            for (var r, f, u, i = this.items.length - 1; i >= 0; i--)
                (r = this.items[i],
                r.instance !== this.currentContainer && this.currentContainer && r.item[0] !== this.currentItem[0]) || (f = this.options.toleranceElement ? n(this.options.toleranceElement, r.item) : r.item,
                t || (r.width = f.outerWidth(),
                r.height = f.outerHeight()),
                u = f.offset(),
                r.left = u.left,
                r.top = u.top);
            if (this.options.custom && this.options.custom.refreshContainers)
                this.options.custom.refreshContainers.call(this);
            else
                for (i = this.containers.length - 1; i >= 0; i--)
                    u = this.containers[i].element.offset(),
                    this.containers[i].containerCache.left = u.left,
                    this.containers[i].containerCache.top = u.top,
                    this.containers[i].containerCache.width = this.containers[i].element.outerWidth(),
                    this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
            return this
        },
        _createPlaceholder: function(t) {
            t = t || this;
            var r, i = t.options;
            i.placeholder && i.placeholder.constructor !== String || (r = i.placeholder,
            i.placeholder = {
                element: function() {
                    var u = t.currentItem[0].nodeName.toLowerCase()
                      , i = n("<" + u + ">", t.document[0]);
                    return t._addClass(i, "ui-sortable-placeholder", r || t.currentItem[0].className)._removeClass(i, "ui-sortable-helper"),
                    u === "tbody" ? t._createTrPlaceholder(t.currentItem.find("tr").eq(0), n("<tr>", t.document[0]).appendTo(i)) : u === "tr" ? t._createTrPlaceholder(t.currentItem, i) : u === "img" && i.attr("src", t.currentItem.attr("src")),
                    r || i.css("visibility", "hidden"),
                    i
                },
                update: function(n, u) {
                    (!r || i.forcePlaceholderSize) && (u.height() || u.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10)),
                    u.width() || u.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10)))
                }
            });
            t.placeholder = n(i.placeholder.element.call(t.element, t.currentItem));
            t.currentItem.after(t.placeholder);
            i.placeholder.update(t, t.placeholder)
        },
        _createTrPlaceholder: function(t, i) {
            var r = this;
            t.children().each(function() {
                n("<td>&#160;<\/td>", r.document[0]).attr("colspan", n(this).attr("colspan") || 1).appendTo(i)
            })
        },
        _contactContainers: function(t) {
            for (var u, c, f, a, v, o, l, s, h, e = null, i = null, r = this.containers.length - 1; r >= 0; r--)
                if (!n.contains(this.currentItem[0], this.containers[r].element[0]))
                    if (this._intersectsWith(this.containers[r].containerCache)) {
                        if (e && n.contains(this.containers[r].element[0], e.element[0]))
                            continue;
                        e = this.containers[r];
                        i = r
                    } else
                        this.containers[r].containerCache.over && (this.containers[r]._trigger("out", t, this._uiHash(this)),
                        this.containers[r].containerCache.over = 0);
            if (e)
                if (this.containers.length === 1)
                    this.containers[i].containerCache.over || (this.containers[i]._trigger("over", t, this._uiHash(this)),
                    this.containers[i].containerCache.over = 1);
                else {
                    for (c = 1e4,
                    f = null,
                    s = e.floating || this._isFloating(this.currentItem),
                    a = s ? "left" : "top",
                    v = s ? "width" : "height",
                    h = s ? "pageX" : "pageY",
                    u = this.items.length - 1; u >= 0; u--)
                        n.contains(this.containers[i].element[0], this.items[u].item[0]) && this.items[u].item[0] !== this.currentItem[0] && (o = this.items[u].item.offset()[a],
                        l = !1,
                        t[h] - o > this.items[u][v] / 2 && (l = !0),
                        Math.abs(t[h] - o) < c && (c = Math.abs(t[h] - o),
                        f = this.items[u],
                        this.direction = l ? "up" : "down"));
                    if (!f && !this.options.dropOnEmpty)
                        return;
                    if (this.currentContainer === this.containers[i]) {
                        this.currentContainer.containerCache.over || (this.containers[i]._trigger("over", t, this._uiHash()),
                        this.currentContainer.containerCache.over = 1);
                        return
                    }
                    f ? this._rearrange(t, f, null, !0) : this._rearrange(t, null, this.containers[i].element, !0);
                    this._trigger("change", t, this._uiHash());
                    this.containers[i]._trigger("change", t, this._uiHash(this));
                    this.currentContainer = this.containers[i];
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[i]._trigger("over", t, this._uiHash(this));
                    this.containers[i].containerCache.over = 1
                }
        },
        _createHelper: function(t) {
            var r = this.options
              , i = n.isFunction(r.helper) ? n(r.helper.apply(this.element[0], [t, this.currentItem])) : r.helper === "clone" ? this.currentItem.clone() : this.currentItem;
            return i.parents("body").length || n(r.appendTo !== "parent" ? r.appendTo : this.currentItem[0].parentNode)[0].appendChild(i[0]),
            i[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }),
            (!i[0].style.width || r.forceHelperSize) && i.width(this.currentItem.width()),
            (!i[0].style.height || r.forceHelperSize) && i.height(this.currentItem.height()),
            i
        },
        _adjustOffsetFromHelper: function(t) {
            typeof t == "string" && (t = t.split(" "));
            n.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            });
            "left"in t && (this.offset.click.left = t.left + this.margins.left);
            "right"in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left);
            "top"in t && (this.offset.click.top = t.top + this.margins.top);
            "bottom"in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            return this.cssPosition === "absolute" && this.scrollParent[0] !== this.document[0] && n.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(),
            t.top += this.scrollParent.scrollTop()),
            (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && n.ui.ie) && (t = {
                top: 0,
                left: 0
            }),
            {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition === "relative") {
                var n = this.currentItem.position();
                return {
                    top: n.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: n.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var t, r, u, i = this.options;
            i.containment === "parent" && (i.containment = this.helper[0].parentNode);
            (i.containment === "document" || i.containment === "window") && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, i.containment === "document" ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, (i.containment === "document" ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]);
            /^(document|window|parent)$/.test(i.containment) || (t = n(i.containment)[0],
            r = n(i.containment).offset(),
            u = n(t).css("overflow") !== "hidden",
            this.containment = [r.left + (parseInt(n(t).css("borderLeftWidth"), 10) || 0) + (parseInt(n(t).css("paddingLeft"), 10) || 0) - this.margins.left, r.top + (parseInt(n(t).css("borderTopWidth"), 10) || 0) + (parseInt(n(t).css("paddingTop"), 10) || 0) - this.margins.top, r.left + (u ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(n(t).css("borderLeftWidth"), 10) || 0) - (parseInt(n(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, r.top + (u ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(n(t).css("borderTopWidth"), 10) || 0) - (parseInt(n(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function(t, i) {
            i || (i = this.position);
            var r = t === "absolute" ? 1 : -1
              , u = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && n.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent
              , f = /(html|body)/i.test(u[0].tagName);
            return {
                top: i.top + this.offset.relative.top * r + this.offset.parent.top * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : u.scrollTop()) * r,
                left: i.left + this.offset.relative.left * r + this.offset.parent.left * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : u.scrollLeft()) * r
            }
        },
        _generatePosition: function(t) {
            var r, u, i = this.options, f = t.pageX, e = t.pageY, o = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && n.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, s = /(html|body)/i.test(o[0].tagName);
            return this.cssPosition !== "relative" || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()),
            this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left),
            t.pageY - this.offset.click.top < this.containment[1] && (e = this.containment[1] + this.offset.click.top),
            t.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left),
            t.pageY - this.offset.click.top > this.containment[3] && (e = this.containment[3] + this.offset.click.top)),
            i.grid && (r = this.originalPageY + Math.round((e - this.originalPageY) / i.grid[1]) * i.grid[1],
            e = this.containment ? r - this.offset.click.top >= this.containment[1] && r - this.offset.click.top <= this.containment[3] ? r : r - this.offset.click.top >= this.containment[1] ? r - i.grid[1] : r + i.grid[1] : r,
            u = this.originalPageX + Math.round((f - this.originalPageX) / i.grid[0]) * i.grid[0],
            f = this.containment ? u - this.offset.click.left >= this.containment[0] && u - this.offset.click.left <= this.containment[2] ? u : u - this.offset.click.left >= this.containment[0] ? u - i.grid[0] : u + i.grid[0] : u)),
            {
                top: e - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : s ? 0 : o.scrollTop()),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : s ? 0 : o.scrollLeft())
            }
        },
        _rearrange: function(n, t, i, r) {
            i ? i[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], this.direction === "down" ? t.item[0] : t.item[0].nextSibling);
            this.counter = this.counter ? ++this.counter : 1;
            var u = this.counter;
            this._delay(function() {
                u === this.counter && this.refreshPositions(!r)
            })
        },
        _clear: function(n, t) {
            function u(n, t, i) {
                return function(r) {
                    i._trigger(n, r, t._uiHash(t))
                }
            }
            this.reverting = !1;
            var i, r = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem),
            this._noFinalSort = null,
            this.helper[0] === this.currentItem[0]) {
                for (i in this._storedCSS)
                    (this._storedCSS[i] === "auto" || this._storedCSS[i] === "static") && (this._storedCSS[i] = "");
                this.currentItem.css(this._storedCSS);
                this._removeClass(this.currentItem, "ui-sortable-helper")
            } else
                this.currentItem.show();
            for (this.fromOutside && !t && r.push(function(n) {
                this._trigger("receive", n, this._uiHash(this.fromOutside))
            }),
            (this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !t && r.push(function(n) {
                this._trigger("update", n, this._uiHash())
            }),
            this !== this.currentContainer && (t || (r.push(function(n) {
                this._trigger("remove", n, this._uiHash())
            }),
            r.push(function(n) {
                return function(t) {
                    n._trigger("receive", t, this._uiHash(this))
                }
            }
            .call(this, this.currentContainer)),
            r.push(function(n) {
                return function(t) {
                    n._trigger("update", t, this._uiHash(this))
                }
            }
            .call(this, this.currentContainer)))),
            i = this.containers.length - 1; i >= 0; i--)
                t || r.push(u("deactivate", this, this.containers[i])),
                this.containers[i].containerCache.over && (r.push(u("out", this, this.containers[i])),
                this.containers[i].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor),
            this.storedStylesheet.remove()),
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity),
            this._storedZIndex && this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex),
            this.dragging = !1,
            t || this._trigger("beforeStop", n, this._uiHash()),
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(),
            this.helper = null),
            !t) {
                for (i = 0; i < r.length; i++)
                    r[i].call(this, n);
                this._trigger("stop", n, this._uiHash())
            }
            return this.fromOutside = !1,
            !this.cancelHelperRemoval
        },
        _trigger: function() {
            n.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function(t) {
            var i = t || this;
            return {
                helper: i.helper,
                placeholder: i.placeholder || n([]),
                position: i.position,
                originalPosition: i.originalPosition,
                offset: i.positionAbs,
                item: i.currentItem,
                sender: t ? t.element : null
            }
        }
    });
    /*!
	 * jQuery UI Controlgroup 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    s = /ui-corner-([a-z]){2,6}/g;
    ct = n.widget("ui.controlgroup", {
        version: "1.12.1",
        defaultElement: "<div>",
        options: {
            direction: "horizontal",
            disabled: null,
            onlyVisible: !0,
            items: {
                button: "input[type=button], input[type=submit], input[type=reset], button, a",
                controlgroupLabel: ".ui-controlgroup-label",
                checkboxradio: "input[type='checkbox'], input[type='radio']",
                selectmenu: "select",
                spinner: ".ui-spinner-input"
            }
        },
        _create: function() {
            this._enhance()
        },
        _enhance: function() {
            this.element.attr("role", "toolbar");
            this.refresh()
        },
        _destroy: function() {
            this._callChildMethod("destroy");
            this.childWidgets.removeData("ui-controlgroup-data");
            this.element.removeAttr("role");
            this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()
        },
        _initWidgets: function() {
            var t = this
              , i = [];
            n.each(this.options.items, function(r, u) {
                var f, e = {};
                if (u) {
                    if (r === "controlgroupLabel") {
                        f = t.element.find(u);
                        f.each(function() {
                            var t = n(this);
                            t.children(".ui-controlgroup-label-contents").length || t.contents().wrapAll("<span class='ui-controlgroup-label-contents'><\/span>")
                        });
                        t._addClass(f, null, "ui-widget ui-widget-content ui-state-default");
                        i = i.concat(f.get());
                        return
                    }
                    n.fn[r] && (e = t["_" + r + "Options"] ? t["_" + r + "Options"]("middle") : {
                        classes: {}
                    },
                    t.element.find(u).each(function() {
                        var u = n(this), f = u[r]("instance"), o = n.widget.extend({}, e), s;
                        r === "button" && u.parent(".ui-spinner").length || (f || (f = u[r]()[r]("instance")),
                        f && (o.classes = t._resolveClassesValues(o.classes, f)),
                        u[r](o),
                        s = u[r]("widget"),
                        n.data(s[0], "ui-controlgroup-data", f ? f : u[r]("instance")),
                        i.push(s[0]))
                    }))
                }
            });
            this.childWidgets = n(n.unique(i));
            this._addClass(this.childWidgets, "ui-controlgroup-item")
        },
        _callChildMethod: function(t) {
            this.childWidgets.each(function() {
                var r = n(this)
                  , i = r.data("ui-controlgroup-data");
                i && i[t] && i[t]()
            })
        },
        _updateCornerClass: function(n, t) {
            var i = this._buildSimpleOptions(t, "label").classes.label;
            this._removeClass(n, null, "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all");
            this._addClass(n, null, i)
        },
        _buildSimpleOptions: function(n, t) {
            var i = this.options.direction === "vertical"
              , r = {
                classes: {}
            };
            return r.classes[t] = {
                middle: "",
                first: "ui-corner-" + (i ? "top" : "left"),
                last: "ui-corner-" + (i ? "bottom" : "right"),
                only: "ui-corner-all"
            }[n],
            r
        },
        _spinnerOptions: function(n) {
            var t = this._buildSimpleOptions(n, "ui-spinner");
            return t.classes["ui-spinner-up"] = "",
            t.classes["ui-spinner-down"] = "",
            t
        },
        _buttonOptions: function(n) {
            return this._buildSimpleOptions(n, "ui-button")
        },
        _checkboxradioOptions: function(n) {
            return this._buildSimpleOptions(n, "ui-checkboxradio-label")
        },
        _selectmenuOptions: function(n) {
            var t = this.options.direction === "vertical";
            return {
                width: t ? "auto" : !1,
                classes: {
                    middle: {
                        "ui-selectmenu-button-open": "",
                        "ui-selectmenu-button-closed": ""
                    },
                    first: {
                        "ui-selectmenu-button-open": "ui-corner-" + (t ? "top" : "tl"),
                        "ui-selectmenu-button-closed": "ui-corner-" + (t ? "top" : "left")
                    },
                    last: {
                        "ui-selectmenu-button-open": t ? "" : "ui-corner-tr",
                        "ui-selectmenu-button-closed": "ui-corner-" + (t ? "bottom" : "right")
                    },
                    only: {
                        "ui-selectmenu-button-open": "ui-corner-top",
                        "ui-selectmenu-button-closed": "ui-corner-all"
                    }
                }[n]
            }
        },
        _resolveClassesValues: function(t, i) {
            var r = {};
            return n.each(t, function(u) {
                var f = i.options.classes[u] || "";
                f = n.trim(f.replace(s, ""));
                r[u] = (f + " " + t[u]).replace(/\s+/g, " ")
            }),
            r
        },
        _setOption: function(n, t) {
            if (n === "direction" && this._removeClass("ui-controlgroup-" + this.options.direction),
            this._super(n, t),
            n === "disabled") {
                this._callChildMethod(t ? "disable" : "enable");
                return
            }
            this.refresh()
        },
        refresh: function() {
            var t, i = this;
            this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction);
            this.options.direction === "horizontal" && this._addClass(null, "ui-helper-clearfix");
            this._initWidgets();
            t = this.childWidgets;
            this.options.onlyVisible && (t = t.filter(":visible"));
            t.length && (n.each(["first", "last"], function(n, r) {
                var u = t[r]().data("ui-controlgroup-data"), f;
                u && i["_" + u.widgetName + "Options"] ? (f = i["_" + u.widgetName + "Options"](t.length === 1 ? "only" : r),
                f.classes = i._resolveClassesValues(f.classes, u),
                u.element[u.widgetName](f)) : i._updateCornerClass(t[r](), r)
            }),
            this._callChildMethod("refresh"))
        }
    });
    /*!
	 * jQuery UI Checkboxradio 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    n.widget("ui.checkboxradio", [n.ui.formResetMixin, {
        version: "1.12.1",
        options: {
            disabled: null,
            label: null,
            icon: !0,
            classes: {
                "ui-checkboxradio-label": "ui-corner-all",
                "ui-checkboxradio-icon": "ui-corner-all"
            }
        },
        _getCreateOptions: function() {
            var t, i, u = this, r = this._super() || {};
            return this._readType(),
            i = this.element.labels(),
            this.label = n(i[i.length - 1]),
            this.label.length || n.error("No label found for checkboxradio widget"),
            this.originalLabel = "",
            this.label.contents().not(this.element[0]).each(function() {
                u.originalLabel += this.nodeType === 3 ? n(this).text() : this.outerHTML
            }),
            this.originalLabel && (r.label = this.originalLabel),
            t = this.element[0].disabled,
            t != null && (r.disabled = t),
            r
        },
        _create: function() {
            var n = this.element[0].checked;
            this._bindFormResetHandler();
            this.options.disabled == null && (this.options.disabled = this.element[0].disabled);
            this._setOption("disabled", this.options.disabled);
            this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible");
            this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget");
            this.type === "radio" && this._addClass(this.label, "ui-checkboxradio-radio-label");
            this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel);
            this._enhance();
            n && (this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active"),
            this.icon && this._addClass(this.icon, null, "ui-state-hover"));
            this._on({
                change: "_toggleClasses",
                focus: function() {
                    this._addClass(this.label, null, "ui-state-focus ui-visual-focus")
                },
                blur: function() {
                    this._removeClass(this.label, null, "ui-state-focus ui-visual-focus")
                }
            })
        },
        _readType: function() {
            var t = this.element[0].nodeName.toLowerCase();
            this.type = this.element[0].type;
            t === "input" && /radio|checkbox/.test(this.type) || n.error("Can't create checkboxradio on element.nodeName=" + t + " and element.type=" + this.type)
        },
        _enhance: function() {
            this._updateIcon(this.element[0].checked)
        },
        widget: function() {
            return this.label
        },
        _getRadioGroup: function() {
            var t, i = this.element[0].name, r = "input[name='" + n.ui.escapeSelector(i) + "']";
            return i ? (t = this.form.length ? n(this.form[0].elements).filter(r) : n(r).filter(function() {
                return n(this).form().length === 0
            }),
            t.not(this.element)) : n([])
        },
        _toggleClasses: function() {
            var t = this.element[0].checked;
            this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", t);
            this.options.icon && this.type === "checkbox" && this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", t)._toggleClass(this.icon, null, "ui-icon-blank", !t);
            this.type === "radio" && this._getRadioGroup().each(function() {
                var t = n(this).checkboxradio("instance");
                t && t._removeClass(t.label, "ui-checkboxradio-checked", "ui-state-active")
            })
        },
        _destroy: function() {
            this._unbindFormResetHandler();
            this.icon && (this.icon.remove(),
            this.iconSpace.remove())
        },
        _setOption: function(n, t) {
            if (n !== "label" || t) {
                if (this._super(n, t),
                n === "disabled") {
                    this._toggleClass(this.label, null, "ui-state-disabled", t);
                    this.element[0].disabled = t;
                    return
                }
                this.refresh()
            }
        },
        _updateIcon: function(t) {
            var i = "ui-icon ui-icon-background ";
            this.options.icon ? (this.icon || (this.icon = n("<span>"),
            this.iconSpace = n("<span> <\/span>"),
            this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")),
            this.type === "checkbox" ? (i += t ? "ui-icon-check ui-state-checked" : "ui-icon-blank",
            this._removeClass(this.icon, null, t ? "ui-icon-blank" : "ui-icon-check")) : i += "ui-icon-blank",
            this._addClass(this.icon, "ui-checkboxradio-icon", i),
            t || this._removeClass(this.icon, null, "ui-icon-check ui-state-checked"),
            this.icon.prependTo(this.label).after(this.iconSpace)) : this.icon !== undefined && (this.icon.remove(),
            this.iconSpace.remove(),
            delete this.icon)
        },
        _updateLabel: function() {
            var n = this.label.contents().not(this.element[0]);
            this.icon && (n = n.not(this.icon[0]));
            this.iconSpace && (n = n.not(this.iconSpace[0]));
            n.remove();
            this.label.append(this.options.label)
        },
        refresh: function() {
            var n = this.element[0].checked
              , t = this.element[0].disabled;
            this._updateIcon(n);
            this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", n);
            this.options.label !== null && this._updateLabel();
            t !== this.options.disabled && this._setOptions({
                disabled: t
            })
        }
    }]);
    lt = n.ui.checkboxradio;
    /*!
	 * jQuery UI Button 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    n.widget("ui.button", {
        version: "1.12.1",
        defaultElement: "<button>",
        options: {
            classes: {
                "ui-button": "ui-corner-all"
            },
            disabled: null,
            icon: null,
            iconPosition: "beginning",
            label: null,
            showLabel: !0
        },
        _getCreateOptions: function() {
            var n, t = this._super() || {};
            return this.isInput = this.element.is("input"),
            n = this.element[0].disabled,
            n != null && (t.disabled = n),
            this.originalLabel = this.isInput ? this.element.val() : this.element.html(),
            this.originalLabel && (t.label = this.originalLabel),
            t
        },
        _create: function() {
            !this.option.showLabel & !this.options.icon && (this.options.showLabel = !0);
            this.options.disabled == null && (this.options.disabled = this.element[0].disabled || !1);
            this.hasTitle = !!this.element.attr("title");
            this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label));
            this._addClass("ui-button", "ui-widget");
            this._setOption("disabled", this.options.disabled);
            this._enhance();
            this.element.is("a") && this._on({
                keyup: function(t) {
                    t.keyCode === n.ui.keyCode.SPACE && (t.preventDefault(),
                    this.element[0].click ? this.element[0].click() : this.element.trigger("click"))
                }
            })
        },
        _enhance: function() {
            this.element.is("button") || this.element.attr("role", "button");
            this.options.icon && (this._updateIcon("icon", this.options.icon),
            this._updateTooltip())
        },
        _updateTooltip: function() {
            this.title = this.element.attr("title");
            this.options.showLabel || this.title || this.element.attr("title", this.options.label)
        },
        _updateIcon: function(t, i) {
            var u = t !== "iconPosition"
              , r = u ? this.options.iconPosition : i
              , f = r === "top" || r === "bottom";
            this.icon ? u && this._removeClass(this.icon, null, this.options.icon) : (this.icon = n("<span>"),
            this._addClass(this.icon, "ui-button-icon", "ui-icon"),
            this.options.showLabel || this._addClass("ui-button-icon-only"));
            u && this._addClass(this.icon, null, i);
            this._attachIcon(r);
            f ? (this._addClass(this.icon, null, "ui-widget-icon-block"),
            this.iconSpace && this.iconSpace.remove()) : (this.iconSpace || (this.iconSpace = n("<span> <\/span>"),
            this._addClass(this.iconSpace, "ui-button-icon-space")),
            this._removeClass(this.icon, null, "ui-wiget-icon-block"),
            this._attachIconSpace(r))
        },
        _destroy: function() {
            this.element.removeAttr("role");
            this.icon && this.icon.remove();
            this.iconSpace && this.iconSpace.remove();
            this.hasTitle || this.element.removeAttr("title")
        },
        _attachIconSpace: function(n) {
            this.icon[/^(?:end|bottom)/.test(n) ? "before" : "after"](this.iconSpace)
        },
        _attachIcon: function(n) {
            this.element[/^(?:end|bottom)/.test(n) ? "append" : "prepend"](this.icon)
        },
        _setOptions: function(n) {
            var t = n.showLabel === undefined ? this.options.showLabel : n.showLabel
              , i = n.icon === undefined ? this.options.icon : n.icon;
            t || i || (n.showLabel = !0);
            this._super(n)
        },
        _setOption: function(n, t) {
            n === "icon" && (t ? this._updateIcon(n, t) : this.icon && (this.icon.remove(),
            this.iconSpace && this.iconSpace.remove()));
            n === "iconPosition" && this._updateIcon(n, t);
            n === "showLabel" && (this._toggleClass("ui-button-icon-only", null, !t),
            this._updateTooltip());
            n === "label" && (this.isInput ? this.element.val(t) : (this.element.html(t),
            this.icon && (this._attachIcon(this.options.iconPosition),
            this._attachIconSpace(this.options.iconPosition))));
            this._super(n, t);
            n === "disabled" && (this._toggleClass(null, "ui-state-disabled", t),
            this.element[0].disabled = t,
            t && this.element.blur())
        },
        refresh: function() {
            var n = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");
            n !== this.options.disabled && this._setOptions({
                disabled: n
            });
            this._updateTooltip()
        }
    });
    n.uiBackCompat !== !1 && (n.widget("ui.button", n.ui.button, {
        options: {
            text: !0,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text);
            !this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel);
            !this.options.icon && (this.options.icons.primary || this.options.icons.secondary) ? this.options.icons.primary ? this.options.icon = this.options.icons.primary : (this.options.icon = this.options.icons.secondary,
            this.options.iconPosition = "end") : this.options.icon && (this.options.icons.primary = this.options.icon);
            this._super()
        },
        _setOption: function(n, t) {
            if (n === "text") {
                this._super("showLabel", t);
                return
            }
            n === "showLabel" && (this.options.text = t);
            n === "icon" && (this.options.icons.primary = t);
            n === "icons" && (t.primary ? (this._super("icon", t.primary),
            this._super("iconPosition", "beginning")) : t.secondary && (this._super("icon", t.secondary),
            this._super("iconPosition", "end")));
            this._superApply(arguments)
        }
    }),
    n.fn.button = function(t) {
        return function() {
            return !this.length || this.length && this[0].tagName !== "INPUT" || this.length && this[0].tagName === "INPUT" && this.attr("type") !== "checkbox" && this.attr("type") !== "radio" ? t.apply(this, arguments) : (n.ui.checkboxradio || n.error("Checkboxradio widget missing"),
            arguments.length === 0) ? this.checkboxradio({
                icon: !1
            }) : this.checkboxradio.apply(this, arguments)
        }
    }(n.fn.button),
    n.fn.buttonset = function() {
        return (n.ui.controlgroup || n.error("Controlgroup widget missing"),
        arguments[0] === "option" && arguments[1] === "items" && arguments[2]) ? this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]]) : arguments[0] === "option" && arguments[1] === "items" ? this.controlgroup.apply(this, [arguments[0], "items.button"]) : (typeof arguments[0] == "object" && arguments[0].items && (arguments[0].items = {
            button: arguments[0].items
        }),
        this.controlgroup.apply(this, arguments))
    }
    );
    at = n.ui.button;
    /*!
	 * jQuery UI Dialog 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    n.widget("ui.dialog", {
        version: "1.12.1",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            classes: {
                "ui-dialog": "ui-corner-all",
                "ui-dialog-titlebar": "ui-corner-all"
            },
            closeOnEscape: !0,
            closeText: undefined,
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function(t) {
                    var i = n(this).css(t).offset().top;
                    i < 0 && n(this).css("top", t.top - i)
                }
            },
            resizable: !1,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        sizeRelatedOptions: {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        resizableRelatedOptions: {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            };
            this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            };
            this.originalTitle = this.element.attr("title");
            this.options.title == null && this.originalTitle != null && (this.options.title = this.originalTitle);
            this.options.disabled && (this.options.disabled = !1);
            this._createWrapper();
            this.element.show().removeAttr("title").appendTo(this.uiDialog);
            this._addClass("ui-dialog-content", "ui-widget-content");
            this._createTitlebar();
            this._createButtonPane();
            this.options.draggable && n.fn.draggable && this._makeDraggable();
            this.options.resizable && n.fn.resizable && this._makeResizable();
            this._isOpen = !1;
            this._trackFocus()
        },
        _init: function() {
            this.options.autoOpen && this.open()
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t && (t.jquery || t.nodeType) ? n(t) : this.document.find(t || "body").eq(0)
        },
        _destroy: function() {
            var n, t = this.originalPosition;
            this._untrackInstance();
            this._destroyOverlay();
            this.element.removeUniqueId().css(this.originalCss).detach();
            this.uiDialog.remove();
            this.originalTitle && this.element.attr("title", this.originalTitle);
            n = t.parent.children().eq(t.index);
            n.length && n[0] !== this.element[0] ? n.before(this.element) : t.parent.append(this.element)
        },
        widget: function() {
            return this.uiDialog
        },
        disable: n.noop,
        enable: n.noop,
        close: function(t) {
            var i = this;
            this._isOpen && this._trigger("beforeClose", t) !== !1 && (this._isOpen = !1,
            this._focusedElement = null,
            this._destroyOverlay(),
            this._untrackInstance(),
            this.opener.filter(":focusable").trigger("focus").length || n.ui.safeBlur(n.ui.safeActiveElement(this.document[0])),
            this._hide(this.uiDialog, this.options.hide, function() {
                i._trigger("close", t)
            }))
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function() {
            this._moveToTop()
        },
        _moveToTop: function(t, i) {
            var r = !1
              , f = this.uiDialog.siblings(".ui-front:visible").map(function() {
                return +n(this).css("z-index")
            }).get()
              , u = Math.max.apply(null, f);
            return u >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", u + 1),
            r = !0),
            r && !i && this._trigger("focus", t),
            r
        },
        open: function() {
            var t = this;
            if (this._isOpen) {
                this._moveToTop() && this._focusTabbable();
                return
            }
            this._isOpen = !0;
            this.opener = n(n.ui.safeActiveElement(this.document[0]));
            this._size();
            this._position();
            this._createOverlay();
            this._moveToTop(null, !0);
            this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1);
            this._show(this.uiDialog, this.options.show, function() {
                t._focusTabbable();
                t._trigger("focus");
                setTimeout(function() {
                    n(window).trigger("resize")
                }, 250)
            });
            this._makeFocusTarget();
            this._trigger("open")
        },
        _focusTabbable: function() {
            var n = this._focusedElement;
            n || (n = this.element.find("[autofocus]"));
            n.length || (n = this.element.find(":tabbable"));
            n.length || (n = this.uiDialogButtonPane.find(":tabbable"));
            n.length || (n = this.uiDialogTitlebarClose.filter(":tabbable"));
            n.length || (n = this.uiDialog);
            n.eq(0).trigger("focus")
        },
        _keepFocus: function(t) {
            function i() {
                var t = n.ui.safeActiveElement(this.document[0])
                  , i = this.uiDialog[0] === t || n.contains(this.uiDialog[0], t);
                i || this._focusTabbable()
            }
            t.preventDefault();
            i.call(this);
            this._delay(i)
        },
        _createWrapper: function() {
            this.uiDialog = n("<div>").hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo());
            this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front");
            this._on(this.uiDialog, {
                keydown: function(t) {
                    if (this.options.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === n.ui.keyCode.ESCAPE)
                        return t.preventDefault(),
                        this.close(t),
                        !1;
                    if (t.keyCode === n.ui.keyCode.TAB && !t.isDefaultPrevented()) {
                        var i = this.uiDialog.find(":tabbable")
                          , r = i.filter(":first")
                          , u = i.filter(":last");
                        t.target !== u[0] && t.target !== this.uiDialog[0] || t.shiftKey ? (t.target === r[0] || t.target === this.uiDialog[0]) && t.shiftKey && (this._delay(function() {
                            u.trigger("focus")
                        }),
                        t.preventDefault()) : (this._delay(function() {
                            r.trigger("focus")
                        }),
                        t.preventDefault())
                    }
                },
                mousedown: function(n) {
                    this._moveToTop(n) && this._focusTabbable()
                }
            });
            this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id")
            })
        },
        _createTitlebar: function() {
            var t;
            this.options.title !== !1 && (this.uiDialogTitlebar = n("<div>"),
            this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix"),
            this._on(this.uiDialogTitlebar, {
                mousedown: function(t) {
                    n(t.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.trigger("focus")
                }
            }),
            this.uiDialogTitlebarClose = n("<button type='button'><\/button>").button({
                label: n("<a>").text(this.options.closeText).html(),
                icon: "ui-icon-closethick",
                showLabel: !1
            }).appendTo(this.uiDialogTitlebar),
            this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close"),
            this._on(this.uiDialogTitlebarClose, {
                click: function(n) {
                    n.preventDefault();
                    this.close(n)
                }
            }),
            t = n("<span>").uniqueId().prependTo(this.uiDialogTitlebar),
            this._addClass(t, "ui-dialog-title"),
            this._title(t),
            this.uiDialogTitlebar.prependTo(this.uiDialog),
            this.uiDialog.attr({
                "aria-labelledby": t.attr("id")
            }))
        },
        _title: function(n) {
            this.options.title ? n.text(this.options.title) : n.html("&#160;")
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = n("<div>");
            this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix");
            this.uiButtonSet = n("<div>").appendTo(this.uiDialogButtonPane);
            this._addClass(this.uiButtonSet, "ui-dialog-buttonset");
            this._createButtons()
        },
        _createButtons: function() {
            var i = this
              , t = this.options.buttons;
            if (this.uiDialogButtonPane.remove(),
            this.uiButtonSet.empty(),
            n.isEmptyObject(t) || n.isArray(t) && !t.length) {
                this._removeClass(this.uiDialog, "ui-dialog-buttons");
                return
            }
            n.each(t, function(t, r) {
                var u, f;
                r = n.isFunction(r) ? {
                    click: r,
                    text: t
                } : r;
                r = n.extend({
                    type: "button"
                }, r);
                u = r.click;
                f = {
                    icon: r.icon,
                    iconPosition: r.iconPosition,
                    showLabel: r.showLabel,
                    icons: r.icons,
                    text: r.text
                };
                delete r.click;
                delete r.icon;
                delete r.iconPosition;
                delete r.showLabel;
                delete r.icons;
                typeof r.text == "boolean" && delete r.text;
                n("<button><\/button>", r).addClass("ui-btn-" + (r.text || "").replace(/\W+/g, "-").toLowerCase()).button(f).appendTo(i.uiButtonSet).on("click", function() {
                    u.apply(i.element[0], arguments)
                })
            });
            this._addClass(this.uiDialog, "ui-dialog-buttons");
            this.uiDialogButtonPane.appendTo(this.uiDialog)
        },
        _makeDraggable: function() {
            function i(n) {
                return {
                    position: n.position,
                    offset: n.offset
                }
            }
            var t = this
              , r = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(r, u) {
                    t._addClass(n(this), "ui-dialog-dragging");
                    t._blockFrames();
                    t._trigger("dragStart", r, i(u))
                },
                drag: function(n, r) {
                    t._trigger("drag", n, i(r))
                },
                stop: function(u, f) {
                    var e = f.offset.left - t.document.scrollLeft()
                      , o = f.offset.top - t.document.scrollTop();
                    r.position = {
                        my: "left top",
                        at: "left" + (e >= 0 ? "+" : "") + e + " top" + (o >= 0 ? "+" : "") + o,
                        of: t.window
                    };
                    t._removeClass(n(this), "ui-dialog-dragging");
                    t._unblockFrames();
                    t._trigger("dragStop", u, i(f))
                }
            })
        },
        _makeResizable: function() {
            function r(n) {
                return {
                    originalPosition: n.originalPosition,
                    originalSize: n.originalSize,
                    position: n.position,
                    size: n.size
                }
            }
            var t = this
              , i = this.options
              , u = i.resizable
              , f = this.uiDialog.css("position")
              , e = typeof u == "string" ? u : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: i.maxWidth,
                maxHeight: i.maxHeight,
                minWidth: i.minWidth,
                minHeight: this._minHeight(),
                handles: e,
                start: function(i, u) {
                    t._addClass(n(this), "ui-dialog-resizing");
                    t._blockFrames();
                    t._trigger("resizeStart", i, r(u))
                },
                resize: function(n, i) {
                    t._trigger("resize", n, r(i))
                },
                stop: function(u, f) {
                    var e = t.uiDialog.offset()
                      , o = e.left - t.document.scrollLeft()
                      , s = e.top - t.document.scrollTop();
                    i.height = t.uiDialog.height();
                    i.width = t.uiDialog.width();
                    i.position = {
                        my: "left top",
                        at: "left" + (o >= 0 ? "+" : "") + o + " top" + (s >= 0 ? "+" : "") + s,
                        of: t.window
                    };
                    t._removeClass(n(this), "ui-dialog-resizing");
                    t._unblockFrames();
                    t._trigger("resizeStop", u, r(f))
                }
            }).css("position", f)
        },
        _trackFocus: function() {
            this._on(this.widget(), {
                focusin: function(t) {
                    this._makeFocusTarget();
                    this._focusedElement = n(t.target)
                }
            })
        },
        _makeFocusTarget: function() {
            this._untrackInstance();
            this._trackingInstances().unshift(this)
        },
        _untrackInstance: function() {
            var t = this._trackingInstances()
              , i = n.inArray(this, t);
            i !== -1 && t.splice(i, 1)
        },
        _trackingInstances: function() {
            var n = this.document.data("ui-dialog-instances");
            return n || (n = [],
            this.document.data("ui-dialog-instances", n)),
            n
        },
        _minHeight: function() {
            var n = this.options;
            return n.height === "auto" ? n.minHeight : Math.min(n.minHeight, n.height)
        },
        _position: function() {
            var n = this.uiDialog.is(":visible");
            n || this.uiDialog.show();
            this.uiDialog.position(this.options.position);
            n || this.uiDialog.hide()
        },
        _setOptions: function(t) {
            var i = this
              , r = !1
              , u = {};
            n.each(t, function(n, t) {
                i._setOption(n, t);
                n in i.sizeRelatedOptions && (r = !0);
                n in i.resizableRelatedOptions && (u[n] = t)
            });
            r && (this._size(),
            this._position());
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", u)
        },
        _setOption: function(t, i) {
            var f, u, r = this.uiDialog;
            t !== "disabled" && (this._super(t, i),
            t === "appendTo" && this.uiDialog.appendTo(this._appendTo()),
            t === "buttons" && this._createButtons(),
            t === "closeText" && this.uiDialogTitlebarClose.button({
                label: n("<a>").text("" + this.options.closeText).html()
            }),
            t === "draggable" && (f = r.is(":data(ui-draggable)"),
            f && !i && r.draggable("destroy"),
            !f && i && this._makeDraggable()),
            t === "position" && this._position(),
            t === "resizable" && (u = r.is(":data(ui-resizable)"),
            u && !i && r.resizable("destroy"),
            u && typeof i == "string" && r.resizable("option", "handles", i),
            u || i === !1 || this._makeResizable()),
            t === "title" && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
        },
        _size: function() {
            var t, i, r, n = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            });
            n.minWidth > n.width && (n.width = n.minWidth);
            t = this.uiDialog.css({
                height: "auto",
                width: n.width
            }).outerHeight();
            i = Math.max(0, n.minHeight - t);
            r = typeof n.maxHeight == "number" ? Math.max(0, n.maxHeight - t) : "none";
            n.height === "auto" ? this.element.css({
                minHeight: i,
                maxHeight: r,
                height: "auto"
            }) : this.element.height(Math.max(0, n.height - t));
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        },
        _blockFrames: function() {
            this.iframeBlocks = this.document.find("iframe").map(function() {
                var t = n(this);
                return n("<div>").css({
                    position: "absolute",
                    width: t.outerWidth(),
                    height: t.outerHeight()
                }).appendTo(t.parent()).offset(t.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(),
            delete this.iframeBlocks)
        },
        _allowInteraction: function(t) {
            return n(t.target).closest(".ui-dialog").length ? !0 : !!n(t.target).closest(".ui-datepicker").length || !!n(t.target).closest(".cke_panel").length
        },
        _createOverlay: function() {
            if (this.options.modal) {
                var t = !0;
                this._delay(function() {
                    t = !1
                });
                this.document.data("ui-dialog-overlays") || this._on(this.document, {
                    focusin: function(n) {
                        t || this._allowInteraction(n) || (n.preventDefault(),
                        this._trackingInstances()[0]._focusTabbable())
                    }
                });
                this.overlay = n("<div>").appendTo(this._appendTo());
                this._addClass(this.overlay, null, "ui-widget-overlay ui-front");
                this._on(this.overlay, {
                    mousedown: "_keepFocus"
                });
                this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
            }
        },
        _destroyOverlay: function() {
            if (this.options.modal && this.overlay) {
                var n = this.document.data("ui-dialog-overlays") - 1;
                n ? this.document.data("ui-dialog-overlays", n) : (this._off(this.document, "focusin"),
                this.document.removeData("ui-dialog-overlays"));
                this.overlay.remove();
                this.overlay = null
            }
        }
    });
    n.uiBackCompat !== !1 && n.widget("ui.dialog", n.ui.dialog, {
        options: {
            dialogClass: ""
        },
        _createWrapper: function() {
            this._super();
            this.uiDialog.addClass(this.options.dialogClass)
        },
        _setOption: function(n, t) {
            n === "dialogClass" && this.uiDialog.removeClass(this.options.dialogClass).addClass(t);
            this._superApply(arguments)
        }
    });
    vt = n.ui.dialog;
    /*!
	 * jQuery UI Slider 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    yt = n.widget("ui.slider", n.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            classes: {
                "ui-slider": "ui-corner-all",
                "ui-slider-handle": "ui-corner-all",
                "ui-slider-range": "ui-corner-all ui-widget-header"
            },
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function() {
            this._keySliding = !1;
            this._mouseSliding = !1;
            this._animateOff = !0;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this._calculateNewMax();
            this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content");
            this._refresh();
            this._animateOff = !1
        },
        _refresh: function() {
            this._createRange();
            this._createHandles();
            this._setupEvents();
            this._refreshValue()
        },
        _createHandles: function() {
            var r, i, u = this.options, t = this.element.find(".ui-slider-handle"), f = [];
            for (i = u.values && u.values.length || 1,
            t.length > i && (t.slice(i).remove(),
            t = t.slice(0, i)),
            r = t.length; r < i; r++)
                f.push("<span tabindex='0'><\/span>");
            this.handles = t.add(n(f.join("")).appendTo(this.element));
            this._addClass(this.handles, "ui-slider-handle", "ui-state-default");
            this.handle = this.handles.eq(0);
            this.handles.each(function(t) {
                n(this).data("ui-slider-handle-index", t).attr("tabIndex", 0)
            })
        },
        _createRange: function() {
            var t = this.options;
            t.range ? (t.range === !0 && (t.values ? t.values.length && t.values.length !== 2 ? t.values = [t.values[0], t.values[0]] : n.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]),
            this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"),
            this.range.css({
                left: "",
                bottom: ""
            })) : (this.range = n("<div>").appendTo(this.element),
            this._addClass(this.range, "ui-slider-range")),
            (t.range === "min" || t.range === "max") && this._addClass(this.range, "ui-slider-range-" + t.range)) : (this.range && this.range.remove(),
            this.range = null)
        },
        _setupEvents: function() {
            this._off(this.handles);
            this._on(this.handles, this._handleEvents);
            this._hoverable(this.handles);
            this._focusable(this.handles)
        },
        _destroy: function() {
            this.handles.remove();
            this.range && this.range.remove();
            this._mouseDestroy()
        },
        _mouseCapture: function(t) {
            var s, f, r, i, u, h, e, c, o = this, l = this.options;
            return l.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            },
            this.elementOffset = this.element.offset(),
            s = {
                x: t.pageX,
                y: t.pageY
            },
            f = this._normValueFromMouse(s),
            r = this._valueMax() - this._valueMin() + 1,
            this.handles.each(function(t) {
                var e = Math.abs(f - o.values(t));
                (r > e || r === e && (t === o._lastChangedValue || o.values(t) === l.min)) && (r = e,
                i = n(this),
                u = t)
            }),
            h = this._start(t, u),
            h === !1) ? !1 : (this._mouseSliding = !0,
            this._handleIndex = u,
            this._addClass(i, null, "ui-state-active"),
            i.trigger("focus"),
            e = i.offset(),
            c = !n(t.target).parents().addBack().is(".ui-slider-handle"),
            this._clickOffset = c ? {
                left: 0,
                top: 0
            } : {
                left: t.pageX - e.left - i.width() / 2,
                top: t.pageY - e.top - i.height() / 2 - (parseInt(i.css("borderTopWidth"), 10) || 0) - (parseInt(i.css("borderBottomWidth"), 10) || 0) + (parseInt(i.css("marginTop"), 10) || 0)
            },
            this.handles.hasClass("ui-state-hover") || this._slide(t, u, f),
            this._animateOff = !0,
            !0)
        },
        _mouseStart: function() {
            return !0
        },
        _mouseDrag: function(n) {
            var t = {
                x: n.pageX,
                y: n.pageY
            }
              , i = this._normValueFromMouse(t);
            return this._slide(n, this._handleIndex, i),
            !1
        },
        _mouseStop: function(n) {
            return this._removeClass(this.handles, null, "ui-state-active"),
            this._mouseSliding = !1,
            this._stop(n, this._handleIndex),
            this._change(n, this._handleIndex),
            this._handleIndex = null,
            this._clickOffset = null,
            this._animateOff = !1,
            !1
        },
        _detectOrientation: function() {
            this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(n) {
            var i, r, t, u, f;
            return this.orientation === "horizontal" ? (i = this.elementSize.width,
            r = n.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (i = this.elementSize.height,
            r = n.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)),
            t = r / i,
            t > 1 && (t = 1),
            t < 0 && (t = 0),
            this.orientation === "vertical" && (t = 1 - t),
            u = this._valueMax() - this._valueMin(),
            f = this._valueMin() + t * u,
            this._trimAlignValue(f)
        },
        _uiHash: function(n, t, i) {
            var r = {
                handle: this.handles[n],
                handleIndex: n,
                value: t !== undefined ? t : this.value()
            };
            return this._hasMultipleValues() && (r.value = t !== undefined ? t : this.values(n),
            r.values = i || this.values()),
            r
        },
        _hasMultipleValues: function() {
            return this.options.values && this.options.values.length
        },
        _start: function(n, t) {
            return this._trigger("start", n, this._uiHash(t))
        },
        _slide: function(n, t, i) {
            var u, r, f = this.value(), e = this.values();
            (this._hasMultipleValues() && (r = this.values(t ? 0 : 1),
            f = this.values(t),
            this.options.values.length === 2 && this.options.range === !0 && (i = t === 0 ? Math.min(r, i) : Math.max(r, i)),
            e[t] = i),
            i !== f) && (u = this._trigger("slide", n, this._uiHash(t, i, e)),
            u !== !1) && (this._hasMultipleValues() ? this.values(t, i) : this.value(i))
        },
        _stop: function(n, t) {
            this._trigger("stop", n, this._uiHash(t))
        },
        _change: function(n, t) {
            this._keySliding || this._mouseSliding || (this._lastChangedValue = t,
            this._trigger("change", n, this._uiHash(t)))
        },
        value: function(n) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(n);
                this._refreshValue();
                this._change(null, 0);
                return
            }
            return this._value()
        },
        values: function(t, i) {
            var u, f, r;
            if (arguments.length > 1) {
                this.options.values[t] = this._trimAlignValue(i);
                this._refreshValue();
                this._change(null, t);
                return
            }
            if (arguments.length)
                if (n.isArray(arguments[0])) {
                    for (u = this.options.values,
                    f = arguments[0],
                    r = 0; r < u.length; r += 1)
                        u[r] = this._trimAlignValue(f[r]),
                        this._change(null, r);
                    this._refreshValue()
                } else
                    return this._hasMultipleValues() ? this._values(t) : this.value();
            else
                return this._values()
        },
        _setOption: function(t, i) {
            var r, u = 0;
            t === "range" && this.options.range === !0 && (i === "min" ? (this.options.value = this._values(0),
            this.options.values = null) : i === "max" && (this.options.value = this._values(this.options.values.length - 1),
            this.options.values = null));
            n.isArray(this.options.values) && (u = this.options.values.length);
            this._super(t, i);
            switch (t) {
            case "orientation":
                this._detectOrientation();
                this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation);
                this._refreshValue();
                this.options.range && this._refreshRange(i);
                this.handles.css(i === "horizontal" ? "bottom" : "left", "");
                break;
            case "value":
                this._animateOff = !0;
                this._refreshValue();
                this._change(null, 0);
                this._animateOff = !1;
                break;
            case "values":
                for (this._animateOff = !0,
                this._refreshValue(),
                r = u - 1; r >= 0; r--)
                    this._change(null, r);
                this._animateOff = !1;
                break;
            case "step":
            case "min":
            case "max":
                this._animateOff = !0;
                this._calculateNewMax();
                this._refreshValue();
                this._animateOff = !1;
                break;
            case "range":
                this._animateOff = !0;
                this._refresh();
                this._animateOff = !1
            }
        },
        _setOptionDisabled: function(n) {
            this._super(n);
            this._toggleClass(null, "ui-state-disabled", !!n)
        },
        _value: function() {
            var n = this.options.value;
            return this._trimAlignValue(n)
        },
        _values: function(n) {
            var r, t, i;
            if (arguments.length)
                return r = this.options.values[n],
                this._trimAlignValue(r);
            if (this._hasMultipleValues()) {
                for (t = this.options.values.slice(),
                i = 0; i < t.length; i += 1)
                    t[i] = this._trimAlignValue(t[i]);
                return t
            }
            return []
        },
        _trimAlignValue: function(n) {
            if (n <= this._valueMin())
                return this._valueMin();
            if (n >= this._valueMax())
                return this._valueMax();
            var t = this.options.step > 0 ? this.options.step : 1
              , i = (n - this._valueMin()) % t
              , r = n - i;
            return Math.abs(i) * 2 >= t && (r += i > 0 ? t : -t),
            parseFloat(r.toFixed(5))
        },
        _calculateNewMax: function() {
            var n = this.options.max
              , i = this._valueMin()
              , t = this.options.step
              , r = Math.round((n - i) / t) * t;
            n = r + i;
            n > this.options.max && (n -= t);
            this.max = parseFloat(n.toFixed(this._precision()))
        },
        _precision: function() {
            var n = this._precisionOf(this.options.step);
            return this.options.min !== null && (n = Math.max(n, this._precisionOf(this.options.min))),
            n
        },
        _precisionOf: function(n) {
            var t = n.toString()
              , i = t.indexOf(".");
            return i === -1 ? 0 : t.length - i - 1
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.max
        },
        _refreshRange: function(n) {
            n === "vertical" && this.range.css({
                width: "",
                left: ""
            });
            n === "horizontal" && this.range.css({
                height: "",
                bottom: ""
            })
        },
        _refreshValue: function() {
            var s, t, c, f, h, e = this.options.range, i = this.options, r = this, u = this._animateOff ? !1 : i.animate, o = {};
            this._hasMultipleValues() ? this.handles.each(function(f) {
                t = (r.values(f) - r._valueMin()) / (r._valueMax() - r._valueMin()) * 100;
                o[r.orientation === "horizontal" ? "left" : "bottom"] = t + "%";
                n(this).stop(1, 1)[u ? "animate" : "css"](o, i.animate);
                r.options.range === !0 && (r.orientation === "horizontal" ? (f === 0 && r.range.stop(1, 1)[u ? "animate" : "css"]({
                    left: t + "%"
                }, i.animate),
                f === 1 && r.range[u ? "animate" : "css"]({
                    width: t - s + "%"
                }, {
                    queue: !1,
                    duration: i.animate
                })) : (f === 0 && r.range.stop(1, 1)[u ? "animate" : "css"]({
                    bottom: t + "%"
                }, i.animate),
                f === 1 && r.range[u ? "animate" : "css"]({
                    height: t - s + "%"
                }, {
                    queue: !1,
                    duration: i.animate
                })));
                s = t
            }) : (c = this.value(),
            f = this._valueMin(),
            h = this._valueMax(),
            t = h !== f ? (c - f) / (h - f) * 100 : 0,
            o[this.orientation === "horizontal" ? "left" : "bottom"] = t + "%",
            this.handle.stop(1, 1)[u ? "animate" : "css"](o, i.animate),
            e === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[u ? "animate" : "css"]({
                width: t + "%"
            }, i.animate),
            e === "max" && this.orientation === "horizontal" && this.range.stop(1, 1)[u ? "animate" : "css"]({
                width: 100 - t + "%"
            }, i.animate),
            e === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[u ? "animate" : "css"]({
                height: t + "%"
            }, i.animate),
            e === "max" && this.orientation === "vertical" && this.range.stop(1, 1)[u ? "animate" : "css"]({
                height: 100 - t + "%"
            }, i.animate))
        },
        _handleEvents: {
            keydown: function(t) {
                var e, r, i, u, f = n(t.target).data("ui-slider-handle-index");
                switch (t.keyCode) {
                case n.ui.keyCode.HOME:
                case n.ui.keyCode.END:
                case n.ui.keyCode.PAGE_UP:
                case n.ui.keyCode.PAGE_DOWN:
                case n.ui.keyCode.UP:
                case n.ui.keyCode.RIGHT:
                case n.ui.keyCode.DOWN:
                case n.ui.keyCode.LEFT:
                    if (t.preventDefault(),
                    !this._keySliding && (this._keySliding = !0,
                    this._addClass(n(t.target), null, "ui-state-active"),
                    e = this._start(t, f),
                    e === !1))
                        return
                }
                u = this.options.step;
                r = this._hasMultipleValues() ? i = this.values(f) : i = this.value();
                switch (t.keyCode) {
                case n.ui.keyCode.HOME:
                    i = this._valueMin();
                    break;
                case n.ui.keyCode.END:
                    i = this._valueMax();
                    break;
                case n.ui.keyCode.PAGE_UP:
                    i = this._trimAlignValue(r + (this._valueMax() - this._valueMin()) / this.numPages);
                    break;
                case n.ui.keyCode.PAGE_DOWN:
                    i = this._trimAlignValue(r - (this._valueMax() - this._valueMin()) / this.numPages);
                    break;
                case n.ui.keyCode.UP:
                case n.ui.keyCode.RIGHT:
                    if (r === this._valueMax())
                        return;
                    i = this._trimAlignValue(r + u);
                    break;
                case n.ui.keyCode.DOWN:
                case n.ui.keyCode.LEFT:
                    if (r === this._valueMin())
                        return;
                    i = this._trimAlignValue(r - u)
                }
                this._slide(t, f, i)
            },
            keyup: function(t) {
                var i = n(t.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1,
                this._stop(t, i),
                this._change(t, i),
                this._removeClass(n(t.target), null, "ui-state-active"))
            }
        }
    });
    /*!
	 * jQuery UI Effects 1.12.1
	 * http://jqueryui.com
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 */
    var r = "ui-effects-"
      , f = "ui-effects-style"
      , e = "ui-effects-animated"
      , h = n;
    n.effects = {
        effect: {}
    };
    /*!
	 * jQuery Color Animations v2.1.2
	 * https://github.com/jquery/jquery-color
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * Date: Wed Jan 16 08:47:09 2013 -0600
	 */
    (function(n, t) {
        function e(n, t, i) {
            var r = s[t.type] || {};
            return n == null ? i || !t.def ? null : t.def : (n = r.floor ? ~~n : parseFloat(n),
            isNaN(n)) ? t.def : r.mod ? (n + r.mod) % r.mod : 0 > n ? 0 : r.max < n ? r.max : n
        }
        function l(t) {
            var e = i()
              , o = e._rgba = [];
            return (t = t.toLowerCase(),
            r(v, function(n, i) {
                var r, s = i.re.exec(t), h = s && i.parse(s), f = i.space || "rgba";
                if (h)
                    return r = e[f](h),
                    e[u[f].cache] = r[u[f].cache],
                    o = e._rgba = r._rgba,
                    !1
            }),
            o.length) ? (o.join() === "0,0,0,0" && n.extend(o, f.transparent),
            e) : f[t]
        }
        function o(n, t, i) {
            return (i = (i + 1) % 1,
            i * 6 < 1) ? n + (t - n) * i * 6 : i * 2 < 1 ? t : i * 3 < 2 ? n + (t - n) * (2 / 3 - i) * 6 : n
        }
        var a = /^([\-+])=\s*(\d+\.?\d*)/, v = [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(n) {
                return [n[1], n[2], n[3], n[4]]
            }
        }, {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(n) {
                return [n[1] * 2.55, n[2] * 2.55, n[3] * 2.55, n[4]]
            }
        }, {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function(n) {
                return [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)]
            }
        }, {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function(n) {
                return [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)]
            }
        }, {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function(n) {
                return [n[1], n[2] / 100, n[3] / 100, n[4]]
            }
        }], i = n.Color = function(t, i, r, u) {
            return new n.Color.fn.parse(t,i,r,u)
        }
        , u = {
            rgba: {
                props: {
                    red: {
                        idx: 0,
                        type: "byte"
                    },
                    green: {
                        idx: 1,
                        type: "byte"
                    },
                    blue: {
                        idx: 2,
                        type: "byte"
                    }
                }
            },
            hsla: {
                props: {
                    hue: {
                        idx: 0,
                        type: "degrees"
                    },
                    saturation: {
                        idx: 1,
                        type: "percent"
                    },
                    lightness: {
                        idx: 2,
                        type: "percent"
                    }
                }
            }
        }, s = {
            byte: {
                floor: !0,
                max: 255
            },
            percent: {
                max: 1
            },
            degrees: {
                mod: 360,
                floor: !0
            }
        }, h = i.support = {}, c = n("<p>")[0], f, r = n.each;
        c.style.cssText = "background-color:rgba(1,1,1,.5)";
        h.rgba = c.style.backgroundColor.indexOf("rgba") > -1;
        r(u, function(n, t) {
            t.cache = "_" + n;
            t.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        });
        i.fn = n.extend(i.prototype, {
            parse: function(o, s, h, c) {
                if (o === t)
                    return this._rgba = [null, null, null, null],
                    this;
                (o.jquery || o.nodeType) && (o = n(o).css(s),
                s = t);
                var a = this
                  , v = n.type(o)
                  , y = this._rgba = [];
                return (s !== t && (o = [o, s, h, c],
                v = "array"),
                v === "string") ? this.parse(l(o) || f._default) : v === "array" ? (r(u.rgba.props, function(n, t) {
                    y[t.idx] = e(o[t.idx], t)
                }),
                this) : v === "object" ? (o instanceof i ? r(u, function(n, t) {
                    o[t.cache] && (a[t.cache] = o[t.cache].slice())
                }) : r(u, function(t, i) {
                    var u = i.cache;
                    r(i.props, function(n, t) {
                        if (!a[u] && i.to) {
                            if (n === "alpha" || o[n] == null)
                                return;
                            a[u] = i.to(a._rgba)
                        }
                        a[u][t.idx] = e(o[n], t, !0)
                    });
                    a[u] && n.inArray(null, a[u].slice(0, 3)) < 0 && (a[u][3] = 1,
                    i.from && (a._rgba = i.from(a[u])))
                }),
                this) : void 0
            },
            is: function(n) {
                var e = i(n)
                  , t = !0
                  , f = this;
                return r(u, function(n, i) {
                    var o, u = e[i.cache];
                    return u && (o = f[i.cache] || i.to && i.to(f._rgba) || [],
                    r(i.props, function(n, i) {
                        if (u[i.idx] != null)
                            return t = u[i.idx] === o[i.idx]
                    })),
                    t
                }),
                t
            },
            _space: function() {
                var n = []
                  , t = this;
                return r(u, function(i, r) {
                    t[r.cache] && n.push(i)
                }),
                n.pop()
            },
            transition: function(n, t) {
                var f = i(n)
                  , c = f._space()
                  , o = u[c]
                  , l = this.alpha() === 0 ? i("transparent") : this
                  , a = l[o.cache] || o.to(l._rgba)
                  , h = a.slice();
                return f = f[o.cache],
                r(o.props, function(n, i) {
                    var c = i.idx
                      , r = a[c]
                      , u = f[c]
                      , o = s[i.type] || {};
                    u !== null && (r === null ? h[c] = u : (o.mod && (u - r > o.mod / 2 ? r += o.mod : r - u > o.mod / 2 && (r -= o.mod)),
                    h[c] = e((u - r) * t + r, i)))
                }),
                this[c](h)
            },
            blend: function(t) {
                if (this._rgba[3] === 1)
                    return this;
                var r = this._rgba.slice()
                  , u = r.pop()
                  , f = i(t)._rgba;
                return i(n.map(r, function(n, t) {
                    return (1 - u) * f[t] + u * n
                }))
            },
            toRgbaString: function() {
                var i = "rgba("
                  , t = n.map(this._rgba, function(n, t) {
                    return n == null ? t > 2 ? 1 : 0 : n
                });
                return t[3] === 1 && (t.pop(),
                i = "rgb("),
                i + t.join() + ")"
            },
            toHslaString: function() {
                var i = "hsla("
                  , t = n.map(this.hsla(), function(n, t) {
                    return n == null && (n = t > 2 ? 1 : 0),
                    t && t < 3 && (n = Math.round(n * 100) + "%"),
                    n
                });
                return t[3] === 1 && (t.pop(),
                i = "hsl("),
                i + t.join() + ")"
            },
            toHexString: function(t) {
                var i = this._rgba.slice()
                  , r = i.pop();
                return t && i.push(~~(r * 255)),
                "#" + n.map(i, function(n) {
                    return n = (n || 0).toString(16),
                    n.length === 1 ? "0" + n : n
                }).join("")
            },
            toString: function() {
                return this._rgba[3] === 0 ? "transparent" : this.toRgbaString()
            }
        });
        i.fn.parse.prototype = i.fn;
        u.hsla.to = function(n) {
            if (n[0] == null || n[1] == null || n[2] == null)
                return [null, null, null, n[3]];
            var i = n[0] / 255, r = n[1] / 255, f = n[2] / 255, s = n[3], u = Math.max(i, r, f), e = Math.min(i, r, f), t = u - e, o = u + e, h = o * .5, c, l;
            return c = e === u ? 0 : i === u ? 60 * (r - f) / t + 360 : r === u ? 60 * (f - i) / t + 120 : 60 * (i - r) / t + 240,
            l = t === 0 ? 0 : h <= .5 ? t / o : t / (2 - o),
            [Math.round(c) % 360, l, h, s == null ? 1 : s]
        }
        ;
        u.hsla.from = function(n) {
            if (n[0] == null || n[1] == null || n[2] == null)
                return [null, null, null, n[3]];
            var r = n[0] / 360
              , u = n[1]
              , t = n[2]
              , e = n[3]
              , i = t <= .5 ? t * (1 + u) : t + u - t * u
              , f = 2 * t - i;
            return [Math.round(o(f, i, r + 1 / 3) * 255), Math.round(o(f, i, r) * 255), Math.round(o(f, i, r - 1 / 3) * 255), e]
        }
        ;
        r(u, function(u, f) {
            var s = f.props
              , o = f.cache
              , h = f.to
              , c = f.from;
            i.fn[u] = function(u) {
                if (h && !this[o] && (this[o] = h(this._rgba)),
                u === t)
                    return this[o].slice();
                var l, a = n.type(u), v = a === "array" || a === "object" ? u : arguments, f = this[o].slice();
                return r(s, function(n, t) {
                    var i = v[a === "object" ? n : t.idx];
                    i == null && (i = f[t.idx]);
                    f[t.idx] = e(i, t)
                }),
                c ? (l = i(c(f)),
                l[o] = f,
                l) : i(f)
            }
            ;
            r(s, function(t, r) {
                i.fn[t] || (i.fn[t] = function(i) {
                    var f = n.type(i), h = t === "alpha" ? this._hsla ? "hsla" : "rgba" : u, o = this[h](), s = o[r.idx], e;
                    return f === "undefined" ? s : (f === "function" && (i = i.call(this, s),
                    f = n.type(i)),
                    i == null && r.empty) ? this : (f === "string" && (e = a.exec(i),
                    e && (i = s + parseFloat(e[2]) * (e[1] === "+" ? 1 : -1))),
                    o[r.idx] = i,
                    this[h](o))
                }
                )
            })
        });
        i.hook = function(t) {
            var u = t.split(" ");
            r(u, function(t, r) {
                n.cssHooks[r] = {
                    set: function(t, u) {
                        var o, f, e = "";
                        if (u !== "transparent" && (n.type(u) !== "string" || (o = l(u)))) {
                            if (u = i(o || u),
                            !h.rgba && u._rgba[3] !== 1) {
                                for (f = r === "backgroundColor" ? t.parentNode : t; (e === "" || e === "transparent") && f && f.style; )
                                    try {
                                        e = n.css(f, "backgroundColor");
                                        f = f.parentNode
                                    } catch (s) {}
                                u = u.blend(e && e !== "transparent" ? e : "_default")
                            }
                            u = u.toRgbaString()
                        }
                        try {
                            t.style[r] = u
                        } catch (s) {}
                    }
                };
                n.fx.step[r] = function(t) {
                    t.colorInit || (t.start = i(t.elem, r),
                    t.end = i(t.end),
                    t.colorInit = !0);
                    n.cssHooks[r].set(t.elem, t.start.transition(t.end, t.pos))
                }
            })
        }
        ;
        i.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor");
        n.cssHooks.borderColor = {
            expand: function(n) {
                var t = {};
                return r(["Top", "Right", "Bottom", "Left"], function(i, r) {
                    t["border" + r + "Color"] = n
                }),
                t
            }
        };
        f = n.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    }
    )(h),
    function() {
        function t(t) {
            var r, u, i = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle, f = {};
            if (i && i.length && i[0] && i[i[0]])
                for (u = i.length; u--; )
                    r = i[u],
                    typeof i[r] == "string" && (f[n.camelCase(r)] = i[r]);
            else
                for (r in i)
                    typeof i[r] == "string" && (f[r] = i[r]);
            return f
        }
        function u(t, i) {
            var e = {}, u, f;
            for (u in i)
                f = i[u],
                t[u] !== f && (r[u] || (n.fx.step[u] || !isNaN(parseFloat(f))) && (e[u] = f));
            return e
        }
        var i = ["add", "remove", "toggle"]
          , r = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
        n.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, i) {
            n.fx.step[i] = function(n) {
                (n.end === "none" || n.setAttr) && (n.pos !== 1 || n.setAttr) || (h.style(n.elem, i, n.end),
                n.setAttr = !0)
            }
        });
        n.fn.addBack || (n.fn.addBack = function(n) {
            return this.add(n == null ? this.prevObject : this.prevObject.filter(n))
        }
        );
        n.effects.animateClass = function(r, f, e, o) {
            var s = n.speed(f, e, o);
            return this.queue(function() {
                var e = n(this), h = e.attr("class") || "", o, f = s.children ? e.find("*").addBack() : e;
                f = f.map(function() {
                    var i = n(this);
                    return {
                        el: i,
                        start: t(this)
                    }
                });
                o = function() {
                    n.each(i, function(n, t) {
                        r[t] && e[t + "Class"](r[t])
                    })
                }
                ;
                o();
                f = f.map(function() {
                    return this.end = t(this.el[0]),
                    this.diff = u(this.start, this.end),
                    this
                });
                e.attr("class", h);
                f = f.map(function() {
                    var i = this
                      , t = n.Deferred()
                      , r = n.extend({}, s, {
                        queue: !1,
                        complete: function() {
                            t.resolve(i)
                        }
                    });
                    return this.el.animate(this.diff, r),
                    t.promise()
                });
                n.when.apply(n, f.get()).done(function() {
                    o();
                    n.each(arguments, function() {
                        var t = this.el;
                        n.each(this.diff, function(n) {
                            t.css(n, "")
                        })
                    });
                    s.complete.call(e[0])
                })
            })
        }
        ;
        n.fn.extend({
            addClass: function(t) {
                return function(i, r, u, f) {
                    return r ? n.effects.animateClass.call(this, {
                        add: i
                    }, r, u, f) : t.apply(this, arguments)
                }
            }(n.fn.addClass),
            removeClass: function(t) {
                return function(i, r, u, f) {
                    return arguments.length > 1 ? n.effects.animateClass.call(this, {
                        remove: i
                    }, r, u, f) : t.apply(this, arguments)
                }
            }(n.fn.removeClass),
            toggleClass: function(t) {
                return function(i, r, u, f, e) {
                    return typeof r == "boolean" || r === undefined ? u ? n.effects.animateClass.call(this, r ? {
                        add: i
                    } : {
                        remove: i
                    }, u, f, e) : t.apply(this, arguments) : n.effects.animateClass.call(this, {
                        toggle: i
                    }, r, u, f)
                }
            }(n.fn.toggleClass),
            switchClass: function(t, i, r, u, f) {
                return n.effects.animateClass.call(this, {
                    add: i,
                    remove: t
                }, r, u, f)
            }
        })
    }(),
    function() {
        function t(t, i, r, u) {
            return n.isPlainObject(t) && (i = t,
            t = t.effect),
            t = {
                effect: t
            },
            i == null && (i = {}),
            n.isFunction(i) && (u = i,
            r = null,
            i = {}),
            (typeof i == "number" || n.fx.speeds[i]) && (u = r,
            r = i,
            i = {}),
            n.isFunction(r) && (u = r,
            r = null),
            i && n.extend(t, i),
            r = r || i.duration,
            t.duration = n.fx.off ? 0 : typeof r == "number" ? r : r in n.fx.speeds ? n.fx.speeds[r] : n.fx.speeds._default,
            t.complete = u || i.complete,
            t
        }
        function i(t) {
            return !t || typeof t == "number" || n.fx.speeds[t] ? !0 : typeof t == "string" && !n.effects.effect[t] ? !0 : n.isFunction(t) ? !0 : typeof t == "object" && !t.effect ? !0 : !1
        }
        function u(n, t) {
            var r = t.outerWidth()
              , u = t.outerHeight()
              , i = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/.exec(n) || ["", 0, r, u, 0];
            return {
                top: parseFloat(i[1]) || 0,
                right: i[2] === "auto" ? r : parseFloat(i[2]),
                bottom: i[3] === "auto" ? u : parseFloat(i[3]),
                left: parseFloat(i[4]) || 0
            }
        }
        n.expr && n.expr.filters && n.expr.filters.animated && (n.expr.filters.animated = function(t) {
            return function(i) {
                return !!n(i).data(e) || t(i)
            }
        }(n.expr.filters.animated));
        n.uiBackCompat !== !1 && n.extend(n.effects, {
            save: function(n, t) {
                for (var i = 0, u = t.length; i < u; i++)
                    t[i] !== null && n.data(r + t[i], n[0].style[t[i]])
            },
            restore: function(n, t) {
                for (var u, i = 0, f = t.length; i < f; i++)
                    t[i] !== null && (u = n.data(r + t[i]),
                    n.css(t[i], u))
            },
            setMode: function(n, t) {
                return t === "toggle" && (t = n.is(":hidden") ? "show" : "hide"),
                t
            },
            createWrapper: function(t) {
                if (t.parent().is(".ui-effects-wrapper"))
                    return t.parent();
                var i = {
                    width: t.outerWidth(!0),
                    height: t.outerHeight(!0),
                    float: t.css("float")
                }
                  , u = n("<div><\/div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                })
                  , f = {
                    width: t.width(),
                    height: t.height()
                }
                  , r = document.activeElement;
                try {
                    r.id
                } catch (e) {
                    r = document.body
                }
                return t.wrap(u),
                (t[0] === r || n.contains(t[0], r)) && n(r).trigger("focus"),
                u = t.parent(),
                t.css("position") === "static" ? (u.css({
                    position: "relative"
                }),
                t.css({
                    position: "relative"
                })) : (n.extend(i, {
                    position: t.css("position"),
                    zIndex: t.css("z-index")
                }),
                n.each(["top", "left", "bottom", "right"], function(n, r) {
                    i[r] = t.css(r);
                    isNaN(parseInt(i[r], 10)) && (i[r] = "auto")
                }),
                t.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })),
                t.css(f),
                u.css(i).show()
            },
            removeWrapper: function(t) {
                var i = document.activeElement;
                return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t),
                (t[0] === i || n.contains(t[0], i)) && n(i).trigger("focus")),
                t
            }
        });
        n.extend(n.effects, {
            version: "1.12.1",
            define: function(t, i, r) {
                return r || (r = i,
                i = "effect"),
                n.effects.effect[t] = r,
                n.effects.effect[t].mode = i,
                r
            },
            scaledDimensions: function(n, t, i) {
                if (t === 0)
                    return {
                        height: 0,
                        width: 0,
                        outerHeight: 0,
                        outerWidth: 0
                    };
                var r = i !== "horizontal" ? (t || 100) / 100 : 1
                  , u = i !== "vertical" ? (t || 100) / 100 : 1;
                return {
                    height: n.height() * u,
                    width: n.width() * r,
                    outerHeight: n.outerHeight() * u,
                    outerWidth: n.outerWidth() * r
                }
            },
            clipToBox: function(n) {
                return {
                    width: n.clip.right - n.clip.left,
                    height: n.clip.bottom - n.clip.top,
                    left: n.clip.left,
                    top: n.clip.top
                }
            },
            unshift: function(n, t, i) {
                var r = n.queue();
                t > 1 && r.splice.apply(r, [1, 0].concat(r.splice(t, i)));
                n.dequeue()
            },
            saveStyle: function(n) {
                n.data(f, n[0].style.cssText)
            },
            restoreStyle: function(n) {
                n[0].style.cssText = n.data(f) || "";
                n.removeData(f)
            },
            mode: function(n, t) {
                var i = n.is(":hidden");
                return t === "toggle" && (t = i ? "show" : "hide"),
                (i ? t === "hide" : t === "show") && (t = "none"),
                t
            },
            getBaseline: function(n, t) {
                var i, r;
                switch (n[0]) {
                case "top":
                    i = 0;
                    break;
                case "middle":
                    i = .5;
                    break;
                case "bottom":
                    i = 1;
                    break;
                default:
                    i = n[0] / t.height
                }
                switch (n[1]) {
                case "left":
                    r = 0;
                    break;
                case "center":
                    r = .5;
                    break;
                case "right":
                    r = 1;
                    break;
                default:
                    r = n[1] / t.width
                }
                return {
                    x: r,
                    y: i
                }
            },
            createPlaceholder: function(t) {
                var i, u = t.css("position"), f = t.position();
                return t.css({
                    marginTop: t.css("marginTop"),
                    marginBottom: t.css("marginBottom"),
                    marginLeft: t.css("marginLeft"),
                    marginRight: t.css("marginRight")
                }).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()),
                /^(static|relative)/.test(u) && (u = "absolute",
                i = n("<" + t[0].nodeName + ">").insertAfter(t).css({
                    display: /^(inline|ruby)/.test(t.css("display")) ? "inline-block" : "block",
                    visibility: "hidden",
                    marginTop: t.css("marginTop"),
                    marginBottom: t.css("marginBottom"),
                    marginLeft: t.css("marginLeft"),
                    marginRight: t.css("marginRight"),
                    float: t.css("float")
                }).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).addClass("ui-effects-placeholder"),
                t.data(r + "placeholder", i)),
                t.css({
                    position: u,
                    left: f.left,
                    top: f.top
                }),
                i
            },
            removePlaceholder: function(n) {
                var t = r + "placeholder"
                  , i = n.data(t);
                i && (i.remove(),
                n.removeData(t))
            },
            cleanUp: function(t) {
                n.effects.restoreStyle(t);
                n.effects.removePlaceholder(t)
            },
            setTransition: function(t, i, r, u) {
                return u = u || {},
                n.each(i, function(n, i) {
                    var f = t.cssUnit(i);
                    f[0] > 0 && (u[i] = f[0] * r + f[1])
                }),
                u
            }
        });
        n.fn.extend({
            effect: function() {
                function a(t) {
                    function l() {
                        s.removeData(e);
                        n.effects.cleanUp(s);
                        i.mode === "hide" && s.hide();
                        h()
                    }
                    function h() {
                        n.isFunction(f) && f.call(s[0]);
                        n.isFunction(t) && t()
                    }
                    var s = n(this);
                    i.mode = c.shift();
                    n.uiBackCompat === !1 || u ? i.mode === "none" ? (s[r](),
                    h()) : o.call(s[0], i, l) : (s.is(":hidden") ? r === "hide" : r === "show") ? (s[r](),
                    h()) : o.call(s[0], i, h)
                }
                var i = t.apply(this, arguments)
                  , o = n.effects.effect[i.effect]
                  , u = o.mode
                  , s = i.queue
                  , h = s || "fx"
                  , f = i.complete
                  , r = i.mode
                  , c = []
                  , l = function(t) {
                    var f = n(this)
                      , i = n.effects.mode(f, r) || u;
                    f.data(e, !0);
                    c.push(i);
                    u && (i === "show" || i === u && i === "hide") && f.show();
                    u && i === "none" || n.effects.saveStyle(f);
                    n.isFunction(t) && t()
                };
                return n.fx.off || !o ? r ? this[r](i.duration, f) : this.each(function() {
                    f && f.call(this)
                }) : s === !1 ? this.each(l).each(a) : this.queue(h, l).queue(h, a)
            },
            show: function(n) {
                return function(r) {
                    if (i(r))
                        return n.apply(this, arguments);
                    var u = t.apply(this, arguments);
                    return u.mode = "show",
                    this.effect.call(this, u)
                }
            }(n.fn.show),
            hide: function(n) {
                return function(r) {
                    if (i(r))
                        return n.apply(this, arguments);
                    var u = t.apply(this, arguments);
                    return u.mode = "hide",
                    this.effect.call(this, u)
                }
            }(n.fn.hide),
            toggle: function(n) {
                return function(r) {
                    if (i(r) || typeof r == "boolean")
                        return n.apply(this, arguments);
                    var u = t.apply(this, arguments);
                    return u.mode = "toggle",
                    this.effect.call(this, u)
                }
            }(n.fn.toggle),
            cssUnit: function(t) {
                var i = this.css(t)
                  , r = [];
                return n.each(["em", "px", "%", "pt"], function(n, t) {
                    i.indexOf(t) > 0 && (r = [parseFloat(i), t])
                }),
                r
            },
            cssClip: function(n) {
                return n ? this.css("clip", "rect(" + n.top + "px " + n.right + "px " + n.bottom + "px " + n.left + "px)") : u(this.css("clip"), this)
            },
            transfer: function(t, i) {
                var u = n(this)
                  , r = n(t.to)
                  , f = r.css("position") === "fixed"
                  , e = n("body")
                  , o = f ? e.scrollTop() : 0
                  , s = f ? e.scrollLeft() : 0
                  , h = r.offset()
                  , l = {
                    top: h.top - o,
                    left: h.left - s,
                    height: r.innerHeight(),
                    width: r.innerWidth()
                }
                  , c = u.offset()
                  , a = n("<div class='ui-effects-transfer'><\/div>").appendTo("body").addClass(t.className).css({
                    top: c.top - o,
                    left: c.left - s,
                    height: u.innerHeight(),
                    width: u.innerWidth(),
                    position: f ? "fixed" : "absolute"
                }).animate(l, t.duration, t.easing, function() {
                    a.remove();
                    n.isFunction(i) && i()
                })
            }
        });
        n.fx.step.clip = function(t) {
            t.clipInit || (t.start = n(t.elem).cssClip(),
            typeof t.end == "string" && (t.end = u(t.end, t.elem)),
            t.clipInit = !0);
            n(t.elem).cssClip({
                top: t.pos * (t.end.top - t.start.top) + t.start.top,
                right: t.pos * (t.end.right - t.start.right) + t.start.right,
                bottom: t.pos * (t.end.bottom - t.start.bottom) + t.start.bottom,
                left: t.pos * (t.end.left - t.start.left) + t.start.left
            })
        }
    }(),
    function() {
        var t = {};
        n.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(n, i) {
            t[i] = function(t) {
                return Math.pow(t, n + 2)
            }
        });
        n.extend(t, {
            Sine: function(n) {
                return 1 - Math.cos(n * Math.PI / 2)
            },
            Circ: function(n) {
                return 1 - Math.sqrt(1 - n * n)
            },
            Elastic: function(n) {
                return n === 0 || n === 1 ? n : -Math.pow(2, 8 * (n - 1)) * Math.sin(((n - 1) * 80 - 7.5) * Math.PI / 15)
            },
            Back: function(n) {
                return n * n * (3 * n - 2)
            },
            Bounce: function(n) {
                for (var t, i = 4; n < ((t = Math.pow(2, --i)) - 1) / 11; )
                    ;
                return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((t * 3 - 2) / 22 - n, 2)
            }
        });
        n.each(t, function(t, i) {
            n.easing["easeIn" + t] = i;
            n.easing["easeOut" + t] = function(n) {
                return 1 - i(1 - n)
            }
            ;
            n.easing["easeInOut" + t] = function(n) {
                return n < .5 ? i(n * 2) / 2 : 1 - i(n * -2 + 2) / 2
            }
        })
    }();
    pt = n.effects;
    n.ui.dialog.prototype.__size = n.ui.dialog.prototype._size;
    n.ui.dialog.prototype._size = function() {
        this.options.width !== "css" && n.ui.dialog.prototype.__size.apply(this, arguments)
    }
    ;
    window.register && window.register("j/jquery.ui")
});
window.registerLoading && registerLoading("j/ui.touch"),
function(n) {
    typeof define == "function" && define.amd ? define(["jquery"], n) : typeof rrequire == "function" ? rrequire("j/jquery", n) : n(jQuery)
}(function(n) {
    function i(n, t) {
        if (!(n.originalEvent.touches.length > 1)) {
            n.preventDefault();
            var i = n.originalEvent.changedTouches[0]
              , r = document.createEvent("MouseEvents");
            r.initMouseEvent(t, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null);
            n.target.dispatchEvent(r)
        }
    }
    if (n.support.touch = "ontouchend"in document,
    !n.support.touch) {
        window.register && window.register("j/ui.touch");
        return
    }
    var t = n.ui.mouse.prototype, u = t._mouseInit, f = t._mouseDestroy, r;
    t._touchStart = function(n) {
        var t = this;
        !r && t._mouseCapture(n.originalEvent.changedTouches[0]) && (r = !0,
        t._touchMoved = !1,
        i(n, "mouseover"),
        i(n, "mousemove"),
        i(n, "mousedown"))
    }
    ;
    t._touchMove = function(n) {
        r && (this._touchMoved = !0,
        i(n, "mousemove"))
    }
    ;
    t._touchEnd = function(n) {
        r && (i(n, "mouseup"),
        i(n, "mouseout"),
        this._touchMoved || i(n, "click"),
        r = !1)
    }
    ;
    t._mouseInit = function() {
        var t = this;
        t.element.bind({
            touchstart: n.proxy(t, "_touchStart"),
            touchmove: n.proxy(t, "_touchMove"),
            touchend: n.proxy(t, "_touchEnd")
        });
        u.call(t)
    }
    ;
    t._mouseDestroy = function() {
        var t = this;
        t.element.unbind({
            touchstart: n.proxy(t, "_touchStart"),
            touchmove: n.proxy(t, "_touchMove"),
            touchend: n.proxy(t, "_touchEnd")
        });
        f.call(t)
    }
    ;
    window.register && window.register("j/ui.touch")
});
window.registerLoading && registerLoading("j/ui.wheel"),
function(n) {
    typeof rrequire == "function" ? rrequire("j/jquery", n) : n(jQuery)
}(function(n) {
    function e(r) {
        var f = r || window.event, w = h.call(arguments, 1), l = 0, o = 0, e = 0, a = 0, b = 0, k = 0, v, y, p;
        if (r = n.event.fix(f),
        r.type = "mousewheel",
        "detail"in f && (e = f.detail * -1),
        "wheelDelta"in f && (e = f.wheelDelta),
        "wheelDeltaY"in f && (e = f.wheelDeltaY),
        "wheelDeltaX"in f && (o = f.wheelDeltaX * -1),
        "axis"in f && f.axis === f.HORIZONTAL_AXIS && (o = e * -1,
        e = 0),
        l = e === 0 ? o : e,
        "deltaY"in f && (e = f.deltaY * -1,
        l = e),
        "deltaX"in f && (o = f.deltaX,
        e === 0 && (l = o * -1)),
        e !== 0 || o !== 0)
            return f.deltaMode === 1 ? (v = n.data(this, "mousewheel-line-height"),
            l *= v,
            e *= v,
            o *= v) : f.deltaMode === 2 && (y = n.data(this, "mousewheel-page-height"),
            l *= y,
            e *= y,
            o *= y),
            a = Math.max(Math.abs(e), Math.abs(o)),
            (!t || a < t) && (t = a,
            s(f, a) && (t /= 40)),
            s(f, a) && (l /= 40,
            o /= 40,
            e /= 40),
            l = Math[l >= 1 ? "floor" : "ceil"](l / t),
            o = Math[o >= 1 ? "floor" : "ceil"](o / t),
            e = Math[e >= 1 ? "floor" : "ceil"](e / t),
            i.settings.normalizeOffset && this.getBoundingClientRect && (p = this.getBoundingClientRect(),
            b = r.clientX - p.left,
            k = r.clientY - p.top),
            r.deltaX = o,
            r.deltaY = e,
            r.deltaFactor = t,
            r.offsetX = b,
            r.offsetY = k,
            r.deltaMode = 0,
            w.unshift(r, l, o, e),
            u && clearTimeout(u),
            u = setTimeout(c, 200),
            (n.event.dispatch || n.event.handle).apply(this, w)
    }
    function c() {
        t = null
    }
    function s(n, t) {
        return i.settings.adjustOldDeltas && n.type === "mousewheel" && t % 120 == 0
    }
    var o = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], r = "onwheel"in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], h = Array.prototype.slice, u, t, f, i;
    if (n.event.fixHooks)
        for (f = o.length; f; )
            n.event.fixHooks[o[--f]] = n.event.mouseHooks;
    i = n.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var t = r.length; t; )
                    this.addEventListener(r[--t], e, !1);
            else
                this.onmousewheel = e;
            n.data(this, "mousewheel-line-height", i.getLineHeight(this));
            n.data(this, "mousewheel-page-height", i.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var t = r.length; t; )
                    this.removeEventListener(r[--t], e, !1);
            else
                this.onmousewheel = null;
            n.removeData(this, "mousewheel-line-height");
            n.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(t) {
            var r = n(t)
              , i = r["offsetParent"in n.fn ? "offsetParent" : "parent"]();
            return i.length || (i = n("body")),
            parseInt(i.css("fontSize"), 10) || parseInt(r.css("fontSize"), 10) || 16
        },
        getPageHeight: function(t) {
            return n(t).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    n.fn.extend({
        mousewheel: function(n) {
            return n ? this.bind("mousewheel", n) : this.trigger("mousewheel")
        },
        unmousewheel: function(n) {
            return this.unbind("mousewheel", n)
        }
    });
    window.register && window.register("j/ui.wheel")
});
window.registerLoading && registerLoading("j/ui.draw"),
function(n) {
    typeof rrequire == "function" ? rrequire("j/jquery", n) : n(jQuery)
}(function(n) {
    var i, t;
    window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(n) {
        return setTimeout(function() {
            n()
        }, 1e3 / 60)
    }
    ,
    window.cancelAnimationFrame = window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame || function(n) {
        clearTimeout(n)
    }
    );
    i = n.fn.stop;
    t = function() {
        var t = this.data("ui.draw.opt");
        t && (t.frame && window.cancelAnimationFrame(t.frame),
        t.interval && window.clearInterval(t.interval),
        n(t.element).removeData("ui.draw.opt"),
        delete t.element,
        delete t.timing,
        delete t.format,
        delete t.complete)
    }
    ;
    n.fn.stop = function() {
        return t.apply(this, arguments),
        i.apply(this, arguments)
    }
    ;
    n.fn.draw = function(i, r, u, f) {
        var e, o;
        return t.apply(this, arguments),
        e = jQuery.speed(r, u, f),
        o = function(r) {
            var u, f, s, h = r || window.performance.now();
            if (!e.startTime) {
                e.startTime = h;
                e.frame = window.requestAnimationFrame(o, e.element);
                return
            }
            if (u = h - e.startTime,
            f = Math.max(0, Math.min(1, u / e.duration)),
            s = e.timing.get(f),
            i(s, f, u, e) === !1) {
                delete e.element;
                delete e.timing;
                return
            }
            u < e.duration ? e.frame = window.requestAnimationFrame(o, e.element) : (e.frame = 0,
            e.complete(),
            t.apply(n(e.element), []))
        }
        ,
        delete e.queue,
        e.element = this[0],
        e.timing = n.draw.CubicBezier.get(e.easing),
        e.frame = window.requestAnimationFrame(o, e.element),
        this.eq(0).data("ui.draw.opt", e),
        this
    }
    ;
    n.fn.counter = function(i, r, u) {
        var f, e;
        return this.length ? (t.apply(this, arguments),
        i = Make.Float(i),
        e = Make.Float(this.text()),
        r = Make.Float(r),
        u = u && n.isFunction(u) ? u : Math.round,
        e === i || r <= 0) ? (this[0].innerHTML = u(i),
        this) : (f = {
            duration: r,
            from: e,
            to: i,
            range: i - e,
            format: u,
            timing: n.draw.CubicBezier.get("ease"),
            element: this[0]
        },
        f.interval = setInterval(function() {
            var r, i, u, e, o = performance.now();
            if (!f.startTime) {
                f.startTime = o;
                return
            }
            r = Math.min(f.duration, o - f.startTime);
            i = r / f.duration;
            u = f.timing.get(i);
            e = f.from + f.range * u;
            f.element.innerHTML = f.format(e);
            i === 1 && t.apply(n(f.element), [])
        }, 1e3 / 60),
        this.eq(0).data("ui.draw.opt", f),
        this) : this
    }
    ;
    n.draw = n.draw || {};
    n.draw.CubicBezier = function(n, t, i, r) {
        function u(n, t) {
            return 1 - 3 * t + 3 * n
        }
        function f(n, t) {
            return 3 * t - 6 * n
        }
        function e(n) {
            return 3 * n
        }
        function o(n, t, i) {
            return ((u(t, i) * n + f(t, i)) * n + e(t)) * n
        }
        function s(n, t, i) {
            return 3 * u(t, i) * n * n + 2 * f(t, i) * n + e(t)
        }
        function h(t) {
            for (var u, e, r = t, f = 0; f < 4; ++f) {
                if (u = s(r, n, i),
                u == 0)
                    return r;
                e = o(r, n, i) - t;
                r -= e / u
            }
            return r
        }
        this.get = function(u) {
            return n == t && i == r ? u : o(h(u), t, r)
        }
    }
    ;
    n.draw.CubicBezier.timing = {
        ease: [.25, .1, .25, 1],
        linear: [0, 0, 1, 1],
        "ease-in": [.42, 0, 1, 1],
        "ease-out": [0, 0, .58, 1],
        "ease-in-out": [.42, 0, .58, 1]
    };
    n.draw.CubicBezier.get = function() {
        var t, i;
        if (arguments.length === 4)
            t = Array.prototype.slice.call(arguments, 0);
        else {
            if (n.isFunction(arguments[0]))
                return arguments[0];
            if (arguments[0] === "linear")
                return {
                    get: function(n) {
                        return n
                    }
                };
            t = n.draw.CubicBezier.timing[arguments[0] || "ease"];
            t || (i = /cubic\-bezier\s*\(\s*(\-?[\d\.]+)\s*,\s*(\-?[\d\.]+)\s*,\s*(\-?[\d\.]+)\s*,\s*(\-?[\d\.]+)\s*\)/i.exec("" + arguments[0]),
            i && i[1] && (t = [parseFloat(i[1]), parseFloat(i[2]), parseFloat(i[3]), parseFloat(i[4])]))
        }
        return t || (t = n.draw.CubicBezier.timing.ease),
        new n.draw.CubicBezier(t[0],t[1],t[2],t[3])
    }
    ;
    window.register && window.register("j/ui.draw")
});
/*!
 * jQuery Mobile Events
 * by Ben Major (lincweb - www.lincweb.co.uk)
 *
 * Copyright 2011-2015, Ben Major
 * Licensed under the MIT License:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
window.registerLoading && registerLoading("j/ui.mobile"),
function(n) {
    typeof define == "function" && define.amd ? define(["jquery"], n) : typeof rrequire == "function" ? rrequire("j/jquery", n) : n(jQuery)
}(function(n) {
    function l() {
        var n = e();
        n !== s && (s = n,
        f.trigger("orientationchange"))
    }
    function i(t, i, r, u) {
        var f = r.type;
        r.type = i;
        n.event.dispatch.call(t, r, u);
        r.type = f
    }
    var f, g, e, s, h, c, o;
    n.attrFn = n.attrFn || {};
    var r = navigator.userAgent.toLowerCase()
      , u = r.indexOf("chrome") > -1 && (r.indexOf("windows") > -1 || r.indexOf("macintosh") > -1 || r.indexOf("linux") > -1) && r.indexOf("mobile") < 0 && r.indexOf("android") < 0
      , t = {
        tap_pixel_range: 5,
        swipe_h_threshold: 50,
        swipe_v_threshold: 50,
        taphold_threshold: 750,
        doubletap_int: 500,
        touch_capable: "ontouchstart"in window && !u,
        orientation_support: "orientation"in window && "onorientationchange"in window,
        startevent: "ontouchstart"in window && !u ? "touchstart" : "mousedown",
        endevent: "ontouchstart"in window && !u ? "touchend" : "mouseup",
        moveevent: "ontouchstart"in window && !u ? "touchmove" : "mousemove",
        tapevent: "ontouchstart"in window && !u ? "tap" : "click",
        scrollevent: "ontouchstart"in window && !u ? "touchmove" : "scroll",
        hold_timer: null,
        tap_timer: null
    };
    if (n.isTouchCapable = function() {
        return t.touch_capable
    }
    ,
    n.getStartEvent = function() {
        return t.startevent
    }
    ,
    n.getEndEvent = function() {
        return t.endevent
    }
    ,
    n.getMoveEvent = function() {
        return t.moveevent
    }
    ,
    n.getTapEvent = function() {
        return t.tapevent
    }
    ,
    n.getScrollEvent = function() {
        return t.scrollevent
    }
    ,
    n.each(["tapstart", "tapend", "tapmove", "tap", "tap2", "tap3", "tap4", "singletap", "doubletap", "taphold", "swipe", "swipeup", "swiperight", "swipedown", "swipeleft", "swipeend", "scrollstart", "scrollend", "orientationchange"], function(t, i) {
        n.fn[i] = function(n) {
            return n ? this.on(i, n) : this.trigger(i)
        }
        ;
        n.attrFn[i] = !0
    }),
    n.event.special.tapstart = {
        setup: function() {
            var u = this
              , r = n(u);
            r.on(t.startevent, function f(n) {
                if (r.data("callee", f),
                n.which && n.which !== 1)
                    return !1;
                var e = n.originalEvent
                  , o = {
                    position: {
                        x: t.touch_capable ? e.touches[0].screenX : n.screenX,
                        y: t.touch_capable ? e.touches[0].screenY : n.screenY
                    },
                    offset: {
                        x: t.touch_capable ? Math.round(e.changedTouches[0].pageX - r.offset().left) : Math.round(n.pageX - r.offset().left),
                        y: t.touch_capable ? Math.round(e.changedTouches[0].pageY - r.offset().top) : Math.round(n.pageY - r.offset().top)
                    },
                    time: Date.now(),
                    target: n.target
                };
                return i(u, "tapstart", n, o),
                !0
            })
        },
        remove: function() {
            n(this).off(t.startevent, n(this).data.callee)
        }
    },
    n.event.special.tapmove = {
        setup: function() {
            var u = this
              , r = n(u);
            r.on(t.moveevent, function f(n) {
                r.data("callee", f);
                var e = n.originalEvent
                  , o = {
                    position: {
                        x: t.touch_capable ? e.touches[0].screenX : n.screenX,
                        y: t.touch_capable ? e.touches[0].screenY : n.screenY
                    },
                    offset: {
                        x: t.touch_capable ? Math.round(e.changedTouches[0].pageX - r.offset().left) : Math.round(n.pageX - r.offset().left),
                        y: t.touch_capable ? Math.round(e.changedTouches[0].pageY - r.offset().top) : Math.round(n.pageY - r.offset().top)
                    },
                    time: Date.now(),
                    target: n.target
                };
                return i(u, "tapmove", n, o),
                !0
            })
        },
        remove: function() {
            n(this).off(t.moveevent, n(this).data.callee)
        }
    },
    n.event.special.tapend = {
        setup: function() {
            var u = this
              , r = n(u);
            r.on(t.endevent, function f(n) {
                r.data("callee", f);
                var e = n.originalEvent
                  , o = {
                    position: {
                        x: t.touch_capable ? e.changedTouches[0].screenX : n.screenX,
                        y: t.touch_capable ? e.changedTouches[0].screenY : n.screenY
                    },
                    offset: {
                        x: t.touch_capable ? Math.round(e.changedTouches[0].pageX - r.offset().left) : Math.round(n.pageX - r.offset().left),
                        y: t.touch_capable ? Math.round(e.changedTouches[0].pageY - r.offset().top) : Math.round(n.pageY - r.offset().top)
                    },
                    time: Date.now(),
                    target: n.target
                };
                return i(u, "tapend", n, o),
                !0
            })
        },
        remove: function() {
            n(this).off(t.endevent, n(this).data.callee)
        }
    },
    n.event.special.taphold = {
        setup: function() {
            var o = this, r = n(o), s, u = {
                x: 0,
                y: 0
            }, f = 0, e = 0;
            r.on(t.startevent, function h(n) {
                if (n.which && n.which !== 1)
                    return !1;
                r.data("tapheld", !1);
                s = n.target;
                var c = n.originalEvent
                  , l = Date.now()
                  , a = {
                    x: t.touch_capable ? c.touches[0].screenX : n.screenX,
                    y: t.touch_capable ? c.touches[0].screenY : n.screenY
                }
                  , v = {
                    x: t.touch_capable ? c.touches[0].pageX - c.touches[0].target.offsetLeft : n.offsetX,
                    y: t.touch_capable ? c.touches[0].pageY - c.touches[0].target.offsetTop : n.offsetY
                };
                return u.x = n.originalEvent.targetTouches ? n.originalEvent.targetTouches[0].pageX : n.pageX,
                u.y = n.originalEvent.targetTouches ? n.originalEvent.targetTouches[0].pageY : n.pageY,
                f = u.x,
                e = u.y,
                t.hold_timer = window.setTimeout(function() {
                    var y = u.x - f
                      , p = u.y - e;
                    if (n.target == s && (u.x == f && u.y == e || y >= -t.tap_pixel_range && y <= t.tap_pixel_range && p >= -t.tap_pixel_range && p <= t.tap_pixel_range)) {
                        r.data("tapheld", !0);
                        var w = Date.now()
                          , b = {
                            x: t.touch_capable ? c.touches[0].screenX : n.screenX,
                            y: t.touch_capable ? c.touches[0].screenY : n.screenY
                        }
                          , k = {
                            x: t.touch_capable ? Math.round(c.changedTouches[0].pageX - r.offset().left) : Math.round(n.pageX - r.offset().left),
                            y: t.touch_capable ? Math.round(c.changedTouches[0].pageY - r.offset().top) : Math.round(n.pageY - r.offset().top)
                        }
                          , d = w - l
                          , g = {
                            startTime: l,
                            endTime: w,
                            startPosition: a,
                            startOffset: v,
                            endPosition: b,
                            endOffset: k,
                            duration: d,
                            target: n.target
                        };
                        r.data("callee1", h);
                        i(o, "taphold", n, g)
                    }
                }, t.taphold_threshold),
                !0
            }).on(t.endevent, function c() {
                r.data("callee2", c);
                r.data("tapheld", !1);
                window.clearTimeout(t.hold_timer)
            }).on(t.moveevent, function l(n) {
                r.data("callee3", l);
                f = n.originalEvent.targetTouches ? n.originalEvent.targetTouches[0].pageX : n.pageX;
                e = n.originalEvent.targetTouches ? n.originalEvent.targetTouches[0].pageY : n.pageY
            })
        },
        remove: function() {
            n(this).off(t.startevent, n(this).data.callee1).off(t.endevent, n(this).data.callee2).off(t.moveevent, n(this).data.callee3)
        }
    },
    n.event.special.doubletap = {
        setup: function() {
            var s = this, r = n(s), h, e, f = null, u, c, o = !1;
            r.on(t.startevent, function l(n) {
                return n.which && n.which !== 1 ? !1 : (r.data("doubletapped", !1),
                h = n.target,
                r.data("callee1", l),
                u = n.originalEvent,
                f || (f = {
                    position: {
                        x: t.touch_capable ? u.touches[0].screenX : n.screenX,
                        y: t.touch_capable ? u.touches[0].screenY : n.screenY
                    },
                    offset: {
                        x: t.touch_capable ? Math.round(u.changedTouches[0].pageX - r.offset().left) : Math.round(n.pageX - r.offset().left),
                        y: t.touch_capable ? Math.round(u.changedTouches[0].pageY - r.offset().top) : Math.round(n.pageY - r.offset().top)
                    },
                    time: Date.now(),
                    target: n.target
                }),
                !0)
            }).on(t.endevent, function a(n) {
                var l = Date.now(), w = r.data("lastTouch") || l + 1, y = l - w, v, p;
                window.clearTimeout(e);
                r.data("callee2", a);
                y < t.doubletap_int && n.target == h && y > 100 ? (r.data("doubletapped", !0),
                window.clearTimeout(t.tap_timer),
                v = {
                    position: {
                        x: t.touch_capable ? n.originalEvent.changedTouches[0].screenX : n.screenX,
                        y: t.touch_capable ? n.originalEvent.changedTouches[0].screenY : n.screenY
                    },
                    offset: {
                        x: t.touch_capable ? Math.round(u.changedTouches[0].pageX - r.offset().left) : Math.round(n.pageX - r.offset().left),
                        y: t.touch_capable ? Math.round(u.changedTouches[0].pageY - r.offset().top) : Math.round(n.pageY - r.offset().top)
                    },
                    time: Date.now(),
                    target: n.target
                },
                p = {
                    firstTap: f,
                    secondTap: v,
                    interval: v.time - f.time
                },
                o || (i(s, "doubletap", n, p),
                f = null),
                o = !0,
                c = window.setTimeout(function() {
                    o = !1
                }, t.doubletap_int)) : (r.data("lastTouch", l),
                e = window.setTimeout(function() {
                    f = null;
                    window.clearTimeout(e)
                }, t.doubletap_int, [n]));
                r.data("lastTouch", l)
            })
        },
        remove: function() {
            n(this).off(t.startevent, n(this).data.callee1).off(t.endevent, n(this).data.callee2)
        }
    },
    n.event.special.singletap = {
        setup: function() {
            var f = this
              , r = n(f)
              , e = null
              , o = null
              , u = {
                x: 0,
                y: 0
            };
            r.on(t.startevent, function s(n) {
                return n.which && n.which !== 1 ? !1 : (o = Date.now(),
                e = n.target,
                r.data("callee1", s),
                u.x = n.originalEvent.targetTouches ? n.originalEvent.targetTouches[0].pageX : n.pageX,
                u.y = n.originalEvent.targetTouches ? n.originalEvent.targetTouches[0].pageY : n.pageY,
                !0)
            }).on(t.endevent, function h(n) {
                if (r.data("callee2", h),
                n.target == e) {
                    var s = n.originalEvent.changedTouches ? n.originalEvent.changedTouches[0].pageX : n.pageX
                      , c = n.originalEvent.changedTouches ? n.originalEvent.changedTouches[0].pageY : n.pageY;
                    t.tap_timer = window.setTimeout(function() {
                        if (!r.data("doubletapped") && !r.data("tapheld") && u.x == s && u.y == c) {
                            var e = n.originalEvent
                              , h = {
                                position: {
                                    x: t.touch_capable ? e.changedTouches[0].screenX : n.screenX,
                                    y: t.touch_capable ? e.changedTouches[0].screenY : n.screenY
                                },
                                offset: {
                                    x: t.touch_capable ? Math.round(e.changedTouches[0].pageX - r.offset().left) : Math.round(n.pageX - r.offset().left),
                                    y: t.touch_capable ? Math.round(e.changedTouches[0].pageY - r.offset().top) : Math.round(n.pageY - r.offset().top)
                                },
                                time: Date.now(),
                                target: n.target
                            };
                            h.time - o < t.taphold_threshold && i(f, "singletap", n, h)
                        }
                    }, t.doubletap_int)
                }
            })
        },
        remove: function() {
            n(this).off(t.startevent, n(this).data.callee1).off(t.endevent, n(this).data.callee2)
        }
    },
    n.event.special.tap = {
        setup: function() {
            var f = this, r = n(f), e = !1, o = null, s, u = {
                x: 0,
                y: 0
            }, h;
            r.on(t.startevent, function c(n) {
                return r.data("callee1", c),
                n.which && n.which !== 1 ? !1 : (e = !0,
                u.x = n.originalEvent.targetTouches ? n.originalEvent.targetTouches[0].pageX : n.pageX,
                u.y = n.originalEvent.targetTouches ? n.originalEvent.targetTouches[0].pageY : n.pageY,
                s = Date.now(),
                o = n.target,
                h = n.originalEvent.targetTouches ? n.originalEvent.targetTouches : [n],
                !0)
            }).on(t.endevent, function l(n) {
                var a, v, c, k;
                r.data("callee2", l);
                var y = n.originalEvent.targetTouches ? n.originalEvent.changedTouches[0].pageX : n.pageX
                  , p = n.originalEvent.targetTouches ? n.originalEvent.changedTouches[0].pageY : n.pageY
                  , w = u.x - y
                  , b = u.y - p;
                if (o == n.target && e && Date.now() - s < t.taphold_threshold && (u.x == y && u.y == p || w >= -t.tap_pixel_range && w <= t.tap_pixel_range && b >= -t.tap_pixel_range && b <= t.tap_pixel_range)) {
                    for (a = n.originalEvent,
                    v = [],
                    c = 0; c < h.length; c++)
                        k = {
                            position: {
                                x: t.touch_capable ? a.changedTouches[c].screenX : n.screenX,
                                y: t.touch_capable ? a.changedTouches[c].screenY : n.screenY
                            },
                            offset: {
                                x: t.touch_capable ? Math.round(a.changedTouches[c].pageX - r.offset().left) : Math.round(n.pageX - r.offset().left),
                                y: t.touch_capable ? Math.round(a.changedTouches[c].pageY - r.offset().top) : Math.round(n.pageY - r.offset().top)
                            },
                            time: Date.now(),
                            target: n.target
                        },
                        v.push(k);
                    i(f, "tap", n, v)
                }
            })
        },
        remove: function() {
            n(this).off(t.startevent, n(this).data.callee1).off(t.endevent, n(this).data.callee2)
        }
    },
    n.event.special.swipe = {
        setup: function() {
            function s(o) {
                i = n(o.currentTarget);
                i.data("callee1", s);
                u.x = o.originalEvent.targetTouches ? o.originalEvent.targetTouches[0].pageX : o.pageX;
                u.y = o.originalEvent.targetTouches ? o.originalEvent.targetTouches[0].pageY : o.pageY;
                f.x = u.x;
                f.y = u.y;
                e = !0;
                var h = o.originalEvent;
                r = {
                    position: {
                        x: t.touch_capable ? h.touches[0].screenX : o.screenX,
                        y: t.touch_capable ? h.touches[0].screenY : o.screenY
                    },
                    offset: {
                        x: t.touch_capable ? Math.round(h.changedTouches[0].pageX - i.offset().left) : Math.round(o.pageX - i.offset().left),
                        y: t.touch_capable ? Math.round(h.changedTouches[0].pageY - i.offset().top) : Math.round(o.pageY - i.offset().top)
                    },
                    time: Date.now(),
                    target: o.target
                }
            }
            function h(s) {
                i = n(s.currentTarget);
                i.data("callee2", h);
                f.x = s.originalEvent.targetTouches ? s.originalEvent.targetTouches[0].pageX : s.pageX;
                f.y = s.originalEvent.targetTouches ? s.originalEvent.targetTouches[0].pageY : s.pageY;
                var c, l = i.parent().data("xthreshold") ? i.parent().data("xthreshold") : i.data("xthreshold"), a = i.parent().data("ythreshold") ? i.parent().data("ythreshold") : i.data("ythreshold"), p = typeof l != "undefined" && l !== !1 && parseInt(l) ? parseInt(l) : t.swipe_h_threshold, w = typeof a != "undefined" && a !== !1 && parseInt(a) ? parseInt(a) : t.swipe_v_threshold;
                if (u.y > f.y && u.y - f.y > w && (c = "swipeup"),
                u.x < f.x && f.x - u.x > p && (c = "swiperight"),
                u.y < f.y && f.y - u.y > w && (c = "swipedown"),
                u.x > f.x && u.x - f.x > p && (c = "swipeleft"),
                c != undefined && e) {
                    u.x = 0;
                    u.y = 0;
                    f.x = 0;
                    f.y = 0;
                    e = !1;
                    var v = s.originalEvent
                      , y = {
                        position: {
                            x: t.touch_capable ? v.touches[0].screenX : s.screenX,
                            y: t.touch_capable ? v.touches[0].screenY : s.screenY
                        },
                        offset: {
                            x: t.touch_capable ? Math.round(v.changedTouches[0].pageX - i.offset().left) : Math.round(s.pageX - i.offset().left),
                            y: t.touch_capable ? Math.round(v.changedTouches[0].pageY - i.offset().top) : Math.round(s.pageY - i.offset().top)
                        },
                        time: Date.now(),
                        target: s.target
                    }
                      , k = Math.abs(r.position.x - y.position.x)
                      , d = Math.abs(r.position.y - y.position.y)
                      , b = {
                        startEvnt: r,
                        endEvnt: y,
                        direction: c.replace("swipe", ""),
                        xAmount: k,
                        yAmount: d,
                        duration: y.time - r.time
                    };
                    o = !0;
                    i.trigger("swipe", b).trigger(c, b)
                }
            }
            function c(u) {
                var s;
                if (i = n(u.currentTarget),
                s = "",
                i.data("callee3", c),
                o) {
                    var h = i.data("xthreshold")
                      , l = i.data("ythreshold")
                      , v = typeof h != "undefined" && h !== !1 && parseInt(h) ? parseInt(h) : t.swipe_h_threshold
                      , y = typeof l != "undefined" && l !== !1 && parseInt(l) ? parseInt(l) : t.swipe_v_threshold
                      , a = u.originalEvent
                      , f = {
                        position: {
                            x: t.touch_capable ? a.changedTouches[0].screenX : u.screenX,
                            y: t.touch_capable ? a.changedTouches[0].screenY : u.screenY
                        },
                        offset: {
                            x: t.touch_capable ? Math.round(a.changedTouches[0].pageX - i.offset().left) : Math.round(u.pageX - i.offset().left),
                            y: t.touch_capable ? Math.round(a.changedTouches[0].pageY - i.offset().top) : Math.round(u.pageY - i.offset().top)
                        },
                        time: Date.now(),
                        target: u.target
                    };
                    r.position.y > f.position.y && r.position.y - f.position.y > y && (s = "swipeup");
                    r.position.x < f.position.x && f.position.x - r.position.x > v && (s = "swiperight");
                    r.position.y < f.position.y && f.position.y - r.position.y > y && (s = "swipedown");
                    r.position.x > f.position.x && r.position.x - f.position.x > v && (s = "swipeleft");
                    var p = Math.abs(r.position.x - f.position.x)
                      , w = Math.abs(r.position.y - f.position.y)
                      , b = {
                        startEvnt: r,
                        endEvnt: f,
                        direction: s.replace("swipe", ""),
                        xAmount: p,
                        yAmount: w,
                        duration: f.time - r.time
                    };
                    i.trigger("swipeend", b)
                }
                e = !1;
                o = !1
            }
            var l = this, i = n(l), e = !1, o = !1, u = {
                x: 0,
                y: 0
            }, f = {
                x: 0,
                y: 0
            }, r;
            i.on(t.startevent, s);
            i.on(t.moveevent, h);
            i.on(t.endevent, c)
        },
        remove: function() {
            n(this).off(t.startevent, n(this).data.callee1).off(t.moveevent, n(this).data.callee2).off(t.endevent, n(this).data.callee3)
        }
    },
    n.event.special.scrollstart = {
        setup: function() {
            function o(n, t) {
                r = t;
                i(u, r ? "scrollstart" : "scrollend", n)
            }
            var u = this, f = n(u), r, e;
            f.on(t.scrollevent, function s(n) {
                f.data("callee", s);
                r || o(n, !0);
                clearTimeout(e);
                e = setTimeout(function() {
                    o(n, !1)
                }, 50)
            })
        },
        remove: function() {
            n(this).off(t.scrollevent, n(this).data.callee)
        }
    },
    f = n(window),
    o = {
        "0": !0,
        "180": !0
    },
    t.orientation_support) {
        var p = window.innerWidth || f.width()
          , w = window.innerHeight || f.height();
        h = p > w && p - w > 50;
        c = o[window.orientation];
        (h && c || !h && !c) && (o = {
            "-90": !0,
            "90": !0
        })
    }
    n.event.special.orientationchange = g = {
        setup: function() {
            if (t.orientation_support)
                return !1;
            s = e();
            f.on("throttledresize", l);
            return !0
        },
        teardown: function() {
            return t.orientation_support ? !1 : (f.off("throttledresize", l),
            !0)
        },
        add: function(n) {
            var t = n.handler;
            n.handler = function(n) {
                return n.orientation = e(),
                t.apply(this, arguments)
            }
        }
    };
    n.event.special.orientationchange.orientation = e = function() {
        var i = !0
          , n = document.documentElement;
        return i = t.orientation_support ? o[window.orientation] : n && n.clientWidth / n.clientHeight < 1.1,
        i ? "portrait" : "landscape"
    }
    ;
    n.event.special.throttledresize = {
        setup: function() {
            n(this).on("resize", k)
        },
        teardown: function() {
            n(this).off("resize", k)
        }
    };
    var b = 250, k = function() {
        v = Date.now();
        y = v - d;
        y >= b ? (d = v,
        n(this).trigger("throttledresize")) : (a && window.clearTimeout(a),
        a = window.setTimeout(l, b - y))
    }, d = 0, a, v, y;
    n.each({
        scrollend: "scrollstart",
        swipeup: "swipe",
        swiperight: "swipe",
        swipedown: "swipe",
        swipeleft: "swipe",
        swipeend: "swipe",
        tap2: "tap"
    }, function(t, i) {
        n.event.special[t] = {
            setup: function() {
                n(this).on(i, n.noop)
            }
        }
    });
    window.register && window.register("j/ui.mobile")
});
(function(n) {
    /**
 * This script gives you the zone info key representing your device's time zone setting.
 *
 * @name jsTimezoneDetect
 * @version 1.0.6
 * @author Jon Nylander
 * @license MIT License - https://bitbucket.org/pellepim/jstimezonedetect/src/default/LICENCE.txt
 *
 * For usage and examples, visit:
 * http://pellepim.bitbucket.org/jstz/
 *
 * Copyright (c) Jon Nylander
 */
    var t = function() {
        "use strict";
        var u = "s"
          , n = {
            DAY: 864e5,
            HOUR: 36e5,
            MINUTE: 6e4,
            SECOND: 1e3,
            BASELINE_YEAR: 2014,
            MAX_SCORE: 864e6,
            AMBIGUITIES: {
                "America/Denver": ["America/Mazatlan"],
                "America/Chicago": ["America/Mexico_City"],
                "America/Asuncion": ["America/Campo_Grande", "America/Santiago"],
                "America/Montevideo": ["America/Sao_Paulo", "America/Santiago"],
                "Asia/Beirut": ["Asia/Amman", "Asia/Jerusalem", "Europe/Helsinki", "Asia/Damascus", "Africa/Cairo", "Asia/Gaza", "Europe/Minsk", "Africa/Windhoek"],
                "Pacific/Auckland": ["Pacific/Fiji"],
                "America/Los_Angeles": ["America/Santa_Isabel"],
                "America/New_York": ["America/Havana"],
                "America/Halifax": ["America/Goose_Bay"],
                "America/Godthab": ["America/Miquelon"],
                "Asia/Dubai": ["Asia/Yerevan"],
                "Asia/Jakarta": ["Asia/Krasnoyarsk"],
                "Asia/Shanghai": ["Asia/Irkutsk", "Australia/Perth"],
                "Australia/Sydney": ["Australia/Lord_Howe"],
                "Asia/Tokyo": ["Asia/Yakutsk"],
                "Asia/Dhaka": ["Asia/Omsk"],
                "Asia/Baku": ["Asia/Yerevan"],
                "Australia/Brisbane": ["Asia/Vladivostok"],
                "Pacific/Noumea": ["Asia/Vladivostok"],
                "Pacific/Majuro": ["Asia/Kamchatka", "Pacific/Fiji"],
                "Pacific/Tongatapu": ["Pacific/Apia"],
                "Asia/Baghdad": ["Europe/Minsk", "Europe/Moscow"],
                "Asia/Karachi": ["Asia/Yekaterinburg"],
                "Africa/Johannesburg": ["Asia/Gaza", "Africa/Cairo"]
            }
        }
          , f = function(n) {
            var t = -n.getTimezoneOffset();
            return t !== null ? t : 0
        }
          , r = function() {
            for (var i, u, t = [], r = 0; r <= 11; r++)
                for (i = 1; i <= 28; i++)
                    u = f(new Date(n.BASELINE_YEAR,r,i)),
                    t ? t && t[t.length - 1] !== u && t.push(u) : t.push();
            return t
        }
          , e = function() {
            var t = 0
              , n = r();
            return (n.length > 1 && (t = n[0] - n[1]),
            n.length > 3) ? n[0] + ",1,weird" : t < 0 ? n[0] + ",1" : t > 0 ? n[1] + ",1," + u : n[0] + ",0"
        }
          , o = function() {
            var t, n;
            if (Intl && typeof Intl != "undefined" && typeof Intl.DateTimeFormat != "undefined")
                return (t = Intl.DateTimeFormat(),
                typeof t == "undefined" || typeof t.resolvedOptions == "undefined") ? void 0 : (n = t.resolvedOptions().timeZone,
                n && (n.indexOf("/") > -1 || n === "UTC") ? n : void 0)
        }
          , s = function(n) {
            for (var s = new Date(n,0,1,0,0,1,0).getTime(), h = new Date(n,12,31,23,59,59).getTime(), r = s, u = new Date(r).getTimezoneOffset(), e = null, o = null, f, t; r < h - 864e5; )
                f = new Date(r),
                t = f.getTimezoneOffset(),
                t !== u && (t < u && (e = f),
                t > u && (o = f),
                u = t),
                r += 864e5;
            return e && o ? {
                s: i(e).getTime(),
                e: i(o).getTime()
            } : !1
        }
          , i = function i(t, r, u) {
            var o, h;
            typeof r == "undefined" && (r = n.DAY,
            u = n.HOUR);
            for (var s = new Date(t.getTime() - r).getTime(), c = t.getTime() + r, l = new Date(s).getTimezoneOffset(), e = s, f = null; e < c - u; ) {
                if (o = new Date(e),
                h = o.getTimezoneOffset(),
                h !== l) {
                    f = o;
                    break
                }
                e += u
            }
            return r === n.DAY ? i(f, n.HOUR, n.MINUTE) : r === n.HOUR ? i(f, n.MINUTE, n.SECOND) : f
        }
          , h = function(n, t, i, r) {
            if (i !== "N/A")
                return i;
            if (t === "Asia/Beirut") {
                if (r.name === "Africa/Cairo" && n[6].s === 13983768e5 && n[6].e === 14116788e5 || r.name === "Asia/Jerusalem" && n[6].s === 13959648e5 && n[6].e === 14118588e5)
                    return 0
            } else if (t === "America/Santiago") {
                if (r.name === "America/Asuncion" && n[6].s === 14124816e5 && n[6].e === 1397358e6 || r.name === "America/Campo_Grande" && n[6].s === 14136912e5 && n[6].e === 13925196e5)
                    return 0
            } else if (t === "America/Montevideo") {
                if (r.name === "America/Sao_Paulo" && n[6].s === 14136876e5 && n[6].e === 1392516e6)
                    return 0
            } else if (t === "Pacific/Auckland" && r.name === "Pacific/Fiji" && n[6].s === 14142456e5 && n[6].e === 13961016e5)
                return 0;
            return i
        }
          , c = function(i, r) {
            for (var a, c, f, e, v = function(t) {
                for (var f = 0, u = 0; u < i.length; u++)
                    if (!!t.rules[u] && !!i[u]) {
                        if (i[u].s >= t.rules[u].s && i[u].e <= t.rules[u].e)
                            f = 0,
                            f += Math.abs(i[u].s - t.rules[u].s),
                            f += Math.abs(t.rules[u].e - i[u].e);
                        else {
                            f = "N/A";
                            break
                        }
                        if (f > n.MAX_SCORE) {
                            f = "N/A";
                            break
                        }
                    }
                return h(i, r, f, t)
            }, o = {}, s = t.olson.dst_rules.zones, y = s.length, l = n.AMBIGUITIES[r], u = 0; u < y; u++)
                a = s[u],
                c = v(s[u]),
                c !== "N/A" && (o[a.name] = c);
            for (f in o)
                if (o.hasOwnProperty(f))
                    for (e = 0; e < l.length; e++)
                        if (l[e] === f)
                            return f;
            return r
        }
          , l = function(n) {
            var r = function() {
                for (var r, i = [], n = 0; n < t.olson.dst_rules.years.length; n++)
                    r = s(t.olson.dst_rules.years[n]),
                    i.push(r);
                return i
            }
              , u = function(n) {
                for (var t = 0; t < n.length; t++)
                    if (n[t] !== !1)
                        return !0;
                return !1
            }
              , i = r()
              , f = u(i);
            return f ? c(i, n) : n
        }
          , a = function(i) {
            var u = !1
              , f = e();
            return (i || typeof i == "undefined") && (u = o()),
            u || (u = t.olson.timezones[f],
            typeof n.AMBIGUITIES[u] != "undefined" && (u = l(u))),
            {
                name: function() {
                    return u
                },
                using_intl: i || typeof i == "undefined",
                needle: f,
                offsets: r()
            }
        };
        return {
            determine: a
        }
    }();
    t.olson = t.olson || {};
    t.olson.timezones = {
        "-720,0": "Etc/GMT+12",
        "-660,0": "Pacific/Pago_Pago",
        "-660,1,s": "Pacific/Apia",
        "-600,1": "America/Adak",
        "-600,0": "Pacific/Honolulu",
        "-570,0": "Pacific/Marquesas",
        "-540,0": "Pacific/Gambier",
        "-540,1": "America/Anchorage",
        "-480,1": "America/Los_Angeles",
        "-480,0": "Pacific/Pitcairn",
        "-420,0": "America/Phoenix",
        "-420,1": "America/Denver",
        "-360,0": "America/Guatemala",
        "-360,1": "America/Chicago",
        "-360,1,s": "Pacific/Easter",
        "-300,0": "America/Bogota",
        "-300,1": "America/New_York",
        "-270,0": "America/Caracas",
        "-240,1": "America/Halifax",
        "-240,0": "America/Santo_Domingo",
        "-240,1,s": "America/Asuncion",
        "-210,1": "America/St_Johns",
        "-180,1": "America/Godthab",
        "-180,0": "America/Buenos_Aires",
        "-180,1,s": "America/Montevideo",
        "-120,0": "America/Noronha",
        "-120,1": "America/Noronha",
        "-60,1": "Atlantic/Azores",
        "-60,0": "Atlantic/Cape_Verde",
        "0,0": "UTC",
        "0,1": "Europe/London",
        "0,1,weird": "Africa/Casablanca",
        "60,1": "Europe/Berlin",
        "60,0": "Africa/Lagos",
        "60,1,weird": "Africa/Casablanca",
        "120,1": "Asia/Beirut",
        "120,1,weird": "Africa/Cairo",
        "120,0": "Africa/Johannesburg",
        "180,0": "Asia/Baghdad",
        "180,1": "Europe/Moscow",
        "210,1": "Asia/Tehran",
        "240,0": "Asia/Dubai",
        "240,1": "Asia/Baku",
        "270,0": "Asia/Kabul",
        "300,1": "Asia/Yekaterinburg",
        "300,0": "Asia/Karachi",
        "330,0": "Asia/Calcutta",
        "345,0": "Asia/Katmandu",
        "360,0": "Asia/Dhaka",
        "360,1": "Asia/Omsk",
        "390,0": "Asia/Rangoon",
        "420,1": "Asia/Krasnoyarsk",
        "420,0": "Asia/Jakarta",
        "480,0": "Asia/Shanghai",
        "480,1": "Asia/Irkutsk",
        "525,0": "Australia/Eucla",
        "525,1,s": "Australia/Eucla",
        "540,1": "Asia/Yakutsk",
        "540,0": "Asia/Tokyo",
        "570,0": "Australia/Darwin",
        "570,1,s": "Australia/Adelaide",
        "600,0": "Australia/Brisbane",
        "600,1": "Asia/Vladivostok",
        "600,1,s": "Australia/Sydney",
        "630,1,s": "Australia/Lord_Howe",
        "660,1": "Asia/Kamchatka",
        "660,0": "Pacific/Noumea",
        "690,0": "Pacific/Norfolk",
        "720,1,s": "Pacific/Auckland",
        "720,0": "Pacific/Majuro",
        "765,1,s": "Pacific/Chatham",
        "780,0": "Pacific/Tongatapu",
        "780,1,s": "Pacific/Apia",
        "840,0": "Pacific/Kiritimati"
    };
    t.olson.friendly = {
        "Africa/Abidjan": "Greenwich Standard Time",
        "Africa/Accra": "Greenwich Standard Time",
        "Africa/Addis_Ababa": "E. Africa Standard Time",
        "Africa/Algiers": "W. Central Africa Standard Time",
        "Africa/Asmara": "E. Africa Standard Time",
        "Africa/Asmera": "E. Africa Standard Time",
        "Africa/Bamako": "Greenwich Standard Time",
        "Africa/Bangui": "W. Central Africa Standard Time",
        "Africa/Banjul": "Greenwich Standard Time",
        "Africa/Bissau": "Greenwich Standard Time",
        "Africa/Blantyre": "South Africa Standard Time",
        "Africa/Brazzaville": "W. Central Africa Standard Time",
        "Africa/Bujumbura": "South Africa Standard Time",
        "Africa/Cairo": "Egypt Standard Time",
        "Africa/Casablanca": "Morocco Standard Time",
        "Africa/Ceuta": "Romance Standard Time",
        "Africa/Conakry": "Greenwich Standard Time",
        "Africa/Dakar": "Greenwich Standard Time",
        "Africa/Dar_es_Salaam": "E. Africa Standard Time",
        "Africa/Djibouti": "E. Africa Standard Time",
        "Africa/Douala": "W. Central Africa Standard Time",
        "Africa/El_Aaiun": "Morocco Standard Time",
        "Africa/Freetown": "Greenwich Standard Time",
        "Africa/Gaborone": "South Africa Standard Time",
        "Africa/Harare": "South Africa Standard Time",
        "Africa/Johannesburg": "South Africa Standard Time",
        "Africa/Juba": "South Sudan Standard Time",
        "Africa/Kampala": "E. Africa Standard Time",
        "Africa/Khartoum": "Sudan Standard Time",
        "Africa/Kigali": "South Africa Standard Time",
        "Africa/Kinshasa": "W. Central Africa Standard Time",
        "Africa/Lagos": "W. Central Africa Standard Time",
        "Africa/Libreville": "W. Central Africa Standard Time",
        "Africa/Lome": "Greenwich Standard Time",
        "Africa/Luanda": "W. Central Africa Standard Time",
        "Africa/Lubumbashi": "South Africa Standard Time",
        "Africa/Lusaka": "South Africa Standard Time",
        "Africa/Malabo": "W. Central Africa Standard Time",
        "Africa/Maputo": "South Africa Standard Time",
        "Africa/Maseru": "South Africa Standard Time",
        "Africa/Mbabane": "South Africa Standard Time",
        "Africa/Mogadishu": "E. Africa Standard Time",
        "Africa/Monrovia": "Greenwich Standard Time",
        "Africa/Nairobi": "E. Africa Standard Time",
        "Africa/Ndjamena": "W. Central Africa Standard Time",
        "Africa/Niamey": "W. Central Africa Standard Time",
        "Africa/Nouakchott": "Greenwich Standard Time",
        "Africa/Ouagadougou": "Greenwich Standard Time",
        "Africa/Porto-Novo": "W. Central Africa Standard Time",
        "Africa/Sao_Tome": "Sao Tome Standard Time",
        "Africa/Timbuktu": "Greenwich Standard Time",
        "Africa/Tripoli": "Libya Standard Time",
        "Africa/Tunis": "W. Central Africa Standard Time",
        "Africa/Windhoek": "Namibia Standard Time",
        "America/Adak": "Aleutian Standard Time",
        "America/Anchorage": "Alaskan Standard Time",
        "America/Anguilla": "SA Western Standard Time",
        "America/Antigua": "SA Western Standard Time",
        "America/Araguaina": "Tocantins Standard Time",
        "America/Argentina/Buenos_Aires": "Argentina Standard Time",
        "America/Argentina/Catamarca": "Argentina Standard Time",
        "America/Argentina/ComodRivadavia": "Argentina Standard Time",
        "America/Argentina/Cordoba": "Argentina Standard Time",
        "America/Argentina/Jujuy": "Argentina Standard Time",
        "America/Argentina/La_Rioja": "Argentina Standard Time",
        "America/Argentina/Mendoza": "Argentina Standard Time",
        "America/Argentina/Rio_Gallegos": "Argentina Standard Time",
        "America/Argentina/Salta": "Argentina Standard Time",
        "America/Argentina/San_Juan": "Argentina Standard Time",
        "America/Argentina/San_Luis": "Argentina Standard Time",
        "America/Argentina/Tucuman": "Argentina Standard Time",
        "America/Argentina/Ushuaia": "Argentina Standard Time",
        "America/Aruba": "SA Western Standard Time",
        "America/Asuncion": "Paraguay Standard Time",
        "America/Atikokan": "SA Pacific Standard Time",
        "America/Atka": "Aleutian Standard Time",
        "America/Bahia": "Bahia Standard Time",
        "America/Bahia_Banderas": "Central Standard Time (Mexico)",
        "America/Barbados": "SA Western Standard Time",
        "America/Belem": "SA Eastern Standard Time",
        "America/Belize": "Central America Standard Time",
        "America/Blanc-Sablon": "SA Western Standard Time",
        "America/Boa_Vista": "SA Western Standard Time",
        "America/Bogota": "SA Pacific Standard Time",
        "America/Boise": "Mountain Standard Time",
        "America/Buenos_Aires": "Argentina Standard Time",
        "America/Cambridge_Bay": "Mountain Standard Time",
        "America/Campo_Grande": "Central Brazilian Standard Time",
        "America/Cancun": "Eastern Standard Time (Mexico)",
        "America/Caracas": "Venezuela Standard Time",
        "America/Catamarca": "Argentina Standard Time",
        "America/Cayenne": "SA Eastern Standard Time",
        "America/Cayman": "SA Pacific Standard Time",
        "America/Chicago": "Central Standard Time",
        "America/Chihuahua": "Mountain Standard Time (Mexico)",
        "America/Coral_Harbour": "SA Pacific Standard Time",
        "America/Cordoba": "Argentina Standard Time",
        "America/Costa_Rica": "Central America Standard Time",
        "America/Creston": "US Mountain Standard Time",
        "America/Cuiaba": "Central Brazilian Standard Time",
        "America/Curacao": "SA Western Standard Time",
        "America/Danmarkshavn": "Greenwich Standard Time",
        "America/Dawson": "Yukon Standard Time",
        "America/Dawson_Creek": "US Mountain Standard Time",
        "America/Denver": "Mountain Standard Time",
        "America/Detroit": "Eastern Standard Time",
        "America/Dominica": "SA Western Standard Time",
        "America/Edmonton": "Mountain Standard Time",
        "America/Eirunepe": "SA Pacific Standard Time",
        "America/El_Salvador": "Central America Standard Time",
        "America/Ensenada": "Pacific Standard Time (Mexico)",
        "America/Fort_Nelson": "US Mountain Standard Time",
        "America/Fort_Wayne": "US Eastern Standard Time",
        "America/Fortaleza": "SA Eastern Standard Time",
        "America/Glace_Bay": "Atlantic Standard Time",
        "America/Godthab": "Greenland Standard Time",
        "America/Goose_Bay": "Atlantic Standard Time",
        "America/Grand_Turk": "Turks And Caicos Standard Time",
        "America/Grenada": "SA Western Standard Time",
        "America/Guadeloupe": "SA Western Standard Time",
        "America/Guatemala": "Central America Standard Time",
        "America/Guayaquil": "SA Pacific Standard Time",
        "America/Guyana": "SA Western Standard Time",
        "America/Halifax": "Atlantic Standard Time",
        "America/Havana": "Cuba Standard Time",
        "America/Hermosillo": "US Mountain Standard Time",
        "America/Indiana/Indianapolis": "US Eastern Standard Time",
        "America/Indiana/Knox": "Central Standard Time",
        "America/Indiana/Marengo": "US Eastern Standard Time",
        "America/Indiana/Petersburg": "Eastern Standard Time",
        "America/Indiana/Tell_City": "Central Standard Time",
        "America/Indiana/Vevay": "US Eastern Standard Time",
        "America/Indiana/Vincennes": "Eastern Standard Time",
        "America/Indiana/Winamac": "Eastern Standard Time",
        "America/Indianapolis": "US Eastern Standard Time",
        "America/Inuvik": "Mountain Standard Time",
        "America/Iqaluit": "Eastern Standard Time",
        "America/Jamaica": "SA Pacific Standard Time",
        "America/Jujuy": "Argentina Standard Time",
        "America/Juneau": "Alaskan Standard Time",
        "America/Kentucky/Louisville": "Eastern Standard Time",
        "America/Kentucky/Monticello": "Eastern Standard Time",
        "America/Knox_IN": "Central Standard Time",
        "America/Kralendijk": "SA Western Standard Time",
        "America/La_Paz": "SA Western Standard Time",
        "America/Lima": "SA Pacific Standard Time",
        "America/Los_Angeles": "Pacific Standard Time",
        "America/Louisville": "Eastern Standard Time",
        "America/Lower_Princes": "SA Western Standard Time",
        "America/Maceio": "SA Eastern Standard Time",
        "America/Managua": "Central America Standard Time",
        "America/Manaus": "SA Western Standard Time",
        "America/Marigot": "SA Western Standard Time",
        "America/Martinique": "SA Western Standard Time",
        "America/Matamoros": "Central Standard Time",
        "America/Mazatlan": "Mountain Standard Time (Mexico)",
        "America/Mendoza": "Argentina Standard Time",
        "America/Menominee": "Central Standard Time",
        "America/Merida": "Central Standard Time (Mexico)",
        "America/Metlakatla": "Alaskan Standard Time",
        "America/Mexico_City": "Central Standard Time (Mexico)",
        "America/Miquelon": "Saint Pierre Standard Time",
        "America/Moncton": "Atlantic Standard Time",
        "America/Monterrey": "Central Standard Time (Mexico)",
        "America/Montevideo": "Montevideo Standard Time",
        "America/Montreal": "Eastern Standard Time",
        "America/Montserrat": "SA Western Standard Time",
        "America/Nassau": "Eastern Standard Time",
        "America/New_York": "Eastern Standard Time",
        "America/Nipigon": "Eastern Standard Time",
        "America/Nome": "Alaskan Standard Time",
        "America/Noronha": "UTC-02",
        "America/North_Dakota/Beulah": "Central Standard Time",
        "America/North_Dakota/Center": "Central Standard Time",
        "America/North_Dakota/New_Salem": "Central Standard Time",
        "America/Nuuk": "Greenland Standard Time",
        "America/Ojinaga": "Mountain Standard Time",
        "America/Panama": "SA Pacific Standard Time",
        "America/Pangnirtung": "Eastern Standard Time",
        "America/Paramaribo": "SA Eastern Standard Time",
        "America/Phoenix": "US Mountain Standard Time",
        "America/Port-au-Prince": "Haiti Standard Time",
        "America/Port_of_Spain": "SA Western Standard Time",
        "America/Porto_Acre": "SA Pacific Standard Time",
        "America/Porto_Velho": "SA Western Standard Time",
        "America/Puerto_Rico": "SA Western Standard Time",
        "America/Punta_Arenas": "Magallanes Standard Time",
        "America/Rainy_River": "Central Standard Time",
        "America/Rankin_Inlet": "Central Standard Time",
        "America/Recife": "SA Eastern Standard Time",
        "America/Regina": "Canada Central Standard Time",
        "America/Resolute": "Central Standard Time",
        "America/Rio_Branco": "SA Pacific Standard Time",
        "America/Rosario": "Argentina Standard Time",
        "America/Santa_Isabel": "Pacific Standard Time (Mexico)",
        "America/Santarem": "SA Eastern Standard Time",
        "America/Santiago": "Pacific SA Standard Time",
        "America/Santo_Domingo": "SA Western Standard Time",
        "America/Sao_Paulo": "E. South America Standard Time",
        "America/Scoresbysund": "Azores Standard Time",
        "America/Shiprock": "Mountain Standard Time",
        "America/Sitka": "Alaskan Standard Time",
        "America/St_Barthelemy": "SA Western Standard Time",
        "America/St_Johns": "Newfoundland Standard Time",
        "America/St_Kitts": "SA Western Standard Time",
        "America/St_Lucia": "SA Western Standard Time",
        "America/St_Thomas": "SA Western Standard Time",
        "America/St_Vincent": "SA Western Standard Time",
        "America/Swift_Current": "Canada Central Standard Time",
        "America/Tegucigalpa": "Central America Standard Time",
        "America/Thule": "Atlantic Standard Time",
        "America/Thunder_Bay": "Eastern Standard Time",
        "America/Tijuana": "Pacific Standard Time (Mexico)",
        "America/Toronto": "Eastern Standard Time",
        "America/Tortola": "SA Western Standard Time",
        "America/Vancouver": "Pacific Standard Time",
        "America/Virgin": "SA Western Standard Time",
        "America/Whitehorse": "Yukon Standard Time",
        "America/Winnipeg": "Central Standard Time",
        "America/Yakutat": "Alaskan Standard Time",
        "America/Yellowknife": "Mountain Standard Time",
        "Antarctica/Casey": "Central Pacific Standard Time",
        "Antarctica/Davis": "SE Asia Standard Time",
        "Antarctica/DumontDUrville": "West Pacific Standard Time",
        "Antarctica/Macquarie": "Tasmania Standard Time",
        "Antarctica/Mawson": "West Asia Standard Time",
        "Antarctica/McMurdo": "New Zealand Standard Time",
        "Antarctica/Palmer": "SA Eastern Standard Time",
        "Antarctica/Rothera": "SA Eastern Standard Time",
        "Antarctica/South_Pole": "New Zealand Standard Time",
        "Antarctica/Syowa": "E. Africa Standard Time",
        "Antarctica/Vostok": "Central Asia Standard Time",
        "Arctic/Longyearbyen": "W. Europe Standard Time",
        "Asia/Aden": "Arab Standard Time",
        "Asia/Almaty": "Central Asia Standard Time",
        "Asia/Amman": "Jordan Standard Time",
        "Asia/Anadyr": "Russia Time Zone 11",
        "Asia/Aqtau": "West Asia Standard Time",
        "Asia/Aqtobe": "West Asia Standard Time",
        "Asia/Ashgabat": "West Asia Standard Time",
        "Asia/Ashkhabad": "West Asia Standard Time",
        "Asia/Atyrau": "West Asia Standard Time",
        "Asia/Baghdad": "Arabic Standard Time",
        "Asia/Bahrain": "Arab Standard Time",
        "Asia/Baku": "Azerbaijan Standard Time",
        "Asia/Bangkok": "SE Asia Standard Time",
        "Asia/Barnaul": "Altai Standard Time",
        "Asia/Beirut": "Middle East Standard Time",
        "Asia/Bishkek": "Central Asia Standard Time",
        "Asia/Brunei": "Singapore Standard Time",
        "Asia/Calcutta": "India Standard Time",
        "Asia/Chita": "Transbaikal Standard Time",
        "Asia/Choibalsan": "Ulaanbaatar Standard Time",
        "Asia/Chongqing": "China Standard Time",
        "Asia/Chungking": "China Standard Time",
        "Asia/Colombo": "Sri Lanka Standard Time",
        "Asia/Dacca": "Bangladesh Standard Time",
        "Asia/Damascus": "Syria Standard Time",
        "Asia/Dhaka": "Bangladesh Standard Time",
        "Asia/Dili": "Tokyo Standard Time",
        "Asia/Dubai": "Arabian Standard Time",
        "Asia/Dushanbe": "West Asia Standard Time",
        "Asia/Famagusta": "GTB Standard Time",
        "Asia/Gaza": "West Bank Standard Time",
        "Asia/Harbin": "China Standard Time",
        "Asia/Hebron": "West Bank Standard Time",
        "Asia/Ho_Chi_Minh": "SE Asia Standard Time",
        "Asia/Hong_Kong": "China Standard Time",
        "Asia/Hovd": "W. Mongolia Standard Time",
        "Asia/Irkutsk": "North Asia East Standard Time",
        "Asia/Istanbul": "Turkey Standard Time",
        "Asia/Jakarta": "SE Asia Standard Time",
        "Asia/Jayapura": "Tokyo Standard Time",
        "Asia/Jerusalem": "Israel Standard Time",
        "Asia/Kabul": "Afghanistan Standard Time",
        "Asia/Kamchatka": "Russia Time Zone 11",
        "Asia/Karachi": "Pakistan Standard Time",
        "Asia/Kashgar": "Central Asia Standard Time",
        "Asia/Kathmandu": "Nepal Standard Time",
        "Asia/Katmandu": "Nepal Standard Time",
        "Asia/Khandyga": "Yakutsk Standard Time",
        "Asia/Kolkata": "India Standard Time",
        "Asia/Krasnoyarsk": "North Asia Standard Time",
        "Asia/Kuala_Lumpur": "Singapore Standard Time",
        "Asia/Kuching": "Singapore Standard Time",
        "Asia/Kuwait": "Arab Standard Time",
        "Asia/Macao": "China Standard Time",
        "Asia/Macau": "China Standard Time",
        "Asia/Magadan": "Magadan Standard Time",
        "Asia/Makassar": "Singapore Standard Time",
        "Asia/Manila": "Singapore Standard Time",
        "Asia/Muscat": "Arabian Standard Time",
        "Asia/Nicosia": "GTB Standard Time",
        "Asia/Novokuznetsk": "North Asia Standard Time",
        "Asia/Novosibirsk": "N. Central Asia Standard Time",
        "Asia/Omsk": "Omsk Standard Time",
        "Asia/Oral": "West Asia Standard Time",
        "Asia/Phnom_Penh": "SE Asia Standard Time",
        "Asia/Pontianak": "SE Asia Standard Time",
        "Asia/Pyongyang": "North Korea Standard Time",
        "Asia/Qatar": "Arab Standard Time",
        "Asia/Qostanay": "Central Asia Standard Time",
        "Asia/Qyzylorda": "Qyzylorda Standard Time",
        "Asia/Rangoon": "Myanmar Standard Time",
        "Asia/Riyadh": "Arab Standard Time",
        "Asia/Saigon": "SE Asia Standard Time",
        "Asia/Sakhalin": "Sakhalin Standard Time",
        "Asia/Samarkand": "West Asia Standard Time",
        "Asia/Seoul": "Korea Standard Time",
        "Asia/Shanghai": "China Standard Time",
        "Asia/Singapore": "Singapore Standard Time",
        "Asia/Srednekolymsk": "Russia Time Zone 10",
        "Asia/Taipei": "Taipei Standard Time",
        "Asia/Tashkent": "West Asia Standard Time",
        "Asia/Tbilisi": "Georgian Standard Time",
        "Asia/Tehran": "Iran Standard Time",
        "Asia/Tel_Aviv": "Israel Standard Time",
        "Asia/Thimbu": "Bangladesh Standard Time",
        "Asia/Thimphu": "Bangladesh Standard Time",
        "Asia/Tokyo": "Tokyo Standard Time",
        "Asia/Tomsk": "Tomsk Standard Time",
        "Asia/Ujung_Pandang": "Singapore Standard Time",
        "Asia/Ulaanbaatar": "Ulaanbaatar Standard Time",
        "Asia/Ulan_Bator": "Ulaanbaatar Standard Time",
        "Asia/Urumqi": "Central Asia Standard Time",
        "Asia/Ust-Nera": "Vladivostok Standard Time",
        "Asia/Vientiane": "SE Asia Standard Time",
        "Asia/Vladivostok": "Vladivostok Standard Time",
        "Asia/Yakutsk": "Yakutsk Standard Time",
        "Asia/Yangon": "Myanmar Standard Time",
        "Asia/Yekaterinburg": "Ekaterinburg Standard Time",
        "Asia/Yerevan": "Caucasus Standard Time",
        "Atlantic/Azores": "Azores Standard Time",
        "Atlantic/Bermuda": "Atlantic Standard Time",
        "Atlantic/Canary": "GMT Standard Time",
        "Atlantic/Cape_Verde": "Cape Verde Standard Time",
        "Atlantic/Faeroe": "GMT Standard Time",
        "Atlantic/Faroe": "GMT Standard Time",
        "Atlantic/Jan_Mayen": "W. Europe Standard Time",
        "Atlantic/Madeira": "GMT Standard Time",
        "Atlantic/Reykjavik": "Greenwich Standard Time",
        "Atlantic/South_Georgia": "UTC-02",
        "Atlantic/St_Helena": "Greenwich Standard Time",
        "Atlantic/Stanley": "SA Eastern Standard Time",
        "Australia/ACT": "AUS Eastern Standard Time",
        "Australia/Adelaide": "Cen. Australia Standard Time",
        "Australia/Brisbane": "E. Australia Standard Time",
        "Australia/Broken_Hill": "Cen. Australia Standard Time",
        "Australia/Canberra": "AUS Eastern Standard Time",
        "Australia/Currie": "Tasmania Standard Time",
        "Australia/Darwin": "AUS Central Standard Time",
        "Australia/Eucla": "Aus Central W. Standard Time",
        "Australia/Hobart": "Tasmania Standard Time",
        "Australia/LHI": "Lord Howe Standard Time",
        "Australia/Lindeman": "E. Australia Standard Time",
        "Australia/Lord_Howe": "Lord Howe Standard Time",
        "Australia/Melbourne": "AUS Eastern Standard Time",
        "Australia/North": "AUS Central Standard Time",
        "Australia/NSW": "AUS Eastern Standard Time",
        "Australia/Perth": "W. Australia Standard Time",
        "Australia/Queensland": "E. Australia Standard Time",
        "Australia/South": "Cen. Australia Standard Time",
        "Australia/Sydney": "AUS Eastern Standard Time",
        "Australia/Tasmania": "Tasmania Standard Time",
        "Australia/Victoria": "AUS Eastern Standard Time",
        "Australia/West": "W. Australia Standard Time",
        "Australia/Yancowinna": "Cen. Australia Standard Time",
        "Brazil/Acre": "SA Pacific Standard Time",
        "Brazil/DeNoronha": "UTC-02",
        "Brazil/East": "E. South America Standard Time",
        "Brazil/West": "SA Western Standard Time",
        "Canada/Atlantic": "Atlantic Standard Time",
        "Canada/Central": "Central Standard Time",
        "Canada/Eastern": "Eastern Standard Time",
        "Canada/Mountain": "Mountain Standard Time",
        "Canada/Newfoundland": "Newfoundland Standard Time",
        "Canada/Pacific": "Pacific Standard Time",
        "Canada/Saskatchewan": "Canada Central Standard Time",
        "Canada/Yukon": "Yukon Standard Time",
        "Chile/Continental": "Pacific SA Standard Time",
        "Chile/EasterIsland": "Easter Island Standard Time",
        CST6CDT: "Central Standard Time",
        Cuba: "Cuba Standard Time",
        Egypt: "Egypt Standard Time",
        Eire: "GMT Standard Time",
        EST5EDT: "Eastern Standard Time",
        "Etc/GMT": "UTC",
        "Etc/GMT+0": "UTC",
        "Etc/GMT+1": "Cape Verde Standard Time",
        "Etc/GMT+10": "Hawaiian Standard Time",
        "Etc/GMT+11": "UTC-11",
        "Etc/GMT+12": "Dateline Standard Time",
        "Etc/GMT+2": "UTC-02",
        "Etc/GMT+3": "SA Eastern Standard Time",
        "Etc/GMT+4": "SA Western Standard Time",
        "Etc/GMT+5": "SA Pacific Standard Time",
        "Etc/GMT+6": "Central America Standard Time",
        "Etc/GMT+7": "US Mountain Standard Time",
        "Etc/GMT+8": "UTC-08",
        "Etc/GMT+9": "UTC-09",
        "Etc/GMT-0": "UTC",
        "Etc/GMT-1": "W. Central Africa Standard Time",
        "Etc/GMT-10": "West Pacific Standard Time",
        "Etc/GMT-11": "Central Pacific Standard Time",
        "Etc/GMT-12": "UTC+12",
        "Etc/GMT-13": "UTC+13",
        "Etc/GMT-14": "Line Islands Standard Time",
        "Etc/GMT-2": "South Africa Standard Time",
        "Etc/GMT-3": "E. Africa Standard Time",
        "Etc/GMT-4": "Arabian Standard Time",
        "Etc/GMT-5": "West Asia Standard Time",
        "Etc/GMT-6": "Central Asia Standard Time",
        "Etc/GMT-7": "SE Asia Standard Time",
        "Etc/GMT-8": "Singapore Standard Time",
        "Etc/GMT-9": "Tokyo Standard Time",
        "Etc/GMT0": "UTC",
        "Etc/Greenwich": "UTC",
        "Etc/UCT": "UTC",
        "Etc/Universal": "UTC",
        "Etc/UTC": "UTC",
        "Etc/Zulu": "UTC",
        "Europe/Amsterdam": "W. Europe Standard Time",
        "Europe/Andorra": "W. Europe Standard Time",
        "Europe/Astrakhan": "Astrakhan Standard Time",
        "Europe/Athens": "GTB Standard Time",
        "Europe/Belfast": "GMT Standard Time",
        "Europe/Belgrade": "Central Europe Standard Time",
        "Europe/Berlin": "W. Europe Standard Time",
        "Europe/Bratislava": "Central Europe Standard Time",
        "Europe/Brussels": "Romance Standard Time",
        "Europe/Bucharest": "GTB Standard Time",
        "Europe/Budapest": "Central Europe Standard Time",
        "Europe/Busingen": "W. Europe Standard Time",
        "Europe/Chisinau": "E. Europe Standard Time",
        "Europe/Copenhagen": "Romance Standard Time",
        "Europe/Dublin": "GMT Standard Time",
        "Europe/Gibraltar": "W. Europe Standard Time",
        "Europe/Guernsey": "GMT Standard Time",
        "Europe/Helsinki": "FLE Standard Time",
        "Europe/Isle_of_Man": "GMT Standard Time",
        "Europe/Istanbul": "Turkey Standard Time",
        "Europe/Jersey": "GMT Standard Time",
        "Europe/Kaliningrad": "Kaliningrad Standard Time",
        "Europe/Kiev": "FLE Standard Time",
        "Europe/Kirov": "Russian Standard Time",
        "Europe/Kyiv": "FLE Standard Time",
        "Europe/Lisbon": "GMT Standard Time",
        "Europe/Ljubljana": "Central Europe Standard Time",
        "Europe/London": "GMT Standard Time",
        "Europe/Luxembourg": "W. Europe Standard Time",
        "Europe/Madrid": "Romance Standard Time",
        "Europe/Malta": "W. Europe Standard Time",
        "Europe/Mariehamn": "FLE Standard Time",
        "Europe/Minsk": "Belarus Standard Time",
        "Europe/Monaco": "W. Europe Standard Time",
        "Europe/Moscow": "Russian Standard Time",
        "Europe/Nicosia": "GTB Standard Time",
        "Europe/Oslo": "W. Europe Standard Time",
        "Europe/Paris": "Romance Standard Time",
        "Europe/Podgorica": "Central Europe Standard Time",
        "Europe/Prague": "Central Europe Standard Time",
        "Europe/Riga": "FLE Standard Time",
        "Europe/Rome": "W. Europe Standard Time",
        "Europe/Samara": "Russia Time Zone 3",
        "Europe/San_Marino": "W. Europe Standard Time",
        "Europe/Sarajevo": "Central European Standard Time",
        "Europe/Saratov": "Saratov Standard Time",
        "Europe/Simferopol": "Russian Standard Time",
        "Europe/Skopje": "Central European Standard Time",
        "Europe/Sofia": "FLE Standard Time",
        "Europe/Stockholm": "W. Europe Standard Time",
        "Europe/Tallinn": "FLE Standard Time",
        "Europe/Tirane": "Central Europe Standard Time",
        "Europe/Tiraspol": "E. Europe Standard Time",
        "Europe/Ulyanovsk": "Astrakhan Standard Time",
        "Europe/Uzhgorod": "FLE Standard Time",
        "Europe/Vaduz": "W. Europe Standard Time",
        "Europe/Vatican": "W. Europe Standard Time",
        "Europe/Vienna": "W. Europe Standard Time",
        "Europe/Vilnius": "FLE Standard Time",
        "Europe/Volgograd": "Volgograd Standard Time",
        "Europe/Warsaw": "Central European Standard Time",
        "Europe/Zagreb": "Central European Standard Time",
        "Europe/Zaporozhye": "FLE Standard Time",
        "Europe/Zurich": "W. Europe Standard Time",
        GB: "GMT Standard Time",
        "GB-Eire": "GMT Standard Time",
        GMT: "UTC",
        "GMT+0": "UTC",
        "GMT-0": "UTC",
        GMT0: "UTC",
        Greenwich: "UTC",
        Hongkong: "China Standard Time",
        Iceland: "Greenwich Standard Time",
        "Indian/Antananarivo": "E. Africa Standard Time",
        "Indian/Chagos": "Central Asia Standard Time",
        "Indian/Christmas": "SE Asia Standard Time",
        "Indian/Cocos": "Myanmar Standard Time",
        "Indian/Comoro": "E. Africa Standard Time",
        "Indian/Kerguelen": "West Asia Standard Time",
        "Indian/Mahe": "Mauritius Standard Time",
        "Indian/Maldives": "West Asia Standard Time",
        "Indian/Mauritius": "Mauritius Standard Time",
        "Indian/Mayotte": "E. Africa Standard Time",
        "Indian/Reunion": "Mauritius Standard Time",
        Iran: "Iran Standard Time",
        Israel: "Israel Standard Time",
        Jamaica: "SA Pacific Standard Time",
        Japan: "Tokyo Standard Time",
        Kwajalein: "UTC+12",
        Libya: "Libya Standard Time",
        "Mexico/BajaNorte": "Pacific Standard Time (Mexico)",
        "Mexico/BajaSur": "Mountain Standard Time (Mexico)",
        "Mexico/General": "Central Standard Time (Mexico)",
        MST7MDT: "Mountain Standard Time",
        Navajo: "Mountain Standard Time",
        NZ: "New Zealand Standard Time",
        "NZ-CHAT": "Chatham Islands Standard Time",
        "Pacific/Apia": "Samoa Standard Time",
        "Pacific/Auckland": "New Zealand Standard Time",
        "Pacific/Bougainville": "Bougainville Standard Time",
        "Pacific/Chatham": "Chatham Islands Standard Time",
        "Pacific/Chuuk": "West Pacific Standard Time",
        "Pacific/Easter": "Easter Island Standard Time",
        "Pacific/Efate": "Central Pacific Standard Time",
        "Pacific/Enderbury": "UTC+13",
        "Pacific/Fakaofo": "UTC+13",
        "Pacific/Fiji": "Fiji Standard Time",
        "Pacific/Funafuti": "UTC+12",
        "Pacific/Galapagos": "Central America Standard Time",
        "Pacific/Gambier": "UTC-09",
        "Pacific/Guadalcanal": "Central Pacific Standard Time",
        "Pacific/Guam": "West Pacific Standard Time",
        "Pacific/Honolulu": "Hawaiian Standard Time",
        "Pacific/Johnston": "Hawaiian Standard Time",
        "Pacific/Kanton": "UTC+13",
        "Pacific/Kiritimati": "Line Islands Standard Time",
        "Pacific/Kosrae": "Central Pacific Standard Time",
        "Pacific/Kwajalein": "UTC+12",
        "Pacific/Majuro": "UTC+12",
        "Pacific/Marquesas": "Marquesas Standard Time",
        "Pacific/Midway": "UTC-11",
        "Pacific/Nauru": "UTC+12",
        "Pacific/Niue": "UTC-11",
        "Pacific/Norfolk": "Norfolk Standard Time",
        "Pacific/Noumea": "Central Pacific Standard Time",
        "Pacific/Pago_Pago": "UTC-11",
        "Pacific/Palau": "Tokyo Standard Time",
        "Pacific/Pitcairn": "UTC-08",
        "Pacific/Pohnpei": "Central Pacific Standard Time",
        "Pacific/Ponape": "Central Pacific Standard Time",
        "Pacific/Port_Moresby": "West Pacific Standard Time",
        "Pacific/Rarotonga": "Hawaiian Standard Time",
        "Pacific/Saipan": "West Pacific Standard Time",
        "Pacific/Samoa": "UTC-11",
        "Pacific/Tahiti": "Hawaiian Standard Time",
        "Pacific/Tarawa": "UTC+12",
        "Pacific/Tongatapu": "Tonga Standard Time",
        "Pacific/Truk": "West Pacific Standard Time",
        "Pacific/Wake": "UTC+12",
        "Pacific/Wallis": "UTC+12",
        "Pacific/Yap": "West Pacific Standard Time",
        Poland: "Central European Standard Time",
        Portugal: "GMT Standard Time",
        PRC: "China Standard Time",
        PST8PDT: "Pacific Standard Time",
        ROC: "Taipei Standard Time",
        ROK: "Korea Standard Time",
        Singapore: "Singapore Standard Time",
        Turkey: "Turkey Standard Time",
        UCT: "UTC",
        Universal: "UTC",
        "US/Alaska": "Alaskan Standard Time",
        "US/Aleutian": "Aleutian Standard Time",
        "US/Arizona": "US Mountain Standard Time",
        "US/Central": "Central Standard Time",
        "US/East-Indiana": "US Eastern Standard Time",
        "US/Eastern": "Eastern Standard Time",
        "US/Hawaii": "Hawaiian Standard Time",
        "US/Indiana-Starke": "Central Standard Time",
        "US/Michigan": "Eastern Standard Time",
        "US/Mountain": "Mountain Standard Time",
        "US/Pacific": "Pacific Standard Time",
        "US/Samoa": "UTC-11",
        UTC: "UTC",
        "W-SU": "Russian Standard Time",
        Zulu: "UTC"
    };
    t.olson.dst_rules = {
        years: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        zones: [{
            name: "Africa/Cairo",
            rules: [{
                e: 12199572e5,
                s: 12090744e5
            }, {
                e: 1250802e6,
                s: 1240524e6
            }, {
                e: 12858804e5,
                s: 12840696e5
            }, !1, !1, !1, {
                e: 14116788e5,
                s: 1406844e6
            }]
        }, {
            name: "America/Asuncion",
            rules: [{
                e: 12050316e5,
                s: 12243888e5
            }, {
                e: 12364812e5,
                s: 12558384e5
            }, {
                e: 12709548e5,
                s: 12860784e5
            }, {
                e: 13024044e5,
                s: 1317528e6
            }, {
                e: 1333854e6,
                s: 13495824e5
            }, {
                e: 1364094e6,
                s: 1381032e6
            }, {
                e: 13955436e5,
                s: 14124816e5
            }]
        }, {
            name: "America/Campo_Grande",
            rules: [{
                e: 12032172e5,
                s: 12243888e5
            }, {
                e: 12346668e5,
                s: 12558384e5
            }, {
                e: 12667212e5,
                s: 1287288e6
            }, {
                e: 12981708e5,
                s: 13187376e5
            }, {
                e: 13302252e5,
                s: 1350792e6
            }, {
                e: 136107e7,
                s: 13822416e5
            }, {
                e: 13925196e5,
                s: 14136912e5
            }]
        }, {
            name: "America/Goose_Bay",
            rules: [{
                e: 122559486e4,
                s: 120503526e4
            }, {
                e: 125704446e4,
                s: 123648486e4
            }, {
                e: 128909886e4,
                s: 126853926e4
            }, {
                e: 13205556e5,
                s: 129998886e4
            }, {
                e: 13520052e5,
                s: 13314456e5
            }, {
                e: 13834548e5,
                s: 13628952e5
            }, {
                e: 14149044e5,
                s: 13943448e5
            }]
        }, {
            name: "America/Havana",
            rules: [{
                e: 12249972e5,
                s: 12056436e5
            }, {
                e: 12564468e5,
                s: 12364884e5
            }, {
                e: 12885012e5,
                s: 12685428e5
            }, {
                e: 13211604e5,
                s: 13005972e5
            }, {
                e: 13520052e5,
                s: 13332564e5
            }, {
                e: 13834548e5,
                s: 13628916e5
            }, {
                e: 14149044e5,
                s: 13943412e5
            }]
        }, {
            name: "America/Mazatlan",
            rules: [{
                e: 1225008e6,
                s: 12074724e5
            }, {
                e: 12564576e5,
                s: 1238922e6
            }, {
                e: 1288512e6,
                s: 12703716e5
            }, {
                e: 13199616e5,
                s: 13018212e5
            }, {
                e: 13514112e5,
                s: 13332708e5
            }, {
                e: 13828608e5,
                s: 13653252e5
            }, {
                e: 14143104e5,
                s: 13967748e5
            }]
        }, {
            name: "America/Mexico_City",
            rules: [{
                e: 12250044e5,
                s: 12074688e5
            }, {
                e: 1256454e6,
                s: 12389184e5
            }, {
                e: 12885084e5,
                s: 1270368e6
            }, {
                e: 1319958e6,
                s: 13018176e5
            }, {
                e: 13514076e5,
                s: 13332672e5
            }, {
                e: 13828572e5,
                s: 13653216e5
            }, {
                e: 14143068e5,
                s: 13967712e5
            }]
        }, {
            name: "America/Miquelon",
            rules: [{
                e: 12255984e5,
                s: 12050388e5
            }, {
                e: 1257048e6,
                s: 12364884e5
            }, {
                e: 12891024e5,
                s: 12685428e5
            }, {
                e: 1320552e6,
                s: 12999924e5
            }, {
                e: 13520016e5,
                s: 1331442e6
            }, {
                e: 13834512e5,
                s: 13628916e5
            }, {
                e: 14149008e5,
                s: 13943412e5
            }]
        }, {
            name: "America/Santa_Isabel",
            rules: [{
                e: 12250116e5,
                s: 1207476e6
            }, {
                e: 12564612e5,
                s: 12389256e5
            }, {
                e: 12891204e5,
                s: 12685608e5
            }, {
                e: 132057e7,
                s: 13000104e5
            }, {
                e: 13520196e5,
                s: 133146e7
            }, {
                e: 13834692e5,
                s: 13629096e5
            }, {
                e: 14149188e5,
                s: 13943592e5
            }]
        }, {
            name: "America/Santiago",
            rules: [{
                e: 1206846e6,
                s: 1223784e6
            }, {
                e: 1237086e6,
                s: 12552336e5
            }, {
                e: 127035e7,
                s: 12866832e5
            }, {
                e: 13048236e5,
                s: 13138992e5
            }, {
                e: 13356684e5,
                s: 13465584e5
            }, {
                e: 1367118e6,
                s: 13786128e5
            }, {
                e: 13985676e5,
                s: 14100624e5
            }]
        }, {
            name: "America/Sao_Paulo",
            rules: [{
                e: 12032136e5,
                s: 12243852e5
            }, {
                e: 12346632e5,
                s: 12558348e5
            }, {
                e: 12667176e5,
                s: 12872844e5
            }, {
                e: 12981672e5,
                s: 1318734e6
            }, {
                e: 13302216e5,
                s: 13507884e5
            }, {
                e: 13610664e5,
                s: 1382238e6
            }, {
                e: 1392516e6,
                s: 14136876e5
            }]
        }, {
            name: "Asia/Amman",
            rules: [{
                e: 1225404e6,
                s: 12066552e5
            }, {
                e: 12568536e5,
                s: 12381048e5
            }, {
                e: 12883032e5,
                s: 12695544e5
            }, {
                e: 13197528e5,
                s: 13016088e5
            }, !1, !1, {
                e: 14147064e5,
                s: 13959576e5
            }]
        }, {
            name: "Asia/Damascus",
            rules: [{
                e: 12254868e5,
                s: 120726e7
            }, {
                e: 125685e7,
                s: 12381048e5
            }, {
                e: 12882996e5,
                s: 12701592e5
            }, {
                e: 13197492e5,
                s: 13016088e5
            }, {
                e: 13511988e5,
                s: 13330584e5
            }, {
                e: 13826484e5,
                s: 1364508e6
            }, {
                e: 14147028e5,
                s: 13959576e5
            }]
        }, {
            name: "Asia/Dubai",
            rules: [!1, !1, !1, !1, !1, !1, !1]
        }, {
            name: "Asia/Gaza",
            rules: [{
                e: 12199572e5,
                s: 12066552e5
            }, {
                e: 12520152e5,
                s: 12381048e5
            }, {
                e: 1281474e6,
                s: 126964086e4
            }, {
                e: 1312146e6,
                s: 130160886e4
            }, {
                e: 13481784e5,
                s: 13330584e5
            }, {
                e: 13802292e5,
                s: 1364508e6
            }, {
                e: 1414098e6,
                s: 13959576e5
            }]
        }, {
            name: "Asia/Irkutsk",
            rules: [{
                e: 12249576e5,
                s: 12068136e5
            }, {
                e: 12564072e5,
                s: 12382632e5
            }, {
                e: 12884616e5,
                s: 12697128e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Jerusalem",
            rules: [{
                e: 12231612e5,
                s: 12066624e5
            }, {
                e: 1254006e6,
                s: 1238112e6
            }, {
                e: 1284246e6,
                s: 12695616e5
            }, {
                e: 131751e7,
                s: 1301616e6
            }, {
                e: 13483548e5,
                s: 13330656e5
            }, {
                e: 13828284e5,
                s: 13645152e5
            }, {
                e: 1414278e6,
                s: 13959648e5
            }]
        }, {
            name: "Asia/Kamchatka",
            rules: [{
                e: 12249432e5,
                s: 12067992e5
            }, {
                e: 12563928e5,
                s: 12382488e5
            }, {
                e: 12884508e5,
                s: 12696984e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Krasnoyarsk",
            rules: [{
                e: 12249612e5,
                s: 12068172e5
            }, {
                e: 12564108e5,
                s: 12382668e5
            }, {
                e: 12884652e5,
                s: 12697164e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Omsk",
            rules: [{
                e: 12249648e5,
                s: 12068208e5
            }, {
                e: 12564144e5,
                s: 12382704e5
            }, {
                e: 12884688e5,
                s: 126972e7
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Vladivostok",
            rules: [{
                e: 12249504e5,
                s: 12068064e5
            }, {
                e: 12564e8,
                s: 1238256e6
            }, {
                e: 12884544e5,
                s: 12697056e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Yakutsk",
            rules: [{
                e: 1224954e6,
                s: 120681e7
            }, {
                e: 12564036e5,
                s: 12382596e5
            }, {
                e: 1288458e6,
                s: 12697092e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Yekaterinburg",
            rules: [{
                e: 12249684e5,
                s: 12068244e5
            }, {
                e: 1256418e6,
                s: 1238274e6
            }, {
                e: 12884724e5,
                s: 12697236e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Yerevan",
            rules: [{
                e: 1224972e6,
                s: 1206828e6
            }, {
                e: 12564216e5,
                s: 12382776e5
            }, {
                e: 1288476e6,
                s: 12697272e5
            }, {
                e: 13199256e5,
                s: 13011768e5
            }, !1, !1, !1]
        }, {
            name: "Australia/Lord_Howe",
            rules: [{
                e: 12074076e5,
                s: 12231342e5
            }, {
                e: 12388572e5,
                s: 12545838e5
            }, {
                e: 12703068e5,
                s: 12860334e5
            }, {
                e: 13017564e5,
                s: 1317483e6
            }, {
                e: 1333206e6,
                s: 13495374e5
            }, {
                e: 13652604e5,
                s: 1380987e6
            }, {
                e: 139671e7,
                s: 14124366e5
            }]
        }, {
            name: "Australia/Perth",
            rules: [{
                e: 12068136e5,
                s: 12249576e5
            }, !1, !1, !1, !1, !1, !1]
        }, {
            name: "Europe/Helsinki",
            rules: [{
                e: 12249828e5,
                s: 12068388e5
            }, {
                e: 12564324e5,
                s: 12382884e5
            }, {
                e: 12884868e5,
                s: 1269738e6
            }, {
                e: 13199364e5,
                s: 13011876e5
            }, {
                e: 1351386e6,
                s: 13326372e5
            }, {
                e: 13828356e5,
                s: 13646916e5
            }, {
                e: 14142852e5,
                s: 13961412e5
            }]
        }, {
            name: "Europe/Minsk",
            rules: [{
                e: 12249792e5,
                s: 12068352e5
            }, {
                e: 12564288e5,
                s: 12382848e5
            }, {
                e: 12884832e5,
                s: 12697344e5
            }, !1, !1, !1, !1]
        }, {
            name: "Europe/Moscow",
            rules: [{
                e: 12249756e5,
                s: 12068316e5
            }, {
                e: 12564252e5,
                s: 12382812e5
            }, {
                e: 12884796e5,
                s: 12697308e5
            }, !1, !1, !1, !1]
        }, {
            name: "Pacific/Apia",
            rules: [!1, !1, !1, {
                e: 13017528e5,
                s: 13168728e5
            }, {
                e: 13332024e5,
                s: 13489272e5
            }, {
                e: 13652568e5,
                s: 13803768e5
            }, {
                e: 13967064e5,
                s: 14118264e5
            }]
        }, {
            name: "Pacific/Fiji",
            rules: [!1, !1, {
                e: 12696984e5,
                s: 12878424e5
            }, {
                e: 13271544e5,
                s: 1319292e6
            }, {
                e: 1358604e6,
                s: 13507416e5
            }, {
                e: 139005e7,
                s: 1382796e6
            }, {
                e: 14215032e5,
                s: 14148504e5
            }]
        }, {
            name: "Europe/London",
            rules: [{
                e: 12249828e5,
                s: 12068388e5
            }, {
                e: 12564324e5,
                s: 12382884e5
            }, {
                e: 12884868e5,
                s: 1269738e6
            }, {
                e: 13199364e5,
                s: 13011876e5
            }, {
                e: 1351386e6,
                s: 13326372e5
            }, {
                e: 13828356e5,
                s: 13646916e5
            }, {
                e: 14142852e5,
                s: 13961412e5
            }]
        }, {
            name: "Africa/Windhoek",
            rules: [{
                e: 12207492e5,
                s: 120744e7
            }, {
                e: 12521988e5,
                s: 12388896e5
            }, {
                e: 12836484e5,
                s: 12703392e5
            }, {
                e: 1315098e6,
                s: 13017888e5
            }, {
                e: 13465476e5,
                s: 13332384e5
            }, {
                e: 13779972e5,
                s: 13652928e5
            }, {
                e: 14100516e5,
                s: 13967424e5
            }]
        }]
    };
    typeof module != "undefined" && typeof module.exports != "undefined" ? module.exports = t : typeof define != "undefined" && define !== null && define.amd != null ? define([], function() {
        return t
    }) : typeof n == "undefined" ? window.jstz = t : n.jstz = t
}
)();
window.register && window.register("j/timezone");
window.registerLoading && registerLoading("static"),
function(n, t) {
    function c(n) {
        return n && Object.prototype.toString.call(n) === "[object Array]"
    }
    var i = t.Make || {}, f = t.Encode || {}, e = t.Decode || {}, r = t.Format || {}, o = t.Compute || {}, u = t.Get || {}, a, v, l;
    t.performance || (t.performance = {});
    t.performance.now || (t.performance.now = t.performance.webkitNow || t.performance.mozNow || t.performance.msNow || t.performance.oNow || function() {
        return +new Date
    }
    );
    Function.prototype.bind || (Function.prototype.bind = function(n) {
        if (typeof this != "function")
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var r = Array.prototype.slice.call(arguments, 1)
          , u = this
          , t = function() {}
          , i = function() {
            return u.apply(this instanceof t ? this : n, r.concat(Array.prototype.slice.call(arguments)))
        };
        return this.prototype && (t.prototype = this.prototype),
        i.prototype = new t,
        i
    }
    ),
    function() {
        function n(n) {
            this.element = n
        }
        var t = function(n) {
            return new RegExp("(^| )" + n + "( |$)")
        }
          , i = function(n, t, i) {
            for (var r = 0; r < n.length; r++)
                t.call(i, n[r])
        };
        n.prototype = {
            add: function() {
                i(arguments, function(n) {
                    this.contains(n) || (this.element.className += " " + n)
                }, this)
            },
            remove: function() {
                i(arguments, function(n) {
                    this.element.className = this.element.className.replace(t(n), "")
                }, this)
            },
            toggle: function(n) {
                return this.contains(n) ? (this.remove(n),
                !1) : (this.add(n),
                !0)
            },
            contains: function(n) {
                return t(n).test(this.element.className)
            },
            replace: function(n, t) {
                this.remove(n);
                this.add(t)
            }
        };
        "classList"in Element.prototype || Object.defineProperty(Element.prototype, "classList", {
            get: function() {
                return new n(this)
            }
        });
        window.DOMTokenList && !DOMTokenList.prototype.replace && (DOMTokenList.prototype.replace = n.prototype.replace)
    }();
    i.Bool = function(n) {
        if (n) {
            if (typeof n == "boolean")
                return n;
            switch (("" + n).toUpperCase()) {
            case "1":
            case "YES":
            case "ON":
            case "TRUE":
            case "SUCCESS":
                return !0;
            default:
                return !1
            }
        } else
            return !1
    }
    ;
    i.Int = function(n) {
        if (n) {
            if (typeof n == "number")
                return Math.round(n);
            if (typeof n == "string") {
                var t = parseInt(n.replace(/[^\d\-\.]/g, ""), 10);
                return isNaN(t) ? 0 : Math.round(t)
            }
            return typeof n == "boolean" && n ? 1 : 0
        }
        return 0
    }
    ;
    i.Float = function(n) {
        var t;
        return n ? typeof n == "number" ? n : typeof n == "string" ? /e\-/i.test(n) && (t = parseFloat(n),
        !isNaN(t)) ? null : (t = parseFloat(n.replace(/[^\d\-\.]/g, ""), 10),
        isNaN(t) ? 0 : t / (/%/.test(n) ? 100 : 1) * (/\(.+\)/.test(n) ? -1 : 1)) : 0 : 0
    }
    ;
    i.Date = i.DateTime = function(n) {
        var u, i, f, e, t, r;
        return n ? n.constructor === Date ? n : typeof n == "string" ? Date.prototype.parse && (u = (new Date).parse(n)) ? u : typeof moment == "undefined" ? (/^\d{4}\-\d{2}\-\d{2}T\d\d\:\d\d(?::\d\d(?:\.\d+)?)?$/.test(n) ? (i = (new Date).getTimezoneOffset() / 60,
        f = i < 0 ? "+" : "-",
        e = f + (1e4 + Math.abs(i * 100)).toString().substring(1, 5),
        t = Date.parse(n + e)) : t = Date.parse(n),
        isNaN(t) ? null : new Date(t)) : (r = moment(n),
        r.isValid() ? r.toDate() : null) : null : null
    }
    ;
    i.Array = function(n) {
        return n ? c(n) ? n : String(n || "").split(",") : []
    }
    ;
    i.IntArray = function(t, r) {
        var u, e, o, h, f, s;
        if (t) {
            if (r && t.constructor === Object) {
                e = {};
                o = [];
                for (h in t)
                    t.hasOwnProperty(h) && (u = i.Int(h),
                    u && !e[u] && (o.push(u),
                    e[u] = !0));
                return o
            }
            if (!c(t)) {
                if (t && t.length > 2 && t[0] === "[" && t[t.length - 1] === "]" && (t = n.trim(t.substring(1, t.length - 1)),
                !t))
                    return [];
                t = ("" + t).split(",")
            }
        } else
            return [];
        if (r) {
            for (e = {},
            o = [],
            f = 0,
            s = t.length; f < s; f++)
                u = i.Int(t[f]),
                u && !e[u] && (o.push(u),
                e[u] = !0);
            return o
        }
        for (f = 0,
        s = t.length; f < s; f++)
            t[f] = i.Int(t[f]);
        return t
    }
    ;
    i.Matching = function(n, t) {
        if (t === undefined)
            return n || undefined;
        if (t === null)
            return n || null;
        switch (typeof t) {
        case "boolean":
            return i.Bool(n);
        case "number":
            return i.Float(n);
        case "string":
            return "" + n
        }
        return t.constructor === Date ? i.Date(n) : n
    }
    ;
    Math.round10 = function(n, t) {
        return typeof t == "undefined" || +t == 0 ? Math.round(n) : (n = +n,
        t = -t,
        isNaN(n) || !(typeof t == "number" && t % 1 == 0)) ? NaN : (n = n.toString().split("e"),
        n = Math.round(+(n[0] + "e" + (n[1] ? +n[1] - t : -t))),
        n = n.toString().split("e"),
        +(n[0] + "e" + (n[1] ? +n[1] + t : t)))
    }
    ;
    Math.limit = function(n, t, i, r) {
        var u;
        if (typeof t == "number" && typeof i == "number") {
            if (u = i - t + 1,
            u < 1)
                return t;
            while (n < t)
                if (r)
                    n += u;
                else
                    return t;
            while (n > i)
                if (r)
                    n -= u;
                else
                    return i
        }
        return n
    }
    ;
    var s = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
      , h = String.fromCharCode(3)
      , p = ["B", "KB", "MB", "GB", "TB"];
    if (r.indent = function(n) {
        return n = i.Int(n),
        n <= 0 ? "" : n > 100 ? s + s : n > 50 ? (s + s).substr(0, n) : s.substr(0, n)
    }
    ,
    r.Bytes = function(n, t) {
        for (var f, u, e = 0; n >= 1024 && e++ < 4; )
            n = n / 1024;
        return f = Math.floor(n),
        u = n - f,
        t = i.Int(t),
        r.Number(n) + (t && u ? u.toFixed(t).replace(/^0\./, ".") : "") + " " + p[e]
    }
    ,
    r.Number = function(n, t) {
        var f, e, u, o, s;
        return t === -1 ? (n < 1e3 ? f = n : n < 1e6 ? (f = n / 1e3,
        e = "k") : n < 1e9 ? (f = n / 1e6,
        e = "m") : (f = n / 1e9,
        e = "g"),
        u = r.Number(f, 1),
        u.substring(u.length - 2) === ".0" && (u = u.substring(0, u.length - 2)),
        u + e) : (n = Math.round10(n, t),
        t && (t = i.Int(t)) > 0 ? (o = Math.floor(n),
        s = n - o,
        o.toLocaleString().replace(/\.\d+$/, "") + s.toFixed(t).replace(/^0\./, ".")) : n.toLocaleString().replace(/\.\d+$/, ""))
    }
    ,
    r.Currency = function(n, t) {
        return "$" + r.Number(n, t)
    }
    ,
    r.Percent = function(n, t) {
        return r.Number(100 * n, t) + "%"
    }
    ,
    r.Digits = function(n, t) {
        var r = "000000000" + i.Int(n);
        return r.substring(r.length - t)
    }
    ,
    r.CMS = function(n) {
        return n ? ("" + n).replace(/'/g, "").replace(/\W+/gi, "-").toLowerCase() : ""
    }
    ,
    f.JS = f.Uri = function(n) {
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
    ,
    e.JS = e.Uri = function(n) {
        return n ? decodeURIComponent(("" + n).replace(/\+/g, "%20")) : ""
    }
    ,
    f.HTML = function(n) {
        return n ? n.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;") : ""
    }
    ,
    e.HTML = function(n) {
        var t, i;
        return n ? (t = document.createElement("div"),
        t.innerHTML = n,
        i = t.textContent || t.innerText,
        delete t,
        i) : ""
    }
    ,
    f.Json = function(n, t) {
        var i = JSON.stringify(n, null, "\t").replace(/"([^"]+)": /g, "$1: ").replace(/'/g, h).replace(/"/g, "'").replace(new RegExp(h,"g"), "\\'").replace(/\[(?:\s*(?:[\d\.]|true|false)+,?\s*){1,}\]/g, function(n) {
            return n.replace(/\s+/g, "")
        });
        return t && (t = r.indent(t)) && (i = i.replace(/\n/g, "\n" + t)),
        i
    }
    ,
    e.Json = function(n) {
        if (n) {
            if (typeof n == "string") {
                var t = n.replace(/\\'/g, h).replace(/'/g, '"').replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":').replace(new RegExp(h,"g"), "'")
                  , i = JSON2.parse(t);
                return i || null
            }
            return n
        }
        return null
    }
    ,
    f.Cookie = function(n, t) {
        return n === null || n === undefined ? "." : typeof n == "number" ? "#" + n : typeof n == "boolean" ? n ? "!!" : "!" : n ? n.constructor === Date ? ":" + n.getTime() : c(n) ? n.length ? typeof n[0] == "number" ? JSON.stringify(i.IntArray(n)) : encode(String(n)) : "[]" : typeof n == "string" ? f.JS(n) : t ? JSON.stringify(n) : String(n) : ""
    }
    ,
    e.Cookie = function(n, t) {
        if (!n)
            return null;
        n.indexOf('"') === 0 && (n = n.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        switch (n[0]) {
        case "#":
            return i.Float(n.substring(1));
        case ":":
            return new Date(i.Int(n.substring(1)));
        case "!":
            return n === "!!";
        case "[":
            if (n[n.length - 1] === "]")
                return i.IntArray(n.substring(0, n.length - 1));
            break;
        case "'":
            return e.JS(n.substring(1));
        default:
            return e.JS(n)
        }
        if (n === ".")
            return null;
        try {
            return n = decodeURIComponent(n.replace(/\+/g, " ")),
            t ? JSON2.parse(n) : n
        } catch (r) {}
    }
    ,
    f.ForRegex = function(n) {
        return n ? n.replace(/([\*\+\?\^\$\.\[\]\{\}\(\)\|\\])/g, "\\$1") : null
    }
    ,
    o.Hash = function(n) {
        var r, t, i;
        if (!n)
            return 0;
        for (r = 2166136261,
        t = r,
        i = 0; i < n.length; i++)
            t ^= n.charCodeAt(i),
            t += (t << 1) + (t << 4) + (t << 7) + (t << 8) + (t << 24);
        return t >>> 0
    }
    ,
    o.UUID = function() {
        var n = performance.now();
        return "_xxxxxxxxxxxxxxxx".replace(/x/g, function() {
            var t = (n + Math.random() * 16) % 16 | 0;
            return n = Math.floor(n / 16),
            t.toString(16)
        })
    }
    ,
    o.GUID = function() {
        var n = performance.now();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
            var i = (n + Math.random() * 16) % 16 | 0;
            return n = Math.floor(n / 16),
            (t === "x" ? i : i & 3 | 8).toString(16)
        })
    }
    ,
    o.Pattern = function(n) {
        return !n || typeof n != "string" ? null : n.replace(/([\*\+\?\^\$\.\[\]\{\}\-\|\\])/g, "\\$1").replace(/\s+/g, "\\s+")
    }
    ,
    o.Regex = function(n) {
        var t = o.Pattern(n);
        return t && new RegExp(t,"gi")
    }
    ,
    u.Link = function(n, t) {
        var i = n && n.target
          , r = 0;
        for (t = t || 3; i && r++ < t; ) {
            if (i.nodeName === "A")
                return i;
            (i.nodeName === "SVG" || i.nodeName === "svg") && (r = 0);
            i = i.parentNode
        }
    }
    ,
    a = /^javascript:(\w+)(?:\('([^']+)')?/i,
    u.LinkData = function(n, t) {
        var i = u.Link(n, t)
          , r = i && i.getAttribute("href")
          , f = r && a.exec(r)
          , e = f && f[1]
          , o = e === "void" ? f[2] : undefined;
        return {
            link: i,
            href: r,
            fn: e,
            action: o
        }
    }
    ,
    u.Class = function(n, t, i, r) {
        var f = n && n.target
          , e = 0;
        if (i = i || 3,
        t) {
            if (t.constructor === RegExp)
                return u._class(f, t, i)
        } else
            return null;
        while (f && e++ < i) {
            if (r && f.classList && f.classList.contains(r))
                return null;
            if (f.classList && f.classList.contains(t))
                return f;
            (f.nodeName === "SVG" || f.nodeName === "svg") && (e = 0);
            f = f.parentNode
        }
        return null
    }
    ,
    u._class = function(n, t, i) {
        for (var r = 0; n && r++ < i; ) {
            if (n.className && t.test(n.className))
                return n;
            (n.nodeName === "SVG" || n.nodeName === "svg") && (r = 0);
            n = n.parentNode
        }
        return null
    }
    ,
    u.BIndex = function(n, t, i, r) {
        var f, e, o, u = 0, s = n.length - 1, h = null;
        for (r === undefined && i === !0 && (r = i,
        i === undefined); u < s; )
            f = u + s >> 1,
            e = n[f],
            o = i ? e[i] : e,
            o < t ? u = f + 1 : o > t ? s = f - 1 : (h = f,
            r ? u = f + 1 : s = f - 1);
        return h !== null ? h : u === 0 ? u : (e = n[u],
        o = i ? e[i] : e,
        o > t && u--,
        u)
    }
    ,
    u.Position = function(n, t, i) {
        for (var r, u = n && n.length; u--; )
            if (r = n[u],
            r && t >= r.left && t <= r.left + r.width && i >= r.top && i <= r.top + r.height)
                return u;
        return -1
    }
    ,
    t.Make = i,
    t.Encode = f,
    t.Decode = e,
    t.Format = r,
    t.Compute = o,
    t.Get = u,
    Object.keys || (Object.keys = function() {
        "use strict";
        var t = Object.prototype.hasOwnProperty
          , i = !{
            toString: null
        }.propertyIsEnumerable("toString")
          , n = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]
          , r = n.length;
        return function(u) {
            if (typeof u != "object" && (typeof u != "function" || u === null))
                throw new TypeError("Object.keys called on non-object");
            var e = [], o, f;
            for (o in u)
                t.call(u, o) && e.push(o);
            if (i)
                for (f = 0; f < r; f++)
                    t.call(u, n[f]) && e.push(n[f]);
            return e
        }
    }()),
    Object.values || (Object.values = function() {
        "use strict";
        var t = Object.prototype.hasOwnProperty
          , i = !{
            toString: null
        }.propertyIsEnumerable("toString")
          , n = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]
          , r = n.length;
        return function(u) {
            if (typeof u != "object" && (typeof u != "function" || u === null))
                throw new TypeError("Object.values called on non-object");
            var e = [], o, f;
            for (o in u)
                t.call(u, o) && e.push(u[o]);
            if (i)
                for (f = 0; f < r; f++)
                    t.call(u, n[f]) && e.push(n[f]);
            return e
        }
    }()),
    t.document && !t.document.scrollBy && (t.document.scrollBy = function(n, t, i) {
        var u = this
          , f = u.defaultView
          , r = u._opt;
        r ? this.scrollTo(r.endX + n, r.endY + t, i) : this.scrollTo(f.scrollX + n, f.scrollY + t, i)
    }
    ,
    t.document.scrollTo = function(n, t, i) {
        var f = this
          , u = f.defaultView
          , r = f._opt;
        r ? (u.cancelAnimationFrame(r.frame),
        delete r.begin) : (r = {},
        r.fn = function(t) {
            var e, i, o;
            if (r.begin)
                e = t - r.begin,
                i = Math.min(1, e / r.dur),
                i = .5 - Math.cos(i * Math.PI) / 2,
                n = i * r.diffX + r.startX,
                o = i * r.diffY + r.startY,
                u.scrollTo(n, o),
                i === 1 ? delete f._opt : r.frame = u.requestAnimationFrame(r.fn);
            else {
                r.begin = t;
                r.frame = u.requestAnimationFrame(r.fn);
                return
            }
        }
        ,
        f._opt = r);
        r.startX = u.scrollX;
        r.startY = u.scrollY;
        r.endX = n;
        r.endY = t;
        r.diffX = r.endX - r.startX;
        r.diffY = r.endY - r.startY;
        r.dur = i || 100;
        r.frame = u.requestAnimationFrame(r.fn)
    }
    ),
    !t.JSON2) {
        v = /^\d{4}\-\d{2}\-\d{2}T\d\d\:\d\d/;
        l = t.JSON.parse;
        function y(n, t) {
            return v.test(t) ? i.Date(t) || t : t
        }
        t.JSON2 = {
            parse: function(n, t) {
                return l(n, t || y)
            },
            tryparse: function(n, t) {
                try {
                    return l(n, t || y)
                } catch (i) {
                    return null
                }
            }
        }
    }
    t.StopAll = function(n) {
        var t, r, i;
        if (n)
            for (r = ["preventDefault", "stopImmediatePropagation", "stopPropagation"],
            i = 3; i--; )
                t = r[i],
                n[t] && n[t]();
        return !1
    }
    ;
    t.register && t.register("static")
}(this.jQuery, this);
window.registerLoading && registerLoading("j/jquery.cookie"),
function(n) {
    typeof rrequire == "function" ? rrequire(["j/jquery", "j/timezone", "static"], n) : n(jQuery)
}(function(n) {
    function r(n) {
        return t.raw ? n : encodeURIComponent(n)
    }
    function u(n) {
        return t.raw ? n : decodeURIComponent(n)
    }
    function f(n) {
        return Encode.Cookie(n, t.json)
    }
    function e(n) {
        return Decode.Cookie(n, t.json)
    }
    function i(i, r) {
        var u = t.raw ? i : e(i);
        return n.isFunction(r) ? r(u) : u
    }
    var t = n.cookie = function(e, o, s) {
        var v, c;
        if (arguments.length > 1 && !n.isFunction(o))
            return document.cookie.indexOf("COOK=NO!") > -1 ? void 0 : (s = n.extend({}, t.defaults, s),
            o === null && (s.expires = -1),
            typeof s.expires == "number" && (v = s.expires,
            c = s.expires = new Date,
            c.setMilliseconds(c.getMilliseconds() + v * 864e5)),
            document.cookie = [r(e), "=", f(o), s.expires ? "; expires=" + s.expires.toUTCString() : "", s.path ? "; path=" + s.path : "", s.domain ? "; domain=" + s.domain : "", s.secure ? "; secure" : ""].join(""));
        for (var l = e ? undefined : {}, y = document.cookie ? document.cookie.split("; ") : [], a = 0, b = y.length; a < b; a++) {
            var p = y[a].split("=")
              , w = u(p.shift())
              , h = p.join("=");
            if (e === w) {
                l = i(h, o);
                break
            }
            e || (h = i(h)) === undefined || (l[w] = h)
        }
        return l
    }
    ;
    t.defaults = {
        path: "/"
    };
    n.removeCookie = function(t, i) {
        return n.cookie(t, "", n.extend({}, i, {
            expires: -1
        })),
        !n.cookie(t)
    }
    ;
    n.cookie("_tz") === undefined && document.cookie.indexOf("COOK=NO!") < 0 && n.cookie("_tz", jstz.determine().name() || "", {
        expires: 365,
        path: "/"
    });
    window.register && window.register("j/jquery.cookie")
});
window.registerLoading && registerLoading("extensions"),
function(n) {
    typeof rrequire == "function" ? rrequire(["j/jquery", "j/jquery.ui", "static", "uri"], n) : n(jQuery)
}(function(n) {
    function e(n, t) {
        var r, f, e, u;
        return t > 0 || t < 0 ? (r = n.getBoundingClientRect(),
        !r.width && !r.height) ? !1 : o ? !0 : (i || (u = window.getComputedStyle(document.body),
        i = {
            top: parseFloat(u.paddingTop) + parseFloat(u.marginTop),
            right: window.innerWidth,
            bottom: window.innerHeight,
            left: parseFloat(u.paddingLeft) + parseFloat(u.marginLeft)
        }),
        t < 1 && t > -1 ? (f = Math.round(Math.min(t * i.right, t * r.width)),
        e = Math.round(Math.min(t * i.bottom, t * r.height))) : (f = Math.min(t, r.width),
        e = Math.min(t, r.height)),
        r.top + e > i.bottom) ? !1 : r.right - f < i.left || r.bottom - e < i.top || r.left + f > i.right ? !1 : !0 : !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length)
    }
    function u(r) {
        var f, o, c, h, l, s = 0;
        for (r && r.type === "resize" && (i = null); s < t.length; ) {
            if (f = t[s],
            o = f && f.element,
            !o || !o.ownerDocument || !o.ownerDocument.body.contains(o)) {
                t.splice(s, 1);
                continue
            }
            if (c = e(o, f.viewport),
            c) {
                for (h = 0,
                l = f.handlers.length; h < l; )
                    f.handlers[h++].call(f.element, {
                        type: "visible",
                        target: o
                    });
                t.splice(s, 1);
                continue
            }
            s++
        }
        t.length || (n(window).off("resize", u),
        n(window).off("scroll", u))
    }
    var o = Make.Bool(new URI(window.location.href).QueryString("screenshot")), r = {
        swap: function(n, t, i) {
            var r = n[t];
            n[t] = n[i];
            n[i] = r
        },
        partition: function(n, t, i, u, f) {
            var s = n[u], o, e;
            for (r.swap(n, u, i - 1),
            o = t,
            e = t; e < i - 1; ++e)
                (f ? f(n[e], s) <= 0 : n[e] <= s) && (r.swap(n, o, e),
                ++o);
            return r.swap(n, i - 1, o),
            o
        },
        quick: function(n, t, i, u) {
            if (i - 1 > t) {
                var f = t + Math.floor(Math.random() * (i - t));
                f = r.partition(n, t, i, f, u);
                r.quick(n, t, f, u);
                r.quick(n, f + 1, i, u)
            }
        }
    }, f, i, t;
    Array.quickSort = function(n, t) {
        r.quick(n, 0, n.length, t)
    }
    ;
    Array.indexOf = function(n, t, i) {
        for (var r = n && n.length; r--; )
            if (i === undefined) {
                if (n[r] == t)
                    return r
            } else if (n[r][i] == t)
                return r;
        return -1
    }
    ;
    f = /auto|scroll|(hidden)/;
    n.fn.getScroller = function() {
        var t, i = function(i) {
            var r = n(i);
            return i === document.body ? !0 : t.scrollHeight - t.offsetHeight < 10 ? !1 : (r = n(i),
            r.is(".ui-scroll") ? !0 : f.test(r.css("overflow") + r.css("overflow-y") + r.css("overflow-x")))
        };
        if (!this.length)
            return n([]);
        for (t = this[0].parentNode; t && !i(t); )
            t = t.parentNode;
        return n(t || document.body)
    }
    ;
    n.fn.scrollIntoView = function(t, i) {
        if (this.is(":visible")) {
            var u, o, s, h, c, l, f, p, w, k, e, b = this.offset(), d = this[0].offsetHeight, g = this[0].offsetWidth, r = this.getScroller(), y = Make.Int(i), a = Make.Int(t), v = !1;
            r.is("body") || r.is(document) ? (r = n("body,html"),
            o = n("body"),
            u = {
                left: Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
                top: Math.max(document.documentElement.scrollTop, document.body.scrollTop),
                spacing: Make.Int(o.css("margin-top")) + Make.Int(o.css("padding-top"))
            },
            f = {
                left: u.left + Make.Int(o.css("margin-left")) + Make.Int(o.css("padding-left")),
                top: u.top + u.spacing
            },
            p = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
            w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) : (u = {
                left: r[0].scrollLeft,
                top: r[0].scrollTop
            },
            f = r.offset(),
            p = r[0].clientHeight,
            w = r[0].clientWidth);
            s = f.top - b.top + y;
            c = b.top - (f.top + p) + d + y + (u.spacing || 0);
            l = f.left - f.left + y;
            h = b.left - (f.left + w) + g + y;
            k = this.closest(".ui-scroll");
            e = function() {
                k.trigger("update")
            }
            ;
            a > 0 ? (r.stop(),
            s > 1 && u.top > 0 ? r.animate({
                scrollTop: Math.max(0, u.top - s)
            }, a, e) : c > 1 ? r.animate({
                scrollTop: u.top + c
            }, a, e) : l > 1 && u.left > 0 ? r.animate({
                scrollLeft: Math.max(0, u.left - l)
            }, a, e) : h > 1 && r.animate({
                scrollLeft: u.left + h
            }, a, e)) : (s > 1 && u.top > 0 ? (r.prop("scrollTop", Math.max(0, u.top - s)),
            v = !0) : c > 1 ? (r.prop("scrollTop", u.top + c),
            v = !0) : l > 1 && u.left > 0 ? (r.animate("scrollLeft", Math.max(0, u.left - l)),
            v = !0) : h > 1 && (r.prop("scrollLeft", u.left + h),
            v = !0),
            v && e());
            r.is("body") || r.scrollIntoView(t, i)
        }
        return this
    }
    ;
    i = null;
    t = [];
    n.fn.onvisible = function(r, f) {
        var y, a, v, s, p, h, c, l, o, w;
        if (typeof r != "string" || /[^\w \-]/.test(r) || (y = r,
        r = function() {
            n(this).addClass(y)
        }
        ),
        a = this.length,
        !a || !n.isFunction(r))
            return this;
        for (r.guid = r.guid || jQuery.guid++,
        f = f === !0 ? 1 : Make.Float(f),
        v = 0; v < a; ) {
            if (s = this[v++],
            p = e(s, f),
            p) {
                r.call(s, {
                    type: "visible",
                    target: s
                });
                continue
            }
            for (o = null,
            h = 0,
            c = t.length; h < c; )
                if (l = t[h++],
                l.element === s && l.viewport === f) {
                    o = l;
                    break
                }
            if (!o) {
                o = {
                    element: s,
                    handlers: [r],
                    viewport: f
                };
                t.length || (w = !0);
                t.push(o);
                continue
            }
            for (h = 0,
            c = o.handlers.length; h < c; )
                if (o.handlers[h++].guid === r.guid) {
                    r = null;
                    break
                }
            r && o.handlers.push(r)
        }
        if (w) {
            i = null;
            n(window).onidle("resize", u, 50);
            n(window).onidle("scroll", u, 50)
        }
        return this
    }
    ;
    n.fn.offvisible = function(n) {
        for (var i, e, f, u, o, r = t.length; r--; )
            for (i = t[r],
            f = 0; f < this.length; f++)
                if (e = this[f],
                i.element === e)
                    if (n && n.guid) {
                        for (u = 0; u < i.handlers.length; u++)
                            o = i.handlers[u],
                            o.guid == n.guid && i.handlers.splice(u, 1);
                        if (i.handlers.length === 0) {
                            t.splice(r, 1);
                            break
                        }
                    } else {
                        t.splice(r, 1);
                        break
                    }
        return this
    }
    ;
    n.fn.onidle = function() {
        for (var f, t, u, i = Array.prototype.slice.call(arguments), r = i.length; r--; )
            if (typeof i[r] == "number") {
                f = i.splice(r, 1)[0];
                break
            }
        if (f)
            for (r = i.length; r--; )
                if (n.isFunction(i[r])) {
                    t = i[r];
                    break
                }
        return t && (u = function() {
            var n = this
              , i = Array.prototype.slice.call(arguments);
            t.timer && clearTimeout(t.timer);
            t.timer = setTimeout(function() {
                clearTimeout(t.timer);
                t.timer = null;
                t.apply(n, i)
            }, f)
        }
        ,
        t.guid && (u.guid = t.guid),
        i[r] = u),
        this.on.apply(this, i),
        u && u.guid && !t.guid && (t.guid = u.guid),
        this
    }
    ;
    n.fn.clickin = function() {
        for (var t, e, u, f, i = Array.prototype.slice.call(arguments), r = i.length; r--; )
            if (n.isPlainObject(i[r])) {
                t = i.splice(r, 1)[0];
                break
            } else
                typeof i[r] == "string" ? e = i.splice(r, 1)[0] : n.isFunction(i[r]) && (u = i.splice(r, 1)[0]);
        return !t || !u ? (console.log("Invalid parameters for the clickin"),
        this) : (f = function(i) {
            var h = Array.prototype.slice.call(arguments)
              , r = e ? n(i.target).closest(e) : n(this)
              , f = r.offset()
              , o = i.pageX + (t.x || 0)
              , s = i.pageY + (t.y || 0);
            t.left && o - f.left > t.left || t.top && s - f.top > t.top || t.right && f.left + r.width() - o > t.right || t.bottom && f.top + r.height() - s > t.bottom || (e && (i.target = r[0]),
            u.apply(this, h))
        }
        ,
        u.guid && (f.guid = u.guid),
        i.unshift(f),
        i.unshift("click"),
        this.on.apply(this, i),
        f.guid && !u.guid && (u.guid = f.guid),
        this)
    }
    ;
    n.ui && n.ui.dialog && (n.ui.dialog.prototype._hide = function(t, i, r) {
        this._trigger("beforeclose");
        t.addClass("dialog-out");
        setTimeout(function() {
            t.hide().removeClass("dialog-out");
            n.isFunction(r) && r.call(t[0])
        }, 400)
    }
    ,
    n.ui.dialog.prototype._destroyOverlay = function() {
        var n, t;
        this.options.modal && this.overlay && (n = this.document.data("ui-dialog-overlays") - 1,
        n ? this.document.data("ui-dialog-overlays", n) : (this._off(this.document, "focusin"),
        this.document.removeData("ui-dialog-overlays")),
        t = this.overlay,
        t.addClass("out"),
        setTimeout(function() {
            t.remove()
        }, 300),
        this.overlay = null)
    }
    ,
    n.extend(n.ui.keyCode, {
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120
    }));
    window.$alert = function(t, i) {
        var u, r = n.extend(!0, {}, $alert.options);
        return n.isPlainObject(i) ? n.extend(r, i) : n.isFunction(i) && (u = r.close,
        r.close = function() {
            i.apply(this, arguments);
            u.apply(this, arguments)
        }
        ),
        t.indexOf("<") < 0 && (r.dialogClass += " icon"),
        n("<div><\/div>").html(t || "").dialog(r)
    }
    ;
    window.$confirm = function(t, i, r) {
        var f, u = n.extend(!0, {
            confirmed: !1
        }, $alert.options, $confirm.options);
        return n.isPlainObject(i) ? n.extend(u, i) : n.isFunction(i) && (u.confirm = i),
        n.isFunction(r) && (f = u.close,
        u.close = function() {
            var t = n(this).dialog("option", "confirmed");
            t || r.apply(this, arguments);
            f.apply(this, arguments)
        }
        ),
        n("<div><\/div>").html(t || "").dialog(u)
    }
    ;
    window.$popup = function(t, i) {
        var r = n.extend(!0, {}, $alert.options, $popup.options, i)
          , u = r.open;
        if (!t || t[0] !== "/" || t[1] === "/") {
            console.log("Invalid url for popup");
            return
        }
        r.open = function() {
            var i = n(this)
              , r = Array.prototype.slice.call(arguments);
            i.loading();
            n.ajax({
                url: t,
                success: function(t) {
                    var f = i.dialog("option", "position");
                    i.loading("done").html(t).parent().position(f);
                    n.isFunction(u) && u.apply(i[0], r)
                }
            })
        }
        ;
        n("<div><\/div>").dialog(r)
    }
    ;
    window.$alert.options = {
        create: function() {
            n(this).parent().css({
                position: "fixed"
            })
        },
        modal: !0,
        resizable: !1,
        dialogClass: "cms-alert ui-noselect",
        width: "css",
        height: "css",
        close: function() {
            n(this).dialog("destroy");
            n(this).remove()
        },
        buttons: [{
            text: "OKAY",
            click: function() {
                n(this).dialog("close")
            }
        }]
    };
    window.$confirm.options = {
        buttons: [{
            text: "YES",
            click: function() {
                var t = n(this)
                  , i = t.dialog("option", "confirm");
                t.dialog("option", "confirmed", !0);
                n.isFunction(i) && i.apply(this, arguments);
                n(this).dialog("close")
            }
        }, {
            text: "NO",
            click: function() {
                n(this).dialog("close")
            }
        }]
    };
    window.$popup.options = {
        dialogClass: "cms-popup daylight",
        buttons: [{
            text: "CLOSE",
            click: function() {
                n(this).dialog("close")
            }
        }]
    };
    window.register && window.register("extensions")
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
    function h(n, t) {
        for (var r = n.replace(/^\/|\/$/g, "").split("/"), i = t.split("/"); i[0] === ".."; )
            r.pop(),
            i.shift();
        return "/" + r.concat(i).join("/")
    }
    var i = Object.prototype.hasOwnProperty
      , r = function(n, t, i) {
        return n && n[0] === t ? i ? n.substring(1) : n : !i && n ? t + n : n || ""
    }
      , u = function(n, t, i) {
        return n && n[n.length - 1] === t ? i ? n.substring(0, n.length - 1) : n : !i && n ? n + t : n || ""
    }
      , e = function(n) {
        return n ? encodeURIComponent("" + n).replace(/%7C/gi, "|").replace(/%2C/gi, ",").replace(/['"\(\)]/g, function(n) {
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
      , t = function(n, i, f) {
        if (Object.defineProperty) {
            var e = undefined
              , o = undefined
              , c = undefined
              , s = undefined
              , h = undefined;
            Object.defineProperty(this, "Scheme", {
                get: function() {
                    return u(e, ":", !0)
                },
                set: function(n) {
                    e = u(n, ":", !1)
                }
            });
            Object.defineProperty(this, "UserInfo", {
                get: function() {
                    return u(o, "@", !0)
                },
                set: function(n) {
                    o = u(n, "@", !1)
                }
            });
            Object.defineProperty(this, "Port", {
                get: function() {
                    return r(c, ":", !0)
                },
                set: function(n) {
                    c = r(n, ":", !1)
                }
            });
            Object.defineProperty(this, "Query", {
                get: function() {
                    return r(s, "?", !0)
                },
                set: function(n) {
                    s = r(n, "?", !1)
                }
            });
            Object.defineProperty(this, "Hash", {
                get: function() {
                    return r(h, "#", !0)
                },
                set: function(n) {
                    h = r(n, "#", !1)
                }
            });
            this.get = function(n) {
                return !n || o || e && e != "http:" && e != "https:" ? (e || "") + (this.Whack || "") + (o || "") + (this.Host || "") + (c || "") + (this.Path || "") + (s || "") + (h || "") : (this.Path || "") + (s || "") + (h || "")
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
        i && this.extend(i);
        f && this.extend(f)
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
        var t;
        return n && n[0] === "." && n[1] === "/",
        t = /^(?:(\w{2,8}:)?(\/\/)?([\w\-\.:]+@)?([\w\-\.]+)(:\d+)?)?(\/?[^\?#]+)?(\?[^#]*)?(#.*)?$/.exec(n),
        t && (this.Scheme = t[1],
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
                n[0] === "." && (n[1] === "/" || n[1] === "." && n[2] === "/") ? this.addChild(n) : r = new t(n);
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
    t.prototype.getRelative = function(n) {
        var i, r, t, u, o, f, e;
        if (n) {
            if (!this.Path || this.Path.length < 3)
                return n
        } else
            return null;
        if (i = this.Path.replace(/(\.\w+|\/)$/, "").toLowerCase().replace(/^\//, "").split("/"),
        r = n.replace(/^\/|\/$/g, "").split("/"),
        i.length < 1 || r.length < 1 || i[0] != r[0].toLowerCase())
            return n;
        for (t = 1; t < i.length && t < r.length; t++)
            if (i[t] != r[t].toLowerCase())
                break;
        if (t == i.length && t == r.length)
            return n;
        if (u = i.slice(0, t).join("/").length + 2,
        t == i.length)
            return "./" + n.substring(u);
        for (o = Math.max(1, i.length - t),
        f = [],
        e = 0; e < o; e++)
            f.push("..");
        return f.join("/") + "/" + n.substring(u)
    }
    ;
    t.prototype.addChild = function(n) {
        var t, i;
        if (n)
            if (n[0] === "/")
                this.extend(n);
            else {
                if (n === ".")
                    n = "";
                else if (n[0] === "." && n[1] === "/")
                    n = n.substring(2);
                else if (n[0] === "." && n[1] === "." && n[2] === "/")
                    return this.extend(h(this.Path, n)),
                    this;
                t = this.Path ? this.Path.split("/") : ["", ""];
                i = t[t.length - 1];
                i ? (i = i.replace(/\.\w+$/, ""),
                t[t.length - 1] = i,
                t.push(n)) : t[t.length - 1] = n;
                this.extend(t.join("/"))
            }
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
window.registerLoading && registerLoading("behaviors"),
function(n) {
    typeof rrequire == "function" ? rrequire(["j/jquery", "static"], n) : n(jQuery)
}(function(n) {
    function r(t, i, u) {
        var e, f, s, h = 0, c = t && t.childNodes && t.childNodes.length, o = null;
        if (!i.parent) {
            if (!t)
                return;
            if (t.classList.contains("ui-tabs"))
                i.parent = t;
            else if (i.parent = t.closest(".ui-tabs"),
            !i.parent)
                return
        }
        while (h < c) {
            if (e = t.childNodes[h++],
            e.classList)
                e.classList.contains("ui-tab") ? o = "tabs" : e.classList.contains("ui-tab-panel") && (o = "panels");
            else
                continue;
            o && (f = n(e).data("tab"),
            f || o !== "tabs" || (f = "dynamictab_" + ++i.count,
            n(e).data("tab", f)),
            f && (o === "tabs" && (i.first || (i.first = f),
            i.last = f),
            s = i[o][f],
            s || (i[o][f] = s = []),
            s.push(e),
            e.classList.contains("active") ? (i.active || (i.active = {}),
            i.active[f] = 1) : o === "tabs" && (i.active ? i.next || (i.next = f) : i.prev = f)));
            (u || !e.classList.contains("ui-tabs")) && r(e, i, u)
        }
    }
    function u(t, i, r) {
        var e = r ? "addClass" : "removeClass"
          , o = r ? "active" : "inactive"
          , u = t.tabs[i]
          , f = t.panels[i];
        u && u.length === 1 && (u = u[0]);
        f && f.length === 1 && (f = f[0]);
        t.parent && t.parent && (i ? t.parent.setAttribute("data-activetab", i) : t.parent.removeAttribute("data-activetab"));
        u && n(u)[e]("active");
        f && n(f)[e]("active");
        f ? n(f).trigger({
            type: o,
            tab: u,
            panel: f
        }) : u && n(u).trigger({
            type: o,
            tab: u
        })
    }
    function f(i, r, u, e) {
        for (var o, h, l, s, c, a = 0, v = i && i.childNodes && i.childNodes.length; a < v; ) {
            if (o = i.childNodes[a++],
            o.classList) {
                if (o.classList.contains("ui-conditional-panel") && o.getAttribute("data-name") === u) {
                    if (h = n(o),
                    l = h.data("value"),
                    s = h.data("notvalue"),
                    s === undefined && (s = h.data("notValue")),
                    c = !1,
                    s)
                        c = !t.Conditional.Match(e, s);
                    else if (l === undefined)
                        continue;
                    else
                        c = t.Conditional.Match(e, l);
                    c ? r.panels.push(o) : o.classList.contains("active") && r.active.push(o)
                }
            } else
                continue;
            o.classList.contains("ui-conditionals") || f(o, r, u, e)
        }
    }
    var t = window.Behaviors || {}
      , i = !1;
    t.Sticky = function() {}
    ;
    t.On = function() {
        if (!i) {
            n(document.body).on("click", t.Tabs.Click);
            n(document.body).on("change", t.Conditional.Change);
            i = !0
        }
    }
    ;
    t.Off = function() {
        i && (n(document.body).off("click", t.Tabs.Click),
        n(document.body).off("change", t.Conditional.Change),
        i = !1)
    }
    ;
    t.Tabs = function() {
        t.On()
    }
    ;
    t.Conditional = function() {
        t.On()
    }
    ;
    t.Tabs.Click = function(n) {
        var e, o, r, u, i = Get.LinkData(n), f = Get.Class(n, "ui-tab", 3, "ui-tabs"), s = i.action && i.action.toLowerCase();
        if (!i.href || i.fn && s != "trigger") {
            n.target.nodeName === "INPUT" ? r = n.target : n.target.nodeName === "LABEL" && (r = n.target.getAttribute("for")) && (r = document.getElementById(r));
            switch (r && r.getAttribute("type")) {
            case "checkbox":
            case "radio":
                break;
            default:
                u = !1
            }
            if (f)
                return (e = f.classList.contains("active"),
                o = f.classList.contains("ui-toggle"),
                e && !o) ? u : o && Get.Class(n, "no-toggle") ? u : (t.Tabs.Set(f, !e),
                u);
            if (i.action && i.link.classList.contains("ui-tab-nav"))
                switch (i.action) {
                case "Next":
                    t.Tabs.Set(i.link, !0, 1);
                    break;
                case "Prev":
                    t.Tabs.Set(i.link, !0, -1)
                }
        }
    }
    ;
    t.Tabs.GetActive = function(n) {
        var i = t.Tabs.GetState(n);
        return i.active ? Object.keys(i.active) : []
    }
    ;
    t.Tabs.GetState = function(n, t) {
        var i;
        if (n && n.jquery && (n = n[0]),
        n && n.childNodes)
            return i = {
                count: 0,
                parent: null,
                tabs: {},
                panels: {},
                active: null,
                first: null,
                last: null,
                next: null,
                prev: null
            },
            r(n, i, t === undefined ? !0 : t),
            i
    }
    ;
    t.Tabs.SetActive = function(n, t) {
        var i, e, o, f;
        if (t && t.length && (n && n.jquery && (n = n[0]),
        n && n.childNodes)) {
            if (i = {
                count: 0,
                parent: null,
                tabs: {},
                panels: {},
                active: null,
                first: null,
                last: null,
                next: null,
                prev: null
            },
            r(n, i, !0),
            i.active)
                for (f in i.active)
                    i.active.hasOwnProperty(f) && t.indexOf(f) < 0 && u(i, f, !1);
            for (e = t.length; e--; )
                o = t[e],
                i.active && i.active[o] || u(i, o, !0)
        }
    }
    ;
    t.Tabs.Set = function(t, i, f) {
        var o, s, e, l, c, a, h;
        if (typeof t == "string" && (t = document.querySelector(".ui-tab[data-tab='" + t + "']")),
        t && t.jquery && (t = t[0]),
        t && t.childNodes) {
            if (o = n(t),
            s = f && typeof f == "string" && o.is(".ui-tabs") ? o : o.is(".ui-tab-panel") ? o.parent().closest(".ui-tabs") : o.closest(".ui-tabs"),
            e = {
                count: 0,
                parent: s[0],
                tabs: {},
                panels: {},
                active: null,
                first: null,
                last: null,
                next: null,
                prev: null
            },
            r(s[0], e),
            l = t.classList.contains("ui-validate") && n.html5form && n.html5form.validateGroup,
            l && (c = s.find(".ui-tab-panel.active").find(":input:not(.ui-dialog-titlebar-close,button):visible"),
            a = c.closest("form"),
            n.html5form.validateGroup(a, c) === !1))
                return !1;
            if (i && (f = f > 0 ? e.next || e.first : f < 0 ? e.prev || e.last : f || o.data("tab")),
            e.active)
                for (h in e.active)
                    e.active.hasOwnProperty(h) && (f && i && f === h || u(e, h, !1));
            i && u(e, f, !0);
            n(window).trigger("resize")
        }
    }
    ;
    t.Conditional.Change = function(t) {
        var u, e, r, i = t.target.classList.contains("ui-conditional") ? t.target : null, o = i && i.getAttribute("data-name");
        o && (i = n(i),
        u = i.closest(".ui-conditionals"),
        e = i.is(":checkbox") ? i.prop("checked") ? i.val() || "on" : "" : i.val(),
        r = {
            panels: [],
            active: []
        },
        f(u[0], r, o, e),
        r.active.length && n(r.active).removeClass("active").trigger("inactive"),
        r.panels.length && n(r.panels).addClass("active").trigger("active"),
        n(window).trigger("resize"))
    }
    ;
    t.Conditional.SetActive = function(n) {
        var t = n.find(".ui-conditional[data-name]");
        t.trigger("change")
    }
    ;
    t.Conditional.Match = function(t, i) {
        var u, r = !1;
        if (i === "*")
            r = !!t;
        else if (t === "*")
            r = !0;
        else if (typeof i == "boolean")
            r = i === Make.Bool(t);
        else if (typeof i == "number")
            r = i === Make.Int(t);
        else if (i)
            if (typeof i == "string" && i[0] === "[" && (i = i.replace(/^\[|\]$/g, "").split(",")),
            n.isArray(i)) {
                for (u = i.length; u--; )
                    if (i[u] == t) {
                        r = !0;
                        break
                    }
            } else
                r = i == t;
        else
            r = !t;
        return r
    }
    ;
    t.Classes = {
        active: /(?:^| )active(?: |$)/,
        "ui-sticky": /(?:^| )ui\-sticky(?: |$)/,
        "ui-tabs": /(?:^| )ui\-tabs(?: |$)/,
        "ui-tab": /(?:^| )ui\-tab(?: |$)/,
        "ui-tab-panel": /(?:^| )ui\-tab\-panel(?: |$)/,
        "ui-toggle": /(?:^| )ui\-toggle(?: |$)/,
        "no-toggle": /(?:^| )no\-toggle(?: |$)/,
        "ui-conditionals": /(?:^| )ui\-conditionals(?: |$)/,
        "ui-conditional": /(?:^| )ui\-conditional(?: |$)/,
        "ui-conditional-panel": /(?:^| )ui\-conditional\-panel(?: |$)/,
        "ui-validate": /(?:^| )ui\-validate(?: |$)/
    };
    t.TopNav = function(t) {
        var i = t;
        i.on("focusin", function(t) {
            var r = n(t.target).closest("li");
            r.is(".active") || (r.addClass("active"),
            i.find(".active").removeClass("active"),
            r.parentsUntil(this).filter("li").addClass("active"))
        });
        i.on("mouseover mouseleave", function(n) {
            n.type === "mouseleave" ? i.find(".active").removeClass("active") : /^a$/i.test(n.target.nodeName || "") && n.target.focus()
        })
    }
    ;
    t.MobileNav = function(t) {
        var r = t, i, u;
        r.on("click", function(t) {
            i = n(t.target).closest("li");
            u = i.hasClass("active");
            r.find(".active").removeClass("active");
            u || i.addClass("active")
        })
    }
    ;
    window.Behaviors = t;
    window.register && window.register("behaviors")
});
window.registerLoading && registerLoading("c/scrollbar"),
function(n) {
    typeof rrequire == "function" ? rrequire(["j/jquery", "j/jquery.ui", "static", "j/ui.wheel"], n) : n(jQuery)
}(function(n) {
    n.widget("cms.scrollbar", {
        options: {
            captureScroll: !1
        },
        _create: function() {
            var t, i;
            if (!Modernizr.cssscrollbar) {
                if (this.panel = n.cms.scrollbar.wrap(this.element.addClass("cms-scrollbar")),
                this.panel.is(".ui-scroll-wrap") ? (t = this.panel,
                this.panel = this.element) : t = this.element,
                this.vthumb = n('<div class="ui-scroll-thumb vertical"><\/div>').appendTo(t).draggable({
                    axis: "y",
                    containment: "parent",
                    drag: n.proxy(this._setVScroll, this)
                }),
                this.hthumb = n('<div class="ui-scroll-thumb horizontal"><\/div>').appendTo(t).draggable({
                    axis: "x",
                    containment: "parent",
                    drag: n.proxy(this._setHScroll, this)
                }),
                this.element.is(".vertical") ? this.direction = 1 : this.element.is(".horizontal") && (this.direction = 2),
                i = this.vthumb.outerWidth(!0),
                h = this.hthumb.outerHeight(!0),
                this.panel.css({
                    width: "calc(100% - " + i + "px)",
                    height: "calc(100% - " + h + "px)"
                }),
                this.options.captureScroll)
                    this.panel.on("mousewheel", this.direction, n.cms.scrollbar.wheelcapture);
                else
                    this.panel.on("mousewheel", this.direction, n.cms.scrollbar.wheel);
                this.vmargin = null;
                this.hmargin = null;
                this._update = n.proxy(this.update, this);
                this.element.on("update", this._update);
                n(window).on("resize.scrollbar", this._update);
                this._update()
            }
        },
        _setVScroll: function(n, t) {
            var u, e = this.vthumb[0], i = this.panel[0], o = t.position.top, f = i.scrollHeight, r = i.offsetHeight;
            f > r && (this.vmargin === null && this.updateMargin(),
            u = o / (r - e.offsetHeight - this.vmargin),
            i.scrollTop = Make.Int((f - r) * u))
        },
        _setHScroll: function(n, t) {
            var u, e = this.hthumb[0], i = this.panel[0], o = t.position.left, f = i.scrollWidth, r = i.offsetWidth;
            f > r && (this.hmargin === null && this.updateMargin(),
            u = o / (r - e.offsetWidth - this.hmargin),
            i.scrollLeft = Make.Int((f - r) * u))
        },
        updateMargin: function() {
            this.vmargin = Make.Int(this.vthumb.css("marginTop")) + Make.Int(this.vthumb.css("marginBottom"));
            this.hmargin = Make.Int(this.hthumb.css("marginLeft")) + Make.Int(this.hthumb.css("marginRight"))
        },
        update: function() {
            var n = this.panel[0]
              , t = this.vthumb[0]
              , o = n.scrollTop
              , f = n.scrollHeight
              , i = n.offsetHeight
              , r = this.hthumb[0]
              , s = n.scrollLeft
              , e = n.scrollWidth
              , u = n.offsetWidth;
            return f > i ? (this.vmargin === null && this.updateMargin(),
            t.style.height = Make.Int(i / f * i) - this.vmargin + "px",
            t.style.top = Make.Int(o / f * i) + "px",
            t.style.display = "block") : t.style.display = "none",
            e > u ? (this.hmargin === null && this.updateMargin(),
            r.style.width = Make.Int(u / e * u) - this.vmargin + "px",
            r.style.left = Make.Int(s / e * u) + "px",
            r.style.display = "block") : r.style.display = "none",
            !1
        },
        _destroy: function() {
            Modernizr.cssscrollbar || (this.vthumb.remove(),
            this.hthumb.remove(),
            this.element.off("update", this._update),
            n(window).off("resize.scrollbar", this._update),
            n.cms.scrollbar.unwrap(this.element.removeClass("cms-scrollbar")))
        }
    });
    n.extend(n.cms.scrollbar, {
        wheel: function(t, i, r) {
            var s, e = t.data === 2 ? 0 : t.deltaY * t.deltaFactor, f = t.data === 1 ? 0 : t.deltaX * t.deltaFactor, u = t.target, o = !1;
            for (isNaN(e) && (e = t.delta * 70),
            isNaN(f) && (f = 0),
            t.data !== 2 || f || e || !t.deltaY || (f = t.deltaY * t.deltaFactor * -1); ; ) {
                if (s = u.scrollTop,
                left = u.scrollLeft,
                u.scrollTop -= e,
                u.scrollLeft += f,
                u.scrollTop != s || u.scrollLeft != left) {
                    n(u).closest(".ui-scroll").trigger("update");
                    o = !0;
                    break
                } else
                    i && u.scrollHeight > u.offsetHeight && (o = !0);
                if (u !== this && u.parentNode && t.parentNode !== document.body)
                    u = u.parentNode;
                else
                    break
            }
            return r === !0 ? StopAll(t) : i && o ? StopAll(t) : o ? !1 : void 0
        },
        wheelcapture: function(t) {
            n.cms.scrollbar.wheel.apply(this, [t, !0])
        },
        wheelgreedy: function(t) {
            n.cms.scrollbar.wheel.apply(this, [t, !0, !0])
        },
        wrap: function(t) {
            var u, f, i, r, e;
            if (t && t.is(".ui-scroll") && !t.is(".ui-scroll-wrap,.ui-scroll-inner"))
                return u = t[0].parentNode,
                f = u.getAttribute("style"),
                u.style.display = "none",
                i = t[0].currentStyle || window.getComputedStyle(t[0]),
                r = /absolute|fixed|relative/i.test(i.position),
                e = {
                    display: i.display,
                    position: r ? i.position : "relative",
                    top: r ? i.top : "auto",
                    right: r ? i.right : "auto",
                    bottom: r ? i.bottom : "auto",
                    left: r ? i.left : "auto",
                    width: i.width,
                    height: i.height,
                    marginTop: i.marginTop,
                    marginRight: i.marginRight,
                    marginBottom: i.marginBottom,
                    marginLeft: i.marginLeft,
                    borderTopColor: i.borderTopColor,
                    borderTopStyle: i.borderTopStyle,
                    borderTopWidth: i.borderTopWidth,
                    borderRightColor: i.borderRightColor,
                    borderRightStyle: i.borderRightStyle,
                    borderRightWidth: i.borderRightWidth,
                    borderBottomColor: i.borderBottomColor,
                    borderBottomStyle: i.borderBottomStyle,
                    borderBottomWidth: i.borderBottomWidth,
                    borderLeftColor: i.borderLeftColor,
                    borderLeftStyle: i.borderLeftStyle,
                    borderLeftWidth: i.borderLeftWidth,
                    borderRadius: i.borderRadius,
                    clear: i.clear,
                    padding: 0,
                    float: i.float,
                    overflow: "visible"
                },
                u.setAttribute("style", f),
                t.data("originalStyle", t.attr("style")),
                t.css({
                    position: "relative",
                    top: "auto",
                    right: "auto",
                    bottom: "auto",
                    left: "auto",
                    width: "100%",
                    height: "100%",
                    margin: 0,
                    border: 0,
                    borderRadius: 0,
                    clear: "none",
                    float: "none",
                    overflow: "hidden"
                }),
                n('<div class="ui-scroll-wrap"><\/div>').css(e).insertBefore(t.addClass("ui-scroll-inner")).append(t)
        },
        unwrap: function(n) {
            var t, i;
            n.is("ul.ui-scroll-inner") && (t = n.parent(".ui-scroll-wrap"),
            i = n.data("originalStyle"),
            t.length) && (n.insertBefore(t),
            t.remove(),
            n.attr("style", i || "").removeData("originalStyle").removeClass("ui-scroll-inner"))
        }
    });
    n.fn.captureScroll = function(t) {
        return this.is(".horizontal") ? this.on("mousewheel", 2, n.cms.scrollbar[t ? "wheelgreedy" : "wheelcapture"]) : this.on("mousewheel", n.cms.scrollbar[t ? "wheelgreedy" : "wheelcapture"])
    }
    ;
    n.fn.shtml = function(n) {
        var t = this;
        return n === undefined ? (t.is(".ui-scroll-wrap") && (t = t.children(".ui-scroll-inner")),
        t.html()) : (t.filter(".ui-scroll-wrap").children(".ui-scroll-inner").html(n),
        t.filter(".ui-scroll-inner").html(n),
        t.filter(":not(.ui-scroll-wrap)").html(n),
        t.closest(".ui-scroll").trigger("update"),
        this)
    }
    ;
    window.register && window.register("c/scrollbar")
});
window.registerLoading && registerLoading("c/loading"),
function(n) {
    typeof rrequire == "function" ? rrequire(["j/jquery", "j/jquery.ui", "static", "c/scrollbar"], n) : n(jQuery)
}(function(n) {
    n.widget("cms.loading", {
        options: {
            modal: !0,
            fadeOut: 200
        },
        _create: function() {
            var r, t, i, u;
            this.loading || (this.startTime = performance.now(),
            this.options.modal && (this.origPosition = this.element[0].style.position,
            this.element.css("position") === "static" && this.element[0] !== document.body && this.element.css({
                position: "relative"
            }),
            r = this.element.children(".ui-front:visible").map(function() {
                return +n(this).css("z-index")
            }).get(),
            t = Math.max.apply(null, r),
            i = this.element.is("body") ? "fixed" : "absolute",
            n.cms.scrollbar.wrap(this.element),
            u = "ui-widget-overlay ui-front " + (this.options.overlayClass || ""),
            this.overlay = n('<div class="' + u + '"><\/div>').css({
                position: i
            }).appendTo(this.element),
            t >= +this.overlay.css("z-index") && this.overlay.css({
                zIndex: t + 1
            }),
            this.loading = n(n.cms.loading.html).css({
                position: i
            }).appendTo(this.element),
            this.options.large && this.loading.addClass("large"),
            t >= +this.loading.css("z-index") && this.loading.css({
                zIndex: t + 1
            })),
            this.element.removeClass("loaded").addClass("ui-loader loading"))
        },
        done: function() {
            var t;
            if (!this.options.modal) {
                this.destroy();
                return
            }
            if (!this.options.fadeOut) {
                this.destroy();
                return
            }
            if (t = performance.now() - this.startTime,
            t < 250) {
                this.destroy();
                return
            }
            this.element.removeClass("loading").addClass("loaded");
            this.overlay && this.overlay.animate({
                opacity: 0
            }, this.options.fadeOut);
            this.loading && this.loading.animate({
                opacity: 0
            }, this.options.fadeOut);
            setTimeout(n.proxy(this.destroy, this), this.options.fadeOut)
        },
        _destroy: function() {
            this.element.removeClass("loading").addClass("loaded");
            this.overlay && (this.overlay.remove(),
            this.overlay = null);
            this.loading && (this.loading.remove(),
            this.loading = null);
            this.options.modal && (this.element.is(".cms-scrollbar") || n.cms.scrollbar.unwrap(this.element),
            this.element[0].style.position = this.origPosition || "")
        }
    });
    n.cms.loading.html = '<div class="cms-fancy-loader ui-front"><div class="cms-fancy-border"><\/div><\/div>';
    window.register && window.register("c/loading")
});
window.registerLoading && registerLoading("m/date"),
function(n) {
    typeof rrequire == "function" ? rrequire(["j/jquery", "j/jquery.ui", "static", "extensions", "j/ui.wheel", "j/jquery.cookie", "j/timezone"], n) : n(jQuery)
}(function(n) {
    function t() {
        var i = new Date
          , r = n('<div class="cms-popunder cms-datepicker ui-noselect cms-d cms-t">\t<div class="cms-date">\t\t<div class="cms-date-years" data-segment="years"><ul><li>2000<\/li><li>2000<\/li><li class="active">2000<\/li><li>2000<\/li><li>2000<\/li><\/ul><\/div>\t\t<ul class="cms-date-months" data-segment="months"><li>Jan<\/li><li>Feb<\/li><li>Mar<\/li><li>Apr<\/li><li>May<\/li><li>Jun<\/li><li>Jul<\/li><li>Aug<\/li><li>Sep<\/li><li>Oct<\/li><li>Nov<\/li><li>Dec<\/li><\/ul>\t\t<ul class="cms-date-days weekdays">\t\t\t<li>S<\/li><li>M<\/li><li>T<\/li><li>W<\/li><li>T<\/li><li>F<\/li><li>S<\/li>\t\t<\/ul>\t\t<ul class="cms-date-days" data-segment="days"><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><li> <\/li><\/ul>\t<\/div>\t<div class="cms-time">\t\t<time data-segment="time">\t\t\t<strong>10:14<\/strong>\t\t\t<span>PM<\/span>\t\t<\/time>\t\t<h3>Hour<\/h3>\t\t<div class="cms-time-drag hours" data-segment="hours">\t\t\t<ul><li><\/li><li><\/li><li><\/li><li><\/li><li><\/li><li><\/li><li><\/li><li><\/li><li><\/li><li><\/li><li><\/li><\/ul>\t\t\t<span><\/span>\t\t<\/div>\t\t<h3>Minute<\/h3>\t\t<div class="cms-time-drag minutes" data-segment="minutes">\t\t\t<ul><li><\/li><li><\/li><li><\/li><li><\/li><\/ul>\t\t\t<span><\/span>\t\t<\/div>\t\t<ul class="cms-time-ampm">\t\t\t<li>\t\t\t\t<input type="radio" name="datepicker$ampm" class="cms" value="AM" id="date_picker_am">\t\t\t\t<label class="cms-replace" for="date_picker_am"><\/label>\t\t\t\t<label class="cms" for="date_picker_am">AM<\/label>\t\t\t<\/li>\t\t\t<li>\t\t\t\t<input type="radio" name="datepicker$ampm" class="cms" value="PM" id="date_picker_pm">\t\t\t\t<label class="cms-replace" for="date_picker_pm"><\/label>\t\t\t\t<label class="cms" for="date_picker_pm">PM<\/label>\t\t\t<\/li>\t\t<\/ul>\t\t<h3>Time Zone<\/h3>\t\t<p>Pacific Standard Time<\/p>\t<\/div>\t<div class="cms-date-footer">        <a class="cms-simple" href="javascript:void(\'Today\');" tabindex="-1">Today<\/a>\t\t<a class="cms-simple right" href="javascript:void(\'Reset\');" tabindex="-1">Reset<\/a>\t\t<button class="button" type="button" tabindex="-1">Save<\/button>\t<\/div><\/div>').captureScroll(!0)
          , s = r.find(".cms-date-years ul li")
          , v = r.find(".cms-date-months li")
          , a = r.find(".cms-date-days:eq(1) li")
          , y = r.find("time>*")
          , c = r.find(".cms-time-drag.hours span ")
          , l = r.find(".cms-time-drag.minutes span ")
          , p = r.find(".cms-time-ampm input:radio")
          , b = r.find(".cms-time p")
          , e = !1
          , w = {}
          , f = null
          , o = null;
        t.isOpen = function() {
            return e
        }
        ;
        this.date = function(n) {
            if (n === undefined)
                return i;
            i = Make.DateTime(n) || new Date
        }
        ;
        this.options = function(t) {
            if (t === undefined)
                return w;
            n.isPlainObject(t) && (n.extend(w, t),
            this.update())
        }
        ;
        this.open = function(t, u) {
            if (e) {
                if (t === f)
                    return;
                n.cms.date.picker.close()
            }
            if (e = !0,
            t) {
                if (t.jquery)
                    if (t.length)
                        t = t[0];
                    else
                        return;
                if (t.nodeType === 1 && t.parentNode) {
                    switch (t.getAttribute("type")) {
                    case "time":
                        r.removeClass("cms-d").addClass("cms-t");
                        break;
                    case "datetime":
                    case "datetime-local":
                        r.addClass("cms-d cms-t");
                        break;
                    case "date":
                    default:
                        r.addClass("cms-d").removeClass("cms-t")
                    }
                    n.cms.date.picker.options(u);
                    t.parentNode.appendChild(r[0]);
                    f = t;
                    o = f.value;
                    i = new Date;
                    i.parse(o) || t.getAttribute("type") != "time" || i.parse("1/1/1900 " + o);
                    n.cms.date.picker.update();
                    n.cms.date.picker.updateTime();
                    b.text(jstz.olson.friendly[n.cookie("_tz")] || "Pacific Standard Time");
                    n(f).on("change.datepicker", this.update);
                    n(document).on("keydown.datepicker", function(t) {
                        t.which === n.ui.keyCode.ESCAPE && n.cms.date.picker.close()
                    });
                    n(document).on("focusin.datepicker", function(t) {
                        t.target === f || n.contains(r[0], t.target) || n.contains(t.target, r[0]) || n.cms.date.picker.close()
                    });
                    if (n.cms.date.picker._onClick = function(t) {
                        if (r[0] !== t.target && !n.contains(r[0], t.target))
                            return f.parentNode === t.target || n.contains(f.parentNode, t.target) ? void 0 : (n.cms.date.picker.close(),
                            !1)
                    }
                    ,
                    document.addEventListener)
                        document.addEventListener("click", n.cms.date.picker._onClick, !0);
                    else
                        n(document).on("click.datepicker", n.cms.date.picker._onClick)
                }
            }
        }
        ;
        this.close = function() {
            e && (e = !1,
            r[0].parentNode && r[0].parentNode.removeChild(r[0]),
            f && f.value !== o && n(f).blur().off(".datepicker").trigger("change"),
            f = null,
            o = null,
            n(document).off(".datepicker"),
            document.removeEventListener && n.cms.date.picker._onClick && document.removeEventListener("click", n.cms.date.picker._onClick, !0),
            n.cms.date.picker._onClick = null)
        }
        ;
        this.update = function() {
            for (var t, e = i.getFullYear() - 2, o = i.getMonth(), h = i.getDate(), f = s[0].parentNode, r = new Date(i), u = new Date(i), n = 0; n < 5; n++)
                s[n].childNodes[0].data = e + n,
                n === 2 ? s[n].classList.add("active") : s[n].classList.remove("active");
            for (f.scrollLeft = (f.scrollWidth - f.offsetWidth) / 2,
            n = 0; n < 12; n++)
                n === o ? v[n].classList.add("active") : v[n].classList.remove("active");
            for (r.setDate(1),
            r = r.getDay(),
            u.setDate(1),
            u = u.addMonths(1).addDays(-1).getDate(),
            n = 0; n < 42; n++)
                t = n + 1 - r,
                (t < 1 || t > u) && (t = ""),
                a[n].childNodes[0].data = t,
                t === h ? a[n].classList.add("active") : a[n].classList.remove("active")
        }
        ;
        this.updateTime = function() {
            var r, t = i.getHours() - 1, f = i.getMinutes(), e = c[0].parentNode.offsetWidth - c[0].offsetWidth, o = l[0].parentNode.offsetWidth - l[0].offsetWidth, u = t < 11;
            t >= 12 ? t -= 12 : t < 0 && (t = 11);
            r = e / 11 * t;
            mleft = o / 59 * f;
            c[0].style.left = r + "px";
            l[0].style.left = mleft + "px";
            p[0].checked = u;
            p[1].checked = !u;
            n.cms.date.picker.updateTimeString()
        }
        ;
        this.updateTimeString = function() {
            var n = i.formatted("h:mm tt").split(" ");
            y[0].childNodes[0].data = n[0];
            y[1].childNodes[0].data = n[1]
        }
        ;
        this.sync = function() {
            Date.setInputValue(f, i)
        }
        ;
        r.on("click.datepicker", function(t) {
            var r, o, s = Get.LinkData(t), h = n(t.target), c = h.text(), e = +c, l = !1;
            if (s.action)
                switch (s.action) {
                case "Today":
                    i = new Date;
                    n.cms.date.picker.updateTime();
                    break;
                case "Reset":
                    n(f).val("");
                    n.cms.date.picker.close();
                    break;
                case "Reset Date":
                    r = new Date;
                    i.setFullYear(r.getFullYear());
                    i.setMonth(r.getMonth());
                    i.setDate(r.getDate());
                    break;
                case "Reset Time":
                    r = new Date;
                    i.setHours(r.getHours(), r.getMinutes(), r.getSeconds());
                    n.cms.date.picker.updateTime();
                    break;
                default:
                    return
                }
            else if (e > 0 && e <= 31)
                l = !0,
                i.setDate(e);
            else if (e > 1900 && e < 3e3)
                i.setYear(e);
            else {
                if (o = u[c],
                o === undefined)
                    return h.is("button") ? (n.cms.date.picker.sync(),
                    n.cms.date.picker.close(),
                    StopAll(t)) : void 0;
                i.setMonths(o)
            }
            return n.cms.date.picker.sync(),
            n.cms.date.picker.update(),
            l && f && f.getAttribute("type") === "date" && n.cms.date.picker.close(),
            StopAll(t)
        });
        r.on("change.datepicker", function(t) {
            var r = n(t.target).val();
            if (h = i.getHours(),
            r === "AM" && h > 12)
                i.setHours(h - 12);
            else if (r === "PM" && h < 12)
                i.setHours(h + 12);
            else
                return;
            n.cms.date.picker.sync();
            n.cms.date.picker.update();
            n.cms.date.picker.updateTimeString()
        });
        r.find("[data-segment]").on("mousewheel", function(t) {
            var e, o = t.deltaY || t.deltaX, r = -o, u = new Date(i), f = !1;
            switch (this.getAttribute("data-segment")) {
            case "days":
                i.addDays(r);
                break;
            case "months":
                i.addMonths(r);
                break;
            case "years":
                i.addYears(r);
                break;
            case "hours":
                i.setHours(i.getHours() + r);
                f = !0;
                break;
            case "minutes":
                i.setMinutes(i.getMinutes() + r);
                f = !0;
                break;
            case "time":
                e = i.getMinutes() + r * 5;
                i.setMinutes(Math.round(e / 5) * 5);
                f = !0;
                break;
            default:
                return
            }
            f && ((u.getDate() != i.getDate() || u.getMonth != i.getMonth() || u.getFullYear() != i.getFullYear()) && (i.setFullYear(u.getFullYear()),
            i.setMonth(u.getMonth()),
            i.setDate(u.getDate())),
            n.cms.date.picker.updateTime());
            n.cms.date.picker.sync();
            n.cms.date.picker.update()
        });
        c.draggable({
            axis: "x",
            containment: "parent",
            start: function(n, t) {
                t.helper.elWidth = t.helper[0].parentNode.offsetWidth - t.helper[0].offsetWidth
            },
            drag: function(t, r) {
                var u = Math.round(r.position.left / r.helper.elWidth * 11);
                r.position.left = r.helper.elWidth / 11 * u;
                u++;
                i.setHours(u);
                n.cms.date.picker.sync();
                n.cms.date.picker.updateTimeString()
            }
        });
        l.draggable({
            axis: "x",
            containment: "parent",
            start: function(n, t) {
                t.helper.elWidth = t.helper[0].parentNode.offsetWidth - t.helper[0].offsetWidth
            },
            drag: function(t, r) {
                var u = Math.round(r.position.left / r.helper.elWidth * 59);
                t.shiftKey && (u = Math.round(u / 15) * 15,
                r.position.left = r.helper.elWidth / 60 * u,
                u > 59 && (u = 59));
                i.setMinutes(u);
                n.cms.date.picker.sync();
                n.cms.date.picker.updateTimeString()
            }
        })
    }
    n.cms || (n.cms = {});
    n.cms.date = {
        picker: null,
        isOpen: function() {
            return t.isOpen && t.isOpen()
        },
        choose: function(i, r) {
            n.cms.date.picker || (n.cms.date.picker = new t);
            n.cms.date.picker.open(i, r)
        }
    };
    Date.prototype.weekStart = function() {
        var n = this.getDay();
        switch (n) {
        case 0:
            this.addDays(-6);
            break;
        case 1:
            break;
        default:
            this.addDays(1 - n)
        }
        return this
    }
    ;
    Date.prototype.parse = function(n) {
        if (n) {
            var t = Date.parse(n);
            if (isNaN(t))
                return !1;
            t = new Date(t);
            /^\d{4}\-\d{2}\-\d{2}($|T\d{2}:\d{2})/.test(n) && (/([\-+]\d?\d:\d\d|Z)$/i.test(n) || t.setMinutes(t.getMinutes() + t.getTimezoneOffset()));
            this.setDate(1);
            this.setFullYear(t.getFullYear());
            this.setMonth(t.getMonth());
            this.setDate(t.getDate());
            this.setHours(t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds())
        }
        return this
    }
    ;
    var i = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      , r = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      , u = {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12
    };
    Date.prototype.formatted = function(n) {
        var e = new Date(this);
        e.setMinutes(e.getMinutes() - e.getTimezoneOffset());
        var o, t = e.toJSON(), l = t.slice(0, 4), s = t.slice(5, 7), h = t.slice(8, 10), u = t.slice(11, 13), f = +u, a = t.slice(14, 16), v = t.slice(17, 19), c = t.slice(20, 23), y = this.getDay();
        return (n || "M/d/yyyy").replace(/\\.|y{2,4}|M{1,4}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|t{1,2}|T{1,2}|f{1,3}|rr|RR|ZZZ/g, function(n) {
            switch (n) {
            case "yy":
                return l.slice(2, 4);
            case "yyyy":
                return l;
            case "M":
                return +s;
            case "MM":
                return s;
            case "MMM":
                return r[+s - 1].slice(0, 3);
            case "MMMM":
                return r[+s - 1];
            case "d":
                return +h;
            case "dd":
                return h;
            case "ddd":
                return i[y].slice(0, 3);
            case "dddd":
                return i[y];
            case "H":
                return +u;
            case "HH":
                return u;
            case "h":
                return f === 0 ? 12 : f > 12 ? f - 12 : f;
            case "hh":
                return f < 10 ? "0" + f : f;
            case "m":
                return +a;
            case "mm":
                return a;
            case "s":
                return +v;
            case "ss":
                return v;
            case "t":
                return u > 11 ? "p" : "a";
            case "tt":
                return u > 11 ? "pm" : "am";
            case "T":
                return u > 11 ? "P" : "A";
            case "TT":
                return u > 11 ? "PM" : "AM";
            case "f":
                return c.slice(0, 1);
            case "ff":
                return c.slice(0, 2);
            case "fff":
                return c;
            case "rr":
            case "RR":
                o = n === "RR";
                switch (Make.Int(h)) {
                case 1:
                case 21:
                case 31:
                    return o ? "ST" : "st";
                case 2:
                case 22:
                    return o ? "ND" : "nd";
                case 3:
                case 23:
                    return o ? "RD" : "rd";
                default:
                    return o ? "TH" : "th"
                }
                break;
            case "ZZZ":
                return Date.timeZoneAbbreviation ? Date.timeZoneAbbreviation(e) : "";
            default:
                return n[0] === "\\" ? n[1] : n
            }
        })
    }
    ;
    Date.isLeapYear = function(n) {
        return n % 4 == 0 && n % 100 != 0 || n % 400 == 0
    }
    ;
    Date.getDaysInMonth = function(n, t) {
        return [31, Date.isLeapYear(n) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
    }
    ;
    Date.prototype.isLeapYear = function() {
        return Date.isLeapYear(this.getFullYear())
    }
    ;
    Date.prototype.getDaysInMonth = function() {
        return Date.getDaysInMonth(this.getFullYear(), this.getMonth())
    }
    ;
    Date.prototype.addYears = function(n) {
        return !n || isNaN(n = +n) ? this : (this.setFullYear(this.getFullYear() + n),
        this)
    }
    ;
    Date.prototype.addMonths = function(n) {
        var t = this.getDate();
        return !n || isNaN(n = +n) ? this : (this.setMonth(this.getMonth() + n),
        t = Math.max(0, Math.min(this.getDaysInMonth(), t)),
        this.setDate(t),
        this)
    }
    ;
    Date.prototype.addDays = function(n) {
        return !n || isNaN(n = +n) ? this : (this.setDate(this.getDate() + n),
        this)
    }
    ;
    Date.prototype.setYears = function(n) {
        var t = this.getDate();
        if (n && !isNaN(n = +n))
            return this.setDate(1),
            this.setFullYear(n),
            t = Math.max(0, Math.min(this.getDaysInMonth(), t)),
            this.setDate(t),
            this
    }
    ;
    Date.prototype.setMonths = function(n) {
        var t = this.getDate();
        if (n && !isNaN(n = +n))
            return this.setDate(1),
            n = Math.max(1, Math.min(12, n)),
            this.setMonth(n - 1),
            t = Math.max(0, Math.min(this.getDaysInMonth(), t)),
            this.setDate(t),
            this
    }
    ;
    Date.prototype.setDays = function(n) {
        if (n && !isNaN(n = +n))
            return n = Math.max(0, Math.min(this.getDaysInMonth(), n)),
            this.setDate(n),
            this
    }
    ;
    Date.prototype.set = function(n, t, i, r, u, f) {
        return this.setYears(n),
        this.setMonths(t),
        this.setDays(i),
        r = Math.max(0, Math.min(23, +r || 0)),
        u = Math.max(0, Math.min(59, +u || 0)),
        f = Math.max(0, Math.min(59, +f || 0)),
        this.setHours(r, u, f, 0),
        this
    }
    ;
    Date.setInputValue = function(n, t) {
        if (t = Make.DateTime(t),
        n) {
            if (!t) {
                n.value = "";
                return
            }
        } else
            return;
        switch (n.getAttribute("type")) {
        case "date":
            n.value = Modernizr.inputtypes.date ? t.formatted("yyyy-MM-dd") : t.formatted("M/d/yyyy");
            break;
        case "time":
            n.value = Modernizr.inputtypes.time ? t.formatted("HH:mm") : t.formatted("h:mm tt");
            break;
        case "datetime":
            n.value = Modernizr.inputtypes.datetime ? t.toJSON() : t.formatted("M/d/yyyy h:mm tt");
            break;
        case "datetime-local":
            n.value = Modernizr.inputtypes["datetime-local"] ? t.formatted("yyyy-MM-dd\\THH:mm") : t.formatted("M/d/yyyy h:mm tt");
            break;
        default:
            typeof n.value != "undefined" && (n.value = t.formatted("M/d/yyyy"))
        }
    }
    ;
    window.register && window.register("m/date")
});
window.registerLoading && registerLoading("form"),
function(n) {
    typeof rrequire == "function" ? rrequire(["j/jquery", "j/jquery.ui", "j/ui.touch", "m/date", "extensions", "c/loading", "behaviors", "m/masked"], n) : n(jQuery)
}(function(n) {
    var f = function(n, t) {
        return (window.JSON2 || JSON).parse(n, t)
    }
      , e = {
        badInput: !1,
        compareMismatch: !1,
        customError: !1,
        notUnique: !1,
        patternMismatch: !1,
        rangeOverflow: !1,
        rangeUnderflow: !1,
        stepMismatch: !1,
        tooLong: !1,
        tooShort: !1,
        typeMismatch: !1,
        valid: !0,
        valueMissing: !1
    }
      , r = function(n) {
        var t = (new Date).parse(n);
        return n && typeof n == "string" && t && (t = t.getFullYear(),
        t > 1753 && t < 9999) ? [n] : null
    }
      , o = function(n) {
        var i, r, u, t;
        if (n && /[x\-]{10,16}\d{3,6}/.exec(n) == n)
            return !0;
        if (n = (n || "").replace(/\D+/g, ""),
        n.length < 15 || n.le > 16)
            return null;
        for (i = n.length,
        r = 0,
        u = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
        t = 0; i--; )
            t += u[r][parseInt(n.charAt(i), 10)],
            r ^= 1;
        return t && t % 10 == 0
    }
      , u = {
        email: /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i,
        url: /^(((ht|f)tp(s?))\:\/\/)?(www.|[a-zA-Z0-9].)[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,6}(\:[0-9]+)*(\/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$/i,
        number: /\d+/,
        date: {
            exec: r
        },
        datetime: {
            exec: r
        },
        "datetime-local": {
            exec: r
        },
        time: {
            exec: r
        }
    }
      , i = {
        get: function(t) {
            var i, r, u = t.getAttribute("id");
            return u ? (i = n(t).find("input[id^='" + u + "_']").filter(":checkbox,:radio"),
            !i.length) ? undefined : (r = [],
            i.filter(":checked").each(function() {
                r.push(n(this).val())
            }),
            r.join(",")) : undefined
        },
        set: function(t, i) {
            var r = t.getAttribute("id")
              , u = !1;
            if (r)
                return i = Make.Array(i),
                n(t).find("input[id^='" + r + "_']").filter(":checkbox,:radio").each(function() {
                    var t = n(this);
                    i.indexOf(t.val()) >= 0 && (t.is(":checkbox") || !u) ? (t.prop("checked", !0),
                    u = !0) : t.prop("checked", !1)
                }),
                i
        }
    }
      , t = {
        shiftKey: !1,
        altKey: !1,
        ctrlKey: !1
    };
    document.addEventListener && (document.addEventListener("keydown", function(n) {
        t.shiftKey = n.shiftKey;
        t.altKey = n.altKey;
        t.ctrlKey = n.ctrlKey
    }, !0),
    document.addEventListener("keyup", function(n) {
        t.shiftKey = n.shiftKey;
        t.altKey = n.altKey;
        t.ctrlKey = n.ctrlKey
    }, !0));
    n.valHooks.div = i;
    n.valHooks.ul = i;
    n.valHooks.ol = i;
    n.valHooks.dl = i;
    n.valHooks.table = i;
    n.valHooks.input = {
        set: function(n, t) {
            switch (n.getAttribute("type")) {
            case "date":
            case "time":
            case "datetime":
            case "datetime-local":
                return Date.setInputValue(n, t),
                t
            }
        }
    };
    n.html5form = {
        validate: function(t, i, r) {
            var l, h, d, w, g, b = Modernizr.input.required ? t.prop("required") : !!t.attr("required"), v = t.data("conditional"), nt = t.data("conditionalValue"), tt = t.data("conditionalNotValue"), a = t.prop("pattern") || t.attr("pattern"), it = t.prop("min") || Make.Int(t.attr("min")), rt = t.prop("max") || Make.Int(t.attr("max")), st = t.prop("step") || Make.Int(t.attr("step")), o = t.val(), ft = t.attr("placeholder"), k = t.data("compare"), et = t.data("unique"), ot = k && n("#" + k).val(), ut = t.data("customValidator"), y = t.closest("li").length > 0 ? t.closest("li") : t.closest(".input-text, .input-select, .input-mark, .input-html"), c = t.attr("name") && t.attr("name").split("$").pop().replace(/([a-z])([A-Z])/g, "$1 $2"), s = t.data("alert"), f = n.extend({}, e), p;
            if (!t.is(".ui-novalidate"))
                if (t.is(":checkbox,:radio") && (l = i.find("input[name='" + t.attr("name") + "']"),
                l.length > 1 && (y = l.not(t).parentsUntil(i).filter("li").has(t).first()),
                t.is(":checked") ? !o && t.is(":checkbox") && (o = "on") : o = null),
                v && (v = i.find("#" + v).is(":checkbox") ? i.find("#" + v).prop("checked") : i.find("#" + v).val(),
                nt ? h = Behaviors.Conditional.Match(v, nt) : tt && (h = !Behaviors.Conditional.Match(v, tt)),
                h ? (Modernizr.input.required && (l || t).prop("required", !0),
                (l || t).attr("required", "required"),
                b = !0) : (Modernizr.input.required && (l || t).prop("required", !1),
                (l || t).removeAttr("required"),
                b = !1)),
                b && (!o || o === ft) ? t.is(":checkbox,:radio") && l.filter(":checked").length || (f.valid = !1,
                f.valueMissing = !0,
                s || (s = c + " is required")) : a && !n.html5form._pattern(t, a, o) ? (f.valid = !1,
                f.patternMismatch = !0,
                s || (s = c + " is not valid")) : k && o != ot ? (f.valid = !1,
                f.compareMismatch = !0,
                s || (s = c + " does not match")) : et && !1 || (ut && !n.html5form._custom(t, ut, o) ? (f.valid = !1,
                f.customError = !0,
                s || (s = c + " has an invalid value.")) : Modernizr.formvalidation ? (a = u[t.attr("type")],
                t.length && t[0].checkValidity && !t[0].checkValidity() ? (n.extend(f, t[0].validity),
                s || (s = c + " is not valid")) : t.length && o && a && (h = a.exec(o),
                h && h.length && h[0] === o || (f.valid = !1,
                f.typeMismatch = !0))) : it && Make.Float(o) < Make.Float(it) ? (f.valid = !1,
                f.rangeUnderflow = !0,
                s || (s = c + " is too low")) : rt && Make.Float(o) > Make.Float(rt) ? (f.valid = !1,
                f.rangeOverflow = !0,
                s || (s = c + " is too high")) : (a = u[t.attr("type")],
                o && a && (h = a.exec(o),
                h && h.length && h[0] === o || (f.valid = !1,
                f.typeMismatch = !0)))),
                c = (t.attr("name") || "").replace(/\$/g, "_") || t.attr("id"),
                d = y.find(".validation[for='" + c + "']").hide(),
                f.valid) {
                    if (y.removeClass("invalid"),
                    o && y.addClass("valid"),
                    t = i.find("input[data-compare='" + t.attr("id") + "']"),
                    t.val())
                        return n.html5form.validate(t, i, r)
                } else {
                    y.removeClass("valid").addClass("invalid");
                    for (p in f)
                        if (p != "valid" && f.hasOwnProperty(p) && f[p] === !0) {
                            if (!r && p === "valueMissing" && (w = i.find("li.invalid"),
                            g = w.index(y),
                            w = w.slice(0, g),
                            w.find(".validation:visible").length))
                                break;
                            d.filter("[data-type='" + p + "']").show();
                            break
                        }
                    return {
                        error: t,
                        alert: s
                    }
                }
        },
        validateGroup: function(t, i, r) {
            var s, h, f, e, l, c, a = [], v = {}, u = null, o, y;
            if (t && t[0] && t[0].getAttribute("data-html5") === "1" && window.$8 && $8.FORM && $8.FORM.Init)
                return t[0].reportValidity();
            for (i || (i = t.find(":input:not(.ui-dialog-titlebar-close,.ui-novalidate,button)")),
            o = 0,
            y = i.length; o < y; o++) {
                if (s = i.eq(o),
                h = s.attr("name"),
                v[h])
                    continue;
                else
                    v[h] = !0;
                f = n.html5form.validate(s, t, !0);
                f && f.error && (u = u || f.error,
                f.alert && a.push(f.alert))
            }
            if (u) {
                !u.is(":visible") && (e = u.closest(".ui-tab-panel")).length && !e.is(".active") && (l = e.data("tab")) && e.closest(".ui-tabs").find(".ui-tab[data-tab='" + l + "']:not(.active)").eq(0).click();
                r && !Modernizr.formvalidation && alert("The form is incomplete.\n" + a.join("\n"));
                u.scrollIntoView(1200);
                try {
                    u.focus()
                } catch (p) {}
                return !1
            }
            if (c = t.data("customValidation"),
            n.isFunction(c))
                return c.apply(this, arguments)
        },
        _pattern: function(n, t, i) {
            var u, r;
            try {
                u = new RegExp(t)
            } catch (f) {
                return console.log('Illegal RegExp - "' + t + '"'),
                !0
            }
            return i ? (r = u.exec(i),
            r && r[0] == i) : !0
        },
        _custom: function(t, i, r) {
            return typeof i == "string" && (i = n.html5form.customValidators[i]),
            i && n.isFunction(i) ? !!i(t, r) : void 0
        },
        customValidators: {
            ssn: function(n, t) {
                return t && /^(?!000)([0-6]\d{2}|7([0-6]\d|7[012]))([ -]?)(?!00)\d\d\3(?!0000)\d{4}$/.exec(t) === t
            },
            creditcard: function(n, t) {
                return t && o(t)
            }
        }
    };
    n.fn.html5form = function(i) {
        return this.filter(function() {
            return n(this).data("html5form") === undefined
        }).each(function() {
            var h;
            if (this.getAttribute("data-html5") === "1" && window.$8 && $8.FORM && $8.FORM.Init) {
                $8.FORM.Init(this);
                return
            }
            var c = "button[type='submit'],input[type='image'],input[type='submit']"
              , r = n(this).data("html5form", !0)
              , f = r.closest("form")
              , e = r.find(":input:not(.ui-dialog-titlebar-close,.ui-novalidate,button)")
              , o = null
              , u = !1
              , s = !1
              , a = function() {
                return s = !0,
                n.html5form.validateGroup(f, e, u)
            }
              , v = function() {
                if (!Modernizr.touch)
                    switch (this.getAttribute("type")) {
                    case "date":
                    case "datetime":
                    case "datetime-local":
                        n.cms.date.choose(this)
                    }
            }
              , y = function(t) {
                var r, e, h, l, y, i = n(t.target);
                switch (t.type) {
                case "focusin":
                    if (r = i.closest("li").length > 0 ? i.closest("li") : i.parent(),
                    r.is(".readonly"))
                        return StopAll(t);
                    r.addClass("focused");
                    Modernizr.placeholder || i.val() !== i.attr("placeholder") || i.val("");
                    v.call(t.target, arguments);
                    break;
                case "focusout":
                    r = i.closest("li").length > 0 ? i.closest("li") : i.parent();
                    r.removeClass("focused");
                    i.val() ? r.addClass("filled") : r.removeClass("filled");
                    Modernizr.placeholder || i.val() || !(placeholder = i.attr("placeholder")) || i.val(placeholder);
                    n.html5form.validate(i, f, s);
                    break;
                case "click":
                    o = null;
                    e = Get.LinkData(t);
                    switch (e.action) {
                    case "Expand":
                        n(e.link).closest("li").toggleClass("expand");
                        return
                    }
                    if (e.link ? i = n(e.link) : (i = n(t.target),
                    h = i.closest("button"),
                    h.length && (i = h)),
                    i.is(":disabled"))
                        return console.log("disabled"),
                        StopAll(t);
                    if (i.closest("li").is(".readonly"))
                        return StopAll(t);
                    if (l = i.data("confirm"),
                    l)
                        if (i.data("confirmed"))
                            i.data("confirmed", !1);
                        else
                            return $confirm(l, function() {
                                i.data("confirmed", !0);
                                i.click()
                            }),
                            StopAll(t);
                    if (i.is(c)) {
                        if (o = i,
                        i.prop("formnovalidate") === undefined && i.attr("formnovalidate") === undefined && a() === !1)
                            return u ? Modernizr.formvalidation ? void 0 : !1 : StopAll(t)
                    } else if (i.is("div"))
                        return (i = i.children("input:visible:first, textarea:visible:first"),
                        !i.length) ? void 0 : (y = n.cms.date.isOpen(),
                        i.focus(),
                        y ? n.cms.date.picker.close() : i.is("input[type='time']") && n.cms.date.choose(i[0]),
                        !1);
                    break;
                case "change":
                    return n(t.target).closest("li").is(".readonly") ? StopAll(t) : n.html5form.validate(i, f, s)
                }
            }
              , l = function(t) {
                var u, i;
                if (t && t.type === "reload" && (e = r.find(":input:not(.ui-dialog-titlebar-close,button)")),
                r.find(".cms-combobox").combobox(),
                r.find(".cms-uploader").uploader(),
                u = r.find(".cms-slide-captcha").slideCaptcha(),
                !u.length) {
                    r.find("input:hidden[id$='_FFD6']").val((new Date).getTime());
                    r.find(c).on("mousedown", function() {
                        r.find("input:hidden[id$='_FFD6']").val((new Date).getTime())
                    })
                }
                r.find(":input[data-masking]").masked();
                r.find("textarea[data-editor='ckeditor']").ckeditor().closest("li").find("a.expand").on("click", function() {
                    n(this).closest("li").find(".input-html").toggleClass("expand")
                });
                r.find("textarea[data-editor='ace']").ace();
                r.find("textarea[data-editor='ck']").ck();
                i = r.find("[data-ga-search]");
                i && i.length && rrequire("m/google-address-lookup", function() {
                    r.GoogleAddressLookup()
                })
            };
            i && i.useNative !== undefined ? u = !!i.useNative : r.find("li :input").length && r.find("li .validation").length || (u = !0);
            Modernizr.placeholder || r.find("input[placeholder]").each(function() {
                var t = n(this);
                t.val(t.attr("placeholder"))
            });
            h = {};
            e.filter("input:checkbox[required]").each(function() {
                var t = n(this).attr("name");
                if (h[t])
                    return f.attr("novalidate", "novalidate").prop("novalidate", !0),
                    u = !1,
                    !1;
                h[t] = 1
            });
            r.on("focusin focusout change click", y);
            if (!u)
                e.on("invalid", !1);
            r.on("reload", l);
            r.closest("form").on("submit", function() {
                if (document.activeElement)
                    try {
                        document.activeElement.blur()
                    } catch (i) {}
                o && o.data("noloading") || t.ctrlKey || this.getAttribute("data-search") || n(document.body).loading()
            });
            Modernizr.inputtypes.date || r.find("input[type]").each(function() {
                var n, t, i = this.getAttribute("type");
                switch (i) {
                case "date":
                    n = "M/d/yyyy";
                    break;
                case "time":
                    break;
                case "datetime":
                case "datetime-local":
                    n = "M/d/yyyy h:mm tt";
                    break;
                default:
                    return
                }
                Modernizr.inputtypes[i] || (t = Date.parse(this.value),
                isNaN(t) || (this.value = new Date(t).formatted(n)))
            });
            l();
            Behaviors.On()
        })
    }
    ;
    n.widget("cms.uploader", {
        options: {},
        _create: function() {
            var n = this;
            rrequire("c/uploadable", function() {
                n._setup()
            })
        },
        _setup: function() {
            var t = this.element.data("filetype") || CMS.Files.IMAGE
              , r = this.element.find("input:hidden")
              , n = r.val()
              , f = n && "." + n.split(".").pop()
              , u = /^http/.test(n) ? n : CMS.Files.getThumbnail("", n, f)
              , i = this.element.find("[data-role='thumbnail']")
              , e = !!this.element.data("s3");
            typeof t == "string" && (t = CMS.Files[t.toUpperCase()] || CMS.Files.IMAGE);
            this.element.uploadable({
                filetype: t,
                folder: this.element.data("folder"),
                input: r,
                thumbnail: i,
                dialog: !this.element.data("nodialog"),
                maxFiles: this.element.data("maxFiles") || 0,
                drop: this.element.find("[data-role='drop']"),
                browse: this.element.find("[data-role='browse']"),
                media: this.element.find("[data-role='media']"),
                cancel: this.element.find("[data-role='cancel']"),
                s3: e
            });
            i && i.length && u && (i.attr("src", u).addClass("show"),
            this.element.addClass("uploaded"));
            this._trigger("uploader")
        }
    });
    n.widget("cms.slideCaptcha", {
        options: {
            enabledAt: .7
        },
        _create: function() {
            this.submit = this.element.closest("form").find("button[type='submit'],button[type='image']").prop("disabled", !0);
            this.input = this.element.find("input:hidden");
            this.message = this.element.find("[data-role='message']");
            this.options.message = this.message.html();
            this.handle = this.element.find("[data-role='handle']").draggable({
                start: n.proxy(this._start, this),
                drag: n.proxy(this._drag, this),
                stop: n.proxy(this._stop, this)
            });
            this._enabled = !1
        },
        _start: function(n, t) {
            t.helper.w = this.handle.parent().outerWidth() - this.handle.width()
        },
        _drag: function(n, t) {
            var i = t.helper.w
              , r = Math.limit(t.position.left, 0, i)
              , u = i ? r / i : 0;
            t.position.top = 0;
            t.position.left = r;
            u > this.options.enabledAt && !this._enabled ? this.enable() : u <= this.options.enabledAt && this._enabled && this.disable()
        },
        _stop: function(n, t) {
            var i = t.helper.w
              , u = Math.limit(t.position.left, 0, i)
              , r = i ? u / i : 0;
            r > this.options.enabledAt && r < 1 ? t.helper.animate({
                left: i
            }, 150) : r > 0 && r <= this.options.enabledAt && t.helper.animate({
                left: 0
            }, 250)
        },
        enable: function() {
            this._enabled = !0;
            this.element.addClass("enabled");
            this.submit.prop("disabled", !1);
            this.input.val((new Date).getTime());
            this.message.length && this.message.html(this.message.data("enabled") || this.options.message)
        },
        disable: function() {
            this._enabled = !1;
            this.element.removeClass("enabled");
            this.submit.prop("disabled", !0);
            this.input.val("");
            this.message.length && this.message.html(this.options.message)
        }
    });
    n.widget("cms.ace", {
        _create: function() {
            var t = this.element.val(), i;
            t && t.indexOf("<") >= 0 && this.element.val(Encode.HTML(t));
            i = function() {
                this.element.onvisible(this._setup.bind(this));
                setTimeout(function() {
                    n(window).trigger("resize")
                }, 250)
            }
            .bind(this);
            rrequire(["ace"], i)
        },
        _setup: function() {
            var i = Compute.UUID()
              , t = this.element.data("ace");
            n.isPlainObject(t) || (t = {});
            this.state = {
                ctimer: 0,
                ptimer: 0
            };
            this.element.css({
                visibity: "hidden",
                opacity: 0
            });
            this.div = n("<div><\/div>").insertAfter(this.element);
            this.div.attr("id", i).css({
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%"
            });
            this.code = ace.edit(i);
            this.code.setTheme("ace/theme/dreamweaver");
            this.code.getSession().setMode(t.mode || "ace/mode/html");
            this.code.setSelectionStyle("text");
            this.code.setHighlightActiveLine(!0);
            this.code.setShowInvisibles(!1);
            this.code.setDisplayIndentGuides(!1);
            this.code.renderer.setShowGutter(!0);
            this.code.setPrintMarginColumn(!1);
            this.code.setHighlightSelectedWord(!0);
            this.code.renderer.setHScrollBarAlwaysVisible(!1);
            this.code.renderer.setVScrollBarAlwaysVisible(!0);
            this.code.setAnimatedScroll(!1);
            this.code.session.setUseSoftTabs(!1);
            this.code.setBehavioursEnabled(!0);
            this.code.setFadeFoldWidgets(!1);
            this.code.setReadOnly(!1);
            this.code.setOption("scrollPastEnd", !1);
            this.code.$blockScrolling = Infinity;
            this.code.on("focus", function() {
                this.dirty = !1
            }
            .bind(this));
            this.code.on("change", function(n, t) {
                var i;
                t.silent || (i = t.getValue(),
                this.element.val(Encode.HTML(i || "")),
                this.dirty = !0,
                this.element.trigger("input"))
            }
            .bind(this));
            this.code.on("blur", function() {
                this.dirty && (this.element.trigger("change"),
                this.dirty = !1);
                this.dirty = !1
            }
            .bind(this));
            this.update = function() {
                var n = Decode.HTML(this.element.val() || "");
                this.code.silent = !0;
                this.code.setValue(n || "", -1);
                this.code.focus();
                this.code.silent = !1
            }
            .bind(this);
            this.element.on("update", this.update);
            this.update();
            this.element[0].getValue = this.code.getValue.bind(this.code)
        },
        _destroy: function() {
            var n = this.element.attr("id");
            this.code.edit(n).destroy()
        }
    });
    n.widget("cms.ckeditor", {
        options: {
            properties: !1,
            toolbar: [{
                name: "basicstyles",
                items: ["Bold", "Italic", "Underline"]
            }, {
                name: "lists",
                items: ["NumberedList", "BulletedList"]
            }, {
                name: "links",
                items: ["Links", "Media"]
            }, {
                name: "spell",
                items: ["SpellChecker"]
            }, {
                name: "format",
                items: ["Format"]
            }, {
                name: "styles",
                items: ["Styles"]
            }, {
                name: "blocks",
                items: ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock", "Indent", "Outdent"]
            }, {
                name: "special",
                items: ["ShowBlocks"]
            }, {
                name: "clip",
                items: ["Undo", "Redo"]
            }, {
                name: "maximize",
                items: ["Maximize"]
            }],
            toolbarHTML: [{
                name: "basicstyles",
                items: ["Bold", "Italic", "Underline"]
            }, {
                name: "lists",
                items: ["NumberedList", "BulletedList"]
            }, {
                name: "links",
                items: ["Links", "Media"]
            }, {
                name: "blocks",
                items: ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock", "Indent", "Outdent"]
            }, {
                name: "spell",
                items: ["SpellChecker"]
            }, {
                name: "format",
                items: ["Format"]
            }, {
                name: "styles",
                items: ["Styles"]
            }, {
                name: "special",
                items: ["ShowBlocks"]
            }, {
                name: "clip",
                items: ["Undo", "Redo", "SourceEdit"]
            }, {
                name: "maximize",
                items: ["Maximize"]
            }],
            toolbarSimple: [{
                name: "basicstyles",
                items: ["Bold", "Italic", "Underline"]
            }, {
                name: "lists",
                items: ["NumberedList", "BulletedList"]
            }, {
                name: "links",
                items: ["Links"]
            }, {
                name: "format",
                items: ["Format"]
            }, {
                name: "styles",
                items: ["Styles"]
            }, {
                name: "clip",
                items: ["Undo", "Redo"]
            }, {
                name: "maximize",
                items: ["Maximize"]
            }],
            simpleHTML: [{
                name: "basicstyles",
                items: ["Bold", "Italic", "Underline"]
            }, {
                name: "lists",
                items: ["NumberedList", "BulletedList"]
            }, {
                name: "links",
                items: ["Links"]
            }, {
                name: "format",
                items: ["Format"]
            }, {
                name: "clip",
                items: ["Undo", "Redo", "SourceEdit"]
            }, {
                name: "maximize",
                items: ["Maximize"]
            }]
        },
        _create: function() {
            var t = this.element.val(), i;
            t && t.indexOf("<") >= 0 && this.element.val(Encode.HTML(t));
            i = function() {
                this.element.onvisible(this._setup.bind(this));
                setTimeout(function() {
                    n(window).trigger("resize")
                }, 250)
            }
            .bind(this);
            rrequire(["ckeditor", "html"], ["opensans", "cms-form", "cms-tools", "cms-wizards"], i)
        },
        val: function(n) {
            if (n === undefined)
                return this.editor ? this.editor.getData() : this.value;
            this.value = n ? new HTML.Page(n).render() : "";
            this.editor ? (this.editor.setData(n),
            this.editor.updateElement()) : this.element.val(Encode.HTML(this.value))
        },
        _destroy: function() {
            this.editor && this.editor.destroy && (this.editor.destroy(),
            this.editor = null)
        },
        _setup: function() {
            var e, r, o = this, t = this.element, i = t.data(), u = t.attr("id"), s = t.is("[required]"), h = t.val(), f = undefined;
            if (this.state = {
                last: null,
                ctimer: 0
            },
            !this.initialized) {
                this.initialized = !0;
                this.value = t.val() || "";
                this.value && (this.value = new HTML.Page(Decode.HTML(this.value)).render(),
                t.val(this.value));
                e = i.fullPage === !0 || this.value && this.value.indexOf("<\/head>") >= 0;
                u || (u = Compute.UUID(),
                t.attr("id", u));
                this.element.addClass("ui-ckeditor");
                i && i.simple && i.html ? (r = this.options.simpleHTML,
                f = "properties") : i && i.simple ? (r = this.options.toolbarSimple,
                f = "properties,acesource") : i && i.html ? r = this.options.toolbarHTML : (r = this.options.toolbar,
                f = "acesource");
                this.options.properties && (f = undefined);
                this.editor = CKEDITOR.replace(u, {
                    htmlEncodeOutput: !0,
                    fullPage: e,
                    toolbar: r,
                    removePlugins: f,
                    on: {
                        instanceReady: function() {
                            var n, i = window.navigator.userAgent;
                            s && t.attr("required", "required");
                            o.ready = !0;
                            t.trigger("ready");
                            i && /MSIE 10\.0/.test(i) && /NT 6\.1/.test(i) && (console.log("IE10 on Windows 7 detected."),
                            console.log("Warning! There are browser rendering bugs with this version that may affect CKEDITOR."),
                            console.log("If the CKEDITOR tools cannot be seen, F5 to refresh the page."));
                            n = CKEDITOR.instances[u];
                            n && n.updateElement();
                            window.USE && USE.Replace && USE.Replace()
                        }
                    }
                });
                this.options.properties && this.options.properties.nodeType === 1 && (this.editor.propertiesPane = this.options.properties);
                this.editor.on("focus", function() {
                    t.closest("li").addClass("focused")
                });
                this.editor.on("blur", function(n) {
                    t.closest("li").removeClass("focused");
                    n.editor.sourceCode || n.editor.updateElement()
                });
                switch (this.element.data("autosave")) {
                case "form":
                    this.checkAutosave();
                    this.editor.on("change", n.proxy(this.autosave, this));
                    this.element.closest("form").on("submit", function() {
                        var n = "autosave:" + window.location.pathname;
                        localStorage.removeItem(n)
                    });
                    break;
                case "input":
                    this.onchange = function() {
                        clearTimeout(this.state.ctimer);
                        this.state.ctimer = setTimeout(this.change, 250)
                    }
                    .bind(this);
                    this.change = function() {
                        var n;
                        if (!this.editor.sourceCode) {
                            if (this.editor.updateElement(),
                            n = t.val(),
                            this.value && !n || !this.value && n) {
                                t.trigger("input");
                                return
                            }
                            n = new HTML.Page(Decode.HTML(n)).render();
                            this.value != n && (this.value = n,
                            t.trigger("input"))
                        }
                    }
                    .bind(this);
                    this.editor.on("change", this.onchange)
                }
                this._on(this.element, {
                    update: function() {
                        this.editor.updateElement()
                    }
                })
            }
        },
        autosave: function() {
            this._atimeout && clearTimeout(this._atimeout);
            this._atimeout = setTimeout(n.proxy(this._autosave, this), 2e3)
        },
        _autosave: function() {
            var r, i, u = "autosave:" + window.location.pathname, t = {};
            this.editor && this.editor.sourceCode || (this.element.closest("form").find("[name]").each(function() {
                var e, u = n(this), f = u.attr("name").split("$").pop(), r = u.val();
                if (r) {
                    if (u.is(":radio") && !u.prop("checked"))
                        return;
                    if (u.is(":checkbox"))
                        if (u.prop("checked"))
                            e = t[f] || [],
                            e.push(r),
                            t[f] = e;
                        else
                            return;
                    else
                        u.is("textarea") ? (i = CKEDITOR.instances[u.attr("id")],
                        i && (r = i.getData(),
                        r && /^\s*<p\b[^>]*>\s*<\/p>\s*$/.test(r) && (r = null)),
                        r && (t[f] = r)) : t[f] = r
                } else
                    return
            }),
            n.isEmptyObject(t)) || (t[this.element.attr("name").split("$").pop()] = this.editor.getData(),
            t.AutoSaved = new Date,
            r = JSON.stringify(t),
            localStorage.setItem(u, r),
            this.editor.updateElement(),
            this.element.trigger("autosave"))
        },
        checkAutosave: function() {
            var r = this
              , t = "autosave:" + window.location.pathname
              , i = localStorage.getItem(t)
              , n = i && f(i);
            n && n.AutoSaved && $confirm("<h2>Restore Content<\/h2>You have content auto-saved on <strong>" + n.AutoSaved.formatted("MMMM d, yyyy h:mmtt") + "<\/strong>.<br>Would you like to continue with this edit?", function() {
                r._restoreAutosave(n)
            }, function() {
                localStorage.removeItem(t)
            })
        },
        _restoreAutosave: function(t) {
            this.element.closest("form").find("[name]").each(function() {
                var u, i = n(this), r = i.attr("name").split("$").pop(), f = i.val();
                i.is(":radio") ? t[r] && i.prop("checked") : i.is(":checkbox") ? (u = t[r],
                u && u.indexOf(f) >= 0 && i.prop("checked", !0)) : i.is("textarea") ? (ck = CKEDITOR.instances[i.attr("id")],
                ck ? ck.setData(t[r] || "") : i.val(t[r] || "")) : i.val(t[r] || "")
            })
        }
    });
    n.widget("cms.ck", n.cms.ckeditor, {
        _create: function() {
            var t = this.element.val(), i;
            t && t.indexOf("<") >= 0 && this.element.val(Encode.HTML(t));
            i = function() {
                this.element.onvisible(this._setup.bind(this));
                setTimeout(function() {
                    n(window).trigger("resize")
                }, 250)
            }
            .bind(this);
            window.location.href.includes("_admin") || rrequire(["ck", "html"], [], i)
        }
    });
    n.widget("cms.combobox", {
        options: {
            insert: !1,
            fields: null,
            searchTimer: 100
        },
        _create: function() {
            var t, i;
            if (this.id = this.element.attr("id"),
            this.panel = this.element.find("[data-role='select']"),
            this.panel.length) {
                i = this.element.addClass("ui-noselect");
                rrequire("c/scrollbar", function() {
                    i.find(".ui-scroll").scrollbar().captureScroll()
                });
                this.element.data("allowinsert") && (this.options.insert = !0);
                (t = this.element.data("fields")) != null && (this.options.fields = t);
                this.element.on("focusin.combobox", n.proxy(this._onFocus, this));
                this.element.onidle("input.combobox", n.proxy(this._handleSearch, this), this.options.searchTimer);
                this.element.on("change.combobox", n.proxy(this._handleChange, this));
                this.element.on("click.combobox", n.proxy(this._handleClick, this));
                this.element.on("mouseover.combobox mouseleave.combobox", n.proxy(this._hover, this));
                this.element.on("keydown.combobox", n.proxy(this._navigate, this))
            }
        },
        _destroy: function() {
            this.element.off(".combobox")
        },
        getLabel: function(t) {
            var i = null;
            return this.element.find("label[for='" + t + "']").each(function() {
                var t = n(this).text();
                (!i || t.length > i.length) && (i = t)
            }),
            i || ""
        },
        _onFocus: function(t) {
            var i = n(t.target).data("role");
            i == "search" && this.activate()
        },
        _handleSearch: function(t) {
            var r, o, s, i, f, e, h = !1, u = n(t.target), c = u.data("role");
            if (c == "search") {
                if (term = u.val() || "",
                r = term.toLowerCase(),
                e = this.element.find("input:checkbox,input:radio"),
                !r) {
                    e.closest("li").show();
                    this.element.find(".ui-select-add, .no-results").hide();
                    this.panel.removeClass("adding");
                    return
                }
                for (s = 0,
                o = e.length; o--; ) {
                    if (f = !1,
                    u = e.eq(o),
                    this.options.fields && this.options.fields.length) {
                        for (fIndex = this.options.fields.length; fIndex--; )
                            if (i = u.data(this.options.fields[fIndex]).toLowerCase(),
                            i && i.indexOf(r) >= 0) {
                                f = !0;
                                i == r && (h = !0);
                                break
                            }
                    } else
                        i = this.getLabel(u.attr("id")).toLowerCase(),
                        f = i && i.indexOf(r) >= 0,
                        i == r && (h = !0);
                    f ? (s++,
                    u.closest("li").show()) : u.closest("li").hide();
                    h && (this.element.find(".ui-select-add").hide(),
                    this.panel.removeClass("adding"))
                }
                s ? this.element.find(".no-results").hide() : (this.element.find(".no-results").show(),
                this.element.find(".ui-select-add").html('Add "' + term + '" as a category').show(),
                this.panel.addClass("adding"));
                this._trigger("search", {
                    value: r
                })
            }
        },
        _addNew: function(t) {
            var u, i, f = this.element.find("div[data-role='select']"), o = this.element.data("uniqueid"), s = this.element.data("insertfield"), h = this.element.find("ul[data-role='items']"), e = this.element.attr("id"), r = "0|" + t;
            u = n('<li><input type="checkbox" class="cms">\t                    <label class="cms-replace"><\/label>\t                    <label class="cms"><\/label>                    <\/li>').find("input:checkbox").attr({
                name: o,
                id: e + r,
                value: r
            }).prop("checked", "checked").data(s, t).end().find("label").attr("for", e + r).end().find("label.cms").text(t).end();
            f.children("ul").append(u);
            f.removeClass("adding").find(".ui-select-add, .no-results").hide();
            i = n("<li><\/li>").addClass("button").appendTo(h);
            i.data("value", r);
            i.text(t);
            i.append('<a href="javascript:void(\'Remove\');" class="cancel"><\/a>')
        },
        _handleChange: function(t) {
            var u, f, e, o, i = n(t.target), r, s;
            if (i.is("input:checkbox,input:radio")) {
                if (u = this.element.find("ul[data-role='items']"),
                u.length)
                    u.empty();
                else
                    return;
                for (f = this.element.find("input:checkbox,input:radio"),
                o = [],
                r = 0,
                s = f.length; r < s; r++)
                    (i = f.eq(r),
                    i.prop("checked")) && (o.push(f[r]),
                    e = n("<li><\/li>").addClass("button").appendTo(u),
                    e.data("value", i.attr("value")),
                    e.text(this.getLabel(i.attr("id"))),
                    e.append('<a href="javascript:void(\'Remove\');" class="cancel"><\/a>'));
                this._trigger("change", {
                    selected: n(o)
                })
            }
        },
        _handleClick: function(t) {
            var r, u, f = Get.LinkData(t), i;
            switch (f.action) {
            case "Remove":
                r = n(f.link).closest("li");
                i = r.data("value");
                r.remove();
                this.element.find("input:checkbox,input:radio").filter("[value='" + i + "']").prop("checked", !1);
                break;
            case "Add":
            case "AddNew":
                i = this.element.find("[data-role=search]").val();
                this._addNew(i);
                break;
            default:
                u = n(t.target);
                u.is("li") && u.find("input:checkbox,input:radio,label").eq(0).click()
            }
        },
        _hover: function(t) {
            var i;
            if (t.type === "mouseleave") {
                this.over = !1;
                return
            }
            this.over = !0;
            i = n(t.target).closest("li");
            i.length && n.contains(this.panel[0], i[0]) && this.focused(i)
        },
        _navigate: function(t) {
            if (!t.shiftKey && !t.ctrlKey) {
                switch (t.which) {
                case n.ui.keyCode.ESCAPE:
                    this.deactivate();
                    n(t.target).blur();
                    break;
                case n.ui.keyCode.DOWN:
                    this.navigate(1);
                    break;
                case n.ui.keyCode.UP:
                    this.navigate(-1);
                    break;
                case n.ui.keyCode.PAGE_DOWN:
                    this.navigate(10);
                    break;
                case n.ui.keyCode.PAGE_UP:
                    this.navigate(-10);
                    break;
                case n.ui.keyCode.HOME:
                    this.focused(this.panel.find("li:first"));
                    break;
                case n.ui.keyCode.END:
                    this.focused(this.panel.find("li:last"));
                    break;
                case n.ui.keyCode.ENTER:
                    this.toggle(this.panel.find(".focused:first"));
                    break;
                default:
                    return
                }
                return StopAll(t)
            }
        },
        navigate: function(n) {
            var t = this.panel.find("li:visible")
              , i = t.filter(".focused")
              , r = Math.limit(t.index(i) + n, 0, t.length - 1);
            this.focused(t.eq(r))
        },
        toggle: function(n) {
            var t;
            if (n && n.length)
                if (t = n.find("input:checkbox,input:radio"),
                t.length)
                    switch (t.attr("type")) {
                    case "checkbox":
                        t.prop("checked", !t.prop("checked")).trigger("change");
                        break;
                    case "radio":
                        t.prop("checked") || t[0].click()
                    }
                else
                    return
        },
        focused: function(n) {
            n.is(".focused") || (this.panel.find(".focused").removeClass("focused"),
            n.addClass("focused").scrollIntoView(),
            this._trigger("focused", {
                item: n
            }))
        },
        activate: function() {
            var t;
            if (!this.panel.is(".active")) {
                this.panel.addClass("active").trigger("update").find(".ui-scroll").trigger("update");
                this._documentClick || (t = this,
                this._documentClick = function() {
                    t.over || t.deactivate()
                }
                );
                n(document).on("click.combobox", this._documentClick);
                this._documentFocus || (t = this,
                this._documentFocus = function(i) {
                    n.contains(t.element[0], i.target) || n(i.target).is(".ui-dialog") || t.deactivate()
                }
                );
                n(document).on("focusin.combobox", this._documentFocus);
                this._trigger("activate", {
                    panel: this.panel
                })
            }
        },
        deactivate: function() {
            this.panel.is(".active") && (this.panel.removeClass("active"),
            n(document).off("click.combobox", this._documentClick),
            n(document).off("focusin.combobox", this._documentFocus),
            this._trigger("deactivate", {
                panel: this.panel
            }))
        }
    });
    window.register && window.register("form")
});
window.registerLoading && registerLoading("adapter"),
function(n) {
    typeof rrequire == "function" ? rrequire(["j/jquery", "static", "extensions"], n) : n(jQuery, window)
}(function(n) {
    var t = function() {}, i, r;
    /MSIE|Trident/i.test(window.navigator.userAgent || "") && (r = n("use")).length && (i = r.attr("xlink:href")) && i[0] === "/" && n.ajax({
        url: i.split("#").shift(),
        success: function(t) {
            var i = n('<svg style="display:none;" viewBox="0 0 1024 1024"><\/svg>').appendTo(document.body);
            i.append(n(t).find("g"));
            r.each(function() {
                var n = this.getAttribute("xlink:href")
                  , t = n && n.split("#").pop();
                t && this.setAttribute("xlink:href", "#" + t)
            })
        }
    });
    n.toInt || (n.toInt = Make.Int,
    n.toFloat = Make.Float,
    n.toBool = Make.Bool,
    n.encode = Encode.Uri,
    n.decode = Decode.Uri,
    n.preload = t,
    n.log = t,
    n.fn.inputStyle = t,
    n.getLinkTarget = function(t) {
        var i = Get.Link(t);
        return i && n(i)
    }
    ,
    n.getLinkAction = function(t) {
        var i = Get.LinkData(t);
        return i.link && (i.link = n(i.link)),
        i
    }
    ,
    n.getAjaxUrl = function(n, t) {
        return new URI(n,t).toString()
    }
    ,
    n.cms && n.cms.scrollbar || rrequire("c/scrollbar"),
    n.fn.unselectable = function() {
        return this.addClass("ui-noselect")
    }
    ,
    n.fn.place = n.fn.position,
    window.$alert.options.dialogClass = "night cms-alert ui-noselect",
    n.fn.dimensions = function() {
        var t;
        return this.length ? (t = n.isWindow(this[0]) ? {
            left: Math.max(document.documentElement.scrollTop, document.body.scrollTop),
            top: Math.max(document.documentElement.scrollTop, document.body.scrollTop)
        } : this.is("html,body") ? {
            left: 0,
            top: 0
        } : this.offset(),
        t.width = this.width(),
        t.height = this.height(),
        t) : null
    }
    );
    window.register && window.register("adapter")
});
/*!
   JW Player version 8.11.4
   Copyright (c) 2019, JW Player, All Rights Reserved 
   This source code and its use and distribution is subject to the terms 
   and conditions of the applicable license agreement. 
   https://www.jwplayer.com/tos/
   This product includes portions of other software. For the full text of licenses, see
   https://ssl.p.jwpcdn.com/player/v/8.11.4/notice.txt
*/
window.jwplayer = function(n) {
    function o(t) {
        for (var i, u, h = t[0], f = t[1], o = 0, s = []; o < h.length; o++)
            u = h[o],
            r[u] && s.push(r[u][0]),
            r[u] = 0;
        for (i in f)
            Object.prototype.hasOwnProperty.call(f, i) && (n[i] = f[i]);
        for (e && e(t); s.length; )
            s.shift()()
    }
    function t(i) {
        if (u[i])
            return u[i].exports;
        var r = u[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return n[i].call(r.exports, r, r.exports, t),
        r.l = !0,
        r.exports
    }
    var u = {}, r = {
        0: 0
    }, i, s, f, e;
    for (t.e = function(n) {
        var f = [], u = r[n], o, e, i, s;
        return 0 !== u && (u ? f.push(u[2]) : (o = new Promise(function(t, i) {
            u = r[n] = [t, i]
        }
        ),
        f.push(u[2] = o),
        i = document.createElement("script"),
        i.charset = "utf-8",
        i.timeout = 55,
        t.nc && i.setAttribute("nonce", t.nc),
        i.src = function(n) {
            return t.p + "" + ({
                1: "jwplayer.controls",
                2: "jwplayer.core",
                3: "jwplayer.core.controls",
                4: "jwplayer.core.controls.html5",
                5: "jwplayer.core.controls.polyfills",
                6: "jwplayer.core.controls.polyfills.html5",
                7: "jwplayer.vr",
                8: "polyfills.intersection-observer",
                9: "polyfills.webvtt",
                10: "provider.airplay",
                11: "provider.cast",
                12: "provider.flash",
                13: "provider.hlsjs",
                14: "provider.hlsjs-progressive",
                15: "provider.html5",
                16: "provider.shaka",
                17: "related",
                18: "vttparser"
            }[n] || n) + ".js"
        }(n),
        e = function(t) {
            var u;
            if (i.onerror = i.onload = null,
            clearTimeout(s),
            u = r[n],
            0 !== u) {
                if (u) {
                    var e = t && ("load" === t.type ? "missing" : t.type)
                      , o = t && t.target && t.target.src
                      , f = new Error("Loading chunk " + n + " failed.\n(" + e + ": " + o + ")");
                    f.type = e;
                    f.request = o;
                    u[1](f)
                }
                r[n] = void 0
            }
        }
        ,
        s = setTimeout(function() {
            e({
                type: "timeout",
                target: i
            })
        }, 55e3),
        i.onerror = i.onload = e,
        document.head.appendChild(i))),
        Promise.all(f)
    }
    ,
    t.m = n,
    t.c = u,
    t.d = function(n, i, r) {
        t.o(n, i) || Object.defineProperty(n, i, {
            enumerable: !0,
            get: r
        })
    }
    ,
    t.r = function(n) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
            value: "Module"
        });
        Object.defineProperty(n, "__esModule", {
            value: !0
        })
    }
    ,
    t.t = function(n, i) {
        var r, u;
        if ((1 & i && (n = t(n)),
        8 & i) || 4 & i && "object" == typeof n && n && n.__esModule)
            return n;
        if (r = Object.create(null),
        t.r(r),
        Object.defineProperty(r, "default", {
            enumerable: !0,
            value: n
        }),
        2 & i && "string" != typeof n)
            for (u in n)
                t.d(r, u, function(t) {
                    return n[t]
                }
                .bind(null, u));
        return r
    }
    ,
    t.n = function(n) {
        var i = n && n.__esModule ? function() {
            return n.default
        }
        : function() {
            return n
        }
        ;
        return t.d(i, "a", i),
        i
    }
    ,
    t.o = function(n, t) {
        return Object.prototype.hasOwnProperty.call(n, t)
    }
    ,
    t.p = "",
    t.oe = function(n) {
        throw console.error(n),
        n;
    }
    ,
    i = window.webpackJsonpjwplayer = window.webpackJsonpjwplayer || [],
    s = i.push.bind(i),
    i.push = o,
    i = i.slice(),
    f = 0; f < i.length; f++)
        o(i[f]);
    return e = s,
    t(t.s = 69)
}([function(n, t, i) {
    "use strict";
    i.d(t, "j", function() {
        return r
    });
    i.d(t, "B", function() {
        return p
    });
    i.d(t, "G", function() {
        return w
    });
    i.d(t, "m", function() {
        return b
    });
    i.d(t, "l", function() {
        return e
    });
    i.d(t, "a", function() {
        return ot
    });
    i.d(t, "b", function() {
        return k
    });
    i.d(t, "H", function() {
        return ri
    });
    i.d(t, "o", function() {
        return oi
    });
    i.d(t, "I", function() {
        return st
    });
    i.d(t, "e", function() {
        return c
    });
    i.d(t, "K", function() {
        return si
    });
    i.d(t, "n", function() {
        return hi
    });
    i.d(t, "i", function() {
        return ht
    });
    i.d(t, "q", function() {
        return ct
    });
    i.d(t, "c", function() {
        return at
    });
    i.d(t, "D", function() {
        return ci
    });
    i.d(t, "J", function() {
        return ai
    });
    i.d(t, "r", function() {
        return vi
    });
    i.d(t, "h", function() {
        return yi
    });
    i.d(t, "k", function() {
        return vt
    });
    i.d(t, "E", function() {
        return pi
    });
    i.d(t, "x", function() {
        return g
    });
    i.d(t, "u", function() {
        return l
    });
    i.d(t, "w", function() {
        return nt
    });
    i.d(t, "y", function() {
        return wi
    });
    i.d(t, "t", function() {
        return bi
    });
    i.d(t, "v", function() {
        return tt
    });
    i.d(t, "s", function() {
        return ki
    });
    i.d(t, "z", function() {
        return di
    });
    i.d(t, "p", function() {
        return s
    });
    i.d(t, "d", function() {
        return gi
    });
    i.d(t, "F", function() {
        return it
    });
    i.d(t, "C", function() {
        return rt
    });
    i.d(t, "A", function() {
        return nr
    });
    i.d(t, "f", function() {
        return tr
    });
    var ir = i(18)
      , y = {}
      , f = Array.prototype
      , pt = Object.prototype
      , rr = Function.prototype
      , u = f.slice
      , ut = f.concat
      , ft = pt.toString
      , ur = pt.hasOwnProperty
      , wt = f.map
      , bt = f.reduce
      , kt = f.forEach
      , dt = f.filter
      , gt = f.every
      , ni = f.some
      , ti = f.indexOf
      , fr = Array.isArray
      , ii = Object.keys
      , et = rr.bind
      , er = window.isFinite
      , r = function(n, t, i) {
        var r, u, f;
        if (null == n)
            return n;
        if (kt && n.forEach === kt)
            n.forEach(t, i);
        else if (n.length === +n.length) {
            for (r = 0,
            u = n.length; r < u; r++)
                if (t.call(i, n[r], r, n) === y)
                    return
        } else
            for (f = h(n),
            r = 0,
            u = f.length; r < u; r++)
                if (t.call(i, n[f[r]], f[r], n) === y)
                    return;
        return n
    }
      , or = r
      , p = function(n, t, i) {
        var u = [];
        return null == n ? u : wt && n.map === wt ? n.map(t, i) : (r(n, function(n, r, f) {
            u.push(t.call(i, n, r, f))
        }),
        u)
    }
      , sr = p
      , hr = "Reduce of empty array with no initial value"
      , w = function(n, t, i, u) {
        var f = arguments.length > 2;
        if (null == n && (n = []),
        bt && n.reduce === bt)
            return u && (t = at(t, u)),
            f ? n.reduce(t, i) : n.reduce(t);
        if (r(n, function(n, r, e) {
            f ? i = t.call(u, i, n, r, e) : (i = n,
            f = !0)
        }),
        !f)
            throw new TypeError(hr);
        return i
    }
      , cr = w
      , lr = w
      , b = function(n, t, i) {
        var r;
        return k(n, function(n, u, f) {
            if (t.call(i, n, u, f))
                return r = n,
                !0
        }),
        r
    }
      , ar = b
      , e = function(n, t, i) {
        var u = [];
        return null == n ? u : dt && n.filter === dt ? n.filter(t, i) : (r(n, function(n, r, f) {
            t.call(i, n, r, f) && u.push(n)
        }),
        u)
    }
      , vr = e
      , ot = function(n, t, i) {
        t || (t = s);
        var u = !0;
        return null == n ? u : gt && n.every === gt ? n.every(t, i) : (r(n, function(n, r, f) {
            if (!(u = u && t.call(i, n, r, f)))
                return y
        }),
        !!u)
    }
      , yr = ot
      , k = function(n, t, i) {
        t || (t = s);
        var u = !1;
        return null == n ? u : ni && n.some === ni ? n.some(t, i) : (r(n, function(n, r, f) {
            if (u || (u = t.call(i, n, r, f)))
                return y
        }),
        !!u)
    }
      , pr = k
      , ri = function(n) {
        return null == n ? 0 : n.length === +n.length ? n.length : h(n).length
    }
      , ui = function(n, t) {
        var i;
        return function() {
            return --n > 0 && (i = t.apply(this, arguments)),
            n <= 1 && (t = null),
            i
        }
    }
      , fi = function(n) {
        return null == n ? s : l(n) ? n : it(n)
    }
      , ei = function(n) {
        return function(t, i, u) {
            var f = {};
            return i = fi(i),
            r(t, function(r, e) {
                var o = i.call(u, r, e, t);
                n(f, o, r)
            }),
            f
        }
    }
      , oi = ei(function(n, t, i) {
        a(n, t) ? n[t].push(i) : n[t] = [i]
    })
      , wr = ei(function(n, t, i) {
        n[t] = i
    })
      , st = function(n, t, i, r) {
        for (var f, o = (i = fi(i)).call(r, t), u = 0, e = n.length; u < e; )
            f = u + e >>> 1,
            i.call(r, n[f]) < o ? u = f + 1 : e = f;
        return u
    }
      , c = function(n, t) {
        return null != n && (n.length !== +n.length && (n = gr(n)),
        ct(n, t) >= 0)
    }
      , br = c
      , si = function(n, t) {
        return e(n, rt(t))
    }
      , hi = function(n, t) {
        return b(n, rt(t))
    }
      , ht = function(n) {
        var t = ut.apply(f, u.call(arguments, 1));
        return e(n, function(n) {
            return !c(t, n)
        })
    }
      , ct = function(n, t, i) {
        if (null == n)
            return -1;
        var r = 0
          , u = n.length;
        if (i) {
            if ("number" != typeof i)
                return n[r = st(n, t)] === t ? r : -1;
            r = i < 0 ? Math.max(0, u + i) : i
        }
        if (ti && n.indexOf === ti)
            return n.indexOf(t, i);
        for (; r < u; r++)
            if (n[r] === t)
                return r;
        return -1
    }
      , lt = function() {}
      , at = function(n, t) {
        var i, r;
        if (et && n.bind === et)
            return et.apply(n, u.call(arguments, 1));
        if (!l(n))
            throw new TypeError;
        return i = u.call(arguments, 2),
        r = function() {
            var e, f;
            return (this instanceof r) ? (lt.prototype = n.prototype,
            e = new lt,
            lt.prototype = null,
            f = n.apply(e, i.concat(u.call(arguments))),
            Object(f) === f ? f : e) : n.apply(t, i.concat(u.call(arguments)))
        }
    }
      , d = function(n) {
        var t = u.call(arguments, 1);
        return function() {
            for (var u = 0, i = t.slice(), r = 0, f = i.length; r < f; r++)
                a(i[r], "partial") && (i[r] = arguments[u++]);
            for (; u < arguments.length; )
                i.push(arguments[u++]);
            return n.apply(this, i)
        }
    }
      , kr = d(ui, 2)
      , ci = function(n, t) {
        var i = {};
        return t || (t = s),
        function() {
            var r = t.apply(this, arguments);
            return a(i, r) ? i[r] : i[r] = n.apply(this, arguments)
        }
    }
      , li = function(n, t) {
        var i = u.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, i)
        }, t)
    }
      , dr = d(li, {
        partial: d
    }, 1)
      , ai = function(n, t, i) {
        var r, u, o, f = null, e = 0, s;
        return i || (i = {}),
        s = function() {
            e = !1 === i.leading ? 0 : v();
            f = null;
            o = n.apply(r, u);
            r = u = null
        }
        ,
        function() {
            e || !1 !== i.leading || (e = v);
            var h = t - (v - e);
            return r = this,
            u = arguments,
            h <= 0 ? (clearTimeout(f),
            f = null,
            e = v,
            o = n.apply(r, u),
            r = u = null) : f || !1 === i.trailing || (f = setTimeout(s, h)),
            o
        }
    }
      , h = function(n) {
        var t, i;
        if (!g(n))
            return [];
        if (ii)
            return ii(n);
        t = [];
        for (i in n)
            a(n, i) && t.push(i);
        return t
    }
      , gr = function(n) {
        for (var u = h(n), i = h.length, r = Array(i), t = 0; t < i; t++)
            r[t] = n[u[t]];
        return r
    }
      , vi = function(n) {
        for (var r = {}, i = h(n), t = 0, u = i.length; t < u; t++)
            r[n[i[t]]] = i[t];
        return r
    }
      , yi = function(n) {
        return r(u.call(arguments, 1), function(t) {
            if (t)
                for (var i in t)
                    void 0 === n[i] && (n[i] = t[i])
        }),
        n
    }
      , vt = Object.assign || function(n) {
        return r(u.call(arguments, 1), function(t) {
            if (t)
                for (var i in t)
                    Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }),
        n
    }
      , pi = function(n) {
        var t = {}
          , i = ut.apply(f, u.call(arguments, 1));
        return r(i, function(i) {
            i in n && (t[i] = n[i])
        }),
        t
    }
      , yt = fr || function(n) {
        return "[object Array]" == ft.call(n)
    }
      , g = function(n) {
        return n === Object(n)
    }
      , o = [];
    r(["Function", "String", "Number", "Date", "RegExp"], function(n) {
        o[n] = function(t) {
            return ft.call(t) == "[object " + n + "]"
        }
    });
    o.Function = function(n) {
        return "function" == typeof n
    }
    ;
    var nu = o.Date
      , tu = o.RegExp
      , l = o.Function
      , nt = o.Number
      , wi = o.String
      , bi = function(n) {
        return er(n) && !tt(parseFloat(n))
    }
      , tt = function(n) {
        return nt(n) && n != +n
    }
      , ki = function(n) {
        return !0 === n || !1 === n || "[object Boolean]" == ft.call(n)
    }
      , di = function(n) {
        return void 0 === n
    }
      , a = function(n, t) {
        return ur.call(n, t)
    }
      , s = function(n) {
        return n
    }
      , gi = function(n) {
        return function() {
            return n
        }
    }
      , it = function(n) {
        return function(t) {
            return t[n]
        }
    }
      , rt = function(n) {
        return function(t) {
            if (t === n)
                return !0;
            for (var i in n)
                if (n[i] !== t[i])
                    return !1;
            return !0
        }
    }
      , v = ir.a
      , nr = function(n) {
        return nt(n) && !tt(n)
    }
      , tr = function(n) {
        var t, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
        return function() {
            for (var e = this, u = arguments.length, f = new Array(u), r = 0; r < u; r++)
                f[r] = arguments[r];
            clearTimeout(t);
            t = setTimeout(function() {
                n.apply(e, f)
            }, i)
        }
    };
    t.g = {
        after: function(n, t) {
            return function() {
                if (--n < 1)
                    return t.apply(this, arguments)
            }
        },
        all: ot,
        any: k,
        before: ui,
        bind: at,
        clone: function(n) {
            return g(n) ? yt(n) ? n.slice() : vt({}, n) : n
        },
        collect: sr,
        compact: function(n) {
            return e(n, s)
        },
        constant: gi,
        contains: c,
        debounce: tr,
        defaults: yi,
        defer: dr,
        delay: li,
        detect: ar,
        difference: ht,
        each: r,
        every: yr,
        extend: vt,
        filter: e,
        find: b,
        findWhere: hi,
        foldl: cr,
        forEach: or,
        groupBy: oi,
        has: a,
        identity: s,
        include: br,
        indexBy: wr,
        indexOf: ct,
        inject: lr,
        invert: vi,
        isArray: yt,
        isBoolean: ki,
        isDate: nu,
        isFinite: bi,
        isFunction: l,
        isNaN: tt,
        isNull: function(n) {
            return null === n
        },
        isNumber: nt,
        isObject: g,
        isRegExp: tu,
        isString: wi,
        isUndefined: di,
        isValidNumber: nr,
        keys: h,
        last: function(n, t, i) {
            if (null != n)
                return null == t || i ? n[n.length - 1] : u.call(n, Math.max(n.length - t, 0))
        },
        map: p,
        matches: rt,
        max: function(n, t, i) {
            if (!t && yt(n) && n[0] === +n[0] && n.length < 65535)
                return Math.max.apply(Math, n);
            var u = -1 / 0
              , f = -1 / 0;
            return r(n, function(n, r, e) {
                var o = t ? t.call(i, n, r, e) : n;
                o > f && (u = n,
                f = o)
            }),
            u
        },
        memoize: ci,
        now: v,
        omit: function(n) {
            var i = {}
              , r = ut.apply(f, u.call(arguments, 1));
            for (var t in n)
                c(r, t) || (i[t] = n[t]);
            return i
        },
        once: kr,
        partial: d,
        pick: pi,
        pluck: function(n, t) {
            return p(n, it(t))
        },
        property: it,
        propertyOf: function(n) {
            return null == n ? function() {}
            : function(t) {
                return n[t]
            }
        },
        reduce: w,
        reject: function(n, t, i) {
            return e(n, function(n, r, u) {
                return !t.call(i, n, r, u)
            }, i)
        },
        result: function(n, t) {
            if (null != n) {
                var i = n[t];
                return l(i) ? i.call(n) : i
            }
        },
        select: vr,
        size: ri,
        some: pr,
        sortedIndex: st,
        throttle: ai,
        where: si,
        without: function(n) {
            return ht(n, u.call(arguments, 1))
        }
    }
}
, function(n, t, i) {
    "use strict";
    function f(n, t) {
        for (var i, r = 0; r < t.length; r++)
            i = t[r],
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(n, i.key, i)
    }
    function o(n, t, i) {
        return i instanceof r && i.code ? i : new r(n,t,i)
    }
    function wt(n, t) {
        var i = o(e, t, n);
        return i.code = (n && n.code || 0) + t,
        i
    }
    function bt(n) {
        var i = n.name
          , t = n.message;
        switch (i) {
        case "AbortError":
            return /pause/.test(t) ? ut : /load/.test(t) ? rt : it;
        case "NotAllowedError":
            return ft;
        case "NotSupportedError":
            return et;
        default:
            return tt
        }
    }
    var u;
    i.d(t, "y", function() {
        return s
    });
    i.d(t, "x", function() {
        return h
    });
    i.d(t, "w", function() {
        return c
    });
    i.d(t, "t", function() {
        return l
    });
    i.d(t, "u", function() {
        return a
    });
    i.d(t, "a", function() {
        return v
    });
    i.d(t, "c", function() {
        return y
    });
    i.d(t, "v", function() {
        return p
    });
    i.d(t, "d", function() {
        return w
    });
    i.d(t, "h", function() {
        return b
    });
    i.d(t, "e", function() {
        return k
    });
    i.d(t, "k", function() {
        return d
    });
    i.d(t, "i", function() {
        return g
    });
    i.d(t, "j", function() {
        return nt
    });
    i.d(t, "b", function() {
        return ot
    });
    i.d(t, "f", function() {
        return st
    });
    i.d(t, "g", function() {
        return ht
    });
    i.d(t, "o", function() {
        return ct
    });
    i.d(t, "l", function() {
        return lt
    });
    i.d(t, "m", function() {
        return at
    });
    i.d(t, "n", function() {
        return vt
    });
    i.d(t, "p", function() {
        return yt
    });
    i.d(t, "q", function() {
        return pt
    });
    i.d(t, "r", function() {
        return e
    });
    i.d(t, "s", function() {
        return r
    });
    i.d(t, "A", function() {
        return o
    });
    i.d(t, "z", function() {
        return wt
    });
    i.d(t, "B", function() {
        return bt
    });
    u = i(0);
    var s = 1e5
      , h = 100001
      , c = 100002
      , l = 101e3
      , a = 102e3
      , v = 200001
      , y = 202e3
      , p = 104e3
      , w = 203e3
      , b = 203640
      , k = 204e3
      , d = 210001
      , g = 21e4
      , nt = 214e3
      , tt = 303200
      , it = 303210
      , rt = 303212
      , ut = 303213
      , ft = 303220
      , et = 303230
      , ot = 306e3
      , st = 308e3
      , ht = 308640
      , ct = "cantPlayVideo"
      , lt = "badConnection"
      , at = "cantLoadPlayer"
      , vt = "cantPlayInBrowser"
      , yt = "liveStreamDown"
      , pt = "protectedContent"
      , e = "technicalError"
      , r = function() {
        function n(t, i) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            !function(n, t) {
                if (!(n instanceof t))
                    throw new TypeError("Cannot call a class as a function");
            }(this, n);
            this.code = Object(u.A)(i) ? i : 0;
            this.sourceError = r;
            t && (this.key = t)
        }
        var t, r, i;
        return t = n,
        i = [{
            key: "logMessage",
            value: function(n) {
                var t = n % 1e3
                  , i = Math.floor((n - t) / 1e3)
                  , r = n;
                return t >= 400 && t < 600 && (r = "".concat(i, "400-").concat(i, "599")),
                "JW Player ".concat(n > 299999 && n < 4e5 ? "Warning" : "Error", " ").concat(n, ". For more information see https://developer.jwplayer.com/jw-player/docs/developer-guide/api/errors-reference#").concat(r)
            }
        }],
        (r = null) && f(t.prototype, r),
        i && f(t, i),
        n
    }()
}
, function(n, t, i) {
    "use strict";
    function o(n) {
        return n.replace(/^\s+|\s+$/g, "")
    }
    function f(n, t, i) {
        for (n = "" + n,
        i = i || "0"; n.length < t; )
            n = i + n;
        return n
    }
    function s(n, t) {
        for (var r = n.attributes, i = 0; i < r.length; i++)
            if (r[i].name && r[i].name.toLowerCase() === t.toLowerCase())
                return r[i].value.toString();
        return ""
    }
    function h(n) {
        if (!n || "rtmp" === n.substr(0, 4))
            return "";
        var t = /[(,]format=(m3u8|mpd)-/i.exec(n);
        return t ? t[1] : (n = n.split("?")[0].split("#")[0]).lastIndexOf(".") > -1 ? n.substr(n.lastIndexOf(".") + 1, n.length).toLowerCase() : void 0
    }
    function c(n) {
        var t = (n / 60 | 0) % 60
          , i = n % 60;
        return f(n / 3600 | 0, 2) + ":" + f(t, 2) + ":" + f(i.toFixed(3), 6)
    }
    function e(n, t) {
        var e;
        if (!n)
            return 0;
        if (Object(u.A)(n))
            return n;
        var f = n.replace(",", ".")
          , h = f.slice(-1)
          , o = f.split(":")
          , s = o.length
          , i = 0;
        return "s" === h ? i = r(f) : "m" === h ? i = 60 * r(f) : "h" === h ? i = 3600 * r(f) : s > 1 ? (e = s - 1,
        4 === s && (t && (i = r(o[e]) / t),
        e -= 1),
        i += r(o[e]),
        i += 60 * r(o[e - 1]),
        s >= 3 && (i += 3600 * r(o[e - 2]))) : i = r(f),
        Object(u.A)(i) ? i : 0
    }
    function l(n, t, i) {
        if (Object(u.y)(n) && "%" === n.slice(-1)) {
            var f = r(n);
            return t && Object(u.A)(t) && Object(u.A)(f) ? t * f / 100 : null
        }
        return e(n, i)
    }
    function a(n, t) {
        return n.map(function(n) {
            return t + n
        })
    }
    function v(n, t) {
        return n.map(function(n) {
            return n + t
        })
    }
    function y(n) {
        return "string" == typeof n && "%" === n.slice(-1)
    }
    i.d(t, "i", function() {
        return o
    });
    i.d(t, "e", function() {
        return f
    });
    i.d(t, "j", function() {
        return s
    });
    i.d(t, "a", function() {
        return h
    });
    i.d(t, "b", function() {
        return c
    });
    i.d(t, "g", function() {
        return e
    });
    i.d(t, "d", function() {
        return l
    });
    i.d(t, "f", function() {
        return a
    });
    i.d(t, "h", function() {
        return v
    });
    i.d(t, "c", function() {
        return y
    });
    var u = i(0)
      , r = window.parseFloat
}
, function(n, t, i) {
    "use strict";
    i.d(t, "kb", function() {
        return f
    });
    i.d(t, "nb", function() {
        return e
    });
    i.d(t, "lb", function() {
        return r
    });
    i.d(t, "pb", function() {
        return o
    });
    i.d(t, "qb", function() {
        return s
    });
    i.d(t, "mb", function() {
        return u
    });
    i.d(t, "ob", function() {
        return h
    });
    i.d(t, "rb", function() {
        return c
    });
    i.d(t, "s", function() {
        return l
    });
    i.d(t, "u", function() {
        return a
    });
    i.d(t, "t", function() {
        return v
    });
    i.d(t, "n", function() {
        return y
    });
    i.d(t, "q", function() {
        return p
    });
    i.d(t, "sb", function() {
        return w
    });
    i.d(t, "r", function() {
        return b
    });
    i.d(t, "Z", function() {
        return k
    });
    i.d(t, "W", function() {
        return d
    });
    i.d(t, "v", function() {
        return g
    });
    i.d(t, "Y", function() {
        return nt
    });
    i.d(t, "w", function() {
        return tt
    });
    i.d(t, "ub", function() {
        return it
    });
    i.d(t, "a", function() {
        return rt
    });
    i.d(t, "b", function() {
        return ut
    });
    i.d(t, "c", function() {
        return ft
    });
    i.d(t, "d", function() {
        return et
    });
    i.d(t, "e", function() {
        return ot
    });
    i.d(t, "h", function() {
        return st
    });
    i.d(t, "F", function() {
        return ht
    });
    i.d(t, "hb", function() {
        return ct
    });
    i.d(t, "Q", function() {
        return lt
    });
    i.d(t, "C", function() {
        return at
    });
    i.d(t, "B", function() {
        return vt
    });
    i.d(t, "E", function() {
        return yt
    });
    i.d(t, "p", function() {
        return pt
    });
    i.d(t, "cb", function() {
        return wt
    });
    i.d(t, "m", function() {
        return bt
    });
    i.d(t, "G", function() {
        return kt
    });
    i.d(t, "H", function() {
        return dt
    });
    i.d(t, "N", function() {
        return gt
    });
    i.d(t, "O", function() {
        return ni
    });
    i.d(t, "R", function() {
        return ti
    });
    i.d(t, "jb", function() {
        return ii
    });
    i.d(t, "bb", function() {
        return ri
    });
    i.d(t, "D", function() {
        return ui
    });
    i.d(t, "S", function() {
        return fi
    });
    i.d(t, "P", function() {
        return ei
    });
    i.d(t, "T", function() {
        return oi
    });
    i.d(t, "V", function() {
        return si
    });
    i.d(t, "M", function() {
        return hi
    });
    i.d(t, "L", function() {
        return ci
    });
    i.d(t, "K", function() {
        return li
    });
    i.d(t, "I", function() {
        return ai
    });
    i.d(t, "J", function() {
        return vi
    });
    i.d(t, "U", function() {
        return yi
    });
    i.d(t, "o", function() {
        return pi
    });
    i.d(t, "y", function() {
        return wi
    });
    i.d(t, "ib", function() {
        return bi
    });
    i.d(t, "db", function() {
        return ki
    });
    i.d(t, "eb", function() {
        return di
    });
    i.d(t, "f", function() {
        return gi
    });
    i.d(t, "g", function() {
        return nr
    });
    i.d(t, "ab", function() {
        return tr
    });
    i.d(t, "A", function() {
        return ir
    });
    i.d(t, "l", function() {
        return rr
    });
    i.d(t, "k", function() {
        return ur
    });
    i.d(t, "fb", function() {
        return fr
    });
    i.d(t, "gb", function() {
        return er
    });
    i.d(t, "tb", function() {
        return or
    });
    i.d(t, "z", function() {
        return sr
    });
    i.d(t, "j", function() {
        return hr
    });
    i.d(t, "X", function() {
        return cr
    });
    i.d(t, "i", function() {
        return lr
    });
    i.d(t, "x", function() {
        return ar
    });
    var f = "buffering"
      , e = "idle"
      , r = "complete"
      , o = "paused"
      , s = "playing"
      , u = "error"
      , h = "loading"
      , c = "stalled"
      , l = "drag"
      , a = "dragStart"
      , v = "dragEnd"
      , y = "click"
      , p = "doubleClick"
      , w = "tap"
      , b = "doubleTap"
      , k = "over"
      , d = "move"
      , g = "enter"
      , nt = "out"
      , tt = u
      , it = "warning"
      , rt = "adClick"
      , ut = "adPause"
      , ft = "adPlay"
      , et = "adSkipped"
      , ot = "adTime"
      , st = "autostartNotAllowed"
      , ht = r
      , ct = "ready"
      , lt = "seek"
      , at = "beforePlay"
      , vt = "beforeComplete"
      , yt = "bufferFull"
      , pt = "displayClick"
      , wt = "playlistComplete"
      , bt = "cast"
      , kt = "mediaError"
      , dt = "firstFrame"
      , gt = "playAttempt"
      , ni = "playAttemptFailed"
      , ti = "seeked"
      , ii = "setupError"
      , ri = "state"
      , ui = "bufferChange"
      , fi = "time"
      , ei = "ratechange"
      , oi = "mediaType"
      , si = "volume"
      , hi = "mute"
      , ci = "metadataCueParsed"
      , li = "meta"
      , ai = "levels"
      , vi = "levelsChanged"
      , yi = "visualQuality"
      , pi = "controls"
      , wi = "fullscreen"
      , bi = "resize"
      , ki = "playlistItem"
      , di = "playlist"
      , gi = "audioTracks"
      , nr = "audioTrackChanged"
      , tr = "playbackRateChanged"
      , ir = "logoClick"
      , rr = "captionsList"
      , ur = "captionsChanged"
      , fr = "providerChanged"
      , er = "providerFirstFrame"
      , or = "userAction"
      , sr = "instreamClick"
      , hr = "breakpoint"
      , cr = "fullscreenchange"
      , lr = "bandwidthEstimate"
      , ar = "float"
}
, function(n, t, i) {
    "use strict";
    function u(n) {
        var t = "";
        return n && (n.localName ? t = n.localName : n.baseName && (t = n.baseName)),
        t
    }
    function f(n) {
        var t = "";
        return n && (n.textContent ? t = Object(r.i)(n.textContent) : n.text && (t = Object(r.i)(n.text))),
        t
    }
    function e(n, t) {
        return n.childNodes[t]
    }
    function o(n) {
        return n.childNodes ? n.childNodes.length : 0
    }
    i.d(t, "b", function() {
        return u
    });
    i.d(t, "d", function() {
        return f
    });
    i.d(t, "a", function() {
        return e
    });
    i.d(t, "c", function() {
        return o
    });
    var r = i(2)
}
, function(n, t, i) {
    "use strict";
    function f(n, t) {
        if (n && n.length > t)
            return n[t]
    }
    var u, r;
    i.r(t);
    u = i(7);
    r = i(0);
    i.d(t, "Browser", function() {
        return e
    });
    i.d(t, "OS", function() {
        return o
    });
    i.d(t, "Features", function() {
        return h
    });
    var s = navigator.userAgent
      , e = {}
      , o = {}
      , h = {};
    Object.defineProperties(e, {
        androidNative: {
            get: Object(r.D)(u.c),
            enumerable: !0
        },
        chrome: {
            get: Object(r.D)(u.d),
            enumerable: !0
        },
        edge: {
            get: Object(r.D)(u.e),
            enumerable: !0
        },
        facebook: {
            get: Object(r.D)(u.g),
            enumerable: !0
        },
        firefox: {
            get: Object(r.D)(u.f),
            enumerable: !0
        },
        ie: {
            get: Object(r.D)(u.i),
            enumerable: !0
        },
        msie: {
            get: Object(r.D)(u.n),
            enumerable: !0
        },
        safari: {
            get: Object(r.D)(u.q),
            enumerable: !0
        },
        version: {
            get: Object(r.D)(function(n, t) {
                var i, u, f, r;
                return n.chrome ? i = -1 !== t.indexOf("Chrome") ? t.substring(t.indexOf("Chrome") + 7) : t.substring(t.indexOf("CriOS") + 6) : n.safari ? i = t.substring(t.indexOf("Version") + 8) : n.firefox ? i = t.substring(t.indexOf("Firefox") + 8) : n.edge ? i = t.substring(t.indexOf("Edge") + 5) : n.ie && (-1 !== t.indexOf("rv:") ? i = t.substring(t.indexOf("rv:") + 3) : -1 !== t.indexOf("MSIE") && (i = t.substring(t.indexOf("MSIE") + 5))),
                i && (-1 !== (r = i.indexOf(";")) && (i = i.substring(0, r)),
                -1 !== (r = i.indexOf(" ")) && (i = i.substring(0, r)),
                -1 !== (r = i.indexOf(")")) && (i = i.substring(0, r)),
                u = parseInt(i, 10),
                f = parseInt(i.split(".")[1], 10)),
                {
                    version: i,
                    major: u,
                    minor: f
                }
            }
            .bind(void 0, e, s)),
            enumerable: !0
        }
    });
    Object.defineProperties(o, {
        android: {
            get: Object(r.D)(u.b),
            enumerable: !0
        },
        iOS: {
            get: Object(r.D)(u.j),
            enumerable: !0
        },
        mobile: {
            get: Object(r.D)(u.o),
            enumerable: !0
        },
        mac: {
            get: Object(r.D)(u.p),
            enumerable: !0
        },
        iPad: {
            get: Object(r.D)(u.k),
            enumerable: !0
        },
        iPhone: {
            get: Object(r.D)(u.l),
            enumerable: !0
        },
        windows: {
            get: Object(r.D)(function() {
                return s.indexOf("Windows") > -1
            }),
            enumerable: !0
        },
        version: {
            get: Object(r.D)(function(n, t) {
                var i, u, e, r;
                if (n.windows)
                    switch (i = f(/Windows(?: NT|)? ([._\d]+)/.exec(t), 1)) {
                    case "6.1":
                        i = "7.0";
                        break;
                    case "6.2":
                        i = "8.0";
                        break;
                    case "6.3":
                        i = "8.1"
                    }
                else
                    n.android ? i = f(/Android ([._\d]+)/.exec(t), 1) : n.iOS ? i = f(/OS ([._\d]+)/.exec(t), 1) : n.mac && (i = f(/Mac OS X (10[._\d]+)/.exec(t), 1));
                return i && (u = parseInt(i, 10),
                r = i.split(/[._]/),
                r && (e = parseInt(r[1], 10))),
                {
                    version: i,
                    major: u,
                    minor: e
                }
            }
            .bind(void 0, o, s)),
            enumerable: !0
        }
    });
    Object.defineProperties(h, {
        flash: {
            get: Object(r.D)(u.h),
            enumerable: !0
        },
        flashVersion: {
            get: Object(r.D)(u.a),
            enumerable: !0
        },
        iframe: {
            get: Object(r.D)(u.m),
            enumerable: !0
        },
        passiveEvents: {
            get: Object(r.D)(function() {
                var t = !1, n;
                try {
                    n = Object.defineProperty({}, "passive", {
                        get: function() {
                            return t = !0
                        }
                    });
                    window.addEventListener("testPassive", null, n);
                    window.removeEventListener("testPassive", null, n)
                } catch (t) {}
                return t
            }),
            enumerable: !0
        },
        backgroundLoading: {
            get: Object(r.D)(function() {
                return !(o.iOS || e.safari)
            }),
            enumerable: !0
        }
    })
}
, function(n, t, i) {
    "use strict";
    function h(n, t) {
        return n.classList.contains(t)
    }
    function w(n) {
        return f(n).firstChild
    }
    function b(n, t) {
        s(n),
        function(n, t) {
            if (t) {
                for (var r = document.createDocumentFragment(), u = f(t).childNodes, i = 0; i < u.length; i++)
                    r.appendChild(u[i].cloneNode(!0));
                n.appendChild(r)
            }
        }(n, t)
    }
    function f(n) {
        var t, i, r;
        for (u || (u = new DOMParser),
        t = u.parseFromString(n, "text/html").body,
        c(t),
        i = t.querySelectorAll("*"),
        r = i.length; r--; )
            l(i[r]);
        return t
    }
    function c(n) {
        for (var r, t = n.querySelectorAll("script,object,iframe"), i = t.length; i--; )
            r = t[i],
            r.parentNode.removeChild(r);
        return n
    }
    function l(n) {
        for (var r, t = n.attributes, i = t.length; i--; )
            r = t[i].name,
            /^on/.test(r) && n.removeAttribute(r);
        return n
    }
    function k(n) {
        return n + (n.toString().indexOf("%") > 0 ? "" : "px")
    }
    function e(n) {
        return Object(r.y)(n.className) ? n.className.split(" ") : []
    }
    function o(n, t) {
        t = Object(y.i)(t);
        n.className !== t && (n.className = t)
    }
    function d(n) {
        return n.classList ? n.classList : e(n)
    }
    function a(n, t) {
        var i = e(n);
        (Array.isArray(t) ? t : t.split(" ")).forEach(function(n) {
            Object(r.e)(i, n) || i.push(n)
        });
        o(n, i.join(" "))
    }
    function v(n, t) {
        var i = e(n)
          , u = Array.isArray(t) ? t : t.split(" ");
        o(n, Object(r.i)(i, u).join(" "))
    }
    function g(n, t, i) {
        var r = n.className || "";
        t.test(r) ? r = r.replace(t, i) : i && (r += " " + i);
        o(n, r)
    }
    function nt(n, t, i) {
        var u = h(n, t);
        (i = Object(r.s)(i) ? i : !u) !== u && (i ? a(n, t) : v(n, t))
    }
    function tt(n, t, i) {
        n.setAttribute(t, i)
    }
    function s(n) {
        for (; n.firstChild; )
            n.removeChild(n.firstChild)
    }
    function it(n) {
        var t = document.createElement("link");
        t.rel = "stylesheet";
        t.href = n;
        document.getElementsByTagName("head")[0].appendChild(t)
    }
    function rt(n) {
        n && s(n)
    }
    function ut(n) {
        var i = {
            left: 0,
            right: 0,
            width: 0,
            height: 0,
            top: 0,
            bottom: 0
        };
        if (!n || !document.body.contains(n))
            return i;
        var t = n.getBoundingClientRect()
          , r = window.pageYOffset
          , u = window.pageXOffset;
        return t.width || t.height || t.left || t.top ? (i.left = t.left + u,
        i.right = t.right + u,
        i.top = t.top + r,
        i.bottom = t.bottom + r,
        i.width = t.right - t.left,
        i.height = t.bottom - t.top,
        i) : i
    }
    function ft(n, t) {
        n.insertBefore(t, n.firstChild)
    }
    function et(n) {
        return n.nextElementSibling
    }
    function ot(n) {
        return n.previousElementSibling
    }
    function st(n, t) {
        var u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
          , i = document.createElement("a");
        i.href = n;
        i.target = t;
        i = Object(r.k)(i, u);
        p.Browser.firefox ? i.dispatchEvent(new MouseEvent("click",{
            bubbles: !0,
            cancelable: !0,
            view: window
        })) : i.click()
    }
    function ht() {
        var n = window.screen.orientation;
        return !!n && ("landscape-primary" === n.type || "landscape-secondary" === n.type) || 90 === window.orientation || -90 === window.orientation
    }
    i.d(t, "i", function() {
        return h
    });
    i.d(t, "e", function() {
        return w
    });
    i.d(t, "q", function() {
        return b
    });
    i.d(t, "j", function() {
        return f
    });
    i.d(t, "s", function() {
        return c
    });
    i.d(t, "r", function() {
        return l
    });
    i.d(t, "u", function() {
        return k
    });
    i.d(t, "d", function() {
        return d
    });
    i.d(t, "a", function() {
        return a
    });
    i.d(t, "o", function() {
        return v
    });
    i.d(t, "p", function() {
        return g
    });
    i.d(t, "v", function() {
        return nt
    });
    i.d(t, "t", function() {
        return tt
    });
    i.d(t, "h", function() {
        return s
    });
    i.d(t, "b", function() {
        return it
    });
    i.d(t, "g", function() {
        return rt
    });
    i.d(t, "c", function() {
        return ut
    });
    i.d(t, "m", function() {
        return ft
    });
    i.d(t, "k", function() {
        return et
    });
    i.d(t, "n", function() {
        return ot
    });
    i.d(t, "l", function() {
        return st
    });
    i.d(t, "f", function() {
        return ht
    });
    var u, r = i(0), y = i(2), p = i(5)
}
, function(n, t, i) {
    "use strict";
    function r(n) {
        return null !== o.match(n)
    }
    function u(n) {
        return function() {
            return r(n)
        }
    }
    function a() {
        var n = l();
        return !!(n && n >= 18)
    }
    function e() {
        return r(/\sEdge\/\d+/i)
    }
    function h() {
        return r(/msie/i)
    }
    function k() {
        return r(/\s(?:(?:Headless)?Chrome|CriOS)\//i) && !e() && !r(/UCBrowser/i)
    }
    function d() {
        return e() || v() || h()
    }
    function g() {
        return r(/safari/i) && !r(/(?:Chrome|CriOS|chromium|android|phantom)/i)
    }
    function c() {
        return r(/iP(hone|ad|od)/i)
    }
    function nt() {
        return !(r(/chrome\/[123456789]/i) && !r(/chrome\/18/i) && !s()) && f()
    }
    function f() {
        return r(/Android/i) && !r(/Windows Phone/i)
    }
    function tt() {
        return c() || f() || r(/Windows Phone/i)
    }
    function it() {
        try {
            return window.self !== window.top
        } catch (n) {
            return !0
        }
    }
    function l() {
        if (f())
            return 0;
        var n, t = navigator.plugins;
        if (t && (n = t["Shockwave Flash"]) && n.description)
            return parseFloat(n.description.replace(/\D+(\d+\.?\d*).*/, "$1"));
        if (void 0 !== window.ActiveXObject) {
            try {
                if (n = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash"))
                    return parseFloat(n.GetVariable("$version").split(" ")[1].replace(/\s*,\s*/, "."))
            } catch (n) {
                return 0
            }
            return n
        }
        return 0
    }
    var o;
    i.d(t, "h", function() {
        return a
    });
    i.d(t, "f", function() {
        return s
    });
    i.d(t, "l", function() {
        return y
    });
    i.d(t, "k", function() {
        return p
    });
    i.d(t, "p", function() {
        return w
    });
    i.d(t, "g", function() {
        return b
    });
    i.d(t, "e", function() {
        return e
    });
    i.d(t, "n", function() {
        return h
    });
    i.d(t, "d", function() {
        return k
    });
    i.d(t, "i", function() {
        return d
    });
    i.d(t, "q", function() {
        return g
    });
    i.d(t, "j", function() {
        return c
    });
    i.d(t, "c", function() {
        return nt
    });
    i.d(t, "b", function() {
        return f
    });
    i.d(t, "o", function() {
        return tt
    });
    i.d(t, "m", function() {
        return it
    });
    i.d(t, "a", function() {
        return l
    });
    o = navigator.userAgent;
    var s = u(/gecko\//i)
      , v = u(/trident\/.+rv:\s*11/i)
      , y = u(/iP(hone|od)/i)
      , p = u(/iPad/i)
      , w = u(/Macintosh/i)
      , b = u(/FBAV/i)
}
, function(n, t, i) {
    "use strict";
    function r(n) {
        return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
            return typeof n
        }
        : function(n) {
            return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
        }
        )(n)
    }
    function e(n) {
        switch (r(n)) {
        case "string":
            return n.length > 0;
        case "object":
            return null !== n;
        case "undefined":
            return !1;
        default:
            return !0
        }
    }
    function o() {
        return "https:" === u
    }
    function s() {
        return "file:" === u
    }
    function h(n, t) {
        return 0 === n.indexOf("rtmp:") || "rtmp" === t
    }
    function c(n, t) {
        return "youtube" === t || /^(http|\/\/).*(youtube\.com|youtu\.be)\/.+/.test(n)
    }
    function l(n) {
        if (null === n)
            return "null";
        var t = r(n);
        return "object" === t && Array.isArray(n) ? "array" : t
    }
    function f(n, t, i) {
        var u = Object.keys(n);
        return Object.keys(t).length >= u.length && u.every(function(u) {
            var e = n[u]
              , o = t[u];
            return e && "object" === r(e) ? !(!o || "object" !== r(o)) && f(e, o, i) : i(u, n)
        })
    }
    i.r(t);
    i.d(t, "exists", function() {
        return e
    });
    i.d(t, "isHTTPS", function() {
        return o
    });
    i.d(t, "isFileProtocol", function() {
        return s
    });
    i.d(t, "isRtmp", function() {
        return h
    });
    i.d(t, "isYouTube", function() {
        return c
    });
    i.d(t, "typeOf", function() {
        return l
    });
    i.d(t, "isDeepKeyCompliant", function() {
        return f
    });
    var u = window.location.protocol
}
, function(n, t, i) {
    "use strict";
    function o(n) {
        return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
            return typeof n
        }
        : function(n) {
            return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
        }
        )(n)
    }
    function s(n, t) {
        for (var i, r = 0; r < t.length; r++)
            i = t[r],
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(n, i.key, i)
    }
    function u(n, t, i, r) {
        var u;
        if (!i)
            return !0;
        if ("object" === o(i)) {
            for (u in i)
                Object.prototype.hasOwnProperty.call(i, u) && n[t].apply(n, [u, i[u]].concat(r));
            return !1
        }
        if (e.test(i)) {
            for (var s = i.split(e), f = 0, h = s.length; f < h; f++)
                n[t].apply(n, [s[f]].concat(r));
            return !1
        }
        return !0
    }
    function f(n, t, i, r) {
        for (var u, f = -1, e = n.length; ++f < e; )
            if (u = n[f],
            r)
                try {
                    u.callback.apply(u.context || i, t)
                } catch (n) {
                    console.log('Error in "' + r + '" event handler:', n)
                }
            else
                u.callback.apply(u.context || i, t)
    }
    var e;
    i.d(t, "a", function() {
        return r
    });
    i.d(t, "c", function() {
        return c
    });
    i.d(t, "d", function() {
        return l
    });
    i.d(t, "b", function() {
        return a
    });
    i.d(t, "e", function() {
        return v
    });
    i.d(t, "f", function() {
        return y
    });
    var h = [].slice
      , r = function() {
        function n() {
            !function(n, t) {
                if (!(n instanceof t))
                    throw new TypeError("Cannot call a class as a function");
            }(this, n)
        }
        var t, i, r;
        return t = n,
        (i = [{
            key: "on",
            value: function(n, t, i) {
                if (!u(this, "on", n, [t, i]) || !t)
                    return this;
                var r = this._events || (this._events = {});
                return (r[n] || (r[n] = [])).push({
                    callback: t,
                    context: i
                }),
                this
            }
        }, {
            key: "once",
            value: function(n, t, i) {
                if (!u(this, "once", n, [t, i]) || !t)
                    return this;
                var f = 0
                  , e = this
                  , r = function i() {
                    f++ || (e.off(n, i),
                    t.apply(this, arguments))
                };
                return r._callback = t,
                this.on(n, r, i)
            }
        }, {
            key: "off",
            value: function(n, t, i) {
                var f, s, e, c, r;
                if (!this._events || !u(this, "off", n, [t, i]))
                    return this;
                if (!n && !t && !i)
                    return delete this._events,
                    this;
                for (var h = n ? [n] : Object.keys(this._events), o = 0, l = h.length; o < l; o++)
                    if (n = h[o],
                    f = this._events[n],
                    f) {
                        if (s = this._events[n] = [],
                        t || i)
                            for (e = 0,
                            c = f.length; e < c; e++)
                                r = f[e],
                                (t && t !== r.callback && t !== r.callback._callback || i && i !== r.context) && s.push(r);
                        s.length || delete this._events[n]
                    }
                return this
            }
        }, {
            key: "trigger",
            value: function(n) {
                var t, i, r;
                return this._events ? (t = h.call(arguments, 1),
                !u(this, "trigger", n, t)) ? this : (i = this._events[n],
                r = this._events.all,
                i && f(i, t, this),
                r && f(r, arguments, this),
                this) : this
            }
        }, {
            key: "triggerSafe",
            value: function(n) {
                var t, i, r;
                return this._events ? (t = h.call(arguments, 1),
                !u(this, "trigger", n, t)) ? this : (i = this._events[n],
                r = this._events.all,
                i && f(i, t, this, n),
                r && f(r, arguments, this, n),
                this) : this
            }
        }]) && s(t.prototype, i),
        r && s(t, r),
        n
    }()
      , c = r.prototype.on
      , l = r.prototype.once
      , a = r.prototype.off
      , v = r.prototype.trigger
      , y = r.prototype.triggerSafe;
    r.on = c;
    r.once = l;
    r.off = a;
    r.trigger = v;
    e = /\s+/
}
, function(n, t, i) {
    "use strict";
    function v(n) {
        return e || (e = function(n) {
            var t = n.get("controls"), v = c(), y = function(n, t) {
                var r = n.get("playlist"), u, i, e;
                if (Array.isArray(r) && r.length)
                    for (u = Object(a.c)(Object(l.a)(r[0]), n),
                    i = 0; i < u.length; i++)
                        for (var o = u[i], h = n.getProviders(), f = 0; f < s.a.length; f++)
                            if (e = s.a[f],
                            h.providerSupports(e, o))
                                return e.name === t;
                return !1
            }(n, "html5"), e;
            return t && v && y ? (e = i.e(6).then(function() {
                i(37);
                var n = i(22).default;
                return f.a.controls = i(21).default,
                Object(h.a)(i(51).default),
                n
            }
            .bind(null, i)).catch(u(r.t + 105)),
            o.html5 = e,
            e) : t && y ? function() {
                var n = i.e(4).then(function() {
                    var n = i(22).default;
                    return f.a.controls = i(21).default,
                    Object(h.a)(i(51).default),
                    n
                }
                .bind(null, i)).catch(u(r.t + 104));
                return o.html5 = n,
                n
            }() : t && v ? i.e(5).then(function() {
                i(37);
                var n = i(22).default;
                return f.a.controls = i(21).default,
                n
            }
            .bind(null, i)).catch(u(r.t + 103)) : t ? i.e(3).then(function() {
                var n = i(22).default;
                return f.a.controls = i(21).default,
                n
            }
            .bind(null, i)).catch(u(r.t + 102)) : (c() ? i.e(8).then(function() {
                return i(37)
            }
            .bind(null, i)).catch(u(r.t + 120)) : Promise.resolve()).then(function() {
                return i.e(2).then(function() {
                    return i(22).default
                }
                .bind(null, i)).catch(u(r.t + 101))
            })
        }(n)),
        e
    }
    function u(n, t) {
        return function() {
            throw new r.s(r.m,n,t);
        }
    }
    function y(n, t) {
        return function() {
            throw new r.s(null,n,t);
        }
    }
    function c() {
        var n = window.IntersectionObserverEntry;
        return !(n && "IntersectionObserver"in window && "intersectionRatio"in n.prototype)
    }
    i.d(t, "a", function() {
        return o
    });
    i.d(t, "d", function() {
        return v
    });
    i.d(t, "b", function() {
        return u
    });
    i.d(t, "c", function() {
        return y
    });
    var l = i(29)
      , a = i(30)
      , s = i(17)
      , h = i(13)
      , f = i(38)
      , r = i(1)
      , e = null
      , o = {}
}
, function(n, t, i) {
    "use strict";
    function e(n) {
        return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
            return typeof n
        }
        : function(n) {
            return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
        }
        )(n)
    }
    function c(n, t, i, r) {
        var s, h, o;
        i = i || "all-players";
        s = "";
        "object" === e(t) ? (h = document.createElement("div"),
        f(h, t),
        o = h.style.cssText,
        Object.prototype.hasOwnProperty.call(t, "content") && o && (o = "".concat(o, ' content: "').concat(t.content, '";')),
        r && o && (o = o.replace(/;/g, " !important;")),
        s = "{" + o + "}") : "string" == typeof t && (s = t);
        "" !== s && "{}" !== s ? u.a.style([[n, n + s]], i) : u.a.clear(i, n)
    }
    function f(n, t) {
        var i, r, u, f, e;
        if (null != n) {
            void 0 === n.length && (n = [n]);
            r = {};
            for (i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (r[i] = a(i, t[i]));
            for (u = 0; u < n.length; u++)
                if (f = n[u],
                e = void 0,
                null != f)
                    for (i in r)
                        Object.prototype.hasOwnProperty.call(r, i) && (e = l(i),
                        f.style[e] !== r[i] && (f.style[e] = r[i]))
        }
    }
    function l(n) {
        n = n.split("-");
        for (var t = 1; t < n.length; t++)
            n[t] = n[t].charAt(0).toUpperCase() + n[t].slice(1);
        return n.join("")
    }
    function a(n, t) {
        return "" === t || null == t ? "" : "string" == typeof t && isNaN(t) ? /png|gif|jpe?g/i.test(t) && t.indexOf("url") < 0 ? "url(" + t + ")" : t : 0 === t || "z-index" === n || "opacity" === n ? "" + t : /color/i.test(n) ? "#" + Object(s.e)(t.toString(16).replace(/^0x/i, ""), 6) : Math.ceil(t) + "px"
    }
    function v(n, t) {
        f(n, {
            transform: t,
            webkitTransform: t,
            msTransform: t,
            mozTransform: t,
            oTransform: t
        })
    }
    function y(n, t) {
        var i = "rgb", e = void 0 !== t && 100 !== t, u, f;
        return (e && (i += "a"),
        r) || (u = document.createElement("canvas"),
        u.height = 1,
        u.width = 1,
        r = u.getContext("2d")),
        n ? isNaN(parseInt(n, 16)) || (n = "#" + n) : n = "#000000",
        r.clearRect(0, 0, 1, 1),
        r.fillStyle = n,
        r.fillRect(0, 0, 1, 1),
        f = r.getImageData(0, 0, 1, 1).data,
        i += "(" + f[0] + ", " + f[1] + ", " + f[2],
        e && (i += ", " + t / 100),
        i + ")"
    }
    var r, o;
    i.d(t, "a", function() {
        return o
    });
    i.d(t, "b", function() {
        return c
    });
    i.d(t, "d", function() {
        return f
    });
    i.d(t, "e", function() {
        return v
    });
    i.d(t, "c", function() {
        return y
    });
    var s = i(2)
      , h = i(41)
      , u = i.n(h);
    o = u.a.clear
}
, function(n, t, i) {
    "use strict";
    function e(n, t) {
        var i, e, h, o, s, u;
        if (Object(r.exists)(t) || (t = document.location.href),
        Object(r.exists)(n)) {
            if (f(n))
                return n;
            for (e = t.substring(0, t.indexOf("://") + 3),
            h = t.substring(e.length, t.indexOf("/", e.length + 1)),
            0 === n.indexOf("/") ? i = n.split("/") : (o = t.split("?")[0],
            i = (o = o.substring(e.length + h.length + 1, o.lastIndexOf("/"))).split("/").concat(n.split("/"))),
            s = [],
            u = 0; u < i.length; u++)
                i[u] && Object(r.exists)(i[u]) && "." !== i[u] && (".." === i[u] ? s.pop() : s.push(i[u]));
            return e + h + "/" + s.join("/")
        }
    }
    function f(n) {
        return /^(?:(?:https?|file):)?\/\//.test(n)
    }
    function o(n) {
        var t = null;
        try {
            (t = (new window.DOMParser).parseFromString(n, "text/xml")).querySelector("parsererror") && (t = null)
        } catch (n) {}
        return t
    }
    function s(n) {
        if (void 0 === n)
            return null;
        if ("string" == typeof n && n.length < 6) {
            var t = n.toLowerCase();
            if ("true" === t)
                return !0;
            if ("false" === t)
                return !1;
            if (!Object(u.v)(Number(n)) && !Object(u.v)(parseFloat(n)))
                return Number(n)
        }
        return n
    }
    function h(n) {
        return "string" == typeof n ? "" === n ? 0 : n.lastIndexOf("%") > -1 ? n : parseInt(n.replace("px", ""), 10) : n
    }
    function c(n, t) {
        var r;
        if (n <= 0 && !t || Object(u.v)(parseInt(n)))
            return "00:00";
        r = n < 0 ? "-" : "";
        n = Math.abs(n);
        var i = Math.floor(n / 3600)
          , f = Math.floor((n - 3600 * i) / 60)
          , e = Math.floor(n % 60);
        return r + (i ? i + ":" : "") + (f < 10 ? "0" : "") + f + ":" + (e < 10 ? "0" : "") + e
    }
    i.r(t);
    i.d(t, "getAbsolutePath", function() {
        return e
    });
    i.d(t, "isAbsolutePath", function() {
        return f
    });
    i.d(t, "parseXML", function() {
        return o
    });
    i.d(t, "serialize", function() {
        return s
    });
    i.d(t, "parseDimension", function() {
        return h
    });
    i.d(t, "timeFormat", function() {
        return c
    });
    var r = i(8)
      , u = i(0)
}
, function(n, t, i) {
    "use strict";
    function o(n) {
        var t = n.getName().name;
        if (!u.a[t]) {
            if (!Object(r.m)(f.a, Object(r.C)({
                name: t
            }))) {
                if (!Object(r.u)(n.supports))
                    throw new Error("Tried to register a provider with an invalid object");
                f.a.unshift({
                    name: t,
                    supports: n.supports
                })
            }
            Object(r.h)(n.prototype, e.a);
            u.a[t] = n
        }
    }
    i.d(t, "a", function() {
        return o
    });
    var u = i(33)
      , f = i(17)
      , e = i(57)
      , r = i(0)
}
, function(n, t, i) {
    "use strict";
    function e(n) {
        var t = s(n)
          , i = t.indexOf("_");
        return -1 === i ? t : t.substring(0, i)
    }
    function s(n) {
        return n.toLowerCase().replace("-", "_")
    }
    function b(n) {
        return n ? Object.keys(n).reduce(function(t, i) {
            return t[s(i)] = n[i],
            t
        }, {}) : {}
    }
    function k(n) {
        if (n)
            return 3 === n.length ? n : h[e(n)] || n
    }
    function d(n) {
        return w[n] || ""
    }
    function c(n) {
        var t = n.querySelector("html");
        return t ? t.getAttribute("lang") : null
    }
    function g() {
        var n = c(document);
        if (!n && Object(a.m)())
            try {
                n = c(window.top.document)
            } catch (n) {}
        return n || navigator.language || "en"
    }
    function nt(n) {
        return 8207 === n.charCodeAt(0) || /^[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(n)
    }
    function tt(n) {
        return l.indexOf(e(n)) >= 0
    }
    function it(n, t, i) {
        return Object(u.k)({}, function(n) {
            var i = n.advertising, o = n.related, f = n.sharing, s = n.abouttext, t = Object(u.k)({}, n.localization), e;
            return i && (t.advertising = t.advertising || {},
            r(t.advertising, i, "admessage"),
            r(t.advertising, i, "cuetext"),
            r(t.advertising, i, "loadingAd"),
            r(t.advertising, i, "podmessage"),
            r(t.advertising, i, "skipmessage"),
            r(t.advertising, i, "skiptext")),
            t.related = "string" == typeof t.related ? {
                heading: t.related
            } : t.related || {},
            o && r(t.related, o, "autoplaymessage"),
            f && (t.sharing = t.sharing || {},
            r(t.sharing, f, "heading"),
            r(t.sharing, f, "copied")),
            s && r(t, n, "abouttext"),
            e = t.close || t.nextUpClose,
            e && (t.close = e),
            t
        }(n), t[e(i)], t[s(i)])
    }
    function r(n, t, i) {
        var r = n[i] || t[i];
        r && (n[i] = r)
    }
    function rt(n) {
        return Object(y.isDeepKeyCompliant)(p.a, n, function(n, t) {
            return "string" == typeof t[n]
        })
    }
    function ut(n, t) {
        var i = o[t], r;
        return i || (r = "".concat(n, "translations/").concat(e(t), ".json"),
        o[t] = i = new Promise(function(n, i) {
            Object(v.a)({
                url: r,
                oncomplete: n,
                onerror: function(n, r, u, f) {
                    o[t] = null;
                    i(f)
                },
                responseType: "json"
            })
        }
        )),
        i
    }
    function ft(n, t) {
        var i = Object(u.k)({}, n, t);
        return f(i, "errors", n, t),
        f(i, "related", n, t),
        f(i, "sharing", n, t),
        f(i, "advertising", n, t),
        f(i, "shortcuts", n, t),
        i
    }
    function f(n, t, i, r) {
        n[t] = Object(u.k)({}, i[t], r[t])
    }
    var l;
    i.d(t, "j", function() {
        return b
    });
    i.d(t, "d", function() {
        return k
    });
    i.d(t, "b", function() {
        return d
    });
    i.d(t, "e", function() {
        return g
    });
    i.d(t, "g", function() {
        return nt
    });
    i.d(t, "h", function() {
        return tt
    });
    i.d(t, "c", function() {
        return it
    });
    i.d(t, "f", function() {
        return rt
    });
    i.d(t, "i", function() {
        return ut
    });
    i.d(t, "a", function() {
        return ft
    });
    var u = i(0)
      , a = i(7)
      , v = i(28)
      , y = i(8)
      , p = i(40)
      , o = {}
      , h = {
        zh: "Chinese",
        nl: "Dutch",
        en: "English",
        fr: "French",
        de: "German",
        it: "Italian",
        ja: "Japanese",
        pt: "Portuguese",
        ru: "Russian",
        es: "Spanish",
        el: "Greek",
        fi: "Finnish",
        id: "Indonesian",
        ko: "Korean",
        th: "Thai",
        vi: "Vietnamese"
    }
      , w = Object(u.r)(h);
    l = ["ar", "da", "de", "el", "es", "fi", "fr", "he", "id", "it", "ja", "ko", "nl", "no", "oc", "pt", "ro", "ru", "sl", "sv", "th", "tr", "vi", "zh"]
}
, function(n, t) {
    "use strict";
    t.a = []
}
, function(n, t) {
    "use strict";
    t.a = {
        debug: !1
    }
}
, function(n, t, i) {
    "use strict";
    function o(n) {
        var t = window.MediaSource;
        return Object(f.a)(n, function(n) {
            return !!t && !!t.isTypeSupported && t.isTypeSupported(n)
        })
    }
    function s(n) {
        var t, i;
        if (n.drm || (t = n.file.indexOf(".m3u8") > -1,
        i = "hls" === n.type || "m3u8" === n.type,
        !t && !i))
            return !1;
        var u = r.Browser.chrome || r.Browser.firefox || r.Browser.edge || r.Browser.ie && 11 === r.Browser.version.major
          , f = r.OS.android && !1 === n.hlsjsdefault
          , e = r.Browser.safari && !!n.safarihlsjs;
        return o(n.mediaTypes || ['video/mp4;codecs="avc1.4d400d,mp4a.40.2"']) && (u || e) && !f
    }
    var u = i(27)
      , r = i(5)
      , h = i(23)
      , f = i(0)
      , c = i(8)
      , l = i(36)
      , e = Object(f.m)(u.a, Object(f.C)({
        name: "html5"
    }))
      , a = e.supports;
    e.supports = function(n, t) {
        var u = a.apply(this, arguments), f, r, i;
        return u && n.drm && "hls" === n.type ? (f = Object(h.a)(t),
        r = f("drm"),
        r && n.drm.fairplay) ? (i = window.WebKitMediaKeys,
        i && i.isTypeSupported && i.isTypeSupported("com.apple.fps.1_0", "video/mp4")) : r : u
    }
    ;
    u.a.push({
        name: "shaka",
        supports: function(n) {
            return !(n.drm && !Object(l.a)(n.drm)) && !(!window.HTMLVideoElement || !window.MediaSource) && o(n.mediaTypes) && ("dash" === n.type || "mpd" === n.type || (n.file || "").indexOf("mpd-time-csf") > -1)
        }
    });
    u.a.unshift({
        name: "hlsjs",
        supports: function(n) {
            return s(n)
        }
    });
    u.a.unshift({
        name: "hlsjsProgressive",
        supports: function(n) {
            return n._hlsjsProgressive && s(n)
        }
    });
    u.a.push({
        name: "flash",
        supports: function(n) {
            if (!r.Features.flash || n.drm)
                return !1;
            var t = n.type;
            return "hls" === t || "m3u8" === t || !Object(c.isRtmp)(n.file, t) && ["flv", "f4v", "mov", "m4a", "m4v", "mp4", "aac", "f4a", "mp3", "mpeg", "smil"].indexOf(t) > -1
        }
    });
    t.a = u.a
}
, function(n, t, i) {
    "use strict";
    i.d(t, "a", function() {
        return r
    });
    var r = Date.now || function() {
        return (new Date).getTime()
    }
}
, function(n, t, i) {
    "use strict";
    function f(n) {
        var t = 305e3;
        if (!n)
            return t;
        switch (r(n)) {
        case "jwpsrv":
            t = 305001;
            break;
        case "googima":
            t = 305002;
            break;
        case "vast":
            t = 305003;
            break;
        case "freewheel":
            t = 305004;
            break;
        case "dai":
            t = 305005;
            break;
        case "gapro":
            t = 305006
        }
        return t
    }
    function e(n, t, i) {
        var e = n.name, r = document.createElement("div"), o, f;
        return r.id = i.id + "_" + e,
        r.className = "jw-plugin jw-reset",
        o = Object(u.k)({}, t),
        f = n.getNewInstance(i, o, r),
        i.addPlugin(e, f),
        f
    }
    i.d(t, "b", function() {
        return r
    });
    i.d(t, "c", function() {
        return f
    });
    i.d(t, "a", function() {
        return e
    });
    var u = i(0)
      , r = function(n) {
        return n.replace(/^(.*\/)?([^-]*)-?.*\.(js)$/, "$2")
    }
}
, function(n, t, i) {
    "use strict";
    i.r(t);
    i.d(t, "getScriptPath", function() {
        return e
    });
    i.d(t, "repo", function() {
        return r
    });
    i.d(t, "versionCheck", function() {
        return o
    });
    i.d(t, "loadFrom", function() {
        return s
    });
    var u = i(31)
      , f = i(8)
      , e = function(n) {
        for (var i, u, r = document.getElementsByTagName("script"), t = 0; t < r.length; t++)
            if (i = r[t].src,
            i && (u = i.lastIndexOf("/" + n),
            u >= 0))
                return i.substr(0, u + 1);
        return ""
    }
      , r = function() {
        var n = Object(f.isFileProtocol)() ? "https:" : "";
        return "".concat(n).concat("//ssl.p.jwpcdn.com/player/v/8.11.4/")
    }
      , o = function(n) {
        var t = ("0" + n).split(/\W/)
          , i = u.a.split(/\W/)
          , r = parseFloat(t[0])
          , f = parseFloat(i[0]);
        return !(r > f) && !(r === f && parseFloat("0" + t[1]) > parseFloat(i[1]))
    }
      , s = function() {
        return r()
    }
}
, , , function(n, t, i) {
    "use strict";
    function y(n) {
        var t = {
            setup: [c, l, s, a, r, u, f, o, e, h],
            drm: [r, u, f, o, e],
            ads: [f, o, e, h, r, u, s],
            jwpsrv: [c, l, s, a, r, u, f, e, h, v],
            discovery: [f, r, u, e, o]
        };
        return function(i) {
            return t[i] && t[i].indexOf(n) > -1
        }
    }
    i.d(t, "a", function() {
        return y
    });
    var c = "free"
      , l = "starter"
      , s = "business"
      , a = "premium"
      , r = "enterprise"
      , u = "developer"
      , h = "platinum"
      , f = "ads"
      , o = "unlimited"
      , e = "trial"
      , v = "invalid"
}
, function(n, t, i) {
    "use strict";
    function l(n) {
        var t = document.createElement("link");
        return t.type = "text/css",
        t.rel = "stylesheet",
        t.href = n,
        t
    }
    function a(n, t) {
        var i = document.createElement("script");
        return i.type = "text/javascript",
        i.charset = "utf-8",
        i.async = !0,
        i.timeout = t || f,
        i.src = n,
        i
    }
    var o = i(0)
      , s = i(9)
      , r = i(3)
      , u = {}
      , f = 45e3
      , h = 2
      , c = 3
      , e = function(n, t, i) {
        function s(n) {
            e = h;
            o.trigger(r.w, n).off()
        }
        function v(n) {
            e = c;
            o.trigger(r.lb, n).off()
        }
        var o = this
          , e = 0;
        this.getStatus = function() {
            return e
        }
        ;
        this.load = function() {
            var r = u[n];
            return 0 !== e ? r : (r && r.then(v).catch(s),
            e = 1,
            r = new Promise(function(r, u) {
                var e = (t ? l : a)(n, i), h = function() {
                    e.onerror = e.onload = null;
                    clearTimeout(y)
                }, c = function(n) {
                    h();
                    s(n);
                    u(n)
                }, y = setTimeout(function() {
                    c(new Error("Network timeout ".concat(n)))
                }, f), o;
                e.onerror = function() {
                    c(new Error("Failed to load ".concat(n)))
                }
                ;
                e.onload = function(n) {
                    h();
                    v(n);
                    r(n)
                }
                ;
                o = document.getElementsByTagName("head")[0] || document.documentElement;
                o.insertBefore(e, o.firstChild)
            }
            ),
            u[n] = r,
            r)
        }
    };
    Object(o.k)(e.prototype, s.a);
    t.a = e
}
, function(n, t, i) {
    "use strict";
    function s(n) {
        return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
            return typeof n
        }
        : function(n) {
            return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
        }
        )(n)
    }
    function p(n, t) {
        var i = n.get("plugins");
        return window.jwplayerPluginJsonp = o,
        (n.pluginLoader = n.pluginLoader || new a).load(t, e, i, n).then(function(t) {
            if (!n.attributes._destroyed)
                return delete window.jwplayerPluginJsonp,
                t
        })
    }
    var l = i(1), r = i(19), a = function() {
        this.load = function(n, t, i, u) {
            return i && "object" === s(i) ? Promise.all(Object.keys(i).filter(function(n) {
                return n
            }).map(function(f) {
                var e = i[f];
                return t.setupPlugin(f).then(function(t) {
                    if (!u.attributes._destroyed)
                        return Object(r.a)(t, e, n)
                }).catch(function(n) {
                    return t.removePlugin(f),
                    n.code ? n : new l.s(null,Object(r.c)(f),n)
                })
            })) : Promise.resolve()
        }
    }, v = i(58), y = i(47), u = {}, h = function() {}, f = h.prototype, c, e, o;
    f.setupPlugin = function(n) {
        var t = this.getPlugin(n);
        return t ? (t.url !== n && Object(y.a)('JW Plugin "'.concat(Object(r.b)(n), '" already loaded from "').concat(t.url, '". Ignoring "').concat(n, '."')),
        t.promise) : this.addPlugin(n).load()
    }
    ;
    f.addPlugin = function(n) {
        var i = Object(r.b)(n)
          , t = u[i];
        return t || (t = new v.a(n),
        u[i] = t),
        t
    }
    ;
    f.getPlugin = function(n) {
        return u[Object(r.b)(n)]
    }
    ;
    f.removePlugin = function(n) {
        delete u[Object(r.b)(n)]
    }
    ;
    f.getPlugins = function() {
        return u
    }
    ;
    c = h;
    i.d(t, "b", function() {
        return o
    });
    i.d(t, "a", function() {
        return p
    });
    e = new c;
    o = function(n, t, i) {
        var r = e.addPlugin(n);
        r.js || r.registerPlugin(n, t, i)
    }
}
, function(n, t, i) {
    "use strict";
    i.d(t, "a", function() {
        return u
    });
    var f = i(48)
      , e = i(23)
      , o = i(45)
      , r = i(1)
      , u = 100013;
    t.b = function(n) {
        var t, h, s, i, c;
        try {
            i = Object(f.a)(n || "", Object(o.a)("NDh2aU1Cb0NHRG5hcDFRZQ==")).split("/");
            ("pro" === (t = i[0]) && (t = "premium"),
            Object(e.a)(t)("setup") || (t = "invalid"),
            i.length > 2) && (h = i[1],
            c = parseInt(i[2]),
            c > 0 && (s = new Date).setTime(c))
        } catch (n) {
            t = "invalid"
        }
        this.edition = function() {
            return t
        }
        ;
        this.token = function() {
            return h
        }
        ;
        this.expiration = function() {
            return s
        }
        ;
        this.duration = function() {
            return s ? s.getTime() - (new Date).getTime() : 0
        }
        ;
        this.error = function() {
            var i;
            return void 0 === n ? i = 100011 : "invalid" !== t && h ? this.duration() < 0 && (i = u) : i = 100012,
            i ? new r.s(r.m,i) : null
        }
    }
}
, function(n, t, i) {
    "use strict";
    function u(n) {
        var s, u, t, i;
        return !1 === Object(f.a)(n) ? !1 : r.a.canPlayType ? (s = n.file,
        u = n.type,
        Object(e.isRtmp)(s, u)) ? !1 : (t = n.mimeType || o[u],
        !t) ? !1 : (i = n.mediaTypes,
        i && i.length && (t = [t].concat(i.slice()).join("; ")),
        !!r.a.canPlayType(t)) : !1
    }
    i.d(t, "b", function() {
        return u
    });
    var f = i(65)
      , e = i(8)
      , r = i(39)
      , o = {
        aac: "audio/mp4",
        mp4: "video/mp4",
        f4v: "video/mp4",
        m4v: "video/mp4",
        mov: "video/mp4",
        mp3: "audio/mpeg",
        mpeg: "audio/mpeg",
        ogv: "video/ogg",
        ogg: "video/ogg",
        oga: "video/ogg",
        vorbis: "video/ogg",
        webm: "video/webm",
        f4a: "video/aac",
        m3u8: "application/vnd.apple.mpegurl",
        m3u: "application/vnd.apple.mpegurl",
        hls: "application/vnd.apple.mpegurl"
    }
      , s = [{
        name: "html5",
        supports: u
    }];
    t.a = s
}
, function(n, t, i) {
    "use strict";
    function s(n, t, i, d) {
        var it, tt, rt, ut;
        if (n === Object(n) && (n = (d = n).url),
        tt = Object(f.k)({
            xhr: null,
            url: n,
            withCredentials: !1,
            retryWithoutCredentials: !1,
            timeout: 6e4,
            timeoutId: -1,
            oncomplete: t || o,
            onerror: i || o,
            mimeType: d && !d.responseType ? "text/xml" : "",
            requireValidXML: !1,
            responseType: d && d.plainText ? "text" : "",
            useDomParser: !1,
            requestFilter: null
        }, d),
        rt = function(n, t) {
            return function(n, i) {
                var o = n.currentTarget || t.xhr;
                if (clearTimeout(t.timeoutId),
                t.retryWithoutCredentials && t.xhr.withCredentials)
                    return h(o),
                    void s(Object(f.k)({}, t, {
                        xhr: null,
                        withCredentials: !1,
                        retryWithoutCredentials: !1
                    }));
                !i && o.status >= 400 && o.status < 600 && (i = o.status);
                u(t, i ? r.o : r.r, i || e, n)
            }
        }(0, tt),
        "XMLHttpRequest"in window) {
            if (it = tt.xhr = tt.xhr || new window.XMLHttpRequest,
            "function" == typeof tt.requestFilter) {
                try {
                    ut = tt.requestFilter({
                        url: n,
                        xhr: it
                    })
                } catch (n) {
                    return rt(n, b),
                    it
                }
                ut && "open"in ut && "send"in ut && (it = tt.xhr = ut)
            }
            it.onreadystatechange = function(n) {
                return function(t) {
                    var o = t.currentTarget || n.xhr, i;
                    if (4 === o.readyState) {
                        if (clearTimeout(n.timeoutId),
                        i = o.status,
                        i >= 400)
                            return void u(n, r.o, i < 600 ? i : e);
                        if (200 === i)
                            return function(n) {
                                return function(t) {
                                    var e = t.currentTarget || n.xhr, o, i;
                                    if (clearTimeout(n.timeoutId),
                                    n.responseType) {
                                        if ("json" === n.responseType)
                                            return function(n, t) {
                                                if (!n.response || "string" == typeof n.response && '"' !== n.responseText.substr(1))
                                                    try {
                                                        n = Object(f.k)({}, n, {
                                                            response: JSON.parse(n.responseText)
                                                        })
                                                    } catch (n) {
                                                        return void u(t, r.o, nt, n)
                                                    }
                                                return t.oncomplete(n)
                                            }(e, n)
                                    } else {
                                        if (i = e.responseXML,
                                        i)
                                            try {
                                                o = i.firstChild
                                            } catch (n) {}
                                        if (i && o || n.useDomParser && e.responseText && !i && (i = Object(l.parseXML)(e.responseText)) && i.firstChild)
                                            return c(e, i, n);
                                        if (n.requireValidXML)
                                            return void u(n, r.o, g)
                                    }
                                    n.oncomplete(e)
                                }
                            }(n)(t);
                        0 === i && Object(a.isFileProtocol)() && !/^[a-z][a-z0-9+.-]*:/.test(n.url) && u(n, r.o, k)
                    }
                }
            }(tt);
            it.onerror = rt;
            "overrideMimeType"in it ? tt.mimeType && it.overrideMimeType(tt.mimeType) : tt.useDomParser = !0;
            try {
                n = n.replace(/#.*$/, "");
                it.open("GET", n, !0)
            } catch (n) {
                return rt(n, p),
                it
            }
            if (tt.responseType)
                try {
                    it.responseType = tt.responseType
                } catch (n) {}
            tt.timeout && (tt.timeoutId = setTimeout(function() {
                h(it);
                u(tt, r.r, v)
            }, tt.timeout),
            it.onabort = function() {
                clearTimeout(tt.timeoutId)
            }
            );
            try {
                tt.withCredentials && "withCredentials"in it && (it.withCredentials = !0);
                it.send()
            } catch (n) {
                rt(n, w)
            }
            return it
        }
        u(tt, r.r, y)
    }
    function h(n) {
        n.onload = null;
        n.onprogress = null;
        n.onreadystatechange = null;
        n.onerror = null;
        "abort"in n && n.abort()
    }
    function u(n, t, i, u) {
        n.onerror(t, n.url, n.xhr, new r.s(t,i,u))
    }
    function c(n, t, i) {
        var e = t.documentElement;
        if (!i.requireValidXML || "parsererror" !== e.nodeName && !e.getElementsByTagName("parsererror").length)
            return n.responseXML || (n = Object(f.k)({}, n, {
                responseXML: t
            })),
            i.oncomplete(n);
        u(i, r.o, d)
    }
    i.d(t, "a", function() {
        return s
    });
    var f = i(0)
      , l = i(12)
      , a = i(8)
      , r = i(1)
      , v = 1
      , y = 2
      , p = 3
      , w = 4
      , b = 5
      , e = 6
      , k = 7
      , d = 601
      , g = 602
      , nt = 611
      , o = function() {}
}
, function(n, t, i) {
    "use strict";
    var f = i(0)
      , u = i(34)
      , e = function(n) {
        if (n && n.file)
            return Object(f.k)({}, {
                kind: "captions",
                "default": !1
            }, n)
    }
      , r = Array.isArray;
    t.a = function(n) {
        var t, i, o, s;
        for (r((n = n || {}).tracks) || delete n.tracks,
        t = Object(f.k)({}, {
            sources: [],
            tracks: [],
            minDvrWindow: 120,
            dvrSeekLimit: 25
        }, n),
        t.dvrSeekLimit < 5 && (t.dvrSeekLimit = 5),
        t.sources !== Object(t.sources) || r(t.sources) || (t.sources = [Object(u.a)(t.sources)]),
        r(t.sources) && 0 !== t.sources.length || (t.sources = n.levels ? n.levels : [Object(u.a)(n)]),
        i = 0; i < t.sources.length; i++)
            o = t.sources[i],
            o && (s = o.default,
            o.default = !!s && "true" === s.toString(),
            t.sources[i].label || (t.sources[i].label = i.toString()),
            t.sources[i] = Object(u.a)(t.sources[i]));
        return t.sources = t.sources.filter(function(n) {
            return !!n
        }),
        r(t.tracks) || (t.tracks = []),
        r(t.captions) && (t.tracks = t.tracks.concat(t.captions),
        delete t.captions),
        t.tracks = t.tracks.map(e).filter(function(n) {
            return !!n
        }),
        t
    }
}
, function(n, t, i) {
    "use strict";
    function e(n, t) {
        return f[n] ? n : f[t] ? t : "metadata"
    }
    function w(n, t, i) {
        var r = Object(u.k)({}, i);
        return delete r.playlist,
        n.map(function(n) {
            return s(t, n, r)
        }).filter(function(n) {
            return !!n
        })
    }
    function b(n) {
        if (!Array.isArray(n) || 0 === n.length)
            throw new o.s(o.o,630);
    }
    function s(n, t, i) {
        var f = n.getProviders()
          , o = n.get("preload")
          , r = Object(u.k)({}, t);
        if (r.preload = e(t.preload, o),
        r.allSources = c(t, n),
        r.sources = l(r.allSources, f),
        r.sources.length)
            return r.file = r.sources[0].file,
            r.feedData = i,
            r
    }
    function c(n, t) {
        var i = t.attributes
          , u = n.sources
          , f = n.allSources
          , o = n.preload
          , s = n.drm
          , h = a(n.withCredentials, i.withCredentials);
        return (f || u).map(function(n) {
            var t, u;
            return n !== Object(n) ? null : (r(n, i, "androidhls"),
            r(n, i, "hlsjsdefault"),
            r(n, i, "safarihlsjs"),
            r(n, i, "_hlsjsProgressive"),
            n.preload = e(n.preload, o),
            t = n.drm || s || i.drm,
            t && (n.drm = t),
            u = a(n.withCredentials, h),
            void 0 !== u && (n.withCredentials = u),
            Object(y.a)(n))
        }).filter(function(n) {
            return !!n
        })
    }
    function l(n, t) {
        var i, r, u;
        return (t && t.choose || (t = new p.a),
        i = function(n, t) {
            for (var r, u, i = 0; i < n.length; i++)
                if (r = n[i],
                u = t.choose(r).providerToCheck,
                u)
                    return {
                        type: r.type,
                        provider: u
                    };
            return null
        }(n, t),
        !i) ? [] : (r = i.provider,
        u = i.type,
        n.filter(function(n) {
            return n.type === u && t.providerSupports(r, n)
        }))
    }
    function a(n, t) {
        return void 0 === n ? t : n
    }
    function r(n, t, i) {
        i in t && (n[i] = t[i])
    }
    var u = i(0), f = {
        none: !0,
        metadata: !0,
        auto: !0
    }, v = i(29), y = i(34), p = i(42), o = i(1), h;
    i.d(t, "b", function() {
        return w
    });
    i.d(t, "e", function() {
        return b
    });
    i.d(t, "d", function() {
        return s
    });
    i.d(t, "c", function() {
        return h
    });
    h = function(n, t) {
        return l(c(n, t), t.getProviders())
    }
    ;
    t.a = function(n) {
        return (Array.isArray(n) ? n : [n]).map(v.a)
    }
}
, function(n, t, i) {
    "use strict";
    i.d(t, "a", function() {
        return r
    });
    var r = "8.11.4+commercial_v8-11-4.360.commercial.7759c74.hlsjs..hlsjsprogressive..jwplayer.5c3dc1e.dai.45542e3.freewheel.556af86.googima.1dc0927.vast.dee90df.analytics.240f559.gapro.141397a"
}
, function(n, t, i) {
    "use strict";
    function u() {
        return o + r.now()
    }
    var f = i(0)
      , e = i(18)
      , r = window.performance || {
        timing: {}
    }
      , o = r.timing.navigationStart || Object(e.a)();
    "now"in r || (r.now = function() {
        return Object(e.a)() - o
    }
    );
    t.a = function() {
        var n = {}
          , i = {}
          , r = {}
          , t = {};
        return {
            start: function(t) {
                n[t] = u();
                r[t] = r[t] + 1 || 1
            },
            end: function(t) {
                if (n[t]) {
                    var r = u() - n[t];
                    delete n[t];
                    i[t] = i[t] + r || r
                }
            },
            dump: function() {
                var o = Object(f.k)({}, i), e, s;
                for (e in n)
                    Object.prototype.hasOwnProperty.call(n, e) && (s = u() - n[e],
                    o[e] = o[e] + s || s);
                return {
                    counts: Object(f.k)({}, r),
                    sums: o,
                    events: Object(f.k)({}, t)
                }
            },
            tick: function(n) {
                t[n] = u()
            },
            clear: function(n) {
                delete t[n]
            },
            between: function(n, i) {
                return t[i] && t[n] ? t[i] - t[n] : null
            }
        }
    }
}
, function(n, t) {
    "use strict";
    t.a = {}
}
, function(n, t, i) {
    "use strict";
    var f = i(0)
      , r = i(8)
      , u = i(2);
    t.a = function(n) {
        var t, i;
        if (n && n.file && (t = Object(f.k)({}, {
            "default": !1
        }, n),
        t.file = Object(u.i)("" + t.file),
        i = /^[^/]+\/(?:x-)?([^/]+)$/,
        i.test(t.type) && (t.mimeType = t.type,
        t.type = t.type.replace(i, "$1")),
        Object(r.isYouTube)(t.file) ? t.type = "youtube" : Object(r.isRtmp)(t.file) ? t.type = "rtmp" : t.type || (t.type = Object(u.a)(t.file)),
        t.type)) {
            switch (t.type) {
            case "m3u8":
            case "vnd.apple.mpegurl":
                t.type = "hls";
                break;
            case "dash+xml":
                t.type = "dash";
                break;
            case "m4a":
                t.type = "aac";
                break;
            case "smil":
                t.type = "rtmp"
            }
            return Object.keys(t).forEach(function(n) {
                "" === t[n] && delete t[n]
            }),
            t
        }
    }
}
, function(n, t, i) {
    "use strict";
    function k(n) {
        return (k = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
            return typeof n
        }
        : function(n) {
            return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
        }
        )(n)
    }
    function rt(n, t) {
        for (var i, r = 0; r < t.length; r++)
            i = t[r],
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(n, i.key, i)
    }
    function vt(n, t) {
        return !t || "object" !== k(t) && "function" != typeof t ? function(n) {
            if (void 0 === n)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return n
        }(n) : t
    }
    function d(n, t, i) {
        return (d = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(n, t, i) {
            var u = function(n, t) {
                for (; !Object.prototype.hasOwnProperty.call(n, t) && null !== (n = c(n)); )
                    ;
                return n
            }(n, t), r;
            if (u)
                return r = Object.getOwnPropertyDescriptor(u, t),
                r.get ? r.get.call(i) : r.value
        }
        )(n, t, i || n)
    }
    function c(n) {
        return (c = Object.setPrototypeOf ? Object.getPrototypeOf : function(n) {
            return n.__proto__ || Object.getPrototypeOf(n)
        }
        )(n)
    }
    function ut(n, t) {
        return (ut = Object.setPrototypeOf || function(n, t) {
            return n.__proto__ = t,
            n
        }
        )(n, t)
    }
    function st(n) {
        return n && !(bt.test(n) || "object" === k(n))
    }
    function h(n) {
        if (!n.handlers.init) {
            var t = n.el
              , c = n.passive
              , i = !!nt && {
                passive: c
            }
              , l = function(u) {
                var s, f, o;
                if ((Object(b.o)(t, "jw-tab-focus"),
                !function(n) {
                    return "which"in n ? 3 === n.which : "button"in n ? 2 === n.button : !1
                }(u)) && (s = u.target,
                f = u.type,
                !n.directSelect || s === t)) {
                    var l = lt(u)
                      , v = l.pageX
                      , y = l.pageY;
                    (n.dragged = !1,
                    n.lastStart = Object(a.a)(),
                    n.startX = v,
                    n.startY = y,
                    p(n, e),
                    "pointerdown" === f && u.isPrimary) ? (c || (o = u.pointerId,
                    n.pointerId = o,
                    t.setPointerCapture(o)),
                    r(n, e, "pointermove", w, i),
                    r(n, e, "pointercancel", h),
                    r(n, e, "pointerup", h),
                    "BUTTON" === t.tagName && t.focus()) : "mousedown" === f ? (r(n, e, "mousemove", w, i),
                    r(n, e, "mouseup", h)) : "touchstart" === f && (r(n, e, "touchmove", w, i),
                    r(n, e, "touchcancel", h),
                    r(n, e, "touchend", h),
                    c || it(u))
                }
            }
              , w = function(t) {
                if (n.dragged)
                    f(n, u.s, t);
                else {
                    var i = lt(t)
                      , o = i.pageX
                      , s = i.pageY
                      , r = o - n.startX
                      , e = s - n.startY;
                    r * r + e * e > ft * ft && (f(n, u.u, t),
                    n.dragged = !0,
                    f(n, u.s, t))
                }
                c || "touchmove" !== t.type || it(t)
            }
              , h = function(i) {
                if (clearTimeout(g),
                n.el)
                    if (ct(n),
                    p(n, e),
                    n.dragged)
                        n.dragged = !1,
                        f(n, u.t, i);
                    else if (-1 === i.type.indexOf("cancel") && t.contains(i.target)) {
                        if (Object(a.a)() - n.lastStart > et)
                            return;
                        var o = "pointerup" === i.type || "pointercancel" === i.type
                          , r = "mouseup" === i.type || o && "mouse" === i.pointerType;
                        !function(n, t, i) {
                            if (n.enableDoubleTap)
                                if (Object(a.a)() - n.lastClick < wt) {
                                    var r = i ? u.q : u.r;
                                    f(n, r, t);
                                    n.lastClick = 0
                                } else
                                    n.lastClick = Object(a.a)()
                        }(n, i, r);
                        r ? f(n, u.n, i) : (f(n, u.sb, i),
                        "touchend" !== i.type || nt || it(i))
                    }
            };
            o ? r(n, "init", "pointerdown", l, i) : (y && r(n, "init", "mousedown", l, i),
            r(n, "init", "touchstart", l, i));
            v || (v = new ot(document).on("interaction"));
            r(n, "init", "blur", function() {
                Object(b.o)(t, "jw-tab-focus")
            });
            r(n, "init", "focus", function() {
                v.event && v.event.type === s && Object(b.a)(t, "jw-tab-focus")
            })
        }
    }
    function tt(n) {
        var t = n.ownerDocument || n;
        return t.defaultView || t.parentWindow || window
    }
    function r(n, t, i, r) {
        var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : pt, u = n.handlers[t], s = n.options[t], f;
        if (u || (u = n.handlers[t] = {},
        s = n.options[t] = {}),
        u[i])
            throw new Error("".concat(t, " ").concat(i, " already registered"));
        u[i] = r;
        s[i] = o;
        f = n.el;
        (t === e ? tt(f) : f).addEventListener(i, r, o)
    }
    function p(n, t) {
        var r = n.el
          , u = n.handlers
          , f = n.options
          , o = t === e ? tt(r) : r
          , i = u[t]
          , s = f[t];
        i && (Object.keys(i).forEach(function(n) {
            var t = s[n];
            "boolean" == typeof t ? o.removeEventListener(n, i[n], t) : o.removeEventListener(n, i[n])
        }),
        u[t] = null,
        f[t] = null)
    }
    function ct(n) {
        var t = n.el;
        null !== n.pointerId && (t.releasePointerCapture(n.pointerId),
        n.pointerId = null)
    }
    function w(n, t, i) {
        var r = n.el
          , u = i.target;
        n.trigger(t, {
            type: t,
            sourceEvent: i,
            currentTarget: r,
            target: u
        })
    }
    function f(n, t, i) {
        var r = function(n, t, i) {
            var f, s = t.target, u = t.touches, e = t.changedTouches, r = t.pointerType;
            u || e ? (f = u && u.length ? u[0] : e[0],
            r = r || "touch") : (f = t,
            r = r || "mouse");
            var o = f
              , h = o.pageX
              , c = o.pageY;
            return {
                type: n,
                pointerType: r,
                pageX: h,
                pageY: c,
                sourceEvent: t,
                currentTarget: i,
                target: s
            }
        }(t, i, n.el);
        n.trigger(t, r)
    }
    function lt(n) {
        return 0 === n.type.indexOf("touch") ? (n.originalEvent || n).changedTouches[0] : n
    }
    function it(n) {
        n.preventDefault && n.preventDefault()
    }
    var ht;
    i.d(t, "a", function() {
        return ot
    });
    i.d(t, "b", function() {
        return tt
    });
    var l = i(5)
      , u = i(3)
      , at = i(9)
      , a = i(18)
      , b = i(6);
    var g, v, yt = "ontouchstart"in window, o = "PointerEvent"in window && !l.OS.android, y = !(o || yt && l.OS.mobile), e = "window", s = "keydown", nt = l.Features.passiveEvents, pt = !!nt && {
        passive: !0
    }, ft = 6, wt = 300, et = 500, ot = function(n) {
        function t(n, i) {
            var r, u;
            return !function(n, t) {
                if (!(n instanceof t))
                    throw new TypeError("Cannot call a class as a function");
            }(this, t),
            r = vt(this, c(t).call(this)),
            u = !(i = i || {}).preventScrolling,
            r.directSelect = !!i.directSelect,
            r.dragged = !1,
            r.enableDoubleTap = !1,
            r.el = n,
            r.handlers = {},
            r.options = {},
            r.lastClick = 0,
            r.lastStart = 0,
            r.passive = u,
            r.pointerId = null,
            r.startX = 0,
            r.startY = 0,
            r.event = null,
            r
        }
        var i, r, u;
        return function(n, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function");
            n.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: n,
                    writable: !0,
                    configurable: !0
                }
            });
            t && ut(n, t)
        }(t, n),
        i = t,
        (r = [{
            key: "on",
            value: function(n, i, r) {
                return st(n) && (this.handlers[n] || ht[n](this)),
                d(c(t.prototype), "on", this).call(this, n, i, r)
            }
        }, {
            key: "off",
            value: function(n, i, r) {
                var f = this, u;
                return st(n) ? p(this, n) : n || (u = this.handlers,
                Object.keys(u).forEach(function(n) {
                    p(f, n)
                })),
                d(c(t.prototype), "off", this).call(this, n, i, r)
            }
        }, {
            key: "destroy",
            value: function() {
                this.off();
                o && ct(this);
                this.el = null
            }
        }]) && rt(i.prototype, r),
        u && rt(i, u),
        t
    }(at.a), bt = /\s+/;
    ht = {
        drag: function(n) {
            h(n)
        },
        dragStart: function(n) {
            h(n)
        },
        dragEnd: function(n) {
            h(n)
        },
        click: function(n) {
            h(n)
        },
        tap: function(n) {
            h(n)
        },
        doubleTap: function(n) {
            n.enableDoubleTap = !0;
            h(n)
        },
        doubleClick: function(n) {
            n.enableDoubleTap = !0;
            h(n)
        },
        longPress: function(n) {
            if (l.OS.iOS) {
                var t = function() {
                    clearTimeout(g)
                };
                r(n, "longPress", "touchstart", function(i) {
                    t();
                    g = setTimeout(function() {
                        f(n, "longPress", i)
                    }, et)
                });
                r(n, "longPress", "touchmove", t);
                r(n, "longPress", "touchcancel", t);
                r(n, "longPress", "touchend", t)
            } else
                n.el.oncontextmenu = function(t) {
                    return f(n, "longPress", t),
                    !1
                }
        },
        focus: function(n) {
            r(n, "focus", "focus", function(t) {
                w(n, "focus", t)
            })
        },
        blur: function(n) {
            r(n, "blur", "blur", function(t) {
                w(n, "blur", t)
            })
        },
        over: function(n) {
            (o || y) && r(n, u.Z, o ? "pointerover" : "mouseover", function(t) {
                "touch" !== t.pointerType && f(n, u.Z, t)
            })
        },
        out: function(n) {
            if (o) {
                var t = n.el;
                r(n, u.Y, "pointerout", function(i) {
                    if ("touch" !== i.pointerType && "x"in i) {
                        var r = document.elementFromPoint(i.x, i.y);
                        t.contains(r) || f(n, u.Y, i)
                    }
                })
            } else
                y && r(n, u.Y, "mouseout", function(t) {
                    f(n, u.Y, t)
                })
        },
        move: function(n) {
            (o || y) && r(n, u.W, o ? "pointermove" : "mousemove", function(t) {
                "touch" !== t.pointerType && f(n, u.W, t)
            })
        },
        enter: function(n) {
            r(n, u.v, s, function(t) {
                "Enter" !== t.key && 13 !== t.keyCode || (t.stopPropagation(),
                w(n, u.v, t))
            })
        },
        keydown: function(n) {
            r(n, s, s, function(t) {
                w(n, s, t)
            }, !1)
        },
        gesture: function(n) {
            var t = function(t) {
                return f(n, "gesture", t)
            };
            r(n, "gesture", "click", t);
            r(n, "gesture", s, t)
        },
        interaction: function(n) {
            var t = function(t) {
                n.event = t
            };
            r(n, "interaction", "mousedown", t, !0);
            r(n, "interaction", s, t, !0)
        }
    }
}
, function(n, t, i) {
    "use strict";
    function h(n) {
        return n.some(function(n) {
            return !!n.drm || n.sources.some(function(n) {
                return !!n.drm
            })
        })
    }
    function c(n) {
        return r || ((navigator.requestMediaKeySystemAccess && MediaKeySystemAccess.prototype.getConfiguration || window.MSMediaKeys) && Object(o.a)(n)("drm") ? (s.forEach(function(n) {
            var t, i, r = (t = n.keyName,
            i = [{
                initDataTypes: ["cenc"],
                videoCapabilities: [{
                    contentType: 'video/mp4;codecs="avc1.4d401e"'
                }],
                audioCapabilities: [{
                    contentType: 'audio/mp4;codecs="mp4a.40.2"'
                }]
            }],
            navigator.requestMediaKeySystemAccess ? navigator.requestMediaKeySystemAccess(t, i) : new Promise(function(n, i) {
                var r;
                try {
                    r = new window.MSMediaKeys(t)
                } catch (n) {
                    return void i(n)
                }
                n(r)
            }
            )).then(function() {
                u[n.configName] = !0
            }).catch(function() {
                u[n.configName] = !1
            });
            f.push(r)
        }),
        r = Promise.all(f)) : Promise.resolve())
    }
    function e(n) {
        return u[n]
    }
    function l(n) {
        if (r)
            return Object.keys(n).some(function(n) {
                return e(n)
            })
    }
    i.d(t, "b", function() {
        return h
    });
    i.d(t, "d", function() {
        return c
    });
    i.d(t, "c", function() {
        return e
    });
    i.d(t, "a", function() {
        return l
    });
    var r, o = i(23), s = [{
        configName: "clearkey",
        keyName: "org.w3.clearkey"
    }, {
        configName: "widevine",
        keyName: "com.widevine.alpha"
    }, {
        configName: "playready",
        keyName: "com.microsoft.playready"
    }], f = [], u = {}
}
, , function(n, t, i) {
    "use strict";
    function e() {
        return r || (r = i.e(1).then(function() {
            var n = i(21).default;
            return u.controls = n,
            n
        }
        .bind(null, i)).catch(function() {
            r = null;
            Object(f.c)(301130)()
        })),
        r
    }
    i.d(t, "a", function() {
        return u
    });
    i.d(t, "b", function() {
        return e
    });
    var f = i(10)
      , r = null
      , u = {}
}
, function(n, t) {
    "use strict";
    var i = document.createElement("video");
    t.a = i
}
, function(n, t) {
    "use strict";
    t.a = {
        advertising: {
            admessage: "This ad will end in xx",
            cuetext: "Advertisement",
            displayHeading: "Advertisement",
            loadingAd: "Loading ad",
            podmessage: "Ad __AD_POD_CURRENT__ of __AD_POD_LENGTH__.",
            skipmessage: "Skip ad in xx",
            skiptext: "Skip"
        },
        airplay: "AirPlay",
        audioTracks: "Audio Tracks",
        auto: "Auto",
        buffer: "Loading",
        cast: "Chromecast",
        cc: "Closed Captions",
        close: "Close",
        errors: {
            badConnection: "This video cannot be played because of a problem with your internet connection.",
            cantLoadPlayer: "Sorry, the video player failed to load.",
            cantPlayInBrowser: "The video cannot be played in this browser.",
            cantPlayVideo: "This video file cannot be played.",
            errorCode: "Error Code",
            liveStreamDown: "The live stream is either down or has ended.",
            protectedContent: "There was a problem providing access to protected content.",
            technicalError: "This video cannot be played because of a technical error."
        },
        exitFullscreen: "Exit Fullscreen",
        fullscreen: "Fullscreen",
        hd: "Quality",
        liveBroadcast: "Live",
        logo: "Logo",
        mute: "Mute",
        next: "Next",
        nextUp: "Next Up",
        notLive: "Not Live",
        off: "Off",
        pause: "Pause",
        play: "Play",
        playback: "Play",
        playbackRates: "Playback Rates",
        player: "Video Player",
        poweredBy: "Powered by",
        prev: "Previous",
        related: {
            autoplaymessage: "Next up in xx",
            heading: "More Videos"
        },
        replay: "Replay",
        rewind: "Rewind 10 Seconds",
        settings: "Settings",
        sharing: {
            copied: "Copied",
            email: "Email",
            embed: "Embed",
            heading: "Share",
            link: "Link"
        },
        slider: "Seek",
        stop: "Stop",
        unmute: "Unmute",
        videoInfo: "About This Video",
        volume: "Volume",
        volumeSlider: "Volume",
        shortcuts: {
            playPause: "Play/Pause",
            volumeToggle: "Mute/Unmute",
            fullscreenToggle: "Fullscreen/Exit Fullscreen",
            seekPercent: "Seek %",
            keyboardShortcuts: "Keyboard Shortcuts",
            increaseVolume: "Increase Volume",
            decreaseVolume: "Decrease Volume",
            seekForward: "Seek Forward",
            seekBackward: "Seek Backward",
            spacebar: "SPACE",
            captionsToggle: "Captions On/Off"
        }
    }
}
, function(n) {
    function c(n) {
        var t = document.createElement("style");
        return t.type = "text/css",
        t.setAttribute("data-jwplayer-id", n),
        function(n) {
            h().appendChild(n)
        }(t),
        t
    }
    function e(n, t) {
        var r, e, o, i = f[n], u;
        return i || (i = f[n] = {
            element: c(n),
            counter: 0
        }),
        u = i.counter++,
        r = i.element,
        o = function() {
            s(r, u, "")
        }
        ,
        (e = function(n) {
            s(r, u, n)
        }
        )(t.css),
        function(n) {
            if (n) {
                if (n.css === t.css && n.media === t.media)
                    return;
                e((t = n).css)
            } else
                o()
        }
    }
    function s(n, t, i) {
        if (n.styleSheet)
            n.styleSheet.cssText = o(t, i);
        else {
            var r = document.createTextNode(i)
              , u = n.childNodes[t];
            u ? n.replaceChild(r, u) : n.appendChild(r)
        }
    }
    var u, i, t = {}, f = {}, h = (u = function() {
        return document.head || document.getElementsByTagName("head")[0]
    }
    ,
    function() {
        return void 0 === i && (i = u.apply(this, arguments)),
        i
    }
    ), r, o;
    n.exports = {
        style: function(n, i) {
            !function(n, i) {
                for (var u, f, r, s, o = 0; o < i.length; o++)
                    if (u = i[o],
                    f = (t[n] || {})[u.id],
                    f) {
                        for (r = 0; r < f.parts.length; r++)
                            f.parts[r](u.parts[r]);
                        for (; r < u.parts.length; r++)
                            f.parts.push(e(n, u.parts[r]))
                    } else {
                        for (s = [],
                        r = 0; r < u.parts.length; r++)
                            s.push(e(n, u.parts[r]));
                        t[n] = t[n] || {};
                        t[n][u.id] = {
                            id: u.id,
                            parts: s
                        }
                    }
            }(i, function(n) {
                for (var f = [], i = {}, r = 0; r < n.length; r++) {
                    var u = n[r]
                      , t = u[0]
                      , o = u[1]
                      , s = u[2]
                      , e = {
                        css: o,
                        media: s
                    };
                    i[t] ? i[t].parts.push(e) : f.push(i[t] = {
                        id: t,
                        parts: [e]
                    })
                }
                return f
            }(n))
        },
        clear: function(n, i) {
            var r = t[n], u, f, s, e, h, o;
            if (r) {
                if (i) {
                    if (u = r[i],
                    u)
                        for (f = 0; f < u.parts.length; f += 1)
                            u.parts[f]();
                    return
                }
                for (s = Object.keys(r),
                e = 0; e < s.length; e += 1)
                    for (h = r[s[e]],
                    o = 0; o < h.parts.length; o += 1)
                        h.parts[o]();
                delete t[n]
            }
        }
    };
    o = (r = [],
    function(n, t) {
        return r[n] = t,
        r.filter(Boolean).join("\n")
    }
    )
}
, function(n, t, i) {
    "use strict";
    function c(n) {
        this.config = n || {}
    }
    var o = i(0), s = i(17), r = i(13), h = i(33), u = i(10), l = {
        html5: function() {
            return i.e(15).then(function() {
                var n = i(51).default;
                return Object(r.a)(n),
                n
            }
            .bind(null, i)).catch(Object(u.b)(152))
        }
    }, f, e;
    Object(o.k)(c.prototype, {
        load: function(n) {
            var t = l[n]
              , i = function() {
                return Promise.reject(new Error("Failed to load media"))
            };
            return t ? t().then(function() {
                var t = h.a[n];
                return t || i()
            }) : i()
        },
        providerSupports: function(n, t) {
            return n.supports(t)
        },
        choose: function(n) {
            var r, t, i;
            if (n === Object(n))
                for (r = s.a.length,
                t = 0; t < r; t++)
                    if (i = s.a[t],
                    this.providerSupports(i, n))
                        return {
                            priority: r - t - 1,
                            name: i.name,
                            type: n.type,
                            providerToCheck: i,
                            provider: h.a[i.name]
                        };
            return {}
        }
    });
    e = c;
    Object(o.k)(l, {
        shaka: function() {
            return i.e(16).then(function() {
                var n = i(161).default;
                return Object(r.a)(n),
                n
            }
            .bind(null, i)).catch(Object(u.b)(154))
        },
        hlsjs: function() {
            return i.e(13).then(function() {
                var n = i(156).default;
                return n.setEdition && n.setEdition(f),
                Object(r.a)(n),
                n
            }
            .bind(null, i)).catch(Object(u.b)(153))
        },
        flash: function() {
            return i.e(12).then(function() {
                var n = i(163).default;
                return Object(r.a)(n),
                n
            }
            .bind(null, i)).catch(Object(u.b)(151))
        },
        hlsjsProgressive: function() {
            return i.e(14).then(function() {
                var n = i(157).default;
                return n.setEdition(f),
                Object(r.a)(n),
                n
            }
            .bind(null, i)).catch(Object(u.b)(155))
        }
    });
    e.prototype.providerSupports = function(n, t) {
        return f = this.config.edition,
        n.supports(t, f)
    }
    ;
    t.a = e
}
, function(n, t, i) {
    "use strict";
    function e(n, t) {
        var s = t.message
          , h = t.code
          , c = r(n.get("id"), s, n.get("localization").errors.errorCode, h)
          , i = n.get("width")
          , e = n.get("height")
          , o = Object(u.e)(c);
        return Object(f.d)(o, {
            width: i.toString().indexOf("%") > 0 ? i : "".concat(i, "px"),
            height: e.toString().indexOf("%") > 0 ? e : "".concat(e, "px")
        }),
        o
    }
    var r = function(n, t, i, r) {
        var u = r ? "(".concat(i, ": ").concat(r, ")").replace(/\s+/g, "&nbsp;") : "";
        return '<div id="'.concat(n, '" class="jw-error jw-reset">') + '<div class="jw-error-msg jw-info-overlay jw-reset"><style>' + '[id="'.concat(n, '"].jw-error{background:#000;overflow:hidden;position:relative}') + '[id="'.concat(n, '"] .jw-error-msg{top:50%;left:50%;position:absolute;transform:translate(-50%,-50%)}') + '[id="'.concat(n, '"] .jw-error-text{text-align:start;color:#FFF;font:14px/1.35 Arial,Helvetica,sans-serif}') + '<\/style><div class="jw-icon jw-reset"><\/div><div class="jw-info-container jw-reset">' + '<div class="jw-error-text jw-reset-text" dir="auto">'.concat(t || "", '<span class="jw-break jw-reset"><\/span>').concat(u, "<\/div>") + "<\/div><\/div><\/div>"
    }
      , u = i(6)
      , f = i(11);
    i.d(t, "a", function() {
        return e
    })
}
, function(n, t, i) {
    "use strict";
    function r(n) {
        return n.slice && "px" === n.slice(-2) && (n = n.slice(0, -2)),
        n
    }
    function u(n, t) {
        var i, r, u;
        return -1 === t.toString().indexOf("%") ? 0 : "string" != typeof n || !n ? 0 : /^\d*\.?\d+%$/.test(n) ? n : (i = n.indexOf(":"),
        -1 === i) ? 0 : (r = parseFloat(n.substr(0, i)),
        u = parseFloat(n.substr(i + 1)),
        r <= 0 || u <= 0 ? 0 : u / r * 100 + "%")
    }
    i.d(t, "b", function() {
        return r
    });
    i.d(t, "a", function() {
        return u
    })
}
, function(n, t, i) {
    "use strict";
    i.d(t, "a", function() {
        return r
    });
    var r = window.atob
}
, function(n, t, i) {
    "use strict";
    function f(n) {
        for (var i, u = [], t = 0; t < Object(r.c)(n); t++)
            i = n.childNodes[t],
            "jwplayer" === i.prefix && "mediatypes" === Object(r.b)(i).toLowerCase() && u.push(Object(r.d)(i));
        return u
    }
    function c(n) {
        var t = [], i, u, f, e, o;
        for (t.feedData = {},
        i = 0; i < Object(r.c)(n); i++)
            if (u = Object(r.a)(n, i),
            "channel" === Object(r.b)(u).toLowerCase())
                for (f = 0; f < Object(r.c)(u); f++)
                    e = Object(r.a)(u, f),
                    o = Object(r.b)(e).toLowerCase(),
                    "item" === o ? t.push(l(e)) : o && (t.feedData[o] = Object(r.d)(e));
        return t
    }
    function l(n) {
        for (var i, o, t = {}, f = 0; f < n.childNodes.length; f++)
            if (i = n.childNodes[f],
            o = Object(r.b)(i),
            o)
                switch (o.toLowerCase()) {
                case "enclosure":
                    t.file = Object(u.j)(i, "url");
                    break;
                case "title":
                    t.title = Object(r.d)(i);
                    break;
                case "guid":
                    t.mediaid = Object(r.d)(i);
                    break;
                case "pubdate":
                    t.date = Object(r.d)(i);
                    break;
                case "description":
                    t.description = Object(r.d)(i);
                    break;
                case "link":
                    t.link = Object(r.d)(i);
                    break;
                case "category":
                    t.tags ? t.tags += Object(r.d)(i) : t.tags = Object(r.d)(i)
                }
        return new h.a(s(n, e(n, t)))
    }
    var r = i(4)
      , u = i(2)
      , e = function n(t, i) {
        for (var e, v, y, o, h, s, c, l = [], a = 0; a < Object(r.c)(t); a++)
            if (e = t.childNodes[a],
            "media" === e.prefix) {
                if (!Object(r.b)(e))
                    continue;
                switch (Object(r.b)(e).toLowerCase()) {
                case "content":
                    (Object(u.j)(e, "duration") && (i.duration = Object(u.g)(Object(u.j)(e, "duration"))),
                    Object(u.j)(e, "url")) && (i.sources || (i.sources = []),
                    v = {
                        file: Object(u.j)(e, "url"),
                        type: Object(u.j)(e, "type"),
                        width: Object(u.j)(e, "width"),
                        label: Object(u.j)(e, "label")
                    },
                    y = f(e),
                    y.length && (v.mediaTypes = y),
                    i.sources.push(v));
                    Object(r.c)(e) > 0 && (i = n(e, i));
                    break;
                case "title":
                    i.title = Object(r.d)(e);
                    break;
                case "description":
                    i.description = Object(r.d)(e);
                    break;
                case "guid":
                    i.mediaid = Object(r.d)(e);
                    break;
                case "thumbnail":
                    i.image || (i.image = Object(u.j)(e, "url"));
                    break;
                case "group":
                    n(e, i);
                    break;
                case "subtitle":
                    o = {};
                    o.file = Object(u.j)(e, "url");
                    o.kind = "captions";
                    Object(u.j)(e, "lang").length > 0 && (o.label = (s = Object(u.j)(e, "lang"),
                    c = void 0,
                    (c = {
                        zh: "Chinese",
                        nl: "Dutch",
                        en: "English",
                        fr: "French",
                        de: "German",
                        it: "Italian",
                        ja: "Japanese",
                        pt: "Portuguese",
                        ru: "Russian",
                        es: "Spanish"
                    })[s] ? c[s] : s));
                    l.push(o)
                }
            }
        for (i.hasOwnProperty("tracks") || (i.tracks = []),
        h = 0; h < l.length; h++)
            i.tracks.push(l[h]);
        return i
    }
      , o = i(12)
      , s = function(n, t) {
        for (var f, l, h, e, c = "default", s = [], i = [], a = 0; a < n.childNodes.length; a++)
            f = n.childNodes[a],
            "jwplayer" === f.prefix && (l = Object(r.b)(f),
            "source" === l ? (delete t.sources,
            s.push({
                file: Object(u.j)(f, "file"),
                "default": Object(u.j)(f, c),
                label: Object(u.j)(f, "label"),
                type: Object(u.j)(f, "type")
            })) : "track" === l ? (delete t.tracks,
            i.push({
                file: Object(u.j)(f, "file"),
                "default": Object(u.j)(f, c),
                kind: Object(u.j)(f, "kind"),
                label: Object(u.j)(f, "label")
            })) : (t[l] = Object(o.serialize)(Object(r.d)(f)),
            "file" === l && t.sources && delete t.sources)),
            t.file || (t.file = t.link);
        if (s.length)
            for (t.sources = [],
            h = 0; h < s.length; h++)
                s[h].file.length > 0 && (s[h][c] = "true" === s[h][c],
                s[h].label.length || delete s[h].label,
                t.sources.push(s[h]));
        if (i.length)
            for (t.tracks = [],
            e = 0; e < i.length; e++)
                i[e].file.length > 0 && (i[e][c] = "true" === i[e][c],
                i[e].kind = i[e].kind.length ? i[e].kind : "captions",
                i[e].label.length || delete i[e].label,
                t.tracks.push(i[e]));
        return t
    }
      , h = i(29);
    i.d(t, "a", function() {
        return c
    })
}
, function(n, t, i) {
    "use strict";
    i.d(t, "a", function() {
        return r
    });
    var r = "function" == typeof console.log ? console.log.bind(console) : function() {}
}
, function(n, t, i) {
    "use strict";
    function r(n) {
        for (var i = new Array(Math.ceil(n.length / 4)), t = 0; t < i.length; t++)
            i[t] = n.charCodeAt(4 * t) + (n.charCodeAt(4 * t + 1) << 8) + (n.charCodeAt(4 * t + 2) << 16) + (n.charCodeAt(4 * t + 3) << 24);
        return i
    }
    function f(n, t) {
        var i;
        if (n = String(n),
        t = String(t),
        0 === n.length)
            return "";
        for (var c, l, a, f = r(Object(u.a)(n)), v = r((c = t,
        unescape(encodeURIComponent(c))).slice(0, 16)), e = f.length, h = f[e - 1], o = f[0], s = 2654435769 * Math.floor(6 + 52 / e); s; ) {
            for (a = s >>> 2 & 3,
            i = e - 1; i >= 0; i--)
                l = ((h = f[i > 0 ? i - 1 : e - 1]) >>> 5 ^ o << 2) + (o >>> 3 ^ h << 4) ^ (s ^ o) + (v[3 & i ^ a] ^ h),
                o = f[i] -= l;
            s -= 2654435769
        }
        return function(n) {
            try {
                return decodeURIComponent(escape(n))
            } catch (t) {
                return n
            }
        }(function(n) {
            for (var i = new Array(n.length), t = 0; t < n.length; t++)
                i[t] = String.fromCharCode(255 & n[t], n[t] >>> 8 & 255, n[t] >>> 16 & 255, n[t] >>> 24 & 255);
            return i.join("")
        }(f).replace(/\0+$/, ""))
    }
    i.d(t, "a", function() {
        return f
    });
    var u = i(45)
}
, function(n, t, i) {
    "use strict";
    i.d(t, "b", function() {
        return r
    });
    i.d(t, "a", function() {
        return u
    });
    var r = window.requestAnimationFrame || function(n) {
        return setTimeout(n, 17)
    }
      , u = window.cancelAnimationFrame || clearTimeout
}
, function(n, t, i) {
    "use strict";
    i.d(t, "b", function() {
        return r
    });
    i.d(t, "a", function() {
        return u
    });
    var r = {
        audioMode: !1,
        flashBlocked: !1,
        item: 0,
        itemMeta: {},
        playbackRate: 1,
        playRejected: !1,
        state: i(3).nb,
        itemReady: !1,
        controlsEnabled: !1
    }
      , u = {
        position: 0,
        duration: 0,
        buffer: 0,
        currentTime: 0
    }
}
, , function(n, t, i) {
    "use strict";
    i.d(t, "a", function() {
        return r
    });
    var r = function(n, t, i) {
        return Math.max(Math.min(n, i), t)
    }
}
, function(n, t, i) {
    "use strict";
    function u() {
        try {
            var n = window.crypto || window.msCrypto;
            if (n && n.getRandomValues)
                return n.getRandomValues(new Uint32Array(1))[0].toString(36)
        } catch (n) {}
        return Math.random().toString(36).slice(2, 9)
    }
    function f(n) {
        for (var t = ""; t.length < n; )
            t += u();
        return t.slice(0, n)
    }
    i.d(t, "a", function() {
        return r
    });
    i.d(t, "b", function() {
        return f
    });
    var r = 12
}
, function(n, t, i) {
    "use strict";
    function r(n) {
        return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
            return typeof n
        }
        : function(n) {
            return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
        }
        )(n)
    }
    function u(n, t) {
        for (var i, r = 0; r < t.length; r++)
            i = t[r],
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(n, i.key, i)
    }
    function o(n, t) {
        return !t || "object" !== r(t) && "function" != typeof t ? function(n) {
            if (void 0 === n)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return n
        }(n) : t
    }
    function f(n) {
        return (f = Object.setPrototypeOf ? Object.getPrototypeOf : function(n) {
            return n.__proto__ || Object.getPrototypeOf(n)
        }
        )(n)
    }
    function e(n, t) {
        return (e = Object.setPrototypeOf || function(n, t) {
            return n.__proto__ = t,
            n
        }
        )(n, t)
    }
    i.d(t, "a", function() {
        return s
    });
    var s = function(n) {
        function t() {
            var n;
            return function(n, t) {
                if (!(n instanceof t))
                    throw new TypeError("Cannot call a class as a function");
            }(this, t),
            (n = o(this, f(t).call(this))).attributes = Object.create(null),
            n
        }
        var i, r, s;
        return function(n, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function");
            n.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: n,
                    writable: !0,
                    configurable: !0
                }
            });
            t && e(n, t)
        }(t, n),
        i = t,
        (r = [{
            key: "addAttributes",
            value: function(n) {
                var t = this;
                Object.keys(n).forEach(function(i) {
                    t.add(i, n[i])
                })
            }
        }, {
            key: "add",
            value: function(n, t) {
                var i = this;
                Object.defineProperty(this, n, {
                    get: function() {
                        return i.attributes[n]
                    },
                    set: function(t) {
                        return i.set(n, t)
                    },
                    enumerable: !1
                });
                this.attributes[n] = t
            }
        }, {
            key: "get",
            value: function(n) {
                return this.attributes[n]
            }
        }, {
            key: "set",
            value: function(n, t) {
                if (this.attributes[n] !== t) {
                    var i = this.attributes[n];
                    this.attributes[n] = t;
                    this.trigger("change:" + n, this, t, i)
                }
            }
        }, {
            key: "clone",
            value: function() {
                var i = {}, n = this.attributes, t;
                if (n)
                    for (t in n)
                        i[t] = n[t];
                return i
            }
        }, {
            key: "change",
            value: function(n, t, i) {
                this.on("change:" + n, t, i);
                var r = this.get(n);
                return t.call(i, this, r, r),
                this
            }
        }]) && u(i.prototype, r),
        s && u(i, s),
        t
    }(i(9).a)
}
, function(n, t, i) {
    "use strict";
    function r(n, t, i) {
        function f() {
            for (; r.length > 0; ) {
                var t = r.shift()
                  , i = t.command
                  , f = t.args;
                (u[i] || n[i]).apply(n, f)
            }
        }
        var r = []
          , u = {};
        t.forEach(function(t) {
            var e = n[t];
            u[t] = e;
            n[t] = function() {
                var n = Array.prototype.slice.call(arguments, 0);
                i() ? r.push({
                    command: t,
                    args: n
                }) : (f(),
                e && e.apply(this, n))
            }
        });
        Object.defineProperty(this, "queue", {
            enumerable: !0,
            get: function() {
                return r
            }
        });
        this.flush = f;
        this.empty = function() {
            r.length = 0
        }
        ;
        this.off = function() {
            t.forEach(function(t) {
                var i = u[t];
                i && (n[t] = i,
                delete u[t])
            })
        }
        ;
        this.destroy = function() {
            this.off();
            this.empty()
        }
    }
    i.d(t, "a", function() {
        return r
    })
}
, function(n, t, i) {
    "use strict";
    i.d(t, "c", function() {
        return r
    });
    i.d(t, "b", function() {
        return u
    });
    i.d(t, "a", function() {
        return f
    });
    var r = 4
      , u = 2
      , f = 1
}
, function(n, t, i) {
    "use strict";
    var f = i(3)
      , r = function() {}
      , u = function() {
        return !1
    }
      , e = {
        name: "default"
    }
      , o = {
        supports: u,
        play: r,
        pause: r,
        preload: r,
        load: r,
        stop: r,
        volume: r,
        mute: r,
        seek: r,
        resize: r,
        remove: r,
        destroy: r,
        setVisibility: r,
        setFullscreen: r,
        getFullscreen: u,
        supportsFullscreen: u,
        getContainer: r,
        setContainer: r,
        getName: function() {
            return e
        },
        getQualityLevels: r,
        getCurrentQuality: r,
        setCurrentQuality: r,
        getAudioTracks: r,
        getCurrentAudioTrack: r,
        setCurrentAudioTrack: r,
        getSeekRange: function() {
            return {
                start: 0,
                end: this.getDuration()
            }
        },
        setPlaybackRate: r,
        getPlaybackRate: function() {
            return 1
        },
        getBandwidthEstimate: function() {
            return null
        },
        getLiveLatency: function() {
            return null
        },
        setControls: r,
        attachMedia: r,
        detachMedia: r,
        init: r,
        setState: function(n) {
            this.state = n;
            this.trigger(f.bb, {
                newstate: n
            })
        },
        sendMediaType: function(n) {
            var i = n[0]
              , t = i.type
              , r = i.mimeType
              , u = "aac" === t || "mp3" === t || "mpeg" === t || r && 0 === r.indexOf("audio/");
            this.trigger(f.T, {
                mediaType: u ? "audio" : "video"
            })
        }
    };
    t.a = o
}
, function(n, t, i) {
    "use strict";
    var o = i(0)
      , s = i(24)
      , h = i(12)
      , c = i(2)
      , l = i(1)
      , a = i(19)
      , u = 0
      , f = 1
      , e = function(n) {
        var t, r, i;
        if ("string" == typeof n)
            return (t = (n = n.split("?")[0]).indexOf("://"),
            t > 0) ? u : (r = n.indexOf("/"),
            i = Object(c.a)(n),
            !(t < 0 && r < 0) || i && isNaN(i) ? f : 2)
    }
      , r = function(n) {
        this.url = n;
        this.promise_ = null
    };
    Object.defineProperties(r.prototype, {
        promise: {
            get: function() {
                return this.promise_ || this.load()
            },
            set: function() {}
        }
    });
    Object(o.k)(r.prototype, {
        load: function() {
            var i = this, n = this.promise_, t;
            return n || (2 === e(this.url) ? n = Promise.resolve(this) : (t = new s.a(function(n) {
                switch (e(n)) {
                case u:
                    return n;
                case f:
                    return Object(h.getAbsolutePath)(n, window.location.href)
                }
            }(this.url)),
            this.loader = t,
            n = t.load().then(function() {
                return i
            })),
            this.promise_ = n),
            n
        },
        registerPlugin: function(n, t, i) {
            this.name = n;
            this.target = t;
            this.js = i
        },
        getNewInstance: function(n, t, i) {
            var u = this.js, r;
            if ("function" != typeof u)
                throw new l.s(null,Object(a.c)(this.url) + 100);
            return r = new u(n,t,i),
            r.addToPlayer = function() {
                var t = n.getContainer().querySelector(".jw-overlays");
                t && (i.left = t.style.left,
                i.top = t.style.top,
                t.appendChild(i),
                r.displayArea = t)
            }
            ,
            r.resizeHandler = function() {
                var n = r.displayArea;
                n && r.resize(n.clientWidth, n.clientHeight)
            }
            ,
            r
        }
    });
    t.a = r
}
, function(n, t, i) {
    "use strict";
    var u = i(0)
      , f = i(3)
      , e = i(4)
      , o = i(46)
      , s = i(28)
      , h = i(9)
      , r = i(1);
    t.a = function() {
        function i(i) {
            var h, l, s, a, v, c;
            try {
                if (l = i.responseXML ? i.responseXML.childNodes : null,
                s = "",
                l) {
                    for (a = 0; a < l.length && 8 === (s = l[a]).nodeType; a++)
                        ;
                    ("xml" === Object(e.b)(s) && (s = s.nextSibling),
                    "rss" === Object(e.b)(s)) && (v = Object(o.a)(s),
                    h = Object(u.k)({
                        playlist: v
                    }, v.feedData))
                }
                if (!h)
                    try {
                        if (c = JSON.parse(i.responseText),
                        Array.isArray(c))
                            h = {
                                playlist: c
                            };
                        else {
                            if (!Array.isArray(c.playlist))
                                throw Error("Playlist is not an array");
                            h = c
                        }
                    } catch (n) {
                        throw new r.s(r.o,621,n);
                    }
                n.trigger(f.eb, h)
            } catch (n) {
                t(n)
            }
        }
        function t(t) {
            t.code || (t = new r.s(r.o,0));
            n.trigger(f.w, t)
        }
        var n = Object(u.k)(this, h.a);
        this.load = function(n) {
            Object(s.a)(n, i, function(n, i, r, u) {
                t(u)
            })
        }
        ;
        this.destroy = function() {
            this.off()
        }
    }
}
, function(n, t, i) {
    "use strict";
    function e() {
        for (var i, s = f.c, t = [], n = [], o = 0; o < s; o++)
            i = u(),
            t.push(i),
            n.push(i),
            r(i);
        var h = n.shift()
          , c = n.shift()
          , e = !1;
        return {
            primed: function() {
                return e
            },
            prime: function() {
                t.forEach(r);
                e = !0
            },
            played: function() {
                e = !0
            },
            getPrimedElement: function() {
                return n.length ? n.shift() : null
            },
            getAdElement: function() {
                return h
            },
            getTestElement: function() {
                return c
            },
            clean: function(n) {
                if (n.src) {
                    n.removeAttribute("src");
                    try {
                        n.load()
                    } catch (n) {}
                }
            },
            recycle: function(t) {
                t && !n.some(function(n) {
                    return n === t
                }) && (this.clean(t),
                n.push(t))
            },
            syncVolume: function(n) {
                var i = Math.min(Math.max(0, n / 100), 1);
                t.forEach(function(n) {
                    n.volume = i
                })
            },
            syncMute: function(n) {
                t.forEach(function(t) {
                    t.muted = n
                })
            }
        }
    }
    function r(n) {
        n.src || n.load()
    }
    function u(n) {
        var t = document.createElement("video");
        return t.className = "jw-video jw-reset",
        t.setAttribute("tabindex", "-1"),
        t.setAttribute("disableRemotePlayback", ""),
        t.setAttribute("webkit-playsinline", ""),
        t.setAttribute("playsinline", ""),
        n && Object.keys(n).forEach(function(i) {
            t.setAttribute(i, n[i])
        }),
        t
    }
    i.d(t, "b", function() {
        return e
    });
    i.d(t, "a", function() {
        return u
    });
    var f = i(56)
}
, function(n, t, i) {
    "use strict";
    function u(n, t) {
        return Object(r.k)({}, t, {
            prime: function() {
                n.src || n.load()
            },
            getPrimedElement: function() {
                return n
            },
            clean: function() {
                t.clean(n)
            },
            recycle: function() {
                t.clean(n)
            }
        })
    }
    i.d(t, "a", function() {
        return u
    });
    var r = i(0)
}
, function(n, t) {
    "use strict";
    t.a = "hidden"in document ? function() {
        return !document.hidden
    }
    : "webkitHidden"in document ? function() {
        return !document.webkitHidden
    }
    : function() {
        return !0
    }
}
, function(n, t, i) {
    "use strict";
    function r(n) {
        return (n = n || window.event) && /^(?:mouse|pointer|touch|gesture|click|key)/.test(n.type)
    }
    i.d(t, "a", function() {
        return r
    })
}
, function(n, t, i) {
    "use strict";
    function v(n, t) {
        var i = n.querySelector(t);
        if (i)
            return i.getAttribute("content")
    }
    function rt(n) {
        return "string" == typeof n && /^\/\/(?:content\.jwplatform|cdn\.jwplayer)\.com\//.test(n)
    }
    function ut(n) {
        return "https:" + n
    }
    function ft(n) {
        var i = "file:" === window.location.protocol ? "https:" : ""
          , t = {
            jwpsrv: "//ssl.p.jwpcdn.com/player/v/8.11.4/jwpsrv.js",
            dai: "//ssl.p.jwpcdn.com/player/plugins/dai/v/0.4.9/dai.js",
            vast: "//ssl.p.jwpcdn.com/player/plugins/vast/v/8.7.2/vast.js",
            googima: "//ssl.p.jwpcdn.com/player/plugins/googima/v/8.7.1/googima.js",
            freewheel: "//ssl.p.jwpcdn.com/player/plugins/freewheel/v/2.2.6/freewheel.js",
            gapro: "//ssl.p.jwpcdn.com/player/plugins/gapro/v/2.1.5/gapro.js"
        }[n];
        return t ? i + t : ""
    }
    function et(n, t, i) {
        t && (n[t.client || ft(i)] = t,
        delete t.client)
    }
    function st(n) {
        var t = n.get("playlist");
        return new Promise(function(i, r) {
            var e, f;
            if ("string" != typeof t)
                return e = n.get("feedData") || {},
                w(n, t, e),
                i();
            f = new ri.a;
            f.on(o.eb, function(t) {
                var r = t.playlist;
                delete t.playlist;
                w(n, r, t);
                i()
            });
            f.on(o.w, function(t) {
                w(n, [], {});
                r(Object(u.z)(t, u.u))
            });
            f.load(t)
        }
        )
    }
    function w(n, t, i) {
        var r = n.attributes;
        r.playlist = Object(p.a)(t);
        r.feedData = i
    }
    function ht(n) {
        return n.attributes._destroyed
    }
    function ui(n) {
        return lt(n) ? Promise.resolve() : st(n).then(function() {
            if (n.get("drm") || Object(ct.b)(n.get("playlist")))
                return Object(ct.d)(n.get("edition"))
        }).then(function() {
            return st(t = n).then(function() {
                var n;
                if (!ht(t)) {
                    n = Object(p.b)(t.get("playlist"), t);
                    t.attributes.playlist = n;
                    try {
                        Object(p.e)(n)
                    } catch (n) {
                        throw n.code += u.u,
                        n;
                    }
                    var i = t.getProviders()
                      , r = i.choose(n[0].sources[0])
                      , f = r.provider
                      , e = r.name;
                    return "function" == typeof f ? f : y.a.html5 && "html5" === e ? y.a.html5 : i.load(e).catch(function(n) {
                        throw Object(u.z)(n, u.v);
                    })
                }
            });
            var t
        })
    }
    function fi(n) {
        var t = [ei(n)];
        return lt(n) || t.push(Promise.resolve()),
        Promise.all(t)
    }
    function ei(n) {
        var t = n.attributes
          , i = t.error;
        if (i && i.code === c.a) {
            var r = t.pid
              , u = t.ph
              , f = new c.b(t.key);
            if (u > 0 && u < 4 && r && f.duration() > -7776e6)
                return new ot.a("//content.jwplatform.com/libraries/".concat(r, ".js")).load().then(function() {
                    var i = window.jwplayer.defaults.key
                      , n = new c.b(i);
                    n.error() || n.token() !== f.token() || (t.key = i,
                    t.edition = n.edition(),
                    t.error = n.error())
                }).catch(function() {})
        }
        return Promise.resolve()
    }
    function lt(n) {
        var t = n.get("advertising");
        return !(!t || !t.outstream)
    }
    function at(n, t) {
        this.namespace = n;
        this.items = t
    }
    function d(n, t) {
        t && t.code && (t.sourceError && console.error(t.sourceError),
        console.error(u.s.logMessage(t.code)))
    }
    function bi(n) {
        n && n.code && console.warn(u.s.logMessage(n.code))
    }
    function g(n, t) {
        if (!document.body.contains(n.currentContainer)) {
            var i = document.getElementById(n.get("id"));
            i && (n.currentContainer = i)
        }
        n.currentContainer.parentElement && n.currentContainer.parentElement.replaceChild(t, n.currentContainer);
        n.currentContainer = t
    }
    var r = i(0), pt = i(55), a = i(44), h = i(20), nt = i(12), wt = i(5), tt = i(40), f = i(14), e = {
        autoPause: {
            viewability: !1,
            pauseAds: !1
        },
        autostart: !1,
        bandwidthEstimate: null,
        bitrateSelection: null,
        castAvailable: !1,
        controls: !0,
        cues: [],
        defaultPlaybackRate: 1,
        displaydescription: !0,
        displaytitle: !0,
        displayPlaybackLabel: !1,
        height: 360,
        intl: {},
        language: "en",
        liveTimeout: null,
        localization: tt.a,
        mute: !1,
        nextUpDisplay: !0,
        playbackRateControls: !1,
        playbackRates: [.5, 1, 1.25, 1.5, 2],
        renderCaptionsNatively: !1,
        repeat: !1,
        stretching: "uniform",
        volume: 90,
        width: 640
    }, bt = function(n, t) {
        var s = Object(r.k)({}, (window.jwplayer || {}).defaults, t, n), p, w, u, v, y, c, l, g, o, it, b, k, d;
        return !function(n) {
            Object.keys(n).forEach(function(t) {
                "id" !== t && (n[t] = Object(nt.serialize)(n[t]))
            })
        }(s),
        p = s.forceLocalizationDefaults ? e.language : Object(f.e)(),
        w = Object(f.j)(s.intl),
        s.localization = Object(f.a)(tt.a, Object(f.c)(s, w, p)),
        u = Object(r.k)({}, e, s),
        "." === u.base && (u.base = Object(h.getScriptPath)("jwplayer.js")),
        u.base = (u.base || Object(h.loadFrom)()).replace(/\/?$/, "/"),
        i.p = u.base,
        u.width = Object(a.b)(u.width),
        u.height = Object(a.b)(u.height),
        u.aspectratio = Object(a.a)(u.aspectratio, u.width),
        u.volume = Object(r.A)(u.volume) ? Math.min(Math.max(0, u.volume), 100) : e.volume,
        u.mute = !!u.mute,
        u.language = p,
        u.intl = w,
        v = s.autoPause,
        v && (u.autoPause.viewability = !("viewability"in v) || !!v.viewability),
        y = u.playbackRateControls,
        y && (c = u.playbackRates,
        Array.isArray(y) && (c = y),
        (c = c.filter(function(n) {
            return Object(r.w)(n) && n >= .25 && n <= 4
        }).map(function(n) {
            return Math.round(100 * n) / 100
        })).indexOf(1) < 0 && c.push(1),
        c.sort(),
        u.playbackRateControls = !0,
        u.playbackRates = c),
        (!u.playbackRateControls || u.playbackRates.indexOf(u.defaultPlaybackRate) < 0) && (u.defaultPlaybackRate = 1),
        u.playbackRate = u.defaultPlaybackRate,
        u.aspectratio || delete u.aspectratio,
        l = u.playlist,
        l ? Array.isArray(l.playlist) && (u.feedData = l,
        u.playlist = l.playlist) : (g = Object(r.E)(u, ["title", "description", "type", "mediaid", "image", "file", "sources", "tracks", "preload", "duration"]),
        u.playlist = [g]),
        u.qualityLabels = u.qualityLabels || u.hlslabels,
        delete u.duration,
        o = u.liveTimeout,
        null !== o && (Object(r.A)(o) ? 0 !== o && (o = Math.max(30, o)) : o = null,
        u.liveTimeout = o),
        k = parseFloat(u.bandwidthEstimate),
        d = parseFloat(u.bitrateSelection),
        u.bandwidthEstimate = Object(r.A)(k) ? k : (it = u.defaultBandwidthEstimate,
        b = parseFloat(it),
        Object(r.A)(b) ? Math.max(b, 1) : e.bandwidthEstimate),
        u.bitrateSelection = Object(r.A)(d) ? d : e.bitrateSelection,
        u.backgroundLoading = Object(r.s)(u.backgroundLoading) ? u.backgroundLoading : wt.Features.backgroundLoading,
        u
    }, kt = i(8), c = i(26), dt = i(23), it = "__CONTEXTUAL__", gt = i(66), ni = i.n(gt), ti = function(n, t) {
        var o, u = bt(n, t), a = u.key || window.jwplayer && window.jwplayer.key, s = new c.b(a), y = s.edition(), l;
        if ("free" === s.edition() && (u = Object(r.k)({
            skin: {
                active: "#ff0046",
                timeslider: {
                    progress: "none"
                }
            },
            logo: {
                position: "control-bar",
                file: ni.a
            }
        }, e, Object(r.E)(u, ["analytics", "aspectratio", "base", "file", "height", "playlist", "sources", "width"]))),
        u.key = a,
        u.edition = y,
        u.error = s.error(),
        u.generateSEOMetadata = u.generateSEOMetadata || !1,
        "unlimited" === y) {
            if (l = Object(h.getScriptPath)("jwplayer.js"),
            !l)
                throw new Error("Error setting up player: Could not locate jwplayer.js script tag");
            i.p = l
        }
        if (u.flashplayer = function(n) {
            var t = n.flashplayer;
            return t || (t = (Object(h.getScriptPath)("jwplayer.js") || n.base) + "jwplayer.flash.swf"),
            "http:" === window.location.protocol && (t = t.replace(/^https/, "http")),
            t
        }(u),
        u.plugins = function(n) {
            var f = Object(r.k)({}, n.plugins), s = Object(dt.a)(n.edition), e, o, l, u, a;
            s("ads") && (e = Object(r.k)({}, n.advertising),
            o = e.client,
            o && (l = ft(o) || o,
            f[l] = e,
            delete e.client));
            s("jwpsrv") && (u = n.analytics,
            u !== Object(u) && (u = {}),
            et(f, u, "jwpsrv"));
            et(f, n.ga, "gapro");
            var t = n.related
              , v = !s("discovery") || t !== Object(t)
              , y = !t || "none" !== t.displayMode
              , h = t || {}
              , i = void 0 === h.oncomplete ? "none" : h.oncomplete
              , c = h.autoplaytimer;
            return !1 === i || n.repeat ? i = "hide" : "none" === i && (c = 0),
            a = "autoplay" === i && c <= 0 || "none" === i,
            n.related = Object(r.k)({}, t, {
                disableRelated: v,
                showButton: y,
                oncomplete: i,
                autoplaytimer: c,
                shouldAutoAdvance: a
            }),
            f
        }(u),
        u.ab && (u.ab = function(n) {
            var t = n.ab;
            return t.clone && (t = t.clone()),
            Object.keys(t.tests).forEach(function(i) {
                t.tests[i].forEach(function(t) {
                    t.addConfig && t.addConfig(n, t.selection)
                })
            }),
            t
        }(u)),
        o = u.playlist,
        Object(r.y)(o) && o.indexOf(it) > -1 && (u.playlist = function(n, t) {
            var u = (n.querySelector("title") || {}).textContent
              , f = v(n, 'meta[property="og:title"]')
              , i = encodeURIComponent(f || u || "")
              , r = v(n, 'meta[property="og:description"]') || v(n, 'meta[name="description"]');
            return r && (i += "&page_description=" + encodeURIComponent(r)),
            t.replace(it, i)
        }(document, u.playlist),
        u.contextual = !0),
        Object(kt.isFileProtocol)()) {
            var p = u
              , w = p.playlist
              , f = p.related;
            rt(w) && (u.playlist = ut(w));
            f && rt(f.file) && (f.file = ut(f.file))
        }
        return u
    }, y = i(10), ii = i(25), o = i(3), ri = i(59), p = i(30), ot = i(24), u = i(1), ct = i(36), oi = function(n) {
        var t = n.get("skin") ? n.get("skin").url : void 0;
        return "string" == typeof t && !function(n) {
            for (var i = document.styleSheets, t = 0, r = i.length; t < r; t++)
                if (i[t].href === n)
                    return !0;
            return !1
        }(t) ? new ot.a(t,!0).load().catch(function(n) {
            return n
        }) : Promise.resolve()
    }, si = function(n) {
        var t = n.attributes
          , i = t.language
          , e = t.base
          , o = t.setupConfig
          , s = t.intl
          , r = Object(f.c)(o, s, i);
        return !Object(f.h)(i) || Object(f.f)(r) ? Promise.resolve() : new Promise(function(o) {
            return Object(f.i)(e, i).then(function(i) {
                var e = i.response;
                if (!ht(n)) {
                    if (!e)
                        throw new u.s(null,u.g);
                    t.localization = Object(f.a)(e, r);
                    o()
                }
            }).catch(function(n) {
                o(n.code === u.g ? n : Object(u.z)(n, u.f))
            })
        }
        )
    }, hi = function(n) {
        var t;
        this.start = function(i) {
            var r = Object(ii.a)(n, i)
              , f = Promise.all([Object(y.d)(n), r, ui(n), fi(n), oi(n), si(n)])
              , e = new Promise(function(n, i) {
                t = setTimeout(function() {
                    i(new u.s(u.m,u.x))
                }, 6e4);
                var r = function() {
                    clearTimeout(t);
                    setTimeout(n, 6e4)
                };
                f.then(r).catch(r)
            }
            );
            return Promise.race([f, e]).catch(function(n) {
                var t = function() {
                    throw n;
                };
                return r.then(t).catch(t)
            }).then(function(n) {
                return function(n) {
                    if (!n || !n.length)
                        return {
                            core: null,
                            warnings: []
                        };
                    var t = n.reduce(function(n, t) {
                        return n.concat(t)
                    }, []).filter(function(n) {
                        return n && n.code
                    });
                    return {
                        core: n[0],
                        warnings: t
                    }
                }(n)
            })
        }
        ;
        this.destroy = function() {
            clearTimeout(t);
            n.set("_destroyed", !0);
            n = null
        }
    }, ci = i(42), li = i(32), ai = i(16), s = {
        removeItem: function() {}
    }, k;
    try {
        s = window.localStorage || s
    } catch (n) {}
    Object(r.k)(at.prototype, {
        getAllItems: function() {
            var n = this;
            return this.items.reduce(function(t, i) {
                var r = s["".concat(n.namespace, ".").concat(i)];
                return r && (t[i] = Object(nt.serialize)(r)),
                t
            }, {})
        },
        track: function(n) {
            var t = this;
            this.items.forEach(function(i) {
                n.on("change:".concat(i), function(n, r) {
                    try {
                        s["".concat(t.namespace, ".").concat(i)] = r
                    } catch (n) {
                        ai.a.debug && console.error(n)
                    }
                })
            })
        },
        clear: function() {
            var n = this;
            this.items.forEach(function(t) {
                s.removeItem("".concat(n.namespace, ".").concat(t))
            })
        }
    });
    var vi = at
      , yi = i(54)
      , vt = i(50)
      , l = i(9)
      , b = i(43)
      , pi = i(60)
      , wi = i(61)
      , yt = i(35);
    i(67);
    i(68);
    i.d(t, "b", function() {
        return g
    });
    k = function(n) {
        this._events = {};
        this.modelShim = new yi.a;
        this.modelShim._qoeItem = new li.a;
        this.mediaShim = {};
        this.setup = new hi(this.modelShim);
        this.currentContainer = this.originalContainer = n;
        this.apiQueue = new pt.a(this,["load", "play", "pause", "seek", "stop", "playlistItem", "playlistNext", "playlistPrev", "next", "preload", "setConfig", "setCurrentAudioTrack", "setCurrentCaptions", "setCurrentQuality", "setFullscreen", "addButton", "removeButton", "castToggle", "setMute", "setVolume", "setPlaybackRate", "addCues", "setCues", "setPlaylistItem", "resize", "setCaptions", "setControls"],function() {
            return !0
        }
        )
    }
    ;
    Object(r.k)(k.prototype, {
        on: l.a.on,
        once: l.a.once,
        off: l.a.off,
        trigger: l.a.trigger,
        init: function(n, t) {
            var i = this, f = this.modelShim, h = new vi("jwplayer",["volume", "mute", "captionLabel", "bandwidthEstimate", "bitrateSelection", "qualityLabel"]), a = h && h.getAllItems(), c, s, e, l;
            return f.attributes = f.attributes || {},
            Object(r.k)(this.mediaShim, vt.a),
            c = n,
            s = ti(Object(r.k)({}, n), a),
            s.id = t.id,
            s.setupConfig = c,
            Object(r.k)(f.attributes, s, vt.b),
            f.getProviders = function() {
                return new ci.a(s)
            }
            ,
            f.setProvider = function() {}
            ,
            e = Object(pi.b)(),
            f.get("backgroundLoading") || (e = Object(wi.a)(e.getPrimedElement(), e)),
            l = new yt.a(Object(yt.b)(this.originalContainer)).once("gesture", function() {
                e.prime();
                i.preload();
                l.destroy()
            }),
            f.on("change:errorEvent", d),
            this.setup.start(t).then(function(n) {
                var l = n.core, c, a, s;
                if (!l)
                    throw Object(u.z)(null, u.w);
                if (i.setup) {
                    if (i.on(o.ub, bi),
                    n.warnings.forEach(function(n) {
                        i.trigger(o.ub, n)
                    }),
                    c = i.modelShim.clone(),
                    c.error)
                        throw c.error;
                    return a = i.apiQueue.queue.slice(0),
                    i.apiQueue.destroy(),
                    Object(r.k)(i, l.prototype),
                    i.setup(c, t, i.originalContainer, i._events, a, e),
                    s = i._model,
                    f.off("change:errorEvent", d),
                    s.on("change:errorEvent", d),
                    h.track(s),
                    i.updatePlaylist(s.get("playlist"), s.get("feedData")).catch(function(n) {
                        throw Object(u.z)(n, u.u);
                    })
                }
            }).then(function() {
                i.setup && i.playerReady()
            }).catch(function(n) {
                i.setup && function(n, t, i) {
                    Promise.resolve().then(function() {
                        var r = Object(u.A)(u.r, u.y, i), f = n._model || n.modelShim, e, s;
                        r.message = r.message || f.get("localization").errors[r.key];
                        delete r.key;
                        e = f.get("contextual");
                        e || (s = Object(b.a)(n, r),
                        b.a.cloneIcon && s.querySelector(".jw-icon").appendChild(b.a.cloneIcon("error")),
                        g(n, s));
                        f.set("errorEvent", r);
                        f.set("state", o.mb);
                        n.trigger(o.jb, r);
                        e && t.remove()
                    })
                }(i, t, n)
            })
        },
        playerDestroy: function() {
            this.apiQueue && this.apiQueue.destroy();
            this.setup && this.setup.destroy();
            this.currentContainer !== this.originalContainer && g(this, this.originalContainer);
            this.off();
            this._events = this._model = this.modelShim = this.apiQueue = this.setup = null
        },
        getContainer: function() {
            return this.currentContainer
        },
        get: function(n) {
            if (this.modelShim)
                return n in this.mediaShim ? this.mediaShim[n] : this.modelShim.get(n)
        },
        getItemQoe: function() {
            return this.modelShim._qoeItem
        },
        getConfig: function() {
            return Object(r.k)({}, this.modelShim.attributes, this.mediaShim)
        },
        getCurrentCaptions: function() {
            return this.get("captionsIndex")
        },
        getWidth: function() {
            return this.get("containerWidth")
        },
        getHeight: function() {
            return this.get("containerHeight")
        },
        getMute: function() {
            return this.get("mute")
        },
        getProvider: function() {
            return this.get("provider")
        },
        getState: function() {
            return this.get("state")
        },
        getAudioTracks: function() {
            return null
        },
        getCaptionsList: function() {
            return null
        },
        getQualityLevels: function() {
            return null
        },
        getVisualQuality: function() {
            return null
        },
        getCurrentQuality: function() {
            return -1
        },
        getCurrentAudioTrack: function() {
            return -1
        },
        getSafeRegion: function() {
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }
        },
        isBeforeComplete: function() {
            return !1
        },
        isBeforePlay: function() {
            return !1
        },
        createInstream: function() {
            return null
        },
        skipAd: function() {},
        attachMedia: function() {},
        detachMedia: function() {}
    });
    t.a = k
}
, function(n, t, i) {
    "use strict";
    function u(n) {
        return "hls" === n.type && r.OS.android ? !1 !== n.androidhls && !r.Browser.firefox && parseFloat(r.OS.version.version) >= 4.4 : null
    }
    i.d(t, "a", function() {
        return u
    });
    var r = i(5)
}
, function(n) {
    n.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 29.3" class="jw-svg-icon jw-svg-icon-watermark" focusable="false"><path d="M37,16.68c0,2.4-.59,3.43-2.4,3.43a5.75,5.75,0,0,1-3.38-1.23v3.58a7.39,7.39,0,0,0,3.67,1c3.67,0,5.73-1.91,5.73-6.32V5.86H37Z"><\/path><polygon points="58.33 17.61 55.39 6.01 52.55 6.01 49.52 17.61 46.73 6.01 43.06 6.01 47.56 23.29 50.89 23.29 53.92 11.88 56.96 23.29 60.24 23.29 64.74 6.01 61.17 6.01 58.33 17.61"><\/polygon><path d="M73.84,6H67.47V23.29h2.2v-6.9h4.17c3.47,0,5.77-1.77,5.77-5.19S77.31,6,73.84,6Zm0,8.47H69.72V8h4.12c2.3,0,3.57,1.22,3.62,3.28C77.46,13.21,76.19,14.48,73.84,14.48Z"><\/path><path d="M99.2,6l-6,15.27H85V6H82.8V23.29H94.7l2-5.19h7.09l2,5.19H108L101.26,6ZM97.39,16.14l2.84-7.39L103,16.14Z"><\/path><polygon points="113.98 14.18 108.99 6.01 106.59 6.01 112.81 16.14 112.81 23.29 115.01 23.29 115.01 16.14 121.33 6.01 118.98 6.01 113.98 14.18"><\/polygon><polygon points="123.14 23.29 134.1 23.29 134.1 21.28 125.29 21.28 125.29 15.41 133.32 15.41 133.32 13.45 125.29 13.45 125.29 7.97 134.1 7.97 134.1 6.01 123.14 6.01 123.14 23.29"><\/polygon><path d="M144.86,15.85c2.74-.39,4.41-2,4.41-4.85,0-3.23-2.26-5-5.73-5h-6.32V23.29h2.22V16h3.08l4.94,7.29H150Zm-5.42-1.71V8h4.06c2.3,0,3.62,1.17,3.62,3.08s-1.32,3.09-3.62,3.09Z"><\/path><path d="M27.63.09a1,1,0,0,0-1.32.48c-.24.51-6.35,15.3-6.35,15.3-.2.46-.33.41-.33-.07,0,0,0-5.15,0-9.39,0-2.31-1.12-3.61-2.73-3.88A3.12,3.12,0,0,0,14.83,3a4.57,4.57,0,0,0-1.5,1.79c-.48.94-3.47,9.66-3.47,9.66-.16.46-.31.44-.31,0,0,0-.09-3.76-.18-4.64-.13-1.36-.44-3.59-2.2-3.7S4.77,8,4.36,9.24c-.29.84-1.65,5.35-1.65,5.35l-.2.46h0c-.06.24-.17.24-.24,0l-.11-.42Q2,14,1.74,13.31a1.71,1.71,0,0,0-.33-.66.83.83,0,0,0-.88-.22.82.82,0,0,0-.53.69,4.22,4.22,0,0,0,.07.79,29,29,0,0,0,1,4.6,1.31,1.31,0,0,0,1.8.66,3.43,3.43,0,0,0,1.24-1.81c.33-.81,2-5.48,2-5.48.18-.46.31-.44.29,0,0,0-.09,4.57-.09,6.64a13.11,13.11,0,0,0,.28,2.93,2.41,2.41,0,0,0,.82,1.27,2,2,0,0,0,1.41.4,2,2,0,0,0,.7-.24,3.15,3.15,0,0,0,.79-.71,12.52,12.52,0,0,0,1.26-2.11c.81-1.6,2.92-6.58,2.92-6.58.2-.46.33-.41.33.07,0,0-.26,8.36-.26,11.55a6.39,6.39,0,0,0,.44,2.33,2.8,2.8,0,0,0,1.45,1.61A2.57,2.57,0,0,0,18.79,29a3.76,3.76,0,0,0,1.28-1.32,15.12,15.12,0,0,0,1.07-2.31c.64-1.65,1.17-3.33,1.7-5s5-17.65,5.28-19a1.79,1.79,0,0,0,0-.46A1,1,0,0,0,27.63.09Z"><\/path><\/svg>'
}
, function(n, t, i) {
    "use strict";
    function v(n, t) {
        for (var r, i = t.length; i--; )
            if (r = t[i],
            n.target === r.getContainer()) {
                r.setIntersection(n);
                break
            }
    }
    function y() {
        r.forEach(function(n) {
            var t = n.model, i, r;
            t.get("audioMode") || !t.get("controls") || t.get("visibility") < .75 || (i = t.get("state"),
            r = Object(k.f)(),
            !r && "paused" === i && n.api.getFullscreen() ? n.api.setFullscreen(!1) : "playing" === i && n.api.setFullscreen(r))
        })
    }
    function o() {
        r.forEach(function(n) {
            n.model.set("activeTab", Object(b.a)())
        })
    }
    function p(n, t) {
        var i = t.indexOf(n);
        -1 !== i && t.splice(i, 1)
    }
    function w(n) {
        f.forEach(function(t) {
            t(n)
        })
    }
    var u, b = i(62), h = i(5), k = i(6), r = [], s = [], f = [], e = {}, c = "screen"in window && "orientation"in window.screen, l = h.OS.android && h.Browser.chrome, a = !1;
    document.addEventListener("visibilitychange", o);
    document.addEventListener("webkitvisibilitychange", o);
    l && c && window.screen.orientation.addEventListener("change", y);
    window.addEventListener("beforeunload", function() {
        document.removeEventListener("visibilitychange", o);
        document.removeEventListener("webkitvisibilitychange", o);
        window.removeEventListener("scroll", w);
        l && c && window.screen.orientation.removeEventListener("change", y)
    });
    t.a = {
        add: function(n) {
            r.push(n)
        },
        remove: function(n) {
            p(n, r)
        },
        addScrollHandler: function(n) {
            a || (a = !0,
            window.addEventListener("scroll", w));
            f.push(n)
        },
        removeScrollHandler: function(n) {
            var t = f.indexOf(n);
            -1 !== t && f.splice(t, 1)
        },
        addWidget: function(n) {
            s.push(n)
        },
        removeWidget: function(n) {
            p(n, s)
        },
        size: function() {
            return r.length
        },
        observe: function(n) {
            var t;
            t = window.IntersectionObserver;
            u || (u = new t(function(n) {
                var t, i;
                if (n && n.length)
                    for (t = n.length; t--; )
                        i = n[t],
                        v(i, r),
                        v(i, s)
            }
            ,{
                threshold: [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]
            }));
            e[n.id] || (e[n.id] = !0,
            u.observe(n))
        },
        unobserve: function(n) {
            u && e[n.id] && (delete e[n.id],
            u.unobserve(n))
        }
    }
}
, function(n, t, i) {
    "use strict";
    function h(n, t) {
        for (var i, r = 0; r < t.length; r++)
            i = t[r],
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(n, i.key, i)
    }
    function e() {
        Object(s.a)(f);
        f = Object(s.b)(function() {
            r.forEach(function(n) {
                n.view.updateBounds();
                var t = n.view.model.get("containerWidth");
                n.resized = n.width !== t;
                n.width = t
            });
            r.forEach(function(n) {
                n.contractElement.scrollLeft = 2 * n.width
            });
            r.forEach(function(n) {
                Object(u.d)(n.expandChild, {
                    width: n.width + 1
                });
                n.resized && n.view.model.get("visibility") && n.view.updateStyles()
            });
            r.forEach(function(n) {
                n.expandElement.scrollLeft = n.width + 1
            });
            r.forEach(function(n) {
                n.resized && n.view.checkResized()
            })
        })
    }
    var r, f, c;
    i.d(t, "a", function() {
        return c
    });
    var o = i(0)
      , s = i(49)
      , l = i(6)
      , u = i(11);
    r = [];
    f = -1;
    c = function() {
        function n(t, i, f) {
            !function(n, t) {
                if (!(n instanceof t))
                    throw new TypeError("Cannot call a class as a function");
            }(this, n);
            var c = {
                display: "block",
                position: "absolute",
                top: 0,
                left: 0
            }
              , a = {
                width: "100%",
                height: "100%"
            }
              , s = Object(l.e)('<div style="opacity:0;visibility:hidden;overflow:hidden;"><div><div style="height:1px;"><\/div><\/div><div class="jw-contract-trigger"><\/div><\/div>')
              , h = s.firstChild
              , y = h.firstChild
              , v = h.nextSibling;
            Object(u.d)([h, v], Object(o.k)({
                overflow: "auto"
            }, c, a));
            Object(u.d)(s, Object(o.k)({}, c, a));
            this.expandElement = h;
            this.expandChild = y;
            this.contractElement = v;
            this.hiddenElement = s;
            this.element = t;
            this.view = i;
            this.model = f;
            this.width = 0;
            this.resized = !1;
            t.firstChild ? t.insertBefore(s, t.firstChild) : t.appendChild(s);
            t.addEventListener("scroll", e, !0);
            r.push(this);
            e()
        }
        var t, i, f;
        return t = n,
        (i = [{
            key: "destroy",
            value: function() {
                if (this.view) {
                    var n = r.indexOf(this);
                    -1 !== n && r.splice(n, 1);
                    this.element.removeEventListener("scroll", e, !0);
                    this.element.removeChild(this.hiddenElement);
                    this.view = this.model = null
                }
            }
        }]) && h(t.prototype, i),
        f && h(t, f),
        n
    }()
}
, function(n, t, i) {
    "use strict";
    function ni() {}
    function r(n) {
        if (!(this instanceof r))
            throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof n)
            throw new TypeError("not a function");
        this._state = 0;
        this._handled = !1;
        this._value = void 0;
        this._deferreds = [];
        ft(n, this)
    }
    function ut(n, t) {
        for (; 3 === n._state; )
            n = n._value;
        0 !== n._state ? (n._handled = !0,
        r._immediateFn(function() {
            var i = 1 === n._state ? t.onFulfilled : t.onRejected, r;
            if (null !== i) {
                try {
                    r = i(n._value)
                } catch (n) {
                    return void l(t.promise, n)
                }
                p(t.promise, r)
            } else
                (1 === n._state ? p : l)(t.promise, n._value)
        })) : n._deferreds.push(t)
    }
    function p(n, t) {
        var i, u, f;
        try {
            if (t === n)
                throw new TypeError("A promise cannot be resolved with itself.");
            if (t && ("object" == typeof t || "function" == typeof t)) {
                if (i = t.then,
                t instanceof r)
                    return n._state = 3,
                    n._value = t,
                    void w(n);
                if ("function" == typeof i)
                    return void ft((u = i,
                    f = t,
                    function() {
                        u.apply(f, arguments)
                    }
                    ), n)
            }
            n._state = 1;
            n._value = t;
            w(n)
        } catch (t) {
            l(n, t)
        }
    }
    function l(n, t) {
        n._state = 2;
        n._value = t;
        w(n)
    }
    function w(n) {
        2 === n._state && 0 === n._deferreds.length && r._immediateFn(function() {
            n._handled || r._unhandledRejectionFn(n._value)
        });
        for (var t = 0, i = n._deferreds.length; t < i; t++)
            ut(n, n._deferreds[t]);
        n._deferreds = null
    }
    function ti(n, t, i) {
        this.onFulfilled = "function" == typeof n ? n : null;
        this.onRejected = "function" == typeof t ? t : null;
        this.promise = i
    }
    function ft(n, t) {
        var i = !1;
        try {
            n(function(n) {
                i || (i = !0,
                p(t, n))
            }, function(n) {
                i || (i = !0,
                l(t, n))
            })
        } catch (n) {
            if (i)
                return;
            i = !0;
            l(t, n)
        }
    }
    function lt(n, t) {
        this.name = n;
        this.message = t.message || t.toString();
        this.error = t
    }
    function vt(n, t) {
        var i = new ei.a(t);
        return i.on(k.hb, function(t) {
            n._qoe.tick("ready");
            t.setupTime = n._qoe.between("setup", "ready")
        }),
        i.on("all", function(t, i) {
            n.trigger(t, i)
        }),
        i
    }
    function yt(n, t) {
        var i = n.plugins;
        Object.keys(i).forEach(function(n) {
            delete i[n]
        });
        t.get("setupConfig") && n.trigger("remove");
        n.off();
        t.playerDestroy();
        t.getContainer().removeAttribute("data-jwplayer-id")
    }
    function g(n) {
        var r = ++vi
          , f = n.id || "player-".concat(r)
          , i = new ct.a
          , o = {}
          , t = vt(this, n);
        i.tick("init");
        n.setAttribute("data-jwplayer-id", f);
        Object.defineProperties(this, {
            id: {
                enumerable: !0,
                get: function() {
                    return f
                }
            },
            uniqueId: {
                enumerable: !0,
                get: function() {
                    return r
                }
            },
            plugins: {
                enumerable: !0,
                get: function() {
                    return o
                }
            },
            _qoe: {
                enumerable: !0,
                get: function() {
                    return i
                }
            },
            version: {
                enumerable: !0,
                get: function() {
                    return ht.a
                }
            },
            Events: {
                enumerable: !0,
                get: function() {
                    return s.a
                }
            },
            utils: {
                enumerable: !0,
                get: function() {
                    return d
                }
            },
            _: {
                enumerable: !0,
                get: function() {
                    return u.g
                }
            }
        });
        Object(u.k)(this, {
            _events: {},
            setup: function(r) {
                return i.clear("ready"),
                i.tick("setup"),
                yt(this, t),
                (t = vt(this, n)).init(r, this),
                this.on(r.events, null, this)
            },
            remove: function() {
                return function(n) {
                    for (var t = e.a.length; t--; )
                        if (e.a[t].uniqueId === n.uniqueId) {
                            e.a.splice(t, 1);
                            break
                        }
                }(this),
                yt(this, t),
                this
            },
            qoe: function() {
                var n = t.getItemQoe();
                return {
                    setupTime: this._qoe.between("setup", "ready"),
                    firstFrame: n.getFirstFrame ? n.getFirstFrame() : null,
                    player: this._qoe.dump(),
                    item: n.dump()
                }
            },
            addCues: function(n) {
                return Array.isArray(n) && t.addCues(n),
                this
            },
            getAudioTracks: function() {
                return t.getAudioTracks()
            },
            getBuffer: function() {
                return t.get("buffer")
            },
            getCaptions: function() {
                return t.get("captions")
            },
            getCaptionsList: function() {
                return t.getCaptionsList()
            },
            getConfig: function() {
                return t.getConfig()
            },
            getContainer: function() {
                return t.getContainer()
            },
            getControls: function() {
                return t.get("controls")
            },
            getCues: function() {
                return t.get("cues")
            },
            getCurrentAudioTrack: function() {
                return t.getCurrentAudioTrack()
            },
            getCurrentCaptions: function() {
                return t.getCurrentCaptions()
            },
            getCurrentQuality: function() {
                return t.getCurrentQuality()
            },
            getCurrentTime: function() {
                return t.get("currentTime")
            },
            getDuration: function() {
                return t.get("duration")
            },
            getEnvironment: function() {
                return fi
            },
            getFullscreen: function() {
                return t.get("fullscreen")
            },
            getHeight: function() {
                return t.getHeight()
            },
            getItemMeta: function() {
                return t.get("itemMeta") || {}
            },
            getMute: function() {
                return t.getMute()
            },
            getPlaybackRate: function() {
                return t.get("playbackRate")
            },
            getPlaylist: function() {
                return t.get("playlist")
            },
            getPlaylistIndex: function() {
                return t.get("item")
            },
            getPlaylistItem: function(n) {
                if (!d.exists(n))
                    return t.get("playlistItem");
                var i = this.getPlaylist();
                return i ? i[n] : null
            },
            getPosition: function() {
                return t.get("position")
            },
            getProvider: function() {
                return t.getProvider()
            },
            getQualityLevels: function() {
                return t.getQualityLevels()
            },
            getSafeRegion: function() {
                var n = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                return t.getSafeRegion(n)
            },
            getState: function() {
                return t.getState()
            },
            getStretching: function() {
                return t.get("stretching")
            },
            getViewable: function() {
                return t.get("viewable")
            },
            getVisualQuality: function() {
                return t.getVisualQuality()
            },
            getVolume: function() {
                return t.get("volume")
            },
            getWidth: function() {
                return t.getWidth()
            },
            setCaptions: function(n) {
                return t.setCaptions(n),
                this
            },
            setConfig: function(n) {
                return t.setConfig(n),
                this
            },
            setControls: function(n) {
                return t.setControls(n),
                this
            },
            setCurrentAudioTrack: function(n) {
                t.setCurrentAudioTrack(n)
            },
            setCurrentCaptions: function(n) {
                t.setCurrentCaptions(n)
            },
            setCurrentQuality: function(n) {
                t.setCurrentQuality(n)
            },
            setFullscreen: function(n) {
                return t.setFullscreen(n),
                this
            },
            setMute: function(n) {
                return t.setMute(n),
                this
            },
            setPlaybackRate: function(n) {
                return t.setPlaybackRate(n),
                this
            },
            setPlaylistItem: function(n, i) {
                return t.setPlaylistItem(n, i),
                this
            },
            setCues: function(n) {
                return Array.isArray(n) && t.setCues(n),
                this
            },
            setVolume: function(n) {
                return t.setVolume(n),
                this
            },
            load: function(n, i) {
                return t.load(n, i),
                this
            },
            play: function(n) {
                return t.play(n),
                this
            },
            pause: function(n) {
                return t.pause(n),
                this
            },
            playToggle: function(n) {
                switch (this.getState()) {
                case k.qb:
                case k.kb:
                    return this.pause(n);
                default:
                    return this.play(n)
                }
            },
            seek: function(n, i) {
                return t.seek(n, i),
                this
            },
            playlistItem: function(n, i) {
                return t.playlistItem(n, i),
                this
            },
            playlistNext: function(n) {
                return t.playlistNext(n),
                this
            },
            playlistPrev: function(n) {
                return t.playlistPrev(n),
                this
            },
            next: function(n) {
                return t.next(n),
                this
            },
            castToggle: function() {
                return t.castToggle(),
                this
            },
            createInstream: function() {
                return t.createInstream()
            },
            stop: function() {
                return t.stop(),
                this
            },
            resize: function(n, i) {
                return t.resize(n, i),
                this
            },
            addButton: function(n, i, r, u, f) {
                return t.addButton(n, i, r, u, f),
                this
            },
            removeButton: function(n) {
                return t.removeButton(n),
                this
            },
            attachMedia: function() {
                return t.attachMedia(),
                this
            },
            detachMedia: function() {
                return t.detachMedia(),
                this
            },
            isBeforeComplete: function() {
                return t.isBeforeComplete()
            },
            isBeforePlay: function() {
                return t.isBeforePlay()
            }
        })
    }
    function pt(n) {
        for (var t = 0; t < e.a.length; t++)
            if (e.a[t].id === n)
                return e.a[t];
        return null
    }
    function wt(n) {
        Object.defineProperties(n, {
            api: {
                get: function() {
                    return ui
                },
                set: function() {}
            },
            version: {
                get: function() {
                    return ht.a
                },
                set: function() {}
            },
            debug: {
                get: function() {
                    return a.a.debug
                },
                set: function(n) {
                    a.a.debug = !!n
                }
            }
        })
    }
    function ir(n) {
        var t = {};
        dt(this, n, n, t);
        dt(this, n, g.prototype, t)
    }
    function dt(n, t, i, r) {
        var u = Object.keys(i);
        u.forEach(function(f) {
            "function" == typeof i[f] && "Events" !== f ? n[f] = function n(t, i, r, u, f) {
                return function() {
                    var e = Array.prototype.slice.call(arguments), s = e[0], o = i._trackCallQueue || (i._trackCallQueue = []), c = tr.test(r), v = c && e[1] && e[1]._callback, y = f.edition || rr(i, f, "edition"), p = "free" === y, l, a, h;
                    if (p) {
                        if (l = ["addButton", "addCues", "detachMedia", "load", "next", "pause", "play", "playlistItem", "playlistNext", "playlistPrev", "playToggle", "resize", "seek", "setCaptions", "setConfig", "setControls", "setCues", "setFullscreen", "setMute", "setPlaybackRate", "setPlaylistItem", "setVolume", "stop"],
                        l.indexOf(r) > -1)
                            return gt(r),
                            t;
                        if (a = ["createInstream", "setCurrentAudioTrack", "setCurrentCaptions", "setCurrentQuality"],
                        a.indexOf(r) > -1)
                            return gt(r),
                            null
                    }
                    return (v || o.push([r, s]),
                    c) ? (tt(i, o),
                    i[r].apply(t, e)) : (ur(r, e),
                    h = i[r].apply(i, e),
                    "remove" === r ? i.off.call(t) : "setup" === r && (i.off.call(t),
                    i.off(s.events, null, i),
                    i.on.call(t, s.events, null, t),
                    i.on("all", function(r, e) {
                        if ("ready" === r) {
                            var s = Object.keys(i).filter(function(n) {
                                return "_" !== n[0] && -1 === u.indexOf(n) && "function" == typeof i[n]
                            })
                              , h = u.concat(s);
                            s.forEach(function(r) {
                                t[r] = n(t, i, r, h, f)
                            })
                        }
                        i.trigger.call(t, r, e);
                        tt(i, o)
                    })),
                    tt(i, o),
                    h === i ? t : h)
                }
            }(n, t, f, u, r) : "_events" === f ? n._events = {} : Object.defineProperty(n, f, {
                enumerable: !0,
                get: function() {
                    return i[f]
                }
            })
        })
    }
    function rr(n, t, i) {
        var r = n.getConfig()[i];
        return t[i] = r,
        r
    }
    function gt(n) {
        console.warn("The API method jwplayer().".concat(n, "() is disabled in the free edition of JW Player."))
    }
    function ur(n, t) {
        var i = {
            reason: Object(nr.a)() ? "interaction" : "external"
        };
        switch (n) {
        case "play":
        case "pause":
        case "playToggle":
        case "playlistNext":
        case "playlistPrev":
        case "next":
            t[0] = i;
            break;
        case "seek":
        case "playlistItem":
            t[1] = i
        }
    }
    function fr(n, t, i) {
        try {
            var r = function(n, t) {
                switch (n) {
                case "setup":
                    return !!t;
                case "getSafeRegion":
                case "pauseAd":
                case "setControls":
                case "setFullscreen":
                case "setMute":
                    return !!t === t ? t : void 0;
                case "setPlaylistItem":
                case "getPlaylistItem":
                    return (0 | t) === t ? t : void 0;
                case "setPlaybackRate":
                case "setVolume":
                    return Number(t);
                case "setConfig":
                    return Object.keys(Object(t)).join(",");
                case "on":
                case "once":
                case "off":
                case "trigger":
                case "getPlugin":
                case "addPlugin":
                case "registerPlugin":
                    return "" + t
                }
                return null
            }(t, i);
            n.trackExternalAPIUsage(t, r)
        } catch (n) {
            a.a.debug && console.warn(n)
        }
    }
    function tt(n, t) {
        if (t.length) {
            var i = n.getPlugin("jwpsrv");
            i && i.trackExternalAPIUsage && (t.forEach(function(n) {
                fr(i, n[0], n[1])
            }),
            t.length = 0)
        }
    }
    var u, rt, et, nt, c, y, it;
    i.r(t);
    u = i(0);
    rt = setTimeout;
    r.prototype.catch = function(n) {
        return this.then(null, n)
    }
    ;
    r.prototype.then = function(n, t) {
        var i = new this.constructor(ni);
        return ut(this, new ti(n,t,i)),
        i
    }
    ;
    r.prototype.finally = function(n) {
        var t = this.constructor;
        return this.then(function(i) {
            return t.resolve(n()).then(function() {
                return i
            })
        }, function(i) {
            return t.resolve(n()).then(function() {
                return t.reject(i)
            })
        })
    }
    ;
    r.all = function(n) {
        return new r(function(t, i) {
            function e(n, u) {
                try {
                    if (u && ("object" == typeof u || "function" == typeof u)) {
                        var o = u.then;
                        if ("function" == typeof o)
                            return void o.call(u, function(t) {
                                e(n, t)
                            }, i)
                    }
                    r[n] = u;
                    0 == --f && t(r)
                } catch (n) {
                    i(n)
                }
            }
            var r, f, u;
            if (!n || void 0 === n.length)
                throw new TypeError("Promise.all accepts an array");
            if (r = Array.prototype.slice.call(n),
            0 === r.length)
                return t([]);
            for (f = r.length,
            u = 0; u < r.length; u++)
                e(u, r[u])
        }
        )
    }
    ;
    r.resolve = function(n) {
        return n && "object" == typeof n && n.constructor === r ? n : new r(function(t) {
            t(n)
        }
        )
    }
    ;
    r.reject = function(n) {
        return new r(function(t, i) {
            i(n)
        }
        )
    }
    ;
    r.race = function(n) {
        return new r(function(t, i) {
            for (var r = 0, u = n.length; r < u; r++)
                n[r].then(t, i)
        }
        )
    }
    ;
    r._immediateFn = "function" == typeof setImmediate && function(n) {
        setImmediate(n)
    }
    || function(n) {
        rt(n, 0)
    }
    ;
    r._unhandledRejectionFn = function(n) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", n)
    }
    ;
    et = r;
    window.Promise || (window.Promise = et);
    var ot = i(20)
      , e = i(15)
      , ii = i(17)
      , ri = i(13)
      , st = {
        availableProviders: ii.a,
        registerProvider: ri.a
    }
      , b = i(25);
    st.registerPlugin = function(n, t, i) {
        "jwpsrv" !== n && Object(b.b)(n, t, i)
    }
    ;
    var ui = st
      , ht = i(31)
      , a = i(16)
      , fi = i(5)
      , ei = i(64)
      , k = i(3)
      , ct = i(32)
      , s = i(9)
      , oi = i(8)
      , si = i(12)
      , o = i(2);
    var at = i(7)
      , f = i(6)
      , v = i(11)
      , hi = i(28)
      , ci = i(52)
      , li = i(47)
      , ai = i(53)
      , d = Object(u.k)({}, si, oi, ot, {
        addClass: f.a,
        hasClass: f.i,
        removeClass: f.o,
        replaceClass: f.p,
        toggleClass: f.v,
        classList: f.d,
        styleDimension: f.u,
        createElement: f.e,
        emptyElement: f.h,
        addStyleSheet: f.b,
        bounds: f.c,
        openLink: f.l,
        replaceInnerHtml: f.q,
        css: v.b,
        clearCss: v.a,
        style: v.d,
        transform: v.e,
        getRgba: v.c,
        ajax: hi.a,
        crossdomain: function(n) {
            var i = document.createElement("a")
              , t = document.createElement("a");
            i.href = location.href;
            try {
                return t.href = n,
                t.href = t.href,
                i.protocol + "//" + i.host != t.protocol + "//" + t.host
            } catch (n) {}
            return !0
        },
        tryCatch: function(n, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
            if (a.a.debug)
                return n.apply(t || this, i);
            try {
                return n.apply(t || this, i)
            } catch (t) {
                return new lt(n.name,t)
            }
        },
        Error: lt,
        Timer: ct.a,
        log: li.a,
        genId: ai.b,
        between: ci.a,
        foreach: function(n, t) {
            for (var i in n)
                Object.prototype.hasOwnProperty.call(n, i) && t(i, n[i])
        },
        flashVersion: at.a,
        isIframe: at.m,
        indexOf: u.q,
        trim: o.i,
        pad: o.e,
        extension: o.a,
        hms: o.b,
        seconds: o.g,
        prefix: o.f,
        suffix: o.h,
        noop: function() {}
    })
      , vi = 0;
    Object(u.k)(g.prototype, {
        on: function(n, t, i) {
            return s.c.call(this, n, t, i)
        },
        once: function(n, t, i) {
            return s.d.call(this, n, t, i)
        },
        off: function(n, t, i) {
            return s.b.call(this, n, t, i)
        },
        trigger: function(n, t) {
            return (t = u.g.isObject(t) ? Object(u.k)({}, t) : {}).type = n,
            a.a.debug ? s.e.call(this, n, t) : s.f.call(this, n, t)
        },
        getPlugin: function(n) {
            return this.plugins[n]
        },
        addPlugin: function(n, t) {
            this.plugins[n] = t;
            this.on("ready", t.addToPlayer);
            t.resize && this.on("resize", t.resizeHandler)
        },
        registerPlugin: function(n, t, i) {
            Object(b.b)(n, t, i)
        },
        getAdBlock: function() {
            return !1
        },
        playAd: function() {},
        pauseAd: function() {},
        skipAd: function() {}
    });
    i.p = Object(ot.loadFrom)();
    nt = function(n) {
        var t, i, r;
        return (n ? "string" == typeof n ? (t = pt(n)) || (i = document.getElementById(n)) : "number" == typeof n ? t = e.a[n] : n.nodeType && (t = pt((i = n).id || i.getAttribute("data-jwplayer-id"))) : t = e.a[0],
        t) ? t : i ? (r = new g(i),
        e.a.push(r),
        r) : {
            registerPlugin: b.b
        }
    }
    ;
    wt(nt);
    var bt = nt
      , yi = i(35)
      , pi = i(26)
      , wi = i(24)
      , bi = i(48)
      , ki = i(46)
      , di = i(39)
      , gi = u.g.extend
      , h = {};
    h._ = u.g;
    h.utils = Object(u.k)(d, {
        key: pi.b,
        extend: gi,
        scriptloader: wi.a,
        rssparser: {
            parse: ki.a
        },
        tea: bi.a,
        UI: yi.a
    });
    h.utils.css.style = h.utils.style;
    h.vid = di.a;
    var kt = h
      , nr = i(63)
      , tr = /^(?:on(?:ce)?|off|trigger)$/;
    c = window;
    Object(u.k)(bt, kt);
    y = function(n) {
        var t = bt(n);
        return t.uniqueId ? t._publicApi || (t._publicApi = new ir(t)) : t
    }
    ;
    Object(u.k)(y, kt);
    wt(y);
    "function" == typeof c.define && c.define.amd && c.define([], function() {
        return y
    });
    it = y;
    c.jwplayer && (it = c.jwplayer);
    t.default = it
}
]).default;
jwplayer.defaults = {
    aspectratio: "16:9",
    autostart: !1,
    cast: {
        appid: "00000000"
    },
    controls: !0,
    displaydescription: !0,
    displaytitle: !0,
    flashplayer: "//ssl.p.jwpcdn.com/player/v/8.11.4/jwplayer.flash.swf",
    height: 360,
    key: "w0Q0E1E87qhouoXhCgP7zB8l76rMGXztxekEtJzXLNE=",
    mute: !1,
    ph: 1,
    pid: "fYphLrZZ",
    playbackRateControls: !1,
    preload: "metadata",
    repeat: !1,
    stagevideo: !1,
    stretching: "uniform",
    width: "100%"
};
window.registerLoading && registerLoading("video"),
function(n) {
    typeof rrequire == "function" ? rrequire(["jquery", "jwplayer", "static", "uri"], n) : n(jQuery)
}(function(n) {
    var i = function(t, i) {
        var r;
        if (t)
            if (t.jquery)
                r = t;
            else if (t.getContainer)
                r = n(t.getContainer());
            else if (t.nodeName)
                r = n(t);
            else
                return null;
        else
            return null;
        r.trigger(i, t.sa || {})
    }
      , t = function(n, r) {
        var e, u, o, f;
        this.sa || (this.sa = {});
        switch (n) {
        case "play":
            if (this.sa.seeking)
                return;
            try {
                e = this.getPlaylistItem()
            } catch (s) {
                return
            }
            if (u = e && e.file,
            !u)
                return;
            o = this.autoplay || this.config && this.config.autostart ? 1 : 0;
            this.sa.file && this.sa.file !== u && (this.sa = {});
            this.sa.playing || (this.sa.playing = !0,
            (m = /^https?:\/\/([^\//]+)(\/.+)/i.exec(u)) && (m[1] || "").toLowerCase() === window.location.host && (u = m[2]),
            this.sa.time = this.currentTime,
            this.sa.dur = Math.round(this.duration),
            window._sa_videoStart && (this.sa.vvid ? window._sa_videoStart(this.id, this.sa.vvid, u, Math.round(this.sa.time || 0), this.sa.dur || 0, o) : (window._sa_videoStart(this.id, 0, u, Math.round(this.sa.time || 0), this.sa.dur || 0, o),
            this.sa.file = u,
            this.sa.time = 0,
            i(this, "videoplay"))));
            break;
        case "time":
            f = r && r.position;
            !this.sa.seeking && f && f - (this.sa.time || -6) > 5 && this.sa.vvid && this.sa.vpid && window._sa_videoPlay && (this.sa.dur || (this.sa.dur = Math.round(r.duration)),
            window._sa_videoPlay(this.sa.vvid, this.sa.vpid, Math.round(f), this.sa.dur),
            this.sa.time = f);
            return;
        case "seek":
            r && (this.sa.playing = !1,
            this.sa.time = Math.max(0, r.offset),
            this.sa.vpid = 0,
            t.apply(this, ["play"]));
            return;
        case "complete":
            this.sa.seeking = !1;
            this.sa.playing = !1;
            this.sa.vvid && this.sa.vpid && this.sa.dur && window._sa_videoPlay && window._sa_videoPlay(this.sa.vvid, this.sa.vpid, this.sa.dur, this.sa.dur);
            i(this, "videocomplete")
        }
    }
      , r = function() {
        var e, r, o, f, s, i = n(this), c = i.attr("id"), l = i.attr("class") || "", a = i.attr("style"), v = i.attr("data-src") || i.attr("poster"), y = i.data("file") || i.find("source").attr("src") || i.attr("src"), p = i.attr("autostart") ? !0 : !1, w = i.attr("preload"), u = i.data("skin"), b = i.data("ratio") || "16:9", h = Compute.UUID();
        e = n("<div><div><\/div><\/div>").attr("id", c).attr("class", l + " cms-jwplayer").attr("style", a).insertAfter(i).children("div").attr("id", h).end();
        i.remove();
        r = {
            file: y,
            image: v,
            width: "100%",
            height: "auto",
            aspectratio: b,
            autostart: p,
            primary: "html5",
            preload: w || "none"
        };
        i.find("track").each(function() {
            var n = {
                file: this.getAttribute("src"),
                label: this.getAttribute("label") || "English",
                kind: this.getAttribute("kind") || "captions",
                srclang: this.getAttribute("srclang") || "en",
                "default": this.getAttribute("data-default") ? !0 : !1
            };
            n.file && (r.tracks || (r.tracks = []),
            r.tracks.push(n))
        });
        u && jwplayer.version && jwplayer.version[0] > 6 && ((o = /.+\/([\w\-]+)\.css/i.test(u)) ? (f = u,
        u = o[1]) : f = "/common/js/v/skins/" + u + ".css",
        r.skin = {
            name: u,
            url: f
        });
        s = jwplayer(h).setup(r).on("play", function(n) {
            t.apply(this, ["play", n])
        }).on("time", function(n) {
            t.apply(this, ["time", n])
        }).on("seek", function(n) {
            t.apply(this, ["seek", n])
        }).on("complete", function(n) {
            t.apply(this, ["complete", n])
        });
        e.data("player", s)
    }
      , u = function() {
        this.addEventListener && (this.getPlaylistItem = function() {
            return {
                file: this.currentSrc
            }
        }
        ,
        this.getAttribute("id") || this.setAttribute("id", Compute.UUID()),
        this.addEventListener("play", function(n) {
            t.apply(this, ["play", n])
        }, !1),
        this.addEventListener("timeupdate", function() {
            t.apply(this, ["time", {
                position: this.currentTime,
                duration: this.duration
            }])
        }, !1),
        this.addEventListener("seeking", function() {
            this.sa || (this.sa = {});
            this.sa.seeking = !0;
            t.apply(this, ["seek", {
                offset: this.currentTime
            }])
        }, !1),
        this.addEventListener("seeked", function() {
            this.sa || (this.sa = {});
            this.sa.seeking = !1;
            t.apply(this, ["seek", {
                offset: this.currentTime
            }])
        }, !1),
        this.addEventListener("ended", function() {
            t.apply(this, ["complete"])
        }, !1))
    };
    window.jwplayer && !window.jwplayer.key && (window.jwplayer.key = "iYcq/ws9x+Vw4YV9op3tImGaYpHq/rVVAkAugvjlb4bQzKFWm+Zgg+5v59A=");
    n.fn.jwvideo = function() {
        return this.each(function() {
            var t = n(this);
            if (t.data("replace") === !1) {
                if (t.data("notrack") || this.loop && this.autoplay)
                    return;
                u.call(this)
            } else
                r.call(this)
        })
    }
    ;
    n(document).ready(function() {
        document.documentElement.classList.contains("cms-content") || n("video").jwvideo()
    });
    window.register && window.register("video")
});
rrequire(["extensions"], function() {
    function h() {
        var n = document.querySelectorAll("[data-showhide]")
          , i = 0
          , r = n && n.length;
        r > 0 && rrequire("/common/js/m/show-hide.js", function() {
            while (i < r)
                t = n[i++],
                $(t).showHide()
        })
    }
    function o() {
        for (var n, r = [], i = document.querySelectorAll("img[data-src],img[data-bg],video[data-src],source[data-src]"), t = 0; t < i.length; t++)
            if (n = i[t],
            !n.closest("[\\*let],[\\*for],[\\*edit]")) {
                if (n.parentNode.nodeName.toLowerCase() === "picture")
                    if (n = n.parentNode,
                    r.indexOf(n) >= 0)
                        continue;
                    else
                        r.push(n);
                $(n).onvisible(w, -.5)
            }
        window.USE && window.USE.Replace()
    }
    function w() {
        var n, i, t = this.getAttribute("data-src"), u = this.getAttribute("data-bg"), f = (this.nodeName || "").toLowerCase(), r;
        switch (f) {
        case "img":
            u ? this.style.backgroundImage = "url('" + u + "')" : t && (this.setAttribute("src", t),
            n = this);
            this.removeAttribute("data-src");
            this.removeAttribute("data-bg");
            break;
        case "video":
            t && this.setAttribute("poster", t);
            this.removeAttribute("data-src");
            break;
        case "picture":
            for (r = 0; r < this.children.length; r++)
                i = this.children[r],
                t = i.getAttribute("data-src"),
                i.removeAttribute("data-src"),
                (i.nodeName || "").toLowerCase() == "img" ? (n = i,
                t && (p ? n.setAttribute("src", t) : (n.style.backgroundImage = "url('" + t + "')",
                n = null))) : t && i.setAttribute("srcset", t)
        }
        if (n) {
            if (n.$loading)
                return
        } else
            n = document.createElement("img"),
            n.style.position = "absolute",
            n.style.opacity = 0,
            n.style.pointerEvents = "none",
            n.style.left = "-100%",
            n.style.top = "-100%",
            n.$placeholder = !0,
            document.body.appendChild(n),
            n.setAttribute("src", u || t || y);
        n.$loading = this;
        n.complete ? s.call(n) : (this.classList.add("loading"),
        n.addEventListener("load", s))
    }
    function s() {
        var n = this.$loading;
        n ? (delete this.$loading,
        n.classList.remove("loading")) : this.classList.remove("loading");
        this.removeEventListener("load", s);
        this.$placeholder && (delete this.$placeholder,
        this.parentNode && this.parentNode.removeChild(this))
    }
    function l(n) {
        var t, i, r, u, f, e;
        n && n.getAttribute && (t = n.getAttribute("datetime"),
        i = n.getAttribute("data-localize"),
        r = +n.getAttribute("data-now"),
        t && i && t.indexOf("{") < 0 && (u = r ? new Date : Date.parse2 && Date.parse2(t),
        f = u && u.formatted && u.formatted(i),
        f && (n.textContent = f,
        r ? (e = function() {
            document.body.contains(this) && l(this)
        }
        .bind(n),
        setTimeout(e, r * 1e3)) : (n.removeAttribute("data-localize"),
        n.setAttribute("data-localized", i)))))
    }
    function a() {
        document.querySelectorAll("time[data-localize]").forEach(l)
    }
    var v = document.documentElement.getAttribute("data-anim") !== "0", y = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", p = "objectFit"in document.body.style, n, i, r, t, u, f, c, e;
    if (document && document.querySelectorAll && v) {
        for (n = document.querySelectorAll("[data-onvisible]"),
        i = 0,
        r = n && n.length; i < r; )
            if (t = n[i++],
            u = t.getAttribute("data-onvisible"),
            u)
                $(t).onvisible(u, .33);
        for (n = document.querySelectorAll("[data-canvasbg]"),
        i = 0,
        r = n && n.length; i < r; )
            t = n[i++],
            f = t.getAttribute("data-canvasbg"),
            f && (c = function() {
                $(this).canvasbg()
            }
            .bind(t),
            rrequire(["/includes/js/canvasbg-" + f.toLowerCase() + ".js", "a/canvasbg"], c));
        n = Array.from(document.querySelectorAll("[data-parallax]"));
        n && n.length > 0 && rrequire("/common/js/m/parallax.js");
        n = Array.from(document.querySelectorAll("[data-accessibility-menu]"));
        n && n.length > 0 && rrequire("/common/js/m/accessibility-menu.js");
        h();
        $(document).on("ajaxifyrender", h);
        e = document.querySelectorAll(".raw-html-embed .el-tab-box");
        e.length > 0 && e.forEach(n=>{
            rrequire("m/tabbable", ()=>{
                n.classList.add("no-transition"),
                $(n).tabbable()
            }
            )
        }
        )
    }
    o();
    $(document).on("ajaxifyrender", o).on("ajaxifyrender", a);
    setTimeout(o, 1e3);
    setTimeout(a, 1e3);
    window.register("a/bootstrap")
});
(function(n) {
    function u(n) {
        for (var t = n; t && t.parentNode; ) {
            if (t.nodeName === "svg" || t.nodeName === "SVG")
                return t;
            t = t.parentNode
        }
        return null
    }
    function f(n) {
        n.readyState === 4 ? i.call(n) : n.onreadystatechange || (n.onreadystatechange = function() {
            n.readyState === 4 && i.call(n)
        }
        ,
        n.onreadystatechange())
    }
    function i() {
        var n, t = this._document, i;
        for (t || (this._document = t = document.implementation.createHTMLDocument(""),
        t.body.innerHTML = this.responseText,
        this._target = {}); n = this._embeds.pop(); )
            i = this._target[n.id],
            i || (this._target[n.id] = i = t.getElementById(n.id)),
            r(n.use, n.parent, n.svg, i)
    }
    function r(n, t, i, r) {
        var u, f, e;
        if (r && n.parentNode === t) {
            for (t.removeChild(n),
            u = document.createDocumentFragment(),
            f = !i.hasAttribute("viewBox") && r.getAttribute("viewBox"),
            f && i.setAttribute("viewBox", f),
            e = r.cloneNode(!0); e.childNodes.length; )
                u.appendChild(e.firstChild);
            t.appendChild(u)
        }
    }
    var t = {};
    n.USE = {
        Replace: function(n) {
            var y, s, i, a, h, v, p, c, l, w, o, e;
            if (n && n.getElementsByTagName || (n = document),
            n.nodeName === "USE" || n.nodeName === "use")
                s = [n];
            else
                for (y = n.getElementsByTagName("use"),
                s = new Array(y.length),
                e = 0; e < s.length; e++)
                    s[e] = y[e];
            for (e = 0; e < s.length; e++) {
                if (i = s[e],
                i._replacing)
                    continue;
                else
                    i._replacing = 1;
                (a = i.parentNode,
                h = u(a),
                v = h && (i.getAttribute("data-href") || i.getAttribute("xlink:href") || i.getAttribute("href")),
                v) && (p = v.split("#"),
                c = p[0],
                l = p[1],
                !l && (w = /icon_(\w+)\./.exec(c)) && (l = w[1]),
                c ? (o = t[c],
                o || (t[c] = o = new XMLHttpRequest,
                o.open("GET", c),
                o.send(),
                o._embeds = []),
                h.attributes["data-use"] || h.setAttribute("data-use", v),
                o._embeds.push({
                    use: i,
                    parent: a,
                    svg: h,
                    id: l
                }),
                f(o)) : r(i, a, h, document.getElementById(l)))
            }
            window.USC && window.USC.initVideos && window.USC.initVideos()
        }
    };
    (n.requestAnimationFrame || n.setTimeout)(USE.Replace, 0);
    window.register && window.register("svg")
}
)(window);
