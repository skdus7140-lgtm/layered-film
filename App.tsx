
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  ImageIcon as ImageIconIcon, 
  MessageSquare, 
  Settings as SettingsIcon, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  ExternalLink,
  ChevronDown,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Search,
  ChevronLeft,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers,
  Lock,
  KeyRound
} from 'lucide-react';
import { PortfolioItem, Inquiry, SiteSettings, Page } from './types';
import { INITIAL_PORTFOLIO, DEFAULT_SETTINGS, CATEGORIES } from './constants';

const LOGO_IMAGE_URL = 'https://i.imgur.com/6pCt9GC.png';
const WEB3FORMS_ACCESS_KEY = '63cb2bc7-dfb5-474f-8cb2-1f2e7f0aaf67';
const DEFAULT_ADMIN_PASSWORD = 'nyws0825';

// --- Comparison Slider Component ---

const BeforeAfterSlider: React.FC<{ before: string; after: string }> = ({ before, after }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, position)));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl cursor-col-resize select-none"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image (Background) */}
      <img src={after} className="absolute inset-0 w-full h-full object-cover" alt="After" />
      <div className="absolute bottom-6 right-8 bg-blue-600/80 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-widest z-10">AFTER</div>

      {/* Before Image (Overlay) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img src={before} className="absolute inset-0 w-full h-full object-cover" alt="Before" />
        <div className="absolute bottom-6 left-8 bg-black/60 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-widest z-10">BEFORE</div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center">
          <div className="flex gap-1">
            <div className="w-1 h-4 bg-gray-300 rounded-full" />
            <div className="w-1 h-4 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Components ---

const Navbar: React.FC<{ 
  currentPage: Page, 
  setCurrentPage: (p: Page) => void,
  settings: SiteSettings 
}> = ({ currentPage, setCurrentPage, settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isTransparent = currentPage === 'home';

  const navItems = [
    { label: 'Home', value: 'home' },
    { label: 'About', value: 'about' },
    { label: 'Portfolio', value: 'portfolio' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isTransparent ? 'bg-white/90 backdrop-blur-md' : 'bg-white shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setCurrentPage('home')}
        >
          <img src={LOGO_IMAGE_URL} alt={settings.brandName} className="h-10 w-auto object-contain" />
          <span className="hidden sm:inline text-xl font-bold tracking-tighter font-luxury text-black">
            {settings.brandName}
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setCurrentPage(item.value as Page)}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                currentPage === item.value ? 'text-blue-600 font-bold underline underline-offset-8' : 'text-gray-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage('admin-login')}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <SettingsIcon size={18} />
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-white shadow-lg md:hidden border-t"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    setCurrentPage(item.value as Page);
                    setIsOpen(false);
                  }}
                  className="text-left text-lg font-medium text-gray-700 hover:text-blue-600 py-2 border-b border-gray-100"
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => {
                  setCurrentPage('admin-login');
                  setIsOpen(false);
                }}
                className="text-left text-lg font-medium text-gray-400 py-2"
              >
                관리자 페이지
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer: React.FC<{ settings: SiteSettings }> = ({ settings }) => (
  <footer className="bg-gray-50 border-t border-gray-100 py-16 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="col-span-1">
        <div className="flex items-center gap-3 mb-6">
          <img src={LOGO_IMAGE_URL} alt="Logo" className="h-8 w-auto grayscale brightness-50" />
          <h2 className="text-2xl font-bold font-luxury text-black">{settings.brandName}</h2>
        </div>
        <p className="text-gray-500 leading-relaxed mb-6 max-w-sm">
          레이어드 필름은 공간의 가치를 더 깊이 있게 만드는 인테리어 필름 전문 시공 브랜드입니다. 
          디테일의 차이가 만드는 품격을 경험하세요.
        </p>
      </div>
      <div>
        <h3 className="font-bold text-gray-800 mb-4 text-black">Contact</h3>
        <ul className="space-y-3 text-sm text-gray-500">
          <li className="flex items-center gap-2"><Phone size={14} className="text-black" /> 010-9189-1389</li>
          <li className="flex items-center gap-2"><Mail size={14} className="text-black" /> zztop1996@gmail.com</li>
        </ul>
        <p className="mt-8 text-xs text-gray-400">© 2024 Layered Film. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

// --- User Pages ---

const HomePage: React.FC<{ 
  settings: SiteSettings, 
  portfolio: PortfolioItem[],
  setCurrentPage: (p: Page) => void 
}> = ({ settings, portfolio, setCurrentPage }) => {
  const publicPortfolio = portfolio.filter(item => item.isPublic);

  return (
    <div className="pt-20">
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Premium Interior" 
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative text-center text-white px-6 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-light mb-6 tracking-tight font-serif-kr leading-relaxed whitespace-pre-line"
          >
            {settings.heroText.split('\n')[0]}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="text-base md:text-lg mb-10 tracking-normal leading-relaxed whitespace-pre-line font-light opacity-90"
          >
            {settings.heroText.split('\n').slice(1).join('\n')}
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('contact')}
            className="bg-white text-black px-10 py-4 rounded-full font-medium transition-all hover:bg-blue-600 hover:text-white shadow-2xl"
          >
            무료 견적 문의하기
          </motion.button>
        </div>
      </section>

      <section className="py-24 bg-white text-gray-900 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <span className="text-sm font-bold tracking-widest uppercase text-blue-600 mb-4 block font-luxury">Featured</span>
              <h2 className="text-4xl font-bold font-serif-kr text-black">최근 시공 사례</h2>
            </div>
            <button 
              onClick={() => setCurrentPage('portfolio')}
              className="text-blue-600 flex items-center gap-2 hover:underline font-medium font-luxury"
            >
              VIEW ALL <ChevronRight size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {publicPortfolio.slice(0, 2).map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -12 }}
                className="group relative cursor-pointer overflow-hidden rounded-[2.5rem] shadow-2xl"
                onClick={() => setCurrentPage('portfolio')}
              >
                <img src={item.thumbnail} className="w-full aspect-video object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
                  <span className="text-xs font-bold text-blue-400 mb-3 tracking-widest uppercase font-luxury">{item.category}</span>
                  <h3 className="text-3xl font-bold mb-3 font-serif-kr text-white">{item.title}</h3>
                  <p className="text-white/60 text-sm font-light line-clamp-1">{item.summary}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutPage: React.FC = () => {
  const processSteps = [
    {
      num: '1',
      title: '상담 및 실측',
      desc: '시공 부위 확인 및 정확한 면적 측정을 진행합니다.'
    },
    {
      num: '2',
      title: '필름 선정',
      desc: '공간의 무드에 맞는 텍스처와 컬러의 필름을 선택합니다.'
    },
    {
      num: '3',
      title: '밑작업',
      desc: '퍼티 작업 및 프라이머 도포로 완벽한 접착을 준비합니다.'
    },
    {
      num: '4',
      title: '본 시공',
      desc: '레이어드필름만의 정밀 기술로 빈틈 없는 마감을 진행합니다.'
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-blue-600 mb-4 block font-luxury"
          >
            The Art of Layering
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-8 font-serif-kr text-black"
          >
            공간의 결을 새롭게 정의합니다
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg font-light leading-loose"
          >
            인테리어 필름은 단순한 마감재를 넘어, 공간의 분위기와 내구성을 결정짓는 핵심 요소입니다. 
            Layered Film은 정교한 기술력과 최고급 소재를 통해 당신의 공간에 새로운 생명력을 불어넣습니다.
          </motion.p>
        </div>

        {/* Film Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100"
          >
            <Layers className="text-blue-600 mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4 font-serif-kr text-black">다양한 질감과 패턴</h3>
            <p className="text-gray-500 font-light leading-relaxed">
              우드, 스톤, 메탈, 패브릭 등 수백 가지의 프리미엄 텍스처를 지원합니다. 
              빛의 각도에 따라 변하는 섬세한 질감은 기성 가구 이상의 고급스러움을 제공합니다.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100"
          >
            <ShieldCheck className="text-blue-600 mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4 font-serif-kr text-black">뛰어난 내구성과 안정성</h3>
            <p className="text-gray-500 font-light leading-relaxed">
              스크래치에 강하고 습기에 강해 주방이나 욕실 입구에도 적합합니다. 
              방염 인증을 거친 안전한 소재만을 사용하여 화재 시에도 안전을 보장합니다.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100"
          >
            <Zap className="text-blue-600 mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4 font-serif-kr text-black">합리적인 공정</h3>
            <p className="text-gray-500 font-light leading-relaxed">
              철거 없이 기존 기물의 형태를 유지하며 시공하므로 소음과 먼지가 적습니다. 
              빠른 시공 속도로 거주 중인 공간에서도 최소한의 불편함으로 변화를 줄 수 있습니다.
            </p>
          </motion.div>
        </div>

        {/* Process Section */}
        <div className="mb-32">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold mb-16 font-serif-kr text-center text-black"
          >
            시공 프로세스
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl font-luxury font-bold text-blue-600 mb-6">{step.num}</div>
                <h4 className="text-xl font-bold font-serif-kr mb-4 text-black">{step.title}</h4>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Service Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-[3rem] p-12 md:p-20 text-center"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-blue-600 mb-6 block font-luxury">Service</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 font-serif-kr text-black max-w-4xl mx-auto leading-relaxed">
            레이어드필름은 단순한 덮기 작업이 아닙니다.
          </h2>
          <p className="text-gray-600 text-lg font-light leading-loose max-w-3xl mx-auto">
            공간의 구조를 이해하고, 각 소재의 특성에 맞는 최적의 공법을 적용합니다. 
            시간이 지나도 들뜨지 않는 완벽한 내구성을 약속드립니다.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const PortfolioPage: React.FC<{ portfolio: PortfolioItem[] }> = ({ portfolio }) => {
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = portfolio.filter(item => {
    if (!item.isPublic) return false;
    const matchesCategory = activeCategory === '전체' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-blue-600 mb-4 block font-luxury">Our Gallery</span>
            <h1 className="text-5xl font-bold mb-6 font-serif-kr text-black">포트폴리오</h1>
            <p className="text-gray-500 text-lg font-light max-w-xl">레이어드 필름의 섬세한 시공 사례와 제품 정보, 정교한 디테일을 확인해보세요.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="검색어를 입력하세요..."
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-black transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {['전체', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === cat ? 'bg-black text-white shadow-xl' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden group transition-all duration-500 flex flex-col cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={item.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-bold text-black uppercase tracking-[0.2em]">
                    {item.category}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-bold text-2xl text-gray-900 font-serif-kr leading-tight mb-4 text-black">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 font-light line-clamp-2 leading-relaxed text-black/70">{item.summary}</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-600 mt-auto">
                    VIEW DETAILS <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-40">
            <p className="text-gray-400 text-lg italic">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[3rem] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-8 border-b border-gray-100">
                <div className="flex items-center gap-4">
                   <div className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest">{selectedItem.category}</div>
                   <h2 className="text-2xl font-bold font-serif-kr text-black">{selectedItem.title}</h2>
                </div>
                <button onClick={() => setSelectedItem(null)} className="p-4 hover:bg-gray-100 rounded-full transition-all">
                  <X className="text-black" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 custom-scroll text-black">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-12">
                    {selectedItem.beforeImage && (
                      <div className="space-y-6">
                        <BeforeAfterSlider before={selectedItem.beforeImage} after={selectedItem.thumbnail} />
                        <p className="text-center text-[10px] text-gray-400 font-luxury tracking-[0.2em] uppercase">Slide left or right to compare</p>
                      </div>
                    )}
                    <div className="space-y-6">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-luxury">Project Gallery</h4>
                      <div className="grid grid-cols-1 gap-6">
                        {selectedItem.images.map((img, idx) => (
                          <img key={idx} src={img} className="w-full rounded-[2rem] shadow-xl" alt={`${selectedItem.title} - ${idx + 1}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-10 sticky top-0 h-fit">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 font-luxury">Description</h4>
                      <p className="text-gray-600 leading-loose font-light text-lg">{selectedItem.description}</p>
                    </div>
                    {selectedItem.productInfo && (
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 font-luxury">시공 필름</h4>
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-black font-medium text-sm">
                          {selectedItem.productInfo}
                        </div>
                      </div>
                    )}
                    <button 
                      onClick={() => { setSelectedItem(null); }}
                      className="w-full bg-black text-white py-5 rounded-2xl font-bold shadow-2xl hover:bg-gray-800 transition-all font-luxury tracking-widest uppercase"
                    >
                      닫기
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactPage: React.FC<{ 
  onInquirySubmit: (data: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void 
}> = ({ onInquirySubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: 'N/A', 
    estimateType: '아파트',
    budget: '협의 후 결정',
    content: '',
    parts: [] as string[],
    botcheck: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.botcheck) return; 

    setIsSubmitting(true);
    setIsError(false);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          estimate_type: formData.estimateType,
          budget: formData.budget,
          message: formData.content,
          subject: `[Layered Film] 새로운 견적 문의: ${formData.name}`
        })
      });

      const result = await response.json();

      if (result.success) {
        onInquirySubmit({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          estimateType: formData.estimateType,
          budget: formData.budget,
          content: formData.content,
          parts: formData.parts
        });
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', address: 'N/A', estimateType: '아파트', budget: '협의 후 결정', content: '', parts: [], botcheck: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="pt-40 pb-24 px-6 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h1 className="text-4xl font-bold mb-4 font-serif-kr text-black">접수 완료!</h1>
          <p className="text-gray-500 mb-10 font-light">24시간 내 연락드릴게요.</p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="w-full bg-black text-white py-5 rounded-2xl font-bold shadow-2xl hover:bg-gray-800 transition-all"
          >
            확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
          <div className="lg:col-span-2">
            <h1 className="text-5xl font-bold mb-8 font-serif-kr text-black">견적 문의</h1>
            <p className="text-gray-500 text-lg mb-12 leading-relaxed font-light">
              공간에 대한 고민을 남겨주시면<br />
              전문가와 함께 가장 완벽한 솔루션을 찾아드립니다.
            </p>
            <div className="space-y-10 text-black">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                  <Phone size={22} className="text-black" />
                </div>
                <div>
                  <div className="text-sm font-bold text-black mb-1 font-luxury tracking-wider">CONTACT</div>
                  <div className="text-lg text-gray-500 font-light font-luxury">010-9189-1389</div>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                  <Mail size={22} className="text-black" />
                </div>
                <div>
                  <div className="text-sm font-bold text-black mb-1 font-luxury tracking-wider">EMAIL</div>
                  <div className="text-lg text-gray-500 font-light font-luxury">zztop1996@gmail.com</div>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                  <Clock size={22} className="text-black" />
                </div>
                <div>
                  <div className="text-sm font-bold text-black mb-1 font-luxury tracking-wider">BUSINESS HOURS</div>
                  <div className="text-sm text-gray-500 font-light">평일 09:00 - 18:00 (주말/공휴일 제외)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200/50">
              {isError && (
                <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm animate-pulse">
                  <AlertCircle size={20} />
                  전송 실패. 잠시 후 다시 시도해주세요.
                </div>
              )}
              
              <div className="space-y-8">
                <input type="text" name="botcheck" style={{ display: 'none' }} value={formData.botcheck} onChange={e => setFormData({...formData, botcheck: e.target.value})} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold text-black mb-3 uppercase tracking-widest font-luxury">성함 / 업체명</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      placeholder="성함 혹은 업체명"
                      className="w-full px-6 py-4 bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all rounded-2xl text-sm text-black"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-black mb-3 uppercase tracking-widest font-luxury">연락처</label>
                    <input 
                      required
                      type="tel" 
                      name="phone"
                      placeholder="010-0000-0000"
                      className="w-full px-6 py-4 bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all rounded-2xl text-sm text-black"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-black mb-3 uppercase tracking-widest font-luxury">이메일</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    placeholder="example@email.com"
                    className="w-full px-6 py-4 bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all rounded-2xl text-sm text-black"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold text-black mb-3 uppercase tracking-widest font-luxury">견적 유형 (필수)</label>
                    <select 
                      required
                      name="estimate_type"
                      className="w-full px-6 py-4 bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all rounded-2xl text-sm appearance-none text-black font-medium"
                      value={formData.estimateType}
                      onChange={e => setFormData({...formData, estimateType: e.target.value})}
                    >
                      <option value="아파트">아파트 / 주거공간</option>
                      <option value="상가">상가 / 매장</option>
                      <option value="오피스">오피스 / 사무실</option>
                      <option value="가구">가구 / 단품</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-black mb-3 uppercase tracking-widest font-luxury">예산 (선택)</label>
                    <select 
                      name="budget"
                      className="w-full px-6 py-4 bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all rounded-2xl text-sm appearance-none text-black font-medium"
                      value={formData.budget}
                      onChange={e => setFormData({...formData, budget: e.target.value})}
                    >
                      <option value="협의 후 결정">협의 후 결정</option>
                      <option value="100만원 이하">100만원 이하</option>
                      <option value="100만원~300만원">100만원~300만원</option>
                      <option value="300만원~500만원">300만원~500만원</option>
                      <option value="500만원 이상">500만원 이상</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-black mb-3 uppercase tracking-widest font-luxury">문의 상세 내용</label>
                  <textarea 
                    required
                    name="message"
                    rows={8}
                    placeholder="시공 원하시는 부위나 필름 모델, 추가 요청 사항을 자유롭게 남겨주세요."
                    className="w-full px-6 py-4 bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all rounded-2xl text-sm resize-none leading-relaxed text-black"
                    value={formData.content}
                    onChange={e => setFormData({...formData, content: e.target.value})}
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className={`w-full py-5 rounded-2xl font-bold text-white shadow-2xl transition-all ${
                    isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
                  }`}
                >
                  {isSubmitting ? '전송 중...' : '문의하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Admin Components ---

const AdminDashboard: React.FC<{ 
  portfolio: PortfolioItem[], 
  inquiries: Inquiry[],
  setCurrentPage: (p: Page) => void
}> = ({ portfolio, inquiries, setCurrentPage }) => {
  const pendingInquiries = inquiries.filter(i => i.status === 'pending');
  
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold font-serif-kr text-black">대시보드</h2>
        <div className="text-sm text-gray-400 font-luxury tracking-widest">LATEST UPDATE: {new Date().toLocaleDateString()}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <MessageSquare size={28} />
          </div>
          <div className="text-4xl font-bold mb-2 font-luxury text-black">{inquiries.length}</div>
          <div className="text-sm text-gray-400 font-luxury tracking-[0.2em] uppercase">Total Inquiries</div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
            <Clock size={28} />
          </div>
          <div className="text-4xl font-bold mb-2 font-luxury text-black">{pendingInquiries.length}</div>
          <div className="text-sm text-gray-400 font-luxury tracking-[0.2em] uppercase">Pending Task</div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
          <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
            <ImageIconIcon size={28} />
          </div>
          <div className="text-4xl font-bold mb-2 font-luxury text-black">{portfolio.length}</div>
          <div className="text-sm text-gray-400 font-luxury tracking-[0.2em] uppercase">Projects Live</div>
        </div>
      </div>
    </div>
  );
};

const AdminPortfolio: React.FC<{ 
  portfolio: PortfolioItem[], 
  onSave: (item: PortfolioItem) => void,
  onDelete: (id: string) => void,
  onTogglePublic: (id: string) => void
}> = ({ portfolio, onSave, onDelete, onTogglePublic }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null);

  const [formData, setFormData] = useState<Omit<PortfolioItem, 'id'>>({
    title: '',
    category: '아파트',
    thumbnail: '',
    beforeImage: '',
    images: [],
    summary: '',
    description: '',
    productInfo: '',
    isPublic: true,
    date: new Date().toISOString().split('T')[0]
  });

  const handleStartAdd = () => {
    setEditItem(null);
    setFormData({
      title: '',
      category: '아파트',
      thumbnail: '',
      beforeImage: '',
      images: [],
      summary: '',
      description: '',
      productInfo: '',
      isPublic: true,
      date: new Date().toISOString().split('T')[0]
    });
    setIsEditing(true);
  };

  const handleStartEdit = (item: PortfolioItem) => {
    setEditItem(item);
    setFormData({ ...item });
    setIsEditing(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemToSave: PortfolioItem = {
      ...formData,
      id: editItem ? editItem.id : Math.random().toString(36).substring(2, 9)
    };
    onSave(itemToSave);
    setIsEditing(false);
  };

  const handleImageInput = (value: string) => {
    const images = value.split(',').map(s => s.trim()).filter(s => s);
    setFormData({ ...formData, images });
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold font-serif-kr text-black">포트폴리오 관리</h2>
        <button 
          onClick={handleStartAdd}
          className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-bold shadow-2xl transition-all hover:bg-gray-800"
        >
          <Plus size={20} />
          <span className="font-luxury tracking-widest uppercase text-xs">Add New Portfolio</span>
        </button>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100"
          >
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-xl font-bold font-serif-kr text-black">{editItem ? 'Edit Portfolio' : 'New Portfolio'}</h3>
               <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
            </div>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 font-luxury">Title *</label>
                  <input required type="text" className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500 text-black" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 font-luxury">Category *</label>
                  <select className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500 text-black" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 font-luxury">Thumbnail (After) URL *</label>
                  <input required type="text" className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500 text-black" value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 font-luxury">Before Image URL (Optional)</label>
                  <input type="text" className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500 text-black" value={formData.beforeImage} onChange={e => setFormData({...formData, beforeImage: e.target.value})} />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 font-luxury">시공 필름 정보</label>
                  <input type="text" className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500 text-black" placeholder="예: 현대 L&C S115" value={formData.productInfo} onChange={e => setFormData({...formData, productInfo: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 font-luxury">One-line Summary *</label>
                  <input required type="text" className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500 text-black" value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 font-luxury">Full Description</label>
                  <textarea rows={5} className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500 text-black resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 font-luxury">Gallery Images (Comma separated URLs)</label>
                  <textarea rows={3} className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500 text-black resize-none" value={formData.images.join(', ')} onChange={e => handleImageInput(e.target.value)} />
                </div>
                <div className="flex items-center gap-4 py-2">
                   <button 
                    type="button"
                    onClick={() => setFormData({...formData, isPublic: !formData.isPublic})}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all text-xs tracking-widest uppercase ${formData.isPublic ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                   >
                     {formData.isPublic ? <Eye size={16} /> : <EyeOff size={16} />}
                     {formData.isPublic ? 'Public' : 'Private'}
                   </button>
                </div>
              </div>
              <div className="md:col-span-2">
                 <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-bold shadow-2xl font-luxury tracking-[0.2em] uppercase hover:bg-gray-800 transition-all">
                    {editItem ? 'Update Portfolio' : 'Create Portfolio'}
                 </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolio.map(item => (
          <div key={item.id} className={`bg-white rounded-3xl shadow-sm border overflow-hidden group hover:shadow-xl transition-all ${!item.isPublic ? 'opacity-60 grayscale' : ''}`}>
             <div className="relative aspect-video">
                <img src={item.thumbnail} className="w-full h-full object-cover" alt="" />
                <div className="absolute top-4 right-4 flex gap-2">
                   <button onClick={() => onTogglePublic(item.id)} className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm hover:bg-white text-gray-600 transition-all">
                      {item.isPublic ? <Eye size={16} /> : <EyeOff size={16} />}
                   </button>
                </div>
                {!item.isPublic && <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold tracking-widest uppercase text-xs">Private</div>}
             </div>
             <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                   <span className="text-[10px] font-bold uppercase text-blue-600 tracking-widest font-luxury">{item.category}</span>
                   <span className="text-[10px] text-gray-400 font-luxury">{item.date}</span>
                </div>
                <h4 className="font-bold text-lg mb-4 text-black font-serif-kr line-clamp-1">{item.title}</h4>
                <div className="flex gap-2 pt-4 border-t border-gray-50">
                   <button onClick={() => handleStartEdit(item)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-100 transition-all"><Edit2 size={14} /> Edit</button>
                   <button onClick={() => onDelete(item.id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all"><Trash2 size={14} /></button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminSettings: React.FC<{ 
  onPasswordChange: (old: string, newPw: string) => boolean 
}> = ({ onPasswordChange }) => {
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [msg, setMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.next !== passwords.confirm) {
      setMsg({ type: 'error', text: '새 비밀번호가 일치하지 않습니다.' });
      return;
    }
    const success = onPasswordChange(passwords.current, passwords.next);
    if (success) {
      setMsg({ type: 'success', text: '비밀번호가 성공적으로 변경되었습니다.' });
      setPasswords({ current: '', next: '', confirm: '' });
    } else {
      setMsg({ type: 'error', text: '현재 비밀번호가 올바르지 않습니다.' });
    }
  };

  return (
    <div className="space-y-10 max-w-2xl">
      <h2 className="text-3xl font-bold font-serif-kr text-black">설정</h2>
      
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <Lock size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif-kr text-black">비밀번호 변경</h3>
            <p className="text-sm text-gray-400 font-light">관리자 패널 접속 비밀번호를 수정합니다.</p>
          </div>
        </div>

        {msg && (
          <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 text-sm ${msg.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            <AlertCircle size={18} />
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 font-luxury">현재 비밀번호</label>
            <input 
              required
              type="password"
              className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500 text-black transition-all"
              value={passwords.current}
              onChange={e => setPasswords({...passwords, current: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 font-luxury">새 비밀번호</label>
              <input 
                required
                type="password"
                className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500 text-black transition-all"
                value={passwords.next}
                onChange={e => setPasswords({...passwords, next: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 font-luxury">새 비밀번호 확인</label>
              <input 
                required
                type="password"
                className="w-full p-4 bg-gray-50 rounded-2xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-blue-500 text-black transition-all"
                value={passwords.confirm}
                onChange={e => setPasswords({...passwords, confirm: e.target.value})}
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-bold shadow-2xl font-luxury tracking-[0.2em] uppercase hover:bg-gray-800 transition-all">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('portfolio_v5');
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
  });
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('inquiries_v5');
    return saved ? JSON.parse(saved) : [];
  });
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem('admin_password') || DEFAULT_ADMIN_PASSWORD;
  });
  const [settings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolio_v5', JSON.stringify(portfolio));
    localStorage.setItem('inquiries_v5', JSON.stringify(inquiries));
    localStorage.setItem('admin_password', adminPassword);
  }, [portfolio, inquiries, adminPassword]);

  const handleInquirySubmit = (data: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setInquiries([...inquiries, newInquiry]);
  };

  const handlePortfolioSave = (item: PortfolioItem) => {
    setPortfolio(prev => {
      const exists = prev.find(p => p.id === item.id);
      if (exists) return prev.map(p => p.id === item.id ? item : p);
      return [...prev, item];
    });
  };

  const handlePortfolioDelete = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setPortfolio(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleTogglePublic = (id: string) => {
    setPortfolio(prev => prev.map(p => p.id === id ? { ...p, isPublic: !p.isPublic } : p));
  };

  const handlePasswordChange = (old: string, next: string): boolean => {
    if (old === adminPassword) {
      setAdminPassword(next);
      return true;
    }
    return false;
  };

  const renderPage = () => {
    if (currentPage.startsWith('admin-') && !isAdmin && currentPage !== 'admin-login') {
      setCurrentPage('admin-login');
      return null;
    }

    switch (currentPage) {
      case 'home': return <HomePage settings={settings} portfolio={portfolio} setCurrentPage={setCurrentPage} />;
      case 'about': return <AboutPage />;
      case 'portfolio': return <PortfolioPage portfolio={portfolio} />;
      case 'contact': return <ContactPage onInquirySubmit={handleInquirySubmit} />;
      case 'admin-login': return (
        <div className="pt-40 flex justify-center px-6">
          <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 font-serif-kr text-black text-center">Admin Login</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const pw = (e.target as any).password.value;
              if (pw === adminPassword) {
                setIsAdmin(true);
                setCurrentPage('admin-dashboard');
              } else {
                alert('Invalid Password');
              }
            }}>
              <input type="password" name="password" placeholder="Password" className="w-full p-4 bg-gray-50 rounded-2xl mb-6 border-none ring-1 ring-gray-100 text-black focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              <button className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all">Login</button>
            </form>
          </div>
        </div>
      );
      case 'admin-dashboard': return <AdminDashboard portfolio={portfolio} inquiries={inquiries} setCurrentPage={setCurrentPage} />;
      case 'admin-portfolio': return <AdminPortfolio portfolio={portfolio} onSave={handlePortfolioSave} onDelete={handlePortfolioDelete} onTogglePublic={handleTogglePublic} />;
      case 'admin-settings': return <AdminSettings onPasswordChange={handlePasswordChange} />;
      default: return <HomePage settings={settings} portfolio={portfolio} setCurrentPage={setCurrentPage} />;
    }
  };

  const isAdminView = currentPage.startsWith('admin-') && isAdmin;

  return (
    <div className="min-h-screen bg-white">
      {!isAdminView ? (
        <>
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} settings={settings} />
          {renderPage()}
          <Footer settings={settings} />
        </>
      ) : (
        <div className="flex h-screen overflow-hidden bg-gray-50">
          <aside className="w-64 bg-white border-r border-gray-100 flex flex-col p-8 shrink-0 shadow-sm">
            <div 
              className="flex items-center gap-2 mb-12 cursor-pointer group"
              onClick={() => setCurrentPage('home')}
            >
              <img src={LOGO_IMAGE_URL} alt="Logo" className="h-6 w-auto group-hover:scale-105 transition-transform" />
              <span className="font-bold text-black font-luxury text-sm">ADMIN</span>
            </div>
            <div className="flex flex-col gap-2 flex-grow">
              <button onClick={() => setCurrentPage('admin-dashboard')} className={`flex items-center gap-3 p-4 rounded-2xl text-xs font-bold tracking-widest uppercase font-luxury transition-all ${currentPage === 'admin-dashboard' ? 'bg-black text-white shadow-xl' : 'text-gray-400 hover:bg-gray-100'}`}>
                <LayoutDashboard size={18} /> Dashboard
              </button>
              <button onClick={() => setCurrentPage('admin-portfolio')} className={`flex items-center gap-3 p-4 rounded-2xl text-xs font-bold tracking-widest uppercase font-luxury transition-all ${currentPage === 'admin-portfolio' ? 'bg-black text-white shadow-xl' : 'text-gray-400 hover:bg-gray-100'}`}>
                <ImageIconIcon size={18} /> Portfolio
              </button>
              <button onClick={() => setCurrentPage('admin-settings')} className={`flex items-center gap-3 p-4 rounded-2xl text-xs font-bold tracking-widest uppercase font-luxury transition-all ${currentPage === 'admin-settings' ? 'bg-black text-white shadow-xl' : 'text-gray-400 hover:bg-gray-100'}`}>
                <SettingsIcon size={18} /> Settings
              </button>
            </div>
            <button 
              onClick={() => { setIsAdmin(false); setCurrentPage('home'); }}
              className="flex items-center gap-3 p-4 rounded-2xl text-xs font-bold tracking-widest uppercase font-luxury text-red-500 hover:bg-red-50 transition-all mt-auto"
            >
              <LogOut size={18} /> Logout
            </button>
          </aside>
          <main className="flex-grow overflow-y-auto p-12 custom-scroll bg-gray-50/50">
            {renderPage()}
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
