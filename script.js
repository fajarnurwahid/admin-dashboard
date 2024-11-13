// start: Sidebar
(function () {
    let cleanup;
    const menuToggles = document.querySelectorAll("[data-sidebar-menu-toggle]");
    const submenuToggles = document.querySelectorAll("[data-sidebar-submenu-toggle]");
    menuToggles.forEach(function (item) {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const parent = item.closest("[data-sidebar-menu-item]");
            if (parent) {
                if (parent.classList.contains("active")) {
                    parent.classList.remove("active");
                } else {
                    menuToggles.forEach(function (i) {
                        const parentI = i.closest("[data-sidebar-menu-item]");
                        if (parentI) {
                            parentI.classList.toggle("active", i === item);
                        }
                    });
                }
                document.body.classList.remove("sidebar-collapsed");
            }
        });
    });
    submenuToggles.forEach(function (item) {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const parent = item.closest("[data-sidebar-submenu-item]");
            const submenu = item.closest(".sidebar-submenu");
            if (parent && submenu) {
                if (parent.classList.contains("active")) {
                    parent.classList.remove("active");
                } else {
                    Array.from(submenu.children).forEach(function (i) {
                        i.classList.toggle("active", i === parent);
                    });
                }
            }
        });
    });
    document.querySelectorAll("[data-sidebar-toggle]").forEach(function (item) {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            document.body.classList.toggle("sidebar-collapsed");
        });
    });
    document.querySelectorAll("[data-sidebar-dismiss]").forEach(function (item) {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            document.body.classList.add("sidebar-collapsed");
        });
    });
    document.querySelectorAll("[data-sidebar-menu-item]").forEach(function (item) {
        item.addEventListener("mouseenter", function () {
            const floatingEl = item.querySelector("[data-sidebar-menu-dropdown]");
            if (floatingEl) {
                cleanup = window.FloatingUIDOM.autoUpdate(item, floatingEl, function () {
                    updatePosition(item, floatingEl);
                });
            }
        });
        item.addEventListener("mouseleave", function () {
            cleanup && cleanup();
        });
    });
    if (window.innerWidth < 768) {
        document.body.classList.add("sidebar-collapsed");
    }

    function updatePosition(referenceEl, floatingEl) {
        window.FloatingUIDOM.computePosition(referenceEl, floatingEl, {
            placement: "right-start",
            strategy: "fixed",
            middleware: [
                window.FloatingUIDOM.shift({
                    padding: 16,
                }),
            ],
        }).then(function ({ x, y }) {
            Object.assign(floatingEl.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }
})();
// end: Sidebar

// start: Topbar
(function () {
    document.querySelectorAll('[data-toggle="topbar-search"]').forEach(function (item) {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(".topbar-search-wrapper");
            if (target) {
                target.classList.add("active");
            }
        });
    });
    document.querySelectorAll('[data-dismiss="topbar-search"]').forEach(function (item) {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const parent = item.closest(".topbar-search-wrapper");
            if (parent) {
                parent.classList.remove("active");
            }
        });
    });
})();
// end: Topbar

// start: Dropdown
(function () {
    let cleanup;
    document.querySelectorAll('[data-toggle="dropdown"]').forEach(function (item) {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const dropdown = item.closest(".dropdown");
            if (dropdown) {
                const dropdownMenu = dropdown.querySelector(".dropdown-menu-wrapper");
                if (dropdownMenu) {
                    cleanup && cleanup();
                    if (dropdown.classList.contains("active")) {
                        dropdown.classList.remove("active");
                    } else {
                        cleanup = window.FloatingUIDOM.autoUpdate(item, dropdownMenu, function () {
                            updatePosition(item, dropdownMenu);
                        });
                        document.querySelectorAll(".dropdown").forEach(function (el) {
                            el.classList.remove("active");
                        });
                        dropdown.classList.add("active");
                    }
                }
            }
        });
    });
    document.addEventListener("click", function (e) {
        const dropdown = e.target.closest(".dropdown");
        if (!dropdown) {
            document.querySelectorAll(".dropdown").forEach(function (el) {
                el.classList.remove("active");
            });
            cleanup && cleanup();
        }
    });

    function updatePosition(referenceEl, floatingEl) {
        window.FloatingUIDOM.computePosition(referenceEl, floatingEl, {
            placement: "bottom",
            strategy: "fixed",
            middleware: [
                window.FloatingUIDOM.shift({
                    padding: 16,
                }),
                window.FloatingUIDOM.offset(8),
            ],
        }).then(function ({ x, y }) {
            Object.assign(floatingEl.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }
})();
// end: Dropdown
