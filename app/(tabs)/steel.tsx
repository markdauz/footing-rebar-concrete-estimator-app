import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type Route =
  | '/features/steel/footing'
  | '/features/steel/column'
  | '/features/steel/beam';

type SteelFeature = {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: Route;
};

const slabFeatures: SteelFeature[] = [
  {
    name: 'Footing',
    icon: 'layers-outline',
    route: '/features/steel/footing',
  },
  {
    name: 'Column',
    icon: 'cube-outline',
    route: '/features/steel/column',
  },
  {
    name: 'Beam',
    icon: 'remove-outline',
    route: '/features/steel/beam',
  },
];

export default function Steel() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <LinearGradient colors={['#f1f5f9', '#e2e8f0']} style={{ flex: 1 }}>
      <Stack.Screen
        options={{ headerShown: true, title: '', headerTransparent: true }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="grid-outline" size={26} color="#1e293b" />
            </View>

            <Text style={styles.title}>Steel Estimates</Text>

            <Text style={styles.subtitle}>
              Select a steel calculator to begin
            </Text>
          </View>

          {/* GRID */}
          {/* GRID */}
          <View style={styles.grid}>
            {slabFeatures.map((feature, i) => (
              <TouchableOpacity
                key={feature.name}
                style={[styles.card, i % 2 === 0 ? { marginRight: 12 } : null]}
                activeOpacity={0.85}
                onPress={() => router.push(feature.route)}
              >
                <View style={styles.cardIconBox}>
                  <Ionicons
                    name={feature.icon as any}
                    size={24}
                    color="#1e293b"
                  />
                </View>

                <Text style={styles.cardText}>{feature.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },

  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    color: '#1e293b',
  },

  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    marginBottom: 12,
    elevation: 3,
  },

  cardIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardText: {
    marginTop: 10,
    fontSize: 14,
    color: '#334155',
    fontWeight: '600',
    textAlign: 'center',
  },
});
