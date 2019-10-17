import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom'
import MenuConfig from './config'
import DocumentTitle from 'react-document-title';
import AllComponents from '../components/'
import queryString from 'query-string';


export default class IRouter extends React.Component {

    requireAuth = (permission, component) => {
        const {auth} = this.props;
        const {permissions} = auth.data;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'}/>;
        return component;
    };

    requireLogin = (component, permission) => {
        const {auth} = this.props;
        const {permissions} = auth.data;
        if (process.env.NODE_ENV === 'production' && !permissions) {
            return <Redirect to={'/login'}/>;
        }
        return permission ? this.requireAuth(permission, component) : component;
    };

    render() {
        return <Switch>
            {Object.keys(MenuConfig).map(item => MenuConfig[item].map(child => {
                    const route = child => {
                        const Component = AllComponents[child.component];
                        return (
                            <Route
                                key={child.route || child.key}
                                exact
                                path={child.route || child.key}
                                render={props => {
                                    const reg = /\?\S*/g;
                                    // 匹配?及其以后字符串
                                    const queryParams = window.location.hash.match(reg);
                                    // 去除?的参数
                                    const {params} = props.match;
                                    Object.keys(params).forEach(key => {
                                        params[key] = params[key] && params[key].replace(reg, '');
                                    });
                                    props.match.params = {...params};
                                    const merge = {
                                        ...props,
                                        query: queryParams ? queryString.parse(queryParams[0]) : {}
                                    };
                                    // 重新包装组件
                                    const wrappedComponent = (
                                        <DocumentTitle title={child.title}>
                                            <Component {...merge} />
                                        </DocumentTitle>
                                    );
                                    console.log("login: " + item.login);
                                    return item.login ? wrappedComponent : this.requireLogin(wrappedComponent, item.auth);
                                }}
                            />
                        )

                    };
                    return child.component ? route(child) : child.subs.map(child => route(child))
                })
            )}
            <Route render={() => <Redirect to='/404'/>}/>
        </Switch>
    }
}




