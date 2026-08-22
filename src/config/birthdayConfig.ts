// ===================================================================
//  BIRTHDAY WEBSITE CONFIGURATION
//  Edit this single file to personalize the entire experience.
//  Replace photos in /public/images and the song in /public/audio.
// ===================================================================

export interface MemoryItem {
  image: string;
  caption: string;
}

export interface TimelineItem {
  title: string;
  date: string;
  description: string;
  emoji: string;
}

export interface ReasonItem {
  title: string;
  emoji: string;
  message: string;
}

export interface BirthdayConfig {
  name: string;
  birthday: string;
  heroTitle: string;
  heroSubtitle1: string;
  heroSubtitle2: string;
  photoTitle: string;
  photoMessage: string;
  photoImage: string;
  memories: MemoryItem[];
  timelineTitle: string;
  timeline: TimelineItem[];
  memorySpaceTitle: string;
  memorySpaceMessage: string;
  reasonsTitle: string;
  reasons: ReasonItem[];
  letterTitle: string;
  letter: string;
  cakeTitle: string;
  cakeButton: string;
  cakeFinalMessage: string;
  finalSurpriseTitle: string;
  finalThankYou: string;
  finalMessage: string;
  finalGratitude: string;
}

export const birthdayConfig: BirthdayConfig = {
  name: "My Love",
  birthday: "August 17, 2026",

  // PAGE 2 — Birthday Hero
  heroTitle: "Happy Birthday, My Love ❤️",
  heroSubtitle1: "Today isn't just another day...",
  heroSubtitle2: "It's the day someone incredibly special came into this world.",

  // PAGE 3 — Her Photo
  photoTitle: "Here she is... ❤️",
  photoMessage:
    "Out of all the people in this world, somehow my story became more beautiful after you became a part of it.",
  photoImage: "/images/her-photo.jpg",

  // PAGE 4 — Memories
  memories: [
    {
      image: "/images/memory1.jpg",
      caption: "That day I'll always remember ❤️",
    },
    {
      image: "/images/memory2.jpg",
      caption: "One of my favorite moments with you.",
    },
    {
      image: "/images/memory3.jpg",
      caption: "Some moments are impossible to forget.",
    },
    {
      image: "/images/memory4.jpg",
      caption: "A perfect day, just you and me.",
    },
    {
      image: "/images/memory5.jpg",
      caption: "The smile that lights up my world.",
    },
    {
      image: "/images/memory6.jpg",
      caption: "Forever my favorite view.",
    },
  ],

  // PAGE 5 — Timeline
  timelineTitle: "Our Little Story ❤️",
  timeline: [
    {
      title: "First Conversation",
      date: "The day it all began",
      description: "you ask me about my insta ID. I dont think a insta ID crate a impact role to our life that change my life and I dont think thats a reson begain of my Happiness.",
      emoji: "💬",
    },
    {
      title: "First Time We Met",
      date: "The moment I waited for",
      description: "yes I remember when I meet you 1st time in the class room A12 on 1st floor of Building A of Our College. mujhe nhi pta tha ki iss ladhki se itna payar ho jayega meri jaan ❤️",
      emoji: "✨",
    },
    {
      title: "That One Special Day",
      date: "A day etched in my heart",
      description: " My special day was about spending that beautiful day with you in Vrindavan. From our train journey to every little memory we made, from walking together to having darshan and praying for each other—everything felt so peaceful and special.We cared for each other, prayed for each other, and made memories that I will always keep close to my heart.",
      emoji: "💫",
    },
    {
      title: "Our Favorite Memory",
      date: "The one we'll always replay",
      description: "Hamari Favorite memory thi jab hum pehli baar movie dekhne gaye the — Sanam Teri Kasam. ❤️ Us din movie dekhte-dekhte hum dono kaafi emotional ho gaye the. Shayad wahi din tha jab humne ek-dusre ke liye care, feelings aur pyaar ko thoda aur deeply feel kiya. Movie toh khatam ho gayi, lekin us din ki memories aur tumhare saath woh feeling mere dil mein hamesha rahegi. ❤️",
      emoji: "🌸",
    },
    {
      title: "Today ❤️",
      date: "Your birthday",
      description: "Celebrating you, the most beautiful person in my world, today and always meri princess .",
      emoji: "🎂",
    },
  ],

  // PAGE 6 — 3D Memory Space
  memorySpaceTitle: "If I could keep one thing forever...",
  memorySpaceMessage:
    "I'd keep every moment I got to spend with you. ❤️",

  // PAGE 7 — Reasons I Love You
  reasonsTitle: "Reasons You're Special To Me ❤️",
  reasons: [
    {
      title: "Your Smile",
      emoji: "😊",
      message: "Your smile has the power to turn my darkest days into something bright. It's the thing I look forward to most.",
    },
    {
      title: "Your Kindness",
      emoji: "❤️",
      message: "The way you care for me, the gentleness in your heart — it reminds me that goodness still exists in this world.",
    },
    {
      title: "The Way You Make Me Happy",
      emoji: "🌟",
      message: "Without even trying, you bring joy into my life. Just being near you, even in silence, feels like home.",
    },
    {
      title: "Your Beautiful Heart",
      emoji: "💎",
      message: "Your heart is rare and precious. It loves deeply, forgives easily, and sees the best in everything from me .",
    },
    {
      title: "Your Presence",
      emoji: "🌙",
      message: "There's a calm that comes with having you around. The world makes more sense when you're in my life.",
    },
    {
      title: "The Little Things You Do",
      emoji: "🌷",
      message: "The way you care for me, check on me, remember small things, listen to me, and sometimes just stay there without saying much—I notice all of it.",
    },
    {
      title: "Your Strength",
      emoji: "🔥",
      message: "Its me, my Happiness, my support and my presence in your life will always be your strength  ",
    },
    {
      title: "The Way You Love",
      emoji: "💞",
      message: "Being loved by you is the greatest gift I've ever received.",
    },
  ],

  // PAGE 8 — Personal Letter
  letterTitle: "A Little Something From My Heart ❤️",
  letter: ` Happy Birthday, meri Buggu. ❤️

Aaj tumhara birthday hai, lekin sach kahun toh mere liye ye sirf tumhara birthday nahi hai… ye us din ki yaad hai jis din meri life mein ek aisi person aayi, jo dheere-dheere meri life ka sabse beautiful part ban gayi.

Main shayad har baar words mein express nahi kar pata ki tum mere liye kitni important ho. Kabhi busy hota hoon, kabhi stupid behave karta hoon, kabhi bina wajah irritate bhi kar deta hoon… but deep down, I genuinely care about you more than I can explain.

Mujhe tumhari smile achchi lagti hai, tumhari little-little बातें achchi lagti hain, tumhara care karna achcha lagta hai… aur sabse zyada ye feeling achchi lagti hai ki tum meri life mein ho. ❤️

Main chahta hoon ki tum hamesha khush raho, apne dreams achieve karo aur life mein kabhi kisi cheez ke liye khud ko less feel na karo. Aur jab life difficult ho, jab tum tired ho ya jab tumhe lage ki sab kuch against ja raha hai… bas itna yaad rakhna, I'm always there for you.

Aaj tumhara fast bhi hai, isliye celebration thoda different hai… but meri wish bilkul simple hai—
tumhari life mein jitni bhi khushiyan hain, woh sab tumhe milein, aur tumhare face ki smile kabhi kam na ho. ❤️

Thank you for being you.
Thank you for coming into my life.
And thank you for giving me so many reasons to smile.

I don't know what the future holds for us, but I know one thing—
I want to keep making beautiful memories with you, keep caring for you, and keep choosing you, again and again. ❤️

Happy Birthday, meri Buggu. 🎂❤️

You are not just someone I love…
you are someone I genuinely care about, respect, and never want to lose.

With all my love,`,

  // PAGE 9 — Birthday Cake
  cakeTitle: "Make a Wish 🎂✨",
  cakeButton: "Blow the Candles",
  cakeFinalMessage: "May every wish you make today come true.",

  // PAGE 10 — Final Surprise
  finalSurpriseTitle: "Wait... there's one more thing.",
  finalThankYou: "Thank you for being a beautiful part of my life Meri jaan. ❤️",
  finalMessage: `Here's to more memories, more laughter, more adventures and many more birthdays together.`,
  finalGratitude: "Forever grateful for you. ❤️",
};
