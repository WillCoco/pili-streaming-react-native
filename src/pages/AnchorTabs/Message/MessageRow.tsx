import React, {useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import { ListItem } from 'react-native-elements'
import Avatar from '../../../components/Avatar'
import { Colors } from '../../../constants/Theme'
import { useNavigation } from '@react-navigation/native'
import { pad } from '../../../constants/Layout'
import { SmallText, PrimaryText, T4 } from 'react-native-normalization-text'
import { vw } from '../../../utils/metric'
import images from '../../../assets/images'

interface MessageProps {
  avatarSource?: any
  title?: String
  content?: String
  time?: any
}

export default function MessageRow(props: MessageProps) {
  const {navigate} = useNavigation()
  useEffect(() => {
    return () => {
      
    }
  }, [])

  return (
    <View style={styles.style}>
      <Avatar source={props.avatarSource || images.defaultMessageAvatar} style={styles.avatar} />
      <View style={{flex: 1}}>
        <View style={styles.contentWrapper}>
          <T4>{props.title}</T4>
          <SmallText style={{color: Colors.lightBlack}}>{props.time}</SmallText>
        </View>
        <PrimaryText style={{paddingVertical: pad}}>{props.content}</PrimaryText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  style: {
    width: vw(100),
    flexDirection: 'row',
    padding: pad,
    backgroundColor: Colors.whiteColor,
  },
  avatar: {
    paddingRight: pad,
    paddingTop: pad,
    justifyContent: "flex-start",
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})