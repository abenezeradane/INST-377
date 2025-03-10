window.onload = () => {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const date = document.getElementById("date").value;
        const message = document.getElementById("message").value.trim();

        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

        if (specialCharPattern.test(message)) {
            alert("Your message cannot contain special characters!");
            return;
        }

        if (!name || !date || !message) {
            alert("Please fill in all fields!");
            return;
        }

        alert("Form submitted successfully!");
        window.location.href = "success.html";
    });
};
