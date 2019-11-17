import React from "react";
import { Layout, PageHeader } from "antd";
import Sider from "../../components/pages/author/Sider";
import Breadcrumb from "../../components/pages/author/Breadcrumb";

const PAGE_NAME = "Autor";

export default class extends React.Component {
  static async getInitialProps(props) {
    return {};
  }

  render() {
    return (
      <Layout>
        <Sider />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb />
          <Layout.Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <div>
              <PageHeader
                ghost={false}
                title="Kilka zdań o autorze"
              />
              <p>
                Ukończył V Liceum Ogólnokształcące w Poznaniu{" "}
                <a href="http://www.vlo.poznan.pl/sites/default/files/wywiadAU.pdf">
                  (wywiad z uczniami)
                </a>{" "}
                fascynując się matematyką, fizyką i swoim hobby elektronicznym.
                Z zapartym tchem pochłaniał skąpe strzępy informacji o wtedy
                nigdzie nieobecnych komputerach. To pchnęło go ku zdawaniu na
                informatykę na Politechnice Poznańskiej.
              </p>
              <p>
                Edukację informatyczną zaczynał od dziurek w kartach i
                tasiemkach papierowych. Najmilej wspomina zajęcia na komputerze{" "}
                <a href="http://en.wikipedia.org/wiki/Data_General_Nova">
                  {" "}
                  (NOVA 1200)
                </a>{" "}
                bez żadnego oprogramowania pozwalającym obcować z binarnymi
                przełącznikami i lampkami. Dla niego to wykraczając poza program
                zajęć zrobił disasembler drukujący wskazany obszar pamięci w
                postaci kodów rozkazowych asemblera. Przydał się potem wielu
                kolegom do programowania tej maszyny na zajęciach oraz w pracach
                dyplomowych. Na dużej maszynie (bo{" "}
                <a href="http://pl.wikipedia.org/wiki/Odra_1305">
                  ODRA 1305
                </a>{" "}
                zajmowała dwie sale) początkowo jego programy na kartach
                perforowanych czekały na liczenie tydzień. Niebawem
                wielodostępny system operacyjny (GEORGE-3{" "}
                <a href="http://en.wikipedia.org/wiki/GEORGE_3">EN</a>/
                <a href="http://pl.wikipedia.org/wiki/George_3">PL</a>) skrócił
                to do kilku godzin, a interaktywne terminale do kilku minut
              </p>
              <p>
                Dyplom magisterski pisał jeszcze na swojej mechanicznej maszynie
                do pisania, ale doktorat już na kupionym przez rodzinę
                mikrokomputerze. Bezpośredność i szybkość pracy tej maszyny
                pomogły też skonstruować i udoskonalić niejeden algorytm.
              </p>
              <p>
                Na początku lat dziewięćdziesiątych nawiązał pierwszy kontakt
                e-mailowy - był to naukowiec z San Diego, którego udało się
                wyprzedzić z publikacją dowodów pewnych twierdzeń. W 1996 zrobił
                swoją pierwszą{" "}
                <a href="http://andrzeju.pl/stara.php?s=index">
                  stronę internetową
                </a>
                , a dwa lata później testował już zakupy on-line w pierwszych
                sklepach internetowych.
              </p>
              <p>
                <a href="http://alanbit.pl/gry/defilada">(Defilada)</a> Jego
                pracą dyplomową był system wspomagający projektowanie przez
                automatyczną syntezę programów projektowych. Był to rodzaj
                systemu wnioskującego monotonicznie. Natomiast w pracy
                doktorskiej rozważał systemy wnioskowania niemonotonicznego i
                publikował artykuły przed jej obroną jak i po niej. Wspólnie z
                Jerzym Nawrockim na przełomie lat 80-tych i 90-tych napisał
                kilka artykułów na temat systemów dynamicznego przydziału
                pamięci.
              </p>
              <p>
                W 2001 wydano jego podręcznik "Biblioteka VCL Delphi", a w 2004
                "Cywilizacja internetu". W 2003 zaproponował uniwersalny i
                elastyczny system zdematerializowanej recepty. Opublikował
                kilkadziesiąt artykułów naukowych, dziesięć książek,{" "}
                <a href="http://www.cs.put.poznan.pl/aurbanski/tata.php">opowiadanie</a> i{" "}
                <a href="http://www.cs.put.poznan.pl/aurbanski/komputer.php">wierszyk</a> do elementarza.
              </p>
              <p>
                W zakresie wdrożeń były też: edukacyjny system programowania
                przez analogię do zabawy kolejką{" "}
                <a href="http://andrzeju.pl/artykuly.php?idm=160&amp;idt=160">
                  TRAIN
                </a>
                , program{" "}
                <a href="http://www.nytimes.com/1998/08/16/magazine/sunday-august-16-1998-computers-confess-o-matic.html">
                  REFLEX 1.0
                </a>
                (dziś iPAD ma podobne), demo{" "}
                <a href="https://nabor.pcss.pl/">
                  systemu naboru do szkół średnich
                </a>
                , internetowa gra i{" "}
                <a href="http://www.eioba.pl/a/3j43/opowiadam-wiec-jestem">
                  zespołowy serwis literacki
                </a>
                .
              </p>
              <iframe src="//www.youtube.com/embed/y-DFUaa_ROA" />
              <p>
                Na Politechnice prowadzi głównie zajęcia z programowania:
                począwszy od języków BASIC, FORTRAN, PASCAL, PROLOG, a
                skończywszy na programowaniu serwera w PHP z bazą danych MySQL i
                przeglądarek w HTML/CSS/ JavaScript zwłaszcza{" "}
                <a href="http://www.cs.put.poznan.pl/aurbanski/bai.php">
                  webGL dla grafiki 3D
                </a>
                .
              </p>
              <p>
                <a href="http://www.cs.put.poznan.pl/aurbanski/dcm.php">(dcm)</a> Poprowadził{" "}
                <a href="http://www.cs.put.poznan.pl/aurbanski/tematy.php">
                  ponad setkę prac dyplomowych
                </a>{" "}
                promując często świetnych{" "}
                <a href="http://www.cs.put.poznan.pl/aurbanski/dyplomanci.php">
                  dyplomantów
                </a>
                . Te prace to w większości autorskie zastosowania internetu.
                Ciągle zresztą pojawiaja się nowe{" "}
                <a href="http://www.cs.put.poznan.pl/aurbanski/propozycje.php">
                  pomysły
                </a>
                .
              </p>
              <p>
                Napisał wiele opowiadań(
                <a href="http://andrzeju.pl/stara.php?s=bi">dla dzieci</a>,{" "}
                <a href="http://andrzeju.pl/opowiadania.php?idm=178&amp;idt=178">
                  science-fiction
                </a>
                ,{" "}
                <a href="http://andrzeju.pl/opowiadania.php?idm=180&amp;idt=180">
                  romansów
                </a>{" "}
                i{" "}
                <a href="http://andrzeju.pl/opowiadania.php?idm=177&amp;idt=177">
                  kryminalnych/sensacyjnych
                </a>
                ). Jego teksty zainspirowały też{" "}
                <a href="http://andrzeju.pl/piosenki.php">
                  kilkanaście piosenek
                </a>
                ,{" "}
                <a href="http://alanbit.pl/alan-bit-teledyski.php">
                  kilka teledysków
                </a>{" "}
                i kilka scenek teatralnych realizowanych przez szkoły. Wszystko
                to często z informatycznym smaczkiem.
              </p>
              <p>
                Od jesieni 2015 bierze udział w przygotowywaniu
                gimnazjalno-licealnego konkursu matematyczno-informatycznego
                KOALA.
                <a href="http://www.cs.put.poznan.pl/aurbanski/strajk.php">
                  (strajk)
                </a>{" "}
                W listopadzie 2015 zainicjował projekt stanowiący wsparcie dla
                Domów Dziecka w zakresie edukacji informatyczno-robotycznej{" "}
                <a href="http://natlok.pl/drbot-robot-z-tytulem-dr-inz/">
                  http://natlok.pl/drbot-robot-z-tytulem-dr-inz
                </a>
                ,{" "}
                <a href="https://polakpotrafi.pl/projekt/zbudowac-robota">
                  Zbudować robota
                </a>
                ,{" "}
                <a href="https://polakpotrafi.pl/projekt/naukowa-gwiazdka-w-domu-dziecka">
                  Naukowa Gwiazdka w Domu Dziecka
                </a>
                . W lutym 2016 powstało na Politechnice Poznańskiej z jego
                inicjatywy Koło Upowszechniania Programowania, które zajmuje się
                prowadzeniem zajęć z programowania robotów i korepetycji z
                przedmiotów ścisłych oraz języka angielskiego w Domach Dziecka.
              </p>
              <p>
                Lubi też słuchać muzyki na dobrym zestawie, wypoczywać w
                ogródku, nad wodą i na sprzęcie pływającym.
              </p>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
