
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../AppContext';
import { ProjectCategory, Project } from '../types';
import { Logo } from '../constants';

export const Admin: React.FC = () => {
  const { theme, setTheme, projects, setProjects, messages, adminPassword, setAdminPassword } = useApp();
  const [activeTab, setActiveTab] = useState<'projects' | 'theme' | 'messages' | 'dashboard' | 'security'>('dashboard');
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Theme editing state
  const [tempTheme, setTempTheme] = useState(theme);

  // Security state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Project editing state
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    category: ProjectCategory.APARTMENT,
    visible: true
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === adminPassword) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleSaveTheme = () => {
    setTheme(tempTheme);
    alert('테마 설정이 저장되었습니다.');
  };

  const handleChangePassword = () => {
    if (!newPassword) {
      alert('새 비밀번호를 입력해주세요.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setAdminPassword(newPassword);
    alert('비밀번호가 성공적으로 변경되었습니다. 다음 로그인부터 적용됩니다.');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSaveProject = () => {
    if (editingId) {
      setProjects(projects.map(p => p.id === editingId ? { ...p, ...newProject } as Project : p));
      setEditingId(null);
    } else {
      const p = {
        ...newProject,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        visible: newProject.visible ?? true
      } as Project;
      setProjects([p, ...projects]);
      setIsAdding(false);
    }
    setNewProject({ category: ProjectCategory.APARTMENT, visible: true });
  };

  const deleteProject = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const toggleVisibility = (id: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, visible: !p.visible } : p));
  };

  // Login Wall
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F2EFE9] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center space-y-8 animate-in zoom-in duration-500">
          <div className="flex flex-col items-center gap-4">
            <Logo color={theme.primaryColor} />
            <h1 className="font-serif text-3xl font-bold tracking-tight" style={{ color: theme.primaryColor }}>
              {theme.brandName} Admin
            </h1>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            관리자 대시보드에 접근하기 위해 비밀번호를 입력해주세요.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                autoFocus
                type="password"
                placeholder="Password"
                className={`w-full bg-gray-50 border-none rounded-xl p-5 text-center focus:ring-2 outline-none transition-all ${
                  loginError ? 'ring-2 ring-red-400' : 'focus:ring-blue-500'
                }`}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setLoginError(false);
                }}
              />
              {loginError && (
                <p className="text-red-500 text-xs mt-2 animate-in slide-in-from-top-1 font-bold">비밀번호가 올바르지 않습니다.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: theme.primaryColor }}
            >
              Login
            </button>
          </form>
          <Link to="/" className="inline-block text-gray-300 text-xs hover:text-gray-500 transition-colors uppercase tracking-widest font-bold">
            Back to Website
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2B4360] text-white p-8 space-y-12 shrink-0">
        <div className="flex items-center gap-3">
          <Logo color="#fff" />
          <span className="font-serif font-bold text-xl">Admin</span>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'dashboard', label: '대시보드', icon: '📊' },
            { id: 'projects', label: '포트폴리오 관리', icon: '📁' },
            { id: 'theme', label: '테마 설정', icon: '🎨' },
            { id: 'messages', label: '문의 내역', icon: '✉️' },
            { id: 'security', label: '보안 설정', icon: '🔒' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                activeTab === item.id ? 'bg-white/10' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
          
          <div className="pt-8 space-y-2 border-t border-white/10 mt-8">
            <Link 
              to="/" 
              className="w-full text-left px-4 py-3 rounded-lg opacity-60 hover:opacity-100 flex items-center gap-3 transition-colors text-sm"
            >
              <span>🏠</span>
              사이트로 돌아가기
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="w-full text-left px-4 py-3 rounded-lg opacity-60 hover:opacity-100 flex items-center gap-3 transition-colors text-sm text-red-300"
            >
              <span>🚪</span>
              로그아웃
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-12 overflow-y-auto h-screen">
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-300">
             <h2 className="text-3xl font-bold">대시보드</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                   <p className="text-gray-400 text-sm font-bold mb-2">전체 포트폴리오</p>
                   <p className="text-4xl font-serif">{projects.length} <span className="text-lg">건</span></p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                   <p className="text-gray-400 text-sm font-bold mb-2">공개 중인 사례</p>
                   <p className="text-4xl font-serif text-green-600">{projects.filter(p => p.visible).length} <span className="text-lg text-gray-400 font-sans">건</span></p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                   <p className="text-gray-400 text-sm font-bold mb-2">미확인 문의</p>
                   <p className="text-4xl font-serif text-blue-600">{messages.length} <span className="text-lg text-gray-400 font-sans">건</span></p>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">포트폴리오 관리</h2>
              <button
                onClick={() => { setIsAdding(true); setEditingId(null); setNewProject({ category: ProjectCategory.APARTMENT, visible: true }); }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                + 새 프로젝트 추가
              </button>
            </div>

            {(isAdding || editingId) && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
                <h3 className="text-xl font-bold">{editingId ? '프로젝트 수정' : '새 프로젝트'}</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">제목</label>
                    <input
                      type="text"
                      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newProject.title || ''}
                      onChange={e => setNewProject({...newProject, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">카테고리</label>
                    <select
                      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newProject.category}
                      onChange={e => setNewProject({...newProject, category: e.target.value})}
                    >
                      {Object.values(ProjectCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">장소</label>
                    <input
                      type="text"
                      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newProject.location || ''}
                      onChange={e => setNewProject({...newProject, location: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">사용 제품</label>
                    <input
                      type="text"
                      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newProject.productUsed || ''}
                      onChange={e => setNewProject({...newProject, productUsed: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">Before 이미지 URL</label>
                    <input
                      type="text"
                      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newProject.beforeImage || ''}
                      onChange={e => setNewProject({...newProject, beforeImage: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">After 이미지 URL</label>
                    <input
                      type="text"
                      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newProject.afterImage || ''}
                      onChange={e => setNewProject({...newProject, afterImage: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="visible-toggle"
                      className="w-5 h-5 cursor-pointer"
                      checked={newProject.visible}
                      onChange={e => setNewProject({...newProject, visible: e.target.checked})}
                    />
                    <label htmlFor="visible-toggle" className="text-sm font-bold text-gray-700 cursor-pointer">사이트에 공개하기</label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500">설명</label>
                  <textarea
                    rows={4}
                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={newProject.description || ''}
                    onChange={e => setNewProject({...newProject, description: e.target.value})}
                  />
                </div>
                <div className="flex gap-4">
                  <button onClick={handleSaveProject} className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">저장하기</button>
                  <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="bg-gray-200 px-8 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors">취소</button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {projects.map(p => (
                <div key={p.id} className="bg-white p-4 rounded-xl flex items-center justify-between border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <img src={p.afterImage} className="w-16 h-16 object-cover rounded-lg bg-gray-100" alt="" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold">{p.title}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${p.visible ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                          {p.visible ? '공개중' : '비공개'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{p.location} | {p.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleVisibility(p.id)}
                      className={`p-2 rounded text-xs font-bold transition-colors ${p.visible ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'}`}
                    >
                      {p.visible ? '숨기기' : '공개하기'}
                    </button>
                    <button
                      onClick={() => { setEditingId(p.id); setNewProject(p); setIsAdding(false); }}
                      className="p-2 hover:bg-gray-100 rounded text-blue-600 font-bold text-xs"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => deleteProject(p.id)}
                      className="p-2 hover:bg-gray-100 rounded text-red-600 font-bold text-xs"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="max-w-2xl space-y-8 animate-in slide-in-from-left-4 duration-300">
            <h2 className="text-3xl font-bold">테마 설정</h2>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-8">
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-500 block">브랜드 이름</label>
                <input
                  type="text"
                  className="w-full border p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={tempTheme.brandName}
                  onChange={e => setTempTheme({...tempTheme, brandName: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-500 block">Primary 컬러</label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="color"
                      className="w-12 h-12 rounded cursor-pointer border-none"
                      value={tempTheme.primaryColor}
                      onChange={e => setTempTheme({...tempTheme, primaryColor: e.target.value})}
                    />
                    <input
                      type="text"
                      className="border p-2 rounded-lg flex-grow font-mono uppercase text-sm"
                      value={tempTheme.primaryColor}
                      onChange={e => setTempTheme({...tempTheme, primaryColor: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveTheme}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all"
              >
                변경 사항 적용하기
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="max-w-2xl space-y-8 animate-in slide-in-from-left-4 duration-300">
            <h2 className="text-3xl font-bold">보안 설정</h2>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-8">
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-500 block">새 비밀번호</label>
                <input
                  type="password"
                  className="w-full border p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="새로운 비밀번호 입력"
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-500 block">비밀번호 확인</label>
                <input
                  type="password"
                  className="w-full border p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="새로운 비밀번호 재입력"
                />
              </div>
              <button
                onClick={handleChangePassword}
                className="w-full py-4 bg-black text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 transition-all active:scale-[0.98]"
              >
                비밀번호 변경하기
              </button>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold">문의 내역</h2>
            <div className="grid grid-cols-1 gap-6">
              {messages.length === 0 ? (
                <div className="bg-white p-20 text-center rounded-2xl border border-dashed border-gray-300 text-gray-400">
                  접수된 문의가 없습니다.
                </div>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded mb-2 inline-block">
                          {msg.type} 문의
                        </span>
                        <h4 className="text-xl font-bold">{msg.name} 님</h4>
                        <p className="text-gray-500 font-mono text-xs">{msg.email}</p>
                      </div>
                      <span className="text-sm text-gray-400">{msg.date}</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
