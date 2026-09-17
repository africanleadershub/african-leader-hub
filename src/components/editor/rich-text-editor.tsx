"use client";

import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table/kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import { generateHTML, generateJSON } from "@tiptap/html";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minus,
  Table as TableIcon,
  Highlighter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AssetSelector } from "@/components/admin/asset-selector";

const editorExtensions = [
  StarterKit.configure({
    heading: { levels: [2, 3, 4] },
  }),
  Underline,
  Highlight,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Image.configure({ inline: false, allowBase64: false }),
  TableKit.configure({ table: { resizable: true } }),
];

export function htmlFromJson(json: JSONContent | null | undefined): string {
  if (!json) return "";
  try {
    return generateHTML(json, editorExtensions);
  } catch {
    return "";
  }
}

export function jsonFromHtml(html: string | null | undefined): JSONContent {
  const source = (html || "").trim();
  if (!source) {
    return { type: "doc", content: [{ type: "paragraph" }] };
  }
  const markup = /<\/?[a-z][\s\S]*>/i.test(source)
    ? source
    : `<p>${source.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>")}</p>`;
  try {
    return generateJSON(markup, editorExtensions) as JSONContent;
  } catch {
    return {
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text: source }] }],
    };
  }
}

type RichTextEditorProps = {
  value?: JSONContent | null;
  html?: string | null;
  onChange: (json: JSONContent, html: string) => void;
  placeholder?: string;
  className?: string;
  compact?: boolean;
};

export function RichTextEditor({
  value,
  html,
  onChange,
  placeholder = "Write content…",
  className,
  compact = false,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      ...editorExtensions,
      Placeholder.configure({ placeholder }),
    ],
    content: value ?? jsonFromHtml(html),
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-neutral max-w-none px-4 py-3 focus:outline-none",
          "[&_li_p]:my-0 [&_li]:my-0.5 [&_ul]:my-2 [&_ol]:my-2 [&_h2]:mt-6 [&_h2]:mb-2 [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:mb-3",
          compact ? "min-h-[160px]" : "min-h-[240px]"
        ),
      },
    },
    onUpdate: ({ editor: instance }) => {
      onChange(instance.getJSON(), instance.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value) {
      const current = JSON.stringify(editor.getJSON());
      const next = JSON.stringify(value);
      if (current !== next) {
        editor.commands.setContent(value);
      }
      return;
    }
    if (html && !editor.isFocused) {
      const next = jsonFromHtml(html);
      const current = JSON.stringify(editor.getJSON());
      if (current !== JSON.stringify(next)) {
        editor.commands.setContent(next);
      }
    }
  }, [editor, value, html]);

  if (!editor) {
    return (
      <div
        className={cn("rounded-md border bg-muted/30", compact ? "h-48" : "h-[min(32rem,80vh)]")}
      />
    );
  }

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-lg border bg-white", className)}>
      <div className="sticky top-0 z-10 flex shrink-0 flex-wrap items-center gap-1 border-b bg-muted/40 p-2">
        <ToolbarButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("highlight")} onClick={() => editor.chain().focus().toggleHighlight().run()}>
          <Highlighter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
        >
          <TableIcon className="h-4 w-4" />
        </ToolbarButton>
        <AssetSelector
          onSelect={(asset) => {
            editor.chain().focus().setImage({ src: asset.url, alt: asset.alt || asset.title || "" }).run();
          }}
        />
        <div className="ml-auto flex gap-1">
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
            <Undo2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
            <Redo2 className="h-4 w-4" />
          </ToolbarButton>
        </div>
      </div>
      <div
        className={cn(
          "min-h-0 overflow-y-auto overscroll-contain",
          compact
            ? "max-h-[min(36vh,18rem)]"
            : "max-h-[min(80vh,calc(100dvh-11rem))]"
        )}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <Button
      type="button"
      variant={active ? "secondary" : "ghost"}
      size="icon"
      className="h-8 w-8"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
