(function () {
  var toggle = document.getElementById("lang-toggle");
  var root = document.documentElement;

  function resolve(dict, path) {
    var parts = path.split(".");
    var value = dict;
    for (var i = 0; i < parts.length; i++) {
      if (value == null) return undefined;
      value = value[parts[i]];
    }
    return value;
  }

  function applyLang(lang) {
    var dict = (window.NC_I18N && window.NC_I18N[lang]) || {};
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      var value = resolve(dict, key);
      if (typeof value === "string") {
        nodes[i].textContent = value;
      }
    }

    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    if (toggle) toggle.textContent = lang === "ar" ? "EN" : "AR";
    root.setAttribute("data-current-lang", lang);
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-current-lang") || "en";
      applyLang(current === "en" ? "ar" : "en");
    });
  }

  applyLang("en");
})();
