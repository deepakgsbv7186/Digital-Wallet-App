import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images, theme} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';

export default function SignUp() {
  const pointsTo = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <LinearGradient style={{flex: 1}} colors={[COLORS.lime, COLORS.white]}>
        {/* Background Image */}
        <ImageBackground
          source={images.profileImg}
          resizeMode="cover"
          style={{flex: 1}}>
          <View showsVerticalScrollIndicator={false} style={{flex: 1}}>
            {/* Header*/}
            <Header
              backTo={'Home'}
              // headerName={'Profile'}
              icon={icons.more}
              moveTo={'Scan'}
              style={{flex: 10}}
            />
            {/* Blank View */}
            <View
              style={{flex: 55, backgroundColor: COLORS.transparent}}></View>
            {/* Main profile view */}
            <View
              style={{
                flex: 35,
                backgroundColor: COLORS.white,
                borderTopRightRadius: SIZES.radius,
                borderTopLeftRadius: SIZES.radius,
              }}>
              {/* Bar Line */}
              <View
                style={{
                  width: SIZES.width * 0.16,
                  alignSelf: 'center',
                  borderTopColor: COLORS.gray,
                  opacity: 0.5,
                  borderTopWidth: 5,
                  marginTop: SIZES.padding * 2,
                }}></View>
              {/* Profile Info */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: SIZES.padding * 3,
                  marginTop: SIZES.padding * 2.5,
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={{color: COLORS.black, ...FONTS.h2}}>
                    Andrea Murphy
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: COLORS.black,
                      ...FONTS.h2,
                      paddingRight: SIZES.padding / 1.4,
                    }}>
                    23
                  </Text>
                  <Text style={{color: COLORS.gray, ...FONTS.h2}}>yo</Text>
                </View>
              </View>
              {/* Transaction History */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: SIZES.padding * 2.5,
                  marginHorizontal: SIZES.padding * 2,
                }}>
                {transactionData.map(transaction => (
                  <TouchableOpacity
                    key={transaction.pid}
                    onPress={() => {
                      console.log(transaction.pid);
                    }}
                    style={{
                      backgroundColor: COLORS.lightGreen,
                      borderRadius: SIZES.radius / 1.5,
                      width: SIZES.width * 0.27,
                      height: SIZES.height * 0.15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: SIZES.padding,
                    }}>
                    <Text style={{color: COLORS.black, ...FONTS.h4}}>
                      {transaction.head}
                    </Text>
                    <Text style={{color: COLORS.black, fontSize: 40}}>
                      {transaction.points}
                    </Text>
                    <Text
                      style={{
                        color:
                          transaction.earned < 0 ? COLORS.red : COLORS.green,
                        ...FONTS.h4,
                      }}>
                      {transaction.earned}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ImageBackground>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const transactionData = [
  {
    pid: 121,
    points: 96,
    earned: -12,
    head: 'Points',
  },
  {
    pid: 122,
    points: 121,
    earned: 121,
    head: 'Streak',
  },
  {
    pid: 123,
    points: 5,
    earned: 2.1,
    head: 'Stars',
  },
];
