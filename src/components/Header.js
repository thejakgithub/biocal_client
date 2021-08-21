import '../styles/styles.components/Header.css'

export default function Header() {

    return (
        <>
            <div className="banner">
                <div className="container-fuild mx-md-5 ms-2 py-2">
                    <div className="d-flex align-items-center ">
                        <div className="flex-column">
                            <img
                                src="/img/logo.png"
                                alt="logo"
                                width={90}
                                height={90}
                            />
                        </div>
                        <div className="flex-column ms-md-3 ms-2">
                            <h5 className="header-t1">มูลนิธิความหลากหลายทางชีวภาพ วัฒนธรรมและภูมิปัญญาท้องถิ่น (ควภ)</h5>
                            <h5 className="header-t2"> Biodiversity, Culture and Local Wisdom Foundation (BIOCAL)</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
