import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import VOCABULARIO from "../../../content/vocabulary.json"
import { FlatList } from 'react-native'
import { Audio } from 'expo-av'

export default function Vocabulary() {

  const [chapter, setChapter] = useState("Chapitre 1")
  const [data, setData] = useState([])

  const createLink = (text) => {
    let arr = text.split(" ")
    let newText = arr.join("%20")
    let url = "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=" + newText + "&tl=fr"
    return { uri: url }
  }

  const handlePress = async (text) => {
    const soundObject = new Audio.Sound()
    const source = createLink(text)
      
    try {
      await soundObject.loadAsync(source)
      await soundObject.playAsync()
      soundObject.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish === true) {
          soundObject.unloadAsync()
        }
      })
    } catch {

    }
  }

  const getLesson = () => {
    let lesson = VOCABULARIO.filter(i => i.id === chapter)
    setData(lesson[0].data)
  }

  const handleChapter = (chapter) => {
    setChapter(chapter)
  }

  useEffect(() => {
    getLesson()
  }, [chapter])
  
  return (
    <View style={ styles.vocabularyContainer }>
      <FlatList
        style={ styles.lectionsListContainer }
        data={ VOCABULARIO }
        renderItem={ ({ item }) => {
          return (
              <TouchableOpacity onPress={ () => handleChapter(item.id) } style={ styles.lectionsList }>
                <Text style={ styles.chapterListText }>{ item.id }</Text>
              </TouchableOpacity>
          )
        }}
        horizontal={ true }
      />
      <FlatList style={ styles.FlatList } data={ data || null } renderItem={ ({ item }) => {
        return (
          <TouchableOpacity onPress={ () => handlePress(item.word) } style={ styles.vocabularyCart }>
            <Image style={ styles.image } source={{ uri: item.uri }}/>
            <Text style={{ fontSize: 20, fontWeight: 600 }}>{ item.word }</Text>
          </TouchableOpacity>
        )
      }}/>
    </View>
  )
}

const styles = StyleSheet.create({
  vocabularyContainer: {
    width: "100%",
    height: "90%",
    display: "flex",
    alignItems: "center",
    paddingTop: "30%"
  },
  vocabularyCart: {
    backgroundColor: "white",
    width: 300,
    height: 300,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#dfdced",
    borderWidth: 1,
    marginBottom: "5%"
  },
  image: {
    width: "60%",
    height: "60%",
    marginBottom: "5%"
  },
  FlatList: {
    width: "80%",
    height: "100%",
    paddingTop: "5%"
  },
  lectionsList: {
    backgroundColor: "#9B85D5",
    padding: "2%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 15,
  },
  lectionsListContainer: {
    width: "80%",
  },
  chapterListText: {
    fontWeight: 600,
  }
})