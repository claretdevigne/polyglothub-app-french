import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { SET_LECTION_ID, SET_MAIN, SET_TITLE } from '../../reducers/slice'

export default function Lection(props) {

  const dispatch = useDispatch()
  const content = useSelector(state => state.content)

  const openLections = () => {
    dispatch(SET_MAIN("lections"))
    dispatch(SET_LECTION_ID(props.id))
    dispatch(SET_TITLE(props.title))
  }

  return (
    <TouchableOpacity onPress={ () => openLections() } style={ props.isEven ? styles.lectionContainerEven : styles.lectionContainerOdd }>
        <Text>
          {
            props.title
          }
        </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  lectionContainerEven: {
    backgroundColor: "#9B85D5",
    padding: "10%",
    marginHorizontal: "2%",
    borderRadius: 10,
    marginTop: "5%",
    alignItems: "center",
  },
  lectionContainerOdd: {
    backgroundColor: "#F6B9C4",
    padding: "10%",
    marginHorizontal: "2%",
    borderRadius: 10,
    marginTop: "5%",
    alignItems: "center",
  },
})