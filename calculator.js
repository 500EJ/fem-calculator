let nums = [];
let nextOperation;
let lastClickWasOperation = false

function waitForClick() {
    document.querySelector(".calc-buttons").addEventListener("click", function(event) {
        buttonClicked(event.target);
    });
}

function buttonClicked(button) {
    if (button.classList.contains("clear")) {
        document.querySelector(".result").innerText = 0;
        nums = [];
        nextOperation = undefined;
        lastClickWasOperation = false;
    } else if (button.classList.contains("number")) {
        if (document.querySelector(".result").innerText === "0" || lastClickWasOperation) document.querySelector(".result").innerText = "";
        document.querySelector(".result").innerText += button.innerText;
        lastClickWasOperation = false;
    } else if (button.classList.contains("operator")) {
        nums.push(parseInt(document.querySelector(".result").innerText));
        document.querySelector(".result").innerText = "0"
        if (nums.length === 2) operate(nextOperation);
        nextOperation = button.innerText;
    } else if (button.classList.contains("backspace")) {
        document.querySelector(".result").innerText = document.querySelector(".result").innerText.slice(0, -1);
        if (document.querySelector(".result").innerText === "") document.querySelector(".result").innerText = "0"
    } else {
        nums.push(parseInt(document.querySelector(".result").innerText));
        operate(nextOperation);
        nums = [];
        nextOperation = undefined;
    }
}

function operate(operator) {
    if (operator === "÷") {
        nums[0] /= nums[1];
    } else if (operator === "×") {
        nums[0] *= nums[1];
    } else if (operator === "−") {
        nums[0] -= nums[1];
    } else if (operator === "+") {
        nums[0] += nums[1];
    }

    nums.pop();
    document.querySelector(".result").innerText = nums[0];
    lastClickWasOperation = true;
}

waitForClick();