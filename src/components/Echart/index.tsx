import * as React from 'react';
import {
    View
} from 'react-native';
import Echarts from 'native-echarts';



const Echart = (props: {
    data: Array<any>
}) => {
    console.log(props.data, 'k线数据');
    /*
    *  数据处理
    * */
    const formatData = (date) => {
        let watchK = [];
        let orderK = [];
        date && date.forEach(item => {
            watchK.push([item.createTime, item.watchSum]);
            orderK.push([item.createTime, item.orderSum]);
        })
        console.log(watchK,orderK, 'asdfsadsa')
        return {watchK,orderK}
    };

    const kDate = formatData(props.data);

    /*
    * 计算k线首屏展示百分比
    * */
    const renderPrecent = () => {
        const length = props.data.length || 0;
        if(length > 25) {
            return 30
        }else if(length > 15) {
            return 50
        }else if(length > 7) {
            return 80
        }else {
            return 100
        }
    };

    const option = {
        animation: false,
        legend: {
            left: 30,
            top:12,
            data: ['观看人数', '销售量']
        },
        grid: {
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{a} <br/>{c} '
        },
        xAxis: {
            type:'time',
            splitLine:{//去除网格线
                show:false
            },
        },
        yAxis: {
            type:'value',
            min:0,
            // max: 100,
            axisLine: {show:false},
            axisTick: {show:false},
        },

        dataZoom: [{
            show: true,
            type: 'inside',
            start:0,
            end: renderPrecent()
        }],

        series: [
            {
                type: 'line',
                name:'观看人数',
                showSymbol: true,
                clip: true,
                symbolSize:6,
                data: kDate.watchK,
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
                data: kDate.orderK,
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