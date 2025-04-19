import { useState } from 'react';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { useOpenAI } from './open_ai';
import './App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

function App() {
  const [messages, setMessages] = useState([
    { message: "Hello, I'm ChatGPT!", sender: "ChatGPT", direction: "incoming" }
  ]);
  const { typing, handleSend } = useOpenAI(messages, setMessages);

  return (
    <div className='App'>
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {typing && <TypingIndicator content="ChatGPT is typing..." />}
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput 
              placeholder='Type message here' 
              onSend={handleSend} 
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
