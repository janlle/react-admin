import React from 'react';
import DocumentTitle from 'react-document-title';
import {Layout} from 'antd';
import CustomSider from './pages/customSider'
import CustomHeader from './pages/customHeader'

const {Header, Sider, Content, Footer} = Layout;

class App extends React.Component {

    state = {
        collapsed: false,
        title: 'Admin',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };


    render() {
        const {title} = this.state;
        const {auth = {data: {}}, responsive = {data: {}}} = this.props;

        return (
            <DocumentTitle title={title}>
                <Layout>

                    {/*侧边栏*/}
                    <CustomSider collapsed={this.state.collapsed}/>

                    <Layout>

                        {/*头部*/}
                        <CustomHeader toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}}/>

                        {/*中部*/}
                        <Content style={{margin: '0 16px', overflow: 'initial', flex: '1 1 0'}}>
                            {/*<Routes auth={auth} />*/}
                        </Content>

                        {/*底部*/}
                        <Footer style={{textAlign: 'center'}}>
                            React-Admin ©{new Date().getFullYear()} Created by exklin@gmail.com
                        </Footer>

                    </Layout>
                </Layout>
            </DocumentTitle>
        );
    }
}

export default App;


