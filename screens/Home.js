import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images, theme} from '../constants';
import {useState} from 'react';
import {featuresData, specialPromoData} from '../constants/homeViewData';

export default function Home() {
  const [features, setFeatures] = useState(featuresData);
  const [promos, setPromos] = useState(specialPromoData);
  // console.log(promos);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* {renderPromos} */}
      {/* <Text>Hello</Text> */}
      <FlatList
        data={promos}
        renderItem={promo => (
          <TouchableOpacity
            style={{marginVertical: SIZES.base, width: SIZES.width / 2.5}}
            onPress={() => {
              console.log(promo.item.title);
            }}>
            <View
              style={{
                height: 80,
                borderRadius: 20,
                backgroundColor: COLORS.primary,
                marginHorizontal: SIZES.padding,
              }}>
              <Image
                source={images.promo_banner}
                resizeMode="contain"
                style={{width: '100%', height: '100%', borderRadius: 20}}
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={promo => `${promo.id}`}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{paddingHorizontal: SIZES.padding * 3}}
      />
    </SafeAreaView>
  );
}
