import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Dish = (props) => {
  dish = props.dish;
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        {/* <View style={styles.square}></View> */}
        {/* <View style={styles.circular}></View> */}
        <Text style={styles.itemText}>
          {dish.name}
        </Text>
      </View>
      <View>
        <Text style={styles.price}>{dish.averagePrice}£</Text>
      </View>
      <View style={styles.right}>
        <Icon name="remove" size={24} color='red'/>
      </View>
    </View>
  );
};

export default Dish;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    marginLeft: 10,
  },
  price:{
    alignContent: 'flex-end',
  },
  right: {
    alignItems: 'right',
    justifyContent:'center',
    flexDirection: 'row',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});
