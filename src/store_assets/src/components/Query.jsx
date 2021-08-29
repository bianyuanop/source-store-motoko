import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, IconButton } from '@material-ui/core';
import { CheckCircle, Warning, TouchApp, Mail } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import { store } from '../../../declarations/store/index';

export const Query = () => {
    let { id } = useParams();
    if( id === undefined) id = 0;

    id = parseInt(id);

    const [data, setData] = useState({});
    const [err, setErr] = useState(false);
    const mail = 'chen.me.nan@foxmail.com';

    const get_data = async(id) => {
        let data = await store.get_commody(id);
        console.log(data);
        if(data == "") {
            setErr(true);
            return {}
        } else {
            return JSON.parse(data);
        }
    }

    const Verify = () => {
        if(!err) {
            return (
                <Box 
                className='verified' 
                borderRadius={25}
                width='82%'
                height='40%' 
                fontSize={200}
                display='flex'
                flexDirection='column'
                alignItems='center'
                bgcolor='#131823'
                margin="3%"
                padding='5%'
                boxShadow={5}
                >
                    <CheckCircle fontSize='inherit' />
                    <Box
                    display='flex'
                    flexDirection='row'
                    >
                        <Box fontSize={30}>已验证</Box>
                    </Box>
                </Box>
            )
        } else {
            return (
                <Box 
                className='verified' 
                width="94%"
                height='40%' 
                fontSize={200}
                borderRadius={25}
                display='flex'
                flexDirection='column'
                alignItems='center'
                bgcolor='#131823'
                margin='3%'
                boxShadow={5}
                >
                    <Warning fontSize='inherit' />
                    <Box
                    display='flex'
                    flexDirection='row'
                    >
                        <Box fontSize={30}>查无此件</Box>
                    </Box>
                </Box>
                )
        }
    }

    useEffect(() => {
        get_data(id).then(v => {
            setData(v);
            console.log(v);
        }).catch(e => {
            setData(e);
            setErr(true);
            console.log(e);
        });
    }, []);


    return (
        <Box 
        position='absolute'
        display='flex'
        flexDirection='column'
        width="100%"
        alignSelf='center'
        alignItems='center'
        color='white'
        minHeight='100%'
        style={{
            background: 'linear-gradient(67deg, rgba(13,25,44,1) 0%, rgba(57,34,62,1) 100%)'
        }}
        >
            <Verify />
            <Box 
            width="82%"
            height="60%"
            borderRadius={25}
            margin='3%'
            bgcolor='gray'
            padding='5%'
            bgcolor='#131823'
            boxShadow={5}
            >
                {Object.entries(data).map(item => {
                    return (
                        <Box 
                        display='flex'
                        flexDirection='row'
                        key={item}
                        >
                            <Box 
                            className='attr'
                            fontSize={30}
                            fontWeight={500}
                            color='#2b8ad6'
                            >{item[1][0]}</Box>
                            <Box 
                            fontSize={20}
                            className='info' 
                            marginLeft='auto'
                            >{item[1][1]}</Box>
                        </Box>
                    )
                })}
            </Box>
            <Box 
            className='footer'
            display='flex'
            flexDirection='column'
            height='20%'
            >
                <Box 
                display='flex'
                flexDirection='row'
                fontSize={50}
                alignItems='center'
                >
                    <Box color='red'>Q</Box>
                    <Box color='blue' marginLeft='-10%' marginTop='7%'>N</Box>
                    <Box color='green' marginLeft='-10%' marginTop='15%'>Q</Box>
                    <Box color='gray' fontSize={20} marginLeft='5%' marginTop='7.5%'>Co,.Ltd</Box>
                </Box>
                <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                color='white'
                >
                    <Box>云南卡匿奇科技有限公司</Box>
                    <IconButton onClick={()=>{
                        window.location = 'https://www.qianiqi.com';
                    }}>
                        <TouchApp  style={{
                            color: 'white'
                        }} />
                    </IconButton>
                </Box>
                <Box 
                className='header' 
                fontSize={15}
                display='flex'
                flexDirection='row'
                alignItems='center'
                onClick={()=>{
                    window.open(`mailto:${mail}`);
                }}
                marginBottom='10%'
                >
                    联系我们
                    <Mail />
                </Box>
            </Box>
        </Box>
    )

}

export default Query;