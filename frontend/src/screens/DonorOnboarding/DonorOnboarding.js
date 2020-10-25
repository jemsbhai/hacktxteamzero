import React, { useEffect, useState } from 'react'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { View,Text } from 'react-native';
import Botnav from '../Botnav';

export default function DonorOnboarding(props) {

  // testing purpose only , needs to be moved to rec side
    return(
      <View style={styles.container}>
        <Botnav/>
      </View>
    )
}