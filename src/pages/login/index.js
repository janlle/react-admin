// import React from 'react'
// import {Form, Icon, Row, Col, Input, Button, Checkbox, Modal, message} from 'antd';
// import './index.less'
// import * as Http from '../../axios'
// import UrlConfig from '../../axios/config'
// import Util from '../../util'
// import LoginBackground from '../../assets/images/login_bg.png';
//
// const FormItem = Form.Item;
//
// class ResetPassword extends React.Component {
//
//     state = {
//         loading: false,
//         time: 59
//     };
//
//     handleCountdown = () => {
//         let temp = this.state.time;
//         let siv = setInterval(() => {
//             this.setState({
//                 time: (temp--),
//                 loading: true
//             }, () => {
//                 if (temp <= -1) {
//                     clearInterval(siv);
//                     this.setState({
//                         loading: false,
//                         time: 59
//                     })
//                 }
//             });
//         }, 1000)
//     };
//
//
//     handleSendSms = () => {
//         let target = this.state.target;
//         if ('' === target) {
//             message.warn('请输入手机号或邮箱');
//             return;
//         } else if (!Util.checkEmail(target) && !Util.checkPhone(target)) {
//             message.warn('手机号或邮箱格式不合法');
//             return;
//         }
//
//         this.handleCountdown();
//         Http.GET({url: '/api/admin/cms/sms?target=' + this.state.target}).then(res => {
//             if (res && res.code === 20000) {
//                 message.info('验证码已发送请查收')
//             } else {
//                 message.error('获取验证码失败')
//             }
//         });
//     };
//
//     showModal = () => {
//         this.setState({
//             visible: true
//         });
//         return false
//     };
//
//     handleCancel = () => {
//         this.setState({
//             visible: false
//         })
//     };
//
//     handleReset = (event) => {
//         event.preventDefault();
//         this.props.form.validateFields((err, values) => {
//             if (!err) {
//                 let params = {
//                     account: values.account,
//                     password: values.password,
//                     confirm: values.confirm,
//                     code: values.code
//                 };
//                 Http.POST({url: '/api/admin/cms/reset', data: params}).then(res => {
//                     if (res && res.code === 20000) {
//                         this.setState({
//                             visible: false
//                         })
//                     }
//                 })
//             }
//
//         });
//     };
//
//     handelChange(event) {
//         this.setState({
//             target: event.target.value
//         })
//     };
//
//
//     render() {
//         const {getFieldDecorator} = this.props.form;
//         return (
//             <span className="reset-password">
//                 <span className="forgot-password" onClick={this.showModal}>忘记密码</span>
//                 <Modal
//                     visible={this.state.visible}
//                     title="重置密码"
//                     okText="重置"
//                     onCancel={this.handleCancel}
//                     onOk={this.handleReset}
//                     cancelText="取消"
//                     width={330}
//                 >
//                 <Form className="reset-password-form">
//                     <FormItem className="account" style={{width: 280}}>
//                         {getFieldDecorator('account', {
//                             rules: [{required: true, message: 'Please input your username!'}],
//                         })(
//                             <Input prefix={<Icon type="user"/>} placeholder="手机号/邮箱"
//                                    onChange={this.handelChange.bind(this)}/>
//                         )}
//                     </FormItem>
//
//                     <FormItem className="password" style={{width: 280}}>
//                         {getFieldDecorator('password', {
//                             rules: [{required: true, message: 'Please input your username!'}],
//                         })(
//                             <Input prefix={<Icon type="lock"/>} type="password" placeholder="密码"/>
//                         )}
//                     </FormItem>
//
//                     <FormItem className="confirm" style={{width: 280}}>
//                         {getFieldDecorator('confirm', {
//                             rules: [{required: true, message: 'Please input your username!'}],
//                         })(
//                             <Input prefix={<Icon type="lock"/>} type="password" placeholder="确认密码"/>
//                         )}
//                     </FormItem>
//
//                     <FormItem className="code">
//                         <Row>
//                             <Col span={13}>
//                                 {getFieldDecorator('code', {
//                                     rules: [{required: true, message: '请输入手机或邮箱的验证码'}],
//                                 })(
//                                     <Input type="text" placeholder="验证码"/>
//                                 )}
//                             </Col>
//
//                             <Col span={9}>
//                                 <Button loading={this.state.loading} type="primary" onClick={this.handleSendSms}>
//                                     {this.state.loading ? this.state.time + '秒后获取' : '获取验证码'}
//                                 </Button>
//                             </Col>
//                         </Row>
//                     </FormItem>
//                 </Form>
//             </Modal>
//             </span>
//         );
//     }
//
// }
//
// const Reset = Form.create({})(ResetPassword);
//
// export default class Login extends React.Component {
//
//     state = {};
//
//     loginSubmit = (event) => {
//         event.preventDefault();
//         this.props.form.validateFields((err, values) => {
//             if (!err) {
//                 const params = {
//                     account: values.account,
//                     password: values.password,
//                     captcha: values.captcha,
//                     uuid: sessionStorage.getItem('uuid'),
//                 };
//                 let history = this.props.history;
//                 Http.POST({url: '/api/admin/cms/login', data: params}).then(res => {
//                     if (res && res.code === 20000) {
//                         message.info('登录成功');
//                         sessionStorage.setItem('username', res.data.username);
//                         sessionStorage.setItem('avatar', res.data.avatar);
//                         sessionStorage.setItem('role', res.data.role);
//                         sessionStorage.setItem('account', res.data.account);
//                         sessionStorage.setItem('token', res.data.token);
//                         history.push('/index');
//                     }
//                 })
//             } else {
//                 message.info(err);
//             }
//
//         })
//     };
//
//     checkAccount = (rule, value, callback) => {
//         if (!value) {
//             callback('请输入账号')
//         } else if (!Util.checkPhone(value) && !Util.checkEmail(value)) {
//             callback('请输入邮箱或手机号')
//         } else {
//             callback();
//         }
//     };
//
//     componentWillMount() {
//         let code = Util.getRandomString();
//         sessionStorage.setItem('uuid', code);
//         this.setState({
//             captcha: UrlConfig.SERVICE_URL + "/api/admin/cms/captcha?code=" + code
//         })
//     }
//
//     checkPassword = (rule, value, callback) => {
//         if (!value) {
//             callback('请输入密码');
//         } else {
//             callback();
//         }
//     };
//
//     refreshCaptcha = () => {
//         let code = Util.getRandomString();
//         sessionStorage.setItem("uuid", code);
//         this.setState({
//             captcha: UrlConfig.SERVICE_URL + "/api/admin/cms/captcha?code=" + code
//         });
//     };
//
//     render() {
//         const {getFieldDecorator} = this.props.form;
//
//         return (
//             <div style={{
//                 backgroundImage: `url(${LoginBackground})`,
//                 height: '100%',
//                 width: '100%',
//                 position: 'absolute',
//                 top: '0px',
//                 bottom: '0px'
//             }}>
//                 <div className="login-form">
//                     <Form className="login-form-in" onSubmit={this.loginSubmit} style={{maxWidth: 300, maxHeight: 340}}>
//                         <h2>用户登录</h2>
//                         <FormItem>
//                             {
//                                 getFieldDecorator('account', {
//                                     initialValue: '',
//                                     rules: [{validator: this.checkAccount}]
//                                 })(
//                                     <Input prefix={<Icon type="user"/>} placeholder="手机号/邮箱"/>
//                                 )
//                             }
//                         </FormItem>
//
//                         <FormItem>
//                             {
//                                 getFieldDecorator('password', {
//                                     initialValue: '',
//                                     rules: [{validator: this.checkPassword}]
//                                 })(
//                                     <Input type="password" prefix={<Icon type="lock"/>} placeholder="密码"/>
//                                 )
//                             }
//                         </FormItem>
//
//                         <FormItem className="validate-code">
//                             <Row gutter={6}>
//                                 <Col span={21}>
//                                     {
//                                         getFieldDecorator('captcha', {
//                                             rules: [{required: true, message: '请输入验证码'}],
//                                         })(<Input placeholder="验证码"/>)
//                                     }
//                                 </Col>
//                                 <Col span={3}>
//                                     <img src={this.state.captcha} alt="验证码" onClick={this.refreshCaptcha}/>
//                                 </Col>
//                             </Row>
//                         </FormItem>
//
//                         <FormItem>
//                             {
//                                 getFieldDecorator('remember', {
//                                     valuePropName: 'checked',
//                                     initialValue: true,
//                                 })(<Checkbox>记住我</Checkbox>)
//                             }
//                             <Reset/>
//                         </FormItem>
//
//                         <FormItem>
//                             <Button type="primary" htmlType="submit" className="submit">登录</Button>
//                         </FormItem>
//                     </Form>
//                 </div>
//             </div>
//         );
//     }
//
// }
//
// Login = Form.create({})(Login);
//
//
//
//
