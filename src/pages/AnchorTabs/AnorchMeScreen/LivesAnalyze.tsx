/**
 * 直播数据分析
 */
/**
 * @Author: lyh
 * @Date: 2020/5/13
 * @Last Modified by: lyh
 * @Last Modified time: 2020/5/13
 **/
import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    ScrollView,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text';
import {useNavigation} from '@react-navigation/native';
import withPage from '../../../components/HOCs/withPage';
import { pad } from '../../../constants/Layout';
import images from '../../../assets/images'
import NavBar from '../../../components/NavBar';
import { connect } from 'react-redux';
import { apiGetLiveDataList } from '../../../service/api';

const LiveInfoCard = (props: {}) => {
    return (
        <View style={styles.card}>
            <View style={styles.infoTitle}>
                <Image source={images.anchorMicrophone} style={styles.microphoneImg}></Image>
                <PrimaryText style={styles.title}>1月10日直播</PrimaryText>
            </View>
            <View style={styles.box}>
                <View style={styles.tableItem}>
                    <View>
                        <PrimaryText style={styles.contentTitle}>1h 34min</PrimaryText>
                        <PrimaryText style={styles.headTitle}>直播时长</PrimaryText>
                    </View>
                    <View>
                        <PrimaryText style={styles.contentTitle}>99099</PrimaryText>
                        <PrimaryText style={styles.headTitle}>今日点赞数</PrimaryText>
                    </View>
                    <View>
                        <PrimaryText style={styles.contentTitle}>40000</PrimaryText>
                        <PrimaryText style={styles.headTitle}>观众总数</PrimaryText>
                    </View>
                </View>
                <View style={styles.tableItem}>
                    <View>
                        <PrimaryText style={styles.contentTitle}>30000</PrimaryText>
                        <PrimaryText style={styles.headTitle}>新增粉丝</PrimaryText>
                    </View>
                    <View>
                        <PrimaryText style={styles.contentTitle}>900</PrimaryText>
                        <PrimaryText style={styles.headTitle}>下单数量</PrimaryText>
                    </View>
                    <View>
                        <PrimaryText style={styles.contentTitle}>10000</PrimaryText>
                        <PrimaryText style={styles.headTitle}>成交金额</PrimaryText>
                    </View>
                </View>
            </View>
        </View>
    )
};

const LivesAnalyze = (props) =>  {
    const {anchorInfo = {}} = props;
    console.log(anchorInfo, 'anchorInfo')
    const {goBack} = useNavigation();

    const [liveInfoList, setLiveInfoList] = useState([{},{},{},{}]);

    useEffect(() => {
        const {anchorId} = anchorInfo;
        apiGetLiveDataList({
            liveDataReq: {
                anchorId
            }
        }).then(res => {
           console.log(res, 'sync get DataList')
        });
    }, []);

    return (
        <ImageBackground
            style={styles.container}
            source={require('../../../assets/images/anchorLiveBg.png')}
        >
            <NavBar
                leftTheme="light"
                title=""
                style={styles.navWrapper}
                onLeftPress={goBack}
            />
            <View style={styles.style}>
                <ScrollView>
                    <View style={[styles.style, {alignItems:'center'}]}>
                        <View >
                            <View style={styles.cardSty}>
                                {/*<PrimaryText>图表</PrimaryText>*/}
                            </View>
                        </View>
                        {
                            liveInfoList && liveInfoList.map((item,index) => {
                                return (
                                    <LiveInfoCard
                                        key={`_${index}`}/>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>

        </ImageBackground>
    )
};

LivesAnalyze.defaultProps = {
};

const styles = StyleSheet.create({
    style: {
        flex: 1,
    },
    container: {
        width: '100%',
        height: '100%',
    },
    navWrapper: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent'
    },
    cardSty: {
        width: 345,
        height: 219,
        borderRadius: 12,
        backgroundColor: '#fff'
    },
    card: {
        width: 345,
        height: 169,
        borderRadius: 12,
        backgroundColor: '#fff',
        marginTop: pad,
        marginBottom: pad,
    },
    box: {
        flex:1,
        justifyContent: 'space-around'
    },
    infoTitle: {
        flexDirection: 'row',
        marginTop: 22,
        marginBottom: 22,
    },
    microphoneImg: {
        width: 13,
        height: 16,
        marginLeft: 15,
        marginRight: 8,
    },
    title: {
        fontSize: 15,
        color: '#FF321B',
        fontWeight: 'bold'
    },
    tableItem: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    contentTitle: {
        fontSize: 12,
        color: '#222222',
        alignSelf: 'center',
        marginBottom: 2,
    },
    headTitle: {
        fontSize: 12,
        color: '#999999',
        alignSelf: 'center'
    }
});

export default connect(
    (state: any) => state.anchorData
)(withPage(LivesAnalyze));