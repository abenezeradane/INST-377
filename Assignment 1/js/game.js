window.onload = () => {
    const form = document.getElementById("rps-form");
    const userChoiceSelect = document.getElementById("user-choice");
    const userChoiceBox = document.getElementById("user-choice-box");
    const computerChoiceBox = document.getElementById("computer-choice-box");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const userChoice = userChoiceSelect.value;

        if (!userChoice) {
            alert("Please select an option!");
            return;
        }

        const choices = ["Rock", "Paper", "Scissors", "Spock"];
        const computerChoice =
            choices[Math.floor(Math.random() * choices.length)];

        userChoiceBox.textContent = `You Chose: ${userChoice}`;
        computerChoiceBox.textContent = `Computer Chose: ${computerChoice}`;

        let resultMessage = "";
        let backgroundColor = "";

        if (computerChoice === "Spock") {
            resultMessage = "You Lose! Computer chose Spock.";
            backgroundColor = "red";
        } else if (
            (userChoice === "Rock" && computerChoice === "Scissors") ||
            (userChoice === "Paper" && computerChoice === "Rock") ||
            (userChoice === "Scissors" && computerChoice === "Paper")
        ) {
            resultMessage = "You Win!";
            backgroundColor = "green";
        } else if (userChoice === computerChoice) {
            resultMessage = "It's a Tie!";
            backgroundColor = "blue";
        } else {
            resultMessage = "You Lose!";
            backgroundColor = "red";
        }

        alert(resultMessage);
        document.body.style.backgroundColor = backgroundColor;
    });
};
