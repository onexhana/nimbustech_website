// /src/constants/partners.ts
// 협력사 로고 더미 데이터 (URL은 샘플입니다. 실제 로고 파일 경로/URL로 교체하세요.)
export type Partner = {
  id: number;
  name: string;
  logo: string;   // 정사각/가로형 PNG/SVG 권장
  link?: string;  // 클릭 시 이동할 URL (선택)
};

export const PARTNERS_ROW_TOP: Partner[] = [
  { id: 1, name: "Partner A", logo: "/images/partners/partner_a.png", link: "#" },
  { id: 2, name: "Partner B", logo: "/images/partners/partner_b.png", link: "#" },
  { id: 3, name: "Partner C", logo: "/images/partners/partner_c.png", link: "#" },
  { id: 4, name: "Partner D", logo: "/images/partners/partner_d.png", link: "#" },
  { id: 5, name: "Partner E", logo: "/images/partners/partner_e.png", link: "#" },
  { id: 6, name: "Partner F", logo: "/images/partners/partner_f.png", link: "#" },
];

export const PARTNERS_ROW_BOTTOM: Partner[] = [
  { id: 7,  name: "Partner G", logo: "/images/partners/partner_g.png", link: "#" },
  { id: 8,  name: "Partner H", logo: "/images/partners/partner_h.png", link: "#" },
  { id: 9,  name: "Partner I", logo: "/images/partners/partner_i.png", link: "#" },
  { id: 10, name: "Partner J", logo: "/images/partners/partner_j.png", link: "#" },
  { id: 11, name: "Partner K", logo: "/images/partners/partner_k.png", link: "#" },
  { id: 12, name: "Partner L", logo: "/images/partners/partner_l.png", link: "#" },
];
