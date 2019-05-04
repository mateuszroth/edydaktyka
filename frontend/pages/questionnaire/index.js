import React from 'react'
import { Layout, Menu } from 'antd'
import Breadcrumb from '../../components/pages/questionnaire/Breadcrumb'
import QuestionnaireForm from '../../components/pages/questionnaire/QuestionnaireForm'
import styles from './index.module.scss'

const PAGE_NAME = 'Ankieta'

export default class extends React.Component {
  static async getInitialProps(props) {
    return {}
  }

  render() {
    return (
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb />
          <Layout.Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          <h1 className={styles.header}>{PAGE_NAME}</h1>
          <div className={styles.content}>
              <QuestionnaireForm />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}
