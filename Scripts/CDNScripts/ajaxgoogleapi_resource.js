﻿/*
 AngularJS v1.3.12
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (I, d, B) {
    'use strict'; function D(f, q) { q = q || {}; d.forEach(q, function (d, h) { delete q[h] }); for (var h in f) !f.hasOwnProperty(h) || "$" === h.charAt(0) && "$" === h.charAt(1) || (q[h] = f[h]); return q } var w = d.$$minErr("$resource"), C = /^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/; d.module("ngResource", ["ng"]).provider("$resource", function () {
        var f = this; this.defaults = { stripTrailingSlashes: !0, actions: { get: { method: "GET" }, save: { method: "POST" }, query: { method: "GET", isArray: !0 }, remove: { method: "DELETE" }, "delete": { method: "DELETE" } } };
        this.$get = ["$http", "$q", function (q, h) {
            function t(d, g) { this.template = d; this.defaults = s({}, f.defaults, g); this.urlParams = {} } function v(x, g, l, m) {
                function c(b, k) { var c = {}; k = s({}, g, k); r(k, function (a, k) { u(a) && (a = a()); var d; if (a && a.charAt && "@" == a.charAt(0)) { d = b; var e = a.substr(1); if (null == e || "" === e || "hasOwnProperty" === e || !C.test("." + e)) throw w("badmember", e); for (var e = e.split("."), n = 0, g = e.length; n < g && d !== B; n++) { var h = e[n]; d = null !== d ? d[h] : B } } else d = a; c[k] = d }); return c } function F(b) { return b.resource } function e(b) {
                    D(b ||
                    {}, this)
                } var G = new t(x, m); l = s({}, f.defaults.actions, l); e.prototype.toJSON = function () { var b = s({}, this); delete b.$promise; delete b.$resolved; return b }; r(l, function (b, k) {
                    var g = /^(POST|PUT|PATCH)$/i.test(b.method); e[k] = function (a, y, m, x) {
                        var n = {}, f, l, z; switch (arguments.length) { case 4: z = x, l = m; case 3: case 2: if (u(y)) { if (u(a)) { l = a; z = y; break } l = y; z = m } else { n = a; f = y; l = m; break } case 1: u(a) ? l = a : g ? f = a : n = a; break; case 0: break; default: throw w("badargs", arguments.length); } var t = this instanceof e, p = t ? f : b.isArray ? [] : new e(f),
                        A = {}, v = b.interceptor && b.interceptor.response || F, C = b.interceptor && b.interceptor.responseError || B; r(b, function (b, a) { "params" != a && "isArray" != a && "interceptor" != a && (A[a] = H(b)) }); g && (A.data = f); G.setUrlParams(A, s({}, c(f, b.params || {}), n), b.url); n = q(A).then(function (a) {
                            var c = a.data, g = p.$promise; if (c) {
                                if (d.isArray(c) !== !!b.isArray) throw w("badcfg", k, b.isArray ? "array" : "object", d.isArray(c) ? "array" : "object"); b.isArray ? (p.length = 0, r(c, function (a) { "object" === typeof a ? p.push(new e(a)) : p.push(a) })) : (D(c, p), p.$promise =
                                g)
                            } p.$resolved = !0; a.resource = p; return a
                        }, function (a) { p.$resolved = !0; (z || E)(a); return h.reject(a) }); n = n.then(function (a) { var b = v(a); (l || E)(b, a.headers); return b }, C); return t ? n : (p.$promise = n, p.$resolved = !1, p)
                    }; e.prototype["$" + k] = function (a, b, c) { u(a) && (c = b, b = a, a = {}); a = e[k].call(this, a, this, b, c); return a.$promise || a }
                }); e.bind = function (b) { return v(x, s({}, g, b), l) }; return e
            } var E = d.noop, r = d.forEach, s = d.extend, H = d.copy, u = d.isFunction; t.prototype = {
                setUrlParams: function (f, g, l) {
                    var m = this, c = l || m.template, h,
                    e, q = m.urlParams = {}; r(c.split(/\W/), function (b) { if ("hasOwnProperty" === b) throw w("badname"); !/^\d+$/.test(b) && b && (new RegExp("(^|[^\\\\]):" + b + "(\\W|$)")).test(c) && (q[b] = !0) }); c = c.replace(/\\:/g, ":"); g = g || {}; r(m.urlParams, function (b, k) {
                        h = g.hasOwnProperty(k) ? g[k] : m.defaults[k]; d.isDefined(h) && null !== h ? (e = encodeURIComponent(h).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "%20").replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+"), c = c.replace(new RegExp(":" +
                        k + "(\\W|$)", "g"), function (b, a) { return e + a })) : c = c.replace(new RegExp("(/?):" + k + "(\\W|$)", "g"), function (b, a, c) { return "/" == c.charAt(0) ? c : a + c })
                    }); m.defaults.stripTrailingSlashes && (c = c.replace(/\/+$/, "") || "/"); c = c.replace(/\/\.(?=\w+($|\?))/, "."); f.url = c.replace(/\/\\\./, "/."); r(g, function (b, c) { m.urlParams[c] || (f.params = f.params || {}, f.params[c] = b) })
                }
            }; return v
        }]
    })
})(window, window.angular);
//# sourceMappingURL=angular-resource.min.js.map