import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Lection from './Lection'
import { useDispatch, useSelector } from 'react-redux'
import { SET_FRENCH, SET_TITLE, SET_TITLES, SET_TRANSLATION } from '../../reducers/slice'
import DATABASE from '../../content/content.json'

export default function Main() {
  
  const titles = useSelector(state => state.titles)
  const lectionID = useSelector(state => state.lectionID)
  const dispatch = useDispatch()

  useEffect(() => {
    if (titles === null) {
      dispatch(SET_TITLES(DATABASE[0].titles))
    } 
    if (lectionID !== null) {
      dispatch(SET_FRENCH(DATABASE[0].data[lectionID].french))
      dispatch(SET_TRANSLATION(DATABASE[0].data[lectionID].spanish))
      dispatch(SET_TITLE(DATABASE[0].data[lectionID].title))
    } 
  }, [lectionID])

  return (
    <View style={ styles.mainContainer }>
      <ScrollView style={{ width: "95%" }}>
        {
          (titles === null) ?
          <Text>LOADING...</Text> :
          titles.map((item, key) => (
            <Lection key={ key } isEven={ (key % 2 === 0 ? true : false) } id = { key } title={ item } />
          ))
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "90%",
    display: "flex",
    alignItems: "center",
    paddingTop: "10%"
  }
})
