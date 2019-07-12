import React, { Component } from 'react'
import PropTypes from "prop-types";
import { compose } from 'recompose'
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import {ShelfButton} from './ShelfButton';
import { SvgIcon, Avatar } from '@material-ui/core';
import { width } from '@material-ui/system';


const styles = theme => ({
    root: {
        transition: 'all 220ms ease-in-out'
    },
    avatar: {

    }
})

export const Shelf = compose(
    inject('store'),
    withStyles(styles),
    observer
)(
    class Shelf extends Component {

        @observable expanded = false

        @action expand = () => {
            this.expanded = !this.expanded
        }

        render() {
            const { store, classes, variant, children } = this.props
            const { expanded } = this
            console.log('props', this.props)
            return (
                <Box
                    bgcolor="#202225" py={1} className={classes.root}
                    display="flex" flexDirection="column" justifyContent="space-between" style={{
                        boxSizing: 'border-box', height: '100%'
                    }}
                >
                    <ShelfButton tooltip="Expand" onClick={this.expand} color="#e35644">
                        <ToolboxIcon />
                    </ShelfButton>
                    <Divider />
                    <Box flexGrow={1}>
                        {children}
                    </Box>
                    <Divider />
                    <ShelfButton tooltip="Settings" route='/settings' >
                        <SettingsIcon />
                    </ShelfButton>
                </Box>
            )
        }
    }
)

Shelf.propTypes = {
    store: PropTypes.object.isRequired,
}


{/* <Box display="flex" flexDirection="row" justifyContent="stretch" alignItems="stretch" style={{
    position: 'absolute', boxSizing: 'border-box', height: '100%', width: '100%'
}}>
    <Box flexGrow={1} display="flex" flexGrow={1} >
        <Box minWidth={72} bgcolor="#202225">
            {appShelf}
        </Box>
        <Box bgcolor="#2f3136" width={240} color="primary.main">{this.sidebar && <> {this.sidebar} </> }</Box>
        <Box flexGrow={1} bgcolor="#f6f6f7" color="secondary.main">
            <Box color="accents.pink">
                <Button color="inherit">Test Button</Button>
            </Box>
        </Box>
    </Box>
</Box> */}

const ToolboxIcon = () => (
    <SvgIcon viewBox='0 0 512 512' style={{ filter: 'drop-shadow(1px 1px 0.5px rgba(0,0,0,0.4))', fontSize: 30}} >
        <path fill="#E64C3C" d="M476.69,300.138v158.897c-0.029,9.739-7.916,17.627-17.655,17.655H52.966   c-9.739-0.029-17.627-7.916-17.655-17.655V300.138h194.207v44.138c0.029,9.739,7.916,17.627,17.655,17.655h17.655   c9.739-0.029,17.627-7.916,17.655-17.655v-44.138H476.69z" />
        <path fill="#C03A2B" d="M459.034,44.138V256h-35.31V70.621H88.276V256h-35.31V44.138c0.015-4.869,3.958-8.813,8.828-8.828   h388.414C455.076,35.325,459.02,39.269,459.034,44.138z" />
        <path fill="#464F5D" d="M423.724,71.503V256H298.637l-17.655-17.655l38.047-38.047c3.017-2.864,7.585-3.335,11.123-1.148   c10.358,5.882,23.37,4.11,31.779-4.326l18.714-18.714c10.328-10.339,10.328-27.09,0-37.429l-18.714,18.714   c-6.899,6.899-18.083,6.899-24.982,0c-6.899-6.899-6.899-18.083,0-24.982l18.715-18.714c-10.339-10.329-27.09-10.329-37.429,0   l-18.714,18.714c-8.436,8.409-10.207,21.421-4.326,31.779c2.188,3.538,1.716,8.106-1.148,11.123L256,213.363l-38.047-38.047   c-2.864-3.017-3.335-7.585-1.148-11.123c5.882-10.358,4.111-23.37-4.326-31.779l-18.714-18.714   c-10.339-10.329-27.09-10.329-37.429,0l18.714,18.714c6.899,6.899,6.899,18.083,0,24.982c-6.899,6.899-18.083,6.899-24.982,0   l-18.714-18.714c-10.328,10.339-10.328,27.09,0,37.429l18.714,18.714c8.409,8.436,21.421,10.207,31.779,4.326   c3.538-2.188,8.106-1.717,11.123,1.148l38.047,38.047L213.363,256H88.276V71.503c0.253-0.364,0.585-0.666,0.971-0.883h333.506   C423.139,70.838,423.471,71.14,423.724,71.503z" />
        <path fill="#E6E7E8" d="M256,213.363l-24.982,24.982l-38.047-38.047c-3.017-2.864-7.585-3.335-11.123-1.148   c-10.358,5.882-23.37,4.11-31.779-4.326l-18.714-18.714c-10.328-10.339-10.328-27.09,0-37.429l18.714,18.714   c6.899,6.899,18.083,6.899,24.982,0c6.899-6.899,6.899-18.083,0-24.982l-18.714-18.714c10.339-10.329,27.09-10.329,37.429,0   l18.714,18.714c8.436,8.409,10.207,21.421,4.326,31.779c-2.188,3.538-1.716,8.106,1.148,11.123L256,213.363z" />
        <path fill="#95A5A5" d="M380.646,176.11l-18.714,18.714c-8.409,8.436-21.421,10.207-31.779,4.326   c-3.538-2.188-8.106-1.717-11.123,1.148L263.327,256h-49.964l80.684-80.684c2.864-3.017,3.335-7.585,1.148-11.123   c-5.882-10.358-4.111-23.37,4.326-31.779l18.714-18.714c10.339-10.329,27.09-10.329,37.429,0l-18.715,18.714   c-6.899,6.899-6.899,18.083,0,24.982c6.899,6.899,18.083,6.899,24.982,0l18.714-18.714   C390.973,149.02,390.973,165.771,380.646,176.11z" />
        <path fill="#BDC3C7" d="M282.483,300.138v44.138c-0.029,9.739-7.916,17.627-17.655,17.655h-17.655   c-9.739-0.029-17.627-7.916-17.655-17.655v-44.138H282.483z" />
        <polygon fill="#E6E7E8" points="298.637,256 263.327,256 280.982,238.345  " />
        <rect fill="#FF5364" x="35.31" y="256" width="441.379" height="44.138" />
    </SvgIcon>
    // <Avatar src={require('../../../shared/media/tpot_icon.png')} style={{ borderRadius: 0, filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.7))' }}></Avatar>
)

const SettingsIcon = () => (
    <SvgIcon viewBox='0 0 418 512'>
        <path fill="#fff" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352zm-92-272H224v-40c0-13.2-10.8-24-24-24h-48c-13.2 0-24 10.8-24 24v40H92c-6.6 0-12 5.4-12 12v8c0 6.6 5.4 12 12 12h36v40c0 13.2 10.8 24 24 24h48c13.2 0 24-10.8 24-24v-40h100c6.6 0 12-5.4 12-12v-8c0-6.6-5.4-12-12-12zm-132 64h-32v-96h32v96zm148 96h-20v-40c0-13.2-10.8-24-24-24h-48c-13.2 0-24 10.8-24 24v40H108c-6.6 0-12 5.4-12 12v8c0 6.6 5.4 12 12 12h116v40c0 13.2 10.8 24 24 24h48c13.2 0 24-10.8 24-24v-40h20c6.6 0 12-5.4 12-12v-8c0-6.6-5.4-12-12-12zm-52 64h-32v-96h32v96z" />
        {/* <path d="M15.9,18.45C17.25,18.45 18.35,17.35 18.35,16C18.35,14.65 17.25,13.55 15.9,13.55C14.54,13.55 13.45,14.65 13.45,16C13.45,17.35 14.54,18.45 15.9,18.45M21.1,16.68L22.58,17.84C22.71,17.95 22.75,18.13 22.66,18.29L21.26,20.71C21.17,20.86 21,20.92 20.83,20.86L19.09,20.16C18.73,20.44 18.33,20.67 17.91,20.85L17.64,22.7C17.62,22.87 17.47,23 17.3,23H14.5C14.32,23 14.18,22.87 14.15,22.7L13.89,20.85C13.46,20.67 13.07,20.44 12.71,20.16L10.96,20.86C10.81,20.92 10.62,20.86 10.54,20.71L9.14,18.29C9.05,18.13 9.09,17.95 9.22,17.84L10.7,16.68L10.65,16L10.7,15.31L9.22,14.16C9.09,14.05 9.05,13.86 9.14,13.71L10.54,11.29C10.62,11.13 10.81,11.07 10.96,11.13L12.71,11.84C13.07,11.56 13.46,11.32 13.89,11.15L14.15,9.29C14.18,9.13 14.32,9 14.5,9H17.3C17.47,9 17.62,9.13 17.64,9.29L17.91,11.15C18.33,11.32 18.73,11.56 19.09,11.84L20.83,11.13C21,11.07 21.17,11.13 21.26,11.29L22.66,13.71C22.75,13.86 22.71,14.05 22.58,14.16L21.1,15.31L21.15,16L21.1,16.68M6.69,8.07C7.56,8.07 8.26,7.37 8.26,6.5C8.26,5.63 7.56,4.92 6.69,4.92C5.82,4.92 5.11,5.63 5.11,6.5C5.11,7.37 5.82,8.07 6.69,8.07M10.03,6.94L11,7.68C11.07,7.75 11.09,7.87 11.03,7.97L10.13,9.53C10.08,9.63 9.96,9.67 9.86,9.63L8.74,9.18L8,9.62L7.81,10.81C7.79,10.92 7.7,11 7.59,11H5.79C5.67,11 5.58,10.92 5.56,10.81L5.4,9.62L4.64,9.18L3.5,9.63C3.41,9.67 3.3,9.63 3.24,9.53L2.34,7.97C2.28,7.87 2.31,7.75 2.39,7.68L3.34,6.94L3.31,6.5L3.34,6.06L2.39,5.32C2.31,5.25 2.28,5.13 2.34,5.03L3.24,3.47C3.3,3.37 3.41,3.33 3.5,3.37L4.63,3.82L5.4,3.38L5.56,2.19C5.58,2.08 5.67,2 5.79,2H7.59C7.7,2 7.79,2.08 7.81,2.19L8,3.38L8.74,3.82L9.86,3.37C9.96,3.33 10.08,3.37 10.13,3.47L11.03,5.03C11.09,5.13 11.07,5.25 11,5.32L10.03,6.06L10.06,6.5L10.03,6.94Z" /> */}
    </SvgIcon>
)


const Divider = () => (
    <Box width='100%' display="flex" justifyContent="center">
        <Box height={2} width={32} my={'4px'} borderRadius={2} bgcolor="#2f3136" />
    </Box>

)