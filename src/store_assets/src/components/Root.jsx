import * as React from 'react';
import { Box, TextField, Button, Backdrop, CircularProgress } from '@material-ui/core';
import { useState } from 'react';
import { store } from "../../../declarations/store";
import { buf2hex } from '../util';
import { Alert } from '../../../../node_modules/@material-ui/lab/index';

export const Root = () => {
    const [rootPass, setRootPass] = useState('');
    const [adminPass, setAdminPass] = useState('');
    const [progress, setProgress] = useState(0);
    const [id, setId] = useState(-1);

    const submit = async() => {
        var buffer = new TextEncoder('utf-8').encode(adminPass);
        let adminHash = await window.crypto.subtle.digest('SHA-256', buffer);
        let hashString = buf2hex(adminHash);
        let rootKey = [];
        for(let i=0; i<rootPass.length; i++) {
            rootKey.push(rootPass.charCodeAt(i));
        }
        console.log(rootPass);
        console.log(rootKey);
        let res = await store.put_admin(hashString, rootKey);
        return res;
    }
    
    return (
        <Box
        display='flex'
        flexDirection='column'
        width="80%"
        alignSelf='center'
        padding='5%'
        marginBottom='5%'
        bgcolor='white'
        borderRadius={10}
        >
            <Box marginBottom='5%' display='flex' flexDirection='row'>
                <Box fontSize={30} fontWeight={500}>ROOT</Box>
                <Box marginLeft='auto'>
                    <CircularProgress variant='determinate' value={progress} />
                </Box>
            </Box>
            <Alert severity={id == -1 ? "error" : "success"}>
                id: {id}
            </Alert>
            <TextField
            variant='outlined'
            helperText='管理员密码'
            onChange={(ev)=>{setAdminPass(ev.target.value)}}
            />
            <TextField
            variant='outlined'
            helperText='根密码'
            type='password'
            onChange={(ev)=>{setRootPass(ev.target.value)}}
            />
            <Button variant='contained' color='primary' onClick={()=>{
                setProgress(10);
                submit().then(v => {
                    if(v>=0) setProgress(100);
                    setId(parseInt(v));
                }).catch(e => {
                    console.log(e);
                });
            }}>提交</Button>
        </Box>
    )
}

export default Root;