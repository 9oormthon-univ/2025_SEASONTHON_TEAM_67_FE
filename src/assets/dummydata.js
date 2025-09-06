export const VIDEO_DATA = [
  {
    results: [
      {
        articleId: '1',
        ok: true,
        data: {
          articleId: '1',
          newsTitle: 'AI 혁신이 이끄는 산업의 미래',
          date: '2024-06-01',
          summary:
            '인공지능 기술이 제조업, 의료, 금융 등 다양한 분야에서 혁신을 주도하고 있다. 특히 생성형 AI의 도입으로 생산성이 크게 향상되며, 새로운 일자리와 산업 기회가 창출되고 있다. 이러한 변화는 앞으로의 경제 구조에 중대한 영향을 미칠 것으로 예상된다.',
          questions: [
            'AI 기술이 발전하면서 어떤 분야에서 혁신이 일어나고 있나요?',
            '생산성이 향상된 이유는 무엇인가요?',
            'AI 도입으로 어떤 새로운 기회가 생기고 있나요?',
            '제조업 외에 AI가 영향을 미치는 산업은 무엇인가요?',
          ],
          quiz: {
            question: 'AI가 새로운 일자리와 산업 기회를 창출하고 있다.',
            answer: 'YES',
          },
          tokensUsed: {
            input: 577,
            output: 199,
          },
          model: 'gpt-4o-mini-2024-07-18',
          latencyMs: 7073,
        },
        error: null,
      },
      {
        articleId: '2',
        ok: true,
        data: {
          articleId: '2',
          newsTitle: '도심 전기차 충전소 확대, 친환경 교통의 새로운 전환점',
          date: '2024-06-02',
          summary:
            '정부와 민간 기업이 협력하여 도심 내 전기차 충전소 설치를 확대하고 있다. 이 노력은 탄소 배출을 줄이고 친환경 교통수단의 보급을 촉진하기 위한 것이다. 그러나 충전 속도와 비용 문제는 여전히 해결해야 할 과제로 남아 있어, 향후 개선이 필요하다.',
          questions: [
            '전기차 충전소 설치의 주요 목적은 무엇인가요?',
            '충전 속도 문제는 어떤 과제로 남아 있나요?',
            '정부와 민간 기업의 협력 내용은 무엇인가요?',
            '친환경 교통수단 보급을 위한 다른 조치는 무엇이 있을까요?',
          ],
          quiz: {
            question: '전기차 충전소 설치는 탄소 배출을 줄이기 위한 것이다.',
            answer: 'YES',
          },
          tokensUsed: {
            input: 617,
            output: 219,
          },
          model: 'gpt-4o-mini-2024-07-18',
          latencyMs: 7233,
        },
        error: null,
      },
      {
        articleId: '33',
        ok: false,
        data: null,
        error: '본문이 너무 짧습니다(최소 50자).',
      },
    ],
  },
];
