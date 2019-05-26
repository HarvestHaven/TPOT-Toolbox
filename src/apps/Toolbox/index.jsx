import './App.css';
import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import { SnackbarProvider, withSnackbar } from 'notistack';
import { inject, observer } from 'mobx-react'
import { Provider } from 'mobx-react';
import MobxStore from '../../shared/stores'
import Forage from '../../shared/localforage'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import { hot } from 'react-hot-loader'
import AppShell from './containers/AppShell'

// Initilize Root Store
const store = new MobxStore()
const forage = new Forage()

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#cddc39',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#2196f3',
            dark: '#ba000d',
            contrastText: '#000',
        },
        background: {
            default: '#ede5da'
            // default: '#313439'
        }
    },
    typography: {
        useNextVariants: true,
        // fontSize: 60,
        // htmlFontSize: 20,
    },
});

const snackbarOptions = {
    maxSnack: 3,
    disableWindowBlurListener: true,
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
    },
}

export default () =>
    <Provider forage={forage} store={store} >
        <ThemeProvider {...{ theme }}>
            <SnackbarProvider {...snackbarOptions}>
                <RoutedApp />
            </SnackbarProvider>
        </ThemeProvider>
    </Provider >

@withSnackbar
@inject('forage', 'store')
@observer
@hot(module)
class RoutedApp extends Component {

    componentDidMount() {
        const { servicesStore } = this.props.store
        const { enqueueSnackbar, closeSnackbar } = this.props

        // : Pass the calling function for notifications to the store
        servicesStore.setNotifyFunctions({ enqueueSnackbar, closeSnackbar })

        // : Initialize the localforage session for videos
        this.props.forage.videos.init()
    }

    render() {
        // const { services } = this.props.store
        // const { forage } = this.props
        // const { videos } = forage
        // const { loader } = services

        return (
            <Router>
                {/* <LinkOverlay /> */}
                <Route path={`/`} render={(match) => (
                    <AppShell store={store} match={match} />
                )} />
            </Router>
        );
    }
}

// const LoadingScreen = observer(() =>
//   <div style={{
//     height: '100vh', width: '100vw', background: '#eae1c5', position: 'absolute',
//     display: 'flex', flexFlow: 'row no-wrap', justifyContent: 'center', alignItems: 'center'
//   }}>
//     <h1 style={{ color: '#ec5c5c' }}>...</h1>
//   </div>
// )

const LinkOverlay = observer(() =>
    <ul style={{
        position: 'fixed', bottom: 0, zIndex: 9999, right: 20, padding: 10, borderRadius: 4, boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)', listStylePosition: "inside", background: 'lightgrey', paddingTop: 0, paddingBottom: 0, fontSize: 12,
    }}>
        <li><Link to="/">/</Link></li>
        <li><Link to="/letters">/letters</Link></li>
        <li><Link to="/letters/publish">/letters/publish</Link></li>
        <li><Link to="/letters/load">/library/load</Link></li>
        <li><Link to="/settings">/settings</Link></li>
        <li><Link to="/splash">/splash</Link></li>
    </ul>
)

// /** Sample fetch code - MP */


// const attendees = document.querySelector("#attendees");
// console.log('attendees: ', attendees);

// fetch("https://jsonplaceholder.typicode.com/users")
//     .then(response => response.json())
//     .then(data => {

//         // Actual data:
//         console.log('users (external): ', data)

//         // Sample UI code
//         let html = '';
//         data.forEach(user => {
//             html +=
//                 `<div class="card">
//                 <h2>${user.name}</h2>
//                 <div>${user.email}</div>
//             </div>`
//         });
//         attendees.innerHTML = html;
//     })

// fetch("http://localhost:4000/download?URL=https://www.youtube.com/watch?v=i6USBe9Gr3U")
//     .then(response => response.json())
//     .then(data => {
//         console.log('app -> localhost 4000 data: ', data);
//     })


//     // ytdl(URL, {
//     //     format: 'mp4'
//     // }).pipe(res);
