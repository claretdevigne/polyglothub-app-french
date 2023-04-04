import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { Audio } from "expo-av"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import DATABASE from '../../../content/content.json'

export default function Lections() {

  const title = useSelector(state => state.title)
  const ID = useSelector(state => state.lectionID)
  const [french, setFrench] = useState(null)
  const [translation, setTranslation] = useState(null)
  const [showTranslation, setShowTranslation] = useState(null)

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

  const handleTranslation = key => {
    if (key === showTranslation) {
      setShowTranslation(null)
    } else {
      setShowTranslation(key)
    }
  }

  useEffect(() => {
    if (title) {
      setFrench(DATABASE[0].data[ID].french)
      setTranslation(DATABASE[0].data[ID].spanish)
    }
  }, [title])

  return (
    <View style={styles.container}>
      {
        (french === null) ?
        <Text>Loading</Text> :
        <>
          <Text style={styles.title}>{ title }</Text>
            <FlatList
              data={ french }
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                      onPress={() => handleTranslation(index)}
                      style={styles.touchable}>
                      <View style={styles.row}>
                        {
                          (showTranslation === index) ? 
                            <Text style={{ width: '70%' }}>{ translation[index] }</Text> :
                            <Text style={{ width: '70%' }}>{ item }</Text>
                        }
                        <TouchableOpacity
                          onPress={() => handlePress(item)}
                          style={styles.button}>
                          <Icon name="play-arrow" size={30} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                )
              }}
            />
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: '10%',
    height: '90%'
  },
  scrollview: {
    width: "100%",
    height: "100%"
  },
  title: {
    marginBottom: 25,
    fontWeight: '600',
  },
  touchable: {
    marginHorizontal: "4%",
    paddingHorizontal: 25,
    paddingVertical: '10%',
    backgroundColor: '#e8f4fc',
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#9970e5',
    borderRadius: 100,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '2%',
  },
});
