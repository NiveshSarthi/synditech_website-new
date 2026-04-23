export const intents = {
  price: {
    keywords: ["price", "pricing", "cost", "fee", "charges", "quote", "budget", "expensive", "cheap", "affordable", "rate", "rates", "how much", "cost of", "estimate"],
    response: "Our pricing varies based on project requirements and complexity. Contact us at contact@synditech.ai for a custom quote tailored to your needs."
  },
  service: {
    keywords: ["service", "services", "offer", "provide", "solutions", "capabilities", "expertise", "development", "build", "create", "design", "what do", "builds"],
    response: "We offer SaaS Development, Web Development, Mobile App Development, E-commerce Solutions, API Integration, and Cloud Services. Visit our Services page for details."
  },
  contact: {
    keywords: ["contact", "reach", "email", "phone", "talk", "message", "connect", "talk to", "speak to", "call", "whatsapp"],
    response: "You can reach us at contact@synditech.ai, call +91 9560037154, or visit our Contact page. We're happy to help!"
  },
  career: {
    keywords: ["job", "career", "careers", "hiring", "apply", "application", "resume", "cv", "vacancy", "positions", "work with", "join", "opportunity"],
    response: "Check our Careers page for open positions. Apply by clicking a job listing and submitting your resume through our form."
  },
  internship: {
    keywords: ["internship", "intern", "student", "fresher", "training", "fresh graduate", "college", "placement"],
    response: "Yes, we offer internships for students and fresh graduates. Email us your resume or check our Careers page for opportunities."
  },
  support: {
    keywords: ["support", "help", "maintenance", "assistance", "issue", "problem", "bug", "fix", "troubleshoot", "maintain", "broken", "error"],
    response: "We provide ongoing support and maintenance for all projects. Contact us through our website for any issues or assistance."
  },
  location: {
    keywords: ["location", "address", "office", "headquarters", "where", "based", "located", "city", "place", "india"],
    response: "We're based in Faridabad, Haryana, India (BH-918, 9th Floor, 81 High Street-Puri Business Hub, Sector-81). We serve clients globally."
  },
  timeline: {
    keywords: ["time", "duration", "timeline", "delivery", "deadline", "how long", "turnaround", "fast", "quick", "weeks", "months", "days", "when"],
    response: "Project timelines depend on complexity. Small projects take 2-4 weeks, larger ones may take several months. Contact us for a specific estimate."
  },
  technology: {
    keywords: ["technology", "tech", "stack", "tools", "framework", "language", "react", "node", "python", "aws", "mongodb", "javascript", "java", "nextjs", "angular", "vue", "sql"],
    response: "We use modern tech including React, Next.js, Node.js, Python, MongoDB, AWS, and more. We choose the best stack for your project."
  },
  business: {
    keywords: ["small", "business", "startup", "enterprise", "company", "corporate", "client", "sme", "agency"],
    response: "We work with businesses of all sizes - startups to enterprises. Our solutions scale to your budget and requirements."
  },
  remote: {
    keywords: ["remote", "work from home", "virtual", "online", "telecommute", "work remotely", "distributed"],
    response: "Yes, we offer remote development services. Our team works globally via video calls, project management tools, and regular updates."
  },
  experience: {
    keywords: ["experience", "years", "portfolio", "project", "projects", "samples", "case study", "previous", "work done", "examples"],
    response: "We have experience delivering various web and mobile applications. Visit our portfolio section or contact us to discuss your requirements."
  },
  start: {
    keywords: ["start", "begin", "get started", "hire", "project", "new", "develop", "launch", "need", "want"],
    response: "Contact us at contact@synditech.ai or visit our Contact page. We'll discuss your requirements and provide a proposal."
  },
  greeting: {
    keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "howdy", "greetings"],
    response: "Hello! How can I help you today? Ask me about our services, pricing, careers, or contact details."
  },
  thanks: {
    keywords: ["thank", "thanks", "appreciate", "helpful"],
    response: "You're welcome! Is there anything else I can help you with?"
  }
}

export const defaultResponse = "I'm not sure about that. Try asking about our services, pricing, careers, contact details, or project timelines. You can also email us at contact@synditech.ai"

export const welcomeMessage = "Hi! I can help with questions about our services, pricing, careers, contact details, or how to start a project. What would you like to know?"
