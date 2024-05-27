class te {
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
    this.#t != t && (this.#t = t, this.#e.forEach((n) => n(t)));
  }
  /**
   * @type {import("hooks").Ref["on"]}
   */
  on(t) {
    return this.#e.add(t), () => this.#e.delete(t);
  }
}
const Ft = (e) => new te(e), tt = Symbol.for("atomico.hooks");
globalThis[tt] = globalThis[tt] || {};
let M = globalThis[tt];
const ee = Symbol.for("Atomico.suspense"), It = Symbol.for("Atomico.effect"), ne = Symbol.for("Atomico.layoutEffect"), Rt = Symbol.for("Atomico.insertionEffect"), A = (e, t, n) => {
  const { i: s, hooks: r } = M.c, o = r[s] = r[s] || {};
  return o.value = e(o.value), o.effect = t, o.tag = n, M.c.i++, r[s].value;
}, se = (e) => A((t = Ft(e)) => t), L = () => A((e = Ft(M.c.host)) => e), $t = () => M.c.update, oe = (e, t, n = 0) => {
  let s = {}, r = !1;
  const o = () => r, a = (c, u) => {
    for (const d in s) {
      const l = s[d];
      l.effect && l.tag === c && (l.value = l.effect(l.value, u));
    }
  };
  return { load: (c) => {
    M.c = { host: t, hooks: s, update: e, i: 0, id: n };
    let u;
    try {
      r = !1, u = c();
    } catch (d) {
      if (d !== ee)
        throw d;
      r = !0;
    } finally {
      M.c = null;
    }
    return u;
  }, cleanEffects: (c) => (a(Rt, c), () => (a(ne, c), () => {
    a(It, c);
  })), isSuspense: o };
}, F = Symbol.for, re = queueMicrotask;
function Ut(e, t) {
  const n = e.length;
  if (n !== t.length)
    return !1;
  for (let s = 0; s < n; s++) {
    let r = e[s], o = t[s];
    if (r !== o)
      return !1;
  }
  return !0;
}
const N = (e) => typeof e == "function", R = (e) => typeof e == "object", { isArray: ae } = Array, et = (e, t) => (t ? e instanceof HTMLStyleElement : !0) && "hydrate" in (e?.dataset || {});
function Lt(e, t) {
  let n;
  const s = (r) => {
    let { length: o } = r;
    for (let a = 0; a < o; a++) {
      const f = r[a];
      if (f && Array.isArray(f))
        s(f);
      else {
        const i = typeof f;
        if (f == null || i === "function" || i === "boolean")
          continue;
        i === "string" || i === "number" ? (n == null && (n = ""), n += f) : (n != null && (t(n), n = null), t(f));
      }
    }
  };
  s(e), n != null && t(n);
}
const _t = (e, t, n) => (e.addEventListener(t, n), () => e.removeEventListener(t, n));
class jt {
  /**
   *
   * @param {HTMLElement} target
   * @param {string} message
   * @param {string} value
   */
  constructor(t, n, s) {
    this.message = n, this.target = t, this.value = s;
  }
}
class xt extends jt {
}
class ie extends jt {
}
const B = "Custom", ce = null, le = { true: 1, "": 1, 1: 1 };
function ue(e, t, n, s, r) {
  const {
    type: o,
    reflect: a,
    event: f,
    value: i,
    attr: c = fe(t)
  } = n?.name != B && R(n) && n != ce ? n : { type: n }, u = o?.name === B && o.map, d = i != null ? o == Function || !N(i) ? () => i : i : null;
  Object.defineProperty(e, t, {
    configurable: !0,
    /**
     * @this {import("dom").AtomicoThisInternal}
     * @param {any} newValue
     */
    set(l) {
      const m = this[t];
      d && o != Boolean && l == null && (l = d());
      const { error: p, value: y } = (u ? me : ye)(
        o,
        l
      );
      if (p && y != null)
        throw new xt(
          this,
          `The value defined for prop '${t}' must be of type '${o.name}'`,
          y
        );
      m != y && (this._props[t] = y ?? void 0, this.update(), f && Bt(this, f), this.updated.then(() => {
        a && (this._ignoreAttr = c, de(this, o, c, this[t]), this._ignoreAttr = null);
      }));
    },
    /**
     * @this {import("dom").AtomicoThisInternal}
     */
    get() {
      return this._props[t];
    }
  }), d && (r[t] = d()), s[c] = { prop: t, type: o };
}
const Bt = (e, { type: t, base: n = CustomEvent, ...s }) => e.dispatchEvent(new n(t, s)), fe = (e) => e.replace(/([A-Z])/g, "-$1").toLowerCase(), de = (e, t, n, s) => s == null || t == Boolean && !s ? e.removeAttribute(n) : e.setAttribute(
  n,
  t?.name === B && t?.serialize ? t?.serialize(s) : R(s) ? JSON.stringify(s) : t == Boolean ? "" : s
), he = (e, t) => e == Boolean ? !!le[t] : e == Number ? Number(t) : e == String ? t : e == Array || e == Object ? JSON.parse(t) : e.name == B ? t : (
  // TODO: If when defining reflect the prop can also be of type string?
  new e(t)
), me = ({ map: e }, t) => {
  try {
    return { value: e(t), error: !1 };
  } catch {
    return { value: t, error: !0 };
  }
}, ye = (e, t) => e == null || t == null ? { value: t, error: !1 } : e != String && t === "" ? { value: void 0, error: !1 } : e == Object || e == Array || e == Symbol ? {
  value: t,
  error: {}.toString.call(t) !== `[object ${e.name}]`
} : t instanceof e ? {
  value: t,
  error: e == Number && Number.isNaN(t.valueOf())
} : e == String || e == Number || e == Boolean ? {
  value: t,
  error: e == Number ? typeof t != "number" ? !0 : Number.isNaN(t) : e == String ? typeof t != "string" : typeof t != "boolean"
} : { value: t, error: !0 };
let pe = 0;
const be = (e) => {
  const t = (e?.dataset || {})?.hydrate || "";
  return t || "c" + pe++;
}, _ = (e, t = HTMLElement) => {
  const n = {}, s = {}, r = "prototype" in t && t.prototype instanceof Element, o = r ? t : "base" in t ? t.base : HTMLElement, { props: a, styles: f } = r ? e : t;
  class i extends o {
    constructor() {
      super(), this._setup(), this._render = () => e({ ...this._props });
      for (const u in s)
        this[u] = s[u];
    }
    /**
     * @returns {import("core").Sheets[]}
     */
    static get styles() {
      return [super.styles, f];
    }
    async _setup() {
      if (this._props)
        return;
      this._props = {};
      let u, d;
      this.mounted = new Promise(
        (D) => this.mount = () => {
          D(), u != this.parentNode && (d != u ? this.unmounted.then(this.update) : this.update()), u = this.parentNode;
        }
      ), this.unmounted = new Promise(
        (D) => this.unmount = () => {
          D(), (u != this.parentNode || !this.isConnected) && (l.cleanEffects(!0)()(), d = this.parentNode, u = null);
        }
      ), this.symbolId = this.symbolId || Symbol(), this.symbolIdParent = Symbol();
      const l = oe(
        () => this.update(),
        this,
        be(this)
      );
      let m, p = !0;
      const y = et(this);
      this.update = () => (m || (m = !0, this.updated = (this.updated || this.mounted).then(() => {
        try {
          const D = l.load(this._render), h = l.cleanEffects();
          return D && //@ts-ignore
          D.render(this, this.symbolId, y), m = !1, p && !l.isSuspense() && (p = !1, !y && ge(this)), h();
        } finally {
          m = !1;
        }
      }).then(
        /**
         * @param {import("internal/hooks.js").CleanUseEffects} [cleanUseEffect]
         */
        (D) => {
          D && D();
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
    attributeChangedCallback(u, d, l) {
      if (n[u]) {
        if (u === this._ignoreAttr || d === l)
          return;
        const { prop: m, type: p } = n[u];
        try {
          this[m] = he(p, l);
        } catch {
          throw new ie(
            this,
            `The value defined as attr '${u}' cannot be parsed by type '${p.name}'`,
            l
          );
        }
      } else
        super.attributeChangedCallback(u, d, l);
    }
    static get props() {
      return { ...super.props, ...a };
    }
    static get observedAttributes() {
      const u = super.observedAttributes || [];
      for (const d in a)
        ue(this.prototype, d, a[d], n, s);
      return Object.keys(n).concat(u);
    }
  }
  return i;
};
function ge(e) {
  const { styles: t } = e.constructor, { shadowRoot: n } = e;
  if (n && t.length) {
    const s = [];
    Lt(t, (r) => {
      r && (r instanceof Element ? n.appendChild(r.cloneNode(!0)) : s.push(r));
    }), s.length && (n.adoptedStyleSheets = s);
  }
}
const qt = (e) => (t, n) => {
  A(
    /**
     * Clean the effect hook
     * @type {import("internal/hooks.js").CollectorEffect}
     */
    ([s, r] = []) => ((r || !r) && (r && Ut(r, n) ? s = s || !0 : (N(s) && s(), s = null)), [s, n]),
    /**
     * @returns {any}
     */
    ([s, r], o) => o ? (N(s) && s(), []) : [s || t(), r],
    e
  );
}, rt = qt(It), De = qt(Rt);
class Yt extends Array {
  /**
   *
   * @param {any} initialState
   * @param {(nextState: any, state:any[], mount: boolean )=>void} mapState
   */
  constructor(t, n) {
    let s = !0;
    const r = (o) => {
      try {
        n(o, this, s);
      } finally {
        s = !1;
      }
    };
    super(void 0, r, n), r(t);
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
const at = (e) => {
  const t = $t();
  return A(
    (n = new Yt(e, (s, r, o) => {
      s = N(s) ? s(r[0]) : s, s !== r[0] && (r[0] = s, o || t());
    })) => n
  );
}, T = (e, t) => {
  const [n] = A(([s, r, o = 0] = []) => ((!r || r && !Ut(r, t)) && (s = e()), [s, t, o]));
  return n;
}, it = (e) => {
  const { current: t } = L();
  if (!(e in t))
    throw new xt(
      t,
      `For useProp("${e}"), the prop does not exist on the host.`,
      e
    );
  return A(
    (n = new Yt(t[e], (s, r) => {
      s = N(s) ? s(t[e]) : s, t[e] = s;
    })) => (n[0] = t[e], n)
  );
}, C = (e, t = {}) => {
  const n = L();
  return n[e] || (n[e] = (s = t.detail) => Bt(n.current, {
    type: e,
    ...t,
    detail: s
  })), n[e];
}, nt = F("atomico/options");
globalThis[nt] = globalThis[nt] || {
  sheet: !!document.adoptedStyleSheets
};
const ct = globalThis[nt], Ee = {
  checked: 1,
  value: 1,
  selected: 1
}, we = {
  list: 1,
  type: 1,
  size: 1,
  form: 1,
  width: 1,
  height: 1,
  src: 1,
  href: 1,
  slot: 1
}, ve = {
  shadowDom: 1,
  staticNode: 1,
  cloneNode: 1,
  children: 1,
  key: 1
}, x = {}, st = [];
class ot extends Text {
}
const Se = F("atomico/id"), $ = F("atomico/type"), Z = F("atomico/ref"), zt = F("atomico/vnode"), Ne = () => {
};
function Ce(e, t, n) {
  return Ht(this, e, t, n);
}
const Wt = (e, t, ...n) => {
  const s = t || x;
  let { children: r } = s;
  if (r = r ?? (n.length ? n : st), e === Ne)
    return r;
  const o = e ? e instanceof Node ? 1 : (
    //@ts-ignore
    e.prototype instanceof HTMLElement && 2
  ) : 0;
  if (o === !1 && e instanceof Function)
    return e(
      r != st ? { children: r, ...s } : s
    );
  const a = ct.render || Ce;
  return {
    [$]: zt,
    type: e,
    props: s,
    children: r,
    key: s.key,
    // key for lists by keys
    // define if the node declares its shadowDom
    shadow: s.shadowDom,
    // allows renderings to run only once
    static: s.staticNode,
    // defines whether the type is a childNode `1` or a constructor `2`
    raw: o,
    // defines whether to use the second parameter for document.createElement
    is: s.is,
    // clone the node if it comes from a reference
    clone: s.cloneNode,
    render: a
  };
};
function Ht(e, t, n = Se, s, r) {
  let o;
  if (t && t[n] && t[n].vnode == e || e[$] != zt)
    return t;
  (e || !t) && (r = r || e.type == "svg", o = e.type != "host" && (e.raw == 1 ? (t && e.clone ? t[Z] : t) != e.type : e.raw == 2 ? !(t instanceof e.type) : t ? t[Z] || t.localName != e.type : !t), o && e.type != null && (e.raw == 1 && e.clone ? (s = !0, t = e.type.cloneNode(!0), t[Z] = e.type) : t = e.raw == 1 ? e.type : e.raw == 2 ? new e.type() : r ? document.createElementNS(
    "http://www.w3.org/2000/svg",
    e.type
  ) : document.createElement(
    e.type,
    e.is ? { is: e.is } : void 0
  )));
  const a = t[n] ? t[n] : x, { vnode: f = x, cycle: i = 0 } = a;
  let { fragment: c, handlers: u } = a;
  const { children: d = st, props: l = x } = f;
  if (u = o ? {} : u || {}, e.static && !o)
    return t;
  if (e.shadow && !t.shadowRoot && // @ts-ignore
  t.attachShadow({ mode: "open", ...e.shadow }), e.props != l && ke(t, l, e.props, u, r), e.children !== d) {
    const m = e.shadow ? t.shadowRoot : t;
    c = Pe(
      e.children,
      /**
       * @todo for hydration use attribute and send childNodes
       */
      c,
      m,
      n,
      // add support to foreignObject, children will escape from svg
      !i && s,
      r && e.type == "foreignObject" ? !1 : r
    );
  }
  return t[n] = { vnode: e, handlers: u, fragment: c, cycle: i + 1 }, t;
}
function Te(e, t) {
  const n = new ot(""), s = new ot("");
  let r;
  if (e[t ? "prepend" : "append"](n), t) {
    let { lastElementChild: o } = e;
    for (; o; ) {
      const { previousElementSibling: a } = o;
      if (et(o, !0) && !et(a, !0)) {
        r = o;
        break;
      }
      o = a;
    }
  }
  return r ? r.before(s) : e.append(s), {
    markStart: n,
    markEnd: s
  };
}
function Pe(e, t, n, s, r, o) {
  e = e == null ? null : ae(e) ? e : [e];
  const a = t || Te(n, r), { markStart: f, markEnd: i, keyes: c } = a;
  let u;
  const d = c && /* @__PURE__ */ new Set();
  let l = f;
  if (e && Lt(e, (m) => {
    if (typeof m == "object" && !m[$])
      return;
    const p = m[$] && m.key, y = c && p != null && c.get(p);
    l != i && l === y ? d.delete(l) : l = l == i ? i : l.nextSibling;
    const D = c ? y : l;
    let h = D;
    if (m[$])
      h = Ht(m, D, s, r, o);
    else {
      const S = m + "";
      !(h instanceof Text) || h instanceof ot ? h = new Text(S) : h.data != S && (h.data = S);
    }
    h != l && (c && d.delete(h), !D || c ? (n.insertBefore(h, l), c && l != i && d.add(l)) : D == i ? n.insertBefore(h, i) : (n.replaceChild(h, D), l = h)), p != null && (u = u || /* @__PURE__ */ new Map(), u.set(p, h));
  }), l = l == i ? i : l.nextSibling, t && l != i)
    for (; l != i; ) {
      const m = l;
      l = l.nextSibling, m.remove();
    }
  return d && d.forEach((m) => m.remove()), a.keyes = u, a;
}
function ke(e, t, n, s, r) {
  for (const o in t)
    !(o in n) && vt(e, o, t[o], null, r, s);
  for (const o in n)
    vt(e, o, t[o], n[o], r, s);
}
function vt(e, t, n, s, r, o) {
  if (t = t == "class" && !r ? "className" : t, n = n ?? null, s = s ?? null, t in e && Ee[t] && (n = e[t]), !(s === n || ve[t] || t[0] == "_"))
    if (e.localName === "slot" && t === "assignNode" && "assign" in e)
      re(() => e.assign(s));
    else if (t[0] == "o" && t[1] == "n" && (N(s) || N(n)))
      Me(e, t.slice(2), s, o);
    else if (t == "ref")
      s && (N(s) ? s(e) : s.current = e);
    else if (t == "style") {
      const { style: a } = e;
      n = n || "", s = s || "";
      const f = R(n), i = R(s);
      if (f)
        for (const c in n)
          if (i)
            !(c in s) && St(a, c, null);
          else
            break;
      if (i)
        for (const c in s) {
          const u = s[c];
          f && n[c] === u || St(a, c, u);
        }
      else
        a.cssText = s;
    } else {
      const a = t[0] == "$" ? t.slice(1) : t;
      a === t && (!r && !we[t] && t in e || N(s) || N(n)) ? e[t] = s ?? "" : s == null ? e.removeAttribute(a) : e.setAttribute(
        a,
        R(s) ? JSON.stringify(s) : s
      );
    }
}
function Me(e, t, n, s) {
  if (s.handleEvent || (s.handleEvent = (r) => s[r.type].call(e, r)), n) {
    if (!s[t]) {
      const r = n.capture || n.once || n.passive ? Object.assign({}, n) : null;
      e.addEventListener(t, s, r);
    }
    s[t] = n;
  } else
    s[t] && (e.removeEventListener(t, s), delete s[t]);
}
function St(e, t, n) {
  let s = "setProperty";
  n == null && (s = "removeProperty", n = null), ~t.indexOf("-") ? e[s](t, n) : e[t] = n;
}
const Nt = {};
function Y(e, ...t) {
  const n = (e.raw || e).reduce(
    (s, r, o) => s + r + (t[o] || ""),
    ""
  );
  return Nt[n] = Nt[n] || Oe(n);
}
function Oe(e) {
  if (ct.sheet) {
    const t = new CSSStyleSheet();
    return t.replaceSync(e), t;
  } else {
    const t = document.createElement("style");
    return t.textContent = e, t;
  }
}
const Ae = Wt("host", { style: "display: contents" }), X = F("atomico/context"), Fe = (e, t) => {
  const n = L();
  De(
    () => _t(
      n.current,
      "ConnectContext",
      /**
       * @param {CustomEvent<import("context").DetailConnectContext>} event
       */
      (s) => {
        e === s.detail.id && (s.stopPropagation(), s.detail.connect(t));
      }
    ),
    [e]
  );
}, Ie = (e) => {
  const t = C("ConnectContext", {
    bubbles: !0,
    composed: !0
  }), n = () => {
    if (ct.ssr)
      return;
    let o;
    return t({
      id: e,
      connect(a) {
        o = a;
      }
    }), o;
  }, [s, r] = at(
    n
  );
  return rt(() => {
    s || (e[X] || (e[X] = customElements.whenDefined(
      new e().localName
    )), e[X].then(
      () => r(n)
    ));
  }, [e]), s;
}, Re = (e) => {
  const t = Ie(e), n = $t();
  return rt(() => {
    if (t)
      return _t(t, "UpdatedValue", n);
  }, [t]), (t || e).value;
}, $e = (e) => {
  const t = _(
    () => (Fe(t, L().current), Ae),
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
}, b = (e, t, n) => (t == null ? t = { key: n } : t.key = n, Wt(e, t)), P = b, Kt = Y`*,*:before,*:after{box-sizing:border-box}button{padding:0;touch-action:manipulation;cursor:pointer;user-select:none}`, Jt = Y`.vh{position:absolute;transform:scale(0)}`;
function lt() {
  return E.from(/* @__PURE__ */ new Date());
}
function ut(e, t = 0) {
  const n = v(e), s = n.getUTCDay(), r = (s < t ? 7 : 0) + s - t;
  return n.setUTCDate(n.getUTCDate() - r), E.from(n);
}
function Ue(e) {
  const n = v(e), r = (n.getUTCDay() + 6) % 7;
  n.setDate(n.getDate() - r + 3);
  const o = n.valueOf();
  return n.setMonth(0, 1), n.getDay() !== 4 && n.setMonth(0, 1 + (4 - n.getDay() + 7) % 7), 1 + Math.ceil((o - n.valueOf()) / 6048e5);
}
function Zt(e, t = 0) {
  return ut(e, t).add({ days: 6 });
}
function Xt(e) {
  return E.from(new Date(Date.UTC(e.year, e.month, 0)));
}
function z(e, t, n) {
  return t && E.compare(e, t) < 0 ? t : n && E.compare(e, n) > 0 ? n : e;
}
const Le = { days: 1 };
function _e(e, t = 0) {
  let n = ut(e.toPlainDate(), t);
  const s = Zt(Xt(e), t), r = [];
  for (; E.compare(n, s) < 0; ) {
    const o = [];
    for (let a = 0; a < 7; a++)
      o.push(n), n = n.add(Le);
    r.push(o);
  }
  return r;
}
function v(e) {
  return new Date(Date.UTC(e.year, e.month - 1, e.day ?? 1));
}
const je = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[0-1])$/, G = (e, t) => e.toString().padStart(t, "0");
class E {
  constructor(t, n, s) {
    this.year = t, this.month = n, this.day = s;
  }
  // this is an incomplete implementation that only handles arithmetic on a single unit at a time.
  // i didn't want to get into more complex arithmetic since it gets tricky fast
  // this is enough to serve my needs and will still be a drop-in replacement when actual Temporal API lands
  add(t) {
    const n = v(this);
    if ("days" in t)
      return n.setUTCDate(this.day + t.days), E.from(n);
    let { year: s, month: r } = this;
    "months" in t ? (r = this.month + t.months, n.setUTCMonth(r - 1)) : (s = this.year + t.years, n.setUTCFullYear(s));
    const o = E.from(v({ year: s, month: r, day: 1 }));
    return z(E.from(n), o, Xt(o));
  }
  toString() {
    return `${G(this.year, 4)}-${G(this.month, 2)}-${G(this.day, 2)}`;
  }
  toPlainYearMonth() {
    return new W(this.year, this.month);
  }
  equals(t) {
    return E.compare(this, t) === 0;
  }
  static compare(t, n) {
    return t.year < n.year ? -1 : t.year > n.year ? 1 : t.month < n.month ? -1 : t.month > n.month ? 1 : t.day < n.day ? -1 : t.day > n.day ? 1 : 0;
  }
  static from(t) {
    if (typeof t == "string") {
      const n = t.match(je);
      if (!n)
        throw new TypeError(t);
      const [, s, r, o] = n;
      return new E(
        Number.parseInt(s, 10),
        Number.parseInt(r, 10),
        Number.parseInt(o, 10)
      );
    }
    return new E(
      t.getUTCFullYear(),
      t.getUTCMonth() + 1,
      t.getUTCDate()
    );
  }
}
class W {
  constructor(t, n) {
    this.year = t, this.month = n;
  }
  add(t) {
    const n = v(this), s = (t.months ?? 0) + (t.years ?? 0) * 12;
    return n.setUTCMonth(n.getUTCMonth() + s), new W(n.getUTCFullYear(), n.getUTCMonth() + 1);
  }
  equals(t) {
    return this.year === t.year && this.month === t.month;
  }
  toPlainDate() {
    return new E(this.year, this.month, 1);
  }
}
function q(e, t) {
  if (t)
    try {
      return e.from(t);
    } catch {
    }
}
function O(e) {
  const [t, n] = it(e);
  return [T(() => q(E, t), [t]), (o) => n(o.toString())];
}
function xe(e) {
  const [t = "", n] = it(e);
  return [T(() => {
    const [o, a] = t.split("/"), f = q(E, o), i = q(E, a);
    return f && i ? [f, i] : [];
  }, [t]), (o) => n(`${o[0]}/${o[1]}`)];
}
function Be(e) {
  const [t = "", n] = it(e);
  return [T(() => {
    const o = [];
    for (const a of t.trim().split(/\s+/)) {
      const f = q(E, a);
      f && o.push(f);
    }
    return o;
  }, [t]), (o) => n(o.join(" "))];
}
function U(e, t) {
  return T(
    () => new Intl.DateTimeFormat(t, { timeZone: "UTC", ...e }),
    [t, e]
  );
}
function Ct(e, t, n) {
  const s = U(e, n);
  return T(() => {
    const r = [], o = /* @__PURE__ */ new Date();
    for (let a = 0; a < 7; a++) {
      const f = (o.getUTCDay() - t + 7) % 7;
      r[f] = s.format(o), o.setUTCDate(o.getUTCDate() + 1);
    }
    return r;
  }, [t, s]);
}
const Tt = (e, t, n) => z(e, t, n) === e, Pt = (e) => e.target.matches(":dir(ltr)"), qe = { month: "long", day: "numeric" }, Ye = { month: "long" }, ze = { weekday: "narrow" }, We = { weekday: "long" }, Q = { bubbles: !0 };
function He({ props: e, context: t }) {
  const { offset: n } = e, {
    firstDayOfWeek: s,
    isDateDisallowed: r,
    min: o,
    max: a,
    page: f,
    locale: i,
    focusedDate: c
  } = t, u = lt(), d = Ct(We, s, i), l = Ct(ze, s, i), m = U(qe, i), p = U(Ye, i), y = T(
    () => f.start.add({ months: n }),
    [f, n]
  ), D = T(
    () => _e(y, s),
    [y, s]
  ), h = C("focusday", Q), S = C("selectday", Q), H = C("hoverday", Q);
  function pt(g) {
    h(z(g, o, a));
  }
  function Gt(g) {
    let w;
    switch (g.key) {
      case "ArrowRight":
        w = c.add({ days: Pt(g) ? 1 : -1 });
        break;
      case "ArrowLeft":
        w = c.add({ days: Pt(g) ? -1 : 1 });
        break;
      case "ArrowDown":
        w = c.add({ days: 7 });
        break;
      case "ArrowUp":
        w = c.add({ days: -7 });
        break;
      case "PageUp":
        w = c.add(g.shiftKey ? { years: -1 } : { months: -1 });
        break;
      case "PageDown":
        w = c.add(g.shiftKey ? { years: 1 } : { months: 1 });
        break;
      case "Home":
        w = ut(c, s);
        break;
      case "End":
        w = Zt(c, s);
        break;
      default:
        return;
    }
    pt(w), g.preventDefault();
  }
  function Qt(g) {
    const w = y.equals(g);
    if (!t.showOutsideDays && !w)
      return;
    const Vt = g.equals(c), bt = g.equals(u), gt = v(g), j = r?.(gt), K = !Tt(g, o, a);
    let Dt = "", k;
    if (t.type === "range") {
      const [I, J] = t.value, Et = I?.equals(g), wt = J?.equals(g);
      k = I && J && Tt(g, I, J), Dt = `${Et ? "range-start" : ""} ${wt ? "range-end" : ""} ${k && !Et && !wt ? "range-inner" : ""}`;
    } else
      t.type === "multi" ? k = t.value.some((I) => I.equals(g)) : k = t.value?.equals(g);
    return {
      part: `${`button day ${// we don't want outside days to ever be shown as selected
      w ? k ? "selected" : "" : "outside"} ${j ? "disallowed" : ""} ${K ? "disabled" : ""} ${bt ? "today" : ""}`} ${Dt}`,
      tabindex: w && Vt ? 0 : -1,
      disabled: K,
      "aria-disabled": j ? "true" : void 0,
      "aria-pressed": w && k,
      "aria-current": bt ? "date" : void 0,
      "aria-label": m.format(gt),
      onkeydown: Gt,
      onclick() {
        !j && !t.readonly && S(g), pt(g);
      },
      onmouseover() {
        !j && !K && H(g);
      }
    };
  }
  return {
    weeks: D,
    yearMonth: y,
    daysLong: d,
    daysShort: l,
    formatter: p,
    getDayProps: Qt
  };
}
const V = lt(), ft = $e({
  type: "date",
  firstDayOfWeek: 1,
  isDateDisallowed: () => !1,
  focusedDate: V,
  page: { start: V.toPlainYearMonth(), end: V.toPlainYearMonth() }
});
customElements.define("calendar-month-ctx", ft);
const Ke = _(
  (e) => {
    const t = Re(ft), n = se(), s = He({ props: e, context: t });
    function r() {
      n.current.querySelector("button[tabindex='0']")?.focus();
    }
    return /* @__PURE__ */ P("host", { shadowDom: !0, focus: r, children: [
      /* @__PURE__ */ b("div", { id: "h", part: "heading", children: s.formatter.format(v(s.yearMonth)) }),
      /* @__PURE__ */ P("table", { ref: n, "aria-labelledby": "h", part: "table", children: [
        /* @__PURE__ */ b("thead", { children: /* @__PURE__ */ P("tr", { part: "tr head", children: [
          t.showWeekNumbers && /* @__PURE__ */ b("th", { part: "th", scope: "col", children: /* @__PURE__ */ b("span", { class: "vh", "aria-hidden": "true" }) }),
          s.daysLong.map((o, a) => /* @__PURE__ */ P("th", { part: "th", scope: "col", children: [
            /* @__PURE__ */ b("span", { class: "vh", children: o }),
            /* @__PURE__ */ b("span", { "aria-hidden": "true", children: s.daysShort[a] })
          ] }))
        ] }) }),
        /* @__PURE__ */ b("tbody", { children: s.weeks.map((o, a) => /* @__PURE__ */ P("tr", { part: "tr week", children: [
          t.showWeekNumbers && o[0] && /* @__PURE__ */ b("td", { class: "weeknumber", part: "td weeknumber", children: t.formatWeekNumbers ? t.formatWeekNumbers(Ue(o[0])) : o[0] }),
          o.map((f, i) => {
            const c = s.yearMonth.equals(f), u = t.showOutsideDays || c;
            return /* @__PURE__ */ b("td", { part: "td", children: u && /* @__PURE__ */ b("button", { ...s.getDayProps(f), children: f.day }) }, i);
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
      Kt,
      Jt,
      Y`:host{--color-accent: black;--color-text-on-accent: white;display:flex;flex-direction:column;gap:.25rem;text-align:center;inline-size:fit-content}table{border-collapse:collapse;border-spacing:0;table-layout:fixed;inline-size:max-content;font-size:.875rem}th{font-weight:700;block-size:2.25rem;min-width:36px}td{padding-inline:0;padding-block:1px;min-width:36px}td.weeknumber{font-size:.875em}button{color:inherit;font-size:inherit;background:transparent;border:0;cursor:pointer;font-variant-numeric:tabular-nums;block-size:2.25rem;inline-size:2.25rem}button:hover:where(:not(:disabled,[aria-disabled])){background:#0000000d}button:is([aria-pressed=true],:focus-visible){background:var(--color-accent);color:var(--color-text-on-accent)}button:focus-visible{outline:1px solid var(--color-text-on-accent);outline-offset:-2px}button:disabled,:host::part(outside),:host::part(disallowed){cursor:default;opacity:.5}:host::part(disallowed){text-decoration:line-through}`
    ]
  }
);
customElements.define("calendar-month", Ke);
function kt(e) {
  return (
    // biome-ignore lint/a11y/useButtonType: <explanation>
    /* @__PURE__ */ b(
      "button",
      {
        part: `button ${e.name} ${e.onclick ? "" : "disabled"}`,
        onclick: e.onclick,
        "aria-disabled": e.onclick ? null : "true",
        children: /* @__PURE__ */ b("slot", { name: e.name, children: e.children })
      }
    )
  );
}
function dt(e) {
  const t = v(e.page.start), n = v(e.page.end);
  return /* @__PURE__ */ P("div", { role: "group", "aria-labelledby": "h", part: "container", children: [
    /* @__PURE__ */ b("div", { id: "h", class: "vh", "aria-live": "polite", "aria-atomic": "true", children: e.formatVerbose.formatRange(t, n) }),
    /* @__PURE__ */ P("div", { part: "header", children: [
      e.disableNavigation ? null : /* @__PURE__ */ b(kt, { name: "previous", onclick: e.previous, children: "Previous" }),
      /* @__PURE__ */ b("slot", { part: "heading", name: "heading", children: /* @__PURE__ */ b("div", { "aria-hidden": "true", children: e.format.formatRange(t, n) }) }),
      e.disableNavigation ? null : /* @__PURE__ */ b(kt, { name: "next", onclick: e.next, children: "Next" })
    ] }),
    /* @__PURE__ */ b(
      ft,
      {
        value: e,
        onselectday: e.onSelect,
        onfocusday: e.onFocus,
        onhoverday: e.onHover,
        children: /* @__PURE__ */ b("slot", {})
      }
    )
  ] });
}
const ht = {
  value: {
    type: String,
    value: ""
  },
  readonly: {
    type: Boolean,
    value: !1
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
    value: !1
  },
  showWeekNumbers: {
    type: Boolean,
    value: !1
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
    value: !1
  },
  focusedDate: {
    type: String,
    value: () => {
    }
  }
}, mt = [
  Kt,
  Jt,
  Y`:host{display:block;inline-size:fit-content}[role=group]{display:flex;flex-direction:column;gap:1em}:host::part(header){display:flex;align-items:center;justify-content:space-between}:host::part(heading){display:flex;margin:auto;font-weight:700;font-size:1.25em}button{cursor:pointer;user-select:none;display:flex;align-items:center;justify-content:center}button[aria-disabled]{cursor:default;opacity:.5}`
], Je = { year: "numeric" }, Ze = { year: "numeric", month: "long" };
function Mt(e, t) {
  return (t.year - e.year) * 12 + t.month - e.month;
}
const Ot = (e, t) => {
  const n = t === 12 ? new W(e.year, 1) : e;
  return {
    start: n,
    end: n.add({ months: t - 1 })
  };
};
function yt({
  months: e,
  locale: t,
  focusedDate: n,
  setFocusedDate: s
}) {
  const [r] = O("min"), [o] = O("max"), a = C("focusday"), f = C("change"), i = T(
    () => z(n ?? lt(), r, o),
    [n, r, o]
  ), [c, u] = at(
    () => Ot(i.toPlainYearMonth(), e)
  ), d = (h) => {
    const S = Mt(c.start, h.toPlainYearMonth());
    return S >= 0 && S < e;
  };
  rt(() => {
    let h = c.start;
    if (!d(i)) {
      const S = Mt(h, i.toPlainYearMonth()), H = Math.floor(S / e);
      h = h.add({ months: H * e });
    }
    u(Ot(h, e));
  }, [i, e]);
  const l = L();
  function m() {
    l.current.querySelectorAll("calendar-month").forEach((h) => h.focus());
  }
  function p(h) {
    s(h), a(v(h));
  }
  const y = U(Je, t), D = U(Ze, t);
  return {
    format: y,
    formatVerbose: D,
    page: c,
    focusedDate: i,
    dispatch: f,
    onFocus(h) {
      h.stopPropagation(), p(h.detail), setTimeout(m);
    },
    min: r,
    max: o,
    next: o == null || !d(o) ? () => p(i.add({ months: e })) : void 0,
    previous: r == null || !d(r) ? () => p(i.add({ months: -e })) : void 0,
    focus: m
  };
}
const Xe = _(
  (e) => {
    const [t, n] = O("value"), [s = t, r] = O("focusedDate"), o = yt({
      ...e,
      focusedDate: s,
      setFocusedDate: r
    });
    function a(f) {
      n(f.detail), o.dispatch();
    }
    return /* @__PURE__ */ b("host", { shadowDom: !0, focus: o.focus, children: /* @__PURE__ */ b(
      dt,
      {
        ...e,
        ...o,
        type: "date",
        value: t,
        onSelect: a
      }
    ) });
  },
  { props: ht, styles: mt }
);
customElements.define("calendar-date", Xe);
const At = (e, t) => E.compare(e, t) < 0 ? [e, t] : [t, e], Ge = _(
  (e) => {
    const [t, n] = xe("value"), [s = t[0], r] = O("focusedDate"), o = yt({
      ...e,
      focusedDate: s,
      setFocusedDate: r
    }), a = C("rangestart"), f = C("rangeend"), [i, c] = at();
    function u(p) {
      o.onFocus(p), d(p);
    }
    function d(p) {
      p.stopPropagation(), c((y) => y && { ...y, b: p.detail });
    }
    function l(p) {
      const y = p.detail;
      p.stopPropagation(), i ? (n(At(i.a, y)), c(void 0), f(v(y)), o.dispatch()) : (c({ a: y, b: y }), a(v(y)));
    }
    const m = i ? At(i.a, i.b) : t;
    return /* @__PURE__ */ b("host", { shadowDom: !0, focus: o.focus, children: /* @__PURE__ */ b(
      dt,
      {
        ...e,
        ...o,
        type: "range",
        value: m,
        onFocus: u,
        onHover: d,
        onSelect: l
      }
    ) });
  },
  { props: ht, styles: mt }
);
customElements.define("calendar-range", Ge);
const Qe = _(
  (e) => {
    const [t, n] = Be("value"), [s = t[0], r] = O("focusedDate"), o = yt({
      ...e,
      focusedDate: s,
      setFocusedDate: r
    });
    function a(f) {
      const i = [...t], c = t.findIndex((u) => u.equals(f.detail));
      c < 0 ? i.push(f.detail) : i.splice(c, 1), n(i), o.dispatch();
    }
    return /* @__PURE__ */ b("host", { shadowDom: !0, focus: o.focus, children: /* @__PURE__ */ b(
      dt,
      {
        ...e,
        ...o,
        type: "multi",
        value: t,
        onSelect: a
      }
    ) });
  },
  { props: ht, styles: mt }
);
customElements.define("calendar-multi", Qe);
export {
  Xe as CalendarDate,
  Ke as CalendarMonth,
  Qe as CalendarMulti,
  Ge as CalendarRange
};
