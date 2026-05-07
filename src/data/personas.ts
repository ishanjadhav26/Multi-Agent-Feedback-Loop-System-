export interface TranscriptMessage {
  agent: 'Therapist' | 'Student';
  message: string;
}

export interface Persona {
  title: string;
  transcript: TranscriptMessage[];
}

export const personas: Record<string, Persona> = {
  "exam-stress": {
    title: "Exam Stress Student",
    transcript: [
      { agent: "Therapist", message: "Welcome. I can see you're carrying a lot of tension today. Would you like to start by telling me what's on your mind?" },
      { agent: "Student", message: "It's the exams. I have three finals next week and I feel like I'm drowning. I haven't even started the main chapters yet." },
      { agent: "Therapist", message: "That feeling of 'drowning' is very common when we face a massive task. What happens when you try to sit down and open your books?" },
      { agent: "Student", message: "I just freeze. I look at the syllabus, my heart starts racing, and I end up scrolling on my phone for hours just to escape the feeling." },
      { agent: "Therapist", message: "Escape is a natural response to overwhelming fear. What's the specific fear that comes up when you look at that syllabus?" },
      { agent: "Student", message: "That I'll fail. And if I fail, I'll lose my scholarship, and my parents will be so disappointed. They've sacrificed so much for me to be here." },
      { agent: "Therapist", message: "So there's a lot of external pressure mixed with your own goals. Let's look at that pressure for a moment. Do you feel like your parents' love is tied to your grades?" },
      { agent: "Student", message: "No... I mean, they've never said that. But I feel like I owe them. I'm the first in my family to go to college." },
      { agent: "Therapist", message: "Being the first is a heavy crown to wear. It sounds like you're studying for your whole family, not just yourself. Does that feel accurate?" },
      { agent: "Student", message: "Yeah, exactly. It's like every time I get a question wrong, I'm letting everyone down." },
      { agent: "Therapist", message: "That's a lot for one person to carry. Let's try to shrink the mountain. What if we focus on just one small topic today, regardless of the exam?" },
      { agent: "Student", message: "But I have so much to do! How can I just focus on one small thing?" },
      { agent: "Therapist", message: "Because focusing on 'everything' is what's causing the freeze. Focusing on 'one small thing' is what leads to progress. Which topic feels the least scary right now?" },
      { agent: "Student", message: "Maybe the intro to organic chemistry. I kind of liked the first lecture." },
      { agent: "Therapist", message: "Great. Let's agree on 15 minutes of just that topic. No thoughts about the exam, no thoughts about the scholarship. Just curiosity. How does that sound?" },
      { agent: "Student", message: "15 minutes... I think I can do that. It feels less like a death sentence." },
      { agent: "Therapist", message: "Good. And when those thoughts of failure creep in, I want you to acknowledge them and then gently bring your focus back to the page." },
      { agent: "Student", message: "I'll try. I just hope I don't get distracted again." },
      { agent: "Therapist", message: "Distraction is just a sign that you're feeling anxious. It's okay to be anxious. Just don't let it be the boss of you today." },
      { agent: "Student", message: "Thanks. I feel a bit more grounded now. I'm going to try those 15 minutes." },
      { agent: "Therapist", message: "I'm glad to hear that. How do you plan to reward yourself after those 15 minutes are done?" },
      { agent: "Student", message: "Reward myself? I didn't think I deserved one until the whole chapter was finished." },
      { agent: "Therapist", message: "That's a very harsh rule. If you only reward the end goal, the journey becomes miserable. What's something small you enjoy?" },
      { agent: "Student", message: "I like listening to a specific podcast. It's about urban legends." },
      { agent: "Therapist", message: "Perfect. 15 minutes of chemistry, followed by one episode of urban legends. That creates a positive loop. Does that feel fair?" },
      { agent: "Student", message: "It feels... strange. But better. I'll give it a shot." },
      { agent: "Therapist", message: "We're retraining your brain to see study as a manageable task, not a threat. We'll build on this next time." },
      { agent: "Student", message: "I'm actually looking forward to it. Thanks again." },
      { agent: "Therapist", message: "How are you feeling about the other two finals?" },
      { agent: "Student", message: "Still scared, but if this works for chemistry, maybe I can use it for them too." },
      { agent: "Therapist", message: "Exactly. One step at a time. You've got this." },
      { agent: "Student", message: "Thanks. I'll see you next week." },
      { agent: "Therapist", message: "Take care." },
      { agent: "Student", message: "Goodbye." },
      { agent: "Therapist", message: "Goodbye." }
    ]
  },
  "career-confusion": {
    title: "Career Confusion Student",
    transcript: [
      { agent: "Therapist", message: "Hi. It's good to see you. You mentioned in our last brief check-in that you've been feeling a bit lost regarding your future. Want to dive into that?" },
      { agent: "Student", message: "Yeah. Everyone around me is applying for internships and talking about placements. I'm just sitting here with no idea what I want to do." },
      { agent: "Therapist", message: "It can be very isolating when it feels like everyone has a map and you're still looking for the starting line. What are some things you've enjoyed doing in the past?" },
      { agent: "Student", message: "I liked my marketing classes, but I also enjoy coding. But then I see people doing pure finance and making so much money... I feel like I should want that too." },
      { agent: "Therapist", message: "So you're feeling torn between what you actually enjoy and what you think you 'should' want based on others' choices. What does 'success' mean to you, personally?" },
      { agent: "Student", message: "I used to think it was money. But now... I just want to not wake up hating my job every day." },
      { agent: "Therapist", message: "That's a very valid and healthy goal. If money wasn't a factor for a moment, which of those interests — marketing or coding — feels more like 'play' to you?" },
      { agent: "Student", message: "Coding, definitely. I love solving the puzzles. Marketing is cool too, but coding is where I lose track of time." },
      { agent: "Therapist", message: "Losing track of time is a great indicator of 'flow'. Why does the finance path still have a pull on you if it's not where your interest lies?" },
      { agent: "Student", message: "I think I'm just scared of being 'average'. Finance feels like the 'top tier' path at our school." },
      { agent: "Therapist", message: "Being 'average' in a field you love is often more fulfilling than being 'successful' in a field you dislike. But who says you'd be average at coding?" },
      { agent: "Student", message: "I don't know. There are so many people better than me." },
      { agent: "Therapist", message: "There will always be someone better. The question is, can you be good enough to build a life you enjoy? What's one step you could take to explore the coding path more seriously?" },
      { agent: "Student", message: "I could start a small side project. I've had an idea for a budget tracker for a while." },
      { agent: "Therapist", message: "That sounds like a fantastic idea. It combines your coding interest with a practical tool. How would it feel to spend some time on that this week?" },
      { agent: "Student", message: "Actually, it sounds exciting. Much better than looking at finance brochures." },
      { agent: "Therapist", message: "Follow that excitement. It's your internal compass. Don't worry about the 'placements' for a second. Just build." },
      { agent: "Student", message: "You're right. I've been so focused on the end goal that I forgot to look at the work itself." },
      { agent: "Therapist", message: "Exactly. The path is made by walking it. We'll talk more about how the project goes next time." },
      { agent: "Student", message: "I'll do that. I'm going to start with the basic UI tonight." },
      { agent: "Therapist", message: "Starting tonight is a great momentum builder. What's the very first feature you'll build?" },
      { agent: "Student", message: "Just a simple input for expenses. Keep it simple first." },
      { agent: "Therapist", message: "Simplicity is the key to finishing. I'm looking forward to hearing about your progress." },
      { agent: "Student", message: "Me too. Thanks for the push." },
      { agent: "Therapist", message: "Do you have any friends who are also interested in coding?" },
      { agent: "Student", message: "Yeah, a couple from my intro class. Maybe I'll ask them to join me." },
      { agent: "Therapist", message: "Collaboration can make the learning process much more enjoyable. Give it a try." },
      { agent: "Student", message: "I will. See you later." },
      { agent: "Therapist", message: "Take care." },
      { agent: "Student", message: "Bye." },
      { agent: "Therapist", message: "Goodbye." }
    ]
  },
  "low-confidence": {
    title: "Low Confidence Student",
    transcript: [
      { agent: "Therapist", message: "Hello. I've noticed you've been a bit quiet today. What's going on in your world?" },
      { agent: "Student", message: "I just feel like I don't belong here. I'm in this honors program and I feel like a total fraud." },
      { agent: "Therapist", message: "Imposter syndrome can be very loud. What specifically makes you feel like a 'fraud'?" },
      { agent: "Student", message: "In discussions, everyone has these brilliant things to say. I just sit there hoping the professor doesn't call on me because I'll probably say something stupid." },
      { agent: "Therapist", message: "So you're comparing your 'inside' feelings to everyone else's 'outside' performance. Have you considered that they might be feeling the same way?" },
      { agent: "Student", message: "No way. They look so confident. They have all the right words." },
      { agent: "Therapist", message: "Confidence is often a mask. But even if they are confident, does that make your thoughts any less valuable?" },
      { agent: "Student", message: "I don't even think my thoughts are valuable. I'm just lucky to be here." },
      { agent: "Therapist", message: "Luck doesn't get you into an honors program. Your hard work and ability did. Why is it so hard to accept that you earned your spot?" },
      { agent: "Student", message: "Maybe because I know how much I struggled. It didn't come easy to me like it does for them." },
      { agent: "Therapist", message: "Struggling to learn something often leads to a deeper understanding than if it came easily. You've fought for your knowledge. That's something to be proud of." },
      { agent: "Student", message: "I never thought of it as a fight. I just thought it meant I was slow." },
      { agent: "Therapist", message: "Slow and steady often wins in the long run. What's one thing you've understood deeply *because* you had to work hard for it?" },
      { agent: "Student", message: "Actually, I understand the core principles of thermodynamics really well because I spent two weeks in the library just on one chapter." },
      { agent: "Therapist", message: "Exactly! You have a depth that others might lack. This week, I want you to try to speak up just once in a discussion. Even if it's just to ask a question." },
      { agent: "Student", message: "Just a question? I can maybe do that. Asking a question isn't the same as giving an answer." },
      { agent: "Therapist", message: "Questions are often more brilliant than answers. They show you're thinking. Will you try it?" },
      { agent: "Student", message: "Okay. One question. I'll try. I already know what I want to ask about Entropy." },
      { agent: "Therapist", message: "That's fantastic. You're already prepared. How does it feel to have a plan?" },
      { agent: "Student", message: "A bit terrifying, but better than just waiting to be caught out." },
      { agent: "Therapist", message: "Being proactive is a great way to quiet that inner critic. I'm proud of you for taking this step." },
      { agent: "Student", message: "Thanks. I'll let you know how it goes." },
      { agent: "Therapist", message: "What's the worst that could happen if you ask that question?" },
      { agent: "Student", message: "I guess the professor might say it's a good question, or just answer it. No one's going to laugh." },
      { agent: "Therapist", message: "Exactly. The reality is usually much kinder than our fears. Go for it." },
      { agent: "Student", message: "I will. See you next week." },
      { agent: "Therapist", message: "Take care." },
      { agent: "Student", message: "Bye." },
      { agent: "Therapist", message: "Goodbye." }
    ]
  },
  "burnout": {
    title: "Burnout Student",
    transcript: [
      { agent: "Therapist", message: "You look exhausted today. When was the last time you had a full night's sleep?" },
      { agent: "Student", message: "I can't remember. I'm taking 18 credits, working a part-time job, and trying to keep up with my clubs. I'm just... done." },
      { agent: "Therapist", message: "That is an incredible load to carry. It sounds like you're running a marathon at a sprinter's pace. What happens if you keep going like this?" },
      { agent: "Student", message: "I'll crash. I know I will. I'm already starting to forget things and I'm irritated at everyone for no reason." },
      { agent: "Therapist", message: "Irritability and forgetfulness are your brain's way of saying it's out of fuel. Why do you feel like you have to do all of this right now?" },
      { agent: "Student", message: "Because if I don't, I'll fall behind. I want a good job, I want to be successful... I don't want to waste my potential." },
      { agent: "Therapist", message: "You are not 'wasting potential' by resting. You are 'preserving potential'. What would happen if you dropped just one club or reduced your hours?" },
      { agent: "Student", message: "I'd feel like a quitter. I've always been the high achiever." },
      { agent: "Therapist", message: "Being a high achiever doesn't mean being a machine. Even machines need maintenance. Is the 'quitter' label coming from you or someone else?" },
      { agent: "Student", message: "Probably from me. My parents actually told me to take it easy, but I can't." },
      { agent: "Therapist", message: "So you're being your own harshest critic. What would you say to a friend who was as exhausted as you are?" },
      { agent: "Student", message: "I'd tell them to stop and sleep. I'd tell them it's not worth their health." },
      { agent: "Therapist", message: "Can you give yourself that same grace? Just for one evening? No work, no clubs, just sleep." },
      { agent: "Student", message: "One evening? I have a lab report due tomorrow..." },
      { agent: "Therapist", message: "What if you did the lab report and then took the *next* evening off completely? A planned rest is better than an unplanned crash." },
      { agent: "Student", message: "A planned rest... that sounds less like quitting. I can finish the lab and then vanish for a night." },
      { agent: "Therapist", message: "I think that's a very necessary step. Mark it in your calendar as 'Maintenance Time'. No guilt allowed." },
      { agent: "Student", message: "Maintenance time. Okay. I'll actually turn my phone off too." },
      { agent: "Therapist", message: "Turning off the phone is a brilliant idea. Disconnecting from the noise is part of the recovery. How do you feel about that?" },
      { agent: "Student", message: "Relieved. Like I'm finally allowed to stop for a second." },
      { agent: "Therapist", message: "You are allowed. You are the only one who can grant that permission. Rest well." },
      { agent: "Student", message: "I will. Thanks for everything." },
      { agent: "Therapist", message: "We'll talk more when you're feeling a bit more like yourself." },
      { agent: "Student", message: "I look forward to it. I'm going to sleep for 10 hours tonight." },
      { agent: "Therapist", message: "10 hours sounds like exactly what the doctor ordered. Enjoy the rest." },
      { agent: "Student", message: "I will. Bye." },
      { agent: "Therapist", message: "Goodbye." }
    ]
  },
  "verified-session": {
    title: "AI-Verified Master Session",
    transcript: [
      { agent: "Therapist", message: "Welcome to this specialized session. I'm here to listen and guide you through whatever you're facing. Where shall we begin?" },
      { agent: "Student", message: "I've been feeling like I'm performing a role. Everything looks fine on the outside, but inside I'm just empty." },
      { agent: "Therapist", message: "Performing a role can be exhausting. When you're in that 'empty' space, what thoughts come to mind?" },
      { agent: "Student", message: "Just 'what's the point?'. I study, I get the grades, I go to the gym... but I don't feel anything." },
      { agent: "Therapist", message: "It sounds like you've optimized your life for external results but lost the internal connection. How long has this been happening?" },
      { agent: "Student", message: "Maybe since last year. I just went on autopilot to survive finals and never really turned it off." },
      { agent: "Therapist", message: "Autopilot is a great survival tool, but it's a terrible way to live. What was the last thing that made you feel truly present?" },
      { agent: "Student", message: "I went for a walk in the rain last month. For like five minutes, I wasn't thinking about my GPA." },
      { agent: "Therapist", message: "Five minutes of presence in a month. That's a start. Why was that walk different?" },
      { agent: "Student", message: "It was sensory. The cold water, the smell... I couldn't ignore it." },
      { agent: "Therapist", message: "Sensory grounding is a powerful way to break the autopilot. What if we try to find 5 minutes of that every day?" },
      { agent: "Student", message: "I don't know if I have the time. My schedule is packed." },
      { agent: "Therapist", message: "If you don't have 5 minutes to feel alive, then the schedule is the problem, not the solution. What could you subtract to make that space?" },
      { agent: "Student", message: "I spend 20 minutes every morning checking emails before I even get out of bed. I could skip that." },
      { agent: "Therapist", message: "Emails are the ultimate 'autopilot' trigger. Let's try skipping them. What would you do instead?" },
      { agent: "Student", message: "Just sit by the window. Maybe drink my tea without my phone." },
      { agent: "Therapist", message: "That sounds like a beautiful act of rebellion against the 'role'. How does the idea of 'tea by the window' feel?" },
      { agent: "Student", message: "A bit scary, honestly. Like I'm letting my guard down." },
      { agent: "Therapist", message: "Letting your guard down is exactly where the 'feeling' comes back. It's safe here to explore that fear." },
      { agent: "Student", message: "I guess I'm scared that if I stop, I'll realize I don't like my life at all." },
      { agent: "Therapist", message: "That is a brave admission. But isn't it better to know the truth than to perform a lie forever?" },
      { agent: "Student", message: "Yeah. I can't keep doing this. I need to know who I am outside of the grades." },
      { agent: "Therapist", message: "We'll find that person together. One morning at a time. I'm here with you." },
      { agent: "Student", message: "Thank you. I think I'm ready to try that tea tomorrow." },
      { agent: "Therapist", message: "I'll be interested to hear how it goes. You're taking a very important step today." },
      { agent: "Student", message: "I feel a bit more real already. See you next time." },
      { agent: "Therapist", message: "See you next time. Take care." },
      { agent: "Student", message: "Bye." },
      { agent: "Therapist", message: "Goodbye." }
    ]
  }
};

export function detectPersona(input: string): string | null {
  const lowInput = input.toLowerCase();
  if (lowInput.includes("exam") || lowInput.includes("stress") || lowInput.includes("study") || lowInput.includes("fail")) return "exam-stress";
  if (lowInput.includes("career") || lowInput.includes("future") || lowInput.includes("job") || lowInput.includes("internship")) return "career-confusion";
  if (lowInput.includes("confidence") || lowInput.includes("imposter") || lowInput.includes("smart") || lowInput.includes("belong")) return "low-confidence";
  if (lowInput.includes("burnout") || lowInput.includes("tired") || lowInput.includes("exhausted") || lowInput.includes("sleep")) return "burnout";
  return null;
}
