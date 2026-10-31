'use client';

import { useState, useRef, useEffect } from 'react';
import './SupportChat.css';

const SendIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(90deg)' }}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const UserIcon = () => (
  <svg fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const BotIcon = () => (
  <svg fill="currentColor" viewBox="0 0 20 20">
    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
  </svg>
);

const SupportChat = () => {
  // Static export bakes in whatever time the page was built, not when the
  // visitor opens it — and computing it during the initial render also
  // causes a server/client hydration mismatch. Start with no timestamp and
  // fill it in after mount, once we're only ever running on the client.
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! Welcome to WealthNX Support. How can I help you today?",
      sender: 'bot',
      time: ''
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [awaitingEmail, setAwaitingEmail] = useState(false);
  const [originalQuery, setOriginalQuery] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === 1
          ? { ...m, time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) }
          : m
      )
    );
  }, []);

  const saveQueryToDatabase = async (email, query) => {
    try {
      // Step 1: Create support query with email
      const createQueryResponse = await fetch('/api/support/queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const queryData = await createQueryResponse.json();

      if (!queryData.id) {
        console.error('Failed to create query:', queryData.error);
        return false;
      }

      // Step 2: Add question item to the query
      const createItemResponse = await fetch(`/api/support/queries/${queryData.id}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: query })
      });

      const itemData = await createItemResponse.json();

      if (itemData.id) {
        console.log('Query saved successfully:', {
          email: queryData.email,
          queryId: queryData.id,
          itemId: itemData.id
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error saving query:', error);
      return false;
    }
  };

  const getBotResponse = async (userMessage) => {
    const msg = userMessage.toLowerCase().trim();

    if (awaitingEmail) {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (emailRegex.test(msg)) {
        const saved = await saveQueryToDatabase(msg, originalQuery);
        
        if (saved) {
          setAwaitingEmail(false);
          setOriginalQuery('');
          return `Thank you! We've received your email (${msg}). Our support team will reach out to you within 24 hours to help with your query. 

In the meantime, feel free to ask me anything else! 😊`;
        } else {
          return `I'm sorry, there was an error saving your request. Please try again or contact us directly at support@wealthnx.ai`;
        }
      } else {
        return `That doesn't look like a valid email address. Please enter a valid email so we can assist you better.`;
      }
    }

    const intents = {
      greeting: /^(hi|hello|hey|good morning|good afternoon|good evening|sup|yo)\b/i,
      thanks: /(thank|thanks|thx|appreciate)/i,
      createAccount: /(create|make|new|open|register|signup|sign up).*(account|profile)/i,
      updateProfile: /(update|edit|change|modify).*(profile|name|email|phone|information|details)/i,
      changePassword: /(change|update|modify).*(password|pass)/i,
      forgotPassword: /(forgot|forgotten|lost|reset|recover).*(password|pass)/i,
      verifyEmail: /(verify|verification|confirm).*(email|mail)/i,
      emailLogin: /(login|sign in|log in).*(email|changed email|new email)/i,
      dataRetention: /(keep|save|preserve|retain|lose|lost).*(data|information|account)/i,
      deleteAccount: /(delete|remove|close|deactivate).*(account|profile)/i,
      recoverAccount: /(recover|restore|get back|retrieve).*(account|profile)/i,
      waitingPeriod: /(waiting period|how long|time|days).*(delete|deletion|remove)/i,
      pricing: /(price|pricing|cost|payment|subscription|plan|fee|charge|how much)/i,
      features: /(feature|what (is|does)|how (does|to)|capabilities|functionality|work)/i,
      technicalIssue: /(error|bug|issue|problem|not working|broken|crash|fail|help)/i
    };

    const detectIntent = () => {
      if (intents.greeting.test(msg) && msg.length < 30) return 'greeting';
      if (intents.thanks.test(msg) && msg.length < 40) return 'thanks';
      if (intents.createAccount.test(msg)) return 'createAccount';
      if (intents.deleteAccount.test(msg)) return 'deleteAccount';
      if (intents.recoverAccount.test(msg)) return 'recoverAccount';
      if (intents.waitingPeriod.test(msg)) return 'waitingPeriod';
      if (intents.forgotPassword.test(msg)) return 'forgotPassword';
      if (intents.changePassword.test(msg)) return 'changePassword';
      if (intents.verifyEmail.test(msg)) return 'verifyEmail';
      if (intents.emailLogin.test(msg)) return 'emailLogin';
      if (intents.dataRetention.test(msg)) return 'dataRetention';
      if (intents.updateProfile.test(msg)) return 'updateProfile';
      if (intents.pricing.test(msg)) return 'pricing';
      if (intents.features.test(msg)) return 'features';
      if (intents.technicalIssue.test(msg)) return 'technicalIssue';
      return 'unknown';
    };

    const intent = detectIntent();

    const responses = {
      greeting: () => {
        const greetings = [
          "Hey there! 👋 Welcome to WealthNX Support. How can I help you today?",
          "Hello! Great to see you. What brings you here today?",
          "Hi! I'm here to help with any questions about your WealthNX account. What do you need?"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
      },

      thanks: () => {
        const thankResponses = [
          "You're welcome! Happy to help. Is there anything else you need? 😊",
          "No problem at all! Let me know if you need anything else.",
          "Glad I could help! Feel free to reach out if you have more questions."
        ];
        return thankResponses[Math.floor(Math.random() * thankResponses.length)];
      },

      createAccount: () => {
        return `Creating an account is quick and easy! Here's how:

Option 1: Email Signup
- Open the app and tap "Create Account"
- Enter your name, email, and password
- Check the box to agree to our Terms & Conditions
- Tap "Sign Up"

Option 2: Google Signup
- Tap "Continue with Google"
- Select your Google account
- And you're in!

Need help with anything else during signup?`;
      },

      updateProfile: () => {
        return `You can update your profile anytime! Here's the process:

- Open your Profile from the menu
- Tap the Edit icon (✏️)
- Update what you need: name, email, or phone number
- Hit Save when done

All your changes sync instantly. Want to know about updating something specific?`;
      },

      changePassword: () => {
        return `To change your password:

- Go to Settings → Security → Change Password
- Enter your current password
- Create your new password
- Confirm it and save

Pro tip: Use a strong password with letters, numbers, and symbols!

Need help with anything else?`;
      },

      forgotPassword: () => {
        return `No worries, we've all been there! Here's how to reset:

- On the login screen, tap "Forgot Password?"
- Enter your registered email or phone number
- You'll receive a reset code
- Enter the code and create your new password

Note: The code expires in 10 minutes, so use it right away!

Still having trouble accessing your account?`;
      },

      verifyEmail: () => {
        if (msg.includes('change') || msg.includes('new')) {
          return `Yes, you'll need to verify your new email address for security.

Here's what happens:
- A verification code is sent to your new email
- Enter the code in the app
- Your account data stays safe and linked to your profile

Don't worry - all your information remains intact during this process!

Anything else about email verification?`;
        }
        return `Email verification keeps your account secure!

When you verify:
- We send a code to your email
- Enter it in the app
- Your account is protected

Haven't received the code? Check your spam folder or tap "Resend Code."

Need more help?`;
      },

      emailLogin: () => {
        return `Logging in with a new email is seamless:

- Select "Login with Email" on the login screen
- Enter your new email address
- Verify with the code we send you
- Your data syncs automatically

Important: Your entire account history, settings, and data come with you - nothing gets lost!

Questions about the process?`;
      },

      dataRetention: () => {
        return `Great question! Your data is completely safe. ✅

When you update your email:
- All your previous data is preserved
- Everything stays linked to your profile
- No information is lost
- All settings remain intact

We take data security seriously - your financial information stays protected throughout any account changes.

Is there something specific you're concerned about?`;
      },

      deleteAccount: () => {
        return `I understand you're considering deleting your account. Before you do, here's what happens:

The Process:
- Go to Menu → Delete Account
- Confirm your email address
- Enter the OTP we send you
- Confirm deletion

⚠️ Important Information:
- There's a 7-day grace period before permanent deletion
- You can recover your account within those 7 days
- After 7 days, all data is permanently deleted

Is there anything we can help with that might change your mind? We'd love to keep you!`;
      },

      recoverAccount: () => {
        return `You can recover your account if it's within the 7-day window!

Recovery Steps:
- Go to Support Section → Recovery Account
- Enter and confirm your email
- Follow the verification steps

Important: After 7 days, accounts are permanently deleted and cannot be recovered.

Need help with the recovery process?`;
      },

      waitingPeriod: () => {
        return `Yes, there's a 7-day waiting period before account deletion becomes permanent.

Here's why:
- Gives you time to reconsider
- Prevents accidental deletions
- Allows for easy account recovery

Within 7 days: You can fully recover your account
After 7 days: Deletion is permanent and irreversible

Changed your mind about deleting? I can help you with that!`;
      },

      pricing: () => {
        return `Great question about pricing! WealthNX offers flexible options:

Free Tier 🆓
- Basic financial insights
- Limited crypto & stock tracking
- Essential budgeting tools

Pro Plan 💎 - Contact Us on Email 
- Full AI-powered insights
- Unlimited tracking
- Advanced features & notifications
- Priority support

Enterprise Solutions 🏢
- Custom pricing for businesses
- Contact us for details

Want to know more about what's included in Pro?`;
      },

      features: () => {
        if (msg.includes('ai') || msg.includes('insight')) {
          return `Our AI-powered insights help you make smarter financial decisions:

- Real-time analysis of your spending patterns
- Predictive budgeting recommendations
- Investment opportunity alerts
- Personalized financial advice

The AI learns from your behavior to give increasingly relevant suggestions!

Curious about any other features?`;
        }

        return `WealthNX is packed with powerful features:

AI Financial Insights 🤖
- Smart analysis of your finances
- Personalized recommendations

Crypto & Stock Tracking 📈
- Real-time portfolio monitoring
- Price alerts & analysis

Smart Budgeting 💰
- Automatic categorization
- Spending insights & goals

Real-Time Notifications 🔔
- Budget alerts
- Transaction updates
- Market movements

What would you like to explore first?`;
      },

      technicalIssue: () => {
        return `I'm sorry you're running into issues! Let's get this sorted out.

To help you better, could you tell me:
- What exactly is happening?
- Which feature or screen is affected?
- Any error messages you're seeing?

Quick fixes to try:
- Force close and restart the app
- Check for app updates
- Ensure stable internet connection

If the problem persists, our technical team is ready to help at support@wealthnx.com

What's going on specifically?`;
      },

      unknown: () => {
        setAwaitingEmail(true);
        setOriginalQuery(userMessage);
        return `I want to make sure you get the help you need! 

I couldn't find a specific answer to your question in my current knowledge base, but our support team can definitely help you out.

📧 Please provide your email address in the chat, and our team will reach out to you within 24 hours with a personalized response to your query.

You can also reach us directly at support@wealthnx.ai if you prefer! 😊`;
      }
    };

    return responses[intent] ? responses[intent]() : responses.unknown();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (inputText.trim() && !isTyping) {
      const newMessage = {
        id: Date.now(),
        text: inputText,
        sender: 'user',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      };
      setMessages(prev => [...prev, newMessage]);
      const currentInput = inputText;
      setInputText('');
      setIsTyping(true);

      setTimeout(async () => {
        const botResponseText = await getBotResponse(currentInput);
        const botResponse = {
          id: Date.now() + 1,
          text: botResponseText,
          sender: 'bot',
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (actionText) => {
    setInputText(actionText);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="chat-header">
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span className="status-text">Online</span>
          </div>
        </div>

        <div className="messages-container">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-wrapper ${message.sender}`}
            >
              <div className="message-content">
                <div className={`avatar ${message.sender}`}>
                  {message.sender === 'user' ? <UserIcon /> : <BotIcon />}
                </div>

                <div className="message-bubble-wrapper">
                  <div className={`message-bubble ${message.sender}`}>
                    <p className="message-text">{message.text}</p>
                  </div>
                  <div className="message-time">
                    {message.time}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message-wrapper bot">
              <div className="typing-indicator">
                <div className="avatar bot">
                  <BotIcon />
                </div>
                <div className="typing-bubble">
                  <div className="typing-dots">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="quick-actions">
          <button
            className="quick-action-btn"
            onClick={() => handleQuickAction('What is WealthNX?')}
          >
            <span>💡</span>
            What is WealthNX?
          </button>
          <button
            className="quick-action-btn"
            onClick={() => handleQuickAction('Pricing')}
          >
            <span>💰</span>
            Pricing
          </button>
          <button
            className="quick-action-btn"
            onClick={() => handleQuickAction('How to use WealthNx')}
          >
            <span>📚</span>
            How to use WealthNx
          </button>
        </div>

        <div className="input-area">
          <div className="input-wrapper">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={awaitingEmail ? "Enter your email address..." : "Type your message here..."}
              className="message-input"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={isTyping}
              className="send-button"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;