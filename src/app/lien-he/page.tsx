import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb'
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout'
import React from 'react'
import styles from '@/assets/styles/pages/contact.module.css'
import { ROUTE_PATH } from '@/core/common/appRouter'

const ContactPage = () => {
    return (
        <ClientLayout>
            <div className={`${styles.contactContainer} padding-common`}>
                <BreadcrumbCommon
                    breadcrumb={"Liên hệ"}
                    redirect={ROUTE_PATH.CONTACT}
                    title={'CÔNG TY TNHH THƯƠNG MẠI XNK NỘI THẤT Ô TÔ QUANG MINH'}
                    blackColor={true}
                />
                <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3724.1015589978592!2d105.88525!3d21.028622!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a993964f89e5%3A0x822905422c5ee8c7!2zQ8O0bmcgdHkgVE5ISFhOSyBO4buZaSBUaOG6pXQgT3RvIFF1YW5nIE1pbmg!5e0!3m2!1svi!2sus!4v1727431103522!5m2!1svi!2sus"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </ClientLayout>
    )
}

export default ContactPage