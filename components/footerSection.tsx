import TextPressure from '@/components/ui/TextPressure';

const Footer = () => {
  return (
    <footer className='border-white border-t 2xl:border-x border-b-0 w-full bg-[#0A0A0A] '>
        <div className='px-10'>
            <TextPressure
                text="ERROL"
                flex={true}
                alpha={false}
                stroke={true}
                width={true}
                weight={true}
                italic={false}
                textColor="#ffffff "
                strokeColor="#E63462"
                minFontSize={36}
            />
        </div>
        <div className='text-center mt-6'>
            <p className='text-white text-[14px] md:text-[15px] pb-2'>Copyright © {new Date().getFullYear()} - All right reserved by Errol Tabangen</p>
        </div>
    </footer>
  )
}

export default Footer