"use strict";

// start: Sidebar
(function () {
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
                        Array.from(item.parentElement.children).forEach(
                            function (el) {
                                el.classList.toggle(
                                    "active",
                                    el === item &&
                                        !item.classList.contains("active")
                                );
                            }
                        );
                        if (link.classList.contains("sidebar-menu-item-link")) {
                            document.body.classList.remove("sidebar-collapsed");
                        }
                    });
                    if (link.classList.contains("sidebar-menu-item-link")) {
                        item.addEventListener("mouseenter", function () {
                            updateFloatingSidebarSubmenu(item, submenu);
                        });
                    }
                }
            }
        });
    document.querySelectorAll("[data-sidebar-toggle]").forEach(function (item) {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            document.body.classList.toggle("sidebar-collapsed");
            document
                .querySelectorAll(".sidebar-menu-item, .sidebar-submenu-item")
                .forEach(function (el) {
                    el.classList.remove("active");
                });
        });
    });

    function updateFloatingSidebarSubmenu(item, submenu) {
        window.FloatingUIDOM.computePosition(item, submenu, {
            placement: "right-start",
            middleware: [window.FloatingUIDOM.shift(16)],
        }).then(({ x, y }) => {
            Object.assign(submenu.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }
})();
// end: Sidebar
