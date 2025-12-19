// Legal Case Analysis Algorithm
// Keyword-based case type detection and analysis

// Case type definitions with keywords and related data
export const CASE_TYPES = {
    workplace_harassment: {
        id: 'workplace_harassment',
        name: '직장 내 괴롭힘',
        keywords: ['괴롭힘', '폭언', '욕설', '상사', '팀장', '부장', '회식', '강요', '모욕', '무시', '왕따', '따돌림', '업무배제', '과도한 업무', '야근 강요', '인격모독', '성희롱', '갑질'],
        law: '근로기준법 제76조의2',
        category: 'labor',
        baseWinRate: 72,
        baseCost: { min: 150, max: 350 },
        platformCases: 127,
        experts: [
            { name: "김철수", specialty: "노동법 전문", cases: 15, rating: 4.9 },
            { name: "이영희", specialty: "직장 내 괴롭힘 전문", cases: 23, rating: 5.0 },
            { name: "박민수", specialty: "노동분쟁", cases: 8, rating: 4.8 }
        ]
    },
    divorce: {
        id: 'divorce',
        name: '이혼',
        keywords: ['이혼', '별거', '배우자', '남편', '아내', '양육권', '위자료', '재산분할', '외도', '불륜', '바람', '가정폭력', '생활비', '혼인파탄', '냉각기', '협의이혼', '소송이혼'],
        law: '민법 제840조',
        category: 'family',
        baseWinRate: 65,
        baseCost: { min: 200, max: 500 },
        platformCases: 89,
        experts: [
            { name: "정미영", specialty: "가사소송 전문", cases: 31, rating: 4.9 },
            { name: "최준호", specialty: "이혼/양육권", cases: 18, rating: 4.7 },
            { name: "강수진", specialty: "재산분할", cases: 12, rating: 4.8 }
        ]
    },
    wage_theft: {
        id: 'wage_theft',
        name: '임금 체불',
        keywords: ['임금', '월급', '급여', '체불', '미지급', '퇴직금', '야근수당', '초과근무', '최저임금', '연봉', '삭감', '밀린 월급', '프리랜서', '알바', '아르바이트'],
        law: '근로기준법 제36조, 제43조',
        category: 'labor',
        baseWinRate: 85,
        baseCost: { min: 100, max: 250 },
        platformCases: 203,
        experts: [
            { name: "한동훈", specialty: "임금체불 전문", cases: 45, rating: 4.9 },
            { name: "윤서연", specialty: "노동청 진정", cases: 28, rating: 4.8 },
            { name: "김태희", specialty: "근로계약 분쟁", cases: 19, rating: 4.7 }
        ]
    },
    real_estate: {
        id: 'real_estate',
        name: '부동산 분쟁',
        keywords: ['전세', '월세', '보증금', '집주인', '임대인', '세입자', '임차인', '계약', '명도', '퇴거', '연체', '하자', '누수', '수리', '중개', '복비', '사기'],
        law: '주택임대차보호법',
        category: 'property',
        baseWinRate: 70,
        baseCost: { min: 150, max: 400 },
        platformCases: 156,
        experts: [
            { name: "오세훈", specialty: "부동산 소송", cases: 22, rating: 4.8 },
            { name: "박지영", specialty: "임대차 분쟁", cases: 17, rating: 4.9 },
            { name: "이준혁", specialty: "보증금 반환", cases: 25, rating: 4.7 }
        ]
    },
    traffic_accident: {
        id: 'traffic_accident',
        name: '교통사고',
        keywords: ['교통사고', '자동차', '차량', '충돌', '사고', '보험', '합의금', '치료비', '후유장해', '음주운전', '뺑소니', '과실', '보상', '입원', '통원'],
        law: '교통사고처리특례법',
        category: 'accident',
        baseWinRate: 78,
        baseCost: { min: 100, max: 300 },
        platformCases: 178,
        experts: [
            { name: "장현우", specialty: "교통사고 전문", cases: 38, rating: 4.9 },
            { name: "송민지", specialty: "보험분쟁", cases: 21, rating: 4.8 },
            { name: "권도윤", specialty: "손해배상", cases: 15, rating: 4.7 }
        ]
    },
    defamation: {
        id: 'defamation',
        name: '명예훼손/모욕',
        keywords: ['명예훼손', '모욕', '욕설', '악플', '댓글', '인터넷', 'SNS', '유튜브', '카페', '게시글', '비방', '허위사실', '루머', '소문', '협박'],
        law: '형법 제307조, 제311조',
        category: 'criminal',
        baseWinRate: 60,
        baseCost: { min: 200, max: 400 },
        platformCases: 95,
        experts: [
            { name: "이승기", specialty: "사이버 범죄", cases: 27, rating: 4.8 },
            { name: "김나영", specialty: "명예훼손", cases: 14, rating: 4.9 },
            { name: "박서준", specialty: "형사 고소", cases: 20, rating: 4.7 }
        ]
    },
    fraud: {
        id: 'fraud',
        name: '사기',
        keywords: ['사기', '속았', '사취', '편취', '투자', '코인', '주식', '리딩방', '피해', '송금', '환불', '거래', '무자본', '다단계', '폰지'],
        law: '형법 제347조',
        category: 'criminal',
        baseWinRate: 55,
        baseCost: { min: 250, max: 500 },
        platformCases: 112,
        experts: [
            { name: "정우성", specialty: "금융사기", cases: 19, rating: 4.9 },
            { name: "한지민", specialty: "민사소송", cases: 24, rating: 4.8 },
            { name: "유아인", specialty: "형사고소", cases: 11, rating: 4.7 }
        ]
    }
};

// Analyze text and detect case types
export function analyzeText(text) {
    const normalizedText = text.toLowerCase();
    const results = [];

    Object.values(CASE_TYPES).forEach(caseType => {
        let matchCount = 0;
        const matchedKeywords = [];

        caseType.keywords.forEach(keyword => {
            const regex = new RegExp(keyword, 'gi');
            const matches = normalizedText.match(regex);
            if (matches) {
                matchCount += matches.length;
                if (!matchedKeywords.includes(keyword)) {
                    matchedKeywords.push(keyword);
                }
            }
        });

        if (matchCount > 0) {
            results.push({
                ...caseType,
                matchCount,
                matchedKeywords,
                confidence: Math.min(95, 40 + (matchCount * 10) + (matchedKeywords.length * 5))
            });
        }
    });

    // Sort by match count (highest first)
    results.sort((a, b) => b.matchCount - a.matchCount);

    return results;
}

// Calculate win rate based on analysis
export function calculateWinRate(caseType, messageCount, hasEvidence = false) {
    let rate = caseType.baseWinRate;

    // More details increase confidence
    rate += Math.min(10, messageCount * 2);

    // Evidence increases win rate
    if (hasEvidence) {
        rate += 8;
    }

    return Math.min(95, rate);
}

// Calculate estimated cost
export function calculateCost(caseType, complexity = 'medium') {
    const multiplier = {
        simple: 0.8,
        medium: 1.0,
        complex: 1.3
    }[complexity] || 1.0;

    return {
        min: Math.round(caseType.baseCost.min * multiplier),
        max: Math.round(caseType.baseCost.max * multiplier),
        unit: '만원'
    };
}

// Get similar cases count with some variance
export function getSimilarCases(caseType, matchedKeywords) {
    const base = caseType.platformCases;
    const variance = Math.floor(Math.random() * 20) - 10;
    return Math.max(10, base + variance);
}

// Get matching experts for case type
export function getMatchingExperts(caseType, limit = 3) {
    return caseType.experts.slice(0, limit).map(expert => ({
        ...expert,
        reason: `${caseType.name} 사건 ${expert.cases}건 해결`,
        tags: [expert.specialty, `평점 ${expert.rating}`]
    }));
}

// Full analysis function
export function performFullAnalysis(conversationHistory) {
    // Combine all messages
    const fullText = conversationHistory
        .filter(msg => msg.type === 'user')
        .map(msg => msg.text)
        .join(' ');

    if (!fullText.trim()) {
        return null;
    }

    // Analyze text
    const detectedCases = analyzeText(fullText);

    if (detectedCases.length === 0) {
        return null;
    }

    const primaryCase = detectedCases[0];
    const messageCount = conversationHistory.filter(msg => msg.type === 'user').length;

    // Check for evidence keywords
    const hasEvidence = /증거|녹음|캡처|사진|영상|문서|계약서|영수증|메시지|카톡|문자/.test(fullText);

    return {
        primaryCase: {
            id: primaryCase.id,
            name: primaryCase.name,
            law: primaryCase.law,
            category: primaryCase.category,
            confidence: primaryCase.confidence,
            matchedKeywords: primaryCase.matchedKeywords
        },
        secondaryCases: detectedCases.slice(1, 3).map(c => ({
            id: c.id,
            name: c.name,
            confidence: c.confidence
        })),
        winRate: calculateWinRate(primaryCase, messageCount, hasEvidence),
        estimatedCost: calculateCost(primaryCase),
        similarCases: getSimilarCases(primaryCase, primaryCase.matchedKeywords),
        patternMatch: Math.min(95, 70 + primaryCase.matchedKeywords.length * 5),
        experts: getMatchingExperts(primaryCase),
        hasEvidence,
        analysisProgress: Math.min(100, messageCount * 25)
    };
}
