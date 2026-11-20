(function () {
  var MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  var ABR = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  var ROMANOS = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];

  /* Para poner una foto fija en un capítulo, escribí su dirección en "foto". */
  var CAPITULOS = [
    { receta: "Tortas de Navidad", foto: "", resumen: "Tita nace sobre la mesa de la cocina, entre lágrimas y olor a cebolla, y crece junto a Nacha, la cocinera. A los quince años se enamora de Pedro. Mamá Elena le recuerda la tradición: la hija menor no se casa y cuida de su madre hasta que muere. Pedro acepta casarse con Rosaura para estar cerca de Tita.", paginanovela:"capitulo_01.html"},
    { receta: "Pastel Chabela", foto: "", resumen: "Tita prepara el pastel para la boda de Pedro y Rosaura y llora sobre la masa. Al probarlo, los invitados sienten una nostalgia tan fuerte que la fiesta termina en un vómito colectivo. Esa noche muere Nacha, con la foto de un antiguo novio entre las manos.", paginanovela:"capitulo_02.html"},
    { receta: "Codornices en pétalos de rosas", foto: "", resumen: "Pedro le regala rosas a Tita y ella las convierte en una cena que enciende el deseo de Gertrudis. Gertrudis huye del rancho a caballo con Juan, un capitán revolucionario, y Mamá Elena prohíbe nombrarla.", paginanovela:"capitulo_03.html"},
    { receta: "Mole de guajolote con almendra y ajonjolí", foto: "", resumen: "Tita cocina el mole para el bautizo de Roberto, el hijo de Pedro y Rosaura. Mientras muele las almendras, una mirada de Pedro cambia la relación entre los dos. Tita atiende sola el parto y, más adelante, logra alimentar al bebé con su propia leche.", paginanovela:"capitulo_04.html"},
    { receta: "Chorizo norteño", foto: "", resumen: "Mamá Elena sospecha de la cercanía entre Tita y Pedro y manda a Rosaura, Pedro y Roberto a San Antonio. El niño muere lejos del rancho. Tita pierde la razón y se encierra en el palomar, hasta que el doctor John Brown se la lleva a su casa.", paginanovela:"capitulo_05.html"},
    { receta: "Receta para hacer cerillos", foto: "", resumen: "En casa de John, Tita se recupera poco a poco. John le cuenta la teoría de su abuela: cada persona lleva dentro una caja de cerillos que necesita un fuego para encenderse. Entre los dos empieza a nacer un cariño nuevo.", paginanovela:"capitulo_06.html"},
    { receta: "Caldo de colita de res", foto: "", resumen: "Tita todavía no habla. El sabor del caldo de colita de res le devuelve los recuerdos de la cocina del rancho y la ayuda a salir del silencio. Poco después, un ataque de bandidos deja paralizada a Mamá Elena y Tita vuelve para cuidarla.", paginanovela:"capitulo_07.html"},
    { receta: "Champandongo", foto: "", resumen: "Mamá Elena desconfía de Tita y cree que quiere envenenarla. Empieza a tomar ipecacuana para provocarse el vómito y su salud se deteriora hasta que muere.", paginanovela:"capitulo_08.html"},
    { receta: "Chocolate y rosca de reyes", foto: "", resumen: "Con Mamá Elena muerta, Tita acepta la propuesta de matrimonio de John. Pedro, Rosaura y su hija Esperanza vuelven a México y Tita y Pedro por fin se entregan al amor que esperaron tanto tiempo.", paginanovela:"capitulo_09.html"},
    { receta: "Torrejas de nata", foto: "", resumen: "Tita teme estar embarazada. El fantasma de Mamá Elena la acosa y le dice que ella y su hijo están malditos. Cuando comprueba que no espera un bebé, Tita echa a su madre de su vida para siempre.", paginanovela:"capitulo_10.html"},
    { receta: "Frijoles gordos con chile a la tezcucana", foto: "", resumen: "El fantasma de Mamá Elena se venga prendiendo fuego a Pedro, que sobrevive muy quemado. Tita le dice a John que no puede casarse con él, porque su corazón sigue con Pedro.", paginanovela:"capitulo_11.html"},
    { receta: "Chiles en nogada", foto: "", resumen: "Años después, Alex, el hijo de John, y Esperanza, la hija de Pedro, se casan. Durante la fiesta Pedro le propone matrimonio a Tita. Pedro muere esa noche y Tita se come una caja de cerillos. El fuego arrasa el rancho y solo se salva su libro de recetas, que hereda la narradora, hija de Esperanza.", paginanovela:"capitulo_12.html"}
  ];

  var GALERIA = [
    { cap: "Elegimos los escenarios", foto: "" },
    { cap: "Preparamos los personajes", foto: "" },
    { cap: "Cocinamos las recetas", foto: "" },
    { cap: "Sesión de fotos", foto: "" },
    { cap: "Armamos las viñetas", foto: "" },
    { cap: "El resultado final", foto: "" }
  ];

  /* Espacios de foto */
  var CAMERA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-2.5h6L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';
  function showImg(slot, src, alt) {
    var old = slot.querySelector("img"); if (old) old.remove();
    var im = document.createElement("img");
    im.src = src; im.alt = alt || "";
    slot.appendChild(im);
    var ph = slot.querySelector(".ph"); if (ph) ph.hidden = true;
  }
  function buildSlot(el, id, label, foto) {
    el.innerHTML = '<div class="ph">' + CAMERA + '<b>Agregar foto</b><span>' + label + '</span></div>' +
      '<input type="file" accept="image/*" id="' + id + '" aria-label="Agregar foto: ' + label + '">';
    var input = el.querySelector("input");
    el.addEventListener("click", function (e) { if (e.target !== input) input.click(); });
    input.addEventListener("change", function () {
      var f = input.files && input.files[0];
      if (!f) return;
      var r = new FileReader();
      r.onload = function () { showImg(el, r.result, label); };
      r.readAsDataURL(f);
    });
    if (foto) showImg(el, foto, label);
  }
  document.querySelectorAll("[data-slot]").forEach(function (el) {
    buildSlot(el, "slot-" + el.dataset.slot, el.dataset.label, "");
  });

  /* Carrusel */
  var track = document.getElementById("track");
  var months = document.getElementById("months");
  var count = document.getElementById("car-count");
  var slides = [], chips = [], cur = 0;

  CAPITULOS.forEach(function (c, i) {
    var a = document.createElement("article");
    a.className = "slide";
    a.setAttribute("role", "group");
    a.setAttribute("aria-roledescription", "capítulo");
    a.setAttribute("aria-label", "Capítulo " + (i + 1) + " de 12");
    a.innerHTML =
      '<div class="slide-text">' +
        '<p class="mes">Capítulo ' + ROMANOS[i] + ' · ' + MESES[i] + '</p>' +
        '<h3>' + c.receta + '</h3>' +
        '<span class="receta-tag">Receta que abre el mes</span>' +
        '<p class="resumen">' + c.resumen + '</p>' +
        (c.paginanovela ? '<a class="btn-cap" href="' + c.paginanovela + '">Leer capítulo</a>' : '') +
      '</div>' +
      '<div class="slot"></div>';;
    track.appendChild(a);
    buildSlot(a.querySelector(".slot"), "foto-cap-" + (i + 1), "Viñeta de " + MESES[i], c.foto);
    slides.push(a);

    var li = document.createElement("li");
    var btn = document.createElement("button");
    btn.type = "button"; btn.textContent = ABR[i];
    btn.setAttribute("aria-label", "Ir a " + MESES[i] + ": " + c.receta);
    btn.addEventListener("click", function () { go(i); });
    li.appendChild(btn); months.appendChild(li); chips.push(btn);
  });

  function go(n) {
    cur = (n + slides.length) % slides.length;
    track.style.transform = "translateX(" + (-cur * 100) + "%)";
    slides.forEach(function (s, i) {
      if (i === cur) s.removeAttribute("inert"); else s.setAttribute("inert", "");
      s.setAttribute("aria-hidden", i === cur ? "false" : "true");
    });
    chips.forEach(function (c, i) { if (i === cur) c.setAttribute("aria-current", "true"); else c.removeAttribute("aria-current"); });
    count.textContent = (cur + 1) + " / " + slides.length;
    var active = chips[cur];
    if (active && months.scrollWidth > months.clientWidth) {
      months.scrollLeft = active.offsetLeft - months.clientWidth / 2 + active.offsetWidth / 2;
    }
  }
  document.getElementById("prev").addEventListener("click", function () { go(cur - 1); });
  document.getElementById("next").addEventListener("click", function () { go(cur + 1); });
  document.getElementById("car").addEventListener("keydown", function (e) {
    if (e.target.closest("input")) return;
    if (e.key === "ArrowLeft") { go(cur - 1); }
    if (e.key === "ArrowRight") { go(cur + 1); }
  });
  var vp = document.getElementById("viewport"), x0 = null;
  vp.addEventListener("pointerdown", function (e) { x0 = e.clientX; });
  vp.addEventListener("pointerup", function (e) {
    if (x0 === null) return;
    var dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 60) go(dx < 0 ? cur + 1 : cur - 1);
  });
  vp.addEventListener("pointercancel", function () { x0 = null; });
  go(0);

  /* Galería */
  var gal = document.getElementById("galeria");
  GALERIA.forEach(function (g, i) {
    var d = document.createElement("figure");
    d.className = "item";
    d.innerHTML = '<div class="slot"></div><p class="edit" contenteditable="true" spellcheck="true" id="gal-cap-' + (i + 1) + '">' + g.cap + '</p>';
    gal.appendChild(d);
    buildSlot(d.querySelector(".slot"), "foto-gal-" + (i + 1), g.cap, g.foto);
  });

  /* Sección activa en la barra */
  var links = {};
  document.querySelectorAll(".links a").forEach(function (a) { links[a.dataset.sec] = a; });
  function mark(id) {
    Object.keys(links).forEach(function (k) {
      if (k === id) links[k].setAttribute("aria-current", "true"); else links[k].removeAttribute("aria-current");
    });
  }
  mark("inicio");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) mark(en.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["inicio", "datos", "idea", "fotos"].forEach(function (id) { io.observe(document.getElementById(id)); });
  }
})();
