import Link from 'next/link';

import { Kakao } from '../@types/kakao';

declare global {
  interface Window {
    Kakao: undefined | Kakao;
  }
}

export default function Home() {
  return (
    <div>
      HOME
      <Link href="/about">컬리소개</Link>
      <Link href="/order">주문</Link>
    </div>
  );
}
