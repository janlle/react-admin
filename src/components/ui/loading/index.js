import React from 'react';
import {Row, Col, Card, Spin, Alert, Switch, Button} from 'antd';


export default class Loading extends React.Component {

    state = {
        loading: false
    };

    render() {
        const container = (
            <Alert
                message="Alert message title"
                description="Further details about the context of this alert."
                type="info"
            />
        );

        return (
            <div>
                <Row>
                    <Col md={12}>
                        <Card>
                            <Spin/>
                        </Card>
                    </Col>
                    <Col md={12}>
                        <Spin size="small"/>
                        <Spin/>
                        <Spin size="large"/>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <Card bordered={false}>
                            <Spin spinning={this.state.loading}>{container}</Spin>
                            Loading state：<Switch checked={this.state.loading} onChange={this.toggle}/>
                        </Card>
                    </Col>
                    <Col md={12}>
                        <Card>
                            <Spin>
                                <Alert message="alert message title" description="message description" type="info"/>
                            </Spin>
                        </Card>
                    </Col>
                </Row>

            </div>
        );
    }


}
