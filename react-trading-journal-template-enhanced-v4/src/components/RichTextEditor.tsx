import { useCallback, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Emoji from "@tiptap/extension-emoji";

const COMMON_EMOJIS = ["✅", "❌", "⚠️", "🎯", "🧠", "😅", "😤", "😌", "🔥", "💡", "📉", "📈", "📝", "🔁"];

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeightClassName?: string;
};

const isDataUrl = (value: string) => value.startsWith("data:");

async function compressImageToDataUrl(file: File, maxWidth = 1400, quality = 0.86) {
  const buffer = await file.arrayBuffer();
  const blob = new Blob([buffer], { type: file.type || "image/png" });
  const bitmap = await createImageBitmap(blob);

  const scale = Math.min(1, maxWidth / bitmap.width);
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 初始化失败");
  }
  ctx.drawImage(bitmap, 0, 0, width, height);

  // Prefer jpeg for size, keep png if input is png with transparency (best-effort).
  const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
  const dataUrl = canvas.toDataURL(outputType, outputType === "image/jpeg" ? quality : undefined);
  return dataUrl;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  minHeightClassName = "min-h-[140px]",
}: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "rt-image",
        },
      }),
      Emoji,
      Placeholder.configure({
        placeholder: placeholder ?? "",
      }),
    ],
    [placeholder],
  );

  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `rt-editor ${minHeightClassName}`,
      },
    },
  });

  const handleInsertEmoji = useCallback(
    (emoji: string) => {
      if (!editor) {
        return;
      }
      editor.chain().focus().insertContent(emoji).run();
      setShowEmoji(false);
    },
    [editor],
  );

  const triggerImagePick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImagePicked = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file || !editor) {
        return;
      }

      try {
        const dataUrl = await compressImageToDataUrl(file);
        if (!isDataUrl(dataUrl)) {
          throw new Error("图片读取失败");
        }
        editor.chain().focus().setImage({ src: dataUrl, alt: file.name }).run();
      } catch (err) {
        console.error(err);
        alert("插入图片失败，请重试或换一张图片。");
      }
    },
    [editor],
  );

  if (!editor) {
    return <div className={`rt-shell ${minHeightClassName}`} />;
  }

  return (
    <div className="rt-shell border border-white/10 bg-[#050a08]">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-2 py-2 text-xs text-slate-200">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rt-btn ${editor.isActive("bold") ? "rt-btn-active" : ""}`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rt-btn ${editor.isActive("italic") ? "rt-btn-active" : ""}`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rt-btn ${editor.isActive("bulletList") ? "rt-btn-active" : ""}`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rt-btn ${editor.isActive("orderedList") ? "rt-btn-active" : ""}`}
        >
          1. List
        </button>
        <button type="button" onClick={triggerImagePick} className="rt-btn">
          图片
        </button>
        <div className="relative">
          <button type="button" onClick={() => setShowEmoji((v) => !v)} className="rt-btn">
            Emoji
          </button>
          {showEmoji && (
            <div className="absolute left-0 top-full z-20 mt-2 w-56 rounded border border-white/10 bg-[#0b1511] p-2 shadow-xl">
              <p className="mb-2 text-[11px] text-slate-300">常用 emoji</p>
              <div className="grid grid-cols-7 gap-1">
                {COMMON_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className="rounded px-1 py-1 text-base hover:bg-white/10"
                    onClick={() => handleInsertEmoji(emoji)}
                    title={emoji}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-slate-400">也可以直接输入/粘贴任意 emoji。</p>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImagePicked}
        />
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}

