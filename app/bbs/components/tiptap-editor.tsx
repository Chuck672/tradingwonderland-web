import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Undo,
  Redo,
  ImageIcon,
  Loader2
} from 'lucide-react';
import { useCallback, useState } from 'react';

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const addImage = useCallback(async () => {
    if (!editor) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png,image/webp';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (file.size > 10 * 1024 * 1024) {
        alert(`图片 "${file.name}" 大小超过了 10MB 限制！请压缩后再上传。`);
        return;
      }

      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/bbs/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          editor.chain().focus().setImage({ src: data.data.url }).run();
        } else {
          alert(data.message || "上传失败");
        }
      } catch (err) {
        alert("上传图片时发生网络错误");
      } finally {
        setIsUploading(false);
      }
    };
    input.click();
  }, [editor]);

  if (!editor) {
    return null;
  }

  const toggleBtnClass = (isActive: boolean) =>
    `p-2 rounded-md transition-colors ${
      isActive ? 'bg-slate-800 text-[#00bfa5]' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-950/80 border-b border-slate-800 sticky top-0 z-10 backdrop-blur-sm rounded-t-xl">
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 rounded-md disabled:opacity-30 transition-colors"
        title="撤销"
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 rounded-md disabled:opacity-30 transition-colors"
        title="重做"
      >
        <Redo className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-slate-800 mx-2" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={toggleBtnClass(editor.isActive('heading', { level: 1 }))}
        title="大标题"
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={toggleBtnClass(editor.isActive('heading', { level: 2 }))}
        title="小标题"
      >
        <Heading2 className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-slate-800 mx-2" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={toggleBtnClass(editor.isActive('bold'))}
        title="粗体"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={toggleBtnClass(editor.isActive('italic'))}
        title="斜体"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={toggleBtnClass(editor.isActive('strike'))}
        title="删除线"
      >
        <Strikethrough className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-slate-800 mx-2" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={toggleBtnClass(editor.isActive('bulletList'))}
        title="无序列表"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={toggleBtnClass(editor.isActive('orderedList'))}
        title="有序列表"
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={toggleBtnClass(editor.isActive('blockquote'))}
        title="引用"
      >
        <Quote className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-slate-800 mx-2" />

      <button
        type="button"
        onClick={addImage}
        disabled={isUploading}
        className="p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 rounded-md transition-colors flex items-center gap-2"
        title="插入图片"
      >
        {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
      </button>
    </div>
  );
};

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto border border-slate-800 my-4',
        },
      }),
      Placeholder.configure({
        placeholder: '输入文字，内容将自动保存...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-emerald max-w-none min-h-[400px] focus:outline-none p-6 md:p-8',
      },
    },
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative shadow-lg">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}