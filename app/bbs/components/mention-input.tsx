"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

type MentionUser = {
  id: string;
  name: string;
  image: string | null;
  role: string;
};

interface MentionInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MentionInput({ value, onChange, placeholder, disabled }: MentionInputProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<MentionUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cursorPositionRef = useRef(0);

  // Parse text to render highlighted mentions
  const renderText = () => {
    if (!value) return null;
    
    const parts = value.split(/(@\S+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('@')) {
        return <span key={i} className="text-[#00bfa5] bg-[#00bfa5]/10 px-1 rounded">{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      // Allow searching even when searchQuery is empty (just typing @)
      // to show a default list of users

      setLoading(true);
      try {
        const res = await fetch(`/api/bbs/users/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        if (data.success) {
          setUsers(data.data);
          setSelectedIndex(0);
        }
      } catch (error) {
        console.error("Failed to search users", error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if dropdown is supposed to be open
    if (showDropdown) {
      const debounceTimer = setTimeout(fetchUsers, 300);
      return () => clearTimeout(debounceTimer);
    }
  }, [searchQuery, showDropdown]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          textareaRef.current && !textareaRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCaretCoordinates = () => {
    // 简单的光标位置估算
    const textarea = textareaRef.current;
    if (!textarea) return { top: 0, left: 0 };
    
    // 获取 textarea 内部的相对位置，加上外边距
    // 把 top 设置为负数，让下拉框浮在输入框的上面，而不是被挤到下面
    return { 
      top: -200, // 向上偏移，确保不会被外部容器遮挡
      left: 10 
    };
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    const cursorPosition = e.target.selectionStart;
    cursorPositionRef.current = cursorPosition;

    // Check if we are typing a mention
    const textBeforeCursor = newValue.slice(0, cursorPosition);
    // Find the position of the last '@' before the cursor
    const lastAtSymbolIndex = textBeforeCursor.lastIndexOf('@');

    // If there is an '@' and it's either at the start of the string or preceded by a space/newline/punctuation
    if (lastAtSymbolIndex !== -1 && (lastAtSymbolIndex === 0 || /[\s,.;!?'"()\[\]{}\n\r]/.test(textBeforeCursor[lastAtSymbolIndex - 1]))) {
      // Extract the query string after the '@'
      const query = textBeforeCursor.slice(lastAtSymbolIndex + 1);
      
      // If the query doesn't contain spaces (meaning we haven't finished typing the mention)
      // and it's not excessively long (e.g. they typed @ and then wrote a whole paragraph without spaces)
      if (!/\s/.test(query) && query.length < 50) {
        setSearchQuery(query);
        setShowDropdown(true);
        setDropdownPosition(getCaretCoordinates());
        return;
      }
    }
    
    setShowDropdown(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showDropdown || users.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < users.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      insertMention(users[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const insertMention = (user: MentionUser) => {
    const textBeforeCursor = value.slice(0, cursorPositionRef.current);
    const textAfterCursor = value.slice(cursorPositionRef.current);
    
    // Find where the @ starts
    const lastAtSymbolIndex = textBeforeCursor.lastIndexOf('@');
    
    if (lastAtSymbolIndex !== -1) {
      const newTextBefore = textBeforeCursor.slice(0, lastAtSymbolIndex);
      const newText = `${newTextBefore}@${user.name} ${textAfterCursor}`;
      
      onChange(newText);
      setShowDropdown(false);
      
      // Refocus textarea after insertion
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          // Calculate new cursor position
          const newCursorPos = newTextBefore.length + user.name.length + 2; // +2 for @ and space
          textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 10);
    }
  };

  return (
    <div className="relative">
      <div className="relative min-h-[100px]">
        {/* Rendered output for highlights */}
        <div 
          className="absolute inset-0 p-4 whitespace-pre-wrap break-words pointer-events-none"
          aria-hidden="true"
        >
          {/* We only render the transparent text for layout and overlay the highlights */}
          {value ? (
            value.split(/(@\S+)/g).map((part, i) => (
              part.startsWith('@') 
                ? <span key={i} className="text-transparent bg-[#00bfa5]/20 rounded">{part}</span>
                : <span key={i} className="text-transparent">{part}</span>
            ))
          ) : null}
        </div>
        
        {/* Actual textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full h-32 bg-slate-900/40 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#00bfa5]/50 focus:ring-1 focus:ring-[#00bfa5]/50 resize-none transition-all relative z-10 bg-transparent"
        />
      </div>

      {/* Mention Dropdown */}
      {showDropdown && (
        <div 
          ref={dropdownRef}
          className="absolute z-[100] w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl overflow-hidden"
          style={{ 
            top: 'auto', // 覆盖掉之前可能的内联 top 样式
            bottom: '100%', // 始终贴在输入框顶部
            left: '1rem',
            marginBottom: '0.5rem' // 留出一点间隙
          }}
        >
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
            </div>
          ) : users.length === 0 ? (
            <div className="p-3 text-sm text-slate-400 text-center">
              未找到用户
            </div>
          ) : (
            <ul className="max-h-48 overflow-y-auto">
              {users.map((user, idx) => (
                <li 
                  key={user.id}
                  onClick={() => insertMention(user)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center gap-2 p-2 cursor-pointer transition-colors ${
                    idx === selectedIndex ? "bg-slate-700" : "hover:bg-slate-700/50"
                  }`}
                >
                  {user.image ? (
                    <img src={user.image} alt="" className="w-6 h-6 rounded-full" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-[10px] text-slate-300">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm text-slate-200 truncate">{user.name}</span>
                  {user.role === 'vip' && (
                    <span className="text-[10px] text-amber-400 border border-amber-400/30 px-1 rounded ml-auto">PRO</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
