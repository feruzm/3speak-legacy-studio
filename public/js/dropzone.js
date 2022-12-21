/*
 * loopRequest v1.0.9
 * https://github.com/zhanziyang/file-dropzone
 *
 * Copyright (c) 2017 zhanziyang
 * Released under the MIT license
 */
!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], t) : e.FileDropzone = t(e.jQuery)
}(this, function (e) {
    "use strict";

    function t(e) {
        var t = this, i = [], n = [];
        if (e.forEach(function (e) {
            f.fileTypeValid(e, t.options.accept) ? (!t.options.unique || t.getFiles().indexOf(e) < 0) && i.push(e) : n.push(e)
        }), n.length && this.options.onInvalid && this.options.onInvalid.bind(this)(n), i[0]) {
            this.multiple || (i = i.slice(0, 1));
            var o = !0;
            if (this.options.beforeAdd) {
                var s = this.options.beforeAdd.bind(this)(i);
                "boolean" == typeof s && (o = s)
            }
            o && (!this.multiple || this.options.forceReplace ? b.bind(this)(i) : b.bind(this)(this.getFiles().concat(i)), this.options.onChange && this.options.onChange.bind(this)())
        }
    }

    function i() {
        window.__dropzone_styled_inserted || (e("<style>\n      .dropzone--clickable { cursor: pointer; }\n      .dropzone--file-hover { box-shadow: inset 0 0 10px #aaa; }\n    </style>").appendTo("head"), window.__dropzone_styled_inserted = !0)
    }

    function n(e) {
        v++, !this.disabled && f.eventHasFile(e) && (e.preventDefault(), e.stopPropagation(), 1 == v && (this.options.onEnter && this.options.onEnter.bind(this)(e), this.element.addClass(this.options.fileHoverClass)))
    }

    function o(e) {
        v--, !this.disabled && f.eventHasFile(e) && (e.preventDefault(), e.stopPropagation(), 0 === v && (this.options.onLeave && this.options.onLeave.bind(this)(e), this.element.removeClass(this.options.fileHoverClass)))
    }

    function s(e) {
        !this.disabled && f.eventHasFile(e) && (e.preventDefault(), this.options.onHover && this.options.onHover.bind(this)(e))
    }

    function r(e) {
        if (v--, !this.disabled && f.eventHasFile(e)) {
            e.preventDefault(), e.stopPropagation(), this.options.onDrop && this.options.onDrop.bind(this)(e), this.element.removeClass(this.options.fileHoverClass);
            var i = a.bind(this)(f.getFilesFromEvent(e));
            t.bind(this)(i)
        }
    }

    function l(e) {
        this.disabled || this.clickable && this.openFileChooser()
    }

    function a(e) {
        for (var t = [], i = [], n = 0, o = e.length; n < o; n++) {
            var s = e[n];
            s.type || s.size % 4096 != 0 ? i.push(s) : t.push(s)
        }
        return t.length > 0 && this.options.onFolderFound && this.options.onFolderFound.bind(this)(t), this.options.noFolder ? i : e
    }

    e = e && "default" in e ? e.default : e;
    var h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }, u = function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }, p = function () {
        function e(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }

        return function (t, i, n) {
            return i && e(t.prototype, i), n && e(t, n), t
        }
    }(), f = {
        isString: function (e) {
            return "string" == typeof e || e instanceof String
        }, isArray: function (e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }, isObject: function (e) {
            return e && "object" === (void 0 === e ? "undefined" : h(e)) && !this.isArray(e)
        }, addUnique: function (e, t) {
            return e.indexOf(t) < 0 && e.push(t), e
        }, remove: function (e, t) {
            var i = e.indexOf(t);
            return i >= 0 && e.splice(i, 1), e
        }, assign: function (e, t) {
            if (!e || !t) return e;
            for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
            return e
        }, without: function (e, t) {
            var i, n, o, s;
            for (s = [], n = 0, o = e.length; n < o; n++) (i = e[n]) !== t && s.push(i);
            return s
        }, fileTypeValid: function (e, t) {
            if (!t) return !0;
            var i = t.replace(/\/.*$/, ""), n = t.split(","), o = !0, s = !1, r = void 0;
            try {
                for (var l, a = n[Symbol.iterator](); !(o = (l = a.next()).done); o = !0) {
                    var h = l.value, u = h.trim();
                    if (/^\./.test(u)) {
                        if (e.name.toLowerCase().split(".").pop() === u.toLowerCase()) return !0
                    } else if (/\/\*$/.test(u)) {
                        if (e.type.replace(/\/.*$/, "") === i) return !0
                    } else if (e.type === h) return !0
                }
            } catch (e) {
                s = !0, r = e
            } finally {
                try {
                    !o && a.return && a.return()
                } finally {
                    if (s) throw r
                }
            }
            return !1
        }, eventHasFile: function (e) {
            var t = e.dataTransfer || e.originalEvent.dataTransfer;
            if (t.types) for (var i = 0, n = t.types.length; i < n; i++) if ("Files" == t.types[i]) return !0;
            return !1
        }, getFilesFromEvent: function (e) {
            var t = e.dataTransfer || e.originalEvent.dataTransfer, i = [];
            if (t.items && t.items.length) for (var n = 0, o = t.items.length; n < o; n++) {
                var s = t.items[n];
                "file" === s.kind && i.push(s.getAsFile())
            } else i = t.files;
            return i
        }
    }, d = function () {
    }, c = [], b = function (e) {
        c = e
    }, v = 0, y = {
        target: "",
        fileHoverClass: "dropzone--file-hover",
        clickable: !0,
        multiple: !0,
        paramName: "file",
        accept: "",
        capture: !0,
        unique: !1,
        noFolder: !0,
        forceReplace: !1,
        onChange: d,
        onEnter: d,
        onLeave: d,
        onHover: d,
        onDrop: d,
        onFolderFound: d,
        onInvalid: d,
        beforeAdd: d
    };
    return function () {
        function a(t, i) {
            u(this, a);
            var n = i || {}, o = e(t);
            if (f.isString(t) || !f.isObject(t) || t instanceof e || t instanceof Element || (o = e((n = t || {}).target)), !o || o.length <= 0) throw new Error("No matched element.");
            this.element = o, this.options = f.assign(y, n), this.disabled = !1, this.fileInput = null, this.multiple = !1, this.init()
        }

        return p(a, [{
            key: "init", value: function () {
                b.bind(this)([]), this.clickable = this.options.clickable, this.clickable && this.enableClick(), this.element[0].addEventListener("click", l.bind(this)), this.multiple = "boolean" != typeof this.options.multiple || this.options.multiple, this.fileInput = e('<input accept="video/*" type="file" hidden name="' + this.options.paramName + '" class="' + this.options.paramName + '" >'), this.element.next(this.fileInput), this.multiple && this.fileInput.attr("multiple", "multiple"), this.options.capture && this.fileInput.attr("capture", this.options.capture), this.options.accept && this.fileInput.attr("accept", this.options.accept), this.element.on("dragenter", n.bind(this)).on("dragleave", o.bind(this)).on("dragend", o.bind(this)).on("dragover", s.bind(this)).on("drop", r.bind(this));
                var a = this;
                this.fileInput.on("click", function (e) {
                    e.stopPropagation()
                }).on("change", function (i) {
                    if (!a.disabled) {
                        for (var n = i.target.files, o = [], s = 0, r = n.length; s < r; s++) {
                            var l = n[s];
                            l instanceof File && o.push(l)
                        }
                        t.bind(a)(o), a.options.unique || e(this).val("")
                    }
                }), i()
            }
        }, {
            key: "getFiles", value: function () {
                return c
            }
        }, {
            key: "removeFile", value: function (e) {
                var t, i = this.getFiles(), n = i.length;
                if (e instanceof File) {
                    t = e;
                    var o = f.without(i, t);
                    b.bind(this)(o)
                } else "number" == typeof e && (t = i.splice(e, 1)[0]);
                return this.getFiles().length === n - 1 ? (this.options.onChange && this.options.onChange.bind(this)(), t) : null
            }
        }, {
            key: "pop", value: function () {
                var e = this.getFiles();
                if (!e.length) return null;
                var t = e.pop();
                return b.bind(this)(e), this.options.onChange && this.options.onChange.bind(this)(), t
            }
        }, {
            key: "shift", value: function () {
                var e = this.getFiles();
                if (!e.length) return null;
                var t = e.shift();
                return b.bind(this)(e), this.options.onChange && this.options.onChange.bind(this)(), t
            }
        }, {
            key: "openFileChooser", value: function () {
                this.fileInput.click()
            }
        }, {
            key: "clearAll", value: function () {
                b.bind(this)([]), this.options.onChange && this.options.onChange.bind(this)()
            }
        }, {
            key: "disable", value: function () {
                this.disabled = !0, this.element.addClass("dropzone--disabled"), this.fileInput.prop("disabled", !0)
            }
        }, {
            key: "enable", value: function () {
                this.disabled = !1, this.element.removeClass("dropzone--disabled"), this.fileInput.prop("disabled", !1)
            }
        }, {
            key: "disableClick", value: function () {
                this.element.removeClass("dropzone--clickable"), this.clickable = !1
            }
        }, {
            key: "enableClick", value: function () {
                this.element.addClass("dropzone--clickable"), this.clickable = !0
            }
        }], [{
            key: "getFileSize", value: function (e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "b",
                    i = ["b", "kb", "mb", "gb", "tb"];
                if (!(e instanceof File)) throw new TypeError('First argument "file" should be a File instance.');
                if (t && "string" == typeof t || (t = "b"), "b" == t) return e.size;
                var n = i.indexOf(t.toLowerCase());
                if (n < 0) throw new TypeError('The unit should be one of "tb", "gb", "mb", "kb" and "b", the default value is "b"');
                return e.size / Math.pow(1024, n)
            }
        }]), a
    }()
});