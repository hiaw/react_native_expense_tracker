import React, { Component } from 'react'
import { Alert, View, Text, ScrollView, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { FormLabel, FormInput } from 'react-native-elements'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

@observer
export default class FilterView extends Component {
  @observable minAmount
  @observable maxAmount

  applyFilter() {
    this.props.applyFilter(this.minAmount, this.maxAmount)
    Actions.pop()
  }

  render () {
    return (
      <View style={styles.container}>
        <FormLabel>Minimum Amount</FormLabel>
        <FormInput value={this.minAmount}
          keyboardType='numeric'
          onChangeText={(t) => { this.minAmount = t }} />

        <FormLabel>Maximum Amount</FormLabel>
        <FormInput value={this.maxAmount}
          keyboardType='numeric'
          onChangeText={(t) => { this.maxAmount = t }} />

        <Button title='Apply' onPress={this.applyFilter.bind(this)} />
      </View>
    )
  }
}

const styles = {
  container: {
    backgroundColor: 'white',
    marginTop: 65
  }
}
