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
let answers = [0, 0, 0, 0];
const choices = ["a", "b", "c", "d"];
let choice = "";

const questions = [
  {
    question: "Which city vibe matches you best?",
    choiceA: "Laid-back Katipunan with cafés and green spaces.",
    choiceB: "Bustling Taft—fast-paced and full of energy.",
    choiceC: "Diliman's wide, open campus and activist spirit.",
    choiceD: "Historic España—tradition and campus pride everywhere.",
  },
  {
    question: "What color resonates with your energy?",
    choiceA: "Blue—deep, calm, and wise like Ateneo.",
    choiceB: "Green—energetic, bold, and competitive like La Salle.",
    choiceC: "Maroon—passionate, free, and strong like UP.",
    choiceD: "Gold—proud, radiant, and timeless like UST.",
  },
  {
    question: "Which school cheer would hype you up the most?",
    choiceA: "The electric cry of 'One Big Fight!'",
    choiceB: "A loud and proud 'Animo La Salle!'",
    choiceC: "A fiery 'UP Fight!' from the iskos and iskas.",
    choiceD: "The thundering 'Go Uste!' roaring through España.",
  },
  {
    question: "What's your go-to merienda on campus?",
    choiceA: "Chicken empanada or coffee from Katipunan cafés.",
    choiceB: "Street food along Taft—quick bites with barkada.",
    choiceC: "Rodic's tapsilog or isawan in Diliman.",
    choiceD: "Famous UST kwek-kwek or kiosks in España.",
  },
  {
    question: "How do you like to celebrate a big win?",
    choiceA: "Bonfire night with friends and community.",
    choiceB: "Shouting Animo in green pride at Taft.",
    choiceC: "Marching and chanting with iskos in a rally vibe.",
    choiceD: "Traditional celebrations with Tiger pride and Mass.",
  },
  {
    question: "Which type of campus setting feels like home?",
    choiceA: "Tree-lined, cozy, and reflective campus spaces.",
    choiceB: "Urban, modern buildings with high energy.",
    choiceC: "Expansive campus grounds with freedom to roam.",
    choiceD: "Historic, yellow-bricked iconic halls.",
  },
  {
    question: "What vibe do you bring to a group hangout?",
    choiceA: "The reliable leader who keeps spirits high.",
    choiceB: "The sharp challenger who hypes up debates.",
    choiceC: "The activist thinker who sparks big convos.",
    choiceD: "The warm and traditional barkada glue.",
  },
  {
    question: "If you had to pick a mascot, which one vibes with you most?",
    choiceA: "The Blue Eagle—soaring and full of vision.",
    choiceB: "The Green Archer—focused and competitive.",
    choiceC: "The Fighting Maroon—relentless and grounded.",
    choiceD: "The Growling Tiger—fierce and historic.",
  },
  {
    question: "Which kind of campus tradition excites you?",
    choiceA: "Ateneo Bonfire night after a UAAP win.",
    choiceB: "Taft's intense Animo rallies.",
    choiceC: "UP Lantern Parade or SONA protests.",
    choiceD: "UST's Paskuhan Christmas festival.",
  },
  {
    question: "What's your ideal barkada activity?",
    choiceA: "Café hopping around Katipunan for chill study hangouts.",
    choiceB: "Night out along Taft with nonstop fun.",
    choiceC: "Campus tambayan plus spontaneous rallies and gigs.",
    choiceD: "España food trips and campus fairs.",
  },
  {
    question: "How do you usually cheer someone up?",
    choiceA: "Offer meaningful advice over coffee.",
    choiceB: "Crack jokes and hype them up with energy.",
    choiceC: "Encourage them to fight for what they believe in.",
    choiceD: "Bring warmth, food, and tradition to comfort them.",
  },
  {
    question: "Which type of student organization attracts you?",
    choiceA: "Service orgs and student leadership councils.",
    choiceB: "Sports and business competitive orgs.",
    choiceC: "Debate clubs, political orgs, and activist groups.",
    choiceD: "Faith-based and cultural orgs with tradition.",
  },
  {
    question: "What's your favorite weather for campus life?",
    choiceA: "Cool mornings perfect for quiet Katipunan walks.",
    choiceB: "Sunny afternoons perfect for Taft energy.",
    choiceC: "Rainy campus days walking under Diliman's acacia trees.",
    choiceD: "Golden sunsets in España after classes.",
  },
  {
    question: "If you were in UAAP, what role would you play?",
    choiceA: "The steady captain leading One Big Fight.",
    choiceB: "The fierce competitor pushing for victory.",
    choiceC: "The supporter rallying all iskos and iskas.",
    choiceD: "The tradition keeper bringing tiger energy.",
  },
  {
    question: "Which Filipino value speaks to you the most?",
    choiceA: "'Magis'—doing more for the greater good.",
    choiceB: "'Animo!'—energy, competitiveness, and grit.",
    choiceC: "'Maka-masa'—for the people, by the people.",
    choiceD: "'Pakikipagkapwa'—humanity and Catholic tradition.",
  },
];

let currentQuestion = questions[0];

$(document).ready(function () {
  loadPartial("header-placeholder", "/partials/header.html");
  loadPartial("footer-placeholder", "/partials/footer.html");

  updateDisplay();

  $("#next").on("click", function () {
    nextQuestion();
  });

  $(".choice").on("click", function () {
    $(".choice").removeClass("selected");
    $(this).addClass("selected");
    choice = $(this).attr("id");
  });
});

function nextQuestion() {
  if (choice === "") {
    $(".alert").removeClass("hidden");
    updateDisplay();
    return;
  } else {
    $(".alert").addClass("hidden");
  }
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    currentQuestion = questions[currentQuestionIndex];
    answers[choices.indexOf(choice)] += 1;
    choice = "";
    updateDisplay();
  } else {
    answers[choices.indexOf(choice)] += 1;
    choice = "";
    fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers),
      redirect: "follow",
    })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error submitting the form.");
      });
  }
}

function updateDisplay() {
  $("#question").text(
    "Question " + (currentQuestionIndex + 1) + ": " + currentQuestion.question
  );
  $("#a").text(currentQuestion.choiceA);
  $("#b").text(currentQuestion.choiceB);
  $("#c").text(currentQuestion.choiceC);
  $("#d").text(currentQuestion.choiceD);
  $(".choice").removeClass("selected");
  if (currentQuestionIndex == questions.length - 1) {
    $("#next").text("Finish Quiz");
  }
}
