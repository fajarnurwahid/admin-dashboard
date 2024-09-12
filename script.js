"use strict";

// start: Sidebar
(function () {
    let cleanup;
    document
        .querySelectorAll(".sidebar-menu-item, .sidebar-submenu-item")
        .forEach(function (item) {
            const submenu = item.querySelector(".sidebar-submenu");
            if (submenu) {
                const link = item.querySelector(
                    ".sidebar-menu-item-link, .sidebar-submenu-item-link"
                );
                if (link) {
                    link.addEventListener("click", function (e) {
                        e.preventDefault();
                        let siblings = Array.from(item.parentElement.children);
                        if (item.classList.contains("sidebar-menu-item")) {
                            siblings =
                                document.querySelectorAll(".sidebar-menu-item");
                        }
                        siblings.forEach(function (el) {
                            el.classList.toggle(
                                "active",
                                el === item &&
                                    !item.classList.contains("active")
                            );
                        });
                        if (item.classList.contains("sidebar-menu-item")) {
                            document.body.classList.remove("sidebar-collapsed");
                        }
                    });
                    if (item.classList.contains("sidebar-menu-item")) {
                        item.addEventListener("mouseenter", function () {
                            cleanup && cleanup();
                            cleanup = window.FloatingUIDOM.autoUpdate(
                                item,
                                submenu,
                                function () {
                                    updateFloatingSidebarSubmenu(item, submenu);
                                }
                            );
                        });
                    }
                }
            }
        });
    document
        .querySelectorAll('[data-toggle="sidebar"]')
        .forEach(function (item) {
            item.addEventListener("click", function (e) {
                e.preventDefault();
                document.body.classList.toggle("sidebar-collapsed");
                document.body.classList.toggle("sidebar-mobile-shown");
                document
                    .querySelectorAll(
                        ".sidebar-menu-item, .sidebar-submenu-item"
                    )
                    .forEach(function (el) {
                        el.classList.remove("active");
                    });
            });
        });
    document
        .querySelectorAll('[data-dismiss="sidebar"]')
        .forEach(function (item) {
            item.addEventListener("click", function (e) {
                e.preventDefault();
                document.body.classList.remove("sidebar-collapsed");
                document.body.classList.remove("sidebar-mobile-shown");
                document
                    .querySelectorAll(
                        ".sidebar-menu-item, .sidebar-submenu-item"
                    )
                    .forEach(function (el) {
                        el.classList.remove("active");
                    });
            });
        });

    function updateFloatingSidebarSubmenu(item, submenu) {
        window.FloatingUIDOM.computePosition(item, submenu, {
            placement: "right-start",
            middleware: [
                window.FloatingUIDOM.shift({
                    padding: 16,
                }),
            ],
        }).then(function ({ x, y }) {
            Object.assign(submenu.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }
})();
// end: Sidebar

// start: Language
(function () {
    document
        .querySelectorAll('[data-dropdown="language"]')
        .forEach(function (item) {
            item.addEventListener("dropdown:change", function (e) {
                const detail = e.detail;
                const image = detail.toggle.querySelector(
                    ".topbar-language-image"
                );
                if (image) {
                    image.src = detail.data.languageImage;
                }
                detail.dropdown.classList.remove("active");
            });
        });
})();
// end: Language

// start: Topbar Search
(function () {
    let cleanup;
    const input = document.getElementById("topbar-search-input");
    const autocomplete = document.getElementById("topbar-search-autocomplete");
    const clear = document.getElementById("topbar-search-clear");
    if (input && autocomplete && clear) {
        input.addEventListener("input", function () {
            autocomplete.classList.toggle("active", input.value);
            clear.classList.toggle("active", input.value);
            cleanup && cleanup();
            cleanup = window.FloatingUIDOM.autoUpdate(
                input,
                autocomplete,
                function () {
                    updateAutocomplete(input, autocomplete);
                }
            );
        });
        clear.addEventListener("click", function (e) {
            e.preventDefault();
            input.value = "";
            input.dispatchEvent(new Event("input"));
            input.focus();
        });
    }
    document.addEventListener("click", function (e) {
        const form = e.target.closest(".topbar-search-form");
        if (!form && autocomplete) {
            autocomplete.classList.remove("active");
        }
    });

    function updateAutocomplete(item, submenu) {
        window.FloatingUIDOM.computePosition(item, submenu, {
            placement: "bottom-start",
            middleware: [
                window.FloatingUIDOM.shift({
                    padding: 16,
                }),
                window.FloatingUIDOM.offset(8),
            ],
        }).then(function ({ x, y }) {
            Object.assign(submenu.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }
})();
// end: Topbar Search

// start: Dropdown
(function () {
    let cleanup;
    document.addEventListener("click", function (e) {
        const dropdownToggle = e.target.closest('[data-toggle="dropdown"]');
        const dropdown = e.target.closest(".dropdown");
        if (dropdown && dropdownToggle) {
            const dropdownMenu = dropdown.querySelector(".dropdown-menu");
            if (dropdownMenu) {
                e.preventDefault();
                document.querySelectorAll(".dropdown").forEach(function (el) {
                    el.classList.toggle(
                        "active",
                        el === dropdown &&
                            !dropdown.classList.contains("active")
                    );
                });
                cleanup && cleanup();
                cleanup = window.FloatingUIDOM.autoUpdate(
                    dropdownToggle,
                    dropdownMenu,
                    function () {
                        updateDropdown(dropdownToggle, dropdownMenu);
                    }
                );
            }
        } else if (e.target.closest(".dropdown")) {
            const item = e.target.closest(".dropdown-menu-item");
            const dropdown = e.target.closest(".dropdown");
            if (dropdown && item) {
                const toggle = dropdown.querySelector(
                    '[data-toggle="dropdown"]'
                );
                if (toggle) {
                    e.preventDefault();
                    const event = new CustomEvent("dropdown:change", {
                        detail: {
                            dropdown,
                            element: item,
                            toggle,
                            data: item.dataset,
                        },
                    });
                    dropdown.dispatchEvent(event);
                }
            }
        } else {
            document.querySelectorAll(".dropdown").forEach(function (el) {
                el.classList.remove("active");
            });
        }
    });

    function updateDropdown(item, submenu) {
        window.FloatingUIDOM.computePosition(item, submenu, {
            placement: "bottom-end",
            middleware: [
                window.FloatingUIDOM.shift({
                    padding: 16,
                }),
                window.FloatingUIDOM.offset(8),
            ],
        }).then(function ({ x, y }) {
            Object.assign(submenu.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }
})();
// end: Dropdown
