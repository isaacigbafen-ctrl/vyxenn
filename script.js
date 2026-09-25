(function () {
  // ---- Theme toggle ----
  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");
  function systemPrefersDark() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }
  function applyTheme(theme) {
    if (theme === "light" || theme === "dark") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
    var isDark = theme === "dark" || (theme !== "light" && systemPrefersDark());
    btn.setAttribute("aria-pressed", String(isDark));
  }
  var saved = null;
  try {
    saved = localStorage.getItem("vyxenn-theme");
  } catch (e) {}
  applyTheme(saved);
  btn.addEventListener("click", function () {
    var current =
      root.getAttribute("data-theme") ||
      (systemPrefersDark() ? "dark" : "light");
    var next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("vyxenn-theme", next);
    } catch (e) {}
  });

  var IMG = {
    p1: "images/p1.jpg",
    p2: "images/p2.jpg",
    p3: "images/p3.jpg",
    p4: "images/p4.jpg",
    p5: "images/p5.jpg",
    p6: "images/p6.jpg",
    p7: "images/p7.jpg",
    p8: "images/p8.jpg",
    p9: "images/p9.jpg",
    p10: "images/p10.jpg",
    p11: "images/p11.jpg",
  };

  // ---- Product data ----
  // TODO: replace with your real WhatsApp Business number (country code + number, no + or spaces)
  var WHATSAPP_NUMBER = "2348000000000";

  var products = [
    { name: "Teal Pleated Halter Dress", price: 13000, img: "p1" },
    { name: "Yellow Bubble-Hem Co-ord", price: 12000, img: "p2" },
    { name: "Polka Dot Wrap Dress", price: 13000, img: "p3" },
    { name: "Striped Tank &amp; Shorts Co-ord", price: 9000, img: "p4" },
    { name: "Pink Striped Bandeau Top", price: 15000, img: "p5" },
    { name: "Burgundy Eyelet Dress", price: 13000, img: "p6" },
    { name: "Black Halter Maxi Dress", price: 20000, img: "p7" },
    { name: "Black Scoop-Neck Mini Dress", price: 10000, img: "p8" },
  ];
  var accessories = [
    { name: "Sheer Blue Thigh-High Stockings", price: 5000, img: "p9" },
    { name: "Neon Pink Thigh-High Stockings", price: 5000, img: "p10" },
    { name: "White Slouch Socks", price: 5000, img: "p11" },
  ];
  function fmt(n) {
    return "₦" + n.toLocaleString("en-NG");
  }
  function waLink(name, price) {
    var plain = name.replace(/&amp;/g, "&");
    var msg =
      "Hi Vyxenn, I'd like to order the " + plain + " (" + fmt(price) + ").";
    return "https://wa.me/2349163792323?text=" + encodeURIComponent(msg);
  }
  function renderGrid(list, elId) {
    var el = document.getElementById(elId);
    el.innerHTML = list
      .map(function (p) {
        return (
          '<article class="prod-card">' +
          '<div class="prod-img"><img src="' +
          IMG[p.img] +
          '" alt="' +
          p.name.replace(/&amp;/g, "&") +
          '" loading="lazy"></div>' +
          '<h3 class="prod-name">' +
          p.name +
          "</h3>" +
          '<p class="prod-price">' +
          fmt(p.price) +
          "</p>" +
          '<a class="btn-whatsapp" href="' +
          waLink(p.name, p.price) +
          '" target="_blank" rel="noopener">Order on WhatsApp</a>' +
          "</article>"
        );
      })
      .join("");
  }
  renderGrid(products, "product-grid");
  renderGrid(accessories, "accessories-grid");

  // ---- Newsletter (empty/success states) ----
  var form = document.getElementById("news-form");
  var msg = document.getElementById("news-msg");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = document.getElementById("news-email").value.trim();
    if (!email) {
      msg.textContent = "Enter your email to join the list.";
      return;
    }
    msg.textContent = "You're in — welcome to Vyxenn.";
    form.reset();
  });
})();
