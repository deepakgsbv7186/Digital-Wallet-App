import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images, theme} from '../constants';
import {useState} from 'react';
import {featuresData, specialPromoData} from '../constants/homeViewData';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const pointsTo = useNavigation();
  const [features, setFeatures] = useState(featuresData);
  const [promos, setPromos] = useState(specialPromoData);
  const RenderHeader = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: SIZES.padding * 2,
            marginVertical: SIZES.padding * 2,
            elevation: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              pointsTo.navigate('Profile');
            }}
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'flex-start',
            }}>
            <Text style={{color: COLORS.black, ...FONTS.h3}}>Hello!</Text>
            <Text style={{color: COLORS.gray, ...FONTS.b4, fontWeight: 400}}>
              Deepak Verma
            </Text>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: COLORS.lightGray,
              borderRadius: SIZES.radius / 2,
              padding: SIZES.padding,
            }}>
            <Image
              source={icons.bell}
              resizeMode="contain"
              style={{width: SIZES.width * 0.06, height: SIZES.height * 0.03}}
            />
          </View>
        </View>
      </>
    );
  };
  const RenderBanner = () => {
    return (
      <>
        <LinearGradient
          colors={[COLORS.lime, COLORS.emerald]}
          style={{
            width: SIZES.width * 0.9,
            height: SIZES.height * 0.15,
            marginHorizontal: SIZES.padding * 2,
            marginTop: SIZES.padding / 4,
            borderRadius: SIZES.radius / 1.5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* Image View */}
          <View
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={icons.phone}
              resizeMode="contain"
              style={{width: 80, height: 80, tintColor: COLORS.white}}
            />
          </View>
          {/* Banner Description */}
          <View
            style={{
              flex: 3,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={{color: COLORS.white, ...FONTS.h2}}>Go Premium</Text>
            <View>
              <Text style={{color: COLORS.white, ...FONTS.body4}}>
                Updrade to premium,
              </Text>
              <Text style={{color: COLORS.white, ...FONTS.body4}}>
                get more profit now!
              </Text>
            </View>
          </View>
        </LinearGradient>
      </>
    );
  };
  const RenderFeatures = () => {
    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          width: SIZES.width * 0.22,
          height: SIZES.width * 0.22,
          justifyContent: 'center',
          alignItems: 'center',
          margin: SIZES.padding / 2,
          backgroundColor: COLORS.white,
        }}
        onPress={() => {
          console.log(item.description);
        }}>
        <View
          style={{
            width: SIZES.width * 0.12,
            height: SIZES.width * 0.12,
            justifyContent: 'center',
            alignItems: 'center',
            // margin: SIZES.padding,
            backgroundColor: `${item.backGroundColor}`,
            padding: SIZES.padding * 1.2,
            borderRadius: SIZES.radius / 1.5,
          }}>
          <Image
            source={item.icon}
            resizeMode="contain"
            style={{
              width: '100%',
              height: '100%',
              tintColor: `${item.color}`,
            }}
          />
        </View>
        <View style={{marginVertical: SIZES.padding}}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 12,
              lineHeight: 15,
              flexWrap: 'wrap',
              textAlign: 'center',
            }}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <>
        <FlatList
          ListHeaderComponent={() => (
            <>
              <RenderBanner />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-start',
                  alignItems: 'center',
                  marginHorizontal: SIZES.padding * 2,
                  marginTop: SIZES.padding * 3,
                  marginBottom: SIZES.padding,
                }}>
                <Text style={{color: COLORS.black, ...FONTS.h3}}>Features</Text>
              </View>
            </>
          )}
          data={features}
          renderItem={renderItem}
          keyExtractor={feature => `${feature.id}`}
          showsVerticalScrollIndicator={false}
          numColumns={4}
          contentContainerStyle={{
            alignItems: 'center',
            marginTop: SIZES.padding,
          }}
          ListFooterComponent={() => (
            <>
              <RenderPromos />
              <View style={{marginTop: SIZES.padding * 2}}></View>
            </>
          )}
        />
      </>
    );
  };
  const RenderPromos = () => {
    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.padding,
          width: SIZES.width / 2.3,
          backgroundColor: COLORS.lightGreen,
          maxHeight: SIZES.height / 3,
          borderRadius: 20,
        }}
        onPress={() => {
          console.log(item.title);
        }}>
        <View
          style={{
            height: 80,
            width: '100%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.primary,
          }}>
          <Image
            source={item.img}
            resizeMode="cover"
            style={{width: '100%', height: '100%', borderRadius: 20}}
          />
        </View>
        <View style={{margin: 10}}>
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.body3,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.body5,
              textAlign: 'justify',
              lineHeight: 18,
            }}>
            {item.description.slice(0, 100)} ...
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: SIZES.padding,
            marginTop: SIZES.padding * 3,
            marginBottom: SIZES.padding,
          }}>
          <Text style={{color: COLORS.black, ...FONTS.h3}}>Special Promos</Text>
          <TouchableOpacity
            onPress={() => {
              console.log('View More');
            }}
            style={{marginRight: SIZES.padding}}>
            <Text style={{...FONTS.b5, color: COLORS.gray}}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={promos}
          renderItem={renderItem}
          keyExtractor={promo => `${promo.id}`}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{
            alignSelf: 'center',
            marginHorizontal: SIZES.padding * 5,
          }}
        />
      </>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <RenderHeader />
      <View style={{flex: 1}}>
        <RenderFeatures />
      </View>
    </SafeAreaView>
  );
}
