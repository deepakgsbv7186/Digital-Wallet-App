import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images, theme} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

export default function SignUp() {
  const pointsTo = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const [areas, setAreas] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const URL = 'https://restcountries.com/v3.1/all';
    const getCountryData = async () => {
      try {
        const response = await axios.get(URL);

        let countryData = response.data.map(country => {
          return {
            countryCode: country?.cca2,
            countryName: country?.name?.common,
            callingCode: `${country?.idd?.root}${country?.idd?.suffixes}`,
            countryFlag: country?.flags?.png,
          };
        });
        setAreas(countryData);
        // let sortedCountry = countryData
        //   .map(country => country.countryName)
        //   .sort();
        // console.log(sortedCountry);
        // if (countryData.length > 0) {
        //   let defaultData = countryData.filter(a => a.countryCode == 'IN');
        //   // console.log(defaultData);
        //   if (defaultData.length > 0) {
        //     setSelectedCountry(defaultData[0]);
        //     console.log(
        //       selectedCountry.callingCode,
        //       selectedCountry.countryFlag,
        //     );
        //   }
        // }
      } catch (error) {
        console.log('No country data:', error);
      }
    };
    getCountryData();
  }, []);
  // Header
  function renderHeader() {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            console.log('Go Back');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SIZES.padding * 3,
            paddingHorizontal: SIZES.padding * 2,
          }}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{width: 20, height: 20, tintColor: COLORS.white}}
          />
          <Text
            style={{
              marginLeft: SIZES.padding * 3,
              color: COLORS.white,
              ...FONTS.h4,
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </>
    );
  }
  // Logo Display
  function renderLogo() {
    return (
      <>
        <View
          style={{
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: SIZES.padding * 5,
          }}>
          <Image
            source={images.wallie_logo}
            resizeMode="contain"
            style={{width: SIZES.width * 0.6}}
          />
        </View>
      </>
    );
  }
  // Sign Up Form
  function renderForm() {
    return (
      <>
        <View
          style={{
            marginTop: SIZES.padding * 3,
            marginHorizontal: SIZES.padding * 3,
          }}>
          <View style={{marginTop: SIZES.padding * 3}}>
            <Text style={{color: COLORS.lightGreen, ...FONTS.body4}}>
              Full Name
            </Text>
            <TextInput
              style={{
                marginVertical: SIZES.padding,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.white,
                ...FONTS.body3,
              }}
              placeholder="Enter Full Name"
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
            />
          </View>
          <View style={{marginTop: SIZES.padding * 2}}>
            <Text style={{color: COLORS.lightGreen, ...FONTS.body4}}>
              Phone Number
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{
                  width: 100,
                  height: 50,
                  marginHorizontal: 5,
                  borderBottomColor: COLORS.white,
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 4,
                  ...FONTS.body2,
                }}>
                <View style={{justifyContent: 'center'}}>
                  <Image
                    source={icons.down}
                    style={{width: 10, height: 10, tintColor: COLORS.white}}
                  />
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Image
                    source={{
                      uri: selectedCountry
                        ? selectedCountry.countryFlag
                        : 'https://flagcdn.com/w320/in.png',
                    }}
                    // source={{uri: 'https://flagcdn.com/w320/jo.png'}}
                    resizeMode="contain"
                    style={{width: 30, height: 30}}
                  />
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Text style={{color: COLORS.white, ...FONTS.body3}}>
                    {selectedCountry ? selectedCountry.callingCode : '+91'}
                  </Text>
                </View>
              </TouchableOpacity>
              <TextInput
                style={{
                  flex: 1,
                  marginVertical: SIZES.padding,
                  borderBottomColor: COLORS.white,
                  borderBottomWidth: 1,
                  height: 40,
                  color: COLORS.white,
                  ...FONTS.body3,
                }}
                placeholder="Enter Phone Number"
                placeholderTextColor={COLORS.white}
                selectionColor={COLORS.white}
              />
            </View>
          </View>
          <View style={{marginTop: SIZES.padding * 2}}>
            <Text style={{color: COLORS.lightGreen, ...FONTS.body4}}>
              Password
            </Text>
            <TextInput
              style={{
                marginVertical: SIZES.padding,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.white,
                ...FONTS.body3,
              }}
              placeholder="Enter Password"
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
              secureTextEntry={showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{
                width: 10,
                height: 10,
                position: 'absolute',
                top: 40,
                right: 20,
              }}>
              <Image
                source={showPassword ? icons.disable_eye : icons.eye}
                resizeMode="contain"
                style={{width: 18, height: 20, tintColor: COLORS.white}}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: SIZES.padding * 3}}>
            <TouchableOpacity
              onPress={() => pointsTo.navigate('HomeTabs')}
              style={{
                backgroundColor: COLORS.black,
                padding: SIZES.padding,
                borderRadius: SIZES.radius / 1.5,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  alignSelf: 'center',
                  ...FONTS.body2,
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  // Modal Country Selection
  function renderCountryOptions() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{padding: SIZES.padding, flexDirection: 'row'}}
          onPress={() => {
            setSelectedCountry(item);
            setModalVisible(false);
          }}>
          <Image
            source={{uri: item.countryFlag}}
            style={{
              width: 30,
              height: 30,
              marginRight: 10,
            }}
          />
          <Text style={{...FONTS.body4}}>{item.countryName}</Text>
        </TouchableOpacity>
      );
    };
    return (
      <>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.6)',
              }}>
              <View
                style={{
                  height: 400,
                  width: SIZES.width * 0.8,
                  backgroundColor: COLORS.lightGreen,
                  borderRadius: SIZES.radius,
                }}>
                <FlatList
                  data={areas}
                  renderItem={renderItem}
                  keyExtractor={item => item.countryCode}
                  showsVerticalScrollIndicator={false}
                  style={{
                    padding: SIZES.padding * 2,
                    marginBottom: SIZES.padding * 2,
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <LinearGradient style={{flex: 1}} colors={[COLORS.lime, COLORS.emerald]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
        </ScrollView>
      </LinearGradient>
      {renderCountryOptions()}
    </KeyboardAvoidingView>
  );
}
