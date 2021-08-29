import * as React from 'react';
import { useState } from 'react';
import { Box, TextField, IconButton, CircularProgress } from '@material-ui/core';
import { Lock, LockOpen, SupervisorAccount, Publish } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { store } from '../../../declarations/store/index';
import { Divider } from '../../../../node_modules/@material-ui/core/index';
import { buf2hex } from '../util';
import { store_assets } from '../../../declarations/store_assets/index';


export const Admin = () => {
    const [id, setId] = useState(-1);
    const [pass, setPass] = useState('');
    const [lock, setLock] = useState(false);
    const [name, setName] = useState('');
    const [key, setKey] = useState('');
    const [info, setInfo] = useState([
        ['入驻日期', ''],
        ['商家类型', ''],
        ['其他信息', ''],
    ]);
    const [upload, setUpload] = useState(0);
    const [uploadInfo, setUploadInfo] = useState('');

    const submit = async() => {
        var keyBuffer = new TextEncoder('utf-8').encode(key);
        var adminBuffer = new TextEncoder('utf-8').encode(pass);
        let keyHash = await window.crypto.subtle.digest('SHA-256', keyBuffer);
        let adminHash = await window.crypto.subtle.digest('SHA-256', adminBuffer);
        let keyString = buf2hex(keyHash);
        let adminString = buf2hex(adminHash);

        console.log(keyString);

        let res = await store.put_merchant(name, String(info), keyString, parseInt(id), adminString);
        res = parseInt(res);

        return res;
    }

    const DynamicLock = (props) => {
        const lock = props.value;
        if(lock) {
            return <Lock />
        } 
        return <LockOpen />
    }

    const UploadInfo = (props) => {
        const upload = props.value;
        if(upload === 100) {
            return <Alert security='success'>上传成功, id: {uploadInfo}</Alert>
        } 
        if(upload === -1) {
            return <Alert security='error'>上传失败, err: {uploadInfo}</Alert>
        }
        return <Box></Box>
    }

    return (
        <Box
        display='flex'
        flexDirection='column'
        width='80%'
        alignItems='center'
        alignSelf='center'
        padding='5%'
        bgcolor='white'
        borderRadius={10}
        marginBottom='5%'
        >
            <Box 
            alignSelf='flex-start'
            marginLeft='5%'
            fontSize={30}
            fontWeight={500}
            >
                <SupervisorAccount color='primary' />
                管理员
            </Box>
            <UploadInfo value={upload} />
            <Box
            display='flex'
            flexDirection='row'
            >
                <Box margin='5%'>
                    <TextField variant='outlined' onChange={(ev)=>{
                        setId(ev.target.value);
                    }} 
                    label='管理员Id'
                    disabled={lock}
                    />
                </Box>
                <Box margin='5%'>
                    <TextField variant='outlined' onChange={(ev)=>{
                        setPass(ev.target.value);
                    }}
                    type='password'
                    label='密码'
                    disabled={lock}
                    />
                </Box>
                <Box onClick={()=>{
                    setLock(!lock);
                }}
                display='flex'
                alignItems='center'
                margin="1%"
                >
                    <DynamicLock value={lock} />
                </Box>
            </Box>
            <Box
            display='flex'
            flexDirection='row'
            >
                <Box margin='5%'>
                    <TextField variant='outlined' label='商户名称' onChange={(ev)=>{
                        setName(ev.target.value);
                    }} required/>
                </Box>
                <Box margin='5%'>
                    <TextField variant='outlined' label='商户管理密码' onChange={(ev)=>{
                        setKey(ev.target.value);
                    }} required/>
                </Box>
            </Box>
            <Box
            display='flex'
            flexDirection='column'
            marginTop="5%"
            height="70%"
            >
                {info.map((item, index)=>{
                    return (
                        <Box 
                        display='flex'
                        flexDirection='row'
                        key={index}
                        marginTop="3%"
                        >
                            <Box width='30%'>
                                <TextField value={item[0]} onChange={(ev)=>{
                                    let tmp = Array.from(info); 
                                    tmp[index][0] = ev.target.value;
                                    setInfo(tmp);
                                }} 
                                label='属性'
                                />
                            </Box>
                            <Box marginLeft='auto' marginRight='5%' width='60%'>
                                <TextField value={item[1]} onChange={(ev)=>{
                                    let tmp = Array.from(info); 
                                    tmp[index][1] = ev.target.value;
                                    setInfo(tmp);
                                }} 
                                multiline={true}
                                fullWidth={true}
                                label='信息'
                                />
                            </Box>
                        </Box>
                    )
                })}
            </Box>
            <Box 
            className='upload' 
            marginTop='20%'
            display='flex'
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
            >
                <IconButton onClick={()=>{
                    setUpload(10);
                    submit().then(v=>{
                        if(v == -1) {
                            setUpload(-1);
                        } else {
                            setUpload(100);
                        }
                        setUploadInfo(String(v));
                    }).catch(e=>{
                        setUploadInfo(String(e));
                        setUpload(-1);
                    })
                }}>
                    <Publish color='primary' />
                    <Box>上传</Box>

                </IconButton>
                <Box marginLeft='5%'>
                    <CircularProgress variant='determinate' value={upload} />
                </Box>
            </Box>
        </Box>
    )
}

export default Admin;