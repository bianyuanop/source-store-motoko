import * as React from 'react';
import { useState } from 'react';
import { Box, TextField, Checkbox, Divider, IconButton, Icon, Backdrop } from '@material-ui/core';
import { BorderRight, Lock, LockOpen } from '@material-ui/icons';
import { Storefront, Add, Backup } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { buf2hex } from '../util';
import { store } from '../../../declarations/store/index';
import { CircularProgress } from '../../../../node_modules/@material-ui/core/index';


export const Merchant = () => {
    const [id, setId] = useState('');
    const [key, setKey] = useState('');
    const [lock, setLock] = useState(false);
    const [info, setInfo] = useState([
        ['产地', ''],
        ['推荐零售价', ''],
        ['生产日期', ''],
        ['生产厂家', ''],
    ]);
    const [upload, setUpload] = useState(0);
    const [uploadInfo, setUploadInfo] = useState('');

    const sumbit = async() => {
        const buffer = new TextEncoder('utf-8').encode(key);
        const hash = await window.crypto.subtle.digest('SHA-256', buffer);
        const hashString = buf2hex(hash);

        console.log(JSON.stringify(info));
        let res = await store.put(JSON.stringify(info), parseInt(id), hashString);


        if(res[0] == false) throw "请检查密码"

        return parseInt(res[1]);
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
            return <Alert severity='success'>上传成功, {uploadInfo}</Alert>
        } 
        if(upload === -1) {
            return <Alert severity='error'>上传失败, {uploadInfo}</Alert>
        }
        return <Box></Box>
    }


    return (
        <Box 
        display='flex'
        flexDirection='column'
        width="80%" 
        borderRadius={10}
        boxShadow={5}
        alignSelf='center'
        height='80%'
        bgcolor='white'
        padding='5%'
        marginBottom='5%'
        >
            <Box 
            color='black'
            fontWeight={500}
            fontSize={30}
            height="10%"
            display='flex'
            flexDirection='row'
            alignItems='center'
            >
                <Storefront color='primary' />
                商品管理
                <Box marginLeft='auto'>
                    <CircularProgress variant='determinate' value={upload} />
                </Box>
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
                    label='商户id'
                    disabled={lock}
                    />
                </Box>
                <Box margin='5%'>
                    <TextField variant='outlined' onChange={(ev)=>{
                        setKey(ev.target.value);
                    }}
                    type='password'
                    label='商户密码'
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
            <Divider />
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
                <IconButton onClick={()=>{
                    setInfo(info.concat([['key', 'value']]));
                }}>
                    <Add />
                </IconButton>
            </Box>
            <Box alignSelf='center'>
                <IconButton onClick={()=>{
                    setUpload(10);
                    sumbit().then(v => {
                        setUpload(100);
                        setUploadInfo(String(v));
                    }).catch(e=>{
                        setUpload(-1);
                        setUploadInfo(String(e));
                    })
                }}>
                    <Backup color='primary' />
                    上传
                </IconButton>
            </Box>
            
        </Box>
    )
}

export default Merchant;