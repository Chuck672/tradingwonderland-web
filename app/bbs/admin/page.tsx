"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, Search, ShieldAlert, User, Edit2, Save, X } from "lucide-react";

type UserAdminData = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  membershipLevel: number;
  bbsRole: string | null;
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [users, setUsers] = useState<UserAdminData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("member");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      checkAdminStatus();
    }
  }, [status, router]);

  const checkAdminStatus = async () => {
    try {
      const res = await fetch("/api/bbs/profile");
      const json = await res.json();
      
      if (json.success && json.data.bbsRole === "admin") {
        setIsAdmin(true);
        fetchUsers();
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setIsAdmin(false);
      setLoading(false);
    }
  };

  const fetchUsers = async (query = "") => {
    try {
      setLoading(true);
      const url = `/api/bbs/admin/users${query ? `?q=${encodeURIComponent(query)}` : ""}`;
      const res = await fetch(url);
      const json = await res.json();
      
      if (json.success) {
        setUsers(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(searchQuery);
  };

  const startEditing = (user: UserAdminData) => {
    setEditingUserId(user.id);
    setSelectedRole(user.bbsRole || "member");
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setSelectedRole("member");
  };

  const handleUpdateRole = async (userId: string) => {
    if (!confirm("确定要修改该用户的权限角色吗？")) return;

    setUpdating(true);
    try {
      const res = await fetch("/api/bbs/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, bbsRole: selectedRole }),
      });

      const json = await res.json();
      if (json.success) {
        // Update local state
        setUsers(users.map(u => 
          u.id === userId ? { ...u, bbsRole: selectedRole } : u
        ));
        setEditingUserId(null);
        alert("权限更新成功");
      } else {
        alert(json.message || "更新失败");
      }
    } catch (err) {
      alert("网络错误");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-[#00bfa5] animate-spin" />
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-xl">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-4 opacity-80" />
        <h3 className="text-lg font-medium text-slate-200 mb-2">无权访问</h3>
        <p className="text-slate-400 text-sm mb-6">只有系统管理员可以访问此页面</p>
        <button onClick={() => router.push("/bbs")} className="px-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors">
          返回社区首页
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">社区管理后台</h1>
            <p className="text-sm text-slate-400">管理用户角色与版主权限</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索用户名或邮箱..."
            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </form>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50 text-xs uppercase text-slate-400 tracking-wider">
                <th className="p-4 font-medium">用户</th>
                <th className="p-4 font-medium">邮箱</th>
                <th className="p-4 font-medium">主站订阅等级</th>
                <th className="p-4 font-medium">社区独立角色</th>
                <th className="p-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <img src={user.image} alt="" className="w-8 h-8 rounded-full border border-slate-700" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-bold">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                      <span className="font-medium text-slate-200">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-400">{user.email}</td>
                  <td className="p-4 text-sm">
                    {user.membershipLevel > 0 ? (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        Level {user.membershipLevel} VIP
                      </span>
                    ) : (
                      <span className="text-slate-500">Free</span>
                    )}
                  </td>
                  <td className="p-4">
                    {editingUserId === user.id ? (
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                      >
                        <option value="member">普通成员 (Member)</option>
                        <option value="moderator">版主 (Moderator)</option>
                        <option value="admin">管理员 (Admin)</option>
                      </select>
                    ) : (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        user.bbsRole === 'admin' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                        user.bbsRole === 'moderator' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {user.bbsRole === 'admin' ? '管理员' : user.bbsRole === 'moderator' ? '版主' : '默认'}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {editingUserId === user.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleUpdateRole(user.id)}
                          disabled={updating}
                          className="p-1.5 text-emerald-500 hover:bg-emerald-500/10 rounded transition-colors"
                          title="保存"
                        >
                          {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={cancelEditing}
                          disabled={updating}
                          className="p-1.5 text-slate-500 hover:bg-slate-800 rounded transition-colors"
                          title="取消"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => startEditing(user)}
                        className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 rounded transition-colors"
                        title="编辑角色"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 text-sm">
                    未找到匹配的用户
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}