document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("project-search");
    const filterPills = document.querySelectorAll(".filter-pill");
    const projects = document.querySelectorAll(".project");
    const layoutButtons = document.querySelectorAll(".layout");
    // Add the stats toggle button
    const statsToggle = document.querySelector(".project-stats-toggle .pill");
    const statsElements = document.querySelectorAll(".stats");
    const resumeButton = document.getElementById("resume-button");
    const resumeContainer = document.getElementById("resume-container");
    const resumeFrame = document.getElementById("resume-frame");



   

    // Add event listener for the Stats for Nerds toggle
    if (resumeButton && resumeContainer && resumeFrame){} {
        resumeButton.addEventListener("click", () => {
            // Toggle visibility
            if (resumeContainer.style.display === "none") {
                resumeContainer.style.display = "block";
                resumeFrame.src = "resume.pdf"; // Make sure this file is in the correct folder
                resumeButton.textContent = "Hide Résumé";
            } else {
                resumeContainer.style.display = "none";
                resumeFrame.src = "resume.pdf";
                resumeButton.textContent = "View Résumé";
            }
        });
    }

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        filterProjects(query);

        // Remove 'filter-pill-active' class from all pills when typing in search
        filterPills.forEach((p) => p.classList.remove("filter-pill-active"));
    });

    filterPills.forEach((pill) => {
        pill.addEventListener("click", () => {
            if (pill.classList.contains("filter-pill-active")) {
                // If the pill is already active, remove the active class and show all projects
                pill.classList.remove("filter-pill-active");
                filterProjects("");
            } else {
                // Clear text in the input
                searchInput.value = "";
                // Remove 'filter-pill-active' class from all pills
                filterPills.forEach((p) =>
                    p.classList.remove("filter-pill-active")
                );

                // Add 'filter-pill-active' class to the clicked pill
                pill.classList.add("filter-pill-active");

                const filter = pill.getAttribute("data-filter");
                filterProjects(filter);
            }
        });
    });

    // Set initial layout based on screen size
    function setInitialLayout() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            // Set to full width layout on mobile
            layoutButtons[0].classList.add("layout-active");
            layoutButtons[1].classList.remove("layout-active");
            layoutButtons[2].classList.remove("layout-active");
            setProjectWidth("95%");
        }
    }

    // Run on page load
    setInitialLayout();

    // Update layout on window resize
    window.addEventListener("resize", setInitialLayout);

    layoutButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            // Remove 'layout-active' class from all buttons
            layoutButtons.forEach((btn) =>
                btn.classList.remove("layout-active")
            );

            // Add 'layout-active' class to the clicked button
            button.classList.add("layout-active");

            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                // Always use full width on mobile
                setProjectWidth("95%");
            } else {
                // On desktop, respect the button clicked
                switch (index) {
                    case 0:
                        setProjectWidth("90%");
                        break;
                    case 1:
                        setProjectWidth("40%");
                        break;
                    case 2:
                        setProjectWidth("25%");
                        break;
                }
            }
        });
    });

    function filterProjects(query) {
        projects.forEach((project) => {
            const tags = project.getAttribute("data-tags");
            if (tags.includes(query)) {
                project.style.display = "block";
            } else {
                project.style.display = "none";
            }
        });
    }

    function setProjectWidth(width) {
        projects.forEach((project) => {
            project.style.width = width;
        });
    }
});