import React from 'react'
import { Layout } from 'antd'
import Sider from '../../components/pages/help/Sider'
import Breadcrumb from '../../components/pages/help/Breadcrumb'

const PAGE_NAME = 'FAQ - Najczęściej zadawane pytania'

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
              <ol>
                <li><b>Od czego zacząć pracę z serwisem jako student lub dyplomant?</b><br />
                W wielu przypadkach wystarczy przeglądanie informacyjnej części serwisu(lewe menu). Dla podjęcia ściślejszej wspópracy trzeba jednak
                zarejestrować się w odpowiednich grupach(niekiedy jest ich wiecej nawet jeśli nie wiąże się to z dodatkowymi ocenami końcowymi).</li>
                <li><b>Jak rejestrować się w większej liczbie grup ?</b><br />
                Przy rejestracji klikać w okienku w kilka grup po kolei przy czym przy wyborze każdej następnej przytrzymywać klawisz CTRL.
                Można też podać dodatkową grupę przy ponownej rejestracji pamiętając o uzyciu dokładnie tego samego hasła i poprawnych innych danych.</li>
                <a name="sprawozdania"></a>
                <li><a name="sprawozdania"><b>Jak przesłać sprawozdanie?</b></a><br />
                Aby to zrobić należy być zalogowanym i skorzystać z pozycji "Sprawozdania" w poziomym menu. Aby móc się logować należy się wcześniej zarejestrować.</li>
              </ol>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}
