export interface Ad {
  id: string;
  banner: string;
  title: string;
  description: string;
  link: string;
  advertiser: string;
}

export const ads: Ad[] = [
  {
    id: "hostpapa",
    banner: "/images/ads/hostpapa-banner.webp",
    title: "استضافة HostPapa",
    description:
      "استضافة ويب موثوقة بأسعار تنافسية مع دعم فني على مدار الساعة واسم نطاق مجاني.",
    link: "https://www.hostpapa.com/?a_aid=10626",
    advertiser: "HostPapa",
  },
  {
    id: "automattic",
    banner: "/images/ads/automattic-banner.webp",
    title: "ابدأ التدوين مع ووردبريس",
    description:
      "ابدأ في عالم التدوين الحر من خلال منصة ووردبريس المعروفة عالميًا، مع استضافة موثوقة ودعم فني ممتاز.",
    link: "https://automattic.pxf.io/c/7599155/1910630/22744",
    advertiser: "Automattic",
  },
];
