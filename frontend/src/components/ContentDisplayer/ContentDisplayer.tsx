import React, { ReactNode, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import CodeCopyBtn from "./CopyButton";
import "./contentDisplayer.css";

interface ContentDisplayerProps {
  content: string;
}

let headingIds: string[] = [];

export const ContentDisplayer: React.FC<ContentDisplayerProps> = ({
  content,
}) => {
  const postMarkdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    headingIds = [];
  }, []);

  interface PreProps {
    children?: ReactNode;
  }

  const createPreComponent = ({ children }: PreProps): JSX.Element => {
    const Pre: JSX.Element = (
      <pre className="blog-pre" style={{ maxWidth: "100%" }}>
        <CodeCopyBtn>{children}</CodeCopyBtn>
        <div className="blog-pre-container">{children}</div>
      </pre>
    );

    return Pre;
  };

  return (
    <div className="displayer">
      <div className="displayer-container" ref={postMarkdownRef}>
        <Markdown
          className="post-markdown"
          rehypePlugins={[rehypeRaw, rehypeSlug]}
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ node, children }) => (
              <p className="custom-paragraph">{children}</p>
            ),
            img: ({ node, src, alt }) => (
              <img className="custom-image" src={src} alt={alt} />
            ),
            a: ({ node, href, children }) => (
              <a className="custom-link" href={href}>
                {children}
              </a>
            ),
            h1: ({ node, children }) => (
              <h1 className="custom-heading1">{children}</h1>
            ),
            h2: ({ node, children }) => (
              <h2 className="custom-heading2">{children}</h2>
            ),
            h3: ({ node, children }) => (
              <h3 className="custom-heading3">{children}</h3>
            ),
            h4: ({ node, children }) => (
              <h4 className="custom-heading4">{children}</h4>
            ),
            h5: ({ node, children }) => (
              <h5 className="custom-heading5">{children}</h5>
            ),
            h6: ({ node, children }) => (
              <h6 className="custom-heading6">{children}</h6>
            ),
            table: ({ node, children }) => (
              <table className="custom-table">{children}</table>
            ),
            ul: ({ node, children }) => (
              <ul className="custom-list-u">{children}</ul>
            ),
            ol: ({ node, children }) => (
              <ol className="custom-list-o">{children}</ol>
            ),
            li: ({ node, children }) => (
              <li className="custom-list-item">{children}</li>
            ),
            blockquote: ({ node, children }) => (
              <blockquote className="custom-blockquote">{children}</blockquote>
            ),
            hr: ({ node }) => <hr className="custom-hr" />,
            pre: createPreComponent,
            code({ node, className = "blog-code", children, style, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  style={dracula}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
};

export default React.memo(ContentDisplayer);
