import Image from 'next/image';

export function SystemProductFamilyVisual() {
  return (
    <figure className="relative isolate flex min-h-[18rem] items-center p-5 sm:min-h-[19rem] sm:p-6 xl:min-h-[21rem]">
      <div className="mx-auto grid w-full max-w-[52rem] items-center gap-5 sm:grid-cols-[minmax(5rem,0.28fr)_minmax(0,0.72fr)] sm:gap-8 xl:grid-cols-[minmax(4.5rem,0.3fr)_minmax(0,0.7fr)] xl:gap-5">
        <div className="mx-auto w-28">
          <Image
            src="/products/mardu-gtag.webp"
            alt="Violettes Mardu-Zugangsgerät"
            width={1200}
            height={1200}
            sizes="7rem"
            className="h-auto w-full object-contain"
          />
        </div>
        <div className="mx-auto w-full sm:max-w-[24rem] xl:max-w-[26rem]">
          <Image
            src="/products/mardu-schliesszylinder-freigestellt.png"
            alt="Freigestellter elektronischer Mardu-Schließzylinder"
            width={1365}
            height={768}
            sizes="(max-width: 639px) 90vw, (max-width: 1279px) 24rem, 26rem"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </figure>
  );
}
