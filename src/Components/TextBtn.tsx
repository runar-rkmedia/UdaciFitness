import * as React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, purple, jssOS } from '../utils'

export function TextBtn(
  { onPress, children, btnStyle, textStyle, type }: {
    onPress: () => void,
    children: any,
    btnStyle?: {}
    textStyle?: {}
    type?: 'submit' | 'reset'
  }) {
  type = type || 'submit'
  return (
    <TouchableOpacity
      {...{ onPress }}
      style={btnStyle ? btnStyle : style[`${type}Btn`]}
    >
      <Text
        style={textStyle ? textStyle : style[`${type}BtnText`]}
      >{children}
      </Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  resetBtnText: {
    color: purple,
    textAlign: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  submitBtn: jssOS({
    ios: {
      backgroundColor: purple,
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40
    },
    android: {
      backgroundColor: purple,
      padding: 10,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 2,
      alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
      height: 45,
    }
  }),
  resetBtn: {}
})
