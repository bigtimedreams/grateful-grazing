// public/admin/previews.js
(function () {
    if (!window.CMS) return;

    CMS.registerPreviewStyle("/admin/preview.css");

    const { h, createClass } = window;

    const get = (e, k, d = "") => {
        const v = e.getIn(["data", k]);
        return v == null ? d : v;
    };
    const S = (v) => (v == null ? "" : String(v));

    // ---- Menu preview (title, subtitle, price, items:string[], image?) ----
    const MenuPreview = createClass({
        render() {
            const e = this.props.entry;
            const title = S(get(e, "title"));
            const subtitle = S(get(e, "subtitle"));
            const price = S(get(e, "price"));

            let items = get(e, "items", []);
            // Support both ["a","b"] and [{item:"a"}]
            if (items && items.size && items.get) {
                items =
                    items.size && items.get(0) && items.get(0).get
                        ? items.map((i) => S(i.get("item") || "")).toArray()
                        : items.toArray().map(S);
            }

            const imgField = get(e, "image") || get(e, "about_image");
            const img = imgField ? this.props.getAsset(imgField) : null;

            return h(
                "article",
                { className: "cms-card" },
                img
                    ? h("img", { className: "hero", src: img.toString(), alt: title || "Menu" })
                    : null,
                h(
                    "div",
                    { className: "cms-pad" },
                    h("div", { className: "cms-title" }, title || "Untitled Menu"),
                    subtitle ? h("div", { className: "cms-meta" }, subtitle) : null,
                    price ? h("div", { className: "cms-meta" }, price) : null,
                    items && items.length
                        ? h("ul", null, items.map((t, i) => h("li", { key: i }, S(t))))
                        : null
                )
            );
        },
    });
    CMS.registerPreviewTemplate("menu", MenuPreview);

    // ---- Gallery preview ----
    const GalleryPreview = createClass({
        render() {
            const e = this.props.entry;
            const title = S(get(e, "title"));
            const imgField = get(e, "image");
            const img = imgField ? this.props.getAsset(imgField) : null;

            return h(
                "figure",
                { className: "cms-card" },
                img
                    ? h("img", { className: "hero", src: img.toString(), alt: title || "Gallery" })
                    : null,
                title ? h("figcaption", { className: "cms-pad" }, title) : null
            );
        },
    });
    CMS.registerPreviewTemplate("gallery", GalleryPreview);

    // ---- Testimonials preview ----
    const TestimonialPreview = createClass({
        render() {
            const e = this.props.entry;
            return h(
                "div",
                { className: "cms-card cms-pad" },
                h("div", { className: "cms-title" }, S(get(e, "name")) || "Customer"),
                h("blockquote", { className: "cms-text" }, `“${S(get(e, "quote"))}”`)
            );
        },
    });
    CMS.registerPreviewTemplate("testimonials", TestimonialPreview);

    // ---- FAQ preview ----
    const FAQPreview = createClass({
        render() {
            const e = this.props.entry;
            return h(
                "div",
                { className: "cms-card cms-pad" },
                h("div", { className: "cms-title" }, S(get(e, "question")) || "Question"),
                h("div", { className: "cms-text" }, S(get(e, "answer")))
            );
        },
    });
    CMS.registerPreviewTemplate("faq", FAQPreview);
})();
