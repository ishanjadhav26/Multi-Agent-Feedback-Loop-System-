export const studentPersonas = [
  'Exam Stress Student',
  'Career Confusion Student',
  'Low Confidence Student',
  'Overthinking Student',
  'Burnout Student',
];

export function getRandomPersona(): string {
  return studentPersonas[Math.floor(Math.random() * studentPersonas.length)];
}

export const staticQuestions = [
  {
    question: "I'm so stressed about my exams",
    persona: "Exam Stress Student",
    answer: "Therapist: Let's take a breath — exams feel overwhelming. What part scares you most? Student: Everything! Three papers next week and I haven't started. I just freeze every time. Therapist: That freezing is your mind protecting itself. When did studying last feel manageable? Student: Maybe first year. It's like I've forgotten how. Therapist: You haven't forgotten — you've lost trust in yourself. Start with just 20 focused minutes. Student: 20 minutes sounds doable. I've been putting so much pressure on myself.",
    agents: [
      { agent: "Therapist", message: "Let's take a breath together. Exams can feel like a mountain — tell me, what part is scaring you the most right now?" },
      { agent: "Student", message: "Everything honestly! I have three papers next week and I haven't even started. Every time I open my books I just... freeze." },
      { agent: "Therapist", message: "That freezing response is your mind protecting itself from pressure. When was the last time studying felt manageable or even enjoyable?" },
      { agent: "Student", message: "Maybe first year? I don't know, it's like I've forgotten how to study. The anxiety hits and nothing goes in." },
      { agent: "Therapist", message: "You haven't forgotten — you've lost trust in yourself, and that's something we can rebuild. Let's start with just 20 focused minutes a day and celebrate that." },
      { agent: "Student", message: "20 minutes sounds doable. I think I've been putting so much pressure on myself that even starting felt impossible." }
    ]
  },
  {
    question: "I don't know what career to choose",
    persona: "Career Confusion Student",
    answer: "Therapist: Career confusion is very common. What excites you — even a little? Student: Nothing really. Everyone seems so sure and I'm just blank. Therapist: What activity makes time disappear for you? Student: Writing honestly. But that doesn't pay, right? Therapist: Writing is the foundation of many careers — content, UX, journalism. Your instinct is pointing somewhere real. Student: I never thought of it that way. I think I've been dismissing myself too quickly.",
    agents: [
      { agent: "Therapist", message: "Career confusion is incredibly common right now. I'm curious — is there anything, even small, that genuinely interests or excites you?" },
      { agent: "Student", message: "That's the problem. Nothing does. Everyone else seems so certain and I'm just standing there feeling blank and lost." },
      { agent: "Therapist", message: "What do you do when time just disappears — when you're so absorbed you forget everything else?" },
      { agent: "Student", message: "Writing I guess? Journaling or creative stuff. But that's not a real career. My parents would never approve anyway." },
      { agent: "Therapist", message: "Writing is a foundation for many fulfilling careers — content creation, UX writing, journalism, copywriting. Your instinct led you somewhere very real." },
      { agent: "Student", message: "Honestly... kind of exciting? I think I've been shutting down my own ideas before giving them a chance. I want to explore this more." }
    ]
  },
  {
    question: "I feel like I'm not smart enough",
    persona: "Low Confidence Student",
    answer: "Therapist: What usually triggers that feeling for you? Student: When everyone in class gets it instantly and I take longer. I feel like an idiot. Therapist: Speed of understanding is misleading — deeper understanding takes more time. That is a strength. Student: I still compare myself constantly. Therapist: Comparison is a habit we can change. What's one thing you figured out recently that surprised you? Student: I solved a tough coding problem last week alone. Maybe I'm not as hopeless as I thought.",
    agents: [
      { agent: "Therapist", message: "Feeling not smart enough is one of the most common and painful experiences. Can you tell me — what usually triggers that feeling for you?" },
      { agent: "Student", message: "When I'm in class and everyone gets things instantly. I sit there confused and it feels like I'm the only one who doesn't understand." },
      { agent: "Therapist", message: "What you're seeing is a performance — most people are confused too, they just don't show it. Taking longer to understand often means you understand it more deeply." },
      { agent: "Student", message: "I never thought of it like that. But I still compare myself constantly and always come up short." },
      { agent: "Therapist", message: "Comparison is a habit we can change. What's one thing you achieved recently that genuinely surprised you?" },
      { agent: "Student", message: "I solved a really tough coding assignment last week completely on my own. Maybe I'm not as hopeless as I keep telling myself." }
    ]
  },
  {
    question: "I overthink everything and can't make decisions",
    persona: "Overthinking Student",
    answer: "Therapist: What decision is weighing on you most? Student: Applying for an internship. What if rejected? What if I get in and fail? Weeks of going back and forth. Therapist: You're suffering the negative outcome in your head without the actual experience. What would confident-you do? Student: Just apply. Worst case is a rejection email. Therapist: Exactly. Action breaks the overthinking cycle. Rejection is data, not a verdict. Student: I'm applying tonight. I've wasted too much time in my own head.",
    agents: [
      { agent: "Therapist", message: "Overthinking is often our mind trying to control uncertain outcomes. What decision keeps going around in circles for you?" },
      { agent: "Student", message: "There's an internship I want to apply to but I've been stuck for weeks. What if I fail the interview? What if I get in and I'm not good enough?" },
      { agent: "Therapist", message: "You're mentally living through worst outcomes without any actual experience. What would the most confident version of you do right now?" },
      { agent: "Student", message: "They'd just apply. The worst case is a rejection email. But my brain makes it feel like the end of the world." },
      { agent: "Therapist", message: "Rejection is data, not a verdict on your worth. Action is the only thing that breaks the overthinking loop. What's one step you can take tonight?" },
      { agent: "Student", message: "I'm going to send the application tonight. I've spent too long living in my head instead of actually trying. Thank you." }
    ]
  },
  {
    question: "I feel completely burned out and exhausted",
    persona: "Burnout Student",
    answer: "Therapist: How long have you been feeling this drained? Student: Months. Wake up tired, go to bed exhausted. Nothing feels meaningful anymore. Therapist: When did you last do something purely for joy with no productivity goal? Student: I can't remember. Everything has to be useful. Therapist: Rest is not earned — it is a necessity. Schedule genuine rest like you schedule assignments. Student: I've been running on empty so long I forgot what full feels like. I'll actually rest this weekend.",
    agents: [
      { agent: "Therapist", message: "Burnout is a serious signal from your mind and body. How long have you been feeling this level of exhaustion?" },
      { agent: "Student", message: "Months. I wake up already tired. Nothing feels meaningful — I'm just going through the motions." },
      { agent: "Therapist", message: "Loss of meaning is a core sign of burnout. When was the last time you did something purely for fun — no productivity goal attached?" },
      { agent: "Student", message: "I honestly can't remember. Everything feels like it needs to be useful. Even hobbies feel like pressure now." },
      { agent: "Therapist", message: "Rest is not a reward — it is a biological necessity. Schedule genuine rest and play the same way you schedule assignments. Your brain cannot perform without recovery." },
      { agent: "Student", message: "I think I've been running on empty so long I forgot what feeling okay even feels like. I'm taking this weekend off. No guilt." }
    ]
  }
];
