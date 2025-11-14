import React, { useState, useEffect, useRef } from "react";
import styles from "./BookChatbot.module.css";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface KnowledgeBase {
  keywords: string[];
  response: string;
  category: string;
}

const BOOK_KNOWLEDGE: KnowledgeBase[] = [
  {
    keywords: ["ai agent", "agents", "what is ai agent"],
    response:
      "AI Agents are intelligent systems that can understand natural language, reason about problems, and execute tasks. This book teaches you how to build, deploy, and work with AI agents using Python and TypeScript. They represent the future of software development where you collaborate with AI as a partner.",
    category: "Core Concepts",
  },
  {
    keywords: ["python", "why python", "python development"],
    response:
      "Python is used in this book as the 'Reasoning World' language. It's excellent for AI development, data processing, and backend logic. You'll learn Python fundamentals, AI integration, and how to build intelligent systems with frameworks like LangChain and CrewAI.",
    category: "Languages",
  },
  {
    keywords: ["typescript", "why typescript", "typescript development"],
    response:
      "TypeScript is the 'Interaction World' language in this book. It's used for building user interfaces, web applications, and interactive experiences. You'll learn how to create AI-powered frontends that work seamlessly with your Python backends.",
    category: "Languages",
  },
  {
    keywords: ["specification", "specs", "spec-driven", "specification driven"],
    response:
      "Specification-Driven Development is the core methodology of this book. Instead of writing code first, you write clear specifications that describe what you want. AI agents then use these specs to generate, test, and validate code. This is the fundamental skill shift: 'Specs Are the New Syntax'.",
    category: "Methodology",
  },
  {
    keywords: ["beginner", "start", "getting started", "new to coding"],
    response:
      "Great choice! This book is designed for beginners. Start with the Preface to understand AI-native development, then follow the learning path through Parts 1-3. You'll learn programming concepts alongside AI collaboration, making it easier than traditional methods. No prior coding experience required!",
    category: "Getting Started",
  },
  {
    keywords: ["tdd", "test driven", "testing"],
    response:
      "Test-Driven Development (TDD) is enhanced with AI in this book. You'll learn to write tests first, use AI to generate implementations, and validate results. AI co-pilots accelerate the red-green-refactor cycle, making TDD more efficient and accessible.",
    category: "Methodology",
  },
  {
    keywords: ["aidd", "ai-driven development", "ai driven"],
    response:
      "AI-Driven Development (AIDD) is the primary focus of this book. It's Level 2 on the AI Development Spectrum. In AIDD, AI generates most of the code while you provide specifications, validate outputs, and make architectural decisions. This is the 10x-99x productivity multiplier.",
    category: "Core Concepts",
  },
  {
    keywords: ["co-learning", "human machine", "partnership"],
    response:
      "Co-Learning is the philosophy where you and AI learn together. Neither is purely teacher nor student. You provide context and judgment; AI provides speed and breadth. This convergence creates exponential learning and productivity gains. The book teaches you how to be an effective AI partner.",
    category: "Philosophy",
  },
  {
    keywords: ["experienced developer", "already know coding", "professional"],
    response:
      "For experienced developers, this book offers a paradigm shift. Skip basics and focus on Parts 6-13 which cover advanced topics like AI-native architecture, production deployment, and system design. You'll learn to leverage your existing knowledge while adopting AI-first workflows.",
    category: "Getting Started",
  },
  {
    keywords: ["job", "career", "replace", "will ai replace me"],
    response:
      "AI won't replace developers—it will replace developers who don't use AI. The market demand for AI-native developers is increasing exponentially. This book teaches you to become that developer who leverages AI for 10x-99x productivity, making you more valuable, not obsolete.",
    category: "Career",
  },
  {
    keywords: ["langchain", "crewai", "frameworks"],
    response:
      "You'll learn modern AI frameworks like LangChain for building AI chains and pipelines, and CrewAI for orchestrating multiple AI agents. These tools enable you to create sophisticated AI systems that can handle complex workflows and multi-step reasoning.",
    category: "Tools & Frameworks",
  },
  {
    keywords: ["deployment", "production", "deploy"],
    response:
      "The book covers comprehensive deployment strategies using Docker, Kubernetes, and cloud platforms. You'll learn to deploy AI agents to production with proper monitoring, scaling, and security. Parts 10-13 focus on production-ready AI-native applications.",
    category: "Deployment",
  },
  {
    keywords: ["chapter", "structure", "how to read", "start reading"],
    response:
      "The book has 13 parts with 55 chapters. Start with the Preface, then follow your path: Beginners start at Part 1, experienced developers can jump to Part 6+, and technical leaders focus on architecture sections. Each chapter builds on previous concepts with hands-on exercises.",
    category: "Navigation",
  },
  {
    keywords: ["exercise", "practice", "hands-on", "projects"],
    response:
      "Every chapter includes practical exercises and code examples. You'll build real projects using AI agents, from simple scripts to full-stack applications. All exercises are designed for AI collaboration, teaching you to work alongside AI tools like Claude Code, GitHub Copilot, and Gemini CLI.",
    category: "Learning",
  },
  {
    keywords: ["three laws", "laws of co-learning"],
    response:
      "The Three Laws of Co-Learning are: 1) AI amplifies clarity (precise specs = better output), 2) Iteration beats perfection (rapid feedback loops), 3) Context is compounding (AI learns from conversation history). Master these to maximize your AI partnership effectiveness.",
    category: "Philosophy",
  },
  {
    keywords: ["tools", "ai tools", "claude", "copilot", "gemini"],
    response:
      "You'll learn to use multiple AI tools: Claude Code for full-stack development, GitHub Copilot for code completion, Gemini CLI for terminal tasks, and ChatGPT for problem-solving. The book teaches platform-agnostic skills that work with any AI assistant.",
    category: "Tools & Frameworks",
  },
  {
    keywords: ["cost", "price", "free", "open source"],
    response:
      "This book is free and open source! You can read it online at ai-native.panaversity.org or on GitHub. All code examples and exercises are freely available. The content is licensed for sharing and learning, making AI-native development accessible to everyone.",
    category: "About",
  },
  {
    keywords: ["panaversity", "who wrote", "author", "team"],
    response:
      "This book is written by the Panaversity team, dedicated to making cutting-edge technology education accessible globally. Panaversity offers comprehensive courses on AI, cloud computing, and modern development. Learn more at panaversity.org.",
    category: "About",
  },
];

const QUICK_SUGGESTIONS = [
  "What are AI Agents?",
  "How do I get started?",
  "What is Spec-Driven Development?",
  "Which language should I learn first?",
  "Will AI replace developers?",
];

export default function BookChatbot(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "👋 Hi! I'm your AI-Native Book Assistant. Ask me anything about the book content, concepts, or learning path!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const findBestResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // Find matching knowledge base entries
    const matches = BOOK_KNOWLEDGE.filter((kb) =>
      kb.keywords.some((keyword) => lowerQuery.includes(keyword))
    );

    if (matches.length > 0) {
      // Return the first match (most specific)
      return matches[0].response;
    }

    // Default response for unmatched queries
    return `I don't have specific information about that yet. However, you can:

📖 Use the search bar above to find relevant chapters
🔍 Browse the table of contents for specific topics
💬 Try rephrasing your question with keywords like: AI Agents, Python, TypeScript, Specifications, TDD, Deployment

Or try asking: "How do I get started?" or "What are AI Agents?"`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay for more natural feel
    setTimeout(() => {
      const botResponse = findBestResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.chatbotContainer}>
      {/* Chat Widget */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerContent}>
              <div className={styles.headerIcon}>🤖</div>
              <div className={styles.headerText}>
                <h3>Book Assistant</h3>
                <span className={styles.headerStatus}>
                  <span className={styles.statusDot}></span>
                  Online
                </span>
              </div>
            </div>
            <button
              className={styles.closeButton}
              onClick={toggleChat}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className={styles.messagesContainer}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.sender === "user"
                    ? styles.userMessage
                    : styles.botMessage
                }`}
              >
                <div className={styles.messageContent}>
                  <div className={styles.messageText}>{message.text}</div>
                  <div className={styles.messageTime}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className={`${styles.message} ${styles.botMessage}`}>
                <div className={styles.messageContent}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length === 1 && (
            <div className={styles.suggestionsContainer}>
              <div className={styles.suggestionsLabel}>Quick questions:</div>
              <div className={styles.suggestions}>
                {QUICK_SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    className={styles.suggestionChip}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className={styles.inputContainer}>
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              placeholder="Ask about the book..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className={styles.sendButton}
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10L18 2L10 18L8 11L2 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        className={`${styles.floatingButton} ${isOpen ? styles.open : ""}`}
        onClick={toggleChat}
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {!isOpen && <span className={styles.badge}>Ask me!</span>}
          </>
        )}
      </button>
    </div>
  );
}
