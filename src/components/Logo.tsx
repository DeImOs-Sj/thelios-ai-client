/** Thelios circular mark. Source: public/favicon.svg (cropped from the official wordmark). */
export function LogoMark({ size = 26 }: { size?: number }) {
  return <img src="/favicon.svg" width={size} height={size} alt="" />
}
