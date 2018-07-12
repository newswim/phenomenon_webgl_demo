// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"node_modules/phenomenon/dist/phenomenon.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var classCallCheck = function (e, r) {
  if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
},
    Instance = function (e) {
  var r = this;this.compileShader = function (e, t) {
    var i = r.gl.createShader(e);return r.gl.shaderSource(i, t), r.gl.compileShader(i), i;
  }, this.prepareProgram = function () {
    var e = r.gl,
        t = r.vertex,
        i = r.fragment,
        n = r.compileShader,
        a = e.createProgram();e.attachShader(a, n(35633, t, e)), e.attachShader(a, n(35632, i, e)), e.linkProgram(a), e.useProgram(a), r.program = a;
  }, this.prepareUniforms = function () {
    for (var e = Object.keys(r.uniforms), t = 0; e.length > t; t += 1) {
      var i = r.gl.getUniformLocation(r.program, e[t]);r.uniforms[e[t]].location = i;
    }
  }, this.prepareAttributes = function () {
    var e = r.geometry,
        t = r.attributes,
        i = r.multiplier,
        n = e.vertices,
        a = e.normal,
        o = ["x", "y", "z"];void 0 !== n && r.attributes.push({ name: "aPosition", size: 3 }), void 0 !== a && r.attributes.push({ name: "aNormal", size: 3 });for (var s = 0; t.length > s; s += 1) {
      for (var f = t[s], u = new Float32Array(i * n.length * f.size), l = 0; i > l; l += 1) for (var c = f.data && f.data(l, i), d = l * n.length * f.size, h = 0; n.length > h; h += 1) for (var m = 0; f.size > m; m += 1) {
        var g = r.modifiers[f.name];u[(d += 1) - 1] = void 0 !== g ? g(c, h, m, r) : "aPosition" === f.name ? n[h][o[m]] : "aNormal" === f.name ? a[h][o[m]] : c[m];
      }r.attributes[s].data = u;
    }
  }, this.prepareBuffers = function () {
    r.buffers = [];for (var e = 0; r.attributes.length > e; e += 1) {
      var t = r.attributes[e],
          i = t.data,
          n = t.name,
          a = t.size,
          o = r.gl.createBuffer();r.gl.bindBuffer(34962, o), r.gl.bufferData(34962, i, 35044);var s = r.gl.getAttribLocation(r.program, n);r.gl.enableVertexAttribArray(s), r.gl.vertexAttribPointer(s, a, 5126, !1, !1, 0), r.buffers.push({ buffer: o, location: s, size: a });
    }
  }, this.render = function (e) {
    var t = r.uniforms,
        i = r.multiplier,
        n = r.gl;n.useProgram(r.program), r.willRender && r.willRender(r);for (var a = 0; r.buffers.length > a; a += 1) {
      var o = r.buffers[a],
          s = o.location,
          f = o.buffer,
          u = o.size;n.enableVertexAttribArray(s), n.bindBuffer(34962, f), n.vertexAttribPointer(s, u, 5126, !1, !1, 0);
    }Object.keys(e).forEach(function (r) {
      t[r].value = e[r].value;
    }), Object.keys(t).forEach(function (e) {
      var i = t[e];r.uniformMap[i.type](i.location, i.value);
    }), n.drawArrays(r.mode, 0, i * r.geometry.vertices.length), r.didRender && r.didRender(r);
  }, this.destroy = function () {
    for (var e = 0; r.buffers.length > e; e += 1) r.gl.deleteBuffer(r.buffers.buffer);r.gl.deleteProgram(r.program), r.gl = null;
  }, Object.assign(this, { uniforms: {}, geometry: { vertices: [{ x: 0, y: 0, z: 0 }] }, mode: 0, modifiers: {} }), Object.assign(this, e), this.prepareProgram(), this.prepareUniforms(), this.prepareAttributes(), this.prepareBuffers();
},
    Renderer = function (e) {
  var r = e.canvas,
      t = void 0 === r ? document.querySelector("canvas") : r,
      i = e.context,
      n = void 0 === i ? {} : i,
      a = e.settings,
      o = void 0 === a ? {} : a;_initialiseProps.call(this);var s = t.getContext("webgl", Object.assign({ alpha: !1, antialias: !1 }, n));Object.assign(this, { gl: s, canvas: t, uniforms: {}, instances: new Map(), shouldRender: !0 }), Object.assign(this, { devicePixelRatio: 1, clearColor: [1, 1, 1, 1], position: { x: 0, y: 0, z: 2 } }), Object.assign(this, o), this.uniformMap = { float: function (e, r) {
      return s.uniform1f(e, r);
    }, vec2: function (e, r) {
      return s.uniform2fv(e, r);
    }, vec3: function (e, r) {
      return s.uniform3fv(e, r);
    }, vec4: function (e, r) {
      return s.uniform4fv(e, r);
    }, mat2: function (e, r) {
      return s.uniformMatrix2fv(e, !1, r);
    }, mat3: function (e, r) {
      return s.uniformMatrix3fv(e, !1, r);
    }, mat4: function (e, r) {
      return s.uniformMatrix4fv(e, !1, r);
    } }, s.enable(s.DEPTH_TEST), s.depthFunc(s.LEQUAL), !1 === s.getContextAttributes().alpha && (s.clearColor.apply(s, this.clearColor), s.clearDepth(1)), window.addEventListener("resize", this.resize), this.resize(), this.render();
},
    _initialiseProps = function () {
  var e = this;this.resize = function () {
    var r = e.gl,
        t = e.canvas,
        i = e.devicePixelRatio,
        n = e.position;t.width = t.clientWidth * i, t.height = t.clientHeight * i;var a = r.drawingBufferWidth,
        o = r.drawingBufferHeight,
        s = a / o;r.viewport(0, 0, a, o);var f = .41421356237309503,
        u = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, n.x, n.y, (1 > s ? 1 : s) * -n.z, 1];e.uniforms.uProjectionMatrix = { type: "mat4", value: [.5 / f, 0, 0, 0, 0, s / f * .5, 0, 0, 0, 0, -100.001 / 99.999, -1, 0, 0, .001 / 99.999 * -200, 0] }, e.uniforms.uViewMatrix = { type: "mat4", value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] }, e.uniforms.uModelMatrix = { type: "mat4", value: u };
  }, this.toggle = function (r) {
    r !== e.shouldRender && (e.shouldRender = void 0 !== r ? r : !e.shouldRender, e.shouldRender && e.render());
  }, this.render = function () {
    e.gl.clear(16640), e.willRender && e.willRender(e), e.instances.forEach(function (r) {
      r.render(e.uniforms);
    }), e.didRender && e.didRender(e), e.shouldRender && requestAnimationFrame(e.render);
  }, this.add = function (r, t) {
    t.uniforms = t.uniforms || {}, t.uniforms = Object.assign(t.uniforms, JSON.parse(JSON.stringify(e.uniforms))), Object.assign(t, { gl: e.gl, uniformMap: e.uniformMap });var i = new Instance(t);e.instances.set(r, i);
  }, this.remove = function (r) {
    var t = e.instances.get(r);void 0 !== t && (t.destroy(), e.instances.delete(r));
  }, this.destroy = function () {
    e.instances.forEach(function (r, t) {
      r.destroy(), e.instances.delete(t);
    });
  };
};exports.default = Renderer;
},{}],"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.getRandom = getRandom;
function rotateX(m, angle) {
	var c = Math.cos(angle);
	var s = Math.sin(angle);
	var mv1 = m[1];
	var mv5 = m[5];
	var mv9 = m[9];

	m[1] = m[1] * c - m[2] * s;
	m[5] = m[5] * c - m[6] * s;
	m[9] = m[9] * c - m[10] * s;

	m[2] = m[2] * c + mv1 * s;
	m[6] = m[6] * c + mv5 * s;
	m[10] = m[10] * c + mv9 * s;
}

function rotateY(m, angle) {
	var c = Math.cos(angle);
	var s = Math.sin(angle);
	var mv0 = m[0];
	var mv4 = m[4];
	var mv8 = m[8];

	m[0] = c * m[0] + s * m[2];
	m[4] = c * m[4] + s * m[6];
	m[8] = c * m[8] + s * m[10];

	m[2] = c * m[2] - s * mv0;
	m[6] = c * m[6] - s * mv4;
	m[10] = c * m[10] - s * mv8;
}

function getRandom(value) {
	var floor = -value;
	return floor + Math.random() * value * 2;
}
},{}],"main.js":[function(require,module,exports) {
'use strict';

var _phenomenon = require('phenomenon');

var _phenomenon2 = _interopRequireDefault(_phenomenon);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The amount of particles that will be created
var multiplier = 400000;

// Percentage of how long every particle will move


// Import optional utils
var duration = 0.9;

// Update value for every frame
var step = 0.01;

// Multiplier of the canvas resolution
var devicePixelRatio = 1;

// Every attribute must have:
// - Name (used in the shader)
// - Data (returns data for every particle)
// - Size (amount of variables in the data)
var attributes = [{
	name: 'aPositionStart',
	data: function data() {
		return [(0, _utils.getRandom)(0.5), (0, _utils.getRandom)(0.5), (0, _utils.getRandom)(0.5)];
	},
	size: 3
}, {
	name: 'aPositionEnd',
	data: function data() {
		return [(0, _utils.getRandom)(1.5), (0, _utils.getRandom)(1.5), (0, _utils.getRandom)(1.5)];
	},
	size: 3
}, {
	name: 'aColor',
	data: function data() {
		return Math.random() > 0.5 ? [29 / 255, 233 / 255, 182 / 255, 1] : [4 / 255, 208 / 255, 157 / 255, 1];
	},
	size: 3
}, {
	name: 'aOffset',
	data: function data(i) {
		return [i * ((1 - duration) / (multiplier - 1))];
	},
	size: 1
}];

// Every uniform must have:
// - Key (used in the shader)
// - Type (what kind of value)
// - Value (based on the type)
var uniforms = {
	uProgress: {
		type: 'float',
		value: 0.0
	}
};

// Vertex shader used to calculate the position
var vertex = '\n  attribute vec3 aPositionStart;\n  attribute vec3 aControlPointOne;\n  attribute vec3 aControlPointTwo;\n  attribute vec3 aPositionEnd;\n  attribute vec3 aPosition;\n  attribute vec3 aColor;\n  attribute float aOffset;\n\n  uniform float uProgress;\n  uniform mat4 uProjectionMatrix;\n  uniform mat4 uModelMatrix;\n  uniform mat4 uViewMatrix;\n\n  varying vec3 vColor;\n\n  float easeInOutQuint(float t){\n    return t < 0.5 ? 16.0 * t * t * t * t * t : 1.0 + 16.0 * (--t) * t * t * t * t;\n  }\n\n  void main(){\n    float tProgress = easeInOutQuint(min(1.0, max(0.0, (uProgress - aOffset)) / ' + duration + '));\n    vec3 newPosition = mix(aPositionStart, aPositionEnd, tProgress);\n    gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix * vec4(newPosition + aPosition, 1.0);\n    gl_PointSize = ' + devicePixelRatio.toFixed(1) + ';\n    vColor = aColor;\n  }\n';

// Fragment shader to draw the colored pixels to the canvas
var fragment = '\n  precision mediump float;\n\n  varying vec3 vColor;\n\n  void main(){\n    gl_FragColor = vec4(vColor, 1.0);\n  }\n';

// Boolean value to switch direction
var forward = true;

// Create the renderer
var phenomenon = new _phenomenon2.default({
	settings: {
		devicePixelRatio: devicePixelRatio,
		position: { x: 0, y: 0, z: 3 },
		shouldRender: true,
		uniforms: uniforms,
		willRender: function willRender(r) {
			var _r$uniforms = r.uniforms,
			    uProgress = _r$uniforms.uProgress,
			    uModelMatrix = _r$uniforms.uModelMatrix;

			uProgress.value += forward ? step : -step;

			if (uProgress.value >= 1) forward = false;else if (uProgress.value <= 0) forward = true;

			(0, _utils.rotateY)(uModelMatrix.value, step * 2);
			(0, _utils.rotateX)(uModelMatrix.value, step * 2);
		}
	}
});

// Add an instance to the renderer
phenomenon.add('cube', {
	attributes: attributes,
	multiplier: multiplier,
	vertex: vertex,
	fragment: fragment
});
},{"phenomenon":"node_modules/phenomenon/dist/phenomenon.es.js","./utils":"utils.js"}],"../../../.nvm/versions/node/v10.5.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '56441' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../.nvm/versions/node/v10.5.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.822de4bd.map