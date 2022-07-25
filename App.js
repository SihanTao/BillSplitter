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

  const handleAddDish = () => {
    Keyboard.dismiss();
    detailedDish = {
      name: dish,
      averagePrice: parseInt(price) / parseInt(nPeople),
    };
    setDishItems([...dishItems, detailedDish]);
    setDish("");
    setPrice("");
    setNPeople("");
  };

  const completeDish = (index) => {
    let itemsCopy = [...dishItems];
    itemsCopy.splice(index, 1);
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
          <Text style={styles.sectionTitle}>Today's dishs</Text>
          <View style={styles.items}>
            {/* This is where the dishs will go! */}
            {dishItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeDish(index)}
                >
                  <Dish dish={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

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
        <TouchableOpacity
          onPress={() => handleAddDish()}
          style={{
            flex: 0.6,
            alignItems: "flex-end",
            marginRight: 20,
            position: "relative",
          }}
        >
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    bottom: 30,
    width: "100%",
    flexDirection: "col",
    justifyContent: "space-around",
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
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    flexDirection: "row",
  },
});
