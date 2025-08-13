// public/admin/enhance.js
(function () {
    // Run after the CMS app is up
    const ready = () =>
        document.querySelector('[data-testid="sidebar-collections"]') ||
        document.querySelector('#nc-root');
    function onReady(fn, tries = 0) {
        if (ready()) return fn();
        if (tries > 60) return; // 18s max
        setTimeout(() => onReady(fn, tries + 1), 300);
    }

    const TASKS = [
        { id: "hp", text: "Homepage updated", link: "/admin/#/collections/homepage/entries/homepage" },
        { id: "settings", text: "Business settings updated", link: "/admin/#/collections/settings/entries/settings" },
        { id: "menu", text: "At least one Menu Card created", link: "/admin/#/collections/menu" },
        { id: "gallery", text: "Add at least one Gallery image", link: "/admin/#/collections/gallery" },
        { id: "testimonials", text: "Add at least one Testimonial", link: "/admin/#/collections/testimonials" },
        { id: "faq", text: "Add at least one FAQ", link: "/admin/#/collections/faq" },
        { id: "publish", text: "Publish changes (top bar → Publish)", link: "/admin/#/workflow" },
        { id: "view", text: "View the live site looks good", link: "/" },
    ];

    function loadState() {
        try { return JSON.parse(localStorage.getItem("gg_checklist") || "{}"); }
        catch { return {}; }
    }
    function saveState(s) { localStorage.setItem("gg_checklist", JSON.stringify(s)); }

    function mountBanner() {
        const s = loadState();

        // styles
        const style = document.createElement("style");
        style.textContent = `
      .gg-banner{position:fixed;right:16px;bottom:16px;z-index:9999;background:#fff;border:1px solid #e5e7eb;border-radius:14px;box-shadow:0 10px 30px rgba(16,24,40,.12);width:320px;max-width:92vw;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial}
      .gg-head{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-bottom:1px solid #f0f0f0;font-weight:600}
      .gg-body{max-height:50vh;overflow:auto;padding:8px 12px}
      .gg-task{display:flex;align-items:flex-start;gap:8px;margin:8px 0}
      .gg-task input{margin-top:3px}
      .gg-task a{color:#2563eb;text-decoration:none}
      .gg-actions{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #f0f0f0}
      .gg-btn{flex:1;padding:8px 10px;border-radius:10px;border:1px solid #e5e7eb;background:#f9fafb;cursor:pointer}
      .gg-btn.primary{background:#111827;color:#fff;border-color:#111827}
    `;
        document.head.appendChild(style);

        // container
        const box = document.createElement("div");
        box.className = "gg-banner";
        box.innerHTML = `
      <div class="gg-head">
        <div>Publish checklist</div>
        <button class="gg-btn" style="padding:4px 8px">×</button>
      </div>
      <div class="gg-body"></div>
      <div class="gg-actions">
        <button class="gg-btn" data-clear>Clear checks</button>
        <button class="gg-btn primary" data-workflow>Open Workflow</button>
      </div>
    `;
        document.body.appendChild(box);

        // tasks
        const body = box.querySelector(".gg-body");
        TASKS.forEach(t => {
            const row = document.createElement("label");
            row.className = "gg-task";
            row.innerHTML = `
        <input type="checkbox" data-id="${t.id}" ${s[t.id] ? "checked" : ""}/>
        <div><div>${t.text}</div><div><a href="${t.link}" target="_blank">Open</a></div></div>
      `;
            body.appendChild(row);
        });

        // events
        body.addEventListener("change", (e) => {
            const cb = e.target;
            if (!cb || !cb.dataset) return;
            s[cb.dataset.id] = cb.checked;
            saveState(s);
        });
        box.querySelector("[data-clear]").onclick = () => { saveState({}); box.remove(); mountBanner(); };
        box.querySelector(".gg-head .gg-btn").onclick = () => box.remove();
        box.querySelector("[data-workflow]").onclick = () => window.location.assign("/admin/#/workflow");
    }

    onReady(mountBanner);
})();
