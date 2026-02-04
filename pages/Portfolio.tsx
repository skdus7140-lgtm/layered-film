
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { ProjectCategory } from '../types';

export const Portfolio: React.FC = () => {
  const { projects, theme } = useApp();
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', ...Object.values(ProjectCategory)];

  // Only show projects where visible is true
  const visibleProjects = projects.filter(p => p.visible === true);

  const filteredProjects = filter === 'All'
    ? visibleProjects
    : visibleProjects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen py-20 px-6 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h2 className="font-serif text-5xl md:text-7xl mb-8">Our Works</h2>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
            레이어드필름이 시공한 다양한 공간들의 변화를 만나보세요. <br />
            아파트부터 상업공간까지, 모든 공간에 최적화된 마감을 제안합니다.
          </p>
        </header>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all ${
                filter === cat
                  ? 'text-white shadow-xl'
                  : 'bg-white text-gray-400 hover:text-black hover:bg-gray-100'
              }`}
              style={filter === cat ? { backgroundColor: theme.primaryColor } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project List */}
        <div className="space-y-32">
          {filteredProjects.map((project, idx) => (
            <div key={project.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <BeforeAfterSlider
                  before={project.beforeImage}
                  after={project.afterImage}
                  className="rounded-3xl shadow-2xl aspect-[4/3]"
                />
              </div>
              <div className={`space-y-6 ${idx % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}>
                <div className={`flex items-center gap-3 ${idx % 2 === 1 ? 'justify-end' : ''}`}>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-black text-white rounded">
                    {project.category}
                  </span>
                  <span className="text-sm text-gray-400">{project.date}</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl">{project.title}</h3>
                <div className={`grid grid-cols-2 gap-6 ${idx % 2 === 1 ? 'text-right' : ''}`}>
                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase mb-1">Location</h5>
                    <p className="text-sm">{project.location}</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase mb-1">Product</h5>
                    <p className="text-sm">{project.productUsed}</p>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed py-4">
                  {project.description}
                </p>
                <div className={`pt-4 ${idx % 2 === 1 ? 'flex justify-end' : ''}`}>
                  <button
                    className="flex items-center gap-2 group text-sm font-bold uppercase tracking-wider"
                    style={{ color: theme.primaryColor }}
                  >
                    View Details
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="py-40 text-center">
              <p className="text-gray-400 italic">표시할 프로젝트가 아직 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
