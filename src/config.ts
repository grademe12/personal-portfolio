// 사이트 전체 설정. 대부분의 개인 정보는 여기서만 바꾸면 됩니다.
export const SITE = {
  name: '홍길동',
  title: '홍길동 · DevOps / Cloud / Network Engineer',
  role: 'DevOps · Cloud · Network Engineer',
  description: '인프라를 코드로 만들고, 자동화하고, 안정적으로 운영합니다.',
  intro:
    '네트워크에서 시작해 클라우드와 자동화로 넓혀가고 있습니다. 재현 가능한 인프라, 관측 가능한 시스템, 사람이 덜 깨어나는 운영을 좋아합니다.',
  email: 'you@example.com',
  github: 'https://github.com/your-id',
  linkedin: '',
  // 블로그를 쓸 준비가 되면 true로 바꾸세요.
  showBlog: false,
};

export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Cloud', items: ['AWS (VPC, EC2, S3, IAM)', 'Cloudflare'] },
  { group: 'IaC · 자동화', items: ['Terraform', 'Ansible', 'GitHub Actions'] },
  { group: 'Container', items: ['Docker', 'Kubernetes (k3s)', 'Containerlab'] },
  { group: 'Network', items: ['TCP/IP', 'BGP · OSPF', 'WireGuard', 'DNS · TLS'] },
  { group: 'Observability', items: ['Prometheus', 'Grafana', 'Loki'] },
  { group: 'OS', items: ['Linux', 'Bash'] },
];

export const CERTS: string[] = [
  // 예: 'AWS Certified Solutions Architect – Associate (2026)',
];
