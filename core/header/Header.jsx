import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { SET_MAIN } from '../../reducers/slice';

export default function Header() {

  const dispatch = useDispatch()
  const window = useSelector(state => state.main)

  const handleWindow = (window) => {
    dispatch(SET_MAIN(window))
  }

  return (
    <View style={ styles.headerContainer }>
      <TouchableOpacity onPress={ () => handleWindow("home") }>
        <Icon name="home" size={30} color={ (window === "home") ? "#9B85D5" : "gray" } />
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => handleWindow("vocabulary") }>
        <Icon name="chat" size={30} color={ (window === "vocabulary") ? "#9B85D5" : "gray" } />
      </TouchableOpacity>
      <TouchableOpacity style={ styles.avatar }>
        
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: "10%",
    borderTopColor: "#ededed",
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  avatar: {
    width: 30,
    height: 30,
    backgroundColor: "gray",
    borderRadius: 20
  }
})