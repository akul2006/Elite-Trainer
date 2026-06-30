import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
}

const reviews: Testimonial[] = [
  {
    quote: "When we first started, I had a mix of excitement and curiosity, not knowing exactly how things would unfold. And I was also unsure about how we’d connect and how the sessions would progress.\n\nWhat I didn’t expect was how much I would learn along the way, and how much fun the entire journey would turn out to be. From the very beginning, you brought a positive energy and a passion to learn that made each session enjoyable.\n\nI’ve learned so much from you—not just in terms of knowledge, but also about the importance of keeping an open mind, and having fun during the learning process. Looking back now, I can honestly say that the training sessions with you were not only productive but a lot of fun.\n\nI feel grateful to have had the opportunity to learn from someone you and I’ve enjoyed every moment of our time together.",
    author: "HexaWare Employee",
  },
  {
    quote: "I am writing this mail to give genuine feedback on the training sessions until now. Hope you're doing well and this mail does put a smile on your face. The sessions have been very great and useful uptil now. I am able to have a more clear idea of how to handle situations in the coming days which is definitely worth it. I am glad I could have you as my trainer. You are very approachable and friendly to us which is something we have not experienced much with our college faculties. Speaking of the quality of the course content, it is very good and we as freshers are able to understand well and easily put it into our roleplays. Roleplays are the most fun part about the sessions. Interacting with each other while putting creative minds to make quick decisions is something that I really liked doing the whole time. I wish we keep having these kinds of fun and interactive sessions in the future as well. Thank you for training us!",
    author: "India Mart Employee",
  },
  {
    quote: "If I move back to the first day of our training session, I see myself very confused about how the training will proceed and little scared too due to the assessment process. Initially I expected that the training should be more like an engaging session rather than being more of theory classes. \n\nAs the training moved further, I was very excited since the training was exactly as I expected and even more than what I expected. Mam, you covered all the concepts and at the end of each concept there was a role play or a discussion which made the session more interactive and engaging. I loved particularly the part where we estimated the budget for the cultural program and fun activities like Chinese whisper, tongue twisters, etc. \n\nThis training program boosted my self confidence after being a part in various roleplays and discussions.Even it improved my communication skills and taught me how assertively I should communicate in various corporate situations.After all the etiquettes I learnt in this training session, I'm sure those will ease my being in hexaware. \n\nThankyou so much mam for making this training more useful and happening.From feeling nervous about attending the training session to becoming excited for each session and now feeling sad that it's coming to an end – it's all thanks to you, mam.",
    author: "HexaWare Employee",
  },
  {
    quote: "During the first day I was nervous because I have not attended any training form a corporate professional person before, so I was worried if I will be able to understand and have a good communication with you, but you were very friendly and supportive from the start mam. It was really helpful to me to communicate with you mam. The way you engage us when we were bored and teaching everything with examples made me listen to you attentively mam. \n\nAbout the training expectations, What I initially thought was it will be like a lecture in college and we would get knowledge about assertive communication. But the training program which you gave was beyond my expectations as you taught us how to behave, how to handle situation and also you explained all the concepts with examples which made my learning more practical than theoretical. I think it will be a great help for me when I face similar situations in the company. \n\nThe changes that I have within myself is that I am not getting nervous anymore whenever I am told to speak with some stranger. I am able to clearly communicate my thoughts. I have learnt how to write an email properly, about how to behave in workplace and communicate politely yet clearly.",
    author: "Google Employee"
  },
  {
    quote: "1.On the very first day, I was just expecting someone to come, teach the class, and leave. I thought that’s all it would be, and I planned to give my full attention to it since it’s job-related.\n\n2. But I have to say, it completely crossed my expectations. In simple terms, my expectations were like a wall, and this experience reached the height of a mountain. \n\n3.I’m not the kind of person who asks questions or even says 'yes' or 'no' in online or offline classes. I never interact with any of my staff members. Even if I know the answer, I won’t say it; I just wait for someone else to respond. But the changes I’ve seen in myself now are amazing. Not only am I answering questions when I know the answer, but even when I don’t know, I’m giving it a try. You constantly say, 'Ask questions,” and that made such a difference in me. I started paying deeper attention in your class, thinking, Where can I ask a question? or I should have some doubt. Now I’m giving work to my brain and actually asking questions. \n\nThe role plays were the most fun part. Team interaction was another amazing aspect. Even though we are all from the same college and some of us from the same department, we hardly talked. But you changed everything. You gave me the mindset that whether you know someone or not, you can interact with them and make teamwork successful. \n\nThis is all new for me. In all my 21 years, I’ve never experienced anything like this. But I have to say, these 16 days have taught me a lot of lessons I can carry with me for life. Thank you so much, ma’am!",
    author: "Global Talent Track Employee"
  },
  {
    quote: "On the first day, I was extremely nervous and had no idea what I was going to do. To be honest, I didn’t have any specific expectations. The only thought running through my mind was that I had to give my best, no matter what task was assigned to me.\n\nTo answer the second question, I can confidently say that  you exceeded my own expectations. I must mention that you were incredibly kind, and your positive attitude kept all of us happy throughout the session. The initial nervousness I had gradually disappeared, thanks to your encouraging nature. You are truly one of the best tutors I’ve had, and we are so grateful to you for your patience and understanding. Not once did you lose your temper, and that made the learning environment even more enjoyable.\n\nLastly, I learned so much during this session. In particular, I improved my vocabulary and gained a better understanding of how to behave in a professional work culture. The role plays helped me a lot in learning how to act and respond in different workplace situations.\n\n\Thank you once again for such a wonderful learning experience!",
    author: "HexaWare Employee"
  },

];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="scroll-mt-20 py-24 bg-surface max-w-5xl mx-auto px-4 md:px-16 text-center">
      <div className="flex flex-col items-center">
        {/* Large Aesthetic Quote Icon */}
        <div className="w-16 h-16 rounded-full bg-secondary-container/10 flex items-center justify-center mb-8">
          <Quote size={32} className="text-secondary fill-secondary" />
        </div>

        {/* Testimonial slider view box */}
        <div className="relative min-h-[220px] sm:min-h-[180px] w-full flex items-center justify-center px-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              <blockquote className="text-lg sm:text-xl md:text-2xl italic font-medium text-primary leading-relaxed whitespace-pre-line">
                "{reviews[activeIndex].quote}"
              </blockquote>

              <div className="mt-8">
                <p className="font-extrabold text-base text-primary font-display">{reviews[activeIndex].author}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Left/Right & Slider Controller indicator pagination bar */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={handlePrev}
            className="p-2 border border-outline-variant rounded-full text-on-surface hover:bg-surface-container hover:text-primary hover:border-outline transition-all duration-300 cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots Indicators */}
          <div className="flex gap-2.5">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-6 bg-secondary' : 'w-2.5 bg-outline-variant hover:bg-outline'
                  }`}
                aria-label={`Go to Testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 border border-outline-variant rounded-full text-on-surface hover:bg-surface-container hover:text-primary hover:border-outline transition-all duration-300 cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
