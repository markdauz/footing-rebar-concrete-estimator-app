import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type MixType = 'aa' | 'a' | 'b' | 'c';

export default function Plaster() {
  const insets = useSafeAreaInsets();
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Plaster Calculator',
        }}
      />
      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
          <View
            style={[
              styles.header,
              {
                marginTop: -insets.top + 8,
              },
            ]}
          >
            <View style={styles.iconBox}>
              <Ionicons name="layers-outline" size={28} color="#0F172A" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F1F5F9' },
  container: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
