"use strict";

require("./env")
var zeroClipboard, clip;
exports.client = {

  setUp: function (callback) {
    zeroClipboard = require("../ZeroClipboard");
    clip = new zeroClipboard.Client();
    callback();
  },

  tearDown: function (callback) {
    zeroClipboard.destroy();
    callback();
  },

  "Client without selector doesn't have element": function (test) {

    // Test the client is null
    test.ok(clip.htmlBridge);
    test.ok(clip.handlers);

    test.done();
  },

  "Clip is created properly": function (test) {

    // Test the client was created properly
    test.ok(clip.htmlBridge);
    test.ok(clip.handlers);

    test.done();
  },

  "Detecting no flash": function (test) {
    navigator.mimeTypes["application/x-shockwave-flash"] = undefined;

    // Test that we don't have flash
    test.equal(zeroClipboard.detectFlashSupport(), false);

    navigator.mimeTypes["application/x-shockwave-flash"] = true;
    test.done();
  },

  "Detecting has flash mimetype": function (test) {

    // Test that we don't have flash
    test.equal(zeroClipboard.detectFlashSupport(), true);

    test.done();
  },

  "Glue element after new client": function (test) {

    clip.glue($("#d_clip_button"))

    // Test the client was created properly
    test.ok(clip.htmlBridge);
    test.ok(clip.handlers);

    test.done();
  },

  "Glue element with query string throws TypeError": function (test) {

    test.throws(function(){
      clip.glue("#d_clip_button")
    }, TypeError);

    test.done();
  },

  "Changing movie path works": function (test) {

    // Test the client has default path
    test.equal(zeroClipboard._moviePath, "ZeroClipboard.swf");

    // change the path
    zeroClipboard.setMoviePath("new/movie/path.swf");
    test.equal(zeroClipboard._moviePath, "new/movie/path.swf");

    test.done();
  },

  "Clip sets title properly": function (test) {

    clip.glue($("#d_clip_button"));

    clip.setTitle("Click Me");

    test.equal(clip.htmlBridge.getAttribute("title"), "Click Me");

    test.done();
  },

  "resetText clears the title": function (test) {
    clip.glue($("#d_clip_button"));

    clip.setCurrent($("#d_clip_button")[0]);

    test.equal(clip._text, "Copy me!");

    test.ok(clip._text);

    clip.resetText();

    test.equal(clip._text, null);

    test.done();

  },

  "setText overrides the data-clipboard-text attribute": function (test) {
    clip.glue($("#d_clip_button"));

    clip.setText("This is the new text");

    clip.setCurrent($("#d_clip_button")[0]);

    test.equal(clip._text, "This is the new text");

    test.done();
  },

  "resetText turns things back to normal": function (test) {
    clip.glue($("#d_clip_button"));

    clip.setText("This is the new text");

    clip.setCurrent($("#d_clip_button")[0]);

    test.equal(clip._text, "This is the new text");

    clip.resetText();

    clip.setCurrent($("#d_clip_button")[0]);

    test.equal(clip._text, "Copy me!");

    test.done();
  },

  "Object has a title": function (test) {

    clip.glue($("#d_clip_button"));

    var element = $("#d_clip_button")[0];

    clip.setCurrent(element);

    test.equal(clip.htmlBridge.getAttribute("title"), "Click me to copy to clipboard.")

    clip.resetBridge();

    test.done();
  },

  "Object has no title": function (test) {

    clip.glue($("#d_clip_button_no_title"));

    var element = $("#d_clip_button_no_title")[0];

    clip.setCurrent(element);

    test.ok(!clip.htmlBridge.getAttribute("title"));

    test.done();
  },

  "Object has data-clipboard-text": function (test) {

    clip.glue($("#d_clip_button"));
    var element = $("#d_clip_button")[0];

    clip.setCurrent(element);

    test.equal(clip._text, "Copy me!")

    clip.resetBridge();

    test.done();
  },

  "Object doesn't have data-clipboard-text": function (test) {

    clip.glue($("#d_clip_button_no_text"));
    var element = $("#d_clip_button_no_text")[0];

    clip.setCurrent(element);

    test.ok(!clip.htmlBridge.getAttribute("data-clipboard-text"));

    test.done();
  },

  "Bridge is ready": function (test) {

    zeroClipboard.dispatch("load", { flashVersion: "MAC 11,0,0" });

    test.ok(clip.ready());

    test.done();
  },

  "Trying a new client is same client": function (test) {

    test.ok(clip.htmlBridge);

    test.equal($(".global-zeroclipboard-container").length, 1);

    var clip2 = new zeroClipboard.Client();

    test.equal($(".global-zeroclipboard-container").length, 1);

    test.equal(clip2, clip);

    test.done();
  }

};