import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ language, code, title }) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="code-block">
      <div className="code-header">
        {title && <span className="code-title">{title}</span>}
        <button className="copy-button" onClick={handleCopyClick}>
          Хуулах
        </button>
      </div>
      <SyntaxHighlighter 
        language={language || 'javascript'} 
        style={atomDark}
        showLineNumbers={true}
        customStyle={{
          borderRadius: '0 0 8px 8px',
          marginTop: 0,
          fontSize: '14px',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock; 