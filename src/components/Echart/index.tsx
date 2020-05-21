import * as React from 'react';
import {
    View
} from 'react-native';
import Echarts from 'native-echarts';


const Echart = () => {
    let arr = [];

    const generateData = () => {
        let data = [];
        for (let i = 1; i < 100; i++) {
            const a = timestampToTime(1589279228000 - i * 1000 * 60 * 60 * 24)
            data.push([a, func()]);
        }
        arr = data;
        console.log(arr, '2123')
        console.log(arr[0][0], '1111')

        return data;
    }

    const generateData2 = () => {
        let data = [];
        for (let i = 1; i < 100; i++) {
            const a = timestampToTime(1589279228000 - i * 1000 * 60 * 60 * 24)
            data.push([a, func()]);
        }
        arr = data;
        console.log(arr, '2123')
        console.log(arr[0][0], '1111')

        return data;
    }


    const timestampToTime = ( timestamp: any ) =>  {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        return Y + M + D;
    }

    const func = () => {
        return Math.random() * 50
    }

    const option = {
        animation: false,
        legend: {
            left: 30,
            top:12,
            data: ['观看人数', '销售量']
        },
        grid: {
            // top: 0,
            // left: 50,
            // right: 40,
            // bottom: 50,
            containLabel: true
        },

        xAxis: {
            type:'time',
            splitLine:{//去除网格线
                show:false
            },
        },
        yAxis: {
            min:0,
            max: 100,
            axisLine: {show:false},
            axisTick: {show:false},
        },

        dataZoom: [{
            show: true,
            type: 'inside',
            start:0,
            end:4
        }],
        series: [
            {
                type: 'line',
                name:'观看人数',
                showSymbol: true,
                clip: true,
                symbolSize:6,
                data: generateData(),
                itemStyle: {
                    normal : {
                        color:'#3E96FE',
                        lineStyle:{
                            color:'#3E96FE'
                        }
                    }
                }
            },
            {
                type: 'line',
                name:'销售量',
                showSymbol: true,
                symbolSize:6,
                clip: true,
                data: generateData2(),
                itemStyle: {
                    normal : {
                        color:'#FFC42B',
                        lineStyle:{
                            color:'#FFC42B'
                        }
                    }
                }
            },
        ]
    };

    return (
            <Echarts height={250} width={345} option={option}/>
    )
}

export default Echart