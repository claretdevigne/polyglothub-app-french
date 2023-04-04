import React from 'react'
import { View, StyleSheet, Text } from "react-native"
import Main from './main/Main'
import Header from './header/Header'
import { useSelector } from 'react-redux'
import Lections from './main/lections/Lections'
import Vocabulary from './main/vocabulary/Vocabulary'

export default function Core() {

  const window = useSelector(state => state.main)

  return (
    <View style={ styles.coreContainer }>
      {
        (window === "home") ?
        <Main style={ styles.mainContainer }/> :
          (window === "lections") ?
            <Lections /> :
              <Vocabulary/>
      }
      <Header style={ styles.headerContainer }/>
    </View>
  )
}

const styles = StyleSheet.create({
  coreContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
})
