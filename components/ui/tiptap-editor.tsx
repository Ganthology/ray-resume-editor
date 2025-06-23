"use client";

import { Bold, Italic, List, ListOrdered, Redo, Undo } from "lucide-react";
import { EditorContent, useEditor } from "@tiptap/react";
import React, { useEffect } from "react";

import { Button } from "./button";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

interface TiptapEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({
  value,
  onChange,
  placeholder = "Enter description...",
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    immediatelyRender: false, // Prevents SSR hydration mismatch warnings
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "tiptap-content focus:outline-none min-h-[120px] p-3",
      },
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("bold") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant={editor.isActive("italic") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          size="sm"
          variant={editor.isActive("bulletList") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant={editor.isActive("orderedList") ? "default" : "ghost"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="h-8 w-8 p-0"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="h-8 w-8 p-0"
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="h-8 w-8 p-0"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Content with inline styles */}
      <div className="min-h-[120px]">
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .tiptap-content ul {
              list-style-type: disc !important;
              margin-left: 1.5rem !important;
              padding-left: 0 !important;
              margin-bottom: 1rem !important;
            }
            
            .tiptap-content ol {
              list-style-type: decimal !important;
              margin-left: 1.5rem !important;
              padding-left: 0 !important;
              margin-bottom: 1rem !important;
            }
            
            .tiptap-content li {
              display: list-item !important;
              margin-bottom: 0.25rem !important;
              line-height: 1.6 !important;
              margin-left: 0 !important;
              padding-left: 0.5rem !important;
            }
            
            .tiptap-content p {
              margin-bottom: 0.75rem !important;
              line-height: 1.6 !important;
            }
            
            .tiptap-content strong {
              font-weight: bold !important;
            }
            
            .tiptap-content em {
              font-style: italic !important;
            }
            
            .tiptap-content p.is-editor-empty:first-child::before {
              color: #adb5bd !important;
              content: attr(data-placeholder) !important;
              float: left !important;
              height: 0 !important;
              pointer-events: none !important;
            }
            
            .tiptap-content ul li::marker {
              color: #374151 !important;
            }
            
            .tiptap-content ol li::marker {
              color: #374151 !important;
            }
          `,
          }}
        />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
