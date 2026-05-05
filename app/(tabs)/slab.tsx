import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function Slab() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={['#f1f5f9', '#e2e8f0']} style={{ flex: 1 }}>
      <Stack.Screen
        options={{ headerShown: true, title: '', headerTransparent: true }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            paddingTop: insets.top + 10,
            paddingHorizontal: 16,
          }}
        >
          {/* HEADER */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 2,
              }}
            >
              <Ionicons name="grid-outline" size={26} color="#1e293b" />
            </View>

            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                marginTop: 10,
                color: '#1e293b',
              }}
            >
              Slab Calculator
            </Text>

            <Text
              style={{
                fontSize: 13,
                color: '#64748b',
                marginTop: 4,
              }}
            >
              Concrete slab estimation
            </Text>
          </View>

          {/* CONTENT CARD */}
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: 18,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 3,
            }}
          >
            <Ionicons name="time-outline" size={32} color="#64748b" />

            <Text
              style={{
                marginTop: 12,
                fontSize: 16,
                fontWeight: '600',
                color: '#334155',
              }}
            >
              Coming Soon
            </Text>

            <Text
              style={{
                marginTop: 6,
                fontSize: 13,
                color: '#64748b',
              }}
            >
              This calculator is under development
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
