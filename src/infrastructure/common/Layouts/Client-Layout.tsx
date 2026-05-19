import FooterSection from './FooterSection'
import HeaderSection from './HeaderSection'
import mess from '@/assets/images/icon/icon_mess.png';
import facebook from '@/assets/images/icon/icon_facebook.png';
import call from '@/assets/images/icon/icon_call.png';
import Image from 'next/image';
import '@/assets/styles/components/MainLayout.css'
const ClientLayout = ({ ...props }: any) => {
    return (
        <div className="main-layout-client">
            <HeaderSection />
            {props.children}
            <FooterSection />
            <div className='social tel'>
                <a href="tel:02462926666" className='social-item' data-tooltip="024 6292 6666">
                    <Image src={call} alt="Gọi ngay" />
                    <span>024 6292 6666</span>
                </a>
            </div>
            <div className='social media'>
                <a href="https://www.facebook.com/rimo.vietnam"
                    target='_blank'
                    rel="noopener noreferrer"
                    className='social-item'
                    data-tooltip="Facebook RIMO">
                    <Image src={facebook} alt='RIMO' />
                </a>
                <a href="https://m.me/rimo.vietnam"
                    target='_blank'
                    rel="noopener noreferrer"
                    className='social-item'
                    data-tooltip="Messenger RIMO">
                    <Image src={mess} alt='RIMO' />
                </a>
            </div>
        </div>
    )
}

export default ClientLayout