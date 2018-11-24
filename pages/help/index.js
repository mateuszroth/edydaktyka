import React from 'react'
import { Layout } from 'antd'
import Sider from '../../components/pages/help/Sider'
import Breadcrumb from '../../components/pages/help/Breadcrumb'

const PAGE_NAME = 'Pomoc'

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
              <h2>Serwis edu.andrzeju.pl spełnia następujące funkcje:</h2>
              <ul>
                <li>Informuje o prowadzonych zajęciach ze studentami i zawiera materiały do zajęć.</li>
                <li>Informuje o pracach dyplomowych prowadzonych teraz, wcześniej i w zamierzeniach oraz zawiera materiały dla dyplomantów.</li>
                <li>Informuje o prowadzonej działaności popularyzatorskiej i zawiera liczne materiały do niej.</li>
                <li>Umożliwia organizowanie grup studenckich z planowaniem zajęć.</li>
                <li>Umożliwia na przewidzianych do tego zajęciach organizowanie się studentów w kilkuosobowe wspólnie oceniane zespoły.</li>
                <li>Umożliwia prowadzącemu kontrolę obecności na zajęciach, a studentom wgląd w stan swoich obecności.</li>
                <li>Umożliwia studentom pobieranie tematów zajęć, wysyłanie sprawozdań z nich prowadzącemu oraz ich ocenianie przez prowadzącego z informacją zwrotną dla studentów.</li>
                <li>Umożliwia wystawianie oceny semestralnej  i powiadamianie o niej student(ki/a).</li>
                <li>Umożliwia studentom zapoznawanie się z propozycjami tematów prac dyplomowych, zapisywanie się na nie, a nawet proponowanie własnych tematów.</li>
                <li>Umożliwia decydowanie przez prowadzącego,  który z chętnych będzie daną pracę dyplomową realizował.</li>
                <li>Umożliwia studentom wypełnianie anonimowej ankiety dotyczących odbytych zajęć.</li>
                <li>Umożliwia studentom wybór zadań semestralnych na zasadzie kto pierwszy.</li>
              </ul>
              <img src="http://www.cs.put.poznan.pl/aurbanski/przewodnik.jpg" alt="Przewodnik po stronie" />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}
