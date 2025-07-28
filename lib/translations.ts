export type Language = 'en' | 'he';

export interface Translations {
  // Header
  header: {
    title: string;
    contact: string;
  };
  
  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    startJourney: string;
  };
  
  // How It Works Section
  howItWorks: {
    title: string;
    steps: {
      aiAssessment: {
        title: string;
        description: string;
      };
      smartMatching: {
        title: string;
        description: string;
      };
      bookRelax: {
        title: string;
        description: string;
      };
    };
    getMatchesNow: string;
  };
  
  // Testimonials
  testimonials: {
    title: string;
    articles: {
      title: string;
      subtitle: string;
      content: string;
      rating: number;
    }[];
  };
  
  // Benefits
  benefits: {
    title: string;
    description: string;
    items: string[];
  };
  
  // Final CTA
  finalCta: {
    title: string;
    description: string;
    chatButton: string;
  };
  
  // Footer
  footer: {
    copyright: string;
    disclaimer: string;
  };
  
  // Chat Interface
  chat: {
    title: string;
    placeholder: string;
    continue: string;
    copyMessage: string;
    copied: string;
    
    // Initial Messages
    welcome: string;
    introduction: string;
    moodQuestion: string;
    
    // Research Interest
    researchIntro: string;
    researchOptions: {
      interested: string;
      different: string;
    };
    experienceQuestion: string;
    experienceOptions: {
      yes: string;
      no: string;
    };
    
    // What brings you here
    bringsHereQuestion: string;
    bringsHereOptions: {
      therapist: string;
      trainee: string;
      consult: string;
      massage: string;
      more: string;
    };
    
    // Treatment matters
    treatmentMattersQuestion: string;
    treatmentMattersOptions: string[];
    
    // Preferences
    touchStyleQuestion: string;
    touchStyleOptions: string[];
    
    therapistPrefQuestion: string;
    therapistPrefOptions: string[];
    
    locationQuestion: string;
    locationOptions: string[];
    
    timeQuestion: string;
    timeOptions: string[];
    
    locationLiveQuestion: string;
    
    atmosphereQuestion: string;
    atmosphereOptions: string[];
    
    additionalNotesQuestion: string;
    
    // Budget Question
    budgetQuestion: string;
    
    // Scent Questions
    scentIntroQuestion: string;
    scentOptions: {
      yes: string;
      no: string;
    };
    scentPrefsQuestion: string;
    
    // Contact
    contactQuestion: string;
    contactValidation: string;
    contactConfirmation: string;
    contactInvalid: string;
    contactThankYou: string;
    contactRepresentative: string;
    consultContact: string;
    
    // Conversation Flow
    assistantIntroduction: string;
    researchQuestion: string;
    researchYes: string;
    researchNo: string;
    experienceInterest: string;
    experienceYes: string;
    experienceNo: string;
    bringsHereMore: string;
    bringsHereOther: string;
    uniqueExperience: string;
    treatmentMattersMore: string;
    scentQuestion: string;
    
    // Final
    recommendationIntro: string;
    ratingQuestion: string;
    ratingThanks: string;
    
    // Error Messages
    errorGeneral: string;
    discretionResponse: string;
    continueConversation: string;
    emptyInputResponse: string;
    summaryIntro: string;
    summaryEmpty: string;
    humanSupport: string;
    therapistContactQuestion: string;
    finalSummaryIntro: string;
    agreementThanks: string;
    findingTherapist: string;
    representativeContact: string;
    coordinateMessage: string;
    finalSummaryHeader: string;
    ratingComplete: string;
    sessionComplete: string;
    contactValidationError: string;
    selectFromOptions: string;
    provideClearResponse: string;
    
    // Therapist Info
    therapistCard: {
      chatPrivately: string;
      reviews: string;
    };
  };


  // Contact Modal
  contactModal: {
    title: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    sendMessage: string;
    sending: string;
    messageSent: string;
    getBackSoon: string;
    autoClose: string;
  };
  
  // Preference Labels
  preferenceLabels: {
    mood: string;
    wantsResearchInfo: string;
    wantsToExperience: string;
    bringsHereToday: string;
    treatmentMatters: string;
    touchStyle: string;
    therapistPreference: string;
    sessionLocation: string;
    locationLive: string;
    preferredTime: string;
    conversationStyle: string;
    additionalNotes: string;
    budget: string;
    scentPreferences: string;
    contactInfo: string;
  };
  
  // Therapist Specialties
  therapistSpecialties: {
    deepTissue: string;
    swedish: string;
    sports: string;
  };
  
  // Therapist Descriptions
  therapistDescriptions: {
    holisticDeep: string;
    swedishRelaxation: string;
    sportsRecovery: string;
  };
  
  // Availability
  availability: {
    today: string;
    tomorrow: string;
  };
  
  // Services
  services: {
    massage60: string;
    massage90: string;
    sportsMassage60: string;
  };
  
  // Research Modal
  researchModal: {
    title: string;
    results: {
      title: string;
      items: {
        cortisol: string;
        sleep: string;
        anxiety: string;
        muscle: string;
      };
    };
    howItWorks: {
      title: string;
      description: string;
    };
    protocol: {
      title: string;
      description: string;
    };
    buttons: {
      interested: string;
      notInterested: string;
    };
    readMore: string;
    interestedResponse: string;
    notInterestedResponse: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    header: {
      title: "Therapeutic Scents™",
      contact: "Contact"
    },
    hero: {
      title: "AI-Powered Massage Therapy to reduce stress & improve sleep quality using therapeutic scents inspired by science.",
      subtitle: "Using Therapeutic Scent™ Book Personalized Massage Therapy with AI Driven Science Based Aromatherapy to boost your therapy.",
      startJourney: "Start My Journey"
    },
    howItWorks: {
      title: "How our smart system works",
      steps: {
        aiAssessment: {
          title: "AI Chat Assessment",
          description: "Tell our AI about your wellness needs, scent preferences, and therapy goals through an intuitive chat interface."
        },
        smartMatching: {
          title: "Smart Matching",
          description: "Our advanced matching technology pairs you with a certified therapist and therapy that's right for you, plus a personalized science-based aromatherapy blend designed to enhance your therapeutic goals"
        },
        bookRelax: {
          title: "Book & Relax",
          description: "Connect directly with your matched therapist via WhatsApp or Telegram and schedule your personalized session."
        }
      },
      getMatchesNow: "Get Matches Now"
    },
    testimonials: {
      title: "What Science Says",
      articles: [
        {
          title: "Dr. Sarah Mitchell",
          subtitle: "Clinical Research Director",
          content: "Aromatherapy combined with massage therapy has been shown to significantly reduce cortisol levels and improve sleep quality in clinical studies. The personalized approach to scent selection enhances the therapeutic benefits.",
          rating: 5
        },
        {
          title: "Dr. Michael Chen",
          subtitle: "Neuroscience Researcher",
          content: "Our research indicates that specific scent molecules can trigger the limbic system, leading to a 45% reduction in anxiety markers when paired with targeted massage techniques.",
          rating: 5
        },
        {
          title: "Dr. Emily Roberts",
          subtitle: "Holistic Wellness Expert",
          content: "The synergy between therapeutic massage and personalized, science-backed scents is profound. We've observed a 2.3x increase in muscle tension relief compared to massage alone.",
          rating: 5
        }
      ]
    },
    benefits: {
      title: "The Benefits of Personalized Aromatherapy",
      description: "Our unique approach combines the ancient wisdom of aromatherapy with modern AI to create a truly personalized therapeutic experience. Each scent blend is designed to work in synergy with your massage, targeting your specific wellness goals.",
      items: [
        "Enhanced Stress Reduction",
        "Improved Sleep Quality", 
        "Targeted Muscle Relief",
        "Boosted Mood and Well-being"
      ]
    },
    finalCta: {
      title: "Ready for a transformative experience?",
      description: "Your journey to relaxation and well-being is just a conversation away. Let our AI assistant guide you to the perfect therapy session.",
      chatButton: "Chat with Our AI Assistant"
    },
    footer: {
      copyright: "© 1924 Therapeutic Scents™. All rights reserved to Tomer Massage Group. If you want to join our group, contact +972547451527",
      disclaimer: "This service is intended for wellness purposes and does not constitute medical advice."
    },
    chat: {
      title: "Your AI Assistant",
      placeholder: "Type your message...",
      continue: "Continue",
      copyMessage: "Copy message",
      copied: "Copied!",
      welcome: "Q1: Let's find the therapist and therapy that's just right for you…",
      introduction: "Q2: Nice to meet you! I'm Tomer – a professional massage therapist and coordinator between skilled therapists and clients seeking unique experiences across the country. If you're a therapist looking to grow your business, feel free to reach out at 09-7961414 or answer below, \"I am a therapist.\"",
      moodQuestion: "Q3: How are you today?",
      researchIntro: "Q4: I'm Miguel, Tomer's AI personal assistant. Our key values: discretion, mutual respect, and providing real value. Did you know that science shows massage therapy is effective in reducing stress and anxiety and improving sleep quality - especially when combined with specific scent molecules?",
      researchOptions: {
        interested: "I am interested in learning more about this enhanced approach.",
        different: "I prefer to explore different types of massage."
      },
      experienceQuestion: "Q5: Does this sound like something you would like to experience?",
      experienceOptions: {
        yes: "Yes, it does",
        no: "No, not for me"
      },
      bringsHereQuestion: "Q6: To create a session that truly suits you, please tell us what brings you here today.",
      bringsHereOptions: {
        therapist: "I am a certified therapist",
        trainee: "I am a trainee looking to practice",
        consult: "I just need to consult and talk",
        massage: "I would like to get a professional massage",
        more: "More"
      },
      treatmentMattersQuestion: "Q7: Tell us what matters most to you in a treatment or therapist. The more you share, the better we can match you with the perfect experience. Feel free to choose one or more of the following options or write your own answer.",
      treatmentMattersOptions: [
        "I have difficulty sleeping",
        "I need to relax and reset",
        "I work out a lot and feel tension",
        "My body and soul need a deep release",
        "I'm missing touch lately -🙁",
        "More"
      ],
      touchStyleQuestion: "Q8: Touch style?",
      touchStyleOptions: ["Deep and strong", "Gentle and soft", "Intuitive"],
      therapistPrefQuestion: "Q9: Therapist preference?",
      therapistPrefOptions: ["No preference", "Woman", "Man"],
      locationQuestion: "Q10: Session location?",
      locationOptions: ["My place", "Therapist's studio", "Flexible"],
      timeQuestion: "Q11: Preferred time?",
      timeOptions: ["Available now", "Morning", "Afternoon", "Evening", "Late night"],
      locationLiveQuestion: "Q12: Where do you live?",
      atmosphereQuestion: "Q13: How would you like your massage session atmosphere?",
      atmosphereOptions: [
        "Silent relaxation - Pure quiet for deep meditation",
        "Casual chat - Friendly conversation with your therapist",
        "Jazz ambiance - Smooth jazz music throughout the session",
        "Nature therapy - Soothing sounds of water and birds",
        "No music"
      ],
      additionalNotesQuestion: "Q14: Anything else you'd like your therapist to know about what makes you feel good?",
      budgetQuestion: "Q17: How much would you like to spend on the massage?",
      scentIntroQuestion: "Q15: Science has shown that certain scent molecules can help ease muscle tension, reduce Cortisol levels and boost relaxation. Want us to create a custom therapeutic scent just for you, based on real science?",
      scentOptions: {
        yes: "Yes, please",
        no: "No, thanks"
      },
      scentPrefsQuestion: "Q16: Tell us your favourite perfumes — it'll help us get to know your scent vibe and design an effective and pleasing functional scent for your session",
      contactQuestion: "Q16: To connect you with the perfect therapist, please provide your phone number or Telegram handle so we can reach you.",
      contactValidation: "Please provide a valid phone number (e.g., +1234567890) or Telegram handle (starting with @)",
      contactConfirmation: "Thank you! We'll be in touch shortly at",
      recommendationIntro: "Q18: Based on your preferences, here's a therapist we recommend for you:",
      ratingQuestion: "Q19: How was your experience with us so far?",
      ratingThanks: "Thank you for your feedback! It is safe now to close the conversation.",
      errorGeneral: "Oops, Tomer didn't prepare me for that one 😅. I am a generative AI personal assistant. Please provide a response.",
      discretionResponse: "We understand your need for discretion. We only use Telegram for communication and can arrange calls from a private number to our office at 09-7961414.",
      continueConversation: "Now, to continue where we left off...",
      emptyInputResponse: "Oops, Tomer didn't prepare me for that one 😅. I am a generative AI personal assistant. Please provide a response.",
      summaryIntro: "Of course! Here's a summary of your preferences so far:",
      summaryEmpty: "We haven't gathered enough information for a summary yet.",
      humanSupport: "Of course. You can reach our support team at tomermassageandfist@gmail.com or call us at 09-7961414 or via WhatsApp 0547451527.",
      therapistContactQuestion: "Great! Please provide your phone number or Telegram handle so we can reach you.",
      contactInvalid: "Please provide a valid phone number (e.g., +1234567890) or Telegram handle (starting with @)",
      contactThankYou: "Thank you! We'll be in touch shortly at",
      contactRepresentative: "Got it. A representative will contact you soon. Thank you!",
      consultContact: "I understand. Let's move this to a more private chat. Please provide your phone number or Telegram handle so we can reach you.",
      assistantIntroduction: "Q4: I'm Miguel, Tomer's AI personal assistant. Our key values: discretion, mutual respect, and providing real value. Did you know that science shows massage therapy is effective in reducing stress and anxiety and improving sleep quality - especially when combined with specific scent molecules?",
      researchQuestion: "I am interested in learning more about this enhanced approach.",
      researchYes: "I prefer to explore different types of massage.",
      researchNo: "Great! Here's a summary of the research...",
      experienceInterest: "Q5: Does this sound like something you would like to experience?",
      experienceYes: "Excellent! A representative will call you shortly. What is your phone number or Telegram handle?",
      experienceNo: "Q5: Understood. To create a session that truly suits you, please tell us what brings you here today.",
      bringsHereMore: "I see. Could you please tell me a bit more about what brings you here today?",
      bringsHereOther: "Thank you for sharing. We want to give you a unique experience that truly meets your needs.",
      uniqueExperience: "Q6: I see- that's cool…. We want to give you a unique experience that truly meets your needs.",
      treatmentMattersMore: "You selected 'More'. Could you please specify what else matters to you?",
      scentQuestion: "Do you have any specific scent preferences or sensitivities we should know about?",
      finalSummaryIntro: "Just one last thing before we connect you with the therapist — your (anonymous) answers help us improve. Thanks for making us better!",
      agreementThanks: "Thanks for making us better!",
      findingTherapist: "We'll now find the perfect therapist for you.",
      representativeContact: "A representative will be contacting you shortly at",
      therapistCard: {
        chatPrivately: "Chat Privately",
        reviews: "reviews"
      },
      coordinateMessage: "We'll coordinate with the therapist to ensure the session is smooth and enjoyable.",
      finalSummaryHeader: "Final Summary",
      ratingComplete: "Thank you for your feedback! It is safe now to close the conversation.",
      sessionComplete: "I've provided all the information I have for now. If you'd like to start a new search, you can say 'Start Over'.",
      contactValidationError: "Please provide a valid phone number (e.g., +1234567890) or Telegram handle (starting with @)",
      selectFromOptions: "Please select from the available options or provide a clear response:",
      provideClearResponse: "Let's try again. Please provide a clear response to the question."
    },
    contactModal: {
      title: "Contact Us",
      name: "Name",
      email: "Email",
      phone: "Phone (optional)",
      message: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      phonePlaceholder: "Your phone number",
      messagePlaceholder: "How can we help you?",
      sendMessage: "Send Message",
      sending: "Sending...",
      messageSent: "Message Sent!",
      getBackSoon: "We'll get back to you shortly.",
      autoClose: "This window will close automatically..."
    },
    preferenceLabels: {
      mood: "Current Mood",
      wantsResearchInfo: "Interested in Research",
      wantsToExperience: "Wants to Experience Protocol",
      bringsHereToday: "Reason for Visit",
      treatmentMatters: "What Matters in Treatment",
      touchStyle: "Preferred Touch Style",
      therapistPreference: "Therapist Preference",
      sessionLocation: "Session Location",
      locationLive: "Where You Live",
      preferredTime: "Preferred Time",
      conversationStyle: "Session Atmosphere",
      additionalNotes: "Additional Notes",
      budget: "Budget",
      scentPreferences: "Scent Preferences",
      contactInfo: "Contact Information"
    },
    therapistSpecialties: {
      deepTissue: "Deep tissue, science-based Therapeutic scent™",
      swedish: "Swedish massage, science-based Therapeutic scent™",
      sports: "Sports massage, science-based Therapeutic scent™"
    },
    therapistDescriptions: {
      holisticDeep: "Holistic & Deep Tissue Specialist",
      swedishRelaxation: "Swedish & Relaxation Specialist",
      sportsRecovery: "Sports & Injury Recovery"
    },
    availability: {
      today: "Available today",
      tomorrow: "Available tomorrow"
    },
    services: {
      massage60: "60 min massage",
      massage90: "90 min massage",
      sportsMassage60: "60 min sports massage"
    },
    researchModal: {
      title: "Scientific Research on Therapeutic Massage with Therapeutic Scents",
      results: {
        title: "Research Results:",
        items: {
          cortisol: "Cortisol levels (stress hormone) reduced by 23% on average",
          sleep: "Sleep quality improvement - 31% of participants reported better sleep",
          anxiety: "Anxiety and stress reduction - 45% of participants felt more relaxed",
          muscle: "Muscle tension relief - The combination of massage and scents proved twice as effective"
        }
      },
      howItWorks: {
        title: "How does it work?",
        description: "Research has shown that specific scent molecules activate the limbic system in the brain, which is responsible for regulating stress and emotions. When combined with therapeutic massage, a synergy is created that enhances the therapeutic benefits of both treatments."
      },
      protocol: {
        title: "Our Protocol:",
        description: "We use a personalized protocol based on your personal scent preferences, combined with advanced massage techniques. Each session is tailored to your specific needs."
      },
      buttons: {
        interested: "Yes, this sounds interesting! Let's continue",
        notInterested: "No, I'm interested in regular massage"
      },
      readMore: "Read the full research",
      interestedResponse: "Great! Does this sound like something you would like to experience? If so, I'd be happy to connect you with the right therapist. If not, let's find the exact type of massage that suits you.",
      notInterestedResponse: "No problem! Let's find the exact type of massage that suits you."
    }
  },
  he: {
    testimonials: {
        articles: [
          {
            title: "ד\"ר שרה מיטשל",
            subtitle: "מנהלת מחקר קליני",
            content: "ארומתרפיה בשילוב עם עיסוי טיפולי הוכח כמפחיתה משמעותית את רמות הקורטיזול ומשפרת את איכות השינה במחקרים קליניים.\nהגישה המותאמת אישית לבחירת ריחות מחזקת את היתרונות הטיפוליים.",
            rating: 5
          },
          {
            title: "ד\"ר מייקל צ'ן",
            subtitle: "חוקר נוירו-מדע",
            content: "המחקר שלנו מצביע על כך שמולקולות ריח ספציפיות יכולות להפעיל את המערכת הלימבית, מה שמוביל להפחתה של 45% בסמני החרדה כשהן משולבות עם טכניקות עיסוי ממוקדות.",
            rating: 5
          },
          {
            title: "ד\"ר אמילי רוברטס",
            subtitle: "מומחית לבריאות הוליסטית",
            content: "הסינרגיה בין עיסוי טיפולי לבין ריחות מותאמים אישית ומבוססי מדע היא עמוקה.\nבחנו עלייה של פי 2.3 בהקלה על מתח שרירים בהשוואה לעיסוי בלבד.",
            rating: 5
          }
        ],
      title: 'מה המדע אומר',
    },
    footer: {
      copyright: '© 2024 Therapeutic Scents™.\nכל הזכויות שמורות לקבוצה של תומר המעסה. אם אתם רוצים להצטרף לקבוצה שלנו, צרו קשר בטלפון  09-7961414 או בוואצאפ 0547451527',
      disclaimer: 'שירות זה מיועד למטרות רווחה אישית (Well Being) ואינו מהווה ייעוץ רפואי.',
    },
    services: {
      massage60: 'עיסוי 60 דקות',
      sportsMassage60: 'עיסוי ספורט 60 דקות',
      massage90: 'עיסוי 90 דקות',
    },
    chat: {
      representativeContact: 'נציג ייצור איתך קשר בקרוב במספר',
      additionalNotesQuestion: 'שאלה 14: האם יש משהו נוסף שאתה רוצה שהמטפל ידע?',
        timeOptions: ['מחפש לעכשיו', 'בוקר', 'צהריים', 'ערב', 'לילה מאוחר'],
      recommendationIntro: 'שאלה 18: בהתבסס על ההעדפות שלך, הנה מטפל שאני ממליץ עליו:',
      therapistCard: {
        chatPrivately: 'שוחח בפרטיות',
        reviews: 'ביקורות',
      },
      continue: 'המשך',
      copied: 'הועתק!',
      copyMessage: 'העתק הודעה',
        touchStyleOptions: ['עמוק וחזק', 'עדין ורך', 'איננטואיטיבי-הגוף כבר ידבר'],
      scentQuestion: 'האם יש לך העדפות ריח ספציפיות או רגישויות שעלינו לדעת עליהן?',
      experienceInterest: 'שאלה 5: האם זה נשמע כמו טיפול שהית רוצה לחוות?',
      experienceQuestion: 'שאלה 5: האם זה נשמע כמו משהו שהיית רוצה לחוות?',
      experienceYes: 'מעולה! נציג יתקשר אליך בקרוב. מה מספר הטלפון או הטלגרם שלך?',
      finalSummaryHeader: 'סיכום השיחה',
      contactRepresentative: 'מצוין. נציג ייצור איתך קשר בקרוב ',
      researchNo: 'נהדר! הנה סיכום המחקר...',
      therapistContactQuestion: 'מה מספר הטלפון או פרטי הטלגרם שלך כדי שהמטפל יוכל ליצור איתך קשר?',
      moodQuestion: 'שאלה 3: מה שלומך היום?',
      budgetQuestion: 'שאלה 17: חשוב לנו לתת ללקוחות את הטיפול שהם מחפשים במחיר שהם מחפשים.\nכמה הית מעונין לשלם על הטיפול?',
      ratingQuestion: 'שאלה 19: איך הייתה החוויה שלך עם מיגל עד כה?',
      atmosphereQuestion: 'שאלה 13: איזו אווירה תרצה במהלך העיסוי?',
      bringsHereOptions: {
        therapist: 'אני מטפל מוסמך',
        trainee: 'אני מתמחה שמחפש לתרגל',
        consult: 'אני רק צריך להתייעץ ולדבר',
        massage: 'אני מעוניין בעיסוי מקצועי',
        more: 'עוד אפשרויות',
      },
      researchOptions: {
        interested: 'אני מעוניין ללמוד עוד על הגישה המתקדמת הזו.',
        different: 'אני מעדיף לשמוע על עיסויים אחרים ',
      },
      researchQuestion: 'אני מעוניין ללמוד עוד על הגישה המשופרת הזו.',
      researchYes: 'אני מעוניין בפרטים על עיסוי מסוג שונה',
        treatmentMattersOptions: [
          'יש לי קושי לישון',
          'אני צריך להירגע ולהתאזן',
          'אני מתאמן הרבה ומרגיש תפוס',
          'הגוף והנפש שלי זקוקים לשחרור עמוק',
          'חסר לי מגע לאחרונה -🙁',
          'עוד',
        ],
      uniqueExperience: 'שאלה 6: אנחנו רוצים לתת לך חוויה ייחודית מותאמת אישית שבאמת עונה על הצרכים שלך.',
      bringsHereMore: 'על מנת לתת לך חוויה מותאמת אישית לך, אשמח לשמוע מה אתה מחפש בעיסוי ומה מחפש במעסה',
      consultContact: 'בוא נעבור לשיחה פרטית. מה מספר הטלפון או הטלגרם שלך? ',
      assistantIntroduction: 'שאלה 4: אני מיגל, העוזר האישי מבוסס בינה מלאכותית של תומר. הערכים המרכזיים שלנו: דיסקרטיות, כבוד הדדי ומתן ערך אמיתי.\nהאם ידעת שמחקרים מראים כי ניתן להפחית מתח, חרדה ולשפר את איכות השינה באמצעות שמנים ארומתרפיים?',
      researchIntro: 'שאלה 4: אני מיגל, העוזר האישי מבוסס בינה מלאכותית של תומר.\nהערכים המרכזיים שלנו: דיסקרטיות, כבוד הדדי ומתן ערך אמיתי. האם ידעת שמחקרים מראים כי ניתן להפחית מתח, חרדה ולשפר את איכות השינה באמצעות שמנים ארומתרפיים?',
      sessionComplete: 'סיפקתי את כל המידע שיש לי כרגע.\nאם תרצה להתחיל חיפוש חדש, אתה יכול לומר \'התחל מחדש\'.',
      finalSummaryIntro: 'רק דבר אחרון לפני שנחבר אותך למטפל — התשובות שלך (האנונימיות) עוזרות לנו להשתפר. תודה שאתה עוזר לנו להיות טובים יותר!',
      welcome: 'שאלה 1: בוא נמצא את המטפל והטיפול שמתאימים בדיוק עבורך',
      provideClearResponse: 'משהו לא ברור לי. נסה שוב. אנא ספק תשובה ברורה לשאלה.',
        locationOptions: ['בבית שלי', 'בקליניקה של המטפל', 'גמיש'],
      introduction: 'שאלה 2: נעים להכיר! אני תומר – מטפל מקצועי ומנהל קבוצת מטפלים ברחבי הארץ. אם אתה מטפל \nשמחפש לפתח את העסק שלך במודל עסקי חדש ולייצר לך הכנסה פסיבית, אנא צור קשר בוואצאפ 0547451527 או בטלפון 09-7961414 או ענו למטה "אני מטפל".',
        therapistPrefOptions: ['אין לי העדפה', 'אישה', 'גבר'],
      experienceOptions: {
        no: 'לא, זה לא בשבילי',
        yes: 'כן, בהחלט',
      },
      scentOptions: {
        no: 'לא, תודה',
        yes: 'כן, בבקשה',
      },
      continueConversation: 'בוא נמשיך היכן שעצרנו....',
      summaryIntro: 'הנה סיכום של מה שהבנתי ממך: ',
      humanSupport: 'כמובן. אתה יכול לפנות אלינו במייל tomermassageandfist@gmail.com או להתקשר 09-7961414 או לוואצאפ 0547451527 ',
      emptyInputResponse: 'אופס,  אני עוזר אישי מבוסס בינה מלאכותית ותומר לא אימן אותי לזה 😅.. תוכל לכתוב שוב? ',
      errorGeneral: 'אופס,  אני עוזר אישי מבוסס בינה מלאכותית ותומר לא אימן אותי לזה 😅.. תוכל לכתוב שוב? ',
      contactInvalid: 'אנא ציין מה מספר הטלפון (למשל, 0547451527) או כתובת טלגרם (שמתחילה ב-@)',
      contactValidation: 'אנא ציין מה מספר הטלפון (למשל, 0547451527) או כתובת טלגרם (שמתחילה ב-@)',
      contactValidationError: 'אנא ציין מה מספר הטלפון (למשל, 0547451527) או כתובת טלגרם (שמתחילה ב-@)',
      selectFromOptions: 'אנא בחר מהאפשרויות הזמינות או ספק תשובה ברורה:',
      timeQuestion: 'שאלה 11: זמן מועדף?',
      scentIntroQuestion: 'שאלה 15: מחקרים מראים שטיפול בשמנים ארומתרפים מסויימים מסייעים בהפגת מתחים, הרפיית שרירים, שיפור השינה וההרגשה הכללית. רוצים טיפול ארומתרפי מבוסס מדע מותאם אישית? ',
      locationQuestion: 'שאלה 10: מיקום הטיפול',
        atmosphereOptions: [
          'הרפיה שקטה – שקט מוחלט למדיטציה עמוקה',
          'שיחה נעימה – שיחה ידידותית עם המטפל',
          'אווירת ג\'אז – מוזיקת ג\'אז נעימה לאורך כל הטיפול',
          'תרפיית טבע – קולות מים וציפורים מרגיעים',
          'בלי מוזיקה',
        ],
      treatmentMattersQuestion: 'שאלה 7: ספר לנו מה הכי חשוב לך בטיפול או במטפל. ככל שתשתף יותר, כך נוכל להתאים לך בצורה \nטובה יותר את החוויה המושלמת. אנא בחר אפשרות אחת או יותר מהאפשרויות הבאות או כתוב תשובה משלך.',
      scentPrefsQuestion: 'שאלה 16: ספר לנו מה הבשמים האהובים עליך- זה יעזור לנו להכיר את סגנון הריח שלך ולרקוח ניחוח פונקציונלי יעיל ונעים עבור הטיפול שלך',
      bringsHereOther: 'תודה על השיתוף. אנחנו רוצים לתת לך חוויה ייחודית שבאמת עונה על הצרכים שלך.',
      ratingComplete: 'תודה על המשוב! כעת ניתן לסגור את השיחה בבטחה.',
      ratingThanks: 'תודה על המשוב! כעת ניתן לסגור את השיחה בבטחה.',
      contactConfirmation: 'תודה.  ניצור קשר בקרוב ב-',
      contactThankYou: 'תודה. ניצור איתך קשר בקרוב ב-',
      agreementThanks: 'תודה שאתה עוזר לנו להיות טובים יותר!',
      therapistPrefQuestion: 'שאלה 9: העדפה למטפל?',
      contactQuestion: 'שאלה 16: כדי לחבר אותך עם המטפל המתאים ביותר, אנא השאר מספר טלפון או שם משתמש בטלגרם ליצירת קשר.',
      bringsHereQuestion: 'שאלה 6: כדי ליצור טיפול שמתאים בדיוק עבורך, ספר לנו מה הביא אותך לכאן היום.',
      touchStyleQuestion: 'שאלה 8: סגנון מגע?',
      placeholder: 'הקלד את ההודעה שלך...',
      experienceNo: 'שאלה 5: כדי ליצור טיפול שמותאם לך באופן אישי, אשמח לשמוע מה בדיוק אתה מחפש בעיסוי ',
      summaryEmpty: 'עדיין לא אספנו מספיק מידע עבור סיכום.',
      discretionResponse: 'אנחנו מכבדים דסקרטיות.\nתוכל להשאיר פרטי התקשרות או ליצור קשר בחיוג חסוי לקליניקה ל 09-7961414.\nבנוסף ניתן ליצור קשר בטלגרם של תומר @TOMMERMASSAGE או בוואצאפ 0547451527 ',
      coordinateMessage: 'נתאם את הציפיות עם המטפל כדי להבטיח שהטיפול יהיה מושלם.',
      findingTherapist: 'עכשיו נמצא עבורך את המטפל המושלם עבורך.',
      locationLiveQuestion: 'שאלה 12: איפה אתה גר?',
      treatmentMattersMore: 'בחרת \'עוד\'. אשמח שתפרט?',
      title: 'העוזר החכם שלך',
    },
    preferenceLabels: {
      additionalNotes: 'מה תרצה להוסיף?',
      budget: 'חשוב לנו לתת ללקוחות את הטיפול שהם מחפשים במחיר שהם מחפשים.\nכמה הית מעונין לשלם על הטיפול?',
      contactInfo: 'פרטי קשר',
      mood: 'מצב רוח נוכחי',
      wantsResearchInfo: 'מתעניין במחקר',
      preferredTime: 'שעות מועדפות',
      touchStyle: 'סגנון מגע מועדף',
      bringsHereToday: 'סיבת ההגעה',
      scentPreferences: 'העדפות ריח',
      conversationStyle: 'אווירת טיפול',
      sessionLocation: 'מיקום הטיפול',
      therapistPreference: 'העדפת מטפל',
      wantsToExperience: 'רוצה לחוות את הפרוטוקול',
      treatmentMatters: 'מה חשוב לך בטיפול',
      locationLive: 'היכן יתבצע הטיפול? זה יאפשר לי להבין מי המטפל הקרוב אליך ',
    },
    howItWorks: {
      steps: {
        aiAssessment: {
          title: 'הערכת צ\'אט מבוססת בינה מלאכותית',
          description: 'ספרו למיגל , העוזר האישי מבוסס בינה מאלכותית על הצרכים הבריאותיים \nשלכם, העדפות הריח ומטרות הטיפול דרך ממשק צ\'אט אינטואיטיבי.',
        },
        bookRelax: {
          title: 'הזמן תור והירגע',
          description: 'דבר ישירות עם המטפל שהותאם לך דרך וואטסאפ או טלגרם לתיאום טיפול',
        },
        smartMatching: {
          description: 'טכנולוגיית ההתאמה המתקדמת שלנו מחברת אותך עם מטפל מוסמך וטיפול שמתאים לך.\nיש גם אפשרות לריח ארומתרפי מותאם אישית בהתבסס על מחקרים מדעיים במטרה לתמוך ולהעצים את המטרות הטיפוליות שלך',
          title: 'התאמה חכמה',
        },
      },
      getMatchesNow: 'קבל המלצות מותאמות אישית',
      title: 'איך המערכת החכמה שלנו עובדת',
    },
    hero: {
      title: 'טיפול עיסוי מבוסס בינה מלאכותית להפחתת סטרס ולשיפור איכות השינה באמצעות "ריחות מטפלים" מבוססי מדע.',
      startJourney: 'התחל את המסע לשלוות גוף ונפש ',
      subtitle: 'הזמינו טיפול עיסוי מותאם אישית עם ריח מטפל המבוסס על בינה מלאכותית וארומתרפיה מדעית מתקדמת לחיזוק חווית הטיפול.',
    },
    researchModal: {
      results: {
        items: {
          anxiety: 'הפחתת חרדה ומתח ב-45% מהמשתתפים הרגישו רגועים יותר',
          cortisol: 'הפחתת רמות הקורטיזול (הורמון הלחץ) ב-23% בממוצע',
          muscle: 'הרפיית מערכת העצבים ושיחרור שרירים -השילוב של ריחות ארומתרפים ועיסוי הוכחו מדעית כאפקטיבים ',
          sleep: 'שיפור איכות השינה ב-31% מהמשתתפים דיווחו על שינה טובה יותר',
        },
        title: 'תוצאות המחקר:',
      },
      interestedResponse: 'זה נשמע כמו משהו שתרצה לחוות? אם כן, אשמח לחבר אותך למטפל המתאים. אם \nלא, בואו נמצא לך את סוג העיסוי שמתאים לך בדיוק.',
      howItWorks: {
        title: 'איך זה עובד?',
        description: 'מחקרים רבים מראים כי שמנים ארומתרפים מעוררים את המערכת הלימבית במוח, האחראית על רגולציה של לחץ ורגשות. כשמשלבים זאת עם עיסוי , נוצרת סינרגיה שמגבירה את היתרונות הטיפוליים \nשל שני הטיפולים.',
      },
      notInterestedResponse: 'אין בעיה. אשמח לשמוע מה חשוב לך בעיסוי ולמצוא לך את הטיפול והמטפל המתאימים לך',
      buttons: {
        notInterested: 'לא, אני מעוניין בעיסוי מסוג אחר ',
        interested: 'כן, זה נשמע מעניין! בואו נמשיך',
      },
      protocol: {
        title: 'הפרוטוקול שלנו:',
        description: 'אנחנו משתמשים בפרוטוקול מדעי מותאם אישית שמבוסס על העדפות הריח האישיות שלך, בשילוב עם טכניקות עיסוי מתקדמות. כל פגישה מותאמת לצרכים הספציפיים שלך.',
      },
      readMore: 'קרא את המחקר המלא',
      title: 'מחקר מדעי על עיסוי טיפולי עם ריחות טיפוליים',
    },
    finalCta: {
      chatButton: 'שוחח עם מיגל, העוזר החכם שלנו',
      title: 'מוכן לחוויה משפרת איכות חיים?',
      description: 'המסע שלך להרפייה ורווחה ממש כאן.\nמיגל העוזר החכם שלנו ידריך אותך לטיפול המושלם',
    },
    header: {
      contact: 'צור קשר',
      title: 'ריחות מטפלים™',
    },
    contactModal: {
      title: 'צור קשר',
      email: 'אימייל',
      messagePlaceholder: 'איך נוכל לעזור לך?',
      message: 'הודעה',
      messageSent: 'ההודעה נשלחה!',
      name: 'שם',
      phone: 'טלפון (אופציונלי)',
      sendMessage: 'שלח הודעה',
      sending: 'שולח...',
      autoClose: 'חלון זה ייסגר אוטומטית...',
      getBackSoon: 'נחזור אליך בקרוב.',
      namePlaceholder: 'שמך',
      phonePlaceholder: 'מספר הטלפון שלך',
      emailPlaceholder: 'your@email.com',
    },
    availability: {
      today: 'זמין היום',
      tomorrow: 'זמין מחר',
    },
    therapistSpecialties: {
      deepTissue: 'עיסוי רקמות עמוק עם טיפול ארומתרפי מבוסס מדע ',
      sports: 'עיסוי ספורטיבי משולב ריח ארומתרפי מבוסס מדע',
      swedish: 'עיסוי שוודי משולב ריחות ארומתרפפים מבוססי מדע ומחקר',
    },
    benefits: {
        items: [
          'הפחתת לחץ',
          'שיפור איכות השינה',
          'הרפיית מתח השרירים',
          'שיפור מצב הרוח והתחושה הכללית',
        ],
      description: 'הגישה הייחודית שלנו משלבת את החוכמה העתיקה של ארומתרפיה עם מדעי המוח ובינה מלאכותית ליצירת חוויה טיפולית מותאמת אישית.\nכל ריח פותח תוך כדי יצירת סינרגיה עם העיסוי תוך התמקדות במטרות הטיפול הספציפיות שלכם.',
      title: 'היתרונות של ארומתרפיה מבוססת מדע מותאמת אישית',
    },
    therapistDescriptions: {
      holisticDeep: 'התמחות בעיסוי הוליסטי ורקמות עמוק',
      sportsRecovery: 'התמחות בעיסוי ספורט ושיקום פציעות',
      swedishRelaxation: 'התמחות בעיסוי שוודי והרפיה',
    },
  },
};