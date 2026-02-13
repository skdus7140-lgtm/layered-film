
import { PortfolioItem, SiteSettings } from './types';

export const CATEGORIES = ['아파트', '상가', '가구'] as const;

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: '한남 더 힐 주방 전체 리폼',
    category: '아파트',
    thumbnail: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop'
    ],
    summary: '올드한 우드톤 주방을 미스티 화이트 무광 필름으로 모던하게 변경',
    description: '10년 된 우드 패턴의 싱크대와 냉장고장을 프리미엄 무광 화이트 필름으로 시공하였습니다. 이음새 없는 정밀 마감으로 도장 가구와 같은 퀄리티를 구현했습니다.',
    productInfo: '현대 L&C S115 (매트 화이트)',
    isPublic: true,
    date: '2024-03-15'
  },
  {
    id: '2',
    title: '성수동 카페 메인 카운터',
    category: '상가',
    thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop'
    ],
    summary: '스테인리스 소재를 다크 콘크리트 질감으로 리폼하여 빈티지 무드 완성',
    description: '차가운 느낌의 기성 스테인리스 카운터에 거친 콘크리트 텍스처 필름을 입혀 카페 특유의 감각적인 분위기를 살렸습니다.',
    productInfo: 'LG 하우시스 RS122 (콘크리트 질감)',
    isPublic: true,
    date: '2024-04-02'
  },
  {
    id: '3',
    title: '서재 붙박이장 포인트 시공',
    category: '가구',
    thumbnail: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1200&auto=format&fit=crop'
    ],
    summary: '변색된 하이그로시 가구를 샌드 그레이 무광 필름으로 리폼',
    description: '시간이 지나 누렇게 변색된 하이그로시 붙박이장을 샌드 그레이 컬러의 무광 필름으로 시공하여 세련된 서재 공간으로 탈바꿈시켰습니다.',
    productInfo: '영림 화학 ES106 (무광 샌드 그레이)',
    isPublic: true,
    date: '2024-04-10'
  },
  {
    id: '4',
    title: '자이 아파트 현관문 중문 세트',
    category: '아파트',
    thumbnail: 'https://images.unsplash.com/photo-1506377247377-2a5b3b0ca3ef?q=80&w=800&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506377247377-2a5b3b0ca3ef?q=80&w=1200&auto=format&fit=crop'
    ],
    summary: '밋밋한 현관 공간에 딥 그린 컬러로 포인트 부여',
    description: '집의 첫인상인 현관문을 무게감 있는 딥 그린 컬러로 시공하여 고급스러운 진입 공간을 연출했습니다.',
    productInfo: '현대 L&C S158 (매트 딥 그린)',
    isPublic: true,
    date: '2024-04-20'
  }
];

export const DEFAULT_SETTINGS: SiteSettings = {
  brandName: 'Layered Film',
  heroText: '공간의 가치를 더하는 층\n레이어드필름은 당신의 일상이 머무는 공간에\n섬세한 기술력과 감각적인 마감을 더합니다',
  pointColor: '#0047AB',
  pointFont: 'Pretendard'
};
