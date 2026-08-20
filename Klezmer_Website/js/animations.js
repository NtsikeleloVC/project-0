const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

/*==================================================
ACTIVE NAVIGATION
==================================================*/

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            navLinks.forEach((link) => {

                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + entry.target.id) {

                    link.classList.add("active");

                }

            });

        }

    });

}, {

    threshold: 0.45

});

sections.forEach((section) => observer.observe(section));