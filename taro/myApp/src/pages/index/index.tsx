
import React, { useState } from 'react';
import { View, Text } from '@tarojs/components'
import './index.scss'
import Question from '@/components/index/Questionnaire'
import Headers from '@/components/index/Headers';

function Index() {
  return (
      <View className='index'>
        <Headers></Headers>
        <Question></Question>
        <Text></Text>
      </View>
    )
}

export default  Index;
