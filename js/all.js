!
function(e) {
	"use strict";
	var t = function(t, n, i) {
			function o(e) {
				return a.body ? e() : void setTimeout(function() {
					o(e)
				})
			}
			function r() {
				l.addEventListener && l.removeEventListener("load", r), l.media = i || "all"
			}
			var s, a = e.document,
				l = a.createElement("link");
			if (n) s = n;
			else {
				var c = (a.body || a.getElementsByTagName("head")[0]).childNodes;
				s = c[c.length - 1]
			}
			var d = a.styleSheets;
			l.rel = "stylesheet", l.href = t, l.media = "only x", o(function() {
				s.parentNode.insertBefore(l, n ? s : s.nextSibling)
			});
			var u = function(e) {
					for (var t = l.href, n = d.length; n--;) if (d[n].href === t) return e();
					setTimeout(function() {
						u(e)
					})
				};
			return l.addEventListener && l.addEventListener("load", r), l.onloadcssdefined = u, u(r), l
		};
	"undefined" != typeof exports ? exports.loadCSS = t : e.loadCSS = t
}("undefined" != typeof global ? global : this), function(e) {
	if (e.loadCSS) {
		var t = loadCSS.relpreload = {};
		if (t.support = function() {
			try {
				return e.document.createElement("link").relList.supports("preload")
			} catch (t) {
				return !1
			}
		}, t.poly = function() {
			for (var t = e.document.getElementsByTagName("link"), n = 0; n < t.length; n++) {
				var i = t[n];
				"preload" === i.rel && "style" === i.getAttribute("as") && (e.loadCSS(i.href, i), i.rel = null)
			}
		}, !t.support()) {
			t.poly();
			var n = e.setInterval(t.poly, 300);
			e.addEventListener && e.addEventListener("load", function() {
				t.poly(), e.clearInterval(n)
			}), e.attachEvent && e.attachEvent("onload", function() {
				e.clearInterval(n)
			})
		}
	}
}(this), function(e) {
	function t(e) {
		return e.replace(P, K).replace(q, function(e, t, o) {
			for (var r = o.split(","), s = 0, a = r.length; s < a; s++) {
				var l = d(r[s]) + Y,
					c = [];
				r[s] = l.replace(I, function(e, t, o, r, s) {
					if (t) return c.length > 0 && (A.push({
						selector: l.substring(0, s),
						patches: c
					}), c = []), t;
					var a = o ? i(o) : n(r);
					return a ? (c.push(a), "." + a.className) : e
				})
			}
			return t + r.join(",")
		})
	}
	function n(e) {
		return !R || R.test(e) ? {
			className: s(e),
			applyClass: !0
		} : null
	}
	function i(t) {
		var n, i, o = !0,
			r = s(t.slice(1)),
			a = ":not(" == t.substring(0, 5);
		a && (t = t.slice(5, -1));
		var l = t.indexOf("(");
		if (l > -1 && (t = t.substring(0, l)), ":" == t.charAt(0)) switch (t.slice(1)) {
		case "root":
			o = function(e) {
				return a ? e != C : e == C
			};
			break;
		case "target":
			if (8 == S) {
				o = function(t) {
					var n = function() {
							var e = location.hash,
								n = e.slice(1);
							return a ? e == G || t.id != n : e != G && t.id == n
						};
					return h(e, "hashchange", function() {
						u(t, r, n())
					}), n()
				};
				break
			}
			return !1;
		case "checked":
			o = function(e) {
				return B.test(e.type) && h(e, "propertychange", function() {
					"checked" == event.propertyName && u(e, r, e.checked !== a)
				}), e.checked !== a
			};
			break;
		case "disabled":
			a = !a;
		case "enabled":
			o = function(e) {
				return W.test(e.tagName) ? (h(e, "propertychange", function() {
					"$disabled" == event.propertyName && u(e, r, e.$disabled === a)
				}), $.push(e), e.$disabled = e.disabled, e.disabled === a) : ":enabled" == t ? a : !a
			};
			break;
		case "focus":
			n = "focus", i = "blur";
		case "hover":
			n || (n = "mouseenter", i = "mouseleave"), o = function(e) {
				return h(e, a ? i : n, function() {
					u(e, r, !0)
				}), h(e, a ? n : i, function() {
					u(e, r, !1)
				}), a
			};
			break;
		default:
			if (!O.test(t)) return !1
		}
		return {
			className: r,
			applyClass: o
		}
	}
	function o() {
		for (var e, t, n, i, o = 0; o < A.length; o++) {
			t = A[o].selector, n = A[o].patches, i = t.replace(F, G), i != G && i.charAt(i.length - 1) != Y || (i += "*");
			try {
				e = _(i)
			} catch (s) {
				a("Selector '" + t + "' threw exception '" + s + "'")
			}
			if (e) for (var l = 0, c = e.length; l < c; l++) {
				for (var d = e[l], u = d.className, h = 0, f = n.length; h < f; h++) {
					var v = n[h];
					r(d, v) || !v.applyClass || v.applyClass !== !0 && v.applyClass(d) !== !0 || (u = p(u, v.className, !0))
				}
				d.className = u
			}
		}
	}
	function r(e, t) {
		return new RegExp("(^|\\s)" + t.className + "(\\s|$)").test(e.className)
	}
	function s(e) {
		return D + "-" + (6 == S && j ? N++ : e.replace(z, function(e) {
			return e.charCodeAt(0)
		}))
	}
	function a(t) {
		e.console && e.console.log(t)
	}
	function l(e) {
		return e.replace(V, K)
	}
	function c(e) {
		return l(e).replace(Q, Y)
	}
	function d(e) {
		return c(e.replace(U, K).replace(X, K))
	}
	function u(e, t, n) {
		var i = e.className,
			o = p(i, t, n);
		o != i && (e.className = o, e.parentNode.className += G)
	}
	function p(e, t, n) {
		var i = RegExp("(^|\\s)" + t + "(\\s|$)"),
			o = i.test(e);
		return n ? o ? e : e + Y + t : o ? l(e.replace(i, K)) : e
	}
	function h(e, t, n) {
		e.attachEvent("on" + t, n)
	}
	function f() {
		if (e.XMLHttpRequest) return new XMLHttpRequest;
		try {
			return new ActiveXObject("Microsoft.XMLHTTP")
		} catch (t) {
			return null
		}
	}
	function v(e) {
		return k.open("GET", e, !1), k.send(), 200 == k.status ? k.responseText : G
	}
	function m(e, t, n) {
		function i(e) {
			return e.substring(0, e.indexOf("//"))
		}
		function o(e) {
			return e.substring(0, e.indexOf("/", 8))
		}
		if (t || (t = Z), "//" == e.substring(0, 2) && (e = i(t) + e), /^https?:\/\//i.test(e)) return n || o(t) == o(e) ? e : null;
		if ("/" == e.charAt(0)) return o(t) + e;
		var r = t.split(/[?#]/)[0];
		return "?" != e.charAt(0) && "/" != r.charAt(r.length - 1) && (r = r.substring(0, r.lastIndexOf("/") + 1)), r + e
	}
	function g(e) {
		return e ? v(e).replace(H, G).replace(L, function(t, n, i, o, r, s) {
			var a = g(m(i || r, e));
			return s ? "@media " + s + " {" + a + "}" : a
		}).replace(M, function(t, n, i, o) {
			return i = i || G, n ? t : " url(" + i + m(o, e, !0) + i + ") "
		}) : G
	}
	function y() {
		for (var e, n, i = 0; i < T.styleSheets.length; i++) n = T.styleSheets[i], n.href != G && (e = m(n.href), e && (n.cssText = n.rawCssText = t(g(e))))
	}
	function b() {
		o(), $.length > 0 && setInterval(function() {
			for (var e = 0, t = $.length; e < t; e++) {
				var n = $[e];
				n.disabled !== n.$disabled && (n.disabled ? (n.disabled = !1, n.$disabled = !0, n.disabled = !0) : n.$disabled = n.disabled)
			}
		}, 250)
	}
	function w(e, t) {
		var n = !1,
			i = !0,
			o = function(i) {
				"readystatechange" == i.type && "complete" != T.readyState || (("load" == i.type ? e : T).detachEvent("on" + i.type, o, !1), !n && (n = !0) && t.call(e, i.type || i))
			},
			r = function() {
				try {
					C.doScroll("left")
				} catch (e) {
					return void setTimeout(r, 50)
				}
				o("poll")
			};
		if ("complete" == T.readyState) t.call(e, G);
		else {
			if (T.createEventObject && C.doScroll) {
				try {
					i = !e.frameElement
				} catch (s) {}
				i && r()
			}
			h(T, "readystatechange", o), h(e, "load", o)
		}
	}
	var x = navigator.userAgent.match(/MSIE (\d+)/);
	if (!x) return !1;
	var T = document,
		C = T.documentElement,
		k = f(),
		S = x[1];
	if (!("CSS1Compat" != T.compatMode || S < 6 || S > 8) && k) {
		var _, E = {
			NW: "*.Dom.select",
			MooTools: "$$",
			DOMAssistant: "*.$",
			Prototype: "$$",
			YAHOO: "*.util.Selector.query",
			Sizzle: "*",
			jQuery: "*",
			dojo: "*.query"
		},
			$ = [],
			A = [],
			N = 0,
			j = !0,
			D = "slvzr",
			H = /(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*?/g,
			L = /@import\s*(?:(?:(?:url\(\s*(['"]?)(.*)\1)\s*\))|(?:(['"])(.*)\3))\s*([^;]*);/g,
			M = /(behavior\s*?:\s*)?\burl\(\s*(["']?)(?!data:)([^"')]+)\2\s*\)/g,
			O = /^:(empty|(first|last|only|nth(-last)?)-(child|of-type))$/,
			P = /:(:first-(?:line|letter))/g,
			q = /((?:^|(?:\s*})+)(?:\s*@media[^{]+{)?)\s*([^\{]*?[\[:][^{]+)/g,
			I = /([ +~>])|(:[a-z-]+(?:\(.*?\)+)?)|(\[.*?\])/g,
			F = /(:not\()?:(hover|enabled|disabled|focus|checked|target|active|visited|first-line|first-letter)\)?/g,
			z = /[^\w-]/g,
			W = /^(INPUT|SELECT|TEXTAREA|BUTTON)$/,
			B = /^(checkbox|radio)$/,
			R = S > 6 ? /[\$\^*]=(['"])\1/ : null,
			U = /([(\[+~])\s+/g,
			X = /\s+([)\]+~])/g,
			Q = /\s+/g,
			V = /^\s*((?:[\S\s]*\S)?)\s*$/,
			G = "",
			Y = " ",
			K = "$1",
			J = T.getElementsByTagName("BASE"),
			Z = J.length > 0 ? J[0].href : T.location.href;
		y(), w(e, function() {
			for (var t in E) {
				var n, i, o = e;
				if (e[t]) {
					for (n = E[t].replace("*", t).split(".");
					(i = n.shift()) && (o = o[i]););
					if ("function" == typeof o) return _ = o, void b()
				}
			}
		})
	}
}(this), window.matchMedia || (window.matchMedia = function() {
	"use strict";
	var e = window.styleMedia || window.media;
	if (!e) {
		var t = document.createElement("style"),
			n = document.getElementsByTagName("script")[0],
			i = null;
		t.type = "text/css", t.id = "matchmediajs-test", n.parentNode.insertBefore(t, n), i = "getComputedStyle" in window && window.getComputedStyle(t, null) || t.currentStyle, e = {
			matchMedium: function(e) {
				var n = "@media " + e + "{ #matchmediajs-test { width: 1px; } }";
				return t.styleSheet ? t.styleSheet.cssText = n : t.textContent = n, "1px" === i.width
			}
		}
	}
	return function(t) {
		return {
			matches: e.matchMedium(t || "all"),
			media: t || "all"
		}
	}
}()), function() {
	if (window.matchMedia && window.matchMedia("all").addListener) return !1;
	var e = window.matchMedia,
		t = e("only all").matches,
		n = !1,
		i = 0,
		o = [],
		r = function(t) {
			clearTimeout(i), i = setTimeout(function() {
				for (var t = 0, n = o.length; t < n; t++) {
					var i = o[t].mql,
						r = o[t].listeners || [],
						s = e(i.media).matches;
					if (s !== i.matches) {
						i.matches = s;
						for (var a = 0, l = r.length; a < l; a++) r[a].call(window, i)
					}
				}
			}, 30)
		};
	window.matchMedia = function(i) {
		var s = e(i),
			a = [],
			l = 0;
		return s.addListener = function(e) {
			t && (n || (n = !0, window.addEventListener("resize", r, !0)), 0 === l && (l = o.push({
				mql: s,
				listeners: a
			})), a.push(e))
		}, s.removeListener = function(e) {
			for (var t = 0, n = a.length; t < n; t++) a[t] === e && a.splice(t, 1)
		}, s
	}
}(), window.Modernizr = function(e, t, n) {
	function i(e) {
		y.cssText = e
	}
	function o(e, t) {
		return typeof e === t
	}
	function r(e, t) {
		return !!~ ("" + e).indexOf(t)
	}
	function s(e, t) {
		for (var i in e) {
			var o = e[i];
			if (!r(o, "-") && y[o] !== n) return "pfx" != t || o
		}
		return !1
	}
	function a(e, t, i) {
		for (var r in e) {
			var s = t[e[r]];
			if (s !== n) return i === !1 ? e[r] : o(s, "function") ? s.bind(i || t) : s
		}
		return !1
	}
	function l(e, t, n) {
		var i = e.charAt(0).toUpperCase() + e.slice(1),
			r = (e + " " + x.join(i + " ") + i).split(" ");
		return o(t, "string") || o(t, "undefined") ? s(r, t) : (r = (e + " " + T.join(i + " ") + i).split(" "), a(r, t, n))
	}
	var c, d, u, p = "2.8.3",
		h = {},
		f = !0,
		v = t.documentElement,
		m = "modernizr",
		g = t.createElement(m),
		y = g.style,
		b = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
		w = "Webkit Moz O ms",
		x = w.split(" "),
		T = w.toLowerCase().split(" "),
		C = {
			svg: "http://www.w3.org/2000/svg"
		},
		k = {},
		S = [],
		_ = S.slice,
		E = function(e, n, i, o) {
			var r, s, a, l, c = t.createElement("div"),
				d = t.body,
				u = d || t.createElement("body");
			if (parseInt(i, 10)) for (; i--;) a = t.createElement("div"), a.id = o ? o[i] : m + (i + 1), c.appendChild(a);
			return r = ["&#173;", '<style id="s', m, '">', e, "</style>"].join(""), c.id = m, (d ? c : u).innerHTML += r, u.appendChild(c), d || (u.style.background = "", u.style.overflow = "hidden", l = v.style.overflow, v.style.overflow = "hidden", v.appendChild(u)), s = n(c, e), d ? c.parentNode.removeChild(c) : (u.parentNode.removeChild(u), v.style.overflow = l), !! s
		},
		$ = function(t) {
			var n = e.matchMedia || e.msMatchMedia;
			if (n) return n(t) && n(t).matches || !1;
			var i;
			return E("@media " + t + " { #" + m + " { position: absolute; } }", function(t) {
				i = "absolute" == (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).position
			}), i
		},
		A = {}.hasOwnProperty;
	u = o(A, "undefined") || o(A.call, "undefined") ?
	function(e, t) {
		return t in e && o(e.constructor.prototype[t], "undefined")
	} : function(e, t) {
		return A.call(e, t)
	}, Function.prototype.bind || (Function.prototype.bind = function(e) {
		var t = this;
		if ("function" != typeof t) throw new TypeError;
		var n = _.call(arguments, 1),
			i = function() {
				if (this instanceof i) {
					var o = function() {};
					o.prototype = t.prototype;
					var r = new o,
						s = t.apply(r, n.concat(_.call(arguments)));
					return Object(s) === s ? s : r
				}
				return t.apply(e, n.concat(_.call(arguments)))
			};
		return i
	}), k.flexbox = function() {
		return l("flexWrap")
	}, k.touch = function() {
		var n;
		return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : E(["@media (", b.join("touch-enabled),("), m, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(e) {
			n = 9 === e.offsetTop
		}), n
	}, k.borderradius = function() {
		return l("borderRadius")
	}, k.cssgradients = function() {
		var e = "background-image:",
			t = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
			n = "linear-gradient(left top,#9f9, white);";
		return i((e + "-webkit- ".split(" ").join(t + e) + b.join(n + e)).slice(0, -e.length)), r(y.backgroundImage, "gradient")
	}, k.csstransitions = function() {
		return l("transition")
	}, k.fontface = function() {
		var e;
		return E('@font-face {font-family:"font";src:url("https://")}', function(n, i) {
			var o = t.getElementById("smodernizr"),
				r = o.sheet || o.styleSheet,
				s = r ? r.cssRules && r.cssRules[0] ? r.cssRules[0].cssText : r.cssText || "" : "";
			e = /src/i.test(s) && 0 === s.indexOf(i.split(" ")[0])
		}), e
	}, k.video = function() {
		var e = t.createElement("video"),
			n = !1;
		try {
			(n = !! e.canPlayType) && (n = new Boolean(n), n.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), n.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
		} catch (i) {}
		return n
	}, k.svg = function() {
		return !!t.createElementNS && !! t.createElementNS(C.svg, "svg").createSVGRect
	};
	for (var N in k) u(k, N) && (d = N.toLowerCase(), h[d] = k[N](), S.push((h[d] ? "" : "no-") + d));
	return h.addTest = function(e, t) {
		if ("object" == typeof e) for (var i in e) u(e, i) && h.addTest(i, e[i]);
		else {
			if (e = e.toLowerCase(), h[e] !== n) return h;
			t = "function" == typeof t ? t() : t, "undefined" != typeof f && f && (v.className += " " + (t ? "" : "no-") + e), h[e] = t
		}
		return h
	}, i(""), g = c = null, function(e, t) {
		function n(e, t) {
			var n = e.createElement("p"),
				i = e.getElementsByTagName("head")[0] || e.documentElement;
			return n.innerHTML = "x<style>" + t + "</style>", i.insertBefore(n.lastChild, i.firstChild)
		}
		function i() {
			var e = y.elements;
			return "string" == typeof e ? e.split(" ") : e
		}
		function o(e) {
			var t = g[e[v]];
			return t || (t = {}, m++, e[v] = m, g[m] = t), t
		}
		function r(e, n, i) {
			if (n || (n = t), d) return n.createElement(e);
			i || (i = o(n));
			var r;
			return r = i.cache[e] ? i.cache[e].cloneNode() : f.test(e) ? (i.cache[e] = i.createElem(e)).cloneNode() : i.createElem(e), !r.canHaveChildren || h.test(e) || r.tagUrn ? r : i.frag.appendChild(r)
		}
		function s(e, n) {
			if (e || (e = t), d) return e.createDocumentFragment();
			n = n || o(e);
			for (var r = n.frag.cloneNode(), s = 0, a = i(), l = a.length; s < l; s++) r.createElement(a[s]);
			return r
		}
		function a(e, t) {
			t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
				return y.shivMethods ? r(n, e, t) : t.createElem(n)
			}, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + i().join().replace(/[\w\-]+/g, function(e) {
				return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
			}) + ");return n}")(y, t.frag)
		}
		function l(e) {
			e || (e = t);
			var i = o(e);
			return !y.shivCSS || c || i.hasCSS || (i.hasCSS = !! n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), d || a(e, i), e
		}
		var c, d, u = "3.7.0",
			p = e.html5 || {},
			h = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
			f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
			v = "_html5shiv",
			m = 0,
			g = {};
		!
		function() {
			try {
				var e = t.createElement("a");
				e.innerHTML = "<xyz></xyz>", c = "hidden" in e, d = 1 == e.childNodes.length ||
				function() {
					t.createElement("a");
					var e = t.createDocumentFragment();
					return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
				}()
			} catch (n) {
				c = !0, d = !0
			}
		}();
		var y = {
			elements: p.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
			version: u,
			shivCSS: p.shivCSS !== !1,
			supportsUnknownElements: d,
			shivMethods: p.shivMethods !== !1,
			type: "default",
			shivDocument: l,
			createElement: r,
			createDocumentFragment: s
		};
		e.html5 = y, l(t)
	}(this, t), h._version = p, h._prefixes = b, h._domPrefixes = T, h._cssomPrefixes = x, h.mq = $, h.testProp = function(e) {
		return s([e])
	}, h.testAllProps = l, h.testStyles = E, v.className = v.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + S.join(" ") : ""), h
}(this, this.document), function(e, t, n) {
	function i(e) {
		return "[object Function]" == m.call(e)
	}
	function o(e) {
		return "string" == typeof e
	}
	function r() {}
	function s(e) {
		return !e || "loaded" == e || "complete" == e || "uninitialized" == e
	}
	function a() {
		var e = g.shift();
		y = 1, e ? e.t ? f(function() {
			("c" == e.t ? p.injectCss : p.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
		}, 0) : (e(), a()) : y = 0
	}
	function l(e, n, i, o, r, l, c) {
		function d(t) {
			if (!h && s(u.readyState) && (b.r = h = 1, !y && a(), u.onload = u.onreadystatechange = null, t)) {
				"img" != e && f(function() {
					x.removeChild(u)
				}, 50);
				for (var i in _[n]) _[n].hasOwnProperty(i) && _[n][i].onload()
			}
		}
		var c = c || p.errorTimeout,
			u = t.createElement(e),
			h = 0,
			m = 0,
			b = {
				t: i,
				s: n,
				e: r,
				a: l,
				x: c
			};
		1 === _[n] && (m = 1, _[n] = []), "object" == e ? u.data = n : (u.src = n, u.type = e), u.width = u.height = "0", u.onerror = u.onload = u.onreadystatechange = function() {
			d.call(this, m)
		}, g.splice(o, 0, b), "img" != e && (m || 2 === _[n] ? (x.insertBefore(u, w ? null : v), f(d, c)) : _[n].push(u))
	}
	function c(e, t, n, i, r) {
		return y = 0, t = t || "j", o(e) ? l("c" == t ? C : T, e, t, this.i++, n, i, r) : (g.splice(this.i++, 0, e), 1 == g.length && a()), this
	}
	function d() {
		var e = p;
		return e.loader = {
			load: c,
			i: 0
		}, e
	}
	var u, p, h = t.documentElement,
		f = e.setTimeout,
		v = t.getElementsByTagName("script")[0],
		m = {}.toString,
		g = [],
		y = 0,
		b = "MozAppearance" in h.style,
		w = b && !! t.createRange().compareNode,
		x = w ? h : v.parentNode,
		h = e.opera && "[object Opera]" == m.call(e.opera),
		h = !! t.attachEvent && !h,
		T = b ? "object" : h ? "script" : "img",
		C = h ? "script" : T,
		k = Array.isArray ||
	function(e) {
		return "[object Array]" == m.call(e)
	}, S = [], _ = {}, E = {
		timeout: function(e, t) {
			return t.length && (e.timeout = t[0]), e
		}
	};
	p = function(e) {
		function t(e) {
			var t, n, i, e = e.split("!"),
				o = S.length,
				r = e.pop(),
				s = e.length,
				r = {
					url: r,
					origUrl: r,
					prefixes: e
				};
			for (n = 0; n < s; n++) i = e[n].split("="), (t = E[i.shift()]) && (r = t(r, i));
			for (n = 0; n < o; n++) r = S[n](r);
			return r
		}
		function s(e, o, r, s, a) {
			var l = t(e),
				c = l.autoCallback;
			l.url.split(".").pop().split("?").shift(), l.bypass || (o && (o = i(o) ? o : o[e] || o[s] || o[e.split("/").pop().split("?")[0]]), l.instead ? l.instead(e, o, r, s, a) : (_[l.url] ? l.noexec = !0 : _[l.url] = 1, r.load(l.url, l.forceCSS || !l.forceJS && "css" == l.url.split(".").pop().split("?").shift() ? "c" : n, l.noexec, l.attrs, l.timeout), (i(o) || i(c)) && r.load(function() {
				d(), o && o(l.origUrl, a, s), c && c(l.origUrl, a, s), _[l.url] = 2
			})))
		}
		function a(e, t) {
			function n(e, n) {
				if (e) {
					if (o(e)) n || (u = function() {
						var e = [].slice.call(arguments);
						p.apply(this, e), h()
					}), s(e, u, t, 0, c);
					else if (Object(e) === e) for (l in a = function() {
						var t, n = 0;
						for (t in e) e.hasOwnProperty(t) && n++;
						return n
					}(), e) e.hasOwnProperty(l) && (!n && !--a && (i(u) ? u = function() {
						var e = [].slice.call(arguments);
						p.apply(this, e), h()
					} : u[l] = function(e) {
						return function() {
							var t = [].slice.call(arguments);
							e && e.apply(this, t), h()
						}
					}(p[l])), s(e[l], u, t, l, c))
				} else!n && h()
			}
			var a, l, c = !! e.test,
				d = e.load || e.both,
				u = e.callback || r,
				p = u,
				h = e.complete || r;
			n(c ? e.yep : e.nope, !! d), d && n(d)
		}
		var l, c, u = this.yepnope.loader;
		if (o(e)) s(e, 0, u, 0);
		else if (k(e)) for (l = 0; l < e.length; l++) c = e[l], o(c) ? s(c, 0, u, 0) : k(c) ? p(c) : Object(c) === c && a(c, u);
		else Object(e) === e && a(e, u)
	}, p.addPrefix = function(e, t) {
		E[e] = t
	}, p.addFilter = function(e) {
		S.push(e)
	}, p.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", u = function() {
		t.removeEventListener("DOMContentLoaded", u, 0), t.readyState = "complete"
	}, 0)), e.yepnope = d(), e.yepnope.executeStack = a, e.yepnope.injectJs = function(e, n, i, o, l, c) {
		var d, u, h = t.createElement("script"),
			o = o || p.errorTimeout;
		h.src = e;
		for (u in i) h.setAttribute(u, i[u]);
		n = c ? a : n || r, h.onreadystatechange = h.onload = function() {
			!d && s(h.readyState) && (d = 1, n(), h.onload = h.onreadystatechange = null)
		}, f(function() {
			d || (d = 1, n(1))
		}, o), l ? h.onload() : v.parentNode.insertBefore(h, v)
	}, e.yepnope.injectCss = function(e, n, i, o, s, l) {
		var c, o = t.createElement("link"),
			n = l ? a : n || r;
		o.href = e, o.rel = "stylesheet", o.type = "text/css";
		for (c in i) o.setAttribute(c, i[c]);
		s || (v.parentNode.insertBefore(o, v), f(n, 0))
	}
}(this, document), Modernizr.load = function() {
	yepnope.apply(window, [].slice.call(arguments, 0))
}, Modernizr.addTest("pointerevents", function() {
	var e, t = document.createElement("x"),
		n = document.documentElement,
		i = window.getComputedStyle;
	return "pointerEvents" in t.style && (t.style.pointerEvents = "auto", t.style.pointerEvents = "x", n.appendChild(t), e = i && "auto" === i(t, "").pointerEvents, n.removeChild(t), !! e)
}), window.Detectizr = function(e, t, n, i) {
	function o(e, t) {
		var n, i, r;
		if (arguments.length > 2) for (n = 1, i = arguments.length; n < i; n += 1) o(e, arguments[n]);
		else for (r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
		return e
	}
	function r(e) {
		return w.browser.userAgent.indexOf(e) > -1
	}
	function s(e) {
		return e.test(w.browser.userAgent)
	}
	function a(e) {
		return e.exec(w.browser.userAgent)
	}
	function l(e) {
		return e.replace(/^\s+|\s+$/g, "")
	}
	function c(e) {
		return null === e || e === i ? "" : String(e).replace(/((\s|\-|\.)+[a-z0-9])/g, function(e) {
			return e.toUpperCase().replace(/(\s|\-|\.)/g, "")
		})
	}
	function d(e, t) {
		var n = t || "",
			i = 1 === e.nodeType && (e.className ? (" " + e.className + " ").replace(S, " ") : "");
		if (i) {
			for (; i.indexOf(" " + n + " ") >= 0;) i = i.replace(" " + n + " ", " ");
			e.className = t ? l(i) : ""
		}
	}
	function u(e, t, n) {
		e && (e = c(e), t && (t = c(t), p(e + t, !0), n && p(e + t + "_" + n, !0)))
	}
	function p(e, t) {
		e && x && (C.addAllFeaturesAsClass ? x.addTest(e, t) : (t = "function" == typeof t ? t() : t, t ? x.addTest(e, !0) : (delete x[e], d(_, e))))
	}
	function h(e, t) {
		e.version = t;
		var n = t.split(".");
		n.length > 0 ? (n = n.reverse(), e.major = n.pop(), n.length > 0 ? (e.minor = n.pop(), n.length > 0 ? (n = n.reverse(), e.patch = n.join(".")) : e.patch = "0") : e.minor = "0") : e.major = "0"
	}
	function f() {
		e.clearTimeout(y), y = e.setTimeout(function() {
			b = w.device.orientation, e.innerHeight > e.innerWidth ? w.device.orientation = "portrait" : w.device.orientation = "landscape", p(w.device.orientation, !0), b !== w.device.orientation && p(b, !1)
		}, 10)
	}
	function v(e) {
		var n, i, o, r, s, a = t.plugins;
		for (r = a.length - 1; r >= 0; r--) {
			for (n = a[r], i = n.name + n.description, o = 0, s = e.length; s >= 0; s--) i.indexOf(e[s]) !== -1 && (o += 1);
			if (o === e.length) return !0
		}
		return !1
	}
	function m(e) {
		var t;
		for (t = e.length - 1; t >= 0; t--) try {
			new ActiveXObject(e[t])
		} catch (n) {}
		return !1
	}
	function g(i) {
		var l, d, g, y, b, S, _;
		if (C = o({}, C, i || {}), C.detectDevice) {
			for (w.device = {
				type: "",
				model: "",
				orientation: ""
			}, g = w.device, s(/googletv|smarttv|smart-tv|internet.tv|netcast|nettv|appletv|boxee|kylo|roku|dlnadoc|roku|pov_tv|hbbtv|ce\-html/) ? (g.type = T[0], g.model = "smartTv") : s(/xbox|playstation.3|wii/) ? (g.type = T[0], g.model = "gameConsole") : s(/ip(a|ro)d/) ? (g.type = T[1], g.model = "ipad") : s(/tablet/) && !s(/rx-34/) || s(/folio/) ? (g.type = T[1], g.model = String(a(/playbook/) || "")) : s(/linux/) && s(/android/) && !s(/fennec|mobi|htc.magic|htcX06ht|nexus.one|sc-02b|fone.945/) ? (g.type = T[1], g.model = "android") : s(/kindle/) || s(/mac.os/) && s(/silk/) ? (g.type = T[1], g.model = "kindle") : s(/gt-p10|sc-01c|shw-m180s|sgh-t849|sch-i800|shw-m180l|sph-p100|sgh-i987|zt180|htc(.flyer|\_flyer)|sprint.atp51|viewpad7|pandigital(sprnova|nova)|ideos.s7|dell.streak.7|advent.vega|a101it|a70bht|mid7015|next2|nook/) || s(/mb511/) && s(/rutem/) ? (g.type = T[1], g.model = "android") : s(/bb10/) ? (g.type = T[1], g.model = "blackberry") : (g.model = a(/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec|j2me/), null !== g.model ? (g.type = T[2], g.model = String(g.model)) : (g.model = "", s(/bolt|fennec|iris|maemo|minimo|mobi|mowser|netfront|novarra|prism|rx-34|skyfire|tear|xv6875|xv6975|google.wireless.transcoder/) ? g.type = T[2] : s(/opera/) && s(/windows.nt.5/) && s(/htc|xda|mini|vario|samsung\-gt\-i8000|samsung\-sgh\-i9/) ? g.type = T[2] : s(/windows.(nt|xp|me|9)/) && !s(/phone/) || s(/win(9|.9|nt)/) || s(/\(windows 8\)/) ? g.type = T[3] : s(/macintosh|powerpc/) && !s(/silk/) ? (g.type = T[3], g.model = "mac") : s(/linux/) && s(/x11/) ? g.type = T[3] : s(/solaris|sunos|bsd/) ? g.type = T[3] : s(/cros/) ? g.type = T[3] : s(/bot|crawler|spider|yahoo|ia_archiver|covario-ids|findlinks|dataparksearch|larbin|mediapartners-google|ng-search|snappy|teoma|jeeves|tineye/) && !s(/mobile/) ? (g.type = T[3], g.model = "crawler") : g.type = T[2])), l = 0, d = T.length; l < d; l += 1) p(T[l], g.type === T[l]);
			C.detectDeviceModel && p(c(g.model), !0)
		}
		if (C.detectScreen && (g.screen = {}, x && x.mq && (x.mq("only screen and (max-width: 240px)") ? (g.screen.size = "veryVerySmall", p("veryVerySmallScreen", !0)) : x.mq("only screen and (max-width: 320px)") ? (g.screen.size = "verySmall", p("verySmallScreen", !0)) : x.mq("only screen and (max-width: 480px)") && (g.screen.size = "small", p("smallScreen", !0)), g.type !== T[1] && g.type !== T[2] || x.mq("only screen and (-moz-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)") && (g.screen.resolution = "high", p("highresolution", !0))), g.type === T[1] || g.type === T[2] ? (e.onresize = function(e) {
			f(e)
		}, f()) : (g.orientation = "landscape", p(g.orientation, !0))), C.detectOS && (w.os = {}, y = w.os, "" !== g.model && ("ipad" === g.model || "iphone" === g.model || "ipod" === g.model ? (y.name = "ios", h(y, (s(/os\s([\d_]+)/) ? RegExp.$1 : "").replace(/_/g, "."))) : "android" === g.model ? (y.name = "android", h(y, s(/android\s([\d\.]+)/) ? RegExp.$1 : "")) : "blackberry" === g.model ? (y.name = "blackberry", h(y, s(/version\/([^\s]+)/) ? RegExp.$1 : "")) : "playbook" === g.model && (y.name = "blackberry", h(y, s(/os ([^\s]+)/) ? RegExp.$1.replace(";", "") : ""))), y.name || (r("win") || r("16bit") ? (y.name = "windows", r("windows nt 6.3") ? h(y, "8.1") : r("windows nt 6.2") || s(/\(windows 8\)/) ? h(y, "8") : r("windows nt 6.1") ? h(y, "7") : r("windows nt 6.0") ? h(y, "vista") : r("windows nt 5.2") || r("windows nt 5.1") || r("windows xp") ? h(y, "xp") : r("windows nt 5.0") || r("windows 2000") ? h(y, "2k") : r("winnt") || r("windows nt") ? h(y, "nt") : r("win98") || r("windows 98") ? h(y, "98") : (r("win95") || r("windows 95")) && h(y, "95")) : r("mac") || r("darwin") ? (y.name = "mac os", r("68k") || r("68000") ? h(y, "68k") : r("ppc") || r("powerpc") ? h(y, "ppc") : r("os x") && h(y, (s(/os\sx\s([\d_]+)/) ? RegExp.$1 : "os x").replace(/_/g, "."))) : r("webtv") ? y.name = "webtv" : r("x11") || r("inux") ? y.name = "linux" : r("sunos") ? y.name = "sun" : r("irix") ? y.name = "irix" : r("freebsd") ? y.name = "freebsd" : r("bsd") && (y.name = "bsd")), y.name && (p(y.name, !0), y.major && (u(y.name, y.major), y.minor && u(y.name, y.major, y.minor))), s(/\sx64|\sx86|\swin64|\swow64|\samd64/) ? y.addressRegisterSize = "64bit" : y.addressRegisterSize = "32bit", p(y.addressRegisterSize, !0)), C.detectBrowser && (b = w.browser, s(/opera|webtv/) || !s(/msie\s([\d\w\.]+)/) && !r("trident") ? r("firefox") ? (b.engine = "gecko", b.name = "firefox", h(b, s(/firefox\/([\d\w\.]+)/) ? RegExp.$1 : "")) : r("gecko/") ? b.engine = "gecko" : r("opera") ? (b.name = "opera", b.engine = "presto", h(b, s(/version\/([\d\.]+)/) ? RegExp.$1 : s(/opera(\s|\/)([\d\.]+)/) ? RegExp.$2 : "")) : r("konqueror") ? b.name = "konqueror" : r("chrome") ? (b.engine = "webkit", b.name = "chrome", h(b, s(/chrome\/([\d\.]+)/) ? RegExp.$1 : "")) : r("iron") ? (b.engine = "webkit", b.name = "iron") : r("crios") ? (b.name = "chrome", b.engine = "webkit", h(b, s(/crios\/([\d\.]+)/) ? RegExp.$1 : "")) : r("applewebkit/") ? (b.name = "safari", b.engine = "webkit", h(b, s(/version\/([\d\.]+)/) ? RegExp.$1 : "")) : r("mozilla/") && (b.engine = "gecko") : (b.engine = "trident", b.name = "ie", !e.addEventListener && n.documentMode && 7 === n.documentMode ? h(b, "8.compat") : s(/trident.*rv[ :](\d+)\./) ? h(b, RegExp.$1) : h(b, s(/trident\/4\.0/) ? "8" : RegExp.$1)), b.name && (p(b.name, !0), b.major && (u(b.name, b.major), b.minor && u(b.name, b.major, b.minor))), p(b.engine, !0), b.language = t.userLanguage || t.language, p(b.language, !0)), C.detectPlugins) {
			for (b.plugins = [], l = k.length - 1; l >= 0; l--) S = k[l], _ = !1, e.ActiveXObject ? _ = m(S.progIds) : t.plugins && (_ = v(S.substrs)), _ && (b.plugins.push(S.name), p(S.name, !0));
			t.javaEnabled() && (b.plugins.push("java"), p("java", !0))
		}
	}
	var y, b, w = {},
		x = e.Modernizr,
		T = ["tv", "tablet", "mobile", "desktop"],
		C = {
			addAllFeaturesAsClass: !1,
			detectDevice: !0,
			detectDeviceModel: !0,
			detectScreen: !0,
			detectOS: !0,
			detectBrowser: !0,
			detectPlugins: !0
		},
		k = [{
			name: "adobereader",
			substrs: ["Adobe", "Acrobat"],
			progIds: ["AcroPDF.PDF", "PDF.PDFCtrl.5"]
		}, {
			name: "flash",
			substrs: ["Shockwave Flash"],
			progIds: ["ShockwaveFlash.ShockwaveFlash.1"]
		}, {
			name: "wmplayer",
			substrs: ["Windows Media"],
			progIds: ["wmplayer.ocx"]
		}, {
			name: "silverlight",
			substrs: ["Silverlight"],
			progIds: ["AgControl.AgControl"]
		}, {
			name: "quicktime",
			substrs: ["QuickTime"],
			progIds: ["QuickTime.QuickTime"]
		}],
		S = /[\t\r\n]/g,
		_ = n.documentElement;
	return w.detect = function(e) {
		return g(e)
	}, w.init = function() {
		w !== i && (w.browser = {
			userAgent: (t.userAgent || t.vendor || e.opera).toLowerCase()
		}, w.detect())
	}, w.init(), w
}(this, this.navigator, this.document), function(e, t) {
	"object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
		if (!e.document) throw new Error("jQuery requires a window with a document");
		return t(e)
	} : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
	function n(e) {
		var t = e.length,
			n = re.type(e);
		return "function" !== n && !re.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e))
	}
	function i(e, t, n) {
		if (re.isFunction(t)) return re.grep(e, function(e, i) {
			return !!t.call(e, i, e) !== n
		});
		if (t.nodeType) return re.grep(e, function(e) {
			return e === t !== n
		});
		if ("string" == typeof t) {
			if (he.test(t)) return re.filter(t, e, n);
			t = re.filter(t, e)
		}
		return re.grep(e, function(e) {
			return re.inArray(e, t) >= 0 !== n
		})
	}
	function o(e, t) {
		do e = e[t];
		while (e && 1 !== e.nodeType);
		return e
	}
	function r(e) {
		var t = xe[e] = {};
		return re.each(e.match(we) || [], function(e, n) {
			t[n] = !0
		}), t
	}
	function s() {
		ve.addEventListener ? (ve.removeEventListener("DOMContentLoaded", a, !1), e.removeEventListener("load", a, !1)) : (ve.detachEvent("onreadystatechange", a), e.detachEvent("onload", a))
	}
	function a() {
		(ve.addEventListener || "load" === event.type || "complete" === ve.readyState) && (s(), re.ready())
	}
	function l(e, t, n) {
		if (void 0 === n && 1 === e.nodeType) {
			var i = "data-" + t.replace(_e, "-$1").toLowerCase();
			if (n = e.getAttribute(i), "string" == typeof n) {
				try {
					n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Se.test(n) ? re.parseJSON(n) : n)
				} catch (o) {}
				re.data(e, t, n)
			} else n = void 0
		}
		return n
	}
	function c(e) {
		var t;
		for (t in e) if (("data" !== t || !re.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
		return !0
	}
	function d(e, t, n, i) {
		if (re.acceptData(e)) {
			var o, r, s = re.expando,
				a = e.nodeType,
				l = a ? re.cache : e,
				c = a ? e[s] : e[s] && s;
			if (c && l[c] && (i || l[c].data) || void 0 !== n || "string" != typeof t) return c || (c = a ? e[s] = V.pop() || re.guid++ : s), l[c] || (l[c] = a ? {} : {
				toJSON: re.noop
			}), "object" != typeof t && "function" != typeof t || (i ? l[c] = re.extend(l[c], t) : l[c].data = re.extend(l[c].data, t)), r = l[c], i || (r.data || (r.data = {}), r = r.data), void 0 !== n && (r[re.camelCase(t)] = n), "string" == typeof t ? (o = r[t], null == o && (o = r[re.camelCase(t)])) : o = r, o
		}
	}
	function u(e, t, n) {
		if (re.acceptData(e)) {
			var i, o, r = e.nodeType,
				s = r ? re.cache : e,
				a = r ? e[re.expando] : re.expando;
			if (s[a]) {
				if (t && (i = n ? s[a] : s[a].data)) {
					re.isArray(t) ? t = t.concat(re.map(t, re.camelCase)) : t in i ? t = [t] : (t = re.camelCase(t), t = t in i ? [t] : t.split(" ")), o = t.length;
					for (; o--;) delete i[t[o]];
					if (n ? !c(i) : !re.isEmptyObject(i)) return
				}(n || (delete s[a].data, c(s[a]))) && (r ? re.cleanData([e], !0) : ie.deleteExpando || s != s.window ? delete s[a] : s[a] = null)
			}
		}
	}
	function p() {
		return !0
	}
	function h() {
		return !1
	}
	function f() {
		try {
			return ve.activeElement
		} catch (e) {}
	}
	function v(e) {
		var t = Pe.split("|"),
			n = e.createDocumentFragment();
		if (n.createElement) for (; t.length;) n.createElement(t.pop());
		return n
	}
	function m(e, t) {
		var n, i, o = 0,
			r = typeof e.getElementsByTagName !== ke ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== ke ? e.querySelectorAll(t || "*") : void 0;
		if (!r) for (r = [], n = e.childNodes || e; null != (i = n[o]); o++)!t || re.nodeName(i, t) ? r.push(i) : re.merge(r, m(i, t));
		return void 0 === t || t && re.nodeName(e, t) ? re.merge([e], r) : r
	}
	function g(e) {
		je.test(e.type) && (e.defaultChecked = e.checked)
	}
	function y(e, t) {
		return re.nodeName(e, "table") && re.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
	}
	function b(e) {
		return e.type = (null !== re.find.attr(e, "type")) + "/" + e.type, e
	}
	function w(e) {
		var t = Ve.exec(e.type);
		return t ? e.type = t[1] : e.removeAttribute("type"), e
	}
	function x(e, t) {
		for (var n, i = 0; null != (n = e[i]); i++) re._data(n, "globalEval", !t || re._data(t[i], "globalEval"))
	}
	function T(e, t) {
		if (1 === t.nodeType && re.hasData(e)) {
			var n, i, o, r = re._data(e),
				s = re._data(t, r),
				a = r.events;
			if (a) {
				delete s.handle, s.events = {};
				for (n in a) for (i = 0, o = a[n].length; i < o; i++) re.event.add(t, n, a[n][i])
			}
			s.data && (s.data = re.extend({}, s.data))
		}
	}
	function C(e, t) {
		var n, i, o;
		if (1 === t.nodeType) {
			if (n = t.nodeName.toLowerCase(), !ie.noCloneEvent && t[re.expando]) {
				o = re._data(t);
				for (i in o.events) re.removeEvent(t, i, o.handle);
				t.removeAttribute(re.expando)
			}
			"script" === n && t.text !== e.text ? (b(t).text = e.text, w(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ie.html5Clone && e.innerHTML && !re.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && je.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
		}
	}
	function k(t, n) {
		var i = re(n.createElement(t)).appendTo(n.body),
			o = e.getDefaultComputedStyle ? e.getDefaultComputedStyle(i[0]).display : re.css(i[0], "display");
		return i.detach(), o
	}
	function S(e) {
		var t = ve,
			n = et[e];
		return n || (n = k(e, t), "none" !== n && n || (Ze = (Ze || re("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Ze[0].contentWindow || Ze[0].contentDocument).document, t.write(), t.close(), n = k(e, t), Ze.detach()), et[e] = n), n
	}
	function _(e, t) {
		return {
			get: function() {
				var n = e();
				if (null != n) return n ? void delete this.get : (this.get = t).apply(this, arguments)
			}
		}
	}
	function E(e, t) {
		if (t in e) return t;
		for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, o = ht.length; o--;) if (t = ht[o] + n, t in e) return t;
		return i
	}
	function $(e, t) {
		for (var n, i, o, r = [], s = 0, a = e.length; s < a; s++) i = e[s], i.style && (r[s] = re._data(i, "olddisplay"), n = i.style.display, t ? (r[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && Ae(i) && (r[s] = re._data(i, "olddisplay", S(i.nodeName)))) : r[s] || (o = Ae(i), (n && "none" !== n || !o) && re._data(i, "olddisplay", o ? n : re.css(i, "display"))));
		for (s = 0; s < a; s++) i = e[s], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[s] || "" : "none"));
		return e
	}
	function A(e, t, n) {
		var i = ct.exec(t);
		return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
	}
	function N(e, t, n, i, o) {
		for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; r < 4; r += 2)"margin" === n && (s += re.css(e, n + $e[r], !0, o)), i ? ("content" === n && (s -= re.css(e, "padding" + $e[r], !0, o)), "margin" !== n && (s -= re.css(e, "border" + $e[r] + "Width", !0, o))) : (s += re.css(e, "padding" + $e[r], !0, o), "padding" !== n && (s += re.css(e, "border" + $e[r] + "Width", !0, o)));
		return s
	}
	function j(e, t, n) {
		var i = !0,
			o = "width" === t ? e.offsetWidth : e.offsetHeight,
			r = tt(e),
			s = ie.boxSizing() && "border-box" === re.css(e, "boxSizing", !1, r);
		if (o <= 0 || null == o) {
			if (o = nt(e, t, r), (o < 0 || null == o) && (o = e.style[t]), ot.test(o)) return o;
			i = s && (ie.boxSizingReliable() || o === e.style[t]), o = parseFloat(o) || 0
		}
		return o + N(e, t, n || (s ? "border" : "content"), i, r) + "px"
	}
	function D(e, t, n, i, o) {
		return new D.prototype.init(e, t, n, i, o)
	}
	function H() {
		return setTimeout(function() {
			ft = void 0
		}), ft = re.now()
	}
	function L(e, t) {
		var n, i = {
			height: e
		},
			o = 0;
		for (t = t ? 1 : 0; o < 4; o += 2 - t) n = $e[o], i["margin" + n] = i["padding" + n] = e;
		return t && (i.opacity = i.width = e), i
	}
	function M(e, t, n) {
		for (var i, o = (wt[t] || []).concat(wt["*"]), r = 0, s = o.length; r < s; r++) if (i = o[r].call(n, t, e)) return i
	}
	function O(e, t, n) {
		var i, o, r, s, a, l, c, d, u = this,
			p = {},
			h = e.style,
			f = e.nodeType && Ae(e),
			v = re._data(e, "fxshow");
		n.queue || (a = re._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
			a.unqueued || l()
		}), a.unqueued++, u.always(function() {
			u.always(function() {
				a.unqueued--, re.queue(e, "fx").length || a.empty.fire()
			})
		})), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [h.overflow, h.overflowX, h.overflowY], c = re.css(e, "display"), d = S(e.nodeName), "none" === c && (c = d), "inline" === c && "none" === re.css(e, "float") && (ie.inlineBlockNeedsLayout && "inline" !== d ? h.zoom = 1 : h.display = "inline-block")), n.overflow && (h.overflow = "hidden", ie.shrinkWrapBlocks() || u.always(function() {
			h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
		}));
		for (i in t) if (o = t[i], mt.exec(o)) {
			if (delete t[i], r = r || "toggle" === o, o === (f ? "hide" : "show")) {
				if ("show" !== o || !v || void 0 === v[i]) continue;
				f = !0
			}
			p[i] = v && v[i] || re.style(e, i)
		}
		if (!re.isEmptyObject(p)) {
			v ? "hidden" in v && (f = v.hidden) : v = re._data(e, "fxshow", {}), r && (v.hidden = !f), f ? re(e).show() : u.done(function() {
				re(e).hide()
			}), u.done(function() {
				var t;
				re._removeData(e, "fxshow");
				for (t in p) re.style(e, t, p[t])
			});
			for (i in p) s = M(f ? v[i] : 0, i, u), i in v || (v[i] = s.start, f && (s.end = s.start, s.start = "width" === i || "height" === i ? 1 : 0))
		}
	}
	function P(e, t) {
		var n, i, o, r, s;
		for (n in e) if (i = re.camelCase(n), o = t[i], r = e[n], re.isArray(r) && (o = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), s = re.cssHooks[i], s && "expand" in s) {
			r = s.expand(r), delete e[i];
			for (n in r) n in e || (e[n] = r[n], t[n] = o)
		} else t[i] = o
	}
	function q(e, t, n) {
		var i, o, r = 0,
			s = bt.length,
			a = re.Deferred().always(function() {
				delete l.elem
			}),
			l = function() {
				if (o) return !1;
				for (var t = ft || H(), n = Math.max(0, c.startTime + c.duration - t), i = n / c.duration || 0, r = 1 - i, s = 0, l = c.tweens.length; s < l; s++) c.tweens[s].run(r);
				return a.notifyWith(e, [c, r, n]), r < 1 && l ? n : (a.resolveWith(e, [c]), !1)
			},
			c = a.promise({
				elem: e,
				props: re.extend({}, t),
				opts: re.extend(!0, {
					specialEasing: {}
				}, n),
				originalProperties: t,
				originalOptions: n,
				startTime: ft || H(),
				duration: n.duration,
				tweens: [],
				createTween: function(t, n) {
					var i = re.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
					return c.tweens.push(i), i
				},
				stop: function(t) {
					var n = 0,
						i = t ? c.tweens.length : 0;
					if (o) return this;
					for (o = !0; n < i; n++) c.tweens[n].run(1);
					return t ? a.resolveWith(e, [c, t]) : a.rejectWith(e, [c, t]), this
				}
			}),
			d = c.props;
		for (P(d, c.opts.specialEasing); r < s; r++) if (i = bt[r].call(c, e, d, c.opts)) return i;
		return re.map(d, M, c), re.isFunction(c.opts.start) && c.opts.start.call(e, c), re.fx.timer(re.extend(l, {
			elem: e,
			anim: c,
			queue: c.opts.queue
		})), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
	}
	function I(e) {
		return function(t, n) {
			"string" != typeof t && (n = t, t = "*");
			var i, o = 0,
				r = t.toLowerCase().match(we) || [];
			if (re.isFunction(n)) for (; i = r[o++];)"+" === i.charAt(0) ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
		}
	}
	function F(e, t, n, i) {
		function o(a) {
			var l;
			return r[a] = !0, re.each(e[a] || [], function(e, a) {
				var c = a(t, n, i);
				return "string" != typeof c || s || r[c] ? s ? !(l = c) : void 0 : (t.dataTypes.unshift(c), o(c), !1)
			}), l
		}
		var r = {},
			s = e === Rt;
		return o(t.dataTypes[0]) || !r["*"] && o("*")
	}
	function z(e, t) {
		var n, i, o = re.ajaxSettings.flatOptions || {};
		for (i in t) void 0 !== t[i] && ((o[i] ? e : n || (n = {}))[i] = t[i]);
		return n && re.extend(!0, e, n), e
	}
	function W(e, t, n) {
		for (var i, o, r, s, a = e.contents, l = e.dataTypes;
		"*" === l[0];) l.shift(), void 0 === o && (o = e.mimeType || t.getResponseHeader("Content-Type"));
		if (o) for (s in a) if (a[s] && a[s].test(o)) {
			l.unshift(s);
			break
		}
		if (l[0] in n) r = l[0];
		else {
			for (s in n) {
				if (!l[0] || e.converters[s + " " + l[0]]) {
					r = s;
					break
				}
				i || (i = s)
			}
			r = r || i
		}
		if (r) return r !== l[0] && l.unshift(r), n[r]
	}
	function B(e, t, n, i) {
		var o, r, s, a, l, c = {},
			d = e.dataTypes.slice();
		if (d[1]) for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
		for (r = d.shift(); r;) if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = d.shift()) if ("*" === r) r = l;
		else if ("*" !== l && l !== r) {
			if (s = c[l + " " + r] || c["* " + r], !s) for (o in c) if (a = o.split(" "), a[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
				s === !0 ? s = c[o] : c[o] !== !0 && (r = a[0], d.unshift(a[1]));
				break
			}
			if (s !== !0) if (s && e["throws"]) t = s(t);
			else try {
				t = s(t)
			} catch (u) {
				return {
					state: "parsererror",
					error: s ? u : "No conversion from " + l + " to " + r
				}
			}
		}
		return {
			state: "success",
			data: t
		}
	}
	function R(e, t, n, i) {
		var o;
		if (re.isArray(t)) re.each(t, function(t, o) {
			n || Vt.test(e) ? i(e, o) : R(e + "[" + ("object" == typeof o ? t : "") + "]", o, n, i)
		});
		else if (n || "object" !== re.type(t)) i(e, t);
		else for (o in t) R(e + "[" + o + "]", t[o], n, i)
	}
	function U() {
		try {
			return new e.XMLHttpRequest
		} catch (t) {}
	}
	function X() {
		try {
			return new e.ActiveXObject("Microsoft.XMLHTTP")
		} catch (t) {}
	}
	function Q(e) {
		return re.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
	}
	var V = [],
		G = V.slice,
		Y = V.concat,
		K = V.push,
		J = V.indexOf,
		Z = {},
		ee = Z.toString,
		te = Z.hasOwnProperty,
		ne = "".trim,
		ie = {},
		oe = "1.11.0",
		re = function(e, t) {
			return new re.fn.init(e, t)
		},
		se = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		ae = /^-ms-/,
		le = /-([\da-z])/gi,
		ce = function(e, t) {
			return t.toUpperCase()
		};
	re.fn = re.prototype = {
		jquery: oe,
		constructor: re,
		selector: "",
		length: 0,
		toArray: function() {
			return G.call(this)
		},
		get: function(e) {
			return null != e ? e < 0 ? this[e + this.length] : this[e] : G.call(this)
		},
		pushStack: function(e) {
			var t = re.merge(this.constructor(), e);
			return t.prevObject = this, t.context = this.context, t
		},
		each: function(e, t) {
			return re.each(this, e, t)
		},
		map: function(e) {
			return this.pushStack(re.map(this, function(t, n) {
				return e.call(t, n, t)
			}))
		},
		slice: function() {
			return this.pushStack(G.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		eq: function(e) {
			var t = this.length,
				n = +e + (e < 0 ? t : 0);
			return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
		},
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		push: K,
		sort: V.sort,
		splice: V.splice
	}, re.extend = re.fn.extend = function() {
		var e, t, n, i, o, r, s = arguments[0] || {},
			a = 1,
			l = arguments.length,
			c = !1;
		for ("boolean" == typeof s && (c = s, s = arguments[a] || {}, a++), "object" == typeof s || re.isFunction(s) || (s = {}), a === l && (s = this, a--); a < l; a++) if (null != (o = arguments[a])) for (i in o) e = s[i], n = o[i], s !== n && (c && n && (re.isPlainObject(n) || (t = re.isArray(n))) ? (t ? (t = !1, r = e && re.isArray(e) ? e : []) : r = e && re.isPlainObject(e) ? e : {}, s[i] = re.extend(c, r, n)) : void 0 !== n && (s[i] = n));
		return s
	}, re.extend({
		expando: "jQuery" + (oe + Math.random()).replace(/\D/g, ""),
		isReady: !0,
		error: function(e) {
			throw new Error(e)
		},
		noop: function() {},
		isFunction: function(e) {
			return "function" === re.type(e)
		},
		isArray: Array.isArray ||
		function(e) {
			return "array" === re.type(e)
		},
		isWindow: function(e) {
			return null != e && e == e.window
		},
		isNumeric: function(e) {
			return e - parseFloat(e) >= 0
		},
		isEmptyObject: function(e) {
			var t;
			for (t in e) return !1;
			return !0
		},
		isPlainObject: function(e) {
			var t;
			if (!e || "object" !== re.type(e) || e.nodeType || re.isWindow(e)) return !1;
			try {
				if (e.constructor && !te.call(e, "constructor") && !te.call(e.constructor.prototype, "isPrototypeOf")) return !1
			} catch (n) {
				return !1
			}
			if (ie.ownLast) for (t in e) return te.call(e, t);
			for (t in e);
			return void 0 === t || te.call(e, t)
		},
		type: function(e) {
			return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Z[ee.call(e)] || "object" : typeof e
		},
		globalEval: function(t) {
			t && re.trim(t) && (e.execScript ||
			function(t) {
				e.eval.call(e, t)
			})(t)
		},
		camelCase: function(e) {
			return e.replace(ae, "ms-").replace(le, ce)
		},
		nodeName: function(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		},
		each: function(e, t, i) {
			var o, r = 0,
				s = e.length,
				a = n(e);
			if (i) {
				if (a) for (; r < s && (o = t.apply(e[r], i), o !== !1); r++);
				else for (r in e) if (o = t.apply(e[r], i), o === !1) break
			} else if (a) for (; r < s && (o = t.call(e[r], r, e[r]), o !== !1); r++);
			else for (r in e) if (o = t.call(e[r], r, e[r]), o === !1) break;
			return e
		},
		trim: ne && !ne.call("\ufeff ") ?
		function(e) {
			return null == e ? "" : ne.call(e)
		} : function(e) {
			return null == e ? "" : (e + "").replace(se, "")
		},
		makeArray: function(e, t) {
			var i = t || [];
			return null != e && (n(Object(e)) ? re.merge(i, "string" == typeof e ? [e] : e) : K.call(i, e)), i
		},
		inArray: function(e, t, n) {
			var i;
			if (t) {
				if (J) return J.call(t, e, n);
				for (i = t.length, n = n ? n < 0 ? Math.max(0, i + n) : n : 0; n < i; n++) if (n in t && t[n] === e) return n
			}
			return -1
		},
		merge: function(e, t) {
			for (var n = +t.length, i = 0, o = e.length; i < n;) e[o++] = t[i++];
			if (n !== n) for (; void 0 !== t[i];) e[o++] = t[i++];
			return e.length = o, e
		},
		grep: function(e, t, n) {
			for (var i, o = [], r = 0, s = e.length, a = !n; r < s; r++) i = !t(e[r], r), i !== a && o.push(e[r]);
			return o
		},
		map: function(e, t, i) {
			var o, r = 0,
				s = e.length,
				a = n(e),
				l = [];
			if (a) for (; r < s; r++) o = t(e[r], r, i), null != o && l.push(o);
			else for (r in e) o = t(e[r], r, i), null != o && l.push(o);
			return Y.apply([], l)
		},
		guid: 1,
		proxy: function(e, t) {
			var n, i, o;
			if ("string" == typeof t && (o = e[t], t = e, e = o), re.isFunction(e)) return n = G.call(arguments, 2), i = function() {
				return e.apply(t || this, n.concat(G.call(arguments)))
			}, i.guid = e.guid = e.guid || re.guid++, i
		},
		now: function() {
			return +new Date
		},
		support: ie
	}), re.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
		Z["[object " + t + "]"] = t.toLowerCase()
	});
	var de = function(e) {
			function t(e, t, n, i) {
				var o, r, s, a, l, c, u, f, v, m;
				if ((t ? t.ownerDocument || t : F) !== D && j(t), t = t || D, n = n || [], !e || "string" != typeof e) return n;
				if (1 !== (a = t.nodeType) && 9 !== a) return [];
				if (L && !i) {
					if (o = ye.exec(e)) if (s = o[1]) {
						if (9 === a) {
							if (r = t.getElementById(s), !r || !r.parentNode) return n;
							if (r.id === s) return n.push(r), n
						} else if (t.ownerDocument && (r = t.ownerDocument.getElementById(s)) && q(t, r) && r.id === s) return n.push(r), n
					} else {
						if (o[2]) return Z.apply(n, t.getElementsByTagName(e)), n;
						if ((s = o[3]) && C.getElementsByClassName && t.getElementsByClassName) return Z.apply(n, t.getElementsByClassName(s)), n
					}
					if (C.qsa && (!M || !M.test(e))) {
						if (f = u = I, v = t, m = 9 === a && e, 1 === a && "object" !== t.nodeName.toLowerCase()) {
							for (c = p(e), (u = t.getAttribute("id")) ? f = u.replace(we, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", l = c.length; l--;) c[l] = f + h(c[l]);
							v = be.test(e) && d(t.parentNode) || t, m = c.join(",")
						}
						if (m) try {
							return Z.apply(n, v.querySelectorAll(m)), n
						} catch (g) {} finally {
							u || t.removeAttribute("id")
						}
					}
				}
				return x(e.replace(le, "$1"), t, n, i)
			}
			function n() {
				function e(n, i) {
					return t.push(n + " ") > k.cacheLength && delete e[t.shift()], e[n + " "] = i
				}
				var t = [];
				return e
			}
			function i(e) {
				return e[I] = !0, e
			}
			function o(e) {
				var t = D.createElement("div");
				try {
					return !!e(t)
				} catch (n) {
					return !1
				} finally {
					t.parentNode && t.parentNode.removeChild(t), t = null
				}
			}
			function r(e, t) {
				for (var n = e.split("|"), i = e.length; i--;) k.attrHandle[n[i]] = t
			}
			function s(e, t) {
				var n = t && e,
					i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
				if (i) return i;
				if (n) for (; n = n.nextSibling;) if (n === t) return -1;
				return e ? 1 : -1
			}
			function a(e) {
				return function(t) {
					var n = t.nodeName.toLowerCase();
					return "input" === n && t.type === e
				}
			}
			function l(e) {
				return function(t) {
					var n = t.nodeName.toLowerCase();
					return ("input" === n || "button" === n) && t.type === e
				}
			}
			function c(e) {
				return i(function(t) {
					return t = +t, i(function(n, i) {
						for (var o, r = e([], n.length, t), s = r.length; s--;) n[o = r[s]] && (n[o] = !(i[o] = n[o]))
					})
				})
			}
			function d(e) {
				return e && typeof e.getElementsByTagName !== Q && e
			}
			function u() {}
			function p(e, n) {
				var i, o, r, s, a, l, c, d = R[e + " "];
				if (d) return n ? 0 : d.slice(0);
				for (a = e, l = [], c = k.preFilter; a;) {
					i && !(o = ce.exec(a)) || (o && (a = a.slice(o[0].length) || a), l.push(r = [])), i = !1, (o = de.exec(a)) && (i = o.shift(), r.push({
						value: i,
						type: o[0].replace(le, " ")
					}), a = a.slice(i.length));
					for (s in k.filter)!(o = fe[s].exec(a)) || c[s] && !(o = c[s](o)) || (i = o.shift(), r.push({
						value: i,
						type: s,
						matches: o
					}), a = a.slice(i.length));
					if (!i) break
				}
				return n ? a.length : a ? t.error(e) : R(e, l).slice(0)
			}
			function h(e) {
				for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
				return i
			}
			function f(e, t, n) {
				var i = t.dir,
					o = n && "parentNode" === i,
					r = W++;
				return t.first ?
				function(t, n, r) {
					for (; t = t[i];) if (1 === t.nodeType || o) return e(t, n, r)
				} : function(t, n, s) {
					var a, l, c = [z, r];
					if (s) {
						for (; t = t[i];) if ((1 === t.nodeType || o) && e(t, n, s)) return !0
					} else for (; t = t[i];) if (1 === t.nodeType || o) {
						if (l = t[I] || (t[I] = {}), (a = l[i]) && a[0] === z && a[1] === r) return c[2] = a[2];
						if (l[i] = c, c[2] = e(t, n, s)) return !0
					}
				}
			}
			function v(e) {
				return e.length > 1 ?
				function(t, n, i) {
					for (var o = e.length; o--;) if (!e[o](t, n, i)) return !1;
					return !0
				} : e[0]
			}
			function m(e, t, n, i, o) {
				for (var r, s = [], a = 0, l = e.length, c = null != t; a < l; a++)(r = e[a]) && (n && !n(r, i, o) || (s.push(r), c && t.push(a)));
				return s
			}
			function g(e, t, n, o, r, s) {
				return o && !o[I] && (o = g(o)), r && !r[I] && (r = g(r, s)), i(function(i, s, a, l) {
					var c, d, u, p = [],
						h = [],
						f = s.length,
						v = i || w(t || "*", a.nodeType ? [a] : a, []),
						g = !e || !i && t ? v : m(v, p, e, a, l),
						y = n ? r || (i ? e : f || o) ? [] : s : g;
					if (n && n(g, y, a, l), o) for (c = m(y, h), o(c, [], a, l), d = c.length; d--;)(u = c[d]) && (y[h[d]] = !(g[h[d]] = u));
					if (i) {
						if (r || e) {
							if (r) {
								for (c = [], d = y.length; d--;)(u = y[d]) && c.push(g[d] = u);
								r(null, y = [], c, l)
							}
							for (d = y.length; d--;)(u = y[d]) && (c = r ? te.call(i, u) : p[d]) > -1 && (i[c] = !(s[c] = u))
						}
					} else y = m(y === s ? y.splice(f, y.length) : y), r ? r(null, s, y, l) : Z.apply(s, y)
				})
			}
			function y(e) {
				for (var t, n, i, o = e.length, r = k.relative[e[0].type], s = r || k.relative[" "], a = r ? 1 : 0, l = f(function(e) {
					return e === t
				}, s, !0), c = f(function(e) {
					return te.call(t, e) > -1
				}, s, !0), d = [function(e, n, i) {
					return !r && (i || n !== $) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i))
				}]; a < o; a++) if (n = k.relative[e[a].type]) d = [f(v(d), n)];
				else {
					if (n = k.filter[e[a].type].apply(null, e[a].matches), n[I]) {
						for (i = ++a; i < o && !k.relative[e[i].type]; i++);
						return g(a > 1 && v(d), a > 1 && h(e.slice(0, a - 1).concat({
							value: " " === e[a - 2].type ? "*" : ""
						})).replace(le, "$1"), n, a < i && y(e.slice(a, i)), i < o && y(e = e.slice(i)), i < o && h(e))
					}
					d.push(n)
				}
				return v(d)
			}
			function b(e, n) {
				var o = n.length > 0,
					r = e.length > 0,
					s = function(i, s, a, l, c) {
						var d, u, p, h = 0,
							f = "0",
							v = i && [],
							g = [],
							y = $,
							b = i || r && k.find.TAG("*", c),
							w = z += null == y ? 1 : Math.random() || .1,
							x = b.length;
						for (c && ($ = s !== D && s); f !== x && null != (d = b[f]); f++) {
							if (r && d) {
								for (u = 0; p = e[u++];) if (p(d, s, a)) {
									l.push(d);
									break
								}
								c && (z = w)
							}
							o && ((d = !p && d) && h--, i && v.push(d))
						}
						if (h += f, o && f !== h) {
							for (u = 0; p = n[u++];) p(v, g, s, a);
							if (i) {
								if (h > 0) for (; f--;) v[f] || g[f] || (g[f] = K.call(l));
								g = m(g)
							}
							Z.apply(l, g), c && !i && g.length > 0 && h + n.length > 1 && t.uniqueSort(l)
						}
						return c && (z = w, $ = y), v
					};
				return o ? i(s) : s
			}
			function w(e, n, i) {
				for (var o = 0, r = n.length; o < r; o++) t(e, n[o], i);
				return i
			}
			function x(e, t, n, i) {
				var o, r, s, a, l, c = p(e);
				if (!i && 1 === c.length) {
					if (r = c[0] = c[0].slice(0), r.length > 2 && "ID" === (s = r[0]).type && C.getById && 9 === t.nodeType && L && k.relative[r[1].type]) {
						if (t = (k.find.ID(s.matches[0].replace(xe, Te), t) || [])[0], !t) return n;
						e = e.slice(r.shift().value.length)
					}
					for (o = fe.needsContext.test(e) ? 0 : r.length; o-- && (s = r[o], !k.relative[a = s.type]);) if ((l = k.find[a]) && (i = l(s.matches[0].replace(xe, Te), be.test(r[0].type) && d(t.parentNode) || t))) {
						if (r.splice(o, 1), e = i.length && h(r), !e) return Z.apply(n, i), n;
						break
					}
				}
				return E(e, c)(i, t, !L, n, be.test(e) && d(t.parentNode) || t), n
			}
			var T, C, k, S, _, E, $, A, N, j, D, H, L, M, O, P, q, I = "sizzle" + -new Date,
				F = e.document,
				z = 0,
				W = 0,
				B = n(),
				R = n(),
				U = n(),
				X = function(e, t) {
					return e === t && (N = !0), 0
				},
				Q = "undefined",
				V = 1 << 31,
				G = {}.hasOwnProperty,
				Y = [],
				K = Y.pop,
				J = Y.push,
				Z = Y.push,
				ee = Y.slice,
				te = Y.indexOf ||
			function(e) {
				for (var t = 0, n = this.length; t < n; t++) if (this[t] === e) return t;
				return -1
			}, ne = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ie = "[\\x20\\t\\r\\n\\f]", oe = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", re = oe.replace("w", "w#"), se = "\\[" + ie + "*(" + oe + ")" + ie + "*(?:([*^$|!~]?=)" + ie + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + re + ")|)|)" + ie + "*\\]", ae = ":(" + oe + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + se.replace(3, 8) + ")*)|.*)\\)|)", le = new RegExp("^" + ie + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ie + "+$", "g"), ce = new RegExp("^" + ie + "*," + ie + "*"), de = new RegExp("^" + ie + "*([>+~]|" + ie + ")" + ie + "*"), ue = new RegExp("=" + ie + "*([^\\]'\"]*?)" + ie + "*\\]", "g"), pe = new RegExp(ae), he = new RegExp("^" + re + "$"), fe = {
				ID: new RegExp("^#(" + oe + ")"),
				CLASS: new RegExp("^\\.(" + oe + ")"),
				TAG: new RegExp("^(" + oe.replace("w", "w*") + ")"),
				ATTR: new RegExp("^" + se),
				PSEUDO: new RegExp("^" + ae),
				CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ie + "*(even|odd|(([+-]|)(\\d*)n|)" + ie + "*(?:([+-]|)" + ie + "*(\\d+)|))" + ie + "*\\)|)", "i"),
				bool: new RegExp("^(?:" + ne + ")$", "i"),
				needsContext: new RegExp("^" + ie + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ie + "*((?:-\\d)?\\d*)" + ie + "*\\)|)(?=[^-]|$)", "i")
			}, ve = /^(?:input|select|textarea|button)$/i, me = /^h\d$/i, ge = /^[^{]+\{\s*\[native \w/, ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, be = /[+~]/, we = /'|\\/g, xe = new RegExp("\\\\([\\da-f]{1,6}" + ie + "?|(" + ie + ")|.)", "ig"), Te = function(e, t, n) {
				var i = "0x" + t - 65536;
				return i !== i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
			};
			try {
				Z.apply(Y = ee.call(F.childNodes), F.childNodes), Y[F.childNodes.length].nodeType
			} catch (Ce) {
				Z = {
					apply: Y.length ?
					function(e, t) {
						J.apply(e, ee.call(t))
					} : function(e, t) {
						for (var n = e.length, i = 0; e[n++] = t[i++];);
						e.length = n - 1
					}
				}
			}
			C = t.support = {}, _ = t.isXML = function(e) {
				var t = e && (e.ownerDocument || e).documentElement;
				return !!t && "HTML" !== t.nodeName
			}, j = t.setDocument = function(e) {
				var t, n = e ? e.ownerDocument || e : F,
					i = n.defaultView;
				return n !== D && 9 === n.nodeType && n.documentElement ? (D = n, H = n.documentElement, L = !_(n), i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", function() {
					j()
				}, !1) : i.attachEvent && i.attachEvent("onunload", function() {
					j()
				})), C.attributes = o(function(e) {
					return e.className = "i", !e.getAttribute("className")
				}), C.getElementsByTagName = o(function(e) {
					return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
				}), C.getElementsByClassName = ge.test(n.getElementsByClassName) && o(function(e) {
					return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
				}), C.getById = o(function(e) {
					return H.appendChild(e).id = I, !n.getElementsByName || !n.getElementsByName(I).length
				}), C.getById ? (k.find.ID = function(e, t) {
					if (typeof t.getElementById !== Q && L) {
						var n = t.getElementById(e);
						return n && n.parentNode ? [n] : []
					}
				}, k.filter.ID = function(e) {
					var t = e.replace(xe, Te);
					return function(e) {
						return e.getAttribute("id") === t
					}
				}) : (delete k.find.ID, k.filter.ID = function(e) {
					var t = e.replace(xe, Te);
					return function(e) {
						var n = typeof e.getAttributeNode !== Q && e.getAttributeNode("id");
						return n && n.value === t
					}
				}), k.find.TAG = C.getElementsByTagName ?
				function(e, t) {
					if (typeof t.getElementsByTagName !== Q) return t.getElementsByTagName(e)
				} : function(e, t) {
					var n, i = [],
						o = 0,
						r = t.getElementsByTagName(e);
					if ("*" === e) {
						for (; n = r[o++];) 1 === n.nodeType && i.push(n);
						return i
					}
					return r
				}, k.find.CLASS = C.getElementsByClassName &&
				function(e, t) {
					if (typeof t.getElementsByClassName !== Q && L) return t.getElementsByClassName(e)
				}, O = [], M = [], (C.qsa = ge.test(n.querySelectorAll)) && (o(function(e) {
					e.innerHTML = "<select t=''><option selected=''></option></select>", e.querySelectorAll("[t^='']").length && M.push("[*^$]=" + ie + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || M.push("\\[" + ie + "*(?:value|" + ne + ")"), e.querySelectorAll(":checked").length || M.push(":checked")
				}), o(function(e) {
					var t = n.createElement("input");
					t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && M.push("name" + ie + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || M.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), M.push(",.*:")
				})), (C.matchesSelector = ge.test(P = H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && o(function(e) {
					C.disconnectedMatch = P.call(e, "div"), P.call(e, "[s!='']:x"), O.push("!=", ae)
				}), M = M.length && new RegExp(M.join("|")), O = O.length && new RegExp(O.join("|")), t = ge.test(H.compareDocumentPosition), q = t || ge.test(H.contains) ?
				function(e, t) {
					var n = 9 === e.nodeType ? e.documentElement : e,
						i = t && t.parentNode;
					return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
				} : function(e, t) {
					if (t) for (; t = t.parentNode;) if (t === e) return !0;
					return !1
				}, X = t ?
				function(e, t) {
					if (e === t) return N = !0, 0;
					var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
					return i ? i : (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & i || !C.sortDetached && t.compareDocumentPosition(e) === i ? e === n || e.ownerDocument === F && q(F, e) ? -1 : t === n || t.ownerDocument === F && q(F, t) ? 1 : A ? te.call(A, e) - te.call(A, t) : 0 : 4 & i ? -1 : 1)
				} : function(e, t) {
					if (e === t) return N = !0, 0;
					var i, o = 0,
						r = e.parentNode,
						a = t.parentNode,
						l = [e],
						c = [t];
					if (!r || !a) return e === n ? -1 : t === n ? 1 : r ? -1 : a ? 1 : A ? te.call(A, e) - te.call(A, t) : 0;
					if (r === a) return s(e, t);
					for (i = e; i = i.parentNode;) l.unshift(i);
					for (i = t; i = i.parentNode;) c.unshift(i);
					for (; l[o] === c[o];) o++;
					return o ? s(l[o], c[o]) : l[o] === F ? -1 : c[o] === F ? 1 : 0
				}, n) : D
			}, t.matches = function(e, n) {
				return t(e, null, null, n)
			}, t.matchesSelector = function(e, n) {
				if ((e.ownerDocument || e) !== D && j(e), n = n.replace(ue, "='$1']"), C.matchesSelector && L && (!O || !O.test(n)) && (!M || !M.test(n))) try {
					var i = P.call(e, n);
					if (i || C.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
				} catch (o) {}
				return t(n, D, null, [e]).length > 0
			}, t.contains = function(e, t) {
				return (e.ownerDocument || e) !== D && j(e), q(e, t)
			}, t.attr = function(e, t) {
				(e.ownerDocument || e) !== D && j(e);
				var n = k.attrHandle[t.toLowerCase()],
					i = n && G.call(k.attrHandle, t.toLowerCase()) ? n(e, t, !L) : void 0;
				return void 0 !== i ? i : C.attributes || !L ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
			}, t.error = function(e) {
				throw new Error("Syntax error, unrecognized expression: " + e)
			}, t.uniqueSort = function(e) {
				var t, n = [],
					i = 0,
					o = 0;
				if (N = !C.detectDuplicates, A = !C.sortStable && e.slice(0), e.sort(X), N) {
					for (; t = e[o++];) t === e[o] && (i = n.push(o));
					for (; i--;) e.splice(n[i], 1)
				}
				return A = null, e
			}, S = t.getText = function(e) {
				var t, n = "",
					i = 0,
					o = e.nodeType;
				if (o) {
					if (1 === o || 9 === o || 11 === o) {
						if ("string" == typeof e.textContent) return e.textContent;
						for (e = e.firstChild; e; e = e.nextSibling) n += S(e)
					} else if (3 === o || 4 === o) return e.nodeValue
				} else for (; t = e[i++];) n += S(t);
				return n
			}, k = t.selectors = {
				cacheLength: 50,
				createPseudo: i,
				match: fe,
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
					ATTR: function(e) {
						return e[1] = e[1].replace(xe, Te), e[3] = (e[4] || e[5] || "").replace(xe, Te), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
					},
					CHILD: function(e) {
						return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
					},
					PSEUDO: function(e) {
						var t, n = !e[5] && e[2];
						return fe.CHILD.test(e[0]) ? null : (e[3] && void 0 !== e[4] ? e[2] = e[4] : n && pe.test(n) && (t = p(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
					}
				},
				filter: {
					TAG: function(e) {
						var t = e.replace(xe, Te).toLowerCase();
						return "*" === e ?
						function() {
							return !0
						} : function(e) {
							return e.nodeName && e.nodeName.toLowerCase() === t
						}
					},
					CLASS: function(e) {
						var t = B[e + " "];
						return t || (t = new RegExp("(^|" + ie + ")" + e + "(" + ie + "|$)")) && B(e, function(e) {
							return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== Q && e.getAttribute("class") || "")
						})
					},
					ATTR: function(e, n, i) {
						return function(o) {
							var r = t.attr(o, e);
							return null == r ? "!=" === n : !n || (r += "", "=" === n ? r === i : "!=" === n ? r !== i : "^=" === n ? i && 0 === r.indexOf(i) : "*=" === n ? i && r.indexOf(i) > -1 : "$=" === n ? i && r.slice(-i.length) === i : "~=" === n ? (" " + r + " ").indexOf(i) > -1 : "|=" === n && (r === i || r.slice(0, i.length + 1) === i + "-"))
						}
					},
					CHILD: function(e, t, n, i, o) {
						var r = "nth" !== e.slice(0, 3),
							s = "last" !== e.slice(-4),
							a = "of-type" === t;
						return 1 === i && 0 === o ?
						function(e) {
							return !!e.parentNode
						} : function(t, n, l) {
							var c, d, u, p, h, f, v = r !== s ? "nextSibling" : "previousSibling",
								m = t.parentNode,
								g = a && t.nodeName.toLowerCase(),
								y = !l && !a;
							if (m) {
								if (r) {
									for (; v;) {
										for (u = t; u = u[v];) if (a ? u.nodeName.toLowerCase() === g : 1 === u.nodeType) return !1;
										f = v = "only" === e && !f && "nextSibling"
									}
									return !0
								}
								if (f = [s ? m.firstChild : m.lastChild], s && y) {
									for (d = m[I] || (m[I] = {}), c = d[e] || [], h = c[0] === z && c[1], p = c[0] === z && c[2], u = h && m.childNodes[h]; u = ++h && u && u[v] || (p = h = 0) || f.pop();) if (1 === u.nodeType && ++p && u === t) {
										d[e] = [z, h, p];
										break
									}
								} else if (y && (c = (t[I] || (t[I] = {}))[e]) && c[0] === z) p = c[1];
								else for (;
								(u = ++h && u && u[v] || (p = h = 0) || f.pop()) && ((a ? u.nodeName.toLowerCase() !== g : 1 !== u.nodeType) || !++p || (y && ((u[I] || (u[I] = {}))[e] = [z, p]), u !== t)););
								return p -= o, p === i || p % i === 0 && p / i >= 0
							}
						}
					},
					PSEUDO: function(e, n) {
						var o, r = k.pseudos[e] || k.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
						return r[I] ? r(n) : r.length > 1 ? (o = [e, e, "", n], k.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
							for (var i, o = r(e, n), s = o.length; s--;) i = te.call(e, o[s]), e[i] = !(t[i] = o[s])
						}) : function(e) {
							return r(e, 0, o)
						}) : r
					}
				},
				pseudos: {
					not: i(function(e) {
						var t = [],
							n = [],
							o = E(e.replace(le, "$1"));
						return o[I] ? i(function(e, t, n, i) {
							for (var r, s = o(e, null, i, []), a = e.length; a--;)(r = s[a]) && (e[a] = !(t[a] = r))
						}) : function(e, i, r) {
							return t[0] = e, o(t, null, r, n), !n.pop()
						}
					}),
					has: i(function(e) {
						return function(n) {
							return t(e, n).length > 0
						}
					}),
					contains: i(function(e) {
						return function(t) {
							return (t.textContent || t.innerText || S(t)).indexOf(e) > -1
						}
					}),
					lang: i(function(e) {
						return he.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(xe, Te).toLowerCase(), function(t) {
							var n;
							do
							if (n = L ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
							while ((t = t.parentNode) && 1 === t.nodeType);
							return !1
						}
					}),
					target: function(t) {
						var n = e.location && e.location.hash;
						return n && n.slice(1) === t.id
					},
					root: function(e) {
						return e === H
					},
					focus: function(e) {
						return e === D.activeElement && (!D.hasFocus || D.hasFocus()) && !! (e.type || e.href || ~e.tabIndex)
					},
					enabled: function(e) {
						return e.disabled === !1
					},
					disabled: function(e) {
						return e.disabled === !0
					},
					checked: function(e) {
						var t = e.nodeName.toLowerCase();
						return "input" === t && !! e.checked || "option" === t && !! e.selected
					},
					selected: function(e) {
						return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
					},
					empty: function(e) {
						for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
						return !0
					},
					parent: function(e) {
						return !k.pseudos.empty(e)
					},
					header: function(e) {
						return me.test(e.nodeName)
					},
					input: function(e) {
						return ve.test(e.nodeName)
					},
					button: function(e) {
						var t = e.nodeName.toLowerCase();
						return "input" === t && "button" === e.type || "button" === t
					},
					text: function(e) {
						var t;
						return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
					},
					first: c(function() {
						return [0]
					}),
					last: c(function(e, t) {
						return [t - 1]
					}),
					eq: c(function(e, t, n) {
						return [n < 0 ? n + t : n]
					}),
					even: c(function(e, t) {
						for (var n = 0; n < t; n += 2) e.push(n);
						return e
					}),
					odd: c(function(e, t) {
						for (var n = 1; n < t; n += 2) e.push(n);
						return e
					}),
					lt: c(function(e, t, n) {
						for (var i = n < 0 ? n + t : n; --i >= 0;) e.push(i);
						return e
					}),
					gt: c(function(e, t, n) {
						for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
						return e
					})
				}
			}, k.pseudos.nth = k.pseudos.eq;
			for (T in {
				radio: !0,
				checkbox: !0,
				file: !0,
				password: !0,
				image: !0
			}) k.pseudos[T] = a(T);
			for (T in {
				submit: !0,
				reset: !0
			}) k.pseudos[T] = l(T);
			return u.prototype = k.filters = k.pseudos, k.setFilters = new u, E = t.compile = function(e, t) {
				var n, i = [],
					o = [],
					r = U[e + " "];
				if (!r) {
					for (t || (t = p(e)), n = t.length; n--;) r = y(t[n]), r[I] ? i.push(r) : o.push(r);
					r = U(e, b(o, i))
				}
				return r
			}, C.sortStable = I.split("").sort(X).join("") === I, C.detectDuplicates = !! N, j(), C.sortDetached = o(function(e) {
				return 1 & e.compareDocumentPosition(D.createElement("div"))
			}), o(function(e) {
				return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
			}) || r("type|href|height|width", function(e, t, n) {
				if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
			}), C.attributes && o(function(e) {
				return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
			}) || r("value", function(e, t, n) {
				if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
			}), o(function(e) {
				return null == e.getAttribute("disabled")
			}) || r(ne, function(e, t, n) {
				var i;
				if (!n) return e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
			}), t
		}(e);
	re.find = de, re.expr = de.selectors, re.expr[":"] = re.expr.pseudos, re.unique = de.uniqueSort, re.text = de.getText, re.isXMLDoc = de.isXML, re.contains = de.contains;
	var ue = re.expr.match.needsContext,
		pe = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		he = /^.[^:#\[\.,]*$/;
	re.filter = function(e, t, n) {
		var i = t[0];
		return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? re.find.matchesSelector(i, e) ? [i] : [] : re.find.matches(e, re.grep(t, function(e) {
			return 1 === e.nodeType
		}))
	}, re.fn.extend({
		find: function(e) {
			var t, n = [],
				i = this,
				o = i.length;
			if ("string" != typeof e) return this.pushStack(re(e).filter(function() {
				for (t = 0; t < o; t++) if (re.contains(i[t], this)) return !0
			}));
			for (t = 0; t < o; t++) re.find(e, i[t], n);
			return n = this.pushStack(o > 1 ? re.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
		},
		filter: function(e) {
			return this.pushStack(i(this, e || [], !1))
		},
		not: function(e) {
			return this.pushStack(i(this, e || [], !0))
		},
		is: function(e) {
			return !!i(this, "string" == typeof e && ue.test(e) ? re(e) : e || [], !1).length
		}
	});
	var fe, ve = e.document,
		me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		ge = re.fn.init = function(e, t) {
			var n, i;
			if (!e) return this;
			if ("string" == typeof e) {
				if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : me.exec(e), !n || !n[1] && t) return !t || t.jquery ? (t || fe).find(e) : this.constructor(t).find(e);
				if (n[1]) {
					if (t = t instanceof re ? t[0] : t, re.merge(this, re.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : ve, !0)), pe.test(n[1]) && re.isPlainObject(t)) for (n in t) re.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
					return this
				}
				if (i = ve.getElementById(n[2]), i && i.parentNode) {
					if (i.id !== n[2]) return fe.find(e);
					this.length = 1, this[0] = i
				}
				return this.context = ve, this.selector = e, this
			}
			return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : re.isFunction(e) ? "undefined" != typeof fe.ready ? fe.ready(e) : e(re) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), re.makeArray(e, this))
		};
	ge.prototype = re.fn, fe = re(ve);
	var ye = /^(?:parents|prev(?:Until|All))/,
		be = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	re.extend({
		dir: function(e, t, n) {
			for (var i = [], o = e[t]; o && 9 !== o.nodeType && (void 0 === n || 1 !== o.nodeType || !re(o).is(n));) 1 === o.nodeType && i.push(o), o = o[t];
			return i
		},
		sibling: function(e, t) {
			for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
			return n
		}
	}), re.fn.extend({
		has: function(e) {
			var t, n = re(e, this),
				i = n.length;
			return this.filter(function() {
				for (t = 0; t < i; t++) if (re.contains(this, n[t])) return !0
			})
		},
		closest: function(e, t) {
			for (var n, i = 0, o = this.length, r = [], s = ue.test(e) || "string" != typeof e ? re(e, t || this.context) : 0; i < o; i++) for (n = this[i]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && re.find.matchesSelector(n, e))) {
				r.push(n);
				break
			}
			return this.pushStack(r.length > 1 ? re.unique(r) : r)
		},
		index: function(e) {
			return e ? "string" == typeof e ? re.inArray(this[0], re(e)) : re.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function(e, t) {
			return this.pushStack(re.unique(re.merge(this.get(), re(e, t))))
		},
		addBack: function(e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
		}
	}), re.each({
		parent: function(e) {
			var t = e.parentNode;
			return t && 11 !== t.nodeType ? t : null
		},
		parents: function(e) {
			return re.dir(e, "parentNode")
		},
		parentsUntil: function(e, t, n) {
			return re.dir(e, "parentNode", n)
		},
		next: function(e) {
			return o(e, "nextSibling")
		},
		prev: function(e) {
			return o(e, "previousSibling")
		},
		nextAll: function(e) {
			return re.dir(e, "nextSibling")
		},
		prevAll: function(e) {
			return re.dir(e, "previousSibling")
		},
		nextUntil: function(e, t, n) {
			return re.dir(e, "nextSibling", n)
		},
		prevUntil: function(e, t, n) {
			return re.dir(e, "previousSibling", n)
		},
		siblings: function(e) {
			return re.sibling((e.parentNode || {}).firstChild, e)
		},
		children: function(e) {
			return re.sibling(e.firstChild)
		},
		contents: function(e) {
			return re.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : re.merge([], e.childNodes)
		}
	}, function(e, t) {
		re.fn[e] = function(n, i) {
			var o = re.map(this, t, n);
			return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = re.filter(i, o)), this.length > 1 && (be[e] || (o = re.unique(o)), ye.test(e) && (o = o.reverse())), this.pushStack(o)
		}
	});
	var we = /\S+/g,
		xe = {};
	re.Callbacks = function(e) {
		e = "string" == typeof e ? xe[e] || r(e) : re.extend({}, e);
		var t, n, i, o, s, a, l = [],
			c = !e.once && [],
			d = function(r) {
				for (n = e.memory && r, i = !0, s = a || 0, a = 0, o = l.length, t = !0; l && s < o; s++) if (l[s].apply(r[0], r[1]) === !1 && e.stopOnFalse) {
					n = !1;
					break
				}
				t = !1, l && (c ? c.length && d(c.shift()) : n ? l = [] : u.disable())
			},
			u = {
				add: function() {
					if (l) {
						var i = l.length;
						!
						function r(t) {
							re.each(t, function(t, n) {
								var i = re.type(n);
								"function" === i ? e.unique && u.has(n) || l.push(n) : n && n.length && "string" !== i && r(n)
							})
						}(arguments), t ? o = l.length : n && (a = i, d(n))
					}
					return this
				},
				remove: function() {
					return l && re.each(arguments, function(e, n) {
						for (var i;
						(i = re.inArray(n, l, i)) > -1;) l.splice(i, 1), t && (i <= o && o--, i <= s && s--)
					}), this
				},
				has: function(e) {
					return e ? re.inArray(e, l) > -1 : !(!l || !l.length)
				},
				empty: function() {
					return l = [], o = 0, this
				},
				disable: function() {
					return l = c = n = void 0, this
				},
				disabled: function() {
					return !l
				},
				lock: function() {
					return c = void 0, n || u.disable(), this
				},
				locked: function() {
					return !c
				},
				fireWith: function(e, n) {
					return !l || i && !c || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? c.push(n) : d(n)), this
				},
				fire: function() {
					return u.fireWith(this, arguments), this
				},
				fired: function() {
					return !!i
				}
			};
		return u
	}, re.extend({
		Deferred: function(e) {
			var t = [
				["resolve", "done", re.Callbacks("once memory"), "resolved"],
				["reject", "fail", re.Callbacks("once memory"), "rejected"],
				["notify", "progress", re.Callbacks("memory")]
			],
				n = "pending",
				i = {
					state: function() {
						return n
					},
					always: function() {
						return o.done(arguments).fail(arguments), this
					},
					then: function() {
						var e = arguments;
						return re.Deferred(function(n) {
							re.each(t, function(t, r) {
								var s = re.isFunction(e[t]) && e[t];
								o[r[1]](function() {
									var e = s && s.apply(this, arguments);
									e && re.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[r[0] + "With"](this === i ? n.promise() : this, s ? [e] : arguments)
								})
							}), e = null
						}).promise()
					},
					promise: function(e) {
						return null != e ? re.extend(e, i) : i
					}
				},
				o = {};
			return i.pipe = i.then, re.each(t, function(e, r) {
				var s = r[2],
					a = r[3];
				i[r[1]] = s.add, a && s.add(function() {
					n = a
				}, t[1 ^ e][2].disable, t[2][2].lock), o[r[0]] = function() {
					return o[r[0] + "With"](this === o ? i : this, arguments), this
				}, o[r[0] + "With"] = s.fireWith
			}), i.promise(o), e && e.call(o, o), o
		},
		when: function(e) {
			var t, n, i, o = 0,
				r = G.call(arguments),
				s = r.length,
				a = 1 !== s || e && re.isFunction(e.promise) ? s : 0,
				l = 1 === a ? e : re.Deferred(),
				c = function(e, n, i) {
					return function(o) {
						n[e] = this, i[e] = arguments.length > 1 ? G.call(arguments) : o, i === t ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
					}
				};
			if (s > 1) for (t = new Array(s), n = new Array(s), i = new Array(s); o < s; o++) r[o] && re.isFunction(r[o].promise) ? r[o].promise().done(c(o, i, r)).fail(l.reject).progress(c(o, n, t)) : --a;
			return a || l.resolveWith(i, r), l.promise()
		}
	});
	var Te;
	re.fn.ready = function(e) {
		return re.ready.promise().done(e), this
	}, re.extend({
		isReady: !1,
		readyWait: 1,
		holdReady: function(e) {
			e ? re.readyWait++ : re.ready(!0)
		},
		ready: function(e) {
			if (e === !0 ? !--re.readyWait : !re.isReady) {
				if (!ve.body) return setTimeout(re.ready);
				re.isReady = !0, e !== !0 && --re.readyWait > 0 || (Te.resolveWith(ve, [re]), re.fn.trigger && re(ve).trigger("ready").off("ready"))
			}
		}
	}), re.ready.promise = function(t) {
		if (!Te) if (Te = re.Deferred(), "complete" === ve.readyState) setTimeout(re.ready);
		else if (ve.addEventListener) ve.addEventListener("DOMContentLoaded", a, !1), e.addEventListener("load", a, !1);
		else {
			ve.attachEvent("onreadystatechange", a), e.attachEvent("onload", a);
			var n = !1;
			try {
				n = null == e.frameElement && ve.documentElement
			} catch (i) {}
			n && n.doScroll && !
			function o() {
				if (!re.isReady) {
					try {
						n.doScroll("left")
					} catch (e) {
						return setTimeout(o, 50)
					}
					s(), re.ready()
				}
			}()
		}
		return Te.promise(t)
	};
	var Ce, ke = "undefined";
	for (Ce in re(ie)) break;
	ie.ownLast = "0" !== Ce, ie.inlineBlockNeedsLayout = !1, re(function() {
		var e, t, n = ve.getElementsByTagName("body")[0];
		n && (e = ve.createElement("div"), e.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", t = ve.createElement("div"), n.appendChild(e).appendChild(t), typeof t.style.zoom !== ke && (t.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1", (ie.inlineBlockNeedsLayout = 3 === t.offsetWidth) && (n.style.zoom = 1)), n.removeChild(e), e = t = null)
	}), function() {
		var e = ve.createElement("div");
		if (null == ie.deleteExpando) {
			ie.deleteExpando = !0;
			try {
				delete e.test
			} catch (t) {
				ie.deleteExpando = !1
			}
		}
		e = null
	}(), re.acceptData = function(e) {
		var t = re.noData[(e.nodeName + " ").toLowerCase()],
			n = +e.nodeType || 1;
		return (1 === n || 9 === n) && (!t || t !== !0 && e.getAttribute("classid") === t)
	};
	var Se = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		_e = /([A-Z])/g;
	re.extend({
		cache: {},
		noData: {
			"applet ": !0,
			"embed ": !0,
			"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
		},
		hasData: function(e) {
			return e = e.nodeType ? re.cache[e[re.expando]] : e[re.expando], !! e && !c(e)
		},
		data: function(e, t, n) {
			return d(e, t, n)
		},
		removeData: function(e, t) {
			return u(e, t)
		},
		_data: function(e, t, n) {
			return d(e, t, n, !0)
		},
		_removeData: function(e, t) {
			return u(e, t, !0)
		}
	}), re.fn.extend({
		data: function(e, t) {
			var n, i, o, r = this[0],
				s = r && r.attributes;
			if (void 0 === e) {
				if (this.length && (o = re.data(r), 1 === r.nodeType && !re._data(r, "parsedAttrs"))) {
					for (n = s.length; n--;) i = s[n].name, 0 === i.indexOf("data-") && (i = re.camelCase(i.slice(5)), l(r, i, o[i]));
					re._data(r, "parsedAttrs", !0)
				}
				return o
			}
			return "object" == typeof e ? this.each(function() {
				re.data(this, e)
			}) : arguments.length > 1 ? this.each(function() {
				re.data(this, e, t)
			}) : r ? l(r, e, re.data(r, e)) : void 0
		},
		removeData: function(e) {
			return this.each(function() {
				re.removeData(this, e)
			})
		}
	}), re.extend({
		queue: function(e, t, n) {
			var i;
			if (e) return t = (t || "fx") + "queue", i = re._data(e, t), n && (!i || re.isArray(n) ? i = re._data(e, t, re.makeArray(n)) : i.push(n)), i || []
		},
		dequeue: function(e, t) {
			t = t || "fx";
			var n = re.queue(e, t),
				i = n.length,
				o = n.shift(),
				r = re._queueHooks(e, t),
				s = function() {
					re.dequeue(e, t)
				};
			"inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, s, r)), !i && r && r.empty.fire()
		},
		_queueHooks: function(e, t) {
			var n = t + "queueHooks";
			return re._data(e, n) || re._data(e, n, {
				empty: re.Callbacks("once memory").add(function() {
					re._removeData(e, t + "queue"), re._removeData(e, n)
				})
			})
		}
	}), re.fn.extend({
		queue: function(e, t) {
			var n = 2;
			return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? re.queue(this[0], e) : void 0 === t ? this : this.each(function() {
				var n = re.queue(this, e, t);
				re._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && re.dequeue(this, e)
			})
		},
		dequeue: function(e) {
			return this.each(function() {
				re.dequeue(this, e)
			})
		},
		clearQueue: function(e) {
			return this.queue(e || "fx", [])
		},
		promise: function(e, t) {
			var n, i = 1,
				o = re.Deferred(),
				r = this,
				s = this.length,
				a = function() {
					--i || o.resolveWith(r, [r])
				};
			for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;) n = re._data(r[s], e + "queueHooks"), n && n.empty && (i++, n.empty.add(a));
			return a(), o.promise(t)
		}
	});
	var Ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		$e = ["Top", "Right", "Bottom", "Left"],
		Ae = function(e, t) {
			return e = t || e, "none" === re.css(e, "display") || !re.contains(e.ownerDocument, e)
		},
		Ne = re.access = function(e, t, n, i, o, r, s) {
			var a = 0,
				l = e.length,
				c = null == n;
			if ("object" === re.type(n)) {
				o = !0;
				for (a in n) re.access(e, t, a, n[a], !0, r, s)
			} else if (void 0 !== i && (o = !0, re.isFunction(i) || (s = !0), c && (s ? (t.call(e, i), t = null) : (c = t, t = function(e, t, n) {
				return c.call(re(e), n)
			})), t)) for (; a < l; a++) t(e[a], n, s ? i : i.call(e[a], a, t(e[a], n)));
			return o ? e : c ? t.call(e) : l ? t(e[0], n) : r
		},
		je = /^(?:checkbox|radio)$/i;
	!
	function() {
		var e = ve.createDocumentFragment(),
			t = ve.createElement("div"),
			n = ve.createElement("input");
		if (t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a>", ie.leadingWhitespace = 3 === t.firstChild.nodeType, ie.tbody = !t.getElementsByTagName("tbody").length, ie.htmlSerialize = !! t.getElementsByTagName("link").length, ie.html5Clone = "<:nav></:nav>" !== ve.createElement("nav").cloneNode(!0).outerHTML, n.type = "checkbox", n.checked = !0, e.appendChild(n), ie.appendChecked = n.checked, t.innerHTML = "<textarea>x</textarea>", ie.noCloneChecked = !! t.cloneNode(!0).lastChild.defaultValue, e.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", ie.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, ie.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function() {
			ie.noCloneEvent = !1
		}), t.cloneNode(!0).click()), null == ie.deleteExpando) {
			ie.deleteExpando = !0;
			try {
				delete t.test
			} catch (i) {
				ie.deleteExpando = !1
			}
		}
		e = t = n = null
	}(), function() {
		var t, n, i = ve.createElement("div");
		for (t in {
			submit: !0,
			change: !0,
			focusin: !0
		}) n = "on" + t, (ie[t + "Bubbles"] = n in e) || (i.setAttribute(n, "t"), ie[t + "Bubbles"] = i.attributes[n].expando === !1);
		i = null
	}();
	var De = /^(?:input|select|textarea)$/i,
		He = /^key/,
		Le = /^(?:mouse|contextmenu)|click/,
		Me = /^(?:focusinfocus|focusoutblur)$/,
		Oe = /^([^.]*)(?:\.(.+)|)$/;
	re.event = {
		global: {},
		add: function(e, t, n, i, o) {
			var r, s, a, l, c, d, u, p, h, f, v, m = re._data(e);
			if (m) {
				for (n.handler && (l = n, n = l.handler, o = l.selector), n.guid || (n.guid = re.guid++), (s = m.events) || (s = m.events = {}), (d = m.handle) || (d = m.handle = function(e) {
					return typeof re === ke || e && re.event.triggered === e.type ? void 0 : re.event.dispatch.apply(d.elem, arguments)
				}, d.elem = e), t = (t || "").match(we) || [""], a = t.length; a--;) r = Oe.exec(t[a]) || [], h = v = r[1], f = (r[2] || "").split(".").sort(), h && (c = re.event.special[h] || {}, h = (o ? c.delegateType : c.bindType) || h, c = re.event.special[h] || {}, u = re.extend({
					type: h,
					origType: v,
					data: i,
					handler: n,
					guid: n.guid,
					selector: o,
					needsContext: o && re.expr.match.needsContext.test(o),
					namespace: f.join(".")
				}, l), (p = s[h]) || (p = s[h] = [], p.delegateCount = 0, c.setup && c.setup.call(e, i, f, d) !== !1 || (e.addEventListener ? e.addEventListener(h, d, !1) : e.attachEvent && e.attachEvent("on" + h, d))), c.add && (c.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, u) : p.push(u), re.event.global[h] = !0);
				e = null
			}
		},
		remove: function(e, t, n, i, o) {
			var r, s, a, l, c, d, u, p, h, f, v, m = re.hasData(e) && re._data(e);
			if (m && (d = m.events)) {
				for (t = (t || "").match(we) || [""], c = t.length; c--;) if (a = Oe.exec(t[c]) || [], h = v = a[1], f = (a[2] || "").split(".").sort(), h) {
					for (u = re.event.special[h] || {}, h = (i ? u.delegateType : u.bindType) || h, p = d[h] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = r = p.length; r--;) s = p[r], !o && v !== s.origType || n && n.guid !== s.guid || a && !a.test(s.namespace) || i && i !== s.selector && ("**" !== i || !s.selector) || (p.splice(r, 1), s.selector && p.delegateCount--, u.remove && u.remove.call(e, s));
					l && !p.length && (u.teardown && u.teardown.call(e, f, m.handle) !== !1 || re.removeEvent(e, h, m.handle), delete d[h])
				} else for (h in d) re.event.remove(e, h + t[c], n, i, !0);
				re.isEmptyObject(d) && (delete m.handle, re._removeData(e, "events"))
			}
		},
		trigger: function(t, n, i, o) {
			var r, s, a, l, c, d, u, p = [i || ve],
				h = te.call(t, "type") ? t.type : t,
				f = te.call(t, "namespace") ? t.namespace.split(".") : [];
			if (a = d = i = i || ve, 3 !== i.nodeType && 8 !== i.nodeType && !Me.test(h + re.event.triggered) && (h.indexOf(".") >= 0 && (f = h.split("."), h = f.shift(), f.sort()), s = h.indexOf(":") < 0 && "on" + h, t = t[re.expando] ? t : new re.Event(h, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = f.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : re.makeArray(n, [t]), c = re.event.special[h] || {}, o || !c.trigger || c.trigger.apply(i, n) !== !1)) {
				if (!o && !c.noBubble && !re.isWindow(i)) {
					for (l = c.delegateType || h, Me.test(l + h) || (a = a.parentNode); a; a = a.parentNode) p.push(a), d = a;
					d === (i.ownerDocument || ve) && p.push(d.defaultView || d.parentWindow || e)
				}
				for (u = 0;
				(a = p[u++]) && !t.isPropagationStopped();) t.type = u > 1 ? l : c.bindType || h, r = (re._data(a, "events") || {})[t.type] && re._data(a, "handle"), r && r.apply(a, n), r = s && a[s], r && r.apply && re.acceptData(a) && (t.result = r.apply(a, n), t.result === !1 && t.preventDefault());
				if (t.type = h, !o && !t.isDefaultPrevented() && (!c._default || c._default.apply(p.pop(), n) === !1) && re.acceptData(i) && s && i[h] && !re.isWindow(i)) {
					d = i[s], d && (i[s] = null), re.event.triggered = h;
					try {
						i[h]()
					} catch (v) {}
					re.event.triggered = void 0, d && (i[s] = d)
				}
				return t.result
			}
		},
		dispatch: function(e) {
			e = re.event.fix(e);
			var t, n, i, o, r, s = [],
				a = G.call(arguments),
				l = (re._data(this, "events") || {})[e.type] || [],
				c = re.event.special[e.type] || {};
			if (a[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
				for (s = re.event.handlers.call(this, e, l), t = 0;
				(o = s[t++]) && !e.isPropagationStopped();) for (e.currentTarget = o.elem, r = 0;
				(i = o.handlers[r++]) && !e.isImmediatePropagationStopped();) e.namespace_re && !e.namespace_re.test(i.namespace) || (e.handleObj = i, e.data = i.data, n = ((re.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, a), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
				return c.postDispatch && c.postDispatch.call(this, e), e.result
			}
		},
		handlers: function(e, t) {
			var n, i, o, r, s = [],
				a = t.delegateCount,
				l = e.target;
			if (a && l.nodeType && (!e.button || "click" !== e.type)) for (; l != this; l = l.parentNode || this) if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
				for (o = [], r = 0; r < a; r++) i = t[r], n = i.selector + " ", void 0 === o[n] && (o[n] = i.needsContext ? re(n, this).index(l) >= 0 : re.find(n, this, null, [l]).length), o[n] && o.push(i);
				o.length && s.push({
					elem: l,
					handlers: o
				})
			}
			return a < t.length && s.push({
				elem: this,
				handlers: t.slice(a)
			}), s
		},
		fix: function(e) {
			if (e[re.expando]) return e;
			var t, n, i, o = e.type,
				r = e,
				s = this.fixHooks[o];
			for (s || (this.fixHooks[o] = s = Le.test(o) ? this.mouseHooks : He.test(o) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, e = new re.Event(r), t = i.length; t--;) n = i[t], e[n] = r[n];
			return e.target || (e.target = r.srcElement || ve), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !! e.metaKey, s.filter ? s.filter(e, r) : e
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(e, t) {
				return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(e, t) {
				var n, i, o, r = t.button,
					s = t.fromElement;
				return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || ve, o = i.documentElement, n = i.body, e.pageX = t.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o && o.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o && o.clientTop || n && n.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? t.toElement : s), e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), e
			}
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				trigger: function() {
					if (this !== f() && this.focus) try {
						return this.focus(), !1
					} catch (e) {}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if (this === f() && this.blur) return this.blur(), !1
				},
				delegateType: "focusout"
			},
			click: {
				trigger: function() {
					if (re.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1
				},
				_default: function(e) {
					return re.nodeName(e.target, "a")
				}
			},
			beforeunload: {
				postDispatch: function(e) {
					void 0 !== e.result && (e.originalEvent.returnValue = e.result)
				}
			}
		},
		simulate: function(e, t, n, i) {
			var o = re.extend(new re.Event, n, {
				type: e,
				isSimulated: !0,
				originalEvent: {}
			});
			i ? re.event.trigger(o, null, t) : re.event.dispatch.call(t, o), o.isDefaultPrevented() && n.preventDefault()
		}
	}, re.removeEvent = ve.removeEventListener ?
	function(e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n, !1)
	} : function(e, t, n) {
		var i = "on" + t;
		e.detachEvent && (typeof e[i] === ke && (e[i] = null), e.detachEvent(i, n))
	}, re.Event = function(e, t) {
		return this instanceof re.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && (e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault()) ? p : h) : this.type = e, t && re.extend(this, t), this.timeStamp = e && e.timeStamp || re.now(), void(this[re.expando] = !0)) : new re.Event(e, t)
	}, re.Event.prototype = {
		isDefaultPrevented: h,
		isPropagationStopped: h,
		isImmediatePropagationStopped: h,
		preventDefault: function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = p, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
		},
		stopPropagation: function() {
			var e = this.originalEvent;
			this.isPropagationStopped = p, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = p, this.stopPropagation()
		}
	}, re.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function(e, t) {
		re.event.special[e] = {
			delegateType: t,
			bindType: t,
			handle: function(e) {
				var n, i = this,
					o = e.relatedTarget,
					r = e.handleObj;
				return o && (o === i || re.contains(i, o)) || (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
			}
		}
	}), ie.submitBubbles || (re.event.special.submit = {
		setup: function() {
			return !re.nodeName(this, "form") && void re.event.add(this, "click._submit keypress._submit", function(e) {
				var t = e.target,
					n = re.nodeName(t, "input") || re.nodeName(t, "button") ? t.form : void 0;
				n && !re._data(n, "submitBubbles") && (re.event.add(n, "submit._submit", function(e) {
					e._submit_bubble = !0
				}), re._data(n, "submitBubbles", !0))
			})
		},
		postDispatch: function(e) {
			e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && re.event.simulate("submit", this.parentNode, e, !0))
		},
		teardown: function() {
			return !re.nodeName(this, "form") && void re.event.remove(this, "._submit")
		}
	}), ie.changeBubbles || (re.event.special.change = {
		setup: function() {
			return De.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (re.event.add(this, "propertychange._change", function(e) {
				"checked" === e.originalEvent.propertyName && (this._just_changed = !0)
			}), re.event.add(this, "click._change", function(e) {
				this._just_changed && !e.isTrigger && (this._just_changed = !1), re.event.simulate("change", this, e, !0)
			})), !1) : void re.event.add(this, "beforeactivate._change", function(e) {
				var t = e.target;
				De.test(t.nodeName) && !re._data(t, "changeBubbles") && (re.event.add(t, "change._change", function(e) {
					!this.parentNode || e.isSimulated || e.isTrigger || re.event.simulate("change", this.parentNode, e, !0)
				}), re._data(t, "changeBubbles", !0))
			})
		},
		handle: function(e) {
			var t = e.target;
			if (this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type) return e.handleObj.handler.apply(this, arguments)
		},
		teardown: function() {
			return re.event.remove(this, "._change"), !De.test(this.nodeName)
		}
	}), ie.focusinBubbles || re.each({
		focus: "focusin",
		blur: "focusout"
	}, function(e, t) {
		var n = function(e) {
				re.event.simulate(t, e.target, re.event.fix(e), !0)
			};
		re.event.special[t] = {
			setup: function() {
				var i = this.ownerDocument || this,
					o = re._data(i, t);
				o || i.addEventListener(e, n, !0), re._data(i, t, (o || 0) + 1)
			},
			teardown: function() {
				var i = this.ownerDocument || this,
					o = re._data(i, t) - 1;
				o ? re._data(i, t, o) : (i.removeEventListener(e, n, !0), re._removeData(i, t))
			}
		}
	}), re.fn.extend({
		on: function(e, t, n, i, o) {
			var r, s;
			if ("object" == typeof e) {
				"string" != typeof t && (n = n || t, t = void 0);
				for (r in e) this.on(r, t, n, e[r], o);
				return this
			}
			if (null == n && null == i ? (i = t, n = t = void 0) : null == i && ("string" == typeof t ? (i = n, n = void 0) : (i = n, n = t, t = void 0)), i === !1) i = h;
			else if (!i) return this;
			return 1 === o && (s = i, i = function(e) {
				return re().off(e), s.apply(this, arguments)
			}, i.guid = s.guid || (s.guid = re.guid++)), this.each(function() {
				re.event.add(this, e, i, n, t)
			})
		},
		one: function(e, t, n, i) {
			return this.on(e, t, n, i, 1)
		},
		off: function(e, t, n) {
			var i, o;
			if (e && e.preventDefault && e.handleObj) return i = e.handleObj, re(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
			if ("object" == typeof e) {
				for (o in e) this.off(o, t, e[o]);
				return this
			}
			return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = h), this.each(function() {
				re.event.remove(this, e, n, t)
			})
		},
		trigger: function(e, t) {
			return this.each(function() {
				re.event.trigger(e, t, this)
			})
		},
		triggerHandler: function(e, t) {
			var n = this[0];
			if (n) return re.event.trigger(e, t, n, !0)
		}
	});
	var Pe = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		qe = / jQuery\d+="(?:null|\d+)"/g,
		Ie = new RegExp("<(?:" + Pe + ")[\\s/>]", "i"),
		Fe = /^\s+/,
		ze = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		We = /<([\w:]+)/,
		Be = /<tbody/i,
		Re = /<|&#?\w+;/,
		Ue = /<(?:script|style|link)/i,
		Xe = /checked\s*(?:[^=]|=\s*.checked.)/i,
		Qe = /^$|\/(?:java|ecma)script/i,
		Ve = /^true\/(.*)/,
		Ge = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		Ye = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			area: [1, "<map>", "</map>"],
			param: [1, "<object>", "</object>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: ie.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
		},
		Ke = v(ve),
		Je = Ke.appendChild(ve.createElement("div"));
	Ye.optgroup = Ye.option, Ye.tbody = Ye.tfoot = Ye.colgroup = Ye.caption = Ye.thead, Ye.th = Ye.td, re.extend({
		clone: function(e, t, n) {
			var i, o, r, s, a, l = re.contains(e.ownerDocument, e);
			if (ie.html5Clone || re.isXMLDoc(e) || !Ie.test("<" + e.nodeName + ">") ? r = e.cloneNode(!0) : (Je.innerHTML = e.outerHTML, Je.removeChild(r = Je.firstChild)), !(ie.noCloneEvent && ie.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || re.isXMLDoc(e))) for (i = m(r), a = m(e), s = 0; null != (o = a[s]); ++s) i[s] && C(o, i[s]);
			if (t) if (n) for (a = a || m(e), i = i || m(r), s = 0; null != (o = a[s]); s++) T(o, i[s]);
			else T(e, r);
			return i = m(r, "script"), i.length > 0 && x(i, !l && m(e, "script")), i = a = o = null, r
		},
		buildFragment: function(e, t, n, i) {
			for (var o, r, s, a, l, c, d, u = e.length, p = v(t), h = [], f = 0; f < u; f++) if (r = e[f], r || 0 === r) if ("object" === re.type(r)) re.merge(h, r.nodeType ? [r] : r);
			else if (Re.test(r)) {
				for (a = a || p.appendChild(t.createElement("div")), l = (We.exec(r) || ["", ""])[1].toLowerCase(), d = Ye[l] || Ye._default, a.innerHTML = d[1] + r.replace(ze, "<$1></$2>") + d[2], o = d[0]; o--;) a = a.lastChild;
				if (!ie.leadingWhitespace && Fe.test(r) && h.push(t.createTextNode(Fe.exec(r)[0])), !ie.tbody) for (r = "table" !== l || Be.test(r) ? "<table>" !== d[1] || Be.test(r) ? 0 : a : a.firstChild, o = r && r.childNodes.length; o--;) re.nodeName(c = r.childNodes[o], "tbody") && !c.childNodes.length && r.removeChild(c);
				for (re.merge(h, a.childNodes), a.textContent = ""; a.firstChild;) a.removeChild(a.firstChild);
				a = p.lastChild
			} else h.push(t.createTextNode(r));
			for (a && p.removeChild(a), ie.appendChecked || re.grep(m(h, "input"), g), f = 0; r = h[f++];) if ((!i || re.inArray(r, i) === -1) && (s = re.contains(r.ownerDocument, r), a = m(p.appendChild(r), "script"), s && x(a), n)) for (o = 0; r = a[o++];) Qe.test(r.type || "") && n.push(r);
			return a = null, p
		},
		cleanData: function(e, t) {
			for (var n, i, o, r, s = 0, a = re.expando, l = re.cache, c = ie.deleteExpando, d = re.event.special; null != (n = e[s]); s++) if ((t || re.acceptData(n)) && (o = n[a], r = o && l[o])) {
				if (r.events) for (i in r.events) d[i] ? re.event.remove(n, i) : re.removeEvent(n, i, r.handle);
				l[o] && (delete l[o], c ? delete n[a] : typeof n.removeAttribute !== ke ? n.removeAttribute(a) : n[a] = null, V.push(o))
			}
		}
	}), re.fn.extend({
		text: function(e) {
			return Ne(this, function(e) {
				return void 0 === e ? re.text(this) : this.empty().append((this[0] && this[0].ownerDocument || ve).createTextNode(e))
			}, null, e, arguments.length)
		},
		append: function() {
			return this.domManip(arguments, function(e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = y(this, e);
					t.appendChild(e)
				}
			})
		},
		prepend: function() {
			return this.domManip(arguments, function(e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = y(this, e);
					t.insertBefore(e, t.firstChild)
				}
			})
		},
		before: function() {
			return this.domManip(arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this)
			})
		},
		after: function() {
			return this.domManip(arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		remove: function(e, t) {
			for (var n, i = e ? re.filter(e, this) : this, o = 0; null != (n = i[o]); o++) t || 1 !== n.nodeType || re.cleanData(m(n)), n.parentNode && (t && re.contains(n.ownerDocument, n) && x(m(n, "script")), n.parentNode.removeChild(n));
			return this
		},
		empty: function() {
			for (var e, t = 0; null != (e = this[t]); t++) {
				for (1 === e.nodeType && re.cleanData(m(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
				e.options && re.nodeName(e, "select") && (e.options.length = 0)
			}
			return this
		},
		clone: function(e, t) {
			return e = null != e && e, t = null == t ? e : t, this.map(function() {
				return re.clone(this, e, t)
			})
		},
		html: function(e) {
			return Ne(this, function(e) {
				var t = this[0] || {},
					n = 0,
					i = this.length;
				if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(qe, "") : void 0;
				if ("string" == typeof e && !Ue.test(e) && (ie.htmlSerialize || !Ie.test(e)) && (ie.leadingWhitespace || !Fe.test(e)) && !Ye[(We.exec(e) || ["", ""])[1].toLowerCase()]) {
					e = e.replace(ze, "<$1></$2>");
					try {
						for (; n < i; n++) t = this[n] || {}, 1 === t.nodeType && (re.cleanData(m(t, !1)), t.innerHTML = e);
						t = 0
					} catch (o) {}
				}
				t && this.empty().append(e)
			}, null, e, arguments.length)
		},
		replaceWith: function() {
			var e = arguments[0];
			return this.domManip(arguments, function(t) {
				e = this.parentNode, re.cleanData(m(this)), e && e.replaceChild(t, this)
			}), e && (e.length || e.nodeType) ? this : this.remove()
		},
		detach: function(e) {
			return this.remove(e, !0)
		},
		domManip: function(e, t) {
			e = Y.apply([], e);
			var n, i, o, r, s, a, l = 0,
				c = this.length,
				d = this,
				u = c - 1,
				p = e[0],
				h = re.isFunction(p);
			if (h || c > 1 && "string" == typeof p && !ie.checkClone && Xe.test(p)) return this.each(function(n) {
				var i = d.eq(n);
				h && (e[0] = p.call(this, n, i.html())), i.domManip(e, t)
			});
			if (c && (a = re.buildFragment(e, this[0].ownerDocument, !1, this), n = a.firstChild, 1 === a.childNodes.length && (a = n), n)) {
				for (r = re.map(m(a, "script"), b), o = r.length; l < c; l++) i = a, l !== u && (i = re.clone(i, !0, !0), o && re.merge(r, m(i, "script"))), t.call(this[l], i, l);
				if (o) for (s = r[r.length - 1].ownerDocument, re.map(r, w), l = 0; l < o; l++) i = r[l], Qe.test(i.type || "") && !re._data(i, "globalEval") && re.contains(s, i) && (i.src ? re._evalUrl && re._evalUrl(i.src) : re.globalEval((i.text || i.textContent || i.innerHTML || "").replace(Ge, "")));
				a = n = null
			}
			return this
		}
	}), re.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(e, t) {
		re.fn[e] = function(e) {
			for (var n, i = 0, o = [], r = re(e), s = r.length - 1; i <= s; i++) n = i === s ? this : this.clone(!0), re(r[i])[t](n), K.apply(o, n.get());
			return this.pushStack(o)
		}
	});
	var Ze, et = {};
	!
	function() {
		var e, t, n = ve.createElement("div"),
			i = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
		n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = n.getElementsByTagName("a")[0], e.style.cssText = "float:left;opacity:.5", ie.opacity = /^0.5/.test(e.style.opacity), ie.cssFloat = !! e.style.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", ie.clearCloneStyle = "content-box" === n.style.backgroundClip, e = n = null, ie.shrinkWrapBlocks = function() {
			var e, n, o, r;
			if (null == t) {
				if (e = ve.getElementsByTagName("body")[0], !e) return;
				r = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px", n = ve.createElement("div"), o = ve.createElement("div"), e.appendChild(n).appendChild(o), t = !1, typeof o.style.zoom !== ke && (o.style.cssText = i + ";width:1px;padding:1px;zoom:1", o.innerHTML = "<div></div>", o.firstChild.style.width = "5px", t = 3 !== o.offsetWidth), e.removeChild(n), e = n = o = null
			}
			return t
		}
	}();
	var tt, nt, it = /^margin/,
		ot = new RegExp("^(" + Ee + ")(?!px)[a-z%]+$", "i"),
		rt = /^(top|right|bottom|left)$/;
	e.getComputedStyle ? (tt = function(e) {
		return e.ownerDocument.defaultView.getComputedStyle(e, null)
	}, nt = function(e, t, n) {
		var i, o, r, s, a = e.style;
		return n = n || tt(e), s = n ? n.getPropertyValue(t) || n[t] : void 0, n && ("" !== s || re.contains(e.ownerDocument, e) || (s = re.style(e, t)), ot.test(s) && it.test(t) && (i = a.width, o = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = o, a.maxWidth = r)), void 0 === s ? s : s + ""
	}) : ve.documentElement.currentStyle && (tt = function(e) {
		return e.currentStyle
	}, nt = function(e, t, n) {
		var i, o, r, s, a = e.style;
		return n = n || tt(e), s = n ? n[t] : void 0, null == s && a && a[t] && (s = a[t]), ot.test(s) && !rt.test(t) && (i = a.left, o = e.runtimeStyle, r = o && o.left, r && (o.left = e.currentStyle.left), a.left = "fontSize" === t ? "1em" : s, s = a.pixelLeft + "px", a.left = i, r && (o.left = r)), void 0 === s ? s : s + "" || "auto"
	}), function() {
		function t() {
			var t, n, i = ve.getElementsByTagName("body")[0];
			i && (t = ve.createElement("div"), n = ve.createElement("div"), t.style.cssText = c, i.appendChild(t).appendChild(n), n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%", re.swap(i, null != i.style.zoom ? {
				zoom: 1
			} : {}, function() {
				o = 4 === n.offsetWidth
			}), r = !0, s = !1, a = !0, e.getComputedStyle && (s = "1%" !== (e.getComputedStyle(n, null) || {}).top, r = "4px" === (e.getComputedStyle(n, null) || {
				width: "4px"
			}).width), i.removeChild(t), n = i = null)
		}
		var n, i, o, r, s, a, l = ve.createElement("div"),
			c = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
			d = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
		l.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = l.getElementsByTagName("a")[0], n.style.cssText = "float:left;opacity:.5", ie.opacity = /^0.5/.test(n.style.opacity), ie.cssFloat = !! n.style.cssFloat, l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", ie.clearCloneStyle = "content-box" === l.style.backgroundClip, n = l = null, re.extend(ie, {
			reliableHiddenOffsets: function() {
				if (null != i) return i;
				var e, t, n, o = ve.createElement("div"),
					r = ve.getElementsByTagName("body")[0];
				if (r) return o.setAttribute("className", "t"), o.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = ve.createElement("div"), e.style.cssText = c, r.appendChild(e).appendChild(o), o.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", t = o.getElementsByTagName("td"), t[0].style.cssText = "padding:0;margin:0;border:0;display:none", n = 0 === t[0].offsetHeight, t[0].style.display = "", t[1].style.display = "none", i = n && 0 === t[0].offsetHeight, r.removeChild(e), o = r = null, i
			},
			boxSizing: function() {
				return null == o && t(), o
			},
			boxSizingReliable: function() {
				return null == r && t(), r
			},
			pixelPosition: function() {
				return null == s && t(), s
			},
			reliableMarginRight: function() {
				var t, n, i, o;
				if (null == a && e.getComputedStyle) {
					if (t = ve.getElementsByTagName("body")[0], !t) return;
					n = ve.createElement("div"), i = ve.createElement("div"), n.style.cssText = c, t.appendChild(n).appendChild(i), o = i.appendChild(ve.createElement("div")), o.style.cssText = i.style.cssText = d, o.style.marginRight = o.style.width = "0", i.style.width = "1px", a = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight), t.removeChild(n)
				}
				return a
			}
		})
	}(), re.swap = function(e, t, n, i) {
		var o, r, s = {};
		for (r in t) s[r] = e.style[r], e.style[r] = t[r];
		o = n.apply(e, i || []);
		for (r in t) e.style[r] = s[r];
		return o
	};
	var st = /alpha\([^)]*\)/i,
		at = /opacity\s*=\s*([^)]*)/,
		lt = /^(none|table(?!-c[ea]).+)/,
		ct = new RegExp("^(" + Ee + ")(.*)$", "i"),
		dt = new RegExp("^([+-])=(" + Ee + ")", "i"),
		ut = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		pt = {
			letterSpacing: 0,
			fontWeight: 400
		},
		ht = ["Webkit", "O", "Moz", "ms"];
	re.extend({
		cssHooks: {
			opacity: {
				get: function(e, t) {
					if (t) {
						var n = nt(e, "opacity");
						return "" === n ? "1" : n
					}
				}
			}
		},
		cssNumber: {
			columnCount: !0,
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": ie.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(e, t, n, i) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var o, r, s, a = re.camelCase(t),
					l = e.style;
				if (t = re.cssProps[a] || (re.cssProps[a] = E(l, a)), s = re.cssHooks[t] || re.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (o = s.get(e, !1, i)) ? o : l[t];
				if (r = typeof n, "string" === r && (o = dt.exec(n)) && (n = (o[1] + 1) * o[2] + parseFloat(re.css(e, t)), r = "number"), null != n && n === n && ("number" !== r || re.cssNumber[a] || (n += "px"), ie.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(s && "set" in s && void 0 === (n = s.set(e, n, i))))) try {
					l[t] = "", l[t] = n
				} catch (c) {}
			}
		},
		css: function(e, t, n, i) {
			var o, r, s, a = re.camelCase(t);
			return t = re.cssProps[a] || (re.cssProps[a] = E(e.style, a)), s = re.cssHooks[t] || re.cssHooks[a], s && "get" in s && (r = s.get(e, !0, n)), void 0 === r && (r = nt(e, t, i)), "normal" === r && t in pt && (r = pt[t]), "" === n || n ? (o = parseFloat(r), n === !0 || re.isNumeric(o) ? o || 0 : r) : r
		}
	}), re.each(["height", "width"], function(e, t) {
		re.cssHooks[t] = {
			get: function(e, n, i) {
				if (n) return 0 === e.offsetWidth && lt.test(re.css(e, "display")) ? re.swap(e, ut, function() {
					return j(e, t, i)
				}) : j(e, t, i)
			},
			set: function(e, n, i) {
				var o = i && tt(e);
				return A(e, n, i ? N(e, t, i, ie.boxSizing() && "border-box" === re.css(e, "boxSizing", !1, o), o) : 0)
			}
		}
	}), ie.opacity || (re.cssHooks.opacity = {
		get: function(e, t) {
			return at.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
		},
		set: function(e, t) {
			var n = e.style,
				i = e.currentStyle,
				o = re.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
				r = i && i.filter || n.filter || "";
			n.zoom = 1, (t >= 1 || "" === t) && "" === re.trim(r.replace(st, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = st.test(r) ? r.replace(st, o) : r + " " + o)
		}
	}), re.cssHooks.marginRight = _(ie.reliableMarginRight, function(e, t) {
		if (t) return re.swap(e, {
			display: "inline-block"
		}, nt, [e, "marginRight"])
	}), re.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(e, t) {
		re.cssHooks[e + t] = {
			expand: function(n) {
				for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) o[e + $e[i] + t] = r[i] || r[i - 2] || r[0];
				return o
			}
		}, it.test(e) || (re.cssHooks[e + t].set = A)
	}), re.fn.extend({
		css: function(e, t) {
			return Ne(this, function(e, t, n) {
				var i, o, r = {},
					s = 0;
				if (re.isArray(t)) {
					for (i = tt(e), o = t.length; s < o; s++) r[t[s]] = re.css(e, t[s], !1, i);
					return r
				}
				return void 0 !== n ? re.style(e, t, n) : re.css(e, t)
			}, e, t, arguments.length > 1);
		},
		show: function() {
			return $(this, !0)
		},
		hide: function() {
			return $(this)
		},
		toggle: function(e) {
			return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
				Ae(this) ? re(this).show() : re(this).hide()
			})
		}
	}), re.Tween = D, D.prototype = {
		constructor: D,
		init: function(e, t, n, i, o, r) {
			this.elem = e, this.prop = n, this.easing = o || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (re.cssNumber[n] ? "" : "px")
		},
		cur: function() {
			var e = D.propHooks[this.prop];
			return e && e.get ? e.get(this) : D.propHooks._default.get(this)
		},
		run: function(e) {
			var t, n = D.propHooks[this.prop];
			return this.options.duration ? this.pos = t = re.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : D.propHooks._default.set(this), this
		}
	}, D.prototype.init.prototype = D.prototype, D.propHooks = {
		_default: {
			get: function(e) {
				var t;
				return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = re.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
			},
			set: function(e) {
				re.fx.step[e.prop] ? re.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[re.cssProps[e.prop]] || re.cssHooks[e.prop]) ? re.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
			}
		}
	}, D.propHooks.scrollTop = D.propHooks.scrollLeft = {
		set: function(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	}, re.easing = {
		linear: function(e) {
			return e
		},
		swing: function(e) {
			return .5 - Math.cos(e * Math.PI) / 2
		}
	}, re.fx = D.prototype.init, re.fx.step = {};
	var ft, vt, mt = /^(?:toggle|show|hide)$/,
		gt = new RegExp("^(?:([+-])=|)(" + Ee + ")([a-z%]*)$", "i"),
		yt = /queueHooks$/,
		bt = [O],
		wt = {
			"*": [function(e, t) {
				var n = this.createTween(e, t),
					i = n.cur(),
					o = gt.exec(t),
					r = o && o[3] || (re.cssNumber[e] ? "" : "px"),
					s = (re.cssNumber[e] || "px" !== r && +i) && gt.exec(re.css(n.elem, e)),
					a = 1,
					l = 20;
				if (s && s[3] !== r) {
					r = r || s[3], o = o || [], s = +i || 1;
					do a = a || ".5", s /= a, re.style(n.elem, e, s + r);
					while (a !== (a = n.cur() / i) && 1 !== a && --l)
				}
				return o && (s = n.start = +s || +i || 0, n.unit = r, n.end = o[1] ? s + (o[1] + 1) * o[2] : +o[2]), n
			}]
		};
	re.Animation = re.extend(q, {
		tweener: function(e, t) {
			re.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
			for (var n, i = 0, o = e.length; i < o; i++) n = e[i], wt[n] = wt[n] || [], wt[n].unshift(t)
		},
		prefilter: function(e, t) {
			t ? bt.unshift(e) : bt.push(e)
		}
	}), re.speed = function(e, t, n) {
		var i = e && "object" == typeof e ? re.extend({}, e) : {
			complete: n || !n && t || re.isFunction(e) && e,
			duration: e,
			easing: n && t || t && !re.isFunction(t) && t
		};
		return i.duration = re.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in re.fx.speeds ? re.fx.speeds[i.duration] : re.fx.speeds._default, null != i.queue && i.queue !== !0 || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
			re.isFunction(i.old) && i.old.call(this), i.queue && re.dequeue(this, i.queue)
		}, i
	}, re.fn.extend({
		fadeTo: function(e, t, n, i) {
			return this.filter(Ae).css("opacity", 0).show().end().animate({
				opacity: t
			}, e, n, i)
		},
		animate: function(e, t, n, i) {
			var o = re.isEmptyObject(e),
				r = re.speed(t, n, i),
				s = function() {
					var t = q(this, re.extend({}, e), r);
					(o || re._data(this, "finish")) && t.stop(!0)
				};
			return s.finish = s, o || r.queue === !1 ? this.each(s) : this.queue(r.queue, s)
		},
		stop: function(e, t, n) {
			var i = function(e) {
					var t = e.stop;
					delete e.stop, t(n)
				};
			return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
				var t = !0,
					o = null != e && e + "queueHooks",
					r = re.timers,
					s = re._data(this);
				if (o) s[o] && s[o].stop && i(s[o]);
				else for (o in s) s[o] && s[o].stop && yt.test(o) && i(s[o]);
				for (o = r.length; o--;) r[o].elem !== this || null != e && r[o].queue !== e || (r[o].anim.stop(n), t = !1, r.splice(o, 1));
				!t && n || re.dequeue(this, e)
			})
		},
		finish: function(e) {
			return e !== !1 && (e = e || "fx"), this.each(function() {
				var t, n = re._data(this),
					i = n[e + "queue"],
					o = n[e + "queueHooks"],
					r = re.timers,
					s = i ? i.length : 0;
				for (n.finish = !0, re.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = r.length; t--;) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
				for (t = 0; t < s; t++) i[t] && i[t].finish && i[t].finish.call(this);
				delete n.finish
			})
		}
	}), re.each(["toggle", "show", "hide"], function(e, t) {
		var n = re.fn[t];
		re.fn[t] = function(e, i, o) {
			return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(L(t, !0), e, i, o)
		}
	}), re.each({
		slideDown: L("show"),
		slideUp: L("hide"),
		slideToggle: L("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(e, t) {
		re.fn[e] = function(e, n, i) {
			return this.animate(t, e, n, i)
		}
	}), re.timers = [], re.fx.tick = function() {
		var e, t = re.timers,
			n = 0;
		for (ft = re.now(); n < t.length; n++) e = t[n], e() || t[n] !== e || t.splice(n--, 1);
		t.length || re.fx.stop(), ft = void 0
	}, re.fx.timer = function(e) {
		re.timers.push(e), e() ? re.fx.start() : re.timers.pop()
	}, re.fx.interval = 13, re.fx.start = function() {
		vt || (vt = setInterval(re.fx.tick, re.fx.interval))
	}, re.fx.stop = function() {
		clearInterval(vt), vt = null
	}, re.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	}, re.fn.delay = function(e, t) {
		return e = re.fx ? re.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
			var i = setTimeout(t, e);
			n.stop = function() {
				clearTimeout(i)
			}
		})
	}, function() {
		var e, t, n, i, o = ve.createElement("div");
		o.setAttribute("className", "t"), o.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = o.getElementsByTagName("a")[0], n = ve.createElement("select"), i = n.appendChild(ve.createElement("option")), t = o.getElementsByTagName("input")[0], e.style.cssText = "top:1px", ie.getSetAttribute = "t" !== o.className, ie.style = /top/.test(e.getAttribute("style")), ie.hrefNormalized = "/a" === e.getAttribute("href"), ie.checkOn = !! t.value, ie.optSelected = i.selected, ie.enctype = !! ve.createElement("form").enctype, n.disabled = !0, ie.optDisabled = !i.disabled, t = ve.createElement("input"), t.setAttribute("value", ""), ie.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), ie.radioValue = "t" === t.value, e = t = n = i = o = null
	}();
	var xt = /\r/g;
	re.fn.extend({
		val: function(e) {
			var t, n, i, o = this[0]; {
				if (arguments.length) return i = re.isFunction(e), this.each(function(n) {
					var o;
					1 === this.nodeType && (o = i ? e.call(this, n, re(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : re.isArray(o) && (o = re.map(o, function(e) {
						return null == e ? "" : e + ""
					})), t = re.valHooks[this.type] || re.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
				});
				if (o) return t = re.valHooks[o.type] || re.valHooks[o.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : (n = o.value, "string" == typeof n ? n.replace(xt, "") : null == n ? "" : n)
			}
		}
	}), re.extend({
		valHooks: {
			option: {
				get: function(e) {
					var t = re.find.attr(e, "value");
					return null != t ? t : re.text(e)
				}
			},
			select: {
				get: function(e) {
					for (var t, n, i = e.options, o = e.selectedIndex, r = "select-one" === e.type || o < 0, s = r ? null : [], a = r ? o + 1 : i.length, l = o < 0 ? a : r ? o : 0; l < a; l++) if (n = i[l], (n.selected || l === o) && (ie.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !re.nodeName(n.parentNode, "optgroup"))) {
						if (t = re(n).val(), r) return t;
						s.push(t)
					}
					return s
				},
				set: function(e, t) {
					for (var n, i, o = e.options, r = re.makeArray(t), s = o.length; s--;) if (i = o[s], re.inArray(re.valHooks.option.get(i), r) >= 0) try {
						i.selected = n = !0
					} catch (a) {
						i.scrollHeight
					} else i.selected = !1;
					return n || (e.selectedIndex = -1), o
				}
			}
		}
	}), re.each(["radio", "checkbox"], function() {
		re.valHooks[this] = {
			set: function(e, t) {
				if (re.isArray(t)) return e.checked = re.inArray(re(e).val(), t) >= 0
			}
		}, ie.checkOn || (re.valHooks[this].get = function(e) {
			return null === e.getAttribute("value") ? "on" : e.value
		})
	});
	var Tt, Ct, kt = re.expr.attrHandle,
		St = /^(?:checked|selected)$/i,
		_t = ie.getSetAttribute,
		Et = ie.input;
	re.fn.extend({
		attr: function(e, t) {
			return Ne(this, re.attr, e, t, arguments.length > 1)
		},
		removeAttr: function(e) {
			return this.each(function() {
				re.removeAttr(this, e)
			})
		}
	}), re.extend({
		attr: function(e, t, n) {
			var i, o, r = e.nodeType;
			if (e && 3 !== r && 8 !== r && 2 !== r) return typeof e.getAttribute === ke ? re.prop(e, t, n) : (1 === r && re.isXMLDoc(e) || (t = t.toLowerCase(), i = re.attrHooks[t] || (re.expr.match.bool.test(t) ? Ct : Tt)), void 0 === n ? i && "get" in i && null !== (o = i.get(e, t)) ? o : (o = re.find.attr(e, t), null == o ? void 0 : o) : null !== n ? i && "set" in i && void 0 !== (o = i.set(e, n, t)) ? o : (e.setAttribute(t, n + ""), n) : void re.removeAttr(e, t))
		},
		removeAttr: function(e, t) {
			var n, i, o = 0,
				r = t && t.match(we);
			if (r && 1 === e.nodeType) for (; n = r[o++];) i = re.propFix[n] || n, re.expr.match.bool.test(n) ? Et && _t || !St.test(n) ? e[i] = !1 : e[re.camelCase("default-" + n)] = e[i] = !1 : re.attr(e, n, ""), e.removeAttribute(_t ? n : i)
		},
		attrHooks: {
			type: {
				set: function(e, t) {
					if (!ie.radioValue && "radio" === t && re.nodeName(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t), n && (e.value = n), t
					}
				}
			}
		}
	}), Ct = {
		set: function(e, t, n) {
			return t === !1 ? re.removeAttr(e, n) : Et && _t || !St.test(n) ? e.setAttribute(!_t && re.propFix[n] || n, n) : e[re.camelCase("default-" + n)] = e[n] = !0, n
		}
	}, re.each(re.expr.match.bool.source.match(/\w+/g), function(e, t) {
		var n = kt[t] || re.find.attr;
		kt[t] = Et && _t || !St.test(t) ?
		function(e, t, i) {
			var o, r;
			return i || (r = kt[t], kt[t] = o, o = null != n(e, t, i) ? t.toLowerCase() : null, kt[t] = r), o
		} : function(e, t, n) {
			if (!n) return e[re.camelCase("default-" + t)] ? t.toLowerCase() : null
		}
	}), Et && _t || (re.attrHooks.value = {
		set: function(e, t, n) {
			return re.nodeName(e, "input") ? void(e.defaultValue = t) : Tt && Tt.set(e, t, n)
		}
	}), _t || (Tt = {
		set: function(e, t, n) {
			var i = e.getAttributeNode(n);
			if (i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)), i.value = t += "", "value" === n || t === e.getAttribute(n)) return t
		}
	}, kt.id = kt.name = kt.coords = function(e, t, n) {
		var i;
		if (!n) return (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null
	}, re.valHooks.button = {
		get: function(e, t) {
			var n = e.getAttributeNode(t);
			if (n && n.specified) return n.value
		},
		set: Tt.set
	}, re.attrHooks.contenteditable = {
		set: function(e, t, n) {
			Tt.set(e, "" !== t && t, n)
		}
	}, re.each(["width", "height"], function(e, t) {
		re.attrHooks[t] = {
			set: function(e, n) {
				if ("" === n) return e.setAttribute(t, "auto"), n
			}
		}
	})), ie.style || (re.attrHooks.style = {
		get: function(e) {
			return e.style.cssText || void 0
		},
		set: function(e, t) {
			return e.style.cssText = t + ""
		}
	});
	var $t = /^(?:input|select|textarea|button|object)$/i,
		At = /^(?:a|area)$/i;
	re.fn.extend({
		prop: function(e, t) {
			return Ne(this, re.prop, e, t, arguments.length > 1)
		},
		removeProp: function(e) {
			return e = re.propFix[e] || e, this.each(function() {
				try {
					this[e] = void 0, delete this[e]
				} catch (t) {}
			})
		}
	}), re.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},
		prop: function(e, t, n) {
			var i, o, r, s = e.nodeType;
			if (e && 3 !== s && 8 !== s && 2 !== s) return r = 1 !== s || !re.isXMLDoc(e), r && (t = re.propFix[t] || t, o = re.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]
		},
		propHooks: {
			tabIndex: {
				get: function(e) {
					var t = re.find.attr(e, "tabindex");
					return t ? parseInt(t, 10) : $t.test(e.nodeName) || At.test(e.nodeName) && e.href ? 0 : -1
				}
			}
		}
	}), ie.hrefNormalized || re.each(["href", "src"], function(e, t) {
		re.propHooks[t] = {
			get: function(e) {
				return e.getAttribute(t, 4)
			}
		}
	}), ie.optSelected || (re.propHooks.selected = {
		get: function(e) {
			var t = e.parentNode;
			return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
		}
	}), re.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
		re.propFix[this.toLowerCase()] = this
	}), ie.enctype || (re.propFix.enctype = "encoding");
	var Nt = /[\t\r\n\f]/g;
	re.fn.extend({
		addClass: function(e) {
			var t, n, i, o, r, s, a = 0,
				l = this.length,
				c = "string" == typeof e && e;
			if (re.isFunction(e)) return this.each(function(t) {
				re(this).addClass(e.call(this, t, this.className))
			});
			if (c) for (t = (e || "").match(we) || []; a < l; a++) if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Nt, " ") : " ")) {
				for (r = 0; o = t[r++];) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
				s = re.trim(i), n.className !== s && (n.className = s)
			}
			return this
		},
		removeClass: function(e) {
			var t, n, i, o, r, s, a = 0,
				l = this.length,
				c = 0 === arguments.length || "string" == typeof e && e;
			if (re.isFunction(e)) return this.each(function(t) {
				re(this).removeClass(e.call(this, t, this.className))
			});
			if (c) for (t = (e || "").match(we) || []; a < l; a++) if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Nt, " ") : "")) {
				for (r = 0; o = t[r++];) for (; i.indexOf(" " + o + " ") >= 0;) i = i.replace(" " + o + " ", " ");
				s = e ? re.trim(i) : "", n.className !== s && (n.className = s)
			}
			return this
		},
		toggleClass: function(e, t) {
			var n = typeof e;
			return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : re.isFunction(e) ? this.each(function(n) {
				re(this).toggleClass(e.call(this, n, this.className, t), t)
			}) : this.each(function() {
				if ("string" === n) for (var t, i = 0, o = re(this), r = e.match(we) || []; t = r[i++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
				else n !== ke && "boolean" !== n || (this.className && re._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : re._data(this, "__className__") || "")
			})
		},
		hasClass: function(e) {
			for (var t = " " + e + " ", n = 0, i = this.length; n < i; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Nt, " ").indexOf(t) >= 0) return !0;
			return !1
		}
	}), re.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
		re.fn[t] = function(e, n) {
			return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
		}
	}), re.fn.extend({
		hover: function(e, t) {
			return this.mouseenter(e).mouseleave(t || e)
		},
		bind: function(e, t, n) {
			return this.on(e, null, t, n)
		},
		unbind: function(e, t) {
			return this.off(e, null, t)
		},
		delegate: function(e, t, n, i) {
			return this.on(t, e, n, i)
		},
		undelegate: function(e, t, n) {
			return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
		}
	});
	var jt = re.now(),
		Dt = /\?/,
		Ht = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
	re.parseJSON = function(t) {
		if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
		var n, i = null,
			o = re.trim(t + "");
		return o && !re.trim(o.replace(Ht, function(e, t, o, r) {
			return n && t && (i = 0), 0 === i ? e : (n = o || t, i += !r - !o, "")
		})) ? Function("return " + o)() : re.error("Invalid JSON: " + t)
	}, re.parseXML = function(t) {
		var n, i;
		if (!t || "string" != typeof t) return null;
		try {
			e.DOMParser ? (i = new DOMParser, n = i.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
		} catch (o) {
			n = void 0
		}
		return n && n.documentElement && !n.getElementsByTagName("parsererror").length || re.error("Invalid XML: " + t), n
	};
	var Lt, Mt, Ot = /#.*$/,
		Pt = /([?&])_=[^&]*/,
		qt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
		It = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		Ft = /^(?:GET|HEAD)$/,
		zt = /^\/\//,
		Wt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
		Bt = {},
		Rt = {},
		Ut = "*/".concat("*");
	try {
		Mt = location.href
	} catch (Xt) {
		Mt = ve.createElement("a"), Mt.href = "", Mt = Mt.href
	}
	Lt = Wt.exec(Mt.toLowerCase()) || [], re.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: Mt,
			type: "GET",
			isLocal: It.test(Lt[1]),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": Ut,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": !0,
				"text json": re.parseJSON,
				"text xml": re.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function(e, t) {
			return t ? z(z(e, re.ajaxSettings), t) : z(re.ajaxSettings, e)
		},
		ajaxPrefilter: I(Bt),
		ajaxTransport: I(Rt),
		ajax: function(e, t) {
			function n(e, t, n, i) {
				var o, d, g, y, w, T = t;
				2 !== b && (b = 2, a && clearTimeout(a), c = void 0, s = i || "", x.readyState = e > 0 ? 4 : 0, o = e >= 200 && e < 300 || 304 === e, n && (y = W(u, x, n)), y = B(u, y, x, o), o ? (u.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (re.lastModified[r] = w), w = x.getResponseHeader("etag"), w && (re.etag[r] = w)), 204 === e || "HEAD" === u.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = y.state, d = y.data, g = y.error, o = !g)) : (g = T, !e && T || (T = "error", e < 0 && (e = 0))), x.status = e, x.statusText = (t || T) + "", o ? f.resolveWith(p, [d, T, x]) : f.rejectWith(p, [x, T, g]), x.statusCode(m), m = void 0, l && h.trigger(o ? "ajaxSuccess" : "ajaxError", [x, u, o ? d : g]), v.fireWith(p, [x, T]), l && (h.trigger("ajaxComplete", [x, u]), --re.active || re.event.trigger("ajaxStop")))
			}
			"object" == typeof e && (t = e, e = void 0), t = t || {};
			var i, o, r, s, a, l, c, d, u = re.ajaxSetup({}, t),
				p = u.context || u,
				h = u.context && (p.nodeType || p.jquery) ? re(p) : re.event,
				f = re.Deferred(),
				v = re.Callbacks("once memory"),
				m = u.statusCode || {},
				g = {},
				y = {},
				b = 0,
				w = "canceled",
				x = {
					readyState: 0,
					getResponseHeader: function(e) {
						var t;
						if (2 === b) {
							if (!d) for (d = {}; t = qt.exec(s);) d[t[1].toLowerCase()] = t[2];
							t = d[e.toLowerCase()]
						}
						return null == t ? null : t
					},
					getAllResponseHeaders: function() {
						return 2 === b ? s : null
					},
					setRequestHeader: function(e, t) {
						var n = e.toLowerCase();
						return b || (e = y[n] = y[n] || e, g[e] = t), this
					},
					overrideMimeType: function(e) {
						return b || (u.mimeType = e), this
					},
					statusCode: function(e) {
						var t;
						if (e) if (b < 2) for (t in e) m[t] = [m[t], e[t]];
						else x.always(e[x.status]);
						return this
					},
					abort: function(e) {
						var t = e || w;
						return c && c.abort(t), n(0, t), this
					}
				};
			if (f.promise(x).complete = v.add, x.success = x.done, x.error = x.fail, u.url = ((e || u.url || Mt) + "").replace(Ot, "").replace(zt, Lt[1] + "//"), u.type = t.method || t.type || u.method || u.type, u.dataTypes = re.trim(u.dataType || "*").toLowerCase().match(we) || [""], null == u.crossDomain && (i = Wt.exec(u.url.toLowerCase()), u.crossDomain = !(!i || i[1] === Lt[1] && i[2] === Lt[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (Lt[3] || ("http:" === Lt[1] ? "80" : "443")))), u.data && u.processData && "string" != typeof u.data && (u.data = re.param(u.data, u.traditional)), F(Bt, u, t, x), 2 === b) return x;
			l = u.global, l && 0 === re.active++ && re.event.trigger("ajaxStart"), u.type = u.type.toUpperCase(), u.hasContent = !Ft.test(u.type), r = u.url, u.hasContent || (u.data && (r = u.url += (Dt.test(r) ? "&" : "?") + u.data, delete u.data), u.cache === !1 && (u.url = Pt.test(r) ? r.replace(Pt, "$1_=" + jt++) : r + (Dt.test(r) ? "&" : "?") + "_=" + jt++)), u.ifModified && (re.lastModified[r] && x.setRequestHeader("If-Modified-Since", re.lastModified[r]), re.etag[r] && x.setRequestHeader("If-None-Match", re.etag[r])), (u.data && u.hasContent && u.contentType !== !1 || t.contentType) && x.setRequestHeader("Content-Type", u.contentType), x.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + Ut + "; q=0.01" : "") : u.accepts["*"]);
			for (o in u.headers) x.setRequestHeader(o, u.headers[o]);
			if (u.beforeSend && (u.beforeSend.call(p, x, u) === !1 || 2 === b)) return x.abort();
			w = "abort";
			for (o in {
				success: 1,
				error: 1,
				complete: 1
			}) x[o](u[o]);
			if (c = F(Rt, u, t, x)) {
				x.readyState = 1, l && h.trigger("ajaxSend", [x, u]), u.async && u.timeout > 0 && (a = setTimeout(function() {
					x.abort("timeout")
				}, u.timeout));
				try {
					b = 1, c.send(g, n)
				} catch (T) {
					if (!(b < 2)) throw T;
					n(-1, T)
				}
			} else n(-1, "No Transport");
			return x
		},
		getJSON: function(e, t, n) {
			return re.get(e, t, n, "json")
		},
		getScript: function(e, t) {
			return re.get(e, void 0, t, "script")
		}
	}), re.each(["get", "post"], function(e, t) {
		re[t] = function(e, n, i, o) {
			return re.isFunction(n) && (o = o || i, i = n, n = void 0), re.ajax({
				url: e,
				type: t,
				dataType: o,
				data: n,
				success: i
			})
		}
	}), re.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
		re.fn[t] = function(e) {
			return this.on(t, e)
		}
	}), re._evalUrl = function(e) {
		return re.ajax({
			url: e,
			type: "GET",
			dataType: "script",
			async: !1,
			global: !1,
			"throws": !0
		})
	}, re.fn.extend({
		wrapAll: function(e) {
			if (re.isFunction(e)) return this.each(function(t) {
				re(this).wrapAll(e.call(this, t))
			});
			if (this[0]) {
				var t = re(e, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
					for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
					return e
				}).append(this)
			}
			return this
		},
		wrapInner: function(e) {
			return re.isFunction(e) ? this.each(function(t) {
				re(this).wrapInner(e.call(this, t))
			}) : this.each(function() {
				var t = re(this),
					n = t.contents();
				n.length ? n.wrapAll(e) : t.append(e)
			})
		},
		wrap: function(e) {
			var t = re.isFunction(e);
			return this.each(function(n) {
				re(this).wrapAll(t ? e.call(this, n) : e)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				re.nodeName(this, "body") || re(this).replaceWith(this.childNodes)
			}).end()
		}
	}), re.expr.filters.hidden = function(e) {
		return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ie.reliableHiddenOffsets() && "none" === (e.style && e.style.display || re.css(e, "display"))
	}, re.expr.filters.visible = function(e) {
		return !re.expr.filters.hidden(e)
	};
	var Qt = /%20/g,
		Vt = /\[\]$/,
		Gt = /\r?\n/g,
		Yt = /^(?:submit|button|image|reset|file)$/i,
		Kt = /^(?:input|select|textarea|keygen)/i;
	re.param = function(e, t) {
		var n, i = [],
			o = function(e, t) {
				t = re.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
			};
		if (void 0 === t && (t = re.ajaxSettings && re.ajaxSettings.traditional), re.isArray(e) || e.jquery && !re.isPlainObject(e)) re.each(e, function() {
			o(this.name, this.value)
		});
		else for (n in e) R(n, e[n], t, o);
		return i.join("&").replace(Qt, "+")
	}, re.fn.extend({
		serialize: function() {
			return re.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var e = re.prop(this, "elements");
				return e ? re.makeArray(e) : this
			}).filter(function() {
				var e = this.type;
				return this.name && !re(this).is(":disabled") && Kt.test(this.nodeName) && !Yt.test(e) && (this.checked || !je.test(e))
			}).map(function(e, t) {
				var n = re(this).val();
				return null == n ? null : re.isArray(n) ? re.map(n, function(e) {
					return {
						name: t.name,
						value: e.replace(Gt, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(Gt, "\r\n")
				}
			}).get()
		}
	}), re.ajaxSettings.xhr = void 0 !== e.ActiveXObject ?
	function() {
		return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && U() || X()
	} : U;
	var Jt = 0,
		Zt = {},
		en = re.ajaxSettings.xhr();
	e.ActiveXObject && re(e).on("unload", function() {
		for (var e in Zt) Zt[e](void 0, !0)
	}), ie.cors = !! en && "withCredentials" in en, en = ie.ajax = !! en, en && re.ajaxTransport(function(e) {
		if (!e.crossDomain || ie.cors) {
			var t;
			return {
				send: function(n, i) {
					var o, r = e.xhr(),
						s = ++Jt;
					if (r.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (o in e.xhrFields) r[o] = e.xhrFields[o];
					e.mimeType && r.overrideMimeType && r.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
					for (o in n) void 0 !== n[o] && r.setRequestHeader(o, n[o] + "");
					r.send(e.hasContent && e.data || null), t = function(n, o) {
						var a, l, c;
						if (t && (o || 4 === r.readyState)) if (delete Zt[s], t = void 0, r.onreadystatechange = re.noop, o) 4 !== r.readyState && r.abort();
						else {
							c = {}, a = r.status, "string" == typeof r.responseText && (c.text = r.responseText);
							try {
								l = r.statusText
							} catch (d) {
								l = ""
							}
							a || !e.isLocal || e.crossDomain ? 1223 === a && (a = 204) : a = c.text ? 200 : 404
						}
						c && i(a, l, c, r.getAllResponseHeaders())
					}, e.async ? 4 === r.readyState ? setTimeout(t) : r.onreadystatechange = Zt[s] = t : t()
				},
				abort: function() {
					t && t(void 0, !0)
				}
			}
		}
	}), re.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function(e) {
				return re.globalEval(e), e
			}
		}
	}), re.ajaxPrefilter("script", function(e) {
		void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
	}), re.ajaxTransport("script", function(e) {
		if (e.crossDomain) {
			var t, n = ve.head || re("head")[0] || ve.documentElement;
			return {
				send: function(i, o) {
					t = ve.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function(e, n) {
						(n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || o(200, "success"))
					}, n.insertBefore(t, n.firstChild)
				},
				abort: function() {
					t && t.onload(void 0, !0)
				}
			}
		}
	});
	var tn = [],
		nn = /(=)\?(?=&|$)|\?\?/;
	re.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var e = tn.pop() || re.expando + "_" + jt++;
			return this[e] = !0, e
		}
	}), re.ajaxPrefilter("json jsonp", function(t, n, i) {
		var o, r, s, a = t.jsonp !== !1 && (nn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && nn.test(t.data) && "data");
		if (a || "jsonp" === t.dataTypes[0]) return o = t.jsonpCallback = re.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(nn, "$1" + o) : t.jsonp !== !1 && (t.url += (Dt.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function() {
			return s || re.error(o + " was not called"), s[0]
		}, t.dataTypes[0] = "json", r = e[o], e[o] = function() {
			s = arguments
		}, i.always(function() {
			e[o] = r, t[o] && (t.jsonpCallback = n.jsonpCallback, tn.push(o)), s && re.isFunction(r) && r(s[0]), s = r = void 0
		}), "script"
	}), re.parseHTML = function(e, t, n) {
		if (!e || "string" != typeof e) return null;
		"boolean" == typeof t && (n = t, t = !1), t = t || ve;
		var i = pe.exec(e),
			o = !n && [];
		return i ? [t.createElement(i[1])] : (i = re.buildFragment([e], t, o), o && o.length && re(o).remove(), re.merge([], i.childNodes))
	};
	var on = re.fn.load;
	re.fn.load = function(e, t, n) {
		if ("string" != typeof e && on) return on.apply(this, arguments);
		var i, o, r, s = this,
			a = e.indexOf(" ");
		return a >= 0 && (i = e.slice(a, e.length), e = e.slice(0, a)), re.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (r = "POST"), s.length > 0 && re.ajax({
			url: e,
			type: r,
			dataType: "html",
			data: t
		}).done(function(e) {
			o = arguments, s.html(i ? re("<div>").append(re.parseHTML(e)).find(i) : e)
		}).complete(n &&
		function(e, t) {
			s.each(n, o || [e.responseText, t, e])
		}), this
	}, re.expr.filters.animated = function(e) {
		return re.grep(re.timers, function(t) {
			return e === t.elem
		}).length
	};
	var rn = e.document.documentElement;
	re.offset = {
		setOffset: function(e, t, n) {
			var i, o, r, s, a, l, c, d = re.css(e, "position"),
				u = re(e),
				p = {};
			"static" === d && (e.style.position = "relative"), a = u.offset(), r = re.css(e, "top"), l = re.css(e, "left"), c = ("absolute" === d || "fixed" === d) && re.inArray("auto", [r, l]) > -1, c ? (i = u.position(), s = i.top, o = i.left) : (s = parseFloat(r) || 0, o = parseFloat(l) || 0), re.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (p.top = t.top - a.top + s), null != t.left && (p.left = t.left - a.left + o), "using" in t ? t.using.call(e, p) : u.css(p)
		}
	}, re.fn.extend({
		offset: function(e) {
			if (arguments.length) return void 0 === e ? this : this.each(function(t) {
				re.offset.setOffset(this, e, t)
			});
			var t, n, i = {
				top: 0,
				left: 0
			},
				o = this[0],
				r = o && o.ownerDocument;
			if (r) return t = r.documentElement, re.contains(t, o) ? (typeof o.getBoundingClientRect !== ke && (i = o.getBoundingClientRect()), n = Q(r), {
				top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
				left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
			}) : i
		},
		position: function() {
			if (this[0]) {
				var e, t, n = {
					top: 0,
					left: 0
				},
					i = this[0];
				return "fixed" === re.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), re.nodeName(e[0], "html") || (n = e.offset()), n.top += re.css(e[0], "borderTopWidth", !0), n.left += re.css(e[0], "borderLeftWidth", !0)), {
					top: t.top - n.top - re.css(i, "marginTop", !0),
					left: t.left - n.left - re.css(i, "marginLeft", !0)
				}
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for (var e = this.offsetParent || rn; e && !re.nodeName(e, "html") && "static" === re.css(e, "position");) e = e.offsetParent;
				return e || rn
			})
		}
	}), re.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(e, t) {
		var n = /Y/.test(t);
		re.fn[e] = function(i) {
			return Ne(this, function(e, i, o) {
				var r = Q(e);
				return void 0 === o ? r ? t in r ? r[t] : r.document.documentElement[i] : e[i] : void(r ? r.scrollTo(n ? re(r).scrollLeft() : o, n ? o : re(r).scrollTop()) : e[i] = o)
			}, e, i, arguments.length, null)
		}
	}), re.each(["top", "left"], function(e, t) {
		re.cssHooks[t] = _(ie.pixelPosition, function(e, n) {
			if (n) return n = nt(e, t), ot.test(n) ? re(e).position()[t] + "px" : n
		})
	}), re.each({
		Height: "height",
		Width: "width"
	}, function(e, t) {
		re.each({
			padding: "inner" + e,
			content: t,
			"": "outer" + e
		}, function(n, i) {
			re.fn[i] = function(i, o) {
				var r = arguments.length && (n || "boolean" != typeof i),
					s = n || (i === !0 || o === !0 ? "margin" : "border");
				return Ne(this, function(t, n, i) {
					var o;
					return re.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? re.css(t, n, s) : re.style(t, n, i, s)
				}, t, r ? i : void 0, r, null)
			}
		})
	}), re.fn.size = function() {
		return this.length
	}, re.fn.andSelf = re.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
		return re
	});
	var sn = e.jQuery,
		an = e.$;
	return re.noConflict = function(t) {
		return e.$ === re && (e.$ = an), t && e.jQuery === re && (e.jQuery = sn), re
	}, typeof t === ke && (e.jQuery = e.$ = re), re
}), function(e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function(e) {
	function t(t, i) {
		var o, r, s, a = t.nodeName.toLowerCase();
		return "area" === a ? (o = t.parentNode, r = o.name, !(!t.href || !r || "map" !== o.nodeName.toLowerCase()) && (s = e("img[usemap='#" + r + "']")[0], !! s && n(s))) : (/input|select|textarea|button|object/.test(a) ? !t.disabled : "a" === a ? t.href || i : i) && n(t)
	}
	function n(t) {
		return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
			return "hidden" === e.css(this, "visibility")
		}).length
	}
	e.ui = e.ui || {}, e.extend(e.ui, {
		version: "1.11.2",
		keyCode: {
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
		}
	}), e.fn.extend({
		scrollParent: function(t) {
			var n = this.css("position"),
				i = "absolute" === n,
				o = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
				r = this.parents().filter(function() {
					var t = e(this);
					return (!i || "static" !== t.css("position")) && o.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
				}).eq(0);
			return "fixed" !== n && r.length ? r : e(this[0].ownerDocument || document)
		},
		uniqueId: function() {
			var e = 0;
			return function() {
				return this.each(function() {
					this.id || (this.id = "ui-id-" + ++e)
				})
			}
		}(),
		removeUniqueId: function() {
			return this.each(function() {
				/^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id")
			})
		}
	}), e.extend(e.expr[":"], {
		data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
			return function(n) {
				return !!e.data(n, t)
			}
		}) : function(t, n, i) {
			return !!e.data(t, i[3])
		},
		focusable: function(n) {
			return t(n, !isNaN(e.attr(n, "tabindex")))
		},
		tabbable: function(n) {
			var i = e.attr(n, "tabindex"),
				o = isNaN(i);
			return (o || i >= 0) && t(n, !o)
		}
	}), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(t, n) {
		function i(t, n, i, r) {
			return e.each(o, function() {
				n -= parseFloat(e.css(t, "padding" + this)) || 0, i && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), r && (n -= parseFloat(e.css(t, "margin" + this)) || 0)
			}), n
		}
		var o = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
			r = n.toLowerCase(),
			s = {
				innerWidth: e.fn.innerWidth,
				innerHeight: e.fn.innerHeight,
				outerWidth: e.fn.outerWidth,
				outerHeight: e.fn.outerHeight
			};
		e.fn["inner" + n] = function(t) {
			return void 0 === t ? s["inner" + n].call(this) : this.each(function() {
				e(this).css(r, i(this, t) + "px")
			})
		}, e.fn["outer" + n] = function(t, o) {
			return "number" != typeof t ? s["outer" + n].call(this, t) : this.each(function() {
				e(this).css(r, i(this, t, !0, o) + "px")
			})
		}
	}), e.fn.addBack || (e.fn.addBack = function(e) {
		return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
	}), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
		return function(n) {
			return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this)
		}
	}(e.fn.removeData)), e.ui.ie = !! /msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
		focus: function(t) {
			return function(n, i) {
				return "number" == typeof n ? this.each(function() {
					var t = this;
					setTimeout(function() {
						e(t).focus(), i && i.call(t)
					}, n)
				}) : t.apply(this, arguments)
			}
		}(e.fn.focus),
		disableSelection: function() {
			var e = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
			return function() {
				return this.bind(e + ".ui-disableSelection", function(e) {
					e.preventDefault()
				})
			}
		}(),
		enableSelection: function() {
			return this.unbind(".ui-disableSelection")
		},
		zIndex: function(t) {
			if (void 0 !== t) return this.css("zIndex", t);
			if (this.length) for (var n, i, o = e(this[0]); o.length && o[0] !== document;) {
				if (n = o.css("position"), ("absolute" === n || "relative" === n || "fixed" === n) && (i = parseInt(o.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
				o = o.parent()
			}
			return 0
		}
	}), e.ui.plugin = {
		add: function(t, n, i) {
			var o, r = e.ui[t].prototype;
			for (o in i) r.plugins[o] = r.plugins[o] || [], r.plugins[o].push([n, i[o]])
		},
		call: function(e, t, n, i) {
			var o, r = e.plugins[t];
			if (r && (i || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)) for (o = 0; o < r.length; o++) e.options[r[o][0]] && r[o][1].apply(e.element, n)
		}
	};
	var i = 0,
		o = Array.prototype.slice;
	e.cleanData = function(t) {
		return function(n) {
			var i, o, r;
			for (r = 0; null != (o = n[r]); r++) try {
				i = e._data(o, "events"), i && i.remove && e(o).triggerHandler("remove")
			} catch (s) {}
			t(n)
		}
	}(e.cleanData), e.widget = function(t, n, i) {
		var o, r, s, a, l = {},
			c = t.split(".")[0];
		return t = t.split(".")[1], o = c + "-" + t, i || (i = n, n = e.Widget), e.expr[":"][o.toLowerCase()] = function(t) {
			return !!e.data(t, o)
		}, e[c] = e[c] || {}, r = e[c][t], s = e[c][t] = function(e, t) {
			return this._createWidget ? void(arguments.length && this._createWidget(e, t)) : new s(e, t)
		}, e.extend(s, r, {
			version: i.version,
			_proto: e.extend({}, i),
			_childConstructors: []
		}), a = new n, a.options = e.widget.extend({}, a.options), e.each(i, function(t, i) {
			return e.isFunction(i) ? void(l[t] = function() {
				var e = function() {
						return n.prototype[t].apply(this, arguments)
					},
					o = function(e) {
						return n.prototype[t].apply(this, e)
					};
				return function() {
					var t, n = this._super,
						r = this._superApply;
					return this._super = e, this._superApply = o, t = i.apply(this, arguments), this._super = n, this._superApply = r, t
				}
			}()) : void(l[t] = i)
		}), s.prototype = e.widget.extend(a, {
			widgetEventPrefix: r ? a.widgetEventPrefix || t : t
		}, l, {
			constructor: s,
			namespace: c,
			widgetName: t,
			widgetFullName: o
		}), r ? (e.each(r._childConstructors, function(t, n) {
			var i = n.prototype;
			e.widget(i.namespace + "." + i.widgetName, s, n._proto)
		}), delete r._childConstructors) : n._childConstructors.push(s), e.widget.bridge(t, s), s
	}, e.widget.extend = function(t) {
		for (var n, i, r = o.call(arguments, 1), s = 0, a = r.length; s < a; s++) for (n in r[s]) i = r[s][n], r[s].hasOwnProperty(n) && void 0 !== i && (e.isPlainObject(i) ? t[n] = e.isPlainObject(t[n]) ? e.widget.extend({}, t[n], i) : e.widget.extend({}, i) : t[n] = i);
		return t
	}, e.widget.bridge = function(t, n) {
		var i = n.prototype.widgetFullName || t;
		e.fn[t] = function(r) {
			var s = "string" == typeof r,
				a = o.call(arguments, 1),
				l = this;
			return r = !s && a.length ? e.widget.extend.apply(null, [r].concat(a)) : r, s ? this.each(function() {
				var n, o = e.data(this, i);
				return "instance" === r ? (l = o, !1) : o ? e.isFunction(o[r]) && "_" !== r.charAt(0) ? (n = o[r].apply(o, a), n !== o && void 0 !== n ? (l = n && n.jquery ? l.pushStack(n.get()) : n, !1) : void 0) : e.error("no such method '" + r + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + r + "'")
			}) : this.each(function() {
				var t = e.data(this, i);
				t ? (t.option(r || {}), t._init && t._init()) : e.data(this, i, new n(r, this))
			}), l
		}
	}, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: !1,
			create: null
		},
		_createWidget: function(t, n) {
			n = e(n || this.defaultElement || this)[0], this.element = e(n), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), n !== this && (e.data(n, this.widgetFullName, this), this._on(!0, this.element, {
				remove: function(e) {
					e.target === n && this.destroy()
				}
			}), this.document = e(n.style ? n.ownerDocument : n.document || n), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
		},
		_getCreateOptions: e.noop,
		_getCreateEventData: e.noop,
		_create: e.noop,
		_init: e.noop,
		destroy: function() {
			this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
		},
		_destroy: e.noop,
		widget: function() {
			return this.element
		},
		option: function(t, n) {
			var i, o, r, s = t;
			if (0 === arguments.length) return e.widget.extend({}, this.options);
			if ("string" == typeof t) if (s = {}, i = t.split("."), t = i.shift(), i.length) {
				for (o = s[t] = e.widget.extend({}, this.options[t]), r = 0; r < i.length - 1; r++) o[i[r]] = o[i[r]] || {}, o = o[i[r]];
				if (t = i.pop(), 1 === arguments.length) return void 0 === o[t] ? null : o[t];
				o[t] = n
			} else {
				if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
				s[t] = n
			}
			return this._setOptions(s), this
		},
		_setOptions: function(e) {
			var t;
			for (t in e) this._setOption(t, e[t]);
			return this
		},
		_setOption: function(e, t) {
			return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !! t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
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
		_on: function(t, n, i) {
			var o, r = this;
			"boolean" != typeof t && (i = n, n = t, t = !1), i ? (n = o = e(n), this.bindings = this.bindings.add(n)) : (i = n, n = this.element, o = this.widget()), e.each(i, function(i, s) {
				function a() {
					if (t || r.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled")) return ("string" == typeof s ? r[s] : s).apply(r, arguments)
				}
				"string" != typeof s && (a.guid = s.guid = s.guid || a.guid || e.guid++);
				var l = i.match(/^([\w:-]*)\s*(.*)$/),
					c = l[1] + r.eventNamespace,
					d = l[2];
				d ? o.delegate(d, c, a) : n.bind(c, a)
			})
		},
		_off: function(t, n) {
			n = (n || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(n).undelegate(n), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get())
		},
		_delay: function(e, t) {
			function n() {
				return ("string" == typeof e ? i[e] : e).apply(i, arguments)
			}
			var i = this;
			return setTimeout(n, t || 0)
		},
		_hoverable: function(t) {
			this.hoverable = this.hoverable.add(t), this._on(t, {
				mouseenter: function(t) {
					e(t.currentTarget).addClass("ui-state-hover")
				},
				mouseleave: function(t) {
					e(t.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable: function(t) {
			this.focusable = this.focusable.add(t), this._on(t, {
				focusin: function(t) {
					e(t.currentTarget).addClass("ui-state-focus")
				},
				focusout: function(t) {
					e(t.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger: function(t, n, i) {
			var o, r, s = this.options[t];
			if (i = i || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], r = n.originalEvent) for (o in r) o in n || (n[o] = r[o]);
			return this.element.trigger(n, i), !(e.isFunction(s) && s.apply(this.element[0], [n].concat(i)) === !1 || n.isDefaultPrevented())
		}
	}, e.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function(t, n) {
		e.Widget.prototype["_" + t] = function(i, o, r) {
			"string" == typeof o && (o = {
				effect: o
			});
			var s, a = o ? o === !0 || "number" == typeof o ? n : o.effect || n : t;
			o = o || {}, "number" == typeof o && (o = {
				duration: o
			}), s = !e.isEmptyObject(o), o.complete = r, o.delay && i.delay(o.delay), s && e.effects && e.effects.effect[a] ? i[t](o) : a !== t && i[a] ? i[a](o.duration, o.easing, r) : i.queue(function(n) {
				e(this)[t](), r && r.call(i[0]), n()
			})
		}
	});
	var r = (e.widget, e.widget("ui.accordion", {
		version: "1.11.2",
		options: {
			active: 0,
			animate: {},
			collapsible: !1,
			event: "click",
			header: "> li > :first-child,> :not(li):even",
			heightStyle: "auto",
			icons: {
				activeHeader: "ui-icon-triangle-1-s",
				header: "ui-icon-triangle-1-e"
			},
			activate: null,
			beforeActivate: null
		},
		hideProps: {
			borderTopWidth: "hide",
			borderBottomWidth: "hide",
			paddingTop: "hide",
			paddingBottom: "hide",
			height: "hide"
		},
		showProps: {
			borderTopWidth: "show",
			borderBottomWidth: "show",
			paddingTop: "show",
			paddingBottom: "show",
			height: "show"
		},
		_create: function() {
			var t = this.options;
			this.prevShow = this.prevHide = e(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), t.collapsible || t.active !== !1 && null != t.active || (t.active = 0), this._processPanels(), t.active < 0 && (t.active += this.headers.length), this._refresh()
		},
		_getCreateEventData: function() {
			return {
				header: this.active,
				panel: this.active.length ? this.active.next() : e()
			}
		},
		_createIcons: function() {
			var t = this.options.icons;
			t && (e("<span>").addClass("ui-accordion-header-icon ui-icon " + t.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader), this.headers.addClass("ui-accordion-icons"))
		},
		_destroyIcons: function() {
			this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
		},
		_destroy: function() {
			var e;
			this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(), this._destroyIcons(), e = this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && e.css("height", "")
		},
		_setOption: function(e, t) {
			return "active" === e ? void this._activate(t) : ("event" === e && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(t)), this._super(e, t), "collapsible" !== e || t || this.options.active !== !1 || this._activate(0), "icons" === e && (this._destroyIcons(), t && this._createIcons()), void("disabled" === e && (this.element.toggleClass("ui-state-disabled", !! t).attr("aria-disabled", t), this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !! t))))
		},
		_keydown: function(t) {
			if (!t.altKey && !t.ctrlKey) {
				var n = e.ui.keyCode,
					i = this.headers.length,
					o = this.headers.index(t.target),
					r = !1;
				switch (t.keyCode) {
				case n.RIGHT:
				case n.DOWN:
					r = this.headers[(o + 1) % i];
					break;
				case n.LEFT:
				case n.UP:
					r = this.headers[(o - 1 + i) % i];
					break;
				case n.SPACE:
				case n.ENTER:
					this._eventHandler(t);
					break;
				case n.HOME:
					r = this.headers[0];
					break;
				case n.END:
					r = this.headers[i - 1]
				}
				r && (e(t.target).attr("tabIndex", -1), e(r).attr("tabIndex", 0), r.focus(), t.preventDefault())
			}
		},
		_panelKeyDown: function(t) {
			t.keyCode === e.ui.keyCode.UP && t.ctrlKey && e(t.currentTarget).prev().focus()
		},
		refresh: function() {
			var t = this.options;
			this._processPanels(), t.active === !1 && t.collapsible === !0 || !this.headers.length ? (t.active = !1, this.active = e()) : t.active === !1 ? this._activate(0) : this.active.length && !e.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (t.active = !1, this.active = e()) : this._activate(Math.max(0, t.active - 1)) : t.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
		},
		_processPanels: function() {
			var e = this.headers,
				t = this.panels;
			this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"), this.panels = this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(), t && (this._off(e.not(this.headers)), this._off(t.not(this.panels)))
		},
		_refresh: function() {
			var t, n = this.options,
				i = n.heightStyle,
				o = this.element.parent();
			this.active = this._findActive(n.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function() {
				var t = e(this),
					n = t.uniqueId().attr("id"),
					i = t.next(),
					o = i.uniqueId().attr("id");
				t.attr("aria-controls", o), i.attr("aria-labelledby", n)
			}).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
				"aria-selected": "false",
				"aria-expanded": "false",
				tabIndex: -1
			}).next().attr({
				"aria-hidden": "true"
			}).hide(), this.active.length ? this.active.attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			}).next().attr({
				"aria-hidden": "false"
			}) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(n.event), "fill" === i ? (t = o.height(), this.element.siblings(":visible").each(function() {
				var n = e(this),
					i = n.css("position");
				"absolute" !== i && "fixed" !== i && (t -= n.outerHeight(!0))
			}), this.headers.each(function() {
				t -= e(this).outerHeight(!0)
			}), this.headers.next().each(function() {
				e(this).height(Math.max(0, t - e(this).innerHeight() + e(this).height()))
			}).css("overflow", "auto")) : "auto" === i && (t = 0, this.headers.next().each(function() {
				t = Math.max(t, e(this).css("height", "").height())
			}).height(t))
		},
		_activate: function(t) {
			var n = this._findActive(t)[0];
			n !== this.active[0] && (n = n || this.active[0], this._eventHandler({
				target: n,
				currentTarget: n,
				preventDefault: e.noop
			}))
		},
		_findActive: function(t) {
			return "number" == typeof t ? this.headers.eq(t) : e()
		},
		_setupEvents: function(t) {
			var n = {
				keydown: "_keydown"
			};
			t && e.each(t.split(" "), function(e, t) {
				n[t] = "_eventHandler"
			}), this._off(this.headers.add(this.headers.next())), this._on(this.headers, n), this._on(this.headers.next(), {
				keydown: "_panelKeyDown"
			}), this._hoverable(this.headers), this._focusable(this.headers)
		},
		_eventHandler: function(t) {
			var n = this.options,
				i = this.active,
				o = e(t.currentTarget),
				r = o[0] === i[0],
				s = r && n.collapsible,
				a = s ? e() : o.next(),
				l = i.next(),
				c = {
					oldHeader: i,
					oldPanel: l,
					newHeader: s ? e() : o,
					newPanel: a
				};
			t.preventDefault(), r && !n.collapsible || this._trigger("beforeActivate", t, c) === !1 || (n.active = !s && this.headers.index(o), this.active = r ? e() : o, this._toggle(c), i.removeClass("ui-accordion-header-active ui-state-active"), n.icons && i.children(".ui-accordion-header-icon").removeClass(n.icons.activeHeader).addClass(n.icons.header), r || (o.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), n.icons && o.children(".ui-accordion-header-icon").removeClass(n.icons.header).addClass(n.icons.activeHeader), o.next().addClass("ui-accordion-content-active")))
		},
		_toggle: function(t) {
			var n = t.newPanel,
				i = this.prevShow.length ? this.prevShow : t.oldPanel;
			this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = n, this.prevHide = i, this.options.animate ? this._animate(n, i, t) : (i.hide(), n.show(), this._toggleComplete(t)), i.attr({
				"aria-hidden": "true"
			}), i.prev().attr("aria-selected", "false"), n.length && i.length ? i.prev().attr({
				tabIndex: -1,
				"aria-expanded": "false"
			}) : n.length && this.headers.filter(function() {
				return 0 === e(this).attr("tabIndex")
			}).attr("tabIndex", -1), n.attr("aria-hidden", "false").prev().attr({
				"aria-selected": "true",
				tabIndex: 0,
				"aria-expanded": "true"
			})
		},
		_animate: function(e, t, n) {
			var i, o, r, s = this,
				a = 0,
				l = e.length && (!t.length || e.index() < t.index()),
				c = this.options.animate || {},
				d = l && c.down || c,
				u = function() {
					s._toggleComplete(n)
				};
			return "number" == typeof d && (r = d), "string" == typeof d && (o = d), o = o || d.easing || c.easing, r = r || d.duration || c.duration, t.length ? e.length ? (i = e.show().outerHeight(), t.animate(this.hideProps, {
				duration: r,
				easing: o,
				step: function(e, t) {
					t.now = Math.round(e)
				}
			}), void e.hide().animate(this.showProps, {
				duration: r,
				easing: o,
				complete: u,
				step: function(e, n) {
					n.now = Math.round(e), "height" !== n.prop ? a += n.now : "content" !== s.options.heightStyle && (n.now = Math.round(i - t.outerHeight() - a), a = 0)
				}
			})) : t.animate(this.hideProps, r, o, u) : e.animate(this.showProps, r, o, u)
		},
		_toggleComplete: function(e) {
			var t = e.oldPanel;
			t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), t.length && (t.parent()[0].className = t.parent()[0].className), this._trigger("activate", null, e)
		}
	}), e.widget("ui.tabs", {
		version: "1.11.2",
		delay: 300,
		options: {
			active: null,
			collapsible: !1,
			event: "click",
			heightStyle: "content",
			hide: null,
			show: null,
			activate: null,
			beforeActivate: null,
			beforeLoad: null,
			load: null
		},
		_isLocal: function() {
			var e = /#.*$/;
			return function(t) {
				var n, i;
				t = t.cloneNode(!1), n = t.href.replace(e, ""), i = location.href.replace(e, "");
				try {
					n = decodeURIComponent(n)
				} catch (o) {}
				try {
					i = decodeURIComponent(i)
				} catch (o) {}
				return t.hash.length > 1 && n === i
			}
		}(),
		_create: function() {
			var t = this,
				n = this.options;
			this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", n.collapsible), this._processTabs(), n.active = this._initialActive(), e.isArray(n.disabled) && (n.disabled = e.unique(n.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"), function(e) {
				return t.tabs.index(e)
			}))).sort()), this.options.active !== !1 && this.anchors.length ? this.active = this._findActive(n.active) : this.active = e(), this._refresh(), this.active.length && this.load(n.active)
		},
		_initialActive: function() {
			var t = this.options.active,
				n = this.options.collapsible,
				i = location.hash.substring(1);
			return null === t && (i && this.tabs.each(function(n, o) {
				if (e(o).attr("aria-controls") === i) return t = n, !1
			}), null === t && (t = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), null !== t && t !== -1 || (t = !! this.tabs.length && 0)), t !== !1 && (t = this.tabs.index(this.tabs.eq(t)), t === -1 && (t = !n && 0)), !n && t === !1 && this.anchors.length && (t = 0), t
		},
		_getCreateEventData: function() {
			return {
				tab: this.active,
				panel: this.active.length ? this._getPanelForTab(this.active) : e()
			}
		},
		_tabKeydown: function(t) {
			var n = e(this.document[0].activeElement).closest("li"),
				i = this.tabs.index(n),
				o = !0;
			if (!this._handlePageNav(t)) {
				switch (t.keyCode) {
				case e.ui.keyCode.RIGHT:
				case e.ui.keyCode.DOWN:
					i++;
					break;
				case e.ui.keyCode.UP:
				case e.ui.keyCode.LEFT:
					o = !1, i--;
					break;
				case e.ui.keyCode.END:
					i = this.anchors.length - 1;
					break;
				case e.ui.keyCode.HOME:
					i = 0;
					break;
				case e.ui.keyCode.SPACE:
					return t.preventDefault(), clearTimeout(this.activating), void this._activate(i);
				case e.ui.keyCode.ENTER:
					return t.preventDefault(), clearTimeout(this.activating), void this._activate(i !== this.options.active && i);
				default:
					return
				}
				t.preventDefault(), clearTimeout(this.activating), i = this._focusNextTab(i, o), t.ctrlKey || (n.attr("aria-selected", "false"), this.tabs.eq(i).attr("aria-selected", "true"), this.activating = this._delay(function() {
					this.option("active", i)
				}, this.delay))
			}
		},
		_panelKeydown: function(t) {
			this._handlePageNav(t) || t.ctrlKey && t.keyCode === e.ui.keyCode.UP && (t.preventDefault(), this.active.focus())
		},
		_handlePageNav: function(t) {
			return t.altKey && t.keyCode === e.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : t.altKey && t.keyCode === e.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
		},
		_findNextTab: function(t, n) {
			function i() {
				return t > o && (t = 0), t < 0 && (t = o), t
			}
			for (var o = this.tabs.length - 1; e.inArray(i(), this.options.disabled) !== -1;) t = n ? t + 1 : t - 1;
			return t
		},
		_focusNextTab: function(e, t) {
			return e = this._findNextTab(e, t), this.tabs.eq(e).focus(), e
		},
		_setOption: function(e, t) {
			return "active" === e ? void this._activate(t) : "disabled" === e ? void this._setupDisabled(t) : (this._super(e, t), "collapsible" === e && (this.element.toggleClass("ui-tabs-collapsible", t), t || this.options.active !== !1 || this._activate(0)), "event" === e && this._setupEvents(t), void("heightStyle" === e && this._setupHeightStyle(t)))
		},
		_sanitizeSelector: function(e) {
			return e ? e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
		},
		refresh: function() {
			var t = this.options,
				n = this.tablist.children(":has(a[href])");
			t.disabled = e.map(n.filter(".ui-state-disabled"), function(e) {
				return n.index(e)
			}), this._processTabs(), t.active !== !1 && this.anchors.length ? this.active.length && !e.contains(this.tablist[0], this.active[0]) ? this.tabs.length === t.disabled.length ? (t.active = !1, this.active = e()) : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) : t.active = this.tabs.index(this.active) : (t.active = !1, this.active = e()), this._refresh()
		},
		_refresh: function() {
			this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
				"aria-selected": "false",
				"aria-expanded": "false",
				tabIndex: -1
			}), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
				"aria-hidden": "true"
			}), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			}), this._getPanelForTab(this.active).show().attr({
				"aria-hidden": "false"
			})) : this.tabs.eq(0).attr("tabIndex", 0)
		},
		_processTabs: function() {
			var t = this,
				n = this.tabs,
				i = this.anchors,
				o = this.panels;
			this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function(t) {
				e(this).is(".ui-state-disabled") && t.preventDefault()
			}).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
				e(this).closest("li").is(".ui-state-disabled") && this.blur()
			}), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
				role: "tab",
				tabIndex: -1
			}), this.anchors = this.tabs.map(function() {
				return e("a", this)[0]
			}).addClass("ui-tabs-anchor").attr({
				role: "presentation",
				tabIndex: -1
			}), this.panels = e(), this.anchors.each(function(n, i) {
				var o, r, s, a = e(i).uniqueId().attr("id"),
					l = e(i).closest("li"),
					c = l.attr("aria-controls");
				t._isLocal(i) ? (o = i.hash, s = o.substring(1), r = t.element.find(t._sanitizeSelector(o))) : (s = l.attr("aria-controls") || e({}).uniqueId()[0].id, o = "#" + s, r = t.element.find(o), r.length || (r = t._createPanel(s), r.insertAfter(t.panels[n - 1] || t.tablist)), r.attr("aria-live", "polite")), r.length && (t.panels = t.panels.add(r)), c && l.data("ui-tabs-aria-controls", c), l.attr({
					"aria-controls": s,
					"aria-labelledby": a
				}), r.attr("aria-labelledby", a)
			}), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel"), n && (this._off(n.not(this.tabs)), this._off(i.not(this.anchors)), this._off(o.not(this.panels)))
		},
		_getList: function() {
			return this.tablist || this.element.find("ol,ul").eq(0)
		},
		_createPanel: function(t) {
			return e("<div>").attr("id", t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
		},
		_setupDisabled: function(t) {
			e.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1);
			for (var n, i = 0; n = this.tabs[i]; i++) t === !0 || e.inArray(i, t) !== -1 ? e(n).addClass("ui-state-disabled").attr("aria-disabled", "true") : e(n).removeClass("ui-state-disabled").removeAttr("aria-disabled");
			this.options.disabled = t
		},
		_setupEvents: function(t) {
			var n = {};
			t && e.each(t.split(" "), function(e, t) {
				n[t] = "_eventHandler"
			}), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
				click: function(e) {
					e.preventDefault()
				}
			}), this._on(this.anchors, n), this._on(this.tabs, {
				keydown: "_tabKeydown"
			}), this._on(this.panels, {
				keydown: "_panelKeydown"
			}), this._focusable(this.tabs), this._hoverable(this.tabs)
		},
		_setupHeightStyle: function(t) {
			var n, i = this.element.parent();
			"fill" === t ? (n = i.height(), n -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
				var t = e(this),
					i = t.css("position");
				"absolute" !== i && "fixed" !== i && (n -= t.outerHeight(!0))
			}), this.element.children().not(this.panels).each(function() {
				n -= e(this).outerHeight(!0)
			}), this.panels.each(function() {
				e(this).height(Math.max(0, n - e(this).innerHeight() + e(this).height()))
			}).css("overflow", "auto")) : "auto" === t && (n = 0, this.panels.each(function() {
				n = Math.max(n, e(this).height("").height())
			}).height(n))
		},
		_eventHandler: function(t) {
			var n = this.options,
				i = this.active,
				o = e(t.currentTarget),
				r = o.closest("li"),
				s = r[0] === i[0],
				a = s && n.collapsible,
				l = a ? e() : this._getPanelForTab(r),
				c = i.length ? this._getPanelForTab(i) : e(),
				d = {
					oldTab: i,
					oldPanel: c,
					newTab: a ? e() : r,
					newPanel: l
				};
			t.preventDefault(), r.hasClass("ui-state-disabled") || r.hasClass("ui-tabs-loading") || this.running || s && !n.collapsible || this._trigger("beforeActivate", t, d) === !1 || (n.active = !a && this.tabs.index(r), this.active = s ? e() : r, this.xhr && this.xhr.abort(), c.length || l.length || e.error("jQuery UI Tabs: Mismatching fragment identifier."), l.length && this.load(this.tabs.index(r), t), this._toggle(t, d))
		},
		_toggle: function(t, n) {
			function i() {
				r.running = !1, r._trigger("activate", t, n)
			}
			function o() {
				n.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), s.length && r.options.show ? r._show(s, r.options.show, i) : (s.show(), i())
			}
			var r = this,
				s = n.newPanel,
				a = n.oldPanel;
			this.running = !0, a.length && this.options.hide ? this._hide(a, this.options.hide, function() {
				n.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), o()
			}) : (n.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), a.hide(), o()), a.attr("aria-hidden", "true"), n.oldTab.attr({
				"aria-selected": "false",
				"aria-expanded": "false"
			}), s.length && a.length ? n.oldTab.attr("tabIndex", -1) : s.length && this.tabs.filter(function() {
				return 0 === e(this).attr("tabIndex")
			}).attr("tabIndex", -1), s.attr("aria-hidden", "false"), n.newTab.attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			})
		},
		_activate: function(t) {
			var n, i = this._findActive(t);
			i[0] !== this.active[0] && (i.length || (i = this.active), n = i.find(".ui-tabs-anchor")[0], this._eventHandler({
				target: n,
				currentTarget: n,
				preventDefault: e.noop
			}))
		},
		_findActive: function(t) {
			return t === !1 ? e() : this.tabs.eq(t)
		},
		_getIndex: function(e) {
			return "string" == typeof e && (e = this.anchors.index(this.anchors.filter("[href$='" + e + "']"))), e
		},
		_destroy: function() {
			this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tablist.unbind(this.eventNamespace), this.tabs.add(this.panels).each(function() {
				e.data(this, "ui-tabs-destroy") ? e(this).remove() : e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
			}), this.tabs.each(function() {
				var t = e(this),
					n = t.data("ui-tabs-aria-controls");
				n ? t.attr("aria-controls", n).removeData("ui-tabs-aria-controls") : t.removeAttr("aria-controls")
			}), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
		},
		enable: function(t) {
			var n = this.options.disabled;
			n !== !1 && (void 0 === t ? n = !1 : (t = this._getIndex(t), n = e.isArray(n) ? e.map(n, function(e) {
				return e !== t ? e : null
			}) : e.map(this.tabs, function(e, n) {
				return n !== t ? n : null
			})), this._setupDisabled(n))
		},
		disable: function(t) {
			var n = this.options.disabled;
			if (n !== !0) {
				if (void 0 === t) n = !0;
				else {
					if (t = this._getIndex(t), e.inArray(t, n) !== -1) return;
					n = e.isArray(n) ? e.merge([t], n).sort() : [t]
				}
				this._setupDisabled(n)
			}
		},
		load: function(t, n) {
			t = this._getIndex(t);
			var i = this,
				o = this.tabs.eq(t),
				r = o.find(".ui-tabs-anchor"),
				s = this._getPanelForTab(o),
				a = {
					tab: o,
					panel: s
				};
			this._isLocal(r[0]) || (this.xhr = e.ajax(this._ajaxSettings(r, n, a)), this.xhr && "canceled" !== this.xhr.statusText && (o.addClass("ui-tabs-loading"), s.attr("aria-busy", "true"), this.xhr.success(function(e) {
				setTimeout(function() {
					s.html(e), i._trigger("load", n, a)
				}, 1)
			}).complete(function(e, t) {
				setTimeout(function() {
					"abort" === t && i.panels.stop(!1, !0), o.removeClass("ui-tabs-loading"), s.removeAttr("aria-busy"), e === i.xhr && delete i.xhr
				}, 1)
			})))
		},
		_ajaxSettings: function(t, n, i) {
			var o = this;
			return {
				url: t.attr("href"),
				beforeSend: function(t, r) {
					return o._trigger("beforeLoad", n, e.extend({
						jqXHR: t,
						ajaxSettings: r
					}, i))
				}
			}
		},
		_getPanelForTab: function(t) {
			var n = e(t).attr("aria-controls");
			return this.element.find(this._sanitizeSelector("#" + n))
		}
	}), "ui-effects-"),
		s = e;
	e.effects = {
		effect: {}
	}, function(e, t) {
		function n(e, t, n) {
			var i = u[t.type] || {};
			return null == e ? n || !t.def ? null : t.def : (e = i.floor ? ~~e : parseFloat(e), isNaN(e) ? t.def : i.mod ? (e + i.mod) % i.mod : 0 > e ? 0 : i.max < e ? i.max : e)
		}
		function i(t) {
			var n = c(),
				i = n._rgba = [];
			return t = t.toLowerCase(), f(l, function(e, o) {
				var r, s = o.re.exec(t),
					a = s && o.parse(s),
					l = o.space || "rgba";
				if (a) return r = n[l](a), n[d[l].cache] = r[d[l].cache], i = n._rgba = r._rgba, !1
			}), i.length ? ("0,0,0,0" === i.join() && e.extend(i, r.transparent), n) : r[t]
		}
		function o(e, t, n) {
			return n = (n + 1) % 1, 6 * n < 1 ? e + (t - e) * n * 6 : 2 * n < 1 ? t : 3 * n < 2 ? e + (t - e) * (2 / 3 - n) * 6 : e
		}
		var r, s = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
			a = /^([\-+])=\s*(\d+\.?\d*)/,
			l = [{
				re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				parse: function(e) {
					return [e[1], e[2], e[3], e[4]]
				}
			}, {
				re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				parse: function(e) {
					return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]]
				}
			}, {
				re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
				parse: function(e) {
					return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
				}
			}, {
				re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
				parse: function(e) {
					return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
				}
			}, {
				re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				space: "hsla",
				parse: function(e) {
					return [e[1], e[2] / 100, e[3] / 100, e[4]]
				}
			}],
			c = e.Color = function(t, n, i, o) {
				return new e.Color.fn.parse(t, n, i, o)
			},
			d = {
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
			},
			u = {
				"byte": {
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
			},
			p = c.support = {},
			h = e("<p>")[0],
			f = e.each;
		h.style.cssText = "background-color:rgba(1,1,1,.5)", p.rgba = h.style.backgroundColor.indexOf("rgba") > -1, f(d, function(e, t) {
			t.cache = "_" + e, t.props.alpha = {
				idx: 3,
				type: "percent",
				def: 1
			}
		}), c.fn = e.extend(c.prototype, {
			parse: function(o, s, a, l) {
				if (o === t) return this._rgba = [null, null, null, null], this;
				(o.jquery || o.nodeType) && (o = e(o).css(s), s = t);
				var u = this,
					p = e.type(o),
					h = this._rgba = [];
				return s !== t && (o = [o, s, a, l], p = "array"), "string" === p ? this.parse(i(o) || r._default) : "array" === p ? (f(d.rgba.props, function(e, t) {
					h[t.idx] = n(o[t.idx], t)
				}), this) : "object" === p ? (o instanceof c ? f(d, function(e, t) {
					o[t.cache] && (u[t.cache] = o[t.cache].slice())
				}) : f(d, function(t, i) {
					var r = i.cache;
					f(i.props, function(e, t) {
						if (!u[r] && i.to) {
							if ("alpha" === e || null == o[e]) return;
							u[r] = i.to(u._rgba)
						}
						u[r][t.idx] = n(o[e], t, !0)
					}), u[r] && e.inArray(null, u[r].slice(0, 3)) < 0 && (u[r][3] = 1, i.from && (u._rgba = i.from(u[r])))
				}), this) : void 0
			},
			is: function(e) {
				var t = c(e),
					n = !0,
					i = this;
				return f(d, function(e, o) {
					var r, s = t[o.cache];
					return s && (r = i[o.cache] || o.to && o.to(i._rgba) || [], f(o.props, function(e, t) {
						if (null != s[t.idx]) return n = s[t.idx] === r[t.idx]
					})), n
				}), n
			},
			_space: function() {
				var e = [],
					t = this;
				return f(d, function(n, i) {
					t[i.cache] && e.push(n)
				}), e.pop()
			},
			transition: function(e, t) {
				var i = c(e),
					o = i._space(),
					r = d[o],
					s = 0 === this.alpha() ? c("transparent") : this,
					a = s[r.cache] || r.to(s._rgba),
					l = a.slice();
				return i = i[r.cache], f(r.props, function(e, o) {
					var r = o.idx,
						s = a[r],
						c = i[r],
						d = u[o.type] || {};
					null !== c && (null === s ? l[r] = c : (d.mod && (c - s > d.mod / 2 ? s += d.mod : s - c > d.mod / 2 && (s -= d.mod)), l[r] = n((c - s) * t + s, o)))
				}), this[o](l)
			},
			blend: function(t) {
				if (1 === this._rgba[3]) return this;
				var n = this._rgba.slice(),
					i = n.pop(),
					o = c(t)._rgba;
				return c(e.map(n, function(e, t) {
					return (1 - i) * o[t] + i * e
				}))
			},
			toRgbaString: function() {
				var t = "rgba(",
					n = e.map(this._rgba, function(e, t) {
						return null == e ? t > 2 ? 1 : 0 : e
					});
				return 1 === n[3] && (n.pop(), t = "rgb("), t + n.join() + ")"
			},
			toHslaString: function() {
				var t = "hsla(",
					n = e.map(this.hsla(), function(e, t) {
						return null == e && (e = t > 2 ? 1 : 0), t && t < 3 && (e = Math.round(100 * e) + "%"), e
					});
				return 1 === n[3] && (n.pop(), t = "hsl("), t + n.join() + ")"
			},
			toHexString: function(t) {
				var n = this._rgba.slice(),
					i = n.pop();
				return t && n.push(~~ (255 * i)), "#" + e.map(n, function(e) {
					return e = (e || 0).toString(16), 1 === e.length ? "0" + e : e
				}).join("")
			},
			toString: function() {
				return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
			}
		}), c.fn.parse.prototype = c.fn, d.hsla.to = function(e) {
			if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
			var t, n, i = e[0] / 255,
				o = e[1] / 255,
				r = e[2] / 255,
				s = e[3],
				a = Math.max(i, o, r),
				l = Math.min(i, o, r),
				c = a - l,
				d = a + l,
				u = .5 * d;
			return t = l === a ? 0 : i === a ? 60 * (o - r) / c + 360 : o === a ? 60 * (r - i) / c + 120 : 60 * (i - o) / c + 240, n = 0 === c ? 0 : u <= .5 ? c / d : c / (2 - d), [Math.round(t) % 360, n, u, null == s ? 1 : s]
		}, d.hsla.from = function(e) {
			if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
			var t = e[0] / 360,
				n = e[1],
				i = e[2],
				r = e[3],
				s = i <= .5 ? i * (1 + n) : i + n - i * n,
				a = 2 * i - s;
			return [Math.round(255 * o(a, s, t + 1 / 3)), Math.round(255 * o(a, s, t)), Math.round(255 * o(a, s, t - 1 / 3)), r]
		}, f(d, function(i, o) {
			var r = o.props,
				s = o.cache,
				l = o.to,
				d = o.from;
			c.fn[i] = function(i) {
				if (l && !this[s] && (this[s] = l(this._rgba)), i === t) return this[s].slice();
				var o, a = e.type(i),
					u = "array" === a || "object" === a ? i : arguments,
					p = this[s].slice();
				return f(r, function(e, t) {
					var i = u["object" === a ? e : t.idx];
					null == i && (i = p[t.idx]), p[t.idx] = n(i, t)
				}), d ? (o = c(d(p)), o[s] = p, o) : c(p)
			}, f(r, function(t, n) {
				c.fn[t] || (c.fn[t] = function(o) {
					var r, s = e.type(o),
						l = "alpha" === t ? this._hsla ? "hsla" : "rgba" : i,
						c = this[l](),
						d = c[n.idx];
					return "undefined" === s ? d : ("function" === s && (o = o.call(this, d), s = e.type(o)), null == o && n.empty ? this : ("string" === s && (r = a.exec(o), r && (o = d + parseFloat(r[2]) * ("+" === r[1] ? 1 : -1))), c[n.idx] = o, this[l](c)))
				})
			})
		}), c.hook = function(t) {
			var n = t.split(" ");
			f(n, function(t, n) {
				e.cssHooks[n] = {
					set: function(t, o) {
						var r, s, a = "";
						if ("transparent" !== o && ("string" !== e.type(o) || (r = i(o)))) {
							if (o = c(r || o), !p.rgba && 1 !== o._rgba[3]) {
								for (s = "backgroundColor" === n ? t.parentNode : t;
								("" === a || "transparent" === a) && s && s.style;) try {
									a = e.css(s, "backgroundColor"), s = s.parentNode
								} catch (l) {}
								o = o.blend(a && "transparent" !== a ? a : "_default")
							}
							o = o.toRgbaString()
						}
						try {
							t.style[n] = o
						} catch (l) {}
					}
				}, e.fx.step[n] = function(t) {
					t.colorInit || (t.start = c(t.elem, n), t.end = c(t.end), t.colorInit = !0), e.cssHooks[n].set(t.elem, t.start.transition(t.end, t.pos))
				}
			})
		}, c.hook(s), e.cssHooks.borderColor = {
			expand: function(e) {
				var t = {};
				return f(["Top", "Right", "Bottom", "Left"], function(n, i) {
					t["border" + i + "Color"] = e
				}), t
			}
		}, r = e.Color.names = {
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
	}(s), function() {
		function t(t) {
			var n, i, o = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle,
				r = {};
			if (o && o.length && o[0] && o[o[0]]) for (i = o.length; i--;) n = o[i], "string" == typeof o[n] && (r[e.camelCase(n)] = o[n]);
			else for (n in o)"string" == typeof o[n] && (r[n] = o[n]);
			return r
		}
		function n(t, n) {
			var i, r, s = {};
			for (i in n) r = n[i], t[i] !== r && (o[i] || !e.fx.step[i] && isNaN(parseFloat(r)) || (s[i] = r));
			return s
		}
		var i = ["add", "remove", "toggle"],
			o = {
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
		e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, n) {
			e.fx.step[n] = function(e) {
				("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (s.style(e.elem, n, e.end), e.setAttr = !0)
			}
		}), e.fn.addBack || (e.fn.addBack = function(e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
		}), e.effects.animateClass = function(o, r, s, a) {
			var l = e.speed(r, s, a);
			return this.queue(function() {
				var r, s = e(this),
					a = s.attr("class") || "",
					c = l.children ? s.find("*").addBack() : s;
				c = c.map(function() {
					var n = e(this);
					return {
						el: n,
						start: t(this)
					}
				}), r = function() {
					e.each(i, function(e, t) {
						o[t] && s[t + "Class"](o[t])
					})
				}, r(), c = c.map(function() {
					return this.end = t(this.el[0]), this.diff = n(this.start, this.end), this
				}), s.attr("class", a), c = c.map(function() {
					var t = this,
						n = e.Deferred(),
						i = e.extend({}, l, {
							queue: !1,
							complete: function() {
								n.resolve(t)
							}
						});
					return this.el.animate(this.diff, i), n.promise()
				}), e.when.apply(e, c.get()).done(function() {
					r(), e.each(arguments, function() {
						var t = this.el;
						e.each(this.diff, function(e) {
							t.css(e, "")
						})
					}), l.complete.call(s[0])
				})
			})
		}, e.fn.extend({
			addClass: function(t) {
				return function(n, i, o, r) {
					return i ? e.effects.animateClass.call(this, {
						add: n
					}, i, o, r) : t.apply(this, arguments)
				}
			}(e.fn.addClass),
			removeClass: function(t) {
				return function(n, i, o, r) {
					return arguments.length > 1 ? e.effects.animateClass.call(this, {
						remove: n
					}, i, o, r) : t.apply(this, arguments)
				}
			}(e.fn.removeClass),
			toggleClass: function(t) {
				return function(n, i, o, r, s) {
					return "boolean" == typeof i || void 0 === i ? o ? e.effects.animateClass.call(this, i ? {
						add: n
					} : {
						remove: n
					}, o, r, s) : t.apply(this, arguments) : e.effects.animateClass.call(this, {
						toggle: n
					}, i, o, r)
				}
			}(e.fn.toggleClass),
			switchClass: function(t, n, i, o, r) {
				return e.effects.animateClass.call(this, {
					add: n,
					remove: t
				}, i, o, r)
			}
		})
	}(), function() {
		function t(t, n, i, o) {
			return e.isPlainObject(t) && (n = t, t = t.effect), t = {
				effect: t
			}, null == n && (n = {}), e.isFunction(n) && (o = n, i = null, n = {}), ("number" == typeof n || e.fx.speeds[n]) && (o = i, i = n, n = {}), e.isFunction(i) && (o = i, i = null), n && e.extend(t, n), i = i || n.duration, t.duration = e.fx.off ? 0 : "number" == typeof i ? i : i in e.fx.speeds ? e.fx.speeds[i] : e.fx.speeds._default, t.complete = o || n.complete, t
		}
		function n(t) {
			return !(t && "number" != typeof t && !e.fx.speeds[t]) || ("string" == typeof t && !e.effects.effect[t] || ( !! e.isFunction(t) || "object" == typeof t && !t.effect))
		}
		e.extend(e.effects, {
			version: "1.11.2",
			save: function(e, t) {
				for (var n = 0; n < t.length; n++) null !== t[n] && e.data(r + t[n], e[0].style[t[n]])
			},
			restore: function(e, t) {
				var n, i;
				for (i = 0; i < t.length; i++) null !== t[i] && (n = e.data(r + t[i]), void 0 === n && (n = ""), e.css(t[i], n))
			},
			setMode: function(e, t) {
				return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"), t
			},
			getBaseline: function(e, t) {
				var n, i;
				switch (e[0]) {
				case "top":
					n = 0;
					break;
				case "middle":
					n = .5;
					break;
				case "bottom":
					n = 1;
					break;
				default:
					n = e[0] / t.height
				}
				switch (e[1]) {
				case "left":
					i = 0;
					break;
				case "center":
					i = .5;
					break;
				case "right":
					i = 1;
					break;
				default:
					i = e[1] / t.width
				}
				return {
					x: i,
					y: n
				}
			},
			createWrapper: function(t) {
				if (t.parent().is(".ui-effects-wrapper")) return t.parent();
				var n = {
					width: t.outerWidth(!0),
					height: t.outerHeight(!0),
					"float": t.css("float")
				},
					i = e("<div></div>").addClass("ui-effects-wrapper").css({
						fontSize: "100%",
						background: "transparent",
						border: "none",
						margin: 0,
						padding: 0
					}),
					o = {
						width: t.width(),
						height: t.height()
					},
					r = document.activeElement;
				try {
					r.id
				} catch (s) {
					r = document.body
				}
				return t.wrap(i), (t[0] === r || e.contains(t[0], r)) && e(r).focus(), i = t.parent(), "static" === t.css("position") ? (i.css({
					position: "relative"
				}), t.css({
					position: "relative"
				})) : (e.extend(n, {
					position: t.css("position"),
					zIndex: t.css("z-index")
				}), e.each(["top", "left", "bottom", "right"], function(e, i) {
					n[i] = t.css(i), isNaN(parseInt(n[i], 10)) && (n[i] = "auto")
				}), t.css({
					position: "relative",
					top: 0,
					left: 0,
					right: "auto",
					bottom: "auto"
				})), t.css(o), i.css(n).show()
			},
			removeWrapper: function(t) {
				var n = document.activeElement;
				return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === n || e.contains(t[0], n)) && e(n).focus()), t
			},
			setTransition: function(t, n, i, o) {
				return o = o || {}, e.each(n, function(e, n) {
					var r = t.cssUnit(n);
					r[0] > 0 && (o[n] = r[0] * i + r[1])
				}), o
			}
		}), e.fn.extend({
			effect: function() {
				function n(t) {
					function n() {
						e.isFunction(r) && r.call(o[0]), e.isFunction(t) && t()
					}
					var o = e(this),
						r = i.complete,
						a = i.mode;
					(o.is(":hidden") ? "hide" === a : "show" === a) ? (o[a](), n()) : s.call(o[0], i, n)
				}
				var i = t.apply(this, arguments),
					o = i.mode,
					r = i.queue,
					s = e.effects.effect[i.effect];
				return e.fx.off || !s ? o ? this[o](i.duration, i.complete) : this.each(function() {
					i.complete && i.complete.call(this)
				}) : r === !1 ? this.each(n) : this.queue(r || "fx", n)
			},
			show: function(e) {
				return function(i) {
					if (n(i)) return e.apply(this, arguments);
					var o = t.apply(this, arguments);
					return o.mode = "show", this.effect.call(this, o)
				}
			}(e.fn.show),
			hide: function(e) {
				return function(i) {
					if (n(i)) return e.apply(this, arguments);
					var o = t.apply(this, arguments);
					return o.mode = "hide", this.effect.call(this, o)
				}
			}(e.fn.hide),
			toggle: function(e) {
				return function(i) {
					if (n(i) || "boolean" == typeof i) return e.apply(this, arguments);
					var o = t.apply(this, arguments);
					return o.mode = "toggle", this.effect.call(this, o)
				}
			}(e.fn.toggle),
			cssUnit: function(t) {
				var n = this.css(t),
					i = [];
				return e.each(["em", "px", "%", "pt"], function(e, t) {
					n.indexOf(t) > 0 && (i = [parseFloat(n), t])
				}), i
			}
		})
	}(), function() {
		var t = {};
		e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(e, n) {
			t[n] = function(t) {
				return Math.pow(t, e + 2)
			}
		}), e.extend(t, {
			Sine: function(e) {
				return 1 - Math.cos(e * Math.PI / 2)
			},
			Circ: function(e) {
				return 1 - Math.sqrt(1 - e * e)
			},
			Elastic: function(e) {
				return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
			},
			Back: function(e) {
				return e * e * (3 * e - 2)
			},
			Bounce: function(e) {
				for (var t, n = 4; e < ((t = Math.pow(2, --n)) - 1) / 11;);
				return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
			}
		}), e.each(t, function(t, n) {
			e.easing["easeIn" + t] = n, e.easing["easeOut" + t] = function(e) {
				return 1 - n(1 - e)
			}, e.easing["easeInOut" + t] = function(e) {
				return e < .5 ? n(2 * e) / 2 : 1 - n(e * -2 + 2) / 2
			}
		})
	}();
	e.effects
}), function(e) {
	function t(t, n, i, o) {
		var r = t.text().split(n),
			s = "";
		r.length && (e(r).each(function(e, t) {
			s += '<span class="' + i + (e + 1) + '">' + t + "</span>" + o
		}), t.empty().append(s))
	}
	var n = {
		init: function() {
			return this.each(function() {
				t(e(this), "", "char", "")
			})
		},
		words: function() {
			return this.each(function() {
				t(e(this), " ", "word", " ")
			})
		},
		lines: function() {
			return this.each(function() {
				var n = "eefec303079ad17405c889e092e105b0";
				t(e(this).children("br").replaceWith(n).end(), n, "line", "")
			})
		}
	};
	e.fn.lettering = function(t) {
		return t && n[t] ? n[t].apply(this, [].slice.call(arguments, 1)) : "letters" !== t && t ? (e.error("Method " + t + " does not exist on jQuery.lettering"), this) : n.init.apply(this, [].slice.call(arguments, 0))
	}
}(jQuery), function() {
	function e() {
		var e = "";
		for (var t in this)"function" != typeof this[t] && (e += t + '="' + this[t] + '" ');
		return e
	}
	function t() {
		var e = "";
		for (var t in this)"function" != typeof this[t] && (e += t + "=" + encodeURIComponent(this[t]) + "&");
		return e.replace(/&$/, "")
	}
	var n;
	n = jQuery.fn.flash = function(e, t, i, o) {
		var r = i || n.replace;
		if (t = n.copy(n.pluginOptions, t), !n.hasFlash(t.version)) if (t.expressInstall && n.hasFlash(6, 0, 65)) var s = {
			flashvars: {
				MMredirectURL: location,
				MMplayerType: "PlugIn",
				MMdoctitle: jQuery("title").text()
			}
		};
		else {
			if (!t.update) return this;
			r = o || n.update
		}
		return e = n.copy(n.htmlOptions, s, e), this.each(function() {
			r.call(this, n.copy(e))
		})
	}, n.copy = function() {
		for (var e = {}, t = {}, n = 0; n < arguments.length; n++) {
			var i = arguments[n];
			void 0 != i && (jQuery.extend(e, i), void 0 != i.flashvars && jQuery.extend(t, i.flashvars))
		}
		return e.flashvars = t, e
	}, n.hasFlash = function() {
		if (/hasFlash\=true/.test(location)) return !0;
		if (/hasFlash\=false/.test(location)) return !1;
		for (var e = n.hasFlash.playerVersion().match(/\d+/g), t = String([arguments[0], arguments[1], arguments[2]]).match(/\d+/g) || String(n.pluginOptions.version).match(/\d+/g), i = 0; i < 3; i++) {
			if (e[i] = parseInt(e[i] || 0), t[i] = parseInt(t[i] || 0), e[i] < t[i]) return !1;
			if (e[i] > t[i]) return !0
		}
		return !0
	}, n.hasFlash.playerVersion = function() {
		try {
			try {
				var e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				try {
					e.AllowScriptAccess = "always"
				} catch (t) {
					return "6,0,0"
				}
			} catch (t) {}
			return new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
		} catch (t) {
			try {
				if (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
			} catch (t) {}
		}
		return "0,0,0"
	}, n.htmlOptions = {
		height: 240,
		flashvars: {},
		pluginspage: "http://www.adobe.com/go/getflashplayer",
		src: "#",
		type: "application/x-shockwave-flash",
		width: 320
	}, n.pluginOptions = {
		expressInstall: !1,
		update: !0,
		version: "6.0.65"
	}, n.replace = function(e) {
		this.innerHTML = '<div class="alt">' + this.innerHTML + "</div>", jQuery(this).addClass("flash-replaced").prepend(n.transform(e))
	}, n.update = function(e) {
		var t = String(location).split("?");
		t.splice(1, 0, "?hasFlash=true&"), t = t.join("");
		var n = '<p>This content requires the Flash Player. <a href="http://www.adobe.com/go/getflashplayer">Download Flash Player</a>. Already have Flash Player? <a href="' + t + '">Click here.</a></p>';
		this.innerHTML = '<span class="alt">' + this.innerHTML + "</span>", jQuery(this).addClass("flash-update").prepend(n)
	}, n.transform = function(n) {
		return n.toString = e, n.flashvars && (n.flashvars.toString = t), "<embed " + String(n) + "/>"
	}, window.attachEvent && window.attachEvent("onbeforeunload", function() {
		__flash_unloadHandler = function() {}, __flash_savedUnloadHandler = function() {}
	})
}(), function(e) {
	"use strict";
	"function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
	"use strict";
	var t = window.Slick || {};
	t = function() {
		function t(t, i) {
			var o, r, s, a = this;
			if (a.defaults = {
				accessibility: !0,
				adaptiveHeight: !1,
				appendArrows: e(t),
				appendDots: e(t),
				arrows: !0,
				asNavFor: null,
				prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="previous">Previous</button>',
				nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="next">Next</button>',
				autoplay: !1,
				autoplaySpeed: 3e3,
				centerMode: !1,
				centerPadding: "50px",
				cssEase: "ease",
				customPaging: function(e, t) {
					return '<button type="button" data-role="none">' + (t + 1) + "</button>"
				},
				dots: !1,
				dotsClass: "slick-dots",
				draggable: !0,
				easing: "linear",
				edgeFriction: .35,
				fade: !1,
				focusOnSelect: !1,
				infinite: !0,
				initialSlide: 0,
				lazyLoad: "ondemand",
				mobileFirst: !1,
				pauseOnHover: !0,
				pauseOnDotsHover: !1,
				respondTo: "window",
				responsive: null,
				rtl: !1,
				slide: "",
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				swipe: !0,
				swipeToSlide: !1,
				touchMove: !0,
				touchThreshold: 5,
				useCSS: !0,
				variableWidth: !1,
				vertical: !1,
				waitForAnimate: !0
			}, a.initials = {
				animating: !1,
				dragging: !1,
				autoPlayTimer: null,
				currentDirection: 0,
				currentLeft: null,
				currentSlide: 0,
				direction: 1,
				$dots: null,
				listWidth: null,
				listHeight: null,
				loadIndex: 0,
				$nextArrow: null,
				$prevArrow: null,
				slideCount: null,
				slideWidth: null,
				$slideTrack: null,
				$slides: null,
				sliding: !1,
				slideOffset: 0,
				swipeLeft: null,
				$list: null,
				touchObject: {},
				transformsEnabled: !1
			}, e.extend(a, a.initials), a.activeBreakpoint = null, a.animType = null, a.animProp = null, a.breakpoints = [], a.breakpointSettings = [], a.cssTransitions = !1, a.hidden = "hidden", a.paused = !1, a.positionProp = null, a.respondTo = null, a.shouldClick = !0, a.$slider = e(t), a.$slidesCache = null, a.transformType = null, a.transitionType = null, a.visibilityChange = "visibilitychange", a.windowWidth = 0, a.windowTimer = null, o = e(t).data("slick") || {}, a.options = e.extend({}, a.defaults, o, i), a.currentSlide = a.options.initialSlide, a.originalSettings = a.options, r = a.options.responsive || null, r && r.length > -1) {
				a.respondTo = a.options.respondTo || "window";
				for (s in r) r.hasOwnProperty(s) && (a.breakpoints.push(r[s].breakpoint), a.breakpointSettings[r[s].breakpoint] = r[s].settings);
				a.breakpoints.sort(function(e, t) {
					return a.options.mobileFirst === !0 ? e - t : t - e
				})
			}
			"undefined" != typeof document.mozHidden ? (a.hidden = "mozHidden", a.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (a.hidden = "msHidden", a.visibilityChange = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (a.hidden = "webkitHidden", a.visibilityChange = "webkitvisibilitychange"), a.autoPlay = e.proxy(a.autoPlay, a), a.autoPlayClear = e.proxy(a.autoPlayClear, a), a.changeSlide = e.proxy(a.changeSlide, a), a.clickHandler = e.proxy(a.clickHandler, a), a.selectHandler = e.proxy(a.selectHandler, a), a.setPosition = e.proxy(a.setPosition, a), a.swipeHandler = e.proxy(a.swipeHandler, a), a.dragHandler = e.proxy(a.dragHandler, a), a.keyHandler = e.proxy(a.keyHandler, a), a.autoPlayIterator = e.proxy(a.autoPlayIterator, a), a.instanceUid = n++, a.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, a.init(), a.checkResponsive(!0)
		}
		var n = 0;
		return t
	}(), t.prototype.addSlide = t.prototype.slickAdd = function(t, n, i) {
		var o = this;
		if ("boolean" == typeof n) i = n, n = null;
		else if (n < 0 || n >= o.slideCount) return !1;
		o.unload(), "number" == typeof n ? 0 === n && 0 === o.$slides.length ? e(t).appendTo(o.$slideTrack) : i ? e(t).insertBefore(o.$slides.eq(n)) : e(t).insertAfter(o.$slides.eq(n)) : i === !0 ? e(t).prependTo(o.$slideTrack) : e(t).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(t, n) {
			e(n).attr("data-slick-index", t)
		}), o.$slidesCache = o.$slides, o.reinit()
	}, t.prototype.animateHeight = function() {
		var e = this;
		if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
			var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
			e.$list.animate({
				height: t
			}, e.options.speed)
		}
	}, t.prototype.animateSlide = function(t, n) {
		var i = {},
			o = this;
		o.animateHeight(), o.options.rtl === !0 && o.options.vertical === !1 && (t = -t), o.transformsEnabled === !1 ? o.options.vertical === !1 ? o.$slideTrack.animate({
			left: t
		}, o.options.speed, o.options.easing, n) : o.$slideTrack.animate({
			top: t
		}, o.options.speed, o.options.easing, n) : o.cssTransitions === !1 ? (o.options.rtl === !0 && (o.currentLeft = -o.currentLeft), e({
			animStart: o.currentLeft
		}).animate({
			animStart: t
		}, {
			duration: o.options.speed,
			easing: o.options.easing,
			step: function(e) {
				e = Math.ceil(e), o.options.vertical === !1 ? (i[o.animType] = "translate(" + e + "px, 0px)", o.$slideTrack.css(i)) : (i[o.animType] = "translate(0px," + e + "px)", o.$slideTrack.css(i))
			},
			complete: function() {
				n && n.call()
			}
		})) : (o.applyTransition(), t = Math.ceil(t), o.options.vertical === !1 ? i[o.animType] = "translate3d(" + t + "px, 0px, 0px)" : i[o.animType] = "translate3d(0px," + t + "px, 0px)", o.$slideTrack.css(i), n && setTimeout(function() {
			o.disableTransition(), n.call()
		}, o.options.speed))
	}, t.prototype.asNavFor = function(t) {
		var n = this,
			i = null !== n.options.asNavFor ? e(n.options.asNavFor).slick("getSlick") : null;
		null !== i && i.slideHandler(t, !0)
	}, t.prototype.applyTransition = function(e) {
		var t = this,
			n = {};
		t.options.fade === !1 ? n[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : n[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, t.options.fade === !1 ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
	}, t.prototype.autoPlay = function() {
		var e = this;
		e.autoPlayTimer && clearInterval(e.autoPlayTimer), e.slideCount > e.options.slidesToShow && e.paused !== !0 && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
	}, t.prototype.autoPlayClear = function() {
		var e = this;
		e.autoPlayTimer && clearInterval(e.autoPlayTimer)
	}, t.prototype.autoPlayIterator = function() {
		var e = this;
		e.options.infinite === !1 ? 1 === e.direction ? (e.currentSlide + 1 === e.slideCount - 1 && (e.direction = 0), e.slideHandler(e.currentSlide + e.options.slidesToScroll)) : (e.currentSlide - 1 === 0 && (e.direction = 1), e.slideHandler(e.currentSlide - e.options.slidesToScroll)) : e.slideHandler(e.currentSlide + e.options.slidesToScroll)
	}, t.prototype.buildArrows = function() {
		var t = this;
		t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow = e(t.options.prevArrow), t.$nextArrow = e(t.options.nextArrow), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.appendTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), t.options.infinite !== !0 && t.$prevArrow.addClass("slick-disabled"))
	}, t.prototype.buildDots = function() {
		var t, n, i = this;
		if (i.options.dots === !0 && i.slideCount > i.options.slidesToShow) {
			for (n = '<ul class="' + i.options.dotsClass + '">', t = 0; t <= i.getDotCount(); t += 1) n += "<li>" + i.options.customPaging.call(this, i, t) + "</li>";
			n += "</ul>", i.$dots = e(n).appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
		}
	}, t.prototype.buildOut = function() {
		var t = this;
		t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(t, n) {
			e(n).attr("data-slick-index", t)
		}), t.$slidesCache = t.$slides, t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), t.options.centerMode !== !0 && t.options.swipeToSlide !== !0 || (t.options.slidesToScroll = 1), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.options.accessibility === !0 && t.$list.prop("tabIndex", 0), t.setSlideClasses("number" == typeof this.currentSlide ? this.currentSlide : 0), t.options.draggable === !0 && t.$list.addClass("draggable")
	}, t.prototype.checkResponsive = function(t) {
		var n, i, o, r = this,
			s = r.$slider.width(),
			a = window.innerWidth || e(window).width();
		if ("window" === r.respondTo ? o = a : "slider" === r.respondTo ? o = s : "min" === r.respondTo && (o = Math.min(a, s)), r.originalSettings.responsive && r.originalSettings.responsive.length > -1 && null !== r.originalSettings.responsive) {
			i = null;
			for (n in r.breakpoints) r.breakpoints.hasOwnProperty(n) && (r.originalSettings.mobileFirst === !1 ? o < r.breakpoints[n] && (i = r.breakpoints[n]) : o > r.breakpoints[n] && (i = r.breakpoints[n]));
			null !== i ? null !== r.activeBreakpoint ? i !== r.activeBreakpoint && (r.activeBreakpoint = i, "unslick" === r.breakpointSettings[i] ? r.unslick() : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[i]), t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh())) : (r.activeBreakpoint = i, "unslick" === r.breakpointSettings[i] ? r.unslick() : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[i]), t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh())) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh())
		}
	}, t.prototype.changeSlide = function(t, n) {
		var i, o, r, s = this,
			a = e(t.target);
		switch (a.is("a") && t.preventDefault(), r = s.slideCount % s.options.slidesToScroll !== 0, i = r ? 0 : (s.slideCount - s.currentSlide) % s.options.slidesToScroll, t.data.message) {
		case "previous":
			o = 0 === i ? s.options.slidesToScroll : s.options.slidesToShow - i, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide - o, !1, n);
			break;
		case "next":
			o = 0 === i ? s.options.slidesToScroll : i, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide + o, !1, n);
			break;
		case "index":
			var l = 0 === t.data.index ? 0 : t.data.index || e(t.target).parent().index() * s.options.slidesToScroll;
			s.slideHandler(s.checkNavigable(l), !1, n);
			break;
		default:
			return
		}
	}, t.prototype.checkNavigable = function(e) {
		var t, n, i = this;
		if (t = i.getNavigableIndexes(), n = 0, e > t[t.length - 1]) e = t[t.length - 1];
		else for (var o in t) {
			if (e < t[o]) {
				e = n;
				break
			}
			n = t[o]
		}
		return e
	}, t.prototype.clickHandler = function(e) {
		var t = this;
		t.shouldClick === !1 && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
	}, t.prototype.destroy = function() {
		var t = this;
		t.autoPlayClear(), t.touchObject = {}, e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && "object" != typeof t.options.prevArrow && t.$prevArrow.remove(), t.$nextArrow && "object" != typeof t.options.nextArrow && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-center slick-visible").attr("aria-hidden", "true").removeAttr("data-slick-index").css({
			position: "",
			left: "",
			top: "",
			zIndex: "",
			opacity: "",
			width: ""
		}), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$list.off(".slick"), e(window).off(".slick-" + t.instanceUid), e(document).off(".slick-" + t.instanceUid), t.$slider.html(t.$slides)
	}, t.prototype.disableTransition = function(e) {
		var t = this,
			n = {};
		n[t.transitionType] = "", t.options.fade === !1 ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
	}, t.prototype.fadeSlide = function(e, t) {
		var n = this;
		n.cssTransitions === !1 ? (n.$slides.eq(e).css({
			zIndex: 1e3
		}), n.$slides.eq(e).animate({
			opacity: 1
		}, n.options.speed, n.options.easing, t)) : (n.applyTransition(e), n.$slides.eq(e).css({
			opacity: 1,
			zIndex: 1e3
		}), t && setTimeout(function() {
			n.disableTransition(e), t.call()
		}, n.options.speed))
	}, t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
		var t = this;
		null !== e && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
	}, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
		var e = this;
		return e.currentSlide
	}, t.prototype.getDotCount = function() {
		var e = this,
			t = 0,
			n = 0,
			i = 0;
		if (e.options.infinite === !0) i = Math.ceil(e.slideCount / e.options.slidesToScroll);
		else if (e.options.centerMode === !0) i = e.slideCount;
		else for (; t < e.slideCount;)++i, t = n + e.options.slidesToShow, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
		return i - 1
	}, t.prototype.getLeft = function(e) {
		var t, n, i, o = this,
			r = 0;
		return o.slideOffset = 0, n = o.$slides.first().outerHeight(), o.options.infinite === !0 ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1, r = n * o.options.slidesToShow * -1), o.slideCount % o.options.slidesToScroll !== 0 && e + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (e > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (e - o.slideCount)) * o.slideWidth * -1, r = (o.options.slidesToShow - (e - o.slideCount)) * n * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1, r = o.slideCount % o.options.slidesToScroll * n * -1))) : e + o.options.slidesToShow > o.slideCount && (o.slideOffset = (e + o.options.slidesToShow - o.slideCount) * o.slideWidth, r = (e + o.options.slidesToShow - o.slideCount) * n), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, r = 0), o.options.centerMode === !0 && o.options.infinite === !0 ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : o.options.centerMode === !0 && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), t = o.options.vertical === !1 ? e * o.slideWidth * -1 + o.slideOffset : e * n * -1 + r, o.options.variableWidth === !0 && (i = o.slideCount <= o.options.slidesToShow || o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(e) : o.$slideTrack.children(".slick-slide").eq(e + o.options.slidesToShow), t = i[0] ? i[0].offsetLeft * -1 : 0, o.options.centerMode === !0 && (i = o.options.infinite === !1 ? o.$slideTrack.children(".slick-slide").eq(e) : o.$slideTrack.children(".slick-slide").eq(e + o.options.slidesToShow + 1), t = i[0] ? i[0].offsetLeft * -1 : 0, t += (o.$list.width() - i.outerWidth()) / 2)), t
	}, t.prototype.getOption = t.prototype.slickGetOption = function(e) {
		var t = this;
		return t.options[e]
	}, t.prototype.getNavigableIndexes = function() {
		var e, t = this,
			n = 0,
			i = 0,
			o = [];
		for (t.options.infinite === !1 ? (e = t.slideCount - t.options.slidesToShow + 1, t.options.centerMode === !0 && (e = t.slideCount)) : (n = t.slideCount * -1, i = t.slideCount * -1, e = 2 * t.slideCount); n < e;) o.push(n), n = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
		return o
	}, t.prototype.getSlick = function() {
		return this
	}, t.prototype.getSlideCount = function() {
		var t, n, i, o = this;
		return i = o.options.centerMode === !0 ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, o.options.swipeToSlide === !0 ? (o.$slideTrack.find(".slick-slide").each(function(t, r) {
			if (r.offsetLeft - i + e(r).outerWidth() / 2 > o.swipeLeft * -1) return n = r, !1
		}), t = Math.abs(e(n).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
	}, t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
		var n = this;
		n.changeSlide({
			data: {
				message: "index",
				index: parseInt(e)
			}
		}, t)
	}, t.prototype.init = function() {
		var t = this;
		e(t.$slider).hasClass("slick-initialized") || (e(t.$slider).addClass("slick-initialized"), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots()), t.$slider.trigger("init", [t])
	}, t.prototype.initArrowEvents = function() {
		var e = this;
		e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.on("click.slick", {
			message: "previous"
		}, e.changeSlide), e.$nextArrow.on("click.slick", {
			message: "next"
		}, e.changeSlide))
	}, t.prototype.initDotEvents = function() {
		var t = this;
		t.options.dots === !0 && t.slideCount > t.options.slidesToShow && e("li", t.$dots).on("click.slick", {
			message: "index"
		}, t.changeSlide), t.options.dots === !0 && t.options.pauseOnDotsHover === !0 && t.options.autoplay === !0 && e("li", t.$dots).on("mouseenter.slick", function() {
			t.paused = !0, t.autoPlayClear()
		}).on("mouseleave.slick", function() {
			t.paused = !1, t.autoPlay()
		})
	}, t.prototype.initializeEvents = function() {
		var t = this;
		t.initArrowEvents(), t.initDotEvents(), t.$list.on("touchstart.slick mousedown.slick", {
			action: "start"
		}, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
			action: "move"
		}, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
			action: "end"
		}, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
			action: "end"
		}, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), t.options.autoplay === !0 && (e(document).on(t.visibilityChange, function() {
			t.visibility()
		}), t.options.pauseOnHover === !0 && (t.$list.on("mouseenter.slick", function() {
			t.paused = !0, t.autoPlayClear()
		}), t.$list.on("mouseleave.slick", function() {
			t.paused = !1, t.autoPlay()
		}))), t.options.accessibility === !0 && t.$list.on("keydown.slick", t.keyHandler), t.options.focusOnSelect === !0 && e(t.$slideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, function() {
			t.checkResponsive(), t.setPosition()
		}), e(window).on("resize.slick.slick-" + t.instanceUid, function() {
			e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
				t.windowWidth = e(window).width(), t.checkResponsive(), t.setPosition()
			}, 0))
		}), e("*[draggable!=true]", t.$slideTrack).on("dragstart", function(e) {
			e.preventDefault()
		}), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
	}, t.prototype.initUI = function() {
		var e = this;
		e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.show(), e.options.autoplay === !0 && e.autoPlay()
	}, t.prototype.keyHandler = function(e) {
		var t = this;
		37 === e.keyCode && t.options.accessibility === !0 ? t.changeSlide({
			data: {
				message: "previous"
			}
		}) : 39 === e.keyCode && t.options.accessibility === !0 && t.changeSlide({
			data: {
				message: "next"
			}
		})
	}, t.prototype.lazyLoad = function() {
		function t(t) {
			e("img[data-lazy]", t).each(function() {
				var t = e(this),
					n = e(this).attr("data-lazy");
				t.load(function() {
					t.animate({
						opacity: 1
					}, 200)
				}).css({
					opacity: 0
				}).attr("src", n).removeAttr("data-lazy").removeClass("slick-loading")
			})
		}
		var n, i, o, r, s = this;
		s.options.centerMode === !0 ? s.options.infinite === !0 ? (o = s.currentSlide + (s.options.slidesToShow / 2 + 1), r = o + s.options.slidesToShow + 2) : (o = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), r = 2 + (s.options.slidesToShow / 2 + 1) + s.currentSlide) : (o = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, r = o + s.options.slidesToShow, s.options.fade === !0 && (o > 0 && o--, r <= s.slideCount && r++)), n = s.$slider.find(".slick-slide").slice(o, r), t(n), s.slideCount <= s.options.slidesToShow ? (i = s.$slider.find(".slick-slide"), t(i)) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? (i = s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow), t(i)) : 0 === s.currentSlide && (i = s.$slider.find(".slick-cloned").slice(s.options.slidesToShow * -1), t(i))
	}, t.prototype.loadSlider = function() {
		var e = this;
		e.setPosition(), e.$slideTrack.css({
			opacity: 1
		}), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
	}, t.prototype.next = t.prototype.slickNext = function() {
		var e = this;
		e.changeSlide({
			data: {
				message: "next"
			}
		})
	}, t.prototype.pause = t.prototype.slickPause = function() {
		var e = this;
		e.autoPlayClear(), e.paused = !0
	}, t.prototype.play = t.prototype.slickPlay = function() {
		var e = this;
		e.paused = !1, e.autoPlay()
	}, t.prototype.postSlide = function(e) {
		var t = this;
		t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay === !0 && t.paused === !1 && t.autoPlay()
	}, t.prototype.prev = t.prototype.slickPrev = function() {
		var e = this;
		e.changeSlide({
			data: {
				message: "previous"
			}
		})
	}, t.prototype.progressiveLazyLoad = function() {
		var t, n, i = this;
		t = e("img[data-lazy]", i.$slider).length, t > 0 && (n = e("img[data-lazy]", i.$slider).first(), n.attr("src", n.attr("data-lazy")).removeClass("slick-loading").load(function() {
			n.removeAttr("data-lazy"), i.progressiveLazyLoad(), i.options.adaptiveHeight === !0 && i.setPosition()
		}).error(function() {
			n.removeAttr("data-lazy"), i.progressiveLazyLoad()
		}))
	}, t.prototype.refresh = function() {
		var t = this,
			n = t.currentSlide;
		t.destroy(), e.extend(t, t.initials), t.init(), t.changeSlide({
			data: {
				message: "index",
				index: n
			}
		}, !0)
	}, t.prototype.reinit = function() {
		var t = this;
		t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.options.focusOnSelect === !0 && e(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses(0), t.setPosition(), t.$slider.trigger("reInit", [t])
	}, t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, n) {
		var i = this;
		return "boolean" == typeof e ? (t = e, e = t === !0 ? 0 : i.slideCount - 1) : e = t === !0 ? --e : e, !(i.slideCount < 1 || e < 0 || e > i.slideCount - 1) && (i.unload(), n === !0 ? i.$slideTrack.children().remove() : i.$slideTrack.children(this.options.slide).eq(e).remove(), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, void i.reinit())
	}, t.prototype.setCSS = function(e) {
		var t, n, i = this,
			o = {};
		i.options.rtl === !0 && (e = -e), t = "left" == i.positionProp ? Math.ceil(e) + "px" : "0px", n = "top" == i.positionProp ? Math.ceil(e) + "px" : "0px", o[i.positionProp] = e, i.transformsEnabled === !1 ? i.$slideTrack.css(o) : (o = {}, i.cssTransitions === !1 ? (o[i.animType] = "translate(" + t + ", " + n + ")", i.$slideTrack.css(o)) : (o[i.animType] = "translate3d(" + t + ", " + n + ", 0px)", i.$slideTrack.css(o)))
	}, t.prototype.setDimensions = function() {
		var e = this;
		if (e.options.vertical === !1 ? e.options.centerMode === !0 && e.$list.css({
			padding: "0px " + e.options.centerPadding
		}) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), e.options.centerMode === !0 && e.$list.css({
			padding: e.options.centerPadding + " 0px"
		})), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), e.options.vertical === !1 && e.options.variableWidth === !1) e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length));
		else if (e.options.variableWidth === !0) {
			var t = 0;
			e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.children(".slick-slide").each(function() {
				t += e.listWidth
			}), e.$slideTrack.width(Math.ceil(t) + 1)
		} else e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length));
		var n = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
		e.options.variableWidth === !1 && e.$slideTrack.children(".slick-slide").width(e.slideWidth - n)
	}, t.prototype.setFade = function() {
		var t, n = this;
		n.$slides.each(function(i, o) {
			t = n.slideWidth * i * -1, n.options.rtl === !0 ? e(o).css({
				position: "relative",
				right: t,
				top: 0,
				zIndex: 800,
				opacity: 0
			}) : e(o).css({
				position: "relative",
				left: t,
				top: 0,
				zIndex: 800,
				opacity: 0
			})
		}), n.$slides.eq(n.currentSlide).css({
			zIndex: 900,
			opacity: 1
		})
	}, t.prototype.setHeight = function() {
		var e = this;
		if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
			var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
			e.$list.css("height", t)
		}
	}, t.prototype.setOption = t.prototype.slickSetOption = function(e, t, n) {
		var i = this;
		i.options[e] = t, n === !0 && (i.unload(), i.reinit())
	}, t.prototype.setPosition = function() {
		var e = this;
		e.setDimensions(), e.setHeight(), e.options.fade === !1 ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
	}, t.prototype.setProps = function() {
		var e = this,
			t = document.body.style;
		e.positionProp = e.options.vertical === !0 ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || e.options.useCSS === !0 && (e.cssTransitions = !0), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && e.animType !== !1 && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = null !== e.animType && e.animType !== !1
	}, t.prototype.setSlideClasses = function(e) {
		var t, n, i, o, r = this;
		r.$slider.find(".slick-slide").removeClass("slick-active").attr("aria-hidden", "true").removeClass("slick-center"), n = r.$slider.find(".slick-slide"), r.options.centerMode === !0 ? (t = Math.floor(r.options.slidesToShow / 2), r.options.infinite === !0 && (e >= t && e <= r.slideCount - 1 - t ? r.$slides.slice(e - t, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (i = r.options.slidesToShow + e, n.slice(i - t + 1, i + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? n.eq(n.length - 1 - r.options.slidesToShow).addClass("slick-center") : e === r.slideCount - 1 && n.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(e).addClass("slick-center")) : e >= 0 && e <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(e, e + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= r.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (o = r.slideCount % r.options.slidesToShow, i = r.options.infinite === !0 ? r.options.slidesToShow + e : e, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - e < r.options.slidesToShow ? n.slice(i - (r.options.slidesToShow - o), i + o).addClass("slick-active").attr("aria-hidden", "false") : n.slice(i, i + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === r.options.lazyLoad && r.lazyLoad()
	}, t.prototype.setupInfinite = function() {
		var t, n, i, o = this;
		if (o.options.fade === !0 && (o.options.centerMode = !1), o.options.infinite === !0 && o.options.fade === !1 && (n = null, o.slideCount > o.options.slidesToShow)) {
			for (i = o.options.centerMode === !0 ? o.options.slidesToShow + 1 : o.options.slidesToShow, t = o.slideCount; t > o.slideCount - i; t -= 1) n = t - 1, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
			for (t = 0; t < i; t += 1) n = t, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
			o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
				e(this).attr("id", "")
			})
		}
	}, t.prototype.selectHandler = function(t) {
		var n = this,
			i = parseInt(e(t.target).parents(".slick-slide").attr("data-slick-index"));
		return i || (i = 0), n.slideCount <= n.options.slidesToShow ? (n.$slider.find(".slick-slide").removeClass("slick-active").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-active").attr("aria-hidden", "false"), n.options.centerMode === !0 && (n.$slider.find(".slick-slide").removeClass("slick-center"), n.$slides.eq(i).addClass("slick-center")), void n.asNavFor(i)) : void n.slideHandler(i)
	}, t.prototype.slideHandler = function(e, t, n) {
		var i, o, r, s, a = null,
			l = this;
		if (t = t || !1, (l.animating !== !0 || l.options.waitForAnimate !== !0) && !(l.options.fade === !0 && l.currentSlide === e || l.slideCount <= l.options.slidesToShow)) return t === !1 && l.asNavFor(e), i = e, a = l.getLeft(i), s = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? s : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (e < 0 || e > l.getDotCount() * l.options.slidesToScroll) ? void(l.options.fade === !1 && (i = l.currentSlide, n !== !0 ? l.animateSlide(s, function() {
			l.postSlide(i)
		}) : l.postSlide(i))) : l.options.infinite === !1 && l.options.centerMode === !0 && (e < 0 || e > l.slideCount - l.options.slidesToScroll) ? void(l.options.fade === !1 && (i = l.currentSlide, n !== !0 ? l.animateSlide(s, function() {
			l.postSlide(i)
		}) : l.postSlide(i))) : (l.options.autoplay === !0 && clearInterval(l.autoPlayTimer), o = i < 0 ? l.slideCount % l.options.slidesToScroll !== 0 ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + i : i >= l.slideCount ? l.slideCount % l.options.slidesToScroll !== 0 ? 0 : i - l.slideCount : i, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, o]), r = l.currentSlide, l.currentSlide = o, l.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? (n !== !0 ? l.fadeSlide(o, function() {
			l.postSlide(o)
		}) : l.postSlide(o), void l.animateHeight()) : void(n !== !0 ? l.animateSlide(a, function() {
			l.postSlide(o)
		}) : l.postSlide(o)))
	}, t.prototype.startLoad = function() {
		var e = this;
		e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
	}, t.prototype.swipeDirection = function() {
		var e, t, n, i, o = this;
		return e = o.touchObject.startX - o.touchObject.curX, t = o.touchObject.startY - o.touchObject.curY, n = Math.atan2(t, e), i = Math.round(180 * n / Math.PI), i < 0 && (i = 360 - Math.abs(i)), i <= 45 && i >= 0 ? o.options.rtl === !1 ? "left" : "right" : i <= 360 && i >= 315 ? o.options.rtl === !1 ? "left" : "right" : i >= 135 && i <= 225 ? o.options.rtl === !1 ? "right" : "left" : "vertical"
	}, t.prototype.swipeEnd = function(e) {
		var t, n = this;
		if (n.dragging = !1, n.shouldClick = !(n.touchObject.swipeLength > 10), void 0 === n.touchObject.curX) return !1;
		if (n.touchObject.edgeHit === !0 && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) switch (n.swipeDirection()) {
		case "left":
			t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(), n.slideHandler(t), n.currentDirection = 0, n.touchObject = {}, n.$slider.trigger("swipe", [n, "left"]);
			break;
		case "right":
			t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(), n.slideHandler(t), n.currentDirection = 1, n.touchObject = {}, n.$slider.trigger("swipe", [n, "right"])
		} else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
	}, t.prototype.swipeHandler = function(e) {
		var t = this;
		if (!(t.options.swipe === !1 || "ontouchend" in document && t.options.swipe === !1 || t.options.draggable === !1 && e.type.indexOf("mouse") !== -1)) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, e.data.action) {
		case "start":
			t.swipeStart(e);
			break;
		case "move":
			t.swipeMove(e);
			break;
		case "end":
			t.swipeEnd(e)
		}
	}, t.prototype.swipeMove = function(e) {
		var t, n, i, o, r, s = this;
		return r = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!s.dragging || r && 1 !== r.length) && (t = s.getLeft(s.currentSlide), s.touchObject.curX = void 0 !== r ? r[0].pageX : e.clientX, s.touchObject.curY = void 0 !== r ? r[0].pageY : e.clientY, s.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(s.touchObject.curX - s.touchObject.startX, 2))), n = s.swipeDirection(), "vertical" !== n ? (void 0 !== e.originalEvent && s.touchObject.swipeLength > 4 && e.preventDefault(), o = (s.options.rtl === !1 ? 1 : -1) * (s.touchObject.curX > s.touchObject.startX ? 1 : -1), i = s.touchObject.swipeLength, s.touchObject.edgeHit = !1, s.options.infinite === !1 && (0 === s.currentSlide && "right" === n || s.currentSlide >= s.getDotCount() && "left" === n) && (i = s.touchObject.swipeLength * s.options.edgeFriction, s.touchObject.edgeHit = !0), s.options.vertical === !1 ? s.swipeLeft = t + i * o : s.swipeLeft = t + i * (s.$list.height() / s.listWidth) * o, s.options.fade !== !0 && s.options.touchMove !== !1 && (s.animating === !0 ? (s.swipeLeft = null, !1) : void s.setCSS(s.swipeLeft))) : void 0)
	}, t.prototype.swipeStart = function(e) {
		var t, n = this;
		return 1 !== n.touchObject.fingerCount || n.slideCount <= n.options.slidesToShow ? (n.touchObject = {}, !1) : (void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), n.touchObject.startX = n.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, n.touchObject.startY = n.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, void(n.dragging = !0))
	}, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
		var e = this;
		null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
	}, t.prototype.unload = function() {
		var t = this;
		e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && "object" != typeof t.options.prevArrow && t.$prevArrow.remove(), t.$nextArrow && "object" != typeof t.options.nextArrow && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible").attr("aria-hidden", "true").css("width", "")
	}, t.prototype.unslick = function() {
		var e = this;
		e.destroy()
	}, t.prototype.updateArrows = function() {
		var e, t = this;
		e = Math.floor(t.options.slidesToShow / 2), t.options.arrows === !0 && t.options.infinite !== !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.removeClass("slick-disabled"), t.$nextArrow.removeClass("slick-disabled"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled"), t.$nextArrow.removeClass("slick-disabled")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && t.options.centerMode === !1 ? (t.$nextArrow.addClass("slick-disabled"), t.$prevArrow.removeClass("slick-disabled")) : t.currentSlide >= t.slideCount - 1 && t.options.centerMode === !0 && (t.$nextArrow.addClass("slick-disabled"), t.$prevArrow.removeClass("slick-disabled")))
	}, t.prototype.updateDots = function() {
		var e = this;
		null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
	}, t.prototype.visibility = function() {
		var e = this;
		document[e.hidden] ? (e.paused = !0, e.autoPlayClear()) : (e.paused = !1, e.autoPlay())
	}, e.fn.slick = function() {
		var e, n = this,
			i = arguments[0],
			o = Array.prototype.slice.call(arguments, 1),
			r = n.length,
			s = 0;
		for (s; s < r; s++) if ("object" == typeof i || "undefined" == typeof i ? n[s].slick = new t(n[s], i) : e = n[s].slick[i].apply(n[s].slick, o), "undefined" != typeof e) return e;
		return n
	}, e(function() {
		e("[data-slick]").slick()
	})
}), function(e, t, n) {
	"use strict";

	function i(t) {
		"object" == typeof module && "object" == typeof module.exports ? module.exports = t : "function" == typeof define && define.amd && define("picturefill", function() {
			return t
		}), "object" == typeof e && (e.picturefill = t)
	}
	function o(e) {
		var t, n, i, o, r, l = e || {};
		t = l.elements || s.getAllElements();
		for (var c = 0, d = t.length; c < d; c++) if (n = t[c], i = n.parentNode, o = void 0, r = void 0, "IMG" === n.nodeName.toUpperCase() && (n[s.ns] || (n[s.ns] = {}), l.reevaluate || !n[s.ns].evaluated)) {
			if (i && "PICTURE" === i.nodeName.toUpperCase()) {
				if (s.removeVideoShim(i), o = s.getMatch(n, i), o === !1) continue
			} else o = void 0;
			(i && "PICTURE" === i.nodeName.toUpperCase() || !s.sizesSupported && n.srcset && a.test(n.srcset)) && s.dodgeSrcset(n), o ? (r = s.processSourceSet(o), s.applyBestCandidate(r, n)) : (r = s.processSourceSet(n), (void 0 === n.srcset || n[s.ns].srcset) && s.applyBestCandidate(r, n)), n[s.ns].evaluated = !0
		}
	}
	function r() {
		function n() {
			clearTimeout(i), i = setTimeout(a, 60)
		}
		s.initTypeDetects(), o();
		var i, r = setInterval(function() {
			if (o(), /^loaded|^i|^c/.test(t.readyState)) return void clearInterval(r)
		}, 250),
			a = function() {
				o({
					reevaluate: !0
				})
			};
		e.addEventListener ? e.addEventListener("resize", n, !1) : e.attachEvent && e.attachEvent("onresize", n)
	}
	if (e.HTMLPictureElement) return void i(function() {});
	t.createElement("picture");
	var s = e.picturefill || {},
		a = /\s+\+?\d+(e\d+)?w/;
	s.ns = "picturefill", function() {
		s.srcsetSupported = "srcset" in n, s.sizesSupported = "sizes" in n, s.curSrcSupported = "currentSrc" in n
	}(), s.trim = function(e) {
		return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
	}, s.makeUrl = function() {
		var e = t.createElement("a");
		return function(t) {
			return e.href = t, e.href
		}
	}(), s.restrictsMixedContent = function() {
		return "https:" === e.location.protocol
	}, s.matchesMedia = function(t) {
		return e.matchMedia && e.matchMedia(t).matches
	}, s.getDpr = function() {
		return e.devicePixelRatio || 1
	}, s.getWidthFromLength = function(e) {
		var n;
		if (!e || e.indexOf("%") > -1 != !1 || !(parseFloat(e) > 0 || e.indexOf("calc(") > -1)) return !1;
		e = e.replace("vw", "%"), s.lengthEl || (s.lengthEl = t.createElement("div"), s.lengthEl.style.cssText = "border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden", s.lengthEl.className = "helper-from-picturefill-js"), s.lengthEl.style.width = "0px";
		try {
			s.lengthEl.style.width = e
		} catch (i) {}
		return t.body.appendChild(s.lengthEl), n = s.lengthEl.offsetWidth, n <= 0 && (n = !1), t.body.removeChild(s.lengthEl), n
	}, s.detectTypeSupport = function(t, n) {
		var i = new e.Image;
		return i.onerror = function() {
			s.types[t] = !1, o()
		}, i.onload = function() {
			s.types[t] = 1 === i.width, o()
		}, i.src = n, "pending"
	}, s.types = s.types || {}, s.initTypeDetects = function() {
		s.types["image/jpeg"] = !0, s.types["image/gif"] = !0, s.types["image/png"] = !0, s.types["image/svg+xml"] = t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), s.types["image/webp"] = s.detectTypeSupport("image/webp", "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=")
	}, s.verifyTypeSupport = function(e) {
		var t = e.getAttribute("type");
		if (null === t || "" === t) return !0;
		var n = s.types[t];
		return "string" == typeof n && "pending" !== n ? (s.types[t] = s.detectTypeSupport(t, n), "pending") : "function" == typeof n ? (n(), "pending") : n
	}, s.parseSize = function(e) {
		var t = /(\([^)]+\))?\s*(.+)/g.exec(e);
		return {
			media: t && t[1],
			length: t && t[2]
		}
	}, s.findWidthFromSourceSize = function(n) {
		for (var i, o = s.trim(n).split(/\s*,\s*/), r = 0, a = o.length; r < a; r++) {
			var l = o[r],
				c = s.parseSize(l),
				d = c.length,
				u = c.media;
			if (d && (!u || s.matchesMedia(u)) && (i = s.getWidthFromLength(d))) break
		}
		return i || Math.max(e.innerWidth || 0, t.documentElement.clientWidth)
	}, s.parseSrcset = function(e) {
		for (var t = [];
		"" !== e;) {
			e = e.replace(/^\s+/g, "");
			var n, i = e.search(/\s/g),
				o = null;
			if (i !== -1) {
				n = e.slice(0, i);
				var r = n.slice(-1);
				if ("," !== r && "" !== n || (n = n.replace(/,+$/, ""), o = ""), e = e.slice(i + 1), null === o) {
					var s = e.indexOf(",");
					s !== -1 ? (o = e.slice(0, s), e = e.slice(s + 1)) : (o = e, e = "")
				}
			} else n = e, e = "";
			(n || o) && t.push({
				url: n,
				descriptor: o
			})
		}
		return t
	}, s.parseDescriptor = function(e, t) {
		var n, i = t || "100vw",
			o = e && e.replace(/(^\s+|\s+$)/g, ""),
			r = s.findWidthFromSourceSize(i);
		if (o) for (var a = o.split(" "), l = a.length - 1; l >= 0; l--) {
			var c = a[l],
				d = c && c.slice(c.length - 1);
			if ("h" !== d && "w" !== d || s.sizesSupported) {
				if ("x" === d) {
					var u = c && parseFloat(c, 10);
					n = u && !isNaN(u) ? u : 1
				}
			} else n = parseFloat(parseInt(c, 10) / r)
		}
		return n || 1
	}, s.getCandidatesFromSourceSet = function(e, t) {
		for (var n = s.parseSrcset(e), i = [], o = 0, r = n.length; o < r; o++) {
			var a = n[o];
			i.push({
				url: a.url,
				resolution: s.parseDescriptor(a.descriptor, t)
			})
		}
		return i
	}, s.dodgeSrcset = function(e) {
		e.srcset && (e[s.ns].srcset = e.srcset, e.srcset = "", e.setAttribute("data-pfsrcset", e[s.ns].srcset))
	}, s.processSourceSet = function(e) {
		var t = e.getAttribute("srcset"),
			n = e.getAttribute("sizes"),
			i = [];
		return "IMG" === e.nodeName.toUpperCase() && e[s.ns] && e[s.ns].srcset && (t = e[s.ns].srcset), t && (i = s.getCandidatesFromSourceSet(t, n)), i
	}, s.backfaceVisibilityFix = function(e) {
		var t = e.style || {},
			n = "webkitBackfaceVisibility" in t,
			i = t.zoom;
		n && (t.zoom = ".999", n = e.offsetWidth, t.zoom = i)
	}, s.setIntrinsicSize = function() {
		var n = {},
			i = function(e, t, n) {
				t && e.setAttribute("width", parseInt(t / n, 10))
			};
		return function(o, r) {
			var a;
			o[s.ns] && !e.pfStopIntrinsicSize && (void 0 === o[s.ns].dims && (o[s.ns].dims = o.getAttribute("width") || o.getAttribute("height")), o[s.ns].dims || (r.url in n ? i(o, n[r.url], r.resolution) : (a = t.createElement("img"), a.onload = function() {
				if (n[r.url] = a.width, !n[r.url]) try {
					t.body.appendChild(a), n[r.url] = a.width || a.offsetWidth, t.body.removeChild(a)
				} catch (e) {}
				o.src === r.url && i(o, n[r.url], r.resolution), o = null, a.onload = null, a = null
			}, a.src = r.url)))
		}
	}(), s.applyBestCandidate = function(e, t) {
		var n, i, o;
		e.sort(s.ascendingSort), i = e.length, o = e[i - 1];
		for (var r = 0; r < i; r++) if (n = e[r], n.resolution >= s.getDpr()) {
			o = n;
			break
		}
		o && (o.url = s.makeUrl(o.url), t.src !== o.url && (s.restrictsMixedContent() && "http:" === o.url.substr(0, "http:".length).toLowerCase() ? void 0 !== window.console : (t.src = o.url, s.curSrcSupported || (t.currentSrc = t.src), s.backfaceVisibilityFix(t))), s.setIntrinsicSize(t, o))
	}, s.ascendingSort = function(e, t) {
		return e.resolution - t.resolution
	}, s.removeVideoShim = function(e) {
		var t = e.getElementsByTagName("video");
		if (t.length) {
			for (var n = t[0], i = n.getElementsByTagName("source"); i.length;) e.insertBefore(i[0], n);
			n.parentNode.removeChild(n)
		}
	}, s.getAllElements = function() {
		for (var e = [], n = t.getElementsByTagName("img"), i = 0, o = n.length; i < o; i++) {
			var r = n[i];
			("PICTURE" === r.parentNode.nodeName.toUpperCase() || null !== r.getAttribute("srcset") || r[s.ns] && null !== r[s.ns].srcset) && e.push(r)
		}
		return e
	}, s.getMatch = function(e, t) {
		for (var n, i = t.childNodes, o = 0, r = i.length; o < r; o++) {
			var a = i[o];
			if (1 === a.nodeType) {
				if (a === e) return n;
				if ("SOURCE" === a.nodeName.toUpperCase()) {
					null !== a.getAttribute("src") && void 0 !== typeof console;
					var l = a.getAttribute("media");
					if (a.getAttribute("srcset") && (!l || s.matchesMedia(l))) {
						var c = s.verifyTypeSupport(a);
						if (c === !0) {
							n = a;
							break
						}
						if ("pending" === c) return !1
					}
				}
			}
		}
		return n
	}, r(), o._ = s, i(o)
}(window, window.document, new window.Image), function(e, t, n) {
	var i = window.matchMedia;
	"undefined" != typeof module && module.exports ? module.exports = n(i) : "function" == typeof define && define.amd ? define(function() {
		return t[e] = n(i)
	}) : t[e] = n(i)
}("enquire", this, function(e) {
	"use strict";

	function t(e, t) {
		var n, i = 0,
			o = e.length;
		for (i; i < o && (n = t(e[i], i), n !== !1); i++);
	}
	function n(e) {
		return "[object Array]" === Object.prototype.toString.apply(e)
	}
	function i(e) {
		return "function" == typeof e
	}
	function o(e) {
		this.options = e, !e.deferSetup && this.setup()
	}
	function r(t, n) {
		this.query = t, this.isUnconditional = n, this.handlers = [], this.mql = e(t);
		var i = this;
		this.listener = function(e) {
			i.mql = e, i.assess()
		}, this.mql.addListener(this.listener)
	}
	function s() {
		if (!e) throw new Error("matchMedia not present, legacy browsers require a polyfill");
		this.queries = {}, this.browserIsIncapable = !e("only all").matches
	}
	return o.prototype = {
		setup: function() {
			this.options.setup && this.options.setup(), this.initialised = !0
		},
		on: function() {
			!this.initialised && this.setup(), this.options.match && this.options.match()
		},
		off: function() {
			this.options.unmatch && this.options.unmatch()
		},
		destroy: function() {
			this.options.destroy ? this.options.destroy() : this.off()
		},
		equals: function(e) {
			return this.options === e || this.options.match === e
		}
	}, r.prototype = {
		addHandler: function(e) {
			var t = new o(e);
			this.handlers.push(t), this.matches() && t.on()
		},
		removeHandler: function(e) {
			var n = this.handlers;
			t(n, function(t, i) {
				if (t.equals(e)) return t.destroy(), !n.splice(i, 1)
			})
		},
		matches: function() {
			return this.mql.matches || this.isUnconditional
		},
		clear: function() {
			t(this.handlers, function(e) {
				e.destroy()
			}), this.mql.removeListener(this.listener), this.handlers.length = 0
		},
		assess: function() {
			var e = this.matches() ? "on" : "off";
			t(this.handlers, function(t) {
				t[e]()
			})
		}
	}, s.prototype = {
		register: function(e, o, s) {
			var a = this.queries,
				l = s && this.browserIsIncapable;
			return a[e] || (a[e] = new r(e, l)), i(o) && (o = {
				match: o
			}), n(o) || (o = [o]), t(o, function(t) {
				a[e].addHandler(t)
			}), this
		},
		unregister: function(e, t) {
			var n = this.queries[e];
			return n && (t ? n.removeHandler(t) : (n.clear(), delete this.queries[e])), this
		}
	}, new s
}), $(document).ready(function() {
	common.init()
});
var common = {
	init: function() {
		$(".logo, .nav ul > li > h2 > a > strong, body:not(.my_portfolio) .main .myfont, .contact .myfont, .my_portfolio .myfont > span:not(.irp), .external .myfont a, .h_external, #details .myfont a").lettering(), $("html").removeClass("fouc"), $(".nb_nav a").on("click", function() {
			return $("html,body").animate({
				scrollTop: $("#navigation").position().top - 38
			}, 1e3, "easeInOutQuint"), !1
		}), $(".nb_items a, .mobile_content").on("click", function() {
			return $("html,body").animate({
				scrollTop: $("#portfolio").position().top - 38
			}, 1e3, "easeInOutQuint"), !1
		}), $(".nb_contact a, a[href|='#freelance-']").on("click", function() {
			return $("html,body").animate({
				scrollTop: $("#contact").position().top - 38
			}, 1e3, "easeInOutQuint"), !1
		}), $(".nb_me a").on("click", function() {
			return $("html,body").animate({
				scrollTop: $("#me").position().top - 38
			}, 1e3, "easeInOutQuint"), !1
		}), $(".back_top").on("click", function() {
			return $("html,body").animate({
				scrollTop: 0
			}, 1e3, "easeInOutQuint"), !1
		}), $(".back_top").hide(), "placeholder" in document.createElement("input") || ($("input[placeholder], textarea[placeholder]").each(function() {
			var e = $(this).attr("placeholder");
			"" == this.value && (this.value = e), $(this).focus(function() {
				this.value == e && (this.value = "")
			}).blur(function() {
				"" == $.trim(this.value) && (this.value = e)
			})
		}), $("form").submit(function() {
			$(this).find("input[placeholder], textarea[placeholder]").each(function() {
				this.value == $(this).attr("placeholder") && (this.value = "")
			})
		})), $(".tabs_set").tabs(), $(".main.content > .content").accordion({
			header: ".h2",
			icons: !1,
			heightStyle: "content",
			collapsible: !0,
			animate: {
				easing: "easeInOutCubic",
				duration: 400
			}
		}), $(".main.content > .content .h2").bind("click", function() {
			var e = this;
			setTimeout(function() {
				topOffset = $(window).width() <= 644 ? 58 : 20, theOffset = $(e).offset(), $("body,html").animate({
					scrollTop: theOffset.top - topOffset
				}, 1e3, "easeInOutQuint")
			}, 400)
		}), $("#portfolio .slick-list").prepend('<span class="thumbs_top"></span>').append('<span class="thumbs_bottom"></span>'), $(".tabs_set").on("tabsactivate", function(e, t) {
			$(".dribbble_items").resize()
		}), $(".ui-state-default, .ui-tabs-anchor").attr("tabindex", "0")
	}
};
$(document).ready(function() {
	nav.init()
});
var nav = {
	init: function() {
		$(".has_slider .nav li, .has_slider .thumbs").hover(function() {
			$(this).siblings().toggleClass("fade")
		}), $(".n_web").hover(function() {
			$(".t_illus, .t_graph, .t_anim").toggleClass("fade")
		}), $(".n_illus").hover(function() {
			$(".t_web, .t_graph, .t_anim").toggleClass("fade")
		}), $(".n_graph").hover(function() {
			$(".t_illus, .t_web, .t_anim").toggleClass("fade")
		}), $(".n_anim").hover(function() {
			$(".t_illus, .t_graph, .t_web").toggleClass("fade")
		}), $(".has_slider .t_web").hover(function() {
			$(".n_illus, .n_graph, .n_anim").toggleClass("fade")
		}), $(".has_slider .t_illus").hover(function() {
			$(".n_web, .n_graph, .n_anim").toggleClass("fade")
		}), $(".has_slider .t_graph").hover(function() {
			$(".n_illus, .n_web, .n_anim").toggleClass("fade")
		}), $(".has_slider .t_anim").hover(function() {
			$(".n_illus, .n_graph, .n_web").toggleClass("fade")
		})
	}
};
$(document).ready(function() {
	responsive.init()
});
var responsive = {
	max_644: !1,
	min_490: !1,
	min_900: !1,
	debug: !1,
	init: function() {
		this.enquire(), this.fallbacks(), this.scrolls()
	},
	scrolls: function() {
		if ($(window).scroll(function() {
			responsive.max_644 && ($(window).scrollTop() > 38 ? $(".back_top").fadeIn() : $(".back_top").fadeOut())
		}), "#view-all" == window.location.hash && responsive.max_644) return $("html,body").animate({
			scrollTop: $("#portfolio").position().top - 38
		}, 2e3, "easeInOutQuint"), !1
	},
	fallbacks: function() {
		if (responsive.min_900) {
			var e = $(".internal").height(),
				t = $(window).height();
			e <= t && $(".internal").css("min-height", t)
		}
		if (responsive.min_490 && responsive.max_644) {
			var e = $(".internal").height(),
				n = $(document).height();
			e <= n && $(".internal").css("min-height", n + 30)
		}
	},
	enquire: function() {
		enquire.register("screen and (min-width:490px)", {
			match: function() {
				responsive.log_enquire("register screen and (min-width:490px)"), responsive.min_490 = !0, responsive.min_900 = !1, responsive.max_644 = !0, $(".tabs_set").tabs("destroy"), $("#links, #details").removeAttr("style")
			},
			unmatch: function() {
				responsive.log_enquire("unregister screen and (min-width:490px)"), $(".tabs_set").tabs(), $(".internal").css("min-height", "1px"), responsive.min_490 = !1, responsive.min_900 = !1, responsive.max_644 = !0
			}
		}).register("screen and (min-width:645px)", {
			match: function() {
				responsive.log_enquire("register screen and (min-width:645px)"), responsive.min_490 = !0, responsive.min_900 = !1, responsive.max_644 = !1, $("body").addClass("min645"), $(".internal").css("min-height", "1px"), $(".tabs_set").tabs()
			},
			unmatch: function() {
				responsive.log_enquire("unregister screen and (min-width:645px)"), $("body").removeClass("min645"), $(".tabs_set").tabs("destroy"), $("#links, #details").removeAttr("style"), responsive.min_490 = !0, responsive.min_900 = !1, responsive.max_644 = !0
			}
		}).register("screen and (min-width:900px)", {
			match: function() {
				responsive.log_enquire("register screen and (min-width:900px)"), responsive.min_490 = !0, responsive.min_900 = !0, responsive.max_644 = !1, $("body").addClass("min900")
			},
			unmatch: function() {
				responsive.log_enquire("unregister screen and (min-width:900px)"), $("body").removeClass("min900"), $(".internal").css("min-height", "1px"), responsive.min_490 = !0, responsive.min_900 = !1, responsive.max_644 = !1
			}
		}).register("screen and (max-width:644px)", {
			match: function() {
				responsive.log_enquire("register screen and (max-width:644px)"), responsive.min_490 = !1, responsive.min_900 = !1, responsive.max_644 = !0
			},
			unmatch: function() {
				responsive.log_enquire("unregister screen and (max-width:644px)"), $(".back_top").hide(), responsive.min_490 = !1, responsive.min_900 = !1, responsive.max_644 = !1
			}
		})
	},
	log_enquire: function(e) {
		responsive.debug
	}
};
$(document).ready(function() {
	sliders.init()
});
var sliders = {
	sliderSpeeds: [3e3, 4e3, 5e3, 6e3],
	prevArrow: '<span class="slick-prev"><a href="javascript:void(0);"><span class="ico i_arrow_left_sml" aria-hidden="true"></span></a></span>',
	nextArrow: '<span class="slick-next"><a href="javascript:void(0);"><span class="ico i_arrow_right_sml" aria-hidden="true"></span></a></span>',
	upArrow: '<span class="slick-prev"><a href="javascript:void(0);"><span class="ico i_arrow_up_sml" aria-hidden="true"></span></a></span>',
	downArrow: '<span class="slick-next"><a href="javascript:void(0);"><span class="ico i_arrow_down_sml" aria-hidden="true"></span></a></span>',
	init: function() {
		this.sliderSpeeds = this.fisherYatesShuffle(this.sliderSpeeds), this.doSliders()
	},
	fisherYatesShuffle: function(e) {
		for (var t, n, i = e.length; i; t = Math.floor(Math.random() * i), n = e[--i], e[i] = e[t], e[t] = n);
		return e
	},
	doSliders: function() {
		$(".has_slider .t_web").slick({
			vertical: !0,
			swipe: !1,
			slidesToShow: 3,
			autoplay: !0,
			speed: 500,
			autoplaySpeed: this.sliderSpeeds[0],
			lazyLoad: "ondemand",
			prevArrow: this.downArrow,
			nextArrow: this.upArrow
		}), $(".has_slider .t_illus").slick({
			vertical: !0,
			swipe: !1,
			slidesToShow: 3,
			autoplay: !0,
			speed: 500,
			autoplaySpeed: this.sliderSpeeds[1],
			lazyLoad: "ondemand",
			prevArrow: this.downArrow,
			nextArrow: this.upArrow
		}), $(".has_slider .t_graph").slick({
			vertical: !0,
			swipe: !1,
			slidesToShow: 3,
			autoplay: !0,
			speed: 500,
			autoplaySpeed: this.sliderSpeeds[2],
			lazyLoad: "ondemand",
			prevArrow: this.downArrow,
			nextArrow: this.upArrow
		}), $(".has_slider .t_anim").slick({
			vertical: !0,
			swipe: !1,
			slidesToShow: 3,
			autoplay: !0,
			speed: 500,
			autoplaySpeed: this.sliderSpeeds[3],
			lazyLoad: "ondemand",
			prevArrow: this.downArrow,
			nextArrow: this.upArrow
		}), $(".quotes").slick({
			slide: "blockquote",
			arrows: !1,
			dots: !0,
			fade: !0,
			autoplay: !0,
			autoplaySpeed: 5e3,
			speed: 600
		}), $(".details .items:not(.video)").slick({
			fade: !0,
			autoplay: !0,
			autoplaySpeed: 4e3,
			speed: 600,
			prevArrow: this.prevArrow,
			nextArrow: this.nextArrow
		}), $(".items:not(.video)").addClass("tape_shadow"), setTimeout(function() {
			$(".items.video").addClass("tape_shadow")
		}, 400), $(".dribbble_items").slick({
			slide: ".d_item",
			fade: !0,
			autoplay: !0,
			autoplaySpeed: 5e3,
			speed: 600,
			prevArrow: this.prevArrow,
			nextArrow: this.nextArrow
		}), $(".slick-track a").attr("tabindex", "-1"), $(".t_web.slick-slider, .t_illus.slick-slider, .t_graph.slick-slider, .t_anim.slick-slider").append('<span class="view_all"><a href="#">View All</a></span>'), $(".t_web.slick-slider .view_all a").attr("href", $(".n_web a").attr("href") + "#view-all"), $(".t_illus.slick-slider .view_all a").attr("href", $(".n_illus a").attr("href") + "#view-all"), $(".t_graph.slick-slider .view_all a").attr("href", $(".n_graph a").attr("href") + "#view-all"), $(".t_anim.slick-slider .view_all a").attr("href", $(".n_anim a").attr("href") + "#view-all"), $("#portfolio .slick-list").prepend('<span class="thumbs_top"></span>').append('<span class="thumbs_bottom"></span>'), $("body").addClass("animate")
	}
};