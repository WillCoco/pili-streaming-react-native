import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {PrimaryText} from 'react-native-normalization-text';
import {Colors} from '../../constants/Theme';
import {vw} from '../../utils/metric';
import {pad} from '../../constants/Layout'

const FormRow = props => {
  const needInputPress = props.onChangeText || props.value;
  const pointerEvents = props.onPress ? {pointerEvents: 'none'} : null;

  return (
    <View style={styles.wrapper}>
      <ListItem
        {...props}
        containerStyle={StyleSheet.flatten([
          styles.containerStyle,
          props.containerStyle,
        ])}
      />
      {needInputPress ? (
        <TextInput
          {...pointerEvents}
          keyboardType={props.keyboardType}
          placeholder={props.placeholder}
          placeholderTextColor={Colors.darkGrey}
          style={StyleSheet.flatten([styles.input, props.inputStyle])}
          value={props.value}
          onChangeText={props.onChangeText}
          editable={props.editable}
          maxLength={props.maxLength}
          autoFocus={props.autoFocus}
          secureTextEntry={props.secureTextEntry}
        />
      ) : null}
      {props.attachment}
    </View>
  );
};

FormRow.defaultProps = {
  leftIcon: null,
  value: '',
  onChangeText: undefined,
  containerStyle: undefined,
  keyboardType: 'default',
  editable: true,
  secureTextEntry: false,
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  containerStyle: {
    // color: Colors.darkBlack,
    borderColor: Colors.divider,
    height: 50,
  },
  input: {
    color: Colors.darkBlack,
    width: vw(40),
    position: 'absolute',
    marginLeft: '25%',
    marginRight: pad,
    height: '100%',
    zIndex: 99,
  },
});

export default FormRow;
