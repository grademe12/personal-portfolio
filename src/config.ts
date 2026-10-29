// 사이트 전체 설정. 개인 정보와 홈 화면 문구는 여기서만 바꾸면 됩니다.
export const SITE = {
  name: '박우성',
  title: '박우성, 클라우드와 DevOps 엔지니어',
  role: '클라우드, DevOps 엔지니어',
  description:
    '인프라를 코드로 만들고 직접 운영하며 고치는 클라우드, DevOps 엔지니어 박우성의 포트폴리오. Terraform, EKS, 홈랩, LLM 에이전트 운영.',
  headline: '인프라를 코드로 만들고, 직접 운영하며 재 보고 고칩니다.',
  intro:
    '집에서는 미니 PC와 라즈베리파이로 홈랩을 직접 운영하고, 팀에서는 Terraform으로 EKS 기반 MSA 인프라를 만들었습니다. 오른쪽은 지금 운영 중인 홈랩 구성입니다.',
  email: 'grademe12@gmail.com',
  github: 'https://github.com/grademe12',
  source: 'https://github.com/grademe12/personal-portfolio',
  // 블로그를 쓸 준비가 되면 true로 바꾸세요.
  showBlog: true,
};

// 분야 색은 랜선 T568B 배열에서 가져왔습니다. 프로젝트 frontmatter의 category와 같은 키를 씁니다.
// dev는 같은 배열의 흰-파랑 줄무늬 선입니다.
export const CATEGORIES = {
  net: '네트워크',
  cloud: '클라우드',
  auto: '자동화',
  obs: '관측',
  dev: '개발',
} as const;

export type Category = keyof typeof CATEGORIES;

export const TOOLS: { category: Category; label: string; items: string; where: string }[] = [
  {
    category: 'dev',
    label: '언어',
    items: 'C (주력), Python (Django), TypeScript (NestJS, Next.js), C++',
    where: '42서울, 팀, 개인',
  },
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
  'C는 42서울 2년 동안 miniShell, miniRT 같은 과제로 가장 깊게 다룬 언어입니다. 프로세스, 파일 디스크립터, 메모리를 직접 다루던 경험이 지금 인프라를 볼 때의 바탕입니다.';

export const PATH: { when: string; title: string; note: string }[] = [
  {
    when: '2023.10 – 2025.10',
    title: '42서울',
    note: 'VM에 리눅스 서버를 처음 직접 세워 보면서(Born2beroot) 서버와 네트워크에 관심이 생겼습니다. 이후 C로 셸과 레이 트레이서를 만들고(miniShell, miniRT), Docker Compose로 서비스 인프라를 구성했습니다(inception).',
  },
  {
    when: '2025.09',
    title: 'Pearl Invest',
    note: '홈랩의 미니 PC와 라즈베리파이로 하이브리드 인프라를 구성했습니다.',
  },
  {
    when: '2025.10 – 2026.03',
    title: '구름 클라우드 네이티브 엔지니어링 과정 (6회차)',
    note: '팀 프로젝트 3회. 마지막 프로젝트가 Stagelog입니다.',
  },
  { when: '2025.10', title: '첫 멀티 클라우드 프로젝트', note: '네이버 클라우드에 Terraform으로 NKS를 올렸습니다.' },
  { when: '2025.12', title: 'AWS Certified Solutions Architect – Associate', note: '취득' },
  { when: '2026.06 –', title: '모의 주식 거래소', note: '부하와 관측을 단계별로 붙여 가는 중입니다.' },
];
