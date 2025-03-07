var isMouseDown=false,scratchJsFlashArray=[];
function percent(p) { document.getElementById("counter").innerHTML = p; }
function callback(p,e) { alert("This is an example of a callback function. You can set any callback function of your choice, it will be triggered when the foreground image has been scratched off"); isMouseDown=false; }
window.onload = function() {
	createScratchCard({
		'container': document.getElementById('scratch1'),
		'background':'assets/images/ScratchRevealScratched.png',
		'foreground':'assets/images/ScratchReveal.png',
		'coin':'coin2.png',
		'percent': 100,
		'thickness':36,
		'flashPath' : 'assets/images/scratchcard.swf'
	});
	createScratchCard({
		'container': document.getElementById('star'),
		'background':'assets/images/demo2-star-background.png',
		'foreground':'assets/images/demo2-star-foreground.png',
		'coin':'assets/images/coin2.png',
		'percent': 100,
		'thickness':16,
		'flashPath' : 'assets/swf/scratchcard.swf'
	});
	createScratchCard({
		'container': document.getElementById('multiple'),
		'background':'assets/images/demo4-star-background.png',
		'foreground':'assets/images/demo2-star-foreground.png',
		'coin':'assets/images/coin2.png',
		'percent': 100,
		'thickness':16,
		'flashPath' : 'assets/swf/scratchcard.swf'
	});


	createScratchCard({
		'container': document.getElementById('scratch3'),
		'background':'assets/images/background.png',
		'foreground':'assets/images/foreground.png',
		'percent': 90,
		'thickness':80,
		'counter':'percent',
		'callback': 'callback',
		'flashPath' : 'assets/swf/scratchcard.swf'
	});

	document.getElementById('firstButton').onclick = function() { document.getElementById('scratch3').lock(); };
	document.getElementById('secondButton').onclick = function() { document.getElementById('scratch3').clean(); };
	document.getElementById('thirdButton').onclick = function() { document.getElementById('scratch3').restart(); };

};
function scratchJsFlashCallback(a, t, m) {
  "undefined" !== typeof m ? (a = window[a], "function" === typeof a && a(m, scratchJsFlashArray[t])) : (m = window[a], "function" === typeof m && m(scratchJsFlashArray[t]))
}
function createScratchCard(a) {
  function t() {
      clearTimeout(a.resizeTrigger);
      a.resizeTrigger = setTimeout(m, 100)
  }
  function m() {
      window.removeEventListener("resize", m);
      z(!1);
      createScratchCard(a)
  }
  function K() {
      if ("undefined" == typeof a.foreground || a.hasEnded)
          return !1;
      "#" !== a.foreground.charAt(0) || 4 != a.foreground.length && 7 != a.foreground.length ? (d.topImage.crossOrigin = "anonymous", d.topImage.src = a.foreground, d.topImage.onload = function () {
          "undefined" !== typeof a.scratchedOverlay ? (h.drawImage(d.topImage, 0, 0, e, f), h.globalCompositeOperation = "destination-out", h.drawImage(a.scratchedOverlay, 0, 0, e, f)) : h.drawImage(d.topImage, 0, 0, e, f);
          F()
      }) : (h.fillStyle = a.foreground, h.fillRect(0, 0, e, f), "undefined" !== typeof a.scratchedOverlay && (h.globalCompositeOperation = "destination-out", h.drawImage(a.scratchedOverlay, 0, 0, e, f)), F());
      "undefined" != typeof a.percent && (d.endAt = a.percent);
      "undefined" != typeof a.coin ? (d.coinImage.src = a.coin, d.coinImage.onload = function () {
          A = d.coinImage.width * q;
          B = d.coinImage.height * q;
          g.style.width = A + "px";
          g.style.height = B + "px";
          g.style.background = 'url("' + a.coin + '") no-repeat left top';
          g.style.backgroundSize = "100%";
          c.style.cursor = "none";
          g.style.position = "absolute";
          g.style.display = "none";
          g.style.zIndex = "9000";
          g.style.top = 0;
          g.style.left = 0;
          g.style.pointerEvents = "none";
          C(g)
      }) : b.style.cursor = d.defaultCursor;
      "undefined" != typeof a.thickness && (d.thickness = a.thickness);
      "undefined" != typeof a.counter && (d.counter = a.counter, r = window[a.counter]);
      document.body.addEventListener("touchstart", function () {
          G = !0
      }, !1);
      b.addEventListener("mousedown", k);
      b.addEventListener("mousemove", k);
      document.addEventListener("mouseup", n);
      b.addEventListener("touchstart", k);
      b.addEventListener("touchmove", k);
      document.addEventListener("touchend", n);
      b.addEventListener("mouseover", u);
      b.addEventListener("mouseout", v);
      b.addEventListener("mousemove", w)
  }
  function H(a) {
      for (var b = 0, d = 0; a; )
          b += a.offsetLeft + a.clientLeft, d += a.offsetTop + a.clientTop, a = a.offsetParent;
      return {
          x: b,
          y: d
      }
  }
  function F() {
      window.addEventListener("resize", t);
      c.appendChild(b);
      c.appendChild(g);
      c.style.background = 'url("' + a.background + '") center center no-repeat';
      c.style.backgroundSize = "100%"
  }
  function k(a) {
      var D = !1;
      if ("touchmove" == a.type)
          a.preventDefault(), D = !1;
      else if ("mousedown" == a.type || "touchstart" == a.type)
          D = isMouseDown = !0;
      I(!0);
      if (isMouseDown) {
          var e = a.pageX - this.offsetLeft,
          f = a.pageY - this.offsetTop,
          g = H(c),
          e = a.pageX - g.x,
          f = a.pageY - g.y;
          if ("touchmove" == a.type || "touchstart" == a.type)
              J = 20, f = a.touches[0], e = f.pageX - g.x, f = f.pageY - g.y;
          h.save();
          h.globalCompositeOperation = "destination-out";
          h.beginPath();
          h.arc(e, f, d.thickness * q, 0, 2 * Math.PI, !1);
          h.closePath();
          h.fillStyle = "rgba(0, 0, 0, 1)";
          h.fill();
          h.restore();
          if ("touchmove" == a.type || "touchstart" == a.type || "touchend" == a.type)
              b.style.marginRight = "1px", b.style.marginRight = "0px";
          parseInt(I(D)) >= d.endAt && z(!0)
      }
  }
  function z(l) {
      b.removeEventListener("mousedown", k);
      b.removeEventListener("mousemove", k);
      document.removeEventListener("mouseup", n);
      b.removeEventListener("mouseover", u);
      b.removeEventListener("mouseout", v);
      b.removeEventListener("mousemove", w);
      b.removeEventListener("touchstart", k);
      b.removeEventListener("touchmove", k);
      document.removeEventListener("touchend", n);
      c.addEventListener("touchmove", function (a) {
          a.preventDefault();
          return !1
      });
      l && !a.hasEnded ? (a.hasEnded = !0, c.style.setProperty("cursor", "default", "important"), b.style.setProperty("cursor", "default", "important"), g.style.display = "none", delete a.scratchedOverlay, c.innerHTML = "", 0 != d.counter && "function" === typeof r && r(s, a), l = window[a.callback], "function" === typeof l && l(a)) : l || a.hasEnded || (0 != x && (c.style.width = x), 0 != y && (c.style.height = y), a.scratchedOverlay = L(), c.style.backgroundImage = "none", c.innerHTML = "")
  }
  function I(l) {
      if (0 == M++ % J || l) {
          l = 0;
          for (var b = h.getImageData(0, 0, e, f).data, c = 0, g = b.length - 20; c < g; c += 80)
              0 < b[c] && l++;
          "undefined" === typeof E && (E = e * f / 20 - l);
          s = (100 - l / (e * f / 20 - E) * 100).toFixed(2)
      }
      0 != d.counter && "function" === typeof r && 0 < s && r(s, a);
      return s
  }
  function L() {
      var a = document.createElement("canvas");
      a.width = e;
      a.height = f;
      var d = a.getContext("2d");
      d.translate(0, 0);
      d.fillStyle = "rgba(10, 11, 12, 200)";
      d.fillRect(0, 0, e, f);
      d.globalCompositeOperation = "destination-out";
      d.drawImage(b, 0, 0, e, f);
      return a
  }
  function n() {
      isMouseDown = !1
  }
  function u(a) {
      G || (g.style.display = "block")
  }
  function v(a) {
      g.style.display = "none"
  }
  function w(a) {
      var b = H(c);
      g.style.left = a.pageX - b.x - A / 2 + "px";
      g.style.top = a.pageY - b.y - B / 2 + "px"
  }
  function C(a) {
      a.style.setProperty("-khtml-user-select", "none", "important");
      a.style.setProperty("-webkit-user-select", "none", "important");
      a.style.setProperty("-moz-user-select", "-moz-none", "important");
      a.style.setProperty("-ms-user-select", "none", "important");
      a.style.setProperty("user-select", "none", "important");
      a.style.setProperty("-webkit-touch-callout", "none", "important");
      a.style.setProperty("-ms-touch-action", "none", "important")
  }
  function p() {
      b.style.setProperty("cursor", "default", "important");
      document.removeEventListener("touchstart", p);
      document.removeEventListener("touchmove", p);
      document.removeEventListener("touchend", p)
  }
  var d = {
      topImage: new Image,
      bottomImage: new Image,
      coinImage: new Image,
      thickness: 20,
      endAt: 95,
      defaultCursor: "pointer",
      counter: !1
  },
  s = 0,
  M = 0,
  r,
  c,
  e,
  f,
  E,
  x = 0,
  y = 0,
  q = 1,
  G = !1,
  J = 10;
  "undefined" === typeof a.resizeTrigger && a.resizeTrigger;
  "undefined" === typeof a.hasEnded && (a.hasEnded = !1);
  "undefined" !== typeof a.width && "undefined" !== typeof a.height && (e = a.width, f = a.height);
  if (!window.HTMLCanvasElement || 1 == a.flash) {
      if ("undefined" !== typeof a.flashPath)
          return "undefined" != typeof a.background && (d.bottomImage.onload = function () {
              var b = document.createElement("object");
              b.type = "application/x-shockwave-flash";
              b.data = a.flashPath;
              "undefined" !== typeof a.container && 0 != a.container.offsetWidth * a.container.offsetHeight ? (b.width = a.container.offsetWidth, b.height = a.container.offsetHeight) : (b.width = d.bottomImage.width, b.height = d.bottomImage.height);
              var c = "backgroundImage=" + a.background + "&foregroundImage=" + a.foreground,
              e = scratchJsFlashArray.length;
              scratchJsFlashArray.push(a);
              c += "&init=" + e;
              c = "undefined" !== typeof a.coin ? c + ("&coin=" + a.coin) : c + ("&cursor=" + d.defaultCursor);
              c = "undefined" !== typeof a.thickness ? c + ("&thickness=" + a.thickness) : c + ("&thickness=" + d.thickness);
              c = "undefined" != typeof a.percent ? c + ("&percent=" + a.percent) : c + ("&percent=" + d.endAt);
              "undefined" != typeof a.counter && (c += "&counter=" + a.counter);
              "undefined" != typeof a.callback && (c += "&callback=" + a.callback);
              e = document.createElement("param");
              e.name = "movie";
              e.value = a.flashPath;
              var f = document.createElement("param");
              f.name = "FlashVars";
              f.value = c;
              var g = document.createElement("param");
              g.name = "FlashContent";
              g.value = a.flashPath;
              var h = document.createElement("embed");
              h.src = a.flashPath;
              h.width = b.width;
              h.height = b.height;
              h.type = "application/x-shockwave-flash";
              -1 != navigator.userAgent.toLowerCase().indexOf("msie") ? a.container.innerHTML = '<object type="application/x-shockwave-flash" data="' + a.flashPath + '" width="' + b.width + '" height="' + b.height + '" ><param name="movie" value="' + a.flashPath + '" /><param name="FlashVars" value="' + c + '" /></object>' : (b.appendChild(e), b.appendChild(f), b.appendChild(g), b.appendChild(h), a.container.appendChild(b));
              a.locked = !0;
              a.container.lock = function (c) {
                  "undefined" === typeof c && (c = a.locked);
                  a.locked = !a.locked;
                  b.lock(c)
              };
              a.container.restart = function () {
                  b.restart()
              };
              a.container.clean = function () {
                  b.clean()
              }
          }, d.bottomImage.src = a.background), !1;
      c.innerHTML = "Your browser does not support HTML5 canvas tag."
  }
  if ("undefined" != typeof a.container)
      c = a.container, e = c.offsetWidth, f = c.offsetHeight, c.style.setProperty("position", "relative", "important"), c.style.setProperty("padding", "0", "important"), C(c);
  else
      return !1;
  if ("undefined" == typeof a.background || a.hasEnded)
      return !1;
  d.bottomImage.onload = function () {
      0 != e && 0 == f ? (y = "auto", f = e / d.bottomImage.width * d.bottomImage.height, c.style.height = f + "px") : 0 == e && 0 != f && (x = "auto", e = f / d.bottomImage.height * d.bottomImage.width, c.style.width = e + "px");
      0 == e * f && (y = x = "auto", e = d.bottomImage.width, f = d.bottomImage.height, c.style.width = e + "px", c.style.height = f + "px");
      "undefined" == typeof a.responsiveRatio ? a.responsiveRatio = e / d.bottomImage.width : q = e / d.bottomImage.width;
      q = e / d.bottomImage.width / a.responsiveRatio;
      b.width = e;
      b.height = f;
      C(b);
      K()
  };
  d.bottomImage.src = a.background;
  var b = document.createElement("canvas");
  b.className = "scratchcard-Overlay";
  var h = b.getContext("2d");
  h.translate(0, 0);
  var g = document.createElement("div");
  g.className = "scratchcard-Cursor";
  var A = 0,
  B = 0;
  document.addEventListener("touchstart", p);
  document.addEventListener("touchmove", p);
  document.addEventListener("touchend", p);
  a.locked = !1;
  a.container.lock = function (c) {
      "undefined" !== typeof c && (a.locked = !c);
      a.locked ? (b.addEventListener("mousedown", k), b.addEventListener("mousemove", k), document.addEventListener("mouseup", n), b.addEventListener("mouseover", u), b.addEventListener("mouseout", v), b.addEventListener("mousemove", w), b.addEventListener("touchstart", k), b.addEventListener("touchmove", k), document.addEventListener("touchend", n), "undefined" == typeof a.coin && (b.style.cursor = d.defaultCursor)) : (b.removeEventListener("mousedown", k), b.removeEventListener("mousemove", k), document.removeEventListener("mouseup", n), b.removeEventListener("mouseover", u), b.removeEventListener("mouseout", v), b.removeEventListener("mousemove", w), b.removeEventListener("touchstart", k), b.removeEventListener("touchmove", k), document.removeEventListener("touchend", n), b.style.cursor = "default");
      a.locked = !a.locked
  };
  a.container.restart = function () {
      a.hasEnded = !1;
      z(!1);
      a.scratchedOverlay = void 0;
      window.removeEventListener("resize", m);
      createScratchCard(a)
  };
  a.container.clean = function () {
      a.hasEnded = !0;
      a.container.lock(!0);
      delete a.scratchedOverlay;
      c.innerHTML = "";
      c.style.setProperty("cursor", "default")
  }
};
