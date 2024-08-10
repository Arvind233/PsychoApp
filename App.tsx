import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, Modal, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from './src/actions/cartActions';


const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(state => state?.cartItems);
  


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [products]);

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleAddToCart = () => {
    const exists = cart?.find(item => item?.id === selectedProduct?.id);
    if (exists) {
      dispatch(incrementQuantity(selectedProduct?.id));
    } else {
      dispatch(addToCart(selectedProduct));
    }
    setModalVisible(false);
  };

  const renderQuantityControls = (item) => {
    const cartItem = cart?.find(cartItem => cartItem?.id === item?.id);
    if (!cartItem) return null;
    return (
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => dispatch(decrementQuantity(item.id))}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{cartItem?.quantity}</Text>
        <TouchableOpacity onPress={() => dispatch(incrementQuantity(item.id))}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: 'red', marginBottom: 20}}>
      <Text style={{color: 'white', fontWeight: 'bold', alignSelf: 'center', fontSize: 35}}>Psycho Shop</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProductPress(item)}>
          <View style={styles.productContainer}>
              <Image
              resizeMode='contain'
              source={{ uri: item?.image }} style={{height:110 , width: 100}} />
             <View style={styles.textContainer}>
                <Text style={styles.productTitle}>{item?.title}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', flex:1 , flexWrap: 'wrap'}}>
                <Text style={styles.productPrice}>${item?.price}</Text>
              
                {renderQuantityControls(item)}
                </View>
                <Text style={styles.productCategory}>Category:{item?.category}</Text>
              
              </View>
          </View>
          </TouchableOpacity>
        )}
      />

      {selectedProduct && (
        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
           <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image
            resizeMode='contain' source={{ uri: selectedProduct.image }} style={styles.productImage} />
            <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
          
            <Text style={styles.productPrice}>Price: {' '}${selectedProduct.price}</Text>
            <Text style={styles.productDescription}>{selectedProduct.description}</Text>
            <View style={{flexDirection: 'row', columnGap: 40}}>
            <Button title="Add to Cart" onPress={handleAddToCart} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
          </View>
         
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },
  productContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
   
    width: '95%',
    padding: 10,
  borderWidth: 1,
  borderRadius: 15,
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  productTitle: {
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  modalTitle:{
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',

  },
  productPrice: {
    fontSize: 22,
    color: 'green',
    marginTop: 12,
  },
  productCategory: {
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 14,
    color: 'brown'

  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
 
  productDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black'
  },
  quantityContainer: {
    width: 93,
    height: 38,
    flexDirection: 'row',
     backgroundColor: '#ddd',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10
  },
  quantityButton: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 5,
     color: 'black'
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
     color: 'black'
  },
});

export default App;
