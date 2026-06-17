import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type SummaryItem = {
  description: string;
  diameter?: string;
  steelLength?: string;
  qty: string;
  unit: string;
};

type SummaryGroup = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  items: SummaryItem[];
};

const summarySections: SummaryGroup[] = [
  {
    title: 'STEEL BARS',
    icon: 'cube-outline',
    items: [
      {
        description: 'Footing - Main Bars',
        diameter: '-',
        steelLength: '-',
        qty: '-',
        unit: 'pcs',
      },
      {
        description: 'Footing - Tie Wire',
        qty: '-',
        unit: 'kgs',
      },
      {
        description: 'Column - Main Bars',
        diameter: '-',
        steelLength: '-',
        qty: '-',
        unit: 'pcs',
      },
      {
        description: 'Column - Lateral Ties',
        diameter: '-',
        steelLength: '-',
        qty: '-',
        unit: 'pcs',
      },
      {
        description: 'Beam/Girder - Main Bars',
        diameter: '-',
        steelLength: '-',
        qty: '-',
        unit: 'pcs',
      },
      {
        description: 'Beam/Girder - Stirrups',
        diameter: '-',
        steelLength: '-',
        qty: '-',
        unit: 'pcs',
      },
    ],
  },

  {
    title: 'CONCRETE',
    icon: 'apps-outline',
    items: [
      {
        description: 'Footing - Cement',
        qty: '-',
        unit: 'bags',
      },
      {
        description: 'Footing - Sand',
        qty: '-',
        unit: 'm³',
      },
      {
        description: 'Footing - Gravel',
        qty: '-',
        unit: 'm³',
      },

      {
        description: 'Column - Cement',
        qty: '-',
        unit: 'bags',
      },
      {
        description: 'Column - Sand',
        qty: '-',
        unit: 'm³',
      },
      {
        description: 'Column - Gravel',
        qty: '-',
        unit: 'm³',
      },

      {
        description: 'Beam/Girder - Cement',
        qty: '-',
        unit: 'bags',
      },
      {
        description: 'Beam/Girder - Sand',
        qty: '-',
        unit: 'm³',
      },
      {
        description: 'Beam/Girder - Gravel',
        qty: '-',
        unit: 'm³',
      },

      {
        description: 'Wall Footing - Cement',
        qty: '-',
        unit: 'bags',
      },
      {
        description: 'Wall Footing - Sand',
        qty: '-',
        unit: 'm³',
      },
      {
        description: 'Wall Footing - Gravel',
        qty: '-',
        unit: 'm³',
      },

      {
        description: 'Slab - Cement',
        qty: '-',
        unit: 'bags',
      },
      {
        description: 'Slab - Sand',
        qty: '-',
        unit: 'm³',
      },
      {
        description: 'Slab - Gravel',
        qty: '-',
        unit: 'm³',
      },

      {
        description: 'Mortar (CHB) - Cement',
        qty: '-',
        unit: 'bags',
      },
      {
        description: 'Mortar (CHB) - Sand',
        qty: '-',
        unit: 'm³',
      },

      {
        description: 'Mortar/Sqm (CHB) - Cement',
        qty: '-',
        unit: 'bags',
      },
      {
        description: 'Mortar/Sqm (CHB) - Sand',
        qty: '-',
        unit: 'm³',
      },

      {
        description: 'Plaster - Cement',
        qty: '-',
        unit: 'bags',
      },
      {
        description: 'Plaster - Sand',
        qty: '-',
        unit: 'm³',
      },
    ],
  },
];

export default function Summary() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={['#f1f5f9', '#e2e8f0']} style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true,
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: insets.top + 10,
            paddingHorizontal: 16,
            paddingBottom: 40,
          }}
        >
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="clipboard-outline" size={26} color="#1e293b" />
            </View>

            <Text style={styles.title}>Summary</Text>

            <Text style={styles.subtitle}>Structural Materials Summary</Text>
          </View>

          {summarySections.map((section, index) => (
            <View key={index} style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Ionicons name={section.icon} size={18} color="#fff" />

                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>

              {Object.entries(
                section.items.reduce((acc: any, item: any) => {
                  const category = item.description.split(' - ')[0];

                  if (!acc[category]) {
                    acc[category] = [];
                  }

                  acc[category].push(item);

                  return acc;
                }, {}),
              ).map(([category, groupedItems]: any, categoryIndex) => (
                <View
                  key={categoryIndex}
                  style={[
                    styles.groupCard,
                    categoryIndex ===
                      Object.entries(
                        section.items.reduce((acc: any, item: any) => {
                          const category = item.description.split(' - ')[0];

                          if (!acc[category]) {
                            acc[category] = [];
                          }

                          acc[category].push(item);

                          return acc;
                        }, {}),
                      ).length -
                        1 && {
                      marginBottom: 14,
                    },
                  ]}
                >
                  <Text style={styles.groupTitle}>{category}</Text>

                  {groupedItems.map((item: any, itemIndex: number) => (
                    <View key={itemIndex} style={styles.itemCard}>
                      <SummaryRow
                        label="Description"
                        value={
                          item.description.split(' - ')[1] || item.description
                        }
                      />

                      {!!item.diameter && (
                        <SummaryRow
                          label="Bar Diameter Ø"
                          value={item.diameter}
                        />
                      )}

                      {!!item.steelLength && (
                        <SummaryRow
                          label="Steel Length"
                          value={item.steelLength}
                        />
                      )}

                      <SummaryRow label="Quantity" value={item.qty} />

                      <SummaryRow label="Unit" value={item.unit} />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
    color: '#0f172a',
  },

  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },

  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 18,
    overflow: 'hidden',
    elevation: 3,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
    letterSpacing: 0.5,
  },

  itemCard: {
    backgroundColor: '#f8fafc',
    margin: 14,
    marginBottom: 0,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  row: {
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 4,
  },

  value: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  groupCard: {
    marginHorizontal: 14,
    marginTop: 14,
    borderRadius: 18,
  },

  groupTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
});
