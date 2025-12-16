"use client"
"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ArrowUpIcon, XIcon, BotMessageSquare, PhoneIcon as Whatsapp } from "lucide-react"

interface Message {
  text: string | JSX.Element
  sender: "user" | "bot"
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isBotTyping, setIsBotTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, []) // Updated useEffect dependency

  useEffect(() => {
    if (isOpen) {
      simulateBotTyping(() => {
        setMessages([
          {
            text: (
              <div className="space-y-2">
                <p>Welcome to Nyeras! How can I assist you today?</p>
                <div className="flex flex-wrap gap-2">
                  <QuickReplyButton onClick={() => handleQuickReply("courses")}>View Courses</QuickReplyButton>
                  <QuickReplyButton onClick={() => handleQuickReply("about")}>About Nyeras</QuickReplyButton>
                  <QuickReplyButton onClick={() => handleQuickReply("contact")}>Contact Us</QuickReplyButton>
                </div>
              </div>
            ),
            sender: "bot",
          },
        ])
      })
    }
  }, [isOpen])

  const simulateBotTyping = (callback: () => void) => {
    setIsBotTyping(true)
    setTimeout(() => {
      callback()
      setIsBotTyping(false)
    }, 1000)
  }

  const categories = {
    Technical: [
      { name: "Java FullStack Development", href: "/courses/Javafullstack" },
      { name: "AI & ML", href: "/courses/Aiml" },
      { name: "Data Science", href: "/courses/Datascience" },
      { name: "Data Analytics", href: "/courses/Dataanalytics" },
      { name: "AWS + DevOps", href: "/courses/Awsdevops" },
      { name: "Automation Testing", href: "/courses/Automationwithjava" },
      { name: "Very Large Scale Integration", href: "/courses/Vlsi" },
      { name: "Cyber Security", href: "/courses/Cybersecurity" },
    ],
    "Non-Technical": [
      { name: "Digital Marketing", href: "/courses/Digitalmarketing" },
      { name: "Human Resources", href: "/courses/Hrmanagement" },
    ],
    "Offline Classes": [{ name: "Java Full Stack Development", href: "/OfflineEnquiry" }],
  } as const
  

  const isGreeting = (message: string): boolean => {
    const greetingKeywords = [
      "hi",
      "hello",
      "hey",
      "hola",
      "bonjour",
      "namaste",
      "salaam",
      "salaam alaikum",
      "salaam walekum",
      "good morning",
      "good evening",
      "good afternoon",
    ]
    return greetingKeywords.some((keyword) => message.toLowerCase().includes(keyword))
  }

  const faqKeywords: { [key: string]: string } = {
    "course duration":
      "Our courses typically range from 4 to 12 weeks, depending on the complexity and depth of the subject.",
    pricing: "Course prices vary based on the content and duration. You can find detailed pricing on each course page.",
    certificates: "Yes, we provide certificates of completion for all our courses upon successful completion.",
    prerequisites:
      "Prerequisites vary by course. Generally, a basic understanding of programming concepts is helpful for technical courses.",
    "job assistance":
      "We offer job placement assistance, including resume building and interview preparation, for all our full-time courses.",
    "online classes": "Yes, we offer online classes for most of our courses, allowing you to learn from anywhere.",
    "course materials":
      "All necessary course materials, including video lectures, assignments, and projects, are provided online.",
    instructors: "Our instructors are industry experts with years of practical experience in their respective fields.",
  }

  const isFAQ = (message: string): string | undefined => {
    return Object.keys(faqKeywords).find((keyword) => message.toLowerCase().includes(keyword))
  }

  const addFAQResponse = (keyword: string) => {
    simulateBotTyping(() => {
      setMessages((messages) => [
        ...messages,
        {
          text: (
            <div className="space-y-2">
              <p>{faqKeywords[keyword]}</p>
              <p>Do you have any other questions about our courses or Nyeras?</p>
              <div className="flex flex-wrap gap-2">
                <QuickReplyButton onClick={() => handleQuickReply("courses")}>View Courses</QuickReplyButton>
                <QuickReplyButton onClick={() => handleQuickReply("contact")}>Contact Us</QuickReplyButton>
              </div>
            </div>
          ),
          sender: "bot",
        },
      ])
    })
  }

  const addCourseResponse = () => {
    simulateBotTyping(() => {
      setMessages((messages) => [
        ...messages,
        {
          text: (
            <div className="space-y-2">
              <p>We offer both technical and non-technical courses. Choose a category:</p>
              <div className="flex flex-wrap gap-2">
                <QuickReplyButton onClick={() => showCategory("Technical")}>Technical</QuickReplyButton>
                <QuickReplyButton onClick={() => showCategory("Non-Technical")}>Non-Technical</QuickReplyButton>
                <QuickReplyButton onClick={() => showCategory("Offline Classes")}>Offline Classes</QuickReplyButton>
              </div>
            </div>
          ),
          sender: "bot",
        },
      ])
    })
  }

  const showCategory = (category: keyof typeof categories) => {
    simulateBotTyping(() => {
      setMessages((messages) => [
        ...messages,
        {
          text: (
            <div className="space-y-2">
              <p>Here are our {category} courses:</p>
              <div className="flex flex-wrap gap-2">
                {categories[category].map((course) => (
                  <QuickReplyButton key={course.name} onClick={() => (window.location.href = course.href)}>
                    {course.name}
                  </QuickReplyButton>
                ))}
              </div>
              <p>Would you like more information about any of these courses?</p>
            </div>
          ),
          sender: "bot",
        },
      ])
    })
  }
  

  const isCustomCommand = (message: string): boolean => {
    const commands = [
      "courses",
      "offline Program",
      "technical courses",
      "non-technical courses",
      "contact",
      "pricing",
      "about",
    ]
    return commands.includes(message.toLowerCase().trim())
  }

  const addCommandResponse = (command: string) => {
    if (command === "courses") {
      addCourseResponse()
    } else if (command === "offline program") {
      showCategory("Offline Classes")
    } else if (command === "technical courses") {
      showCategory("Technical")
    } else if (command === "non-technical courses") {
      showCategory("Non-Technical")
    } else if (command === "contact") {
      simulateBotTyping(() => {
        setMessages((messages) => [
          ...messages,
          {
            text: (
              <div className="space-y-2">
                <p>You can reach us through the following channels:</p>
                <ul className="list-disc list-inside">
                  <li>Email: support@nyeras.com</li>
                  <li>Phone: +91 7013586357</li>
                  <li>Address: Floor No.2, 1161, AECS Layout Main Rd, AECS Layout - A Block, AECS Layout, Singasandra, Kudlu, Bengaluru, Karnataka 560068</li>
                </ul>
                <p>How else can I assist you today?</p>
              </div>
            ),
            sender: "bot",
          },
        ])
      })
    } else if (command === "pricing") {
      simulateBotTyping(() => {
        setMessages((messages) => [
          ...messages,
          {
            text: (
              <div className="space-y-2">
                <p>Pricing details vary by course. Here&apos;s a general overview:</p>
                <ul className="list-disc list-inside">
                  <li>Short courses (4-6 weeks): $500 - $1000</li>
                  <li>Medium courses (8-10 weeks): $1000 - $2000</li>
                  <li>Full programs (12+ weeks): $2000 - $5000</li>
                </ul>
                <p>Please visit the respective course page for exact fees. Would you like to view our courses?</p>
                <div className="flex flex-wrap gap-2">
                  <QuickReplyButton onClick={() => handleQuickReply("courses")}>View Courses</QuickReplyButton>
                </div>
              </div>
            ),
            sender: "bot",
          },
        ])
      })
    } else if (command === "about") {
      simulateBotTyping(() => {
        setMessages((messages) => [
          ...messages,
          {
            text: (
              <div className="space-y-2">
                <p>
                  Nyeras is a leading online education platform specializing in tech and professional development
                  courses. Our mission is to empower individuals with the skills needed to thrive in the digital age.
                </p>
                <p>Key features of Nyeras:</p>
                <ul className="list-disc list-inside">
                  <li>Expert-led courses</li>
                  <li>Hands-on projects</li>
                  <li>Flexible learning schedules</li>
                  <li>Career support services</li>
                </ul>
                <p>How can I help you get started with Nyeras?</p>
                <div className="flex flex-wrap gap-2">
                  <QuickReplyButton onClick={() => handleQuickReply("courses")}>Explore Courses</QuickReplyButton>
                  <QuickReplyButton onClick={() => handleQuickReply("contact")}>Contact Us</QuickReplyButton>
                </div>
              </div>
            ),
            sender: "bot",
          },
        ])
      })
    }
  }

  const addGreetingResponse = () => {
    simulateBotTyping(() => {
      setMessages((messages) => [
        ...messages,
        {
          text: (
            <div className="space-y-2">
              <p>Hello! How can I assist you with Nyeras courses today?</p>
              <div className="flex flex-wrap gap-2">
                <QuickReplyButton onClick={() => handleQuickReply("courses")}>View Courses</QuickReplyButton>
                <QuickReplyButton onClick={() => handleQuickReply("about")}>About Nyeras</QuickReplyButton>
                <QuickReplyButton onClick={() => handleQuickReply("contact")}>Contact Us</QuickReplyButton>
              </div>
            </div>
          ),
          sender: "bot",
        },
      ])
    })
  }

  const handleQuickReply = (command: string) => {
    setMessages((prevMessages) => [...prevMessages, { text: command, sender: "user" }])
    addCommandResponse(command)
  }

  const toggleChatBox = () => {
    setIsOpen(!isOpen)
    setMessages([])
  }

  const handleChatbotClose = () => {
    setIsOpen(false)
    setMessages([])
  }

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, { text: newMessage, sender: "user" }])
      setNewMessage("")

      // Bot response logic
      if (isGreeting(newMessage)) {
        addGreetingResponse()
      } else if (isCustomCommand(newMessage)) {
        addCommandResponse(newMessage)
      } else {
        const faqKeyword = isFAQ(newMessage)
        if (faqKeyword) {
          addFAQResponse(faqKeyword)
        } else {
          simulateBotTyping(() => {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                text: (
                  <div className="space-y-2">
                    <p>I&apos;m not sure I understood that. Can you please try rephrasing or choose from these options?</p>
                    <div className="flex flex-wrap gap-2">
                      <QuickReplyButton onClick={() => handleQuickReply("courses")}>View Courses</QuickReplyButton>
                      <QuickReplyButton onClick={() => handleQuickReply("about")}>About Nyeras</QuickReplyButton>
                      <QuickReplyButton onClick={() => handleQuickReply("contact")}>Contact Us</QuickReplyButton>
                    </div>
                  </div>
                ),
                sender: "bot",
              },
            ])
          })
        }
      }
    }
  }

  const QuickReplyButton: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
    <button
      onClick={onClick}
      className="px-3 py-1 text-sm bg-[#6600CC]/10 text-[#6600CC] rounded-full hover:bg-[#6600CC]/20 transition-colors"
    >
      {children}
    </button>
  )

  return (
    <>
      <button
        onClick={toggleChatBox}
        className={`fixed bottom-7 right-5 bg-[#6600CC] text-white rounded-full p-3 shadow-lg hover:bg-[#4d0099] transition-all duration-300 z-50 border-2 border-white ${isOpen ? "sm:block hidden" : "block"}`}
      >
        <BotMessageSquare className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 sm:bottom-24 sm:right-5 sm:inset-auto bg-white sm:rounded-lg shadow-xl sm:w-96 w-full z-50 flex flex-col sm:h-[500px] h-full sm:max-h-[calc(100vh-120px)] overflow-hidden border border-orange-200">
          <div className="bg-[#6600CC] text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <BotMessageSquare className="h-6 w-6 text-white" />
              <span className="text-lg font-semibold">NyBot</span>
            </div>
            <div className="flex items-center space-x-2">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  const numbers = ["7013586357", "9182566926"]
                  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)]
                  window.location.href = `tel:${randomNumber}`
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors p-2"
              >
                <Whatsapp className="h-6 w-6 sm:h-5 sm:w-5" />
              </a>
              <button onClick={handleChatbotClose} className="text-white hover:text-white/80 transition-colors p-2">
                <XIcon className="h-6 w-6 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-4 sm:max-h-[calc(100%-120px)]">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                {message.sender === "bot" && (
                  <BotMessageSquare className="h-6 w-6 text-[#6600CC] mr-2 flex-shrink-0 self-end" />
                )}
                <div
                  className={`max-w-[75%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-[#6600CC]/10 text-[#6600CC]"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {typeof message.text === "string" ? message.text : message.text}
                </div>
              </div>
            ))}
            {isBotTyping && (
              <div className="flex justify-start">
                <BotMessageSquare className="h-6 w-6 text-[#6600CC] mr-2 flex-shrink-0 self-end" />
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#6600CC] rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-[#6600CC] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-[#6600CC] rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-[#6600CC]/30">
            <div className="flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#6600CC]"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#6600CC] text-white p-2 rounded-r-lg hover:bg-[#4d0099] transition-all duration-300"
              >
                <ArrowUpIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBot

