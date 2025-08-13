// public/admin/previews.js
(function () {
    if (!window.CMS) return;

    CMS.registerPreviewStyle("/admin/preview.css");
    const { h, createClass } = window;

    const toStr = (v) => (v == null ? "" : String(v));
    const get = (e, k, d = "") => e.getIn(["data", k]) ?? d;

    // ---- Menu Preview (for collection "menu") ----
    const MenuPreview = createClass({
        render() {
            const e = this.props.entry;
            const title = toStr(get(e, "title"));
            const subtitle = toStr(get(e, "subtitle"));
            const price = toStr(get(e, "price"));
            const imgField = get(e, "image") || get(e, "about_image");
            const img = imgField ? this.props.getAsset(imgField) : null;

            // items can be ["a","b"] or [{item:"a"}] from older entries
            let items = get(e, "items", []);
            if (items && items.size && items.get) {
                items = items.get(0) && items.get(0).get
                    ? items.map((i) => toStr(i.get("item") || "")).toArray()
                    : items.toArray().map(toStr);
            }

            return h("article", { className: "cms-card" },
                img ? h("img", { className: "hero", src: img.toString(), alt: title || "Menu" }) : null,
                h("div", { className: "cms-pad" },
                    h("div", { className: "cms-title" }, title || "Untitled Menu"),
                    subtitle ? h("div", { className: "cms-meta" }, subtitle) : null,
                    price ? h("div", { className: "cms-meta" }, price) : null,
                    items && items.length ? h("ul", null, items.map((t, i) => h("li", { key: i }, t))) : null
                )
            );
        }
    });
    CMS.registerPreviewTemplate("menu", MenuPreview);

    // ---- Gallery Preview ----
    const GalleryPreview = createClass({
        render() {
            const e = this.props.entry;
            const title = toStr(get(e, "title"));
            const imgField = get(e, "image");
            const img = imgField ? this.props.getAsset(imgField) : null;

            return h("figure", { className: "cms-card" },
                img ? h("img", { className: "hero", src: img.toString(), alt: title || "Gallery" }) : null,
                title ? h("figcaption", { className: "cms-pad" }, title) : null
            );
        }
    });
    CMS.registerPreviewTemplate("gallery", GalleryPreview);

    // ---- Testimonials Preview ----
    const TestimonialPreview = createClass({
        render() {
            const e = this.props.entry;
            const name = toStr(get(e, "name"));
            const quote = toStr(get(e, "quote"));
            return h("div", { className: "cms-card cms-pad" },
                h("div", { className: "cms-title" }, name || "Customer"),
                h("blockquote", { className: "cms-text" }, `“${quote}”`)
            );
        }
    });
    CMS.registerPreviewTemplate("testimonials", TestimonialPreview);

    // ---- FAQ Preview ----
    const FAQPreview = createClass({
        render() {
            const e = this.props.entry;
            const q = toStr(get(e, "question"));
            const a = toStr(get(e, "answer"));
            return h("div", { className: "cms-card cms-pad" },
                h("div", { className: "cms-title" }, q || "Question"),
                h("div", { className: "cms-text" }, a)
            );
        }
    });
    CMS.registerPreviewTemplate("faq", FAQPreview);
})();
