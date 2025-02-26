var CodeMirror = (function() {
	function v(aN, aK) {
		var b2 = {}, bk = v.defaults;
		for (var aA in bk) {
			if (bk.hasOwnProperty(aA)) {
				b2[aA] = (aK && aK.hasOwnProperty(aA) ? aK : bk)[aA]
			}
		}
		var aE = document.createElement("div");
		aE.className = "CodeMirror" + (b2.lineWrapping ? " CodeMirror-wrap" : "");
		aE.innerHTML = '<div style="overflow: hidden; position: relative; width: 3px; height: 0px;"><textarea style="position: absolute; padding: 0; width: 1px; height: 1em" wrap="off" autocorrect="off" autocapitalize="off"></textarea></div><div class="CodeMirror-scroll" tabindex="-1"><div style="position: relative"><div style="position: relative"><div class="CodeMirror-gutter"><div class="CodeMirror-gutter-text"></div></div><div class="CodeMirror-lines"><div style="position: relative; z-index: 0"><div style="position: absolute; width: 100%; height: 0; overflow: hidden; visibility: hidden;"></div><pre class="CodeMirror-cursor">&#160;</pre><div style="position: relative; z-index: -1"></div><div></div></div></div></div></div></div>';
		if (aN.appendChild) {
			aN.appendChild(aE)
		} else {
			aN(aE)
		}
		var bY = aE.firstChild,
			bn = bY.firstChild,
			bl = aE.lastChild,
			bN = bl.firstChild,
			ch = bN.firstChild,
			aI = ch.firstChild,
			aZ = aI.firstChild,
			bv = aI.nextSibling.firstChild,
			aw = bv.firstChild,
			bd = aw.nextSibling,
			bh = bd.nextSibling,
			ar = bh.nextSibling;
		cE();
		if (t) {
			bn.style.width = "0px"
		}
		if (!f) {
			bv.draggable = true
		}
		bv.style.outline = "none";
		if (b2.tabindex != null) {
			bn.tabIndex = b2.tabindex
		}
		if (b2.autofocus) {
			bA()
		}
		if (!b2.gutter && !b2.lineNumbers) {
			aI.style.display = "none"
		}
		if (m) {
			bY.style.height = "1px", bY.style.position = "absolute"
		}
		try {
			cu("x")
		} catch (b9) {
			if (b9.message.match(/runtime/i)) {
				b9 = new Error("A CodeMirror inside a P-style element does not work in Internet Explorer. (innerHTML bug)")
			}
			throw b9
		}
		var b8 = new A(),
			ax = new A(),
			cQ;
		var cc, cz = new i([new ai([new e("")])]),
			ci, ck;
		bU();
		var cX = {
			from: {
				line: 0,
				ch: 0
			},
			to: {
				line: 0,
				ch: 0
			},
			inverted: false
		};
		var cj, br, a0, bG = 0,
			bc, co = false,
			ct = false;
		var cq, b7, aC, cO, aQ, bg, aT, cB;
		var be = 0,
			cR = 0,
			bM = 0,
			bO = 0;
		var b5;
		var bE = "",
			aG;
		var aq = {};
		at(function() {
			aX(b2.value || "");
			cq = false
		})();
		var a9 = new k();
		s(bl, "mousedown", at(cl));
		s(bl, "dblclick", at(bX));
		s(bv, "selectstart", U);
		if (!O) {
			s(bl, "contextmenu", a2)
		}
		s(bl, "scroll", function() {
			bG = bl.scrollTop;
			ce([]);
			if (b2.fixedGutter) {
				aI.style.left = bl.scrollLeft + "px"
			}
			if (b2.onScroll) {
				b2.onScroll(ca)
			}
		});
		s(window, "resize", function() {
			ce(true)
		});
		s(bn, "keyup", at(cm));
		s(bn, "input", aR);
		s(bn, "keydown", at(cd));
		s(bn, "keypress", at(bo));
		s(bn, "focus", cV);
		s(bn, "blur", aF);
		if (b2.dragDrop) {
			s(bv, "dragstart", aJ);

			function bD(c0) {
				if (b2.onDragEvent && b2.onDragEvent(ca, P(c0))) {
					return
				}
				x(c0)
			}
			s(bl, "dragenter", bD);
			s(bl, "dragover", bD);
			s(bl, "drop", at(ao))
		}
		s(bl, "paste", function() {
			bA();
			aR()
		});
		s(bn, "paste", aR);
		s(bn, "cut", at(function() {
			if (!b2.readOnly) {
				bt("")
			}
		}));
		if (m) {
			s(bN, "mouseup", function() {
				if (document.activeElement == bn) {
					bn.blur()
				}
				bA()
			})
		}
		var cx;
		try {
			cx = (document.activeElement == bn)
		} catch (b9) {}
		if (cx || b2.autofocus) {
			setTimeout(cV, 20)
		} else {
			aF()
		}
		function bs(c0) {
			return c0 >= 0 && c0 < cz.size
		}
		var ca = aE.CodeMirror = {
			getValue: b3,
			setValue: at(aX),
			getSelection: b4,
			replaceSelection: at(bt),
			focus: function() {
				window.focus();
				bA();
				cV();
				aR()
			},
			setOption: function(c1, c2) {
				var c0 = b2[c1];
				b2[c1] = c2;
				if (c1 == "mode" || c1 == "indentUnit") {
					bU()
				} else {
					if (c1 == "readOnly" && c2 == "nocursor") {
						aF();
						bn.blur()
					} else {
						if (c1 == "readOnly" && !c2) {
							cD(true)
						} else {
							if (c1 == "theme") {
								cE()
							} else {
								if (c1 == "lineWrapping" && c0 != c2) {
									at(cH)()
								} else {
									if (c1 == "tabSize") {
										ce(true)
									}
								}
							}
						}
					}
				}
				if (c1 == "lineNumbers" || c1 == "gutter" || c1 == "firstLineNumber" || c1 == "theme") {
					bf();
					ce(true)
				}
			},
			getOption: function(c0) {
				return b2[c0]
			},
			undo: at(cU),
			redo: at(cK),
			indentLine: at(function(c1, c0) {
				if (typeof c0 != "string") {
					if (c0 == null) {
						c0 = b2.smartIndent ? "smart" : "prev"
					} else {
						c0 = c0 ? "add" : "subtract"
					}
				}
				if (bs(c1)) {
					bz(c1, c0)
				}
			}),
			indentSelection: at(cC),
			historySize: function() {
				return {
					undo: a9.done.length,
					redo: a9.undone.length
				}
			},
			clearHistory: function() {
				a9 = new k()
			},
			matchBrackets: at(function() {
				cf(true)
			}),
			getTokenAt: at(function(c0) {
				c0 = aU(c0);
				return cG(c0.line).getTokenAt(cc, cv(c0.line), c0.ch)
			}),
			getStateAfter: function(c0) {
				c0 = b0(c0 == null ? cz.size - 1 : c0);
				return cv(c0 + 1)
			},
			cursorCoords: function(c1, c0) {
				if (c1 == null) {
					c1 = cX.inverted
				}
				return this.charCoords(c1 ? cX.from : cX.to, c0)
			},
			charCoords: function(c1, c0) {
				c1 = aU(c1);
				if (c0 == "local") {
					return cS(c1, false)
				}
				if (c0 == "div") {
					return cS(c1, true)
				}
				return ap(c1)
			},
			coordsChar: function(c0) {
				var c1 = al(bv);
				return bI(c0.x - c1.left, c0.y - c1.top)
			},
			markText: at(bF),
			setBookmark: aV,
			findMarksAt: bp,
			setMarker: at(bW),
			clearMarker: at(av),
			setLineClass: at(bm),
			hideLine: at(function(c0) {
				return cL(c0, true)
			}),
			showLine: at(function(c0) {
				return cL(c0, false)
			}),
			onDeleteLine: function(c0, c1) {
				if (typeof c0 == "number") {
					if (!bs(c0)) {
						return null
					}
					c0 = cG(c0)
				}(c0.handlers || (c0.handlers = [])).push(c1);
				return c0
			},
			lineInfo: aW,
			addWidget: function(c4, c2, c6, c3, c8) {
				c4 = cS(aU(c4));
				var c5 = c4.yBot,
					c1 = c4.x;
				c2.style.position = "absolute";
				bN.appendChild(c2);
				if (c3 == "over") {
					c5 = c4.y
				} else {
					if (c3 == "near") {
						var c0 = Math.max(bl.offsetHeight, cz.height * bQ()),
							c7 = Math.max(bN.clientWidth, bv.clientWidth) - a6();
						if (c4.yBot + c2.offsetHeight > c0 && c4.y > c2.offsetHeight) {
							c5 = c4.y - c2.offsetHeight
						}
						if (c1 + c2.offsetWidth > c7) {
							c1 = c7 - c2.offsetWidth
						}
					}
				}
				c2.style.top = (c5 + cs()) + "px";
				c2.style.left = c2.style.right = "";
				if (c8 == "right") {
					c1 = bN.clientWidth - c2.offsetWidth;
					c2.style.right = "0px"
				} else {
					if (c8 == "left") {
						c1 = 0
					} else {
						if (c8 == "middle") {
							c1 = (bN.clientWidth - c2.offsetWidth) / 2
						}
					}
					c2.style.left = (c1 + a6()) + "px"
				}
				if (c6) {
					aB(c1, c5, c1 + c2.offsetWidth, c5 + c2.offsetHeight)
				}
			},
			lineCount: function() {
				return cz.size
			},
			clipPos: aU,
			getCursor: function(c0) {
				if (c0 == null) {
					c0 = cX.inverted
				}
				return ab(c0 ? cX.from : cX.to)
			},
			somethingSelected: function() {
				return !ae(cX.from, cX.to)
			},
			setCursor: at(function(c0, c2, c1) {
				if (c2 == null && typeof c0.line == "number") {
					a7(c0.line, c0.ch, c1)
				} else {
					a7(c0, c2, c1)
				}
			}),
			setSelection: at(function(c2, c1, c0) {
				(c0 ? by : bx)(aU(c2), aU(c1 || c2))
			}),
			getLine: function(c0) {
				if (bs(c0)) {
					return cG(c0).text
				}
			},
			getLineHandle: function(c0) {
				if (bs(c0)) {
					return cG(c0)
				}
			},
			setLine: at(function(c0, c1) {
				if (bs(c0)) {
					bR(c1, {
						line: c0,
						ch: 0
					}, {
						line: c0,
						ch: cG(c0).text.length
					})
				}
			}),
			removeLine: at(function(c0) {
				if (bs(c0)) {
					bR("", {
						line: c0,
						ch: 0
					}, aU({
						line: c0 + 1,
						ch: 0
					}))
				}
			}),
			replaceRange: at(bR),
			getRange: function(c1, c0) {
				return cP(aU(c1), aU(c0))
			},
			triggerOnKeyDown: at(cd),
			execCommand: function(c0) {
				return M[c0](ca)
			},
			moveH: at(cF),
			deleteH: at(cn),
			moveV: at(cy),
			toggleOverwrite: function() {
				if (co) {
					co = false;
					bd.className = bd.className.replace(" CodeMirror-overwrite", "")
				} else {
					co = true;
					bd.className += " CodeMirror-overwrite"
				}
			},
			posFromIndex: function(c1) {
				var c2 = 0,
					c0;
				cz.iter(0, cz.size, function(c3) {
					var c4 = c3.text.length + 1;
					if (c4 > c1) {
						c0 = c1;
						return true
					}
					c1 -= c4;
					++c2
				});
				return aU({
					line: c2,
					ch: c0
				})
			},
			indexFromPos: function(c1) {
				if (c1.line < 0 || c1.ch < 0) {
					return 0
				}
				var c0 = c1.ch;
				cz.iter(0, c1.line, function(c2) {
					c0 += c2.text.length + 1
				});
				return c0
			},
			scrollTo: function(c0, c1) {
				if (c0 != null) {
					bl.scrollLeft = c0
				}
				if (c1 != null) {
					bl.scrollTop = c1
				}
				ce([])
			},
			operation: function(c0) {
				return at(c0)()
			},
			compoundChange: function(c0) {
				return bP(c0)
			},
			refresh: function() {
				ce(true);
				if (bl.scrollHeight > bG) {
					bl.scrollTop = bG
				}
			},
			getInputField: function() {
				return bn
			},
			getWrapperElement: function() {
				return aE
			},
			getScrollerElement: function() {
				return bl
			},
			getGutterElement: function() {
				return aI
			}
		};

		function cG(c0) {
			return D(cz, c0)
		}
		function a4(c1, c0) {
			aT = true;
			var c2 = c0 - c1.height;
			for (var c3 = c1; c3; c3 = c3.parent) {
				c3.height += c2
			}
		}
		function aX(c0) {
			var c1 = {
				line: 0,
				ch: 0
			};
			aP(c1, {
				line: cz.size - 1,
				ch: cG(cz.size - 1).text.length
			}, B(c0), c1, c1);
			cq = true
		}
		function b3() {
			var c0 = [];
			cz.iter(0, cz.size, function(c1) {
				c0.push(c1.text)
			});
			return c0.join("\n")
		}
		function cl(c9) {
			a5(z(c9, "shiftKey"));
			for (var c4 = j(c9); c4 != aE; c4 = c4.parentNode) {
				if (c4.parentNode == bN && c4 != ch) {
					return
				}
			}
			for (var c4 = j(c9); c4 != aE; c4 = c4.parentNode) {
				if (c4.parentNode == aZ) {
					if (b2.onGutterClick) {
						b2.onGutterClick(ca, r(aZ.childNodes, c4) + cR, c9)
					}
					return U(c9)
				}
			}
			var c0 = a3(c9);
			switch (y(c9)) {
				case 3:
					if (O && !N) {
						a2(c9)
					}
					return;
				case 2:
					if (c0) {
						a7(c0.line, c0.ch, true)
					}
					return
			}
			if (!c0) {
				if (j(c9) == bl) {
					U(c9)
				}
				return
			}
			if (!ck) {
				cV()
			}
			var c1 = +new Date;
			if (a0 && a0.time > c1 - 400 && ae(a0.pos, c0)) {
				U(c9);
				setTimeout(bA, 20);
				return aL(c0.line)
			} else {
				if (br && br.time > c1 - 400 && ae(br.pos, c0)) {
					a0 = {
						time: c1,
						pos: c0
					};
					U(c9);
					return bJ(c0)
				} else {
					br = {
						time: c1,
						pos: c0
					}
				}
			}
			var db = c0,
				c2;
			if (b2.dragDrop && G && !b2.readOnly && !ae(cX.from, cX.to) && !aa(c0, cX.from) && !aa(cX.to, c0)) {
				if (f) {
					bv.draggable = true
				}
				function c5(dc) {
					if (f) {
						bv.draggable = false
					}
					bc = false;
					c8();
					c3();
					if (Math.abs(c9.clientX - dc.clientX) + Math.abs(c9.clientY - dc.clientY) < 10) {
						U(dc);
						a7(c0.line, c0.ch, true);
						bA()
					}
				}
				var c8 = s(document, "mouseup", at(c5), true);
				var c3 = s(bl, "drop", at(c5), true);
				bc = true;
				if (bv.dragDrop) {
					bv.dragDrop()
				}
				return
			}
			U(c9);
			a7(c0.line, c0.ch, true);

			function da(dc) {
				var de = a3(dc, true);
				if (de && !ae(de, db)) {
					if (!ck) {
						cV()
					}
					db = de;
					by(c0, de);
					cq = false;
					var dd = bB();
					if (de.line >= dd.to || de.line < dd.from) {
						c2 = setTimeout(at(function() {
							da(dc)
						}), 150)
					}
				}
			}
			function c7(dc) {
				clearTimeout(c2);
				var dd = a3(dc);
				if (dd) {
					by(c0, dd)
				}
				U(dc);
				bA();
				cq = true;
				c6();
				c8()
			}
			var c6 = s(document, "mousemove", at(function(dc) {
				clearTimeout(c2);
				U(dc);
				if (!J && !y(dc)) {
					c7(dc)
				} else {
					da(dc)
				}
			}), true);
			var c8 = s(document, "mouseup", at(c7), true)
		}
		function bX(c0) {
			for (var c2 = j(c0); c2 != aE; c2 = c2.parentNode) {
				if (c2.parentNode == aZ) {
					return U(c0)
				}
			}
			var c1 = a3(c0);
			if (!c1) {
				return
			}
			a0 = {
				time: +new Date,
				pos: c1
			};
			U(c0);
			bJ(c1)
		}
		function ao(c4) {
			if (b2.onDragEvent && b2.onDragEvent(ca, P(c4))) {
				return
			}
			c4.preventDefault();
			var c7 = a3(c4, true),
				c1 = c4.dataTransfer.files;
			if (!c7 || b2.readOnly) {
				return
			}
			if (c1 && c1.length && window.FileReader && window.File) {
				function c3(da, c9) {
					var c8 = new FileReader;
					c8.onload = function() {
						c5[c9] = c8.result;
						if (++c2 == c6) {
							c7 = aU(c7);
							at(function() {
								var db = bR(c5.join(""), c7, c7);
								by(c7, db)
							})()
						}
					};
					c8.readAsText(da)
				}
				var c6 = c1.length,
					c5 = Array(c6),
					c2 = 0;
				for (var c0 = 0; c0 < c6; ++c0) {
					c3(c1[c0], c0)
				}
			} else {
				try {
					var c5 = c4.dataTransfer.getData("Text");
					if (c5) {
						bP(function() {
							var c9 = cX.from,
								c8 = cX.to;
							by(c7, c7);
							if (bc) {
								bR("", c9, c8)
							}
							bt(c5);
							bA()
						})
					}
				} catch (c4) {}
			}
		}
		function aJ(c2) {
			var c0 = b4();
			c2.dataTransfer.setData("Text", c0);
			if (O || ag) {
				var c1 = document.createElement("img");
				c1.scr = "data:image/gif;base64,R0lGODdhAgACAIAAAAAAAP///ywAAAAAAgACAAACAoRRADs=";
				c2.dataTransfer.setDragImage(c1, 0, 0)
			}
		}
		function bj(c2, c0) {
			if (typeof c2 == "string") {
				c2 = M[c2];
				if (!c2) {
					return false
				}
			}
			var c1 = cj;
			try {
				if (b2.readOnly) {
					ct = true
				}
				if (c0) {
					cj = null
				}
				c2(ca)
			} catch (c3) {
				if (c3 != ac) {
					throw c3
				}
				return false
			} finally {
				cj = c1;
				ct = false
			}
			return true
		}
		function cM(c6) {
			var c0 = c(b2.keyMap),
				c3 = c0.auto;
			clearTimeout(bC);
			if (c3 && !R(c6)) {
				bC = setTimeout(function() {
					if (c(b2.keyMap) == c0) {
						b2.keyMap = (c3.call ? c3.call(null, ca) : c3)
					}
				}, 50)
			}
			var c1 = S[z(c6, "keyCode")],
				c5 = false;
			if (c1 == null || c6.altGraphKey) {
				return false
			}
			if (z(c6, "altKey")) {
				c1 = "Alt-" + c1
			}
			if (z(c6, "ctrlKey")) {
				c1 = "Ctrl-" + c1
			}
			if (z(c6, "metaKey")) {
				c1 = "Cmd-" + c1
			}
			var c4 = false;

			function c2() {
				c4 = true
			}
			if (z(c6, "shiftKey")) {
				c5 = l("Shift-" + c1, b2.extraKeys, b2.keyMap, function(c7) {
					return bj(c7, true)
				}, c2) || l(c1, b2.extraKeys, b2.keyMap, function(c7) {
					if (typeof c7 == "string" && /^go[A-Z]/.test(c7)) {
						return bj(c7)
					}
				}, c2)
			} else {
				c5 = l(c1, b2.extraKeys, b2.keyMap, bj, c2)
			}
			if (c4) {
				c5 = false
			}
			if (c5) {
				U(c6);
				if (J) {
					c6.oldKeyCode = c6.keyCode;
					c6.keyCode = 0
				}
			}
			return c5
		}
		function bZ(c2, c0) {
			var c1 = l("'" + c0 + "'", b2.extraKeys, b2.keyMap, function(c3) {
				return bj(c3, true)
			});
			if (c1) {
				U(c2)
			}
			return c1
		}
		var cJ = null,
			bC;

		function cd(c2) {
			if (!ck) {
				cV()
			}
			if (J && c2.keyCode == 27) {
				c2.returnValue = false
			}
			if (bu) {
				if (bL()) {
					bu = false
				}
			}
			if (b2.onKeyEvent && b2.onKeyEvent(ca, P(c2))) {
				return
			}
			var c0 = z(c2, "keyCode");
			a5(c0 == 16 || z(c2, "shiftKey"));
			var c1 = cM(c2);
			if (window.opera) {
				cJ = c1 ? c0 : null;
				if (!c1 && c0 == 88 && z(c2, N ? "metaKey" : "ctrlKey")) {
					bt("")
				}
			}
		}
		function bo(c3) {
			if (bu) {
				bL()
			}
			if (b2.onKeyEvent && b2.onKeyEvent(ca, P(c3))) {
				return
			}
			var c2 = z(c3, "keyCode"),
				c0 = z(c3, "charCode");
			if (window.opera && c2 == cJ) {
				cJ = null;
				U(c3);
				return
			}
			if (((window.opera && !c3.which) || m) && cM(c3)) {
				return
			}
			var c1 = String.fromCharCode(c0 == null ? c2 : c0);
			if (b2.electricChars && cc.electricChars && b2.smartIndent && !b2.readOnly) {
				if (cc.electricChars.indexOf(c1) > -1) {
					setTimeout(at(function() {
						bz(cX.to.line, "smart")
					}), 75)
				}
			}
			if (bZ(c3, c1)) {
				return
			}
			aR()
		}
		function cm(c0) {
			if (b2.onKeyEvent && b2.onKeyEvent(ca, P(c0))) {
				return
			}
			if (z(c0, "keyCode") == 16) {
				cj = null
			}
		}
		function cV() {
			if (b2.readOnly == "nocursor") {
				return
			}
			if (!ck) {
				if (b2.onFocus) {
					b2.onFocus(ca)
				}
				ck = true;
				if (aE.className.search(/\bCodeMirror-focused\b/) == -1) {
					aE.className += " CodeMirror-focused"
				}
				if (!bg) {
					cD(true)
				}
			}
			an();
			cN()
		}
		function aF() {
			if (ck) {
				if (b2.onBlur) {
					b2.onBlur(ca)
				}
				ck = false;
				if (b5) {
					at(function() {
						if (b5) {
							b5();
							b5 = null
						}
					})()
				}
				aE.className = aE.className.replace(" CodeMirror-focused", "")
			}
			clearInterval(cQ);
			setTimeout(function() {
				if (!ck) {
					cj = null
				}
			}, 150)
		}
		function aP(c5, c4, c3, c1, c0) {
			if (ct) {
				return
			}
			if (a9) {
				var c2 = [];
				cz.iter(c5.line, c4.line + 1, function(c6) {
					c2.push(c6.text)
				});
				a9.addChange(c5.line, c3.length, c2);
				while (a9.done.length > b2.undoDepth) {
					a9.done.shift()
				}
			}
			au(c5, c4, c3, c1, c0)
		}
		function cb(c5, c6) {
			if (!c5.length) {
				return
			}
			var c7 = c5.pop(),
				c1 = [];
			for (var c2 = c7.length - 1; c2 >= 0; c2 -= 1) {
				var c4 = c7[c2];
				var c8 = [],
					c0 = c4.start + c4.added;
				cz.iter(c4.start, c0, function(c9) {
					c8.push(c9.text)
				});
				c1.push({
					start: c4.start,
					added: c4.old.length,
					old: c8
				});
				var c3 = aU({
					line: c4.start + c4.old.length - 1,
					ch: X(c8[c8.length - 1], c4.old[c4.old.length - 1])
				});
				au({
					line: c4.start,
					ch: 0
				}, {
					line: c0 - 1,
					ch: cG(c0 - 1).text.length
				}, c4.old, c3, c3)
			}
			cq = true;
			c6.push(c1)
		}
		function cU() {
			cb(a9.done, a9.undone)
		}
		function cK() {
			cb(a9.undone, a9.done)
		}
		function au(df, c4, dl, c0, dm) {
			if (ct) {
				return
			}
			var dk = false,
				c3 = bE.length;
			if (!b2.lineWrapping) {
				cz.iter(df.line, c4.line + 1, function(dn) {
					if (dn.text.length == c3) {
						dk = true;
						return true
					}
				})
			}
			if (df.line != c4.line || dl.length > 1) {
				aT = true
			}
			var dc = c4.line - df.line,
				db = cG(df.line),
				c1 = cG(c4.line);
			if (df.ch == 0 && c4.ch == 0 && dl[dl.length - 1] == "") {
				var c9 = [],
					da = null;
				if (df.line) {
					da = cG(df.line - 1);
					da.fixMarkEnds(c1)
				} else {
					c1.fixMarkStarts()
				}
				for (var dh = 0, dj = dl.length - 1; dh < dj; ++dh) {
					c9.push(e.inheritMarks(dl[dh], da))
				}
				if (dc) {
					cz.remove(df.line, dc, cB)
				}
				if (c9.length) {
					cz.insert(df.line, c9)
				}
			} else {
				if (db == c1) {
					if (dl.length == 1) {
						db.replace(df.ch, c4.ch, dl[0])
					} else {
						c1 = db.split(c4.ch, dl[dl.length - 1]);
						db.replace(df.ch, null, dl[0]);
						db.fixMarkEnds(c1);
						var c9 = [];
						for (var dh = 1, dj = dl.length - 1; dh < dj; ++dh) {
							c9.push(e.inheritMarks(dl[dh], db))
						}
						c9.push(c1);
						cz.insert(df.line + 1, c9)
					}
				} else {
					if (dl.length == 1) {
						db.replace(df.ch, null, dl[0]);
						c1.replace(null, c4.ch, "");
						db.append(c1);
						cz.remove(df.line + 1, dc, cB)
					} else {
						var c9 = [];
						db.replace(df.ch, null, dl[0]);
						c1.replace(null, c4.ch, dl[dl.length - 1]);
						db.fixMarkEnds(c1);
						for (var dh = 1, dj = dl.length - 1; dh < dj; ++dh) {
							c9.push(e.inheritMarks(dl[dh], db))
						}
						if (dc > 1) {
							cz.remove(df.line + 1, dc - 1, cB)
						}
						cz.insert(df.line + 1, c9)
					}
				}
			}
			if (b2.lineWrapping) {
				var c6 = Math.max(5, bl.clientWidth / bi() - 3);
				cz.iter(df.line, df.line + dl.length, function(dn) {
					if (dn.hidden) {
						return
					}
					var dp = Math.ceil(dn.text.length / c6) || 1;
					if (dp != dn.height) {
						a4(dn, dp)
					}
				})
			} else {
				cz.iter(df.line, df.line + dl.length, function(dp) {
					var dn = dp.text;
					if (dn.length > c3) {
						bE = dn;
						c3 = dn.length;
						aG = null;
						dk = false
					}
				});
				if (dk) {
					c3 = 0;
					bE = "";
					aG = null;
					cz.iter(0, cz.size, function(dp) {
						var dn = dp.text;
						if (dn.length > c3) {
							c3 = dn.length;
							bE = dn
						}
					})
				}
			}
			var c2 = [],
				c8 = dl.length - dc - 1;
			for (var dh = 0, de = ci.length; dh < de; ++dh) {
				var di = ci[dh];
				if (di < df.line) {
					c2.push(di)
				} else {
					if (di > c4.line) {
						c2.push(di + c8)
					}
				}
			}
			var dg = df.line + Math.min(dl.length, 500);
			cI(df.line, dg);
			c2.push(dg);
			ci = c2;
			bH(100);
			aC.push({
				from: df.line,
				to: c4.line + 1,
				diff: c8
			});
			var c7 = {
				from: df,
				to: c4,
				text: dl
			};
			if (cO) {
				for (var c5 = cO; c5.next; c5 = c5.next) {}
				c5.next = c7
			} else {
				cO = c7
			}
			function dd(dn) {
				return dn <= Math.min(c4.line, c4.line + c8) ? dn : dn + c8
			}
			bx(c0, dm, dd(cX.from.line), dd(cX.to.line));
			if (bl.clientHeight) {
				bN.style.height = (cz.height * bQ() + 2 * cs()) + "px"
			}
		}
		function bR(c1, c4, c3) {
			c4 = aU(c4);
			if (!c3) {
				c3 = c4
			} else {
				c3 = aU(c3)
			}
			c1 = B(c1);

			function c2(c7) {
				if (aa(c7, c4)) {
					return c7
				}
				if (!aa(c3, c7)) {
					return c0
				}
				var c5 = c7.line + c1.length - (c3.line - c4.line) - 1;
				var c6 = c7.ch;
				if (c7.line == c3.line) {
					c6 += c1[c1.length - 1].length - (c3.ch - (c3.line == c4.line ? c4.ch : 0))
				}
				return {
					line: c5,
					ch: c6
				}
			}
			var c0;
			aD(c1, c4, c3, function(c5) {
				c0 = c5;
				return {
					from: c2(cX.from),
					to: c2(cX.to)
				}
			});
			return c0
		}
		function bt(c0, c1) {
			aD(B(c0), cX.from, cX.to, function(c2) {
				if (c1 == "end") {
					return {
						from: c2,
						to: c2
					}
				} else {
					if (c1 == "start") {
						return {
							from: cX.from,
							to: cX.from
						}
					} else {
						return {
							from: cX.from,
							to: c2
						}
					}
				}
			})
		}
		function aD(c3, c5, c4, c0) {
			var c2 = c3.length == 1 ? c3[0].length + c5.ch : c3[c3.length - 1].length;
			var c1 = c0({
				line: c5.line + c3.length - 1,
				ch: c2
			});
			aP(c5, c4, c3, c1.from, c1.to)
		}
		function cP(c4, c3) {
			var c1 = c4.line,
				c0 = c3.line;
			if (c1 == c0) {
				return cG(c1).text.slice(c4.ch, c3.ch)
			}
			var c2 = [cG(c1).text.slice(c4.ch)];
			cz.iter(c1 + 1, c0, function(c5) {
				c2.push(c5.text)
			});
			c2.push(cG(c0).text.slice(0, c3.ch));
			return c2.join("\n")
		}
		function b4() {
			return cP(cX.from, cX.to)
		}
		var bu = false;

		function an() {
			if (bu) {
				return
			}
			b8.set(b2.pollInterval, function() {
				aO();
				bL();
				if (ck) {
					an()
				}
				az()
			})
		}
		function aR() {
			var c0 = false;
			bu = true;

			function c1() {
				aO();
				var c2 = bL();
				if (!c2 && !c0) {
					c0 = true;
					b8.set(60, c1)
				} else {
					bu = false;
					an()
				}
				az()
			}
			b8.set(20, c1)
		}
		var bb = "";

		function bL() {
			if (bg || !ck || af(bn) || b2.readOnly) {
				return false
			}
			var c1 = bn.value;
			if (c1 == bb) {
				return false
			}
			cj = null;
			var c2 = 0,
				c0 = Math.min(bb.length, c1.length);
			while (c2 < c0 && bb[c2] == c1[c2]) {
				++c2
			}
			if (c2 < bb.length) {
				cX.from = {
					line: cX.from.line,
					ch: cX.from.ch - (bb.length - c2)
				}
			} else {
				if (co && ae(cX.from, cX.to)) {
					cX.to = {
						line: cX.to.line,
						ch: Math.min(cG(cX.to.line).text.length, cX.to.ch + (c1.length - c2))
					}
				}
			}
			bt(c1.slice(c2), "end");
			bb = c1;
			return true
		}
		function cD(c0) {
			if (!ae(cX.from, cX.to)) {
				bb = "";
				bn.value = b4();
				a(bn)
			} else {
				if (c0) {
					bb = bn.value = ""
				}
			}
		}
		function bA() {
			if (b2.readOnly != "nocursor") {
				bn.focus()
			}
		}
		function cZ() {
			if (!bd.getBoundingClientRect) {
				return
			}
			var c0 = bd.getBoundingClientRect();
			if (J && c0.top == c0.bottom) {
				return
			}
			var c1 = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
			if (c0.top < 0 || c0.bottom > c1) {
				bd.scrollIntoView()
			}
		}
		function cg() {
			var c1 = cS(cX.inverted ? cX.from : cX.to);
			var c0 = b2.lineWrapping ? Math.min(c1.x, bv.offsetWidth) : c1.x;
			return aB(c0, c1.y, c0, c1.yBot)
		}
		function aB(c2, c8, c0, c7) {
			var c5 = a6(),
				dd = cs();
			c8 += dd;
			c7 += dd;
			c2 += c5;
			c0 += c5;
			var da = bl.clientHeight,
				c3 = bl.scrollTop,
				c1 = false,
				dc = true;
			if (c8 < c3) {
				bl.scrollTop = Math.max(0, c8);
				c1 = true
			} else {
				if (c7 > c3 + da) {
					bl.scrollTop = c7 - da;
					c1 = true
				}
			}
			var c9 = bl.clientWidth,
				db = bl.scrollLeft;
			var c6 = b2.fixedGutter ? aI.clientWidth : 0;
			var c4 = c2 < c6 + c5 + 10;
			if (c2 < db + c6 || c4) {
				if (c4) {
					c2 = 0
				}
				bl.scrollLeft = Math.max(0, c2 - 10 - c6);
				c1 = true
			} else {
				if (c0 > c9 + db - 3) {
					bl.scrollLeft = c0 + 10 - c9;
					c1 = true;
					if (c0 > bN.clientWidth) {
						dc = false
					}
				}
			}
			if (c1 && b2.onScroll) {
				b2.onScroll(ca)
			}
			return dc
		}
		function bB() {
			var c0 = bQ(),
				c3 = bl.scrollTop - cs();
			var c2 = Math.max(0, Math.floor(c3 / c0));
			var c1 = Math.ceil((c3 + bl.clientHeight) / c0);
			return {
				from: Y(cz, c2),
				to: Y(cz, c1)
			}
		}
		function ce(c8, c4) {
			if (!bl.clientWidth) {
				cR = bM = be = 0;
				return
			}
			var c3 = bB();
			if (c8 !== true && c8.length == 0 && c3.from > cR && c3.to < bM) {
				return
			}
			var c9 = Math.max(c3.from - 100, 0),
				da = Math.min(cz.size, c3.to + 100);
			if (cR < c9 && c9 - cR < 20) {
				c9 = cR
			}
			if (bM > da && bM - da < 20) {
				da = Math.min(cz.size, bM)
			}
			var dc = c8 === true ? [] : b1([{
				from: cR,
				to: bM,
				domStart: 0
			}], c8);
			var c7 = 0;
			for (var c5 = 0; c5 < dc.length; ++c5) {
				var c6 = dc[c5];
				if (c6.from < c9) {
					c6.domStart += (c9 - c6.from);
					c6.from = c9
				}
				if (c6.to > da) {
					c6.to = da
				}
				if (c6.from >= c6.to) {
					dc.splice(c5--, 1)
				} else {
					c7 += c6.to - c6.from
				}
			}
			if (c7 == da - c9 && c9 == cR && da == bM) {
				return
			}
			dc.sort(function(de, dd) {
				return de.domStart - dd.domStart
			});
			var c2 = bQ(),
				c0 = aI.style.display;
			ar.style.display = "none";
			aS(c9, da, dc);
			ar.style.display = aI.style.display = "";
			var c1 = c9 != cR || da != bM || bO != bl.clientHeight + c2;
			if (c1) {
				bO = bl.clientHeight + c2
			}
			cR = c9;
			bM = da;
			be = g(cz, c9);
			ch.style.top = (be * c2) + "px";
			if (bl.clientHeight) {
				bN.style.height = (cz.height * c2 + 2 * cs()) + "px"
			}
			if (ar.childNodes.length != bM - cR) {
				throw new Error("BAD PATCH! " + JSON.stringify(dc) + " size=" + (bM - cR) + " nodes=" + ar.childNodes.length)
			}
			function db() {
				aG = bl.clientWidth;
				var de = ar.firstChild,
					dd = false;
				cz.iter(cR, bM, function(dg) {
					if (!dg.hidden) {
						var df = Math.round(de.offsetHeight / c2) || 1;
						if (dg.height != df) {
							a4(dg, df);
							aT = dd = true
						}
					}
					de = de.nextSibling
				});
				if (dd) {
					bN.style.height = (cz.height * c2 + 2 * cs()) + "px"
				}
				return dd
			}
			if (b2.lineWrapping) {
				db()
			} else {
				if (aG == null) {
					aG = cu(bE)
				}
				if (aG > bl.clientWidth) {
					bv.style.width = aG + "px";
					bN.style.width = "";
					bN.style.width = bl.scrollWidth + "px"
				} else {
					bv.style.width = bN.style.width = ""
				}
			}
			aI.style.display = c0;
			if (c1 || aT) {
				aM() && b2.lineWrapping && db() && aM()
			}
			cW();
			if (!c4 && b2.onUpdate) {
				b2.onUpdate(ca)
			}
			return true
		}
		function b1(c9, c7) {
			for (var c4 = 0, c2 = c7.length || 0; c4 < c2; ++c4) {
				var c6 = c7[c4],
					c0 = [],
					c8 = c6.diff || 0;
				for (var c3 = 0, c1 = c9.length; c3 < c1; ++c3) {
					var c5 = c9[c3];
					if (c6.to <= c5.from && c6.diff) {
						c0.push({
							from: c5.from + c8,
							to: c5.to + c8,
							domStart: c5.domStart
						})
					} else {
						if (c6.to <= c5.from || c6.from >= c5.to) {
							c0.push(c5)
						} else {
							if (c6.from > c5.from) {
								c0.push({
									from: c5.from,
									to: c6.from,
									domStart: c5.domStart
								})
							}
							if (c6.to < c5.to) {
								c0.push({
									from: c6.to + c8,
									to: c5.to + c8,
									domStart: c5.domStart + (c6.to - c5.from)
								})
							}
						}
					}
				}
				c9 = c0
			}
			return c9
		}
		function aS(c9, da, dc) {
			if (!dc.length) {
				ar.innerHTML = ""
			} else {
				function c0(de) {
					var dd = de.nextSibling;
					de.parentNode.removeChild(de);
					return dd
				}
				var c4 = 0,
					c2 = ar.firstChild,
					c1;
				for (var c5 = 0; c5 < dc.length; ++c5) {
					var db = dc[c5];
					while (db.domStart > c4) {
						c2 = c0(c2);
						c4++
					}
					for (var c3 = 0, c7 = db.to - db.from; c3 < c7; ++c3) {
						c2 = c2.nextSibling;
						c4++
					}
				}
				while (c2) {
					c2 = c0(c2)
				}
			}
			var c6 = dc.shift(),
				c2 = ar.firstChild,
				c3 = c9;
			var c8 = document.createElement("div");
			cz.iter(c9, da, function(dd) {
				if (c6 && c6.to == c3) {
					c6 = dc.shift()
				}
				if (!c6 || c6.from > c3) {
					if (dd.hidden) {
						var de = c8.innerHTML = "<pre></pre>"
					} else {
						var de = "<pre" + (dd.className ? ' class="' + dd.className + '"' : "") + ">" + dd.getHTML(ba) + "</pre>";
						if (dd.bgClassName) {
							de = '<div style="position: relative"><pre class="' + dd.bgClassName + '" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: -2">&#160;</pre>' + de + "</div>"
						}
					}
					c8.innerHTML = de;
					ar.insertBefore(c8.firstChild, c2)
				} else {
					c2 = c2.nextSibling
				}++c3
			})
		}
		function aM() {
			if (!b2.gutter && !b2.lineNumbers) {
				return
			}
			var c1 = ch.offsetHeight,
				c9 = bl.clientHeight;
			aI.style.height = (c1 - c9 < 2 ? c9 : c1) + "px";
			var c7 = [],
				c5 = cR,
				c8;
			cz.iter(cR, Math.max(bM, cR + 1), function(db) {
				if (db.hidden) {
					c7.push("<pre></pre>")
				} else {
					var da = db.gutterMarker;
					var dd = b2.lineNumbers ? c5 + b2.firstLineNumber : null;
					if (da && da.text) {
						dd = da.text.replace("%N%", dd != null ? dd : "")
					} else {
						if (dd == null) {
							dd = "\u00a0"
						}
					}
					c7.push((da && da.style ? '<pre class="' + da.style + '">' : "<pre>"), dd);
					for (var dc = 1; dc < db.height; ++dc) {
						c7.push("<br/>&#160;")
					}
					c7.push("</pre>");
					if (!da) {
						c8 = c5
					}
				}++c5
			});
			aI.style.display = "none";
			aZ.innerHTML = c7.join("");
			if (c8 != null) {
				var c3 = aZ.childNodes[c8 - cR];
				var c4 = String(cz.size).length,
					c0 = I(c3),
					c2 = "";
				while (c0.length + c2.length < c4) {
					c2 += "\u00a0"
				}
				if (c2) {
					c3.insertBefore(document.createTextNode(c2), c3.firstChild)
				}
			}
			aI.style.display = "";
			var c6 = Math.abs((parseInt(bv.style.marginLeft) || 0) - aI.offsetWidth) > 2;
			bv.style.marginLeft = aI.offsetWidth + "px";
			aT = false;
			return c6
		}
		function cW() {
			var c3 = ae(cX.from, cX.to);
			var de = cS(cX.from, true);
			var c9 = c3 ? de : cS(cX.to, true);
			var c7 = cX.inverted ? de : c9,
				c1 = bQ();
			var c0 = al(aE),
				c2 = al(ar);
			bY.style.top = Math.max(0, Math.min(bl.offsetHeight, c7.y + c2.top - c0.top)) + "px";
			bY.style.left = Math.max(0, Math.min(bl.offsetWidth, c7.x + c2.left - c0.left)) + "px";
			if (c3) {
				bd.style.top = c7.y + "px";
				bd.style.left = (b2.lineWrapping ? Math.min(c7.x, bv.offsetWidth) : c7.x) + "px";
				bd.style.display = "";
				bh.style.display = "none"
			} else {
				var dc = de.y == c9.y,
					c5 = "";
				var da = bv.clientWidth || bv.offsetWidth;
				var c6 = bv.clientHeight || bv.offsetHeight;

				function dd(dj, di, dh, df) {
					var dg = F ? "width: " + (!dh ? da : da - dh - dj) + "px" : "right: " + dh + "px";
					c5 += '<div class="CodeMirror-selected" style="position: absolute; left: ' + dj + "px; top: " + di + "px; " + dg + "; height: " + df + 'px"></div>'
				}
				if (cX.from.ch && de.y >= 0) {
					var db = dc ? da - c9.x : 0;
					dd(de.x, de.y, db, c1)
				}
				var c4 = Math.max(0, de.y + (cX.from.ch ? c1 : 0));
				var c8 = Math.min(c9.y, c6) - c4;
				if (c8 > 0.2 * c1) {
					dd(0, c4, 0, c8)
				}
				if ((!dc || !cX.from.ch) && c9.y < c6 - 0.5 * c1) {
					dd(0, c9.y, da - c9.x, c1)
				}
				bh.innerHTML = c5;
				bd.style.display = "none";
				bh.style.display = ""
			}
		}
		function a5(c0) {
			if (c0) {
				cj = cj || (cX.inverted ? cX.to : cX.from)
			} else {
				cj = null
			}
		}
		function by(c2, c1) {
			var c0 = cj && aU(cj);
			if (c0) {
				if (aa(c0, c2)) {
					c2 = c0
				} else {
					if (aa(c1, c0)) {
						c1 = c0
					}
				}
			}
			bx(c2, c1);
			b7 = true
		}
		function bx(c7, c6, c0, c5) {
			cw = null;
			if (c0 == null) {
				c0 = cX.from.line;
				c5 = cX.to.line
			}
			if (ae(cX.from, c7) && ae(cX.to, c6)) {
				return
			}
			if (aa(c6, c7)) {
				var c3 = c6;
				c6 = c7;
				c7 = c3
			}
			if (c7.line != c0) {
				var c4 = bS(c7, c0, cX.from.ch);
				if (!c4) {
					cL(c7.line, false)
				} else {
					c7 = c4
				}
			}
			if (c6.line != c5) {
				c6 = bS(c6, c5, cX.to.ch)
			}
			if (ae(c7, c6)) {
				cX.inverted = false
			} else {
				if (ae(c7, cX.to)) {
					cX.inverted = false
				} else {
					if (ae(c6, cX.from)) {
						cX.inverted = true
					}
				}
			}
			if (b2.autoClearEmptyLines && ae(cX.from, cX.to)) {
				var c2 = cX.inverted ? c7 : c6;
				if (c2.line != cX.from.line && cX.from.line < cz.size) {
					var c1 = cG(cX.from.line);
					if (/^\s+$/.test(c1.text)) {
						setTimeout(at(function() {
							if (c1.parent && /^\s+$/.test(c1.text)) {
								var c8 = Z(c1);
								bR("", {
									line: c8,
									ch: 0
								}, {
									line: c8,
									ch: c1.text.length
								})
							}
						}, 10))
					}
				}
			}
			cX.from = c7;
			cX.to = c6;
			aQ = true
		}
		function bS(c5, c1, c2) {
			function c4(c8) {
				var da = c5.line + c8,
					c7 = c8 == 1 ? cz.size : -1;
				while (da != c7) {
					var c6 = cG(da);
					if (!c6.hidden) {
						var c9 = c5.ch;
						if (c3 || c9 > c2 || c9 > c6.text.length) {
							c9 = c6.text.length
						}
						return {
							line: da,
							ch: c9
						}
					}
					da += c8
				}
			}
			var c0 = cG(c5.line);
			var c3 = c5.ch == c0.text.length && c5.ch != c2;
			if (!c0.hidden) {
				return c5
			}
			if (c5.line >= c1) {
				return c4(1) || c4(-1)
			} else {
				return c4(-1) || c4(1)
			}
		}
		function a7(c0, c2, c1) {
			var c3 = aU({
				line: c0,
				ch: c2 || 0
			});
			(c1 ? by : bx)(c3, c3)
		}
		function b0(c0) {
			return Math.max(0, Math.min(c0, cz.size - 1))
		}
		function aU(c2) {
			if (c2.line < 0) {
				return {
					line: 0,
					ch: 0
				}
			}
			if (c2.line >= cz.size) {
				return {
					line: cz.size - 1,
					ch: cG(cz.size - 1).text.length
				}
			}
			var c0 = c2.ch,
				c1 = cG(c2.line).text.length;
			if (c0 == null || c0 > c1) {
				return {
					line: c2.line,
					ch: c1
				}
			} else {
				if (c0 < 0) {
					return {
						line: c2.line,
						ch: 0
					}
				} else {
					return c2
				}
			}
		}
		function cp(c3, c7) {
			var c4 = cX.inverted ? cX.from : cX.to,
				c8 = c4.line,
				c0 = c4.ch;
			var c6 = cG(c8);

			function c1() {
				for (var c9 = c8 + c3, db = c3 < 0 ? -1 : cz.size; c9 != db; c9 += c3) {
					var da = cG(c9);
					if (!da.hidden) {
						c8 = c9;
						c6 = da;
						return true
					}
				}
			}
			function c5(c9) {
				if (c0 == (c3 < 0 ? 0 : c6.text.length)) {
					if (!c9 && c1()) {
						c0 = c3 < 0 ? c6.text.length : 0
					} else {
						return false
					}
				} else {
					c0 += c3
				}
				return true
			}
			if (c7 == "char") {
				c5()
			} else {
				if (c7 == "column") {
					c5(true)
				} else {
					if (c7 == "word") {
						var c2 = false;
						for (;;) {
							if (c3 < 0) {
								if (!c5()) {
									break
								}
							}
							if (ah(c6.text.charAt(c0))) {
								c2 = true
							} else {
								if (c2) {
									if (c3 < 0) {
										c3 = 1;
										c5()
									}
									break
								}
							}
							if (c3 > 0) {
								if (!c5()) {
									break
								}
							}
						}
					}
				}
			}
			return {
				line: c8,
				ch: c0
			}
		}
		function cF(c0, c1) {
			var c2 = c0 < 0 ? cX.from : cX.to;
			if (cj || ae(cX.from, cX.to)) {
				c2 = cp(c0, c1)
			}
			a7(c2.line, c2.ch, true)
		}
		function cn(c0, c1) {
			if (!ae(cX.from, cX.to)) {
				bR("", cX.from, cX.to)
			} else {
				if (c0 < 0) {
					bR("", cp(c0, c1), cX.to)
				} else {
					bR("", cX.from, cp(c0, c1))
				}
			}
			b7 = true
		}
		var cw = null;

		function cy(c0, c1) {
			var c3 = 0,
				c4 = cS(cX.inverted ? cX.from : cX.to, true);
			if (cw != null) {
				c4.x = cw
			}
			if (c1 == "page") {
				c3 = Math.min(bl.clientHeight, window.innerHeight || document.documentElement.clientHeight)
			} else {
				if (c1 == "line") {
					c3 = bQ()
				}
			}
			var c2 = bI(c4.x, c4.y + c3 * c0 + 2);
			if (c1 == "page") {
				bl.scrollTop += cS(c2, true).y - c4.y
			}
			a7(c2.line, c2.ch, true);
			cw = c4.x
		}
		function bJ(c3) {
			var c1 = cG(c3.line).text;
			var c2 = c3.ch,
				c0 = c3.ch;
			while (c2 > 0 && ah(c1.charAt(c2 - 1))) {
				--c2
			}
			while (c0 < c1.length && ah(c1.charAt(c0))) {
				++c0
			}
			by({
				line: c3.line,
				ch: c2
			}, {
				line: c3.line,
				ch: c0
			})
		}
		function aL(c0) {
			by({
				line: c0,
				ch: 0
			}, aU({
				line: c0 + 1,
				ch: 0
			}))
		}
		function cC(c2) {
			if (ae(cX.from, cX.to)) {
				return bz(cX.from.line, c2)
			}
			var c1 = cX.to.line - (cX.to.ch ? 0 : 1);
			for (var c0 = cX.from.line; c0 <= c1; ++c0) {
				bz(c0, c2)
			}
		}
		function bz(c2, c9) {
			if (!c9) {
				c9 = "add"
			}
			if (c9 == "smart") {
				if (!cc.indent) {
					c9 = "prev"
				} else {
					var c0 = cv(c2)
				}
			}
			var da = cG(c2),
				c4 = da.indentation(b2.tabSize),
				c1 = da.text.match(/^\s*/)[0],
				c6;
			if (c9 == "prev") {
				if (c2) {
					c6 = cG(c2 - 1).indentation(b2.tabSize)
				} else {
					c6 = 0
				}
			} else {
				if (c9 == "smart") {
					c6 = cc.indent(c0, da.text.slice(c1.length), da.text)
				} else {
					if (c9 == "add") {
						c6 = c4 + b2.indentUnit
					} else {
						if (c9 == "subtract") {
							c6 = c4 - b2.indentUnit
						}
					}
				}
			}
			c6 = Math.max(0, c6);
			var c8 = c6 - c4;
			if (!c8) {
				if (cX.from.line != c2 && cX.to.line != c2) {
					return
				}
				var c7 = c1
			} else {
				var c7 = "",
					c5 = 0;
				if (b2.indentWithTabs) {
					for (var c3 = Math.floor(c6 / b2.tabSize); c3; --c3) {
						c5 += b2.tabSize;
						c7 += "\t"
					}
				}
				while (c5 < c6) {
					++c5;
					c7 += " "
				}
			}
			bR(c7, {
				line: c2,
				ch: 0
			}, {
				line: c2,
				ch: c1.length
			})
		}
		function bU() {
			cc = v.getMode(b2, b2.mode);
			cz.iter(0, cz.size, function(c0) {
				c0.stateAfter = null
			});
			ci = [0];
			bH()
		}
		function bf() {
			var c0 = b2.gutter || b2.lineNumbers;
			aI.style.display = c0 ? "" : "none";
			if (c0) {
				aT = true
			} else {
				ar.parentNode.style.marginLeft = 0
			}
		}
		function cH(c2, c1) {
			if (b2.lineWrapping) {
				aE.className += " CodeMirror-wrap";
				var c0 = bl.clientWidth / bi() - 3;
				cz.iter(0, cz.size, function(c3) {
					if (c3.hidden) {
						return
					}
					var c4 = Math.ceil(c3.text.length / c0) || 1;
					if (c4 != 1) {
						a4(c3, c4)
					}
				});
				bv.style.width = bN.style.width = ""
			} else {
				aE.className = aE.className.replace(" CodeMirror-wrap", "");
				aG = null;
				bE = "";
				cz.iter(0, cz.size, function(c3) {
					if (c3.height != 1 && !c3.hidden) {
						a4(c3, 1)
					}
					if (c3.text.length > bE.length) {
						bE = c3.text
					}
				})
			}
			aC.push({
				from: 0,
				to: cz.size
			})
		}
		function ba(c1) {
			var c0 = b2.tabSize - c1 % b2.tabSize,
				c3 = aq[c0];
			if (c3) {
				return c3
			}
			for (var c4 = '<span class="cm-tab">', c2 = 0; c2 < c0; ++c2) {
				c4 += " "
			}
			return (aq[c0] = {
				html: c4 + "</span>",
				width: c0
			})
		}
		function cE() {
			bl.className = bl.className.replace(/\s*cm-s-\S+/g, "") + b2.theme.replace(/(^|\s)\s*/g, " cm-s-")
		}
		function cY() {
			this.set = []
		}
		cY.prototype.clear = at(function() {
			var c5 = Infinity,
				c1 = -Infinity;
			for (var c4 = 0, c7 = this.set.length; c4 < c7; ++c4) {
				var c2 = this.set[c4],
					c0 = c2.marked;
				if (!c0 || !c2.parent) {
					continue
				}
				var c6 = Z(c2);
				c5 = Math.min(c5, c6);
				c1 = Math.max(c1, c6);
				for (var c3 = 0; c3 < c0.length; ++c3) {
					if (c0[c3].marker == this) {
						c0.splice(c3--, 1)
					}
				}
			}
			if (c5 != Infinity) {
				aC.push({
					from: c5,
					to: c1 + 1
				})
			}
		});
		cY.prototype.find = function() {
			var c5, c6;
			for (var c2 = 0, c4 = this.set.length; c2 < c4; ++c2) {
				var c8 = this.set[c2],
					c3 = c8.marked;
				for (var c1 = 0; c1 < c3.length; ++c1) {
					var c0 = c3[c1];
					if (c0.marker == this) {
						if (c0.from != null || c0.to != null) {
							var c7 = Z(c8);
							if (c7 != null) {
								if (c0.from != null) {
									c5 = {
										line: c7,
										ch: c0.from
									}
								}
								if (c0.to != null) {
									c6 = {
										line: c7,
										ch: c0.to
									}
								}
							}
						}
					}
				}
			}
			return {
				from: c5,
				to: c6
			}
		};

		function bF(c6, c5, c2) {
			c6 = aU(c6);
			c5 = aU(c5);
			var c0 = new cY();
			if (!aa(c6, c5)) {
				return c0
			}
			function c4(c7, da, c9, c8) {
				cG(c7).addMark(new L(da, c9, c8, c0))
			}
			if (c6.line == c5.line) {
				c4(c6.line, c6.ch, c5.ch, c2)
			} else {
				c4(c6.line, c6.ch, null, c2);
				for (var c1 = c6.line + 1, c3 = c5.line; c1 < c3; ++c1) {
					c4(c1, null, null, c2)
				}
				c4(c5.line, null, c5.ch, c2)
			}
			aC.push({
				from: c6.line,
				to: c5.line + 1
			});
			return c0
		}
		function aV(c1) {
			c1 = aU(c1);
			var c0 = new H(c1.ch);
			cG(c1.line).addMark(c0);
			return c0
		}
		function bp(c5) {
			c5 = aU(c5);
			var c4 = [],
				c2 = cG(c5.line).marked;
			if (!c2) {
				return c4
			}
			for (var c1 = 0, c3 = c2.length; c1 < c3; ++c1) {
				var c0 = c2[c1];
				if ((c0.from == null || c0.from <= c5.ch) && (c0.to == null || c0.to >= c5.ch)) {
					c4.push(c0.marker || c0)
				}
			}
			return c4
		}
		function bW(c0, c2, c1) {
			if (typeof c0 == "number") {
				c0 = cG(b0(c0))
			}
			c0.gutterMarker = {
				text: c2,
				style: c1
			};
			aT = true;
			return c0
		}
		function av(c0) {
			if (typeof c0 == "number") {
				c0 = cG(b0(c0))
			}
			c0.gutterMarker = null;
			aT = true
		}
		function aY(c1, c3) {
			var c2 = c1,
				c0 = c1;
			if (typeof c1 == "number") {
				c0 = cG(b0(c1))
			} else {
				c2 = Z(c1)
			}
			if (c2 == null) {
				return null
			}
			if (c3(c0, c2)) {
				aC.push({
					from: c2,
					to: c2 + 1
				})
			} else {
				return null
			}
			return c0
		}
		function bm(c1, c0, c2) {
			return aY(c1, function(c3) {
				if (c3.className != c0 || c3.bgClassName != c2) {
					c3.className = c0;
					c3.bgClassName = c2;
					return true
				}
			})
		}
		function cL(c1, c0) {
			return aY(c1, function(c2, c5) {
				if (c2.hidden != c0) {
					c2.hidden = c0;
					a4(c2, c0 ? 0 : 1);
					var c4 = cX.from.line,
						c3 = cX.to.line;
					if (c0 && (c4 == c5 || c3 == c5)) {
						var c7 = c4 == c5 ? bS({
							line: c4,
							ch: 0
						}, c4, 0) : cX.from;
						var c6 = c3 == c5 ? bS({
							line: c3,
							ch: 0
						}, c3, 0) : cX.to;
						if (!c6) {
							return
						}
						bx(c7, c6)
					}
					return (aT = true)
				}
			})
		}
		function aW(c1) {
			if (typeof c1 == "number") {
				if (!bs(c1)) {
					return null
				}
				var c2 = c1;
				c1 = cG(c1);
				if (!c1) {
					return null
				}
			} else {
				var c2 = Z(c1);
				if (c2 == null) {
					return null
				}
			}
			var c0 = c1.gutterMarker;
			return {
				line: c2,
				handle: c1,
				text: c1.text,
				markerText: c0 && c0.text,
				markerClass: c0 && c0.style,
				lineClass: c1.className,
				bgClass: c1.bgClassName
			}
		}
		function cu(c0) {
			aw.innerHTML = "<pre><span>x</span></pre>";
			aw.firstChild.firstChild.firstChild.nodeValue = c0;
			return aw.firstChild.firstChild.offsetWidth || 10
		}
		function aH(dc, c6) {
			if (c6 <= 0) {
				return 0
			}
			var c3 = cG(dc),
				c9 = c3.text;

			function da(dd) {
				return b6(c3, dd).left
			}
			var c7 = 0,
				c5 = 0,
				c8 = c9.length,
				c4;
			var c1 = Math.min(c8, Math.ceil(c6 / bi()));
			for (;;) {
				var c2 = da(c1);
				if (c2 <= c6 && c1 < c8) {
					c1 = Math.min(c8, Math.ceil(c1 * 1.2))
				} else {
					c4 = c2;
					c8 = c1;
					break
				}
			}
			if (c6 > c4) {
				return c8
			}
			c1 = Math.floor(c8 * 0.8);
			c2 = da(c1);
			if (c2 < c6) {
				c7 = c1;
				c5 = c2
			}
			for (;;) {
				if (c8 - c7 <= 1) {
					return (c4 - c6 > c6 - c5) ? c7 : c8
				}
				var db = Math.ceil((c7 + c8) / 2),
					c0 = da(db);
				if (c0 > c6) {
					c8 = db;
					c4 = c0
				} else {
					c7 = db;
					c5 = c0
				}
			}
		}
		var cA = "CodeMirror-temp-" + Math.floor(Math.random() * 16777215).toString(16);

		function b6(c1, c4) {
			if (c4 == 0) {
				return {
					top: 0,
					left: 0
				}
			}
			var c0 = b2.lineWrapping && c4 < c1.text.length && o.test(c1.text.slice(c4 - 1, c4 + 1));
			aw.innerHTML = "<pre>" + c1.getHTML(ba, c4, cA, c0) + "</pre>";
			var c3 = document.getElementById(cA);
			var c6 = c3.offsetTop,
				c5 = c3.offsetLeft;
			if (J && c6 == 0 && c5 == 0) {
				var c2 = document.createElement("span");
				c2.innerHTML = "x";
				c3.parentNode.insertBefore(c2, c3.nextSibling);
				c6 = c2.offsetTop
			}
			return {
				top: c6,
				left: c5
			}
		}
		function cS(c5, c3) {
			var c0, c1 = bQ(),
				c4 = c1 * (g(cz, c5.line) - (c3 ? be : 0));
			if (c5.ch == 0) {
				c0 = 0
			} else {
				var c2 = b6(cG(c5.line), c5.ch);
				c0 = c2.left;
				if (b2.lineWrapping) {
					c4 += Math.max(0, c2.top)
				}
			}
			return {
				x: c0,
				y: c4,
				yBot: c4 + c1
			}
		}
		function bI(c9, c8) {
			if (c8 < 0) {
				c8 = 0
			}
			var c6 = bQ(),
				c4 = bi(),
				df = be + Math.floor(c8 / c6);
			var da = Y(cz, df);
			if (da >= cz.size) {
				return {
					line: cz.size - 1,
					ch: cG(cz.size - 1).text.length
				}
			}
			var c1 = cG(da),
				dc = c1.text;
			var dh = b2.lineWrapping,
				c7 = dh ? df - g(cz, da) : 0;
			if (c9 <= 0 && c7 == 0) {
				return {
					line: da,
					ch: 0
				}
			}
			function dg(dj) {
				var dk = b6(c1, dj);
				if (dh) {
					var dl = Math.round(dk.top / c6);
					return Math.max(0, dk.left + (dl - c7) * bl.clientWidth)
				}
				return dk.left
			}
			var de = 0,
				dd = 0,
				c2 = dc.length,
				c0;
			var db = Math.min(c2, Math.ceil((c9 + c7 * bl.clientWidth * 0.9) / c4));
			for (;;) {
				var c5 = dg(db);
				if (c5 <= c9 && db < c2) {
					db = Math.min(c2, Math.ceil(db * 1.2))
				} else {
					c0 = c5;
					c2 = db;
					break
				}
			}
			if (c9 > c0) {
				return {
					line: da,
					ch: c2
				}
			}
			db = Math.floor(c2 * 0.8);
			c5 = dg(db);
			if (c5 < c9) {
				de = db;
				dd = c5
			}
			for (;;) {
				if (c2 - de <= 1) {
					return {
						line: da,
						ch: (c0 - c9 > c9 - dd) ? de : c2
					}
				}
				var di = Math.ceil((de + c2) / 2),
					c3 = dg(di);
				if (c3 > c9) {
					c2 = di;
					c0 = c3
				} else {
					de = di;
					dd = c3
				}
			}
		}
		function ap(c2) {
			var c0 = cS(c2, true),
				c1 = al(bv);
			return {
				x: c1.left + c0.x,
				y: c1.top + c0.y,
				yBot: c1.top + c0.yBot
			}
		}
		var a1, ay, bV;

		function bQ() {
			if (bV == null) {
				bV = "<pre>";
				for (var c1 = 0; c1 < 49; ++c1) {
					bV += "x<br/>"
				}
				bV += "x</pre>"
			}
			var c0 = ar.clientHeight;
			if (c0 == ay) {
				return a1
			}
			ay = c0;
			aw.innerHTML = bV;
			a1 = aw.firstChild.offsetHeight / 50 || 1;
			aw.innerHTML = "";
			return a1
		}
		var cT, bw = 0;

		function bi() {
			if (bl.clientWidth == bw) {
				return cT
			}
			bw = bl.clientWidth;
			return (cT = cu("x"))
		}
		function cs() {
			return bv.offsetTop
		}
		function a6() {
			return bv.offsetLeft
		}
		function a3(c4, c3) {
			var c2 = al(bl, true),
				c0, c5;
			try {
				c0 = c4.clientX;
				c5 = c4.clientY
			} catch (c4) {
				return null
			}
			if (!c3 && (c0 - c2.left > bl.clientWidth || c5 - c2.top > bl.clientHeight)) {
				return null
			}
			var c1 = al(bv, true);
			return bI(c0 - c1.left, c5 - c1.top)
		}
		function a2(c1) {
			var c6 = a3(c1),
				c5 = bl.scrollTop;
			if (!c6 || window.opera) {
				return
			}
			if (ae(cX.from, cX.to) || aa(c6, cX.from) || !aa(c6, cX.to)) {
				at(a7)(c6.line, c6.ch)
			}
			var c4 = bn.style.cssText;
			bY.style.position = "absolute";
			bn.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (c1.clientY - 5) + "px; left: " + (c1.clientX - 5) + "px; z-index: 1000; background: white; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
			bg = true;
			var c3 = bn.value = b4();
			bA();
			a(bn);

			function c0() {
				var c7 = B(bn.value).join("\n");
				if (c7 != c3) {
					at(bt)(c7, "end")
				}
				bY.style.position = "relative";
				bn.style.cssText = c4;
				if (C) {
					bl.scrollTop = c5
				}
				bg = false;
				cD(true);
				an()
			}
			if (O) {
				x(c1);
				var c2 = s(window, "mouseup", function() {
					c2();
					setTimeout(c0, 20)
				}, true)
			} else {
				setTimeout(c0, 50)
			}
		}
		function cN() {
			clearInterval(cQ);
			var c0 = true;
			bd.style.visibility = "";
			cQ = setInterval(function() {
				bd.style.visibility = (c0 = !c0) ? "" : "hidden"
			}, 650)
		}
		var bq = {
			"(": ")>",
			")": "(<",
			"[": "]>",
			"]": "[<",
			"{": "}>",
			"}": "{<"
		};

		function cf(c6) {
			var c0 = cX.inverted ? cX.from : cX.to,
				c8 = cG(c0.line),
				c1 = c0.ch - 1;
			var c5 = (c1 >= 0 && bq[c8.text.charAt(c1)]) || bq[c8.text.charAt(++c1)];
			if (!c5) {
				return
			}
			var c9 = c5.charAt(0),
				c7 = c5.charAt(1) == ">",
				dj = c7 ? 1 : -1,
				de = c8.styles;
			for (var dk = c1 + 1, dg = 0, di = de.length; dg < di; dg += 2) {
				if ((dk -= de[dg].length) <= 0) {
					var dh = de[dg + 1];
					break
				}
			}
			var c3 = [c8.text.charAt(c1)],
				dd = /[(){}[\]]/;

			function db(dx, ds, dt) {
				if (!dx.text) {
					return
				}
				var dw = dx.styles,
					dr = c7 ? 0 : dx.text.length - 1,
					du;
				for (var dn = c7 ? 0 : dw.length - 2, dq = c7 ? dw.length : -2; dn != dq; dn += 2 * dj) {
					var dv = dw[dn];
					if (dw[dn + 1] != null && dw[dn + 1] != dh) {
						dr += dj * dv.length;
						continue
					}
					for (var dm = c7 ? 0 : dv.length - 1, dl = c7 ? dv.length : -1; dm != dl; dm += dj, dr += dj) {
						if (dr >= ds && dr < dt && dd.test(du = dv.charAt(dm))) {
							var dp = bq[du];
							if (dp.charAt(1) == ">" == c7) {
								c3.push(du)
							} else {
								if (c3.pop() != dp.charAt(0)) {
									return {
										pos: dr,
										match: false
									}
								} else {
									if (!c3.length) {
										return {
											pos: dr,
											match: true
										}
									}
								}
							}
						}
					}
				}
			}
			for (var dg = c0.line, di = c7 ? Math.min(dg + 100, cz.size) : Math.max(-1, dg - 100); dg != di; dg += dj) {
				var c8 = cG(dg),
					c4 = dg == c0.line;
				var da = db(c8, c4 && c7 ? c1 + 1 : 0, c4 && !c7 ? c1 : c8.text.length);
				if (da) {
					break
				}
			}
			if (!da) {
				da = {
					pos: null,
					match: false
				}
			}
			var dh = da.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
			var df = bF({
				line: c0.line,
				ch: c1
			}, {
				line: c0.line,
				ch: c1 + 1
			}, dh),
				c2 = da.pos != null && bF({
					line: dg,
					ch: da.pos
				}, {
					line: dg,
					ch: da.pos + 1
				}, dh);
			var dc = at(function() {
				df.clear();
				c2 && c2.clear()
			});
			if (c6) {
				setTimeout(dc, 800)
			} else {
				b5 = dc
			}
		}
		function a8(c6) {
			var c5, c2;
			for (var c1 = c6, c3 = c6 - 40; c1 > c3; --c1) {
				if (c1 == 0) {
					return 0
				}
				var c0 = cG(c1 - 1);
				if (c0.stateAfter) {
					return c1
				}
				var c4 = c0.indentation(b2.tabSize);
				if (c2 == null || c5 > c4) {
					c2 = c1 - 1;
					c5 = c4
				}
			}
			return c2
		}
		function cv(c2) {
			var c1 = a8(c2),
				c0 = c1 && cG(c1 - 1).stateAfter;
			if (!c0) {
				c0 = W(cc)
			} else {
				c0 = p(cc, c0)
			}
			cz.iter(c1, c2, function(c3) {
				c3.highlight(cc, c0, b2.tabSize);
				c3.stateAfter = p(cc, c0)
			});
			if (c1 < c2) {
				aC.push({
					from: c1,
					to: c2
				})
			}
			if (c2 < cz.size && !cG(c2).stateAfter) {
				ci.push(c2)
			}
			return c0
		}
		function cI(c2, c0) {
			var c1 = cv(c2);
			cz.iter(c2, c0, function(c3) {
				c3.highlight(cc, c1, b2.tabSize);
				c3.stateAfter = p(cc, c1)
			})
		}
		function bT() {
			var c6 = +new Date + b2.workTime;
			var c9 = ci.length;
			while (ci.length) {
				if (!cG(cR).stateAfter) {
					var c3 = cR
				} else {
					var c3 = ci.pop()
				}
				if (c3 >= cz.size) {
					continue
				}
				var c1 = a8(c3),
					c0 = c1 && cG(c1 - 1).stateAfter;
				if (c0) {
					c0 = p(cc, c0)
				} else {
					c0 = W(cc)
				}
				var c5 = 0,
					c2 = cc.compareStates,
					c8 = false,
					c7 = c1,
					c4 = false;
				cz.iter(c7, cz.size, function(db) {
					var dc = db.stateAfter;
					if (+new Date > c6) {
						ci.push(c7);
						bH(b2.workDelay);
						if (c8) {
							aC.push({
								from: c3,
								to: c7 + 1
							})
						}
						return (c4 = true)
					}
					var dd = db.highlight(cc, c0, b2.tabSize);
					if (dd) {
						c8 = true
					}
					db.stateAfter = p(cc, c0);
					var da = null;
					if (c2) {
						var de = dc && c2(dc, c0);
						if (de != ac) {
							da = !! de
						}
					}
					if (da == null) {
						if (dd !== false || !dc) {
							c5 = 0
						} else {
							if (++c5 > 3 && (!cc.indent || cc.indent(dc, "") == cc.indent(c0, ""))) {
								da = true
							}
						}
					}
					if (da) {
						return true
					}++c7
				});
				if (c4) {
					return
				}
				if (c8) {
					aC.push({
						from: c3,
						to: c7 + 1
					})
				}
			}
			if (c9 && b2.onHighlightComplete) {
				b2.onHighlightComplete(ca)
			}
		}
		function bH(c0) {
			if (!ci.length) {
				return
			}
			ax.set(c0, at(bT))
		}
		function aO() {
			cq = b7 = cO = null;
			aC = [];
			aQ = false;
			cB = []
		}
		function az() {
			var c4 = false,
				c1;
			if (aQ) {
				c4 = !cg()
			}
			if (aC.length) {
				c1 = ce(aC, true)
			} else {
				if (aQ) {
					cW()
				}
				if (aT) {
					aM()
				}
			}
			if (c4) {
				cg()
			}
			if (aQ) {
				cZ();
				cN()
			}
			if (ck && !bg && (cq === true || (cq !== false && aQ))) {
				cD(b7)
			}
			if (aQ && b2.matchBrackets) {
				setTimeout(at(function() {
					if (b5) {
						b5();
						b5 = null
					}
					if (ae(cX.from, cX.to)) {
						cf(false)
					}
				}), 20)
			}
			var c0 = cO,
				c2 = cB;
			if (aQ && b2.onCursorActivity) {
				b2.onCursorActivity(ca)
			}
			if (c0 && b2.onChange && ca) {
				b2.onChange(ca, c0)
			}
			for (var c3 = 0; c3 < c2.length; ++c3) {
				c2[c3](ca)
			}
			if (c1 && b2.onUpdate) {
				b2.onUpdate(ca)
			}
		}
		var cr = 0;

		function at(c0) {
			return function() {
				if (!cr++) {
					aO()
				}
				try {
					var c1 = c0.apply(this, arguments)
				} finally {
					if (!--cr) {
						az()
					}
				}
				return c1
			}
		}
		function bP(c0) {
			a9.startCompound();
			try {
				return c0()
			} finally {
				a9.endCompound()
			}
		}
		for (var bK in ad) {
			if (ad.propertyIsEnumerable(bK) && !ca.propertyIsEnumerable(bK)) {
				ca[bK] = ad[bK]
			}
		}
		return ca
	}
	v.defaults = {
		value: "",
		mode: null,
		theme: "default",
		indentUnit: 2,
		indentWithTabs: false,
		smartIndent: true,
		tabSize: 4,
		keyMap: "default",
		extraKeys: null,
		electricChars: true,
		autoClearEmptyLines: false,
		onKeyEvent: null,
		onDragEvent: null,
		lineWrapping: false,
		lineNumbers: false,
		gutter: false,
		fixedGutter: false,
		firstLineNumber: 1,
		readOnly: false,
		dragDrop: true,
		onChange: null,
		onCursorActivity: null,
		onGutterClick: null,
		onHighlightComplete: null,
		onUpdate: null,
		onFocus: null,
		onBlur: null,
		onScroll: null,
		matchBrackets: false,
		workTime: 100,
		workDelay: 200,
		pollInterval: 100,
		undoDepth: 40,
		tabindex: null,
		autofocus: null
	};
	var t = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
	var N = t || /Mac/.test(navigator.platform);
	var V = /Win/.test(navigator.platform);
	var ak = v.modes = {}, T = v.mimeModes = {};
	v.defineMode = function(an, ap) {
		if (!v.defaults.mode && an != "null") {
			v.defaults.mode = an
		}
		if (arguments.length > 2) {
			ap.dependencies = [];
			for (var ao = 2; ao < arguments.length; ++ao) {
				ap.dependencies.push(arguments[ao])
			}
		}
		ak[an] = ap
	};
	v.defineMIME = function(ao, an) {
		T[ao] = an
	};
	v.resolveMode = function(an) {
		if (typeof an == "string" && T.hasOwnProperty(an)) {
			an = T[an]
		} else {
			if (typeof an == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(an)) {
				return v.resolveMode("application/xml")
			}
		}
		if (typeof an == "string") {
			return {
				name: an
			}
		} else {
			return an || {
				name: "null"
			}
		}
	};
	v.getMode = function(ao, an) {
		var an = v.resolveMode(an);
		var ap = ak[an.name];
		if (!ap) {
			return v.getMode(ao, "text/plain")
		}
		return ap(ao, an)
	};
	v.listModes = function() {
		var ao = [];
		for (var an in ak) {
			if (ak.propertyIsEnumerable(an)) {
				ao.push(an)
			}
		}
		return ao
	};
	v.listMIMEs = function() {
		var ao = [];
		for (var an in T) {
			if (T.propertyIsEnumerable(an)) {
				ao.push({
					mime: an,
					mode: T[an]
				})
			}
		}
		return ao
	};
	var ad = v.extensions = {};
	v.defineExtension = function(an, ao) {
		ad[an] = ao
	};
	var M = v.commands = {
		selectAll: function(an) {
			an.setSelection({
				line: 0,
				ch: 0
			}, {
				line: an.lineCount() - 1
			})
		},
		killLine: function(an) {
			var aq = an.getCursor(true),
				ap = an.getCursor(false),
				ao = !ae(aq, ap);
			if (!ao && an.getLine(aq.line).length == aq.ch) {
				an.replaceRange("", aq, {
					line: aq.line + 1,
					ch: 0
				})
			} else {
				an.replaceRange("", aq, ao ? ap : {
					line: aq.line
				})
			}
		},
		deleteLine: function(an) {
			var ao = an.getCursor().line;
			an.replaceRange("", {
				line: ao,
				ch: 0
			}, {
				line: ao
			})
		},
		undo: function(an) {
			an.undo()
		},
		redo: function(an) {
			an.redo()
		},
		goDocStart: function(an) {
			an.setCursor(0, 0, true)
		},
		goDocEnd: function(an) {
			an.setSelection({
				line: an.lineCount() - 1
			}, null, true)
		},
		goLineStart: function(an) {
			an.setCursor(an.getCursor().line, 0, true)
		},
		goLineStartSmart: function(an) {
			var aq = an.getCursor();
			var ap = an.getLine(aq.line),
				ao = Math.max(0, ap.search(/\S/));
			an.setCursor(aq.line, aq.ch <= ao && aq.ch ? 0 : ao, true)
		},
		goLineEnd: function(an) {
			an.setSelection({
				line: an.getCursor().line
			}, null, true)
		},
		goLineUp: function(an) {
			an.moveV(-1, "line")
		},
		goLineDown: function(an) {
			an.moveV(1, "line")
		},
		goPageUp: function(an) {
			an.moveV(-1, "page")
		},
		goPageDown: function(an) {
			an.moveV(1, "page")
		},
		goCharLeft: function(an) {
			an.moveH(-1, "char")
		},
		goCharRight: function(an) {
			an.moveH(1, "char")
		},
		goColumnLeft: function(an) {
			an.moveH(-1, "column")
		},
		goColumnRight: function(an) {
			an.moveH(1, "column")
		},
		goWordLeft: function(an) {
			an.moveH(-1, "word")
		},
		goWordRight: function(an) {
			an.moveH(1, "word")
		},
		delCharLeft: function(an) {
			an.deleteH(-1, "char")
		},
		delCharRight: function(an) {
			an.deleteH(1, "char")
		},
		delWordLeft: function(an) {
			an.deleteH(-1, "word")
		},
		delWordRight: function(an) {
			an.deleteH(1, "word")
		},
		indentAuto: function(an) {
			an.indentSelection("smart")
		},
		indentMore: function(an) {
			an.indentSelection("add")
		},
		indentLess: function(an) {
			an.indentSelection("subtract")
		},
		insertTab: function(an) {
			an.replaceSelection("\t", "end")
		},
		transposeChars: function(an) {
			var ap = an.getCursor(),
				ao = an.getLine(ap.line);
			if (ap.ch > 0 && ap.ch < ao.length - 1) {
				an.replaceRange(ao.charAt(ap.ch) + ao.charAt(ap.ch - 1), {
					line: ap.line,
					ch: ap.ch - 1
				}, {
					line: ap.line,
					ch: ap.ch + 1
				})
			}
		},
		newlineAndIndent: function(an) {
			an.replaceSelection("\n", "end");
			an.indentLine(an.getCursor().line)
		},
		toggleOverwrite: function(an) {
			an.toggleOverwrite()
		}
	};
	var w = v.keyMap = {};
	w.basic = {
		Left: "goCharLeft",
		Right: "goCharRight",
		Up: "goLineUp",
		Down: "goLineDown",
		End: "goLineEnd",
		Home: "goLineStartSmart",
		PageUp: "goPageUp",
		PageDown: "goPageDown",
		Delete: "delCharRight",
		Backspace: "delCharLeft",
		Tab: "insertTab",
		"Shift-Tab": "indentAuto",
		Enter: "newlineAndIndent",
		Insert: "toggleOverwrite"
	};
	w.pcDefault = {
		"Ctrl-A": "selectAll",
		"Ctrl-D": "deleteLine",
		"Ctrl-Z": "undo",
		"Shift-Ctrl-Z": "redo",
		"Ctrl-Y": "redo",
		"Ctrl-Home": "goDocStart",
		"Alt-Up": "goDocStart",
		"Ctrl-End": "goDocEnd",
		"Ctrl-Down": "goDocEnd",
		"Ctrl-Left": "goWordLeft",
		"Ctrl-Right": "goWordRight",
		"Alt-Left": "goLineStart",
		"Alt-Right": "goLineEnd",
		"Ctrl-Backspace": "delWordLeft",
		"Ctrl-Delete": "delWordRight",
		"Ctrl-S": "save",
		"Ctrl-F": "find",
		"Ctrl-G": "findNext",
		"Shift-Ctrl-G": "findPrev",
		"Shift-Ctrl-F": "replace",
		"Shift-Ctrl-R": "replaceAll",
		"Ctrl-[": "indentLess",
		"Ctrl-]": "indentMore",
		fallthrough: "basic"
	};
	w.macDefault = {
		"Cmd-A": "selectAll",
		"Cmd-D": "deleteLine",
		"Cmd-Z": "undo",
		"Shift-Cmd-Z": "redo",
		"Cmd-Y": "redo",
		"Cmd-Up": "goDocStart",
		"Cmd-End": "goDocEnd",
		"Cmd-Down": "goDocEnd",
		"Alt-Left": "goWordLeft",
		"Alt-Right": "goWordRight",
		"Cmd-Left": "goLineStart",
		"Cmd-Right": "goLineEnd",
		"Alt-Backspace": "delWordLeft",
		"Ctrl-Alt-Backspace": "delWordRight",
		"Alt-Delete": "delWordRight",
		"Cmd-S": "save",
		"Cmd-F": "find",
		"Cmd-G": "findNext",
		"Shift-Cmd-G": "findPrev",
		"Cmd-Alt-F": "replace",
		"Shift-Cmd-Alt-F": "replaceAll",
		"Cmd-[": "indentLess",
		"Cmd-]": "indentMore",
		fallthrough: ["basic", "emacsy"]
	};
	w["default"] = N ? w.macDefault : w.pcDefault;
	w.emacsy = {
		"Ctrl-F": "goCharRight",
		"Ctrl-B": "goCharLeft",
		"Ctrl-P": "goLineUp",
		"Ctrl-N": "goLineDown",
		"Alt-F": "goWordRight",
		"Alt-B": "goWordLeft",
		"Ctrl-A": "goLineStart",
		"Ctrl-E": "goLineEnd",
		"Ctrl-V": "goPageUp",
		"Shift-Ctrl-V": "goPageDown",
		"Ctrl-D": "delCharRight",
		"Ctrl-H": "delCharLeft",
		"Alt-D": "delWordRight",
		"Alt-Backspace": "delWordLeft",
		"Ctrl-K": "killLine",
		"Ctrl-T": "transposeChars"
	};

	function c(an) {
		if (typeof an == "string") {
			return w[an]
		} else {
			return an
		}
	}
	function l(ao, an, at, aq, ap) {
		function ar(ay) {
			ay = c(ay);
			var aw = ay[ao];
			if (aw != null && aq(aw)) {
				return true
			}
			if (ay.nofallthrough) {
				if (ap) {
					ap()
				}
				return true
			}
			var av = ay.fallthrough;
			if (av == null) {
				return false
			}
			if (Object.prototype.toString.call(av) != "[object Array]") {
				return ar(av)
			}
			for (var au = 0, ax = av.length; au < ax; ++au) {
				if (ar(av[au])) {
					return true
				}
			}
			return false
		}
		if (an && ar(an)) {
			return true
		}
		return ar(at)
	}
	function R(ao) {
		var an = S[z(ao, "keyCode")];
		return an == "Ctrl" || an == "Alt" || an == "Shift" || an == "Mod"
	}
	v.fromTextArea = function(ao, aq) {
		if (!aq) {
			aq = {}
		}
		aq.value = ao.value;
		if (!aq.tabindex && ao.tabindex) {
			aq.tabindex = ao.tabindex
		}
		if (aq.autofocus == null && ao.getAttribute("autofocus") != null) {
			aq.autofocus = true
		}
		function at() {
			ao.value = an.getValue()
		}
		if (ao.form) {
			var ar = s(ao.form, "submit", at, true);
			if (typeof ao.form.submit == "function") {
				var ap = ao.form.submit;

				function au() {
					at();
					ao.form.submit = ap;
					ao.form.submit();
					ao.form.submit = au
				}
				ao.form.submit = au
			}
		}
		ao.style.display = "none";
		var an = v(function(av) {
			ao.parentNode.insertBefore(av, ao.nextSibling)
		}, aq);
		an.save = at;
		an.getTextArea = function() {
			return ao
		};
		an.toTextArea = function() {
			at();
			ao.parentNode.removeChild(an.getWrapperElement());
			ao.style.display = "";
			if (ao.form) {
				ar();
				if (typeof ao.form.submit == "function") {
					ao.form.submit = ap
				}
			}
		};
		return an
	};

	function p(aq, an) {
		if (an === true) {
			return an
		}
		if (aq.copyState) {
			return aq.copyState(an)
		}
		var ap = {};
		for (var ar in an) {
			var ao = an[ar];
			if (ao instanceof Array) {
				ao = ao.concat([])
			}
			ap[ar] = ao
		}
		return ap
	}
	v.copyState = p;

	function W(ap, ao, an) {
		return ap.startState ? ap.startState(ao, an) : true
	}
	v.startState = W;

	function b(an, ao) {
		this.pos = this.start = 0;
		this.string = an;
		this.tabSize = ao || 8
	}
	b.prototype = {
		eol: function() {
			return this.pos >= this.string.length
		},
		sol: function() {
			return this.pos == 0
		},
		peek: function() {
			return this.string.charAt(this.pos)
		},
		next: function() {
			if (this.pos < this.string.length) {
				return this.string.charAt(this.pos++)
			}
		},
		eat: function(an) {
			var ap = this.string.charAt(this.pos);
			if (typeof an == "string") {
				var ao = ap == an
			} else {
				var ao = ap && (an.test ? an.test(ap) : an(ap))
			}
			if (ao) {
				++this.pos;
				return ap
			}
		},
		eatWhile: function(an) {
			var ao = this.pos;
			while (this.eat(an)) {}
			return this.pos > ao
		},
		eatSpace: function() {
			var an = this.pos;
			while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {
				++this.pos
			}
			return this.pos > an
		},
		skipToEnd: function() {
			this.pos = this.string.length
		},
		skipTo: function(an) {
			var ao = this.string.indexOf(an, this.pos);
			if (ao > -1) {
				this.pos = ao;
				return true
			}
		},
		backUp: function(an) {
			this.pos -= an
		},
		column: function() {
			return n(this.string, this.start, this.tabSize)
		},
		indentation: function() {
			return n(this.string, null, this.tabSize)
		},
		match: function(aq, ao, an) {
			if (typeof aq == "string") {
				function ar(at) {
					return an ? at.toLowerCase() : at
				}
				if (ar(this.string).indexOf(ar(aq), this.pos) == this.pos) {
					if (ao !== false) {
						this.pos += aq.length
					}
					return true
				}
			} else {
				var ap = this.string.slice(this.pos).match(aq);
				if (ap && ao !== false) {
					this.pos += ap[0].length
				}
				return ap
			}
		},
		current: function() {
			return this.string.slice(this.start, this.pos)
		}
	};
	v.StringStream = b;

	function L(aq, ap, ao, an) {
		this.from = aq;
		this.to = ap;
		this.style = ao;
		this.marker = an
	}
	L.prototype = {
		attach: function(an) {
			this.marker.set.push(an)
		},
		detach: function(ao) {
			var an = r(this.marker.set, ao);
			if (an > -1) {
				this.marker.set.splice(an, 1)
			}
		},
		split: function(aq, an) {
			if (this.to <= aq && this.to != null) {
				return null
			}
			var ap = this.from < aq || this.from == null ? null : this.from - aq + an;
			var ao = this.to == null ? null : this.to - aq + an;
			return new L(ap, ao, this.style, this.marker)
		},
		dup: function() {
			return new L(null, null, this.style, this.marker)
		},
		clipTo: function(ao, ar, an, aq, ap) {
			if (ao && aq > this.from && (aq < this.to || this.to == null)) {
				this.from = null
			} else {
				if (this.from != null && this.from >= ar) {
					this.from = Math.max(aq, this.from) + ap
				}
			}
			if (an && (ar < this.to || this.to == null) && (ar > this.from || this.from == null)) {
				this.to = null
			} else {
				if (this.to != null && this.to > ar) {
					this.to = aq < this.to ? this.to + ap : ar
				}
			}
		},
		isDead: function() {
			return this.from != null && this.to != null && this.from >= this.to
		},
		sameSet: function(an) {
			return this.marker == an.marker
		}
	};

	function H(an) {
		this.from = an;
		this.to = an;
		this.line = null
	}
	H.prototype = {
		attach: function(an) {
			this.line = an
		},
		detach: function(an) {
			if (this.line == an) {
				this.line = null
			}
		},
		split: function(ao, an) {
			if (ao < this.from) {
				this.from = this.to = (this.from - ao) + an;
				return this
			}
		},
		isDead: function() {
			return this.from > this.to
		},
		clipTo: function(ao, ar, an, aq, ap) {
			if ((ao || ar < this.from) && (an || aq > this.to)) {
				this.from = 0;
				this.to = -1
			} else {
				if (this.from > ar) {
					this.from = this.to = Math.max(aq, this.from) + ap
				}
			}
		},
		sameSet: function(an) {
			return false
		},
		find: function() {
			if (!this.line || !this.line.parent) {
				return null
			}
			return {
				line: Z(this.line),
				ch: this.from
			}
		},
		clear: function() {
			if (this.line) {
				var an = r(this.line.marked, this);
				if (an != -1) {
					this.line.marked.splice(an, 1)
				}
				this.line = null
			}
		}
	};

	function e(ao, an) {
		this.styles = an || [ao, null];
		this.text = ao;
		this.height = 1;
		this.marked = this.gutterMarker = this.className = this.bgClassName = this.handlers = null;
		this.stateAfter = this.parent = this.hidden = null
	}
	e.inheritMarks = function(ar, av) {
		var aq = new e(ar),
			an = av && av.marked;
		if (an) {
			for (var ap = 0; ap < an.length; ++ap) {
				if (an[ap].to == null && an[ap].style) {
					var ao = aq.marked || (aq.marked = []),
						au = an[ap];
					var at = au.dup();
					ao.push(at);
					at.attach(aq)
				}
			}
		}
		return aq
	};
	e.prototype = {
		replace: function(ar, aq, av) {
			var aw = [],
				ap = this.marked,
				at = aq == null ? this.text.length : aq;
			am(0, ar, this.styles, aw);
			if (av) {
				aw.push(av, null)
			}
			am(at, this.text.length, this.styles, aw);
			this.styles = aw;
			this.text = this.text.slice(0, ar) + av + this.text.slice(at);
			this.stateAfter = null;
			if (ap) {
				var au = av.length - (at - ar);
				for (var ao = 0; ao < ap.length; ++ao) {
					var an = ap[ao];
					an.clipTo(ar == null, ar || 0, aq == null, at, au);
					if (an.isDead()) {
						an.detach(this);
						ap.splice(ao--, 1)
					}
				}
			}
		},
		split: function(av, at) {
			var aq = [at, null],
				ao = this.marked;
			am(av, this.text.length, this.styles, aq);
			var ap = new e(at + this.text.slice(av), aq);
			if (ao) {
				for (var ar = 0; ar < ao.length; ++ar) {
					var au = ao[ar];
					var an = au.split(av, at.length);
					if (an) {
						if (!ap.marked) {
							ap.marked = []
						}
						ap.marked.push(an);
						an.attach(ap);
						if (an == au) {
							ao.splice(ar--, 1)
						}
					}
				}
			}
			return ap
		},
		append: function(ao) {
			var au = this.text.length,
				an = ao.marked,
				ar = this.marked;
			this.text += ao.text;
			am(0, ao.text.length, ao.styles, this.styles);
			if (ar) {
				for (var at = 0; at < ar.length; ++at) {
					if (ar[at].to == null) {
						ar[at].to = au
					}
				}
			}
			if (an && an.length) {
				if (!ar) {
					this.marked = ar = []
				}
				outer: for (var at = 0; at < an.length; ++at) {
					var av = an[at];
					if (!av.from) {
						for (var aq = 0; aq < ar.length; ++aq) {
							var ap = ar[aq];
							if (ap.to == au && ap.sameSet(av)) {
								ap.to = av.to == null ? null : av.to + au;
								if (ap.isDead()) {
									ap.detach(this);
									an.splice(at--, 1)
								}
								continue outer
							}
						}
					}
					ar.push(av);
					av.attach(this);
					av.from += au;
					if (av.to != null) {
						av.to += au
					}
				}
			}
		},
		fixMarkEnds: function(ao) {
			var an = this.marked,
				ar = ao.marked;
			if (!an) {
				return
			}
			for (var aq = 0; aq < an.length; ++aq) {
				var au = an[aq],
					at = au.to == null;
				if (at && ar) {
					for (var ap = 0; ap < ar.length; ++ap) {
						if (ar[ap].sameSet(au)) {
							at = false;
							break
						}
					}
				}
				if (at) {
					au.to = this.text.length
				}
			}
		},
		fixMarkStarts: function() {
			var an = this.marked;
			if (!an) {
				return
			}
			for (var ao = 0; ao < an.length; ++ao) {
				if (an[ao].from == null) {
					an[ao].from = 0
				}
			}
		},
		addMark: function(an) {
			an.attach(this);
			if (this.marked == null) {
				this.marked = []
			}
			this.marked.push(an);
			this.marked.sort(function(ap, ao) {
				return (ap.from || 0) - (ao.from || 0)
			})
		},
		highlight: function(at, ao, au) {
			var ax = new b(this.text, au),
				ay = this.styles,
				av = 0;
			var ar = false,
				ap = ay[0],
				aw;
			if (this.text == "" && at.blankLine) {
				at.blankLine(ao)
			}
			while (!ax.eol()) {
				var an = at.token(ax, ao);
				var aq = this.text.slice(ax.start, ax.pos);
				ax.start = ax.pos;
				if (av && ay[av - 1] == an) {
					ay[av - 2] += aq
				} else {
					if (aq) {
						if (!ar && (ay[av + 1] != an || (av && ay[av - 2] != aw))) {
							ar = true
						}
						ay[av++] = aq;
						ay[av++] = an;
						aw = ap;
						ap = ay[av]
					}
				}
				if (ax.pos > 5000) {
					ay[av++] = this.text.slice(ax.pos);
					ay[av++] = null;
					break
				}
			}
			if (ay.length != av) {
				ay.length = av;
				ar = true
			}
			if (av && ay[av - 2] != aw) {
				ar = true
			}
			return ar || (ay.length < 5 && this.text.length < 10 ? null : false)
		},
		getTokenAt: function(at, aq, ap) {
			var an = this.text,
				ar = new b(an);
			while (ar.pos < ap && !ar.eol()) {
				ar.start = ar.pos;
				var ao = at.token(ar, aq)
			}
			return {
				start: ar.start,
				end: ar.pos,
				string: ar.current(),
				className: ao || null,
				state: aq
			}
		},
		indentation: function(an) {
			return n(this.text, null, an)
		},
		getHTML: function(aN, an, ap, ar) {
			var ay = [],
				aw = true,
				au = 0;

			function aJ(aZ, aX) {
				if (!aZ) {
					return
				}
				if (aw && J && aZ.charAt(0) == " ") {
					aZ = "\u00a0" + aZ.slice(1)
				}
				aw = false;
				if (aZ.indexOf("\t") == -1) {
					au += aZ.length;
					var aY = Q(aZ)
				} else {
					var aY = "";
					for (var a0 = 0;;) {
						var aV = aZ.indexOf("\t", a0);
						if (aV == -1) {
							aY += Q(aZ.slice(a0));
							au += aZ.length - a0;
							break
						} else {
							au += aV - a0;
							var aW = aN(au);
							aY += Q(aZ.slice(a0, aV)) + aW.html;
							au += aW.width;
							a0 = aV + 1
						}
					}
				}
				if (aX) {
					ay.push('<span class="', aX, '">', aY, "</span>")
				} else {
					ay.push(aY)
				}
			}
			var aM = aJ;
			if (an != null) {
				var aH = 0,
					aC = '<span id="' + ap + '">';
				aM = function(aX, aW) {
					var aV = aX.length;
					if (an >= aH && an < aH + aV) {
						if (an > aH) {
							aJ(aX.slice(0, an - aH), aW);
							if (ar) {
								ay.push("<wbr>")
							}
						}
						ay.push(aC);
						aJ(aX.slice(an - aH), aW);
						ay.push("</span>");
						an--;
						aH += aV
					} else {
						aH += aV;
						aJ(aX, aW);
						if (aH == an && aH == aR) {
							ay.push(aC + "</span>")
						} else {
							if (aH > an + 10 && /\s/.test(aX)) {
								aM = function() {}
							}
						}
					}
				}
			}
			var aG = this.styles,
				ax = this.text,
				aD = this.marked;
			var aR = ax.length;

			function at(aV) {
				if (!aV) {
					return null
				}
				return "cm-" + aV.replace(/ +/g, " cm-")
			}
			if (!ax && an == null) {
				aM(" ")
			} else {
				if (!aD || !aD.length) {
					for (var aO = 0, az = 0; az < aR; aO += 2) {
						var aF = aG[aO],
							aQ = aG[aO + 1],
							aI = aF.length;
						if (az + aI > aR) {
							aF = aF.slice(0, aR - az)
						}
						az += aI;
						aM(aF, at(aQ))
					}
				} else {
					var av = 0,
						aO = 0,
						aB = "",
						aQ, aU = 0;
					var aT = aD[0].from || 0,
						aL = [],
						aS = 0;

					function aP() {
						var aV;
						while (aS < aD.length && ((aV = aD[aS]).from == av || aV.from == null)) {
							if (aV.style != null) {
								aL.push(aV)
							}++aS
						}
						aT = aS < aD.length ? aD[aS].from : Infinity;
						for (var aW = 0; aW < aL.length; ++aW) {
							var aX = aL[aW].to || Infinity;
							if (aX == av) {
								aL.splice(aW--, 1)
							} else {
								aT = Math.min(aX, aT)
							}
						}
					}
					var aE = 0;
					while (av < aR) {
						if (aT == av) {
							aP()
						}
						var aA = Math.min(aR, aT);
						while (true) {
							if (aB) {
								var aq = av + aB.length;
								var ao = aQ;
								for (var aK = 0; aK < aL.length; ++aK) {
									ao = (ao ? ao + " " : "") + aL[aK].style
								}
								aM(aq > aA ? aB.slice(0, aA - av) : aB, ao);
								if (aq >= aA) {
									aB = aB.slice(aA - av);
									av = aA;
									break
								}
								av = aq
							}
							aB = aG[aO++];
							aQ = at(aG[aO++])
						}
					}
				}
			}
			return ay.join("")
		},
		cleanUp: function() {
			this.parent = null;
			if (this.marked) {
				for (var an = 0, ao = this.marked.length; an < ao; ++an) {
					this.marked[an].detach(this)
				}
			}
		}
	};

	function am(au, av, an, aw) {
		for (var ar = 0, at = 0, ao = 0; at < av; ar += 2) {
			var ap = an[ar],
				aq = at + ap.length;
			if (ao == 0) {
				if (aq > au) {
					aw.push(ap.slice(au - at, Math.min(ap.length, av - at)), an[ar + 1])
				}
				if (aq >= au) {
					ao = 1
				}
			} else {
				if (ao == 1) {
					if (aq > av) {
						aw.push(ap.slice(0, av - at), an[ar + 1])
					} else {
						aw.push(ap, an[ar + 1])
					}
				}
			}
			at = aq
		}
	}
	function ai(ao) {
		this.lines = ao;
		this.parent = null;
		for (var ap = 0, aq = ao.length, an = 0; ap < aq; ++ap) {
			ao[ap].parent = this;
			an += ao[ap].height
		}
		this.height = an
	}
	ai.prototype = {
		chunkSize: function() {
			return this.lines.length
		},
		remove: function(an, av, ar) {
			for (var aq = an, au = an + av; aq < au; ++aq) {
				var ao = this.lines[aq];
				this.height -= ao.height;
				ao.cleanUp();
				if (ao.handlers) {
					for (var ap = 0; ap < ao.handlers.length; ++ap) {
						ar.push(ao.handlers[ap])
					}
				}
			}
			this.lines.splice(an, av)
		},
		collapse: function(an) {
			an.splice.apply(an, [an.length, 0].concat(this.lines))
		},
		insertHeight: function(ao, ap, an) {
			this.height += an;
			if (J) {
				this.lines = this.lines.slice(0, ao).concat(ap).concat(this.lines.slice(ao))
			} else {
				this.lines.splice.apply(this.lines, [ao, 0].concat(ap))
			}
			for (var aq = 0, ar = ap.length; aq < ar; ++aq) {
				ap[aq].parent = this
			}
		},
		iterN: function(an, aq, ap) {
			for (var ao = an + aq; an < ao; ++an) {
				if (ap(this.lines[an])) {
					return true
				}
			}
		}
	};

	function i(aq) {
		this.children = aq;
		var ap = 0,
			an = 0;
		for (var ao = 0, at = aq.length; ao < at; ++ao) {
			var ar = aq[ao];
			ap += ar.chunkSize();
			an += ar.height;
			ar.parent = this
		}
		this.size = ap;
		this.height = an;
		this.parent = null
	}
	i.prototype = {
		chunkSize: function() {
			return this.size
		},
		remove: function(ap, ao, au) {
			this.size -= ao;
			for (var aq = 0; aq < this.children.length; ++aq) {
				var an = this.children[aq],
					av = an.chunkSize();
				if (ap < av) {
					var ar = Math.min(ao, av - ap),
						aw = an.height;
					an.remove(ap, ar, au);
					this.height -= aw - an.height;
					if (av == ar) {
						this.children.splice(aq--, 1);
						an.parent = null
					}
					if ((ao -= ar) == 0) {
						break
					}
					ap = 0
				} else {
					ap -= av
				}
			}
			if (this.size - ao < 25) {
				var ax = [];
				this.collapse(ax);
				this.children = [new ai(ax)];
				this.children[0].parent = this
			}
		},
		collapse: function(an) {
			for (var ao = 0, ap = this.children.length; ao < ap; ++ao) {
				this.children[ao].collapse(an)
			}
		},
		insert: function(ao, ap) {
			var an = 0;
			for (var aq = 0, ar = ap.length; aq < ar; ++aq) {
				an += ap[aq].height
			}
			this.insertHeight(ao, ap, an)
		},
		insertHeight: function(ao, ax, aw) {
			this.size += ax.length;
			this.height += aw;
			for (var ap = 0, ar = this.children.length; ap < ar; ++ap) {
				var an = this.children[ap],
					au = an.chunkSize();
				if (ao <= au) {
					an.insertHeight(ao, ax, aw);
					if (an.lines && an.lines.length > 50) {
						while (an.lines.length > 50) {
							var aq = an.lines.splice(an.lines.length - 25, 25);
							var av = new ai(aq);
							an.height -= av.height;
							this.children.splice(ap + 1, 0, av);
							av.parent = this
						}
						this.maybeSpill()
					}
					break
				}
				ao -= au
			}
		},
		maybeSpill: function() {
			if (this.children.length <= 10) {
				return
			}
			var aq = this;
			do {
				var ao = aq.children.splice(aq.children.length - 5, 5);
				var ap = new i(ao);
				if (!aq.parent) {
					var ar = new i(aq.children);
					ar.parent = aq;
					aq.children = [ar, ap];
					aq = ar
				} else {
					aq.size -= ap.size;
					aq.height -= ap.height;
					var an = r(aq.parent.children, aq);
					aq.parent.children.splice(an + 1, 0, ap)
				}
				ap.parent = aq.parent
			} while (aq.children.length > 10);
			aq.parent.maybeSpill()
		},
		iter: function(ap, ao, an) {
			this.iterN(ap, ao - ap, an)
		},
		iterN: function(an, aw, av) {
			for (var ao = 0, ar = this.children.length; ao < ar; ++ao) {
				var au = this.children[ao],
					aq = au.chunkSize();
				if (an < aq) {
					var ap = Math.min(aw, aq - an);
					if (au.iterN(an, ap, av)) {
						return true
					}
					if ((aw -= ap) == 0) {
						break
					}
					an = 0
				} else {
					an -= aq
				}
			}
		}
	};

	function D(an, ar) {
		while (!an.lines) {
			for (var ao = 0;; ++ao) {
				var aq = an.children[ao],
					ap = aq.chunkSize();
				if (ar < ap) {
					an = aq;
					break
				}
				ar -= ap
			}
		}
		return an.lines[ar]
	}
	function Z(an) {
		if (an.parent == null) {
			return null
		}
		var at = an.parent,
			ar = r(at.lines, an);
		for (var ao = at.parent; ao; at = ao, ao = ao.parent) {
			for (var ap = 0, aq = ao.children.length;; ++ap) {
				if (ao.children[ap] == at) {
					break
				}
				ar += ao.children[ap].chunkSize()
			}
		}
		return ar
	}
	function Y(au, ar) {
		var ap = 0;
		outer: do {
			for (var aq = 0, at = au.children.length; aq < at; ++aq) {
				var ao = au.children[aq],
					an = ao.height;
				if (ar < an) {
					au = ao;
					continue outer
				}
				ar -= an;
				ap += ao.chunkSize()
			}
			return ap
		} while (!au.lines);
		for (var aq = 0, at = au.lines.length; aq < at; ++aq) {
			var aw = au.lines[aq],
				av = aw.height;
			if (ar < av) {
				break
			}
			ar -= av
		}
		return ap + aq
	}
	function g(an, au) {
		var ap = 0;
		outer: do {
			for (var ao = 0, ar = an.children.length; ao < ar; ++ao) {
				var at = an.children[ao],
					aq = at.chunkSize();
				if (au < aq) {
					an = at;
					continue outer
				}
				au -= aq;
				ap += at.height
			}
			return ap
		} while (!an.lines);
		for (var ao = 0; ao < au; ++ao) {
			ap += an.lines[ao].height
		}
		return ap
	}
	function k() {
		this.time = 0;
		this.done = [];
		this.undone = [];
		this.compound = 0;
		this.closed = false
	}
	k.prototype = {
		addChange: function(an, at, ao) {
			this.undone.length = 0;
			var ap = +new Date,
				av = this.done[this.done.length - 1],
				aw = av && av[av.length - 1];
			var ar = ap - this.time;
			if (this.compound && av && !this.closed) {
				av.push({
					start: an,
					added: at,
					old: ao
				})
			} else {
				if (ar > 400 || !aw || this.closed || aw.start > an + ao.length || aw.start + aw.added < an) {
					this.done.push([{
						start: an,
						added: at,
						old: ao
					}]);
					this.closed = false
				} else {
					var au = Math.max(0, aw.start - an),
						ax = Math.max(0, (an + ao.length) - (aw.start + aw.added));
					for (var aq = au; aq > 0; --aq) {
						aw.old.unshift(ao[aq - 1])
					}
					for (var aq = ax; aq > 0; --aq) {
						aw.old.push(ao[ao.length - aq])
					}
					if (au) {
						aw.start = an
					}
					aw.added += at - (ao.length - au - ax)
				}
			}
			this.time = ap
		},
		startCompound: function() {
			if (!this.compound++) {
				this.closed = true
			}
		},
		endCompound: function() {
			if (!--this.compound) {
				this.closed = true
			}
		}
	};

	function K() {
		x(this)
	}
	function P(an) {
		if (!an.stop) {
			an.stop = K
		}
		return an
	}
	function U(an) {
		if (an.preventDefault) {
			an.preventDefault()
		} else {
			an.returnValue = false
		}
	}
	function E(an) {
		if (an.stopPropagation) {
			an.stopPropagation()
		} else {
			an.cancelBubble = true
		}
	}
	function x(an) {
		U(an);
		E(an)
	}
	v.e_stop = x;
	v.e_preventDefault = U;
	v.e_stopPropagation = E;

	function j(an) {
		return an.target || an.srcElement
	}
	function y(an) {
		if (an.which) {
			return an.which
		} else {
			if (an.button & 1) {
				return 1
			} else {
				if (an.button & 2) {
					return 3
				} else {
					if (an.button & 4) {
						return 2
					}
				}
			}
		}
	}
	function z(ao, ap) {
		var an = ao.override && ao.override.hasOwnProperty(ap);
		return an ? ao.override[ap] : ao[ap]
	}
	function s(aq, ap, ao, an) {
		if (typeof aq.addEventListener == "function") {
			aq.addEventListener(ap, ao, false);
			if (an) {
				return function() {
					aq.removeEventListener(ap, ao, false)
				}
			}
		} else {
			var ar = function(at) {
				ao(at || window.event)
			};
			aq.attachEvent("on" + ap, ar);
			if (an) {
				return function() {
					aq.detachEvent("on" + ap, ar)
				}
			}
		}
	}
	v.connect = s;

	function A() {
		this.id = null
	}
	A.prototype = {
		set: function(an, ao) {
			clearTimeout(this.id);
			this.id = setTimeout(ao, an)
		}
	};
	var ac = v.Pass = {
		toString: function() {
			return "CodeMirror.Pass"
		}
	};
	var O = /gecko\/\d{7}/i.test(navigator.userAgent);
	var J = /MSIE \d/.test(navigator.userAgent);
	var C = /MSIE [1-8]\b/.test(navigator.userAgent);
	var F = J && document.documentMode == 5;
	var f = /WebKit\//.test(navigator.userAgent);
	var ag = /Chrome\//.test(navigator.userAgent);
	var h = /Apple Computer/.test(navigator.vendor);
	var m = /KHTML\//.test(navigator.userAgent);
	var G = function() {
		if (C) {
			return false
		}
		var an = document.createElement("div");
		return "draggable" in an || "dragDrop" in an
	}();
	var d = function() {
		var an = document.createElement("textarea");
		an.value = "foo\nbar";
		if (an.value.indexOf("\r") > -1) {
			return "\r\n"
		}
		return "\n"
	}();
	var o = /^$/;
	if (O) {
		o = /$'/
	} else {
		if (h) {
			o = /\-[^ \-?]|\?[^ !'\"\),.\-\/:;\?\]\}]/
		} else {
			if (ag) {
				o = /\-[^ \-\.?]|\?[^ \-\.?\]\}:;!'\"\),\/]|[\.!\"#&%\)*+,:;=>\]|\}~][\(\{\[<]|\$'/
			}
		}
	}
	function n(ao, an, aq) {
		if (an == null) {
			an = ao.search(/[^\s\u00a0]/);
			if (an == -1) {
				an = ao.length
			}
		}
		for (var ap = 0, ar = 0; ap < an; ++ap) {
			if (ao.charAt(ap) == "\t") {
				ar += aq - (ar % aq)
			} else {
				++ar
			}
		}
		return ar
	}
	function u(an) {
		if (an.currentStyle) {
			return an.currentStyle
		}
		return window.getComputedStyle(an, null)
	}
	function al(ao, ax) {
		var aq = ao.ownerDocument.body;
		var aw = 0,
			av = 0,
			at = false;
		for (var an = ao; an; an = an.offsetParent) {
			var au = an.offsetLeft,
				ap = an.offsetTop;
			if (an == aq) {
				aw += Math.abs(au);
				av += Math.abs(ap)
			} else {
				aw += au, av += ap
			}
			if (ax && u(an).position == "fixed") {
				at = true
			}
		}
		var ar = ax && !at ? null : aq;
		for (var an = ao.parentNode; an != ar; an = an.parentNode) {
			if (an.scrollLeft != null) {
				aw -= an.scrollLeft;
				av -= an.scrollTop
			}
		}
		return {
			left: aw,
			top: av
		}
	}
	if (document.documentElement.getBoundingClientRect != null) {
		al = function(aq, an) {
			try {
				var ap = aq.getBoundingClientRect();
				ap = {
					top: ap.top,
					left: ap.left
				}
			} catch (ar) {
				ap = {
					top: 0,
					left: 0
				}
			}
			if (!an) {
				if (window.pageYOffset == null) {
					var ao = document.documentElement || document.body.parentNode;
					if (ao.scrollTop == null) {
						ao = document.body
					}
					ap.top += ao.scrollTop;
					ap.left += ao.scrollLeft
				} else {
					ap.top += window.pageYOffset;
					ap.left += window.pageXOffset
				}
			}
			return ap
		}
	}
	function I(an) {
		return an.textContent || an.innerText || an.nodeValue || ""
	}
	function a(an) {
		if (t) {
			an.selectionStart = 0;
			an.selectionEnd = an.value.length
		} else {
			an.select()
		}
	}
	function ae(ao, an) {
		return ao.line == an.line && ao.ch == an.ch
	}
	function aa(ao, an) {
		return ao.line < an.line || (ao.line == an.line && ao.ch < an.ch)
	}
	function ab(an) {
		return {
			line: an.line,
			ch: an.ch
		}
	}
	var aj = document.createElement("pre");

	function Q(an) {
		aj.textContent = an;
		return aj.innerHTML
	}
	if (Q("a") == "\na") {
		Q = function(an) {
			aj.textContent = an;
			return aj.innerHTML.slice(1)
		}
	} else {
		if (Q("\t") != "\t") {
			Q = function(an) {
				aj.innerHTML = "";
				aj.appendChild(document.createTextNode(an));
				return aj.innerHTML
			}
		}
	}
	v.htmlEscape = Q;

	function X(aq, ap) {
		if (!ap) {
			return 0
		}
		if (!aq) {
			return ap.length
		}
		for (var ao = aq.length, an = ap.length; ao >= 0 && an >= 0; --ao, --an) {
			if (aq.charAt(ao) != ap.charAt(an)) {
				break
			}
		}
		return an + 1
	}
	function r(aq, an) {
		if (aq.indexOf) {
			return aq.indexOf(an)
		}
		for (var ao = 0, ap = aq.length; ao < ap; ++ao) {
			if (aq[ao] == an) {
				return ao
			}
		}
		return -1
	}
	function ah(an) {
		return /\w/.test(an) || an.toUpperCase() != an.toLowerCase()
	}
	var B = "\n\nb".split(/\n/).length != 3 ? function(ap) {
			var aq = 0,
				ao, an = [];
			while ((ao = ap.indexOf("\n", aq)) > -1) {
				an.push(ap.slice(aq, ap.charAt(ao - 1) == "\r" ? ao - 1 : ao));
				aq = ao + 1
			}
			an.push(ap.slice(aq));
			return an
		} : function(an) {
			return an.split(/\r?\n/)
		};
	v.splitLines = B;
	var af = window.getSelection ? function(ao) {
			try {
				return ao.selectionStart != ao.selectionEnd
			} catch (an) {
				return false
			}
		} : function(ap) {
			try {
				var an = ap.ownerDocument.selection.createRange()
			} catch (ao) {}
			if (!an || an.parentElement() != ap) {
				return false
			}
			return an.compareEndPoints("StartToEnd", an) != 0
		};
	v.defineMode("null", function() {
		return {
			token: function(an) {
				an.skipToEnd()
			}
		}
	});
	v.defineMIME("text/plain", "null");
	var S = {
		3: "Enter",
		8: "Backspace",
		9: "Tab",
		13: "Enter",
		16: "Shift",
		17: "Ctrl",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Esc",
		32: "Space",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "Left",
		38: "Up",
		39: "Right",
		40: "Down",
		44: "PrintScrn",
		45: "Insert",
		46: "Delete",
		59: ";",
		91: "Mod",
		92: "Mod",
		93: "Mod",
		127: "Delete",
		186: ";",
		187: "=",
		188: ",",
		189: "-",
		190: ".",
		191: "/",
		192: "`",
		219: "[",
		220: "\\",
		221: "]",
		222: "'",
		63276: "PageUp",
		63277: "PageDown",
		63275: "End",
		63273: "Home",
		63234: "Left",
		63232: "Up",
		63235: "Right",
		63233: "Down",
		63302: "Insert",
		63272: "Delete"
	};
	v.keyNames = S;
	(function() {
		for (var an = 0; an < 10; an++) {
			S[an + 48] = String(an)
		}
		for (var an = 65; an <= 90; an++) {
			S[an] = String.fromCharCode(an)
		}
		for (var an = 1; an <= 12; an++) {
			S[an + 111] = S[an + 63235] = "F" + an
		}
	})();
	return v
})();
CodeMirror.defineMode("javascript", function(J, N) {
	var w = J.indentUnit;
	var R = N.json;
	var b = function() {
		function X(aa) {
			return {
				type: aa,
				style: "keyword"
			}
		}
		var U = X("keyword a"),
			Z = X("keyword b"),
			Y = X("keyword c");
		var V = X("operator"),
			W = {
				type: "atom",
				style: "atom"
			};
		return {
			"if": U,
			"while": U,
			"with": U,
			"else": Z,
			"do": Z,
			"try": Z,
			"finally": Z,
			"return": Y,
			"break": Y,
			"continue": Y,
			"new": Y,
			"delete": Y,
			"throw": Y,
			"var": X("var"),
			"const": X("var"),
			let: X("var"),
			"function": X("function"),
			"catch": X("catch"),
			"for": X("for"),
			"switch": X("switch"),
			"case": X("case"),
			"default": X("default"),
			"in": V,
			"typeof": V,
			"instanceof": V,
			"true": W,
			"false": W,
			"null": W,
			"undefined": W,
			"NaN": W,
			"Infinity": W
		}
	}();
	var O = /[+\-*&%=<>!?|]/;

	function S(W, V, U) {
		V.tokenize = U;
		return U(W, V)
	}
	function h(X, U) {
		var W = false,
			V;
		while ((V = X.next()) != null) {
			if (V == U && !W) {
				return false
			}
			W = !W && V == "\\"
		}
		return W
	}
	var T, p;

	function C(W, V, U) {
		T = W;
		p = U;
		return V
	}
	function l(Y, W) {
		var U = Y.next();
		if (U == '"' || U == "'") {
			return S(Y, W, A(U))
		} else {
			if (/[\[\]{}\(\),;\:\.]/.test(U)) {
				return C(U)
			} else {
				if (U == "0" && Y.eat(/x/i)) {
					Y.eatWhile(/[\da-f]/i);
					return C("number", "number")
				} else {
					if (/\d/.test(U)) {
						Y.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
						return C("number", "number")
					} else {
						if (U == "/") {
							if (Y.eat("*")) {
								return S(Y, W, f)
							} else {
								if (Y.eat("/")) {
									Y.skipToEnd();
									return C("comment", "comment")
								} else {
									if (W.reAllowed) {
										h(Y, "/");
										Y.eatWhile(/[gimy]/);
										return C("regexp", "string-2")
									} else {
										Y.eatWhile(O);
										return C("operator", null, Y.current())
									}
								}
							}
						} else {
							if (U == "#") {
								Y.skipToEnd();
								return C("error", "error")
							} else {
								if (O.test(U)) {
									Y.eatWhile(O);
									return C("operator", null, Y.current())
								} else {
									Y.eatWhile(/[\w\$_]/);
									var X = Y.current(),
										V = b.propertyIsEnumerable(X) && b[X];
									return (V && W.kwAllowed) ? C(V.type, V.style, X) : C("variable", "variable", X)
								}
							}
						}
					}
				}
			}
		}
	}
	function A(U) {
		return function(W, V) {
			if (!h(W, U)) {
				V.tokenize = l
			}
			return C("string", "string")
		}
	}
	function f(X, W) {
		var U = false,
			V;
		while (V = X.next()) {
			if (V == "/" && U) {
				W.tokenize = l;
				break
			}
			U = (V == "*")
		}
		return C("comment", "comment")
	}
	var k = {
		atom: true,
		number: true,
		variable: true,
		string: true,
		regexp: true
	};

	function u(Z, V, U, Y, W, X) {
		this.indented = Z;
		this.column = V;
		this.type = U;
		this.prev = W;
		this.info = X;
		if (Y != null) {
			this.align = Y
		}
	}
	function x(W, V) {
		for (var U = W.localVars; U; U = U.next) {
			if (U.name == V) {
				return true
			}
		}
	}
	function F(Y, V, U, X, Z) {
		var aa = Y.cc;
		v.state = Y;
		v.stream = Z;
		v.marked = null, v.cc = aa;
		if (!Y.lexical.hasOwnProperty("align")) {
			Y.lexical.align = true
		}
		while (true) {
			var W = aa.length ? aa.pop() : R ? y : z;
			if (W(U, X)) {
				while (aa.length && aa[aa.length - 1].lex) {
					aa.pop()()
				}
				if (v.marked) {
					return v.marked
				}
				if (U == "variable" && x(Y, X)) {
					return "variable-2"
				}
				return V
			}
		}
	}
	var v = {
		state: null,
		column: null,
		marked: null,
		cc: null
	};

	function a() {
		for (var U = arguments.length - 1; U >= 0; U--) {
			v.cc.push(arguments[U])
		}
	}
	function H() {
		a.apply(null, arguments);
		return true
	}
	function m(V) {
		var W = v.state;
		if (W.context) {
			v.marked = "def";
			for (var U = W.localVars; U; U = U.next) {
				if (U.name == V) {
					return
				}
			}
			W.localVars = {
				name: V,
				next: W.localVars
			}
		}
	}
	var E = {
		name: "this",
		next: {
			name: "arguments"
		}
	};

	function t() {
		if (!v.state.context) {
			v.state.localVars = E
		}
		v.state.context = {
			prev: v.state.context,
			vars: v.state.localVars
		}
	}
	function s() {
		v.state.localVars = v.state.context.vars;
		v.state.context = v.state.context.prev
	}
	function j(V, W) {
		var U = function() {
			var X = v.state;
			X.lexical = new u(X.indented, v.stream.column(), V, null, X.lexical, W)
		};
		U.lex = true;
		return U
	}
	function G() {
		var U = v.state;
		if (U.lexical.prev) {
			if (U.lexical.type == ")") {
				U.indented = U.lexical.indented
			}
			U.lexical = U.lexical.prev
		}
	}
	G.lex = true;

	function c(V) {
		return function U(W) {
			if (W == V) {
				return H()
			} else {
				if (V == ";") {
					return a()
				} else {
					return H(arguments.callee)
				}
			}
		}
	}
	function z(U) {
		if (U == "var") {
			return H(j("vardef"), K, c(";"), G)
		}
		if (U == "keyword a") {
			return H(j("form"), y, z, G)
		}
		if (U == "keyword b") {
			return H(j("form"), z, G)
		}
		if (U == "{") {
			return H(j("}"), n, G)
		}
		if (U == ";") {
			return H()
		}
		if (U == "function") {
			return H(i)
		}
		if (U == "for") {
			return H(j("form"), c("("), j(")"), g, c(")"), G, z, G)
		}
		if (U == "variable") {
			return H(j("stat"), D)
		}
		if (U == "switch") {
			return H(j("form"), y, j("}", "switch"), c("{"), n, G, G)
		}
		if (U == "case") {
			return H(y, c(":"))
		}
		if (U == "default") {
			return H(c(":"))
		}
		if (U == "catch") {
			return H(j("form"), t, c("("), r, c(")"), z, G, s)
		}
		return a(j("stat"), y, c(";"), G)
	}
	function y(U) {
		if (k.hasOwnProperty(U)) {
			return H(M)
		}
		if (U == "function") {
			return H(i)
		}
		if (U == "keyword c") {
			return H(B)
		}
		if (U == "(") {
			return H(j(")"), B, c(")"), G, M)
		}
		if (U == "operator") {
			return H(y)
		}
		if (U == "[") {
			return H(j("]"), P(y, "]"), G, M)
		}
		if (U == "{") {
			return H(j("}"), P(o, "}"), G, M)
		}
		return H()
	}
	function B(U) {
		if (U.match(/[;\}\)\],]/)) {
			return a()
		}
		return a(y)
	}
	function M(U, V) {
		if (U == "operator" && /\+\+|--/.test(V)) {
			return H(M)
		}
		if (U == "operator" || U == ":") {
			return H(y)
		}
		if (U == ";") {
			return
		}
		if (U == "(") {
			return H(j(")"), P(y, ")"), G, M)
		}
		if (U == ".") {
			return H(Q, M)
		}
		if (U == "[") {
			return H(j("]"), y, c("]"), G, M)
		}
	}
	function D(U) {
		if (U == ":") {
			return H(G, z)
		}
		return a(M, c(";"), G)
	}
	function Q(U) {
		if (U == "variable") {
			v.marked = "property";
			return H()
		}
	}
	function o(U) {
		if (U == "variable") {
			v.marked = "property"
		}
		if (k.hasOwnProperty(U)) {
			return H(c(":"), y)
		}
	}
	function P(W, U) {
		function V(Y) {
			if (Y == ",") {
				return H(W, V)
			}
			if (Y == U) {
				return H()
			}
			return H(c(U))
		}
		return function X(Y) {
			if (Y == U) {
				return H()
			} else {
				return a(W, V)
			}
		}
	}
	function n(U) {
		if (U == "}") {
			return H()
		}
		return a(z, n)
	}
	function K(U, V) {
		if (U == "variable") {
			m(V);
			return H(I)
		}
		return H()
	}
	function I(U, V) {
		if (V == "=") {
			return H(y, I)
		}
		if (U == ",") {
			return H(K)
		}
	}
	function g(U) {
		if (U == "var") {
			return H(K, e)
		}
		if (U == ";") {
			return a(e)
		}
		if (U == "variable") {
			return H(L)
		}
		return a(e)
	}
	function L(U, V) {
		if (V == "in") {
			return H(y)
		}
		return H(M, e)
	}
	function e(U, V) {
		if (U == ";") {
			return H(d)
		}
		if (V == "in") {
			return H(y)
		}
		return H(y, c(";"), d)
	}
	function d(U) {
		if (U != ")") {
			H(y)
		}
	}
	function i(U, V) {
		if (U == "variable") {
			m(V);
			return H(i)
		}
		if (U == "(") {
			return H(j(")"), t, P(r, ")"), G, z, s)
		}
	}
	function r(U, V) {
		if (U == "variable") {
			m(V);
			return H()
		}
	}
	return {
		startState: function(U) {
			return {
				tokenize: l,
				reAllowed: true,
				kwAllowed: true,
				cc: [],
				lexical: new u((U || 0) - w, 0, "block", false),
				localVars: N.localVars,
				context: N.localVars && {
					vars: N.localVars
				},
				indented: 0
			}
		},
		token: function(W, V) {
			if (W.sol()) {
				if (!V.lexical.hasOwnProperty("align")) {
					V.lexical.align = false
				}
				V.indented = W.indentation()
			}
			if (W.eatSpace()) {
				return null
			}
			var U = V.tokenize(W, V);
			if (T == "comment") {
				return U
			}
			V.reAllowed = !! (T == "operator" || T == "keyword c" || T.match(/^[\[{}\(,;:]$/));
			V.kwAllowed = T != ".";
			return F(V, U, T, p, W)
		},
		indent: function(Z, U) {
			if (Z.tokenize != l) {
				return 0
			}
			var Y = U && U.charAt(0),
				W = Z.lexical;
			if (W.type == "stat" && Y == "}") {
				W = W.prev
			}
			var X = W.type,
				V = Y == X;
			if (X == "vardef") {
				return W.indented + 4
			} else {
				if (X == "form" && Y == "{") {
					return W.indented
				} else {
					if (X == "stat" || X == "form") {
						return W.indented + w
					} else {
						if (W.info == "switch" && !V) {
							return W.indented + (/^(?:case|default)\b/.test(U) ? w : 2 * w)
						} else {
							if (W.align) {
								return W.column + (V ? 0 : 1)
							} else {
								return W.indented + (V ? 0 : w)
							}
						}
					}
				}
			}
		},
		electricChars: ":{}"
	}
});
CodeMirror.defineMIME("text/javascript", "javascript");
CodeMirror.defineMIME("application/json", {
	name: "javascript",
	json: true
});
CodeMirror.defineMode("xml", function(z, k) {
	var s = z.indentUnit;
	var y = k.htmlMode ? {
		autoSelfClosers: {
			area: true,
			base: true,
			br: true,
			col: true,
			command: true,
			embed: true,
			frame: true,
			hr: true,
			img: true,
			input: true,
			keygen: true,
			link: true,
			meta: true,
			param: true,
			source: true,
			track: true,
			wbr: true
		},
		implicitlyClosed: {
			dd: true,
			li: true,
			optgroup: true,
			option: true,
			p: true,
			rp: true,
			rt: true,
			tbody: true,
			td: true,
			tfoot: true,
			th: true,
			tr: true
		},
		contextGrabbers: {
			dd: {
				dd: true,
				dt: true
			},
			dt: {
				dd: true,
				dt: true
			},
			li: {
				li: true
			},
			option: {
				option: true,
				optgroup: true
			},
			optgroup: {
				optgroup: true
			},
			p: {
				address: true,
				article: true,
				aside: true,
				blockquote: true,
				dir: true,
				div: true,
				dl: true,
				fieldset: true,
				footer: true,
				form: true,
				h1: true,
				h2: true,
				h3: true,
				h4: true,
				h5: true,
				h6: true,
				header: true,
				hgroup: true,
				hr: true,
				menu: true,
				nav: true,
				ol: true,
				p: true,
				pre: true,
				section: true,
				table: true,
				ul: true
			},
			rp: {
				rp: true,
				rt: true
			},
			rt: {
				rp: true,
				rt: true
			},
			tbody: {
				tbody: true,
				tfoot: true
			},
			td: {
				td: true,
				th: true
			},
			tfoot: {
				tbody: true
			},
			th: {
				td: true,
				th: true
			},
			thead: {
				tbody: true,
				tfoot: true
			},
			tr: {
				tr: true
			}
		},
		doNotIndent: {
			pre: true
		},
		allowUnquoted: true,
		allowMissing: false
	} : {
		autoSelfClosers: {},
		implicitlyClosed: {},
		contextGrabbers: {},
		doNotIndent: {},
		allowUnquoted: false,
		allowMissing: false
	};
	var a = k.alignCDATA;
	var f, g;

	function o(F, E) {
		function C(H) {
			E.tokenize = H;
			return H(F, E)
		}
		var D = F.next();
		if (D == "<") {
			if (F.eat("!")) {
				if (F.eat("[")) {
					if (F.match("CDATA[")) {
						return C(x("atom", "]]>"))
					} else {
						return null
					}
				} else {
					if (F.match("--")) {
						return C(x("comment", "-->"))
					} else {
						if (F.match("DOCTYPE", true, true)) {
							F.eatWhile(/[\w\._\-]/);
							return C(A(1))
						} else {
							return null
						}
					}
				}
			} else {
				if (F.eat("?")) {
					F.eatWhile(/[\w\._\-]/);
					E.tokenize = x("meta", "?>");
					return "meta"
				} else {
					g = F.eat("/") ? "closeTag" : "openTag";
					F.eatSpace();
					f = "";
					var G;
					while ((G = F.eat(/[^\s\u00a0=<>\"\'\/?]/))) {
						f += G
					}
					E.tokenize = n;
					return "tag"
				}
			}
		} else {
			if (D == "&") {
				var B;
				if (F.eat("#")) {
					if (F.eat("x")) {
						B = F.eatWhile(/[a-fA-F\d]/) && F.eat(";")
					} else {
						B = F.eatWhile(/[\d]/) && F.eat(";")
					}
				} else {
					B = F.eatWhile(/[\w\.\-:]/) && F.eat(";")
				}
				return B ? "atom" : "error"
			} else {
				F.eatWhile(/[^&<]/);
				return null
			}
		}
	}
	function n(D, C) {
		var B = D.next();
		if (B == ">" || (B == "/" && D.eat(">"))) {
			C.tokenize = o;
			g = B == ">" ? "endTag" : "selfcloseTag";
			return "tag"
		} else {
			if (B == "=") {
				g = "equals";
				return null
			} else {
				if (/[\'\"]/.test(B)) {
					C.tokenize = j(B);
					return C.tokenize(D, C)
				} else {
					D.eatWhile(/[^\s\u00a0=<>\"\'\/?]/);
					return "word"
				}
			}
		}
	}
	function j(B) {
		return function(D, C) {
			while (!D.eol()) {
				if (D.next() == B) {
					C.tokenize = n;
					break
				}
			}
			return "string"
		}
	}
	function x(C, B) {
		return function(E, D) {
			while (!E.eol()) {
				if (E.match(B)) {
					D.tokenize = o;
					break
				}
				E.next()
			}
			return C
		}
	}
	function A(B) {
		return function(E, D) {
			var C;
			while ((C = E.next()) != null) {
				if (C == "<") {
					D.tokenize = A(B + 1);
					return D.tokenize(E, D)
				} else {
					if (C == ">") {
						if (B == 1) {
							D.tokenize = o;
							break
						} else {
							D.tokenize = A(B - 1);
							return D.tokenize(E, D)
						}
					}
				}
			}
			return "meta"
		}
	}
	var l, h;

	function b() {
		for (var B = arguments.length - 1; B >= 0; B--) {
			l.cc.push(arguments[B])
		}
	}
	function e() {
		b.apply(null, arguments);
		return true
	}
	function i(B, D) {
		var C = y.doNotIndent.hasOwnProperty(B) || (l.context && l.context.noIndent);
		l.context = {
			prev: l.context,
			tagName: B,
			indent: l.indented,
			startOfLine: D,
			noIndent: C
		}
	}
	function v() {
		if (l.context) {
			l.context = l.context.prev
		}
	}
	function d(B) {
		if (B == "openTag") {
			l.tagName = f;
			return e(m, c(l.startOfLine))
		} else {
			if (B == "closeTag") {
				var C = false;
				if (l.context) {
					if (l.context.tagName != f) {
						if (y.implicitlyClosed.hasOwnProperty(l.context.tagName.toLowerCase())) {
							v()
						}
						C = !l.context || l.context.tagName != f
					}
				} else {
					C = true
				}
				if (C) {
					h = "error"
				}
				return e(t(C))
			}
		}
		return e()
	}
	function c(B) {
		return function(C) {
			if (C == "selfcloseTag" || (C == "endTag" && y.autoSelfClosers.hasOwnProperty(l.tagName.toLowerCase()))) {
				r(l.tagName.toLowerCase());
				return e()
			}
			if (C == "endTag") {
				r(l.tagName.toLowerCase());
				i(l.tagName, B);
				return e()
			}
			return e()
		}
	}
	function t(B) {
		return function(C) {
			if (B) {
				h = "error"
			}
			if (C == "endTag") {
				v();
				return e()
			}
			h = "error";
			return e(arguments.callee)
		}
	}
	function r(C) {
		var B;
		while (true) {
			if (!l.context) {
				return
			}
			B = l.context.tagName.toLowerCase();
			if (!y.contextGrabbers.hasOwnProperty(B) || !y.contextGrabbers[B].hasOwnProperty(C)) {
				return
			}
			v()
		}
	}
	function m(B) {
		if (B == "word") {
			h = "attribute";
			return e(p, m)
		}
		if (B == "endTag" || B == "selfcloseTag") {
			return b()
		}
		h = "error";
		return e(m)
	}
	function p(B) {
		if (B == "equals") {
			return e(w, m)
		}
		if (!y.allowMissing) {
			h = "error"
		}
		return (B == "endTag" || B == "selfcloseTag") ? b() : e()
	}
	function w(B) {
		if (B == "string") {
			return e(u)
		}
		if (B == "word" && y.allowUnquoted) {
			h = "string";
			return e()
		}
		h = "error";
		return (B == "endTag" || B == "selfCloseTag") ? b() : e()
	}
	function u(B) {
		if (B == "string") {
			return e(u)
		} else {
			return b()
		}
	}
	return {
		startState: function() {
			return {
				tokenize: o,
				cc: [],
				indented: 0,
				startOfLine: true,
				tagName: null,
				context: null
			}
		},
		token: function(E, D) {
			if (E.sol()) {
				D.startOfLine = true;
				D.indented = E.indentation()
			}
			if (E.eatSpace()) {
				return null
			}
			h = g = f = null;
			var C = D.tokenize(E, D);
			D.type = g;
			if ((C || g) && C != "comment") {
				l = D;
				while (true) {
					var B = D.cc.pop() || d;
					if (B(g || C)) {
						break
					}
				}
			}
			D.startOfLine = false;
			return h || C
		},
		indent: function(E, B, D) {
			var C = E.context;
			if ((E.tokenize != n && E.tokenize != o) || C && C.noIndent) {
				return D ? D.match(/^(\s*)/)[0].length : 0
			}
			if (a && /<!\[CDATA\[/.test(B)) {
				return 0
			}
			if (C && /^<\//.test(B)) {
				C = C.prev
			}
			while (C && !C.startOfLine) {
				C = C.prev
			}
			if (C) {
				return C.indent + s
			} else {
				return 0
			}
		},
		compareStates: function(E, C) {
			if (E.indented != C.indented || E.tokenize != C.tokenize) {
				return false
			}
			for (var D = E.context, B = C.context;; D = D.prev, B = B.prev) {
				if (!D || !B) {
					return D == B
				}
				if (D.tagName != B.tagName) {
					return false
				}
			}
		},
		electricChars: "/"
	}
});
CodeMirror.defineMIME("application/xml", "xml");
if (!CodeMirror.mimeModes.hasOwnProperty("text/html")) {
	CodeMirror.defineMIME("text/html", {
		name: "xml",
		htmlMode: true
	})
}
CodeMirror.defineMode("markdown", function(C, m) {
	var i = CodeMirror.getMode(C, {
		name: "xml",
		htmlMode: true
	});
	var z = "header",
		d = "comment",
		B = "quote",
		A = "string",
		F = "hr",
		t = "link",
		E = "string",
		g = "em",
		j = "strong",
		x = "emstrong";
	var G = /^([*\-=_])(?:\s*\1){2,}\s*$/,
		p = /^[*\-+]\s+/,
		v = /^[0-9]+\.\s+/,
		n = /^(?:\={3,}|-{3,})$/,
		f = /^[^\[*_\\<>`]+/;

	function e(J, I, H) {
		I.f = I.inline = H;
		return H(J, I)
	}
	function s(J, I, H) {
		I.f = I.block = H;
		return H(J, I)
	}
	function o(H) {
		H.em = false;
		H.strong = false;
		return null
	}
	function l(J, I) {
		var H;
		if (I.indentationDiff >= 4) {
			I.indentation -= I.indentationDiff;
			J.skipToEnd();
			return d
		} else {
			if (J.eatSpace()) {
				return null
			} else {
				if (J.peek() === "#" || J.match(n)) {
					I.header = true
				} else {
					if (J.eat(">")) {
						I.indentation++;
						I.quote = true
					} else {
						if (J.peek() === "[") {
							return e(J, I, k)
						} else {
							if (J.match(G, true)) {
								return F
							} else {
								if (H = J.match(p, true) || J.match(v, true)) {
									I.indentation += H[0].length;
									return A
								}
							}
						}
					}
				}
			}
		}
		return e(J, I, I.inline)
	}
	function y(J, I) {
		var H = i.token(J, I.htmlState);
		if (H === "tag" && I.htmlState.type !== "openTag" && !I.htmlState.context) {
			I.f = r;
			I.block = l
		}
		return H
	}
	function u(I) {
		var H = [];
		if (I.strong) {
			H.push(I.em ? x : j)
		} else {
			if (I.em) {
				H.push(g)
			}
		}
		if (I.header) {
			H.push(z)
		}
		if (I.quote) {
			H.push(B)
		}
		return H.length ? H.join(" ") : null
	}
	function b(I, H) {
		if (I.match(f, true)) {
			return u(H)
		}
		return undefined
	}
	function r(L, K) {
		var J = K.text(L, K);
		if (typeof J !== "undefined") {
			return J
		}
		var I = L.next();
		if (I === "\\") {
			L.next();
			return u(K)
		}
		if (I === "`") {
			return e(L, K, w(d, "`"))
		}
		if (I === "[") {
			return e(L, K, D)
		}
		if (I === "<" && L.match(/^\w/, false)) {
			L.backUp(1);
			return s(L, K, y)
		}
		var H = u(K);
		if (I === "*" || I === "_") {
			if (L.eat(I)) {
				return (K.strong = !K.strong) ? u(K) : H
			}
			return (K.em = !K.em) ? u(K) : H
		}
		return u(K)
	}
	function D(J, I) {
		while (!J.eol()) {
			var H = J.next();
			if (H === "\\") {
				J.next()
			}
			if (H === "]") {
				I.inline = I.f = h;
				return t
			}
		}
		return t
	}
	function h(J, I) {
		J.eatSpace();
		var H = J.next();
		if (H === "(" || H === "[") {
			return e(J, I, w(E, H === "(" ? ")" : "]"))
		}
		return "error"
	}
	function k(I, H) {
		if (I.match(/^[^\]]*\]:/, true)) {
			H.f = a;
			return t
		}
		return e(I, H, r)
	}
	function a(I, H) {
		I.eatSpace();
		I.match(/^[^\s]+/, true);
		H.f = H.inline = r;
		return E
	}
	function c(H) {
		if (!c[H]) {
			c[H] = new RegExp("^(?:[^\\\\\\" + H + "]|\\\\.)*(?:\\" + H + "|$)")
		}
		return c[H]
	}
	function w(I, J, H) {
		H = H || r;
		return function(L, K) {
			L.match(c(J));
			K.inline = K.f = H;
			return I
		}
	}
	return {
		startState: function() {
			return {
				f: l,
				block: l,
				htmlState: i.startState(),
				indentation: 0,
				inline: r,
				text: b,
				em: false,
				strong: false,
				header: false,
				quote: false
			}
		},
		copyState: function(H) {
			return {
				f: H.f,
				block: H.block,
				htmlState: CodeMirror.copyState(i, H.htmlState),
				indentation: H.indentation,
				inline: H.inline,
				text: H.text,
				em: H.em,
				strong: H.strong,
				header: H.header,
				quote: H.quote
			}
		},
		token: function(J, I) {
			if (J.sol()) {
				if (J.match(/^\s*$/, true)) {
					return o(I)
				}
				I.header = false;
				I.quote = false;
				I.f = I.block;
				var H = J.match(/^\s*/, true)[0].replace(/\t/g, "    ").length;
				I.indentationDiff = H - I.indentation;
				I.indentation = H;
				if (H > 0) {
					return null
				}
			}
			return I.f(J, I)
		},
		blankLine: o,
		getType: u
	}
}, "xml");
CodeMirror.defineMIME("text/x-markdown", "markdown");
Ext.define("Docs.History", {
	singleton: true,
	init: function() {
		Ext.util.History.useTopWindow = false;
		Ext.util.History.init(function() {
			this.historyLoaded = true;
			this.initialNavigate()
		}, this);
		Ext.util.History.on("change", function(b) {
			this.navigate(b, true)
		}, this)
	},
	notifyTabsLoaded: function() {
		this.tabsLoaded = true;
		this.initialNavigate()
	},
	initialNavigate: function() {
		if (this.tabsLoaded && this.historyLoaded) {
			this.navigate(Ext.util.History.getToken(), true)
		}
	},
	navigate: function(e, g) {
		var f = this.parseToken(e);
		if (f.url == "#!/api") {
			Docs.App.getController("Classes").loadIndex(g)
		} else {
			if (f.type === "api") {
				Docs.App.getController("Classes").loadClass(f.url, g)
			} else {
				if (f.url === "#!/casass") {
					Docs.App.getController("Casass").loadIndex()
				} else {
					if (f.type === "casass") {
						Docs.App.getController("Casass").loadPage(f.url, g)
					} else {
						if (f.url === "#!/shopmng") {
							Docs.App.getController("Shopmng").loadIndex()
						} else {
							if (f.type === "shopmng") {
								Docs.App.getController("Shopmng").loadPage(f.url, g)
							} else {
								if (f.url === "#!/erpcrm") {
									Docs.App.getController("Erpcrm").loadIndex()
								} else {
									if (f.type === "erpcrm") {
										Docs.App.getController("Erpcrm").loadPage(f.url, g)
									} else {
										if (Docs.App.getController("Welcome").isActive()) {
											Docs.App.getController("Welcome").loadIndex(g)
										} else {
											if (!this.noRepeatNav) {
												this.noRepeatNav = true;
												var h = Ext.getCmp("doctabs").staticTabs[0];
												if (h) {
													this.navigate(h.href, g)
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	parseToken: function(d) {
		var c = d && d.match(/!?(\/(api|casass|shopmng|erpcrm)(\/(.*))?)/);
		return c ? {
			type: c[2],
			url: "#!" + c[1]
		} : {}
	},
	push: function(e, f) {
		e = this.cleanUrl(e);
		if (!/^#!?/.test(e)) {
			e = "#!" + e
		}
		var d = Ext.util.History.getToken() || "";
		if ("#" + d.replace(/^%21/, "!") !== e) {
			Ext.util.History.add(e)
		}
	},
	cleanUrl: function(b) {
		return b.replace(/^[^#]*#/, "#")
	}
});









Ext.define("Docs.LocalStore", {
	storeName: "",
	init: function() {
		this.localStorage = !! window.localStorage;
		this.store = Ext.create(this.storeName);
		if (this.localStorage) {
			this.cleanup();
			this.store.load();
			if (window.addEventListener) {
				window.addEventListener("storage", Ext.Function.bind(this.onStorageChange, this), false)
			} else {
				window.attachEvent("onstorage", Ext.Function.bind(this.onStorageChange, this))
			}
		}
	},
	onStorageChange: function(b) {
		b = b || window.event;
		if (b.key === this.store.getProxy().id) {
			this.store.load()
		}
	},
	syncStore: function() {
		this.localStorage && this.store.sync()
	},
	cleanup: function() {
		var f = /-settings/;
		for (var d = 0; d < window.localStorage.length; d++) {
			var e = window.localStorage.key(d);
			if (!f.test(e)) {
				window.localStorage.removeItem(e)
			}
		}
	}
});
Ext.define("Docs.view.Header", {
	extend: "Ext.container.Container",
	alias: "widget.docheader",
	contentEl: "header-content",
	initComponent: function() {
		if (Docs.otherProducts) {
			this.style = "cursor: pointer;", this.cls = "dropdown";
			this.menu = Ext.create("Ext.menu.Menu", {
				renderTo: Ext.getBody(),
				plain: true,
				items: Docs.otherProducts
			})
		}
		this.callParent()
	},
	listeners: {
		afterrender: function(b) {
			if (this.menu) {
				b.el.addListener("click", function(d, a) {
					this.menu.showBy(this.el, "bl", [120, 0])
				}, this)
			}
		}
	}
});
Ext.define("Docs.controller.Content", {
	extend: "Ext.app.Controller",
	MIDDLE: 1,
	title: "",
	loadIndex: function(b) {
		b || Docs.History.push(this.baseUrl);
		this.getViewport().setPageTitle(this.title);
		Ext.getCmp("doctabs").activateTab(this.baseUrl);
		Ext.getCmp("card-panel").layout.setActiveItem(this.getIndex());
		this.getIndex().restoreScrollState()
	},
	opensNewWindow: function(b) {
		return b.button === this.MIDDLE || b.shiftKey || b.ctrlKey
	},
	getBaseUrl: function() {
		return document.location.href.replace(/\/?(index.html|template.html)?#.*/, "")
	}
});
Ext.define("Docs.Syntax", {
	singleton: true,
	highlight: function(b) {
		Ext.Array.forEach(Ext.query("pre", b.dom || b), function(a) {
			a = Ext.get(a);
			if (a.child("code")) {
				if (!(a.hasCls("inline-casass") && a.hasCls("preview"))) {
					a.addCls("prettyprint")
				}
			} else {
				if (!a.parent(".CodeMirror") && !a.hasCls("hierarchy")) {
					a.addCls("notpretty")
				}
			}
		});
		prettyPrint()
	}
});
Ext.define("Docs.ClassRegistry", {
	singleton: true,
	canonicalName: function(b) {
		if (!this.altNames) {
			this.altNames = {};
			Ext.each(Docs.data.search, function(a) {
				if (a.type === "class" && !/:/.test(a.cls)) {
					this.altNames[a.cls] = a.id
				}
			}, this)
		}
		return this.altNames[b] || b
	},
	search: function(M) {
		var r = 5;
		var N = 4;
		var R = 3;
		var G = new Array(r * N * R);
		for (var D = 0; D < G.length; D++) {
			G[D] = []
		}
		var J = r * N * 0;
		var T = r * N * 1;
		var L = r * N * 2;
		var O = r * 0;
		var A = r * 1;
		var Q = r * 2;
		var E = r * 3;
		var H = /[.:]/.test(M);
		var F = Ext.escapeRe(M);
		var z = new RegExp("^" + F + "$", "i");
		var S = new RegExp("^" + F, "i");
		var I = new RegExp(F, "i");
		var P = Docs.data.search;
		for (var D = 0, B = P.length; D < B; D++) {
			var K = P[D];
			var i = H ? K.fullName : K.name;
			var C = K.meta.removed ? E : (K.meta["private"] ? Q : (K.meta.deprecated ? A : O));
			if (z.test(i)) {
				G[K.sort + C + J].push(this.highlightMatch(K, z))
			} else {
				if (S.test(i)) {
					G[K.sort + C + T].push(this.highlightMatch(K, S))
				} else {
					if (I.test(i)) {
						G[K.sort + C + L].push(this.highlightMatch(K, I))
					}
				}
			}
		}
		return Ext.Array.flatten(G)
	},
	highlightMatch: function(c, d) {
		c = Ext.apply({}, c);
		c.name = c.name.replace(d, "<strong>$&</strong>");
		c.fullName = c.fullName.replace(d, "<strong>$&</strong>");
		return c
	}
});
Ext.define("Docs.store.Search", {
	extend: "Ext.data.Store",
	fields: ["name", "fullName", "icon", "url", "meta", "sort"],
	proxy: {
		type: "memory",
		reader: {
			type: "json"
		}
	}
});
Ext.define("Docs.model.Setting", {
	fields: ["id", "key", "value"],
	extend: "Ext.data.Model",
	requires: ["Ext.data.proxy.LocalStorage"],
	proxy: {
		type: window.localStorage ? "localstorage" : "memory",
		id: Docs.data.localStorageDb + "-settings"
	}
});
Ext.define("Docs.view.search.Dropdown", {
	extend: "Ext.view.View",
	alias: "widget.searchdropdown",
	floating: true,
	autoShow: false,
	autoRender: true,
	toFrontOnShow: true,
	focusOnToFront: false,
	store: "Search",
	id: "search-dropdown",
	overItemCls: "x-view-over",
	trackOver: true,
	itemSelector: "div.item",
	singleSelect: true,
	pageStart: 0,
	pageSize: 10,
	initComponent: function() {
		this.addEvents("changePage", "footerClick");
		this.tpl = new Ext.XTemplate('<tpl for=".">', '<div class="item">', '<div class="icon {icon}"></div>', '<div class="meta">{[this.getMetaTags(values.meta)]}</div>', '<div class="title {[this.getCls(values.meta)]}">{name}</div>', '<div class="class">{fullName}</div>', "</div>", "</tpl>", '<div class="footer">', '<tpl if="this.getTotal()">', '<a href="#" class="prev">&lt;</a>', '<span class="total">{[this.getStart()+1]}-{[this.getEnd()]} of {[this.getTotal()]}</span>', '<a href="#" class="next">&gt;</a>', "<tpl else>", '<span class="total">Nothing found</span>', "</tpl>", "</div>", {
			getCls: function(b) {
				return b["private"] ? "private" : (b.removed ? "removed" : "")
			},
			getMetaTags: function(b) {
				return Ext.Array.map(Docs.data.signatures, function(a) {
					return b[a.key] ? '<span class="signature ' + a.key + '">' + (a["short"]) + "</span>" : ""
				}).join(" ")
			},
			getTotal: Ext.bind(this.getTotal, this),
			getStart: Ext.bind(this.getStart, this),
			getEnd: Ext.bind(this.getEnd, this)
		});
		this.on("afterrender", function() {
			this.el.addListener("click", function() {
				this.fireEvent("changePage", this, -1)
			}, this, {
				preventDefault: true,
				delegate: ".prev"
			});
			this.el.addListener("click", function() {
				this.fireEvent("changePage", this, +1)
			}, this, {
				preventDefault: true,
				delegate: ".next"
			});
			this.el.addListener("click", function() {
				this.fireEvent("footerClick", this)
			}, this, {
				delegate: ".footer"
			})
		}, this);
		this.callParent(arguments)
	},
	setTotal: function(b) {
		this.total = b
	},
	getTotal: function() {
		return this.total
	},
	setStart: function(b) {
		this.pageStart = b
	},
	getStart: function(b) {
		return this.pageStart
	},
	getEnd: function(c) {
		var d = this.pageStart + this.pageSize;
		return d > this.total ? this.total : d
	}
});
Ext.define("Docs.view.TabMenu", {
	extend: "Ext.menu.Menu",
	plain: true,
	componentCls: "tab-menu",
	initComponent: function() {
		this.addEvents("tabItemClick", "closeAllTabs");
		this.items = [{
			text: "关闭其它标签",
			iconCls: "close",
			cls: "close-all",
			handler: function() {
				this.fireEvent("closeAllTabs")
			},
			scope: this
		}];
		this.callParent()
	},
	addTab: function(c, d) {
		this.insert(this.items.length - 1, {
			text: c.text,
			iconCls: c.iconCls,
			origIcon: c.iconCls,
			href: c.href,
			cls: d,
			handler: this.onTabItemClick,
			scope: this
		})
	},
	onTabItemClick: function(b) {
		this.fireEvent("tabItemClick", b)
	},
	addTabCls: function(c, d) {
		this.items.each(function(a) {
			if (a.href === c.href) {
				a.addCls(d)
			}
		})
	}
});
Ext.define("Docs.view.Scrolling", {
	onClassMixedIn: function(b) {
		Ext.Function.interceptBefore(b.prototype, "initComponent", this.prototype.initScrolling)
	},
	initScrolling: function() {
		this.scrollContext = "index";
		this.scrollState = {};
		this.on("afterrender", function() {
			this.getScrollEl().addListener("scroll", this.saveScrollState, this)
		}, this)
	},
	setScrollContext: function(b) {
		this.scrollContext = b
	},
	eraseScrollContext: function(b) {
		delete this.scrollState[b]
	},
	saveScrollState: function() {
		this.scrollState[this.scrollContext] = this.getScrollTop()
	},
	restoreScrollState: function() {
		this.setScrollTop(this.scrollState[this.scrollContext] || 0)
	},
	scrollToView: function(d, c) {
		d = Ext.get(d);
		c = c || {};
		if (d) {
			this.setScrollTop(this.getScrollTop() + d.getY() + (c.offset || 0));
			c.highlight && d.highlight()
		}
	},
	getScrollTop: function() {
		return this.getScrollEl().getScroll()["top"]
	},
	setScrollTop: function(b) {
		return this.getScrollEl().scrollTo("top", b)
	},
	scrollToTop: function() {
		this.getScrollEl().scrollTo("top")
	},
	getScrollEl: function() {
		return this.body || this.el
	}
});
Ext.define("Docs.ContentGrabber", {
	singleton: true,
	get: function(f) {
		var e;
		var d = Ext.get(f);
		if (d) {
			e = d.dom.innerHTML;
			d.remove()
		}
		return e
	}
});
Ext.define("Docs.view.cls.Header", {
	extend: "Ext.container.Container",
	padding: "10 0 17 0",
	height: 55,
	alias: "widget.classheader",
	cls: "classheader",
	initComponent: function() {
		this.tpl = Ext.create("Ext.XTemplate", '<h1 class="{[this.getClass(values)]}">', '<tpl if="Docs.data.source">', '<a href="#" class="class-source-link">{name}', '<span class="class-source-tip">View source...</span>', "</a>", "<tpl else>", '<strong class="class-source-link">{name}</strong>', "</tpl>", '<tpl if="singleton">', "<span>singleton</span>", "</tpl>", "<tpl if=\"values['enum']\">", '<span>enum of <b>{[values["enum"].type]}</b></span>', "</tpl>", "{[this.renderAliases(values.aliases)]}", "{[this.renderMetaTags(values.meta)]}", "</h1>", '<tpl if="Docs.data.showPrintButton">', '<a class="print" href="?print=/api/{name}" target="_blank">Print</a>', "</tpl>", {
			getClass: function(b) {
				if (b.singleton) {
					return "singleton"
				} else {
					if (b.component) {
						return "component"
					} else {
						return "class"
					}
				}
			},
			renderAliases: function(e) {
				var f = {
					widget: "xtype",
					plugin: "ptype",
					feature: "ftype"
				};
				var d = [];
				e && Ext.Object.each(e, function(a, b) {
					d.push((f[a] || a) + ": " + b.join(", "))
				});
				if (d.length > 0) {
					return "<span>" + d.join(", ") + "</span>"
				} else {
					return ""
				}
			},
			renderMetaTags: function(b) {
				return " " + Ext.Array.map(Docs.data.signatures, function(a) {
					return b[a.key] ? '<span class="signature ' + a.key + '">' + (a["long"]) + "</span>" : ""
				}).join(" ")
			}
		});
		if (Docs.data.source) {
			this.on("render", this.initSourceLink, this)
		}
		this.callParent()
	},
	initSourceLink: function() {
		this.classLinkEvent("click", function() {
			var d = this.loadedCls.files;
			if (d.length === 1) {
				window.open("source/" + d[0].href)
			} else {
				var c = this.createFileMenu(d);
				c.showBy(this, undefined, [58, -20])
			}
		}, this);
		this.classLinkEvent("mouseover", function() {
			this.el.down(".class-source-tip").addCls("hover")
		}, this);
		this.classLinkEvent("mouseout", function() {
			this.el.down(".class-source-tip").removeCls("hover")
		}, this)
	},
	classLinkEvent: function(d, e, f) {
		this.el.on(d, e, f, {
			preventDefault: true,
			delegate: "a.class-source-link"
		})
	},
	createFileMenu: function(b) {
		return new Ext.menu.Menu({
			items: Ext.Array.map(b, function(a) {
				return {
					text: a.filename,
					handler: function() {
						window.open("source/" + a.href)
					}
				}
			}, this)
		})
	},
	load: function(b) {
		this.loadedCls = b;
		this.update(this.tpl.apply(b))
	}
});
Ext.define("Docs.Tip", {
	singleton: true,
	show: function(g, e, f) {
		f = f || "right";
		this.tips = this.tips || {};
		if (this.tips[f]) {
			var h = this.tips[f];
			h.update(g);
			h.setTarget(e);
			h.show()
		} else {
			var h = this.tips[f] = Ext.create("Ext.tip.ToolTip", {
				anchor: f,
				target: e,
				html: g
			});
			h.show()
		}
	}
});
Ext.define("Docs.view.SimpleSelectBehavior", {
	mixins: {
		observable: "Ext.util.Observable"
	},
	constructor: function(c, d) {
		this.mixins.observable.constructor.call(this, {
			listeners: d
		});
		c.on({
			select: this.onSelect,
			deselect: this.onDeselect,
			scope: this
		})
	},
	onSelect: function(c, d) {
		this.selectedItem = d;
		this.fireEvent("select", d)
	},
	onDeselect: function(c, d) {
		this.selectedItem = undefined;
		Ext.Function.defer(function() {
			if (!this.selectedItem) {
				this.fireEvent("deselect", d)
			}
		}, 10, this)
	}
});
Ext.define("Docs.view.cls.MemberWrap", {
	constructor: function(b) {
		Ext.apply(this, b);
		this.el = Ext.get(b.el)
	},
	setExpanded: function(b) {
		if (b) {
			if (!this.isExpanded()) {
				this.el.addCls("open")
			}
		} else {
			this.el.removeCls("open")
		}
	},
	isExpanded: function() {
		return this.el.hasCls("open")
	},
	getDefinedIn: function() {
		return this.el.down(".meta .defined-in").getAttribute("rel")
	},
	getMemberId: function() {
		return this.el.getAttribute("id")
	}
});
Ext.define("Docs.view.DocTree", {
	extend: "Ext.tree.Panel",
	alias: "widget.doctree",
	cls: "doc-tree iScroll",
	useArrows: true,
	rootVisible: false,
	border: false,
	bodyBorder: false,
	initComponent: function() {
		this.addEvents("urlclick");
		this.root.expanded = true;
		this.on("itemclick", this.onItemClick, this);
		this.on("beforeitemcollapse", this.handleBeforeExpandCollapse, this);
		this.on("beforeitemexpand", this.handleBeforeExpandCollapse, this);
		this.callParent();
		this.nodeTpl = new Ext.XTemplate('<a href="{url}" rel="{url}">{text}</a>');
		this.initNodeLinks()
	},
	initNodeLinks: function() {
		this.getRootNode().cascadeBy(this.applyNodeTpl, this)
	},
	applyNodeTpl: function(b) {
		if (b.get("leaf")) {
			b.set("text", this.nodeTpl.apply({
				text: b.get("text"),
				url: b.raw.url
			}));
			b.commit()
		}
	},
	onItemClick: function(h, j, k, l, i) {
		var e = j.raw ? j.raw.url : j.data.url;
		if (e) {
			this.fireEvent("urlclick", e, i)
		} else {
			if (!j.isLeaf()) {
				if (j.isExpanded()) {
					j.collapse(false)
				} else {
					j.expand(false)
				}
			}
		}
	},
	selectUrl: function(d) {
		var c = this.findNodeByUrl(d);
		if (c) {
			c.bubble(function(a) {
				a.expand()
			});
			this.getSelectionModel().select(c)
		} else {
			this.getSelectionModel().deselectAll()
		}
	},
	findNodeByUrl: function(b) {
		return this.getRootNode().findChildBy(function(a) {
			return b === a.raw.url
		}, this, true)
	},
	findRecordByUrl: function(d) {
		var c = this.findNodeByUrl(d);
		return c ? c.raw : undefined
	},
	handleBeforeExpandCollapse: function(b) {
		if (this.getView().isAnimating(b)) {
			return false
		}
	}
});
Ext.define("Docs.view.cls.Logic", {
	showPrivateClasses: false,
	constructor: function(b) {
		Ext.apply(this, b)
	}
});
Ext.define("Docs.controller.Welcome", {
	extend: "Docs.controller.Content",
	baseUrl: "#",
	refs: [{
		ref: "viewport",
		selector: "#viewport"
	}, {
		ref: "index",
		selector: "#welcomeindex"
	}],
	init: function() {
		this.addEvents("loadIndex")
	},
	loadIndex: function() {
		this.fireEvent("loadIndex");
		Ext.getCmp("treecontainer").hide();
		this.callParent([true])
	},
	isActive: function() {
		return !!this.getIndex().getTab()
	}
});
Ext.define("Docs.controller.Failure", {
	extend: "Docs.controller.Content",
	baseUrl: "#",
	refs: [{
		ref: "viewport",
		selector: "#viewport"
	}, {
		ref: "index",
		selector: "#failure"
	}],
	show404: function(c) {
		var d = new Ext.XTemplate("<h1>Oops...</h1>", "<p>{msg}</p>", "<p>Maybe it was renamed to something else?<br> Or maybe your internet connection has failed?<br> ", "This would be sad. Hopefully it's just a bug on our side.</p>", "<p>Most likely you just followed a broken link inside this very documentation. ", "Go and report it to the authors of the docs.</p>", "<p>But if you think it's a bug in JSDuck documentation-generator itself, feel free to open ", "an issue at the <a href='https://github.com/senchalabs/jsduck/issues'>JSDuck issue tracker</a>.</p>", "<p>Sorry for all this :(</p>");
		Ext.getCmp("failure").update(d.apply({
			msg: c
		}));
		Ext.getCmp("card-panel").layout.setActiveItem("failure")
	}
});
Ext.define("Docs.controller.Classes", {
	extend: "Docs.controller.Content",
	baseUrl: "#!/api",
	title: "API Documentation",
	requires: ["Docs.History", "Docs.Syntax", "Docs.ClassRegistry"],
	refs: [{
		ref: "viewport",
		selector: "#viewport"
	}, {
		ref: "index",
		selector: "#classindex"
	}, {
		ref: "header",
		selector: "classheader"
	}, {
		ref: "overview",
		selector: "classoverview"
	}, {
		ref: "tabPanel",
		selector: "classtabpanel"
	}, {
		ref: "tree",
		selector: "#classtree"
	}, {
		ref: "favoritesGrid",
		selector: "#favorites-grid"
	}],
	cache: {},
	init: function() {
		this.addEvents("showIndex", "showClass", "showMember");
		Ext.getBody().addListener("click", function(c, d) {
			this.handleUrlClick(decodeURI(d.href), c)
		}, this, {
			preventDefault: true,
			delegate: ".docClass"
		});
		this.control({
			classtree: {
				urlclick: function(d, c) {
					this.handleUrlClick(d, c, this.getTree())
				}
			},
			toolbar: {
				toggleExpanded: function(b) {
					this.getOverview().setAllMembersExpanded(b)
				}
			},
			classoverview: {
				afterrender: function(b) {
					b.el.addListener("click", function(i, k) {
						var h = Ext.get(k).up(".member"),
							l = h.down(".meta .defined-in"),
							j = l.getAttribute("rel"),
							a = h.getAttribute("id");
						if (this.getOverview().isMemberExpanded(a)) {
							this.setExpanded(a, false)
						} else {
							this.setExpanded(a, true);
							this.fireEvent("showMember", j, a)
						}
					}, this, {
						preventDefault: true,
						delegate: ".expandable"
					});
					b.el.addListener("click", Ext.emptyFn, this, {
						preventDefault: true,
						delegate: ".not-expandable"
					})
				}
			},
			treecontainer: {
				afterrender: function(b) {
					b.el.addListener("dblclick", function() {
						if (b.getWidth() < 30) {
							b.setWidth(b.expandedWidth)
						} else {
							b.expandedWidth = b.getWidth();
							b.setWidth(20)
						}
					}, this, {
						delegate: ".x-resizable-handle"
					})
				}
			},
			doctabs: {
				tabClose: function(b) {
					this.getOverview().eraseScrollContext(b)
				}
			}
		})
	},
	setExpanded: function(f, d) {
		var e = this.currentCls;
		if (!e.expanded) {
			e.expanded = {}
		}
		this.getOverview().setMemberExpanded(f, d);
		if (d) {
			e.expanded[f] = d
		} else {
			delete e.expanded[f]
		}
	},
	applyExpanded: function(b) {
		Ext.Object.each(b.expanded || {}, function(a) {
			Ext.get(a).addCls("open")
		}, this)
	},
	handleUrlClick: function(d, f, e) {
		d = Docs.History.cleanUrl(d);
		if (this.opensNewWindow(f)) {
			window.open(d);
			e && e.selectUrl(this.currentCls ? "#!/api/" + this.currentCls.name : "")
		} else {
			this.loadClass(d)
		}
	},
	loadIndex: function(b) {
		Ext.getCmp("treecontainer").showTree("classtree");
		this.callParent(arguments);
		this.fireEvent("showIndex")
	},
	loadClass: function(f, i) {
		Ext.getCmp("card-panel").layout.setActiveItem("classcontainer");
		Ext.getCmp("treecontainer").showTree("classtree");
		i || Docs.History.push(f);
		var j = f.match(/^#!\/api\/(.*?)(?:-(.*))?$/);
		var g = Docs.ClassRegistry.canonicalName(j[1]);
		var h = j[2];
		if (this.getOverview()) {
			this.getOverview().setLoading(true)
		}
		if (this.cache[g]) {
			this.showClass(this.cache[g], h)
		} else {
			this.cache[g] = "in-progress";
			Ext.data.JsonP.request({
				url: this.getBaseUrl() + "/output/" + g + ".js",
				callbackName: g.replace(/\./g, "_"),
				success: function(b, a) {
					this.cache[g] = b;
					this.showClass(b, h)
				},
				failure: function(b, a) {
					this.cache[g] = false;
					this.getOverview().setLoading(false);
					this.getController("Failure").show404("Class <b>" + g + "</b> was not found.")
				},
				scope: this
			})
		}
	},
	showClass: function(e, f) {
		var d = false;
		if (e === "in-progress") {
			return
		}
		this.getOverview().setLoading(false);
		this.getViewport().setPageTitle(e.name);
		if (this.currentCls !== e) {
			this.currentCls = e;
			this.getHeader().load(e);
			this.getOverview().load(e);
			this.applyExpanded(e);
			d = true
		}
		this.currentCls = e;
		this.getOverview().setScrollContext("#!/api/" + e.name);
		if (f) {
			this.getOverview().scrollToEl("#" + f);
			this.fireEvent("showMember", e.name, f)
		} else {
			this.getOverview().restoreScrollState()
		}
		this.getTree().selectUrl("#!/api/" + e.name);
		this.fireEvent("showClass", e.name, {
			reRendered: d
		})
	}
});
Ext.define("Docs.controller.Search", {
	extend: "Ext.app.Controller",
	requires: ["Docs.ClassRegistry", "Docs.store.Search", "Docs.History"],
	stores: ["Search"],
	refs: [{
		ref: "field",
		selector: "#search-field"
	}],
	pageIndex: 0,
	pageSize: 10,
	init: function() {
		this.control({
			"#search-dropdown": {
				itemclick: function(c, d) {
					this.loadRecord(d)
				},
				changePage: function(c, d) {
					this.pageIndex += d;
					this.search(this.getField().getValue());
					this.keepDropdown()
				},
				footerClick: function(b) {
					this.keepDropdown()
				}
			},
			"#search-field": {
				keyup: function(m, l) {
					var j = this.getDropdown();
					m.setHideTrigger(m.getValue().length === 0);
					if (l.keyCode === Ext.EventObject.ESC || !m.value) {
						j.hide();
						m.setValue("");
						return
					} else {
						j.show()
					}
					var h = j.getSelectionModel();
					var i = h.getLastSelected();
					var n = j.store.indexOf(i);
					var k = j.store.getCount() - 1;
					if (l.keyCode === Ext.EventObject.UP) {
						if (n === undefined) {
							h.select(0)
						} else {
							h.select(n === 0 ? k : (n - 1))
						}
					} else {
						if (l.keyCode === Ext.EventObject.DOWN) {
							if (n === undefined) {
								h.select(0)
							} else {
								h.select(n === k ? 0 : n + 1)
							}
						} else {
							if (l.keyCode === Ext.EventObject.ENTER) {
								l.preventDefault();
								i && this.loadRecord(i)
							} else {
								this.pageIndex = 0;
								clearTimeout(this.searchTimeout);
								this.searchTimeout = Ext.Function.defer(function() {
									this.search(m.value)
								}, 50, this)
							}
						}
					}
				},
				focus: function(b) {
					if (b.value && this.getDropdown().store.getCount() > 0) {
						this.getDropdown().show()
					}
				},
				blur: function() {
					var b = this.getDropdown();
					this.hideTimeout = Ext.Function.defer(b.hide, 500, b)
				}
			}
		})
	},
	getDropdown: function() {
		return this.dropdown || (this.dropdown = Ext.getCmp("search-dropdown"))
	},
	keepDropdown: function() {
		clearTimeout(this.hideTimeout);
		this.getField().focus()
	},
	loadRecord: function(b) {
		Docs.History.navigate(b.get("url"));
		this.getDropdown().hide()
	},
	search: function(h) {
		var e = Docs.ClassRegistry.search(h);
		if (this.pageIndex < 0) {
			this.pageIndex = 0
		} else {
			if (this.pageIndex > Math.floor(e.length / this.pageSize)) {
				this.pageIndex = Math.floor(e.length / this.pageSize)
			}
		}
		var g = this.pageIndex * this.pageSize;
		var f = g + this.pageSize;
		this.getDropdown().setTotal(e.length);
		this.getDropdown().setStart(g);
		this.getDropdown().getStore().loadData(e.slice(g, f));
		this.getDropdown().alignTo("search-field", "bl", [-12, -2]);
		if (e.length > 0) {
			this.getDropdown().getSelectionModel().select(0)
		}
	}
});
Ext.define("Docs.store.Settings", {
	extend: "Ext.data.Store",
	requires: ["Docs.model.Setting"],
	model: "Docs.model.Setting"
});
Ext.define("Docs.Settings", {
	extend: "Docs.LocalStore",
	singleton: true,
	requires: "Docs.store.Settings",
	storeName: "Docs.store.Settings",
	defaults: {
		show: {
			"public": true,
			"protected": false,
			"private": false,
			deprecated: false,
			removed: false,
			inherited: true,
			accessor: true
		},
		showPrivateClasses: false,
		classTreeLogic: "PackageLogic"
	},
	set: function(d, f) {
		var e = this.store.findExact("key", d);
		if (e > -1) {
			this.store.removeAt(e)
		}
		this.store.add({
			key: d,
			value: f
		});
		this.syncStore()
	},
	get: function(c) {
		var d = this.store.findExact("key", c);
		return d > -1 ? this.store.getAt(d).get("value") : this.defaults[c]
	}
});
Ext.define("Docs.controller.Tabs", {
	extend: "Ext.app.Controller",
	requires: ["Docs.History", "Docs.Settings"],
	refs: [{
		ref: "welcomeIndex",
		selector: "#welcomeindex"
	}, {
		ref: "classIndex",
		selector: "#classindex"
	}, {
		ref: "casassIndex",
		selector: "#casassindex"
	}, {
		ref: "shopmngIndex",
		selector: "#shopmngindex"
	}, {
		ref: "erpcrmIndex",
		selector: "#erpcrmindex"
	}, {
		ref: "classTree",
		selector: "#classtree"
	}, {
		ref: "casassTree",
		selector: "#casasstree"
	}, {
		ref: "shopmngTree",
		selector: "#shopmngtree"
	}, {
		ref: "erpcrmTree",
		selector: "#erpcrmtree"
	}, {
		ref: "doctabs",
		selector: "#doctabs"
	}],
	init: function() {
		this.getController("Classes").addListener({
			showClass: function(b) {
				this.addTabFromTree("#!/api/" + b)
			},
			scope: this
		});
		this.getController("Casass").addListener({
			showCasass: function(b) {
				this.addTabFromTree(b)
			},
			scope: this
		});
		this.getController("Shopmng").addListener({
			showShopmng: function(b) {
				this.addTabFromTree(b)
			},
			scope: this
		});
		this.getController("Erpcrm").addListener({
			showErpcrm: function(b) {
				this.addTabFromTree(b)
			},
			scope: this
		});
		this.control({
			"[componentCls=doctabs]": {
				tabActivate: function(d, c) {
					Docs.History.push(d, c)
				},
				scope: this
			}
		})
	},
	onLaunch: function() {
		this.getDoctabs().setStaticTabs(Ext.Array.filter([this.getWelcomeIndex().getTab(), this.getClassIndex().getTab(), this.getCasassIndex().getTab(), this.getShopmngIndex().getTab(), this.getErpcrmIndex().getTab()], function(a) {
			return a
		}));
		var b = Docs.Settings.get("tabs");
		if (b) {
			Ext.Array.forEach(b, function(a) {
				this.addTabFromTree(a, {
					animate: false
				})
			}, this)
		}
		Docs.History.notifyTabsLoaded()
	},
	addTabFromTree: function(h, g) {
		var e = this.getTree(h);
		var f = e.findRecordByUrl(h);
		if (f) {
			this.addTab(f, g)
		}
	},
	addTab: function(d, c) {
		c = c || {
			animate: true,
			activate: true
		};
		this.getDoctabs().addTab({
			href: d.url,
			text: d.text,
			iconCls: d.iconCls
		}, c)
	},
	getTree: function(b) {
		if (/#!?\/api/.test(b)) {
			return this.getClassTree()
		} else {
			if (/#!?\/casass/.test(b)) {
				return this.getCasassTree()
			} else {
				if (/#!?\/shopmng/.test(b)) {
					return this.getShopmngTree()
				} else {
					if (/#!?\/erpcrm/.test(b)) {
						return this.getErpcrmTree()
					} else {
						return this.getClassTree()
					}
				}
			}
		}
	}
});
Ext.define("Docs.view.search.Container", {
	extend: "Ext.container.Container",
	alias: "widget.searchcontainer",
	requires: "Docs.view.search.Dropdown",
	initComponent: function() {
		if (Docs.data.search.length) {
			this.cls = "search";
			this.items = [{
				xtype: "triggerfield",
				triggerCls: "reset",
				emptyText: "Search",
				width: 170,
				id: "search-field",
				enableKeyEvents: true,
				hideTrigger: true,
				onTriggerClick: function() {
					this.reset();
					this.focus();
					this.setHideTrigger(true);
					Ext.getCmp("search-dropdown").hide()
				}
			}, {
				xtype: "searchdropdown"
			}]
		}
		this.callParent()
	}
});
Ext.define("Docs.view.Tabs", {
	extend: "Ext.container.Container",
	alias: "widget.doctabs",
	id: "doctabs",
	componentCls: "doctabs",
	requires: ["Docs.History", "Docs.view.TabMenu"],
	minTabWidth: 80,
	maxTabWidth: 160,
	animDuration: 150,
	tabs: [],
	tabsInBar: [],
	tabCache: {},
	staticTabs: [],
	initComponent: function() {
		this.addEvents("tabActivate", "tabClose");
		this.tpl = Ext.create("Ext.XTemplate", '<tpl for=".">', '<div class="doctab overview {cls}{active}">', '<div class="l"></div>', '<div class="m">', '<tpl if="text">', '<a class="tabUrl ov-tab-text" href="{href}">{text}</a>', "<tpl else>", '<a class="tabUrl ov-tab" href="{href}">&nbsp;</a>', "</tpl>", "</div>", '<div class="r"></div>', "</div>", "</tpl>", '<div style="float: left; width: 8px">&nbsp;</div>', '<div class="tab-overflow"></div>');
		this.html = this.tpl.applyTemplate(this.staticTabs);
		this.tabTpl = Ext.create("Ext.XTemplate", '<div class="doctab', '{[values.active ? (" active") : ""]}', '" style="', '{[values.width ? ("width: " + values.width + "px;") : ""]}', '{[values.visible ? "" : "visibility: hidden;"]}">', '<div class="l"></div>', '<div class="m">', '<span class="icn {iconCls}">&nbsp;</span>', '<a class="tabUrl main-tab" href="{href}">{text}</a>', "</div>", '<div class="r"><a class="close" href="#">&nbsp;</a></div>', "</div>");
		this.on("afterrender", this.initListeners, this);
		this.on("resize", this.refresh, this);
		this.callParent()
	},
	initListeners: function() {
		this.el.on("mouseover", function(c, d) {
			Ext.get(d).addCls("ovr")
		}, this, {
			delegate: ".close"
		});
		this.el.on("mouseout", function(c, d) {
			Ext.get(d).removeCls("ovr")
		}, this, {
			delegate: ".close"
		});
		this.el.on("click", function(f, d) {
			var e = Ext.get(d).up(".doctab").down(".tabUrl").getAttribute("href");
			e = Docs.History.cleanUrl(e);
			this.removeTab(e);
			this.fireEvent("tabClose", e)
		}, this, {
			delegate: ".close",
			preventDefault: true
		});
		this.el.on("click", function(f, d) {
			if (Ext.fly(f.getTarget()).hasCls("close")) {
				return
			}
			var e = Ext.get(d).down(".tabUrl").getAttribute("href");
			this.fireEvent("tabActivate", e, {
				navigate: true
			})
		}, this, {
			delegate: ".doctab"
		});
		this.el.on("contextmenu", function(c, d) {
			if (!Ext.get(d).hasCls("overview")) {
				this.createMenu().showBy(d)
			}
		}, this, {
			delegate: ".doctab",
			preventDefault: true
		});
		this.el.on("click", Ext.emptyFn, this, {
			delegate: ".tabUrl",
			preventDefault: true
		});
		this.el.on("mouseleave", function() {
			if (this.shouldResize) {
				this.resizeTabs({
					animate: true
				})
			}
		}, this)
	},
	setStaticTabs: function(b) {
		this.staticTabs = b;
		this.refresh()
	},
	getStaticTabs: function(b) {
		return this.staticTabs
	},
	addTab: function(d, c) {
		this.tabCache[d.href] = d;
		if (!this.hasTab(d.href)) {
			this.tabs.push(d.href);
			if (this.roomForNewTab()) {
				this.addTabToBar(d, c)
			}
			this.addTabToMenu(this.overflowButton.menu, d)
		}
		if (c.activate) {
			this.activateTab(d.href)
		}
		this.saveTabs()
	},
	removeTab: function(d) {
		if (!this.hasTab(d)) {
			return
		}
		this.removeFromArray(this.tabs, d);
		var e = this.removeFromArray(this.tabsInBar, d);
		var f = this.tabs[this.tabsInBar.length];
		if (f) {
			this.tabsInBar.push(f)
		}
		if (this.activeTab === d) {
			if (this.tabs.length === 0) {
				Docs.App.getController(this.getControllerName(d)).loadIndex()
			} else {
				if (e === this.tabs.length) {
					e -= 1
				}
				this.activateTab(this.tabs[e]);
				this.fireEvent("tabActivate", this.tabs[e])
			}
		}
		if (this.tabs.length >= this.maxTabsInBar()) {
			this.refresh()
		} else {
			this.removeTabFromBar(d)
		}
		this.saveTabs()
	},
	removeFromArray: function(f, d) {
		var e = Ext.Array.indexOf(f, d);
		if (e !== -1) {
			Ext.Array.erase(f, e, 1)
		}
		return e
	},
	activateTab: function(d) {
		this.activeTab = d;
		if (!this.inTabs(d)) {
			this.swapLastTabWith(d)
		}
		Ext.Array.each(Ext.query(".doctab a.tabUrl"), function(a) {
			Ext.get(a).up(".doctab").removeCls(["active", "highlight"])
		});
		var e = Ext.query('.doctab a[href="' + d + '"]')[0];
		if (e) {
			var f = Ext.get(e).up(".doctab");
			f.addCls("active")
		}
		this.highlightOverviewTab(d)
	},
	refresh: function() {
		var i = this.tpl.applyTemplate(this.staticTabs);
		var f = this.maxTabsInBar() < this.tabs.length ? this.maxTabsInBar() : this.tabs.length;
		this.tabsInBar = this.tabs.slice(0, f);
		for (var j = 0; j < f; j++) {
			var h = this.tabCache[this.tabs[j]];
			var g = Ext.apply(h, {
				visible: true,
				active: this.activeTab === h.href,
				width: this.tabWidth()
			});
			i += this.tabTpl.applyTemplate(g)
		}
		this.el.dom.innerHTML = i;
		if (this.activeTab && this.activeTab !== this.tabs[f - 1]) {
			this.activateTab(this.activeTab);
			this.fireEvent("tabActivate", this.activeTab)
		}
		this.highlightOverviewTab(this.activeTab);
		this.createOverflowButton();
		this.addToolTips()
	},
	closeAllTabs: function() {
		//Linpn: 删除TAB页里的内容
		for(var i=0; i<this.tabs.length; i++){
			if(this.tabs[i]!=this.activeTab){
				var tab = Ext.getCmp("tab-"+this.tabs[i])
				if(tab){
					tab.update("");
					tab.findParentByType("container").remove(tab);
					delete tab;
				}
			}
		}
		
		if (this.inTabBar(this.activeTab)) {
			this.tabs = this.tabsInBar = [this.activeTab]
		} else {
			this.tabs = this.tabsInBar = []
		}
		this.refresh();
		this.saveTabs();
	},
	tabData: function() {
		return Ext.Array.map(this.tabs, function(b) {
			return this.tabCache[b]
		}, this)
	},
	roomForNewTab: function() {
		return this.tabsInBar.length < this.maxTabsInBar()
	},
	hasTab: function(b) {
		return Ext.Array.contains(this.tabs, b)
	},
	addTabToBar: function(e, d) {
		this.tabsInBar.push(e.href);
		var f = Ext.get(this.tabTpl.append(this.el.dom, e));
		if (d.animate && !Ext.isIE) {
			f.setStyle("width", "10px");
			f.setStyle({
				visibility: "visible"
			});
			f.animate({
				to: {
					width: this.tabWidth()
				}
			})
		} else {
			f.setStyle({
				visibility: "visible"
			})
		}
		this.resizeTabs(d)
	},
	inTabBar: function(b) {
		return Ext.Array.contains(this.tabsInBar, b)
	},
	inTabs: function(d) {
		var c = Ext.Array.pluck(this.staticTabs, "href").concat(this.tabsInBar);
		return Ext.Array.contains(c, d)
	},
	removeTabFromBar: function(d) {
		var c = this.getTabEl(d);
		c.dom.removed = true;
		if (Ext.isIE) {
			c.remove();
			this.createOverflowButton()
		} else {
			c.animate({
				to: {
					top: 30
				},
				duration: this.animDuration
			}).animate({
				to: {
					width: 10
				},
				duration: this.animDuration,
				listeners: {
					afteranimate: function() {
						c.remove();
						this.shouldResize = true;
						this.createOverflowButton()
					},
					scope: this
				}
			})
		}
		
		//Linpn: 删除TAB页里的内容
		var tab = Ext.getCmp("tab-"+d);
		if(tab){
			tab.update("");
			tab.findParentByType("container").remove(tab);
			delete tab;
		}
	},
	swapLastTabWith: function(d) {
		var e = this.getTabEl(this.tabsInBar[this.tabsInBar.length - 1]);
		if (e) {
			var f = this.tabTpl.append(document.body, this.tabCache[d]);
			e.dom.parentNode.replaceChild(f, e.dom);
			this.tabsInBar[this.tabsInBar.length - 1] = d;
			Ext.get(f).setStyle({
				visibility: "visible",
				width: String(this.tabWidth()) + "px"
			})
		}
	},
	highlightOverviewTab: function(d) {
		var c = Ext.query(".doctab." + this.getControllerName(d).toLowerCase());
		if (c && c[0]) {
			Ext.get(c[0]).addCls("highlight")
		}
	},
	maxTabsInBar: function() {
		return Math.floor(this.tabBarWidth() / this.minTabWidth)
	},
	tabWidth: function() {
		var b = Math.floor(this.tabBarWidth() / this.tabsInBar.length) + 6;
		if (b > this.maxTabWidth) {
			return this.maxTabWidth
		} else {
			if (b < this.minTabWidth) {
				return this.minTabWidth
			} else {
				return b
			}
		}
	},
	tabBarWidth: function() {
		return this.getWidth() - (this.staticTabs.length * 50) - 15
	},
	resizeTabs: function(b) {
		this.shouldResize = false;
		Ext.Array.each(Ext.query(".doctab"), function(a) {
			var d = Ext.get(a);
			if (!d.dom.removed && !d.hasCls("overview")) {
				if (b && b.animate && !Ext.isIE) {
					d.animate({
						to: {
							width: this.tabWidth()
						}
					})
				} else {
					d.setWidth(this.tabWidth())
				}
			}
		}, this)
	},
	getTabEl: function(c) {
		var d = Ext.query('.doctab a[href="' + c + '"]');
		if (d && d[0]) {
			return Ext.get(d[0]).up(".doctab")
		}
	},
	createOverflowButton: function() {
		if (this.overflowButton) {
			this.overflowButton.destroy()
		}
		this.overflowButton = Ext.create("Ext.button.Button", {
			baseCls: "",
			renderTo: this.getEl().down(".tab-overflow"),
			menu: this.createMenu()
		})
	},
	createMenu: function() {
		var b = new Docs.view.TabMenu({
			listeners: {
				closeAllTabs: this.closeAllTabs,
				tabItemClick: function(a) {
					this.fireEvent("tabActivate", a.href, {
						navigate: true
					})
				},
				scope: this
			}
		});
		Ext.Array.each(this.tabs, function(a) {
			this.addTabToMenu(b, this.tabCache[a])
		}, this);
		return b
	},
	addTabToMenu: function(g, h) {
		var f = Ext.Array.indexOf(this.tabs, h.href);
		if (this.tabs.length > this.tabsInBar.length && f === this.maxTabsInBar()) {
			g.addTabCls(h, "overflow")
		}
		var e = this.inTabBar(h.href);
		g.addTab(h, e ? "" : "overflow")
	},
	addToolTips: function() {
		Ext.Array.each(this.staticTabs, function(c) {
			var d = Ext.get(Ext.query(".doctab." + c.cls)[0]);
			if (d) {
				Ext.create("Ext.tip.ToolTip", {
					target: d,
					html: c.tooltip
				})
			}
		})
	},
	saveTabs: function() {
		Docs.Settings.set("tabs", this.tabs)
	},
	getControllerName: function(b) {
		if (/#!?\/api/.test(b)) {
			return "Classes"
		} else {
			if (/#!?\/casass/.test(b)) {
				return "Casass"
			} else {
				if (/#!?\/shopmng/.test(b)) {
					return "Shopmng"
				} else {
					if (/#!?\/erpcrm/.test(b)) {
						return "Erpcrm"
					} else {
						return "Index"
					}
				}
			}
		}
	}
});
Ext.define("Docs.view.cls.Index", {
	extend: "Ext.container.Container",
	alias: "widget.classindex",
	requires: ["Docs.ContentGrabber"],
	mixins: ["Docs.view.Scrolling"],
	cls: "class-categories iScroll",
	margin: "15 10",
	autoScroll: true,
	initComponent: function() {
		this.tpl = new Ext.XTemplate('<h1 class="top" style="padding-bottom: 10px">API Documentation</h1>', '<tpl if="notice">', '<div class="notice">{notice}</div>', "</tpl>", "{categories}");
		this.data = {
			notice: Docs.ContentGrabber.get("notice-text"),
			categories: Docs.ContentGrabber.get("categories-content")
		};
		this.callParent(arguments)
	},
	afterRender: function() {
		this.callParent(arguments);
	},
	getTab: function() {
		var b = (Docs.data.classes || []).length > 0;
		return b ? {
			cls: "classes",
			href: "#!/api",
			tooltip: "API Documentation"
		} : false
	}
});
Ext.define("Docs.view.welcome.Index", {
	extend: "Ext.container.Container",
	alias: "widget.welcomeindex",
	mixins: ["Docs.view.Scrolling"],
	requires: ["Docs.ContentGrabber"],
	cls: "welcome iScroll",
	initComponent: function() {
		this.html = Docs.ContentGrabber.get("welcome-content");
		this.hasContent = !! this.html;
		this.callParent(arguments)
	},
	getTab: function() {
		return this.hasContent ? {
			cls: "index",
			href: "#",
			tooltip: "Home"
		} : false
	}
});
Ext.define("Docs.view.GroupTree", {
	extend: "Docs.view.DocTree",
	alias: "widget.grouptree",
	initComponent: function() {
		this.root = {
			text: "Root",
			children: this.buildTree(this.data)
		};
		this.callParent()
	},
	buildTree: function(b) {
		return Ext.Array.map(b, function(a) {
			if (a.items) {
				return {
					text: a.title,
					expanded: true,
					iconCls: "icon-pkg",
					children: this.buildTree(a.items)
				}
			} else {
				return this.convert(a)
			}
		}, this)
	}
});
Ext.define("Docs.view.ThumbList", {
	extend: "Ext.view.View",
	alias: "widget.thumblist",
	cls: "thumb-list",
	itemSelector: "dl",
	urlField: "url",
	commentType: "",
	itemTpl: [],
	initComponent: function() {
		this.addEvents("urlclick");
		Ext.Array.forEach(this.data, function(c, d) {
			c.id = "sample-" + d
		});
		this.store = Ext.create("Ext.data.JsonStore", {
			fields: ["id", "title", "items"]
		});
		this.store.loadData(this.flattenSubgroups(this.data));
		this.tpl = new Ext.XTemplate(Ext.Array.flatten(["<div>", '<tpl for=".">', '<div><a name="{id}"></a><h2><div>{title}</div></h2>', "<dl>", '<tpl for="items">', this.itemTpl, "</tpl>", '<div style="clear:left"></div></dl></div>', "</tpl>", "</div>"]));
		this.itemTpl = undefined;
		this.data = undefined;
		this.on("viewready", function() {
			this.initHover();
		}, this);
		this.callParent(arguments)
	},
	initHover: function() {
		this.getEl().on("mouseover", function(c, d) {
			Ext.get(d).addCls("over")
		}, this, {
			delegate: "dd"
		});
		this.getEl().on("mouseout", function(c, d) {
			Ext.get(d).removeCls("over")
		}, this, {
			delegate: "dd"
		})
	},
	flattenSubgroups: function(c) {
		function d(a) {
			if (a.items) {
				return Ext.Array.map(a.items, d)
			} else {
				return a
			}
		}
		return Ext.Array.map(c, function(a) {
			return {
				id: a.id,
				title: a.title,
				items: Ext.Array.map(a.items, function(b) {
					if (b.items) {
						var f = Ext.apply({}, d(b)[0]);
						f.title = b.title;
						return f
					} else {
						return b
					}
				})
			}
		})
	},
	onContainerClick: function(c) {
		var d = c.getTarget("h2", 3, true);
		if (d) {
			d.up("div").toggleCls("collapsed")
		}
	},
	onItemClick: function(h, j, l, i) {
		var k = i.getTarget("dd", 5, true);
		if (k && !i.getTarget("a", 2)) {
			var e = k.getAttributeNS("ext", this.urlField);
			this.fireEvent("urlclick", e)
		}
		return this.callParent(arguments)
	}
});
Ext.define("Docs.view.PageContainer", {
	extend: "Ext.container.Container",
	alias: "widget.pagecontainer",
	layout: "fit"
});







//---------------------------------------------应用支持系统(casass)开始-----------------------------------------------//

Ext.define("Docs.view.casass.Index", {
	extend: "Ext.container.Container",
	alias: "widget.casassindex",
	requires: ["Docs.view.ThumbList"],
	mixins: ["Docs.view.Scrolling"],
	cls: "iScroll",
	margin: "10 0 0 0",
	autoScroll: true,
	initComponent: function() {
		this.cls += "";
		this.items = [{
			xtype: "container",
			html: '<h1 class="eg">应用支撑系统</h1>'
		},
		Ext.create("Docs.view.ThumbList", {
			itemTpl: ['<dd ext:url="#!/casass/{name}">', '<div class="thumb"><img src="{icon}"/></div>', "<div><h4>{title}", "<tpl if=\"status === 'new'\">", '<span class="new-sample"> (New)</span>', "</tpl>", "<tpl if=\"status === 'updated'\">", '<span class="updated-sample"> (Updated)</span>', "</tpl>", "<tpl if=\"status === 'experimental'\">", '<span class="new-sample"> (Experimental)</span>', "</tpl>", "</h4><p>{description}</p></div>", "</dd>"],
			data: Docs.data.casass
		})];
		this.callParent(arguments)
	},
	getTab: function() {
		var b = (Docs.data.casass || []).length > 0;
		return b ? {
			cls: "classes",
			href: "#!/casass",
			tooltip: "应用支撑系统"
		} : false
	}
});
Ext.define("Docs.controller.Casass", {
	extend: "Docs.controller.Content",
	baseUrl: "#!/casass",
	title: "应用支撑系统",
	refs: [{
		ref: "viewport",
		selector: "#viewport"
	}, {
		ref: "index",
		selector: "#casassindex"
	}, {
		ref: "tree",
		selector: "#casasstree"
	}, {
		ref: "page",
		selector: "#casass"
	}],
	init: function() {
		this.addEvents("showCasass");
		this.control({
			"#casasstree": {
				urlclick: function(d, c) {
					this.loadPage(d)
				}
			},
			"casassindex > thumblist": {
				urlclick: function(b) {
					this.loadPage(b)
				}
			}
		})
	},
	loadIndex: function() {
		Ext.getCmp("treecontainer").showTree("casasstree");
		this.callParent()
	},
	loadPage: function(d, f) {
		var e = this.getCasass(d);
		if (!e) {
			this.getController("Failure").show404("Casass <b>" + d + "</b> was not found.");
			return;
		}
		
		//Linpn:当http开头，就直接open页面
//		if(e.url.indexOf("http://")==0 || e.url.indexOf("https://")==0){
//			if(!f)
//				window.open(e.url);
//		 	return;
//		}

		//Linpn: 当tab不存在时，创建并显示；当切换tab时，也进入并显示tab页
		var tab = this.getPage().items.get("tab-"+ d);
		if (!tab || this.activeUrl !== d) {
			//隐藏所有tabpage
			Ext.each(this.getPage().items.items, function(tab) {
				tab.hide()
			});
			//如果不存在,则创建
			if(!tab){
				tab = this.getPage().add({
			        id: "tab-"+ d,
			        html: "<iframe style='width: 100%; height: 100%; border: 0;' src='"+ e.url +"'></iframe>"
			    });
			}
			tab.show();
		}

		this.getViewport().setPageTitle(e.title);
		this.activateCasassCard()
		f || Docs.History.push(d);
		this.fireEvent("showCasass", d);
		this.getTree().selectUrl(d);
		this.activeUrl = d
	},
	activateCasassCard: function() {
		Ext.getCmp("card-panel").layout.setActiveItem("casass");
		Ext.getCmp("treecontainer").showTree("casasstree")
	},
	getCasass: function(b) {
		if (!this.map) {
			this.map = {};
			Ext.Array.forEach(Docs.data.casass, function(a) {
				Ext.Array.forEach(a.items, function(d) {
					this.map["#!/casass/" + d.name] = d
				}, this)
			}, this)
		}
		return this.map[b]
	},
	changeOrientation: function(b) {
		this.getPage().setOrientation(b)
	},
	changeDevice: function(b) {
		this.getPage().setDevice(b)
	}
});

//---------------------------------------------应用支持系统(casass)结束-----------------------------------------------//



//---------------------------------------------电商管理系统(shopmng)开始-----------------------------------------------//

Ext.define("Docs.view.shopmng.Index", {
	extend: "Ext.container.Container",
	alias: "widget.shopmngindex",
	requires: ["Docs.view.ThumbList"],
	mixins: ["Docs.view.Scrolling"],
	cls: "iScroll",
	margin: "10 0 0 0",
	autoScroll: true,
	initComponent: function() {
		this.cls += "";
		this.items = [{
			xtype: "container",
			html: '<h1 class="eg">电商管理系统</h1>'
		},
		Ext.create("Docs.view.ThumbList", {
			itemTpl: ['<dd ext:url="#!/shopmng/{name}">', '<div class="thumb"><img src="{icon}"/></div>', "<div><h4>{title}", "<tpl if=\"status === 'new'\">", '<span class="new-sample"> (New)</span>', "</tpl>", "<tpl if=\"status === 'updated'\">", '<span class="updated-sample"> (Updated)</span>', "</tpl>", "<tpl if=\"status === 'experimental'\">", '<span class="new-sample"> (Experimental)</span>', "</tpl>", "</h4><p>{description}</p></div>", "</dd>"],
			data: Docs.data.shopmng
		})];
		this.callParent(arguments)
	},
	getTab: function() {
		var b = (Docs.data.shopmng || []).length > 0;
		return b ? {
			cls: "guides",
			href: "#!/shopmng",
			tooltip: "电商管理系统"
		} : false
	}
});
Ext.define("Docs.controller.Shopmng", {
	extend: "Docs.controller.Content",
	baseUrl: "#!/shopmng",
	title: "电商管理系统",
	refs: [{
		ref: "viewport",
		selector: "#viewport"
	}, {
		ref: "index",
		selector: "#shopmngindex"
	}, {
		ref: "tree",
		selector: "#shopmngtree"
	}, {
		ref: "page",
		selector: "#shopmng"
	}],
	init: function() {
		this.addEvents("showShopmng");
		this.control({
			"#shopmngtree": {
				urlclick: function(d, c) {
					this.loadPage(d)
				}
			},
			"shopmngindex > thumblist": {
				urlclick: function(b) {
					this.loadPage(b)
				}
			}
		})
	},
	loadIndex: function() {
		Ext.getCmp("treecontainer").showTree("shopmngtree");
		this.callParent()
	},
	loadPage: function(d, f) {
		var e = this.getShopmng(d);
		if (!e) {
			this.getController("Failure").show404("Shopmng <b>" + d + "</b> was not found.");
			return
		}
		
		//Linpn:当http开头，就直接open页面
//		if(e.url.indexOf("http://")==0 || e.url.indexOf("https://")==0){
//			if(!f)
//				window.open(e.url);
//		 	return;
//		}

		//Linpn: 当tab不存在时，创建并显示；当切换tab时，也进入并显示tab页
		var tab = this.getPage().items.get("tab-"+ d);
		if (!tab || this.activeUrl !== d) {
			//隐藏所有tabpage
			Ext.each(this.getPage().items.items, function(tab) {
				tab.hide()
			});
			//如果不存在,则创建
			if(!tab){
				tab = this.getPage().add({
			        id: "tab-"+ d,
			        html: "<iframe style='width: 100%; height: 100%; border: 0;' src='"+ e.url +"'></iframe>"
			    });
			}
			tab.show();
		}

		this.getViewport().setPageTitle(e.title);
		this.activateShopmngCard();
		f || Docs.History.push(d);
		this.fireEvent("showShopmng", d);
		this.getTree().selectUrl(d);
		this.activeUrl = d
	},
	activateShopmngCard: function() {
		Ext.getCmp("card-panel").layout.setActiveItem("shopmng");
		Ext.getCmp("treecontainer").showTree("shopmngtree")
	},
	getShopmng: function(b) {
		if (!this.map) {
			this.map = {};
			Ext.Array.forEach(Docs.data.shopmng, function(a) {
				Ext.Array.forEach(a.items, function(d) {
					this.map["#!/shopmng/" + d.name] = d
				}, this)
			}, this)
		}
		return this.map[b]
	},
	changeOrientation: function(b) {
		this.getPage().setOrientation(b)
	},
	changeDevice: function(b) {
		this.getPage().setDevice(b)
	}
});

//---------------------------------------------电商管理系统(shopmng)结束-----------------------------------------------//



//---------------------------------------------企业管理系统(erpcrm)开始-----------------------------------------------//

Ext.define("Docs.view.erpcrm.Index", {
	extend: "Ext.container.Container",
	alias: "widget.erpcrmindex",
	requires: ["Docs.view.ThumbList"],
	mixins: ["Docs.view.Scrolling"],
	cls: "iScroll",
	margin: "10 0 0 0",
	autoScroll: true,
	initComponent: function() {
		this.cls += "";
		this.items = [{
			xtype: "container",
			html: '<h1 class="eg">企业管理系统</h1>'
		},
		Ext.create("Docs.view.ThumbList", {
			itemTpl: ['<dd ext:url="#!/erpcrm/{name}">', '<div class="thumb"><img src="{icon}"/></div>', "<div><h4>{title}", "<tpl if=\"status === 'new'\">", '<span class="new-sample"> (New)</span>', "</tpl>", "<tpl if=\"status === 'updated'\">", '<span class="updated-sample"> (Updated)</span>', "</tpl>", "<tpl if=\"status === 'experimental'\">", '<span class="new-sample"> (Experimental)</span>', "</tpl>", "</h4><p>{description}</p></div>", "</dd>"],
			data: Docs.data.erpcrm
		})];
		this.callParent(arguments)
	},
	getTab: function() {
		var b = (Docs.data.erpcrm || []).length > 0;
		return b ? {
			cls: "examples",
			href: "#!/erpcrm",
			tooltip: "企业管理系统"
		} : false
	}
});
Ext.define("Docs.controller.Erpcrm", {
	extend: "Docs.controller.Content",
	baseUrl: "#!/erpcrm",
	title: "企业管理系统",
	refs: [{
		ref: "viewport",
		selector: "#viewport"
	}, {
		ref: "index",
		selector: "#erpcrmindex"
	}, {
		ref: "tree",
		selector: "#erpcrmtree"
	}, {
		ref: "page",
		selector: "#erpcrm"
	}],
	init: function() {
		this.addEvents("showErpcrm");
		this.control({
			"#erpcrmtree": {
				urlclick: function(d, c) {
					this.loadPage(d)
				}
			},
			"erpcrmindex > thumblist": {
				urlclick: function(b) {
					this.loadPage(b)
				}
			}
		})
	},
	loadIndex: function() {
		Ext.getCmp("treecontainer").showTree("erpcrmtree");
		this.callParent()
	},
	loadPage: function(d, f) {
		var e = this.getErpcrm(d);
		if (!e) {
			this.getController("Failure").show404("Erpcrm <b>" + d + "</b> was not found.");
			return
		}
		
		//Linpn:当http开头，就直接open页面
//		if(e.url.indexOf("http://")==0 || e.url.indexOf("https://")==0){
//			if(!f)
//				window.open(e.url);
//		 	return;
//		}

		//Linpn: 当tab不存在时，创建并显示；当切换tab时，也进入并显示tab页
		var tab = this.getPage().items.get("tab-"+ d);
		if (!tab || this.activeUrl !== d) {
			//隐藏所有tabpage
			Ext.each(this.getPage().items.items, function(tab) {
				tab.hide()
			});
			//如果不存在,则创建
			if(!tab){
				tab = this.getPage().add({
			        id: "tab-"+ d,
			        html: "<iframe style='width: 100%; height: 100%; border: 0;' src='"+ e.url +"'></iframe>"
			    });
			}
			tab.show();
		}

		this.getViewport().setPageTitle(e.title);
		this.activateErpcrmCard();
		f || Docs.History.push(d);
		this.fireEvent("showErpcrm", d);
		this.getTree().selectUrl(d);
		this.activeUrl = d
	},
	activateErpcrmCard: function() {
		Ext.getCmp("card-panel").layout.setActiveItem("erpcrm");
		Ext.getCmp("treecontainer").showTree("erpcrmtree")
	},
	getErpcrm: function(b) {
		if (!this.map) {
			this.map = {};
			Ext.Array.forEach(Docs.data.erpcrm, function(a) {
				Ext.Array.forEach(a.items, function(d) {
					this.map["#!/erpcrm/" + d.name] = d
				}, this)
			}, this)
		}
		return this.map[b]
	},
	changeOrientation: function(b) {
		this.getPage().setOrientation(b)
	},
	changeDevice: function(b) {
		this.getPage().setDevice(b)
	}
});

//---------------------------------------------企业管理系统(erpcrm)结束-----------------------------------------------//








Ext.define("Docs.view.cls.PackageLogic", {
	extend: "Docs.view.cls.Logic",
	create: function() {
		this.root = {
			children: [],
			text: "Root"
		};
		this.packages = {
			"": this.root
		};
		this.privates = [];
		Ext.Array.forEach(this.classes, this.addClass, this);
		this.sortTree(this.root);
		return {
			root: this.root,
			privates: this.privates
		}
	},
	sortTree: function(b) {
		b.children.sort(this.compare);
		Ext.Array.forEach(b.children, this.sortTree, this)
	},
	compare: function(g, h) {
		if (g.leaf === h.leaf) {
			var b = g.text.toLowerCase();
			var a = h.text.toLowerCase();
			return b > a ? 1 : (b < a ? -1 : 0)
		} else {
			return g.leaf ? 1 : -1
		}
	},
	addClass: function(g) {
		if (g["private"] && !this.showPrivateClasses) {
			this.privates.push(this.classNode(g));
			return
		}
		if (this.packages[g.name]) {
			var f = this.packages[g.name];
			var i = this.classNode(g);
			f.iconCls = i.iconCls;
			f.url = i.url
		} else {
			var h = this.packageName(g.name);
			var j = this.packages[h] || this.addPackage(h);
			var i = this.classNode(g);
			this.addChild(j, i);
			this.packages[g.name] = i
		}
	},
	addPackage: function(e) {
		var g = this.packageName(e);
		var h = this.packages[g] || this.addPackage(g);
		var f = this.packageNode(e);
		this.addChild(h, f);
		this.packages[e] = f;
		return f
	},
	addChild: function(d, c) {
		d.children.push(c);
		if (d.leaf) {
			d.leaf = false
		}
	},
	classNode: function(b) {
		return {
			text: this.shortName(b.name),
			url: "#!/api/" + b.name,
			iconCls: b.icon,
			cls: b["private"] ? "private" : "",
			leaf: true,
			children: []
		}
	},
	packageNode: function(b) {
		return {
			text: this.shortName(b),
			iconCls: "icon-pkg",
			leaf: false,
			children: []
		}
	},
	packageName: function(b) {
		return b.slice(0, -this.shortName(b).length - 1) || ""
	},
	shortName: function(d) {
		var c = d.split(/\./);
		return c.pop()
	}
});
Ext.define("Docs.view.cls.InheritanceLogic", {
	extend: "Docs.view.cls.Logic",
	create: function() {
		this.root = {
			children: [],
			text: "Root"
		};
		this.privates = [];
		this.subclasses = this.buildLookupTable(this.classes);
		Ext.Array.forEach(this.classes, this.addClass, this);
		if (!this.showPrivateClasses) {
			this.stripPrivateClasses(this.root)
		}
		this.sortTree(this.root);
		return {
			root: this.root,
			privates: this.privates
		}
	},
	sortTree: function(b) {
		b.children.sort(Ext.bind(this.compare, this));
		Ext.Array.forEach(b.children, this.sortTree, this)
	},
	compare: function(g, h) {
		var b = g.text.toLowerCase();
		var a = h.text.toLowerCase();
		return b > a ? 1 : (b < a ? -1 : 0)
	},
	buildLookupTable: function(d) {
		var c = {};
		Ext.Array.forEach(d, function(b) {
			var a = b["extends"];
			if (a && a !== "Object") {
				if (!c[a]) {
					c[a] = []
				}
				c[a].push(b)
			}
		}, this);
		return c
	},
	classNode: function(b) {
		return {
			text: b.name,
			url: "#!/api/" + b.name,
			iconCls: b.icon,
			cls: b["private"] ? "private" : ""
		}
	},
	addClass: function(e) {
		var d = e["extends"];
		if (!d || d === "Object") {
			var f = this.classNode(e);
			this.root.children.push(f);
			f.children = this.getSubclasses(e.name);
			f.leaf = f.children.length === 0
		}
	},
	getSubclasses: function(b) {
		if (!this.subclasses[b]) {
			return []
		}
		return Ext.Array.map(this.subclasses[b], function(a) {
			var d = this.classNode(a);
			d.children = this.getSubclasses(a.name);
			d.leaf = d.children.length === 0;
			return d
		}, this)
	},
	stripPrivateClasses: function(b) {
		b.children = Ext.Array.filter(b.children, function(a) {
			this.stripPrivateClasses(a);
			if (a.cls === "private" && a.children.length === 0) {
				this.privates.push(a);
				return false
			} else {
				return true
			}
		}, this)
	}
});
Ext.define("Docs.view.cls.Tree", {
	extend: "Docs.view.DocTree",
	alias: "widget.classtree",
	requires: ["Docs.view.cls.PackageLogic", "Docs.view.cls.InheritanceLogic", "Docs.Settings"],
	initComponent: function() {
		this.setLogic(Docs.Settings.get("classTreeLogic"), Docs.Settings.get("showPrivateClasses"));
		this.dockedItems = [{
			xtype: "container",
			dock: "bottom",
			layout: "hbox",
			items: [{
				width: 34
			}, {
				xtype: "checkbox",
				boxLabel: "Show private classes",
				cls: "cls-private-cb",
				checked: Docs.Settings.get("showPrivateClasses"),
				listeners: {
					change: function(d, c) {
						this.setLogic(Docs.Settings.get("classTreeLogic"), c)
					},
					scope: this
				}
			}]
		}, {
			xtype: "container",
			dock: "bottom",
			cls: "cls-grouping",
			html: [this.makeButtonHtml("PackageLogic", "By Package"), this.makeButtonHtml("InheritanceLogic", "By Inheritance")].join("")
		}];
		this.on("afterrender", this.setupButtonClickHandler, this);
		this.callParent()
	},
	makeButtonHtml: function(d, c) {
		return Ext.String.format('<button class="{0} {1}">{2}</button>', d, Docs.Settings.get("classTreeLogic") === d ? "selected" : "", c)
	},
	setupButtonClickHandler: function() {
		this.el.addListener("click", function(g, h) {
			var f = Ext.get(h),
				e = Ext.get(Ext.query(".cls-grouping button.selected")[0]);
			if (e.dom === f.dom) {
				return
			}
			e.removeCls("selected");
			f.addCls("selected");
			if (f.hasCls("PackageLogic")) {
				this.setLogic("PackageLogic", Docs.Settings.get("showPrivateClasses"))
			} else {
				this.setLogic("InheritanceLogic", Docs.Settings.get("showPrivateClasses"))
			}
		}, this, {
			delegate: "button"
		})
	},
	setLogic: function(i, f) {
		Docs.Settings.set("classTreeLogic", i);
		Docs.Settings.set("showPrivateClasses", f);
		var g = new Docs.view.cls[i]({
			classes: this.data,
			showPrivateClasses: f
		});
		if (this.root) {
			var h = this.getSelectionModel().getLastSelected();
			var j = g.create();
			this.expandLonelyNode(j.root);
			this.setRootNode(j.root);
			this.initNodeLinks();
			h && this.selectUrl(h.raw.url)
		} else {
			var j = g.create();
			this.root = j.root;
			this.expandLonelyNode(this.root)
		}
		this.privates = j.privates
	},
	expandLonelyNode: function(d) {
		var c = Ext.Array.filter(d.children, function(a) {
			return a.children.length > 0
		});
		if (c.length == 1) {
			c[0].expanded = true
		}
	},
	findRecordByUrl: function(b) {
		return this.callParent([b]) || this.findPrivateRecordByUrl(b)
	},
	findPrivateRecordByUrl: function(e) {
		var f = this.privates;
		for (var d = 0; d < f.length; d++) {
			if (f[d].url === e) {
				return f[d]
			}
		}
		return undefined
	}
});
Ext.define("Docs.view.TreeContainer", {
	extend: "Ext.panel.Panel",
	alias: "widget.treecontainer",
	requires: ["Docs.view.cls.Tree", "Docs.view.GroupTree"],
	cls: "iScroll",
	layout: "card",
	resizable: true,
	resizeHandles: "e",
	collapsible: true,
	hideCollapseTool: true,
	animCollapse: true,
	header: false,
	initComponent: function() {
		this.items = [{}, {
			xtype: "classtree",
			id: "classtree",
			data: Docs.data.classes
		}, {
			xtype: "grouptree",
			id: "casasstree",
			data: Docs.data.casass,
			convert: function(b) {
				return {
					leaf: true,
					text: b.title,
					url: "#!/casass/" + b.name,
					iconCls: "icon-singleton"
				}
			}
		}, {
			xtype: "grouptree",
			id: "shopmngtree",
			data: Docs.data.shopmng,
			convert: function(b) {
				return {
					leaf: true,
					text: b.title,
					url: "#!/shopmng/" + b.name,
					iconCls: "icon-singleton"
				}
			}
		}, {
			xtype: "grouptree",
			id: "erpcrmtree",
			data: Docs.data.erpcrm,
			convert: function(b) {
				return {
					leaf: true,
					text: b.title,
					url: "#!/erpcrm/" + b.name,
					iconCls: "icon-singleton"
				}
			}
		}];
		this.callParent()
	},
	showTree: function(b) {
		this.show();
		this.layout.setActiveItem(b)
	}
});
Ext.define("Docs.view.HoverMenu", {
	extend: "Ext.view.View",
	alias: "widget.hovermenu",
	componentCls: "hover-menu",
	itemSelector: "div.item",
	deferEmptyText: false,
	columnHeight: 25,
	initComponent: function() {
		this.renderTo = Ext.getBody();
		this.tpl = new Ext.XTemplate("<table>", "<tr>", "<td>", '<tpl for=".">', '<div class="item">', "{[this.renderLink(values)]}", "</div>", '<tpl if="xindex % this.columnHeight === 0 && xcount &gt; xindex">', "</td><td>", "</tpl>", "</tpl>", "</td>", "</tr>", "</table>", {
			columnHeight: this.columnHeight,
			renderLink: function(e) {
				var d = Ext.Array.map(Docs.data.signatures, function(a) {
					return e.meta[a.key] ? '<span class="signature ' + a.key + '">' + (a["short"]) + "</span>" : ""
				}).join(" ");
			}
		});
		this.callParent()
	}
});
Ext.define("Docs.view.HoverMenuButton", {
	extend: "Ext.toolbar.TextItem",
	alias: "widget.hovermenubutton",
	componentCls: "hover-menu-button",
	requires: ["Docs.view.HoverMenu"],
	showCount: false,
	statics: {
		menus: []
	},
	initComponent: function() {
		this.addEvents("click");
		if (this.showCount) {
			this.initialText = this.text;
			this.text += " <sup>" + this.store.getCount() + "</sup>";
			this.store.on("datachanged", function() {
				this.setText(this.initialText + " <sup>" + this.store.getCount() + "</sup>")
			}, this)
		}
		this.callParent(arguments)
	},
	getColumnHeight: function() {
		var c = 200;
		var d = 18;
		return Math.floor((Ext.Element.getViewportHeight() - c) / d)
	},
	onRender: function() {
		this.callParent(arguments);
		this.getEl().on({
			click: function() {
				this.fireEvent("click")
			},
			mouseover: this.deferShowMenu,
			mouseout: this.deferHideMenu,
			scope: this
		})
	},
	onDestroy: function() {
		if (this.menu) {
			this.menu.destroy();
			Ext.Array.remove(Docs.view.HoverMenuButton.menus, this.menu)
		}
		this.callParent(arguments)
	},
	renderMenu: function() {
		this.menu = Ext.create("Docs.view.HoverMenu", {
			store: this.store,
			columnHeight: this.getColumnHeight()
		});
		this.menu.getEl().on({
			click: function(b) {
				this.menu.hide();
				b.preventDefault()
			},
			mouseover: function() {
				clearTimeout(this.hideTimeout)
			},
			mouseout: this.deferHideMenu,
			scope: this
		});
		Docs.view.HoverMenuButton.menus.push(this.menu)
	},
	deferHideMenu: function() {
		clearTimeout(Docs.view.HoverMenuButton.showTimeout);
		if (!this.menu) {
			return
		}
		this.hideTimeout = Ext.Function.defer(function() {
			this.menu.hide()
		}, 200, this)
	},
	deferShowMenu: function() {
		clearTimeout(Docs.view.HoverMenuButton.showTimeout);
		Docs.view.HoverMenuButton.showTimeout = Ext.Function.defer(function() {
			if (!this.menu) {
				this.renderMenu()
			}
			Ext.Array.forEach(Docs.view.HoverMenuButton.menus, function(a) {
				if (a !== this.menu) {
					a.hide()
				}
			}, this);
			clearTimeout(this.hideTimeout);
			this.menu.show();
			var j = this.getEl().getXY(),
				n = Ext.ComponentQuery.query("classoverview toolbar")[0],
				k = j[0] - 10,
				l = n.getEl().getXY(),
				i = n.getWidth(),
				m = this.menu.getEl().getWidth(),
				h = Ext.getCmp("doctabs").getWidth();
			if (m > h) {
				k = 0
			} else {
				if ((k + m) > h) {
					k = h - m - 30
				}
			}
			if (k < l[0]) {
				k = l[0]
			}
			this.menu.getEl().setStyle({
				left: k + "px",
				top: (j[1] + 25) + "px"
			})
		}, 200, this)
	},
	getStore: function() {
		return this.store
	}
});
Ext.define("Docs.view.cls.Toolbar", {
	extend: "Ext.toolbar.Toolbar",
	requires: ["Docs.view.HoverMenuButton", "Docs.Settings", "Ext.form.field.Checkbox"],
	dock: "top",
	cls: "member-links",
	docClass: {},
	accessors: {},
	initComponent: function() {
		this.addEvents("menubuttonclick", "commentcountclick", "filter", "toggleExpanded");
		this.items = [];
		this.memberButtons = {};
		var h = {
			cfg: "Configs",
			property: "Properties",
			method: "Methods",
			event: "Events",
			css_var: "CSS Vars",
			css_mixin: "CSS Mixins"
		};
		for (var i in h) {
			var f = this.docClass.members[i].concat(this.docClass.statics[i]);
			f.sort(function(a, b) {
				if (a.name === "constructor" && a.tagname === "method") {
					return -1
				}
				return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)
			});
			if (f.length > 0) {
				var j = this.createMemberButton({
					text: h[i],
					type: i,
					members: f
				});
				this.memberButtons[i] = j;
				this.items.push(j)
			}
		}
		this.checkItems = {
			"public": this.createCb("Public", "public"),
			"protected": this.createCb("Protected", "protected"),
			"private": this.createCb("Private", "private"),
			inherited: this.createCb("Inherited", "inherited"),
			accessor: this.createCb("Accessor", "accessor"),
			deprecated: this.createCb("Deprecated", "deprecated"),
			removed: this.createCb("Removed", "removed")
		};
		var g = this;
		this.items = this.items.concat([{
			xtype: "tbfill"
		},
		this.filterField = Ext.widget("triggerfield", {
			triggerCls: "reset",
			cls: "member-filter",
			hideTrigger: true,
			emptyText: "Filter class members",
			enableKeyEvents: true,
			width: 150,
			listeners: {
				keyup: function(a) {
					this.fireEvent("filter", a.getValue(), this.getShowFlags());
					a.setHideTrigger(a.getValue().length === 0)
				},
				specialkey: function(a, b) {
					if (b.keyCode === Ext.EventObject.ESC) {
						a.reset();
						this.fireEvent("filter", "", this.getShowFlags())
					}
				},
				scope: this
			},
			onTriggerClick: function() {
				this.reset();
				this.focus();
				g.fireEvent("filter", "", g.getShowFlags());
				this.setHideTrigger(true)
			}
		}), {
			xtype: "tbspacer",
			width: 10
		},
		this.commentCount = this.createCommentCount(), {
			xtype: "button",
			text: "Show",
			menu: [this.checkItems["public"], this.checkItems["protected"], this.checkItems["private"], "-", this.checkItems.inherited, this.checkItems.accessor, this.checkItems.deprecated, this.checkItems.removed]
		}, {
			xtype: "button",
			iconCls: "expand-all-members",
			tooltip: "Expand all",
			enableToggle: true,
			toggleHandler: function(b, a) {
				b.setIconCls(a ? "collapse-all-members" : "expand-all-members");
				this.fireEvent("toggleExpanded", a)
			},
			scope: this
		}]);
		this.callParent(arguments)
	},
	getShowFlags: function() {
		var d = {};
		for (var c in this.checkItems) {
			d[c] = this.checkItems[c].checked
		}
		return d
	},
	createCb: function(c, d) {
		return Ext.widget("menucheckitem", {
			text: c,
			checked: Docs.Settings.get("show")[d],
			listeners: {
				checkchange: function() {
					this.fireEvent("filter", this.filterField.getValue(), this.getShowFlags())
				},
				scope: this
			}
		})
	},
	createMemberButton: function(d) {
		var c = Ext.Array.map(d.members, function(a) {
			return this.createLinkRecord(this.docClass.name, a)
		}, this);
		return Ext.create("Docs.view.HoverMenuButton", {
			text: d.text,
			cls: "icon-" + d.type,
			store: this.createStore(c),
			showCount: true,
			listeners: {
				click: function() {
					this.fireEvent("menubuttonclick", d.type)
				},
				scope: this
			}
		})
	},
	createStore: function(c) {
		var d = Ext.create("Ext.data.Store", {
			fields: ["id", "url", "label", "inherited", "accessor", "meta", "commentCount"]
		});
		d.add(c);
		return d
	},
	createLinkRecord: function(d, c) {
		return {
			id: c.id,
			url: d + "-" + c.id,
			label: (c.tagname === "method" && c.name === "constructor") ? "new " + d : c.name,
			inherited: c.owner !== d,
			accessor: c.tagname === "method" && this.accessors.hasOwnProperty(c.name),
			meta: c.meta
		}
	},
	showMenuItems: function(d, e, f) {
		Ext.Array.forEach(["cfg", "property", "method", "event"], function(b) {
			if (this.memberButtons[b]) {
				var c = this.memberButtons[b].getStore();
				c.filterBy(function(h) {
					return !(!d["public"] && !(h.get("meta")["private"] || h.get("meta")["protected"]) || !d["protected"] && h.get("meta")["protected"] || !d["private"] && h.get("meta")["private"] || !d.inherited && h.get("inherited") || !d.accessor && h.get("accessor") || !d.deprecated && h.get("meta")["deprecated"] || !d.removed && h.get("meta")["removed"] || e && !f.test(h.get("label")))
				});
				var a = this.memberButtons[b].menu;
				if (a && Ext.getVersion().version >= "4.1.0") {
					a.show();
					a.hide()
				}
			}
		}, this)
	},
	getFilterValue: function() {
		return this.filterField.getValue()
	},
	createCommentCount: function() {
		return Ext.create("Ext.container.Container", {
			width: 24,
			margin: "0 4 0 0",
			cls: "comment-btn",
			html: "0",
			hidden: true,
			listeners: {
				afterrender: function(b) {
					b.el.addListener("click", function() {
						this.fireEvent("commentcountclick")
					}, this)
				},
				scope: this
			}
		})
	}
});
Ext.define("Docs.view.cls.Overview", {
	extend: "Ext.panel.Panel",
	alias: "widget.classoverview",
	requires: ["Docs.view.cls.Toolbar", "Docs.view.cls.MemberWrap", "Docs.Syntax", "Docs.Settings"],
	mixins: ["Docs.view.Scrolling"],
	cls: "class-overview iScroll",
	autoScroll: true,
	border: false,
	bodyPadding: "20 8 20 5",
	initComponent: function() {
		this.addEvents("afterload");
		this.callParent(arguments)
	},
	scrollToEl: function(j, h) {
		var g = (typeof j == "string") ? Ext.get(Ext.query(j)[0]) : j;
		if (g) {
			var f = g.hasCls("member");
			g.show();
			if (!g.isVisible(true)) {
				g.up(".subsection").show();
				g.up(".members-section").show()
			}
			if (f && g.down(".expandable")) {
				this.setMemberExpanded(j.replace(/#/, ""), true)
			}
			var i = this.body.getBox().y;
			this.scrollToView(g, {
				highlight: true,
				offset: (h || 0) - (f ? i : i - 10)
			})
		}
	},
	load: function(b) {
		this.docClass = b;
		this.accessors = this.buildAccessorsMap();
		if (this.toolbar) {
			this.removeDocked(this.toolbar, false);
			this.toolbar.destroy()
		}
		this.toolbar = Ext.create("Docs.view.cls.Toolbar", {
			docClass: this.docClass,
			accessors: this.accessors,
			listeners: {
				filter: function(d, a) {
					this.filterMembers(d, a)
				},
				menubuttonclick: function(a) {
					this.scrollToEl("h3.members-title.icon-" + a, -20)
				},
				scope: this
			}
		});
		this.addDocked(this.toolbar);
		this.update(b.html);
		Docs.Syntax.highlight(this.getEl());
		this.filterMembers("", Docs.Settings.get("show"));
		this.fireEvent("afterload");
	},
	setMemberExpanded: function(c, d) {
		this.memberWrappers[c].setExpanded(d)
	},
	isMemberExpanded: function(b) {
		return this.memberWrappers[b].isExpanded()
	},
	setAllMembersExpanded: function(b) {
		Ext.Object.each(this.memberWrappers, function(a, d) {
			d.setExpanded(b)
		}, this)
	},
	filterMembers: function(h, e) {
		Docs.Settings.set("show", e);
		var f = h.length > 0;
		Ext.Array.forEach(Ext.query(".doc-contents, .hierarchy"), function(a) {
			Ext.get(a).setStyle({
				display: f ? "none" : "block"
			})
		});
		var g = new RegExp(Ext.String.escapeRegex(h), "i");
		this.eachMember(function(c) {
			var b = Ext.get(c.id);
			var a = !(!e["public"] && !(c.meta["private"] || c.meta["protected"]) || !e["protected"] && c.meta["protected"] || !e["private"] && c.meta["private"] || !e.inherited && (c.owner !== this.docClass.name) || !e.accessor && c.tagname === "method" && this.accessors.hasOwnProperty(c.name) || !e.deprecated && c.meta.deprecated || !e.removed && c.meta.removed || f && !g.test(c.name));
			if (a) {
				b.setStyle({
					display: "block"
				})
			} else {
				b.setStyle({
					display: "none"
				})
			}
		}, this);
		Ext.Array.forEach(Ext.query(".member.first-child"), function(a) {
			Ext.get(a).removeCls("first-child")
		});
		Ext.Array.forEach(Ext.query(".members-section"), function(b) {
			var a = this.getVisibleElements(".member", b);
			Ext.get(b).setStyle({
				display: a.length > 0 ? "block" : "none"
			});
			Ext.Array.forEach(Ext.query(".subsection", b), function(d) {
				var c = this.getVisibleElements(".member", d);
				if (c.length > 0) {
					c[0].addCls("first-child");
					Ext.get(d).setStyle({
						display: "block"
					})
				} else {
					Ext.get(d).setStyle({
						display: "none"
					})
				}
			}, this)
		}, this);
		this.toolbar.showMenuItems(e, f, g)
	},
	buildAccessorsMap: function(c) {
		var d = {};
		Ext.Array.forEach(this.docClass.members.cfg, function(b) {
			var a = Ext.String.capitalize(b.name);
			d["get" + a] = true;
			d["set" + a] = true
		});
		return d
	},
	getVisibleElements: function(e, d) {
		var f = Ext.Array.map(Ext.query(e, d), function(a) {
			return Ext.get(a)
		});
		return Ext.Array.filter(f, function(a) {
			return a.isVisible()
		})
	},
	eachMember: function(c, d) {
		Ext.Array.forEach(["members", "statics"], function(a) {
			Ext.Object.each(this.docClass[a], function(b, f) {
				Ext.Array.forEach(f, c, d)
			}, this)
		}, this)
	}
});
Ext.define("Docs.view.cls.Container", {
	extend: "Ext.container.Container",
	alias: "widget.classcontainer",
	requires: ["Docs.view.cls.Header", "Docs.view.cls.Overview"],
	layout: "border",
	padding: "5 10 0 10",
	initComponent: function() {
		this.items = [Ext.create("Docs.view.cls.Header", {
			region: "north"
		}), Ext.create("Docs.view.cls.Overview", {
			region: "center"
		})];
		this.callParent(arguments)
	}
});
Ext.define("Docs.view.Viewport", {
	extend: "Ext.container.Viewport",
	requires: ["Docs.view.search.Container", "Docs.view.Header", "Docs.view.Tabs", "Docs.view.TreeContainer", "Docs.view.welcome.Index", "Docs.view.cls.Index", "Docs.view.cls.Container", "Docs.view.casass.Index", "Docs.view.shopmng.Index", "Docs.view.erpcrm.Index"],
	id: "viewport",
	layout: "border",
	defaults: {
		xtype: "container"
	},
	initComponent: function() {
		this.items = [{
			region: "north",
			id: "north-region",
			height: 65,
			layout: {
				type: "vbox",
				align: "stretch"
			},
			items: [{
				height: 37,
				xtype: "container",
				layout: "hbox",
				items: [{
					xtype: "docheader"
				}, {
					xtype: "container",
					flex: 1
				}, {
					xtype: "searchcontainer",
					id: "search-container",
					width: 230,
					margin: "4 0 0 0"
				}]
			}, {
				xtype: "doctabs"
			}]
		}, {
			region: "center",
			layout: "border",
			minWidth: 800,
			items: [{
				region: "west",
				xtype: "treecontainer",
				id: "treecontainer",
				border: 1,
				bodyPadding: "10 9 4 9",
				width: 240
			}, {
				region: "center",
				id: "center-container",
				layout: "fit",
				minWidth: 800,
				border: false,
				padding: "5 10",
				items: {
					id: "card-panel",
					cls: "card-panel",
					xtype: "container",
					layout: {
						type: "card",
						deferredRender: true
					},
					items: [{
						autoScroll: true,
						xtype: "welcomeindex",
						id: "welcomeindex"
					}, {
						xtype: "container",
						id: "failure"
					}, {
						autoScroll: true,
						xtype: "classindex",
						id: "classindex"
					}, {
						xtype: "classcontainer",
						id: "classcontainer"
					}, {
						xtype: "casassindex",
						id: "casassindex"
					}, {
						xtype: "pagecontainer",
						id: "casass"
					}, {
						xtype: "shopmngindex",
						id: "shopmngindex"
					}, {
						xtype: "pagecontainer",
						id: "shopmng"
					}, {
						xtype: "erpcrmindex",
						id: "erpcrmindex"
					}, {
						xtype: "pagecontainer",
						id: "erpcrm"
					}]
				}
			}]
		}];
		this.callParent(arguments)
	},
	setPageTitle: function(b) {
		b = Ext.util.Format.stripTags(b);
		if (!this.origTitle) {
			this.origTitle = document.title
		}
		document.title = b ? (b + " - " + this.origTitle) : this.origTitle
	}
});
Ext.define("Docs.Application", {
	requires: ["Ext.app.Application", "Docs.History", "Docs.Settings", "Docs.view.Viewport", "Docs.controller.Welcome", "Docs.controller.Failure", "Docs.controller.Classes", "Docs.controller.Search", "Docs.controller.Casass", "Docs.controller.Shopmng", "Docs.controller.Erpcrm", "Docs.controller.Tabs"],
	constructor: function() {
		this.createApp();
	},
	createApp: function() {
		new Ext.app.Application({
			name: "Docs",
			controllers: ["Welcome", "Failure", "Classes", "Search", "Casass", "Shopmng", "Erpcrm", "Tabs"],
			launch: this.launch
		})
	},
	launch: function() {
		Docs.App = this;
		Docs.Settings.init();
		Ext.create("Docs.view.Viewport");
		Docs.History.init();
		if (Docs.initEventTracking) {
			Docs.initEventTracking()
		}
		Ext.get("loading").remove()
	}
});


var q = null;
window.PR_SHOULD_USE_CONTINUATION = !0;
(function() {
	function d(F) {
		function w(J) {
			var K = J.charCodeAt(0);
			if (K !== 92) {
				return K
			}
			var I = J.charAt(1);
			return (K = k[I]) ? K : "0" <= I && I <= "7" ? parseInt(J.substring(1), 8) : I === "u" || I === "x" ? parseInt(J.substring(2), 16) : J.charCodeAt(1)
		}
		function C(I) {
			if (I < 32) {
				return (I < 16 ? "\\x0" : "\\x") + I.toString(16)
			}
			I = String.fromCharCode(I);
			if (I === "\\" || I === "-" || I === "[" || I === "]") {
				I = "\\" + I
			}
			return I
		}
		function A(J) {
			for (var M = J.substring(1, J.length - 1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g), J = [], I = [], O = M[0] === "^", P = O ? 1 : 0, L = M.length; P < L; ++P) {
				var K = M[P];
				if (/\\[bdsw]/i.test(K)) {
					J.push(K)
				} else {
					var K = w(K),
						N;
					P + 2 < L && "-" === M[P + 1] ? (N = w(M[P + 2]), P += 2) : N = K;
					I.push([K, N]);
					N < 65 || K > 122 || (N < 65 || K > 90 || I.push([Math.max(65, K) | 32, Math.min(N, 90) | 32]), N < 97 || K > 122 || I.push([Math.max(97, K) & -33, Math.min(N, 122) & -33]))
				}
			}
			I.sort(function(Q, R) {
				return Q[0] - R[0] || R[1] - Q[1]
			});
			M = [];
			K = [NaN, NaN];
			for (P = 0; P < I.length; ++P) {
				L = I[P], L[0] <= K[1] + 1 ? K[1] = Math.max(K[1], L[1]) : M.push(K = L)
			}
			I = ["["];
			O && I.push("^");
			I.push.apply(I, J);
			for (P = 0; P < M.length; ++P) {
				L = M[P], I.push(C(L[0])), L[1] > L[0] && (L[1] + 1 > L[0] && I.push("-"), I.push(C(L[1])))
			}
			I.push("]");
			return I.join("")
		}
		function E(J) {
			for (var M = J.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g), I = M.length, N = [], O = 0, L = 0; O < I; ++O) {
				var K = M[O];
				K === "(" ? ++L : "\\" === K.charAt(0) && (K = +K.substring(1)) && K <= L && (N[K] = -1)
			}
			for (O = 1; O < N.length; ++O) {
				-1 === N[O] && (N[O] = ++G)
			}
			for (L = O = 0; O < I; ++O) {
				K = M[O], K === "(" ? (++L, N[L] === void 0 && (M[O] = "(?:")) : "\\" === K.charAt(0) && (K = +K.substring(1)) && K <= L && (M[O] = "\\" + N[L])
			}
			for (L = O = 0; O < I; ++O) {
				"^" === M[O] && "^" !== M[O + 1] && (M[O] = "")
			}
			if (J.ignoreCase && H) {
				for (O = 0; O < I; ++O) {
					K = M[O], J = K.charAt(0), K.length >= 2 && J === "[" ? M[O] = A(K) : J !== "\\" && (M[O] = K.replace(/[A-Za-z]/g, function(P) {
						P = P.charCodeAt(0);
						return "[" + String.fromCharCode(P & -33, P | 32) + "]"
					}))
				}
			}
			return M.join("")
		}
		for (var G = 0, H = !1, x = !1, u = 0, D = F.length; u < D; ++u) {
			var B = F[u];
			if (B.ignoreCase) {
				x = !0
			} else {
				if (/[a-z]/i.test(B.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, ""))) {
					H = !0;
					x = !1;
					break
				}
			}
		}
		for (var k = {
			b: 8,
			t: 9,
			n: 10,
			v: 11,
			f: 12,
			r: 13
		}, v = [], u = 0, D = F.length; u < D; ++u) {
			B = F[u];
			if (B.global || B.multiline) {
				throw Error("" + B)
			}
			v.push("(?:" + E(B) + ")")
		}
		return RegExp(v.join("|"), x ? "gi" : "g")
	}
	function c(B) {
		function u(E) {
			switch (E.nodeType) {
				case 1:
					if (x.test(E.className)) {
						break
					}
					for (var F = E.firstChild; F; F = F.nextSibling) {
						u(F)
					}
					F = E.nodeName;
					if ("BR" === F || "LI" === F) {
						w[D] = "\n", C[D << 1] = A++, C[D++ << 1 | 1] = E
					}
					break;
				case 3:
				case 4:
					F = E.nodeValue, F.length && (F = k ? F.replace(/\r\n?/g, "\n") : F.replace(/[\t\n\r ]+/g, " "), w[D] = F, C[D << 1] = A, A += F.length, C[D++ << 1 | 1] = E)
			}
		}
		var x = /(?:^|\s)nocode(?:\s|$)/,
			w = [],
			A = 0,
			C = [],
			D = 0,
			v;
		B.currentStyle ? v = B.currentStyle.whiteSpace : window.getComputedStyle && (v = document.defaultView.getComputedStyle(B, q).getPropertyValue("white-space"));
		var k = v && "pre" === v.substring(0, 3);
		u(B);
		return {
			a: w.join("").replace(/\n$/, ""),
			c: C
		}
	}
	function t(u, k, w, v) {
		k && (u = {
			a: k,
			d: u
		}, w(u), v.push.apply(v, u.e))
	}
	function h(u, k) {
		function x(P) {
			for (var F = P.d, C = [F, "pln"], L = 0, J = P.a.match(A) || [], B = {}, E = 0, N = J.length; E < N; ++E) {
				var K = J[E],
					O = B[K],
					D = void 0,
					M;
				if (typeof O === "string") {
					M = !1
				} else {
					var I = w[K.charAt(0)];
					if (I) {
						D = K.match(I[1]), O = I[0]
					} else {
						for (M = 0; M < v; ++M) {
							if (I = k[M], D = K.match(I[1])) {
								O = I[0];
								break
							}
						}
						D || (O = "pln")
					}
					if ((M = O.length >= 5 && "lang-" === O.substring(0, 5)) && !(D && typeof D[1] === "string")) {
						M = !1, O = "src"
					}
					M || (B[K] = O)
				}
				I = L;
				L += K.length;
				if (M) {
					M = D[1];
					var H = K.indexOf(M),
						G = H + M.length;
					D[2] && (G = K.length - D[2].length, H = G - M.length);
					O = O.substring(5);
					t(F + I, K.substring(0, H), x, C);
					t(F + I + H, M, s(O, M), C);
					t(F + I + G, K.substring(G), x, C)
				} else {
					C.push(F + I, O)
				}
			}
			P.e = C
		}
		var w = {}, A;
		(function() {
			for (var G = u.concat(k), B = [], F = {}, H = 0, E = G.length; H < E; ++H) {
				var D = G[H],
					I = D[3];
				if (I) {
					for (var C = I.length; --C >= 0;) {
						w[I.charAt(C)] = D
					}
				}
				D = D[1];
				I = "" + D;
				F.hasOwnProperty(I) || (B.push(D), F[I] = q)
			}
			B.push(/[\S\s]/);
			A = d(B)
		})();
		var v = k.length;
		return x
	}
	function o(u) {
		var k = [],
			w = [];
		u.tripleQuotedStrings ? k.push(["str", /^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/, q, "'\""]) : u.multiLineStrings ? k.push(["str", /^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/, q, "'\"`"]) : k.push(["str", /^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/, q, "\"'"]);
		u.verbatimStrings && w.push(["str", /^@"(?:[^"]|"")*(?:"|$)/, q]);
		var v = u.hashComments;
		v && (u.cStyleComments ? (v > 1 ? k.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, q, "#"]) : k.push(["com", /^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/, q, "#"]), w.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/, q])) : k.push(["com", /^#[^\n\r]*/, q, "#"]));
		u.cStyleComments && (w.push(["com", /^\/\/[^\n\r]*/, q]), w.push(["com", /^\/\*[\S\s]*?(?:\*\/|$)/, q]));
		u.regexLiterals && w.push(["lang-regex", /^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]);
		(v = u.types) && w.push(["typ", v]);
		u = ("" + u.keywords).replace(/^ | $/g, "");
		u.length && w.push(["kwd", RegExp("^(?:" + u.replace(/[\s,]+/g, "|") + ")\\b"), q]);
		k.push(["pln", /^\s+/, q, " \r\n\t\xa0"]);
		w.push(["lit", /^@[$_a-z][\w$@]*/i, q], ["typ", /^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/, q], ["pln", /^[$_a-z][\w$@]*/i, q], ["lit", /^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i, q, "0123456789"], ["pln", /^\\[\S\s]?/, q], ["pun", /^.[^\s\w"-$'./@\\`]*/, q]);
		return h(k, w)
	}
	function r(H, x) {
		function E(K) {
			switch (K.nodeType) {
				case 1:
					if (B.test(K.className)) {
						break
					}
					if ("BR" === K.nodeName) {
						C(K), K.parentNode && K.parentNode.removeChild(K)
					} else {
						for (K = K.firstChild; K; K = K.nextSibling) {
							E(K)
						}
					}
					break;
				case 3:
				case 4:
					if (v) {
						var k = K.nodeValue,
							L = k.match(I);
						if (L) {
							var M = k.substring(0, L.index);
							K.nodeValue = M;
							(k = k.substring(L.index + L[0].length)) && K.parentNode.insertBefore(J.createTextNode(k), K.nextSibling);
							C(K);
							M || K.parentNode.removeChild(K)
						}
					}
			}
		}
		function C(K) {
			function k(M, R) {
				var Q = R ? M.cloneNode(!1) : M,
					P = M.parentNode;
				if (P) {
					var P = k(P, 1),
						O = M.nextSibling;
					P.appendChild(Q);
					for (var N = O; N; N = O) {
						O = N.nextSibling, P.appendChild(N)
					}
				}
				return Q
			}
			for (; !K.nextSibling;) {
				if (K = K.parentNode, !K) {
					return
				}
			}
			for (var K = k(K.nextSibling, 0), L;
			(L = K.parentNode) && L.nodeType === 1;) {
				K = L
			}
			F.push(K)
		}
		var B = /(?:^|\s)nocode(?:\s|$)/,
			I = /\r\n?|\n/,
			J = H.ownerDocument,
			A;
		H.currentStyle ? A = H.currentStyle.whiteSpace : window.getComputedStyle && (A = J.defaultView.getComputedStyle(H, q).getPropertyValue("white-space"));
		var v = A && "pre" === A.substring(0, 3);
		for (A = J.createElement("LI"); H.firstChild;) {
			A.appendChild(H.firstChild)
		}
		for (var F = [A], D = 0; D < F.length; ++D) {
			E(F[D])
		}
		x === (x | 0) && F[0].setAttribute("value", x);
		var u = J.createElement("OL");
		u.className = "linenums";
		for (var w = Math.max(0, x - 1 | 0) || 0, D = 0, G = F.length; D < G; ++D) {
			A = F[D], A.className = "L" + (D + w) % 10, A.firstChild || A.appendChild(J.createTextNode("\xa0")), u.appendChild(A)
		}
		H.appendChild(u)
	}
	function z(u, k) {
		for (var w = k.length; --w >= 0;) {
			var v = k[w];
			y.hasOwnProperty(v) ? window.console && console.warn("cannot override language handler %s", v) : y[v] = u
		}
	}
	function s(u, k) {
		if (!u || !y.hasOwnProperty(u)) {
			u = /^\s*</.test(k) ? "default-markup" : "default-code"
		}
		return y[u]
	}
	function p(X) {
		var L = X.g;
		try {
			var T = c(X.h),
				Q = T.a;
			X.a = Q;
			X.c = T.c;
			X.d = 0;
			s(L, Q)(X);
			var N = /\bMSIE\b/.test(navigator.userAgent),
				L = /\n/g,
				F = X.a,
				G = F.length,
				T = 0,
				M = X.c,
				I = M.length,
				Q = 0,
				U = X.e,
				R = U.length,
				X = 0;
			U[R] = G;
			var H, K;
			for (K = H = 0; K < R;) {
				U[K] !== U[K + 2] ? (U[H++] = U[K++], U[H++] = U[K++]) : K += 2
			}
			R = H;
			for (K = H = 0; K < R;) {
				for (var A = U[K], S = U[K + 1], W = K + 2; W + 2 <= R && U[W + 1] === S;) {
					W += 2
				}
				U[H++] = A;
				U[H++] = S;
				K = W
			}
			for (U.length = H; Q < I;) {
				var J = M[Q + 2] || G,
					V = U[X + 2] || G,
					W = Math.min(J, V),
					P = M[Q + 1],
					O;
				if (P.nodeType !== 1 && (O = F.substring(T, W))) {
					N && (O = O.replace(L, "\r"));
					P.nodeValue = O;
					var E = P.ownerDocument,
						D = E.createElement("SPAN");
					D.className = U[X + 1];
					var B = P.parentNode;
					B.replaceChild(D, P);
					D.appendChild(P);
					T < J && (M[Q + 1] = P = E.createTextNode(F.substring(W, J)), B.insertBefore(P, D.nextSibling))
				}
				T = W;
				T >= J && (Q += 2);
				T >= V && (X += 2)
			}
		} catch (C) {
			"console" in window && console.log(C && C.stack ? C.stack : C)
		}
	}
	var m = ["break,continue,do,else,for,if,return,while"],
		j = [
			[m, "auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"], "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],
		n = [j, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],
		l = [j, "abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"],
		i = [l, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"],
		j = [j, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],
		g = [m, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
		f = [m, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],
		m = [m, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"],
		e = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/,
		b = /\S/,
		a = o({
			keywords: [n, i, j, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END" + g, f, m],
			hashComments: !0,
			cStyleComments: !0,
			multiLineStrings: !0,
			regexLiterals: !0
		}),
		y = {};
	z(a, ["default-code"]);
	z(h([], [
		["pln", /^[^<?]+/],
		["dec", /^<!\w[^>]*(?:>|$)/],
		["com", /^<\!--[\S\s]*?(?:--\>|$)/],
		["lang-", /^<\?([\S\s]+?)(?:\?>|$)/],
		["lang-", /^<%([\S\s]+?)(?:%>|$)/],
		["pun", /^(?:<[%?]|[%?]>)/],
		["lang-", /^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],
		["lang-js", /^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],
		["lang-css", /^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],
		["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]
	]), ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]);
	z(h([
		["pln", /^\s+/, q, " \t\r\n"],
		["atv", /^(?:"[^"]*"?|'[^']*'?)/, q, "\"'"]
	], [
		["tag", /^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],
		["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
		["lang-uq.val", /^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],
		["pun", /^[/<->]+/],
		["lang-js", /^on\w+\s*=\s*"([^"]+)"/i],
		["lang-js", /^on\w+\s*=\s*'([^']+)'/i],
		["lang-js", /^on\w+\s*=\s*([^\s"'>]+)/i],
		["lang-css", /^style\s*=\s*"([^"]+)"/i],
		["lang-css", /^style\s*=\s*'([^']+)'/i],
		["lang-css", /^style\s*=\s*([^\s"'>]+)/i]
	]), ["in.tag"]);
	z(h([], [
		["atv", /^[\S\s]+/]
	]), ["uq.val"]);
	z(o({
		keywords: n,
		hashComments: !0,
		cStyleComments: !0,
		types: e
	}), ["c", "cc", "cpp", "cxx", "cyc", "m"]);
	z(o({
		keywords: "null,true,false"
	}), ["json"]);
	z(o({
		keywords: i,
		hashComments: !0,
		cStyleComments: !0,
		verbatimStrings: !0,
		types: e
	}), ["cs"]);
	z(o({
		keywords: l,
		cStyleComments: !0
	}), ["java"]);
	z(o({
		keywords: m,
		hashComments: !0,
		multiLineStrings: !0
	}), ["bsh", "csh", "sh"]);
	z(o({
		keywords: g,
		hashComments: !0,
		multiLineStrings: !0,
		tripleQuotedStrings: !0
	}), ["cv", "py"]);
	z(o({
		keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
		hashComments: !0,
		multiLineStrings: !0,
		regexLiterals: !0
	}), ["perl", "pl", "pm"]);
	z(o({
		keywords: f,
		hashComments: !0,
		multiLineStrings: !0,
		regexLiterals: !0
	}), ["rb"]);
	z(o({
		keywords: j,
		cStyleComments: !0,
		regexLiterals: !0
	}), ["js"]);
	z(o({
		keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes",
		hashComments: 3,
		cStyleComments: !0,
		multilineStrings: !0,
		tripleQuotedStrings: !0,
		regexLiterals: !0
	}), ["coffee"]);
	z(h([], [
		["str", /^[\S\s]+/]
	]), ["regex"]);
	window.prettyPrintOne = function(u, k, w) {
		var v = document.createElement("PRE");
		v.innerHTML = u;
		w && r(v, w);
		p({
			g: k,
			i: w,
			h: v
		});
		return v.innerHTML
	};
	window.prettyPrint = function(E) {
		function v() {
			for (var L = window.PR_SHOULD_USE_CONTINUATION ? w.now() + 250 : Infinity; u < A.length && w.now() < L; u++) {
				var O = A[u],
					I = O.className;
				if (I.indexOf("prettyprint") >= 0) {
					var I = I.match(B),
						K, H;
					if (H = !I) {
						H = O;
						for (var M = void 0, N = H.firstChild; N; N = N.nextSibling) {
							var J = N.nodeType,
								M = J === 1 ? M ? H : N : J === 3 ? b.test(N.nodeValue) ? H : M : M
						}
						H = (K = M === H ? void 0 : M) && "CODE" === K.tagName
					}
					H && (I = K.className.match(B));
					I && (I = I[1]);
					H = !1;
					for (M = O.parentNode; M; M = M.parentNode) {
						if ((M.tagName === "pre" || M.tagName === "code" || M.tagName === "xmp") && M.className && M.className.indexOf("prettyprint") >= 0) {
							H = !0;
							break
						}
					}
					H || ((H = (H = O.className.match(/\blinenums\b(?::(\d+))?/)) ? H[1] && H[1].length ? +H[1] : !0 : !1) && r(O, H), D = {
						g: I,
						h: O,
						i: H
					}, p(D))
				}
			}
			u < A.length ? setTimeout(v, 250) : E && E()
		}
		for (var C = [document.getElementsByTagName("pre"), document.getElementsByTagName("code"), document.getElementsByTagName("xmp")], A = [], x = 0; x < C.length; ++x) {
			for (var F = 0, G = C[x].length; F < G; ++F) {
				A.push(C[x][F])
			}
		}
		var C = q,
			w = Date;
		w.now || (w = {
			now: function() {
				return +new Date
			}
		});
		var u = 0,
			D, B = /\blang(?:uage)?-([\w.]+)(?!\S)/;
		v()
	};
	window.PR = {
		createSimpleLexer: h,
		registerLangHandler: z,
		sourceDecorator: o,
		PR_ATTRIB_NAME: "atn",
		PR_ATTRIB_VALUE: "atv",
		PR_COMMENT: "com",
		PR_DECLARATION: "dec",
		PR_KEYWORD: "kwd",
		PR_LITERAL: "lit",
		PR_NOCODE: "nocode",
		PR_PLAIN: "pln",
		PR_PUNCTUATION: "pun",
		PR_SOURCE: "src",
		PR_STRING: "str",
		PR_TAG: "tag",
		PR_TYPE: "typ"
	}
})();


/**
 * Ext框架界面渲染从这里开始
 */
Ext.ns("Docs");
Ext.Loader.setConfig({
	enabled: true,
	paths: {
		Docs: "app"
	}
});

Ext.require("Ext.form.field.Trigger");
Ext.require("Ext.tab.Panel");
Ext.require("Ext.grid.column.Action");
Ext.require("Ext.grid.plugin.DragDrop");
Ext.require("Ext.layout.container.Border");
Ext.require("Ext.data.TreeStore");
Ext.require("Ext.toolbar.Spacer");
Ext.require("Docs.Application");

Ext.onReady(function() {
	Ext.create("Docs.Application");
});

