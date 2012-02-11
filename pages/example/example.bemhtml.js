var BEMHTML = (function(exports) {
    var __r8, __r10, __r12, __r14, __r16, __r18, __r20, __r22, __r24, __r26;
    var _c = exports.config = {};
    exports.mergeWith = function mergeWith(template) {
        var cache = {};
        _c.$unexpected = function(parents) {
            var match = cache[parents[0]], fn;
            if (!match) {
                for (var i = parents.length - 1; i >= 0; i--) {
                    if (template.config[parents[i]]) break;
                }
                if (i >= 0) {
                    cache[parents[0]] = parents[i];
                    fn = template.config[parents[i]];
                } else {
                    fn = template.apply;
                }
            } else {
                fn = template.config[match] || template.apply;
            }
            return fn.call(this);
        };
    };
    exports.apply = apply;
    function apply() {
        return _c.$75.call(this);
    }
    _c.$3 = function() {
        {
            var BEM = {}, toString = Object["prototype"]["toString"], SHORT_TAGS = {
                area: 1,
                base: 1,
                br: 1,
                col: 1,
                command: 1,
                embed: 1,
                hr: 1,
                img: 1,
                input: 1,
                keygen: 1,
                link: 1,
                meta: 1,
                param: 1,
                source: 1,
                wbr: 1
            };
            (function(BEM, undefined) {
                var MOD_DELIM = "_", ELEM_DELIM = "__", NAME_PATTERN = "[a-zA-Z0-9-]+";
                var buildModPostfix = function(modName, modVal, buffer) {
                    buffer.push(MOD_DELIM, modName, MOD_DELIM, modVal);
                };
                var buildBlockClass = function(name, modName, modVal, buffer) {
                    buffer.push(name);
                    modVal && buildModPostfix(modName, modVal, buffer);
                };
                var buildElemClass = function(block, name, modName, modVal, buffer) {
                    buildBlockClass(block, undefined, undefined, buffer);
                    buffer.push(ELEM_DELIM, name);
                    modVal && buildModPostfix(modName, modVal, buffer);
                };
                BEM["INTERNAL"] = {
                    NAME_PATTERN: NAME_PATTERN,
                    MOD_DELIM: MOD_DELIM,
                    ELEM_DELIM: ELEM_DELIM,
                    buildModPostfix: function(modName, modVal, buffer) {
                        var res = buffer || [];
                        buildModPostfix(modName, modVal, res);
                        return buffer ? res : res.join("");
                    },
                    buildClass: function(block, elem, modName, modVal, buffer) {
                        var typeOf = typeof modName;
                        if (typeOf == "string") {
                            if (typeof modVal != "string") {
                                buffer = modVal;
                                modVal = modName;
                                modName = elem;
                                elem = undefined;
                            } else {
                                undefined;
                            }
                        } else {
                            if (typeOf != "undefined") {
                                buffer = modName;
                                modName = undefined;
                            } else {
                                if (elem && typeof elem != "string") {
                                    buffer = elem;
                                    elem = undefined;
                                } else {
                                    undefined;
                                }
                            }
                        }
                        undefined;
                        if (!(elem || modName || buffer)) {
                            return block;
                        } else {
                            undefined;
                        }
                        undefined;
                        var res = buffer || [];
                        elem ? buildElemClass(block, elem, modName, modVal, res) : buildBlockClass(block, modName, modVal, res);
                        return buffer ? res : res.join("");
                    },
                    buildModsClasses: function(block, elem, mods, buffer) {
                        var res = buffer || [];
                        if (mods) {
                            var modName;
                            for (modName in mods) {
                                if (mods.hasOwnProperty(modName)) {
                                    var modVal = mods[modName];
                                    res.push(" ");
                                    elem ? buildElemClass(block, elem, modName, modVal, res) : buildBlockClass(block, modName, modVal, res);
                                } else {
                                    undefined;
                                }
                            }
                        } else {
                            undefined;
                        }
                        undefined;
                        return buffer ? res : res.join("");
                    },
                    buildClasses: function(block, elem, mods, buffer) {
                        var res = buffer || [];
                        elem ? buildElemClass(block, elem, undefined, undefined, res) : buildBlockClass(block, undefined, undefined, res);
                        this.buildModsClasses(block, elem, mods, buffer);
                        return buffer ? res : res.join("");
                    }
                };
            })(BEM);
            var buildEscape = function() {
                var ts = {
                    '"': "&quot;",
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;"
                }, f = function(t) {
                    return ts[t] || t;
                };
                return function(r) {
                    r = new RegExp(r, "g");
                    return function(s) {
                        return ("" + s).replace(r, f);
                    };
                };
            }(), ctx = {
                ctx: this,
                _start: true,
                apply: apply,
                _buf: [],
                _: {
                    isArray: function(obj) {
                        return toString.call(obj) === "[object Array]";
                    },
                    isSimple: function(obj) {
                        var t = typeof obj;
                        return t === "string" || t === "number";
                    },
                    isShortTag: function(t) {
                        return SHORT_TAGS.hasOwnProperty(t);
                    },
                    extend: function(o1, o2) {
                        if (!o1 || !o2) {
                            return o1 || o2;
                        } else {
                            undefined;
                        }
                        undefined;
                        var res = {}, n;
                        for (n in o1) {
                            o1.hasOwnProperty(n) && (res[n] = o1[n]);
                        }
                        undefined;
                        for (n in o2) {
                            o2.hasOwnProperty(n) && (res[n] = o2[n]);
                        }
                        undefined;
                        return res;
                    },
                    xmlEscape: buildEscape("[&<>]"),
                    attrEscape: buildEscape('["&<>]')
                },
                BEM: BEM,
                isFirst: function() {
                    return this["position"] === 1;
                },
                isLast: function() {
                    return this["position"] === this["_listLength"];
                }
            };
            ctx.apply();
            return ctx["_buf"].join("");
        }
        return;
    };
    _c.$4 = function() {
        return this["ctx"]["content"];
        return;
    };
    _c.$5 = function() {
        if (!!this["_start"] === false) {
            return _c.$3.call(this);
        } else {
            return this["ctx"]["content"];
            return;
        }
    };
    _c.$6 = function() {
        if (!!this["mods"]["inner"] === false) {
            {
                undefined;
                var __r41 = this["_mode"];
                this["_mode"] = "";
                var __r42 = this["ctx"];
                this["ctx"] = {
                    elem: "inner",
                    content: this["ctx"]["content"],
                    _wrap: true
                };
                this.apply();
                this["_mode"] = __r41;
                this["ctx"] = __r42;
                undefined;
            }
            return;
        } else {
            return _c.$5.call(this);
        }
    };
    _c.$7 = function() {
        if (!!this["ctx"]["_wrap"] === false) {
            return _c.$6.call(this);
        } else {
            return _c.$5.call(this);
        }
    };
    _c.$8 = function() {
        if (!this["mods"]["pseudo"] === false) {
            return _c.$7.call(this);
        } else {
            return _c.$5.call(this);
        }
    };
    _c.$10 = function() {
        {
            var ctx = this["ctx"], a = {
                href: ctx["url"]
            }, props = [ "title", "target" ], p;
            while (p = props.shift()) {
                ctx[p] && (a[p] = ctx[p]);
            }
            return a;
        }
        return;
    };
    _c.$11 = function() {
        return undefined;
        return;
    };
    _c.$12 = function() {
        if (!!this["_start"] === false) {
            return _c.$3.call(this);
        } else {
            return undefined;
            return;
        }
    };
    _c.$13 = function() {
        if (!!this["elem"] === false) {
            {
                var ctx = this["ctx"], a = {
                    href: ctx["url"]
                }, props = [ "title", "target" ], p;
                while (p = props.shift()) {
                    ctx[p] && (a[p] = ctx[p]);
                }
                return a;
            }
            return;
        } else {
            return _c.$12.call(this);
        }
    };
    _c.$14 = function() {
        if (!!this["ctx"]["url"] === false) {
            return {};
            return;
        } else {
            return _c.$13.call(this);
        }
    };
    _c.$15 = function() {
        if (!this["mods"]["pseudo"] === false) {
            return _c.$14.call(this);
        } else {
            return _c.$13.call(this);
        }
    };
    _c.$16 = function() {
        return true;
        return;
    };
    _c.$17 = function() {
        if (!this["mods"]["pseudo"] === false) {
            return _c.$16.call(this);
        } else {
            return _c.$12.call(this);
        }
    };
    _c.$18 = function() {
        {
            var _this = this, BEM = _this["BEM"], v = this["ctx"], buf = this["_buf"], tag;
            tag = (undefined, __r8 = this["_mode"], this["_mode"] = "tag", __r9 = apply.call(this), this["_mode"] = __r8, undefined, __r9);
            typeof tag != "undefined" || (tag = v["tag"]);
            typeof tag != "undefined" || (tag = "div");
            if (tag) {
                var jsParams, js;
                if (this["block"] && v["js"] !== false) {
                    js = (undefined, __r12 = this["_mode"], this["_mode"] = "js", __r13 = apply.call(this), this["_mode"] = __r12, undefined, __r13);
                    js = js ? this["_"].extend(v["js"], js === true ? {} : js) : v["js"] === true ? {} : v["js"];
                    js && ((jsParams = {})[BEM["INTERNAL"].buildClass(this["block"], v["elem"])] = js);
                } else {
                    undefined;
                }
                undefined;
                buf.push("<", tag);
                var isBEM = (undefined, __r14 = this["_mode"], this["_mode"] = "bem", __r15 = apply.call(this), this["_mode"] = __r14, undefined, __r15);
                typeof isBEM != "undefined" || (isBEM = typeof v["bem"] != "undefined" ? v["bem"] : v["block"] || v["elem"]);
                var cls = (undefined, __r16 = this["_mode"], this["_mode"] = "cls", __r17 = apply.call(this), this["_mode"] = __r16, undefined, __r17);
                cls || (cls = v["cls"]);
                var addJSInitClass = v["block"] && jsParams;
                if (isBEM || cls) {
                    buf.push(' class="');
                    if (isBEM) {
                        BEM["INTERNAL"].buildClasses(this["block"], v["elem"], v["elemMods"] || v["mods"], buf);
                        var mix = (undefined, __r18 = this["_mode"], this["_mode"] = "mix", __r19 = apply.call(this), this["_mode"] = __r18, undefined, __r19);
                        v["mix"] && (mix = mix ? mix.concat(v["mix"]) : v["mix"]);
                        if (mix) {
                            var i = 0, l = mix["length"], mixItem, hasItem, block;
                            while (i < l) {
                                mixItem = mix[i++];
                                hasItem = mixItem["block"] || mixItem["elem"], block = mixItem["block"] || _this["block"];
                                hasItem && buf.push(" ");
                                BEM["INTERNAL"][hasItem ? "buildClasses" : "buildModsClasses"](block, mixItem["elem"] || (mixItem["block"] ? undefined : _this["elem"]), mixItem["elemMods"] || mixItem["mods"], buf);
                                if (mixItem["js"]) {
                                    (jsParams || (jsParams = {}))[BEM["INTERNAL"].buildClass(block, mixItem["elem"])] = mixItem["js"] === true ? {} : mixItem["js"];
                                    addJSInitClass || (addJSInitClass = block && !mixItem["elem"]);
                                } else {
                                    undefined;
                                }
                            }
                        } else {
                            undefined;
                        }
                    } else {
                        undefined;
                    }
                    undefined;
                    cls && buf.push(isBEM ? " " : "", cls);
                    addJSInitClass && buf.push(" i-bem");
                    buf.push('"');
                } else {
                    undefined;
                }
                undefined;
                if (jsParams) {
                    var jsAttr = (undefined, __r22 = this["_mode"], this["_mode"] = "jsAttr", __r23 = apply.call(this), this["_mode"] = __r22, undefined, __r23);
                    buf.push(" ", jsAttr || "onclick", '="return ', this["_"].attrEscape(JSON.stringify(jsParams)), '"');
                } else {
                    undefined;
                }
                undefined;
                var attrs = (undefined, __r24 = this["_mode"], this["_mode"] = "attrs", __r25 = apply.call(this), this["_mode"] = __r24, undefined, __r25);
                attrs = this["_"].extend(attrs, v["attrs"]);
                if (attrs) {
                    var name;
                    for (name in attrs) {
                        buf.push(" ", name, '="', this["_"].attrEscape(attrs[name]), '"');
                    }
                } else {
                    undefined;
                }
            } else {
                undefined;
            }
            if (this["_"].isShortTag(tag)) {
                buf.push("/>");
            } else {
                tag && buf.push(">");
                var content = (undefined, __r26 = this["_mode"], this["_mode"] = "content", __r27 = apply.call(this), this["_mode"] = __r26, undefined, __r27);
                if (content || content === 0) {
                    var isBEM = this["block"] || this["elem"];
                    {
                        undefined;
                        var __r28 = this["_notNewList"];
                        this["_notNewList"] = false;
                        var __r29 = this["position"];
                        this["position"] = isBEM ? 1 : this["position"];
                        var __r30 = this["_listLength"];
                        this["_listLength"] = isBEM ? 1 : this["_listLength"];
                        var __r31 = this["ctx"];
                        this["ctx"] = content;
                        var __r32 = this["_mode"];
                        this["_mode"] = "";
                        apply.call(this);
                        this["_notNewList"] = __r28;
                        this["position"] = __r29;
                        this["_listLength"] = __r30;
                        this["ctx"] = __r31;
                        this["_mode"] = __r32;
                        undefined;
                    }
                    undefined;
                    undefined;
                    undefined;
                } else {
                    undefined;
                }
                undefined;
                tag && buf.push("</", tag, ">");
            }
        }
        return;
    };
    _c.$19 = function() {
        if (!!this["_start"] === false) {
            return _c.$3.call(this);
        } else {
            return _c.$18.call(this);
        }
    };
    _c.$25 = function() {
        if (!true === false) {
            {
                var vBlock = this["ctx"]["block"], vElem = this["ctx"]["elem"], block = this["_currBlock"] || this["block"];
                {
                    undefined;
                    var __r0 = this["_mode"];
                    this["_mode"] = "default";
                    var __r1 = this["block"];
                    this["block"] = vBlock || (vElem ? block : undefined);
                    var __r2 = this["_currBlock"];
                    this["_currBlock"] = vBlock || vElem ? undefined : block;
                    var __r3 = this["elem"];
                    this["elem"] = this["ctx"]["elem"];
                    var __r4 = this["mods"];
                    this["mods"] = this["ctx"]["mods"] || this["mods"] || {};
                    var __r5 = this["elemMods"];
                    this["elemMods"] = this["ctx"]["elemMods"] || {};
                    {
                        this["block"] || this["elem"] ? this["position"] = (this["position"] || 0) + 1 : this["_listLength"]--;
                        apply.call(this);
                        undefined;
                        undefined;
                    }
                    this["_mode"] = __r0;
                    this["block"] = __r1;
                    this["_currBlock"] = __r2;
                    this["elem"] = __r3;
                    this["mods"] = __r4;
                    this["elemMods"] = __r5;
                    undefined;
                }
                undefined;
            }
            return;
        } else {
            return _c.$unexpected.call(this, [ "$402c390f8812506f5a910e093646d131bb8ee554", "$813c2b27608e752562e8f7bb5bb8f4d06ee560f4", "$78491469ae5ea973c5f9441308d957956abcdf18", "$5bbac553604a1c1122fb99f8831ff9f5b8d91e92", "$42603a4f31aad3a80134e8366d38b4ac46111330", "$f9f559c04a6082ac89ce394b88c2132b1f48e3b1", "$18aedb47c10018005dbce5f4703487ed8fd7300c", "$c85748687b4fcdd5750a48b7c49af743679ffb2e" ]);
        }
    };
    _c.$26 = function() {
        if (!this["_"].isArray(this["ctx"]) === false) {
            {
                var v = this["ctx"], l = v["length"], i = 0, prevPos = this["position"], prevNotNewList = this["_notNewList"];
                if (prevNotNewList) {
                    this["_listLength"] += l - 1;
                } else {
                    this["position"] = 0;
                    this["_listLength"] = l;
                }
                this["_notNewList"] = true;
                while (i < l) {
                    {
                        undefined;
                        var __r7 = this["ctx"];
                        this["ctx"] = v[i++];
                        apply.call(this);
                        this["ctx"] = __r7;
                        undefined;
                    }
                    undefined;
                }
                undefined;
                prevNotNewList || (this["position"] = prevPos);
            }
            return;
        } else {
            return _c.$25.call(this);
        }
    };
    _c.$27 = function() {
        if (!!this["ctx"] === false) {
            this["_listLength"]--;
            return;
        } else {
            return _c.$26.call(this);
        }
    };
    _c.$28 = function() {
        if (!this["_"].isSimple(this["ctx"]) === false) {
            {
                this["_listLength"]--;
                this["_buf"].push(this["ctx"]);
            }
            return;
        } else {
            return _c.$27.call(this);
        }
    };
    _c.$29 = function() {
        if (!!this["_mode"] === false) {
            return _c.$28.call(this);
        } else {
            return _c.$unexpected.call(this, [ "$402c390f8812506f5a910e093646d131bb8ee554", "$813c2b27608e752562e8f7bb5bb8f4d06ee560f4", "$78491469ae5ea973c5f9441308d957956abcdf18", "$5bbac553604a1c1122fb99f8831ff9f5b8d91e92" ]);
        }
    };
    _c.$30 = function() {
        if (!!this["_start"] === false) {
            return _c.$3.call(this);
        } else {
            return _c.$29.call(this);
        }
    };
    _c.$31 = function() {
        switch (this["_mode"]) {
          case "tag":
            return "span";
            return;
            break;
          case "content":
            return _c.$8.call(this);
            break;
          case "attrs":
            return _c.$15.call(this);
            break;
          case "js":
            return _c.$17.call(this);
            break;
          case "bem":
            return _c.$12.call(this);
            break;
          case "default":
            return _c.$19.call(this);
            break;
          case "mix":
            return _c.$12.call(this);
            break;
          case "jsAttr":
            return _c.$12.call(this);
            break;
          case "cls":
            return _c.$12.call(this);
            break;
          default:
            return _c.$30.call(this);
        }
    };
    _c.$33 = function() {
        switch (this["_mode"]) {
          case "tag":
            return this["ctx"]["url"] ? "a" : "span";
            return;
            break;
          case "content":
            return _c.$7.call(this);
            break;
          case "attrs":
            return _c.$14.call(this);
            break;
          case "js":
            return true;
            return;
            break;
          case "bem":
            return _c.$12.call(this);
            break;
          case "default":
            return _c.$19.call(this);
            break;
          case "mix":
            return _c.$12.call(this);
            break;
          case "jsAttr":
            return _c.$12.call(this);
            break;
          case "cls":
            return _c.$12.call(this);
            break;
          default:
            return _c.$30.call(this);
        }
    };
    _c.$35 = function() {
        switch (this["_mode"]) {
          case "tag":
            return "a";
            return;
            break;
          case "content":
            return _c.$5.call(this);
            break;
          case "attrs":
            {
                var ctx = this["ctx"], a = {
                    href: ctx["url"]
                }, props = [ "title", "target" ], p;
                while (p = props.shift()) {
                    ctx[p] && (a[p] = ctx[p]);
                }
                return a;
            }
            return;
            break;
          case "js":
            return _c.$12.call(this);
            break;
          case "bem":
            return _c.$12.call(this);
            break;
          case "default":
            return _c.$19.call(this);
            break;
          case "mix":
            return _c.$12.call(this);
            break;
          case "jsAttr":
            return _c.$12.call(this);
            break;
          case "cls":
            return _c.$12.call(this);
            break;
          default:
            return _c.$30.call(this);
        }
    };
    _c.$36 = function() {
        switch (this["_mode"]) {
          case "tag":
            return undefined;
            return;
            break;
          case "content":
            return this["ctx"]["content"];
            return;
            break;
          case "attrs":
            return undefined;
            return;
            break;
          case "js":
            return undefined;
            return;
            break;
          case "bem":
            return undefined;
            return;
            break;
          case "default":
            return _c.$18.call(this);
            break;
          case "mix":
            return undefined;
            return;
            break;
          case "jsAttr":
            return undefined;
            return;
            break;
          case "cls":
            return undefined;
            return;
            break;
          default:
            return _c.$29.call(this);
        }
    };
    _c.$37 = function() {
        if (!!this["_start"] === false) {
            return _c.$3.call(this);
        } else {
            return _c.$36.call(this);
        }
    };
    _c.$38 = function() {
        if (!!this["elem"] === false) {
            return _c.$35.call(this);
        } else {
            return _c.$37.call(this);
        }
    };
    _c.$39 = function() {
        if (!this["mods"]["pseudo"] === false) {
            return _c.$33.call(this);
        } else {
            return _c.$38.call(this);
        }
    };
    _c.$40 = function() {
        switch (this["elem"]) {
          case "inner":
            return _c.$31.call(this);
            break;
          case "favicon":
            return _c.$39.call(this);
            break;
          case "js":
            return _c.$39.call(this);
            break;
          case "css":
            return _c.$39.call(this);
            break;
          case "meta":
            return _c.$39.call(this);
            break;
          case "body":
            return _c.$39.call(this);
            break;
          case "head":
            return _c.$39.call(this);
            break;
          case "core":
            return _c.$39.call(this);
            break;
          default:
            return _c.$39.call(this);
        }
    };
    _c.$41 = function() {
        {
            this["_buf"].push("<!DOCTYPE html>");
            {
                undefined;
                var __r35 = this["_mode"];
                this["_mode"] = "";
                var __r36 = this["ctx"];
                this["ctx"] = {
                    tag: "html",
                    attrs: {
                        "class": "i-ua_js_no i-ua_css_standard"
                    },
                    content: [ {
                        elem: "head",
                        content: [ {
                            tag: "meta",
                            attrs: {
                                charset: "utf-8"
                            }
                        }, {
                            tag: "meta",
                            attrs: {
                                "http-equiv": "X-UA-Compatible",
                                content: "IE=EmulateIE7, IE=edge"
                            }
                        }, {
                            tag: "title",
                            content: this["ctx"]["title"]
                        }, this["ctx"]["favicon"] ? {
                            elem: "favicon",
                            url: this["ctx"]["favicon"]
                        } : "", this["ctx"]["meta"], {
                            block: "i-ua"
                        }, this["ctx"]["head"] ]
                    }, {
                        elem: "body",
                        mix: [ this["ctx"] ],
                        content: [ this["ctx"]["content"] ]
                    } ]
                };
                this.apply();
                this["_mode"] = __r35;
                this["ctx"] = __r36;
                undefined;
            }
        }
        return;
    };
    _c.$42 = function() {
        switch (this["_mode"]) {
          case "tag":
            return _c.$12.call(this);
            break;
          case "content":
            return _c.$5.call(this);
            break;
          case "attrs":
            return _c.$12.call(this);
            break;
          case "js":
            return _c.$12.call(this);
            break;
          case "bem":
            return _c.$12.call(this);
            break;
          case "default":
            return _c.$41.call(this);
            break;
          case "mix":
            return _c.$12.call(this);
            break;
          case "jsAttr":
            return _c.$12.call(this);
            break;
          case "cls":
            return _c.$12.call(this);
            break;
          default:
            return _c.$30.call(this);
        }
    };
    _c.$43 = function() {
        if (!!this["elem"] === false) {
            return _c.$42.call(this);
        } else {
            return _c.$37.call(this);
        }
    };
    _c.$44 = function() {
        return "link";
        return;
    };
    _c.$46 = function() {
        return false;
        return;
    };
    _c.$47 = function() {
        if (!!this["elem"] === false) {
            {
                this["_buf"].push("<!DOCTYPE html>");
                {
                    undefined;
                    var __r35 = this["_mode"];
                    this["_mode"] = "";
                    var __r36 = this["ctx"];
                    this["ctx"] = {
                        tag: "html",
                        attrs: {
                            "class": "i-ua_js_no i-ua_css_standard"
                        },
                        content: [ {
                            elem: "head",
                            content: [ {
                                tag: "meta",
                                attrs: {
                                    charset: "utf-8"
                                }
                            }, {
                                tag: "meta",
                                attrs: {
                                    "http-equiv": "X-UA-Compatible",
                                    content: "IE=EmulateIE7, IE=edge"
                                }
                            }, {
                                tag: "title",
                                content: this["ctx"]["title"]
                            }, this["ctx"]["favicon"] ? {
                                elem: "favicon",
                                url: this["ctx"]["favicon"]
                            } : "", this["ctx"]["meta"], {
                                block: "i-ua"
                            }, this["ctx"]["head"] ]
                        }, {
                            elem: "body",
                            mix: [ this["ctx"] ],
                            content: [ this["ctx"]["content"] ]
                        } ]
                    };
                    this.apply();
                    this["_mode"] = __r35;
                    this["ctx"] = __r36;
                    undefined;
                }
            }
            return;
        } else {
            return _c.$19.call(this);
        }
    };
    _c.$48 = function() {
        switch (this["_mode"]) {
          case "tag":
            return _c.$44.call(this);
            break;
          case "content":
            return _c.$5.call(this);
            break;
          case "attrs":
            return {
                rel: "shortcut icon",
                href: this["ctx"]["url"]
            };
            return;
            break;
          case "js":
            return _c.$12.call(this);
            break;
          case "bem":
            return _c.$46.call(this);
            break;
          case "default":
            return _c.$47.call(this);
            break;
          case "mix":
            return _c.$12.call(this);
            break;
          case "jsAttr":
            return _c.$12.call(this);
            break;
          case "cls":
            return _c.$12.call(this);
            break;
          default:
            return _c.$30.call(this);
        }
    };
    _c.$49 = function() {
        return "script";
        return;
    };
    _c.$51 = function() {
        if (!this["ctx"]["url"] === false) {
            return {
                src: this["ctx"]["url"]
            };
            return;
        } else {
            return _c.$12.call(this);
        }
    };
    _c.$52 = function() {
        switch (this["_mode"]) {
          case "tag":
            return _c.$49.call(this);
            break;
          case "content":
            return _c.$5.call(this);
            break;
          case "attrs":
            return _c.$51.call(this);
            break;
          case "js":
            return _c.$12.call(this);
            break;
          case "bem":
            return _c.$46.call(this);
            break;
          case "default":
            return _c.$47.call(this);
            break;
          case "mix":
            return _c.$12.call(this);
            break;
          case "jsAttr":
            return _c.$12.call(this);
            break;
          case "cls":
            return _c.$12.call(this);
            break;
          default:
            return _c.$30.call(this);
        }
    };
    _c.$55 = function() {
        if (!!this["ctx"]["_ieCommented"] === false) {
            {
                var hideRule = !this["ctx"]["ie"] ? [ "gt IE 7", "<!-->", "<!--" ] : [ this["ctx"]["ie"], "", "" ];
                {
                    undefined;
                    var __r37 = this["_mode"];
                    this["_mode"] = "";
                    var __r38 = this["ctx"], __r39 = __r38["_ieCommented"];
                    __r38["_ieCommented"] = true;
                    var __r40 = this["ctx"];
                    this["ctx"] = [ "<!--[if " + hideRule[0] + "]>", hideRule[1], this["ctx"], hideRule[2], "<![endif]-->" ];
                    this.apply();
                    this["_mode"] = __r37;
                    __r38["_ieCommented"] = __r39;
                    this["ctx"] = __r40;
                    undefined;
                }
            }
            return;
        } else {
            return _c.$47.call(this);
        }
    };
    _c.$56 = function() {
        if (!this["ctx"].hasOwnProperty("ie") === false) {
            return _c.$55.call(this);
        } else {
            return _c.$47.call(this);
        }
    };
    _c.$57 = function() {
        switch (this["_mode"]) {
          case "tag":
            return _c.$44.call(this);
            break;
          case "content":
            return _c.$5.call(this);
            break;
          case "attrs":
            return {
                rel: "stylesheet",
                href: this["ctx"]["url"]
            };
            return;
            break;
          case "js":
            return _c.$12.call(this);
            break;
          case "bem":
            return _c.$46.call(this);
            break;
          case "default":
            return _c.$56.call(this);
            break;
          case "mix":
            return _c.$12.call(this);
            break;
          case "jsAttr":
            return _c.$12.call(this);
            break;
          case "cls":
            return _c.$12.call(this);
            break;
          default:
            return _c.$30.call(this);
        }
    };
    _c.$59 = function() {
        switch (this["_mode"]) {
          case "tag":
            return "style";
            return;
            break;
          case "content":
            return _c.$5.call(this);
            break;
          case "attrs":
            return _c.$12.call(this);
            break;
          case "js":
            return _c.$12.call(this);
            break;
          case "bem":
            return _c.$46.call(this);
            break;
          case "default":
            return _c.$56.call(this);
            break;
          case "mix":
            return _c.$12.call(this);
            break;
          case "jsAttr":
            return _c.$12.call(this);
            break;
          case "cls":
            return _c.$12.call(this);
            break;
          default:
            return _c.$30.call(this);
        }
    };
    _c.$60 = function() {
        if (!this["ctx"]["url"] === false) {
            return _c.$57.call(this);
        } else {
            return _c.$59.call(this);
        }
    };
    _c.$63 = function() {
        switch (this["_mode"]) {
          case "tag":
            return "meta";
            return;
            break;
          case "content":
            return _c.$5.call(this);
            break;
          case "attrs":
            return this["ctx"]["attrs"];
            return;
            break;
          case "js":
            return _c.$12.call(this);
            break;
          case "bem":
            return _c.$46.call(this);
            break;
          case "default":
            return _c.$47.call(this);
            break;
          case "mix":
            return _c.$12.call(this);
            break;
          case "jsAttr":
            return _c.$12.call(this);
            break;
          case "cls":
            return _c.$12.call(this);
            break;
          default:
            return _c.$30.call(this);
        }
    };
    _c.$65 = function() {
        switch (this["_mode"]) {
          case "tag":
            return "body";
            return;
            break;
          case "content":
            return _c.$5.call(this);
            break;
          case "attrs":
            return _c.$12.call(this);
            break;
          case "js":
            return _c.$12.call(this);
            break;
          case "bem":
            return _c.$12.call(this);
            break;
          case "default":
            return _c.$47.call(this);
            break;
          case "mix":
            return _c.$12.call(this);
            break;
          case "jsAttr":
            return _c.$12.call(this);
            break;
          case "cls":
            return _c.$12.call(this);
            break;
          default:
            return _c.$30.call(this);
        }
    };
    _c.$67 = function() {
        switch (this["_mode"]) {
          case "tag":
            return "head";
            return;
            break;
          case "content":
            return _c.$5.call(this);
            break;
          case "attrs":
            return _c.$12.call(this);
            break;
          case "js":
            return _c.$12.call(this);
            break;
          case "bem":
            return _c.$46.call(this);
            break;
          case "default":
            return _c.$47.call(this);
            break;
          case "mix":
            return _c.$12.call(this);
            break;
          case "jsAttr":
            return _c.$12.call(this);
            break;
          case "cls":
            return _c.$12.call(this);
            break;
          default:
            return _c.$30.call(this);
        }
    };
    _c.$68 = function() {
        switch (this["elem"]) {
          case "inner":
            return _c.$43.call(this);
            break;
          case "favicon":
            return _c.$48.call(this);
            break;
          case "js":
            return _c.$52.call(this);
            break;
          case "css":
            return _c.$60.call(this);
            break;
          case "meta":
            return _c.$63.call(this);
            break;
          case "body":
            return _c.$65.call(this);
            break;
          case "head":
            return _c.$67.call(this);
            break;
          case "core":
            return _c.$43.call(this);
            break;
          default:
            return _c.$43.call(this);
        }
    };
    _c.$70 = function() {
        switch (this["_mode"]) {
          case "tag":
            return _c.$12.call(this);
            break;
          case "content":
            return _c.$5.call(this);
            break;
          case "attrs":
            return _c.$12.call(this);
            break;
          case "js":
            return _c.$12.call(this);
            break;
          case "bem":
            return _c.$12.call(this);
            break;
          case "default":
            {
                undefined;
                var __r33 = this["_mode"];
                this["_mode"] = "";
                var __r34 = this["ctx"];
                this["ctx"] = {
                    block: "b-page",
                    elem: "js",
                    url: "//yandex.st/jquery/1.6.2/jquery.min.js"
                };
                this.apply();
                this["_mode"] = __r33;
                this["ctx"] = __r34;
                undefined;
            }
            return;
            break;
          case "mix":
            return _c.$12.call(this);
            break;
          case "jsAttr":
            return _c.$12.call(this);
            break;
          case "cls":
            return _c.$12.call(this);
            break;
          default:
            return _c.$30.call(this);
        }
    };
    _c.$71 = function() {
        switch (this["elem"]) {
          case "inner":
            return _c.$37.call(this);
            break;
          case "favicon":
            return _c.$37.call(this);
            break;
          case "js":
            return _c.$37.call(this);
            break;
          case "css":
            return _c.$37.call(this);
            break;
          case "meta":
            return _c.$37.call(this);
            break;
          case "body":
            return _c.$37.call(this);
            break;
          case "head":
            return _c.$37.call(this);
            break;
          case "core":
            return _c.$70.call(this);
            break;
          default:
            return _c.$37.call(this);
        }
    };
    _c.$73 = function() {
        switch (this["_mode"]) {
          case "tag":
            return _c.$49.call(this);
            break;
          case "content":
            return [ ";(function(d,e,c,r){", "e=d.documentElement;", 'c="className";', 'r="replace";', 'e[c]=e[c][r]("i-ua_js_no","i-ua_js_yes");', 'if(d.compatMode!="CSS1Compat")', 'e[c]=e[c][r]("i-ua_css_standard","i-ua_css_quirks")', "})(document);" ].join("");
            return;
            break;
          case "attrs":
            return _c.$12.call(this);
            break;
          case "js":
            return _c.$12.call(this);
            break;
          case "bem":
            return _c.$46.call(this);
            break;
          case "default":
            return _c.$19.call(this);
            break;
          case "mix":
            return _c.$12.call(this);
            break;
          case "jsAttr":
            return _c.$12.call(this);
            break;
          case "cls":
            return _c.$12.call(this);
            break;
          default:
            return _c.$30.call(this);
        }
    };
    _c.$74 = function() {
        if (!!this["elem"] === false) {
            return _c.$73.call(this);
        } else {
            return _c.$37.call(this);
        }
    };
    _c.$75 = function() {
        switch (this["block"]) {
          case "b-link":
            return _c.$40.call(this);
            break;
          case "b-page":
            return _c.$68.call(this);
            break;
          case "i-jquery":
            return _c.$71.call(this);
            break;
          case "i-ua":
            return _c.$74.call(this);
            break;
          default:
            return _c.$37.call(this);
        }
    };
    _c.$unexpected = function() {
        throw true;
        return;
    };
    return exports;
})(typeof exports === "undefined" ? {} : exports);;BEMHTML = BEMHTML.apply;