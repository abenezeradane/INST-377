var colorIndex = 1;
const bg = ["#ADD8E6", "#D7ADE6", "#E6BBAD", "#BCE6AD"];

function alertMe() {
    const name = document.getElementById("Name").value;
    alert(`Hi ${name}!`);
}

function color() {
    document.body.style.backgroundColor = bg[colorIndex];
    colorIndex = (colorIndex + 1) % bg.length;
}

function validate() {
    const str = document.getElementById("Tester").value;
    const validation = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (validation.test(str)) {
        alert("Please avoid using special characters.");
    }
}

function text() {
    document.getElementById("heading").innerText += " Add Text";
}

window.onload = () => {
    document.getElementById("alertMe").addEventListener("submit", alertMe);
    document.getElementById("color").addEventListener("click", color);
    document.getElementById("validate").addEventListener("submit", validate);
    document.getElementById("text").addEventListener("click", text);
};
