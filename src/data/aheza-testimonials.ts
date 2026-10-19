export type AhezaTestimonial = {
  quote: string;
  name: string;
  businessLine?: string;
};

// Source: real participant testimonies supplied by African Leaders Hub.
// Names are preserved exactly as supplied.
export const ahezaTestimonials: AhezaTestimonial[] = [
  {
    name: "Mwezirankoni Eminante Gloria",
    quote:
      "Before joining AHEZA, I did not record my income and expenses, and I mixed my personal money with my business money. Now I record everything and I can see clearly what I earn, what I spend, and what I save.",
  },
  {
    name: "Uwamariya Chantal",
    businessLine: "Chantamelon — watermelon sales",
    quote:
      "I used to sell without knowing my real profit. Through AHEZA I learned to track my costs, separate my personal finances from my business, and understand whether I was actually making money.",
  },
  {
    name: "Umumararungu Marie Irene",
    quote:
      "AHEZA helped me understand my customers better. I learned how to identify who my customers are, what they need, and how to reach them. My customer relationships have improved.",
  },
  {
    name: "Agathe UWAMAHORO",
    quote:
      "Before this program I had no clear business plan. AHEZA gave me tools to set goals, plan my activities, and make decisions based on real information rather than guessing.",
  },
  {
    name: "Kayitesi Deborah",
    quote:
      "I learned how to manage my stock and set prices that cover my costs and leave a profit. I also started saving regularly, which I had never done consistently before.",
  },
  {
    name: "Iragena Erneste",
    quote:
      "The mentorship sessions helped me see my business from the outside. My mentor asked questions that made me think more carefully about what I was doing and why. That changed how I make decisions.",
  },
  {
    name: "Hosiane UBUNTUBWIMANA",
    quote:
      "I now have a Business Model Canvas for my business. Before AHEZA I did not know what that was. It helped me understand all the parts of my business and how they connect.",
  },
  {
    name: "Uwase Esperance",
    quote:
      "Learning to use Excel and Google Sheets for my records was one of the most practical things I gained. I can now track my income and expenses properly and see my financial situation clearly.",
  },
  {
    name: "Musabyimana Amina",
    quote:
      "AHEZA helped me understand the difference between revenue and profit. I thought I was doing well because money was coming in, but I was not accounting for all my costs. Now I know how to calculate my real profit.",
  },
  {
    name: "Tuyisenge Ruth",
    quote:
      "The program helped me prepare a proper business presentation. I learned how to explain my business clearly to others, which has helped me when speaking to potential customers and partners.",
  },
  {
    name: "Mugwaneza Alice",
    quote:
      "I gained confidence in planning for the future of my business. Before, I was focused only on today. AHEZA helped me think about where I want my business to be and what steps I need to take to get there.",
  },
  {
    name: "Elina Musabyimana",
    quote:
      "Sharing experiences with other participants was very valuable. Hearing how others solved problems similar to mine gave me new ideas and showed me I was not alone in the challenges I faced.",
  },
  {
    name: "Muteteri M. Ange",
    quote:
      "I learned how to develop a clear offer for my customers — what I provide, for whom, and why it is valuable. This helped me communicate about my business more effectively.",
  },
  {
    name: "Mukarwego Betty",
    quote:
      "Before AHEZA I did not understand the legal and regulatory side of running a business. The program introduced me to the basic requirements and helped me think about how to formalize my business properly.",
  },
  {
    name: "Irakora Davy Sebwitabure",
    quote:
      "The one-to-one mentoring sessions were the most important part for me. Having someone focus on my specific business, ask the right questions, and help me find my own answers made a real difference.",
  },
];

export const featuredAhezaTestimonials = ahezaTestimonials.slice(0, 3);
