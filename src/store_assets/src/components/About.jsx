import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Card, IconButton } from '@material-ui/core';
import { CodeOutlined, TouchApp, Mail } from '@material-ui/icons';
import { store } from '../../../declarations/store/index';

export const About = () => {
    const [merchantCount, setMerchantCount] = useState('');
    const [commodyCount, setCommodyCount] = useState('');
    const [queryCount, setQueryCount] = useState('');

    const mail = 'chen.me.nan@foxmail.com';

    useEffect(async() => {
        store.merchant_count().then(v=>{
            setMerchantCount(parseInt(v));
        });
        store.commody_count().then(v=>{
            setCommodyCount(parseInt(v));
        });
        try{
            fetch('http://localhost:9000/count',{
                mode: 'cors',
                method: 'GET' 
            }).then(v=>{
                console.log(v);
                v.json().then(v=>{
                    setQueryCount(v['count']);
                }).catch(e=>{
                    setQueryCount('查询错误.')
                });
            }).catch(e=>{
                setQueryCount('查询错误.')
            });
        } catch(e) {
            setQueryCount('请求失败');
        }
    }, [])

    const Analysis = (props) => {
        const title = props.title;
        const count = props.count;

        return (
            <Box 
            display='flex'
            flexDirection='column'
            marginTop='5%'
            >
               <Box color='#3f51b5' fontSize={20}>{title}</Box> 
               <Box color='#f5cd66' fontSize={30} fontWeight={600} marginTop='1%'>{count}</Box> 
            </Box>
        )
    }

    return (
        <Box 
        height='100%'
        width='100%'
        padding='5%'

        display='flex'
        flexDirection='column'
        color='white'
        style={{
            background: 'linear-gradient(67deg, rgba(13,25,44,1) 0%, rgba(57,34,62,1) 100%)'
        }}
        >
            <Box fontSize={50} fontWeight={500} color='white'>
                合约信息
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
            >
            联系我们
            <Mail />
            </Box>
            <Analysis title="入驻商户" count={merchantCount} />
            <Analysis title="上链商品" count={commodyCount} />
            <Analysis title="查询次数" count={queryCount} />
            <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            marginTop='20%'
            >
                <Box>云南卡匿奇科技有限公司</Box>
                <IconButton onClick={()=>{
                    window.location = 'https://www.qianiqi.com';
                }}>
                    <TouchApp style={{
                        color: 'white'
                    }} />
                </IconButton>
            </Box>
        </Box>
    )
}

export default About;