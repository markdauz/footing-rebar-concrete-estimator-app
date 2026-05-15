import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type Route = '/features/slab/suspended-slab' | '/features/slab/slab-on-fill';

type SlabFeature = {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: Route;
};

const slabFeatures: SlabFeature[] = [
  {
    name: 'Suspended Slab',
    icon: 'layers-outline',
    route: '/features/slab/suspended-slab',
  },
  {
    name: 'Slab on Fill',
    icon: 'grid-outline',
    route: '/features/slab/slab-on-fill',
  },
];

export default function Slab() {
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

            <Text style={styles.title}>Slab Tools</Text>

            <Text style={styles.subtitle}>
              Select a slab calculator to begin
            </Text>
          </View>

          {/* GRID */}
          <View style={styles.grid}>
            <View style={styles.row}>
              {slabFeatures.map((feature, i) => (
                <TouchableOpacity
                  key={feature.name}
                  style={[styles.card, i === 0 && { marginRight: 12 }]}
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
    flex: 1,
  },

  row: {
    flexDirection: 'row',
  },

  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    elevation: 3,
  },

  cardIconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardText: {
    marginTop: 12,
    fontSize: 14,
    color: '#334155',
    fontWeight: '600',
    textAlign: 'center',
  },
});
