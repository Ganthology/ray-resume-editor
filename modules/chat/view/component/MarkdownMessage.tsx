"use client";

import type { Components } from "react-markdown";
import React from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/platform/style/utils";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

type MarkdownMessageProps = {
  content: string;
  className?: string;
};

export default function MarkdownMessage({
  content,
  className,
}: MarkdownMessageProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

const components: Components = {
  h1: (props) => {
    const { className, ...rest } =
      props as React.HTMLAttributes<HTMLHeadingElement>;
    return (
      <h1 className={cn("text-base font-semibold mb-2", className)} {...rest} />
    );
  },
  h2: (props) => {
    const { className, ...rest } =
      props as React.HTMLAttributes<HTMLHeadingElement>;
    return (
      <h2 className={cn("text-base font-semibold mb-2", className)} {...rest} />
    );
  },
  h3: (props) => {
    const { className, ...rest } =
      props as React.HTMLAttributes<HTMLHeadingElement>;
    return (
      <h3 className={cn("text-sm font-semibold mb-1", className)} {...rest} />
    );
  },
  p: (props) => {
    const { className, ...rest } =
      props as React.HTMLAttributes<HTMLParagraphElement>;
    return (
      <p
        className={cn("text-sm leading-relaxed mb-2 last:mb-0", className)}
        {...rest}
      />
    );
  },
  ul: (props) => {
    const { className, ...rest } =
      props as React.HTMLAttributes<HTMLUListElement>;
    return (
      <ul
        className={cn("list-disc pl-5 space-y-1 mb-2 last:mb-0", className)}
        {...rest}
      />
    );
  },
  ol: (props) => {
    const { className, ...rest } =
      props as React.HTMLAttributes<HTMLOListElement>;
    return (
      <ol
        className={cn("list-decimal pl-5 space-y-1 mb-2 last:mb-0", className)}
        {...rest}
      />
    );
  },
  li: (props) => {
    const { className, ...rest } =
      props as React.LiHTMLAttributes<HTMLLIElement>;
    return <li className={cn("text-sm", className)} {...rest} />;
  },
  a: (props) => {
    const { className, ...rest } =
      props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        className={cn(
          "underline underline-offset-2 hover:text-blue-600",
          className
        )}
        target="_blank"
        rel="noreferrer noopener"
        {...rest}
      />
    );
  },
  code: (({
    inline,
    className,
    children,
    ...props
  }: {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
  } & React.HTMLAttributes<HTMLElement>) => {
    if (inline) {
      return (
        <code
          className={cn(
            "bg-black/10 rounded px-1 py-0.5 text-[0.825rem]",
            className
          )}
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <pre
        className={cn(
          "bg-gray-100 text-gray-900 rounded-md p-3 overflow-x-auto text-xs mb-2",
          className
        )}
      >
        <code {...props}>{children}</code>
      </pre>
    );
  }) as Components["code"],
  blockquote: (props) => {
    const { className, ...rest } =
      props as React.BlockquoteHTMLAttributes<HTMLQuoteElement>;
    return (
      <blockquote
        className={cn(
          "border-l-4 border-gray-300 pl-3 italic text-gray-700 mb-2",
          className
        )}
        {...rest}
      />
    );
  },
  hr: (props) => {
    const { className, ...rest } = props as React.HTMLAttributes<HTMLHRElement>;
    return <hr className={cn("my-3 border-gray-200", className)} {...rest} />;
  },
  strong: (props) => {
    const { className, ...rest } = props as React.HTMLAttributes<HTMLElement>;
    return <strong className={cn("font-semibold", className)} {...rest} />;
  },
  em: (props) => {
    const { className, ...rest } = props as React.HTMLAttributes<HTMLElement>;
    return <em className={cn("italic", className)} {...rest} />;
  },
  table: (props) => {
    const { className, ...rest } =
      props as React.TableHTMLAttributes<HTMLTableElement>;
    return (
      <div className="overflow-x-auto mb-2">
        <table
          className={cn("text-sm w-full border-collapse", className)}
          {...rest}
        />
      </div>
    );
  },
  th: (props) => {
    const { className, ...rest } =
      props as React.ThHTMLAttributes<HTMLTableCellElement>;
    return (
      <th
        className={cn(
          "border border-gray-200 px-2 py-1 text-left font-medium bg-gray-50",
          className
        )}
        {...rest}
      />
    );
  },
  td: (props) => {
    const { className, ...rest } =
      props as React.TdHTMLAttributes<HTMLTableCellElement>;
    return (
      <td
        className={cn("border border-gray-200 px-2 py-1 align-top", className)}
        {...rest}
      />
    );
  },
};
