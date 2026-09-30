/* =========================================================
   ANTENYI JOSEPH OCHOHEPO
   PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. CURRENT YEAR
       ===================================================== */

    const yearElement =
        document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       2. MOBILE NAVIGATION
       ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navigation =
        document.querySelector(".nav-links");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navigation.classList.toggle("open");

            menuToggle.classList.toggle(
                "open",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });


        /* Close menu after selecting a section */

        const navigationLinks =
            navigation.querySelectorAll("a");

        navigationLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navigation.classList.remove("open");

                menuToggle.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", (event) => {

            const clickedInsideNavigation =
                navigation.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);

            if (
                !clickedInsideNavigation &&
                !clickedMenuButton
            ) {
                navigation.classList.remove("open");

                menuToggle.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }
        });

    }


    /* =====================================================
       3. SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section, .project-card, .skill-card, .highlight, .approach-card"
        );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =====================================================
       4. ACTIVE NAVIGATION
       ===================================================== */

    const navigationLinks =
        document.querySelectorAll(
            ".nav-links a[href^='#']"
        );

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentSection =
                        entry.target.id;

                    navigationLinks.forEach((link) => {

                        link.classList.remove("active");

                        const linkTarget =
                            link.getAttribute("href");

                        if (
                            linkTarget ===
                            `#${currentSection}`
                        ) {
                            link.classList.add("active");
                        }

                    });

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });


    /* =====================================================
       5. SMOOTH NAVIGATION
       ===================================================== */

    navigationLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});