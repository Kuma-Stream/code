function checkLinks() {
	"object" == typeof domains ? DOMAssistant.$("body a").each(function() {
		in_object(domains, DOMAssistant.$(this).href) && 7 != DOMAssistant.$(this).href.toLowerCase().indexOf("ouo.io") && (url = "http://ouo.io/st/" + ouo_token + "/?s=" + encodeURIComponent(DOMAssistant.$(this).href), DOMAssistant.$(this).setAttributes({
			href: url
		}))
	}) : "object" == typeof exclude_domains && DOMAssistant.$("body a").each(function() {
		in_object(exclude_domains, DOMAssistant.$(this).href) || "javascript" == DOMAssistant.$(this).href.substr(0, 10) || 7 != DOMAssistant.$(this).href.toLowerCase().indexOf("ouo.io") && (url = "http://ouo.io/st/" + ouo_token + "/?s=" + encodeURIComponent(DOMAssistant.$(this).href), DOMAssistant.$(this).setAttributes({
			href: url
		}))
	})
}

function in_object(t, e) {
	for (var n = 0, s = t.length; s > n; n++) {
		var a = new RegExp(t[n], "i");
		if (e.search(a) > 0) return !0
	}
	return !1
}
var DOMAssistant = function() {
	var t = function() {},
		e = !1,
		n = e && parseFloat(navigator.appVersion) < 6,
		s = {},
		a = {},
		r = !0,
		i = {
			accesskey: "accessKey",
			"class": "className",
			colspan: "colSpan",
			"for": "htmlFor",
			maxlength: "maxLength",
			readonly: "readOnly",
			rowspan: "rowSpan",
			tabindex: "tabIndex",
			valign: "vAlign",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding"
		},
		l = {
			rules: /\s*(,)\s*/g,
			selector: /^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+\s*(\^|\$|\*|\||~)?(=\s*([\w\u00C0-\uFFFF\s\-\_\.]+|"[^"]*"|'[^']*'))?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_\.]+|"[^"]*"|'[^']*'|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.\'\"]+\]+)|(:\w+[\w\-]*))\))?)*)?(>|\+|~)?/,
			id: /^#([\w\u00C0-\uFFFF\-\_]+)$/,
			tag: /^(\w+)/,
			relation: /^(>|\+|~)$/,
			pseudo: /^:(\w[\w\-]*)(\((.+)\))?$/,
			pseudos: /:(\w[\w\-]*)(\(([^\)]+)\))?/g,
			attribs: /\[(\w+)\s*(\^|\$|\*|\||~)?=?\s*([\w\u00C0-\uFFFF\s\-_\.]+|"[^"]*"|'[^']*')?\]/g,
			classes: /\.([\w\u00C0-\uFFFF\-_]+)/g,
			quoted: /^["'](.*)["']$/,
			nth: /^((odd|even)|([1-9]\d*)|((([1-9]\d*)?)n([\+\-]\d+)?)|(\-(([1-9]\d*)?)n\+(\d+)))$/
		},
		o = function(t, e) {
			return t.push.apply(t, [].slice.apply(e)), t
		};
	e && (o = function(t, e) {
		if (e.slice) return t.concat(e);
		for (var n, s = 0; n = e[s++];) t[t.length] = n;
		return t
	});
	var u = function(t, e) {
			if (t.indexOf) return t.indexOf(e) >= 0;
			for (var n = 0, s = t.length; s > n; n++)
				if (t[n] === e) return !0;
			return !1
		},
		c = function(t, e) {
			var n = t.parentNode;
			return e === document || n === e || n !== document && c(n, e)
		};
	return {
		isIE: e,
		camel: i,
		allMethods: [],
		publicMethods: ["cssSelect", "elmsByClass", "elmsByAttribute", "elmsByTag"],
		initCore: function() {
			this.applyMethod.call(window, "$", this.$), this.applyMethod.call(window, "$$", this.$$), window.DOMAssistant = this, e && (t = Array), t.prototype = [], t.prototype.each = function(t) {
				for (var e = 0, n = this.length; n > e; e++) t.call(this[e]);
				return this
			}, t.prototype.first = function() {
				return "undefined" != typeof this[0] ? DOMAssistant.addMethodsToElm(this[0]) : null
			}, t.prototype.end = function() {
				return this.previousSet
			}, this.attach(this)
		},
		addMethods: function(t, e) {
			"undefined" == typeof this.allMethods[t] && (this.allMethods[t] = e, this.addHTMLArrayPrototype(t, e))
		},
		addMethodsToElm: function(t) {
			for (var e in this.allMethods) "undefined" != typeof this.allMethods[e] && this.applyMethod.call(t, e, this.allMethods[e]);
			return t
		},
		applyMethod: function(t, e) {
			"function" != typeof this[t] && (this[t] = e)
		},
		attach: function(t) {
			var e = t.publicMethods;
			if ("undefined" == typeof e)
				for (var n in t) "init" !== n && "undefined" != typeof t[n] && this.addMethods(n, t[n]);
			else if (e.constructor === Array)
				for (var s, a = 0; s = e[a]; a++) this.addMethods(s, t[s]);
			"function" == typeof t.init && t.init()
		},
		addHTMLArrayPrototype: function(e, n) {
			t.prototype[e] = function() {
				var e = new t;
				e.previousSet = this;
				for (var s, a = 0, r = this.length; r > a; a++) s = n.apply(this[a], arguments), s && s.constructor === Array ? e = o(e, s) : e.push(s);
				return e
			}
		},
		clearHandlers: function() {
			for (var t, e, n = this.all || this.getElementsByTagName("*"), s = 0; t = n[s++];)
				if (e = t.attributes)
					for (var a, r = 0, i = e.length; i > r; r++) a = e[r].nodeName.toLowerCase(), "function" == typeof t[a] && (t[a] = null)
		},
		setCache: function(t) {
			r = t
		},
		$: function() {
			var e = arguments[0];
			if (1 === arguments.length && ("object" == typeof e || "function" == typeof e && e.nodeName)) return DOMAssistant.$$(e);
			for (var n, s, i = new t, u = 0; n = arguments[u]; u++)
				if ("string" == typeof n)
					if (n = n.replace(/^[^#]*(#)/, "$1"), l.id.test(n))(s = DOMAssistant.$$(n.substr(1), !1)) && i.push(s);
					else {
						var c = (document.all || document.getElementsByTagName("*")).length;
						i = !document.querySelectorAll && r && a.rule && a.rule === n && a.doc === c ? a.elms : o(i, DOMAssistant.cssSelection.call(document, n)), a = {
							rule: n,
							elms: i,
							doc: c
						}
					} return i
		},
		$$: function(t, e) {
			var n = "object" == typeof t || "function" == typeof t && t.nodeName ? t : document.getElementById(t),
				s = e || !0;
			if ("string" == typeof t && n && n.id !== t) {
				n = null;
				for (var a, r = 0; a = document.all[r]; r++)
					if (a.id === t) {
						n = a;
						break
					}
			}
			return n && s && DOMAssistant.addMethodsToElm(n), n
		},
		getSequence: function(t) {
			var e, n = 2,
				s = -1,
				a = -1,
				r = l.nth.exec(t.replace(/^0n\+/, "").replace(/^2n$/, "even").replace(/^2n+1$/, "odd"));
			if (!r) return null;
			if (r[2]) e = "odd" === r[2] ? 1 : 2, a = 1 === e ? 1 : 0;
			else if (r[3]) e = parseInt(r[3], 10), n = 0, s = e;
			else if (r[4]) {
				for (n = r[6] ? parseInt(r[6], 10) : 1, e = r[7] ? parseInt(r[7], 10) : 0; 1 > e;) e += n;
				a = e > n ? (e - n) % n : e === n ? 0 : e
			} else if (r[8]) {
				for (n = r[10] ? parseInt(r[10], 10) : 1, e = s = parseInt(r[11], 10); e > n;) e -= n;
				a = s > n ? (s - n) % n : s === n ? 0 : s
			}
			return {
				start: e,
				add: n,
				max: s,
				modVal: a
			}
		},
		cssByDOM: function(a) {
			function r(t) {
				t = t || F;
				for (var e = 0, n = t.length; n > e; e++) t[e].added = null
			}

			function d() {
				for (var t = 0, e = y.length; e > t; t++) y[t].childElms = null
			}

			function f(t, e) {
				for (var n, s = 0; n = t[s]; s++) {
					for (var a, r = !1, i = 0; a = e[i]; i++)
						if (a === n) {
							r = !0, e.splice(i, 1);
							break
						} r && t.splice(s--, 1)
				}
				return t
			}

			function h(t, n) {
				return e ? t[i[n.toLowerCase()] || n] : t.getAttribute(n, 2)
			}

			function p(t, e) {
				switch (t = t ? t.replace(l.quoted, "$1").replace(/\./g, "\\.") : null, e) {
					case "^":
						return "^" + t;
					case "$":
						return t + "$";
					case "*":
						return t;
					case "|":
						return "^" + t + "(\\-\\w+)*$";
					case "~":
						return "\\b" + t + "\\b";
					default:
						return t ? "^" + t + "$" : null
				}
			}

			function g(t, e) {
				return n ? "*" === t ? e.all : e.all.tags(t) : e.getElementsByTagName(t)
			}

			function v(t, e) {
				return t = t || "*", e = e || document, e === document || e.lastModified ? s[t] || (s[t] = g(t, document)) : g(t, e)
			}

			function m(t, e, n) {
				function s(t) {
					for (var e = i ? t.nodeName : 1;
						(t = t.previousSibling) && t[v] !== e;);
					return t
				}

				function a(t) {
					for (var e = i ? t.nodeName : 1;
						(t = t.nextSibling) && t[v] !== e;);
					return t
				}

				function r(e) {
					for (; C = t[g++];) M[e](C) && (c[c.length] = C);
					return c
				}
				y = [];
				var i, o, u = e.split("-"),
					c = [],
					g = 0,
					v = (i = /\-of\-type$/.test(e)) ? "nodeName" : "nodeType",
					M = {
						first: function(t) {
							return !s(t)
						},
						last: function(t) {
							return !a(t)
						},
						empty: function(t) {
							return !t.childNodes.length
						},
						enabled: function() {
							return !C.disabled && "hidden" !== C.type
						},
						disabled: function() {
							return C.disabled
						},
						checked: function() {
							return C.checked
						},
						contains: function() {
							return (C.innerText || C.textContent || "").indexOf(n.replace(l.quoted, "$1")) > -1
						},
						other: function() {
							return h(C, e) === n
						}
					},
					A = u[0] || null;
				if (A && M[A]) return r(A);
				switch (A) {
					case "only":
						for (var b; C = t[g++];) L = C.parentNode, L !== b && (s(C) || a(C) || (c[c.length] = C), b = L);
						break;
					case "nth":
						if (/^n$/.test(n)) c = t;
						else {
							var O = "last" === u[1] ? ["lastChild", "previousSibling"] : ["firstChild", "nextSibling"];
							if (X = DOMAssistant.getSequence.call(this, n)) {
								for (; C = t[g++];)
									if (L = C.parentNode, !L.childElms) {
										var w = 0,
											x = C.nodeName;
										for (H = X.start, $ = L[O[0]]; $ && (X.max < 0 || H <= X.max);) {
											var D = $.nodeName;
											(i && D === x || !i && 1 === $.nodeType) && ++w === H && (D === x && (c[c.length] = $), H += X.add), $ = $[O[1]]
										}
										L.childElms = !0, y[y.length] = L
									} d()
							}
						}
						break;
					case "target":
						var E = document.location.hash.slice(1);
						if (E)
							for (; C = t[g++];)
								if (h(C, "name") === E || h(C, "id") === E) {
									c[c.length] = C;
									break
								} break;
					case "not":
						if (o = l.pseudo.exec(n)) c = f(t, m(t, o[1] ? o[1].toLowerCase() : null, o[3] || null));
						else {
							for (var j in l) l[j].lastIndex && (l[j].lastIndex = 0);
							n = n.replace(l.id, "[id=$1]");
							for (var F = l.tag.exec(n), N = l.classes.exec(n), q = l.attribs.exec(n), k = new RegExp(q ? p(q[3], q[2]) : "(^|\\s)" + (F ? F[1] : N ? N[1] : "") + "(\\s|$)", "i"); T = t[g++];) {
								if (S = null, F && !k.test(T.nodeName)) S = T;
								else if (N && !k.test(T.className)) S = T;
								else if (q) {
									var R = h(T, q[1]);
									R && k.test(R) || (S = T)
								}
								S && !S.added && (S.added = !0, c[c.length] = S)
							}
						}
						break;
					default:
						return r("other")
				}
				return c
			}
			var M, y, A, b, O, w, x, D, C, L, T, S, H, $, X, E = a.replace(l.rules, "$1").split(","),
				j = new t,
				F = [],
				N = [];
			try {
				M = new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]", "g")
			} catch (q) {
				M = /[^\s]+/g
			}
			for (var k = 0; A = E[k]; k++)
				if (!k || !u(E.slice(0, k), A)) {
					F = [this], b = A.match(M);
					for (var R, P = 0; R = b[P]; P++) {
						if (N = [], P > 0 && l.relation.test(R) && (O = l.relation.exec(R))) {
							var I = null,
								B = b[P + 1];
							(w = l.tag.exec(B)) ? (w = w[1], x = new RegExp("(^|\\s)" + w + "(\\s|$)", "i")) : l.id.test(B) && (I = DOMAssistant.$(B) || null);
							for (var J, _ = 0; J = F[_]; _++) switch (O[0]) {
								case ">":
									for (var V, W = I || v(w, J), K = 0; V = W[K]; K++) V.parentNode === J && (N[N.length] = V);
									break;
								case "+":
									for (;
										(J = J.nextSibling) && 1 !== J.nodeType;);
									J && (I && I[0] === J || !I && (!w || x.test(J.nodeName))) && (N[N.length] = J);
									break;
								case "~":
									for (;
										(J = J.nextSibling) && !J.added;)(I && I[0] === J || !I && (!w || x.test(J.nodeName))) && (J.added = !0, N[N.length] = J)
							}
							if (F = N, r(), R = b[++P], /^\w+$/.test(R) || l.id.test(R)) continue;
							F.skipTag = !0
						}
						var U = l.selector.exec(R),
							G = {
								tag: U[1] && "*" !== U[3] ? U[1] : "*",
								id: "*" !== U[3] ? U[2] : null,
								allClasses: U[4],
								allAttr: U[6],
								allPseudos: U[11]
							};
						if (G.id) {
							var z = 0,
								Z = document.getElementById(G.id.replace(/#/, ""));
							if (Z) {
								for (; F[z] && !c(Z, F[z]);) z++;
								N = z < F.length ? [Z] : []
							}
							F = N
						} else if (G.tag && !F.skipTag)
							if (0 !== P || N.length || 1 !== F.length) {
								for (var Q, Y, te = 0, ee = F.length; ee > te; te++) {
									Q = v(G.tag, F[te]);
									for (var ne = 0; Y = Q[ne]; ne++) Y.added || (Y.added = !0, N[N.length] = Y)
								}
								F = N, r()
							} else F = N = o([], v(G.tag, F[0]));
						if (!N.length) break;
						if (F.skipTag = !1, G.allClasses) {
							for (var se = 0, ae = [], re = G.allClasses.split(".").slice(1); D = F[se++];) {
								var ie = !0,
									le = D.className;
								if (le && le.length) {
									le = le.split(" ");
									for (var oe = 0, ue = re.length; ue > oe; oe++)
										if (!u(le, re[oe])) {
											ie = !1;
											break
										} ie && (ae[ae.length] = D)
								}
							}
							F = N = ae
						}
						if (G.allAttr) {
							for (var ce, de, fe = 0, he = [], pe = [], ge = G.allAttr.match(/\[[^\]]+\]/g), ve = 0, me = ge.length; me > ve; ve++) l.attribs.lastIndex = 0, ce = l.attribs.exec(ge[ve]), de = p(ce[3], ce[2] || null), he[ve] = [de ? new RegExp(de) : null, ce[1]];
							for (; D = N[fe++];) {
								for (var Me = 0, ye = he.length; ye > Me; Me++) {
									var Ae = !0,
										be = he[Me][0],
										Oe = h(D, he[Me][1]);
									if (!(!be && Oe === !0 || (be || Oe && "string" == typeof Oe && Oe.length) && (!be || be.test(Oe)))) {
										Ae = !1;
										break
									}
								}
								Ae && (pe[pe.length] = D)
							}
							F = N = pe
						}
						if (G.allPseudos) {
							for (var we = G.allPseudos.match(l.pseudos), xe = 0, De = we.length; De > xe; xe++) {
								l.pseudos.lastIndex = 0;
								var Ce = l.pseudos.exec(we[xe]),
									Le = Ce[1] ? Ce[1].toLowerCase() : null,
									Te = Ce[3] || null;
								N = m(N, Le, Te), r(N)
							}
							F = N
						}
					}
					j = o(j, F)
				} return j
		},
		cssByXpath: function(e) {
			var n = {
					xhtml: "http://www.w3.org/1999/xhtml"
				},
				s = document.documentElement.namespaceURI === n.xhtml ? "xhtml:" : "",
				a = function(t) {
					return n[t] || null
				};
			return DOMAssistant.cssByXpath = function(e) {
				function n(t, e, n, s) {
					switch (s = s ? s.replace(l.quoted, "$1") : s, n) {
						case "^":
							return "starts-with(@" + e + ', "' + s + '")';
						case "$":
							return "substring(@" + e + ", (string-length(@" + e + ") - " + (s.length - 1) + "), " + s.length + ') = "' + s + '"';
						case "*":
							return 'contains(concat(" ", @' + e + ', " "), "' + s + '")';
						case "|":
							return "(@" + e + '="' + s + '" or starts-with(@' + e + ', "' + s + '-"))';
						case "~":
							return 'contains(concat(" ", @' + e + ', " "), " ' + s + ' ")';
						default:
							return "@" + e + (s ? '="' + s + '"' : "")
					}
				}

				function r(t, e, s, a) {
					return "[" + n(t, e, s, a) + "]"
				}

				function i(t, e, s) {
					t = /\-child$/.test(e) ? "*" : t;
					var a, r = "",
						o = e.split("-");
					switch (o[0]) {
						case "nth":
							if (!/^n$/.test(s)) {
								var u = ("last" === o[1] ? "(count(following-sibling::" : "(count(preceding-sibling::") + t + ") + 1)";
								(p = DOMAssistant.getSequence.call(this, s)) && (r = p.start === p.max ? u + " = " + p.start : u + " mod " + p.add + " = " + p.modVal + (p.start > 1 ? " and " + u + " >= " + p.start : "") + (p.max > 0 ? " and " + u + " <= " + p.max : ""))
							}
							break;
						case "not":
							var c = (a = l.pseudo.exec(s)) ? i(t, a[1] ? a[1].toLowerCase() : null, a[3] || null) : s.replace(l.id, "[id=$1]").replace(l.tag, "self::$1").replace(l.classes, 'contains(concat(" ", @class, " "), " $1 ")').replace(l.attribs, n);
							r = "not(" + c + ")";
							break;
						case "first":
							return "not(preceding-sibling::" + t + ")";
						case "last":
							return "not(following-sibling::" + t + ")";
						case "only":
							return "not(preceding-sibling::" + t + " or following-sibling::" + t + ")";
						case "empty":
							return "count(child::*) = 0 and string-length(text()) = 0";
						case "contains":
							return 'contains(., "' + s.replace(l.quoted, "$1") + '")';
						case "enabled":
							return 'not(@disabled) and not(@type="hidden")';
						case "disabled":
							return "@disabled";
						case "target":
							var d = document.location.hash.slice(1);
							return '@name="' + d + '" or @id="' + d + '"';
						default:
							return "@" + e + '="' + s + '"'
					}
					return r
				}
				if (/:checked/.test(e)) return DOMAssistant.cssByDOM.call(this, e);
				for (var o, c, d, f, h, p, g = e.replace(l.rules, "$1").split(","), v = new t, m = new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]", "g"), M = 0; o = g[M]; M++)
					if (!M || !u(g.slice(0, M), o)) {
						c = o.match(m), d = ".";
						for (var y = 0, A = c.length; A > y; y++) {
							if (f = l.selector.exec(c[y]), h = {
									tag: s + (f[1] && "*" !== f[3] ? f[1] : "*"),
									id: "*" !== f[3] ? f[2] : null,
									allClasses: f[4],
									allAttr: f[6],
									allPseudos: f[11],
									tagRelation: f[23]
								}, h.tagRelation) {
								var b = {
									">": "/child::",
									"+": "/following-sibling::*[1]/self::",
									"~": "/following-sibling::"
								};
								d += b[h.tagRelation] || ""
							} else d += y > 0 && l.relation.test(c[y - 1]) ? h.tag : "/descendant::" + h.tag;
							if (h.id && (d += '[@id = "' + h.id.replace(/^#/, "") + '"]'), h.allClasses && (d += h.allClasses.replace(l.classes, '[contains(concat(" ", @class, " "), " $1 ")]')), h.allAttr && (d += h.allAttr.replace(l.attribs, r)), h.allPseudos)
								for (var O = h.allPseudos.match(l.pseudos), w = 0, x = O.length; x > w; w++) {
									l.pseudos.lastIndex = 0;
									var D = l.pseudos.exec(O[w]),
										C = D[1] ? D[1].toLowerCase() : null,
										L = D[3] || null,
										T = i(h.tag, C, L);
									T.length && (d += "[" + T + "]")
								}
						}
						for (var S, H = document.evaluate(d, this, a, 0, null); S = H.iterateNext();) v.push(S)
					} return v
			}, DOMAssistant.cssByXpath.call(this, e)
		},
		cssSelection: function(e) {
			if (DOMAssistant.cssSelection = document.evaluate ? DOMAssistant.cssByXpath : DOMAssistant.cssByDOM, document.querySelectorAll) {
				var n = DOMAssistant.cssSelection;
				DOMAssistant.cssSelection = function(e) {
					try {
						var s = new t;
						return o(s, this.querySelectorAll(e))
					} catch (a) {
						return n.call(this, e)
					}
				}
			}
			return DOMAssistant.cssSelection.call(this, e)
		},
		cssSelect: function(t) {
			return DOMAssistant.cssSelection.call(this, t)
		},
		elmsByClass: function(t, e) {
			var n = (e || "") + "." + t;
			return DOMAssistant.cssSelection.call(this, n)
		},
		elmsByAttribute: function(t, e, n, s) {
			var a = (n || "") + "[" + t + (e && "*" !== e ? (s || "") + "=" + e + "]" : "]");
			return DOMAssistant.cssSelection.call(this, a)
		},
		elmsByTag: function(t) {
			return DOMAssistant.cssSelection.call(this, t)
		}
	}
}();
DOMAssistant.initCore(), DOMAssistant.AJAX = function() {
	var globalXMLHttp = null,
		readyState = 0,
		status = -1,
		statusText = "",
		requestPool = [],
		createAjaxObj = function(t, e, n, s) {
			var a = null;
			return /POST/i.test(e) && (t = t.split("?"), a = t[1], t = t[0]), {
				url: t,
				method: e,
				callback: n,
				params: a,
				headers: {},
				responseType: "text",
				addToContent: s || !1
			}
		},
		inProgress = function(t) {
			return !!t && t.readyState >= 1 && t.readyState <= 3
		};
	return {
		publicMethods: ["ajax", "get", "post", "load"],
		initRequest: function() {
			var t = null;
			if (window.XMLHttpRequest) t = new XMLHttpRequest, DOMAssistant.AJAX.initRequest = function() {
				return requestPool.length ? requestPool.pop() : new XMLHttpRequest
			};
			else if (window.ActiveXObject)
				for (var e = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"], n = 0; n < e.length; n++) try {
					t = new window.ActiveXObject(e[n]), DOMAssistant.AJAX.initRequest = function() {
						return requestPool.length ? requestPool.pop() : new window.ActiveXObject(e[n])
					};
					break
				} catch (s) {
					t = null
				}
			return t
		},
		ajax: function(t) {
			if (!t.noParse && t.url && /\?/.test(t.url) && t.method && /POST/i.test(t.method)) {
				var e = t.url.split("?");
				t.url = e[0], t.params = e[1] + (e[1].length > 0 && t.params ? "&" + t.params : "")
			}
			return DOMAssistant.AJAX.makeCall.call(this, t)
		},
		get: function(t, e, n) {
			var s = createAjaxObj(t, "GET", e, n);
			return DOMAssistant.AJAX.makeCall.call(this, s)
		},
		post: function(t, e) {
			var n = createAjaxObj(t, "POST", e);
			return DOMAssistant.AJAX.makeCall.call(this, n)
		},
		load: function(t, e) {
			DOMAssistant.AJAX.get.call(this, t, DOMAssistant.AJAX.replaceWithAJAXContent, e)
		},
		makeCall: function(ajaxObj) {
			var XMLHttp = DOMAssistant.AJAX.initRequest();
			return XMLHttp && (globalXMLHttp = XMLHttp, function(elm) {
				var url = ajaxObj.url,
					method = ajaxObj.method || "GET",
					callback = ajaxObj.callback,
					params = ajaxObj.params,
					headers = ajaxObj.headers,
					responseType = ajaxObj.responseType || "text",
					addToContent = ajaxObj.addToContent,
					timeout = ajaxObj.timeout || null,
					ex = ajaxObj.exception,
					timeoutId = null;
				if (XMLHttp.open(method, url, !0), XMLHttp.setRequestHeader("AJAX", "true"), XMLHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest"), "POST" === method) {
					var contentLength = params ? params.length : 0;
					XMLHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), XMLHttp.setRequestHeader("Content-length", contentLength), XMLHttp.overrideMimeType && XMLHttp.setRequestHeader("Connection", "close")
				}
				"json" === responseType && XMLHttp.setRequestHeader("Accept", "application/json, text/javascript, */*");
				for (var i in headers) "string" == typeof i && XMLHttp.setRequestHeader(i, headers[i]);
				"function" == typeof callback && (XMLHttp.onreadystatechange = function() {
					try {
						if (4 === XMLHttp.readyState) {
							if (window.clearTimeout(timeoutId), status = XMLHttp.status, statusText = XMLHttp.statusText, readyState = 4, !status || 200 !== status) throw new Error(statusText);
							var response = /xml/i.test(responseType) ? XMLHttp.responseXML : XMLHttp.responseText;
							/json/i.test(responseType) && (response = "object" == typeof JSON && "function" == typeof JSON.parse ? JSON.parse(response) : eval("(" + response + ")")), globalXMLHttp = null, XMLHttp.onreadystatechange = function() {}, requestPool.push(XMLHttp), callback.call(elm, response, addToContent)
						}
					} catch (e) {
						globalXMLHttp = XMLHttp = null, "function" == typeof ex && (ex.call(elm, e), ex = null)
					}
				}), XMLHttp.send(params), timeout && (timeoutId = window.setTimeout(function() {
					inProgress(XMLHttp) && (XMLHttp.abort(), "function" == typeof ex && (readyState = 0, status = 408, statusText = "Request timeout", globalXMLHttp = XMLHttp = null, ex.call(elm, new Error(statusText)), ex = null))
				}, timeout))
			}(this)), this
		},
		replaceWithAJAXContent: function(t, e) {
			e ? this.innerHTML += t : (DOMAssistant.clearHandlers.apply(this), this.innerHTML = t)
		},
		getReadyState: function() {
			return globalXMLHttp && "undefined" != typeof globalXMLHttp.readyState ? globalXMLHttp.readyState : readyState
		},
		getStatus: function() {
			return status
		},
		getStatusText: function() {
			return statusText
		}
	}
}(), DOMAssistant.attach(DOMAssistant.AJAX), DOMAssistant.CSS = function() {
	return {
		addClass: function(t) {
			if (!DOMAssistant.CSS.hasClass.call(this, t)) {
				var e = this.className;
				this.className = e + (e.length ? " " : "") + t
			}
			return this
		},
		removeClass: function(t) {
			return DOMAssistant.CSS.replaceClass.call(this, t)
		},
		replaceClass: function(t, e) {
			var n = new RegExp("(^|\\s)" + t + "(\\s|$)", "i");
			return this.className = this.className.replace(n, function(t, n, s) {
				var a = e ? n + e + s : "";
				return /^\s+.*\s+$/.test(t) && (a = t.replace(/(\s+).+/, "$1")), a
			}).replace(/^\s+|\s+$/g, ""), this
		},
		hasClass: function(t) {
			return new RegExp("(^|\\s)" + t + "(\\s|$)", "i").test(this.className)
		},
		setStyle: function(t, e) {
			if (this.filters && ("string" == typeof t ? /opacity/i.test(t) : t.opacity) && (this.style.filter = "alpha(opacity=" + 100 * (e || t.opacity || 1) + ")"), "undefined" != typeof this.style.cssText) {
				var n = this.style.cssText;
				if ("object" == typeof t)
					for (var s in t) "string" == typeof s && (n += ";" + s + ":" + t[s]);
				else n += ";" + t + ":" + e;
				this.style.cssText = n
			}
			return this
		},
		getStyle: function(t) {
			var e = "";
			if (t = t.toLowerCase(), document.defaultView && document.defaultView.getComputedStyle) e = document.defaultView.getComputedStyle(this, "").getPropertyValue(t);
			else if (this.currentStyle) {
				if (this.filters && /^opacity$/.test(t)) {
					var n = this.filters["DXImageTransform.Microsoft.Alpha"] || this.filters.alpha || {};
					e = (n.opacity || 100) / 100
				} else t = t.replace(/^float$/, "styleFloat").replace(/\-(\w)/g, function(t, e) {
					return e.toUpperCase()
				}), e = this.currentStyle[t];
				"auto" === e && /^(width|height)$/.test(t) && "none" !== this.currentStyle.display && (e = this["offset" + t.charAt(0).toUpperCase() + t.substr(1)] + "px")
			}
			return e
		}
	}
}(), DOMAssistant.attach(DOMAssistant.CSS), DOMAssistant.Content = function() {
	var t = DOMAssistant.$;
	return {
		init: function() {
			DOMAssistant.setCache(!1)
		},
		prev: function() {
			for (var e = this;
				(e = e.previousSibling) && 1 !== e.nodeType;);
			return t(e)
		},
		next: function() {
			for (var e = this;
				(e = e.nextSibling) && 1 !== e.nodeType;);
			return t(e)
		},
		create: function(e, n, s, a) {
			var r = t(document.createElement(e));
			return n && (r = r.setAttributes(n)), "undefined" != typeof a && r.addContent(a), s && DOMAssistant.Content.addContent.call(this, r), r
		},
		setAttributes: function(e) {
			if (DOMAssistant.isIE) {
				var n = function(t, e, n) {
					var s = e.toLowerCase();
					switch (s) {
						case "name":
						case "type":
							return document.createElement(t.outerHTML.replace(new RegExp(s + "=[a-zA-Z]+"), " ").replace(">", " " + s + "=" + n + ">"));
						case "style":
							return t.style.cssText = n, t;
						default:
							return t[DOMAssistant.camel[s] || e] = n, t
					}
				};
				DOMAssistant.Content.setAttributes = function(e) {
					var s = this,
						a = this.parentNode;
					for (var r in e)
						if ("string" == typeof e[r] || "number" == typeof e[r]) {
							var i = n(s, r, e[r]);
							a && /(name|type)/i.test(r) && (s.innerHTML && (i.innerHTML = s.innerHTML), a.replaceChild(i, s)), s = i
						} return t(s)
				}
			} else DOMAssistant.Content.setAttributes = function(t) {
				for (var e in t) /class/i.test(e) ? this.className = t[e] : this.setAttribute(e, t[e]);
				return this
			};
			return DOMAssistant.Content.setAttributes.call(this, e)
		},
		addContent: function(t) {
			var e = typeof t;
			return "string" === e || "number" === e ? this.innerHTML += t : ("object" === e || "function" === e && t.nodeName) && this.appendChild(t), this
		},
		replaceContent: function(t) {
			return DOMAssistant.clearHandlers.apply(this), this.innerHTML = "", DOMAssistant.Content.addContent.call(this, t)
		},
		replace: function(e, n) {
			var s = typeof e;
			if ("string" === s || "number" === s) {
				for (var a = this.parentNode, r = t(a).create("div", null, !1, e), i = r.childNodes.length - 1; i >= 0; i--) a.insertBefore(r.childNodes[i], this.nextSibling);
				e = this.nextSibling, a.removeChild(this)
			} else("object" === s || "function" === s && e.nodeName) && this.parentNode.replaceChild(e, this);
			return n ? e : this
		},
		remove: function() {
			return this.parentNode.removeChild(this), null
		}
	}
}(), DOMAssistant.attach(DOMAssistant.Content), DOMAssistant.Events = function() {
	var t = 1;
	return {
		publicMethods: ["triggerEvent", "addEvent", "removeEvent", "preventDefault", "cancelBubble"],
		init: function() {
			window.addEvent = this.addEvent, window.removeEvent = this.removeEvent, DOMAssistant.preventDefault = this.preventDefault, DOMAssistant.cancelBubble = this.cancelBubble
		},
		triggerEvent: function(t, e) {
			if (this.events && this.events[t])
				for (var n = {
						type: t,
						target: e || this,
						currentTarget: this,
						bubbles: !1,
						cancelable: !1,
						preventDefault: function() {},
						stopPropagation: function() {},
						timeStamp: +new Date
					}, s = 0, a = this.events[t].length; a > s; s++) this.events[t][s].call(this, n);
			else "function" == typeof this["on" + t] && this["on" + t].call(this, n);
			return this
		},
		addEvent: function(e, n) {
			if (/^DOM/.test(e)) this.addEventListener && this.addEventListener(e, n, !1);
			else if (this.uniqueHandlerId || (this.uniqueHandlerId = t++), !n.attachedElements || !n.attachedElements[e + this.uniqueHandlerId]) {
				if (this.events || (this.events = {}), !this.events[e]) {
					this.events[e] = [];
					var s = this["on" + e];
					s && this.events[e].push(s)
				}
				this.events[e].push(n), this["on" + e] = DOMAssistant.Events.handleEvent, "object" == typeof this.window && (this.window["on" + e] = DOMAssistant.Events.handleEvent), n.attachedElements || (n.attachedElements = {}), n.attachedElements[e + this.uniqueHandlerId] = !0
			}
			return this
		},
		handleEvent: function(t) {
			for (var e = t || event, n = e.target || e.srcElement || document; 1 !== n.nodeType && n.parentNode;) n = n.parentNode;
			e.eventTarget = n;
			var s, a, r = this.events[e.type].slice(0);
			if (s = r.length) {
				for (var i = 0; s > i; i++) "function" == typeof r[i] && (a = r[i].call(this, e));
				return a
			}
		},
		removeEvent: function(t, e) {
			if (this.events && this.events[t])
				for (var n, s = this.events[t], a = s.length - 1; a >= 0; a--) n = e || s[a], s[a] === n && (delete s[a], s.splice(a, 1), n.attachedElements && (n.attachedElements[t + this.uniqueHandlerId] = null));
			else this["on" + t] && !e && (this["on" + t] = null);
			return this
		},
		preventDefault: function(t) {
			return DOMAssistant.Events.preventDefault = t && t.preventDefault ? function(t) {
				t.preventDefault()
			} : function() {
				event.returnValue = !1
			}, DOMAssistant.Events.preventDefault(t)
		},
		cancelBubble: function(t) {
			return DOMAssistant.Events.cancelBubble = t && t.stopPropagation ? function(t) {
				t.stopPropagation()
			} : function() {
				event.cancelBubble = !0
			}, DOMAssistant.Events.cancelBubble(t)
		}
	}
}(), DOMAssistant.attach(DOMAssistant.Events), DOMAssistant.DOMLoad = function() {
	var t = !1,
		e = null,
		n = [],
		s = {},
		a = null,
		r = function() {
			for (var t = 0, e = n.length; e > t; t++) try {
				n[t]()
			} catch (s) {
				a && "function" == typeof a && a(s)
			}
			n = []
		},
		i = function() {
			t || (t = !0, r())
		};
	return document.addEventListener && document.addEventListener("DOMContentLoaded", i, !1), /KHTML|WebKit|iCab/i.test(navigator.userAgent) && (e = setInterval(function() {
		/loaded|complete/i.test(document.readyState) && (i(), clearInterval(e))
	}, 10)), window.onload = i, {
		DOMReady: function() {
			for (var e, a = 0, i = arguments.length; i > a; a++) e = arguments[a], e.DOMReady || s[e] || ("string" == typeof e && (s[e] = !0, e = new Function(e)), e.DOMReady = !0, n.push(e));
			t && r()
		},
		setErrorHandling: function(t) {
			a = t
		}
	}
}(), DOMAssistant.DOMReady = DOMAssistant.DOMLoad.DOMReady;
var url;
DOMAssistant.DOMReady(checkLinks);
