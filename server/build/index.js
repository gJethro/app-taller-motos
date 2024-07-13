"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//@ts-nocheck

var app = (0, _express["default"])();
var port = 3000;
app.listen(port, function () {
  console.log("working server. listening on port ".concat(port));
});