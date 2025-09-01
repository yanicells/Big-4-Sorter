// Utility function to load HTML partials
async function loadPartial(elementId, partialPath) {
    try {
        const response = await fetch(partialPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading partial ${partialPath}:`, error);
    }
}

let currentQuestionIndex = 0;
let answers = ["a"];
let choice = "c";

const questions = [
  {
    question: "When faced with a new challenge, what's your initial reaction?",
    choiceA: "I dive in headfirst and figure things out along the way.",
    choiceB: "I consider the emotional impact on myself and others before proceeding.",
    choiceC: "I analyze the situation carefully and plan my approach.",
    choiceD: "I trust my instincts and adjust as I go.",
  },
  {
    question: "What's your ideal way to spend a Friday night?",
    choiceA: "Hitting up a big party or playing a high-energy game with friends.",
    choiceB: "Staying in, maybe journaling or doing something relaxing.",
    choiceC: "Gathering with a few close friends for a cozy hangout.",
    choiceD: "Exploring a new concept or diving into a mystery documentary solo.",
  },
  {
    question: "Which of these best describes your work style?",
    choiceA: "I work best under pressure and thrive on quick decisions.",
    choiceB: "I'm methodical and prefer to take my time to get things just right.",
    choiceC: "I like a cooperative, harmonious environment.",
    choiceD: "I need space to think deeply and work on complex problems.",
  },
  {
    question: "During finals week, what's your coping strategy?",
    choiceA: "I thrive under pressure and push through intensely.",
    choiceB: "I stay calm and take things one step at a time.",
    choiceC: "I rely on my friends to get through it together.",
    choiceD: "I go deep into study mode, shutting out distractions.",
  },
  {
    question: "How do you prefer to handle stress?",
    choiceA: "Tackle it head-on with full energy.",
    choiceB: "Seek quiet, meditative activities or time alone to reflect.",
    choiceC: "Talk it out with someone who understands me.",
    choiceD: "Focus on a solution and work through it step-by-step.",
  },
  {
    question: "What kind of environment are you most comfortable in?",
    choiceA: "Fast-paced and ever-changing, I love excitement.",
    choiceB: "Calm, grounded, and connected to nature.",
    choiceC: "Structured but with room for creativity and imagination.",
    choiceD: "Somewhere I can explore new ideas and concepts freely.",
  },
  {
    question: "How do you usually approach group projects?",
    choiceA: "I take charge and love the challenge.",
    choiceB: "I prefer to listen and help others succeed.",
    choiceC: "I enjoy bringing people together and making sure everyone's included.",
    choiceD: "I often do my part in my own way, analyzing and perfecting details.",
  },
  {
    question: "What's most important to you in friendships?",
    choiceA: "Fun and spontaneity—we make every moment memorable.",
    choiceB: "Emotional connection and deep understanding.",
    choiceC: "Mutual growth, encouragement, and shared interests.",
    choiceD: "Reliability, loyalty, and being there for each other.",
  },
  {
    question: "When learning something new, how do you usually get started?",
    choiceA: "By jumping in and figuring it out as I go.",
    choiceB: "Slowly and thoroughly, making sure I really understand.",
    choiceC: "Collaboratively, learning with others or from others.",
    choiceD: "I like to dive deep, often through reading or research.",
  },
  {
    question: "What excites you most about the future?",
    choiceA: "The thrill of new possibilities and unknown adventures.",
    choiceB: "Building something meaningful and long-lasting.",
    choiceC: "Sharing new experiences with people I care about.",
    choiceD: "Growing personally and making a difference.",
  },
];

let currentQuestion = questions[0];

// Load all partials when DOM is ready
$(document).ready(function() {
    // Load header and footer
    loadPartial('header-placeholder', '/partials/header.html');
    loadPartial('footer-placeholder', '/partials/footer.html');

    // Initialize the first question display
    updateDisplay();

    $("#next").on("click", function(){
        nextQuestion();
    });

    $(".choice").on("click", function(){
        let userChoice = $(this).attr("id");
        choice = userChoice;
        $(this).toggleClass("selected");
    });
});

function nextQuestion(){
    if (currentQuestionIndex < questions.length - 1){  // Check index, not currentQuestion
        currentQuestionIndex += 1;
        currentQuestion = questions[currentQuestionIndex];
        updateDisplay();
        answers.push(choice);
        console.log(answers);
    }
}

function updateDisplay(){
    $("#question").text("Question " + (currentQuestionIndex + 1) + ": " + currentQuestion.question);
    $("#a").text("A: " + currentQuestion.choiceA);
    $("#b").text("B: " + currentQuestion.choiceB);
    $("#c").text("C: " + currentQuestion.choiceC);
    $("#d").text("D: " + currentQuestion.choiceD);
    $(".show").text(choice)
}