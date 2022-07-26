import { Button } from "@rneui/themed";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import Dish from "./components/Dish";

export default function App() {
  const [dish, setDish] = useState("");
  const [price, setPrice] = useState("");
  const [nPeople, setNPeople] = useState("");
  const [dishItems, setDishItems] = useState([]);
  const [total, setTotal] = useState(0);

  const clearAll = () => {
    setDish("");
    setPrice(null);
    setNPeople(null);
    setDishItems([]);
    setTotal(0);
  };

  const handleAddDish = () => {
    Keyboard.dismiss();
    const averagePrice = parseInt(price) / parseInt(nPeople)

    if (isNaN(averagePrice) || (!isFinite(averagePrice))) {
      alert('Please enter appropriate information!')
      return;
    }

    const detailedDish = {
      name: dish,
      averagePrice: averagePrice,
    };

    setTotal(total + averagePrice);
    setDishItems([...dishItems, detailedDish]);
    setDish("");
    setPrice("");
    setNPeople("");
  };

  const deleteDish = (index) => {
    let itemsCopy = [...dishItems];
    let deletedItemPrice = itemsCopy[index].averagePrice;
    itemsCopy.splice(index, 1);
    setTotal(total - deletedItemPrice);
    setDishItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.dishsWrapper}>
          <Text style={styles.sectionTitle}>Today's dishes</Text>
          <View style={styles.items}>
            {/* This is where the dishs will go! */}
            {dishItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => deleteDish(index)}>
                  <Dish dish={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <Button onPress={clearAll} title="Clear All" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeDishWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Add a dish"}
          value={dish}
          onChangeText={(text) => setDish(text)}
        />
        <TextInput
          style={styles.input}
          placeholder={"Price"}
          value={price}
          keyboardType="numeric"
          onChangeText={(text) => setPrice(text)}
        />
        <TextInput
          style={styles.input}
          placeholder={"No. of People shared"}
          keyboardType="numeric"
          value={nPeople}
          onChangeText={(text) => setNPeople(text)}
        />
      </KeyboardAvoidingView>
      <View
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.showResult}
      >
        <TouchableOpacity
          onPress={() => handleAddDish()}
          style={styles.addWrapper}
        >
          <Text>+</Text>
        </TouchableOpacity>
        <View style={styles.total}>
          <Text>Total: {total}£</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  dishsWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeDishWrapper: {
    position: "absolute",
    bottom: 90,
    width: "100%",
    flexDirection: "col",
    justifyContent: "space-around",
    alignItems: "center",
  },
  showResult: {
    position: "absolute",
    bottom: 45,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 350,
  },
  total: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginLeft: 10,
    width: 280,
  },
  addWrapper: {
    width: 60,
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    flexDirection: "row",
  },
});
