import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneDark} from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Code({ children, className, ...rest }: CodeProps) {
  const match = /language-(\w+)/.exec(className || '');
  
  if (match && typeof children === 'string') {
    return (
      <SyntaxHighlighter
        {...rest}
        customStyle={{ fontFamily: "var(--mono) !important"}}
        language={match[1]}
        style={atomOneDark}
      >
        {children.replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  }

  return (
    <code {...rest} className={className}>
      {children}
    </code>
  );
};
