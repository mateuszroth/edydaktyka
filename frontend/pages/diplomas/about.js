import React from 'react'
import { Layout, Menu } from 'antd'
import Sider from '../../components/pages/diplomas/Sider'
import Breadcrumb from '../../components/pages/diplomas/Breadcrumb'

const PAGE_NAME = 'Promotorstwo'

export default class extends React.Component {
  static async getInitialProps(props) {
    return {}
  }

  render() {
    return (
      <Layout>
        <Sider />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb />
          <Layout.Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            <div>
              <p>Promotorstwo Poprowadził prawie półtorej setki prac dyplomowych promując często świetnych dyplomantów. Te prace to w większości autorskie zastosowania internetu. Ciągle zresztą pojawiaja się nowe pomysły.</p>
              <p>Jestem wykładowcą informatyki na politechnice gdzie moją ulubioną aktywnością jest zajmowanie się pracami dyplomowymi studentów zarówno inżynierskimi jak magisterskimi. Oferowane przeze mnie tematy prac nie wynikają z potrzeby załatania jakiejś dziury w projekcie akademickim, lecz są podporządkowane oczekiwaniom studentów na "modną" ale też innowacyjną tematykę z wyraźnie nakreślonym celem praktycznym. Powoduje to, że potrzeba takiego projektu jest zrozumiała właściwie dla wszystkich i jest to często bardzo przydatny "gadżet". Moją tradycyjna tematyką są serwisy internetowe, coraz częściej zastępowane czy uzupełniane aplikacjami mobilnymi i wspierane konstruowanym indywidualnie przez studentów sprzętem. Są też gry komputerowe, o przeróżnej tematyce i w różnych technologiach. Kilka najciekawszych prac spośród prawie półtorej setki znajduje się na liście: Najciekawsze dyplomy Od dawna kusi mnie crowdfunding takich tematów. Czy to na etapie konstruowania pracy, kiedy można by wesprzeć studentów by ich prototyp był bliższy praktyce np. finansując zakupy sprzętowe czy graficzne modele 3D(np. dla gry), czy też już po obronie dla uczynienia z niej produktu rynkowego.</p>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}