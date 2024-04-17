class oe {
  /**
   * @type {T}
   */
  #t;
  #e = /* @__PURE__ */ new Set();
  /**
   * @param {T} current
   */
  constructor(t) {
    this.#t = t;
  }
  /**
   * @return {T}
   */
  get current() {
    return this.#t;
  }
  /**
   * @param {T} value
   */
  set current(t) {
    this.#t != t && (this.#t = t, this.#e.forEach((s) => s(t)));
  }
  /**
   * @type {import("hooks").Ref["on"]}
   */
  on(t) {
    return this.#e.add(t), () => this.#e.delete(t);
  }
}
const At = (e) => new oe(e), V = Symbol.for("atomico.hooks");
globalThis[V] = globalThis[V] || {};
let M = globalThis[V];
const re = Symbol.for("Atomico.suspense"), Rt = Symbol.for("Atomico.effect"), ae = Symbol.for("Atomico.layoutEffect"), It = Symbol.for("Atomico.insertionEffect"), O = (e, t, s) => {
  const { i: n, hooks: o } = M.c, r = o[n] = o[n] || {};
  return r.value = e(r.value), r.effect = t, r.tag = s, M.c.i++, o[n].value;
}, ie = (e) => O((t = At(e)) => t), L = () => O((e = At(M.c.host)) => e), Ut = () => M.c.update, ce = (e, t, s = 0) => {
  let n = {}, o = !1;
  const r = () => o, a = (f, l) => {
    for (const h in n) {
      const i = n[h];
      i.effect && i.tag === f && (i.value = i.effect(i.value, l));
    }
  };
  return { load: (f) => {
    M.c = { host: t, hooks: n, update: e, i: 0, id: s };
    let l;
    try {
      o = !1, l = f();
    } catch (h) {
      if (h !== re)
        throw h;
      o = !0;
    } finally {
      M.c = null;
    }
    return l;
  }, cleanEffects: (f) => (a(It, f), () => (a(ae, f), () => {
    a(Rt, f);
  })), isSuspense: r };
}, F = Symbol.for, le = queueMicrotask;
function _t(e, t) {
  const s = e.length;
  if (s !== t.length)
    return !1;
  for (let n = 0; n < s; n++) {
    let o = e[n], r = t[n];
    if (o !== r)
      return !1;
  }
  return !0;
}
const v = (e) => typeof e == "function", I = (e) => typeof e == "object", { isArray: ue } = Array, tt = (e, t) => (t ? e instanceof HTMLStyleElement : !0) && "hydrate" in (e?.dataset || {});
function Lt(e, t) {
  let s;
  const n = (o) => {
    let { length: r } = o;
    for (let a = 0; a < r; a++) {
      const c = o[a];
      if (c && Array.isArray(c))
        n(c);
      else {
        const u = typeof c;
        if (c == null || u === "function" || u === "boolean")
          continue;
        u === "string" || u === "number" ? (s == null && (s = ""), s += c) : (s != null && (t(s), s = null), t(c));
      }
    }
  };
  n(e), s != null && t(s);
}
const xt = (e, t, s) => (e.addEventListener(t, s), () => e.removeEventListener(t, s));
class $t {
  /**
   *
   * @param {HTMLElement} target
   * @param {string} message
   * @param {string} value
   */
  constructor(t, s, n) {
    this.message = s, this.target = t, this.value = n;
  }
}
class jt extends $t {
}
class fe extends $t {
}
const q = "Custom", de = null, he = { true: 1, "": 1, 1: 1 };
function me(e, t, s, n, o) {
  const {
    type: r,
    reflect: a,
    event: c,
    value: u,
    attr: f = ye(t)
  } = s?.name != q && I(s) && s != de ? s : { type: s }, l = r?.name === q && r.map, h = u != null ? r == Function || !v(u) ? () => u : u : null;
  Object.defineProperty(e, t, {
    configurable: !0,
    /**
     * @this {import("dom").AtomicoThisInternal}
     * @param {any} newValue
     */
    set(i) {
      const d = this[t];
      h && r != Boolean && i == null && (i = h());
      const { error: p, value: D } = (l ? ge : De)(
        r,
        i
      );
      if (p && D != null)
        throw new jt(
          this,
          `The value defined for prop '${t}' must be of type '${r.name}'`,
          D
        );
      d != D && (this._props[t] = D ?? void 0, this.update(), c && Yt(this, c), this.updated.then(() => {
        a && (this._ignoreAttr = f, pe(this, r, f, this[t]), this._ignoreAttr = null);
      }));
    },
    /**
     * @this {import("dom").AtomicoThisInternal}
     */
    get() {
      return this._props[t];
    }
  }), h && (o[t] = h()), n[f] = { prop: t, type: r };
}
const Yt = (e, { type: t, base: s = CustomEvent, ...n }) => e.dispatchEvent(new s(t, n)), ye = (e) => e.replace(/([A-Z])/g, "-$1").toLowerCase(), pe = (e, t, s, n) => n == null || t == Boolean && !n ? e.removeAttribute(s) : e.setAttribute(
  s,
  t?.name === q && t?.serialize ? t?.serialize(n) : I(n) ? JSON.stringify(n) : t == Boolean ? "" : n
), be = (e, t) => e == Boolean ? !!he[t] : e == Number ? Number(t) : e == String ? t : e == Array || e == Object ? JSON.parse(t) : e.name == q ? t : (
  // TODO: If when defining reflect the prop can also be of type string?
  new e(t)
), ge = ({ map: e }, t) => {
  try {
    return { value: e(t), error: !1 };
  } catch {
    return { value: t, error: !0 };
  }
}, De = (e, t) => e == null || t == null ? { value: t, error: !1 } : e != String && t === "" ? { value: void 0, error: !1 } : e == Object || e == Array || e == Symbol ? {
  value: t,
  error: {}.toString.call(t) !== `[object ${e.name}]`
} : t instanceof e ? {
  value: t,
  error: e == Number && Number.isNaN(t.valueOf())
} : e == String || e == Number || e == Boolean ? {
  value: t,
  error: e == Number ? typeof t != "number" ? !0 : Number.isNaN(t) : e == String ? typeof t != "string" : typeof t != "boolean"
} : { value: t, error: !0 };
let we = 0;
const Ee = (e) => {
  const t = (e?.dataset || {})?.hydrate || "";
  return t || "c" + we++;
}, x = (e, t = HTMLElement) => {
  const s = {}, n = {}, o = "prototype" in t && t.prototype instanceof Element, r = o ? t : "base" in t ? t.base : HTMLElement, { props: a, styles: c } = o ? e : t;
  class u extends r {
    constructor() {
      super(), this._setup(), this._render = () => e({ ...this._props });
      for (const l in n)
        this[l] = n[l];
    }
    /**
     * @returns {import("core").Sheets[]}
     */
    static get styles() {
      return [super.styles, c];
    }
    async _setup() {
      if (this._props)
        return;
      this._props = {};
      let l, h;
      this.mounted = new Promise(
        (m) => this.mount = () => {
          m(), l != this.parentNode && (h != l ? this.unmounted.then(this.update) : this.update()), l = this.parentNode;
        }
      ), this.unmounted = new Promise(
        (m) => this.unmount = () => {
          m(), (l != this.parentNode || !this.isConnected) && (i.cleanEffects(!0)()(), h = this.parentNode, l = null);
        }
      ), this.symbolId = this.symbolId || Symbol(), this.symbolIdParent = Symbol();
      const i = ce(
        () => this.update(),
        this,
        Ee(this)
      );
      let d, p = !0;
      const D = tt(this);
      this.update = () => (d || (d = !0, this.updated = (this.updated || this.mounted).then(() => {
        try {
          const m = i.load(this._render), w = i.cleanEffects();
          return m && //@ts-ignore
          m.render(this, this.symbolId, D), d = !1, p && !i.isSuspense() && (p = !1, !D && ve(this)), w();
        } finally {
          d = !1;
        }
      }).then(
        /**
         * @param {import("internal/hooks.js").CleanUseEffects} [cleanUseEffect]
         */
        (m) => {
          m && m();
        }
      )), this.updated), this.update();
    }
    connectedCallback() {
      this.mount(), super.connectedCallback && super.connectedCallback();
    }
    disconnectedCallback() {
      super.disconnectedCallback && super.disconnectedCallback(), this.unmount();
    }
    /**
     * @this {import("dom").AtomicoThisInternal}
     * @param {string} attr
     * @param {(string|null)} oldValue
     * @param {(string|null)} value
     */
    attributeChangedCallback(l, h, i) {
      if (s[l]) {
        if (l === this._ignoreAttr || h === i)
          return;
        const { prop: d, type: p } = s[l];
        try {
          this[d] = be(p, i);
        } catch {
          throw new fe(
            this,
            `The value defined as attr '${l}' cannot be parsed by type '${p.name}'`,
            i
          );
        }
      } else
        super.attributeChangedCallback(l, h, i);
    }
    static get props() {
      return { ...super.props, ...a };
    }
    static get observedAttributes() {
      const l = super.observedAttributes || [];
      for (const h in a)
        me(this.prototype, h, a[h], s, n);
      return Object.keys(s).concat(l);
    }
  }
  return u;
};
function ve(e) {
  const { styles: t } = e.constructor, { shadowRoot: s } = e;
  if (s && t.length) {
    const n = [];
    Lt(t, (o) => {
      o && (o instanceof Element ? s.appendChild(o.cloneNode(!0)) : n.push(o));
    }), n.length && (s.adoptedStyleSheets = n);
  }
}
const qt = (e) => (t, s) => {
  O(
    /**
     * Clean the effect hook
     * @type {import("internal/hooks.js").CollectorEffect}
     */
    ([n, o] = []) => ((o || !o) && (o && _t(o, s) ? n = n || !0 : (v(n) && n(), n = null)), [n, s]),
    /**
     * @returns {any}
     */
    ([n, o], r) => r ? (v(n) && n(), []) : [n || t(), o],
    e
  );
}, $ = qt(Rt), Se = qt(It);
class Wt extends Array {
  /**
   *
   * @param {any} initialState
   * @param {(nextState: any, state:any[], mount: boolean )=>void} mapState
   */
  constructor(t, s) {
    let n = !0;
    const o = (r) => {
      try {
        s(r, this, n);
      } finally {
        n = !1;
      }
    };
    super(void 0, o, s), o(t);
  }
  /**
   * The following code allows a mutable approach to useState
   * and useProp this with the idea of allowing an alternative
   * approach similar to Vue or Qwik of state management
   * @todo pending review with the community
   */
  // get value() {
  //     return this[0];
  // }
  // set value(nextState) {
  //     this[2](nextState, this);
  // }
}
const it = (e) => {
  const t = Ut();
  return O(
    (s = new Wt(e, (n, o, r) => {
      n = v(n) ? n(o[0]) : n, n !== o[0] && (o[0] = n, r || t());
    })) => s
  );
}, C = (e, t) => {
  const [s] = O(([n, o, r = 0] = []) => ((!o || o && !_t(o, t)) && (n = e()), [n, t, r]));
  return s;
}, ct = (e) => {
  const { current: t } = L();
  if (!(e in t))
    throw new jt(
      t,
      `For useProp("${e}"), the prop does not exist on the host.`,
      e
    );
  return O(
    (s = new Wt(t[e], (n, o) => {
      n = v(n) ? n(t[e]) : n, t[e] = n;
    })) => (s[0] = t[e], s)
  );
}, S = (e, t = {}) => {
  const s = L();
  return s[e] || (s[e] = (n = t.detail) => Yt(s.current, {
    type: e,
    ...t,
    detail: n
  })), s[e];
}, et = F("atomico/options");
globalThis[et] = globalThis[et] || {
  sheet: !!document.adoptedStyleSheets
};
const lt = globalThis[et], Ne = {
  checked: 1,
  value: 1,
  selected: 1
}, Te = {
  list: 1,
  type: 1,
  size: 1,
  form: 1,
  width: 1,
  height: 1,
  src: 1,
  href: 1,
  slot: 1
}, Ce = {
  shadowDom: 1,
  staticNode: 1,
  cloneNode: 1,
  children: 1,
  key: 1
}, Y = {}, nt = [];
class st extends Text {
}
const Pe = F("atomico/id"), U = F("atomico/type"), Z = F("atomico/ref"), Bt = F("atomico/vnode"), ke = () => {
};
function Me(e, t, s) {
  return Ht(this, e, t, s);
}
const zt = (e, t, ...s) => {
  const n = t || Y;
  let { children: o } = n;
  if (o = o ?? (s.length ? s : nt), e === ke)
    return o;
  const r = e ? e instanceof Node ? 1 : (
    //@ts-ignore
    e.prototype instanceof HTMLElement && 2
  ) : 0;
  if (r === !1 && e instanceof Function)
    return e(
      o != nt ? { children: o, ...n } : n
    );
  const a = lt.render || Me;
  return {
    [U]: Bt,
    type: e,
    props: n,
    children: o,
    key: n.key,
    // key for lists by keys
    // define if the node declares its shadowDom
    shadow: n.shadowDom,
    // allows renderings to run only once
    static: n.staticNode,
    // defines whether the type is a childNode `1` or a constructor `2`
    raw: r,
    // defines whether to use the second parameter for document.createElement
    is: n.is,
    // clone the node if it comes from a reference
    clone: n.cloneNode,
    render: a
  };
};
function Ht(e, t, s = Pe, n, o) {
  let r;
  if (t && t[s] && t[s].vnode == e || e[U] != Bt)
    return t;
  (e || !t) && (o = o || e.type == "svg", r = e.type != "host" && (e.raw == 1 ? (t && e.clone ? t[Z] : t) != e.type : e.raw == 2 ? !(t instanceof e.type) : t ? t[Z] || t.localName != e.type : !t), r && e.type != null && (e.raw == 1 && e.clone ? (n = !0, t = e.type.cloneNode(!0), t[Z] = e.type) : t = e.raw == 1 ? e.type : e.raw == 2 ? new e.type() : o ? document.createElementNS(
    "http://www.w3.org/2000/svg",
    e.type
  ) : document.createElement(
    e.type,
    e.is ? { is: e.is } : void 0
  )));
  const a = t[s] ? t[s] : Y, { vnode: c = Y, cycle: u = 0 } = a;
  let { fragment: f, handlers: l } = a;
  const { children: h = nt, props: i = Y } = c;
  if (l = r ? {} : l || {}, e.static && !r)
    return t;
  if (e.shadow && !t.shadowRoot && // @ts-ignore
  t.attachShadow({ mode: "open", ...e.shadow }), e.props != i && Ae(t, i, e.props, l, o), e.children !== h) {
    const d = e.shadow ? t.shadowRoot : t;
    f = Fe(
      e.children,
      /**
       * @todo for hydration use attribute and send childNodes
       */
      f,
      d,
      s,
      // add support to foreignObject, children will escape from svg
      !u && n,
      o && e.type == "foreignObject" ? !1 : o
    );
  }
  return t[s] = { vnode: e, handlers: l, fragment: f, cycle: u + 1 }, t;
}
function Oe(e, t) {
  const s = new st(""), n = new st("");
  let o;
  if (e[t ? "prepend" : "append"](s), t) {
    let { lastElementChild: r } = e;
    for (; r; ) {
      const { previousElementSibling: a } = r;
      if (tt(r, !0) && !tt(a, !0)) {
        o = r;
        break;
      }
      r = a;
    }
  }
  return o ? o.before(n) : e.append(n), {
    markStart: s,
    markEnd: n
  };
}
function Fe(e, t, s, n, o, r) {
  e = e == null ? null : ue(e) ? e : [e];
  const a = t || Oe(s, o), { markStart: c, markEnd: u, keyes: f } = a;
  let l;
  const h = f && /* @__PURE__ */ new Set();
  let i = c;
  if (e && Lt(e, (d) => {
    if (typeof d == "object" && !d[U])
      return;
    const p = d[U] && d.key, D = f && p != null && f.get(p);
    i != u && i === D ? h.delete(i) : i = i == u ? u : i.nextSibling;
    const m = f ? D : i;
    let w = m;
    if (d[U])
      w = Ht(d, m, n, o, r);
    else {
      const A = d + "";
      !(w instanceof Text) || w instanceof st ? w = new Text(A) : w.data != A && (w.data = A);
    }
    w != i && (f && h.delete(w), !m || f ? (s.insertBefore(w, i), f && i != u && h.add(i)) : m == u ? s.insertBefore(w, u) : (s.replaceChild(w, m), i = w)), p != null && (l = l || /* @__PURE__ */ new Map(), l.set(p, w));
  }), i = i == u ? u : i.nextSibling, t && i != u)
    for (; i != u; ) {
      const d = i;
      i = i.nextSibling, d.remove();
    }
  return h && h.forEach((d) => d.remove()), a.keyes = l, a;
}
function Ae(e, t, s, n, o) {
  for (const r in t)
    !(r in s) && vt(e, r, t[r], null, o, n);
  for (const r in s)
    vt(e, r, t[r], s[r], o, n);
}
function vt(e, t, s, n, o, r) {
  if (t = t == "class" && !o ? "className" : t, s = s ?? null, n = n ?? null, t in e && Ne[t] && (s = e[t]), !(n === s || Ce[t] || t[0] == "_"))
    if (e.localName === "slot" && t === "assignNode" && "assign" in e)
      le(() => e.assign(n));
    else if (t[0] == "o" && t[1] == "n" && (v(n) || v(s)))
      Re(e, t.slice(2), n, r);
    else if (t == "ref")
      n && (v(n) ? n(e) : n.current = e);
    else if (t == "style") {
      const { style: a } = e;
      s = s || "", n = n || "";
      const c = I(s), u = I(n);
      if (c)
        for (const f in s)
          if (u)
            !(f in n) && St(a, f, null);
          else
            break;
      if (u)
        for (const f in n) {
          const l = n[f];
          c && s[f] === l || St(a, f, l);
        }
      else
        a.cssText = n;
    } else {
      const a = t[0] == "$" ? t.slice(1) : t;
      a === t && (!o && !Te[t] && t in e || v(n) || v(s)) ? e[t] = n ?? "" : n == null ? e.removeAttribute(a) : e.setAttribute(
        a,
        I(n) ? JSON.stringify(n) : n
      );
    }
}
function Re(e, t, s, n) {
  if (n.handleEvent || (n.handleEvent = (o) => n[o.type].call(e, o)), s) {
    if (!n[t]) {
      const o = s.capture || s.once || s.passive ? Object.assign({}, s) : null;
      e.addEventListener(t, n, o);
    }
    n[t] = s;
  } else
    n[t] && (e.removeEventListener(t, n), delete n[t]);
}
function St(e, t, s) {
  let n = "setProperty";
  s == null && (n = "removeProperty", s = null), ~t.indexOf("-") ? e[n](t, s) : e[t] = s;
}
const Nt = {};
function W(e, ...t) {
  const s = (e.raw || e).reduce(
    (n, o, r) => n + o + (t[r] || ""),
    ""
  );
  return Nt[s] = Nt[s] || Ie(s);
}
function Ie(e) {
  if (lt.sheet) {
    const t = new CSSStyleSheet();
    return t.replaceSync(e), t;
  } else {
    const t = document.createElement("style");
    return t.textContent = e, t;
  }
}
const Ue = zt("host", { style: "display: contents" }), X = F("atomico/context"), _e = (e, t) => {
  const s = L();
  Se(
    () => xt(
      s.current,
      "ConnectContext",
      /**
       * @param {CustomEvent<import("context").DetailConnectContext>} event
       */
      (n) => {
        e === n.detail.id && (n.stopPropagation(), n.detail.connect(t));
      }
    ),
    [e]
  );
}, Le = (e) => {
  const t = S("ConnectContext", {
    bubbles: !0,
    composed: !0
  }), s = () => {
    if (lt.ssr)
      return;
    let r;
    return t({
      id: e,
      connect(a) {
        r = a;
      }
    }), r;
  }, [n, o] = it(
    s
  );
  return $(() => {
    n || (e[X] || (e[X] = customElements.whenDefined(
      new e().localName
    )), e[X].then(
      () => o(s)
    ));
  }, [e]), n;
}, xe = (e) => {
  const t = Le(e), s = Ut();
  return $(() => {
    if (t)
      return xt(t, "UpdatedValue", s);
  }, [t]), (t || e).value;
}, $e = (e) => {
  const t = x(
    () => (_e(t, L().current), Ue),
    {
      props: {
        value: {
          type: Object,
          event: { type: "UpdatedValue" },
          value: () => e
        }
      }
    }
  );
  return t.value = e, t;
}, y = (e, t, s) => (t == null ? t = { key: s } : t.key = s, zt(e, t)), N = y, je = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[0-1])$/, Kt = "years", Jt = "months", Zt = "days";
function Ye(e) {
  if (Kt in e)
    return { years: -e.years };
  if (Jt in e)
    return { months: -e.months };
  if (Zt in e)
    return { days: -e.days };
  throw new TypeError();
}
function qe(e, t) {
  return g.from(new Date(Date.UTC(e.year, e.month - 1, t)));
}
function We(e, t) {
  const s = new g(t, e.month, 1), n = dt(s), o = e.toDate();
  return o.setUTCFullYear(t), B(g.from(o), s, n);
}
function Be(e, t) {
  const s = new g(e.year, t, 1), n = dt(s), o = e.toDate();
  return o.setUTCMonth(t - 1), B(g.from(o), s, n);
}
function Tt(e, t) {
  return Zt in t ? qe(e, e.day + t.days) : Jt in t ? Be(e, e.month + t.months) : Kt in t ? We(e, e.year + t.years) : e;
}
const G = (e, t) => e.toString().padStart(t, "0");
class g {
  constructor(t, s, n) {
    this.year = t, this.month = s, this.day = n;
  }
  add(t) {
    return Tt(this, t);
  }
  subtract(t) {
    return Tt(this, Ye(t));
  }
  toString() {
    return `${G(this.year, 4)}-${G(this.month, 2)}-${G(this.day, 2)}`;
  }
  toDate() {
    return new Date(Date.UTC(this.year, this.month - 1, this.day, 0, 0, 0));
  }
  toPlainYearMonth() {
    return new k(this.year, this.month);
  }
  equals(t) {
    return this.year === t.year && this.month === t.month && this.day === t.day;
  }
  static compare(t, s) {
    return Gt(t, s);
  }
  static from(t) {
    return typeof t == "string" ? this.fromString(t) : this.fromDate(t);
  }
  static fromString(t) {
    const s = t.match(je);
    if (!s)
      throw new TypeError(t);
    const [, n, o, r] = s;
    return new g(
      parseInt(n, 10),
      parseInt(o, 10),
      parseInt(r, 10)
    );
  }
  static fromDate(t) {
    return new g(
      t.getUTCFullYear(),
      t.getUTCMonth() + 1,
      t.getUTCDate()
    );
  }
}
function Ct(e) {
  return (e.months ?? 0) + (e.years ?? 0) * 12;
}
function Pt(e, t) {
  const s = e.toDate();
  return s.setUTCMonth(s.getUTCMonth() + t), new k(s.getUTCFullYear(), s.getUTCMonth() + 1);
}
class k {
  constructor(t, s) {
    this.year = t, this.month = s;
  }
  add(t) {
    return Pt(this, Ct(t));
  }
  subtract(t) {
    return Pt(this, -Ct(t));
  }
  toDate() {
    return new Date(Date.UTC(this.year, this.month - 1, 1));
  }
  equals(t) {
    return this.year === t.year && this.month === t.month;
  }
  toPlainDate() {
    return new g(this.year, this.month, 1);
  }
  static compare(t, s) {
    const n = t instanceof g ? t.toPlainYearMonth() : t, o = s instanceof g ? s.toPlainYearMonth() : s;
    return Gt(n, o);
  }
}
function ut() {
  return g.from(/* @__PURE__ */ new Date());
}
function ft(e, t = 0) {
  const s = e.toDate(), n = s.getUTCDay(), o = (n < t ? 7 : 0) + n - t;
  return s.setUTCDate(s.getUTCDate() - o), g.from(s);
}
function ze(e) {
  const s = e.toDate(), o = (s.getUTCDay() + 6) % 7;
  s.setDate(s.getDate() - o + 3);
  const r = s.valueOf();
  return s.setMonth(0, 1), s.getDay() !== 4 && s.setMonth(0, 1 + (4 - s.getDay() + 7) % 7), 1 + Math.ceil((r - s.valueOf()) / 6048e5);
}
function Xt(e, t = 0) {
  return ft(e, t).add({ days: 6 });
}
function dt(e) {
  return g.from(new Date(Date.UTC(e.year, e.month, 0)));
}
function Gt(e, t) {
  const s = e.toDate(), n = t.toDate();
  return s < n ? -1 : s > n ? 1 : 0;
}
function B(e, t, s) {
  return t && g.compare(e, t) < 0 ? t : s && g.compare(e, s) > 0 ? s : e;
}
function ot(e, t, s) {
  return B(e, t, s) === e;
}
function He(e, t) {
  const s = { days: 1 }, n = [e];
  let o = e;
  for (; !o.equals(t); )
    o = o.add(s), n.push(o);
  return n;
}
function Ke(e, t) {
  const s = [];
  for (let n = 0; n < e.length; n += t)
    s.push(e.slice(n, n + t));
  return s;
}
function Je(e, t = 0) {
  const s = ft(e.toPlainDate(), t), n = Xt(dt(e), t);
  return Ke(He(s, n), 7);
}
const Qt = W`*,*:before,*:after{box-sizing:border-box}button{padding:0;touch-action:manipulation}`, Vt = W`.vh{position:absolute;transform:scale(0)}`;
function rt(e, t) {
  if (t)
    try {
      return e.from(t);
    } catch {
    }
}
function at(e) {
  const [t, s] = ct(e);
  return [C(() => rt(g, t), [t]), (r) => s(r.toString())];
}
function Ze(e) {
  if (e) {
    const [t, s] = e.split("/"), n = rt(g, t), o = rt(g, s);
    if (n && o)
      return [n, o];
  }
  return [];
}
function Xe(e, t) {
  return `${e}/${t}`;
}
function Ge(e) {
  const [t, s] = ct(e);
  return [C(() => Ze(t), [t]), (r) => s(Xe(r[0], r[1]))];
}
function Qe(e) {
  const [t, s] = ct(e);
  return [C(() => t ? t.split(",").map((r) => g.from(r)) : [], [t]), (r) => s(r.map((a) => a.toString()).join(","))];
}
function _(e, t) {
  return C(
    () => new Intl.DateTimeFormat(t, { timeZone: "UTC", ...e }),
    [t, e]
  );
}
function kt(e, t, s) {
  const n = _(e, s);
  return C(() => {
    const o = [], r = /* @__PURE__ */ new Date();
    for (let a = 0; a < 7; a++) {
      const c = (r.getDay() - t + 7) % 7;
      o[c] = n.format(r), r.setDate(r.getDate() + 1);
    }
    return o;
  }, [t, n]);
}
function Ve(e) {
  let t = "";
  for (const s in e)
    e[s] && (t += ` ${s}`);
  return t;
}
const Mt = (e) => e.target.matches(":dir(ltr)"), tn = { month: "long", day: "numeric" }, en = { month: "long" }, nn = { weekday: "narrow" }, sn = { weekday: "long" }, Q = { bubbles: !0 };
function on({ props: e, context: t }) {
  const { offset: s } = e, { firstDayOfWeek: n, isDateDisallowed: o, min: r, max: a, dateWindow: c, locale: u } = t, f = ut(), l = kt(sn, n, u), h = kt(nn, n, u), i = _(tn, u), d = _(en, u), { focusedDate: p } = c, D = C(
    () => c.start.add({ months: s }),
    [c, s]
  ), m = C(
    () => Je(D, n),
    [D, n]
  ), w = S("focusday", Q), A = S("selectday", Q), te = S("hoverday", Q);
  function gt(b) {
    w(B(b, r, a));
  }
  function ee(b) {
    let E;
    switch (b.key) {
      case "ArrowRight":
        E = p.add({ days: Mt(b) ? 1 : -1 });
        break;
      case "ArrowLeft":
        E = p.add({ days: Mt(b) ? -1 : 1 });
        break;
      case "ArrowDown":
        E = p.add({ days: 7 });
        break;
      case "ArrowUp":
        E = p.add({ days: -7 });
        break;
      case "PageUp":
        E = p.add(b.shiftKey ? { years: -1 } : { months: -1 });
        break;
      case "PageDown":
        E = p.add(b.shiftKey ? { years: 1 } : { months: 1 });
        break;
      case "Home":
        E = ft(p, n);
        break;
      case "End":
        E = Xt(p, n);
        break;
      default:
        return;
    }
    gt(E), b.preventDefault();
  }
  function ne(b) {
    const E = D.equals(b), se = b.equals(p), Dt = b.equals(f), wt = b.toDate(), j = o?.(wt), z = !ot(b, r, a);
    let P = !1, Et = !1, H = !1, K = !1;
    if ("highlightedRange" in t) {
      const [R, J] = t.highlightedRange;
      Et = !0, H = R?.equals(b) ?? !1, K = J?.equals(b) ?? !1, P = R && J ? ot(b, R, J) : !1;
    } else
      "selectedDates" in t ? P = t.selectedDates?.some((R) => R.equals(b)) ?? !1 : "value" in t && (P = t.value?.equals(b) ?? !1);
    return {
      part: Ve({
        button: !0,
        day: !0,
        selected: E && P,
        today: Dt,
        disallowed: j,
        disabled: z,
        outside: !E,
        "range-start": H,
        "range-end": K,
        "range-inner": Et && P && !H && !K
      }),
      tabindex: E && se ? 0 : -1,
      disabled: z,
      "aria-disabled": j ? "true" : void 0,
      "aria-pressed": E && P,
      "aria-current": Dt ? "date" : void 0,
      "aria-label": i.format(wt),
      onkeydown: ee,
      onclick() {
        !j && !t.readonly && A(b), gt(b);
      },
      onmouseover() {
        !j && !z && te(b);
      }
    };
  }
  return {
    weeks: m,
    yearMonth: D,
    dayNamesLong: l,
    dayNamesShort: h,
    monthFormatter: d,
    getDayProps: ne
  };
}
class T {
  constructor(t, s, n) {
    this.start = t, this.duration = s, this.focusedDate = n, this.end = t.add({ months: s.months - 1 });
  }
  end;
  contains(t) {
    return k.compare(t, this.start) >= 0 && k.compare(t, this.end) <= 0;
  }
  adjust(t) {
    const { start: s, duration: n } = this, o = k.compare(s, t) > 0;
    let r = new T(s, n, t);
    for (; !r.contains(t); )
      r = new T(
        o ? r.start.subtract(n) : r.start.add(n),
        n,
        t
      );
    return r;
  }
  next() {
    return new T(
      this.start.add(this.duration),
      this.duration,
      this.focusedDate.add(this.duration)
    );
  }
  prev() {
    return new T(
      this.start.subtract(this.duration),
      this.duration,
      this.focusedDate.subtract(this.duration)
    );
  }
}
const Ot = ut(), ht = $e({
  firstDayOfWeek: 0,
  isDateDisallowed: () => !1,
  dateWindow: new T(Ot.toPlainYearMonth(), { months: 1 }, Ot)
});
customElements.define("calendar-month-ctx", ht);
const rn = x(
  (e) => {
    const t = xe(ht), s = ie(), n = on({ props: e, context: t });
    function o() {
      s.current.querySelector("button[tabindex='0']")?.focus();
    }
    return /* @__PURE__ */ N("host", { shadowDom: !0, focus: o, children: [
      /* @__PURE__ */ y("div", { id: "heading", part: "heading", children: n.monthFormatter.format(n.yearMonth.toDate()) }),
      /* @__PURE__ */ N("table", { ref: s, "aria-labelledby": "heading", part: "table", children: [
        /* @__PURE__ */ y("thead", { children: /* @__PURE__ */ N("tr", { part: "tr head", children: [
          t.showWeekNumbers && /* @__PURE__ */ y("th", { part: "th", scope: "col", children: /* @__PURE__ */ y("span", { class: "vh", "aria-hidden": "true" }) }),
          n.dayNamesLong.map((r, a) => /* @__PURE__ */ N("th", { part: "th", scope: "col", children: [
            /* @__PURE__ */ y("span", { class: "vh", children: r }),
            /* @__PURE__ */ y("span", { "aria-hidden": "true", children: n.dayNamesShort[a] })
          ] }))
        ] }) }),
        /* @__PURE__ */ y("tbody", { children: n.weeks.map((r, a) => /* @__PURE__ */ N("tr", { part: "tr week", children: [
          t.showWeekNumbers && r[0] && /* @__PURE__ */ y("td", { class: "weeknumber", part: "td weeknumber", children: t.formatWeekNumbers ? t.formatWeekNumbers(ze(r[0])) : r[0] }),
          r.map((c, u) => {
            const f = n.yearMonth.equals(c), l = t.showOutsideDays || f;
            return /* @__PURE__ */ y("td", { part: "td", children: l && /* @__PURE__ */ y("button", { ...n.getDayProps(c), children: c.day }) }, u);
          })
        ] }, a)) })
      ] })
    ] });
  },
  {
    props: {
      offset: {
        type: Number,
        value: 0
      }
    },
    styles: [
      Qt,
      Vt,
      W`:host{--color-accent: black;--color-text-on-accent: white;display:flex;flex-direction:column;gap:.25rem;text-align:center;inline-size:fit-content}table{border-collapse:collapse;border-spacing:0;table-layout:fixed;inline-size:max-content;font-size:.875rem}th{font-weight:700;block-size:2.25rem;min-width:36px}td{padding-inline:0;padding-block:1px;min-width:36px}td.weeknumber{font-size:.875em}button{color:inherit;font-size:inherit;background:transparent;border:0;cursor:pointer;font-variant-numeric:tabular-nums;block-size:2.25rem;inline-size:2.25rem}button:hover:where(:not(:disabled)){background:#0000000d}button:is([aria-pressed=true],:focus-visible){background:var(--color-accent);color:var(--color-text-on-accent)}button:focus-visible{outline:1px solid var(--color-text-on-accent);outline-offset:-2px}button:disabled,:host::part(outside),:host::part(disallowed){cursor:default;opacity:.5}:host::part(disallowed){text-decoration:line-through}`
    ]
  }
);
customElements.define("calendar-month", rn);
function mt(e) {
  const t = e.dateWindow.start.toDate(), s = e.dateWindow.end.toDate();
  return /* @__PURE__ */ N("div", { role: "group", "aria-labelledby": "label", part: "container", children: [
    /* @__PURE__ */ y("div", { id: "label", class: "vh", "aria-live": "polite", "aria-atomic": "true", children: e.formatVerbose.formatRange(t, s) }),
    /* @__PURE__ */ N("div", { class: "header", part: "header", children: [
      e.disableNavigation ? null : /* @__PURE__ */ y(
        "button",
        {
          part: `button previous ${e.previous ? "" : "disabled"}`,
          onclick: e.previous,
          "aria-disabled": e.previous ? null : "true",
          children: /* @__PURE__ */ y("slot", { name: "previous", children: "Previous" })
        }
      ),
      /* @__PURE__ */ y("div", { id: "heading", part: "heading", "aria-hidden": "true", children: e.format.formatRange(t, s) }),
      e.disableNavigation ? null : /* @__PURE__ */ y(
        "button",
        {
          part: `button next ${e.next ? "" : "disabled"}`,
          onclick: e.next,
          "aria-disabled": e.next ? null : "true",
          children: /* @__PURE__ */ y("slot", { name: "next", children: "Next" })
        }
      )
    ] }),
    /* @__PURE__ */ y(
      ht,
      {
        value: e,
        onselectday: e.onSelect,
        onfocusday: e.onFocus,
        onhoverday: e.onHover,
        children: /* @__PURE__ */ y("slot", {})
      }
    )
  ] });
}
const yt = {
  value: {
    type: String,
    value: ""
  },
  readonly: {
    type: Boolean,
    value: () => !1
  },
  min: {
    type: String,
    value: ""
  },
  max: {
    type: String,
    value: ""
  },
  isDateDisallowed: {
    type: Function,
    value: (e) => !1
  },
  firstDayOfWeek: {
    type: Number,
    value: () => 1
  },
  showOutsideDays: {
    type: Boolean,
    value: () => !1
  },
  showWeekNumbers: {
    type: Boolean,
    value: () => !1
  },
  formatWeekNumbers: {
    type: Function,
    value: (e) => `W${e}`
  },
  locale: {
    type: String,
    value: () => {
    }
  },
  months: {
    type: Number,
    value: 1
  },
  disableNavigation: {
    type: Boolean,
    value: () => !1
  }
}, pt = [
  Qt,
  Vt,
  W`:host{display:block;inline-size:fit-content}[role=group]{display:flex;flex-direction:column;gap:1em}.header{display:flex;align-items:center;justify-content:space-between}#heading{font-weight:700;font-size:1.25em;margin:auto}button{cursor:pointer;user-select:none;display:flex;align-items:center;justify-content:center}button[aria-disabled]{cursor:default;opacity:.4}`
], an = { year: "numeric" }, cn = { year: "numeric", month: "long" };
function bt({ months: e, locale: t }) {
  const [s] = at("min"), [n] = at("max"), o = S("focusday"), r = S("change"), [a, c] = it(() => {
    const m = ut(), w = e === 12 ? new k(m.year, 1) : m.toPlainYearMonth();
    return new T(w, { months: e }, m);
  });
  function u(m) {
    c(m), o(m.focusedDate.toDate());
  }
  function f(m) {
    c(a.adjust(m));
  }
  const l = L();
  function h() {
    l.current.querySelectorAll("calendar-month").forEach((m) => m.focus());
  }
  const i = _(an, t), d = _(cn, t), p = n == null || !a.contains(n), D = s == null || !a.contains(s);
  return {
    format: i,
    formatVerbose: d,
    dateWindow: a,
    dispatch: r,
    handleFocus(m) {
      m.stopPropagation(), f(m.detail), o(m.detail.toDate()), setTimeout(h);
    },
    setFocusedDate: f,
    min: s,
    max: n,
    next: p ? () => u(a.next()) : void 0,
    previous: D ? () => u(a.prev()) : void 0,
    focus: h
  };
}
const ln = x(
  (e) => {
    const [t, s] = at("value"), n = bt(e);
    $(() => {
      t && n.setFocusedDate(t);
    }, [t]);
    function o(r) {
      s(r.detail), n.dispatch();
    }
    return /* @__PURE__ */ y("host", { shadowDom: !0, focus: n.focus, children: /* @__PURE__ */ y(
      mt,
      {
        ...e,
        ...n,
        value: t,
        onFocus: n.handleFocus,
        onSelect: o
      }
    ) });
  },
  { props: yt, styles: pt }
);
customElements.define("calendar-date", ln);
const Ft = (e, t) => g.compare(e, t) < 0 ? [e, t] : [t, e], un = x(
  (e) => {
    const [t, s] = Ge("value"), n = bt(e), o = S("rangestart"), r = S("rangeend"), [a, c] = it();
    $(() => {
      t.length && !ot(n.dateWindow.focusedDate, t[0], t[1]) && n.setFocusedDate(t[1]);
    }, [t]);
    async function u(i) {
      n.handleFocus(i), f(i);
    }
    function f(i) {
      i.stopPropagation(), c((d) => d && { ...d, second: i.detail });
    }
    function l(i) {
      const d = i.detail;
      i.stopPropagation(), a ? (s(Ft(a.first, d)), c(void 0), r(d.toDate()), n.dispatch()) : (c({ first: d, second: d }), o(d.toDate()));
    }
    const h = a ? Ft(a.first, a.second) : t;
    return /* @__PURE__ */ y("host", { shadowDom: !0, focus: n.focus, children: /* @__PURE__ */ y(
      mt,
      {
        ...e,
        ...n,
        highlightedRange: h,
        onFocus: u,
        onHover: f,
        onSelect: l
      }
    ) });
  },
  { props: yt, styles: pt }
);
customElements.define("calendar-range", un);
const fn = x(
  (e) => {
    const [t, s] = Qe("value"), n = bt(e);
    function o(r) {
      const a = r.detail;
      if (t?.some((c) => c.equals(a)))
        s(t.filter((c) => !c.equals(a)));
      else {
        const c = [...t || [], a];
        c.sort(g.compare), s(c);
      }
      n.dispatch();
    }
    return $(() => {
      if (t.length) {
        const r = t[t.length - 1];
        n.setFocusedDate(r);
      }
    }, []), /* @__PURE__ */ y("host", { shadowDom: !0, focus: n.focus, children: /* @__PURE__ */ y(
      mt,
      {
        ...e,
        ...n,
        selectedDates: t,
        onFocus: n.handleFocus,
        onSelect: o
      }
    ) });
  },
  { props: yt, styles: pt }
);
customElements.define("calendar-date-multiple", fn);
export {
  ln as CalendarDate,
  fn as CalendarDateMultiple,
  rn as CalendarMonth,
  un as CalendarRange,
  g as PlainDate
};
