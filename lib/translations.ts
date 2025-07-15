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
      copyright: "© 2024 Therapeutic Scents™. All rights reserved to Tomer Massage Group. If you want to join our group, contact +972547451527",
      disclaimer: "This service is intended for wellness purposes and does not constitute medical advice."
    },
    chat: {
      title: "Your AI Assistant",
      placeholder: "Type your message...",
      continue: "Continue",
      copyMessage: "Copy message",
      copied: "Copied!",
      welcome: "Let's find the therapist and therapy that's just right for you…",
      introduction: "Nice to meet you! I'm Tomer – a professional massage therapist and coordinator between skilled therapists and clients seeking unique experiences across the country. If you're a therapist looking to grow your business, feel free to reach out at 09-7961414 or answer below, \"I am a therapist.\"",
      moodQuestion: "How are you today?",
      researchIntro: "I'm Miguel, Tomer's AI personal assistant. Our key values: discretion, mutual respect, and providing real value. Did you know that science shows massage therapy is effective in reducing stress and anxiety and improving sleep quality - especially when combined with specific scent molecules?",
      researchOptions: {
        interested: "I am interested in learning more about this enhanced approach.",
        different: "I prefer to explore different types of massage."
      },
      experienceQuestion: "Does this sound like something you would like to experience?",
      experienceOptions: {
        yes: "Yes, it does",
        no: "No, not for me"
      },
      bringsHereQuestion: "To create a session that truly suits you, please tell us what brings you here today.",
      bringsHereOptions: {
        therapist: "I am a certified therapist",
        trainee: "I am a trainee looking to practice",
        consult: "I just need to consult and talk",
        massage: "I would like to get a professional massage",
        more: "More"
      },
      treatmentMattersQuestion: "Tell us what matters most to you in a treatment or therapist. The more you share, the better we can match you with the perfect experience. Feel free to choose one or more of the following options or write your own answer.",
      treatmentMattersOptions: [
        "I have difficulty sleeping",
        "I need to relax and reset",
        "I work out a lot and feel tension",
        "My body and soul need a deep release",
        "I'm missing touch lately -🙁",
        "More"
      ],
      touchStyleQuestion: "Touch style?",
      touchStyleOptions: ["Deep and strong", "Gentle and soft", "Intuitive"],
      therapistPrefQuestion: "Therapist preference?",
      therapistPrefOptions: ["No preference", "Woman", "Man"],
      locationQuestion: "Session location?",
      locationOptions: ["My place", "Therapist's studio", "Flexible"],
      timeQuestion: "Preferred time?",
      timeOptions: ["Available now", "Morning", "Afternoon", "Evening", "Late night"],
      locationLiveQuestion: "Where do you live?",
      atmosphereQuestion: "How would you like your massage session atmosphere?",
      atmosphereOptions: [
        "Silent relaxation - Pure quiet for deep meditation",
        "Casual chat - Friendly conversation with your therapist",
        "Jazz ambiance - Smooth jazz music throughout the session",
        "Nature therapy - Soothing sounds of water and birds",
        "No music"
      ],
      additionalNotesQuestion: "Anything else you'd like your therapist to know about what makes you feel good?",
      scentIntroQuestion: "Science has shown that certain scent molecules can help ease muscle tension, reduce Cortisol levels and boost relaxation. Want us to create a custom therapeutic scent just for you, based on real science?",
      scentOptions: {
        yes: "Yes, please",
        no: "No, thanks"
      },
      scentPrefsQuestion: "Tell us your favourite perfumes — it'll help us get to know your scent vibe and design an effective and pleasing functional scent for your session",
      contactQuestion: "To connect you with the perfect therapist, please provide your phone number or Telegram handle so we can reach you.",
      contactValidation: "Please provide a valid phone number (e.g., +1234567890) or Telegram handle (starting with @)",
      contactConfirmation: "Thank you! We'll be in touch shortly at",
      recommendationIntro: "Based on your preferences, here's a therapist we recommend for you:",
      ratingQuestion: "How was your experience with us so far?",
      ratingThanks: "Thank you for your feedback! It is safe now to close the conversation.",
      errorGeneral: "Oops, Tomer didn't prepare me for that one 😅. I am a generative AI personal assistant. Please provide a response.",
      discretionResponse: "We understand your need for discretion. We only use Telegram for communication and can arrange calls from a private number to our office at 09-7961414.",
      continueConversation: "Now, to continue where we left off...",
      emptyInputResponse: "Oops, Tomer didn't prepare me for that one 😅. I am a generative AI personal assistant. Please provide a response.",
      summaryIntro: "Of course! Here's a summary of your preferences so far:",
      summaryEmpty: "We haven't gathered enough information for a summary yet.",
      humanSupport: "Of course. You can reach our support team at support@thera-scent.com or call us at +1-234-567-890.",
      therapistContactQuestion: "Great! Please provide your phone number or Telegram handle so we can reach you.",
      contactInvalid: "Please provide a valid phone number (e.g., +1234567890) or Telegram handle (starting with @)",
      contactThankYou: "Thank you! We'll be in touch shortly at",
      contactRepresentative: "Got it. A representative will contact you soon. Thank you!",
      consultContact: "I understand. Let's move this to a more private chat. Please provide your phone number or Telegram handle so we can reach you.",
      assistantIntroduction: "I'm Miguel, Tomer's AI personal assistant. Our key values: discretion, mutual respect, and providing real value. Did you know that science shows massage therapy is effective in reducing stress and anxiety and improving sleep quality - especially when combined with specific scent molecules?",
      researchQuestion: "I am interested in learning more about this enhanced approach.",
      researchYes: "I prefer to explore different types of massage.",
      researchNo: "Great! Here's a summary of the research...",
      experienceInterest: "Does this sound like something you would like to experience?",
      experienceYes: "Excellent! A representative will call you shortly. What is your phone number or Telegram handle?",
      experienceNo: "Understood. To create a session that truly suits you, please tell us what brings you here today.",
      bringsHereMore: "I see. Could you please tell me a bit more about what brings you here today?",
      bringsHereOther: "Thank you for sharing. We want to give you a unique experience that truly meets your needs.",
      uniqueExperience: "I see- that's cool…. We want to give you a unique experience that truly meets your needs.",
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
    header: {
      title: "ניחוחות טיפוליים™",
      contact: "צור קשר"
    },
    hero: {
      title: "טיפול עיסוי מבוסס בינה מלאכותית להפחתת סטרס ולשיפור איכות השינה באמצעות ניחוחות טיפוליים בהשראת המדע.",
      subtitle: "הזמינו טיפול עיסוי מותאם אישית עם ניחוח טיפולי™ המבוסס על בינה מלאכותית וארומתרפיה מדעית מתקדמת לחיזוק חווית הטיפול.",
      startJourney: "התחל את המסע שלי"
    },
    howItWorks: {
      title: "איך המערכת החכמה שלנו עובדת",
      steps: {
        aiAssessment: {
          title: "הערכת צ'אט מבוססת בינה מלאכותית",
          description: "ספרו לבינה המלאכותית שלנו על הצרכים הבריאותיים שלכם, העדפות הריח ומטרות הטיפול דרך ממשק צ'אט אינטואיטיבי."
        },
        smartMatching: {
          title: "התאמה חכמה",
          description: "טכנולוגיית ההתאמה המתקדמת שלנו מחברת אותכם עם מטפל מוסמך וטיפול שמתאים לכם בדיוק, בתוספת תערובת ארומתרפיה מותאמת אישית המבוססת על מדע ומיועדת לשפר את המטרות הטיפוליות שלכם"
        },
        bookRelax: {
          title: "הזמנה והרפיה",
          description: "התחברו ישירות עם המטפל שהותאם לכם דרך וואטסאפ או טלגרם וקבעו את הפגישה המותאמת אישית שלכם."
        }
      },
      getMatchesNow: "מצא התאמות עכשיו"
    },
    testimonials: {
      title: "מה המדע אומר",
      articles: [
        {
          title: "ד\"ר שרה מיטשל",
          subtitle: "מנהלת מחקר קליני",
          content: "ארומתרפיה בשילוב עם עיסוי טיפולי הוכח כמפחיתה משמעותית את רמות הקורטיזול ומשפרת את איכות השינה במחקרים קליניים. הגישה המותאמת אישית לבחירת ריחות מחזקת את היתרונות הטיפוליים.",
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
          content: "הסינרגיה בין עיסוי טיפולי לבין ריחות מותאמים אישית ומבוססי מדע היא עמוקה. בחנו עלייה של פי 2.3 בהקלה על מתח שרירים בהשוואה לעיסוי בלבד.",
          rating: 5
        }
      ]
    },
    benefits: {
      title: "היתרונות של ארומתרפיה מותאמת אישית",
      description: "הגישה הייחודית שלנו משלבת את החוכמה העתיקה של ארומתרפיה עם בינה מלאכותית מודרנית ליצירת חוויה טיפולית מותאמת אישית באמת. כל תערובת ריחות מעוצבת לפעול בסינרגיה עם העיסוי שלכם, תוך התמקדות במטרות הבריאותיות הספציפיות שלכם.",
      items: [
        "הפחתת סטרס מוגברת",
        "שיפור איכות השינה",
        "הקלה ממוקדת בשרירים",
        "שיפור מצב הרוח והתחושה הכללית"
      ]
    },
    finalCta: {
      title: "מוכן לחוויה משנת חיים?",
      description: "המסע שלכם אל הרפיה ורווחה הוא רק שיחה אחת משם. בואו העוזר החכם שלנו ידריך אתכם לפגישת הטיפול המושלמת.",
      chatButton: "שוחח עם העוזר החכם שלנו"
    },
    footer: {
      copyright: "© 2024 ניחוחות טיפוליים™. כל הזכויות שמורות לקבוצת תומר עיסוי. אם אתם רוצים להצטרף לקבוצה שלנו, צרו קשר בטלפון +972547451527",
      disclaimer: "שירות זה מיועד למטרות רווחה ואינו מהווה ייעוץ רפואי."
    },
    chat: {
      title: "העוזר החכם שלך",
      placeholder: "הקלד את ההודעה שלך...",
      continue: "המשך",
      copyMessage: "העתק הודעה",
      copied: "הועתק!",
      welcome: "בוא נמצא את המטפל והטיפול שמתאימים בדיוק עבורך…",
      introduction: "נעים להכיר! אני מיגל, הבוט החכם של תומר. תומר הוא מעסה מקצועי ומנהל קבוצת מטפלים ברחבי הארץ לטיפולי עיסוי ייחודיים. . אם את/ה מטפל/ת שמחפש/ת לפתח את העסק שלכם במודל עסקי חדש, אנא צרו קשר בטלפון 09-7961414 או ענה/י  למטה \"אני מטפל/ת\".",
      moodQuestion: "מה שלומך היום?",
      researchIntro: "אני מיגל, העוזר האישי של תומר המבוסס על בינה מלאכותית. הערכים המרכזיים שלנו: דיסקרטיות, כבוד הדדי ומתן ערך אמיתי. האם ידעת שהמדע מראה שעיסוי טיפולי יעיל בהפחתת סטרס וחרדה ובשיפור איכות השינה - במיוחד כשמשלבים אותו עם מולקולות ריח ספציפיות?",
      researchOptions: {
        interested: "אני מתעניין ללמוד יותר על הגישה המשופרת הזו.",
        different: "אני מעדיף לבחון סוגים שונים של עיסוי."
      },
      experienceQuestion: "זה נשמע כמו משהו שתרצה לחוות?",
      experienceOptions: {
        yes: "כן, זה כן",
        no: "לא, זה לא בשבילי"
      },
      bringsHereQuestion: "כדי ליצור טיפול שמתאים בדיוק עבורך, ספר לנו מה הביא אותך לכאן היום.",
      bringsHereOptions: {
        therapist: "אני מטפל מוסמך",
        trainee: "אני מתמחה שמחפש לתרגל",
        consult: "אני רק צריך להתייעץ ולדבר",
        massage: "אני מעוניין בעיסוי מקצועי",
        more: "עוד אפשרויות"
      },
      treatmentMattersQuestion: "חשוב לנו שתצא מרוצה. ספר לנו מה הכי חשוב לך בטיפול או במטפל. ככל שתשתף יותר, כך נוכל להתאים לך בצורה טובה יותר את החוויה המושלמת. אנא בחר אפשרות אחת או יותר מהאפשרויות הבאות או כתוב תשובה משלך.",
      treatmentMattersOptions: [
        "יש לי קושי לישון",
        "אני צריך להירגע ולהתאזן",
        "אני מתאמן הרבה ומרגיש מתיחות",
        "הגוף והנפש שלי זקוקים לשחרור עמוק",
        "חסר לי מגע לאחרונה -🙁",
        "עוד"
      ],
      touchStyleQuestion: "סגנון מגע?",
      touchStyleOptions: ["עמוק וחזק", "עדין ורך", "אינטואיטיבי"],
      therapistPrefQuestion: "העדפה למטפל?",
      therapistPrefOptions: ["אין לי העדפה", "אישה", "גבר"],
      locationQuestion: "מיקום הטיפול?",
      locationOptions: ["בבית שלי", "בסטודיו של המטפל", "גמיש"],
      timeQuestion: "זמן מועדף?",
      timeOptions: ["זמין עכשיו", "בוקר", "צהריים", "ערב", "לילה מאוחר"],
      locationLiveQuestion: "איפה אתה גר?",
      atmosphereQuestion: "איך היית רוצה שתהיה האווירה במהלך העיסוי?",
      atmosphereOptions: [
        "הרפיה שקטה – שקט מוחלט למדיטציה עמוקה",
        "שיחה נעימה – שיחה ידידותית עם המטפל",
        "אווירת ג'אז – מוזיקת ג'אז נעימה לאורך כל הטיפול",
        "תרפיית טבע – קולות מים וציפורים מרגיעים",
        "בלי מוזיקה"
      ],
      additionalNotesQuestion: "יש משהו נוסף שהיית רוצה שהמטפל ידע עליך כדי שתהיה מרוצה?",
      scentIntroQuestion: "מחקרים מראים שיש שמנים שיכולים לעזור בהפגת מתחים בשרירים, הפחתת רמות קורטיזול ושיפור ההרפיה. רוצה שניצור עבורך ניחוח טיפולי מותאם אישית, מבוסס על מדע אמיתי?",
      scentOptions: {
        yes: "כן, בבקשה",
        no: "לא, תודה"
      },
      scentPrefsQuestion: "ספר לנו מהם הבשמים האהובים עליך — זה יעזור לנו להכיר את סגנון הריח שלך ולרקוח את הגוון של הריח הפונקציונאלי המתאים לך",
      contactQuestion: "כדי לחבר אותך עם המטפל המתאים ביותר, אנא השאר מספר טלפון או שם משתמש בטלגרם ליצירת קשר.",
      contactValidation: "נא להזין מספר טלפון תקני (למשל +972...) או שם משתמש בטלגרם (שמתחיל ב־@)",
      contactConfirmation: "תודה! ניצור קשר בקרוב בכתובת",
      recommendationIntro: "בהתבסס על ההעדפות שלך, הנה מטפל שאנחנו ממליצים עליו:",
      ratingQuestion: "איך הייתה החוויה שלך איתנו עד עכשיו?",
      ratingThanks: "תודה על המשוב! כעת ניתן לסגור את השיחה בבטחה.",
      errorGeneral: "אופס, תומר לא הכין אותי לזה 😅 אני עוזר אישי מבוסס בינה מלאכותית. אנא נסח תשובה אחרת.",
      discretionResponse: "אנחנו מבינים את הצורך שלך בדיסקרטיות. אנו משתמשים רק בטלגרם לתקשורת וניתן לקבוע שיחות טלפון דרך מספר חסוי לקליניקה בטלפון 09-7961414.",
      continueConversation: "עכשיו, כדי להמשיך מאיפה שהפסקנו...",
      emptyInputResponse: "אופס, תומר לא הכין אותי לזה 😅. אני עוזר AI אישי בינה מלאכותית. אנא ספק תשובה.",
      summaryIntro: "כמובן! הנה סיכום ההעדפות שלך עד כה:",
      summaryEmpty: "עדיין לא אספנו מספיק מידע עבור סיכום.",
      humanSupport: "כמובן. אתה יכול לפנות לצוות התמיכה שלנו בטלפון 09-7961414",
      therapistContactQuestion: "נהדר! אנא ספק את מספר הטלפון או את הטלגרם שלך כדי שנוכל ליצור איתך קשר.",
      contactInvalid: "אנא ספק מספר טלפון תקין (למשל, +1234567890) או כתובת טלגרם (שמתחילה ב-@)",
      contactThankYou: "תודה! ניצור איתך קשר בקרוב ב-",
      contactRepresentative: "נציג ייצור איתך קשר בקרוב במספר",
      consultContact: "אני מבין. בואו נעביר את זה לצ'אט פרטי יותר. תוכל לציין את מספר הטלפון או הטלגרם שלך ליצירת קשר?",
      assistantIntroduction: "נעים להכיר! אני מיגל, הבוט החכם של תומר. תומר הוא מעסה מקצועי ומנהל קבוצת מטפלים ברחבי הארץ לטיפולי עיסוי ייחודיים. . אם את/ה מטפל/ת שמחפש/ת לפתח את העסק שלכם במודל עסקי חדש, אנא צרו קשר בטלפון 09-7961414 או ענה/י  למטה \"אני מטפל/ת\"",
      researchQuestion: "אני מתעניין ללמוד יותר על הגישה המשופרת הזו.",
      researchYes: "אני מעדיף לבחון סוגים שונים של עיסוי.",
      researchNo: "טוב! כאן סיכום המחקר...",
      experienceInterest: "זה נשמע כמו משהו שתרצה לחוות?",
      experienceYes: "מצוין! נציג יקרא אליך בקרוב. מהו מספר הטלפון או שם משתמש בטלגרם שלך?",
      experienceNo: "הבנתי. כדי ליצור סשן שבאמת מתאים לך, אנא ספר לנו מה הביא אותך לכאן היום.",
      bringsHereMore: "אני מבין. אתה יכול לספר לי קצת יותר על מה הביא אותך לכאן היום?",
      bringsHereOther: "תודה על השיתוף. אנחנו רוצים לתת לך חוויה ייחודית שבאמת עונה על הצרכים שלך.",
      uniqueExperience: "אנחנו רוצים לתת לך חוויה ייחודית שבאמת עונה על הצרכים שלך.",
      treatmentMattersMore: "בחרת 'עוד'. אתה יכול לציין מה עוד חשוב לך?",
      scentQuestion: "האם יש לך העדפות ריח ספציפיות או רגישויות שעלינו לדעת עליהן?",
      finalSummaryIntro: "רק דבר אחד אחרון לפני שנחבר אותך למטפל — התשובות שלך (האנונימיות) עוזרות לנו להשתפר. תודה שאתה עוזר לנו להיות טובים יותר!. כדי להתקדם לחץ על מקש האנטר ",
      agreementThanks: "תודה שאתה עוזר לנו להיות טובים יותר!",
      findingTherapist: "עכשיו נמצא עבורך את המטפל המושלם.",
      representativeContact: "נציג ייצור איתך קשר בקרוב במספר",
      therapistCard: {
        chatPrivately: "שוחח בפרטיות",
        reviews: "ביקורות"
      },
      coordinateMessage: "ניצור קשר עם המטפל כדי להבטיח שהטיפול יהיה מושלם.",
      finalSummaryHeader: "סיכום סופי",
      ratingComplete: "תודה על המשוב! כעת ניתן לסגור את השיחה בבטחה.",
      sessionComplete: "סיפקתי את כל המידע שיש לי כרגע. אם תרצה להתחיל חיפוש חדש, אתה יכול לומר 'התחל מחדש'.",
      contactValidationError: "נא לספק מספר טלפון תקין (למשל, +972123456789) או כתובת טלגרם (שמתחילה ב-@)",
      selectFromOptions: "אנא בחר מהאפשרויות הזמינות או ספק תשובה ברורה:",
      provideClearResponse: "בואו ננסה שוב. אנא ספק תשובה ברורה לשאלה."
    },
    contactModal: {
      title: "צור קשר",
      name: "שם",
      email: "אימייל",
      phone: "טלפון (אופציונלי)",
      message: "הודעה",
      namePlaceholder: "שמך",
      emailPlaceholder: "your@email.com",
      phonePlaceholder: "מספר הטלפון שלך",
      messagePlaceholder: "איך נוכל לעזור לך?",
      sendMessage: "שלח הודעה",
      sending: "שולח...",
      messageSent: "ההודעה נשלחה!",
      getBackSoon: "נחזור אליך בקרוב.",
      autoClose: "חלון זה ייסגר אוטומטית..."
    },
    preferenceLabels: {
      mood: "מצב רוח נוכחי",
      wantsResearchInfo: "מתעניין במחקר",
      wantsToExperience: "רוצה לחוות את הפרוטוקול",
      bringsHereToday: "סיבת ההגעה",
      treatmentMatters: "מה חשוב בטיפול",
      touchStyle: "סגנון מגע מועדף",
      therapistPreference: "העדפת מטפל",
      sessionLocation: "מיקום הטיפול",
      locationLive: "מקום מגורים",
      preferredTime: "זמן מועדף",
      conversationStyle: "אווירת טיפול",
      additionalNotes: "הערות נוספות",
      scentPreferences: "העדפות ריח",
      contactInfo: "פרטי קשר"
    },
    therapistSpecialties: {
      deepTissue: "עיסוי רקמות עמוק עם ריח טיפולי™ מבוסס מדע",
      swedish: "עיסוי שבדי עם ריח טיפולי™ מבוסס מדע",
      sports: "עיסוי ספורטיבי עם ריח טיפולי™ מבוסס מדע"
    },
    therapistDescriptions: {
      holisticDeep: "מומחית הוליסטית ורקמות עמוקות",
      swedishRelaxation: "מומחית לעיסוי שוודי והרפיה",
      sportsRecovery: "מומחה לעיסוי ספורט ושיקום פציעות"
    },
    availability: {
      today: "זמין היום",
      tomorrow: "זמין מחר"
    },
    services: {
      massage60: "עיסוי 60 דקות",
      massage90: "עיסוי 90 דקות",
      sportsMassage60: "עיסוי ספורט 60 דקות"
    },
    researchModal: {
      title: "מחקר מדעי על עיסוי טיפולי עם ריחות טיפוליים",
      results: {
        title: "תוצאות המחקר:",
        items: {
          cortisol: "הפחתת רמות הקורטיזול (הורמון הלחץ) ב-23% בממוצע",
          sleep: "שיפור איכות השינה ב-31% מהמשתתפים דיווחו על שינה טובה יותר",
          anxiety: "הפחתת חרדה ומתח ב-45% מהמשתתפים הרגישו רגועים יותר",
          muscle: "שחרור מתח שרירי השילוב של עיסוי וריחות הוכח כיעיל פי 2"
        }
      },
      howItWorks: {
        title: "איך זה עובד?",
        description: "המחקר הראה שמולקולות ריח ספציפיות מעוררות את המערכת הלימבית במוח, האחראית על רגולציה של לחץ ורגשות. כשמשלבים זאת עם עיסוי טיפולי, נוצרת סינרגיה שמגבירה את היתרונות הטיפוליים של שני הטיפולים."
      },
      protocol: {
        title: "הפרוטוקול שלנו:",
        description: "אנחנו משתמשים בפרוטוקול מותאם אישית שמבוסס על העדפות הריח האישיות שלך, בשילוב עם טכניקות עיסוי מתקדמות. כל פגישה מותאמת לצרכים הספציפיים שלך."
      },
      buttons: {
        interested: "כן, זה נשמע מעניין! בואו נמשיך",
        notInterested: "לא, אני מעוניין בעיסוי רגיל"
      },
      readMore: "קרא את המחקר המלא",
      interestedResponse: "נהדר! זה נשמע כמו משהו שתרצה לחוות? אם כן, אשמח לחבר אותך למטפל המתאים. אם לא, בואו נמצא לך את סוג העיסוי שמתאים לך בדיוק.",
      notInterestedResponse: "אין בעיה! בואו נמצא לך את סוג העיסוי שמתאים לך בדיוק."
    }
  }
}; 