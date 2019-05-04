import React from 'react'
import { Layout, Calendar, Badge } from 'antd'
import Sider from '../../components/pages/schedule/Sider'
import Breadcrumb from '../../components/pages/schedule/Breadcrumb'

const PAGE_NAME = 'Plan zajęć'

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ]; break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ]; break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ]; break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {
        listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))
      }
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

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
            <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}
