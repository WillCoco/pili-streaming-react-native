import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import pxToDp from '../../../utils/px2dp'
import { connect } from 'react-redux'
import { Colors } from '../../../constants/Theme'
import { Ionicons } from '@expo/vector-icons'

function Header(props: { userInfo: any }) {
  const { userInfo } = props
  const [editable, setEditable] = useState(false)
  const [nickName, setNickName] = useState('')

  const editName = () => {
    setEditable(!editable)
  }

  return (
    <ImageBackground source={require('../../../assets/mine-image/setting_bgi.png')} style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: userInfo.userAvatar }} style={styles.avatar} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput editable={editable} defaultValue={userInfo.nickName} style={styles.input} onChangeText={(text) => setNickName(text)} />
          <TouchableOpacity onPress={editName}>
            {
              editable
              ? <Ionicons name='md-checkmark' color={Colors.whiteColor} size={20} />
              : <Image source={require('../../../assets/mine-image/edit.png')} style={styles.editIcon} />
            }
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

export default connect(
  (state: any) => state.userData
)(Header)

const styles = StyleSheet.create({
  container: {
    height: pxToDp(460),
  },
  content: {
    width: pxToDp(200),
    position: 'absolute',
    bottom: pxToDp(50),
    left: '50%',
    marginLeft: pxToDp(-100),
    alignItems: 'center'
  },
  avatar: {
    width: pxToDp(150),
    height: pxToDp(150),
    borderRadius: pxToDp(75),
    marginBottom: pxToDp(15)
  },
  input: {
    width: '100%',
    height: pxToDp(60),
    fontSize: pxToDp(32),
    textAlign: 'center',
    color: Colors.whiteColor,
    padding: 0
  },
  editIcon: {
    width: pxToDp(28),
    height: pxToDp(28)
  }
})