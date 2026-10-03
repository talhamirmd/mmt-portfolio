export const publicAssetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const cvUrl = `${publicAssetBasePath}/cv.pdf`;

export const whatsappNumber = "966507396252";

export const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Hi Talha, I came across your portfolio and would like to set up a screening call."
)}`;
