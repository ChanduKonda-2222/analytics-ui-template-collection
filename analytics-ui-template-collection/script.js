// Analytics UI Template Collection
// Main page interactions

document.addEventListener("DOMContentLoaded", () => {
    const exploreBtn = document.getElementById("exploreBtn");
    const topBtn = document.getElementById("topBtn");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const templateCards = document.querySelectorAll(".template-card");
    const memberButtons = document.querySelectorAll(".view-member");

    // Smooth scroll to the template collection
    exploreBtn.addEventListener("click", () => {
        document.getElementById("templates").scrollIntoView({
            behavior: "smooth"
        });
    });

    // Member cards scroll to the matching template filter
    memberButtons.forEach(button => {
        button.addEventListener("click", () => {
            const target = button.dataset.target;
            const memberNumber = target.match(/member-(\d+)/)?.[1];

            if (memberNumber) {
                const filter = document.querySelector(
                    `.filter-btn[data-filter="member-${memberNumber}"]`
                );

                document.getElementById("templates").scrollIntoView({
                    behavior: "smooth"
                });

                setTimeout(() => {
                    filter?.click();
                }, 500);
            }
        });
    });

    // Template filtering
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.dataset.filter;

            templateCards.forEach(card => {
                if (filter === "all" || card.classList.contains(filter)) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });

    // Back-to-top button
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Reveal cards as they enter the viewport
    const revealElements = document.querySelectorAll(
        ".member-card, .template-card, .workflow-step"
    );

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = "fadeUp .55s ease both";
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08 }
    );

    revealElements.forEach(element => observer.observe(element));
});
