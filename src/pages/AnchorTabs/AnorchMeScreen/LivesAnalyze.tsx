/**
 * 直播数据分析
 */
import * as React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground
} from 'react-native';
import {PrimaryText} from 'react-native-normalization-text';
import {useNavigation} from '@react-navigation/native';
import withPage from '../../../components/HOCs/withPage';
import images from '../../../assets/images'
import NavBar from '../../../components/NavBar';
import pxToDp from '../../../utils/px2dp'


const LivesAnalyze = () =>  {
    const {goBack} = useNavigation()


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
            <View style={styles.chartsBox}>
                <PrimaryText>echarts图表</PrimaryText>
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
        flex:1,
        position:'relative',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    navWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent'
    },
    chartsBox: {
        width: pxToDp(345),
        height: pxToDp(218.5),
        backgroundColor: '#fff'
    }
});

export default withPage(LivesAnalyze);