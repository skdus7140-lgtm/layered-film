
import React from 'react';
import { Project, ThemeConfig } from './types';

export const DEFAULT_THEME: ThemeConfig = {
  bgColor: '#F2EFE9',
  primaryColor: '#2B4360',
  secondaryColor: '#5A5E61',
  textColor: '#1A1A1A',
  brandName: 'Layered Film'
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: '한남동 프리미엄 더 힐 아파트 시공',
    location: '서울 용산구 한남동',
    category: '아파트',
    productUsed: 'LG Hausys Premium Wood',
    description: '전체적인 무드를 차분한 우드 톤으로 리포밍하여 고급스러운 분위기를 연출했습니다.',
    beforeImage: 'https://picsum.photos/seed/project1_before/1200/800',
    afterImage: 'https://picsum.photos/seed/project1_after/1200/800',
    date: '2024-03-15',
    visible: true
  },
  {
    id: '2',
    title: '성수동 카페 우드 필름 리폼',
    location: '서울 성동구 성수동',
    category: '상가',
    productUsed: '3M Architectural Finishes',
    description: '거친 콘크리트 질감에 따뜻한 티크 우드 필름을 더해 인더스트리얼한 감성을 극대화했습니다.',
    beforeImage: 'https://picsum.photos/seed/project2_before/1200/800',
    afterImage: 'https://picsum.photos/seed/project2_after/1200/800',
    date: '2024-02-28',
    visible: true
  },
  {
    id: '3',
    title: '강남 오피스 데스크 및 수납장 필름 시공',
    location: '서울 강남구 역삼동',
    category: '가구',
    productUsed: 'Bodaq Sand Finish',
    description: '노후된 사무용 가구들을 매트한 그레이 톤 필름으로 깔끔하게 복원했습니다.',
    beforeImage: 'https://picsum.photos/seed/project3_before/1200/800',
    afterImage: 'https://picsum.photos/seed/project3_after/1200/800',
    date: '2024-01-10',
    visible: true
  },
  {
    id: '4',
    title: '송도 펜트하우스 주방 싱크대 시공',
    location: '인천 연수구 송도동',
    category: '아파트',
    productUsed: 'KCC Interior Film',
    description: '오염에 강하고 관리가 쉬운 기능성 필름을 사용하여 주방의 기능과 미를 동시에 잡았습니다.',
    beforeImage: 'https://picsum.photos/seed/project4_before/1200/800',
    afterImage: 'https://picsum.photos/seed/project4_after/1200/800',
    date: '2023-12-20',
    visible: true
  },
  {
    id: '5',
    title: '판교 IT 기업 회의실 리뉴얼',
    location: '경기 성남시 판교',
    category: '오피스',
    productUsed: 'Modern Black Matte',
    description: '프레임과 벽체에 블랙 매트 필름을 적용하여 세련되고 집중도 있는 회의 공간을 조성했습니다.',
    beforeImage: 'https://picsum.photos/seed/project5_before/1200/800',
    afterImage: 'https://picsum.photos/seed/project5_after/1200/800',
    date: '2023-11-05',
    visible: true
  }
];

export const Logo: React.FC<{ color?: string }> = ({ color = '#2B4360' }) => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="30" width="60" height="60" rx="4" fill={color} fillOpacity="0.2" />
    <rect x="20" y="20" width="60" height="60" rx="4" fill={color} fillOpacity="0.5" />
    <rect x="30" y="10" width="60" height="60" rx="4" fill={color} />
    <path d="M45 40L55 50L45 60" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
