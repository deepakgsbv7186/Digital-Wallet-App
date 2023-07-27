import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
// import {RNCamera} from 'react-native-camera';
import {COLORS, FONTS, SIZES, icons} from '../constants';
import {useNavigation} from '@react-navigation/native';

export default function Scan() {
  const pointsTo = useNavigation();
  const [scanData, setScanData] = useState('');
  const onSuccess = async e => {
    try {
      console.log(e);
      setScanData(e.data);
    } catch (error) {
      console.log('Camera ka error: ', error);
    }
  };
  const HeaderScan = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0,0,0,0.3)',
            width: SIZES.width * 0.9,
            alignSelf: 'center',
            marginHorizontal: SIZES.padding * 3,
            padding: SIZES.padding,
            borderRadius: SIZES.radius / 2.5,
            position: 'absolute',
            top: 20,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              padding: SIZES.padding * 2.5,
              borderRadius: SIZES.radius / 3,
            }}
            onPress={() => {
              pointsTo.navigate('Home');
            }}>
            <Image
              source={icons.close}
              style={{tintColor: COLORS.white, width: 15, height: 15}}
            />
          </TouchableOpacity>
          <View
            style={{
              // backgroundColor: COLORS.red,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h3,
              }}>
              Scan QR
            </Text>
          </View>
          <TouchableOpacity
            style={{
              // backgroundColor: COLORS.yellow,
              backgroundColor: 'rgba(247, 247, 247, 0.1)',
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              padding: SIZES.padding * 2.5,
              borderRadius: SIZES.radius / 3,
            }}
            onPress={() => {
              pointsTo.navigate('Profile');
            }}>
            <Image
              source={icons.info}
              style={{tintColor: COLORS.white, width: 20, height: 20}}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  const ScanSection = () => {
    return (
      <>
        <View
          style={{
            marginTop: -SIZES.padding * 2,
            height: SIZES.height * 0.6,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 120,
            right: 0,
            left: 0,
          }}>
          <View
            style={{
              width: SIZES.width * 0.65,
              height: SIZES.height * 0.4,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: SIZES.radius / 2.5,
              borderColor: COLORS.green,
              borderWidth: 2,
            }}></View>
        </View>
      </>
    );
  };
  const FooterScan = () => {
    const openWebsite = () => {
      const url = `${scanData}`;
      Linking.openURL(url).catch(err =>
        console.warn('An error occurred while opening the website:', err),
      );
    };

    return (
      <>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopRightRadius: SIZES.radius / 2.5,
            borderTopLeftRadius: SIZES.radius / 2.5,
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            height: SIZES.height * 0.17,
          }}>
          <View
            style={{
              flexDirection: 'column',
              width: SIZES.width * 0.9,
              alignSelf: 'center',
              paddingVertical: SIZES.padding * 2,
              gap: 5,
            }}>
            <Text style={{color: COLORS.black, ...FONTS.h4}}>
              Scanned Information
            </Text>
            <TouchableOpacity
              onPress={openWebsite}
              style={{marginTop: SIZES.padding}}>
              {scanData && (
                <Text
                  style={{
                    color: COLORS.black,
                    ...FONTS.h3,
                    backgroundColor: COLORS.gray,
                    padding: SIZES.padding,
                    borderRadius: SIZES.radius / 2,
                  }}>
                  {scanData}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.transparent}}>
      <QRCodeScanner
        cameraStyle={{height: SIZES.height}}
        reactivateTimeout={2000}
        reactivate={true}
        onRead={e => {
          onSuccess(e);
        }}
      />
      <HeaderScan />
      <ScanSection />
      <FooterScan />
    </View>
  );
}
