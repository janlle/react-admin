import React from 'react';
import {Row, Col, Card, Button, Radio, Icon, Menu, Dropdown} from 'antd';

export default class Buttons extends React.Component {

    state = {
        size: 'large'
    };

    handleSizeChange = e => {
        this.setState({ size: e.target.value });
    };

    render() {
        const size = this.state.size;

        return (
            <div>
                <Card title="basic button">
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">dashed</Button>
                    <Button type="danger">danger</Button>
                    <Button type="link">link</Button>
                </Card>


                <Card title="icon button">
                    <Button type="primary" shape="circle" icon="search"/>
                    <Button type="primary" icon="search">
                        Search
                    </Button>
                    <Button shape="circle" icon="search"/>
                    <Button icon="search">Search</Button>
                    <br/>
                    <Button shape="circle" icon="search"/>
                    <Button icon="search">Search</Button>
                    <Button type="dashed" shape="circle" icon="search"/>
                    <Button type="dashed" icon="search">
                        Search
                    </Button>
                </Card>

                <Card title="change button">

                    <Radio.Group value={size} onChange={this.handleSizeChange}>
                        <Radio.Button value="large">Large</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="small">Small</Radio.Button>
                    </Radio.Group>
                    <br />
                    <br />
                    <Button type="primary" size={size}>
                        Primary
                    </Button>
                    <Button size={size}>Normal</Button>
                    <Button type="dashed" size={size}>
                        Dashed
                    </Button>
                    <Button type="danger" size={size}>
                        Danger
                    </Button>
                    <Button type="link" size={size}>
                        Link
                    </Button>
                    <br />
                    <Button type="primary" shape="circle" icon="download" size={size} />
                    <Button type="primary" shape="round" icon="download" size={size}>
                        Download
                    </Button>
                    <Button type="primary" icon="download" size={size}>
                        Download
                    </Button>
                    <br />
                    <Button.Group size={size}>
                        <Button type="primary">
                            <Icon type="left" />
                            Backward
                        </Button>
                        <Button type="primary">
                            Forward
                            <Icon type="right" />
                        </Button>
                    </Button.Group>

                </Card>

            </div>
        );
    }

}