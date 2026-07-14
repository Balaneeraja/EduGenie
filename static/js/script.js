// ==============================
// EduGenie AI Module
// ==============================

let currentQuiz = [];

// ==============================
// Loader
// ==============================

function showLoading(){

    const loader=document.getElementById("loading");

    if(loader){

        loader.classList.add("show");

    }

}

function hideLoading(){

    const loader=document.getElementById("loading");

    if(loader){

        loader.classList.remove("show");

    }

}

// ==============================
// Result
// ==============================

function showResult(html) {

    const result = document.getElementById("result");

    if (!result) return;

    result.classList.remove("hidden");
    result.innerHTML = html;
}

// ==============================
// Format AI Response
// ==============================

function formatAnswer(text) {

    let html = text;

    html = html.replace(/^### (.*)$/gim, "<h3>$1</h3>");
    html = html.replace(/^## (.*)$/gim, "<h2>$1</h2>");
    html = html.replace(/^# (.*)$/gim, "<h1>$1</h1>");

    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    html = html.replace(/^• (.*)$/gim, "<li>$1</li>");
    html = html.replace(/^\* (.*)$/gim, "<li>$1</li>");

    html = html.replace(/\n/g, "<br>");

    return html;

}

// ==============================
// Ask AI
// ==============================

async function askAI() {

    const question = document.getElementById("question").value.trim();

    if (!question) {
        alert("Please enter a question.");
        return;
    }

    showLoading();

    try {

        const response = await fetch(
            "/ask?question=" + encodeURIComponent(question)
        );

        const data = await response.json();

        showResult(formatAnswer(data.answer));

    }

    catch (err) {

        showResult("<h3>Error</h3><p>" + err.message + "</p>");

    }

    finally {

        hideLoading();

    }

}

// ==============================
// Explain
// ==============================

async function explainTopic() {

    const topic = document.getElementById("topic").value.trim();

    if (!topic) {
        alert("Enter a topic.");
        return;
    }

    showLoading();

    try {

        const response = await fetch(
            "/explain?topic=" + encodeURIComponent(topic)
        );

        const data = await response.json();

        showResult(formatAnswer(data.answer));

    }

    catch (err) {

        showResult("<h3>Error</h3><p>" + err.message + "</p>");

    }

    finally {

        hideLoading();

    }

}

// ==============================
// Summary
// ==============================

async function summarizeNotes() {

    const notes = document.getElementById("notes").value.trim();

    if (!notes) {
        alert("Paste your notes.");
        return;
    }

    showLoading();

    try {

        const response = await fetch("/summarize", {

            method: "POST",

            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },

            body: new URLSearchParams({
                text: notes
            })

        });

        const data = await response.json();

        showResult(formatAnswer(data.answer));

    }

    catch (err) {

        showResult("<h3>Error</h3><p>" + err.message + "</p>");

    }

    finally {

        hideLoading();

    }

}

// ==============================
// Learning Roadmap
// ==============================

async function generateRoadmap() {

    const topic = document.getElementById("topic").value.trim();

    if (!topic) {
        alert("Enter a topic.");
        return;
    }

    showLoading();

    try {

        const response = await fetch(
            "/learn?topic=" + encodeURIComponent(topic)
        );

        const data = await response.json();

        showResult(formatAnswer(data.answer));

    }

    catch (err) {

        showResult("<h3>Error</h3><p>" + err.message + "</p>");

    }

    finally {

        hideLoading();

    }

}

// ==============================
// Quiz Generator
// ==============================

async function generateQuiz() {

    const topic = document.getElementById("topic").value.trim();

    if (!topic) {

        alert("Enter a topic.");

        return;

    }

    showLoading();

    try {

        const response = await fetch(
            "/generate-quiz?topic=" + encodeURIComponent(topic)
        );

        const quiz = await response.json();

        const result = document.getElementById("quizResult");

        result.innerHTML = "";

        if (quiz.error) {

            result.innerHTML = `
            <div class="result-box">
                ${quiz.raw}
            </div>
            `;

            return;

        }

        currentQuiz = quiz;

        quiz.forEach((q, index) => {

            let html = `
            <div class="question-card">

                <h3>Question ${index + 1}</h3>

                <p>${q.question}</p>
            `;

            q.options.forEach(option => {

                html += `
                <label class="option">

                    <input
                        type="radio"
                        name="q${index}"
                        value="${option}"
                    >

                    <span>${option}</span>

                </label>
                `;

            });

            html += "</div>";

            result.innerHTML += html;

        });

        result.innerHTML += `

        <button onclick="submitQuiz()">

            ✅ Submit Quiz

        </button>

        <div id="scoreBox" class="result-box hidden"></div>

        `;

    }

    catch (err) {

        document.getElementById("quizResult").innerHTML = `
        <div class="result-box">

            ${err.message}

        </div>
        `;

    }

    finally {

        hideLoading();

    }

}

// ==============================
// Submit Quiz
// ==============================

function submitQuiz() {

    let score = 0;

    currentQuiz.forEach((q, index) => {

        const options = document.getElementsByName("q" + index);

        let answer = "";

        options.forEach(option => {

            if (option.checked) {

                answer = option.value;

            }

        });

        if (answer === q.answer) {

            score++;

        }

    });

    const scoreBox = document.getElementById("scoreBox");

    scoreBox.classList.remove("hidden");

    scoreBox.innerHTML = `

        <h2>🎉 Quiz Completed!</h2>

        <h3>Your Score: ${score} / ${currentQuiz.length}</h3>

    `;

}