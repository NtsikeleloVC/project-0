const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const industryData = {

    financial: {

        number: "01",

        title: "Financial Services",

        description:
            "Secure, resilient and dependable technology environments for organisations where performance, availability and security are critical."

    },

    professional: {

        number: "02",

        title: "Professional Services",

        description:
            "Reliable technology environments that help professional teams collaborate, protect information and maintain productive operations."

    },

    healthcare: {

        number: "03",

        title: "Healthcare",

        description:
            "Secure and dependable technology designed to support availability, connectivity and the protection of critical information."

    },

    education: {

        number: "04",

        title: "Education",

        description:
            "Connected technology environments that support learning, collaboration, administration and secure access to digital resources."

    },

    retail: {

        number: "05",

        title: "Retail & Commerce",

        description:
            "Scalable technology solutions that help organisations maintain reliable operations, connected teams and secure customer experiences."

    },

    business: {

        number: "06",

        title: "Growing Businesses",

        description:
            "Flexible technology foundations that allow growing organisations to scale securely without unnecessary complexity."

    }

};

const industryButtons =
    document.querySelectorAll(".industry-item");

const industryNumber =
    document.getElementById("industryNumber");

const industryTitle =
    document.getElementById("industryTitle");

const industryDescription =
    document.getElementById("industryDescription");


industryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const industry =
            industryData[button.dataset.industry];

        if (!industry) return;


        /* Remove active state */

        industryButtons.forEach(item => {

            item.classList.remove("active");

        });


        /* Activate selected industry */

        button.classList.add("active");


        /* Fade content out */

        const feature =
            document.querySelector(".industry-feature-content");

        feature.classList.add("changing");


        setTimeout(() => {

            industryNumber.textContent =
                industry.number;

            industryTitle.textContent =
                industry.title;

            industryDescription.textContent =
                industry.description;


            feature.classList.remove("changing");

        }, 180);

    });

});