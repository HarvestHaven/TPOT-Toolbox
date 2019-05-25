import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import GoogleDrive from "../../../shared/media/drive.png";
import HardDrive from "../../../shared/media/hdd.png";
import { convertFile } from "../../../shared/utilities/converter";
// src\shared\utilities\converter.js
///File Import Strategies:
// import { DiskFileLoader } from '../modules/docxLoaders/DiskFileLoader.ts'
// import { GoogleFileLoader } from '../modules/docxLoaders/GoogleFileLoader.ts'
// import { Clipboard } from '../modules/docxLoaders/Clipboard.ts'
// import * as Loaders from '../modules/docxLoaders/Loaders.ts'
// import { Loaders } from '../modules/docxLoaders/Loaders.ts'
// import DiskFileLoader from "../utilities/docxLoaders_js/DiskFileLoader";
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'





const styles = theme => ({
    root: {
        // paddingTop: 64,
        // display: "flex",
        // flexWrap: "wrap"
    },
    paper: {
        maxWidth: 800,
        width: 600
        // height: ,
    },
    icon: {
        display: "block",
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        height: 64,
        fontSize: 80,
        paddingTop: 64,
        paddingBottom: 32
    },
    grid: {
        "& button": {
            color: "#555",
            transition: "all 0s linear 0s !important",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)"
        },
        "&:hover": {
            "& button": {
                color: theme.palette.primary.contrastText,
                background: theme.palette.primary.main,
                transition: "all 0s linear 0s !important"
            }
        },
        width: "32.9999%"
    },
    textbox: {
        marginTop: 32,
        marginBottom: 48
    }
});

// @inject('store')
@observer
class ModalLoad extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            description: "select a file from your computer to edit"
        };
    }

    @observable open = true


    @action handleClose = () => {
        console.log('close')
        this.open = false
        const { history, match } = this.props
        if (!!history && history.push) {
            history.push(match.url)
        }
        this.props.store.lettersStore.setCurrentModal(null)
        // this.setState({ open: false });
        // this.props.onUpdate(false);
    };

    handleSelection = type => {
        console.log(type);



        //todo: Have the type-selected Loader retrive the file, regardless of its implementation
        // let loader = Loaders.getLoader(type)
        // let loader = new DiskFileLoader();
        // if (!loader) throw Error("disk file loader not initialized!");

        // //Good:
        // loader
        //     .load()
        //     .then(result => {
        //         // console.log('result:\n', result);
        //         console.log("file loaded: ", loader.path);
        //         convertFile(loader.path);
        //         // console.log("[MP] converter.html: ", converter.html);
        //         this.handleClose();
        //     })
        //     .catch(console.log);

        // console.log("test"); //runs async
    };

    handleFile = (e) => {
        console.log('handleFiles', e)
        const file = e.target.files[0]
        console.log('File: ', file)

        const reader = new FileReader()

        let html = ''

        reader.addEventListener('load', (reader, i) => {
            console.log('reader', reader.result)
            // html += 'File starts with "' + reader.result.substr(0, 25) + '"'
            // setTimeout(()=>{
            //     console.log('finished', html)
            // }, 5000)
        })

        reader.readAsText(file)

    }

    render() {
        const { classes, store } = this.props;
        // const {  } = lettersStore

        console.log(this.open)

        const cards = [
            {
                name: "From Disk",
                description: "Open a file from your computer's hard drive",
                icon: HardDrive,
                enabled: true,
                handler: () => {
                    this.handleSelection("disk");
                }
            },
            {
                name: "Coming Soon",
                description: "Open a file from your linked Google Drive folder",
                icon: GoogleDrive,
                enabled: false,
                handler: () => {
                    this.handleSelection("google");
                }
            },
            // {
            //     name: "Clipboard",
            //     description:
            //         "Opens a window where you can paste in the content of a word document",
            //     icon: ClipBoard,
            //     handler: () => {
            //         this.handleSelection("clipboard");
            //     }
            // }
        ];

        return (
            <Dialog
                id="LoadScreen"
                classes={{ root: classes.root, paper: classes.paper }}
                open={this.props.store.lettersStore.currentModal === 'LoadScreen'}
                onClose={this.handleClose}
                onBackdropClick={this.handleClose}
                disablePortal
            // BackdropComponent={BackdropComponent}
            // fullScreen
            // container={this.props.container}
            // disablePortal
            // maxWidth={false}
            >
                {/* <Grid container className={classes.demo} spacing={0} justify="space-evenly" alignItems="center"   > */}
                {cards.map(card => {
                    return (
                        <Grid key={card.name.toLocaleLowerCase()} item className={classes.grid} onClick={card.enabled ? card.handler : null} >
                            <img src={card.icon} className={classes.icon} alt="cardimg" />
                            <Button variant="contained" color="inherit" disabled={!card.enabled}>
                                {card.name}
                            </Button>
                            <input type="file" onChange={(e) => this.handleFile(e)} multiple></input>
                        </Grid>
                    );
                })}
                {/* </Grid> */}
                <DialogContentText align="center" className={classes.textbox}> {this.state.description} </DialogContentText>
            </Dialog>
        );
    }
}

const BackdropComponent = () =>
    <div style={{ height: 300, width: 300, background: 'red', zIndex: -1 }} />

ModalLoad.propTypes = {
    classes: PropTypes.object.isRequired
};

export default inject('store')(withStyles(styles)(ModalLoad));
