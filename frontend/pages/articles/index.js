import React from 'react';
import { useRouter } from 'next/router';
import { Layout, PageHeader, List, Row, Col, Typography, Tabs } from 'antd';
import Breadcrumb from '../../components/pages/articles/Breadcrumb';
import styles from './index.module.scss';
const { Title } = Typography;
const { TabPane } = Tabs;

const PAGE_NAME = 'Materiały popularyzatorskie';

const Articles = () => {
    const router = useRouter();
    const category = router && router.query && router.query.category;

    return (
        <Layout>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb />
                <Layout.Content
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: '0 auto',
                        minHeight: 280,
                        width: '100%',
                        maxWidth: 1150,
                    }}
                >
                    <PageHeader ghost={false} title={PAGE_NAME} />
                    <div className={styles.content}>
                        <Row gutter={16}>
                            <Col md={12}>
                                <List
                                    size="large"
                                    bordered
                                    header={<Title level={4}>Wykłady popularyzatorskie</Title>}
                                    style={{ marginTop: 30 }}
                                    dataSource={[
                                        <a
                                            href="http://www.cs.put.poznan.pl/aurbanski/Optymalny-zakup-na-odleglosc.pdf"
                                            target="blank"
                                        >
                                            Optymalny zakup na odległość
                                        </a>,
                                        <a href="http://www.cs.put.poznan.pl/aurbanski/GRY-31.pdf" target="blank">
                                            GRY na urządzeniach elektronicznych
                                        </a>,
                                        <a href="http://www.cs.put.poznan.pl/aurbanski/teoriagrafow.php" target="blank">
                                            Teoria grafów dla małolatów
                                        </a>,
                                        <a href="http://www.cs.put.poznan.pl/aurbanski/GRY21.pdf" target="blank">
                                            GRY - trening, rozrywka, ryzyko, nałóg czy grywalizacja
                                        </a>,
                                        <a href="http://www.cs.put.poznan.pl/aurbanski/GRY.php" target="blank">
                                            GRY - budowa w HTML5
                                        </a>,
                                    ]}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                            </Col>
                            <Col md={12}>
                                <List
                                    size="large"
                                    bordered
                                    header={
                                        <>
                                            <Title level={4}>Sfabularyzowane informatyczne przygody</Title>
                                            <span>Wydrukowane w Biuletynie PTI</span>
                                        </>
                                    }
                                    style={{ marginTop: 30 }}
                                    dataSource={[
                                        <a
                                            href="http://www.cs.put.poznan.pl/aurbanski/BiuletynPTI_2018-01_ver1.1_Pamietniki1.pdf"
                                            target="blank"
                                        >
                                            Algorytm wkuwania
                                        </a>,
                                        <a
                                            href="http://www.cs.put.poznan.pl/aurbanski/Biuletyn%20PTI%20nr%202_2018.pdf"
                                            target="blank"
                                        >
                                            Ambitny w każdym calu
                                        </a>,
                                        <a
                                            href="http://www.cs.put.poznan.pl/aurbanski/Biuletyn%20PTI%20nr%203_2018.pdf"
                                            target="blank"
                                        >
                                            Seksowny komputer
                                        </a>,
                                    ]}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                            </Col>
                        </Row>

                        <Title level={4} style={{ marginTop: 30 }} id="topics">
                            Artykuły i opowiadania popularyzatorskie
                        </Title>
                        <Typography.Paragraph>Wybierz poniżej interesującą Cię kategorię.</Typography.Paragraph>
                        <Tabs type="card" animated={true} defaultActiveKey={category || 'internet'}>
                            <TabPane tab="Internet" key="internet" id="internet">
                                <List
                                    bordered
                                    dataSource={[
                                        <a
                                            href="http://www.eioba.pl/a/2uzt/jak-dziala-serwis-internetowy"
                                            target="blank"
                                        >
                                            Jak działa serwis internetowy?
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/3xq2/klonowanie-podan-w-skomputeryzowanej-rekrutacji-do-szkol"
                                            target="blank"
                                        >
                                            Nabór ponadgimnazjalny - algorytm i przykład
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/28kr/od-alfabetu-morsea-do-jezyka-xml"
                                            target="blank"
                                        >
                                            Od alfabetu Morse'a do języka XML
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/2xed/autonomiczne-zycie-w-internecie"
                                            target="blank"
                                        >
                                            Autonomiczne życie w internecie
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/4c9q/jak-zrobic-gre-w-coppercube-czesc-1"
                                            target="blank"
                                        >
                                            Przestrzeń gry w CopperCube
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/4e67/rysowanie-w-html5-w-wersji-2d"
                                            target="blank"
                                        >
                                            Rysowanie w HTML5
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/1tvi/algorytm-dzieki-ktoremu-komputer-usprawnil-nabor-do-szkol-po-2002-roku"
                                            target="blank"
                                        >
                                            Nabór ponadgimnazjalny - algorytm w Pascalu
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/2vpl/internetowe-zabawy-slowne-i-literackie"
                                            target="blank"
                                        >
                                            Internetowe zabawy słowne i literackie
                                        </a>,
                                        <a href="http://www.eioba.pl/a/339p/raj-3d-w-przegladarce" target="blank">
                                            Raj 3D w przeglądarce
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/3e2r/jezyki-programowania-stron-internetowych"
                                            target="blank"
                                        >
                                            Języki programowania stron internetowych
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/4cag/jak-zrobic-gre-w-coppercube-czesc-2"
                                            target="blank"
                                        >
                                            Reguły gry w CopperCube
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/4qez/mvc-kolejny-krok-w-czytelnosci-kodu-programu"
                                            target="blank"
                                        >
                                            Kolejny krok w czytelności kodu programu
                                        </a>,
                                    ]}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                            </TabPane>
                            <TabPane tab="eGospodarka" key="egospodarka" id="egospodarka">
                                <List
                                    bordered
                                    dataSource={[
                                        <a href="http://www.eioba.pl/a/2zyu/nie-zastrzelisz-kelnera" target="blank">
                                            Nie zastrzelisz kelnera!
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/303s/kiedy-wreszcie-elektroniczne-przymierzalnie"
                                            target="blank"
                                        >
                                            Kiedy wreszcie elektroniczne przymierzalnie?
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/30cd/schemat-dzialania-sklepu-internetowego"
                                            target="blank"
                                        >
                                            Schemat działania sklepu internetowego
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/30f0/schemat-dzialania-programu-partnerskiego-sklepu-internetowego"
                                            target="blank"
                                        >
                                            Schemat działania programu partnerskiego sklepu internetowego
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/30ds/czy-mozna-zawierzyc-chmurze-czyli-fenoment-cloud-computing"
                                            target="blank"
                                        >
                                            Czy można zawierzyć chmurze, czyli fenomen Cloud Computing
                                        </a>,
                                        <a href="http://www.eioba.pl/a/1vig/daj-sekunde-potrzebujacemu" target="blank">
                                            Daj sekundę potrzebującemu
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/49p3/kochane-czy-nie-kochane-automaty"
                                            target="blank"
                                        >
                                            Kochane czy nie kochane automaty?
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/3031/jak-sprzedaje-sklep-internetowy"
                                            target="blank"
                                        >
                                            Jak sprzedaje sklep internetowy?
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/30b7/od-kiedy-handlujemy-na-odleglosc"
                                            target="blank"
                                        >
                                            Od kiedy handlujemy na odległość?
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/30e8/bezobslugowe-sklepy-internetowe-i-tradycyjne"
                                            target="blank"
                                        >
                                            Bezobsługowe sklepy internetowe i tradycyjne
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/30wq/schemat-swiadczenia-uslug-za-posrednictwem-internetu"
                                            target="blank"
                                        >
                                            Schemat świadczenia usług za pośrednictwem internetu
                                        </a>,
                                        <a href="http://www.eioba.pl/a/30hj/zbudowalem-dom-na-chmurze" target="blank">
                                            Zbudowałem dom na chmurze
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/3vev/kupie-czysta-informacje-a-opakowaniem-sie-wypchajcie"
                                            target="blank"
                                        >
                                            Kupię czystą informację, a opakowaniem się wypchajcie!
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/4cbd/zdalne-zakupy-natychmiastowe"
                                            target="blank"
                                        >
                                            Zdalne zakupy natychmiastowe
                                        </a>,
                                    ]}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                            </TabPane>
                            <TabPane tab="Informatyka" key="informatyka">
                                <List
                                    bordered
                                    dataSource={[
                                        <a
                                            href="http://www.eioba.pl/a/31qo/komputer-kwantowy-zlamie-prawa-matematyczne"
                                            target="blank"
                                        >
                                            Komputer kwantowy złamie prawa?
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/2w5v/komputer-za-sto-milionow-dolarow"
                                            target="blank"
                                        >
                                            Komputer za sto milionów dolarów
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/3itk/komputer-uznany-za-czlowieka"
                                            target="blank"
                                        >
                                            Komputer uznany za człowieka
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/2w1p/krotka-historia-programu-reflex-1-0"
                                            target="blank"
                                        >
                                            Krótka historia programu REFLEX 1.0
                                        </a>,
                                        <a href="http://andrzeju.pl/stara.php?s=geny" target="blank">
                                            Geny z komputera
                                        </a>,
                                        <a href="http://andrzeju.pl/stara.php?s=iws" target="blank">
                                            Analogia i przykład w edukacji informatyki
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/4cjr/porownanie-ludzkiego-mozgu-z-superkomputerem"
                                            target="blank"
                                        >
                                            Porównanie ludzkiego mózgu z superkomputerem
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/3p3d/jak-maszyna-turinga-dowiodla-ze-komputer-nie-wszystko-moze"
                                            target="blank"
                                        >
                                            Jak maszyna Turinga dowiodła, że komputer nie wszystko może
                                        </a>,
                                        <a href="http://www.eioba.pl/a/2wlp/historia-tamagotchi" target="blank">
                                            Historia tamagotchi
                                        </a>,
                                        <a href="http://www.eioba.pl/a/3jzk/mikrokomputerowa-iskra" target="blank">
                                            Mikrokomputerowa iskra
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/3iss/superkomputer-panuje-nad-swiatem"
                                            target="blank"
                                        >
                                            Superkomputer panuje nad światem
                                        </a>,
                                        <a href="http://andrzeju.pl/stara.php?s=train" target="blank">
                                            Edukacyjny system programowania "TRAIN"
                                        </a>,
                                        <a href="http://www.eioba.pl/a/4d5c/tworczosc-programistyczna" target="blank">
                                            Twórczość programistyczna
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/4czy/komputery-szybsze-od-swiatla-i-mniejsze-od-szpilki"
                                            target="blank"
                                        >
                                            Komputery szybsze od światła i mniejsze od szpilki
                                        </a>,
                                    ]}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                            </TabPane>
                            <TabPane tab="Kosmos" key="kosmos">
                                <List
                                    bordered
                                    dataSource={[
                                        <a href="http://www.eioba.pl/a/2uz5/biedacy-na-marsa" target="blank">
                                            Biedacy na Marsa
                                        </a>,
                                        <a href="http://www.eioba.pl/a/3363/raj-na-sztucznej-planecie" target="blank">
                                            Raj na sztucznej planecie
                                        </a>,
                                        <a href="http://www.eioba.pl/a/2vtm/urodzona-w-2010-na-ksiezycu" target="blank">
                                            Urodzona w 2010 na Księżycu
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/3xbq/moj-powrot-z-delegacji-za-dwadziescia-lat"
                                            target="blank"
                                        >
                                            Mój powrót z delegacji za 20 lat
                                        </a>,
                                        <a href="http://www.eioba.pl/a/3345/sztuczna-planeta" target="blank">
                                            Sztuczna planeta
                                        </a>,
                                        <a href="http://www.eioba.pl/a/2woc/winda-do-nieba" target="blank">
                                            Windą do nieba
                                        </a>,
                                        <a href="http://www.eioba.pl/a/3onh/pieciolatek-na-ksiezycu" target="blank">
                                            Pięciolatek na Księżycu
                                        </a>,
                                        <a href="http://www.eioba.pl/a/4ibi/ped-do-nieba" target="blank">
                                            Pęd do Nieba
                                        </a>,
                                    ]}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                            </TabPane>
                            <TabPane tab="Transport" key="transport">
                                <List
                                    bordered
                                    dataSource={[
                                        <a
                                            href="http://www.eioba.pl/a/3u7z/nie-bedzie-praw-jazdy-jak-nie-ma-licencji-na-zabijanie"
                                            target="blank"
                                        >
                                            Nie będzie praw jazdy jak nie ma licencji na zabijanie
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/3kir/gryfikacja-wsrod-kierowcow-czy-to-nie-igranie-z-ogniem"
                                            target="blank"
                                        >
                                            Gryfikacja wśród kierowców - czy to nie i-granie z ogniem
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/374v/jak-zmienic-stuletnie-przyzwyczajenia-do-niewygody-i-szkodliwosci"
                                            target="blank"
                                        >
                                            Jak zmienić stuletnie przyzwyczajenie do niewygody i szkodliwości
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/2ztm/kolej-na-magnetyczno-prozniowa-kolej"
                                            target="blank"
                                        >
                                            Kolej na magnetyczno-próżniową kolej
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/26q1/elektryczne-auto-czy-tesla-motors-uczyni-je-praktycznym-i-powszechnym"
                                            target="blank"
                                        >
                                            Elektryczne auto. Czy Tesla Motors uczyni je praktycznym i powszechnym?
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/2vn6/koszty-i-zyski-z-samochodu-elektrycznego"
                                            target="blank"
                                        >
                                            Koszty i zyski z samochodu elektrycznego
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/4ckg/autobus-elektryczny-szlachetniejszy-trolejbus"
                                            target="blank"
                                        >
                                            Autobus elektryczny - szlachetniejszy trolejbus
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/3vnp/czy-zabijac-kierowcow-aby-nie-zabijali-niewinnych-ludzi"
                                            target="blank"
                                        >
                                            Czy zabijać kierowców aby nie zabijali niewinnych ludzi
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/3ie1/samochody-elektryczne-kontra-spalinowe"
                                            target="blank"
                                        >
                                            Samochody elektryczne kontra spalinowe
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/30t4/ekonomika-samochodu-elektrycznego"
                                            target="blank"
                                        >
                                            Ekonomika samochodu elektrycznego
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/2zmu/tani-prad-wypiera-benzyne-w-samochodach"
                                            target="blank"
                                        >
                                            Tani prąd wypiera benzynę w samochodach
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/2uy8/elektryczne-samochody-wlasnie-zaczely-detronizowac-nafte"
                                            target="blank"
                                        >
                                            Elektryczne samochody właśnie zaczęły wypierać naftę
                                        </a>,
                                        <a href="http://www.eioba.pl/a/4an0/samochod-na-darmowa-energie" target="blank">
                                            Samochód na darmową energię
                                        </a>,
                                        <a href="http://www.eioba.pl/a/4cpo/hyperloop-czesc-2" target="blank">
                                            Hyperloop cz.2
                                        </a>,
                                    ]}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                            </TabPane>
                            <TabPane tab="Książki" key="ksiazki">
                                <List
                                    bordered
                                    dataSource={[
                                        <a href="http://www.eioba.pl/a/3tgf/moje-science-fiction" target="blank">
                                            Moje science-fiction
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/3tfm/jak-technika-z-literatura-nawzajem-mnie-krecily"
                                            target="blank"
                                        >
                                            Jak technika z literaturą nawzajem mnie kręciły
                                        </a>,
                                        <a href="http://www.eioba.pl/a/3nbi/epapier-dla-ucznia" target="blank">
                                            e-papier dla ucznia
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/3mfy/papierowa-ksiazka-bedzie-efektownym-luksusem"
                                            target="blank"
                                        >
                                            Papierowa książka będzie efektownym luksusem
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/30j2/kochane-czy-niechciane-biblioteki"
                                            target="blank"
                                        >
                                            Kochane czy niechciane biblioteki
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/3wv5/biblioteki-okradaja-autorow-ale-e-booki-ukradna-biblioteki"
                                            target="blank"
                                        >
                                            Biblioteki publiczne okradają autorów, ale e-booki ukradną biblioteki
                                        </a>,
                                        <a href="http://www.eioba.pl/a/3j43/opowiadam-wiec-jestem" target="blank">
                                            Opowiadam, więc jestem
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/2uzi/alan-bit-czyli-hobby-wykladowcy-informatyki"
                                            target="blank"
                                        >
                                            ALAN BIT czyli hobby wykładowcy informatyki
                                        </a>,
                                    ]}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                            </TabPane>
                            <TabPane tab="Opowiadania" key="opowiadania">
                                <List
                                    bordered
                                    dataSource={[
                                        <a
                                            href="http://mimuw.edu.pl/delta/artykuly/delta0907/defilada.pdf"
                                            target="blank"
                                        >
                                            Defilada z komputera("DELTA")
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/325p/slowna-kwota-z-nieslownej-liczby"
                                            target="blank"
                                        >
                                            Słowna kwota z niesłownej liczby
                                        </a>,
                                        <a href="http://www.cs.put.poznan.pl/aurbanski/komputer.php" target="blank">
                                            Wierszyk "Komputer"(elementarz szkolny)
                                        </a>,
                                        <a href="http://www.cs.put.poznan.pl/aurbanski/tata.php" target="blank">
                                            Opowiadanie "Mój tata jest programistą"(elementarz szkolny)
                                        </a>,
                                        <a href="http://andrzeju.pl/stara.php?s=przyprog" target="blank">
                                            Przygody programistów
                                        </a>,
                                        <a href="http://www.eioba.pl/a/1v3o/zycie-dla-zycia" target="blank">
                                            Życie dla życia
                                        </a>,
                                        <a href="http://www.eioba.pl/a/28ky/imaginacja-lennona" target="blank">
                                            Imaginacja Lenona
                                        </a>,
                                        <a href="http://www.eioba.pl/a/3xxf/silicon-island" target="blank">
                                            Silicon Island
                                        </a>,
                                        <a href="http://andrzeju.pl/opowiadania.php?idm=122&idt=122" target="blank">
                                            REFLEX
                                        </a>,
                                        <a href="http://www.eioba.pl/a/2wte/jas-i-malgosia-na-odwyrtke" target="blank">
                                            Jaś i Małgosia ... na odwyrtkę
                                        </a>,
                                        <a href="http://www.eioba.pl/a/47a1/matematyczna-przyjazn" target="blank">
                                            Matematyczna przyjaźń
                                        </a>,
                                        <a href="http://andrzeju.pl/stara.php?s=jws" target="blank">
                                            Jego wirtualny świat
                                        </a>,
                                        <a href="http://andrzeju.pl/stara.php?s=bajka" target="blank">
                                            Bajeczka o komputerach
                                        </a>,
                                        <a href="http://andrzeju.pl/opowiadania.php?idm=123&idt=123" target="blank">
                                            Powrót z delegacji
                                        </a>,
                                        <a href="http://mimuw.edu.pl/delta/artykuly/delta0308/kwota.pdf" target="blank">
                                            Słowna kwota("DELTA")
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/3623/prognozowanie-rozgrywki-gra-planszowa"
                                            target="blank"
                                        >
                                            Prognozowanie rozgrywki grą planszową
                                        </a>,
                                        <a href="http://www.eioba.pl/a/36dk/problem-cioci-ogrodniczki" target="blank">
                                            Problem cioci ogrodniczki
                                        </a>,
                                        <a href="http://www.cs.put.poznan.pl/aurbanski/dp.php" target="blank">
                                            Opowiadanie i wierszyk (pisemko "Domowe przedszkole")
                                        </a>,
                                        <a href="http://www.eioba.pl/a/1v0x/jego-wirtualny-swiat" target="blank">
                                            Jego wirtualny świat
                                        </a>,
                                        <a href="http://www.eioba.pl/a/1ubs/zmysl-sieci" target="blank">
                                            Zmysł sieci
                                        </a>,
                                        <a href="http://www.eioba.pl/a/3rp3/udanedziecko-pl" target="blank">
                                            UdaneDziecko.pl
                                        </a>,
                                        <a href="http://www.eioba.pl/a/2wlc/wzieli-jasia-do-szpitala" target="blank">
                                            Wzięli Jasia do szpitala
                                        </a>,
                                        <a href="http://www.eioba.pl/a/2wre/ksiaze-z-bajki-dla-ksiecia" target="blank">
                                            Książę z bajki dla... księcia
                                        </a>,
                                        <a href="http://www.eioba.pl/a/442g/tajemniczy-upadek" target="blank">
                                            Tajemniczy upadek
                                        </a>,
                                        <a href="http://andrzeju.pl/stara.php?s=bit" target="blank">
                                            BITowcy
                                        </a>,
                                        <a href="http://andrzeju.pl/stara.php?s=net" target="blank">
                                            NETowcy
                                        </a>,
                                        <a href="http://andrzeju.pl/opowiadania.php?idm=104&idt=104" target="blank">
                                            Zmysł sieci
                                        </a>,
                                        <a href="http://www.eioba.pl/a/4cwr/wlasna-stereofonia" target="blank">
                                            Własna stereofonia
                                        </a>,
                                    ]}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                            </TabPane>
                            <TabPane tab="Inne" key="inne">
                                <List
                                    bordered
                                    dataSource={[
                                        <a href="http://www.eioba.pl/a/2wpr/klonowanie-stereo" target="blank">
                                            Klonowanie stereo
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/31e1/tylko-pomysl-a-stanie-sie-cud"
                                            target="blank"
                                        >
                                            Tylko pomyśl, a stanie się cud
                                        </a>,
                                        <a href="http://www.eioba.pl/a/3mld/szok-przyszlosci" target="blank">
                                            Szok przyszłości
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/3155/czy-czeka-nas-czarna-przyszlosc"
                                            target="blank"
                                        >
                                            Czy czeka nas czarna przyszłość?
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/2vy4/piosenki-o-dzieciach-szczesliwych-inaczej"
                                            target="blank"
                                        >
                                            Piosenki o dzieciach szczesliwych inaczej
                                        </a>,
                                        <a href="http://www.eioba.pl/a/32g3/sala-samobojcow" target="blank">
                                            Sala samobójcow
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/2w66/nie-zagladaj-sasiadom-do-lozek"
                                            target="blank"
                                        >
                                            Nie zaglądaj sąsiadom do łóżek
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/4cd4/jak-najtaniej-zdobyc-pieniadze-na-swoj-projekt"
                                            target="blank"
                                        >
                                            Jak najtaniej zdobyć pieniądze na swój projekt
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/4ci8/rewolucyjny-czy-kontrowersyjny-hamburger"
                                            target="blank"
                                        >
                                            Rewolucyjny czy kontrowersyjny hamburger
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/31z3/audiofil-dzwiekowy-esteta-czy-audiomaniak"
                                            target="blank"
                                        >
                                            Audiofil - dźwiękowy esteta czy audiomaniak
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/2vc2/przeplynac-z-oceanu-czerwonego-na-niebieski-czyli-sztuka-innowacji"
                                            target="blank"
                                        >
                                            Przepłynąć z oceanu czerwonego na niebieski czyli sztuka innowacji
                                        </a>,
                                        <a href="http://www.eioba.pl/a/3lh3/archipelag-saharyjski" target="blank">
                                            Archipelag sacharyjski
                                        </a>,
                                        <a href="http://www.eioba.pl/a/32qm/nieekologiczne-elektrownie" target="blank">
                                            Nieekologiczne elektrownie
                                        </a>,
                                        <a href="http://www.eioba.pl/a/2vuj/alko-holowanie" target="blank">
                                            Alko-holowanie
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/2wvb/tak-bylo-na-zaglach-piosenka-dla-ukochanej"
                                            target="blank"
                                        >
                                            Tak było na żaglach - piosenka dla ukochanej
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/4971/poszukiwany-francuski-serial"
                                            target="blank"
                                        >
                                            Wielowersyjny film kryminalny
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/4cgh/prawa-mendla-a-rosliny-modyfikowane-genetyczniegmo"
                                            target="blank"
                                        >
                                            Prawa mendla a rośliny modyfikowane gentycznie
                                        </a>,
                                        <a
                                            href="http://www.eioba.pl/a/4cys/sukcesy-i-kres-lampy-zarowej"
                                            target="blank"
                                        >
                                            Sukcesy i kres lampy żarowej
                                        </a>,
                                    ]}
                                    renderItem={item => <List.Item>{item}</List.Item>}
                                />
                            </TabPane>
                        </Tabs>
                    </div>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default Articles;
