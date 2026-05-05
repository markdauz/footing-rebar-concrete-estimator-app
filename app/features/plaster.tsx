import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
  computePlasterCement,
  computePlasterSand,
  computePlasterVolume,
} from '../../utils/plasterCalculator';

type MixType = 'a' | 'b' | 'c' | 'd';

export default function Plaster() {
  const insets = useSafeAreaInsets();

  const [area, setArea] = useState('');
  const [thickness, setThickness] = useState<string | 'custom' | null>(null);
  const [customThickness, setCustomThickness] = useState('');
  const [openThickness, setOpenThickness] = useState(false);

  const [mix, setMix] = useState<MixType | 'custom' | null>(null);
  const [customMix, setCustomMix] = useState('');
  const [openMix, setOpenMix] = useState(false);

  const thicknessItems = [
    { label: '0.016', value: '0.016' },
    { label: '0.020', value: '0.020' },
    { label: '0.025', value: '0.025' },
    { label: '0.050', value: '0.050' },
    { label: 'Custom', value: 'custom' },
  ];

  const mixItems = [
    { label: 'A (1:2)', value: 'a' },
    { label: 'B (1:3)', value: 'b' },
    { label: 'C (1:4)', value: 'c' },
    { label: 'D (1:5)', value: 'd' },
    { label: 'Custom', value: 'custom' },
  ];

  const numericArea = parseFloat(area);

  const effectiveThickness = useMemo(() => {
    if (thickness === 'custom') {
      return customThickness ? parseFloat(customThickness) : NaN;
    }
    return thickness ? parseFloat(thickness) : NaN;
  }, [thickness, customThickness]);

  const volume = useMemo(() => {
    if (isNaN(numericArea) || isNaN(effectiveThickness)) return 0;
    return computePlasterVolume(numericArea, effectiveThickness);
  }, [numericArea, effectiveThickness]);

  const cement = useMemo(() => {
    if (!volume || isNaN(effectiveThickness)) return '0.00';

    if (mix === 'custom') {
      if (!customMix) return '0.00';
      return computePlasterCement(
        volume,
        effectiveThickness,
        parseFloat(customMix),
      );
    }

    if (!mix) return '0.00';

    return computePlasterCement(volume, effectiveThickness, mix);
  }, [volume, effectiveThickness, mix, customMix]);

  const sand = useMemo(() => {
    if (!volume || isNaN(effectiveThickness)) return '0.00';
    return computePlasterSand(volume, effectiveThickness);
  }, [volume, effectiveThickness]);

  const twoSidesCement =
    cement !== '0.00' ? (Number(cement) * 2).toFixed(2) : '0.00';

  const twoSidesSand = sand !== '0.00' ? (Number(sand) * 2).toFixed(2) : '0.00';

  const reset = () => {
    setArea('');
    setThickness(null);
    setCustomThickness('');
    setMix(null);
    setCustomMix('');
  };

  return (
    <LinearGradient colors={['#bae6fd', '#7dd3fc']} style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Plaster Calculator',
          headerTransparent: true,
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          contentContainerStyle={{
            paddingTop: insets.top + 10,
            paddingHorizontal: 16,
            paddingBottom: 40,
          }}
        >
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="layers-outline" size={28} color="#0F172A" />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Thickness</Text>

            {thickness === 'custom' ? (
              <>
                <TextInput
                  value={customThickness}
                  onChangeText={setCustomThickness}
                  keyboardType="numeric"
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => setThickness(null)}>
                  <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View
                style={{
                  zIndex: openThickness ? 3000 : 1,
                  ...(Platform.OS === 'android' && {
                    elevation: openThickness ? 3000 : 0,
                  }),
                }}
              >
                <DropDownPicker
                  open={openThickness}
                  value={thickness}
                  items={thicknessItems}
                  setOpen={(val) => {
                    setOpenThickness((prev) => {
                      const next = typeof val === 'function' ? val(prev) : val;
                      if (next) setOpenMix(false);
                      return next;
                    });
                  }}
                  setValue={setThickness}
                  listMode={Platform.OS === 'android' ? 'MODAL' : 'SCROLLVIEW'}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
            )}

            <Text style={styles.label}>Area (sqm)</Text>
            <TextInput
              value={area}
              onChangeText={setArea}
              keyboardType="numeric"
              style={styles.input}
            />

            <Text style={styles.label}>Mixture</Text>

            {mix === 'custom' ? (
              <>
                <TextInput
                  value={customMix}
                  onChangeText={setCustomMix}
                  keyboardType="numeric"
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => setMix(null)}>
                  <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View
                style={{
                  zIndex: openMix ? 2000 : 1,
                  ...(Platform.OS === 'android' && {
                    elevation: openMix ? 2000 : 0,
                  }),
                }}
              >
                <DropDownPicker
                  open={openMix}
                  value={mix}
                  items={mixItems}
                  setOpen={(val) => {
                    setOpenMix((prev) => {
                      const next = typeof val === 'function' ? val(prev) : val;
                      if (next) setOpenThickness(false);
                      return next;
                    });
                  }}
                  setValue={setMix}
                  listMode={Platform.OS === 'android' ? 'MODAL' : 'SCROLLVIEW'}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
            )}

            <TouchableOpacity style={styles.reset} onPress={reset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Results</Text>

            <Result label="Volume" value={`${volume.toFixed(3)} m³`} />
            <Result label="Cement" value={`${cement} bags`} />
            <Result label="Sand" value={`${sand} m³`} />
            <Result label="Cement (2 sides)" value={`${twoSidesCement} bags`} />
            <Result label="Sand (2 sides)" value={`${twoSidesSand} m³`} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Result({ label, value }: any) {
  return (
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text style={styles.resultValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', marginBottom: 32 },

  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },

  label: { marginTop: 10, marginBottom: 6, color: '#64748B' },

  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  dropdown: {
    borderRadius: 10,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },

  dropdownContainer: {
    borderColor: '#E2E8F0', // no elevation here
  },

  backText: { color: '#2563EB', marginTop: 6 },

  reset: {
    marginTop: 16,
    backgroundColor: '#475569',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  resetText: { color: '#fff', fontWeight: '600' },

  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },

  resultTitle: {
    fontWeight: '600',
    marginBottom: 10,
  },

  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  resultLabel: { color: '#64748B' },
  resultValue: { fontWeight: '600' },
});
