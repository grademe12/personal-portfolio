// 사이트 전체 설정. 개인 정보와 홈 화면 문구는 여기서만 바꾸면 됩니다.
export const SITE = {
  name: '박우성',
  title: '박우성, 클라우드와 DevOps 엔지니어',
  role: '클라우드, DevOps 엔지니어',
  description:
    '42서울에서 C로 서버를 짜다가 클라우드 인프라로 넘어온 박우성의 포트폴리오. Terraform, EKS, 홈랩 하이브리드 인프라.',
  headline: '42서울에서 C로 서버를 짜던 사람이, 지금은 클라우드 인프라를 코드로 만듭니다.',
  intro:
    '집에서는 미니 PC와 라즈베리파이로 하이브리드 인프라를 직접 운영하고, 팀에서는 Terraform으로 EKS 기반 MSA 인프라를 만들었습니다. 오른쪽은 개인 프로젝트 Pearl Invest의 실제 구성입니다.',
  closing: '같이 일할 팀을 찾고 있습니다.',
  email: 'grademe12@gmail.com',
  github: 'https://github.com/grademe12',
  // 블로그를 쓸 준비가 되면 true로 바꾸세요.
  showBlog: true,
};

// 분야 색은 랜선 T568B 배열에서 가져왔습니다. 프로젝트 frontmatter의 category와 같은 키를 씁니다.
export const CATEGORIES = {
  net: '네트워크',
  cloud: '클라우드',
  auto: '자동화',
  obs: '관측',
} as const;

export type Category = keyof typeof CATEGORIES;

export const TOOLS: { category: Category; label: string; items: string; where: string }[] = [
  {
    category: 'cloud',
    label: '클라우드',
    items:
      'AWS (VPC, EKS, RDS, S3, CloudFront, API Gateway, Lambda, WAF, ACM, Route 53, SQS, Kinesis), NCP (NKS), GCP (GCE)',
    where: '팀, 개인',
  },
  {
    category: 'auto',
    label: '자동화',
    items: 'Terraform, Helm, ArgoCD, Argo Rollouts, GitHub Actions, Docker Compose',
    where: '팀, 개인',
  },
  {
    category: 'net',
    label: '네트워크, 보안',
    items: 'VPC Endpoint, IRSA, Teleport RBAC, Tailscale, TLS, MQTT, Modbus, OPC-UA',
    where: '팀, 홈랩',
  },
  {
    category: 'obs',
    label: '관측',
    items: 'Prometheus, Grafana, Loki, Telegraf, InfluxDB, Kubecost, k6',
    where: '팀, 홈랩',
  },
];

export const LANGUAGES =
  '언어는 Python(Django)과 TypeScript(NestJS, Next.js)를 주로 쓰고, 42서울에서 C와 C++를 익혔습니다.';

export const PATH: { when: string; title: string; note: string }[] = [
  {
    when: '2023.10 – 2025.10',
    title: '42서울',
    note: 'C로 셸과 HTTP 서버를 만들고(miniShell, webserv), Docker Compose로 서비스 인프라를 구성했습니다(inception).',
  },
  { when: '2025.09', title: '홈랩 시작', note: '미니 PC와 라즈베리파이로 Pearl Invest를 운영하기 시작했습니다.' },
  {
    when: '2025.10 – 2026.03',
    title: '구름 클라우드 네이티브 엔지니어링 과정 (6회차)',
    note: '팀 프로젝트 3회. 마지막 프로젝트가 Stagelog입니다.',
  },
  { when: '2025.10', title: '첫 멀티 클라우드 프로젝트', note: '네이버 클라우드에 Terraform으로 NKS를 올렸습니다.' },
  { when: '2025.12', title: 'AWS Certified Solutions Architect – Associate', note: '취득' },
  { when: '2026.06 –', title: '모의 주식 거래소', note: '부하와 관측을 단계별로 붙여 가는 중입니다.' },
];
