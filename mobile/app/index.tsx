import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

export default function Article() {
  return (
    <Redirect href={"/tabs"} />
  )
}