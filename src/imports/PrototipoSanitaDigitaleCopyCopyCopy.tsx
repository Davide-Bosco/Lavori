import svgPaths from "./svg-89u1hyz5ic";
import clsx from "clsx";
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return <Wrapper2 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</Wrapper2>;
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return <Wrapper2 additionalClassNames={clsx("basis-0 grow h-[56px] min-h-px min-w-px relative rounded-[10px] shrink-0", additionalClassNames)}>{children}</Wrapper2>;
}
type Icon5Props = {
  additionalClassNames?: string;
};

function Icon5({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon5Props>) {
  return (
    <div className={clsx("absolute size-[20px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type TextTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextText({ text, additionalClassNames = "" }: TextTextProps) {
  return (
    <div className={clsx("absolute bg-white content-stretch flex h-[22.4px] items-start px-[8px] py-[4px] rounded-[4px] top-[-2.4px]", additionalClassNames)}>
      <p className="font-['Consolas:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#193cb8] text-[12px] text-nowrap">{text}</p>
    </div>
  );
}
type Text3Props = {
  text: string;
  additionalClassNames?: string;
};

function Text3({ text, additionalClassNames = "" }: Text3Props) {
  return (
    <div className={clsx("content-stretch flex items-center overflow-clip py-[16px] relative rounded-[inherit] size-full", additionalClassNames)}>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-[rgba(10,10,10,0.5)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        {text}
      </p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[21px] left-0 top-[691px] w-[448px]" data-name="Paragraph">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[21px] left-[224.73px] text-[#666] text-[14px] text-center text-nowrap top-[-0.2px] translate-x-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>{`🎉 Primo avvio - Configuriamo insieme l'app`}</p>
    </div>
  );
}

function Text() {
  return (
    <Wrapper1 additionalClassNames="h-[20px] w-[77.75px]">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#364153] text-[14px] top-0 w-[78px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Passo 2 di 4
      </p>
    </Wrapper1>
  );
}

function Button() {
  return (
    <div className="h-[20px] relative shrink-0 w-[48.288px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Open_Sans:Regular','Noto_Sans_Symbols:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#155dfc] text-[14px] text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Salta →
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex items-start justify-between relative size-full">
          <Text />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return <div className="bg-[#036] h-[8px] rounded-[2.68435e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container2() {
  return (
    <div className="bg-[#d1d5dc] h-[8px] relative rounded-[2.68435e+07px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pl-0 pr-[171.5px] py-0 relative size-full">
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#f3f4f6] h-[68px] relative shrink-0 w-[375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start pb-0 pt-[16px] px-[16px] relative size-full">
        <Container />
        <Container2 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[48px] left-[24px] top-[33.53px] w-[327px]" data-name="Container">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[48px] left-[163.54px] text-[#0a0a0a] text-[48px] text-center text-nowrap top-[-0.8px] translate-x-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        🔐
      </p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[31.988px] left-[24px] top-[105.53px] w-[327px]" data-name="Heading 2">
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[32px] left-[163.91px] text-[#036] text-[24px] text-center text-nowrap top-[0.2px] translate-x-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Accedi
      </p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[24px] top-[145.51px] w-[327px]" data-name="Paragraph">
      <p className="basis-0 font-['Open_Sans:Regular',sans-serif] font-normal grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#4a5565] text-[14px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
        Inserisci le tue credenziali
      </p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute h-[59.2px] left-0 rounded-[10px] top-0 w-[327px]" data-name="Text Input">
      <Text3 text="Nome utente" additionalClassNames="pl-[40px] pr-[16px]" />
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Icon() {
  return (
    <Icon5 additionalClassNames="left-[12px] top-[16px]">
      <path d={svgPaths.p2026e800} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p32ab0300} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Icon5>
  );
}

function Container5() {
  return (
    <div className="absolute h-[59.2px] left-0 top-0 w-[327px]" data-name="Container">
      <TextInput />
      <Icon />
    </div>
  );
}

function PasswordInput() {
  return (
    <div className="absolute h-[59.2px] left-0 rounded-[10px] top-0 w-[327px]" data-name="Password Input">
      <Text3 text="Password" additionalClassNames="px-[40px]" />
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Icon1() {
  return (
    <Icon5 additionalClassNames="left-[12px] top-[16px]">
      <path d={svgPaths.p2566d000} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p1bf79e00} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Icon5>
  );
}

function Icon2() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 14">
            <path d={svgPaths.pcb0000} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
            <path d={svgPaths.p2314a170} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[295px] size-[20px] top-[16px]" data-name="Button">
      <Icon2 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[59.2px] left-0 top-[75.2px] w-[327px]" data-name="Container">
      <PasswordInput />
      <Icon1 />
      <Button1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[134.4px] left-[24px] top-[197.51px] w-[327px]" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Open_Sans:SemiBold',sans-serif] font-semibold grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[#1c398e] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        💡 Credenziali di esempio:
      </p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[17.587px] relative shrink-0 w-full" data-name="Paragraph">
      <TextText text="maria" additionalClassNames="left-0 w-[49px]" />
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] left-[49px] text-[#193cb8] text-[12px] text-nowrap top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        /
      </p>
      <TextText text="maria123" additionalClassNames="left-[59.64px] w-[68.787px]" />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[17.587px] relative shrink-0 w-full" data-name="Paragraph">
      <TextText text="giorgio" additionalClassNames="left-0 w-[62.188px]" />
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] left-[62.19px] text-[#193cb8] text-[12px] text-nowrap top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        /
      </p>
      <TextText text="giorgio123" additionalClassNames="left-[72.82px] w-[81.988px]" />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[17.587px] relative shrink-0 w-full" data-name="Paragraph">
      <TextText text="angela" additionalClassNames="left-0 w-[55.588px]" />
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] left-[55.59px] text-[#193cb8] text-[12px] text-nowrap top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        /
      </p>
      <TextText text="angela123" additionalClassNames="left-[66.23px] w-[75.388px]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[60.763px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph3 />
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex flex-col gap-[8px] h-[120.763px] items-start left-[24px] pb-0 pl-[20px] pr-[16px] pt-[16px] rounded-[10px] top-[355.91px] w-[327px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2b7fff] border-[0px_0px_0px_4px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Paragraph2 />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[510.2px] relative shrink-0 w-[375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container4 />
        <Heading />
        <Paragraph1 />
        <Container7 />
        <Container9 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <Icon5 additionalClassNames="left-[37.9px] top-[18px]">
      <path d="M12.5 15L7.5 10L12.5 5" id="Vector" stroke="var(--stroke-0, #1E2939)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Icon5>
  );
}

function Button2() {
  return (
    <Wrapper additionalClassNames="bg-[#e5e7eb]">
      <Icon3 />
      <p className="absolute font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[24px] left-[96.9px] text-[#1e2939] text-[16px] text-center text-nowrap top-[15.8px] translate-x-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Indietro
      </p>
    </Wrapper>
  );
}

function Icon4() {
  return (
    <Icon5 additionalClassNames="left-[101.42px] top-[18px]">
      <path d="M7.5 15L12.5 10L7.5 5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </Icon5>
  );
}

function Button3() {
  return (
    <Wrapper additionalClassNames="bg-[#036]">
      <p className="absolute font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[24px] left-[69.06px] text-[16px] text-center text-nowrap text-white top-[15.8px] translate-x-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avanti
      </p>
      <Icon4 />
    </Wrapper>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Button3 />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-white h-[88.8px] relative shrink-0 w-[375px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.8px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[16.8px] px-[16px] relative size-full">
        <Container11 />
      </div>
    </div>
  );
}

function OnboardingScreen() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[667px] items-start left-0 overflow-clip rounded-[10px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-0 w-[375px]" data-name="OnboardingScreen">
      <Container3 />
      <Container10 />
      <Container12 />
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[712px] left-[415.6px] top-[16px] w-[448px]" data-name="App">
      <Paragraph />
      <OnboardingScreen />
    </div>
  );
}

function Text1() {
  return (
    <Wrapper1 additionalClassNames="h-[24px] w-[21.975px]">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[24px] left-[11px] text-[16px] text-center text-nowrap text-white top-[-0.2px] translate-x-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        📚
      </p>
    </Wrapper1>
  );
}

function Text2() {
  return (
    <Wrapper1 additionalClassNames="h-[24px] w-[140.863px]">
      <p className="absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[24px] left-[70.5px] text-[16px] text-center text-nowrap text-white top-[-0.2px] translate-x-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Visualizza Manuale
      </p>
    </Wrapper1>
  );
}

function App1() {
  return (
    <div className="absolute bg-[#036] content-stretch flex gap-[8px] h-[48px] items-center left-[1044.36px] pl-[24px] pr-0 py-0 rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-[16px] w-[218.838px]" data-name="App">
      <Text1 />
      <Text2 />
    </div>
  );
}

export default function PrototipoSanitaDigitaleCopyCopyCopy() {
  return (
    <div className="bg-white relative size-full" data-name="Prototipo Sanità Digitale (Copy) (Copy) (Copy)">
      <App />
      <App1 />
    </div>
  );
}